/**
 * Spatialspec - Main JavaScript
 * Handles logo animation, service tiles, dropdowns, and user interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // Logo Animation Sequence
    // =============================================
    
    const logoSplash = document.getElementById('logo-splash');
    const headerLogo = document.getElementById('header-logo');
    
    // Animate logo splash screen, then move logo to header
    setTimeout(() => {
        // Hide splash screen
        if (logoSplash) {
            logoSplash.classList.add('hidden');
        }
        
        // Show header logo with animation
        if (headerLogo) {
            setTimeout(() => {
                headerLogo.classList.add('visible');
            }, 500);
        }
    }, 2500);
    
    // Header Contact Icon removed
    
    // =============================================
    // Service Tile Interactions
    // =============================================
    
    const serviceTiles = document.querySelectorAll('.service-tile');
    
    serviceTiles.forEach(tile => {
        const video = tile.querySelector('.tile-video video');
        
        tile.addEventListener('click', function() {
            openEmailPage();
        });
        
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            if (video) {
                video.play().catch(function() {});
            }
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
    
    // =============================================
    // Close all dropdowns and reset forms
    // =============================================
    
    function closeAllDropdowns() {
        document.querySelectorAll('.service-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        document.querySelectorAll('.btn-service, .btn-legal').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelectorAll('.contact-form').forEach(form => {
            form.classList.remove('active');
        });
    }

    // =============================================
    // Setup dropdown toggle functionality
    // =============================================
    
    function setupDropdownToggle(selector) {
        document.querySelectorAll(selector).forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const serviceItem = this.closest('.service-item');
                const dropdown = serviceItem ? serviceItem.querySelector('.service-dropdown') : null;
                const isActive = dropdown ? dropdown.classList.contains('active') : false;
                
                if (isActive && dropdown && serviceItem) {
                    // If already active, close this dropdown
                    dropdown.classList.remove('active');
                    serviceItem.classList.remove('active');
                    this.classList.remove('active');
                } else {
                    // Close all other dropdowns
                    document.querySelectorAll('.service-item').forEach(item => {
                        item.classList.remove('active');
                        const d = item.querySelector('.service-dropdown');
                        if (d) d.classList.remove('active');
                    });
                    document.querySelectorAll('.btn-service').forEach(b => b.classList.remove('active'));
                    
                    // Open this dropdown
                    if (dropdown && serviceItem) {
                        dropdown.classList.add('active');
                        serviceItem.classList.add('active');
                        this.classList.add('active');
                    }
                }
            });
        });
    }

    // Initialize dropdown toggles (exclude footer Privacy/Terms – they open full pages)
    setupDropdownToggle('.btn-service');
    setupDropdownToggle('.btn-legal');
    setupDropdownToggle('.btn-footer-link');

    // =============================================
    // Close connect page function
    // =============================================
    
    function closeConnectPage() {
        const connectPage = document.getElementById('connect-page');
        const servicesSection = document.getElementById('services-section');
        const siteFooter = document.querySelector('.site-footer');
        if (connectPage) {
            const isMobile = window.innerWidth <= 600;
            
            connectPage.classList.remove('show');
            connectPage.style.transform = '';
            connectPage.style.opacity = '0';
            
            if (siteFooter) {
                siteFooter.style.display = '';
                siteFooter.style.visibility = '';
                siteFooter.style.position = '';
                siteFooter.style.bottom = '';
            }
            
            if (isMobile) {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                document.body.style.overflow = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
            
            setTimeout(() => {
                connectPage.style.display = 'none';
            }, 300);
            if (servicesSection) {
                servicesSection.style.display = 'block';
            }
        }
    }

    // =============================================
    // Email page (form overlay, spatialspec-style)
    // =============================================
    const emailPage = document.getElementById('email-page');

    function closeEmailPage() {
        if (!emailPage) return;
        emailPage.classList.remove('show');
        emailPage.style.display = 'none';
        emailPage.style.opacity = '0';
        document.body.classList.remove('email-form-open');
        document.body.style.overflow = '';
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) servicesSection.style.display = 'block';
        const siteFooter = document.querySelector('.site-footer');
        if (siteFooter) {
            siteFooter.style.position = '';
            siteFooter.style.bottom = '';
            siteFooter.style.visibility = '';
            siteFooter.style.display = '';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openEmailPage() {
        if (!emailPage) return;
        closeConnectPage();
        closeLegalBodyPage();
        closeAllDropdowns();
        document.body.classList.add('email-form-open');
        emailPage.style.display = 'flex';
        emailPage.style.opacity = '0';
        document.body.style.overflow = 'hidden';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        emailPage.offsetHeight;
        emailPage.classList.remove('show');
        setTimeout(function() {
            emailPage.classList.add('show');
            const first = emailPage.querySelector('input[name="name"]');
            if (first) first.focus();
        }, 10);
    }

    document.querySelectorAll('.btn-open-email').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openEmailPage();
        });
    });

    document.querySelectorAll('.btn-close-email').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeEmailPage();
        });
    });

    if (emailPage) {
        emailPage.addEventListener('click', function(e) {
            if (e.target === emailPage) closeEmailPage();
        });
    }

    // =============================================
    // Privacy & Terms – open full-page overlay (new body)
    // =============================================
    const privacyPage = document.getElementById('privacy-page');
    const termsPage = document.getElementById('terms-page');
    const servicesSection = document.getElementById('services-section');

    function openLegalBodyPage(pageId) {
        const page = document.getElementById(pageId);
        if (!page) return;
        closeConnectPage();
        closeEmailPage();
        closeAllDropdowns();
        if (servicesSection) servicesSection.style.display = 'none';
        [privacyPage, termsPage].forEach(p => {
            if (p) {
                p.classList.remove('show');
                p.style.display = 'none';
                p.style.opacity = '0';
            }
        });
        page.style.display = 'flex';
        page.style.opacity = '0';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        page.offsetHeight;
        page.classList.remove('show');
        setTimeout(function() {
            page.classList.add('show');
        }, 10);
    }

    function closeLegalBodyPage() {
        [privacyPage, termsPage].forEach(p => {
            if (p) {
                p.classList.remove('show');
                p.style.display = 'none';
                p.style.opacity = '0';
            }
        });
        if (servicesSection) servicesSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.btn-footer-text[data-legal-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const pageId = this.getAttribute('data-legal-page');
            if (pageId) openLegalBodyPage(pageId);
        });
    });

    document.querySelectorAll('.btn-close-legal').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLegalBodyPage();
        });
    });

    // =============================================
    // Service dropdown styling - add class when value selected
    // =============================================
    
    document.querySelectorAll('.contact-form select[name="service"]').forEach(select => {
        if (select.value && select.value !== '') {
            select.classList.add('has-value');
        }
        
        select.addEventListener('change', function() {
            if (this.value && this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // =============================================
    // Form submission handler - submits to Web3Forms
    // =============================================
    
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending…';
            submitBtn.classList.add('sent');
            submitBtn.disabled = true;
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    submitBtn.textContent = 'Sent!';
                    this.reset();
                    const serviceSelect = this.querySelector('select[name="service"]');
                    if (serviceSelect) {
                        serviceSelect.classList.remove('has-value');
                    }
                } else {
                    submitBtn.textContent = data.message || 'Try again';
                }
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(function() {
                submitBtn.textContent = 'Failed – try again';
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    });

    // =============================================
    // Close dropdowns when clicking outside
    // =============================================
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-item')) {
            closeAllDropdowns();
        }
    });

    // =============================================
    // Keyboard accessibility - close on Escape
    // =============================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
            closeConnectPage();
            closeEmailPage();
            closeLegalBodyPage();
        }
    });
});
