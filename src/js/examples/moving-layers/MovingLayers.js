import WebGL from 'three/addons/capabilities/WebGL.js';
import { addCube } from "../../tools/AddCube";
import { setupLight } from "../../tools/SetupLight";
import { setupScene } from "../../tools/SetupScene";
import { wrapWithMovingLayer } from "./AddLayers";

const { camera, scene, renderer } = setupScene();
setupLight(scene);

const cube = addCube(scene, 10, "red");
camera.position.z = 50;
cube.rotation.x = - Math.PI / 4;
cube.rotation.y = Math.PI / 4;
cube.rotation.z = Math.PI / 2;
const { object, layers } = wrapWithMovingLayer(cube);
scene.add(object);

function animate(time) {
	requestAnimationFrame(animate);
	time += 0.005;
	const speed = 0.02;

	layers.forEach(body => {
		body.material.uniforms.uTime.value = time * speed;
		body.material.needsUpdate = true;
	});

	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("messages").appendChild(warning);
}

