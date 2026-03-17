// ── TREE DATA ──
// ── TREE PHOTOS (Wikimedia public domain) ──
const TREE_PHOTOS = {
  "IBS-001": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg",
  "WF-012":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coconut_palm_at_Kovalam.jpg/320px-Coconut_palm_at_Kovalam.jpg",
  "LB-007":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Barringtonia_acutangula_flowers.jpg/320px-Barringtonia_acutangula_flowers.jpg",
  "MG-023":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Saraca_asoca_flowers.jpg/320px-Saraca_asoca_flowers.jpg",
  "IBS-002":  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Neem_leaves.jpg/320px-Neem_leaves.jpg",
  "IBS-003":  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ficus_religiosa_in_Nijmegen.jpg/320px-Ficus_religiosa_in_Nijmegen.jpg",
  "JIG-001":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Samanea_saman_in_Kerala.jpg/320px-Samanea_saman_in_Kerala.jpg",
  "JIG-002":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Delonix_regia2.jpg/320px-Delonix_regia2.jpg",
  "JIG-003":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ficus_benghalensis_-_Banyan_tree_in_Kolkata.jpg/320px-Ficus_benghalensis_-_Banyan_tree_in_Kolkata.jpg",
  "CAC-001":  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Saraca_asoca_flowers.jpg/320px-Saraca_asoca_flowers.jpg",
  "CAC-002":  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coconut_palm_at_Kovalam.jpg/320px-Coconut_palm_at_Kovalam.jpg",
  "CAC-003":  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Barringtonia_acutangula_flowers.jpg/320px-Barringtonia_acutangula_flowers.jpg",
};

const TREES = [
  {
    emoji: '🥭', name: 'Mango Tree', latin: 'Mangifera indica',
    age: '🎂 Est. age: 85 yrs · 22 kg CO₂/yr',
    greeting: "Namaste! I am the Mango Tree of Izee Business School. I have stood in this campus for decades, watching students come and go, dream and grow. My roots run deep into this soil, and my canopy has sheltered many great minds. I am proud to be part of your college family. Ask me anything!",
    responses: {
      health: "I am doing well today! My soil moisture is healthy and my canopy is full and green. The students here take good care of me. I feel strong and thriving on this campus!",
      carbon: "Every year I absorb about twenty two kilograms of carbon dioxide. I also release fresh oxygen that the students and faculty of Izee Business School breathe every single day!",
      water: "I love the monsoon season! My roots drink deeply and I reward everyone with sweet mangoes. Right now my moisture levels are just right for healthy growth.",
      age: "I have been standing on this campus for eighty five years! I have seen generations of students pass through Izee Business School. I carry their memories in every ring of my trunk.",
      species: "I am Mangifera indica — the King of Fruits! India is the largest producer of mangoes in the world. I am a symbol of prosperity, love, and the spirit of this great nation.",
      benefit: "My dense canopy provides cooling shade for students studying outdoors. My fruit nourishes birds and wildlife. My roots prevent soil erosion and I purify the air around this campus daily.",
      default: "I am the heart of Izee Business School's campus! Ask me about my health, carbon absorption, age, species, or the benefits I bring to your college!"
    }
  },
  {
    emoji: '🌴', name: 'Coconut Palm', latin: 'Cocos nucifera',
    age: '🎂 Est. age: 32 yrs · 15 kg CO₂/yr',
    greeting: "Hello there! I am the Coconut Palm by the Bangalore Waterfront. I love this sunny weather! Every part of me is useful — from my fruit to my leaves to my trunk. Ask me anything!",
    responses: {
      health: "I am thriving! Sunlight is excellent and moisture is balanced. I produce coconuts every month to nourish wildlife and people!",
      carbon: "I absorb around fifteen kilograms of carbon per year. But my real superpower is transpiration — I release cool water vapour, naturally air conditioning my surroundings!",
      water: "I prefer sandy, well-draining soil. Too much moisture makes me unhappy. Today's readings are just right!",
      species: "I am Cocos nucifera, the tree of life! Every single part of me is useful — my fruit, my leaves for thatching, my trunk for timber, my husk for coir!",
      benefit: "My fronds provide shade, my roots prevent soil erosion, and my fruit provides nutrition for humans and animals alike. I am truly the tree of life!",
      default: "I am a tropical treasure! Ask me about my health, carbon absorption, water needs, or the benefits I bring!"
    }
  },
  {
    emoji: '🎋', name: 'Indian Oak', latin: 'Barringtonia acutangula',
    age: '🎂 Est. age: 55 yrs · 18 kg CO₂/yr',
    greeting: "Greetings, friend. I am the Indian Oak, silent guardian of this water body. My flowers bloom at night, attracting bats and moths for pollination. Without insects and nocturnal creatures, forests like mine cannot survive. Let us talk about biodiversity!",
    responses: {
      health: "Air quality is slightly elevated today, AQI sixty seven, so I am working hard to filter particulates through my broad canopy. I will protect this neighbourhood.",
      carbon: "I store eighteen kilograms of carbon annually. But I also support forty species of birds and insects. Biodiversity is my carbon multiplier!",
      water: "I love water bodies! My roots help stabilise the banks of lakes and rivers, preventing erosion and keeping the water clean.",
      species: "I am Barringtonia acutangula, the Indian Oak. I am found near water bodies across South Asia and bloom with beautiful pink flowers every monsoon season.",
      benefit: "I stabilise riverbeds, filter runoff water, and provide habitat for aquatic birds. I am a keystone species for freshwater ecosystems.",
      default: "The Indian Oak knows the secret language of the forest. Ask me about biodiversity, health, carbon, or water!"
    }
  },
  {
    emoji: '🌲', name: 'Ashoka Tree', latin: 'Saraca asoca',
    age: '🎂 Est. age: 70 yrs · 19 kg CO₂/yr',
    greeting: "Peace be upon you. I am the Ashoka — tree of sacred groves and ancient temples. My crimson flowers bloom in February, painting the city red. In your fast cities, I offer stillness. Come, breathe with me.",
    responses: {
      health: "My vitals are strong today. Temperature is comfortable, moisture is balanced, and the air quality is acceptable. I am at peace, and I am well.",
      carbon: "I absorb nineteen kilograms of carbon each year and my dense foliage reduces the urban heat island effect by up to two degrees Celsius around me. Imagine a city full of Ashokas!",
      water: "My roots are deep and efficient. I draw groundwater during dry seasons and release it slowly, balancing the local water table.",
      species: "I am Saraca asoca, sacred in Hinduism, Buddhism and Jainism. Sita rested beneath an Ashoka tree in Lanka. I carry centuries of spiritual history.",
      benefit: "Beyond carbon, I reduce noise pollution by up to five decibels, lower ambient temperature, and my flowers attract hundreds of pollinators every season.",
      default: "The Ashoka tree has been a symbol of peace for millennia. Ask me about my health, heritage, carbon, or the benefits I bring to this city!"
    }
  }
];

// ── MAP MARKER DATA — Real GPS Coordinates ──
const MAP_MARKERS = [
  // ── Izee Business School (Jigani) ──
  { id:'IBS-001', name:'Mango Tree',    location:'Izee Business School, Jigani',         lat:12.7799, lng:77.6481, health:'good', temp:27, moist:68, aqi:42, co2:'22 kg/yr', species:'Mangifera indica',      age:'85 yrs', emoji:'🥭' },
  { id:'IBS-002', name:'Neem Tree',     location:'Izee Business School, Jigani',         lat:12.7802, lng:77.6485, health:'good', temp:28, moist:61, aqi:38, co2:'17 kg/yr', species:'Azadirachta indica',    age:'40 yrs', emoji:'🌿' },
  { id:'IBS-003', name:'Peepal Tree',   location:'Izee Business School, Jigani',         lat:12.7796, lng:77.6478, health:'warn', temp:33, moist:35, aqi:65, co2:'20 kg/yr', species:'Ficus religiosa',       age:'60 yrs', emoji:'🌳' },
  // ── Jigani Industrial Area ──
  { id:'JIG-001', name:'Rain Tree',     location:'Jigani Industrial Area, Bangalore',    lat:12.7990, lng:77.6650, health:'good', temp:29, moist:58, aqi:55, co2:'25 kg/yr', species:'Samanea saman',         age:'35 yrs', emoji:'🌲' },
  { id:'JIG-002', name:'Gulmohar',      location:'Jigani Industrial Area, Bangalore',    lat:12.7985, lng:77.6658, health:'warn', temp:34, moist:30, aqi:74, co2:'14 kg/yr', species:'Delonix regia',         age:'28 yrs', emoji:'🌸' },
  { id:'JIG-003', name:'Banyan Tree',   location:'Jigani Industrial Area, Bangalore',    lat:12.7994, lng:77.6643, health:'good', temp:28, moist:65, aqi:50, co2:'22 kg/yr', species:'Ficus benghalensis',    age:'70 yrs', emoji:'🌳' },
  // ── Christ Academy, Begur Koppa Road ──
  { id:'CAC-001', name:'Ashoka Tree',   location:'Christ Academy, Begur Koppa Road',     lat:12.8244, lng:77.6209, health:'good', temp:27, moist:70, aqi:40, co2:'19 kg/yr', species:'Saraca asoca',          age:'50 yrs', emoji:'🌲' },
  { id:'CAC-002', name:'Coconut Palm',  location:'Christ Academy, Begur Koppa Road',     lat:12.8248, lng:77.6214, health:'good', temp:30, moist:55, aqi:44, co2:'15 kg/yr', species:'Cocos nucifera',        age:'32 yrs', emoji:'🌴' },
  { id:'CAC-003', name:'Indian Oak',    location:'Christ Academy, Begur Koppa Road',     lat:12.8240, lng:77.6205, health:'bad',  temp:32, moist:22, aqi:58, co2:'18 kg/yr', species:'Barringtonia acutangula','age':'55 yrs', emoji:'🎋' },
];

// ── LEADERBOARD DATA ──
const LB_DATA = {
  schools: [
    { name: 'National Public School', meta: 'Indiranagar · 342 scans', pts: 8420, avatar: '🏫', badge: 'Eco Champion' },
    { name: 'Baldwin Boys School', meta: 'Frazer Town · 280 scans', pts: 7105, avatar: '🌿', badge: 'Tree Guardian' },
    { name: 'St. Joseph\'s Boys School', meta: 'MG Road · 265 scans', pts: 6890, avatar: '🌳', badge: 'Green Hero' },
    { name: 'DPS Bangalore North', meta: 'Hebbal · 210 scans', pts: 5430, avatar: '🌱', badge: 'Eco Warrior' },
    { name: 'Vidya Niketan School', meta: 'Jayanagar · 198 scans', pts: 4960, avatar: '🍃', badge: 'Tree Friend' },
  ],
  users: [
    { name: 'Priya Sharma', meta: 'Cubbon Park area · 94 trees', pts: 3840, avatar: '👩', badge: 'Top Reporter' },
    { name: 'Arjun Reddy', meta: 'Lalbagh area · 87 trees', pts: 3520, avatar: '👨', badge: 'Leaf Scanner' },
    { name: 'Divya Nair', meta: 'Ulsoor area · 76 trees', pts: 3120, avatar: '👩', badge: 'Green Voice' },
    { name: 'Kiran Patel', meta: 'Koramangala · 68 trees', pts: 2790, avatar: '👦', badge: 'Eco Scout' },
    { name: 'Meena Krishnan', meta: 'Whitefield · 60 trees', pts: 2450, avatar: '👧', badge: 'Tree Lover' },
  ],
  zones: [
    { name: 'Cubbon Park Zone', meta: '12 trees · 95% healthy', pts: 12400, avatar: '🌳', badge: 'Greenest Zone' },
    { name: 'Lalbagh Zone', meta: '9 trees · 89% healthy', pts: 9850, avatar: '🌺', badge: 'Biodiversity Hub' },
    { name: 'Ulsoor Lake Zone', meta: '8 trees · 85% healthy', pts: 8200, avatar: '💧', badge: 'Water Guardian' },
    { name: 'MG Road Zone', meta: '11 trees · 78% healthy', pts: 6700, avatar: '🏙️', badge: 'Urban Green' },
    { name: 'Koramangala Zone', meta: '7 trees · 71% healthy', pts: 5100, avatar: '🌿', badge: 'Rising Zone' },
  ]
};

// ── COMMUNITY REPORTS SEED DATA ──
const SEED_REPORTS = [
  { icon: '🍂', title: 'Yellowing leaves on Peepal', tree: 'MG Road — Tree #MG-005', time: '2 hours ago', status: 'rs-open', statusText: 'Open' },
  { icon: '🪵', title: 'Broken branch after storm', tree: 'Cubbon Park — Tree #CB-012', time: 'Yesterday', status: 'rs-review', statusText: 'Under Review' },
  { icon: '💧', title: 'Needs urgent watering', tree: 'Lalbagh — Tree #LB-003', time: '3 days ago', status: 'rs-done', statusText: 'Resolved' },
  { icon: '🐛', title: 'Pest infestation on Neem', tree: 'North Cubbon — Tree #NC-008', time: '5 days ago', status: 'rs-review', statusText: 'Under Review' },
];

// ── DEMO LEAF RESULTS ──
const DEMO_LEAVES = {
  healthy: {
    emoji: '✅', status: 'Healthy Leaf',
    diagnosis: 'This leaf shows excellent health with vibrant green coloration, no discoloration, and an intact surface. The cellular structure appears strong with good moisture content and no signs of stress.',
    confidence: 94,
    tips: ['Continue regular watering schedule', 'Ensure 6+ hours of direct sunlight daily']
  },
  yellow: {
    emoji: '⚠️', status: 'Chlorosis Detected',
    diagnosis: 'The yellowing pattern indicates chlorosis, likely due to iron or nitrogen deficiency. The leaf veins remain green while the tissue between has lost pigment — a classic sign of micronutrient deficiency.',
    confidence: 87,
    tips: ['Apply iron chelate fertiliser to the soil', 'Check soil pH — should be between 6.0 and 7.0 for nutrient uptake']
  },
  pest: {
    emoji: '🐛', status: 'Pest Damage',
    diagnosis: 'Multiple irregular holes and chewed edges indicate caterpillar or beetle feeding damage. The damage pattern suggests nocturnal feeding. Immediate treatment is recommended to prevent spread to nearby trees.',
    confidence: 91,
    tips: ['Apply neem oil spray on leaves in the evening', 'Inspect nearby trees for infestation spread']
  },
  fungal: {
    emoji: '🍄', status: 'Fungal Infection',
    diagnosis: 'Brown circular spots with yellow halos indicate fungal leaf spot disease, possibly Cercospora or Alternaria species. High humidity and poor air circulation are likely causes of this infection.',
    confidence: 89,
    tips: ['Remove and dispose of infected leaves immediately', 'Apply copper-based fungicide every 10 days for 3 weeks']
  }
};
