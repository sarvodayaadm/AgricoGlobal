// ===== DOM Elements =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const enquiryForm = document.getElementById('enquiryForm');
const formMessage = document.getElementById('formMessage');

// ===== Mobile Menu Toggle =====
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

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
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ===== Scroll to Top Button =====
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }

    // Update active navigation based on scroll position
    updateActiveNav();
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Update Active Navigation Based on Scroll =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ===== Form Submission Handler =====
enquiryForm.addEventListener('submit', (e) => {
    // Get form data for validation
    const formData = new FormData(enquiryForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validate form
    if (!validateForm(data)) {
        e.preventDefault();
        return;
    }

    // For Netlify Forms, we let the form submit naturally
    // Netlify will handle the submission and redirect
    console.log('Form submitted with data:', data);
});

// ===== Form Validation =====
function validateForm(data) {
    // Check required fields
    if (!data.name || data.name.trim() === '') {
        showFormError('Please enter your name');
        return false;
    }

    if (!data.email || data.email.trim() === '') {
        showFormError('Please enter your email address');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormError('Please enter a valid email address');
        return false;
    }

    if (!data.phone || data.phone.trim() === '') {
        showFormError('Please enter your phone number');
        return false;
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showFormError('Please enter a valid phone number');
        return false;
    }

    if (!data.message || data.message.trim() === '') {
        showFormError('Please enter your message');
        return false;
    }

    return true;
}

// ===== Show Form Error =====
function showFormError(message) {
    formMessage.textContent = message;
    formMessage.className = 'form-message error';
    
    setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 4000);
}

// ===== Product Card Animation on Scroll =====
function animateOnScroll() {
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===== Initialize Animations =====
window.addEventListener('load', () => {
    animateOnScroll();
});

// ===== Add to/Enquire Now Buttons Handler =====
const productButtons = document.querySelectorAll('.product-btn');

productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get product name from the card
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Pre-fill the product field in the form
        setTimeout(() => {
            const productSelect = document.getElementById('product');
            // Find and select the matching option
            for (let i = 0; i < productSelect.options.length; i++) {
                if (productSelect.options[i].text.includes(productName) || 
                    productName.includes(productSelect.options[i].text.split('(')[0].trim())) {
                    productSelect.selectedIndex = i;
                    // Highlight the select field briefly
                    productSelect.style.border = '2px solid #97cc04';
                    setTimeout(() => {
                        productSelect.style.border = '';
                    }, 2000);
                    break;
                }
            }
        }, 800);
    });
});

// ===== Header Shadow on Scroll =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Prevent Form Resubmission on Page Refresh =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== Add Hover Effect to Social Icons =====
const socialIcons = document.querySelectorAll('.social-icons a, .footer-social a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// ===== Console Welcome Message =====
console.log('%c Welcome to AgriCo Global! ', 'background: #2c5f2d; color: #fff; font-size: 16px; padding: 10px;');
console.log('%c Your trusted partner for premium agricultural products worldwide ', 'color: #97cc04; font-size: 12px;');
