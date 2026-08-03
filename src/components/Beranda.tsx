import React, { useState } from 'react';
import { Mood, MoodMessage, NavSection } from '../types';
import { 
  Sparkles, 
  Smile, 
  Meh, 
  Frown, 
  ArrowRight, 
  Lightbulb, 
  CheckCircle2, 
  Compass, 
  BookOpenCheck,
  Award
} from 'lucide-react';

interface BerandaProps {
  setActiveSection: (section: NavSection) => void;
}

export const Beranda: React.FC<BerandaProps> = ({ setActiveSection }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);

  const moodMessages: Record<Exclude<Mood, null>, MoodMessage> = {
    sedih: {
      emoji: '😢',
      title: 'Jangan Berkecil Hati! Matematika Itu Menyenangkan',
      message: 'Setiap kesulitan adalah peluang untuk berkembang. Dalam matematika, tidak ada langkah yang sia-sia; setiap rumus yang dipelajari membawa kita lebih dekat pada pemahaman.',
      quote: '"Kesuksesan bukan kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan. Jika Anda mencintai apa yang Anda lakukan, Anda akan sukses." — Albert Schweitzer',
      tip: 'Tips: Mulailah dari bagian Pendahuluan dan pelajari visualisasi 3D secara perlahan di menu Materi.'
    },
    biasa: {
      emoji: '😐',
      title: 'Mari Bangkitkan Semangat Belajarmu!',
      message: 'Hari biasa bisa menjadi hari yang luar biasa jika kamu menemukan hal menarik baru. Ayo jelajahi keajaiban bentuk 3D di sekitarmu!',
      quote: '"Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan Anda dapat mengubah dunia." — Nelson Mandela',
      tip: 'Tips: Coba buka menu Eksplorasi 3D dan putar bangun ruang interaktif untuk pengalaman belajar baru.'
    },
    senang: {
      emoji: '😊',
      title: 'Luar Biasa! Pertahankan Energi Positif Ini',
      message: 'Semangat tinggi adalah modal terbaik untuk menguasai konsep matematika! Mari gunakan energi positifmu untuk menyelesaikan kuis dan tantangan tugas.',
      quote: '"Kreativitas adalah kecerdasan yang bersenang-senang." — Albert Einstein',
      tip: 'Tips: Langsung uji kemampuanmu di menu Kuis Interaktif dan raih Sertifikat Pembelajaran dengan nilai sempurna!'
    }
  };

  return (
    <section id="section-beranda" className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 border border-slate-800 p-6 sm:p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Selamat Datang di Media Pembelajaran Digital</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            Selamat Datang di Portal Pembelajaran Interaktif BAB 2: BANGUN RUANG
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Halo peserta didik Kelas 9 Fase D yang hebat! Selamat datang dalam media pembelajaran interaktif Matematika yang dirancang khusus untuk membantu kamu memahami, mengklasifikasikan, serta menghitung luas permukaan dan volume Bangun Ruang Sisi Datar (Kubus, Balok, Prisma, Limas) dan Bangun Ruang Sisi Lengkung (Tabung, Kerucut, Bola) secara menyenangkan dan visual.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="start-learning-btn"
              onClick={() => setActiveSection('pendahuluan')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="explore-3d-btn"
              onClick={() => setActiveSection('eksplorasi')}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>Simulasi 3D Interaktif</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mood Selector Feature */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            <span>Fitur Refleksi Emosional Sederhana</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Bagaimana Perasaan & Mood-mu Hari Ini?
          </h2>
          <p className="text-slate-400 text-sm">
            Pilihlah mood yang paling menggambarkan perasaanmu saat ini untuk mendapatkan pesan motivasi dan tips belajar dari Pak Suwarto, S.Pd.
          </p>
        </div>

        {/* 3 Interactive Mood Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Sedih Button */}
          <button
            id="mood-btn-sedih"
            onClick={() => setSelectedMood('sedih')}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 group text-center ${
              selectedMood === 'sedih'
                ? 'bg-gradient-to-b from-rose-900/50 to-rose-950/80 border-rose-500 shadow-xl shadow-rose-900/40 -translate-y-2 ring-4 ring-rose-500/30'
                : 'bg-slate-800/80 border-slate-700 hover:border-rose-400 hover:bg-slate-800 hover:-translate-y-1'
            }`}
          >
            <div className={`p-4 rounded-full text-4xl transition-transform duration-300 ${
              selectedMood === 'sedih' ? 'scale-125 rotate-6 bg-rose-500/20' : 'group-hover:scale-110'
            }`}>
              😢
            </div>
            <div className="space-y-0.5">
              <span className={`font-extrabold text-base block ${
                selectedMood === 'sedih' ? 'text-rose-300' : 'text-slate-200'
              }`}>
                Sedih
              </span>
              <span className="text-xs text-slate-400">Kurang Bersemangat</span>
            </div>
          </button>

          {/* Biasa Saja Button */}
          <button
            id="mood-btn-biasa"
            onClick={() => setSelectedMood('biasa')}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 group text-center ${
              selectedMood === 'biasa'
                ? 'bg-gradient-to-b from-amber-900/50 to-amber-950/80 border-amber-500 shadow-xl shadow-amber-900/40 -translate-y-2 ring-4 ring-amber-500/30'
                : 'bg-slate-800/80 border-slate-700 hover:border-amber-400 hover:bg-slate-800 hover:-translate-y-1'
            }`}
          >
            <div className={`p-4 rounded-full text-4xl transition-transform duration-300 ${
              selectedMood === 'biasa' ? 'scale-125 bg-amber-500/20' : 'group-hover:scale-110'
            }`}>
              😐
            </div>
            <div className="space-y-0.5">
              <span className={`font-extrabold text-base block ${
                selectedMood === 'biasa' ? 'text-amber-300' : 'text-slate-200'
              }`}>
                Biasa Saja
              </span>
              <span className="text-xs text-slate-400">Netral / Santai</span>
            </div>
          </button>

          {/* Senang Button */}
          <button
            id="mood-btn-senang"
            onClick={() => setSelectedMood('senang')}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3 group text-center ${
              selectedMood === 'senang'
                ? 'bg-gradient-to-b from-emerald-900/50 to-emerald-950/80 border-emerald-500 shadow-xl shadow-emerald-900/40 -translate-y-2 ring-4 ring-emerald-500/30'
                : 'bg-slate-800/80 border-slate-700 hover:border-emerald-400 hover:bg-slate-800 hover:-translate-y-1'
            }`}
          >
            <div className={`p-4 rounded-full text-4xl transition-transform duration-300 ${
              selectedMood === 'senang' ? 'scale-125 -rotate-6 bg-emerald-500/20' : 'group-hover:scale-110'
            }`}>
              😊
            </div>
            <div className="space-y-0.5">
              <span className={`font-extrabold text-base block ${
                selectedMood === 'senang' ? 'text-emerald-300' : 'text-slate-200'
              }`}>
                Senang
              </span>
              <span className="text-xs text-slate-400">Penuh Antusias</span>
            </div>
          </button>
        </div>

        {/* Dynamic Motivational Message Display */}
        {selectedMood && (
          <div className="max-w-3xl mx-auto mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-700 shadow-2xl animate-fadeIn space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl p-2 bg-slate-900 rounded-xl border border-slate-700 shadow-md">
                {moodMessages[selectedMood].emoji}
              </span>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{moodMessages[selectedMood].title}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {moodMessages[selectedMood].message}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-yellow-400 italic text-yellow-200 text-xs sm:text-sm">
              {moodMessages[selectedMood].quote}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-950/60 p-3 rounded-xl border border-blue-900">
              <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>{moodMessages[selectedMood].tip}</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Access Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveSection('materi')}
          className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
            5 Sub-Materi Terstruktur
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Mulai dari klasifikasi jaring-jaring, luas permukaan, hingga volume bangun ruang sisi datar dan lengkung lengkap dengan contoh soal.
          </p>
        </div>

        <div 
          onClick={() => setActiveSection('eksplorasi')}
          className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            Simulasi 3D & Jaring-Jaring
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Putar, rotasi, ubah ukuran, dan bedah jaring-jaring 3D secara langsung melalui kanvas interaktif.
          </p>
        </div>

        <div 
          onClick={() => setActiveSection('kuis')}
          className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            Kuis & Sertifikat Otomatis
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Uji pemahamanmu, dapatkan skor instan, dan unduh Sertifikat Pembelajaran resmi tertanda Pak Suwarto, S.Pd.
          </p>
        </div>
      </div>
    </section>
  );
};
