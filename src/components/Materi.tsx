import React, { useState } from 'react';
import { MATERI_DATA } from '../data/materiData';
import { Shape3DType, NavSection } from '../types';
import { 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Box
} from 'lucide-react';

interface MateriProps {
  setActiveSection: (section: NavSection) => void;
}

export const Materi: React.FC<MateriProps> = ({ setActiveSection }) => {
  const [openAccordionId, setOpenAccordionId] = useState<string>('materi-1');

  // Interactive Calculator State inside Materi
  const [calcShape, setCalcShape] = useState<Shape3DType>('kubus');
  const [inputs, setInputs] = useState<Record<string, number>>({
    s: 6,
    p: 10,
    l: 6,
    t: 8,
    r: 7,
    s_pelukis: 25,
    alas_segitiga: 6,
    tinggi_segitiga: 8
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(prev => (prev === id ? '' : id));
  };

  const handleInputChange = (key: string, val: string) => {
    const num = parseFloat(val) || 0;
    setInputs(prev => ({ ...prev, [key]: num }));
  };

  // Compute live calculations
  const calculateResult = () => {
    const { s, p, l, t, r, s_pelukis, alas_segitiga, tinggi_segitiga } = inputs;

    switch (calcShape) {
      case 'kubus':
        return {
          luas: 6 * (s * s),
          volume: s * s * s,
          formulaLuas: `L = 6 × ${s}² = 6 × ${s * s} = ${6 * s * s} cm²`,
          formulaVol: `V = ${s}³ = ${s * s * s} cm³`
        };
      case 'balok':
        const lp = 2 * (p * l + p * t + l * t);
        const volB = p * l * t;
        return {
          luas: lp,
          volume: volB,
          formulaLuas: `L = 2 × (${p}×${l} + ${p}×${t} + ${l}×${t}) = ${lp} cm²`,
          formulaVol: `V = ${p} × ${l} × ${t} = ${volB} cm³`
        };
      case 'tabung':
        const pi = 22 / 7;
        const lpT = 2 * pi * r * (r + t);
        const volT = pi * (r * r) * t;
        return {
          luas: Math.round(lpT * 100) / 100,
          volume: Math.round(volT * 100) / 100,
          formulaLuas: `L = 2 × (22/7) × ${r} × (${r} + ${t}) = ${Math.round(lpT * 100) / 100} cm²`,
          formulaVol: `V = (22/7) × ${r}² × ${t} = ${Math.round(volT * 100) / 100} cm³`
        };
      case 'kerucut':
        const piK = 22 / 7;
        const actualS = s_pelukis || Math.sqrt(r * r + t * t);
        const lpK = piK * r * (r + actualS);
        const volK = (1 / 3) * piK * (r * r) * t;
        return {
          luas: Math.round(lpK * 100) / 100,
          volume: Math.round(volK * 100) / 100,
          formulaLuas: `L = (22/7) × ${r} × (${r} + ${Math.round(actualS * 10) / 10}) = ${Math.round(lpK * 100) / 100} cm²`,
          formulaVol: `V = 1/3 × (22/7) × ${r}² × ${t} = ${Math.round(volK * 100) / 100} cm³`
        };
      case 'bola':
        const piB = 22 / 7;
        const lpBola = 4 * piB * (r * r);
        const volBola = (4 / 3) * piB * Math.pow(r, 3);
        return {
          luas: Math.round(lpBola * 100) / 100,
          volume: Math.round(volBola * 100) / 100,
          formulaLuas: `L = 4 × (22/7) × ${r}² = ${Math.round(lpBola * 100) / 100} cm²`,
          formulaVol: `V = 4/3 × (22/7) × ${r}³ = ${Math.round(volBola * 100) / 100} cm³`
        };
      case 'prisma':
        const luasAlasP = 0.5 * alas_segitiga * tinggi_segitiga;
        const kelAlasP = alas_segitiga * 3; // asumsi segitiga sama sisi
        const lpPrisma = (2 * luasAlasP) + (kelAlasP * t);
        const volPrisma = luasAlasP * t;
        return {
          luas: Math.round(lpPrisma * 100) / 100,
          volume: Math.round(volPrisma * 100) / 100,
          formulaLuas: `L = (2 × ${luasAlasP}) + (${kelAlasP} × ${t}) = ${Math.round(lpPrisma * 100) / 100} cm²`,
          formulaVol: `V = ${luasAlasP} × ${t} = ${Math.round(volPrisma * 100) / 100} cm³`
        };
      case 'limas':
        const luasAlasL = s * s;
        const t_segitiga_tegak = Math.sqrt(Math.pow(s / 2, 2) + t * t);
        const lpLimas = luasAlasL + (4 * (0.5 * s * t_segitiga_tegak));
        const volLimas = (1 / 3) * luasAlasL * t;
        return {
          luas: Math.round(lpLimas * 100) / 100,
          volume: Math.round(volLimas * 100) / 100,
          formulaLuas: `L = ${luasAlasL} + (4 × 1/2 × ${s} × ${Math.round(t_segitiga_tegak * 10) / 10}) = ${Math.round(lpLimas * 100) / 100} cm²`,
          formulaVol: `V = 1/3 × ${luasAlasL} × ${t} = ${Math.round(volLimas * 100) / 100} cm³`
        };
      default:
        return { luas: 0, volume: 0, formulaLuas: '', formulaVol: '' };
    }
  };

  const calcRes = calculateResult();

  return (
    <section id="section-materi" className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Materi Kurikulum Lengkap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Accordion Materi Interaktif BAB 2: BANGUN RUANG
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Klik pada setiap judul accordion di bawah ini untuk melihat penjabaran materi, sifat-sifat, rumus lengkap, serta contoh penyelesaian soal secara lengkap.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {MATERI_DATA.map((item) => {
          const isOpen = openAccordionId === item.id;
          return (
            <div 
              key={item.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-xl ${
                isOpen 
                  ? 'bg-slate-900 border-blue-500/80 ring-2 ring-blue-500/20' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Accordion Header (Clickable) */}
              <button
                id={`accordion-header-${item.id}`}
                onClick={() => toggleAccordion(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 transition-colors ${
                    isOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-blue-400 border border-slate-700'
                  }`}>
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.category}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <h2 className={`text-base sm:text-xl font-extrabold transition-colors ${
                      isOpen ? 'text-blue-300' : 'text-white'
                    }`}>
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className={`p-2 rounded-xl bg-slate-800 text-slate-300 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-blue-900 text-blue-300' : ''
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-800/80 space-y-6 animate-fadeIn">
                  {/* Introduction Paragraph */}
                  <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/60 text-slate-200 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-blue-300 block mb-1">Penjelasan Konsep Utama:</strong>
                    {item.detailedContent.introduction}
                  </div>

                  {/* SVG Geometric Visual Diagram & Properties */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Drawing Card */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
                      <span className="text-xs font-semibold text-slate-400">Visualisasi 3D Sketch</span>
                      <div className="w-48 h-48 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center p-4 relative shadow-inner">
                        {/* Render geometric SVG based on shape */}
                        {item.shapeType === 'kubus' && (
                          <svg className="w-36 h-36 stroke-blue-400 fill-blue-500/10" viewBox="0 0 100 100">
                            <rect x="20" y="30" width="45" height="45" strokeWidth="2" />
                            <rect x="35" y="15" width="45" height="45" strokeWidth="2" strokeDasharray="3,3" />
                            <line x1="20" y1="30" x2="35" y2="15" strokeWidth="2" />
                            <line x1="65" y1="30" x2="80" y2="15" strokeWidth="2" />
                            <line x1="20" y1="75" x2="35" y2="60" strokeWidth="2" strokeDasharray="3,3" />
                            <line x1="65" y1="75" x2="80" y2="60" strokeWidth="2" />
                          </svg>
                        )}
                        {item.shapeType === 'balok' && (
                          <svg className="w-40 h-36 stroke-indigo-400 fill-indigo-500/10" viewBox="0 0 100 100">
                            <rect x="15" y="35" width="55" height="35" strokeWidth="2" />
                            <rect x="30" y="20" width="55" height="35" strokeWidth="2" strokeDasharray="3,3" />
                            <line x1="15" y1="35" x2="30" y2="20" strokeWidth="2" />
                            <line x1="70" y1="35" x2="85" y2="20" strokeWidth="2" />
                            <line x1="15" y1="70" x2="30" y2="55" strokeWidth="2" strokeDasharray="3,3" />
                            <line x1="70" y1="70" x2="85" y2="55" strokeWidth="2" />
                          </svg>
                        )}
                        {item.shapeType === 'limas' && (
                          <svg className="w-36 h-36 stroke-emerald-400 fill-emerald-500/10" viewBox="0 0 100 100">
                            <polygon points="50,15 20,70 80,70" strokeWidth="2" />
                            <line x1="50" y1="15" x2="50" y2="70" strokeWidth="2" strokeDasharray="3,3" />
                            <polygon points="50,15 20,70 50,85 80,70" strokeWidth="2" />
                          </svg>
                        )}
                        {item.shapeType === 'kerucut' && (
                          <svg className="w-36 h-36 stroke-amber-400 fill-amber-500/10" viewBox="0 0 100 100">
                            <polygon points="50,15 15,75 85,75" strokeWidth="2" />
                            <ellipse cx="50" cy="75" rx="35" ry="12" strokeWidth="2" />
                            <line x1="50" y1="15" x2="50" y2="75" strokeWidth="2" strokeDasharray="3,3" />
                          </svg>
                        )}
                        {item.shapeType === 'tabung' && (
                          <svg className="w-36 h-36 stroke-cyan-400 fill-cyan-500/10" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="25" rx="30" ry="10" strokeWidth="2" />
                            <ellipse cx="50" cy="75" rx="30" ry="10" strokeWidth="2" />
                            <line x1="20" y1="25" x2="20" y2="75" strokeWidth="2" />
                            <line x1="80" y1="25" x2="80" y2="75" strokeWidth="2" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Sketsa Konstruksi Geometri</span>
                    </div>

                    {/* Properties List */}
                    <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60 space-y-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Karakteristik & Sifat Utama</span>
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {item.detailedContent.properties.map((prop, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-400 font-bold">•</span>
                            <span>{prop}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Formulas List */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                      <span>Rumus-Rumus Penting</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.detailedContent.formulas.map((form, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                          <span className="text-xs font-semibold text-slate-400">{form.name}</span>
                          <div className="text-sm sm:text-base font-mono font-bold text-yellow-300 bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                            {form.formula}
                          </div>
                          <p className="text-[11px] text-slate-400 italic">{form.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example Problem Breakdown */}
                  <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Contoh Soal & Pembahasan Step-by-Step</span>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                      <strong>Soal:</strong> {item.detailedContent.exampleProblem.question}
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                      <span className="font-bold text-blue-300 text-xs uppercase tracking-wider block">Langkah Penyelesaian:</span>
                      {item.detailedContent.exampleProblem.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                          <span className="text-blue-400 font-bold font-mono">{sIdx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Jawaban Akhir: {item.detailedContent.exampleProblem.answer}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Formula Calculator Widget */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Kalkulator Bangun Ruang Interaktif</h2>
              <p className="text-xs text-slate-400">Masukkan nilai ukuran untuk mendapatkan hasil perhitungan luas & volume secara otomatis!</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={calcShape}
              onChange={(e) => setCalcShape(e.target.value as Shape3DType)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="kubus">Kubus</option>
              <option value="balok">Balok</option>
              <option value="prisma">Prisma Segitiga</option>
              <option value="limas">Limas Segiempat</option>
              <option value="tabung">Tabung</option>
              <option value="kerucut">Kerucut</option>
              <option value="bola">Bola</option>
            </select>
          </div>
        </div>

        {/* Input Controls according to shape */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(calcShape === 'kubus' || calcShape === 'limas') && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Panjang Rusuk / Sisi Alas (s) cm</label>
              <input
                type="number"
                value={inputs.s}
                onChange={(e) => handleInputChange('s', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {calcShape === 'balok' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Panjang (p) cm</label>
                <input
                  type="number"
                  value={inputs.p}
                  onChange={(e) => handleInputChange('p', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Lebar (l) cm</label>
                <input
                  type="number"
                  value={inputs.l}
                  onChange={(e) => handleInputChange('l', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {(calcShape === 'balok' || calcShape === 'tabung' || calcShape === 'kerucut' || calcShape === 'prisma' || calcShape === 'limas') && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tinggi (t) cm</label>
              <input
                type="number"
                value={inputs.t}
                onChange={(e) => handleInputChange('t', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {(calcShape === 'tabung' || calcShape === 'kerucut' || calcShape === 'bola') && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Jari-Jari (r) cm</label>
              <input
                type="number"
                value={inputs.r}
                onChange={(e) => handleInputChange('r', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {calcShape === 'prisma' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Alas Segitiga (cm)</label>
                <input
                  type="number"
                  value={inputs.alas_segitiga}
                  onChange={(e) => handleInputChange('alas_segitiga', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tinggi Segitiga (cm)</label>
                <input
                  type="number"
                  value={inputs.tinggi_segitiga}
                  onChange={(e) => handleInputChange('tinggi_segitiga', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Live Computation Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Luas Permukaan</span>
            <div className="text-2xl font-extrabold text-blue-400">
              {calcRes.luas} <span className="text-sm font-normal text-slate-400">cm²</span>
            </div>
            <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {calcRes.formulaLuas}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Volume</span>
            <div className="text-2xl font-extrabold text-indigo-400">
              {calcRes.volume} <span className="text-sm font-normal text-slate-400">cm³</span>
            </div>
            <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {calcRes.formulaVol}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
        <button
          onClick={() => setActiveSection('pendahuluan')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
        >
          ← Kembali ke Pendahuluan
        </button>

        <button
          onClick={() => setActiveSection('eksplorasi')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Eksplorasi 3D</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
