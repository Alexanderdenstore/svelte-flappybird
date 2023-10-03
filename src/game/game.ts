export class Game {
	hasStarted = false;
	hasEnded = false;

	score = 0;

	constructor(private ctx: CanvasRenderingContext2D) {
		this.drawStart();
	}

	drawStart() {
		const centerX = this.ctx.canvas.width / 2;
		const centerY = this.ctx.canvas.height / 2;

		this.ctx.font = '36px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText('Press space to start', centerX, centerY);
	}

	drawScore() {
		const centerX = this.ctx.canvas.width / 2;
		const centerY = 50;

		this.ctx.font = '46px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(this.score.toString(), centerX, centerY);
	}

	drawGameOver() {
		const centerX = this.ctx.canvas.width / 2;
		const centerY = this.ctx.canvas.height / 2;

		this.ctx.font = '36px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText('Game Over', centerX, centerY);
		this.ctx.fillText('Score: ' + this.score, centerX, centerY + 50);
	}

	drawBackground() {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	onGameOver() {
		this.hasStarted = false;
		this.hasEnded = true;
		this.drawGameOver();
	}

	reset() {
		this.hasStarted = false;
		this.hasEnded = false;

		this.drawStart();

		this.score = 0;
	}
}
