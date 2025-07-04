"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { ShaderMaterial } from "three"

const CRTShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // CRT curvature - more pronounced
      uv = uv * 2.0 - 1.0;
      vec2 offset = abs(uv.yx) / vec2(3.0, 2.5);
      uv = uv + uv * offset * offset;
      uv = uv * 0.5 + 0.5;
      
      // Edge fade/vignette - stronger effect
      float vignette = 1.0 - length(uv - 0.5) * 1.2;
      vignette = smoothstep(0.0, 1.0, vignette);
      
      // Scanlines
      float scanline = sin(uv.y * 600.0) * 0.08;
      
      // Phosphor blur effect
      float blur = 0.95 + 0.05 * sin(time * 2.0);
      
      // Screen flicker
      float flicker = 0.97 + 0.03 * sin(110.0 * time);
      
      // Color tint for CRT effect
      vec3 color = vec3(0.9, 0.85, 1.0); // Slight blue tint
      
      float alpha = vignette * (1.0 - scanline) * blur * flicker;
      
      gl_FragColor = vec4(color * alpha * 0.15, alpha * 0.3);
    }
  `,
}

export function CRTEffect() {
  const materialRef = useRef<ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: [window.innerWidth, window.innerHeight] },
    }),
    [],
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} {...CRTShader} uniforms={uniforms} transparent />
    </mesh>
  )
}
