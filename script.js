/* ============================================================
   NAVEEN MAHALINGAM — PORTFOLIO INTERACTIVITY
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------
       1. FOOTER YEAR
       -------------------------------------------------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* --------------------------------------------------------
       2. THEME TOGGLE (dark / light) + localStorage
       -------------------------------------------------------- */
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);
    updateThemeIcon();

    themeToggle.addEventListener('click', function () {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
    }


    /* --------------------------------------------------------
       3. MOBILE NAVIGATION
       -------------------------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });


    /* --------------------------------------------------------
       4. NAVBAR SCROLL EFFECT
       -------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);


    /* --------------------------------------------------------
       5. ACTIVE NAV LINK ON SCROLL
       -------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { navObserver.observe(section); });


    /* --------------------------------------------------------
       6. TYPING ANIMATION (Hero)
       -------------------------------------------------------- */
    const typedEl = document.getElementById('typed');
    const phrases = [
        'AI / ML Enthusiast',
        'Full-Stack Developer',
        'Generative AI Explorer',
        'Agentic AI Builder',
        'Freelance Artist'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typedEl.textContent = current.substring(0, charIndex);

        let speed = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === current.length) {
            speed = 1600;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeLoop, speed);
    }
    if (typedEl) typeLoop();


    /* --------------------------------------------------------
       7. SCROLL REVEAL ANIMATION
       -------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, i * 70);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });


    /* --------------------------------------------------------
       8. ANIMATED COUNTERS
       -------------------------------------------------------- */
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const isDecimal = el.dataset.decimal === 'true';
            const suffix = el.dataset.suffix || '';
            const duration = 1600;
            const startTime = performance.now();

            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = target * eased;

                el.textContent = (isDecimal ? value.toFixed(2) : Math.floor(value)) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
                }
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { counterObserver.observe(c); });


    /* --------------------------------------------------------
       9. SKILL BAR ANIMATION
       -------------------------------------------------------- */
    const skillBars = document.querySelectorAll('.skill-bar .bar span');

    const skillObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(function (bar) { skillObserver.observe(bar); });


    /* --------------------------------------------------------
       10. PROJECT FILTERING
       -------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(function (card) {
                const categories = card.dataset.category || '';
                const match = filter === 'all' || categories.indexOf(filter) !== -1;

                if (match) {
                    card.classList.remove('hide');
                    card.style.animation = 'none';
                    void card.offsetWidth;
                    card.style.animation = 'fadeUp 0.45s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // Inject keyframes used by the filter animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent =
        '@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(styleSheet);


    /* --------------------------------------------------------
       11. CONTACT FORM VALIDATION
       -------------------------------------------------------- */
    const form = document.getElementById('contactForm');

    if (form) {
        const fields = {
            name: {
                el: document.getElementById('name'),
                error: document.getElementById('nameError'),
                validate: function (v) {
                    if (!v.trim()) return 'Please enter your name.';
                    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
                    return '';
                }
            },
            email: {
                el: document.getElementById('email'),
                error: document.getElementById('emailError'),
                validate: function (v) {
                    if (!v.trim()) return 'Please enter your email.';
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                    if (!re.test(v.trim())) return 'Please enter a valid email address.';
                    return '';
                }
            },
            subject: {
                el: document.getElementById('subject'),
                error: document.getElementById('subjectError'),
                validate: function (v) {
                    if (!v.trim()) return 'Please enter a subject.';
                    if (v.trim().length < 3) return 'Subject must be at least 3 characters.';
                    return '';
                }
            },
            message: {
                el: document.getElementById('message'),
                error: document.getElementById('messageError'),
                validate: function (v) {
                    if (!v.trim()) return 'Please write a message.';
                    if (v.trim().length < 10) return 'Message must be at least 10 characters.';
                    return '';
                }
            }
        };

        const successMsg = document.getElementById('formSuccess');

        function validateField(key) {
            const field = fields[key];
            const msg = field.validate(field.el.value);

            field.error.textContent = msg;
            field.el.classList.toggle('invalid', msg !== '');
            return msg === '';
        }

        Object.keys(fields).forEach(function (key) {
            const field = fields[key];
            field.el.addEventListener('blur', function () { validateField(key); });
            field.el.addEventListener('input', function () {
                if (field.el.classList.contains('invalid')) validateField(key);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            Object.keys(fields).forEach(function (key) {
                if (!validateField(key)) isValid = false;
            });

            if (!isValid) {
                successMsg.textContent = '';
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            successMsg.textContent = '✔ Thank you! Your message has been sent successfully.';
            form.reset();

            Object.keys(fields).forEach(function (key) {
                fields[key].el.classList.remove('invalid');
                fields[key].error.textContent = '';
            });

            setTimeout(function () { successMsg.textContent = ''; }, 6000);
        });
    }


    /* --------------------------------------------------------
       12. BACK TO TOP BUTTON
       -------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('show', window.scrollY > 500);
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});