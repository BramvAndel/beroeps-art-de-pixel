const pacman = document.getElementById('pacman');
const dots = document.querySelectorAll('.dot');
let score = 0;

function movePacman(event) {
    const style = window.getComputedStyle(pacman);
    let left = parseInt(style.left);
    let top = parseInt(style.top);

    switch (event.key) {
        case 'ArrowUp':
            if (top > 0) pacman.style.top = (top - 10) + 'px';
            break;
        case 'ArrowDown':
            if (top < 370) pacman.style.top = (top + 10) + 'px';
            break;
        case 'ArrowLeft':
            if (left > 0) pacman.style.left = (left - 10) + 'px';
            break;
        case 'ArrowRight':
            if (left < 370) pacman.style.left = (left + 10) + 'px';
            break;
    }
    checkCollision();

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function checkCollision() {
    dots.forEach(dot => {
        const dotRect = dot.getBoundingClientRect();
        const pacmanRect = pacman.getBoundingClientRect();

        if (
            pacmanRect.x < dotRect.x + dotRect.width &&
            pacmanRect.x + pacmanRect.width > dotRect.x &&
            pacmanRect.y < dotRect.y + dotRect.height &&
            pacmanRect.y + pacmanRect.height > dotRect.y
        ) {
            dot.remove(); 
            score++;
            console.log(`Score: ${score}`);
            if (score > 5) {
                sleep(500).then(() => {alert('Je hebt alle punten opgegeten!');});
            }
        }
    });
}

document.addEventListener('keydown', movePacman);