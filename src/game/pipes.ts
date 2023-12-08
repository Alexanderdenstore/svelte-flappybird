import type { GameObject } from './object';

type Pipe = {
	x: number;
	y: number;
	width: number;
	height: number;
	scoreCounted?: boolean;
};

export class Pipes implements GameObject {
	private image = new Image();

	constructor(private ctx: CanvasRenderingContext2D) {
		this.image.src = 'assets/pipe.png';
	}

	private pipe_width = 50;
	private pipe_gap = 150;
	private frame_interval = 120;
	private speed = 200;

	frameCount: number = 0;
	pipes: Pipe[] = [];

	private drawPipe(x: number, y: number, width: number, height: number) {
		const imageHeight = this.image.naturalHeight; // Get the natural height of the image
		let drawnHeight = 0;

		while (drawnHeight < height) {
			const remainingHeight = height - drawnHeight;
			const drawHeight = Math.min(imageHeight, remainingHeight);
			this.ctx.drawImage(this.image, x, y + drawnHeight, width, drawHeight);
			drawnHeight += drawHeight;
		}
	}

	checkCollision(
		canvasHeight: number,
		birdX: number,
		birdY: number,
		birdWidth: number,
		birdHeight: number
	) {
		if (this.pipes.length === 0) return false;

		const pipe = this.pipes[0];

		// Collision offset
		const offset = 10;
		const offsetWidth = 10;
		birdWidth -= offset + offsetWidth;
		birdHeight -= offset;

		// Define the bounding box for the top pipe
		const topPipeRightEdge = pipe.x + this.pipe_width;
		const topPipeBottomEdge = pipe.height;

		// Define the bounding box for the bottom pipe
		const bottomPipeTopEdge = pipe.height + this.pipe_gap;
		const bottomPipeRightEdge = pipe.x + this.pipe_width;
		const bottomPipeBottomEdge = canvasHeight; // or your canvas height

		// Check if the bird intersects with the top pipe
		const collideTop =
			birdX + birdWidth > pipe.x &&
			birdX < topPipeRightEdge &&
			birdY < topPipeBottomEdge &&
			birdY + birdHeight > 0;

		// Check if the bird intersects with the bottom pipe
		const collideBottom =
			birdX + birdWidth > pipe.x &&
			birdX < bottomPipeRightEdge &&
			birdY < bottomPipeBottomEdge &&
			birdY + birdHeight > bottomPipeTopEdge;

		// If there's a collision with either the top or bottom pipe, return true
		if (collideTop || collideBottom) return true;

		return false;
	}

	checkScore(birdX: number) {
		if (this.pipes.length === 0) return false;

		const pipe = this.pipes[0];

		if (!pipe.scoreCounted && birdX > pipe.x) {
			pipe.scoreCounted = true;
			return true;
		}

		return false;
	}

	draw() {
		for (const pipe of this.pipes) {
			this.drawPipe(pipe.x, 0, this.pipe_width, pipe.height);
			const bottomPipeTop = pipe.height + this.pipe_gap;
			const bottomPipeHeight = window.innerHeight - bottomPipeTop;
			this.drawPipe(pipe.x, bottomPipeTop, this.pipe_width, bottomPipeHeight);
		}
	}

	update(dt: number) {
		this.frameCount++;

		if (this.frameCount % this.frame_interval === 0) {
			const pipeHeight = 100 + Math.floor(Math.random() * 200);
			this.pipes.push({
				x: window.innerWidth,
				y: 0,
				width: this.pipe_width,
				height: pipeHeight
			});
		}

		for (let i = this.pipes.length - 1; i >= 0; i--) {
			const pipe = this.pipes[i];
			pipe.x -= this.speed * dt; // Apply dt to the speed

			if (pipe.x < -this.pipe_width) {
				this.pipes.splice(i, 1);
			}
		}
	}

	reset() {
		this.frameCount = 0;
		this.pipes = [];
	}
}
