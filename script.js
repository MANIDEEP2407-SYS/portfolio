document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Follower
    const glow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Smooth positioning with transition
        glow.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stop observing once it's visible to gain performance
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply observer to sections and project cards
    const animatedElements = document.querySelectorAll('.project-card, .section-title, .about-text, .about-visual, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add styles for visible state via JS injection
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Active Navigation Link Tracking
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Subtle Tilt Effect for Project Cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // 5. Progress Bar Animation
    const progressFills = document.querySelectorAll('.progress-fill');
    if (progressFills.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const progress = fill.getAttribute('data-progress');
                    fill.style.width = `${progress}%`;
                    progressObserver.unobserve(fill);
                }
            });
        }, { threshold: 0.5 });

        progressFills.forEach(fill => {
            fill.style.width = '0%'; // Reset for animation
            progressObserver.observe(fill);
        });
    }

    // 6. Text Scramble for Section Titles
    const scrambleElements = document.querySelectorAll('.section-title');
    scrambleElements.forEach(el => {
        const originalText = el.innerText;
        el.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                el.innerText = el.innerText.split("")
                    .map((char, index) => {
                        if (index < iterations) return originalText[index];
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    }).join("");

                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        });
    });

    // 7. Dynamic Info for Footer
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} Digital Explorer. Mapping the Future.`;
    }

    const systemTime = document.querySelector('.system-time');
    if (systemTime) {
        setInterval(() => {
            const now = new Date();
            systemTime.innerText = now.toISOString().split('T')[1].split('.')[0] + ' UTC';
        }, 1000);
    }
});

