/* ======================================
   PREMIUM UI EFFECTS — JavaScript
   Upgrades: Magnetic Buttons, 3D Tilt,
   Smooth Transitions, Staggered Reveals,
   Enhanced Modal, + existing effects
   ====================================== */

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. SCROLL PROGRESS BAR ---
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // --- 2. TYPING ANIMATION ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            'I build products.',
            'I lead startups.',
            'I design robots.',
            'I create solutions.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before next phrase
            }

            setTimeout(typeLoop, typeSpeed);
        }

        typeLoop();
    }

    // --- 2B. SIDEBAR ROLE TYPING ---
    const sidebarTyping = document.getElementById('sidebar-typing');
    if (sidebarTyping) {
        const roles = [
            'Founder at SkillPASS',
            'CEO & CTO at VEX Technology',
            'Software Engineer',
            'EdTech Innovator',
            'Robotics Enthusiast'
        ];
        let roleIndex = 0;
        let roleCharIndex = 0;
        let roleIsDeleting = false;
        let roleSpeed = 60;

        function sidebarTypeLoop() {
            const currentRole = roles[roleIndex];

            if (roleIsDeleting) {
                sidebarTyping.textContent = currentRole.substring(0, roleCharIndex - 1);
                roleCharIndex--;
                roleSpeed = 30;
            } else {
                sidebarTyping.textContent = currentRole.substring(0, roleCharIndex + 1);
                roleCharIndex++;
                roleSpeed = 60;
            }

            if (!roleIsDeleting && roleCharIndex === currentRole.length) {
                roleSpeed = 2500;
                roleIsDeleting = true;
            } else if (roleIsDeleting && roleCharIndex === 0) {
                roleIsDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                roleSpeed = 300;
            }

            setTimeout(sidebarTypeLoop, roleSpeed);
        }

        sidebarTypeLoop();
    }

    // --- 2C. SCROLL-TRIGGERED SECTION TITLE TYPING ---
    const articleTitles = document.querySelectorAll('.article-title');
    articleTitles.forEach(function (title) {
        const originalText = title.textContent.trim();
        title.setAttribute('data-text', originalText);
        title.textContent = '';
        title.style.minHeight = '1.2em';
    });

    const titleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const title = entry.target;
                const text = title.getAttribute('data-text');
                if (text && !title.classList.contains('typed')) {
                    title.classList.add('typed');
                    let i = 0;
                    function typeTitle() {
                        if (i <= text.length) {
                            title.textContent = text.substring(0, i);
                            i++;
                            setTimeout(typeTitle, 50);
                        }
                    }
                    typeTitle();
                }
                titleObserver.unobserve(title);
            }
        });
    }, { threshold: 0.5 });

    articleTitles.forEach(function (title) {
        titleObserver.observe(title);
    });

    // --- 3. STATS COUNTER ANIMATION ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                el.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // --- 4. PRELOADER ---
    window.addEventListener('load', function () {
        setTimeout(function () {
            const overlay = document.querySelector('.loading-overlay');
            if (overlay) {
                overlay.classList.add('hidden');
            }
        }, 1800);
    });

    // --- 5. CURSOR GLOW EFFECT ---
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        let isActive = false;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isActive) {
                isActive = true;
                cursorGlow.classList.add('active');
            }
        });

        document.addEventListener('mouseleave', function () {
            isActive = false;
            cursorGlow.classList.remove('active');
        });

        // Smooth follow with lerp
        function updateGlow() {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(updateGlow);
        }

        updateGlow();
    }


    // =============================================
    // UPGRADE #2 — MAGNETIC BUTTON EFFECT
    // =============================================

    function initMagneticButtons() {
        const magneticElements = document.querySelectorAll(
            '.form-btn, .navbar-link, .social-link, .info_more-btn, .cv-download-btn, .resume header .form-btn'
        );

        magneticElements.forEach(function (el) {
            const strength = 0.3; // How strongly the button moves toward cursor
            const resetSpeed = 0.4; // seconds for ease-back

            el.style.transition = 'transform ' + resetSpeed + 's cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            el.addEventListener('mousemove', function (e) {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) * strength;
                const deltaY = (e.clientY - centerY) * strength;

                el.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Only enable magnetic on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        initMagneticButtons();
    }


    // =============================================
    // UPGRADE #3 — SMOOTH PAGE TRANSITIONS
    // =============================================

    function initSmoothPageTransitions() {
        const navLinks = document.querySelectorAll('[data-nav-link]');
        const pages = document.querySelectorAll('[data-page]');

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                const targetPage = this.getAttribute('data-nav-link');

                // Find current active page
                pages.forEach(function (page) {
                    if (page.classList.contains('active') && page.dataset.page !== targetPage) {
                        // Fade out current page
                        page.style.opacity = '0';
                        page.style.transform = 'translateY(-10px)';

                        setTimeout(function () {
                            page.classList.remove('active');
                            page.style.opacity = '';
                            page.style.transform = '';
                        }, 250);
                    }
                });

                // Show target page with delay
                setTimeout(function () {
                    pages.forEach(function (page) {
                        if (page.dataset.page === targetPage) {
                            page.classList.add('active');
                            // Re-trigger stagger reveals for the new page
                            initStaggerRevealsForPage(page);
                        }
                    });
                }, 280);
            });
        });
    }

    initSmoothPageTransitions();


    // =============================================
    // UPGRADE #5 — 3D TILT EFFECT ON CARDS
    // =============================================

    function initTiltEffect() {
        const tiltElements = document.querySelectorAll(
            '.project-item, .service-item, .stat-item, .blog-post-item'
        );

        tiltElements.forEach(function (el) {
            const maxTilt = 8; // Max tilt in degrees

            el.addEventListener('mousemove', function (e) {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -maxTilt;
                const rotateY = ((x - centerX) / centerX) * maxTilt;

                el.style.transform =
                    'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';

                // Set CSS vars for the shine effect
                const percentX = ((x / rect.width) * 100).toFixed(1);
                const percentY = ((y / rect.height) * 100).toFixed(1);
                el.style.setProperty('--mouse-x', percentX + '%');
                el.style.setProperty('--mouse-y', percentY + '%');
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = '';
                el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                setTimeout(function () {
                    el.style.transition = '';
                }, 500);
            });

            el.addEventListener('mouseenter', function () {
                el.style.transition = 'none';
            });
        });
    }

    // Only enable tilt on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
        initTiltEffect();
    }


    // =============================================
    // UPGRADE #6 — ENHANCED MODAL
    // =============================================

    function initEnhancedModal() {
        const modal = document.getElementById('certificate-modal');
        if (!modal) return;

        // Close on backdrop click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (modal.style.display === 'flex' || modal.style.display === 'block') {
                    modal.style.display = 'none';
                }

                // Also close blog modal
                const blogModal = document.getElementById('blog-modal');
                if (blogModal && (blogModal.style.display === 'flex' || blogModal.style.display === 'block')) {
                    blogModal.style.display = 'none';
                }
            }
        });

        // Image zoom on click inside modal
        const modalImg = document.getElementById('certificate-modal-img');
        if (modalImg) {
            let isZoomed = false;
            modalImg.style.cursor = 'zoom-in';
            modalImg.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            modalImg.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!isZoomed) {
                    modalImg.style.transform = 'scale(1.5)';
                    modalImg.style.cursor = 'zoom-out';
                    isZoomed = true;
                } else {
                    modalImg.style.transform = 'scale(1)';
                    modalImg.style.cursor = 'zoom-in';
                    isZoomed = false;
                }
            });
        }
    }

    initEnhancedModal();


    // =============================================
    // UPGRADE #7 — STAGGERED REVEAL ANIMATIONS
    // =============================================

    function initStaggerRevealsForPage(page) {
        // Service items
        const serviceItems = page.querySelectorAll('.service-item');
        serviceItems.forEach(function (item, index) {
            item.classList.remove('stagger-reveal-scale', 'revealed');
            item.classList.add('stagger-reveal-scale');
            item.style.setProperty('--stagger-delay', (index * 100) + 'ms');
            item.style.transitionDelay = (index * 100) + 'ms';
        });

        // Stat items
        const statItems = page.querySelectorAll('.stat-item');
        statItems.forEach(function (item, index) {
            item.classList.remove('stagger-reveal-scale', 'revealed');
            item.classList.add('stagger-reveal-scale');
            item.style.setProperty('--stagger-delay', (index * 120) + 'ms');
            item.style.transitionDelay = (index * 120) + 'ms';
        });

        // Timeline items
        const timelineItems = page.querySelectorAll('.timeline-item');
        timelineItems.forEach(function (item, index) {
            item.classList.remove('stagger-reveal-left', 'revealed');
            item.classList.add('stagger-reveal-left');
            item.style.setProperty('--stagger-delay', (index * 80) + 'ms');
            item.style.transitionDelay = (index * 80) + 'ms';
        });

        // Skill categories
        const skillCategories = page.querySelectorAll('.skill-category');
        skillCategories.forEach(function (item, index) {
            item.classList.remove('stagger-reveal', 'revealed');
            item.classList.add('stagger-reveal');
            item.style.setProperty('--stagger-delay', (index * 150) + 'ms');
            item.style.transitionDelay = (index * 150) + 'ms';
        });

        // Project items
        const projectItems = page.querySelectorAll('.project-item');
        projectItems.forEach(function (item, index) {
            item.classList.remove('stagger-reveal-scale', 'revealed');
            item.classList.add('stagger-reveal-scale');
            item.style.setProperty('--stagger-delay', (index * 80) + 'ms');
            item.style.transitionDelay = (index * 80) + 'ms';
        });

        // Blog items
        const blogItems = page.querySelectorAll('.blog-post-item');
        blogItems.forEach(function (item, index) {
            item.classList.remove('stagger-reveal', 'revealed');
            item.classList.add('stagger-reveal');
            item.style.setProperty('--stagger-delay', (index * 120) + 'ms');
            item.style.transitionDelay = (index * 120) + 'ms';
        });

        // Observe all stagger elements in this page
        observeStaggerElements(page);
    }

    function observeStaggerElements(container) {
        const staggerElements = container.querySelectorAll(
            '.stagger-reveal, .stagger-reveal-left, .stagger-reveal-scale'
        );

        const staggerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Use a small timeout to ensure the delay is applied
                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, 50);
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        staggerElements.forEach(function (el) {
            staggerObserver.observe(el);
        });
    }

    // Initialize stagger reveals for active page
    const activePage = document.querySelector('[data-page].active');
    if (activePage) {
        initStaggerRevealsForPage(activePage);
    }

    // Also set up stagger for pages when they become active (listen for nav clicks)
    const navLinksForStagger = document.querySelectorAll('[data-nav-link]');
    navLinksForStagger.forEach(function (link) {
        link.addEventListener('click', function () {
            const targetPageName = this.getAttribute('data-nav-link');
            // Delay to allow page to become active first
            setTimeout(function () {
                const targetPage = document.querySelector('[data-page="' + targetPageName + '"]');
                if (targetPage && targetPage.classList.contains('active')) {
                    initStaggerRevealsForPage(targetPage);
                }
            }, 350);
        });
    });





    // =============================================
    // EXTRA — SMOOTH NUMBER TICKER FOR STATS ON HOVER
    // =============================================

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(function (item) {
        const numberEl = item.querySelector('.stat-number');
        if (!numberEl) return;

        item.addEventListener('mouseenter', function () {
            const target = parseInt(numberEl.getAttribute('data-target'), 10);
            numberEl.style.transition = 'transform 0.3s ease';
            numberEl.style.transform = 'scale(1.15)';
            numberEl.style.color = '#ffdb70';
        });

        item.addEventListener('mouseleave', function () {
            numberEl.style.transform = 'scale(1)';
            numberEl.style.color = '';
        });
    });

});
