// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar a');

function setMenu(open) {
    navbar.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
}

menuBtn.addEventListener('click', () => setMenu(!navbar.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

// ---------- Highlight the nav link of the section in view ----------
const sections = document.querySelectorAll('main section[id]');

const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => spy.observe(section));

// ---------- Typing effect ----------
const roles = [
    'Java Developer',
    'Cybersecurity Student',
    'Full-Stack Developer',
    'ML Enthusiast'
];
const typingEl = document.getElementById('typing');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
    typingEl.textContent = roles[0];
} else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    (function type() {
        const word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typingEl.textContent = word.slice(0, charIndex);

        let delay = deleting ? 50 : 100;

        if (!deleting && charIndex === word.length) {
            delay = 1500;              // pause on the full word
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(type, delay);
    })();
}

// ---------- Profile image fallback (shows initials if main.jpg is missing) ----------
const profileImg = document.getElementById('profile-img');
profileImg.addEventListener('error', () => {
    const fallback = document.createElement('div');
    fallback.className = 'img-fallback';
    fallback.textContent = 'MH';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', 'Mrunal Hingonekar');
    profileImg.replaceWith(fallback);
});

// ---------- Contact form (opens the visitor's email app, no backend needed) ----------
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');

    window.location.href = 'mailto:mrunalhingonekar@gmail.com?subject=' + subject + '&body=' + body;
    note.textContent = 'Opening your email app to send the message.';
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
