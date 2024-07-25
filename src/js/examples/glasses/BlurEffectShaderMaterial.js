import * as THREE from 'three';

export const blurEffectMaterial = (texture) => new THREE.ShaderMaterial({
	uniforms: {
    tDiffuse: {
      value: texture
    },
    pixelWidth: {
      value: texture.source.data && texture.source.data.naturalWidth
    },
    pixelHeight: {
      value: texture.source.data && texture.source.data.naturalHeight
    },
    lens: {
      value: new THREE.Vector4(0.5, 0.5, 0.0, 0.1)
    },
    force: {
      value: -3.5
    }
	},
	vertexShader: `
		varying vec2 vUv;
		uniform float uTime;
    uniform float pixelWidth;
    uniform float pixelHeight;
    uniform vec4 lens;
		
		void main() {
			vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0) ;
		}
	`,
	fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float pixelWidth;
    uniform float pixelHeight;
    uniform float force;
    uniform vec4 lens;
      
    varying vec2 vUv;

    void main() {
      // Linear magnification factor (we assume the distance to the object is equal to 1.0: G = D / 1 + d)
      float G = force / 2.0;
      // Distortion factor
      float F = 1.0 * force * force;
      float aspectRatio = pixelWidth / pixelHeight;
      float lensRadius = lens.w;
      float distanceToLensCenter = distance(vec2(vUv.x, vUv.y / aspectRatio), vec2(lens.x, lens.y / aspectRatio));

      if (distanceToLensCenter < lensRadius + 0.01 && distanceToLensCenter > lensRadius - 0.01) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      } else 
      if (distanceToLensCenter < lensRadius) {
        vec2 positionInLens = (vUv.xy - vec2(lens.x, lens.y));
        float curvative = (positionInLens.x * positionInLens.x + positionInLens.y * positionInLens.y);
        vec2 delta = (G * positionInLens + F * curvative * positionInLens) * (-1.0);
        gl_FragColor = texture2D(tDiffuse, vec2(lens.x, lens.y) + delta);
      } else {
        float r = abs(force * 2.0);
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
    }
  `,
	wireframe: false,
});