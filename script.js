// Small Batch Maps - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = mobileMenuBtn.querySelector('.hamburger');
    const header = document.querySelector('.header');
    const hero = document.querySelector('#hero');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            hamburger.classList.remove('active');
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

    // Contact form handling with Formspree
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.classList.add('loading');
        submitButton.textContent = 'Sending...';
        
        // Collect form data
        const formData = new FormData(this);
        
        // Validate required fields
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const comment = formData.get('comment')?.trim();
        
        if (!name || !email || !comment) {
            showNotification('Please fill in all required fields.', 'error');
            submitButton.classList.remove('loading');
            submitButton.textContent = originalText;
            return;
        }
        
        // Submit to Formspree
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
            submitButton.textContent = originalText;
            
            if (response.ok) {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.', 'success');
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
            submitButton.textContent = originalText;
            
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

    // Throttled scroll listener
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            updateActiveNav();
            updateHeroLogoVisibility();
        }, 50);
    });

    // Show notification using HTML template
    function showNotification(message, type = 'info') {
        const template = document.getElementById('notification-template');
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
    }

    // Make showNotification available globally
    window.showNotification = showNotification;

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                hamburger.classList.remove('active');
            }
            
            // Close expanded service section
            if (serviceExpansion && !serviceExpansion.classList.contains('hidden')) {
                serviceExpansion.classList.remove('show');
                setTimeout(() => {
                    serviceExpansion.classList.add('hidden');
                }, 300);
            }
        }
    });

    // Parallax effect for hero section (subtle)
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            const heroBackground = hero.querySelector('.hero-bg');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

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
            const serviceType = this.querySelector('.learn-more-btn').getAttribute('data-service');
            const serviceTitle = this.getAttribute('data-title');
            showServiceExpansion(serviceType, serviceTitle);
        });
    });

    // Show service expansion with proper scroll positioning
    function showServiceExpansion(serviceType, serviceTitle) {
        // Hide all content sections first
        const allContent = document.querySelectorAll('.expansion-content');
        allContent.forEach(content => content.classList.add('hidden'));
        
        // Show the selected content section
        const selectedContent = document.getElementById(serviceType + '-content');
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
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
            }, 200);
        }, 10);
    }
    
    // Close expansion functionality
    function closeServiceExpansion() {
        if (serviceExpansion && !serviceExpansion.classList.contains('hidden')) {
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

// Global scroll function for CTA button
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Global function for copying email to clipboard
function copyEmailToClipboard(event) {
    event.preventDefault();
    
    const email = 'rgdonohue@gmail.com';
    
    // Try to use the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            window.showNotification('Email copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            fallbackCopyTextToClipboard(email);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyTextToClipboard(email);
    }
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
            window.showNotification('Email copied to clipboard!', 'success');
        } else {
            window.showNotification('Failed to copy email. Please copy manually: rgdonohue@gmail.com', 'error');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        window.showNotification('Failed to copy email. Please copy manually: rgdonohue@gmail.com', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Preload images and resources
window.addEventListener('load', function() {
    // Add any resource preloading logic here
    console.log('Small Batch Maps website loaded successfully!');
}); 