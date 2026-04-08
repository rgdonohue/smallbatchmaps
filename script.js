// Small Batch Maps - Interactive JavaScript

// Namespace for all SBM functionality
window.SBM = {
    // Debounce utility for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Scroll to section utility
    scrollToSection: function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Show notification function
    showNotification: function(message, type = 'info') {
        const template = document.getElementById('notification-template');
        if (!template) return;

        const notification = template.querySelector('.notification').cloneNode(true);

        notification.classList.add(type);
        notification.querySelector('.notification-message').textContent = message;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    },
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = mobileMenuBtn.querySelector('.hamburger');
    const header = document.querySelector('.header');
    const hero = document.querySelector('#hero');

    mobileMenuBtn.addEventListener('click', function() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        hamburger.classList.toggle('active');

        if (!isExpanded) {
            const firstLink = mobileMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });

    // Close mobile menu when clicking nav links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Logo click handler
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNavLogo();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function showNavLogo() {
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            logoText.classList.add('visible');
        }
    }

    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                showNavLogo();
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(section => {
        if (section.id === 'hero') return; // hero has its own CSS animations
        section.classList.add('fade-in-up');
        observer.observe(section);
    });

    // Form validation
    const formValidation = {
        validateName: function(value) {
            if (!value.trim()) return 'Name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            return null;
        },
        validateEmail: function(value) {
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address';
            return null;
        },
        validateComment: function(value) {
            if (!value.trim()) return 'Comment is required';
            if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
            return null;
        },
        showFieldError: function(field, message) {
            const errorElement = document.getElementById(field.id + '-error');
            if (errorElement) {
                errorElement.textContent = message;
                field.classList.add('error');
                field.classList.remove('success');
                field.setAttribute('aria-invalid', 'true');
            }
        },
        clearFieldError: function(field) {
            const errorElement = document.getElementById(field.id + '-error');
            if (errorElement) {
                errorElement.textContent = '';
                field.classList.remove('error');
                field.classList.add('success');
                field.setAttribute('aria-invalid', 'false');
            }
        },
        validateField: function(field) {
            let validator;
            switch(field.id) {
                case 'name':    validator = this.validateName;    break;
                case 'email':   validator = this.validateEmail;   break;
                case 'comment': validator = this.validateComment; break;
                default: return true;
            }
            const error = validator(field.value);
            if (error) {
                this.showFieldError(field, error);
                return false;
            } else {
                this.clearFieldError(field);
                return true;
            }
        }
    };

    const formFields = document.querySelectorAll('#contact-form .form-input');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            formValidation.validateField(this);
        });
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) errorElement.textContent = '';
                this.setAttribute('aria-invalid', 'false');
            }
        });
    });

    // Contact form submission (Web3Forms)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        formFields.forEach(field => {
            if (!formValidation.validateField(field)) isValid = false;
        });

        if (!isValid) {
            SBM.showNotification('Please correct the errors above and try again.', 'error');
            const firstError = this.querySelector('.form-input.error');
            if (firstError) firstError.focus();
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;

            if (response.ok) {
                this.reset();
                formFields.forEach(field => {
                    field.classList.remove('success', 'error');
                    field.setAttribute('aria-invalid', 'false');
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) errorElement.textContent = '';
                });
                SBM.showNotification('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.', 'success');
                contactForm.focus();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        SBM.showNotification(data["errors"].map(error => error["message"]).join(", "), 'error');
                    } else {
                        SBM.showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                });
            }
        })
        .catch(() => {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            SBM.showNotification('Oops! There was a problem submitting your form', 'error');
        });
    });

    // Active navigation highlight
    function updateActiveNav() {
        const sections = ['work', 'process', 'about', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        let currentSection = '';
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + section.offsetHeight) {
                    currentSection = sectionId;
                }
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.classList.toggle('active', href.substring(1) === currentSection);
            }
        });
    }

    // Hero logo visibility
    function updateHeroLogoVisibility() {
        const heroSection = document.getElementById('hero');
        const heroContent = document.querySelector('.hero-content');
        const logoText = document.querySelector('.logo-text');
        const headerHeight = 80;

        if (heroSection && heroContent && logoText) {
            const heroContentBottom = heroContent.offsetTop + heroContent.offsetHeight;
            const scrollPosition = window.scrollY + headerHeight;
            logoText.classList.toggle('visible', scrollPosition > heroContentBottom);
        }
    }

    // Parallax for hero background
    function updateParallax() {
        if (hero) {
            const heroBackground = hero.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
            }
        }
    }

    // Header scroll state
    function handleScroll() {
        header.classList.toggle('scrolled', window.scrollY > 0);
        updateActiveNav();
    }

    // Single debounced handler for logo + parallax
    const debouncedScrollHandler = SBM.debounce(() => {
        updateHeroLogoVisibility();
        updateParallax();
    }, 16);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

    // Make showNotification available globally for form compatibility
    window.showNotification = SBM.showNotification;

    // Keyboard: Escape closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    });

    // Initialize
    handleScroll();
    updateActiveNav();
});

// Compass rose interactivity
document.addEventListener('DOMContentLoaded', function() {
    const compassRose = document.querySelector('.compass-rose');
    if (compassRose) {
        let compassRotation = 0;
        compassRose.addEventListener('click', function() {
            compassRotation += 45;
            this.style.transform = `rotate(${compassRotation}deg) scale(1.1)`;
            setTimeout(() => {
                this.style.transform = `rotate(${compassRotation}deg)`;
            }, 200);
        });
    }
});
