import * as THREE from 'three';

export const randomBlinkingMaterial = (color1, color2, texture) => new THREE.ShaderMaterial({
	uniforms: {
		color1: {
			value: color1 || new THREE.Color("white")
		},
    color2: {
			value: color2 || new THREE.Color("black")
		},
		uTime: {
			value: 0
		},
    gridNumber: {
      value: 10
    },
    tDiffuse: {
      value: texture
    }
	},
	vertexShader: `
		varying vec2 vUv;
		uniform float uTime;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);;
		}
	`,
	fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float gridNumber;

    float rand(vec2 co)
    {
      return fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453);
    }

    float randomX(float uTime) {
      return floor(rand(vec2(uTime, uTime)) * gridNumber) / gridNumber;
    }

    float randomY (float uTime) {
      return floor(rand(vec2(1.0/uTime, 1.0/uTime)) * gridNumber) / gridNumber;
    }

    varying vec2 vUv;
    void main() {
      float gridSize = 1.0 / gridNumber;
      vec3 colors[5] = vec3[](
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 1.0, 0.0)
      );

      float X[5] = float[](0.0,0.0,0.0,0.0,0.0);
      float Y[5] = float[](0.0,0.0,0.0,0.0,0.0);

      for (int i = 0; i < 5; i++) {
        X[i] = randomX(uTime * float(i + 1));
        Y[i] = randomY(uTime / float(i + 1));
      }
      
      // Create grid (according to the even-odd principle)
      if ((floor(mod(vUv.x * gridNumber, 2.0)) == 0.0 && floor(mod(vUv.y * gridNumber, 2.0)) == 1.0 
        || floor(mod(vUv.x * gridNumber, 2.0)) == 1.0 && floor(mod(vUv.y * gridNumber, 2.0)) == 0.0)) {
        gl_FragColor = vec4(color1.rgb + texture2D(tDiffuse, vUv.xy).rgb, 1.0);
      } else {
        gl_FragColor = vec4(color2 + texture2D(tDiffuse, vUv.xy).rgb, 1.0);
      }

      // Add random color blinking pieces effect
      for (int i = 0; i < X.length(); i++) {
        if ((vUv.x > X[i] && vUv.x < X[i] + gridSize) && (vUv.y > Y[i] && vUv.y < Y[i] + gridSize)) {
          gl_FragColor = vec4(colors[i], 1.0);
        }
      }
    }
  `,
	wireframe: false,
});
