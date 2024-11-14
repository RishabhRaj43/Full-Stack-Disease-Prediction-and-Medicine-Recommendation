import pickle

import pandas as pd
from flask_cors import CORS

from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json

    with open("model.pkl", "rb") as f:
        model = pickle.load(f)

    df = pd.DataFrame([data])
    output = model.predict(df)

    desc = pd.read_csv("description.csv")

    result = desc[desc["Disease"] == output[0]]

    wrk = pd.read_csv("workout.csv")
    wrk = wrk[wrk["disease"] == output[0]]

    diets = pd.read_csv("diets.csv")
    die = diets[diets["Disease"] == output[0]]["Diet"]
    die = [die for die in die.values]

    med = pd.read_csv("medications.csv")
    medi = med[med["Disease"] == output[0]]["Medication"]
    medi = [medi for medi in medi.values]

    return jsonify(
        {
            "disease": output[0],
            "description": result.iloc[0]["Description"],
            "workout": wrk["workout"].tolist(),
            "diets": die,
            "medication": medi,
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=2000)
