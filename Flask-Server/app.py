from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the model
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['GET'])
def predict():
    try:
        # Get 'states' from query parameters (comma-separated values)
        states = request.args.getlist('states')
        
        # Convert states to numeric format (adjust as per your model's input requirement)
        states = np.array(states, dtype=float).reshape(1, -1)  

        # Make prediction
        prediction = model.predict(states)

        # Return the response as JSON
        return jsonify({"prediction": float(prediction[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
