
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    header.classList.add('visible');
});

function showGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    gamesContainer.style.display = 'grid';
    setTimeout(() => {
        gamesContainer.classList.add('visible');
        
        const cards = document.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }, 50);

    gamesContainer.scrollIntoView({ behavior: 'smooth' });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.game-card').forEach(card => {
    observer.observe(card);
});