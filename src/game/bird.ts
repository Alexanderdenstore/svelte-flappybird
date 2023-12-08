import type { GameObject } from './object';

export class Bird implements GameObject {
	private image = new Image();

	public position: { x: number; y: number } = { x: 100, y: 0 };

	public width = 50;
	public height = 50;

	private velocity = 0;
	private gravity = 500;
	private jumpForce = 200;
	private rotationAngle = 0;

	constructor(private ctx: CanvasRenderingContext2D) {
		// Initial draw
		this.image.src = 'assets/axe.png';

		this.position.x = 100;
		this.position.y = this.ctx.canvas.height / 2;

		this.draw();
	}

	draw() {
		this.ctx.save();
		this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		this.ctx.rotate((this.rotationAngle * Math.PI) / 180);
		this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
		this.ctx.restore();

		this.rotationAngle += 2;
	}

	checkFloorCollision() {
		return this.position.y > this.ctx.canvas.height;
	}

	update(dt: number) {
		if (this.position.y < 0) this.position.y = 0;
		this.velocity += this.gravity * dt; // gravity is acceleration, so it's multiplied by dt
		this.position.y += this.velocity * dt; // velocity is speed, so it's also multiplied by dt
	}

	jump() {
		this.velocity = -this.jumpForce;
	}

	reset() {
		this.position.x = 100;
		this.position.y = this.ctx.canvas.height / 2;
		this.velocity = 0;
		this.rotationAngle = 0;

		this.draw();
	}
}
