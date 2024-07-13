import * as THREE from 'three';

export function setupLight(scene) {
  const color = 0xFFFFFF;
	const intensity = 3;
	const lightLeft = new THREE.DirectionalLight(color, intensity);
	lightLeft.position.set(-25, 25, 25);
	scene.add(lightLeft);
	const lightRight = new THREE.DirectionalLight(color, intensity);
	lightRight.position.set(25, -25, 25);
	scene.add(lightRight);
}