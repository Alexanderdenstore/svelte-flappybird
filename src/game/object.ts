export interface GameObject {
	update: () => void;
	draw: () => void;
	reset?: () => void;
}
