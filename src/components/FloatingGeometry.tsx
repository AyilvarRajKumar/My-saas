import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GradientMaterial = ({ color1, color2 }: { color1: string; color2: string }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
    }),
    [color1, color2]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          float gradient = (vPosition.y + 1.0) * 0.5 + sin(uTime * 0.5) * 0.1;
          vec3 color = mix(uColor1, uColor2, gradient);
          float alpha = 0.3 + fresnel * 0.5;
          gl_FragColor = vec4(color, alpha);
        }
      `}
      transparent
      wireframe
    />
  );
};

const FloatingIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[-3, 1.5, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <GradientMaterial color1="#a855f7" color2="#06b6d4" />
      </mesh>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[3.5, -1, -3]}>
        <torusGeometry args={[0.8, 0.3, 8, 16]} />
        <GradientMaterial color1="#06b6d4" color2="#a855f7" />
      </mesh>
    </Float>
  );
};

const FloatingOctahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.0}>
      <mesh ref={meshRef} position={[1, 2.5, -4]}>
        <octahedronGeometry args={[0.7, 0]} />
        <GradientMaterial color1="#a855f7" color2="#06b6d4" />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#06b6d4" />
      <FloatingIcosahedron />
      <FloatingTorus />
      <FloatingOctahedron />
    </>
  );
};

const FloatingGeometry = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleVisibilityChange = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(handleVisibilityChange, {
      threshold: 0,
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [handleVisibilityChange]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
};

export default FloatingGeometry;
