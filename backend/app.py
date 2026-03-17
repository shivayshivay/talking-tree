"""
Talking Trees — Flask + MongoDB Backend
Izee Business School Smart City Project
"""


from flask import Flask
=======
from flask import Flask, jsonify
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

<<<<<<< HEAD
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
=======
from routes.sensors import sensors_bp
from routes.reports import reports_bp
from routes.ecopoints import ecopoints_bp

# ── Load ENV ──
load_dotenv()

app = Flask(__name__)
CORS(app)

# ── MongoDB Connection ──
MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017")

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
    client.server_info()  # Force connection check
    db = client["talking_trees"]
    print("✅ MongoDB Connected")
except Exception as e:
    print("❌ MongoDB Connection Failed:", e)
    db = None

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
app.config["DB"] = db

# ── Register Blueprints ──
app.register_blueprint(sensors_bp,   url_prefix="/api/sensors")
app.register_blueprint(reports_bp,   url_prefix="/api/reports")
app.register_blueprint(ecopoints_bp, url_prefix="/api/ecopoints")

<<<<<<< HEAD
@app.route("/")
def health():
    return {"status": "ok", "message": "🌳 Talking Trees API is running!"}

if __name__ == "__main__":
    print("🌳 Starting Talking Trees Backend...")
    print("📡 MongoDB:", MONGO_URI)
    print("🌐 API running at http://localhost:5000")
    app.run(debug=True, port=5000)
=======
# ── Health Check ──
@app.route("/")
def health():
    return jsonify({
        "status": "ok",
        "message": "🌳 Talking Trees API is running!"
    })

# ── Debug Route (VERY USEFUL) ──
@app.route("/api/debug/db")
def debug_db():
    if db is None:
        return jsonify({"error": "DB not connected"}), 500
    return jsonify({
        "collections": db.list_collection_names()
    })

# ── Start Server ──
if __name__ == "__main__":
    print("\n🌳 Starting Talking Trees Backend...")
    print("📡 MongoDB URI:", MONGO_URI)
    print("🌐 API running at: http://localhost:5000\n")

    app.run(host="0.0.0.0", port=5000, debug=True)
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
