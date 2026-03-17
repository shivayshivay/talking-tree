# 🌳 Talking Trees — Backend (Flask + MongoDB)

## Stack
- **Python 3.10+** + **Flask** — REST API server
- **MongoDB** — stores reports, eco points, sensor history
- **flask-cors** — allows frontend to call the API

## Folder Structure
```
backend/
├── app.py                  ← Main Flask app (run this)
├── requirements.txt        ← Python packages
├── .env.example            ← Copy to .env and fill in values
└── routes/
    ├── sensors.py          ← GET /api/sensors/
    ├── reports.py          ← GET/POST /api/reports/
    └── ecopoints.py        ← GET/POST /api/ecopoints/
```

## Setup & Run

### Step 1 — Install Python packages
```bash
cd backend
pip install -r requirements.txt
```

### Step 2 — Configure environment
```bash
cp .env.example .env
# Edit .env and set your MONGO_URI
```

### Step 3 — Start MongoDB
```bash
# If using local MongoDB:
mongod

# If using MongoDB Atlas — just set MONGO_URI in .env
```

### Step 4 — Run the Flask server
```bash
python app.py
```
Server runs at **http://localhost:5000**

---

## API Endpoints

### Sensors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sensors/` | All tree sensor readings |
| GET | `/api/sensors/<tree_id>` | One tree's reading |
| GET | `/api/sensors/history/<tree_id>` | Last 20 readings |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/` | All reports |
| POST | `/api/reports/` | Submit new report |
| PATCH | `/api/reports/<id>` | Update status |
| GET | `/api/reports/stats` | Summary counts |

### Eco Points
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ecopoints/leaderboard?category=users` | Top 10 leaderboard |
| POST | `/api/ecopoints/add` | Award points for action |
| GET | `/api/ecopoints/user/<username>` | User score + rank |

---

## Points System
| Action | Points |
|--------|--------|
| scan_tree | +20 |
| ask_question | +10 |
| submit_report | +30 |
| leaf_scan | +25 |
| daily_visit | +15 |

## Tree IDs
| ID | Tree | Location |
|----|------|----------|
| IBS-001 | Mango Tree | Izee Business School |
| WF-012 | Coconut Palm | Bangalore Waterfront |
| LB-007 | Indian Oak | Lalbagh |
| MG-023 | Ashoka Tree | MG Road |
| NC-008 | Neem Tree | North Cubbon |
| CB-012 | Rain Tree | Cubbon Park |
| UL-003 | Peepal Tree | Ulsoor Lake |
