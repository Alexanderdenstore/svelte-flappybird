import type { GameObject } from './object';

export class Bird implements GameObject {
	constructor(private ctx: CanvasRenderingContext2D) {
		// Initial draw
		this.draw();
	}

	position: { x: number; y: number } = { x: 100, y: 300 };
	velocity = 0;
	gravity = 0.05;
	width = 30;
	height = 30;

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.width / 2, 0, Math.PI * 2, false);
		this.ctx.fillStyle = 'lightblue';
		this.ctx.fill();
		this.ctx.closePath();
	}

	checkFloorCollision() {
		if (this.position.y >= this.ctx.canvas.height) return true;
		return false;
	}

	update() {
		this.velocity += this.gravity;
		this.position.y += this.velocity;
	}

	jump() {
		this.velocity = -2;
	}

	reset() {
		this.position = { x: 100, y: 300 };
		this.velocity = 0;

		this.draw();
	}
}
