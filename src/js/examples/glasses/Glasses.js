import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { addPlane } from "../../tools/AddMesh";
import { setupLight } from "../../tools/SetupLight";
import { setupScene } from "../../tools/SetupScene";
import { loadColorTexture } from '../../tools/ModelLoaders';
import { blurEffectMaterial } from './BlurEffectShaderMaterial';
import { Glasses } from './GlassesTools';
import { LENS_MIN_FORCE, initLensForceHelper } from './LensForceHelper';

const glasses = new Glasses();
let picture, pictureTexture;

const { camera, scene, renderer, controls } = setupScene();
controls.enables = false;
camera.position.z = 100;
setupLight(scene);

loadColorTexture(
  "/src/js/examples/glasses/assets/KandinskiyMoving.jpg", 
  null,
  texture => { 
    const pictureMaterial = blurEffectMaterial(texture);
    picture = addPlane(scene, 70, 90, "lightgrey", pictureMaterial);
    pictureTexture = texture;
  }
);

let lensForce = LENS_MIN_FORCE;
const onLensForceChange = (v) => { lensForce = v }; 
initLensForceHelper(scene, onLensForceChange);

function animate(time) {
	requestAnimationFrame(animate);
	time += 0.005;
	const speed = 0.02;

  if (picture && !picture.material.uniforms.pixelWidth.value && pictureTexture.source.data) {
    picture.material.uniforms.pixelWidth.value = pictureTexture.source.data.naturalWidth;
    picture.material.uniforms.pixelHeight.value = pictureTexture.source.data.naturalHeight;
    picture.material.uniforms.force.value = lensForce;
    glasses.updateGrid(pictureTexture);  
  }

  if (picture) {
    picture.material.uniforms.lens.value = new THREE.Vector4(glasses.center.x, glasses.center.y, 0.0, glasses.radius);
    picture.material.uniforms.force.value = lensForce;
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
