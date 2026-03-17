"""
IoT Sensor Routes
Simulates real-time sensor readings for each tree.
In production: replace simulate_sensor() with actual IoT device data.
"""

from flask import Blueprint, jsonify, current_app
from datetime import datetime, timezone
import random
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

    temp     = round(rng.uniform(22, 38), 1)
    moisture = round(rng.uniform(20, 85), 1)
    aqi      = round(rng.uniform(15, 95), 1)
    sunlight = round(rng.uniform(1.5, 12.0), 2)
    humidity = round(rng.uniform(40, 90), 1)

    # Derive health status
    if moisture < 30 or aqi > 80:
        health = "stressed"
    elif moisture < 45 or aqi > 60 or temp > 35:
        health = "moderate"
    else:
        health = "healthy"

    return {
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
    result = []

    for tree in TREES:
        reading = simulate_sensor(tree["id"])
        reading.update({"tree_id": tree["id"], "tree_name": tree["name"], "location": tree["location"]})

        # Store latest reading in MongoDB
        db.sensor_readings.update_one(
            {"tree_id": tree["id"]},
            {"$set": reading},
            upsert=True
        )
        result.append(reading)

    return jsonify({"success": True, "data": result})


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

    return jsonify({"success": True, "data": reading})


@sensors_bp.route("/history/<tree_id>", methods=["GET"])
def sensor_history(tree_id):
    """GET /api/sensors/history/<tree_id> — last 20 readings from DB"""
    db   = current_app.config["DB"]
    docs = list(
        db.sensor_history
        .find({"tree_id": tree_id}, {"_id": 0})
        .sort("timestamp", -1)
        .limit(20)
    )
    return jsonify({"success": True, "tree_id": tree_id, "history": docs})
