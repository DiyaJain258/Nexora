import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Radio, Activity, Volume2 } from 'lucide-react';

const FloatingTvDisplay: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetRotY = mousePos.x * 0.35;
      const targetRotX = -mousePos.y * 0.2;
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 3.5, delta);
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 3.5, delta);
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <Float speed={2.0} rotationIntensity={0.15} floatIntensity={0.5}>
        <mesh position={[0, 0, -0.2]}>
          <planeGeometry args={[5.2, 3.2]} />
          <meshBasicMaterial color="#e11d48" transparent opacity={0.18} />
        </mesh>

        <RoundedBox args={[4.6, 2.7, 0.12]} radius={0.06} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color="#0d0d12" roughness={0.15} metalness={0.9} />
        </RoundedBox>

        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[4.46, 2.56]} />
          <meshStandardMaterial color="#050507" roughness={0.1} metalness={0.95} />
        </mesh>

        <Html
          transform
          occlude="blending"
          position={[0, 0, 0.075]}
          scale={0.218}
          style={{
            width: '850px',
            height: '488px',
            userSelect: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#050507',
            position: 'relative',
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80"
            alt="Live 4K Match"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.15) brightness(0.95)' }}
          />

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(5, 5, 7, 0.4) 0%, transparent 40%, rgba(5, 5, 7, 0.85) 100%)',
            }}
          />

          <div style={{ position: 'absolute', top: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: '#e11d48', color: '#ffffff', fontSize: '11px', fontWeight: 900, padding: '3px 8px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                LIVE
              </span>
              <span style={{ backgroundColor: 'rgba(10, 10, 14, 0.75)', color: '#fda4af', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '5px' }}>
                4K UHD • 60 FPS
              </span>
            </div>

            <div style={{ backgroundColor: 'rgba(10, 10, 14, 0.75)', color: '#f8fafc', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={12} color="#fda4af" />
              <span>18.6 Mbps HEVC</span>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#fda4af', fontWeight: 800, textTransform: 'uppercase' }}>
                UEFA Champions League • Matchday 6
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                Real Madrid vs Manchester City
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(10, 10, 14, 0.8)', padding: '6px 12px', borderRadius: '8px' }}>
              <Volume2 size={14} color="#fda4af" />
              <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '14px' }}>
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
              <span style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 700 }}>Dolby Atmos</span>
            </div>
          </div>
        </Html>

        <mesh position={[0, -1.45, -0.06]}>
          <cylinderGeometry args={[0.07, 0.09, 0.35, 16]} />
          <meshStandardMaterial color="#27272a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -1.62, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.7]} />
          <meshStandardMaterial color="#18181b" metalness={0.85} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const AmbientParticles: React.FC<{ count?: number }> = ({ count = 130 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const wine = new THREE.Color('#e11d48');
    const platinum = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const mixed = Math.random() > 0.5 ? wine : platinum;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} />
    </points>
  );
};

export const HeroScene3D: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '520px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="ambilight-glow" />

      <Canvas camera={{ position: [0, 0, 5.0], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 2, 3]} intensity={2.0} color="#be123c" />
        <pointLight position={[0, -2, 2]} intensity={1.5} color="#e11d48" />
        <FloatingTvDisplay mousePos={mousePos} />
        <AmbientParticles count={130} />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: '28px',
          right: '5%',
          backgroundColor: 'rgba(10, 10, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(225, 29, 72, 0.4)',
          padding: '10px 18px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 12px 35px rgba(225, 29, 72, 0.25)',
          pointerEvents: 'none',
        }}
      >
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48', boxShadow: '0 0 10px #e11d48' }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>4K 60FPS HEVC Stream</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Zero Packet Loss • Low Latency</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '5%',
          backgroundColor: 'rgba(10, 10, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(225, 29, 72, 0.35)',
          padding: '10px 18px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 12px 35px rgba(225, 29, 72, 0.2)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(225, 29, 72, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Volume2 size={16} color="#fda4af" />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>Dolby Atmos Spatial 7.1</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Cinema Grade Bitstream</div>
        </div>
      </div>
    </div>
  );
};
