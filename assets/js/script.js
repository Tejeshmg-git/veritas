/* ============================================
   VERITAS — Private Investigation Agency
   Main JavaScript
   ============================================ */

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    setActiveNavLink();
    initContactForm();
    initNewsletterForm();
    initCounterAnimation();
    initRtlToggle();
    initScrollIndicator();
    initScrollReveal();
});

// ---- Theme Toggle ----
function initThemeToggle() {
    const btns = document.querySelectorAll('.theme-toggle');
    if (!btns.length) return;
    const saved = localStorage.getItem('veritas-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    
    btns.forEach(btn => updateThemeIcon(btn, saved));

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('veritas-theme', next);
            btns.forEach(b => updateThemeIcon(b, next));
        });
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ---- RTL Toggle ----
function initRtlToggle() {
    const btn = document.getElementById('rtl-toggle');
    if (!btn) return;
    const saved = localStorage.getItem('veritas-rtl') === 'true';
    if (saved) {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    btn.addEventListener('click', () => {
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        if (isRtl) {
            document.documentElement.removeAttribute('dir');
            localStorage.setItem('veritas-rtl', 'false');
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
            localStorage.setItem('veritas-rtl', 'true');
        }
    });
}

// ---- Mobile Menu ----
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');
    const backBtn = document.getElementById('nav-back');
    if (!toggle) return;

    function openMenu() {
        if (navLinks) navLinks.classList.add('active');
        toggle.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (navLinks) navLinks.classList.remove('active');
        toggle.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
        if (document.querySelector('.navbar.dash-header')) {
            toggleSidebar();
            return;
        }
        if (navLinks) {
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        }
    });

    if (overlay) overlay.addEventListener('click', closeMenu);
    if (backBtn) backBtn.addEventListener('click', closeMenu);

    // Mobile Dropdown Toggle
    if (navLinks) {
        const dropdowns = navLinks.querySelectorAll('.nav-item-dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 1023) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        navLinks.querySelectorAll('a:not(.mobile-only):not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ---- Active Nav Link ----
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a:not(.mobile-only):not(.nav-back)');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.replace(/^\.\.\//, '').replace(/^\.\//, '');
        const isHome = (linkPath === 'index.html' || linkPath === '../index.html');
        const isCurrentHome = currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath.endsWith('/Veritas/');

        if (isHome && isCurrentHome) {
            link.classList.add('active');
        } else if (!isHome && currentPath.includes(linkPath.replace('pages/', ''))) {
            link.classList.add('active');
        }
    });
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        setTimeout(() => { btn.innerHTML = origText; btn.style.background = ''; form.reset(); }, 3000);
    });
}

// ---- Newsletter Form ----
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const btn = form.querySelector('button');
        const origText = btn.textContent;
        btn.textContent = '✓ Subscribed';
        setTimeout(() => { btn.textContent = origText; input.value = ''; }, 3000);
    });
}

// ---- Scroll Animations (Fallback if AOS not loaded) ----
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ---- Counter Animation ----
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/[\d,]+/);
    if (!match) return;
    const target = parseInt(match[0].replace(/,/g, ''));
    const suffix = text.replace(match[0], '');
    const prefix = text.substring(0, text.indexOf(match[0]));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ---- Scroll Indicator Click ----
function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    indicator.addEventListener('click', () => {
        const hero = document.querySelector('.hero-cinematic') || document.querySelector('.hero-v2');
        if (!hero) return;
        const nextSection = hero.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ---- Scroll Reveal Observer ----
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ---- Dashboard Sidebar Toggle (Mobile) ----
function toggleSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (!sidebar) return;

    let overlay = document.querySelector('.sidebar-overlay');
    // Auto-inject overlay if missing
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        sidebar.parentElement.insertBefore(overlay, sidebar);
    }

    const isOpen = sidebar.classList.contains('active');
    if (isOpen) {
        closeSidebar();
    } else {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Overlay click to close
    overlay.onclick = closeSidebar;

    // Bind close button inside sidebar
    const closeBtn = sidebar.querySelector('.sidebar-close');
    if (closeBtn) closeBtn.onclick = closeSidebar;
}

function closeSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ---- Case Request Form ----
function initCaseRequestForm() {
    const form = document.getElementById('case-request-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-shield-check"></i> Request Submitted Securely';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        setTimeout(() => { btn.innerHTML = origText; btn.style.background = ''; form.reset(); }, 4000);
    });
}

// ---- Login Form ----
function initLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Access Granted';
            btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
        }, 2000);
    });
}

// ---- Chat / Messages ----
function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const messagesContainer = document.querySelector('.chat-messages');
    if (!messagesContainer) return;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble sent';
    bubble.textContent = input.value.trim();
    messagesContainer.appendChild(bubble);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate response
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'chat-bubble received';
        reply.textContent = 'Thank you for your message. Our investigator will respond shortly.';
        messagesContainer.appendChild(reply);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}

// ---- Document Upload ----
function handleFileUpload(input) {
    if (!input.files.length) return;
    const file = input.files[0];
    const grid = document.querySelector('.documents-grid');
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'doc-card';
    card.setAttribute('data-aos', 'fade-up');
    card.innerHTML = `
        <div class="doc-icon"><i class="fa-solid fa-file-arrow-up"></i></div>
        <div class="doc-info">
            <h4>${file.name}</h4>
            <p>${(file.size / 1024).toFixed(1)} KB • Just now</p>
        </div>
        <div class="doc-actions">
            <button title="Download"><i class="fa-solid fa-download"></i></button>
        </div>
    `;
    grid.prepend(card);
    input.value = '';
}
