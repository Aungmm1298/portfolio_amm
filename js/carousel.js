// Modern 3D Certificate Carousel
class CertificateCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.indicators = container.querySelectorAll('.indicator');
        this.prevBtn = container.querySelector('.carousel-nav.prev');
        this.nextBtn = container.querySelector('.carousel-nav.next');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
        this.autoPlay();
        this.createParticles();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        // Calculate rotation angle
        const rotationAngle = -(this.currentSlide * (360 / this.totalSlides));
        
        // Update container rotation
        const carouselContainer = this.container.querySelector('.carousel-container');
        carouselContainer.style.transform = `rotateY(${rotationAngle}deg)`;
        
        // Update slide states
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index === (this.currentSlide + 1) % this.totalSlides) {
                slide.classList.add('next');
            } else if (index === (this.currentSlide - 1 + this.totalSlides) % this.totalSlides) {
                slide.classList.add('prev');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
        
        // Add subtle shake effect to active slide
        this.addActiveSlideEffect();
    }
    
    addActiveSlideEffect() {
        const activeSlide = this.slides[this.currentSlide];
        activeSlide.style.animation = 'none';
        setTimeout(() => {
            activeSlide.style.animation = 'slideIn 0.6s ease-out';
        }, 100);
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, 5000);
    }
    
    pauseAutoPlay() {
        this.isPaused = true;
    }
    
    resumeAutoPlay() {
        this.isPaused = false;
    }
    
    createParticles() {
        const particleContainer = this.container.querySelector('.particle-container');
        if (!particleContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particleContainer.appendChild(particle);
        }
    }
}

// Enhanced certificate card interactions
class CertificateCard {
    constructor(card) {
        this.card = card;
        this.init();
    }
    
    init() {
        this.addHoverEffects();
        this.addClickEffects();
    }
    
    addHoverEffects() {
        this.card.addEventListener('mouseenter', () => {
            this.card.style.transform = 'translateY(-10px) scale(1.02)';
            this.addGlowEffect();
        });
        
        this.card.addEventListener('mouseleave', () => {
            this.card.style.transform = 'translateY(0) scale(1)';
            this.removeGlowEffect();
        });
        
        // Parallax effect on mouse move
        this.card.addEventListener('mousemove', (e) => {
            const rect = this.card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.card.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
    
    addClickEffects() {
        this.card.addEventListener('click', () => {
            this.card.classList.add('clicked');
            setTimeout(() => {
                this.card.classList.remove('clicked');
            }, 300);
        });
    }
    
    addGlowEffect() {
        const certType = this.card.dataset.certType;
        if (certType) {
            this.card.classList.add(`glow-${certType}`);
        }
    }
    
    removeGlowEffect() {
        this.card.className = this.card.className.replace(/glow-[\w-]+/g, '');
    }
}

// Smooth scroll to certificate section
function scrollToCertificates() {
    const certificateSection = document.getElementById('certificate');
    if (certificateSection) {
        certificateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    const carouselContainer = document.querySelector('.certificate-carousel');
    if (carouselContainer) {
        new CertificateCarousel(carouselContainer);
    }
    
    // Initialize certificate cards
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        new CertificateCard(card);
    });
    
    // Add loading animation
    const certificateSection = document.getElementById('certificate');
    if (certificateSection) {
        certificateSection.classList.add('loading-pulse');
        setTimeout(() => {
            certificateSection.classList.remove('loading-pulse');
        }, 2000);
    }
});

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotateY(var(--rotation)) translateZ(300px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) rotateY(var(--rotation)) translateZ(300px) scale(1);
        }
    }
    
    .clicked {
        animation: clickPulse 0.3s ease-out;
    }
    
    @keyframes clickPulse {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
    
    .glow-huawei { box-shadow: 0 0 30px rgba(255, 107, 53, 0.4) !important; }
    .glow-google { box-shadow: 0 0 30px rgba(66, 133, 244, 0.4) !important; }
    .glow-cybrary { box-shadow: 0 0 30px rgba(233, 75, 60, 0.4) !important; }
    .glow-agoda { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4) !important; }
    .glow-ai { box-shadow: 0 0 30px rgba(139, 92, 246, 0.4) !important; }
    .glow-jiwc { box-shadow: 0 0 30px rgba(220, 38, 38, 0.4) !important; }
    .glow-aws { box-shadow: 0 0 30px rgba(255, 153, 0, 0.4) !important; }
    .glow-huawei-ai { box-shadow: 0 0 30px rgba(225, 29, 72, 0.4) !important; }
`;
document.head.appendChild(style);
