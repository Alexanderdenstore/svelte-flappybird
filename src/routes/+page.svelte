<script lang="ts">
	import { onMount } from 'svelte';

	import { Game } from '../game/game';
	import { Bird } from '../game/bird';
	import { Pipes } from '../game/pipes';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;

	let canvasWidth = 0;
	let canvasHeight = 0;

	let highscore = '';
	let game: Game;
	let bird: Bird;
	let pipes: Pipes;

	let handle: number;

	let lastTime = 0;

	onMount(() => {
		ctx = canvas.getContext('2d');
		if (!ctx) return;

		lastTime = Date.now();

		canvasWidth = window.innerWidth;
		canvasHeight = window.innerHeight;

		if (canvasWidth > 800) canvasWidth = 800;
		if (canvasHeight > 600) canvasHeight = 600;

		game = new Game(ctx);
		bird = new Bird(ctx);
		pipes = new Pipes(ctx);

		highscore = game.getHighScore();

		addEventListener('keypress', handleKeydown);

		return () => {
			removeEventListener('keypress', handleKeydown);
		};
	});

	const onClick = () => {
		if (!game.hasStarted && !game.hasEnded) {
			game.hasStarted = true;
			lastTime = Date.now();
			handle = requestAnimationFrame(() => gameLoop(lastTime));
		}
		bird.jump();
	};

	const handleKeydown = (event: KeyboardEvent) => event.key === ' ' && onClick();

	function gameOver() {
		cancelAnimationFrame(handle);

		game.onGameOver();
		highscore = game.getHighScore();

		setTimeout(() => {
			bird.reset();
			pipes.reset();
			game.reset();

			bird.draw();
		}, 2500);
	}

	function gameLoop(now: number) {
		if (!ctx) return;

		const deltaTime = (now - lastTime) / 1000.0;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		game.drawBackground();

		bird.update(deltaTime);
		pipes.update(deltaTime);

		// Draw bird and pipes (use ctx.fillRect or any drawing method)
		bird.draw();
		pipes.draw();

		// Draw UI Score
		game.drawScore();

		// Game over if the bird falls through the ground
		if (bird.checkFloorCollision()) {
			gameOver();
			return;
		}

		// Game over if the bird hits a pipe
		if (
			pipes.checkCollision(canvas.height, bird.position.x, bird.position.y, bird.width, bird.height)
		) {
			gameOver();
			return;
		}

		// Score if the bird successfully pass the pipe
		if (pipes.checkScore(bird.position.x)) {
			game.score++;
		}

		lastTime = now;
		handle = requestAnimationFrame(() => gameLoop(Date.now()));
	}
</script>

<div class="flex flex-col justify-center items-center mt-5">
	{#if highscore}
		<div class="md:text-sm text-orange-300">Highscore: {highscore}</div>
	{/if}
	<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} on:click={onClick} />
</div>
