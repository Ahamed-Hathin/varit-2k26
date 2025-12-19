// Animation initialization and management

// Initialize AOS (Animate On Scroll)
function initAOS() {
    AOS.init({
        duration: 600,
        easing: 'ease-out',
        once: true,
        offset: 100,
        delay: 0
    });
}

// Add staggered animations to dynamically created elements
function addStaggerAnimation(elements, baseDelay = 100) {
    elements.forEach((element, index) => {
        element.setAttribute('data-aos', 'fade-up');
        element.setAttribute('data-aos-delay', (index * baseDelay).toString());
    });
    
    // Refresh AOS to recognize new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Trigger animation on element
function triggerAnimation(element, animationClass) {
    element.classList.add(animationClass);
    
    // Remove animation class after it completes to allow re-triggering
    element.addEventListener('animationend', function() {
        element.classList.remove(animationClass);
    }, { once: true });
}

// Initialize animations
function initAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        initAOS();
    }
    
    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
