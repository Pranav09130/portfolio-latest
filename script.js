// ============================================
// DATA — edit these directly to update content
// ============================================
const projects = [
  {
    title: 'TaskFlow',
    type: 'FULL-STACK',
    description: 'Task management app with JWT-based authentication, a Node.js/Express + PostgreSQL backend, and a React/Vite frontend. Deployed on Railway.',
    stack: 'REACT · NODE.JS · EXPRESS ·  POSTGRESQL· JWT',
    github: 'https://github.com/Pranav09130/TaskFlow', // ADD YOUR GITHUB REPO LINK
    live: 'https://task-flow-one-sooty.vercel.app/'    // ADD YOUR LIVE DEMO LINK
  },
  {
    title: 'Luxe Store',
    type: 'FULL-STACK',
    description: 'E-commerce platform with an admin dashboard, order tracking, wishlist, Redis caching, and Cloudinary uploads, with Google OAuth login. Deployed on Render.',
    stack: 'NODE.JS · MONGODB · REDIS · CLOUDINARY · OAUTH',
    github: 'https://github.com/Pranav09130/Luxe-Store',
    live: 'https://luxe-store-backend-1s9z.onrender.com/'
  },
  {
    title: 'Castaway',
    type: 'FRONTEND',
    description: 'Nautical-themed weather app built on the OpenWeatherMap API, with Chart.js forecast graphs and a canvas-animated landing page. Deployed on GitHub Pages.',
    stack: 'JAVASCRIPT · CHART.JS · REST API · CANVAS',
    github: 'https://github.com/Pranav09130/Castaway',
    live: 'https://pranav09130.github.io/Castaway/'
  },
  {
    title: 'Connect Four',
    type: 'GAME',
    description: 'Classic Connect Four with dark/light mode, canvas particle animation, win detection, undo, and full keyboard support.',
    stack: 'JAVASCRIPT · CANVAS · CSS3',
    github: 'https://github.com/Pranav09130/connect-four-neon-arena',
    live: 'https://pranav09130.github.io/connect-four-neon-arena/'
  },
  {
    title: 'Aurora',
    type: 'GAME',
    description: "A calmer take on trivia — speed-based scoring, streak tracking, and persistent high scores via localStorage.",
    stack: 'JAVASCRIPT · CSS3 · LOCALSTORAGE',
    github: 'https://github.com/Pranav09130/aurora-trivia',
    live: 'https://pranav09130.github.io/aurora-trivia/'
  }
];

const stackGroups = [
  { label: 'FRONTEND', items: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
  { label: 'BACKEND', items: ['Node.js', 'Express', 'MySQL','PostgreSQL', 'MongoDB'] },
  { label: 'TOOLS', items: ['Git', 'JWT', 'Redis', 'REST APIs'] }
];

const timeline = [
  { year: '2022 — 2026', title: 'B.Tech, Information Technology', sub: 'DY Patil School of Engineering & Technology, Pune' },
  { year: '2026', title: 'Full-Stack Development Intern', sub: 'SaiKet Systems' },
  { year: '2026', title: 'Frontend Development Intern', sub: 'Cognifyz Technologies' }
];

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderWork();
  renderStackGroups();
  renderTimeline();
  startClock();
  initNavScroll();
  initReveal();
  initSmoothScroll();
  initContactForm();
});

// ============================================
// RENDER: WORK
// ============================================
function renderWork() {
  const list = document.getElementById('workList');
  list.innerHTML = projects.map((p, i) => `
    <div class="work-item bracket reveal" style="transition-delay:${i * 0.06}s">
      <div class="work-head">
        <h3 class="work-title">${p.title}</h3>
        <span class="work-type mono">${p.type}</span>
      </div>
      <p class="work-desc">${p.description}</p>
      <div class="work-foot">
        <span class="work-stack">${p.stack}</span>
        <div class="work-links">
          <a href="${p.github}" target="_blank" rel="noopener">REPO ↗</a>
          <a href="${p.live}" target="_blank" rel="noopener">LIVE ↗</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// RENDER: TECH STACK GROUPS
// ============================================
function renderStackGroups() {
  const el = document.getElementById('stackGroups');
  el.innerHTML = stackGroups.map(g => `
    <div class="stack-group">
      <p class="stack-group-label mono">${g.label}</p>
      <div class="stack-tags">
        ${g.items.map(i => `<span class="stack-tag">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================
// RENDER: TIMELINE
// ============================================
function renderTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = timeline.map(t => `
    <div class="timeline-item">
      <p class="timeline-year mono">${t.year}</p>
      <p class="timeline-title">${t.title}</p>
      <p class="timeline-sub">${t.sub}</p>
    </div>
  `).join('');
}

// ============================================
// LIVE CLOCK — always shows Pune (IST), regardless of visitor timezone
// ============================================
function startClock() {
  const el = document.getElementById('liveClock');
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });
  function tick() { el.textContent = formatter.format(new Date()) + ' IST'; }
  tick();
  setInterval(tick, 1000);
}

// ============================================
// NAV SCROLL STATE
// ============================================
function initNavScroll() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ============================================
// SCROLL REVEAL (also handles the hero's staggered
// entrance, since those elements carry .reveal too
// and are already in view on load)
// ============================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL (offset for fixed nav)
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================================
// CONTACT FORM
// ============================================
// TODO: Replace with your own form endpoint.
// Free option: sign up at https://formspree.io, create a form,
// and paste the endpoint it gives you below.
const FORM_ENDPOINT = 'https://formspree.io/f/mbdnnkge';

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      status.textContent = 'Form backend not connected yet — see the note in script.js';
      status.className = 'form-status error';
      return;
    }

    const btnLabel = form.querySelector('.form-submit span');
    const original = btnLabel.textContent;
    btnLabel.textContent = 'Sending...';

    const payload = {
      name: document.getElementById('cName').value,
      email: document.getElementById('cEmail').value,
      message: document.getElementById('cMessage').value
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        status.textContent = "Message sent — I'll get back to you soon.";
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      status.textContent = "Couldn't send — feel free to email me directly instead.";
      status.className = 'form-status error';
    } finally {
      btnLabel.textContent = original;
    }
  });
}
