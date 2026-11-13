"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp } from "@/lib/utils";

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uPointer;
  uniform float uWidth;
  attribute vec3 aTarget;
  attribute float aSeed;
  varying float vMorph;
  varying float vAlpha;

  void main() {
    // The change sweeps across the field: stitches lead on the right, pixels trail on the left.
    float column = clamp(position.x / uWidth + 0.5, 0.0, 1.0);
    float morph = smoothstep(0.0, 1.0, clamp(uProgress * 2.2 - (1.0 - column) * 1.1 - aSeed * 0.12, 0.0, 1.0));
    vec3 pos = mix(position, aTarget, morph);
    pos.z += sin(uTime * 0.7 + pos.x * 1.4 + aSeed * 6.2831) * 0.07 * (0.4 + morph);

    float near = 1.0 - smoothstep(0.0, 1.7, distance(pos.xy, uPointer));
    pos.z += near * 0.7;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (1.0 + near * 0.9) * (6.0 / -mvPosition.z);
    vMorph = morph;
    vAlpha = mix(0.28, 0.85, morph) + near * 0.25;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vMorph;
  varying float vAlpha;

  void main() {
    // A square pixel that flattens into a stitch-shaped dash as it morphs.
    vec2 point = abs(gl_PointCoord - 0.5);
    float halfHeight = mix(0.42, 0.14, vMorph);
    if (point.x > 0.46 || point.y > halfHeight) discard;
    gl_FragColor = vec4(uColor, clamp(vAlpha, 0.0, 1.0));
  }
`;

interface FieldProps {
  /** 0..1 scroll progress through the hero. */
  progress: MotionValue<number>;
  color: string;
  columns: number;
  rows: number;
  interactive: boolean;
}

const WIDTH = 12;
const HEIGHT = 6.4;

/**
 * The site's single 3D element: a grid of "pixels" that re-forms into rows of
 * running stitches as the visitor scrolls, and bulges toward the pointer.
 * One draw call, one small buffer geometry, no textures.
 */
export function PixelStitchField({ progress, color, columns, rows, interactive }: FieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2(99, 99));
  const pointerTarget = useRef(new THREE.Vector2(99, 99));
  const invalidate = useThree((state) => state.invalidate);

  const geometry = useMemo(() => {
    const count = columns * rows;
    const grid = new Float32Array(count * 3);
    const stitches = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        const x = (column / (columns - 1) - 0.5) * WIDTH;
        const y = (row / (rows - 1) - 0.5) * HEIGHT;
        grid.set([x, y, 0], index * 3);
        // Target: the same columns bent into flowing thread lines.
        const wave = Math.sin(x * 0.85 + row * 0.55) * 0.42;
        stitches.set([x, y * 0.92 + wave, Math.cos(x * 0.6 + row * 0.8) * 0.5], index * 3);
        // Deterministic per-point offset (no Math.random, so renders are reproducible).
        seeds[index] = (Math.sin(index * 12.9898) * 43758.5453) % 1;
        if (seeds[index] < 0) seeds[index] += 1;
      }
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(grid, 3));
    buffer.setAttribute("aTarget", new THREE.BufferAttribute(stitches, 3));
    buffer.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return buffer;
  }, [columns, rows]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 9 },
      uWidth: { value: WIDTH },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uColor: { value: new THREE.Color() },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uColor.value.set(color);
    invalidate();
  }, [color, uniforms, invalidate]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (event: PointerEvent) => {
      pointerTarget.current.set(
        (event.clientX / window.innerWidth - 0.5) * WIDTH,
        -(event.clientY / window.innerHeight - 0.5) * HEIGHT,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  useFrame((state) => {
    const material = materialRef.current;
    const group = groupRef.current;
    if (!material || !group) return;
    const time = state.clock.elapsedTime;
    // The field "breathes" between pixels and stitches, and scrolling pushes it to stitches.
    const idle = 0.42 + Math.sin(time * 0.4) * 0.12;
    material.uniforms.uProgress.value = clamp(idle + progress.get() * 1.4, 0, 1);
    material.uniforms.uTime.value = time;
    pointer.current.lerp(pointerTarget.current, 0.08);
    material.uniforms.uPointer.value.copy(pointer.current);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, clamp(pointer.current.x, -6, 6) * 0.018, 0.05);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -0.32 + clamp(pointer.current.y, -4, 4) * -0.012, 0.05);
  });

  return (
    <group ref={groupRef} rotation={[-0.32, 0, 0]}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}
