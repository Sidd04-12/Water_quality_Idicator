import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import sys
import json


data = pd.read_csv('data/water_potability2.csv')


X = data.drop('Potability', axis=1)
y = data['Potability']


feature_names = X.columns.tolist()


input_data = json.loads(sys.argv[1])
input_df = pd.DataFrame([input_data], columns=feature_names)  


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


prediction = model.predict(input_df)


print(json.dumps({"prediction": int(prediction[0])}))
