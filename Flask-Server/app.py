from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
import pickle
import numpy as np
from datetime import datetime
import time
from threading import Thread

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load your trained model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

active_sessions = {}

def simulate_data(from_date, to_date):
    """Generate sample features for demonstration"""
    days = (to_date - from_date).days
    return np.random.rand(days, 5)  # 5 features per day

@app.route('/train_model', methods=['POST'])
def train_model():
    data = request.json
    company = data.get('company')
    from_date = datetime.strptime(data.get('from'), "%Y-%m-%d")
    to_date = datetime.strptime(data.get('to'), "%Y-%m-%d")
    
    if not all([company, from_date, to_date]):
        return jsonify({"status": "error", "message": "Missing parameters"}), 400

    session_id = f"{company}_{datetime.now().timestamp()}"
    active_sessions[session_id] = True
    
    def background_task():
        try:
            # 1. Prepare data (replace with your actual data pipeline)
            X = simulate_data(from_date, to_date)
            total_minutes = (to_date - from_date).days * 1440  # days to minutes
            
            # 2. Process in chunks (1 minute = 1 chunk)
            for minute in range(total_minutes):
                if not active_sessions.get(session_id):
                    break
                
                # Get data for this minute (simplified)
                chunk_idx = minute % len(X)
                features = X[chunk_idx]
                
                # 3. Get model prediction
                pred = model.predict([features])
                argmax = np.argmax(pred, axis=1)[0]
                
                # 4. Send update via socket
                socketio.emit('update', {
                    'company': company,
                    'minute': minute + 1,
                    'total': total_minutes,
                    'prediction': int(argmax),
                    'confidence': float(np.max(pred))
                }, room=session_id)
                
                time.sleep(0.1)  # For demo (use time.sleep(60) in production
            
            # 5. Send final result
            socketio.emit('final_result', {
                'company': company,
                'final_argmax': int(argmax),
                'timestamp': datetime.now().isoformat()
            }, room=session_id)
            
        except Exception as e:
            socketio.emit('error', {'message': str(e)}, room=session_id)
        finally:
            active_sessions.pop(session_id, None)
    
    Thread(target=background_task).start()
    
    return jsonify({
        'status': 'started',
        'session_id': session_id,
        'duration_days': (to_date - from_date).days
    })

# Socket handlers
@socketio.on('connect')
def handle_connect():
    print("Client connected:", request.sid)

@socketio.on('join')
def handle_join(session_id):
    print(f"Client joined session: {session_id}")
    active_sessions[session_id] = True

if __name__ == '__main__':
    socketio.run(app, port=12345, debug=True)