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
    // Close all mobile dropdowns
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
            var dropdown = this.nextElementSibling;
            var arrow = this.querySelector('.nav-arrow');
            if (dropdown && dropdown.classList.contains('mega-dropdown')) {
                var isOpen = dropdown.classList.contains('mobile-open');
                // Close all others
                document.querySelectorAll('.mega-dropdown.mobile-open').forEach(function(d) {
                    d.classList.remove('mobile-open');
                });
                document.querySelectorAll('.nav-arrow.rotated').forEach(function(a) {
                    a.classList.remove('rotated');
                });
                // Toggle this one
                if (!isOpen) {
                    dropdown.classList.add('mobile-open');
                    if (arrow) arrow.classList.add('rotated');
                }
            }
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

    // Home page cards
    var cards = document.querySelectorAll('.project-preview');
    for (var i = 0; i < cards.length; i++) {
        (function(card) {
            var vid = card.querySelector('video');
            var src = card.getAttribute('data-video');
            if (!vid || !src) return;
            vid.muted = true;
            card.onmouseenter = function() { vid.currentTime = 0; vid.play().catch(function(){}); };
            card.onmouseleave = function() { vid.pause(); vid.currentTime = 0.5; };
            card.onclick = function(e) { e.preventDefault(); e.stopPropagation(); openModal(src); };
        })(cards[i]);
    }

    // Project detail cards
    var detailCards = document.querySelectorAll('.project-detail-video');
    for (var j = 0; j < detailCards.length; j++) {
        (function(card) {
            var vid = card.querySelector('video');
            var src = card.getAttribute('data-video');
            if (!vid || !src) return;
            vid.muted = true;
            card.onmouseenter = function() { vid.currentTime = 0; vid.play().catch(function(){}); };
            card.onmouseleave = function() { vid.pause(); vid.currentTime = 0.5; };
            card.onclick = function(e) { e.preventDefault(); e.stopPropagation(); openModal(src); };
        })(detailCards[j]);
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
