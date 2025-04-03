from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import sys,os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the model
sys.path.insert(0,'../rl_modules')
file = open('../model/model6inputs' , 'rb')
model = pickle.load(file)
file.close()
def dataEng(npdata):
    print(npdata)
    new_data = np.empty(shape=(6,), dtype=float)
    new_data.push((npdata[0]-npdata[4])*10/npdata[4])
    new_data.push((npdata[1]-npdata[2])*10/npdata[4])
    new_data.push((npdata[1]-npdata[4])*10/npdata[4])
    new_data.push((npdata[4]-npdata[2])*10/npdata[4])
    new_data.push(npdata[0]/1000)
    new_data.push(npdata[5]/10000000)
    print(new_data)
    return new_data

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get 'states' from query parameters (comma-separated values)
        if request.content_type=='application/json':
            data = request.get_json()
        # data = request.args
        npdata = np.array(data[0:5], dtype=float)
        npdata = np.append(npdata , np.array(data[6:], dtype=float))
            # 0-close | 1-high | 2-low | 3-n | 4-open | 5-volume | 6-vol wt. price 

        # print(f'npdata is {npdata}')
        new_data = np.ones(6,dtype=float)
        new_data[0] = ((npdata[0]-npdata[4])*10/npdata[4])
        new_data[1] = ((npdata[1]-npdata[2])*10/npdata[4])
        new_data[2] = ((npdata[1]-npdata[4])*10/npdata[4])
        new_data[3] = ((npdata[4]-npdata[2])*10/npdata[4])
        new_data[4] = (npdata[0]/1000)
        new_data[5] = (npdata[5]/10000000)
        # print(f'Enginnered data = {newData}')
        
        # Convert states to numeric format (adjust as per your model's input requirement)

        # Make prediction
        prediction = model.predict(new_data)
        pred = np.argmax(prediction)

        # Return the response as JSON
        return jsonify({"prediction": (str)(pred)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
