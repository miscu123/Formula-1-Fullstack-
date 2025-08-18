# ml_models/model_trainer.py

from sklearn.model_selection import train_test_split, cross_val_score
import joblib

class F1ModelTrainer:
    def __init__(self, processor, model):
        self.processor = processor
        self.model = model

    def train_model(self, data_path):
        """Antrenează modelul"""
        # Procesează datele
        raw_data = self.processor.load_and_merge_data(data_path)
        processed_data = self.processor.create_features(raw_data)
        X, y, full_data = self.processor.prepare_training_data(processed_data)
        
        # Împarte datele
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Antrenează modelul
        self.model.fit(X_train, y_train)
        
        # Evaluează modelul
        train_score = self.model.score(X_train, y_train)
        test_score = self.model.score(X_test, y_test)
        
        print(f"Train accuracy: {train_score:.3f}")
        print(f"Test accuracy: {test_score:.3f}")
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X, y, cv=5)
        print(f"CV Score: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
        
        # Salvează modelul și procesorul
        joblib.dump(self.model, 'ml_models/f1_model.pkl')
        joblib.dump(self.processor, 'ml_models/f1_processor.pkl')
        
        return self.model, self.processor