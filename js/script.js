// ---------- Mobile nav ----------
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.cssText += open ? '' : 'position:fixed; top:64px; left:0; right:0; background:#12161d; flex-direction:column; padding:24px 32px; border-bottom:1px solid rgba(243,241,234,0.12); gap:18px;';
});

// ---------- Car inven  tory data ----------
const cars = [
  { name: "Hyundai Creta SX", type: "suv", year: 2022, km: "28,400 km", fuel: "Petrol", trans: "Automatic", owners: "1st Owner", price: "₹11.4 L" },
  { name: "Maruti Swift VXi", type: "hatchback", year: 2021, km: "34,100 km", fuel: "Petrol", trans: "Manual", owners: "1st Owner", price: "₹5.8 L" },
  { name: "Honda City ZX", type: "sedan", year: 2020, km: "41,200 km", fuel: "Petrol", trans: "Manual", owners: "2nd Owner", price: "₹8.9 L" },
  { name: "Tata Nexon XZ+", type: "suv", year: 2023, km: "15,600 km", fuel: "Diesel", trans: "Manual", owners: "1st Owner", price: "₹9.7 L" },
  { name: "Hyundai i20 Sportz", type: "hatchback", year: 2022, km: "22,300 km", fuel: "Petrol", trans: "Manual", owners: "1st Owner", price: "₹6.6 L" },
  { name: "Skoda Slavia AT", type: "sedan", year: 2023, km: "12,900 km", fuel: "Petrol", trans: "Automatic", owners: "1st Owner", price: "₹13.2 L" },
];

const carSVG = `<svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#c69a4a" stroke-width="2.2">
  <path d="M15 60 L28 38 Q35 30 48 30 L140 30 Q152 30 158 40 L178 60" stroke-linejoin="round"/>
  <rect x="10" y="58" width="180" height="16" rx="4"/>
  <circle cx="50" cy="76" r="10" fill="#12161d"/>
  <circle cx="150" cy="76" r="10" fill="#12161d"/>
  <line x1="70" y1="30" x2="70" y2="58" stroke-opacity="0.5"/>
  <line x1="118" y1="30" x2="118" y2="58" stroke-opacity="0.5"/>
</svg>`;

const carGrid = document.getElementById('carGrid');

function renderCars(filter) {
  carGrid.innerHTML = '';
  const list = filter === 'all' ? cars : cars.filter(c => c.type === filter);
  list.forEach(c => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <div class="car-photo">
        <span class="car-badge">CERTIFIED</span>
        ${carSVG}
      </div>
      <div class="car-body">
        <h3>${c.name}</h3>
        <div class="car-sub">${c.year} · ${c.type.toUpperCase()}</div>
        <div class="car-specs">
          <div>⛽ ${c.fuel}</div>
          <div>⚙ ${c.trans}</div>
          <div>🛣 ${c.km}</div>
          <div>👤 ${c.owners}</div>
        </div>
        <div class="car-footer">
          <span class="car-price">${c.price}</span>
          <a href="#contact" class="car-link">Enquire →</a>
        </div>
      </div>`;
    carGrid.appendChild(card);
  });
}
renderCars('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCars(btn.dataset.filter);
  });
});

// ---------- Testimonial carousel ----------
const testis = document.querySelectorAll('.testi');
const dotsWrap = document.getElementById('dots');
let testiIndex = 0;

testis.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => showTesti(i));
  dotsWrap.appendChild(dot);
});

function showTesti(i) {
  testis.forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
  testis[i].classList.add('active');
  document.querySelectorAll('.dot')[i].classList.add('active');
  testiIndex = i;
}

setInterval(() => {
  showTesti((testiIndex + 1) % testis.length);
}, 5000);

// ---------- Contact form ----------
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name.length < 2) {
    showFormMsg('Please enter your full name.', false);
    return;
  }
  if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
    showFormMsg('Please enter a valid 10-digit phone number.', false);
    return;
  }

  showFormMsg(`Thanks ${name}, we've received your enquiry. Our team will call you at ${phone} shortly.`, true);
  form.reset();
});

function showFormMsg(text, ok) {
  formMsg.textContent = text;
  formMsg.className = 'form-msg show' + (ok ? ' ok' : '');
  if (!ok) {
    formMsg.style.background = 'rgba(198,90,74,0.15)';
    formMsg.style.color = '#e0836f';
    formMsg.style.border = '1px solid #e0836f';
  } else {
    formMsg.style.background = '';
    formMsg.style.color = '';
    formMsg.style.border = '';
  }
}