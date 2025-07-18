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

    // Handle keyboard navigation for project items
    handleProjectKeydown: function(event, url) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            window.open(url, '_blank');
        }
    },

    // Show notification function
    showNotification: function(message, type = 'info') {
        const template = document.getElementById('notification-template');
        if (!template) return;
        
        const notification = template.querySelector('.notification').cloneNode(true);
        
        // Set up notification
        notification.classList.add(type);
        notification.querySelector('.notification-message').textContent = message;
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    },

    // Toggle curriculum details
    toggleCurriculumDetails: function() {
        const details = document.getElementById('curriculum-details');
        const toggle = document.getElementById('curriculum-toggle');
        const expandText = toggle.querySelector('.expand-text');
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Collapse
            details.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            expandText.textContent = 'View Curriculum Details';
        } else {
            // Expand
            details.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
            expandText.textContent = 'Hide Curriculum Details';
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
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
        
        // Focus management for accessibility
        if (!isExpanded) {
            // Menu is opening, focus first link
            const firstLink = mobileMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });

    // Close mobile menu when clicking on nav links
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
            
            // Show nav logo when logo is clicked
            showNavLogo();
            
            // Close any open service expansion
            closeServiceExpansion();
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show nav logo when navigation is used
    function showNavLogo() {
        const navLogo = document.querySelector('.logo-image');
        if (navLogo) {
            navLogo.classList.add('visible');
        }
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Show nav logo when any nav link is clicked
                showNavLogo();
                
                // Fixed header height
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Legacy service expansion functionality removed - 
    // New geospatial section uses direct navigation instead
    
    // New geospatial section uses static layout - no expansion needed

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-up');
        observer.observe(section);
    });

    // Form validation utilities
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
                case 'name':
                    validator = this.validateName;
                    break;
                case 'email':
                    validator = this.validateEmail;
                    break;
                case 'comment':
                    validator = this.validateComment;
                    break;
                default:
                    return true;
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

    // Add real-time validation to form fields
    const formFields = document.querySelectorAll('#contact-form .form-input');
    formFields.forEach(field => {
        // Validate on blur (when user leaves field)
        field.addEventListener('blur', function() {
            formValidation.validateField(this);
        });

        // Clear error on input (as user types)
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                // Only clear error state, don't validate until blur
                this.classList.remove('error');
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.setAttribute('aria-invalid', 'false');
            }
        });
    });

    // Contact form handling with Web3Forms
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        let isValid = true;
        formFields.forEach(field => {
            if (!formValidation.validateField(field)) {
                isValid = false;
            }
        });

                 if (!isValid) {
            SBM.showNotification('Please correct the errors above and try again.', 'error');
            // Focus first invalid field
            const firstError = this.querySelector('.form-input.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Add loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(this);
        
        // Submit to Web3Forms
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            if (response.ok) {
                // Reset form and clear all validation states
                this.reset();
                formFields.forEach(field => {
                    field.classList.remove('success', 'error');
                    field.setAttribute('aria-invalid', 'false');
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                });
                
                // Show success message
                showNotification('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.', 'success');
                
                // Focus back to the form for screen reader users
                contactForm.focus();
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        showNotification(data["errors"].map(error => error["message"]).join(", "), 'error');
                    } else {
                        showNotification('Oops! There was a problem submitting your form', 'error');
                    }
                });
            }
        })
        .catch(error => {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            showNotification('Oops! There was a problem submitting your form', 'error');
        });
    });

    // Active navigation highlight
    function updateActiveNav() {
        const sections = ['services', 'about', 'projects', 'contact'];
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100; // Offset for better detection
        
        let currentSection = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            }
        });
        
        // Update nav link states
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetSection = href.substring(1);
                if (targetSection === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // Hero logo visibility based on scroll
    function updateHeroLogoVisibility() {
        const heroSection = document.getElementById('hero');
        const heroContent = document.querySelector('.hero-content');
        const heroLogo = document.querySelector('.hero-logo');
        const navLogo = document.querySelector('.logo-image');
        const logoLink = document.querySelector('.logo-link');
        const headerHeight = 80;
        
        if (heroSection && heroContent && heroLogo && navLogo && logoLink) {
            const heroContentBottom = heroContent.offsetTop + heroContent.offsetHeight;
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.scrollY + headerHeight;
            
            // Show logo-link when hero-content is scrolled above the bottom of the nav
            if (scrollPosition > heroContentBottom) {
                logoLink.classList.add('visible');
            } else {
                logoLink.classList.remove('visible');
            }
            
            // Show logos when hero section is scrolled past the viewport (minus nav height)
            if (scrollPosition > heroBottom) {
                heroLogo.classList.add('visible');
                navLogo.classList.add('visible');
            } else {
                heroLogo.classList.remove('visible');
                navLogo.classList.remove('visible');
            }
        }
    }

    // Optimized scroll listener using debounce
    const debouncedScrollHandler = SBM.debounce(() => {
        updateActiveNav();
        updateHeroLogoVisibility();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

    // Make showNotification available globally for backward compatibility
    window.showNotification = SBM.showNotification;

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                hamburger.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                // Return focus to menu button
                mobileMenuBtn.focus();
            }
            
            // Close expanded service section
            if (serviceExpansion && !serviceExpansion.classList.contains('hidden')) {
                closeServiceExpansion();
                // Return focus to the expanded service button
                const expandedButton = document.querySelector('.learn-more-btn[aria-expanded="true"]');
                if (expandedButton) {
                    expandedButton.focus();
                }
            }
        }
        
        // Handle Enter and Space for project items (already handled in HTML with onkeydown)
        // Handle Tab navigation for better accessibility
        if (e.key === 'Tab') {
            // Let the browser handle tab navigation naturally
            // This ensures proper focus order
        }
    });

    // Parallax effect for hero section (subtle) - integrated with main scroll handler
    function updateParallax() {
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            const heroBackground = hero.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
        }
    }
    
    // Update the scroll handler to include parallax
    const debouncedScrollHandlerWithParallax = SBM.debounce(() => {
        updateActiveNav();
        updateHeroLogoVisibility();
        updateParallax();
    }, 16); // ~60fps
    
    // Replace the previous scroll handler
    window.removeEventListener('scroll', debouncedScrollHandler);
    window.addEventListener('scroll', debouncedScrollHandlerWithParallax, { passive: true });

    // Initialize active navigation
    updateActiveNav();

    // Service card expansion functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceExpansion = document.getElementById('service-expansion');
    const expansionTitle = document.getElementById('expansion-title');
    const closeExpansionBtn = document.getElementById('close-expansion');

    // Handle service card clicks (entire card is clickable)
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const button = this.querySelector('.learn-more-btn');
            const serviceType = button.getAttribute('data-service');
            const serviceTitle = this.getAttribute('data-title');
            showServiceExpansion(serviceType, serviceTitle, button);
        });
    });

    // Show service expansion with proper scroll positioning
    function showServiceExpansion(serviceType, serviceTitle, button) {
        // Update ARIA states for all buttons first
        document.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
        });
        
        // Hide all content sections first
        const allContent = document.querySelectorAll('.expansion-content');
        allContent.forEach(content => content.classList.add('hidden'));
        
        // Show the selected content section
        const selectedContent = document.getElementById(serviceType + '-content');
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
        
        // Update ARIA state for the clicked button
        if (button) {
            button.setAttribute('aria-expanded', 'true');
        }
        
        // Update title from data attribute
        expansionTitle.textContent = serviceTitle || 'Service Details';
        
        // Show expansion section with animation
        serviceExpansion.classList.remove('hidden');
        setTimeout(() => {
            serviceExpansion.classList.add('show');
            
            // Scroll to expansion after it's fully rendered
            setTimeout(() => {
                const headerHeight = 80;
                const expansionRect = serviceExpansion.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const expansionTop = expansionRect.top + scrollTop - headerHeight - 20;
                
                window.scrollTo({
                    top: expansionTop,
                    behavior: 'smooth'
                });
                
                // Focus the expansion for screen reader users
                serviceExpansion.focus();
            }, 200);
        }, 10);
    }
    
    // Close expansion functionality
    function closeServiceExpansion() {
        if (serviceExpansion && !serviceExpansion.classList.contains('hidden')) {
            // Reset all ARIA states
            document.querySelectorAll('.learn-more-btn').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // First scroll back to services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const headerHeight = 80;
                const servicesTop = servicesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: servicesTop,
                    behavior: 'smooth'
                });
                
                // Wait for scroll to complete, then hide expansion
                setTimeout(() => {
                    serviceExpansion.classList.remove('show');
                    setTimeout(() => {
                        serviceExpansion.classList.add('hidden');
                    }, 300);
                }, 500); // Wait for scroll animation to finish
            } else {
                // Fallback if services section not found
                serviceExpansion.classList.remove('show');
                setTimeout(() => {
                    serviceExpansion.classList.add('hidden');
                }, 300);
            }
        }
    }

    if (closeExpansionBtn) {
        closeExpansionBtn.addEventListener('click', closeServiceExpansion);
    }

    // Header scroll state functionality
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation
        updateActiveNav();
    }

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is reloaded at a scroll position
    handleScroll();
    
    // Initial active nav update
    updateActiveNav();
});

// Keep legacy function for backwards compatibility, but redirect to namespaced version
function scrollToSection(sectionId) {
    SBM.scrollToSection(sectionId);
}

// Add to SBM namespace
SBM.copyEmailToClipboard = function(event) {
    event.preventDefault();
    
    const email = 'rgdonohue@gmail.com';
    
    // Try to use the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            SBM.showNotification('Email copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            fallbackCopyTextToClipboard(email);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyTextToClipboard(email);
    }
};

// Global function for copying email to clipboard (legacy compatibility)
function copyEmailToClipboard(event) {
    SBM.copyEmailToClipboard(event);
}

// Fallback function for copying text to clipboard
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            SBM.showNotification('Email copied to clipboard!', 'success');
        } else {
            SBM.showNotification('Failed to copy email. Please copy manually: rgdonohue@gmail.com', 'error');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        SBM.showNotification('Failed to copy email. Please copy manually: rgdonohue@gmail.com', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Add cartographic animation enhancements when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle cartographic interactions to workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
        // Stagger the initial animation slightly
        step.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover enhancement for cartographic feel
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(2deg) rotateY(2deg)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Enhanced compass rose interactivity
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

// Preload images and resources
window.addEventListener('load', function() {
    // Add any resource preloading logic here
    console.log('Small Batch Maps website loaded successfully!');
}); 