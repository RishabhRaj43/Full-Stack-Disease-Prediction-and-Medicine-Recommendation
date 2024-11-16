import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle  # Using pickle for saving/loading the model

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# Function to train models and return the best one
def train_model():
    # Load the training data
    training_data = pd.read_csv("./ExcelSheets/data_training.csv")

    # Assuming 'Disease' is the target variable and other columns are features
    X = training_data.drop(columns=["Disease"])
    y = training_data["Disease"]

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.1, random_state=42
    )

    # Initialize the models
    models = {
        "RandomForest": RandomForestClassifier(),
        "SVM": SVC(),
        "LogisticRegression": LogisticRegression(max_iter=1000),
    }

    best_model = None
    best_score = 0

    # Train and evaluate each model
    for model_name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        score = accuracy_score(y_test, y_pred)
        print(f"{model_name} Accuracy: {score}")

        if score > best_score:
            best_score = score
            best_model = model

    # Save the best model using pickle
    with open("model.pkl", "wb") as f:
        pickle.dump(best_model, f)

    return best_model


# Function to predict based on the trained model
@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json

    # Check if model is already saved or needs to be trained
    try:
        with open("model.pkl", "rb") as f:
            model = pickle.load(f)
    except FileNotFoundError:
        # If no model is found, train and return it
        model = train_model()

    # Extract feature columns from the training data to ensure consistent column names
    training_data = pd.read_csv("./ExcelSheets/data_training.csv")
    feature_columns = training_data.drop(columns=["Disease"]).columns

    # Convert the incoming data into a DataFrame with the correct column names
    df = pd.DataFrame([data], columns=feature_columns)

    # Make predictions using the loaded or newly trained model
    output = model.predict(df)

    # Load additional data files
    desc = pd.read_csv("./ExcelSheets/description.csv")
    result = desc[desc["Disease"] == output[0]]

    wrk = pd.read_csv("./ExcelSheets/workout.csv")
    wrk = wrk[wrk["disease"] == output[0]]

    diets = pd.read_csv("./ExcelSheets/diets.csv")
    die = diets[diets["Disease"] == output[0]]["Diet"].values.tolist()

    med = pd.read_csv("./ExcelSheets/medications.csv")
    medi = med[med["Disease"] == output[0]]["Medication"].values.tolist()

    return jsonify(
        {
            "disease": output[0],
            "description": result.iloc[0]["Description"],
            "workout": wrk["workout"].tolist(),
            "diets": die,
            "medication": medi,
        }
    )


@app.route("/api/get-disease", methods=["POST"])
def get_disease():
    data = request.json
    print("Data: ", data["disease"]["name"])

    # Load relevant data based on disease name
    desc = pd.read_csv("./ExcelSheets/description.csv")
    workout = pd.read_csv("./ExcelSheets/workout.csv")
    diet = pd.read_csv("./ExcelSheets/diets.csv")
    med = pd.read_csv("./ExcelSheets/medications.csv")

    return jsonify(
        {
            "description": desc[
                desc["Disease"].str.strip().str.lower()
                == data["disease"]["name"].strip().lower()
            ]["Description"].tolist(),
            "workout": workout[
                workout["disease"].str.strip().str.lower()
                == data["disease"]["name"].strip().lower()
            ]["workout"].tolist(),
            "diets": diet[
                diet["Disease"].str.strip().str.lower()
                == data["disease"]["name"].strip().lower()
            ]["Diet"].tolist(),
            "medication": med[
                med["Disease"].str.strip().str.lower()
                == data["disease"]["name"].strip().lower()
            ]["Medication"].tolist(),
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=2000)
