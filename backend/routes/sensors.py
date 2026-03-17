"""
IoT Sensor Routes
Simulates real-time sensor readings for each tree.
<<<<<<< HEAD
In production: replace simulate_sensor() with actual IoT device data.
=======
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
"""

from flask import Blueprint, jsonify, current_app
from datetime import datetime, timezone
import random
<<<<<<< HEAD
import math

sensors_bp = Blueprint("sensors", __name__)

# Tree registry — matches frontend tree order
TREES = [
    {"id": "IBS-001", "name": "Mango Tree",    "location": "Izee Business School", "species": "Mangifera indica"},
    {"id": "WF-012",  "name": "Coconut Palm",  "location": "Bangalore Waterfront",  "species": "Cocos nucifera"},
    {"id": "LB-007",  "name": "Indian Oak",    "location": "Lalbagh",               "species": "Barringtonia acutangula"},
    {"id": "MG-023",  "name": "Ashoka Tree",   "location": "MG Road",               "species": "Saraca asoca"},
    {"id": "NC-008",  "name": "Neem Tree",     "location": "North Cubbon",          "species": "Azadirachta indica"},
    {"id": "CB-012",  "name": "Rain Tree",     "location": "Cubbon Park",           "species": "Samanea saman"},
    {"id": "UL-003",  "name": "Peepal Tree",   "location": "Ulsoor Lake",           "species": "Ficus religiosa"},
]


def simulate_sensor(tree_id: str) -> dict:
    """
    Simulates realistic IoT sensor readings.
    Replace this function body with actual hardware/MQTT data in production.
    """
    # Use tree_id as seed for consistent-ish values per tree
    seed = sum(ord(c) for c in tree_id)
    rng  = random.Random(seed + int(datetime.now().timestamp() / 30))  # changes every 30s
=======

sensors_bp = Blueprint("sensors", __name__)

# 🌳 TREE REGISTRY (CLEAN + CONSISTENT)
TREES = [
    # Izee Business School
    {"id": "IBS-001", "name": "Mango Tree 🥭",  "location": "Izee Business School", "species": "Mangifera indica"},
    {"id": "IBS-002", "name": "Neem Tree 🌿",   "location": "Izee Business School", "species": "Azadirachta indica"},
    {"id": "IBS-003", "name": "Peepal Tree 🌳", "location": "Izee Business School", "species": "Ficus religiosa"},

    # Jigani
    {"id": "JIG-001", "name": "Rain Tree 🌲",   "location": "Jigani Industrial Area", "species": "Samanea saman"},
    {"id": "JIG-002", "name": "Gulmohar 🌸",    "location": "Jigani Industrial Area", "species": "Delonix regia"},
    {"id": "JIG-003", "name": "Banyan Tree 🌳", "location": "Jigani Industrial Area", "species": "Ficus benghalensis"},

    # Christ Academy
    {"id": "CA-001", "name": "Ashoka Tree 🌲",  "location": "Christ Academy", "species": "Saraca asoca"},
    {"id": "CA-002", "name": "Coconut Palm 🌴", "location": "Christ Academy", "species": "Cocos nucifera"},
    {"id": "CA-003", "name": "Indian Oak 🎋",   "location": "Christ Academy", "species": "Barringtonia acutangula"},
]


# 🌡️ SENSOR SIMULATION
def simulate_sensor(tree_id: str) -> dict:
    seed = sum(ord(c) for c in tree_id)
    rng = random.Random(seed + int(datetime.now().timestamp() / 30))
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)

    temp     = round(rng.uniform(22, 38), 1)
    moisture = round(rng.uniform(20, 85), 1)
    aqi      = round(rng.uniform(15, 95), 1)
    sunlight = round(rng.uniform(1.5, 12.0), 2)
    humidity = round(rng.uniform(40, 90), 1)

<<<<<<< HEAD
    # Derive health status
=======
    # 🌿 HEALTH LOGIC
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    if moisture < 30 or aqi > 80:
        health = "stressed"
    elif moisture < 45 or aqi > 60 or temp > 35:
        health = "moderate"
    else:
        health = "healthy"

    return {
<<<<<<< HEAD
        "temperature":   temp,
        "soil_moisture": moisture,
        "aqi":           aqi,
        "sunlight_klux": sunlight,
        "humidity":      humidity,
        "health_status": health,
        "timestamp":     datetime.now(timezone.utc).isoformat(),
    }


@sensors_bp.route("/", methods=["GET"])
def all_sensors():
    """GET /api/sensors — returns live readings for all trees"""
    db     = current_app.config["DB"]
=======
        "temperature": temp,
        "soil_moisture": moisture,
        "aqi": aqi,
        "sunlight_klux": sunlight,
        "humidity": humidity,
        "health_status": health,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# 🌍 GET ALL TREES
@sensors_bp.route("/", methods=["GET"])
def all_sensors():
    db = current_app.config.get("DB")
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    result = []

    for tree in TREES:
        reading = simulate_sensor(tree["id"])
<<<<<<< HEAD
        reading.update({"tree_id": tree["id"], "tree_name": tree["name"], "location": tree["location"]})

        # Store latest reading in MongoDB
        db.sensor_readings.update_one(
            {"tree_id": tree["id"]},
            {"$set": reading},
            upsert=True
        )
=======

        reading.update({
            "tree_id": tree["id"],
            "tree_name": tree["name"],
            "location": tree["location"],
            "species": tree["species"]
        })

        if db:
            db.sensor_readings.update_one(
                {"tree_id": tree["id"]},
                {"$set": reading},
                upsert=True
            )

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
        result.append(reading)

    return jsonify({"success": True, "data": result})


<<<<<<< HEAD
@sensors_bp.route("/<tree_id>", methods=["GET"])
def tree_sensor(tree_id):
    """GET /api/sensors/<tree_id> — returns live reading for one tree"""
    tree = next((t for t in TREES if t["id"] == tree_id), None)
    if not tree:
        return jsonify({"success": False, "error": "Tree not found"}), 404

    db      = current_app.config["DB"]
    reading = simulate_sensor(tree_id)
    reading.update({"tree_id": tree["id"], "tree_name": tree["name"],
                    "location": tree["location"], "species": tree["species"]})

    db.sensor_readings.update_one(
        {"tree_id": tree_id},
        {"$set": reading},
        upsert=True
    )
=======
# 🌳 GET SINGLE TREE
@sensors_bp.route("/<tree_id>", methods=["GET"])
def tree_sensor(tree_id):
    tree = next((t for t in TREES if t["id"] == tree_id), None)

    if not tree:
        return jsonify({"success": False, "error": "Tree not found"}), 404

    db = current_app.config.get("DB")

    reading = simulate_sensor(tree_id)

    reading.update({
        "tree_id": tree["id"],
        "tree_name": tree["name"],
        "location": tree["location"],
        "species": tree["species"]
    })

    if db:
        db.sensor_readings.update_one(
            {"tree_id": tree_id},
            {"$set": reading},
            upsert=True
        )

        # ✅ Save history (limit growth)
        db.sensor_history.insert_one(reading)
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)

    return jsonify({"success": True, "data": reading})


<<<<<<< HEAD
@sensors_bp.route("/history/<tree_id>", methods=["GET"])
def sensor_history(tree_id):
    """GET /api/sensors/history/<tree_id> — last 20 readings from DB"""
    db   = current_app.config["DB"]
=======
# 📊 HISTORY
@sensors_bp.route("/history/<tree_id>", methods=["GET"])
def sensor_history(tree_id):
    db = current_app.config.get("DB")

    if not db:
        return jsonify({"success": False, "error": "DB not connected"}), 500

>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
    docs = list(
        db.sensor_history
        .find({"tree_id": tree_id}, {"_id": 0})
        .sort("timestamp", -1)
        .limit(20)
    )
<<<<<<< HEAD
    return jsonify({"success": True, "tree_id": tree_id, "history": docs})
=======

    return jsonify({
        "success": True,
        "tree_id": tree_id,
        "history": docs
    })


# 🔍 SEARCH TREE (NEW FEATURE)
@sensors_bp.route("/search/<name>", methods=["GET"])
def search_tree(name):
    name = name.lower()

    # 1️⃣ Local DB search
    tree = next((t for t in TREES if name in t["name"].lower()), None)

    if tree:
        return jsonify({
            "success": True,
            "source": "local_db",
            "data": tree
        })

    # 2️⃣ Fallback (AI-style response)
    return jsonify({
        "success": True,
        "source": "ai_generated",
        "data": {
            "name": name.title(),
            "scientific": "Unknown",
            "origin": "Global",
            "benefits": [
                "Produces oxygen",
                "Improves air quality",
                "Supports biodiversity"
            ]
        }
    })
>>>>>>> 0266752 (Talking Trees - Smart City AI & IoT Project)
