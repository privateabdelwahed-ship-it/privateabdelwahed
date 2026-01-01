/* ===== Mobile Menu Toggle ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');
function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(link => link.addEventListener('click', linkAction));

/* ===== Header Scroll Effect ===== */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

/* ===== Active Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

/* ===== Smooth Scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== Scroll Animations ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    section.classList.add('scroll-animation');
    observer.observe(section);
});

// Observe skill bars
const skillBars = document.querySelectorAll('.skills__bar');
skillBars.forEach(bar => {
    observer.observe(bar);
});

/* ===== Skills Progress Bar Animation ===== */
function animateSkills() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const percentage = bar.querySelector('.skills__percentage');
        
        if (bar.classList.contains('animate') || bar.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
                percentage.style.width = level + '%';
            }, 200);
        }
    });
}

// Initial check
animateSkills();

// Check on scroll
window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const level = bar.getAttribute('data-level');
        const percentage = bar.querySelector('.skills__percentage');
        
        if (rect.top < window.innerHeight && rect.bottom > 0 && percentage.style.width === '0px' || !percentage.style.width) {
            setTimeout(() => {
                percentage.style.width = level + '%';
            }, 200);
        }
    });
});

/* ===== Project Filtering ===== */
const filterButtons = document.querySelectorAll('.projects__item');
const projectCards = document.querySelectorAll('.projects__card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        // Add active class to clicked button
        button.classList.add('active-filter');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition to project cards
projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s, transform 0.3s';
});

/* ===== Testimonials Slider ===== */
const testimonialContents = document.querySelectorAll('.testimonials__content');
const testimonialDots = document.querySelectorAll('.testimonials__dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialContents.forEach(content => {
        content.classList.remove('testimonials__active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active-dot');
    });
    
    // Show selected testimonial
    if (testimonialContents[index]) {
        testimonialContents[index].classList.add('testimonials__active');
    }
    
    // Add active class to selected dot
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active-dot');
    }
    
    currentTestimonial = index;
}

// Dot click event
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-slide testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialContents.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Pause on hover
const testimonialsContainer = document.querySelector('.testimonials__container');
if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialContents.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
}

/* ===== Form Validation ===== */
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('.contact__form-input');
const formMessage = document.getElementById('form-message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInput(input) {
    const errorSpan = input.parentElement.querySelector('.contact__form-error');
    let isValid = true;
    
    // Remove previous error styling
    input.style.borderColor = '#e2e8f0';
    errorSpan.textContent = '';
    
    // Check if required field is empty
    if (input.hasAttribute('required') && input.value.trim() === '') {
        errorSpan.textContent = 'This field is required';
        input.style.borderColor = '#ef4444';
        isValid = false;
    }
    // Check email format
    else if (input.type === 'email' && input.value.trim() !== '' && !emailRegex.test(input.value)) {
        errorSpan.textContent = 'Please enter a valid email address';
        input.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    return isValid;
}

// Real-time validation on input
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            validateInput(input);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
    // Validate all inputs
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        // Show success message
        formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        formMessage.className = 'contact__form-message success';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
        // Reset border colors
        formInputs.forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    } else {
        // Show error message
        formMessage.textContent = 'Please fill in all fields correctly.';
        formMessage.className = 'contact__form-message error';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

/* ===== Back to Top Button ===== */
const scrollUp = document.getElementById('scroll-up');

function showScrollUp() {
    if (scrollUp) {
        if (window.scrollY >= 560) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
}

// Smooth scroll to top
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===== Download CV Button ===== */
const downloadCvButton = document.getElementById('download-cv');
if (downloadCvButton) {
    downloadCvButton.addEventListener('click', (e) => {
        e.preventDefault();
        // You can replace this with actual CV download functionality
        alert('CV download functionality - Replace with your actual CV file link');
    });
}

/* ===== Initialize on Load ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    scrollActive();
    
    // Initialize skills animation
    animateSkills();
    
    // Show first testimonial
    if (testimonialContents.length > 0) {
        showTestimonial(0);
    }
});

/* ===== Performance Optimization: Throttle Scroll Events ===== */
function throttle(func, wait) {
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

// Apply throttling to scroll events for better performance
const throttledScrollActive = throttle(scrollActive, 100);
const throttledScrollHeader = throttle(scrollHeader, 100);
const throttledShowScrollUp = throttle(showScrollUp, 100);

// Replace original scroll listeners with throttled versions
window.addEventListener('scroll', throttledScrollActive);
window.addEventListener('scroll', throttledScrollHeader);
window.addEventListener('scroll', throttledShowScrollUp);

