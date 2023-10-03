import type { GameObject } from './object';

type Pipe = {
	x: number;
	y: number;
	width: number;
	height: number;
	scoreCounted?: boolean;
};

export class Pipes implements GameObject {
	constructor(private ctx: CanvasRenderingContext2D) {}

	private pipe_width = 50;
	private pipe_gap = 150;
	private frame_interval = 120;

	frameCount: number = 0;
	pipes: Pipe[] = [];

	private drawPipe(x: number, y: number, width: number, height: number) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, width, height);
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
		this.ctx.closePath();
	}

	checkCollision(birdX: number, birdY: number, birdWidth: number, birdHeight: number) {
		if (this.pipes.length === 0) return false;

		const pipe = this.pipes[0];
		const birdRightEdge = birdX + birdWidth / 2;
		const birdBottomEdge = birdY + birdHeight / 2;

		const isHorizontallyInsidePipe =
			birdRightEdge > pipe.x && birdX - birdWidth / 2 < pipe.x + pipe.width;
		const isVerticallyColliding =
			birdY - birdHeight / 2 < pipe.height || birdBottomEdge > pipe.height + this.pipe_gap;

		if (isHorizontallyInsidePipe && isVerticallyColliding) return true;

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

	update() {
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
			pipe.x -= 1.5;

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
