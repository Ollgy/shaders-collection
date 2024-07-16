import * as THREE from 'three';

export const blurEffectMaterial = (texture) => new THREE.ShaderMaterial({
	uniforms: {
    tDiffuse: {
      value: texture
    },
    pixelWidth: {
      value: texture.source.data && texture.source.data.naturalWidth
    }
	},
	vertexShader: `
		varying vec2 vUv;
		uniform float uTime;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);;
		}
	`,
	fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float pixelWidth;
      
    varying vec2 vUv;

    void main() {
      float r = 10.0;
      float step = 1.0 / pixelWidth;
      float totalWeight = 1.0 + r;
      vec4 value = texture2D(tDiffuse, vUv.xy) / totalWeight;

      float x = 1.0;
      while (x <= r)
      {
        float currentWeight = totalWeight - x;
        float weight = currentWeight / (totalWeight * totalWeight);
        value = value + weight * ( 
          + texture2D(tDiffuse, vUv.xy - vec2(step * x, 0)) 
          + texture2D(tDiffuse, vUv.xy + vec2(step * x, 0)));
        x += 1.0;
      }
      gl_FragColor = value;
    }
  `,
	wireframe: false,
});