import React, { useRef, useEffect, useState } from 'react';
import { Shape3DType } from '../types';

interface Canvas3DViewerProps {
  shape: Shape3DType;
  wireframe: boolean;
  unfoldProgress: number; // 0 (closed 3D) to 1 (fully unfolded net)
  scale: number;
}

export const Canvas3DViewer: React.FC<Canvas3DViewerProps> = ({
  shape,
  wireframe,
  unfoldProgress,
  scale
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.6 });
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const baseSize = 80 * (scale / 100);

      // Helper for 3D projection
      const project = (x: number, y: number, z: number) => {
        // Apply rotation X and Y
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective
        const perspective = 400;
        const fov = perspective / (perspective + z2);

        return {
          px: cx + x1 * fov,
          py: cy + y2 * fov,
          z: z2
        };
      };

      // Draw Grid Ground
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        const p1 = project(i * 40, 100, -120);
        const p2 = project(i * 40, 100, 120);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        const p3 = project(-120, 100, i * 40);
        const p4 = project(120, 100, i * 40);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // Render 3D Shapes
      if (shape === 'kubus') {
        const s = baseSize / 2;
        const unfoldOffset = unfoldProgress * s * 1.5;

        const vertices = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s], // Front face
          [-s, -s, s],  [s, -s, s],  [s, s, s],  [-s, s, s]   // Back face
        ];

        const projected = vertices.map(v => project(v[0], v[1], v[2]));

        const faces = [
          [0, 1, 2, 3, '#3b82f6'], // Front
          [5, 4, 7, 6, '#60a5fa'], // Back
          [4, 0, 3, 7, '#2563eb'], // Left
          [1, 5, 6, 2, '#1d4ed8'], // Right
          [4, 5, 1, 0, '#93c5fd'], // Top
          [3, 2, 6, 7, '#1e40af']  // Bottom
        ];

        // Sort faces by Z-depth
        faces.sort((a, b) => {
          const zA = (projected[a[0]].z + projected[a[1]].z + projected[a[2]].z + projected[a[3]].z) / 4;
          const zB = (projected[b[0]].z + projected[b[1]].z + projected[b[2]].z + projected[b[3]].z) / 4;
          return zB - zA;
        });

        faces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(projected[face[0]].px, projected[face[0]].py);
          ctx.lineTo(projected[face[1]].px, projected[face[1]].py);
          ctx.lineTo(projected[face[2]].px, projected[face[2]].py);
          ctx.lineTo(projected[face[3]].px, projected[face[3]].py);
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = face[4];
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      } else if (shape === 'balok') {
        const w = baseSize * 0.7;
        const h = baseSize * 0.45;
        const d = baseSize * 0.5;

        const vertices = [
          [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
          [-w, -h, d],  [w, -h, d],  [w, h, d],  [-w, h, d]
        ];

        const projected = vertices.map(v => project(v[0], v[1], v[2]));

        const faces = [
          [0, 1, 2, 3, '#818cf8'],
          [5, 4, 7, 6, '#a5b4fc'],
          [4, 0, 3, 7, '#6366f1'],
          [1, 5, 6, 2, '#4f46e5'],
          [4, 5, 1, 0, '#c7d2fe'],
          [3, 2, 6, 7, '#3730a3']
        ];

        faces.sort((a, b) => {
          const zA = (projected[a[0]].z + projected[a[1]].z + projected[a[2]].z + projected[a[3]].z) / 4;
          const zB = (projected[b[0]].z + projected[b[1]].z + projected[b[2]].z + projected[b[3]].z) / 4;
          return zB - zA;
        });

        faces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(projected[face[0]].px, projected[face[0]].py);
          ctx.lineTo(projected[face[1]].px, projected[face[1]].py);
          ctx.lineTo(projected[face[2]].px, projected[face[2]].py);
          ctx.lineTo(projected[face[3]].px, projected[face[3]].py);
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = face[4];
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      } else if (shape === 'prisma') {
        const w = baseSize * 0.6;
        const h = baseSize * 0.7;
        const d = baseSize * 0.6;

        // Vertices for triangular prism (Alas & Tutup Segitiga)
        // Top triangle (y = -h/2)
        // Bottom triangle (y = h/2)
        const vertices = [
          [0, -h / 2, -d * 0.8],     // 0: Top front apex
          [-w, -h / 2, d * 0.6],     // 1: Top back left
          [w, -h / 2, d * 0.6],      // 2: Top back right
          [0, h / 2, -d * 0.8],      // 3: Bottom front apex
          [-w, h / 2, d * 0.6],      // 4: Bottom back left
          [w, h / 2, d * 0.6]        // 5: Bottom back right
        ];

        const projected = vertices.map(v => project(v[0], v[1], v[2]));

        // Faces:
        // Top triangle: [0, 1, 2]
        // Bottom triangle: [3, 5, 4]
        // Front-left face: [0, 3, 4, 1]
        // Front-right face: [0, 2, 5, 3]
        // Back face: [1, 4, 5, 2]
        const faces = [
          { pts: [0, 1, 2], color: '#a855f7' },
          { pts: [3, 5, 4], color: '#7e22ce' },
          { pts: [0, 3, 4, 1], color: '#9333ea' },
          { pts: [0, 2, 5, 3], color: '#c084fc' },
          { pts: [1, 4, 5, 2], color: '#6b21a8' }
        ];

        // Sort faces by Z depth
        faces.sort((a, b) => {
          const zA = a.pts.reduce((sum, idx) => sum + projected[idx].z, 0) / a.pts.length;
          const zB = b.pts.reduce((sum, idx) => sum + projected[idx].z, 0) / b.pts.length;
          return zB - zA;
        });

        faces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(projected[face.pts[0]].px, projected[face.pts[0]].py);
          for (let i = 1; i < face.pts.length; i++) {
            ctx.lineTo(projected[face.pts[i]].px, projected[face.pts[i]].py);
          }
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = face.color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      } else if (shape === 'limas') {
        const b = baseSize * 0.7;
        const h = baseSize * 0.8;

        const top = project(0, -h, 0);
        const b1 = project(-b, h / 2, -b);
        const b2 = project(b, h / 2, -b);
        const b3 = project(b, h / 2, b);
        const b4 = project(-b, h / 2, b);

        const faces = [
          { pts: [b1, b2, b3, b4], color: '#059669' }, // Base
          { pts: [top, b1, b2], color: '#10b981' },
          { pts: [top, b2, b3], color: '#34d399' },
          { pts: [top, b3, b4], color: '#047857' },
          { pts: [top, b4, b1], color: '#065f46' }
        ];

        faces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(face.pts[0].px, face.pts[0].py);
          for (let i = 1; i < face.pts.length; i++) {
            ctx.lineTo(face.pts[i].px, face.pts[i].py);
          }
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = face.color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      } else if (shape === 'tabung') {
        const r = baseSize * 0.5;
        const h = baseSize * 0.7;
        const segments = 24;

        const topPts = [];
        const botPts = [];

        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          topPts.push(project(x, -h / 2, z));
          botPts.push(project(x, h / 2, z));
        }

        // Render side strips
        for (let i = 0; i < segments; i++) {
          const next = (i + 1) % segments;
          ctx.beginPath();
          ctx.moveTo(topPts[i].px, topPts[i].py);
          ctx.lineTo(topPts[next].px, topPts[next].py);
          ctx.lineTo(botPts[next].px, botPts[next].py);
          ctx.lineTo(botPts[i].px, botPts[i].py);
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = i % 2 === 0 ? '#0891b2' : '#06b6d4';
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#67e8f9';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Top cap
        ctx.beginPath();
        ctx.moveTo(topPts[0].px, topPts[0].py);
        for (let i = 1; i < segments; i++) {
          ctx.lineTo(topPts[i].px, topPts[i].py);
        }
        ctx.closePath();
        if (!wireframe) {
          ctx.fillStyle = '#22d3ee';
          ctx.fill();
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bottom cap
        ctx.beginPath();
        ctx.moveTo(botPts[0].px, botPts[0].py);
        for (let i = 1; i < segments; i++) {
          ctx.lineTo(botPts[i].px, botPts[i].py);
        }
        ctx.closePath();
        if (!wireframe) {
          ctx.fillStyle = '#155e75';
          ctx.fill();
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (shape === 'kerucut') {
        const r = baseSize * 0.55;
        const h = baseSize * 0.8;
        const segments = 24;

        const apex = project(0, -h / 2, 0);
        const botPts = [];

        for (let i = 0; i < segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          botPts.push(project(x, h / 2, z));
        }

        for (let i = 0; i < segments; i++) {
          const next = (i + 1) % segments;
          ctx.beginPath();
          ctx.moveTo(apex.px, apex.py);
          ctx.lineTo(botPts[next].px, botPts[next].py);
          ctx.lineTo(botPts[i].px, botPts[i].py);
          ctx.closePath();

          if (!wireframe) {
            ctx.fillStyle = i % 2 === 0 ? '#d97706' : '#f59e0b';
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
          ctx.strokeStyle = '#fde68a';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (shape === 'bola') {
        const r = baseSize * 0.6;
        const rings = 12;
        const segments = 18;

        for (let i = 0; i <= rings; i++) {
          const v = i / rings;
          const phi = v * Math.PI;
          const y = -Math.cos(phi) * r;
          const ringR = Math.sin(phi) * r;

          ctx.beginPath();
          for (let j = 0; j <= segments; j++) {
            const u = j / segments;
            const theta = u * Math.PI * 2;
            const x = Math.cos(theta) * ringR;
            const z = Math.sin(theta) * ringR;
            const p = project(x, y, z);

            if (j === 0) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          }
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    };

    render();
  }, [shape, wireframe, unfoldProgress, scale, rotation]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={480}
        height={340}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-[480px] h-[320px] bg-slate-950 rounded-2xl border border-slate-800 shadow-inner cursor-grab active:cursor-grabbing touch-none"
      />
      <div className="absolute bottom-3 left-4 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-1">
        <span>🖱️ Klik & Drag Mouse / Sentuh untuk Memutar 3D</span>
      </div>
    </div>
  );
};
