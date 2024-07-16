import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { addPlane } from "../../tools/AddMesh";
import { setupLight } from "../../tools/SetupLight";
import { setupScene } from "../../tools/SetupScene";
import { loadColorTexture } from '../../tools/ModelLoaders';
import { blurEffectMaterial } from './BlurEffectShaderMaterial';

const { camera, scene, renderer, controls } = setupScene();
controls.enables = false;
camera.position.z = 100;
setupLight(scene);

const pictureTexture = await loadColorTexture("/src/js/examples/glasses/assets/KandinskiyMoving.jpg");
const pictureMaterial = blurEffectMaterial(pictureTexture);
const picture = addPlane(scene, 70, 90, "lightgrey", pictureMaterial);

function animate(time) {
	requestAnimationFrame(animate);
	time += 0.005;
	const speed = 0.02;

  if (!picture.material.uniforms.pixelWidth.value && pictureTexture.source.data) {
    	picture.material.uniforms.pixelWidth.value = pictureTexture.source.data.naturalWidth;
	  	picture.material.needsUpdate = true;
  }

	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("messages").appendChild(warning);
}

