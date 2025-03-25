from flask import Flask
from flask_socketio import SocketIO
import requests
import pickle
import numpy as np
from threading import Thread, Event
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load the .pkl model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

month = 1
company = ""
interval = '1min'

# API URL to fetch data
API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={company}&interval={interval}&apikey=demo'

# Event to stop the thread if needed
stop_event = Event()

def getinit_Data():
    

def fetch_and_process():
    while not stop_event.is_set():
        try:
            # Fetch data from the API
            response = requests.get(API_URL)
            data = response.json()

            # Process data with the model
            input_data = np.array(data).reshape(1, -1)
            output = model.predict(input_data)

            # Compute argmax
            result = int(np.argmax(output))

            # Send result to Node.js server via socket
            socketio.emit('model_output', {'result': result})

            print(f"Sent result: {result}")

        except Exception as e:
            print(f"Error: {e}")

        # Wait for one minute
        time.sleep(60)

# Start the background thread for fetching and processing
def start_background_task():
    thread = Thread(target=fetch_and_process)
    thread.start()

@app.route('/')
def index():
    return "Flask SocketIO Server Running"

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    start_background_task()
    socketio.run(app, host='0.0.0.0', port=5000)