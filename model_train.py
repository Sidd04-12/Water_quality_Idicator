import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load your dataset (replace 'your_dataset.csv' with your actual dataset file)
data = pd.read_csv('data\water_potability.csv')

# Separate features (X) and labels (y)
X = data.drop('Potability', axis=1)
y = data['Potability']

# Perform Mean/Median imputation for numerical features
for feature in X.columns:
    X[feature].fillna(X[feature].mean(), inplace=True)  # Use mean for imputation, or you can use median

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model (optional)
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy}")

# Save the trained model as a .pkl file
joblib.dump(model, 'water_quality_rf_model.pkl')
