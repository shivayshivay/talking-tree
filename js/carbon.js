// ── CARBON CALCULATOR MODULE ──
function updateCarbon() {
  const car  = +document.getElementById('sl-car').value;
  const fly  = +document.getElementById('sl-fly').value;
  const meat = +document.getElementById('sl-meat').value;
  const home = +document.getElementById('sl-home').value;

  document.getElementById('cv-car').textContent  = car  + ' km';
  document.getElementById('cv-fly').textContent  = fly  + ' flights';
  document.getElementById('cv-meat').textContent = meat + ' meals';
  document.getElementById('cv-home').textContent = home + ' kWh';

  // Emission factors
  const cCar  = Math.round(car  * 52  * 0.10);  // kg CO2 per km * weeks
  const cFly  = Math.round(fly  * 300);           // kg CO2 per flight avg
  const cMeat = Math.round(meat * 52  * 4);       // kg CO2 per meat meal
  const cHome = Math.round(home * 12  * 0.20);    // kg CO2 per kWh * months

  const total = cCar + cFly + cMeat + cHome;
  const trees = Math.max(1, Math.round(total / 200)); // avg tree absorbs ~200 kg/yr

  document.getElementById('c-trees').textContent = '🌳 × ' + trees;
  document.getElementById('c-total').textContent = 'Total: ' + total.toLocaleString() + ' kg CO₂/year';

  const maxVal = Math.max(cCar, cFly, cMeat, cHome, 1);
  const keys   = ['car', 'fly', 'meat', 'home'];
  const vals   = [cCar,  cFly,  cMeat,  cHome];

  keys.forEach((k, i) => {
    document.getElementById('bv-' + k).textContent  = vals[i].toLocaleString() + ' kg';
    document.getElementById('bb-' + k).style.width  = Math.round((vals[i] / maxVal) * 100) + '%';
  });
}
