# app.py

from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("water_quality_rf_model.pkl")

@app.route('/predict', methods=['POST'])
def predict_water_potability():
    data = request.get_json()
    ph = data['ph']
    hardness = data['Hardness']
    solids = data['Solids']
    chloramines = data['Chloramines']
    sulfate = data['Sulfate']
    organic_carbon = data['Organic_carbon']
    trihalomethanes = data['Trihalomethanes']
    turbidity = data['Turbidity']

    # Prepare the input data for prediction
    input_data = np.array([[ph, hardness, solids, chloramines, sulfate, organic_carbon, trihalomethanes, turbidity]])

    # Make the prediction using the model
    prediction = model.predict(input_data)

    return jsonify({"prediction": int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
