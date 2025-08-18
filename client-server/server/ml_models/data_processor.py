import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
import glob

class F1DataProcessor:
    def __init__(self):
        self.le_driver = LabelEncoder()
        self.le_constructor = LabelEncoder()
        self.le_circuit = LabelEncoder()
        self.scaler = StandardScaler()

    def load_and_merge_data(self, data_folder):
        import pandas as pd
        import glob
        import os

        def load_csv(pattern):
            files = glob.glob(pattern)
            if not files:
                raise FileNotFoundError(f"No files matched the pattern: {pattern}")
            dfs = [pd.read_csv(f, na_values='\\N') for f in files]
            return pd.concat(dfs, ignore_index=True)


        # Load all datasets
        races = load_csv(os.path.join(data_folder, "races.csv"))
        lap_times = load_csv(os.path.join(data_folder, "lap_times.csv"))
        qualifying = load_csv(os.path.join(data_folder, "qualifying.csv"))
        results = load_csv(os.path.join(data_folder, "results.csv"))
        drivers = load_csv(os.path.join(data_folder, "drivers.csv"))
        constructors = load_csv(os.path.join(data_folder, "constructors.csv"))
        circuits = load_csv(os.path.join(data_folder, "circuits.csv"))

        # Merge step by step, handling duplicate columns safely
        data = results.merge(races, on='raceId', how='left')
        data = data.merge(drivers, on='driverId', how='left')
        data = data.merge(constructors, on='constructorId', how='left', suffixes=('', '_constructor'))
        data = data.merge(circuits, on='circuitId', how='left', suffixes=('', '_circuit'))
        data = data.merge(qualifying, on=['raceId', 'driverId'], how='left', suffixes=('', '_qual'))

        # Process lap times and merge
        lap_stats = self.process_lap_times(lap_times)
        data = data.merge(lap_stats, on=['raceId', 'driverId'], how='left')

        return data

    
    def process_lap_times(self, lap_times):
        """Procesează lap_times pentru a crea features utile"""
        # Convertește timpul în secunde pentru calcule
        def time_to_seconds(time_str):
            if pd.isna(time_str) or time_str == '\\N':
                return np.nan
            try:
                if ':' in str(time_str):
                    parts = str(time_str).split(':')
                    minutes = float(parts[0])
                    seconds = float(parts[1])
                    return minutes * 60 + seconds
                else:
                    return float(time_str)
            except:
                return np.nan
        
        # Convertește milliseconds în seconds
        if 'milliseconds' in lap_times.columns:
            lap_times['time_seconds'] = lap_times['milliseconds'] / 1000.0
        else:
            lap_times['time_seconds'] = lap_times['time'].apply(time_to_seconds)
        
        # Calculează statistici per driver per cursă
        lap_stats = lap_times.groupby(['raceId', 'driverId']).agg({
            'time_seconds': ['mean', 'min', 'max', 'std', 'count'],
            'lap': 'max'
        }).round(3)
        
        # Flatten column names
        lap_stats.columns = [
            'avg_lap_time', 'fastest_lap_time', 'slowest_lap_time', 
            'lap_time_std', 'total_laps', 'max_lap_completed'
        ]
        
        # Reset index pentru merge
        lap_stats = lap_stats.reset_index()
        
        # Calculează consistența (inversul deviației standard)
        lap_stats['lap_consistency'] = 1 / (lap_stats['lap_time_std'] + 0.001)  # Evită diviziunea cu 0
        
        return lap_stats
    
    def process_qualifying_features(self, data):
        """Procesează datele de qualifying pentru a crea features"""
        # Q1, Q2, Q3 times to seconds
        def qualifying_time_to_seconds(time_str):
            if pd.isna(time_str) or time_str == '\\N' or time_str == '':
                return np.nan
            try:
                if ':' in str(time_str):
                    parts = str(time_str).split(':')
                    minutes = float(parts[0])
                    seconds = float(parts[1])
                    return minutes * 60 + seconds
                else:
                    return float(time_str) if str(time_str).replace('.', '').isdigit() else np.nan
            except:
                return np.nan
        
        # Procesează timpii de qualifying
        if 'q1' in data.columns:
            data['q1_seconds'] = data['q1'].apply(qualifying_time_to_seconds)
        if 'q2' in data.columns:
            data['q2_seconds'] = data['q2'].apply(qualifying_time_to_seconds)
        if 'q3' in data.columns:
            data['q3_seconds'] = data['q3'].apply(qualifying_time_to_seconds)
        
        # Cel mai bun timp din qualifying
        qualifying_cols = [col for col in ['q1_seconds', 'q2_seconds', 'q3_seconds'] if col in data.columns]
        if qualifying_cols:
            data['best_qualifying_time'] = data[qualifying_cols].min(axis=1)
        
        # Pozitia de start din qualifying (daca nu e disponibila, foloseste grid)
        if 'position' in data.columns:
            data['qualifying_position'] = data['position'].fillna(data.get('grid', 20))
        else:
            data['qualifying_position'] = data.get('grid', 20)
        
        return data

    def create_features(self, data):
        """Creează features pentru ML model"""
        # Procesează qualifying features
        data = self.process_qualifying_features(data)
        
        # Features bazate pe performanțe anterioare
        data = data.sort_values(['driverId', 'date'])
        
        # Calculează media pozițiilor anterioare pentru driver
        data['driver_avg_position'] = data.groupby('driverId')['positionOrder'].expanding().mean().reset_index(drop=True)
        
        # Calculează media pozițiilor anterioare pentru constructor
        data['constructor_avg_position'] = data.groupby('constructorId')['positionOrder'].expanding().mean().reset_index(drop=True)
        
        # Numărul de cursele anterioare pentru driver
        data['driver_experience'] = data.groupby('driverId').cumcount()
        
        # Performanța pe circuitul respectiv
        circuit_performance = data.groupby(['driverId', 'circuitId'])['positionOrder'].expanding().mean()
        data['driver_circuit_performance'] = circuit_performance.reset_index(drop=True)
        
        # Grid position ca feature important
        data['grid_position'] = data['grid'].fillna(20)  # Înlocuiește NaN cu 20
        
        # Features din lap times (dacă sunt disponibile)
        if 'avg_lap_time' in data.columns:
            # Media timpilor de tură anteriori pentru driver
            data['driver_avg_lap_time_history'] = data.groupby('driverId')['avg_lap_time'].expanding().mean().reset_index(drop=True)
            
            # Consistența medie anterioară
            data['driver_avg_consistency_history'] = data.groupby('driverId')['lap_consistency'].expanding().mean().reset_index(drop=True)
            
            # Performanța pe timp de tură pe circuit
            circuit_lap_performance = data.groupby(['driverId', 'circuitId'])['avg_lap_time'].expanding().mean()
            data['driver_circuit_lap_performance'] = circuit_lap_performance.reset_index(drop=True)
        
        # Features din qualifying (dacă sunt disponibile)
        if 'best_qualifying_time' in data.columns:
            # Media timpilor de qualifying anteriori
            data['driver_avg_qualifying_time_history'] = data.groupby('driverId')['best_qualifying_time'].expanding().mean().reset_index(drop=True)
            
            # Performanța de qualifying pe circuit
            circuit_qual_performance = data.groupby(['driverId', 'circuitId'])['best_qualifying_time'].expanding().mean()
            data['driver_circuit_qualifying_performance'] = circuit_qual_performance.reset_index(drop=True)
        
        # Diferența dintre poziția de grid și poziția de finishing (progres în cursă)
        data['race_progress'] = data['grid_position'] - data.get('positionOrder', data['grid_position'])
        
        # Media progresului în cursă pentru driver
        data['driver_avg_race_progress'] = data.groupby('driverId')['race_progress'].expanding().mean().reset_index(drop=True)
        
        # Punctele câștigate în cursele anterioare
        if 'points' in data.columns:
            data['driver_total_points_history'] = data.groupby('driverId')['points'].expanding().sum().reset_index(drop=True)
            data['constructor_total_points_history'] = data.groupby('constructorId')['points'].expanding().sum().reset_index(drop=True)
        
        return data

    def prepare_training_data(self, data):
        """Pregătește datele pentru antrenament"""
        # Filtrează doar cursele cu rezultate valide
        data = data[data['positionOrder'] > 0].copy()
        
        # Creează target variable (top 3: 1, altele: 0)
        data['is_top3'] = (data['positionOrder'] <= 3).astype(int)
        
        # Selectează features de bază
        feature_columns = [
            'grid_position', 'driver_avg_position', 'constructor_avg_position',
            'driver_experience', 'driver_circuit_performance', 'driver_avg_race_progress'
        ]
        
        # Adaugă features din lap times dacă sunt disponibile
        lap_time_features = [
            'avg_lap_time', 'fastest_lap_time', 'lap_consistency',
            'driver_avg_lap_time_history', 'driver_avg_consistency_history',
            'driver_circuit_lap_performance', 'total_laps'
        ]
        
        for feature in lap_time_features:
            if feature in data.columns:
                feature_columns.append(feature)
        
        # Adaugă features din qualifying dacă sunt disponibile
        qualifying_features = [
            'qualifying_position', 'best_qualifying_time',
            'driver_avg_qualifying_time_history', 'driver_circuit_qualifying_performance'
        ]
        
        for feature in qualifying_features:
            if feature in data.columns:
                feature_columns.append(feature)
        
        # Adaugă features de puncte dacă sunt disponibile
        points_features = [
            'driver_total_points_history', 'constructor_total_points_history'
        ]
        
        for feature in points_features:
            if feature in data.columns:
                feature_columns.append(feature)
        
        # Elimină rândurile cu NaN din feature columns esențiale
        essential_features = [
            'grid_position', 'driver_avg_position', 'constructor_avg_position',
            'driver_experience'
        ]
        
        data = data.dropna(subset=essential_features + ['is_top3'])
        
        # Pentru features opționale, înlocuiește NaN cu valori default
        for col in feature_columns:
            if col in data.columns:
                if 'time' in col.lower():
                    data[col] = data[col].fillna(data[col].median())  # Folosește mediana pentru timpuri
                elif 'position' in col.lower():
                    data[col] = data[col].fillna(10)  # Poziție medie pentru poziții
                elif 'points' in col.lower():
                    data[col] = data[col].fillna(0)  # 0 puncte pentru puncte
                else:
                    data[col] = data[col].fillna(data[col].mean())  # Media pentru alte features
        
        # Encodează variabilele categorice
        data['driver_encoded'] = self.le_driver.fit_transform(data['driverId'])
        data['constructor_encoded'] = self.le_constructor.fit_transform(data['constructorId'])
        data['circuit_encoded'] = self.le_circuit.fit_transform(data['circuitId'])
        
        feature_columns.extend(['driver_encoded', 'constructor_encoded', 'circuit_encoded'])
        
        # Selectează doar coloanele care există în data
        existing_features = [col for col in feature_columns if col in data.columns]
        
        X = data[existing_features]
        y = data['is_top3']
        
        # Scalează features
        X_scaled = self.scaler.fit_transform(X)
        
        return X_scaled, y, data