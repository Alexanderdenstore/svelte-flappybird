export class Game {
	hasStarted = false;
	hasEnded = false;

	private highscore = 0;
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

		this.highscore = this.getHighScore();
	}

	getHighScore(): number {
		const highScore = localStorage.getItem('highScore') || '0';
		return parseInt(highScore);
	}

	private setHighScore(score: number) {
		this.highscore = score;
		localStorage.setItem('highScore', score.toString());
	}

	drawStart() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		const centerX = this.ctx.canvas.width / 2;
		const centerY = this.ctx.canvas.height / 2;

		this.drawBackground();
		const text = 'Press space to start';
		this.ctx.font = '36px Arial';
		const textWidth = this.ctx.measureText(text).width;
		const textX = centerX - textWidth / 2;

		this.ctx.fillStyle = 'orange';
		this.ctx.fillText(text, textX, centerY);
	}

	drawScore() {
		const centerX = this.ctx.canvas.width / 2;

		const text = this.score.toString();
		this.ctx.font = '46px Arial';
		const textWidth = this.ctx.measureText(text).width;
		const textX = centerX - textWidth / 2;

		this.ctx.fillStyle = 'white';
		this.ctx.fillText(text, textX, 50);
	}

	drawGameOver() {
		const centerX = this.ctx.canvas.width / 2;
		const centerY = this.ctx.canvas.height / 2;

		let text = 'Game Over';
		this.ctx.font = '36px Arial';
		let textWidth = this.ctx.measureText(text).width;
		let textX = centerX - textWidth / 2;
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(text, textX, centerY);

		text = 'Score: ' + this.score;
		this.ctx.font = '24px Arial';
		textWidth = this.ctx.measureText(text).width;
		textX = centerX - textWidth / 2;
		this.ctx.fillStyle = 'orange';
		this.ctx.fillText(text, textX, centerY + 50);
	}

	drawBackground() {
		this.ctx.globalAlpha = 0.3;
		this.ctx.drawImage(this.background, this.bgX1, 0);
		this.ctx.drawImage(this.background, this.bgX2, 0);
		this.ctx.globalAlpha = 1;

		this.bgX1 -= this.speed;
		this.bgX2 -= this.speed;

		if (this.bgX1 < -this.background.width) this.bgX1 = this.bgX2 + this.background.width;
		if (this.bgX2 < -this.background.width) this.bgX2 = this.bgX1 + this.background.width;
	}

	onGameOver(): number {
		this.hasStarted = false;
		this.hasEnded = true;

		if (this.score > this.highscore) {
			this.setHighScore(this.score);
		}

		this.drawGameOver();
		return this.highscore;
	}

	reset() {
		this.hasStarted = false;
		this.hasEnded = false;
		this.score = 0;

		this.drawStart();
	}
}
