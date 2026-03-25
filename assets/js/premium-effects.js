/* ======================================
   PREMIUM UI EFFECTS — JavaScript
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
    // Hide preloader after page load
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
});
