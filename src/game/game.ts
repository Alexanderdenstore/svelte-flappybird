export class Game {
	hasStarted = false;
	hasEnded = false;

	score = 0;

	background = new Image();
	private bgX1 = 0;
	private bgX2 = 0;
	private speed = 2;

	constructor(private ctx: CanvasRenderingContext2D) {
		this.background.src = 'assets/background.png';
		this.background.onload = () => {
			// Set the second image next to the first after the image has loaded
			this.bgX2 = this.background.width;
			this.drawStart();
		};
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
		this.ctx.drawImage(this.background, this.bgX1, 0);
		this.ctx.drawImage(this.background, this.bgX2, 0);

		this.bgX1 -= this.speed;
		this.bgX2 -= this.speed;

		if (this.bgX1 < -this.background.width) this.bgX1 = this.bgX2 + this.background.width;
		if (this.bgX2 < -this.background.width) this.bgX2 = this.bgX1 + this.background.width;
	}

	onGameOver() {
		this.hasStarted = false;
		this.hasEnded = true;
		this.drawGameOver();
	}

	reset() {
		this.hasStarted = false;
		this.hasEnded = false;
		this.score = 0;

		this.drawStart();
	}
}
