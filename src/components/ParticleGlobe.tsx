import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const W = mount.clientWidth || 1;
    const H = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles on a sphere (Fibonacci distribution)
    const N = 800;
    const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const positions: number[] = [];
    const colors: number[] = [];

    const colorPurple = new THREE.Color('#9333EA');
    const colorCyan   = new THREE.Color('#00E5FF');
    const colorWhite  = new THREE.Color('#F0F0FF');

    for (let i = 0; i < N; i++) {
      const y     = 1 - (i / (N - 1)) * 2;
      const rad   = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GA;
      positions.push(Math.cos(theta) * rad, y, Math.sin(theta) * rad);

      // Purple at the bottom, cyan in the middle, white at the top
      const t = (y + 1) / 2;
      const c = t < 0.5
        ? colorPurple.clone().lerp(colorCyan, t * 2)
        : colorCyan.clone().lerp(colorWhite, (t - 0.5) * 2);
      colors.push(c.r, c.g, c.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const globe = new THREE.Points(geo, mat);
    scene.add(globe);

    // Connection lines between 120 random pairs of nearby particles
    const linePositions: number[] = [];
    const pos = geo.attributes.position;
    let attempts = 0;
    let connected = 0;
    while (connected < 120 && attempts < 5000) {
      attempts++;
      const a = Math.floor(Math.random() * N);
      const b = Math.floor(Math.random() * N);
      if (a === b) continue;
      const ax = pos.getX(a), ay = pos.getY(a), az = pos.getZ(a);
      const bx = pos.getX(b), by = pos.getY(b), bz = pos.getZ(b);
      const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
      if (dist < 0.35) {
        linePositions.push(ax, ay, az, bx, by, bz);
        connected++;
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#9333EA'),
      transparent: true,
      opacity: 0.12,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Thin wireframe sphere for the outer glow
    const ringGeo = new THREE.SphereGeometry(1.02, 32, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#9333EA'),
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    scene.add(new THREE.Mesh(ringGeo, ringMat));

    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.0018;
      lines.rotation.y += 0.0018;
      // Gentle mouse parallax tilt
      globe.rotation.x += (mouseY * 0.3 - globe.rotation.x) * 0.05;
      lines.rotation.x  = globe.rotation.x;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return; // hidden below lg
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      [geo, lineGeo, ringGeo, mat, lineMat, ringMat].forEach(o => o.dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[360px]"
      style={{ background: 'transparent' }} aria-hidden="true" />
  );
}
