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
        var previewTime = parseFloat(card.getAttribute('data-preview-time')) || 0;
        if (!src) return;
        if (vid) {
            vid.muted = true;
            card.onmouseenter = function() {
                vid.currentTime = previewTime;
                vid.play().catch(function(){});
            };
            card.onmouseleave = function() {
                vid.pause();
                vid.currentTime = previewTime;
            };
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

    // Phone display click-to-modal
    document.querySelectorAll('.phone-display[data-video]').forEach(bindVideoCard);

    // Cross-device showcase — autoplay both videos when section enters view
    var cdsStage = document.querySelector('.cds-stage');
    if (cdsStage) {
        var cdsVids = cdsStage.querySelectorAll('video');
        var cdsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                cdsVids.forEach(function(v) {
                    if (entry.isIntersecting) { v.play().catch(function(){}); }
                    else { v.pause(); }
                });
            });
        }, { threshold: 0.2 });
        cdsObserver.observe(cdsStage);
    }

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

// ═══ GRAIN OVERLAY ═══
(function() {
    var grain = document.createElement('div');
    grain.className = 'grain-overlay';
    document.body.appendChild(grain);
})();

// ═══ MAC 3D TILT ═══
(function() {
    if (window.innerWidth <= 900) return;

    function applyTilt(wrapper, mac) {
        wrapper.classList.add('mac-tilt-wrapper');
        var RAF = null;

        wrapper.addEventListener('mousemove', function(e) {
            if (RAF) cancelAnimationFrame(RAF);
            RAF = requestAnimationFrame(function() {
                var rect = wrapper.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dx = (e.clientX - cx) / (rect.width / 2);
                var dy = (e.clientY - cy) / (rect.height / 2);
                var rotX = dy * -4;
                var rotY = dx * 5;
                mac.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.01)';
            });
        });

        wrapper.addEventListener('mouseleave', function() {
            if (RAF) cancelAnimationFrame(RAF);
            mac.style.transform = '';
        });
    }

    document.querySelectorAll('.work-card .mac-wrap').forEach(function(mac) {
        applyTilt(mac.closest('.work-card'), mac);
    });
})();

// ═══ MAGNETIC BUTTONS ═══
(function() {
    if (window.innerWidth <= 900) return;

    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            var rect = btn.getBoundingClientRect();
            var dx = (e.clientX - rect.left - rect.width / 2) * 0.2;
            var dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
            btn.style.transform = 'translateX(' + dx + 'px) translateY(' + (dy - 2) + 'px)';
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
        });
    });
})();

// ═══ MOTION ANIMATIONS ═══
(async function initMotion() {
    try {
        var M = await import('https://cdn.jsdelivr.net/npm/motion@latest/+esm');
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 1. STATS COUNTER — count up from 0 when entering viewport
        document.querySelectorAll('.stat-number').forEach(function(el) {
            var raw = el.textContent.trim();
            var num = parseFloat(raw);
            var suffix = raw.replace(/[\d.]/g, '');
            if (!num) return;
            if (reducedMotion) return; // skip counting animation, show value immediately
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

        // 2. HERO SCROLL PARALLAX (home page only, desktop only, no reduced-motion)
        var hero = document.querySelector('.home-hero');
        if (hero && window.innerWidth > 900 && !reducedMotion) {
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

        // 3. WORK GRID STAGGER
        var workGrid = document.querySelector('.work-grid');
        if (workGrid) {
            var cards = workGrid.querySelectorAll('.work-card');
            if (!reducedMotion) {
                cards.forEach(function(c) {
                    c.classList.remove('reveal');
                    c.style.opacity = '0';
                    c.style.transform = 'translateY(36px)';
                });
                M.inView(workGrid, function() {
                    M.animate(cards,
                        { opacity: [0, 1], y: [36, 0] },
                        { duration: 0.65, delay: M.stagger(0.1), easing: [0.22, 1, 0.36, 1] }
                    );
                }, { amount: 0.05 });
            }
        }

        // 4. DEVICE SHOWCASE ENTRANCE
        // Phone's CSS base position is translateY(20px) rotate(3deg) — entrance ends there,
        // then inline style is cleared so CSS phoneFloat animation takes over seamlessly.
        var cdsStage = document.querySelector('.cds-stage');
        if (cdsStage && !reducedMotion) {
            var macEl = cdsStage.querySelector('.mac-wrap');
            var phoneEl = cdsStage.querySelector('.phone-wrap');
            if (macEl) { macEl.style.opacity = '0'; macEl.style.transform = 'translateY(70px)'; }
            if (phoneEl) { phoneEl.style.opacity = '0'; phoneEl.style.transform = 'translateY(90px) rotate(8deg)'; }
            M.inView(cdsStage, function() {
                if (macEl) M.animate(macEl,
                    { opacity: [0, 1], y: [70, 0] },
                    { duration: 0.95, easing: [0.22, 1, 0.36, 1] }
                );
                if (phoneEl) {
                    M.animate(phoneEl,
                        { opacity: [0, 1], y: [90, 20], rotate: [8, 3] },
                        { duration: 1.15, delay: 0.18, easing: [0.22, 1, 0.36, 1] }
                    ).then(function() {
                        // Clear Motion's inline transform so CSS phoneFloat resumes from its base
                        phoneEl.style.transform = '';
                        phoneEl.style.opacity = '';
                    });
                }
            }, { amount: 0.15 });
        }

        // 5. SERVICE CARDS STAGGER
        var servicesGrid = document.querySelector('.services-preview');
        if (servicesGrid && !reducedMotion) {
            var sCards = servicesGrid.querySelectorAll('.service-preview-card');
            sCards.forEach(function(c) { c.classList.remove('reveal'); c.style.opacity = '0'; c.style.transform = 'translateY(28px)'; });
            M.inView(servicesGrid, function() {
                M.animate(sCards,
                    { opacity: [0, 1], y: [28, 0] },
                    { duration: 0.6, delay: M.stagger(0.1), easing: [0.22, 1, 0.36, 1] }
                );
            }, { amount: 0.2 });
        }

        // 6. CDS FEATURE PILLS STAGGER
        var cdsFeats = document.querySelectorAll('.cds-feat');
        if (cdsFeats.length && !reducedMotion) {
            cdsFeats.forEach(function(f) { f.style.opacity = '0'; f.style.transform = 'translateY(14px)'; });
            var cdsFeatContainer = document.querySelector('.cds-features');
            if (cdsFeatContainer) {
                M.inView(cdsFeatContainer, function() {
                    M.animate(cdsFeats,
                        { opacity: [0, 1], y: [14, 0] },
                        { duration: 0.45, delay: M.stagger(0.08), easing: [0.22, 1, 0.36, 1] }
                    );
                }, { amount: 0.4 });
            }
        }

    } catch(e) {
        // Motion CDN unavailable — existing CSS animations cover everything
    }
})();

// ═══ DEVICE VIEWER TABS ═══
document.querySelectorAll('.device-viewer').forEach(function(viewer) {
    var tabs = viewer.querySelectorAll('.device-tab');
    var panels = viewer.querySelectorAll('.device-tab-panel');
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.getAttribute('data-tab');
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            viewer.querySelector('[data-panel="' + target + '"]').classList.add('active');
        });
    });
});

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
