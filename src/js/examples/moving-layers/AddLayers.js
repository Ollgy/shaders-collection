import * as THREE from 'three';
import { shaderingWiggleMaterial } from './MovingLayersShaderMaterial';

const LAYERS = [
  {
    color: {r: "255", g: "255", b: "0"},  
    scale: 1.2,
    position: [0, -5, -5]
  },
  {
    color: {r: "0", g: "250", b: "15"},  
    scale:  1.7,
    position: [0, -5, -15]
  },
  {
    color: {r: "255", g: "0", b: "0"},  
    scale:  2,
    position: [0, -5, -20]
  },
];

export function wrapWithMovingLayer(mesh) {
	const wrapper = new THREE.Object3D();
  const clones = [];

  wrapper.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
  // wrapper.rotation.set(Math.PI / 2, Math.PI, 0);
  // wrapper.position.set(0, -20, -75);

  const base = mesh.clone();
  wrapper.add(base);

  LAYERS.forEach(layer => {
    const clone = createClone(mesh, layer.color, layer.scale, mesh.position);
    wrapper.add(clone);
    clones.push(clone);
  });

  base.position.set(0, 0, 0);
  mesh.visible = false;
  base.visible = false;

  return { object: wrapper, layers: clones };
}

function createClone(base, color, scale, position) {
  const childClone = base.clone();
  childClone.material = shaderingWiggleMaterial(color);
  childClone.scale.set(scale, scale, scale);
  childClone.position.set(...position); 
  return childClone;
}