// ── WORLD TREES ENCYCLOPEDIA ──
const WORLD_TREES = [
  // ── INDIA ──
  { id:'wt1',  emoji:'🥭', name:'Mango',          latin:'Mangifera indica',        country:'India',     continent:'Asia',    climate:'Tropical',    height:'10–40m', lifespan:'300+ yrs', co2:'22 kg/yr', uses:'Fruit, timber, shade',    medicinal:'Digestive aid, skin care, antioxidant', fact:'National tree of Bangladesh. India produces 40% of world mangoes!', color:'#ff9800' },
  { id:'wt2',  emoji:'🌳', name:'Banyan',          latin:'Ficus benghalensis',      country:'India',     continent:'Asia',    climate:'Tropical',    height:'20–30m', lifespan:'500+ yrs', co2:'22 kg/yr', uses:'Shade, sacred, medicinal', medicinal:'Treats diabetes, skin diseases, dental issues', fact:'National tree of India. One tree can cover several acres!', color:'#388e3c' },
  { id:'wt3',  emoji:'🌿', name:'Neem',            latin:'Azadirachta indica',      country:'India',     continent:'Asia',    climate:'Tropical',    height:'15–20m', lifespan:'200 yrs',  co2:'17 kg/yr', uses:'Medicine, pesticide, timber', medicinal:'Antibacterial, antifungal, treats malaria', fact:'Called "Village Pharmacy" in India. Every part is medicinal!', color:'#2e7d32' },
  { id:'wt4',  emoji:'🌲', name:'Ashoka',          latin:'Saraca asoca',            country:'India',     continent:'Asia',    climate:'Tropical',    height:'9–12m',  lifespan:'100+ yrs', co2:'19 kg/yr', uses:'Sacred, ornamental, medicine', medicinal:'Treats menstrual disorders, pain relief', fact:'Mentioned in Ramayana. Sita sat under this tree in Lanka.', color:'#c62828' },
  { id:'wt5',  emoji:'🌴', name:'Coconut Palm',    latin:'Cocos nucifera',          country:'India',     continent:'Asia',    climate:'Tropical',    height:'20–30m', lifespan:'100 yrs',  co2:'15 kg/yr', uses:'Food, oil, timber, fibre',  medicinal:'Coconut water for hydration, oil for skin', fact:'Every part of the coconut palm is useful — called Tree of Life!', color:'#6d4c41' },
  { id:'wt6',  emoji:'🌸', name:'Gulmohar',        latin:'Delonix regia',           country:'Madagascar',continent:'Africa',  climate:'Tropical',    height:'5–12m',  lifespan:'50+ yrs',  co2:'14 kg/yr', uses:'Ornamental, shade',         medicinal:'Bark used for fever treatment', fact:'Blooms in fiery red-orange. One of the most spectacular flowering trees!', color:'#e53935' },
  { id:'wt7',  emoji:'🌳', name:'Peepal',          latin:'Ficus religiosa',         country:'India',     continent:'Asia',    climate:'Tropical',    height:'15–25m', lifespan:'3000 yrs', co2:'20 kg/yr', uses:'Sacred, medicinal, shade',  medicinal:'Treats asthma, diabetes, skin diseases', fact:'Buddha attained enlightenment under a Peepal tree!', color:'#1b5e20' },
  { id:'wt8',  emoji:'🌴', name:'Date Palm',       latin:'Phoenix dactylifera',     country:'Saudi Arabia',continent:'Asia', climate:'Arid',        height:'15–25m', lifespan:'200 yrs',  co2:'12 kg/yr', uses:'Food, timber, cultural',    medicinal:'Rich in iron, treats anaemia', fact:'Has been cultivated for 5000+ years. Symbol of peace!', color:'#f57f17' },
  // ── AMAZON / S AMERICA ──
  { id:'wt9',  emoji:'🌲', name:'Brazil Nut',      latin:'Bertholletia excelsa',    country:'Brazil',    continent:'S America',climate:'Tropical',   height:'30–50m', lifespan:'500+ yrs', co2:'45 kg/yr', uses:'Food, oil, timber',         medicinal:'High selenium, antioxidant, thyroid support', fact:'Can only be pollinated by orchid bees. Giant of the Amazon!', color:'#33691e' },
  { id:'wt10', emoji:'🌳', name:'Rubber Tree',     latin:'Hevea brasiliensis',      country:'Brazil',    continent:'S America',climate:'Tropical',   height:'20–30m', lifespan:'100 yrs',  co2:'18 kg/yr', uses:'Latex, rubber, timber',     medicinal:'Latex used in medical gloves and equipment', fact:'Natural rubber from this tree changed global industry!', color:'#558b2f' },
  { id:'wt11', emoji:'🌵', name:'Giant Cactus',    latin:'Carnegiea gigantea',      country:'USA',       continent:'N America',climate:'Desert',     height:'10–15m', lifespan:'150 yrs',  co2:'1 kg/yr',  uses:'Food, shelter for birds',   medicinal:'Fruit rich in Vitamin C', fact:'Takes 75 years to grow its first arm! Home to Gila woodpeckers.', color:'#8bc34a' },
  // ── AFRICA ──
  { id:'wt12', emoji:'🌳', name:'Baobab',          latin:'Adansonia digitata',      country:'Africa',    continent:'Africa',  climate:'Savanna',     height:'5–25m',  lifespan:'3000 yrs', co2:'10 kg/yr', uses:'Food, water storage, medicine', medicinal:'Fruit has 6x more Vitamin C than oranges!', fact:'Called Tree of Life. Can store 120,000 litres of water!', color:'#bf360c' },
  { id:'wt13', emoji:'🌴', name:'African Acacia',  latin:'Vachellia tortilis',      country:'Kenya',     continent:'Africa',  climate:'Savanna',     height:'4–7m',   lifespan:'70 yrs',   co2:'8 kg/yr',  uses:'Fodder, gum, timber',       medicinal:'Gum arabic used as medicine', fact:'Giraffes eat its leaves! Its thorns are up to 7cm long.', color:'#f9a825' },
  { id:'wt14', emoji:'🌲', name:'Olive Tree',      latin:'Olea europaea',           country:'Greece',    continent:'Europe',  climate:'Mediterranean',height:'8–15m',  lifespan:'2000 yrs', co2:'6 kg/yr',  uses:'Food, oil, wood, medicine', medicinal:'Anti-inflammatory, heart-healthy olive oil', fact:'Some olive trees are 3000 years old and still bearing fruit!', color:'#827717' },
  // ── EUROPE ──
  { id:'wt15', emoji:'🌳', name:'English Oak',     latin:'Quercus robur',           country:'UK',        continent:'Europe',  climate:'Temperate',   height:'20–40m', lifespan:'1000 yrs', co2:'22 kg/yr', uses:'Timber, acorns, medicine',  medicinal:'Bark treats inflammation, diarrhoea', fact:'Home to 500+ species of insects and wildlife. King of British trees!', color:'#4e342e' },
  { id:'wt16', emoji:'🌲', name:'Norway Spruce',   latin:'Picea abies',             country:'Norway',    continent:'Europe',  climate:'Boreal',      height:'35–55m', lifespan:'300 yrs',  co2:'30 kg/yr', uses:'Timber, Christmas tree, paper', medicinal:'Resin used for skin wounds', fact:'The world famous Christmas tree! Also the source of violin tops.', color:'#1a237e' },
  { id:'wt17', emoji:'🌸', name:'Cherry Blossom',  latin:'Prunus serrulata',        country:'Japan',     continent:'Asia',    climate:'Temperate',   height:'5–15m',  lifespan:'40 yrs',   co2:'8 kg/yr',  uses:'Ornamental, food, medicine', medicinal:'Bark treats coughs and skin ailments', fact:'Sakura — symbol of Japan. Bloom lasts only 2 weeks!', color:'#f48fb1' },
  { id:'wt18', emoji:'🌳', name:'Giant Sequoia',   latin:'Sequoiadendron giganteum',country:'USA',       continent:'N America',climate:'Temperate',  height:'50–95m', lifespan:'3200 yrs', co2:'900 kg/yr',uses:'Tourism, timber, conservation', medicinal:'Bark extract has antioxidant properties', fact:'Largest living organism on Earth by volume. Can absorb 900kg CO₂/year!', color:'#4a148c' },
  { id:'wt19', emoji:'🎋', name:'Bamboo',          latin:'Bambusa vulgaris',        country:'China',     continent:'Asia',    climate:'Tropical',    height:'10–20m', lifespan:'120 yrs',  co2:'35 kg/yr', uses:'Construction, food, paper',  medicinal:'Shoots treat inflammation', fact:'Fastest growing plant on Earth — grows 91cm per day!', color:'#558b2f' },
  { id:'wt20', emoji:'🌴', name:'Araucaria',       latin:'Araucaria araucana',      country:'Chile',     continent:'S America',climate:'Temperate',  height:'30–40m', lifespan:'1300 yrs', co2:'25 kg/yr', uses:'Seeds as food, timber',      medicinal:'Seeds high in protein and carbohydrates', fact:'Called Monkey Puzzle tree. Survived since dinosaur times!', color:'#006064' },
  { id:'wt21', emoji:'🌿', name:'Eucalyptus',      latin:'Eucalyptus globulus',     country:'Australia', continent:'Australia',climate:'Subtropical', height:'30–55m', lifespan:'250 yrs',  co2:'40 kg/yr', uses:'Oil, timber, paper, medicine', medicinal:'Treats respiratory infections, cough, antiseptic', fact:'Koalas eat almost nothing else! Oil used worldwide in medicines.', color:'#00695c' },
  { id:'wt22', emoji:'🌲', name:'Wollemi Pine',    latin:'Wollemia nobilis',        country:'Australia', continent:'Australia',climate:'Temperate',  height:'25–40m', lifespan:'1000 yrs', co2:'20 kg/yr', uses:'Conservation, ornamental',   medicinal:'Under research for medicinal compounds', fact:'Living fossil! Discovered in 1994, existed 200 million years ago!', color:'#263238' },
  { id:'wt23', emoji:'🌸', name:'Jacaranda',       latin:'Jacaranda mimosifolia',   country:'Argentina', continent:'S America',climate:'Subtropical', height:'5–15m',  lifespan:'100 yrs',  co2:'10 kg/yr', uses:'Ornamental, timber',         medicinal:'Bark used for syphilis treatment traditionally', fact:'Turns entire streets purple! Symbol of Pretoria, South Africa.', color:'#6a1b9a' },
  { id:'wt24', emoji:'🌳', name:'Maple',           latin:'Acer saccharum',          country:'Canada',    continent:'N America',climate:'Temperate',  height:'25–35m', lifespan:'400 yrs',  co2:'20 kg/yr', uses:'Syrup, timber, ornamental',  medicinal:'Bark treats eye and skin infections', fact:'National symbol of Canada. Sap makes world famous maple syrup!', color:'#bf360c' },
  { id:'wt25', emoji:'🌲', name:'Cedar of Lebanon',latin:'Cedrus libani',           country:'Lebanon',   continent:'Asia',    climate:'Mediterranean',height:'30–40m', lifespan:'2000 yrs', co2:'18 kg/yr', uses:'Timber, ornamental, sacred', medicinal:'Oil repels insects, treats skin conditions', fact:'Symbol on the Lebanese flag. Used to build Solomon\'s Temple!', color:'#4caf50' },
];

let wtFilterContinent = 'All';

function initWorldTrees() {
  buildWTFilters();
  renderWTStats();
  renderWTGrid(WORLD_TREES);
}

function buildWTFilters() {
  const continents = ['All', ...new Set(WORLD_TREES.map(t => t.continent))];
  const box = document.getElementById('wtFilters');
  box.innerHTML = '';
  continents.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'wt-filter-btn' + (c === 'All' ? ' active' : '');
    btn.textContent = c;
    btn.onclick = () => {
      wtFilterContinent = c;
      document.querySelectorAll('.wt-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterWorldTrees();
    };
    box.appendChild(btn);
  });
}

function renderWTStats() {
  const box = document.getElementById('wtStats');
  const continents = new Set(WORLD_TREES.map(t => t.continent)).size;
  const countries  = new Set(WORLD_TREES.map(t => t.country)).size;
  box.innerHTML = `
    <div class="wt-stat-pill">🌳 ${WORLD_TREES.length} Trees</div>
    <div class="wt-stat-pill">🌍 ${continents} Continents</div>
    <div class="wt-stat-pill">🏳️ ${countries} Countries</div>
  `;
}

function filterWorldTrees() {
  const q = (document.getElementById('wtSearch').value || '').toLowerCase();
  let filtered = WORLD_TREES;
  if (wtFilterContinent !== 'All') filtered = filtered.filter(t => t.continent === wtFilterContinent);
  if (q) filtered = filtered.filter(t =>
    t.name.toLowerCase().includes(q) || t.latin.toLowerCase().includes(q) ||
    t.country.toLowerCase().includes(q) || t.climate.toLowerCase().includes(q) ||
    t.uses.toLowerCase().includes(q) || t.continent.toLowerCase().includes(q)
  );
  renderWTGrid(filtered);
}

function renderWTGrid(trees) {
  const grid = document.getElementById('wtGrid');
  if (!trees.length) { grid.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.4);padding:30px">No trees found. Try a different search.</div>'; return; }
  grid.innerHTML = '';
  trees.forEach(tree => {
    const card = document.createElement('div');
    card.className = 'wt-card';
    card.style.borderColor = tree.color + '55';
    card.innerHTML = `
      <div class="wt-card-emoji">${tree.emoji}</div>
      <div class="wt-card-name">${tree.name}</div>
      <div class="wt-card-latin">${tree.latin}</div>
      <div class="wt-card-tags">
        <span class="wt-tag" style="background:${tree.color}22;color:${tree.color}">${tree.climate}</span>
        <span class="wt-tag">${tree.country}</span>
      </div>
      <div class="wt-card-stat">🌿 CO₂: ${tree.co2} &nbsp; 📏 ${tree.height}</div>
    `;
    card.onclick = () => openWTModal(tree);
    grid.appendChild(card);
  });
}

function openWTModal(tree) {
  const modal = document.getElementById('wtModal');
  const body  = document.getElementById('wtModalBody');
  body.innerHTML = `
    <div class="wt-modal-emoji">${tree.emoji}</div>
    <div class="wt-modal-name">${tree.name}</div>
    <div class="wt-modal-latin">${tree.latin}</div>
    <div class="wt-modal-tags" style="margin-bottom:14px">
      <span class="wt-tag" style="background:${tree.color}22;color:${tree.color}">${tree.climate}</span>
      <span class="wt-tag">${tree.country}</span>
      <span class="wt-tag">${tree.continent}</span>
    </div>
    <div class="wt-modal-grid">
      <div class="wt-modal-stat"><div class="wt-ms-v">${tree.height}</div><div class="wt-ms-l">Height</div></div>
      <div class="wt-modal-stat"><div class="wt-ms-v">${tree.lifespan}</div><div class="wt-ms-l">Lifespan</div></div>
      <div class="wt-modal-stat"><div class="wt-ms-v">${tree.co2}</div><div class="wt-ms-l">CO₂/yr</div></div>
    </div>
    <div class="wt-modal-section"><div class="wt-modal-label">🌿 Uses</div><div class="wt-modal-text">${tree.uses}</div></div>
    <div class="wt-modal-section"><div class="wt-modal-label">💊 Medicinal</div><div class="wt-modal-text">${tree.medicinal}</div></div>
    <div class="wt-modal-section wt-fact-box"><div class="wt-modal-label">✨ Fun Fact</div><div class="wt-modal-text">${tree.fact}</div></div>
    <button class="wt-speak-btn" onclick="speakWTTree(${JSON.stringify(tree).replace(/"/g,'&quot;')})">🔊 Hear About This Tree</button>
  `;
  modal.style.display = 'flex';
}

function closeWTModal() {
  document.getElementById('wtModal').style.display = 'none';
  stopSpeech();
}

function speakWTTree(tree) {
  const txt = `The ${tree.name}, scientifically known as ${tree.latin}, is native to ${tree.country} in ${tree.continent}. 
    It grows in ${tree.climate} climates and can reach ${tree.height} in height, living up to ${tree.lifespan}. 
    It absorbs ${tree.co2} of carbon dioxide every year. 
    Its main uses include ${tree.uses}. 
    Medicinally, ${tree.medicinal}. 
    Fun fact: ${tree.fact}`;
  speakText(txt, { rate: 0.88, pitch: 0.85 });
}

// ── 30 NEW TREES (added to make total 55) ──
WORLD_TREES.push(
  { id:'wt26', emoji:'🌳', name:'Teak',           latin:'Tectona grandis',        country:'India',      continent:'Asia',      climate:'Tropical',     height:'30–40m', lifespan:'100 yrs',  co2:'20 kg/yr', uses:'Timber, furniture, shipbuilding', medicinal:'Bark treats skin diseases', fact:'One of the most valuable timber trees in the world. Its wood resists water!', color:'#795548' },
  { id:'wt27', emoji:'🌿', name:'Tulsi (Holy Basil)',latin:'Ocimum tenuiflorum',  country:'India',      continent:'Asia',      climate:'Tropical',     height:'0.5–1m', lifespan:'5 yrs',    co2:'0.5 kg/yr',uses:'Sacred, medicinal, culinary',   medicinal:'Treats colds, fever, stress, infections', fact:'Found in almost every Hindu household. One of the most studied medicinal plants!', color:'#388e3c' },
  { id:'wt28', emoji:'🌲', name:'Sal Tree',        latin:'Shorea robusta',         country:'India',      continent:'Asia',      climate:'Tropical',     height:'30–35m', lifespan:'200 yrs',  co2:'25 kg/yr', uses:'Timber, resin, seeds for butter', medicinal:'Resin treats skin disorders', fact:'Buddha was born under a Sal tree. Sacred in Buddhism!', color:'#5d4037' },
  { id:'wt29', emoji:'🌸', name:'Indian Coral Tree',latin:'Erythrina variegata',  country:'India',      continent:'Asia',      climate:'Tropical',     height:'6–8m',   lifespan:'50 yrs',   co2:'10 kg/yr', uses:'Ornamental, shade, nitrogen fixing', medicinal:'Bark treats joint pain', fact:'Its brilliant red flowers bloom before leaves appear. A stunning sight!', color:'#d32f2f' },
  { id:'wt30', emoji:'🌳', name:'Jackfruit Tree',  latin:'Artocarpus heterophyllus',country:'Bangladesh',continent:'Asia',     climate:'Tropical',     height:'8–25m',  lifespan:'100 yrs',  co2:'15 kg/yr', uses:'Food, timber, latex, dye',       medicinal:'Leaves treat diabetes', fact:'Produces the largest fruit of any tree — a single fruit can weigh 55 kg!', color:'#f9a825' },
  { id:'wt31', emoji:'🌿', name:'Moringa',         latin:'Moringa oleifera',       country:'India',      continent:'Asia',      climate:'Tropical',     height:'5–12m',  lifespan:'20 yrs',   co2:'8 kg/yr',  uses:'Food, medicine, water purification', medicinal:'Leaves treat 300+ diseases — superfood', fact:'Called Miracle Tree. Every part is edible and medicinal. Seeds purify water!', color:'#2e7d32' },
  { id:'wt32', emoji:'🌴', name:'Toddy Palm',      latin:'Borassus flabellifer',   country:'India',      continent:'Asia',      climate:'Tropical',     height:'20–30m', lifespan:'150 yrs',  co2:'12 kg/yr', uses:'Food, drink, timber, baskets',   medicinal:'Palm sugar treats infections', fact:'Every part of this palm is used. Called the Tree of a Thousand Uses in Tamil Nadu!', color:'#6d4c41' },
  { id:'wt33', emoji:'🌳', name:'Indian Rosewood', latin:'Dalbergia sissoo',       country:'India',      continent:'Asia',      climate:'Tropical',     height:'15–25m', lifespan:'100 yrs',  co2:'18 kg/yr', uses:'Timber, furniture, musical instruments', medicinal:'Leaves treat skin disease', fact:'One of the finest timber trees. Used to make sitars and classical instruments!', color:'#4e342e' },
  { id:'wt34', emoji:'🌺', name:'Flame of Forest', latin:'Butea monosperma',       country:'India',      continent:'Asia',      climate:'Tropical',     height:'10–15m', lifespan:'80 yrs',   co2:'12 kg/yr', uses:'Sacred, dye, gum, fodder',       medicinal:'Flowers treat eye diseases', fact:'Blooms blazing orange-red. Called Palash — sacred in Holi festival celebrations!', color:'#e64a19' },
  { id:'wt35', emoji:'🌲', name:'Deodar Cedar',    latin:'Cedrus deodara',         country:'India',      continent:'Asia',      climate:'Alpine',       height:'40–50m', lifespan:'1000 yrs', co2:'30 kg/yr', uses:'Timber, incense, sacred',        medicinal:'Oil treats skin and hair', fact:'National Tree of Pakistan. Himalayan cedar — worshipped by ancient Indians!', color:'#1a237e' },
  { id:'wt36', emoji:'🌳', name:'African Mahogany', latin:'Khaya senegalensis',    country:'Ghana',      continent:'Africa',    climate:'Tropical',     height:'30–35m', lifespan:'200 yrs',  co2:'28 kg/yr', uses:'Timber, furniture, boats',       medicinal:'Bark treats malaria and fever', fact:'One of Africa most prized hardwoods. Resistant to termites and weather!', color:'#8d6e63' },
  { id:'wt37', emoji:'🌿', name:'Moreton Bay Fig', latin:'Ficus macrophylla',      country:'Australia',  continent:'Australia', climate:'Subtropical',  height:'25–60m', lifespan:'500 yrs',  co2:'35 kg/yr', uses:'Ornamental, shade, wildlife habitat', medicinal:'Latex used for skin', fact:'Can grow to enormous size with buttress roots stretching 30m wide!', color:'#33691e' },
  { id:'wt38', emoji:'🌸', name:'Magnolia',        latin:'Magnolia grandiflora',   country:'USA',        continent:'N America', climate:'Temperate',    height:'18–27m', lifespan:'120 yrs',  co2:'15 kg/yr', uses:'Ornamental, timber, medicine',   medicinal:'Bark treats anxiety, weight gain', fact:'One of the earliest flowering plants — fossil records show magnolias existed 95 million years ago!', color:'#f8bbd0' },
  { id:'wt39', emoji:'🌲', name:'Douglas Fir',     latin:'Pseudotsuga menziesii',  country:'USA',        continent:'N America', climate:'Temperate',    height:'50–100m',lifespan:'1000 yrs', co2:'50 kg/yr', uses:'Timber, Christmas tree, resin',   medicinal:'Needles rich in Vitamin C', fact:'Second tallest tree species. Can absorb 50 kg of CO₂ per year!', color:'#1b5e20' },
  { id:'wt40', emoji:'🌳', name:'White Oak',       latin:'Quercus alba',           country:'USA',        continent:'N America', climate:'Temperate',    height:'20–30m', lifespan:'600 yrs',  co2:'22 kg/yr', uses:'Timber, wine barrels, acorns',   medicinal:'Bark treats diarrhoea and wounds', fact:'Wine barrels made from White Oak give wines their distinctive flavour and aroma!', color:'#5d4037' },
  { id:'wt41', emoji:'🌲', name:'Bristlecone Pine',latin:'Pinus longaeva',         country:'USA',        continent:'N America', climate:'Alpine',       height:'5–15m',  lifespan:'5000 yrs', co2:'5 kg/yr',  uses:'Scientific research, conservation', medicinal:'Under research for longevity compounds', fact:'The oldest living tree on Earth — one specimen is over 5,000 years old!', color:'#37474f' },
  { id:'wt42', emoji:'🍂', name:'Sugar Maple',     latin:'Acer saccharum',         country:'Canada',     continent:'N America', climate:'Temperate',    height:'25–35m', lifespan:'400 yrs',  co2:'20 kg/yr', uses:'Maple syrup, timber, ornamental', medicinal:'Sap treats kidney stones', fact:'Produces the finest maple syrup. One tree produces up to 60 litres of sap per year!', color:'#e65100' },
  { id:'wt43', emoji:'🌿', name:'Cinchona',        latin:'Cinchona officinalis',   country:'Peru',       continent:'S America', climate:'Tropical',     height:'10–15m', lifespan:'60 yrs',   co2:'10 kg/yr', uses:'Medicine, quinine production',   medicinal:'Bark produces quinine — malaria cure', fact:'The source of quinine that saved millions from malaria. Changed world history!', color:'#558b2f' },
  { id:'wt44', emoji:'🌳', name:'Kapok Tree',      latin:'Ceiba pentandra',        country:'Ghana',      continent:'Africa',    climate:'Tropical',     height:'50–70m', lifespan:'300 yrs',  co2:'40 kg/yr', uses:'Fibre, oil, timber, sacred',     medicinal:'Bark treats fever and asthma', fact:'Sacred to the Maya civilization. Trunk can be 3m wide with massive buttress roots!', color:'#4a148c' },
  { id:'wt45', emoji:'🌲', name:'Monkey Bread',    latin:'Adansonia za',           country:'Madagascar', continent:'Africa',    climate:'Semi-arid',    height:'20–25m', lifespan:'1500 yrs', co2:'8 kg/yr',  uses:'Food, water, timber, medicine',  medicinal:'Fruit rich in Vitamin C — superfood', fact:'Madagascar Baobab. Its gourd-shaped trunk stores thousands of litres of water!', color:'#bf360c' },
  { id:'wt46', emoji:'🌸', name:'African Tulip',   latin:'Spathodea campanulata',  country:'Uganda',     continent:'Africa',    climate:'Tropical',     height:'15–25m', lifespan:'50 yrs',   co2:'15 kg/yr', uses:'Ornamental, timber, medicine',   medicinal:'Bark treats malaria and skin disease', fact:'Called Flame of the Forest in Africa. Its buds squirt water when squeezed — a favourite with children!', color:'#c62828' },
  { id:'wt47', emoji:'🌳', name:'Lemon Tree',      latin:'Citrus limon',           country:'India',      continent:'Asia',      climate:'Subtropical',  height:'3–6m',   lifespan:'50 yrs',   co2:'4 kg/yr',  uses:'Food, medicine, perfumery',      medicinal:'Vitamin C powerhouse — treats scurvy', fact:'Lemons were used to treat scurvy among sailors. Changed ocean navigation history!', color:'#f9a825' },
  { id:'wt48', emoji:'🌿', name:'Tamarind',        latin:'Tamarindus indica',      country:'Africa',     continent:'Africa',    climate:'Tropical',     height:'12–18m', lifespan:'200 yrs',  co2:'14 kg/yr', uses:'Food, medicine, industrial',     medicinal:'Pulp treats constipation and fever', fact:'Essential in South Indian cuisine. Its sweet-sour fruit is used in hundreds of recipes!', color:'#827717' },
  { id:'wt49', emoji:'🌲', name:'Sandalwood',      latin:'Santalum album',         country:'India',      continent:'Asia',      climate:'Tropical',     height:'4–9m',   lifespan:'80 yrs',   co2:'6 kg/yr',  uses:'Perfume, incense, medicine, carving', medicinal:'Oil treats skin disorders, reduces anxiety', fact:'One of the most expensive woods in the world. Karnataka produces the finest Indian sandalwood!', color:'#ff8f00' },
  { id:'wt50', emoji:'🌳', name:'Camphor Tree',    latin:'Cinnamomum camphora',    country:'China',      continent:'Asia',      climate:'Subtropical',  height:'20–30m', lifespan:'1000 yrs', co2:'18 kg/yr', uses:'Camphor oil, medicine, wood',    medicinal:'Oil treats pain, cough, insect repellent', fact:'A sacred tree in Japan — some camphor trees are over 1000 years old and still growing!', color:'#00695c' },
  { id:'wt51', emoji:'🌸', name:'Plum Blossom',    latin:'Prunus mume',            country:'China',      continent:'Asia',      climate:'Temperate',    height:'4–10m',  lifespan:'50 yrs',   co2:'6 kg/yr',  uses:'Ornamental, food, medicine',     medicinal:'Fruit treats digestive issues', fact:'National flower of China. Blooms in winter — symbolizes resilience and hope!', color:'#e91e63' },
  { id:'wt52', emoji:'🌴', name:'Traveller Palm',  latin:'Ravenala madagascariensis',country:'Madagascar',continent:'Africa',  climate:'Tropical',     height:'10–15m', lifespan:'30 yrs',   co2:'10 kg/yr', uses:'Ornamental, thatch, water source', medicinal:'Not medicinal but architectural', fact:'Not a true palm! Its leaf bases collect rain — thirsty travellers could drink from the trunk!', color:'#00838f' },
  { id:'wt53', emoji:'🌲', name:'Kauri',           latin:'Agathis australis',      country:'New Zealand',continent:'Australia',climate:'Temperate',    height:'30–50m', lifespan:'2000 yrs', co2:'30 kg/yr', uses:'Timber, gum, conservation',     medicinal:'Resin used for skin', fact:'Ancient Kauri trees are over 2000 years old. The Tane Mahuta Kauri is a living cathedral!', color:'#004d40' },
  { id:'wt54', emoji:'🌳', name:'Cork Oak',        latin:'Quercus suber',          country:'Portugal',   continent:'Europe',    climate:'Mediterranean',height:'10–20m', lifespan:'300 yrs',  co2:'16 kg/yr', uses:'Cork products, wine bottles',    medicinal:'Bark decoction treats fever', fact:'Cork is harvested from the bark every 9 years without harming the tree — one of the most sustainable materials!', color:'#6d4c41' },
  { id:'wt55', emoji:'🌿', name:'Dragon Blood Tree',latin:'Dracaena cinnabari',    country:'Yemen',      continent:'Asia',      climate:'Arid',         height:'6–10m',  lifespan:'600 yrs',  co2:'5 kg/yr',  uses:'Red resin, medicine, dye',       medicinal:'Resin used as antiseptic and antiviral', fact:'Its unique umbrella-shaped canopy minimizes water loss. The red resin is used as dragon\'s blood dye!', color:'#b71c1c' }
);
