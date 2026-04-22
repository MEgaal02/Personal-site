// ═══ NAV SCROLL ═══
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ HAMBURGER MENU ═══
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');
var navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    document.querySelectorAll('.mega-dropdown.mobile-open').forEach(function(d) {
        d.classList.remove('mobile-open');
    });
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// ═══ MOBILE DROPDOWN TOGGLES ═══
document.querySelectorAll('.nav-links > li > a[data-dropdown]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            e.stopPropagation();
            var li = this.parentElement;
            var dropdown = li.querySelector('.mega-dropdown');
            var arrow = this.querySelector('.nav-arrow');
            if (dropdown) {
                var isOpen = dropdown.classList.contains('mobile-open');
                document.querySelectorAll('.mega-dropdown.mobile-open').forEach(function(d) {
                    d.classList.remove('mobile-open');
                });
                document.querySelectorAll('.nav-arrow.rotated').forEach(function(a) {
                    a.classList.remove('rotated');
                });
                if (!isOpen) {
                    dropdown.classList.add('mobile-open');
                    if (arrow) arrow.classList.add('rotated');
                    setTimeout(function() {
                        dropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        }
    });
});

// ═══ CLOSE MOBILE NAV ON SUBLINK CLICK ═══
document.querySelectorAll('.mega-link').forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 900 && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// ═══ REVEAL ON SCROLL ═══
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

// ═══ VIDEO HOVER + MODAL ═══
window.addEventListener('load', function() {
    var modal = document.getElementById('videoModal');
    var modalVid = document.getElementById('modalVideo');
    var closeBtn = document.getElementById('videoModalClose');

    if (!modal || !modalVid) return;

    function bindVideoCard(card) {
        var vid = card.querySelector('video');
        var src = card.getAttribute('data-video');
        if (!src) return;
        if (vid) {
            vid.muted = true;
            card.onmouseenter = function() { vid.currentTime = 0; vid.play().catch(function(){}); };
            card.onmouseleave = function() { vid.pause(); vid.currentTime = 0.5; };
        }
        card.onclick = function(e) { e.preventDefault(); e.stopPropagation(); openModal(src); };
    }

    // Legacy selectors (education page project-detail-video)
    document.querySelectorAll('.project-preview[data-video]').forEach(bindVideoCard);
    document.querySelectorAll('.project-detail-video[data-video]').forEach(bindVideoCard);

    // New Mac display screens (projects page and industry pages)
    document.querySelectorAll('.mac-display[data-video]').forEach(bindVideoCard);

    // Bug fix: case-video on projects page
    document.querySelectorAll('.case-video[data-video]').forEach(bindVideoCard);

    function openModal(src) {
        modalVid.src = src;
        modalVid.muted = false;
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(function() { modalVid.play().catch(function(){}); }, 300);
    }

    function closeModal() {
        modalVid.pause();
        modalVid.removeAttribute('src');
        modalVid.load();
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) { closeBtn.onclick = function(e) { e.stopPropagation(); closeModal(); }; }
    if (modal) { modal.onclick = function(e) { if (e.target === modal) closeModal(); }; }
    document.onkeydown = function(e) { if (e.key === 'Escape') closeModal(); };
});

// ═══ CURSOR GLOW ═══
(function() {
    if (window.innerWidth <= 900) return;
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    window.addEventListener('mousemove', function(e) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', function() { glow.style.opacity = '0'; });
    document.addEventListener('mouseenter', function() { glow.style.opacity = '1'; });
})();

// ═══ MOTION ANIMATIONS ═══
(async function initMotion() {
    try {
        var M = await import('https://cdn.jsdelivr.net/npm/motion@latest/+esm');

        // 1. STATS COUNTER — count up from 0 when entering viewport
        document.querySelectorAll('.stat-number').forEach(function(el) {
            var raw = el.textContent.trim();
            var num = parseFloat(raw);
            var suffix = raw.replace(/[\d.]/g, '');
            if (!num) return;
            var fired = false;
            M.inView(el, function() {
                if (fired) return;
                fired = true;
                var startTs = null;
                var dur = 1600;
                function tick(ts) {
                    if (!startTs) startTs = ts;
                    var p = Math.min((ts - startTs) / dur, 1);
                    var eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(eased * num) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }, { amount: 0.6 });
        });

        // 2. HERO SCROLL PARALLAX (home page only, desktop only)
        var hero = document.querySelector('.home-hero');
        if (hero && window.innerWidth > 900) {
            var heroLeft = document.querySelector('.hero-left');
            var heroRight = document.querySelector('.hero-right');
            if (heroLeft && heroRight) {
                M.scroll(
                    M.animate(heroRight, { y: [0, 70] }, { duration: 1 }),
                    { target: hero, offset: ['start start', 'end start'] }
                );
                M.scroll(
                    M.animate(heroLeft, { y: [0, 35] }, { duration: 1 }),
                    { target: hero, offset: ['start start', 'end start'] }
                );
            }
        }

        // 3. WORK GRID STAGGER (home page)
        var workGrid = document.querySelector('.work-grid');
        if (workGrid) {
            var cards = workGrid.querySelectorAll('.work-card');
            cards.forEach(function(c) {
                c.classList.remove('reveal');
                c.style.opacity = '0';
                c.style.transform = 'translateY(36px)';
            });
            M.inView(workGrid, function() {
                M.animate(cards,
                    { opacity: [0, 1], y: [36, 0] },
                    { duration: 0.65, delay: M.stagger(0.14), easing: [0.22, 1, 0.36, 1] }
                );
            }, { amount: 0.05 });
        }

    } catch(e) {
        // Motion CDN unavailable — existing CSS animations cover everything
    }
})();

// ═══ SMOOTH SCROLL ═══
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;
        var target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            if (navLinks.classList.contains('open')) {
                toggleMenu();
                setTimeout(function() { target.scrollIntoView({ behavior: 'smooth' }); }, 350);
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
