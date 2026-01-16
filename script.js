// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
// Mobile Navigation Toggle (only if elements exist)
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll (only if navbar exists)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Contact Form Handler (only if form exists)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.querySelectorAll('.contact-form-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Content Panel functionality
const contentPanel = document.getElementById('contentPanel');
const aboutDropdown = document.getElementById('aboutDropdown');
const servicesDropdown = document.getElementById('servicesDropdown');
const contactDropdown = document.getElementById('contactDropdown');
const aboutContent = document.getElementById('aboutDropdownContent');
const servicesContent = document.getElementById('servicesDropdownContent');
const contactContent = document.getElementById('contactDropdownContent');

function showContentInPanel(contentElement) {
    if (contentPanel && contentElement) {
        // Copy content to panel
        contentPanel.innerHTML = contentElement.innerHTML;
        
        // Scroll to panel smoothly
        contentPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

if (aboutDropdown && aboutContent) {
    aboutDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        // Close all dropdowns
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        // Show content in panel
        showContentInPanel(aboutContent);
    });
}

if (servicesDropdown && servicesContent) {
    servicesDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        // Close all dropdowns
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        // Show content in panel
        showContentInPanel(servicesContent);
    });
}

if (contactDropdown && contactContent) {
    contactDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        // Close all dropdowns
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        // Show content in panel
        showContentInPanel(contactContent);
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
    }
    // Close business and legal dropups when clicking outside
    const businessDropup = document.getElementById('businessDropup');
    const legalDropup = document.getElementById('legalDropup');
    if (businessDropup && !e.target.closest('.footer-link-container') && !e.target.closest('.dropup-content')) {
        businessDropup.classList.remove('show');
    }
    if (legalDropup && !e.target.closest('.footer-link-container') && !e.target.closest('.dropup-content')) {
        legalDropup.classList.remove('show');
    }
});

// Close dropdowns with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        const businessDropup = document.getElementById('businessDropup');
        const legalDropup = document.getElementById('legalDropup');
        if (businessDropup) businessDropup.classList.remove('show');
        if (legalDropup) legalDropup.classList.remove('show');
    }
});

// Business and Legal Links Dropup functionality
const businessLink = document.getElementById('businessLink');
const businessDropup = document.getElementById('businessDropup');
const legalLink = document.getElementById('legalLink');
const legalDropup = document.getElementById('legalDropup');
const privacyLink = document.getElementById('privacyLink');
const termsLink = document.getElementById('termsLink');
const privacyDropup = document.getElementById('privacyDropup');
const termsDropup = document.getElementById('termsDropup');
const privacyModalLink = document.getElementById('privacyModalLink');
const termsModalLink = document.getElementById('termsModalLink');

if (privacyLink && privacyDropup) {
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = privacyDropup.classList.contains('show');
        
        // Close all other dropdowns/dropups
        const aboutContent = document.getElementById('aboutDropdownContent');
        const servicesContent = document.getElementById('servicesDropdownContent');
        const contactContent = document.getElementById('contactDropdownContent');
        const spatialspecDropup = document.getElementById('spatialspecDropup');
        const copyrightDropup = document.getElementById('copyrightDropup');
        const termsDropupEl = document.getElementById('termsDropup');
        
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        if (spatialspecDropup) spatialspecDropup.classList.remove('show');
        if (copyrightDropup) copyrightDropup.classList.remove('show');
        if (termsDropupEl) termsDropupEl.classList.remove('show');
        
        // Toggle privacy dropup
        if (!isOpen) {
            privacyDropup.classList.add('show');
        } else {
            privacyDropup.classList.remove('show');
        }
    });
    
    // Prevent dropup from closing when clicking inside it
    privacyDropup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

if (termsLink && termsDropup) {
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = termsDropup.classList.contains('show');
        
        // Close all other dropdowns/dropups
        const aboutContent = document.getElementById('aboutDropdownContent');
        const servicesContent = document.getElementById('servicesDropdownContent');
        const contactContent = document.getElementById('contactDropdownContent');
        const spatialspecDropup = document.getElementById('spatialspecDropup');
        const copyrightDropup = document.getElementById('copyrightDropup');
        const privacyDropupEl = document.getElementById('privacyDropup');
        
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        if (spatialspecDropup) spatialspecDropup.classList.remove('show');
        if (copyrightDropup) copyrightDropup.classList.remove('show');
        if (privacyDropupEl) privacyDropupEl.classList.remove('show');
        
        // Toggle terms dropup
        if (!isOpen) {
            termsDropup.classList.add('show');
        } else {
            termsDropup.classList.remove('show');
        }
    });
    
    // Prevent dropup from closing when clicking inside it
    termsDropup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Modal functionality
const privacyModal = document.getElementById('privacyModal');
const termsModal = document.getElementById('termsModal');
const privacyClose = document.getElementById('privacyClose');
const termsClose = document.getElementById('termsClose');

// Open Privacy Policy Modal from dropup link
if (privacyModalLink && privacyModal) {
    privacyModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (privacyDropup) privacyDropup.classList.remove('show');
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Open Terms of Service Modal from dropup link
if (termsModalLink && termsModal) {
    termsModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (termsDropup) termsDropup.classList.remove('show');
        termsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close Privacy Policy Modal
if (privacyClose && privacyModal) {
    privacyClose.addEventListener('click', () => {
        privacyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close Terms Modal
if (termsClose && termsModal) {
    termsClose.addEventListener('click', () => {
        termsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modals when clicking outside
if (privacyModal || termsModal) {
    window.addEventListener('click', (e) => {
        if (privacyModal && e.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (termsModal && e.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (privacyModal) privacyModal.style.display = 'none';
        if (termsModal) termsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Business Dropup functionality
if (businessLink && businessDropup) {
    businessLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = businessDropup.classList.contains('show');
        
        // Close all other dropdowns/dropups
        const aboutContent = document.getElementById('aboutDropdownContent');
        const servicesContent = document.getElementById('servicesDropdownContent');
        const contactContent = document.getElementById('contactDropdownContent');
        const legalDropupEl = document.getElementById('legalDropup');
        
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        if (legalDropupEl) legalDropupEl.classList.remove('show');
        
        // Toggle business dropup
        if (!isOpen) {
            businessDropup.classList.add('show');
        } else {
            businessDropup.classList.remove('show');
        }
    });
    
    // Prevent dropup from closing when clicking inside it
    businessDropup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Legal Dropup functionality
if (legalLink && legalDropup) {
    legalLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = legalDropup.classList.contains('show');
        
        // Close all other dropdowns/dropups
        const aboutContent = document.getElementById('aboutDropdownContent');
        const servicesContent = document.getElementById('servicesDropdownContent');
        const contactContent = document.getElementById('contactDropdownContent');
        const businessDropupEl = document.getElementById('businessDropup');
        
        if (aboutContent) aboutContent.classList.remove('show');
        if (servicesContent) servicesContent.classList.remove('show');
        if (contactContent) contactContent.classList.remove('show');
        if (businessDropupEl) businessDropupEl.classList.remove('show');
        
        // Toggle legal dropup
        if (!isOpen) {
            legalDropup.classList.add('show');
        } else {
            legalDropup.classList.remove('show');
        }
    });
    
    // Prevent dropup from closing when clicking inside it
    legalDropup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

}); // End DOMContentLoaded
