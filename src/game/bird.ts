import type { GameObject } from './object';

export class Bird implements GameObject {
	private image = new Image();

	constructor(private ctx: CanvasRenderingContext2D) {
		// Initial draw
		this.image.src = 'assets/thors_hammer.png';
		this.draw();
	}

	public position: { x: number; y: number } = { x: 100, y: 300 };
	public width = 50;
	public height = 50;

	private velocity = 0;
	private gravity = 0.05;
	private rotationAngle = 0;

	draw() {
		this.ctx.save();
		this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		this.ctx.rotate((this.rotationAngle * Math.PI) / 180);
		this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
		this.ctx.restore();

		this.rotationAngle += 2;
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
		this.rotationAngle = 0;

		this.draw();
	}
}
