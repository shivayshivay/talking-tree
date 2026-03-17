# 🌳 Talking Trees — Smart City AI & IoT Demo

An interactive web app that lets trees "talk" to people using AI-generated voices, IoT sensor data, and real-time environmental information.

## 🚀 How to Run

1. **Unzip** the project folder
2. **Open `index.html`** in Chrome or Safari
   - No server needed — runs entirely in the browser!
   - For best voice experience, use **Google Chrome**

## 🌟 Features

| Tab | Feature |
|-----|---------|
| 🌳 Tree Talk | Chat with 4 trees — every response auto-speaks with AI voice |
| 🗺️ City Map | Bengaluru map with 7 tree markers + live health popups |
| 🌦️ Weather Mood | Trees speak in mood based on current weather conditions |
| 🧮 Carbon Calc | Personal footprint calculator with tree offset planner |
| 📢 Community | Report tree issues, earn Eco Points |
| 🍃 Leaf AI | Upload leaf photo for AI disease diagnosis |
| 🏆 Leaderboard | Schools & users competing for eco points |

## 🤖 Enabling Real AI Leaf Analysis

To use real Claude AI for leaf analysis:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Open `js/leafAI.js`
3. Replace `YOUR_API_KEY_HERE` with your actual key:
   ```js
   const ANTHROPIC_API_KEY = 'sk-ant-...your-key...';
   ```

> **Note:** The demo leaf samples (Healthy, Yellowing, Pest, Fungal) work without an API key.

## 🛠️ Technologies

- **Frontend:** Pure HTML5, CSS3, JavaScript (no frameworks)
- **AI Voice:** Web Speech API (browser built-in Text-to-Speech)
- **AI Vision:** Anthropic Claude API (for leaf analysis)
- **IoT Data:** Simulated real-time sensor data (updates every 5 seconds)
- **QR Integration:** Each tree links via QR code to its profile

## 📁 Project Structure

```
talking-trees/
├── index.html          ← Main app (open this!)
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── data.js         ← Tree data, marker data, demo content
│   ├── speech.js       ← Voice/TTS engine
│   ├── treeTalk.js     ← Tree chat + sensor simulation
│   ├── map.js          ← City map markers
│   ├── weather.js      ← Weather mood + voice moods
│   ├── carbon.js       ← Carbon footprint calculator
│   ├── community.js    ← Report submission + feed
│   ├── leafAI.js       ← Leaf disease AI analysis
│   ├── leaderboard.js  ← Eco points leaderboard
│   └── app.js          ← App initialization
└── README.md
```

## 💡 Presentation Tips

1. **Start on Tree Talk** — switch trees to show different voices and personalities
2. **Ask questions** like "tell me about your health" or "how much carbon do you absorb?"
3. **Go to Weather Mood** — hit "Hear All Trees Talk" for the most impressive demo
4. **Show the Carbon Calculator** — drag sliders and watch the tree count change live
5. **Upload a leaf photo** on Leaf AI — or use the demo samples for instant results
6. **Submit a community report** to show the civic engagement feature

## 🌍 Impact

- Raises environmental awareness through storytelling
- Supports smart city initiatives in Bengaluru
- Gamifies sustainability education for schools
- Provides municipal tree health monitoring

---
Built with 💚 for Bengaluru's urban forest
