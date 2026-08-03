import React from 'react';
import { Shape3DType } from '../types';

interface JaringJaringViewerProps {
  shape: Shape3DType;
}

export const JaringJaringViewer: React.FC<JaringJaringViewerProps> = ({ shape }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 p-4">
      {/* SVG Diagram Canvas */}
      <div className="w-full max-w-[480px] h-[320px] bg-slate-950 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center justify-center relative overflow-hidden p-4">
        
        {/* Kubus Net */}
        {shape === 'kubus' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* Net pattern: T-shape / Cross */}
            {/* Top (Tutup) */}
            <rect x="110" y="10" width="50" height="50" fill="#3b82f6" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="135" y="40" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Tutup</text>

            {/* Middle Row (Kiri, Alas, Kanan, Belakang) */}
            <rect x="50" y="70" width="50" height="50" fill="#2563eb" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="75" y="100" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Kiri</text>

            <rect x="110" y="70" width="50" height="50" fill="#60a5fa" fillOpacity="0.9" stroke="#ffffff" strokeWidth="3" />
            <text x="135" y="100" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ALAS</text>

            <rect x="170" y="70" width="50" height="50" fill="#1d4ed8" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="195" y="100" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Kanan</text>

            <rect x="230" y="70" width="50" height="50" fill="#93c5fd" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="255" y="100" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Belakang</text>

            {/* Bottom (Depan) */}
            <rect x="110" y="130" width="50" height="50" fill="#1e40af" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="135" y="160" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Depan</text>

            {/* Dimension Lines */}
            <line x1="110" y1="190" x2="160" y2="190" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="135" y="208" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">sisi (s)</text>
          </svg>
        )}

        {/* Balok Net */}
        {shape === 'balok' && (
          <svg className="w-full h-full max-w-[360px] max-h-[280px]" viewBox="0 0 320 240">
            {/* Top Tutup (p x l) */}
            <rect x="110" y="15" width="70" height="40" fill="#818cf8" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="145" y="40" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Tutup (p×l)</text>

            {/* Left (l x t) */}
            <rect x="60" y="60" width="45" height="70" fill="#6366f1" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="82.5" y="100" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Kiri (l×t)</text>

            {/* Middle ALAS (p x t) */}
            <rect x="110" y="60" width="70" height="70" fill="#4f46e5" fillOpacity="0.95" stroke="#ffffff" strokeWidth="3" />
            <text x="145" y="100" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">ALAS (p×t)</text>

            {/* Right (l x t) */}
            <rect x="185" y="60" width="45" height="70" fill="#6366f1" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="207.5" y="100" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Kanan (l×t)</text>

            {/* Back (p x t) */}
            <rect x="235" y="60" width="70" height="70" fill="#a5b4fc" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="270" y="100" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Belakang</text>

            {/* Bottom Depan (p x l) */}
            <rect x="110" y="135" width="70" height="40" fill="#3730a3" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="145" y="160" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Depan (p×l)</text>

            {/* Labels */}
            <text x="145" y="195" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Panjang (p)</text>
            <text x="35" y="100" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Tinggi (t)</text>
          </svg>
        )}

        {/* Prisma Segitiga Net */}
        {shape === 'prisma' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* Top Triangle Alas */}
            <polygon points="150,15 100,55 200,55" fill="#a855f7" fillOpacity="0.9" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="45" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Alas Segitiga</text>

            {/* 3 Rectangles (Selimut) */}
            <rect x="40" y="60" width="65" height="110" fill="#9333ea" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="72.5" y="120" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Sisi Tegak 1</text>

            <rect x="110" y="60" width="80" height="110" fill="#7e22ce" fillOpacity="0.95" stroke="#ffffff" strokeWidth="3" />
            <text x="150" y="120" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Sisi Tegak Utama</text>

            <rect x="195" y="60" width="65" height="110" fill="#c084fc" fillOpacity="0.8" stroke="#ffffff" strokeWidth="2" />
            <text x="227.5" y="120" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Sisi Tegak 2</text>

            {/* Bottom Triangle Tutup */}
            <polygon points="150,225 100,175 200,175" fill="#a855f7" fillOpacity="0.9" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="195" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Tutup Segitiga</text>
          </svg>
        )}

        {/* Limas Segiempat Net */}
        {shape === 'limas' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* Center Square Alas */}
            <rect x="110" y="80" width="80" height="80" fill="#059669" fillOpacity="0.95" stroke="#ffffff" strokeWidth="3" />
            <text x="150" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">ALAS PERSEGI</text>

            {/* Top Triangle */}
            <polygon points="150,15 110,80 190,80" fill="#10b981" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="60" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Segitiga 1</text>

            {/* Bottom Triangle */}
            <polygon points="150,225 110,160 190,160" fill="#047857" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="185" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Segitiga 3</text>

            {/* Left Triangle */}
            <polygon points="35,120 110,80 110,160" fill="#34d399" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="85" y="125" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Segitiga 4</text>

            {/* Right Triangle */}
            <polygon points="265,120 190,80 190,160" fill="#065f46" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2" />
            <text x="215" y="125" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Segitiga 2</text>
          </svg>
        )}

        {/* Tabung Net */}
        {shape === 'tabung' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* Top Circle */}
            <circle cx="150" cy="40" r="30" fill="#22d3ee" fillOpacity="0.9" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="44" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Tutup (πr²)</text>

            {/* Middle Main Rectangle (Selimut Tabung) */}
            <rect x="50" y="75" width="200" height="90" fill="#0891b2" fillOpacity="0.85" stroke="#ffffff" strokeWidth="3" />
            <text x="150" y="115" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Selimut Tabung (Persegi Panjang)</text>
            <text x="150" y="135" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">Panjang = Keliling Lingkaran (2πr) | Lebar = Tinggi (t)</text>

            {/* Bottom Circle */}
            <circle cx="150" cy="200" r="30" fill="#155e75" fillOpacity="0.9" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="204" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Alas (πr²)</text>
          </svg>
        )}

        {/* Kerucut Net */}
        {shape === 'kerucut' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* Sector / Juring Kerucut */}
            <path d="M 150,30 L 70,140 A 110,110 0 0,0 230,140 Z" fill="#f59e0b" fillOpacity="0.85" stroke="#ffffff" strokeWidth="3" />
            <text x="150" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Selimut Kerucut</text>
            <text x="150" y="110" fill="#fef08a" fontSize="10" fontStyle="italic" textAnchor="middle">(Juring Lingkaran Jari-jari s)</text>

            {/* Base Circle */}
            <circle cx="150" cy="180" r="32" fill="#d97706" fillOpacity="0.95" stroke="#ffffff" strokeWidth="2" />
            <text x="150" y="184" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Alas (πr²)</text>

            <text x="75" y="80" fill="#fbbf24" fontSize="10" fontWeight="bold">s (garis pelukis)</text>
          </svg>
        )}

        {/* Bola Net (Gore Map Projection / Proyeksi Jaring-Jaring Tembereng) */}
        {shape === 'bola' && (
          <svg className="w-full h-full max-w-[340px] max-h-[280px]" viewBox="0 0 300 240">
            {/* 6 Leaf/Gore strips representing unfolded sphere */}
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const cx = 45 + idx * 42;
              return (
                <path
                  key={idx}
                  d={`M ${cx},30 Q ${cx + 18},120 ${cx},210 Q ${cx - 18},120 ${cx},30 Z`}
                  fill={idx % 2 === 0 ? '#f43f5e' : '#e11d48'}
                  fillOpacity="0.85"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              );
            })}
            <rect x="30" y="115" width="240" height="10" fill="#fda4af" fillOpacity="0.4" stroke="#ffffff" strokeDasharray="3,3" />
            <text x="150" y="123" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Garis Khatulistiwa (2πr)</text>
            <text x="150" y="232" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">Jaring-Jaring Bola (Proyeksi 12 Gore / Tembereng Lengkung)</text>
          </svg>
        )}
      </div>

      {/* Description & Component Breakdown */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
        <h4 className="font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Analisis Struktur Jaring-Jaring {shape.toUpperCase()}</span>
        </h4>
        <p className="text-slate-300 leading-relaxed">
          {shape === 'kubus' && 'Terdiri dari 6 buah bidang persegi identik (kongruen). Memiliki 11 pola jaring-jaring yang valid. Setiap pasang sisi yang berhadapan memiliki warna dan ukuran sama.'}
          {shape === 'balok' && 'Terdiri dari 6 buah persegi panjang (3 pasang sisi kongruen dan sejajar): Pasang Alas-Tutup (p×l), Pasang Kiri-Kanan (l×t), dan Pasang Depan-Belakang (p×t).'}
          {shape === 'prisma' && 'Terdiri dari 2 bidang alas & tutup segitiga yang identik (kongruen) serta 3 bidang selimut berbentuk persegi panjang.'}
          {shape === 'limas' && 'Terdiri dari 1 bidang alas (segiempat/persegi) dan 4 bidang selimut berbentuk segitiga yang bertemu pada satu titik puncak.'}
          {shape === 'tabung' && 'Terdiri dari 2 lingkaran identik (Alas & Tutup) dengan jari-jari r, serta 1 selimut persegi panjang berukuran panjang = 2πr (keliling alas) dan lebar = t (tinggi tabung).'}
          {shape === 'kerucut' && 'Terdiri dari 1 alas lingkaran ber-jari-jari r dan 1 selimut berbentuk juring lingkaran dengan jari-jari s (garis pelukis) dan panjang busur = 2πr.'}
          {shape === 'bola' && 'Secara matematis, bola tidak dapat digelar menjadi 2D datar tanpa distorsi (Teorema Gauss). Namun, jaring-jaring idealnya digambarkan sebagai kumpulan 12 tembereng lengkung (Gore projection) yang digabung sepanjang garis khatulistiwa.'}
        </p>
      </div>
    </div>
  );
};
