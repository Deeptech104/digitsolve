// shared.js - Utilities for Digitsolve
const DIGITSOLVE_CONFIG = {
    siteName: 'Digitsolve',
    primaryColor: '#2563eb'
};

// Load header
function loadHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
header.innerHTML = `
        <nav class="navbar">
            <div class="container">
                <div class="logo">
                    <a href="index.html">
                        <span>📊</span>Digitsolve
                    </a>
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li class="dropdown">
                        <a href="#">Calculators <span>▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="financial.html">Financial</a></li>
                            <li><a href="health.html">Health</a></li>
                            <li><a href="everyday.html">Everyday</a></li>
                            <li><a href="text.html">Text Tools</a></li>
                        </ul>
                    </li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="header-actions">
                    <button id="theme-toggle" class="theme-btn" title="Toggle dark mode">🌙</button>
                    <div class="menu-toggle">☰</div>
                </div>
            </div>
        </nav>
    `;

// Mobile menu toggle
    const toggle = header.querySelector('.menu-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const links = header.querySelector('.nav-links');
            links.classList.toggle('active');
        });
    }
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const html = document.documentElement;
        const initialTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', initialTheme);
        
        themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
}

// Load footer
function loadFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;
    
footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4><span>📊</span> Digitsolve</h4>
                    <p>Fast, accurate, completely free calculators for everyone.</p>
                    <div class="social-links">
                        <a href="https://twitter.com/digitsolve" aria-label="Twitter">🐦</a>
                        <a href="https://github.com/digitsolve" aria-label="GitHub">🐙</a>
                        <a href="#newsletter" aria-label="Newsletter">📧</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Calculators</h4>
                    <ul>
                        <li><a href="financial.html">Financial Tools</a></li>
                        <li><a href="health.html">Health & Fitness</a></li>
                        <li><a href="everyday.html">Daily Tools</a></li>
                        <li><a href="text.html">Text Tools</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms of Service</a></li>
                        <li><a href="disclaimer.html">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Digitsolve. Made with ❤️ for calculators everywhere. All rights reserved.</p>
            </div>
        </div>
    `;
}

// Global search/filter function for homepage
let allCards = [];
function performSearch(query) {
    const cards = document.querySelectorAll('.calc-card');
    const normalizedQuery = query.toLowerCase().trim();
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = text.includes(normalizedQuery);
        card.style.display = matches ? 'flex' : 'none';
        
        if (matches) {
            // Store visible cards for category logic
            allCards.push(card);
        }
    });
    
    // Hide empty category headers
    const catHeaders = document.querySelectorAll('.category-group h3');
    catHeaders.forEach(header => {
        const group = header.parentElement;
        const visibleCards = group.querySelectorAll('.calc-card:not([style*="display: none"])');
        header.style.display = visibleCards.length > 0 ? 'block' : 'none';
        group.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
}

// Copy to clipboard helper
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show feedback (you can add a toast notification here)
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy:', err);
        fallbackCopyTextToClipboard(text);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
}

// Format number helper
function formatNumber(n) {
    if (n === null || n === undefined) return '0.00';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(n);
}

// Breadcrumb helper (for calculator pages)
function renderBreadcrumbs(pathParts) {
    const crumbs = [{ name: 'Home', href: 'index.html' }];
    let currentPath = '';
    
    pathParts.forEach((part, i) => {
        currentPath += part + '/';
        crumbs.push({ name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), href: currentPath.slice(0, -1) + '.html' });
    });
    
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
        breadcrumbs.innerHTML = crumbs.map((crumb, i) => 
            i === crumbs.length - 1 
                ? `<span class="breadcrumb-current">${crumb.name}</span>`
                : `<a href="${crumb.href}" class="breadcrumb-link">${crumb.name}</a> > `
        ).join('');
    }
}
