"""
Community Reports Routes
Handles tree issue reports submitted by users.
Stored permanently in MongoDB.
"""

from flask import Blueprint, jsonify, request, current_app
from datetime import datetime, timezone
from bson import ObjectId

reports_bp = Blueprint("reports", __name__)

VALID_ISSUE_TYPES = [
    "Leaves yellowing / disease",
    "Broken branch",
    "Pest infestation",
    "Construction damage",
    "Needs watering",
    "Vandalism / littering",
]

VALID_SEVERITIES = ["low", "medium", "high"]


def serialize(doc: dict) -> dict:
    """Convert MongoDB ObjectId to string for JSON serialization."""
    doc["_id"] = str(doc["_id"])
    return doc


@reports_bp.route("/", methods=["GET"])
def get_reports():
    """GET /api/reports — fetch all reports, newest first"""
    db      = current_app.config["DB"]
    status  = request.args.get("status")   # optional filter: open/review/resolved
    tree_id = request.args.get("tree_id")  # optional filter by tree

    query = {}
    if status:   query["status"]  = status
    if tree_id:  query["tree_id"] = tree_id

    docs = list(
        db.reports
        .find(query)
        .sort("created_at", -1)
        .limit(50)
    )
    return jsonify({"success": True, "count": len(docs), "data": [serialize(d) for d in docs]})


@reports_bp.route("/", methods=["POST"])
def submit_report():
    """POST /api/reports — submit a new tree issue report"""
    db   = current_app.config["DB"]
    body = request.get_json()

    # Validate required fields
    required = ["tree_id", "tree_name", "issue_type", "severity", "reporter_name"]
    for field in required:
        if not body.get(field):
            return jsonify({"success": False, "error": f"Missing field: {field}"}), 400

    if body["severity"] not in VALID_SEVERITIES:
        return jsonify({"success": False, "error": "severity must be low / medium / high"}), 400

    report = {
        "tree_id":       body["tree_id"],
        "tree_name":     body["tree_name"],
        "issue_type":    body["issue_type"],
        "severity":      body["severity"],
        "description":   body.get("description", ""),
        "reporter_name": body["reporter_name"],
        "status":        "open",
        "created_at":    datetime.now(timezone.utc).isoformat(),
        "updated_at":    datetime.now(timezone.utc).isoformat(),
    }

    result = db.reports.insert_one(report)
    report["_id"] = str(result.inserted_id)

    # Award eco points to the reporter
    db.eco_points.update_one(
        {"username": body["reporter_name"]},
        {
            "$inc":  {"points": 30},
            "$set":  {"last_active": datetime.now(timezone.utc).isoformat()},
            "$setOnInsert": {"username": body["reporter_name"], "created_at": datetime.now(timezone.utc).isoformat()}
        },
        upsert=True
    )

    return jsonify({"success": True, "message": "Report submitted! +30 eco points awarded.", "data": report}), 201


@reports_bp.route("/<report_id>", methods=["PATCH"])
def update_report_status(report_id):
    """PATCH /api/reports/<id> — update report status (open/review/resolved)"""
    db     = current_app.config["DB"]
    body   = request.get_json()
    status = body.get("status")

    if status not in ["open", "review", "resolved"]:
        return jsonify({"success": False, "error": "status must be open / review / resolved"}), 400

    result = db.reports.update_one(
        {"_id": ObjectId(report_id)},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )

    if result.matched_count == 0:
        return jsonify({"success": False, "error": "Report not found"}), 404

    return jsonify({"success": True, "message": f"Report status updated to '{status}'"})


@reports_bp.route("/stats", methods=["GET"])
def report_stats():
    """GET /api/reports/stats — summary counts for dashboard"""
    db    = current_app.config["DB"]
    total = db.reports.count_documents({})
    open_ = db.reports.count_documents({"status": "open"})
    review= db.reports.count_documents({"status": "review"})
    done  = db.reports.count_documents({"status": "resolved"})

    return jsonify({
        "success": True,
        "data": {"total": total, "open": open_, "under_review": review, "resolved": done}
    })
