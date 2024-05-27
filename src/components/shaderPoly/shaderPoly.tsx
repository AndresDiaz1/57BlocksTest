"use client";
import * as THREE from "three";
import "./shaderPoly.css";
import { useEffect } from "react";
export default function ShaderPoly() {
  let camera: THREE.PerspectiveCamera | undefined;
  let renderer: THREE.WebGLRenderer | undefined;

  useEffect(() => {
    window.addEventListener("resize", onResize);
    createScene();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const createScene = () => {
    const scene = new THREE.Scene();

    // Red Cube
    const geometry = new THREE.CircleGeometry(1, 5);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        radius: { value: 0.5 },
        lineWidth: { value: 0.1 },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Camera
    const picture = document.querySelector(".picture") as HTMLImageElement;
    const sizes = {
      width: picture.clientWidth,
      height: picture.clientHeight,
    };

    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 1.5;

    scene.add(camera);

    // Renderer
    const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.render(scene, camera);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update material
      material.uniforms["time"].value = elapsedTime;

      // Update Mesh
      mesh.rotation.z = 0.1 * elapsedTime;

      // Render
      if (renderer) {
        renderer.render(scene, camera as THREE.PerspectiveCamera);
      }

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  };

  const onResize = () => {
    const picture = document.querySelector("canvas.webgl") as HTMLImageElement;
    // Update sizes
    const sizes = {
      width: picture.clientWidth,
      height: picture.clientHeight,
    };

    // Update camera
    if (camera) {
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    }

    // Update renderer
    if (renderer) {
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  };

  const vertexShader = () => {
    return `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;
      }
    `;
  };

  const fragmentShader = () => {
    return `
      varying vec2 vUv;
      uniform float time;
      void main() {
          vec2 p = -1.0 + 2.0 * vUv;
          vec2 position = p;
          float a = atan(position.y * 0.5);
          float r = length(position);
          float sx = abs(sin(a * 0.1 + time * 1.0));
          float sy = sin(r * 100.5 + time * 10.0);
          float cx = sin(time * 0.3) * 0.3;
          float cy = cos(time * 0.2) * 0.1;
          r += sx * 10.2 * sy * cy;
          float d = abs(r - 0.1 - cx) + abs(sy * 0.2 + cy);
          float intensity = 0.5 / (d + 0.1);
          vec3 tealColor = vec3(0.086, 0.867, 0.773);
          vec3 goldColor= vec3(0.984, 0.949, 0.757);
          vec3 finalColor = mix(tealColor, goldColor, intensity);


          vec3 purple = vec3(1., 0.071, 0.012);
          vec3 gray = vec3(0.431, 0.545, 0.701);

          finalColor = mix(purple, gray, intensity);


          gl_FragColor = vec4( finalColor, 1.0);
      }
    `;
  };

  return (
    <>
      <canvas className="webgl"></canvas>
    </>
  );
}
