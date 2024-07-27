import WebGL from 'three/addons/capabilities/WebGL.js';
import { pixelizationShaderMaterial } from './PixelizationShaderMaterial';
import { addPlane } from "../../tools/AddMesh";
import { setupLight } from "../../tools/SetupLight";
import { setupScene } from "../../tools/SetupScene";
import { loadColorTexture } from '../../tools/ModelLoaders';

let picture;
const { camera, scene, renderer, controls } = setupScene();
controls.enables = false;
camera.position.z = 100;
setupLight(scene);

loadColorTexture(
  "/src/js/examples/pixelization/assets/DeinekaRunners.png", 
  null,
  texture => { 
    const pictureMaterial = pixelizationShaderMaterial(texture);
    picture = addPlane(scene, 70, 90, "lightgrey", pictureMaterial);
  }
);

function animate(time) {
	requestAnimationFrame(animate);
	time += 0.005;
	const speed = 0.002;

  if (picture) {
    picture.material.uniforms.uTime.value = time * speed;
  }

	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("messages").appendChild(warning);
}