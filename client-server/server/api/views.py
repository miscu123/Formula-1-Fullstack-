from django.http import JsonResponse
from ml_models.data_processor import F1DataProcessor
from ml_models.model_trainer import F1ModelTrainer
from ml_models.predictor import F1Predictor
from sklearn.ensemble import RandomForestClassifier

# 1️⃣ Instanțiază processor și model
processor = F1DataProcessor()
model = RandomForestClassifier()
trainer = F1ModelTrainer(processor, model)

# 2️⃣ Antrenează modelul o singură dată la start (sau încarcă modelul salvat)
predictor = F1Predictor(
    model_path=r'C:\Users\Lenovo\Documents\Formula 1 Fullstack App\client-server\server\ml_models\f1_model.pkl',
    processor_path=r'C:\Users\Lenovo\Documents\Formula 1 Fullstack App\client-server\server\ml_models\f1_processor.pkl'
)

def list_races(request):
    data_folder = r"C:\Users\Lenovo\Documents\Formula 1 Fullstack App\client-server\server\data"
    data = processor.load_and_merge_data(data_folder=data_folder)

    # Use 'name' and 'date' instead of 'raceName'
    races = data[['raceId', 'name', 'date']].drop_duplicates().sort_values('date')

    races_list = [
        {"id": int(row['raceId']), "name": row['name'], "date": str(row['date'])}
        for _, row in races.iterrows()
    ]
    
    return JsonResponse(races_list, safe=False)

def predict_next_race(request):
    # 1️⃣ Încarcă și procesează datele
    data_folder = r"C:\Users\Lenovo\Documents\Formula 1 Fullstack App\client-server\server\data"
    data = processor.load_and_merge_data(data_folder=data_folder)
    data = processor.create_features(data)
    
    # 2️⃣ Selectează cursa specificată
    race_id = request.GET.get('race_id')
    if race_id is None:
        return JsonResponse({"error": "race_id is required"}, status=400)
    
    race_id = int(race_id)
    next_race_data = data[data['raceId'] == race_id]
    if next_race_data.empty:
        return JsonResponse({"error": "Race ID not found"}, status=404)
    
    # 3️⃣ Pregătește features pentru model
    X_scaled, y, final_data = processor.prepare_training_data(next_race_data)
    
    # 4️⃣ Rulează predicția folosind instanța
    top3_indices, top3_probs = predictor.predict_race_top3(X_scaled)
    
    # 5️⃣ Mapare ID driver la nume
    top3_drivers = final_data.iloc[top3_indices]['driverRef'].tolist()
    
    response_data = {
        "predicted_top3": top3_drivers,
        "all_predictions": [
            {"position": i+1, "driver": final_data.iloc[i]['driverRef']} 
            for i in range(len(final_data))
        ]
    }

    return JsonResponse(response_data)