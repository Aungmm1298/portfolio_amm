// GSAP 3D Certificate Carousel - Manual Navigation Only
class CertificateCarousel {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.totalCards = 8;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        // Wait for GSAP and DOM to be ready
        if (typeof gsap === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.cards = document.querySelectorAll('.certificate-card');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');

        if (this.cards.length === 0) return;

        this.bindEvents();
        this.initCarousel();
    }

    bindEvents() {
        // Navigation buttons only - manual control
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                this.animateButtonClick(e.currentTarget);
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                this.animateButtonClick(e.currentTarget);
                this.nextSlide();
            });
        }

        // Optional keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    animateButtonClick(button) {
        // Quick pulse feedback
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
    }

    initCarousel() {
        // Hide all cards initially
        gsap.set(this.cards, {
            opacity: 0,
            scale: 0.5,
            x: '-50%',
            y: '-50%',
            rotationY: 0,
            transformOrigin: 'center center',
            zIndex: 1
        });

        // Animate cards in with beautiful fade effect
        gsap.to(this.cards, {
            opacity: 1,
            scale: 0.8,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            onComplete: () => {
                this.updateCarousel();
                this.updateButtonStates();
                this.highlightManualControls();
            }
        });
    }

    updateCarousel() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.cards.forEach((card, index) => {
            const position = this.getCardPosition(index);
            this.animateCardToPosition(card, position);
        });

        // Re-enable interactions after animation
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    getCardPosition(cardIndex) {
        const diff = cardIndex - this.currentIndex;
        const totalCards = this.totalCards;
        
        // Handle circular positioning
        let normalizedDiff = diff;
        if (diff > totalCards / 2) {
            normalizedDiff = diff - totalCards;
        } else if (diff < -totalCards / 2) {
            normalizedDiff = diff + totalCards;
        }

        if (normalizedDiff === 0) return 'center';
        if (normalizedDiff === 1 || normalizedDiff === -(totalCards - 1)) return 'right-1';
        if (normalizedDiff === 2 || normalizedDiff === -(totalCards - 2)) return 'right-2';
        if (normalizedDiff === -1 || normalizedDiff === totalCards - 1) return 'left-1';
        if (normalizedDiff === -2 || normalizedDiff === totalCards - 2) return 'left-2';
        
        return 'hidden';
    }

    animateCardToPosition(card, position) {
        const positions = {
            'center': {
                x: '-50%',
                y: '-50%',
                scale: 1,
                rotationY: 0,
                zIndex: 10,
                opacity: 1,
                filter: 'brightness(1.1)'
            },
            'left-1': {
                x: 'calc(-50% - 320px)',
                y: '-50%',
                scale: 0.8,
                rotationY: 30,
                zIndex: 5,
                opacity: 0.5,
                filter: 'brightness(0.8)'
            },
            'left-2': {
                x: 'calc(-50% - 550px)',
                y: '-50%',
                scale: 0.65,
                rotationY: 50,
                zIndex: 2,
                opacity: 0.3,
                filter: 'brightness(0.6)'
            },
            'right-1': {
                x: 'calc(-50% + 320px)',
                y: '-50%',
                scale: 0.8,
                rotationY: -30,
                zIndex: 5,
                opacity: 0.5,
                filter: 'brightness(0.8)'
            },
            'right-2': {
                x: 'calc(-50% + 550px)',
                y: '-50%',
                scale: 0.65,
                rotationY: -50,
                zIndex: 2,
                opacity: 0.3,
                filter: 'brightness(0.6)'
            },
            'hidden': {
                x: 'calc(-50% + 800px)',
                y: '-50%',
                scale: 0.4,
                rotationY: -70,
                zIndex: 1,
                opacity: 0,
                filter: 'brightness(0.4)'
            }
        };

        const config = positions[position];
        
        // Main animation
        gsap.to(card, {
            x: config.x,
            y: config.y,
            scale: config.scale,
            rotationY: config.rotationY,
            zIndex: config.zIndex,
            opacity: config.opacity,
            filter: config.filter,
            duration: 1.0,
            ease: "power3.inOut",
            transformOrigin: "center center"
        });

        // Enhanced glow effect for center card
        if (position === 'center') {
            gsap.to(card, {
                boxShadow: "0 30px 60px -12px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 0 2px rgba(59, 130, 246, 0.3)",
                duration: 0.6,
                ease: "power2.out"
            });
        } else {
            gsap.to(card, {
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                duration: 0.6,
                ease: "power2.out"
            });
        }
    }

    nextSlide() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
        this.updateButtonStates();
    }

    prevSlide() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
        this.updateButtonStates();
    }

    updateButtonStates() {
        // Visual feedback for manual navigation
        if (this.prevBtn) {
            gsap.to(this.prevBtn, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        if (this.nextBtn) {
            gsap.to(this.nextBtn, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }

    highlightManualControls() {
        // Subtle pulse to draw attention to manual controls
        if (this.prevBtn && this.nextBtn) {
            gsap.to([this.prevBtn, this.nextBtn], {
                scale: 1.05,
                duration: 0.8,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 2,
                delay: 2 // Wait 2 seconds after initial load
            });
        }
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure GSAP is fully loaded
    setTimeout(() => {
        new CertificateCarousel();
    }, 100);
});

// Also initialize if script loads after DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        new CertificateCarousel();
    }, 100);
}
