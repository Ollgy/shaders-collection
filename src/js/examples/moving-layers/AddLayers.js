import * as THREE from 'three';
import { shaderingWiggleMaterial } from './MovingLayersShaderMaterial';

const LAYERS = [
  {
    color: {r: "255", g: "255", b: "0"},  
    scale: 1.2
  },
  {
    color: {r: "0", g: "250", b: "15"},  
    scale:  1.7
  },
  {
    color: {r: "255", g: "0", b: "0"},  
    scale:  2
  }
];

export function wrapWithMovingLayer(mesh) {
	const wrapper = new THREE.Object3D();
  const clones = [];

  wrapper.position.set(mesh.position.x, mesh.position.y, mesh.position.z)

  LAYERS.forEach(layer => {
    const clone = createClone(mesh, layer.color, layer.scale, mesh.position);
    wrapper.add(clone);
    clones.push(clone);
  });

  return { object: wrapper, layers: clones };
}

function createClone(base, color, scale, position) {
  const childClone = base.clone();
  childClone.material = shaderingWiggleMaterial(color);
  childClone.scale.set(scale, scale, scale);
  childClone.position.set(...position); 
  return childClone;
}