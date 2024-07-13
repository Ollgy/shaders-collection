import WebGL from 'three/addons/capabilities/WebGL.js';
import { setupLight } from "../../tools/SetupLight";
import { setupScene } from "../../tools/SetupScene";
import { initRoom } from './InitRoom';
import { randomBlinkingMaterial } from './RandomBlinkingShaderMaterial';
import * as THREE from 'three';

const { camera, scene, renderer } = setupScene();
camera.position.z = 50;
setupLight(scene);

const materials = { floor: randomBlinkingMaterial(
	new THREE.Color("#ccc"), 
	new THREE.Color("black")) 
};
const { floor } = initRoom(scene, materials);


function animate(time) {
	requestAnimationFrame(animate);
	time += 0.005;
	const speed = 0.02;

	if (floor.material.uniforms) {
		floor.material.uniforms.uTime.value = time * speed;
		floor.material.needsUpdate = true;
	}

	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("messages").appendChild(warning);
}

