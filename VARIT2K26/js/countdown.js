// Countdown Timer functionality

// Set the event date (January 8, 2026 at 9:00 AM)
const eventDate = new Date('2026-01-08T09:00:00').getTime();

// Store previous values to detect changes
let previousValues = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};

// Update countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM elements with animation
    updateElement('days', days);
    updateElement('hours', hours);
    updateElement('minutes', minutes);
    updateElement('seconds', seconds);
    
    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';
        
        // Optional: Show event started message
        const countdownTimer = document.getElementById('countdown');
        if (countdownTimer) {
            countdownTimer.innerHTML = '<p class="event-started" style="color: white; font-size: 2rem; font-weight: bold; text-shadow: 2px 2px 8px rgba(0,0,0,0.5);">Event has started!</p>';
        }
    }
}

// Update individual element with flip animation
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const formattedValue = formatNumber(value);
    
    // Only animate if value changed
    if (previousValues[id] !== formattedValue) {
        // Add flip animation class
        element.style.animation = 'flipIn 0.6s ease';
        
        // Update value
        element.textContent = formattedValue;
        
        // Remove animation class after it completes
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
        
        // Store new value
        previousValues[id] = formattedValue;
    }
}

// Format number to always show 2 digits
function formatNumber(num) {
    return num < 10 ? '0' + num : num.toString();
}

// Initialize countdown
let countdownInterval;

function initCountdown() {
    // Update immediately
    updateCountdown();
    
    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
} else {
    initCountdown();
}
