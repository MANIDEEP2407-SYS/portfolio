document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. CURSOR GLOW ────────────────────────────────────────────────────
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        document.addEventListener('mousemove', (e) => {
            glow.animate(
                { left: `${e.clientX}px`, top: `${e.clientY}px` },
                { duration: 600, fill: 'forwards' }
            );
        });
    }

    // ─── 2. THEME TOGGLE ───────────────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
        });
    }

    // ─── 3. TYPEWRITER EFFECT ──────────────────────────────────────────────
    const typewriterEl = document.getElementById('typewriter-text');
    const roles = [
        'Computer Science Student',
        'Systems Builder',
        'Backend Developer',
        'Problem Solver',
        'Innovation Ambassador'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 120;

    function typeWriter() {
        if (!typewriterEl) return;
        const current = roles[roleIndex];

        if (!isDeleting) {
            typewriterEl.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                typeDelay = 2000; // pause at end
            } else {
                typeDelay = 100;
            }
        } else {
            typewriterEl.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeDelay = 400;
            } else {
                typeDelay = 55;
            }
        }
        setTimeout(typeWriter, typeDelay);
    }
    typeWriter();

    // ─── 4. SCROLL ANIMATIONS ──────────────────────────────────────────────
    const animateTargets = document.querySelectorAll(
        '.project-card, .section-title, .about-text, .about-visual, ' +
        '.interest-card, .contact-item'
    );

    animateTargets.forEach(el => el.classList.add('animate-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    animateTargets.forEach(el => observer.observe(el));

    // ─── 5. ACTIVE NAV LINK ────────────────────────────────────────────────
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));

    // ─── 6. CARD 3D TILT ───────────────────────────────────────────────────
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = (y - cy) / 18;
            const ry = (cx - x) / 18;
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ─── 7. PROGRESS BARS ──────────────────────────────────────────────────
    const progressFills = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = `${fill.dataset.progress}%`;
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => {
        fill.style.width = '0%';
        progressObserver.observe(fill);
    });

    // ─── 8. SCROLL TO TOP BUTTON ───────────────────────────────────────────
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
    }

    // ─── 9. FOOTER YEAR ────────────────────────────────────────────────────
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ─── 10. NAVBAR SHADOW ON SCROLL ───────────────────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 20
                ? '0 4px 30px rgba(126, 87, 194, 0.1)'
                : 'none';
        });
    }

    // ─── 11. TEXT SCRAMBLE ON SECTION TITLE HOVER ──────────────────────────
    document.querySelectorAll('.section-title').forEach(el => {
        const original = el.innerText;
        el.addEventListener('mouseenter', () => {
            let iter = 0;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const tick = setInterval(() => {
                el.innerText = original.split('').map((c, i) => {
                    if (i < iter) return original[i];
                    if (c === ' ') return ' ';
                    return chars[Math.floor(Math.random() * 26)];
                }).join('');
                if (iter >= original.length) clearInterval(tick);
                iter += 0.4;
            }, 30);
        });
    });
});
