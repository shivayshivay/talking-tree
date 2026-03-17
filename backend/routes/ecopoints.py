"""
Eco Points & Leaderboard Routes
Tracks user eco points and returns ranked leaderboards.
"""

from flask import Blueprint, jsonify, request, current_app
from datetime import datetime, timezone

ecopoints_bp = Blueprint("ecopoints", __name__)

# Points awarded per action
POINTS_MAP = {
    "scan_tree":       20,
    "ask_question":    10,
    "submit_report":   30,
    "leaf_scan":       25,
    "daily_visit":     15,
}


@ecopoints_bp.route("/leaderboard", methods=["GET"])
def leaderboard():
    """GET /api/ecopoints/leaderboard — top 10 users by points"""
    db       = current_app.config["DB"]
    category = request.args.get("category", "users")  # users / schools / zones

    # Seed demo data if collection is empty
    if db.eco_points.count_documents({}) == 0:
        _seed_demo_data(db)

    top = list(
        db.eco_points
        .find({"category": category}, {"_id": 0})
        .sort("points", -1)
        .limit(10)
    )

    return jsonify({"success": True, "category": category, "leaderboard": top})


@ecopoints_bp.route("/add", methods=["POST"])
def add_points():
    """POST /api/ecopoints/add — award points for an action"""
    db   = current_app.config["DB"]
    body = request.get_json()

    username = body.get("username")
    action   = body.get("action")

    if not username or not action:
        return jsonify({"success": False, "error": "username and action are required"}), 400

    if action not in POINTS_MAP:
        return jsonify({"success": False, "error": f"Unknown action. Valid: {list(POINTS_MAP.keys())}"}), 400

    pts = POINTS_MAP[action]

    result = db.eco_points.find_one_and_update(
        {"username": username, "category": "users"},
        {
            "$inc":  {"points": pts, "actions_count": 1},
            "$set":  {"last_active": datetime.now(timezone.utc).isoformat()},
            "$setOnInsert": {
                "username":   username,
                "category":   "users",
                "avatar":     "🌱",
                "badge":      "Eco Newcomer",
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        },
        upsert=True,
        return_document=True
    )

    # Update badge based on points
    new_points = result["points"] if result else pts
    badge = _get_badge(new_points)
    db.eco_points.update_one({"username": username}, {"$set": {"badge": badge}})

    return jsonify({
        "success":    True,
        "username":   username,
        "action":     action,
        "points_earned": pts,
        "total_points":  new_points,
        "badge":      badge,
    })


@ecopoints_bp.route("/user/<username>", methods=["GET"])
def get_user(username):
    """GET /api/ecopoints/user/<username> — get a user's score and rank"""
    db   = current_app.config["DB"]
    user = db.eco_points.find_one({"username": username, "category": "users"}, {"_id": 0})

    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404

    # Calculate rank
    rank = db.eco_points.count_documents(
        {"category": "users", "points": {"$gt": user["points"]}}
    ) + 1

    user["rank"] = rank
    return jsonify({"success": True, "data": user})


def _get_badge(points: int) -> str:
    if points >= 5000: return "Eco Champion 🏆"
    if points >= 2000: return "Tree Guardian 🌳"
    if points >= 1000: return "Green Hero 🌿"
    if points >= 500:  return "Eco Warrior ⚔️"
    if points >= 100:  return "Tree Friend 🌱"
    return "Eco Newcomer 🌾"


def _seed_demo_data(db):
    """Seed leaderboard with demo entries so it's not empty on first run."""
    now = datetime.now(timezone.utc).isoformat()
    demo_users = [
        {"username":"Priya Sharma",    "category":"users",   "points":3840, "avatar":"👩", "badge":"Tree Guardian 🌳",   "actions_count":192, "last_active":now, "created_at":now},
        {"username":"Arjun Reddy",     "category":"users",   "points":3520, "avatar":"👨", "badge":"Tree Guardian 🌳",   "actions_count":176, "last_active":now, "created_at":now},
        {"username":"Divya Nair",      "category":"users",   "points":3120, "avatar":"👩", "badge":"Green Hero 🌿",      "actions_count":156, "last_active":now, "created_at":now},
        {"username":"Kiran Patel",     "category":"users",   "points":2790, "avatar":"👦", "badge":"Green Hero 🌿",      "actions_count":139, "last_active":now, "created_at":now},
        {"username":"Meena Krishnan",  "category":"users",   "points":2450, "avatar":"👧", "badge":"Green Hero 🌿",      "actions_count":122, "last_active":now, "created_at":now},
    ]
    demo_schools = [
        {"username":"National Public School",  "category":"schools", "points":8420, "avatar":"🏫", "badge":"Eco Champion 🏆",    "actions_count":421, "last_active":now, "created_at":now},
        {"username":"Baldwin Boys School",     "category":"schools", "points":7105, "avatar":"🌿", "badge":"Eco Champion 🏆",    "actions_count":355, "last_active":now, "created_at":now},
        {"username":"St. Joseph's School",     "category":"schools", "points":6890, "avatar":"🌳", "badge":"Tree Guardian 🌳",   "actions_count":344, "last_active":now, "created_at":now},
        {"username":"Izee Business School",    "category":"schools", "points":5200, "avatar":"🥭", "badge":"Tree Guardian 🌳",   "actions_count":260, "last_active":now, "created_at":now},
        {"username":"DPS Bangalore North",     "category":"schools", "points":4960, "avatar":"🌱", "badge":"Green Hero 🌿",      "actions_count":248, "last_active":now, "created_at":now},
    ]
    demo_zones = [
        {"username":"Cubbon Park Zone",  "category":"zones", "points":12400, "avatar":"🌳", "badge":"Eco Champion 🏆",  "actions_count":620, "last_active":now, "created_at":now},
        {"username":"Lalbagh Zone",      "category":"zones", "points":9850,  "avatar":"🌺", "badge":"Eco Champion 🏆",  "actions_count":492, "last_active":now, "created_at":now},
        {"username":"Ulsoor Lake Zone",  "category":"zones", "points":8200,  "avatar":"💧", "badge":"Tree Guardian 🌳", "actions_count":410, "last_active":now, "created_at":now},
        {"username":"MG Road Zone",      "category":"zones", "points":6700,  "avatar":"🏙️", "badge":"Tree Guardian 🌳", "actions_count":335, "last_active":now, "created_at":now},
        {"username":"Koramangala Zone",  "category":"zones", "points":5100,  "avatar":"🌿", "badge":"Green Hero 🌿",    "actions_count":255, "last_active":now, "created_at":now},
    ]
    db.eco_points.insert_many(demo_users + demo_schools + demo_zones)
