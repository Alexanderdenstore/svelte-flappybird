export interface GameObject {
	update: (deltaTime: number) => void;
	draw: () => void;
	reset?: () => void;
}
