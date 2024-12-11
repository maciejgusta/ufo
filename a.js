const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.85;

class FlyingObject {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
        this.speed = 7;

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

class FallingObject {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = Math.random() * 2 + 2;

        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3; 
        ctx.strokeRect(this.x, this.y, this.width, this.height); 
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.height;
            this.x = Math.random() * (canvas.width - this.width);
            this.speed = Math.random() * 2 + 2; 
            score++;
        }
    }

    collidesWith(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        );
    }
}

const flyingObject = new FlyingObject(canvas.width / 2, canvas.height - 100, 80, 80, 'images.jpeg');
const fallingObjects = [];
const fallingObjectImage = 'meteoryt.png';
let score = 0;

for (let i = 0; i < 15; i++) {
    const size = Math.random() * 100 + 50;
    fallingObjects.push(new FallingObject(
        Math.random() * (canvas.width - size),
        Math.random() * -canvas.height,
        size,
        size,
        fallingObjectImage
    ));
}

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function resetGame() {
    alert(`Game over! Your score: ${score}`);

    score = 0;
    flyingObject.x = canvas.width / 2;
    flyingObject.y = canvas.height - 100;
    fallingObjects.forEach(obj => {
        obj.y = Math.random() * -canvas.height;
        obj.x = Math.random() * (canvas.width - obj.width);
    });
    keys['ArrowLeft'] = false;
    keys['ArrowRight'] = false;
    keys['ArrowUp'] = false;
    keys['ArrowDown'] = false;
    keys['a'] = false;
    keys['s'] = false;
    keys['d'] = false;
    keys['w'] = false;


}

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

    fallingObjects.forEach(obj => {
        obj.update();
        if (obj.collidesWith(flyingObject)) {
            resetGame();
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flyingObject.draw();
    fallingObjects.forEach(obj => obj.draw());

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
