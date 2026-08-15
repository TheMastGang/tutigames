// Load data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Set bio
        document.getElementById('bio-text').textContent = data.bio;
        
        // Load tabs
        renderGames(data.games);
        renderMusic(data.music);
        renderLinks(data.links);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Render Games
function renderGames(games) {
    const container = document.getElementById('games-list');
    container.innerHTML = games.map(game => `
        <div class="item-card">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div class="item-tags">
                ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="item-links">
                ${Object.entries(game.links).map(([label, url]) => 
                    `<a href="${url}" target="_blank" class="link-btn">${label}</a>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

// Render Music
function renderMusic(music) {
    const container = document.getElementById('music-list');
    container.innerHTML = music.map(track => `
        <div class="item-card">
            <h3>🎵 ${track.title}</h3>
            <p>${track.description}</p>
            <div class="item-links">
                ${Object.entries(track.links).map(([label, url]) => 
                    `<a href="${url}" target="_blank" class="link-btn secondary">${label}</a>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

// Render Social Links
function renderLinks(links) {
    const container = document.getElementById('links-list');
    container.innerHTML = links.map(link => `
        <a href="${link.url}" target="_blank" class="social-link-card" style="border-color: ${link.color}33;">
            <div class="social-icon">${link.icon}</div>
            <div class="social-info">
                <h3>${link.title}</h3>
                <p>${link.description}</p>
            </div>
        </a>
    `).join('');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);