/* =============================================
   OREHI URBAS – JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- Navigacija: scroll efekt ----- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /* ----- Hamburger meni ----- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            navLinks.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Zapri ob kliku na link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Zapri ob kliku zunaj
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    /* ----- Aktivni link glede na stran ----- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ----- Fade-in animacije ob scrollu ----- */
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        fadeElements.forEach(el => observer.observe(el));
    }

    /* ----- Hero scroll gumb ----- */
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const nextSection = document.querySelector('.hero + *') ||
                                document.querySelector('.section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ----- Hero ozadje: Ken Burns efekt ----- */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        setTimeout(() => heroBg.classList.add('loaded'), 100);
    }

    /* ----- Kontaktni obrazec ----- */
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Pošiljanje...';
            btn.disabled = true;

            setTimeout(() => {
                showNotification('Hvala! Vaše sporočilo je bilo uspešno poslano. Odgovorili vam bomo v najkrajšem možnem času.', 'success');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    /* ----- Recepti: odpri/zapri ----- */
    document.querySelectorAll('.recipe-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const target = document.getElementById(targetId);
            if (!target) return;

            const isOpen = target.classList.contains('open');
            document.querySelectorAll('.recipe-full').forEach(r => r.classList.remove('open'));
            document.querySelectorAll('.recipe-toggle').forEach(b => b.textContent = 'Celoten recept');

            if (!isOpen) {
                target.classList.add('open');
                btn.textContent = 'Skrij recept';
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    /* ----- Animirani števci (za stat elemente) ----- */
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => countObserver.observe(el));
    }

    function animateCount(el) {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, target);
            const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
            el.textContent = display + suffix;
            if (step >= steps) clearInterval(timer);
        }, duration / steps);
    }

    /* ----- Galery lightbox (osnoven) ----- */
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;
            openLightbox(img.src, img.alt);
        });
    });

    function openLightbox(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-inner">
                <button class="lightbox-close" aria-label="Zapri">✕</button>
                <img src="${src}" alt="${alt || ''}">
            </div>
        `;
        Object.assign(overlay.style, {
            position: 'fixed', inset: '0', zIndex: '9000',
            background: 'rgba(0,0,0,0.92)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'pointer'
        });

        const inner = overlay.querySelector('.lightbox-inner');
        Object.assign(inner.style, {
            position: 'relative', maxWidth: '90vw', maxHeight: '90vh',
            cursor: 'default'
        });

        const closeBtn = overlay.querySelector('.lightbox-close');
        Object.assign(closeBtn.style, {
            position: 'absolute', top: '-2rem', right: '0',
            background: 'none', border: 'none', color: '#fff',
            fontSize: '1.5rem', cursor: 'pointer', lineHeight: '1'
        });

        const imgEl = overlay.querySelector('img');
        Object.assign(imgEl.style, {
            maxWidth: '100%', maxHeight: '90vh',
            borderRadius: '8px', display: 'block'
        });

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const close = () => {
            overlay.remove();
            document.body.style.overflow = '';
        };

        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
    }

    /* ----- Notification toast ----- */
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = message;

        const colors = {
            success: { bg: 'rgba(50,150,50,0.15)', border: 'rgba(50,150,50,0.4)', color: '#6dcc6d' },
            error:   { bg: 'rgba(200,50,50,0.15)', border: 'rgba(200,50,50,0.4)', color: '#e57373' },
            info:    { bg: 'var(--accent-glow)',    border: 'var(--border)',        color: 'var(--accent)' }
        };

        const c = colors[type] || colors.info;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '9999',
            background: c.bg, border: `1px solid ${c.border}`, color: c.color,
            padding: '1rem 1.5rem', borderRadius: '8px', maxWidth: '380px',
            fontFamily: 'Lato, sans-serif', fontSize: '0.93rem', lineHeight: '1.5',
            backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            opacity: '0', transform: 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
        });

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    /* ----- Smooth scroll za sidrne linke ----- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
