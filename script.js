const canvas = document.getElementById('gravityCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];

class Circle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();

        if (this.y + this.radius + this.velocity.y > canvas.height) {
            this.velocity.y = -this.velocity.y * 0.9; // Damping effect
        } else {
            this.velocity.y += 1; // Gravity
        }

        this.y += this.velocity.y;
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.update();
    });
}

canvas.addEventListener('click', (event) => {
    const radius = 30;
    const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
    const velocity = { x: 0, y: 5 };
    circles.push(new Circle(event.x, event.y, radius, color, velocity));
});

animate();