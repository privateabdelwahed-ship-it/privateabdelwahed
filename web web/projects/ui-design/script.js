// UI/UX Design Showcase
const designs = [
    {
        id: 1,
        title: 'Mobile Banking App',
        description: 'Modern and secure mobile banking interface with intuitive navigation and beautiful design.',
        category: 'mobile',
        gradient: 'gradient-1',
        emoji: '💳',
        features: [
            'Secure authentication',
            'Easy transaction flow',
            'Real-time balance updates',
            'Budget tracking',
            'Bill payments'
        ],
        tags: ['Mobile', 'Finance', 'iOS', 'Android']
    },
    {
        id: 2,
        title: 'E-Commerce Website',
        description: 'Responsive e-commerce platform with smooth shopping experience and modern UI.',
        category: 'web',
        gradient: 'gradient-2',
        emoji: '🛒',
        features: [
            'Product catalog',
            'Shopping cart',
            'User dashboard',
            'Payment integration',
            'Order tracking'
        ],
        tags: ['Web', 'E-Commerce', 'Responsive']
    },
    {
        id: 3,
        title: 'Analytics Dashboard',
        description: 'Comprehensive analytics dashboard with data visualization and real-time insights.',
        category: 'dashboard',
        gradient: 'gradient-3',
        emoji: '📊',
        features: [
            'Data visualization',
            'Custom reports',
            'Real-time updates',
            'Export functionality',
            'Interactive charts'
        ],
        tags: ['Dashboard', 'Analytics', 'Data']
    },
    {
        id: 4,
        title: 'Fitness Tracking App',
        description: 'Beautiful fitness app design with workout tracking and progress monitoring.',
        category: 'mobile',
        gradient: 'gradient-4',
        emoji: '💪',
        features: [
            'Workout tracking',
            'Progress charts',
            'Social features',
            'Nutrition tracking',
            'Goal setting'
        ],
        tags: ['Mobile', 'Health', 'Fitness']
    },
    {
        id: 5,
        title: 'SaaS Platform',
        description: 'Clean and professional SaaS platform interface with powerful features.',
        category: 'web',
        gradient: 'gradient-1',
        emoji: '☁️',
        features: [
            'User management',
            'Subscription plans',
            'API integration',
            'Team collaboration',
            'Analytics'
        ],
        tags: ['Web', 'SaaS', 'B2B']
    },
    {
        id: 6,
        title: 'Admin Dashboard',
        description: 'Comprehensive admin dashboard for managing users, content, and settings.',
        category: 'dashboard',
        gradient: 'gradient-2',
        emoji: '⚙️',
        features: [
            'User management',
            'Content management',
            'System settings',
            'Activity logs',
            'Reports'
        ],
        tags: ['Dashboard', 'Admin', 'Management']
    }
];

let currentFilter = 'all';

// DOM Elements
const designsGrid = document.getElementById('designs-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// Initialize
function init() {
    renderDesigns();
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderDesigns();
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Render Designs
function renderDesigns() {
    let filteredDesigns = designs;
    
    if (currentFilter !== 'all') {
        filteredDesigns = designs.filter(d => d.category === currentFilter);
    }
    
    designsGrid.innerHTML = filteredDesigns.map(design => `
        <div class="design-card" onclick="openModal(${design.id})">
            <div class="design-preview ${design.category}" style="background: var(--${design.gradient})">
                <div class="design-preview-content">${design.emoji}</div>
            </div>
            <div class="design-info">
                <h3 class="design-title">${design.title}</h3>
                <p class="design-description">${design.description}</p>
                <div class="design-tags">
                    ${design.tags.map(tag => `<span class="design-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Open Modal
function openModal(designId) {
    const design = designs.find(d => d.id === designId);
    if (!design) return;
    
    modalBody.innerHTML = `
        <div class="modal-preview" style="background: var(--${design.gradient})">
            <div>${design.emoji}</div>
        </div>
        <h2 class="modal-title">${design.title}</h2>
        <p class="modal-description">${design.description}</p>
        <h3 style="margin-bottom: 1rem; color: var(--text-color);">Key Features:</h3>
        <ul class="modal-features">
            ${design.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="modal-tags">
            ${design.tags.map(tag => `<span class="design-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    modal.classList.add('active');
}

// Make function global
window.openModal = openModal;

// Initialize
init();

