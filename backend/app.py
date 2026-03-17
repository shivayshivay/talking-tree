"""
Talking Trees — Flask + MongoDB Backend
Izee Business School Smart City Project
"""

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

from routes.sensors  import sensors_bp
from routes.reports  import reports_bp
from routes.ecopoints import ecopoints_bp

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow frontend to call backend

# ── MongoDB Connection ──
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client     = MongoClient(MONGO_URI)
db         = client["talking_trees"]

# Make db accessible to all routes
app.config["DB"] = db

# ── Register Blueprints ──
app.register_blueprint(sensors_bp,   url_prefix="/api/sensors")
app.register_blueprint(reports_bp,   url_prefix="/api/reports")
app.register_blueprint(ecopoints_bp, url_prefix="/api/ecopoints")

@app.route("/")
def health():
    return {"status": "ok", "message": "🌳 Talking Trees API is running!"}

if __name__ == "__main__":
    print("🌳 Starting Talking Trees Backend...")
    print("📡 MongoDB:", MONGO_URI)
    print("🌐 API running at http://localhost:5000")
    app.run(debug=True, port=5000)
