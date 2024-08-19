import * as THREE from 'three';

export const riverShaderMaterial = (texture, map) => new THREE.ShaderMaterial({
	uniforms: {
		tDiffuse: {
			value: texture
		},
		tMap: {
			value: map
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
	uniform sampler2D tMap;
	uniform float uTime;

	varying vec2 vUv;

	float speed = 2.0;

// "Hush functions for GPURendering" by Mark Jarzynski and Marc Olano published in the 
// "Journal of Cumputer Graphics Techniques" in 2020. They compare different random generators 
// for quality and speed. http://www.jcgt.org/published/0009/03/02/
	vec3 random_pcg3d(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
  v ^= v >> 16u;
  v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
  return vec3(v) * (1.0/float(0xffffffffu));
}

float t2p(float t, float noOfPixels) {
	return t * float(noOfPixels) - 0.5;
}

vec3 valueNoise(vec2 pos, float gridSizeX, float gridSizeY) {
	vec2 gridPos = vec2(pos.x * gridSizeX, pos.y * gridSizeY);
	float px = t2p(gridPos.x, 67.0);
	float py = t2p(gridPos.y, 120.0);
	
	vec3 random = random_pcg3d(uvec3(px, py, uTime * speed));

	uvec2 i = uvec2(gridPos);
  vec2 f = fract(gridPos);
 
  vec3 f11 = random_pcg3d(uvec3(i.x, i.y, uTime * speed));
  vec3 f12 = random_pcg3d(uvec3(i.x + 1u, i.y, uTime * speed));
  vec3 f21 = random_pcg3d(uvec3(i.x, i.y + 1u, uTime * speed));
  vec3 f22 = random_pcg3d(uvec3(i.x + 1u, i.y + 1u, uTime * speed));
  
  f = smoothstep(0.0, 1.0, f);

  vec3 q1 = mix(f11, f12, vec3(f.x));
  vec3 q2 = mix(f21, f22, vec3(f.x));
  vec3 p = mix(q1, q2, vec3(f.y));
 
 return p;
 }

 vec4 fractalValueNoise(vec2 pos, float gridSizeX, float gridSizeY) {
	  vec3 n = vec3(0.0);
	  n += 0.500 * valueNoise(pos, gridSizeX, gridSizeY);
	  n += 0.250 * valueNoise(pos, gridSizeX, gridSizeY * gridSizeY);
	  n += 0.125 * valueNoise(pos, gridSizeX, gridSizeY * gridSizeY * gridSizeY);
	  return vec4(n, 1.0);
	}
	
	float noiseWeight = 0.3;
	void main() {
		vec4 frag = texture2D(tDiffuse, vUv.xy);
		vec4 map = texture2D(tMap, vUv.xy);
		vec4 mapNoise = fractalValueNoise(vUv, 25.0, 200.0);
		gl_FragColor = vec4(frag.rgb, 1.0) + map * mapNoise * noiseWeight; 
	}
`,
	wireframe: false,
});


