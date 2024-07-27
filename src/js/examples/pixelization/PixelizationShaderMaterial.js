import * as THREE from 'three';

export const pixelizationShaderMaterial = (texture) => new THREE.ShaderMaterial({
	uniforms: {
		tDiffuse: {
			value: texture
		},
		uTime: {
			value: 0
		},
	},
	vertexShader: `
		varying vec2 vUv;
		uniform float uTime;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: `
	uniform vec3 color;
	uniform sampler2D tDiffuse;
	uniform float uTime;

	varying vec2 vUv;

	void main() {
		float ASPECT_RATIO = 1.0;
		float factor = 5.0 + floor(abs(sin(uTime)) * 100.0);
		vec2 gridSize = vec2(factor, floor(factor/ASPECT_RATIO));
		vec2 uv = floor(vUv * gridSize) / gridSize;
		gl_FragColor = vec4(texture2D(tDiffuse, uv.xy).rgb, 1.0);
	}
`,
	wireframe: false,
});