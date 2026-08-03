import React, { useState } from 'react';
import { NavSection } from '../types';
import { 
  Target, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb,
  Box,
  Layers,
  Sparkles,
  BookOpenCheck
} from 'lucide-react';

interface PendahuluanProps {
  setActiveSection: (section: NavSection) => void;
}

export const Pendahuluan: React.FC<PendahuluanProps> = ({ setActiveSection }) => {
  const [selectedMatch, setSelectedMatch] = useState<Record<string, string>>({});
  const [showCheckResult, setShowCheckResult] = useState(false);

  const learningObjectives = [
    {
      num: '01',
      title: 'Klasifikasi & Jaring-Jaring',
      desc: 'Peserta didik mampu mengklasifikasikan berbagai jenis bangun ruang (sisi datar dan sisi lengkung) dan membuat/menganalisis jaring-jaringnya.'
    },
    {
      num: '02',
      title: 'Luas Permukaan Sisi Datar',
      desc: 'Peserta didik mampu menentukan luas permukaan bangun ruang sisi datar (kubus, balok, prisma, dan limas) dalam berbagai satuan.'
    },
    {
      num: '03',
      title: 'Volume Sisi Datar',
      desc: 'Peserta didik mampu menentukan volume bangun ruang sisi datar (kubus, balok, prisma, dan limas) menggunakan rumus baku.'
    },
    {
      num: '04',
      title: 'Luas Permukaan Sisi Lengkung',
      desc: 'Peserta didik mampu menentukan luas permukaan bangun ruang sisi lengkung (tabung, kerucut, dan bola).'
    },
    {
      num: '05',
      title: 'Volume Sisi Lengkung & Aplikasi Kontekstual',
      desc: 'Peserta didik mampu menentukan volume bangun ruang sisi lengkung (tabung, kerucut, dan bola) serta memecahkan masalah kontekstual kehidupan sehari-hari.'
    }
  ];

  const diagnosticItems = [
    { id: 'item-1', name: 'Dadu & Kaaba', correct: 'Kubus' },
    { id: 'item-2', name: 'Kotak Sepatu & Lemari', correct: 'Balok' },
    { id: 'item-3', name: 'Piramida Mesir', correct: 'Limas' },
    { id: 'item-4', name: 'Atap Rumah Segitiga', correct: 'Prisma' },
    { id: 'item-5', name: 'Kaleng Susu & Tangki Air', correct: 'Tabung' },
    { id: 'item-6', name: 'Topi Ulang Tahun & Cone Es Krim', correct: 'Kerucut' },
    { id: 'item-7', name: 'Bola Sepak & Kelereng', correct: 'Bola' },
  ];

  const shapeOptions = ['Kubus', 'Balok', 'Prisma', 'Limas', 'Tabung', 'Kerucut', 'Bola'];

  const handleSelectShape = (itemId: string, shape: string) => {
    setSelectedMatch(prev => ({ ...prev, [itemId]: shape }));
  };

  const calculateScore = () => {
    let count = 0;
    diagnosticItems.forEach(item => {
      if (selectedMatch[item.id] === item.correct) {
        count++;
      }
    });
    return count;
  };

  return (
    <section id="section-pendahuluan" className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
          <BookOpenCheck className="w-4 h-4 text-blue-400" />
          <span>Pengantar Modul Pembelajaran</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pendahuluan: Memahami Bangun Ruang
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Sebelum kita melangkah ke rumus dan perhitungan, mari pahami latar belakang, apersepsi kontekstual, dan tujuan pembelajaran yang akan dicapai pada BAB 2 ini.
        </p>
      </div>

      {/* Paragraf Apersepsi */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Paragraf Apersepsi (Pemantik Belajar)</h2>
            <p className="text-xs text-slate-400">Mengapa kita perlu mempelajari Bangun Ruang?</p>
          </div>
        </div>

        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 text-slate-200 text-sm sm:text-base leading-relaxed space-y-3">
          <p>
            Pernahkah kamu memperhatikan benda-benda di sekitarmu? Ketika kamu meminum susu dari kemasan kotak balok, melihat kemegahan atap bangunan berbentuk prisma, menikmati es krim berwadah kerucut, hingga menendang bola di lapangan sepak bola—semua benda tersebut adalah bentuk nyata dari <strong>Bangun Ruang (Geometri 3 Dimensi)</strong>. Dalam arsitektur, teknik sipil, industri kemasan, hingga tata ruang kota, pemahaman mendalam tentang luas permukaan dan volume sangat menentukan efisiensi biaya bahan dan kapasitas ruang penampung. Dengan menguasai BAB 2 ini, kamu tidak hanya belajar berhitung angka, melainkan mengasah kemampuan logis dalam memecahkan masalah praktis kehidupan sehari-hari!
          </p>
        </div>
      </div>

      {/* Tujuan Pembelajaran */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Tujuan Pembelajaran (Capaian Pembelajaran)</h2>
              <p className="text-xs text-slate-400">Target Kurikulum Merdeka Matematika Kelas 9 Fase D</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-700">
            5 Indikator Utama
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningObjectives.map((obj) => (
            <div 
              key={obj.num}
              className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/50 hover:bg-slate-800 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {obj.num}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-80" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {obj.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Apersepsi Quiz Check */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Uji Pengenalan Awal Benda Sekitar</h2>
            <p className="text-xs text-slate-400">Jodohkan benda nyata dengan bentuk bangun ruang yang sesuai!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnosticItems.map((item) => {
            const userChoice = selectedMatch[item.id] || '';
            const isCorrect = userChoice === item.correct;
            return (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{item.name}</span>
                  {showCheckResult && userChoice && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {isCorrect ? '✓ Benar' : `✗ (${item.correct})`}
                    </span>
                  )}
                </div>

                <select
                  value={userChoice}
                  onChange={(e) => handleSelectShape(item.id, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Bangun Ruang --</option>
                  {shapeOptions.map((shape) => (
                    <option key={shape} value={shape}>{shape}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <button
            id="check-diagnostic-btn"
            onClick={() => setShowCheckResult(true)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Cek Jawaban Awal
          </button>

          {showCheckResult && (
            <div className="text-sm font-bold text-blue-300 bg-blue-950 px-4 py-2 rounded-xl border border-blue-800">
              Skor Pengenalan Awal: {calculateScore()} dari {diagnosticItems.length} Benar!
            </div>
          )}

          <button
            id="go-to-materi-btn"
            onClick={() => setActiveSection('materi')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer ml-auto"
          >
            <span>Lanjut ke Menu Materi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
