// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
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

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .benefit-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add staggered animations to services
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (you can integrate with actual form handler)
            const button = this.querySelector('.btn-primary');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Add hover effects to portfolio metrics
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const numericValue = target.replace(/[^0-9]/g, '');
            const suffix = target.replace(/[0-9]/g, '');
            
            if (numericValue) {
                let current = 0;
                const increment = numericValue / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = numericValue + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            }
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Analytics tracking can be added here
            console.log('Phone number clicked:', this.href);
        });
    });

    // Add mailto click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Analytics tracking can be added here
            console.log('Email clicked:', this.href);
        });
    });

    // Service card hover effects
    const serviceCardsHover = document.querySelectorAll('.service-card');
    serviceCardsHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(37, 99, 235, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0)';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#2563eb';
        });
    });
});

// Add CSS for scroll-to-top button hover effect
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top:hover {
        background: #1d4ed8 !important;
        transform: translateY(-5px) scale(1.1) !important;
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4) !important;
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);