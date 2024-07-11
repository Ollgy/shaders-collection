import * as THREE from 'three';

export const shaderingWiggleMaterial = (color) => new THREE.ShaderMaterial({
	uniforms: {
		color: {
			value: color || new THREE.Color("aqua")
		},
		uTime: {
			value: 0
		}
	},
	transparent: true,
	vertexShader: `
		varying vec2 vUv;
		uniform float uTime;
		
		void main() {
			vUv = uv;

			vec3 delta = normal * abs(position * sin((uTime / 10.0)));
			vec3 newPosition = position + delta;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
		}
	`,
	fragmentShader: `
	uniform vec3 color;

	void main() {
		gl_FragColor = vec4(color.rgb, 0.4);
	}
`,
	wireframe: false,
});
