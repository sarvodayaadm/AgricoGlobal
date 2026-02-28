// ===== AGRICO GLOBAL - ENHANCED JAVASCRIPT =====
// 3D Effects, Animations, and Interactive Features

// ===== DOM Elements =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('enquiryForm');
const formMessage = document.getElementById('formMessage');

// ===== Mobile Menu Toggle =====
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                if (index === 1) spans[1].style.opacity = '0';
                if (index === 2) spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                span.style.transform = 'none';
                spans[1].style.opacity = '1';
            }
        });
    });
}

// ===== Smooth Scrolling for Navigation Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');

            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ===== Sticky Navigation with Scroll Effect =====
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky navbar scroll detection
    if (navbar && scrollTop > 50) {
        navbar.classList.add('scroll-active');
    } else if (navbar) {
        navbar.classList.remove('scroll-active');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();

    // Scroll to top button visibility
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }

    // 3D Parallax effect on hero
    applyParallaxEffect();
});

// ===== Scroll to Top =====
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Update Active Navigation Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===== Parallax Effect =====
function applyParallaxEffect() {
    const heroSection = document.querySelector('.premium-hero');
    if (!heroSection) return;

    const scrollTop = window.pageYOffset;
    const elemOffset = heroSection.offsetTop;
    const distance = scrollTop - elemOffset;

    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        if (distance > -window.innerHeight) {
            shape.style.transform = `translateY(${distance * speed}px)`;
        }
    });
}

// ===== 3D Hover Effects on Cards =====
const productCards = document.querySelectorAll('[data-3d]');
productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
});

// ===== Particle Animation =====
function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    if (!particlesContainer) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(151, 204, 4, ${Math.random() * 0.6 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 3 + 2}s infinite ease-in-out;
            pointer-events: none;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles on page load
window.addEventListener('load', createParticles);

// ===== Product Filter Functionality =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards2 = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        // Filter products
        productCards2.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.animation = 'slideUp 0.6s ease-out';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Form Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const company = document.getElementById('company').value;
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message || !product || !quantity) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Prepare WhatsApp message
        const whatsappMessage = `Hello Agrico Global,\n\nI'm interested in your products.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nProduct: ${product}\nQuantity: ${quantity}\n\nMessage: ${message}`;
        const whatsappUrl = `https://wa.me/918408967567?text=${encodeURIComponent(whatsappMessage)}`;

        // Show sending message
        showFormMessage('Sending your enquiry...', 'loading');

        setTimeout(() => {
            showFormMessage('✓ Your enquiry has been recorded! Opening WhatsApp...', 'success');
            
            // Open WhatsApp with pre-filled message
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Close message after 3 seconds
            setTimeout(() => {
                if (formMessage) formMessage.classList.remove('show');
            }, 3000);
        }, 800);
    });
}

// ===== Form Message Display =====
function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;

    if (type !== 'loading') {
        setTimeout(() => {
            if (formMessage.classList.contains('show')) {
                formMessage.classList.remove('show');
            }
        }, 5000);
    }
}

// ===== Select Product Function =====
function selectProduct(productName) {
    const productSelect = document.getElementById('product');
    if (productSelect) {
        productSelect.value = productName;
    }
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.why-card, .product-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ===== Smooth Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Add some keyboard navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===== Add ripple effect to buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== PREMIUM CAROUSEL FUNCTIONALITY =====
class PremiumCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds per slide

        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Set up event listeners
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover, resume on leave
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer?.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carouselContainer?.addEventListener('mouseleave', () => this.startAutoPlay());

        // Touch/swipe support
        this.setupSwipeSupport();

        // Start auto-play
        this.startAutoPlay();
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.slides[this.currentSlide].classList.add('prev');
        this.indicators[this.currentSlide]?.classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides.forEach(slide => slide.classList.remove('prev'));
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide]?.classList.add('active');

        // Reset auto-play timer
        this.resetAutoPlay();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    setupSwipeSupport() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;

        let startX = 0;
        let endX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        carouselContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', () => {
            const difference = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    // Swiped left - go to next slide
                    this.nextSlide();
                } else {
                    // Swiped right - go to previous slide
                    this.previousSlide();
                }
            }
        });
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new PremiumCarousel();
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    const carouselSection = document.querySelector('.carousel-section');
    if (!carouselSection) return;

    const rect = carouselSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isInView) {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.carousel-btn-prev')?.click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.carousel-btn-next')?.click();
        }
    }
});

console.log('Agrico Global - Premium Website Loaded Successfully!');

