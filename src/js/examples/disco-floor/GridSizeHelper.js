import GUI from 'lil-gui';

export const GRID_MIN_SIZE = 6;
export const GRID_MAX_SIZE = 20;
export const GRID_STEP = 1;

export function initGridSizeHelper(scene, onChange) {
  const gui = new GUI();
  const helper = new GridSizeHelper();
  gui.add(helper, 'size', GRID_MIN_SIZE, GRID_MAX_SIZE, GRID_STEP).name('Размер сетки').onChange(onChange);
  scene.add(gui);
  return { gui, helper };
}

class GridSizeHelper {
	size;
	constructor() {
		this.size = GRID_MIN_SIZE;
	}

	onChange(v) {
		this.size = v;
	}
}