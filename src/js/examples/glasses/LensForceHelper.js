import GUI from 'lil-gui';

export const LENS_MIN_FORCE = -5.0;
export const LENS_MAX_FORCE = -2.0;
export const LENS_START_FORCE = -3.5;
export const STEP = 0.25;

export function initLensForceHelper(scene, onChange) {
  const gui = new GUI();
  const helper = new LensForceHelper();
  gui.add(helper, 'force', LENS_MIN_FORCE, LENS_MAX_FORCE, STEP).name('Lens force').onChange(onChange);
  scene.add(gui);
  return { gui, helper };
}

class LensForceHelper {
	constructor() {
		this.force = LENS_START_FORCE;
	}

	onChange(v) {
		this.force = v;
	}
}