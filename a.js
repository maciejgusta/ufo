// Pobierz canvas i kontekst
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class FlyingObject {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.speed = 5;

        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }

    moveRight() {
        this.x = Math.min(canvas.width - this.width, this.x + this.speed);
    }

    moveUp() {
        this.y = Math.max(0, this.y - this.speed);
    }

    moveDown() {
        this.y = Math.min(canvas.height - this.height, this.y + this.speed);
    }
}

const flyingObject = new FlyingObject(375, 275, 50, 50, 'images.jpeg');

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function update() {
    if (keys['ArrowLeft'] || keys['a']) {
        flyingObject.moveLeft();
    }
    if (keys['ArrowRight'] || keys['d']) {
        flyingObject.moveRight();
    }
    if (keys['ArrowUp'] || keys['w']) {
        flyingObject.moveUp();
    }
    if (keys['ArrowDown'] || keys['s']) {
        flyingObject.moveDown();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flyingObject.draw();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
