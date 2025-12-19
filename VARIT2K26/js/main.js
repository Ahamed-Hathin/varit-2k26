// Main application logic

// Render events
function renderEvents(events = eventsData) {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-6 col-lg-4';
        
        // Create category badge with proper formatting
        const categoryDisplay = event.category === 'non-technical' ? 'Non-Technical' : 'Technical';
        const categoryClass = event.category === 'technical' ? 'badge-technical' : 'badge-non-technical';
        
        eventCard.innerHTML = `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-card-header ${event.category}">
                 <img src="${event.img}" alt="${event.title}" class="event-card-image">
                </div>
                <div class="event-card-body">
                    <h3 class="event-card-title">${event.title}</h3>
                    <p class="event-card-description">${event.description}</p>
                    <span class="event-category-badge ${categoryClass}">${categoryDisplay}</span>
                    <button class="btn btn-sm btn-primary mt-3 w-100">View Rules</button>
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
        
        // Add click handler to open modal
        eventCard.querySelector('.event-card').addEventListener('click', () => {
            openEventModal(event);
        });
    });
    
    // Add staggered animations
    const eventCards = eventsGrid.querySelectorAll('.col-md-6');
    addStaggerAnimation(eventCards, 100);    
}

// Open event modal
function openEventModal(event) {
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    
    const categoryDisplay = event.category === 'non-technical' ? 'Non-Technical' : 'Technical';
    
    document.getElementById('modalEventTitle').textContent = event.title;
    document.getElementById('modalEventDescription').textContent = event.description;
    document.getElementById('modalEventCategory').textContent = categoryDisplay;
    
    // Populate rules
    const rulesList = document.getElementById('modalEventRules');
    rulesList.innerHTML = '';
    event.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });
    
    // Clear any existing topics section first
    const existingTopics = rulesList.parentNode.querySelector('.event-topics');
    if (existingTopics) {
        existingTopics.remove();
    }
    
    // Add topics section only for Slide Sync event (evt3)
    if (event.id === 'evt3' && event.Topics && event.Topics.length > 0) {
        const topicsSection = document.createElement('div');
        topicsSection.className = 'event-topics mt-4';
        topicsSection.innerHTML = `
            <h6><i class="fas fa-lightbulb"></i> Available Topics</h6>
            <ul class="topics-list"></ul>
        `;
        
        const topicsList = topicsSection.querySelector('.topics-list');
        event.Topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            topicsList.appendChild(li);
        });
        
        rulesList.parentNode.appendChild(topicsSection);
    }
    
    modal.show();
}

// Initialize application
function initApp() {
    // Render events
    renderEvents();
    
    console.log('College Symposium Website Initialized');
}

// Run on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
