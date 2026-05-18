// ── Dark / Light toggle ─────────────────────────────────────────────
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
    const isDark = html.dataset.theme === 'dark';
    html.dataset.theme = isDark ? 'light' : 'dark';
    toggle.textContent = isDark ? '◐' : '◑';
});

// ── Typed.js hero ────────────────────────────────────────────────────
new Typed('#typed-text', {
    strings: ['I build games.', 'I build apps.', 'I build experiences.'],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2200,
    loop: true,
    startDelay: 1600,
    cursorChar: '|',
});

// ── Scroll-triggered fade-in ─────────────────────────────────────────
const cards = document.querySelectorAll('.project-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const delay = parseInt(card.dataset.revealDelay, 10) || 0;
        setTimeout(() => card.classList.add('card-visible'), delay);
        revealObserver.unobserve(card);
    });
}, { threshold: 0.12 });

cards.forEach((card, i) => {
    card.dataset.revealDelay = (i % 3) * 110;
    revealObserver.observe(card);
});

// ── Touch flip (tap to flip, tap again to unflip) ───────────────────
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
}

// ── Cursor trail ─────────────────────────────────────────────────────
const TRAIL_LENGTH = 8;
const trail = [];
let mouseX = -300, mouseY = -300;

for (let i = 0; i < TRAIL_LENGTH; i++) {
    const el = document.createElement('div');
    el.className = 'cursor-dot';
    const size = Math.max(3, 11 - i);
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    el.style.opacity = (1 - i * 0.1).toFixed(2);
    document.body.appendChild(el);
    trail.push({ el, x: -300, y: -300 });
}

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

(function tick() {
    let px = mouseX, py = mouseY;
    trail.forEach(dot => {
        dot.x += (px - dot.x) * 0.28;
        dot.y += (py - dot.y) * 0.28;
        dot.el.style.transform =
            `translate(calc(${dot.x}px - 50%), calc(${dot.y}px - 50%))`;
        px = dot.x;
        py = dot.y;
    });
    requestAnimationFrame(tick);
})();

if (isTouchDevice) {
    trail.forEach(dot => dot.el.style.display = 'none');
}
