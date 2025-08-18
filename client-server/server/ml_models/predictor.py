import joblib
import pandas as pd
import numpy as np

class F1Predictor:
    def __init__(self, model_path='models/f1_model.pkl', processor_path='models/f1_processor.pkl'):
        self.model = joblib.load(model_path)
        self.processor = joblib.load(processor_path)
    
    def predict_race_top3(self, race_data):
        """Prezice top 3 pentru o cursă"""
        # race_data ar trebui să conțină info despre drivers, grid positions, etc.
        
        # Procesează datele pentru predicție
        X = self.processor.scaler.transform(race_data)
        
        # Obține probabilitățile
        probabilities = self.model.predict_proba(X)[:, 1]  # Probabilitatea de top 3
        
        # Sortează după probabilitate
        sorted_indices = np.argsort(probabilities)[::-1]
        
        return sorted_indices[:3], probabilities[sorted_indices[:3]]