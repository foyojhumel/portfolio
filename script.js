// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('glass-nav');
        navbar.classList.remove('py-3');
    }
});

// Fun fact button data
const funFacts = [
    "I was a DOST Scholar in college.",
    "I am a registered Mechanical Engineer.",
    "My first Computer Science course is CS50P."
];

let currentFactIndex = 0;
let hideTimeout;

const factBtn = document.getElementById('fact-btn');
const factContainer = document.getElementById('fun-fact-container');
const factText = document.getElementById('profile-fun-fact');
const btnSpan = factBtn.querySelector('span');

// Function to show fun fact
function showFact() {
    factContainer.classList.add('show');
    factText.textContent = `${funFacts[currentFactIndex]}`;
    btnSpan.textContent = 'Click for Next Fun Fact';

    // Clear any existing timeout
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }
}

// Function to hide fun fact
function hideFact() {
    factContainer.classList.remove('show');
    btnSpan.textContent = 'Show Fun Fact';

    // Reset to first fun fact for next time
    currentFactIndex = 0;
}

// Function to cycle to next fact
function nextFact() {
    // Move to next fun fact (cycle back to 0 or first after last fact)
    currentFactIndex = (currentFactIndex + 1) % funFacts.length;
    factText.textContent = `${funFacts[currentFactIndex]}`;
}

// Click event for button
factBtn.addEventListener('click', (e) => {
    e.stopPropagation();  // Prevent event from bubbling

    if (!factContainer.classList.contains('show')) {
        // If hidden, show the first fun fact
        currentFactIndex = 0;
        showFact();
    }
    else {
        // If showing, go to next fun fact
        nextFact();
    }
});

// Mouse enter event for button
factBtn.addEventListener('mouseenter', () => {
    // Clear any pending hide timeout
    if (hideTimeout) {
        clearTimeout = null;
    }

    // If not showing, show the first fun fact
    if (!factContainer.classList.contains('show')) {
        currentFactIndex = 0;
        showFact();
    }
});

// Mouse leave event for button
factBtn.addEventListener('mouseleave', () => {
    // Set a timeout to hide the fact after 1 second
    hideTimeout = setTimeout(() => {
        hideFact();
        hideTimeout = null;
    }, 1000);
});

// Keep fun fact visible when hovering over the fact container
factContainer.addEventListener('mouseenter', () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
});

factContainer.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        hideFact();
        hideTimeout = null;
    }, 1000);
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link (already handled by onclick)
// Close mobile menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Data Fetching for hobbies and contacts
async function loadData() {
    try {
        // Hobbies data
        const hobbies = [
            { name: '📺 Binge-Watching', description: 'I love spending my free time watching movies, drama series, and'
                + ' and anime. I\'m especially into action-packed stories, lighthearted romantic comedies, mind-bending'
                + ' sci-fi, eye-opening documentaries, and those slice-of-life shows that feel so relatable.'
            },
            { name: '🍔 Eating', description: 'I really enjoy sharing good food with my girlfriend and my family.'
                + ' My comfort picks are hamburger, pasta, and fried chicken - definitely not the healthiest options,'
                + ' but they\'re the ones I can\'t resist.' 
            },
            { name: '🎧 Music Listening', description: 'Music always sets the vibe for me. I usually find myself'
                + ' listening to OPM, hip-hop, and alternative rock - and NO, I can\'t sing.'
            }
        ];
        
        // Populating hobbies grid from constant hobbies array
        const hobbiesGrid = document.getElementById('hobbies-grid');
        hobbiesGrid.innerHTML = hobbies.map(hobby => `
            <div class="hobby-card">
                <h3>${hobby.name}</h3>
                <p>${hobby.description}</p>
            </div>
        `).join('');

        // Contacts data
        const contacts = [
            { platform: 'GitHub', url: 'https://github.com/foyojhumel' },
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jhumel-a-foyo' },
            { platform: '📧 foyojhumel24@gmail.com', url: '#' }
        ];
        
        // Populating contact list from constant contacts array
        const contactList = document.getElementById('contact-list');
        contactList.innerHTML = contacts.map(contact => `
            <a href="${contact.url}" target="_blank" class="contact-link">
                <span>${contact.platform}</span>
            </a>
        `).join('');

    } catch (err) {
        console.error('Error loading data:', err);
    }
}

// Calling the function
loadData();

        