// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
}

// Generate Stars in Hero Section
function generateStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

generateStars();

// Intersection Observer for Fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.skill-category, .project-card, .info-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Send to Formspree (replace YOUR_FORM_ID with actual ID from formspree.io)
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            submitBtn.textContent = 'Failed to send. Try again.';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Skill progress bar animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = width;
            }, 100);
            
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
            setTimeout(() => {
                button.style.display = 'none';
            }, 300);
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const counters = entry.target.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                // Only animate if it's a valid number
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Project card interaction
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) rotateZ(0.5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateZ(0deg)';
    });
});

// Add stagger animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.background = 'rgba(255,255,255,0.15)';
        this.style.borderColor = 'rgba(255,255,255,0.6)';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.background = 'rgba(255,255,255,0.1)';
            this.style.borderColor = 'rgba(255,255,255,0.3)';
        }
    });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent FOUC
document.body.style.opacity = '0';
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll performance optimization
const smoothScroll = debounce(() => {
    // Your scroll handler
}, 150);

// Add CSS for nav link active state
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeIn 0.8s ease-out ${index * 0.2}s forwards`;
    });
});

// Carousel functionality for mobile
function initCarousel() {
    const isMobile = window.innerWidth <= 768;
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectsGrid || projectCards.length === 0) return;
    
    // Remove existing carousel controls if they exist
    const existingControls = document.querySelector('.carousel-controls');
    const existingIndicators = document.querySelector('.carousel-indicators');
    if (existingControls) existingControls.remove();
    if (existingIndicators) existingIndicators.remove();
    
    if (isMobile) {
        let currentSlide = 0;
        
        // Create carousel controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'carousel-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn';
        prevBtn.innerHTML = '<i class=\"fas fa-chevron-left\"></i>';
        prevBtn.setAttribute('aria-label', 'Previous certificate');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn';
        nextBtn.innerHTML = '<i class=\"fas fa-chevron-right\"></i>';
        nextBtn.setAttribute('aria-label', 'Next certificate');
        
        controlsDiv.appendChild(prevBtn);
        controlsDiv.appendChild(nextBtn);
        
        // Create indicators
        const indicatorsDiv = document.createElement('div');
        indicatorsDiv.className = 'carousel-indicators';
        
        projectCards.forEach((card, index) => {
            const dot = document.createElement('span');
            dot.className = 'indicator-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            indicatorsDiv.appendChild(dot);
        });
        
        // Insert controls after grid
        projectsGrid.parentNode.insertBefore(controlsDiv, projectsGrid.nextSibling);
        projectsGrid.parentNode.insertBefore(indicatorsDiv, controlsDiv.nextSibling);
        
        // Show first card
        projectCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === 0) card.classList.add('active');
        });
        
        function updateSlide() {
            projectCards.forEach((card, index) => {
                card.classList.remove('active');
                if (index === currentSlide) {
                    card.classList.add('active');
                }
            });
            
            // Update indicators
            const dots = indicatorsDiv.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentSlide) {
                    dot.classList.add('active');
                }
            });
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlide();
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + projectCards.length) % projectCards.length;
            updateSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % projectCards.length;
            updateSlide();
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        projectsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        projectsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next
                currentSlide = (currentSlide + 1) % projectCards.length;
                updateSlide();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - prev
                currentSlide = (currentSlide - 1 + projectCards.length) % projectCards.length;
                updateSlide();
            }
        }
    } else {
        // Desktop view - show all cards
        projectCards.forEach(card => {
            card.classList.remove('active');
            card.style.display = 'block';
        });
    }
}

// Console message
console.log('🎨 Welcome to the portfolio website! Built with passion and precision.');
console.log('📧 Get in touch at contact@portfolio.com');

// Certificate Image Viewer
document.addEventListener('DOMContentLoaded', () => {
    // Create modal for certificate viewing
    const modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(255,255,255,0.3);
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        color: white;
        font-size: 50px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#6366f1';
    closeBtn.onmouseout = () => closeBtn.style.color = 'white';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Add click handlers to certificate links
    const certLinks = document.querySelectorAll('.project-link[href$=".jpg"]');
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modalImg.src = link.getAttribute('href');
            modal.style.display = 'flex';
        });
    });
    
    // Close modal on click
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});
