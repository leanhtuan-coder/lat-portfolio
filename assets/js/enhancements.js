// Dark Mode Toggle - DISABLED
/*
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
}

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
*/

// Loading Animation
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    setTimeout(() => {
        loadingOverlay?.classList.add('hidden');
    }, 800);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Language Toggle - DISABLED
/*
const langBtns = document.querySelectorAll('.lang-btn');
const currentLang = localStorage.getItem('language') || 'en';

// Apply saved language
document.documentElement.setAttribute('lang', currentLang);
langBtns.forEach(btn => {
    if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
    }
});

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;

        // Remove active class from all buttons
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Save preference
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);

        // Toggle content visibility based on language
        toggleLanguageContent(lang);
    });
});

function toggleLanguageContent(lang) {
    const enElements = document.querySelectorAll('[data-lang="en"]');
    const viElements = document.querySelectorAll('[data-lang="vi"]');

    if (lang === 'en') {
        enElements.forEach(el => el.style.display = 'block');
        viElements.forEach(el => el.style.display = 'none');
    } else {
        enElements.forEach(el => el.style.display = 'none');
        viElements.forEach(el => el.style.display = 'block');
    }
}

// Initialize language content
toggleLanguageContent(currentLang);
*/

// Skill Progress Animation
const skillProgressFills = document.querySelectorAll('.skill-progress-fill');

const animateSkills = () => {
    skillProgressFills.forEach(fill => {
        const width = fill.dataset.width;
        const rect = fill.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
            fill.style.width = width;
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // Initial check

// Initialize reveal elements
document.addEventListener('DOMContentLoaded', () => {
    // Automatically activate all reveal elements in the Resume section on page load
    const resumeArticle = document.querySelector('article[data-page="resume"]');
    if (resumeArticle) {
        const resumeReveals = resumeArticle.querySelectorAll('.reveal');
        resumeReveals.forEach(el => el.classList.add('active'));
    }

    // Add reveal class to timeline items for scroll animation
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('reveal');
    });

    // Add reveal class to service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.classList.add('reveal');
    });

    // Add reveal class to blog posts
    document.querySelectorAll('.blog-post-item').forEach(item => {
        item.classList.add('reveal');
    });

    // Immediately activate all reveals on first load
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }, 100);
});
