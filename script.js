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
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showFormMessage('Sending your enquiry...', 'loading');

        setTimeout(() => {
            showFormMessage('Thank you! Your enquiry has been sent successfully. We will contact you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });
}

// ===== Form Message Display =====
function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;

    if (type !== 'loading') {
        setTimeout(() => {
            formMessage.classList.remove('show');
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

console.log('Agrico Global - Premium Website Loaded Successfully!');
