import React, { useState } from 'react';
import { Canvas3DViewer } from './Canvas3DViewer';
import { JaringJaringViewer } from './JaringJaringViewer';
import { Shape3DType, NavSection } from '../types';
import { 
  Box, 
  RotateCw, 
  Eye, 
  Layers, 
  Maximize2, 
  Compass, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface EksplorasiProps {
  setActiveSection: (section: NavSection) => void;
}

export const Eksplorasi: React.FC<EksplorasiProps> = ({ setActiveSection }) => {
  const [selectedShape, setSelectedShape] = useState<Shape3DType>('kubus');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(100);
  const [modeView, setModeView] = useState<'canvas' | 'jaring' | 'geogebra'>('canvas');

  const shapeInfo: Record<Shape3DType, { name: string; category: string; desc: string; vertices: string; faces: string; edges: string; geogebraUrl: string }> = {
    kubus: {
      name: 'Kubus (Cube)',
      category: 'Bangun Ruang Sisi Datar',
      desc: 'Kubus dibatasi oleh 6 buah bidang sisi berbentuk persegi yang kongruen (identik).',
      vertices: '8 Titik Sudut',
      faces: '6 Sisi (Persegi)',
      edges: '12 Rusuk (Sama Panjang)',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/MZaQ9h8t/width/800/height/500/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/true/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false'
    },
    balok: {
      name: 'Balok (Cuboid / Rectangular Prism)',
      category: 'Bangun Ruang Sisi Datar',
      desc: 'Balok dibatasi oleh 3 pasang bidang sisi berbentuk persegi panjang yang sejajar.',
      vertices: '8 Titik Sudut',
      faces: '6 Sisi (Persegi Panjang)',
      edges: '12 Rusuk (3 Pasang Sejajar)',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/MZaQ9h8t/width/800/height/500/border/888888'
    },
    prisma: {
      name: 'Prisma Segitiga (Triangular Prism)',
      category: 'Bangun Ruang Sisi Datar',
      desc: 'Prisma memiliki dua bidang alas dan tutup berbentuk segitiga yang kongruen.',
      vertices: '6 Titik Sudut',
      faces: '5 Sisi (2 Segitiga + 3 Persegi Panjang)',
      edges: '9 Rusuk',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/v9Upx5Jv/width/800/height/500/border/888888'
    },
    limas: {
      name: 'Limas Segiempat (Square Pyramid)',
      category: 'Bangun Ruang Sisi Datar',
      desc: 'Limas dibatasi oleh satu bidang alas persegi dan sisi tegak berbentuk segitiga yang berpotongan di satu titik puncak.',
      vertices: '5 Titik Sudut (1 Puncak)',
      faces: '5 Sisi (1 Alas + 4 Segitiga Tegak)',
      edges: '8 Rusuk',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/c6uYf344/width/800/height/500/border/888888'
    },
    tabung: {
      name: 'Tabung (Cylinder)',
      category: 'Bangun Ruang Sisi Lengkung',
      desc: 'Tabung memiliki 2 alas berupa lingkaran sejajar dan 1 selimut melengkung mulus.',
      vertices: '0 Titik Sudut',
      faces: '3 Sisi (Alas, Tutup, Selimut)',
      edges: '2 Rusuk Lengkung',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/xJkYc7G6/width/800/height/500/border/888888'
    },
    kerucut: {
      name: 'Kerucut (Cone)',
      category: 'Bangun Ruang Sisi Lengkung',
      desc: 'Kerucut memiliki alas lingkaran dan selimut melengkung yang meruncing pada satu puncak.',
      vertices: '1 Titik Puncak',
      faces: '2 Sisi (Alas Lingkaran & Selimut)',
      edges: '1 Rusuk Lengkung',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/yN8t9R4n/width/800/height/500/border/888888'
    },
    bola: {
      name: 'Bola (Sphere)',
      category: 'Bangun Ruang Sisi Lengkung',
      desc: 'Bola dibatasi oleh satu bidang lengkung tertutup sempurna berjarak sama (r) dari titik pusat.',
      vertices: '0 Titik Sudut',
      faces: '1 Sisi Lengkung',
      edges: '0 Rusuk',
      geogebraUrl: 'https://www.geogebra.org/material/iframe/id/eUeWvWwz/width/800/height/500/border/888888'
    }
  };

  const currentInfo = shapeInfo[selectedShape];

  return (
    <section id="section-eksplorasi" className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>Laboratorium Geometri Virtual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Eksplorasi 1: Simulasi 3D Interaktif Bangun Ruang
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Manipulasi bentuk 3D secara langsung! Putar, rotasi 360°, aktifkan mode kerangka (wireframe), dan ubah ukuran skala untuk mengeksplorasi struktur internal geometri.
        </p>
      </div>

      {/* Main Exploration Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control & Shape Selector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-blue-400" />
              <span>Pilih Bangun Ruang</span>
            </h2>
            <p className="text-xs text-slate-400">Pilih salah satu bentuk geometri di bawah untuk ditampilkan pada kanvas 3D:</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(shapeInfo) as Shape3DType[]).map((shapeKey) => {
              const info = shapeInfo[shapeKey];
              const isSelected = selectedShape === shapeKey;
              return (
                <button
                  key={shapeKey}
                  id={`select-shape-${shapeKey}`}
                  onClick={() => setSelectedShape(shapeKey)}
                  className={`p-3 rounded-xl border text-left font-semibold text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md scale-102'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="font-bold">{info.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-300 opacity-80">{info.category.includes('Datar') ? 'Sisi Datar' : 'Sisi Lengkung'}</div>
                </button>
              );
            })}
          </div>

          <hr className="border-slate-800" />

          {/* Controls */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-indigo-400" />
              <span>Pengaturan Kamera & Tampilan</span>
            </h3>

            {/* View Mode Toggle */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                id="view-mode-canvas"
                onClick={() => setModeView('canvas')}
                className={`py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  modeView === 'canvas' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kanvas 3D
              </button>
              <button
                id="view-mode-jaring"
                onClick={() => setModeView('jaring')}
                className={`py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  modeView === 'jaring' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Jaring-Jaring
              </button>
              <button
                id="view-mode-geogebra"
                onClick={() => setModeView('geogebra')}
                className={`py-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  modeView === 'geogebra' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                GeoGebra
              </button>
            </div>

            {modeView === 'canvas' && (
              <>
                {/* Wireframe Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Mode Kerangka (Wireframe)
                  </span>
                  <input
                    type="checkbox"
                    checked={wireframe}
                    onChange={(e) => setWireframe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* Scale Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                    <span>Skala Ukuran (Zoom)</span>
                    <span className="font-mono text-blue-400">{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Canvas / Embed Display (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                {currentInfo.category}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {currentInfo.name}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {modeView === 'canvas' ? 'HTML5 3D WebGL Projection' : modeView === 'jaring' ? 'Diagram Jaring-Jaring 2D' : 'GeoGebra 3D Embed'}
            </span>
          </div>

          {/* Interactive Screen */}
          <div className="flex-1 flex items-center justify-center py-2">
            {modeView === 'canvas' ? (
              <Canvas3DViewer
                shape={selectedShape}
                wireframe={wireframe}
                unfoldProgress={0}
                scale={scale}
              />
            ) : modeView === 'jaring' ? (
              <JaringJaringViewer shape={selectedShape} />
            ) : (
              <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
                <iframe
                  title={`GeoGebra 3D ${currentInfo.name}`}
                  src={currentInfo.geogebraUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Shape Properties Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Jumlah Titik Sudut</span>
              <span className="text-sm font-extrabold text-blue-300">{currentInfo.vertices}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Jumlah Sisi</span>
              <span className="text-sm font-extrabold text-indigo-300">{currentInfo.faces}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5 text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Jumlah Rusuk</span>
              <span className="text-sm font-extrabold text-emerald-300">{currentInfo.edges}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
        <button
          onClick={() => setActiveSection('materi')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
        >
          ← Kembali ke Menu Materi
        </button>

        <button
          onClick={() => setActiveSection('kuis')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Kuis Interaktif</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
