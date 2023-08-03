import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import sys
import json

# Load the dataset
data = pd.read_csv('data/water_potability2.csv')

# Separate features (X) and labels (y)
X = data.drop('Potability', axis=1)
y = data['Potability']

# Get the feature names in the order used during training
feature_names = X.columns.tolist()

# Convert the input data passed from Node.js into a DataFrame
input_data = json.loads(sys.argv[1])
input_df = pd.DataFrame([input_data], columns=feature_names)  # Explicitly set column order

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make the prediction using the model
prediction = model.predict(input_df)

# Print the result as a JSON object to the standard output
print(json.dumps({"prediction": int(prediction[0])}))
