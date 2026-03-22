// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        hideLoader();
    }, 2000);

    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', toggleMobileMenu);
    navMenu.addEventListener('click', closeMobileMenu);

    // Counter animation
    animateCounters();

    // Form handling
    handleOrderForm();

    // Service selection preview
    handleServicePreview();

    // Intersection Observer for animations
    initScrollAnimations();

    // Particle background
    initParticles();
});

// Loading screen functions
function hideLoader() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// Scroll handling
function handleScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 100;
    
    header.style.background = scrolled 
        ? 'rgba(15, 15, 35, 0.95)' 
        : 'rgba(255, 255, 255, 0.1)';
    
    header.style.backdropFilter = scrolled ? 'blur(20px)' : 'blur(10px)';
}

// Smooth scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    closeMobileMenu();
}

// Mobile menu
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + (target > 100 ? 'K' : '%');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (target > 100 ? 'K' : '%');
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Order form handling
function handleOrderForm() {
    const form = document.getElementById('orderForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Đang xử lý...';
        submitBtn.disabled = true;
        
        // Show success message after 2 seconds
        setTimeout(() => {
            showSuccessMessage();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    });
}

function showSuccessMessage() {
    const message = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Đặt hàng thành công!</h3>
            <p>Admin sẽ liên hệ bạn trong 5 phút qua Telegram/Zalo</p>
        </div>
    `;
    
    const container = document.querySelector('.order');
    container.insertAdjacentHTML('beforeend', message);
    
    setTimeout(() => {
        document.querySelector('.success-message').remove();
    }, 5000);
}

// Service preview
function handleServicePreview() {
    const serviceSelect = document.getElementById('serviceSelect');
    
    serviceSelect.addEventListener('change', function() {
        const selectedService = this.value;
        const preview = document.querySelector('.order-preview');
        
        if (selectedService) {
            // Update preview with service info
            console.log('Selected service:', selectedService);
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.service-card, .pricing-card, .feature-item, .hero-content').forEach(el => {
        observer.observe(el);
    });
}

// Particle background
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
        };
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    resizeCanvas();
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// Window resize handler
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5 / 3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Button hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.btn-primary, .service-btn, .pricing-btn')) {
        e.target.style.transform = 'translateY(-3px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.matches('.btn-primary, .service-btn, .pricing-btn')) {
        e.target.style.transform = 'translateY(0)';
    }
});

// Add glow effect to popular pricing card
document.addEventListener('DOMContentLoaded', function() {
    const popularCard = document.querySelector('.pricing-card.popular');
    if (popularCard) {
        popularCard.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.6)';
        });
        
        popularCard.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    }
});

// Service cards stagger animation
function staggerAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

document.addEventListener('DOMContentLoaded', staggerAnimation);
