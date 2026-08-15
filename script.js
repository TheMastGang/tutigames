// Load games data and render
async function loadGames() {
    try {
        const response = await fetch('data/games.json');
        const gamesData = await response.json();
        renderGames(gamesData.games);
    } catch (error) {
        console.error('Error loading games:', error);
        renderDefaultGames();
    }
}

function renderGames(games) {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = '';

    games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-card-image">${game.emoji || '🎮'}</div>
            <div class="game-card-content">
                <h3>${game.title}</h3>
                <p>${game.shortDescription}</p>
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        gameCard.addEventListener('click', () => openModal(game));
        container.appendChild(gameCard);
    });
}

function renderDefaultGames() {
    const defaultGames = [
        {
            title: 'Parkour Warrior',
            emoji: '🏃',
            shortDescription: 'An exciting parkour action game',
            fullDescription: 'Parkour Warrior is an intense 3D parkour action game built with Godot. Navigate challenging levels, perform spectacular moves, and master the art of parkour!',
            tags: ['Godot', 'Android', 'PC'],
            downloads: {
                apk: '#',
                pc: '#',
                webgl: '#'
            }
        },
        {
            title: 'Godot 3D Projects',
            emoji: '🚀',
            shortDescription: 'Upcoming 3D game projects',
            fullDescription: 'Exciting new 3D game projects coming soon! Check back regularly for announcements about new releases.',
            tags: ['Godot 3D', 'Upcoming', 'Sneak Peek'],
            downloads: {}
        },
        {
            title: 'Game Jam Entries',
            emoji: '🎯',
            shortDescription: 'Experimental builds and prototypes',
            fullDescription: 'A collection of fun experimental games and prototypes from various game jams. These showcase creative ideas and rapid development!',
            tags: ['Experimental', 'Prototype', 'WebGL'],
            downloads: {
                webgl: '#'
            }
        }
    ];
    renderGames(defaultGames);
}

// Modal functions
const modal = document.getElementById('gameModal');
const closeBtn = document.getElementsByClassName('close')[0];

function openModal(game) {
    const modalBody = document.getElementById('modalBody');
    let downloadHTML = '';

    if (game.downloads) {
        const downloads = game.downloads;
        if (downloads.apk) {
            downloadHTML += `<a href="${downloads.apk}" class="download-btn" download>📱 Download APK</a>`;
        }
        if (downloads.pc) {
            downloadHTML += `<a href="${downloads.pc}" class="download-btn" download>💻 Download PC</a>`;
        }
        if (downloads.webgl) {
            downloadHTML += `<a href="${downloads.webgl}" class="download-btn" target="_blank">🌐 Play WebGL</a>`;
        }
    }

    modalBody.innerHTML = `
        <h2>${game.title}</h2>
        <p><strong>Description:</strong></p>
        <p>${game.fullDescription}</p>
        <div class="game-tags">
            ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ${downloadHTML ? `<div class="download-buttons">${downloadHTML}</div>` : ''}
    `;

    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Load devlogs
async function loadDevlogs() {
    try {
        const response = await fetch('data/devlogs.json');
        const devlogsData = await response.json();
        renderDevlogs(devlogsData.devlogs);
    } catch (error) {
        console.error('Error loading devlogs:', error);
        renderDefaultDevlogs();
    }
}

function renderDevlogs(devlogs) {
    const container = document.getElementById('devlogsContainer');
    container.innerHTML = '';

    devlogs.forEach(devlog => {
        const devlogCard = document.createElement('div');
        devlogCard.className = 'devlog-card';
        devlogCard.innerHTML = `
            <h3>${devlog.title}</h3>
            <p class="devlog-date">📅 ${devlog.date}</p>
            <p>${devlog.content}</p>
        `;
        container.appendChild(devlogCard);
    });
}

function renderDefaultDevlogs() {
    const defaultDevlogs = [
        {
            title: 'Website Launch! 🚀',
            date: 'August 15, 2024',
            content: 'Excited to announce the launch of TutiGames official website! This is my new hub for sharing games, devlogs, and project updates. No more algorithm dependency - straight to you!'
        },
        {
            title: 'Parkour Warrior - v1.0 Released',
            date: 'August 10, 2024',
            content: 'After months of development, Parkour Warrior v1.0 is finally out! Download it now for Android and PC. Huge thanks to everyone who tested during beta!'
        },
        {
            title: 'Next Project in Development',
            date: 'August 1, 2024',
            content: 'Currently working on an exciting new 3D project using Godot. Can\'t reveal much yet, but stay tuned for sneak peeks and devlogs coming soon!'
        }
    ];
    renderDevlogs(defaultDevlogs);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    loadDevlogs();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});