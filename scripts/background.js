// Get canvas and context
const CANVAS = document.querySelector("canvas");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
const ctx = CANVAS.getContext('2d');

// Min and max values for the circle count
const circlesCountDensityBounds = {min: 10, max: 20}; // For a 1000 * 1000 canvas
const circlesCountRange = [Math.round(circlesCountDensityBounds.min * CANVAS.width / 1000), Math.round(circlesCountDensityBounds.max * CANVAS.width / 1000)];

// Circle list
const Circles = new Map();

// Circle Class
class Circle {
    // Create a circle with random values
    constructor({
        x = null,
        y = null,
        radius = null,
        color = null,
        direction = null,
        orientationReplacementRange = null,
        speed = null
    } = {}) {
        this.x = x ?? Math.random() * CANVAS.width;
        this.y = y ?? Math.random() * CANVAS.height;
        this.radius = radius ?? 50;

        this.color = color ?? [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
        this.colorTarget = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];

        this.direction = direction ?? Math.random() * Math.PI * 2;
        this.orientationReplacementRange = orientationReplacementRange ?? 10;
        this.speed = speed ?? Math.random();
    }

    // Draw the circle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx.fill();
    }

    // Update the direction, position, and color of the circle
    update() {
        // Direction is adjusted between -orientationReplacementRange and +orientationReplacementRange degrees
        this.direction += ((Math.random() * 2 * this.orientationReplacementRange - this.orientationReplacementRange) * (Math.PI * 2 / 360)) % (Math.PI * 2);

        // Update position
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // Replace circles in the center if it has reached the borders
        if (this.x < - this.radius) { this.x = CANVAS.width + this.radius; }
        if (this.x > CANVAS.width + this.radius) { this.x = -this.radius; }
        if (this.y < - this.radius) { this.y = CANVAS.height + this.radius; }
        if (this.y > CANVAS.height + this.radius) { this.y = -this.radius; }

        // Update the color, a certain number of times per second
        var modificationsPerSecond = 10;
        if (Math.random() >= (60 - modificationsPerSecond) / 60) {
            // Update color to get closer to the target
            for (let i = 0; i < 3; i++) {
                if (this.color[i] != this.colorTarget[i]) {
                    this.color[i] += (this.colorTarget[i] - this.color[i]) / Math.abs(this.colorTarget[i] - this.color[i]);
                }
            }
            // If the target is reached, replace it
            if (
                this.color[0] == this.colorTarget[0] &&
                this.color[1] == this.colorTarget[1] &&
                this.color[2] == this.colorTarget[2]
            ) {
                this.colorTarget = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)];
            }
        }
    }
}

// Generate circles
for (let i = 0; i < Math.round(Math.random() * (circlesCountRange[1] - circlesCountRange[0]) + circlesCountRange[0]); i++) {
    Circles.set(i, new Circle())
}

// Run the main loop
const mainLoop = setInterval(() => {
    // Clear screen
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height)

    // For each circle, update it then draw it
    for (const circle of Circles.values()) {
        circle.update();
        circle.draw();
    };
}, 1000 / 60);