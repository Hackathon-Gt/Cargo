from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows React to talk to Flask

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json
    return jsonify({"received": data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows requests from frontend

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask Backend!"})

if __name__ == '__main__':
    app.run(debug=True)
