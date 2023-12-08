<script lang="ts">
	import { onMount } from 'svelte';

	import { Game } from '../game/game';
	import { Bird } from '../game/bird';
	import { Pipes } from '../game/pipes';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	let canvasWidth = 0;
	let canvasHeight = 0;

	let game: Game;
	let bird: Bird;
	let pipes: Pipes;

	let handle: number;

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvasWidth = window.innerWidth;
		canvasHeight = window.innerHeight;

		if (canvasWidth > 800) {
			canvasWidth = 800;
		}

		if (canvasHeight > 600) {
			canvasHeight = 600;
		}

		game = new Game(ctx);
		bird = new Bird(ctx);
		pipes = new Pipes(ctx);

		addEventListener('keypress', handleKeydown);

		return () => {
			removeEventListener('keypress', handleKeydown);
		};
	});

	const onClick = () => {
		if (!game.hasStarted && !game.hasEnded) {
			game.hasStarted = true;
			handle = requestAnimationFrame(gameLoop);
		}
		bird.jump();
	};

	const handleKeydown = (event: KeyboardEvent) => event.key === ' ' && onClick();

	function gameOver(ctx: CanvasRenderingContext2D) {
		cancelAnimationFrame(handle);

		game.onGameOver();

		setTimeout(() => {
			ctx?.clearRect(0, 0, canvas.width, canvas.height);

			game.reset();
			bird.reset();
			pipes.reset();
		}, 3000);
	}

	function gameLoop() {
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		game.drawBackground();

		bird.update();
		pipes.update();

		// Draw bird and pipes (use ctx.fillRect or any drawing method)
		bird.draw();
		pipes.draw();

		// Draw UI Score
		game.drawScore();

		// Game over if the bird falls through the ground
		if (bird.checkFloorCollision()) {
			gameOver(ctx);
			return;
		}

		// Game over if the bird hits a pipe
		if (
			pipes.checkCollision(canvas.height, bird.position.x, bird.position.y, bird.width, bird.height)
		) {
			gameOver(ctx);
			return;
		}

		// Score if the bird successfully pass the pipe
		if (pipes.checkScore(bird.position.x)) {
			game.score++;
		}

		handle = requestAnimationFrame(gameLoop);
	}
</script>

<div class="flex justify-center mt-5">
	<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} on:click={onClick} />
</div>
