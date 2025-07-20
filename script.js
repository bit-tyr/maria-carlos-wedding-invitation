// Wedding Invitation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const envelopeSection = document.getElementById('envelopeSection');
    const invitationContent = document.getElementById('invitationContent');
    const waxSeal = document.getElementById('waxSeal');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicControl = document.getElementById('musicControl');
    
    // Wedding date for countdown
    const weddingDate = new Date('2025-07-01T18:00:00').getTime();
    
    // Initialize
    init();
    
    function init() {
        setupEnvelopeAnimation();
        setupMusicControl();
        setupCountdown();
        setupFormHandling();
        setupSmoothScrolling();
        setupCopyButton();
    }
    
    // Envelope Animation
    function setupEnvelopeAnimation() {
        waxSeal.addEventListener('click', function() {
            // Add opening animation
            waxSeal.style.transform = 'translate(-50%, -50%) scale(0)';
            waxSeal.style.opacity = '0';
            
            // Hide envelope section and show invitation
            setTimeout(() => {
                envelopeSection.style.opacity = '0';
                envelopeSection.style.transform = 'translateY(-100px)';
                
                setTimeout(() => {
                    envelopeSection.style.display = 'none';
                    invitationContent.classList.add('show');
                    
                    // Start background music
                    playBackgroundMusic();
                    
                    // Show music control
                    musicControl.style.display = 'flex';
                    
                }, 800);
            }, 500);
        });
    }
    
    // Music Control
    function setupMusicControl() {
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.textContent = '⏸️';
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = '▶️';
            }
        });
    }
    
    function playBackgroundMusic() {
        backgroundMusic.play().catch(function(error) {
            console.log('Auto-play prevented:', error);
            musicToggle.textContent = '▶️';
        });
    }
    
    // Countdown Timer
    function setupCountdown() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                daysElement.textContent = days.toString().padStart(3, '0');
                hoursElement.textContent = hours.toString().padStart(2, '0');
                minutesElement.textContent = minutes.toString().padStart(2, '0');
                secondsElement.textContent = seconds.toString().padStart(2, '0');
            } else {
                daysElement.textContent = '000';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
            }
        }
        
        // Update countdown immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Form Handling
    function setupFormHandling() {
        const rsvpForm = document.querySelector('.rsvp-form');
        const confirmBtn = document.querySelector('.confirm-btn');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleRSVPSubmission();
            });
        }
    }
    
    function handleRSVPSubmission() {
        const formData = {
            guests: document.getElementById('guests').value,
            guestName: document.getElementById('guestName').value,
            allergies: document.getElementById('allergies').value,
            bus: document.querySelector('input[name="bus"]:checked')?.value || '',
            song: document.getElementById('song').value,
            message: document.getElementById('message').value
        };
        
        // Validate required fields
        if (!formData.guests || !formData.guestName) {
            showNotification('Por favor completa los campos obligatorios', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('¡Gracias por confirmar tu asistencia!', 'success');
        
        // Reset form
        setTimeout(() => {
            document.querySelector('.rsvp-form').reset();
        }, 2000);
    }
    
    // Smooth Scrolling
    function setupSmoothScrolling() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const parentsSection = document.querySelector('.parents-section');
                if (parentsSection) {
                    parentsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
    
    // Copy Button Functionality
    function setupCopyButton() {
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const accountNumber = 'ES99 0000 0000 0000';
                
                // Try to copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(accountNumber).then(function() {
                        showNotification('Número de cuenta copiado al portapapeles', 'success');
                    }).catch(function() {
                        fallbackCopyTextToClipboard(accountNumber);
                    });
                } else {
                    fallbackCopyTextToClipboard(accountNumber);
                }
            });
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Número de cuenta copiado al portapapeles', 'success');
        } catch (err) {
            showNotification('No se pudo copiar el número de cuenta', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            default:
                notification.style.background = '#3b82f6';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Intersection Observer for animations
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.event-card, .timeline-item, .gift-option, .photo-item');
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize scroll animations after content is shown
    setTimeout(() => {
        setupScrollAnimations();
    }, 1000);
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .event-card, .timeline-item, .gift-option, .photo-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .event-card.animate-in, .timeline-item.animate-in, .gift-option.animate-in, .photo-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
        // Adjust any responsive elements if needed
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific adjustments
            const musicControl = document.querySelector('.music-control');
            if (musicControl) {
                musicControl.style.width = '50px';
                musicControl.style.height = '50px';
            }
        }
    });
    
    // Preload images and resources
    function preloadResources() {
        const imagesToPreload = [
            // Add any image URLs here when you have actual images
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadResources();
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add error handling for audio
    backgroundMusic.addEventListener('error', function() {
        console.log('Audio failed to load');
        musicToggle.textContent = '🔇';
        musicToggle.disabled = true;
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Space bar to toggle music
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            musicToggle.click();
        }
        
        // Enter to open envelope
        if (e.code === 'Enter' && envelopeSection.style.display !== 'none') {
            waxSeal.click();
        }
    });
    
    // Add focus management for accessibility
    waxSeal.setAttribute('tabindex', '0');
    waxSeal.setAttribute('role', 'button');
    waxSeal.setAttribute('aria-label', 'Abrir invitación de boda');
    
    musicToggle.setAttribute('aria-label', 'Controlar música de fondo');
    
    // Add ARIA labels for form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        const label = element.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            element.setAttribute('aria-describedby', label.textContent);
        }
    });
});

// Additional utility functions
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('es-ES', options);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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

// Export functions for potential external use
window.WeddingInvitation = {
    showNotification: function(message, type) {
        // This allows external scripts to show notifications
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }
};
