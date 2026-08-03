import React, { useState } from 'react';
import { NavSection } from './types';
import { Header } from './components/Header';
import { Beranda } from './components/Beranda';
import { Pendahuluan } from './components/Pendahuluan';
import { Materi } from './components/Materi';
import { Eksplorasi } from './components/Eksplorasi';
import { Kuis } from './components/Kuis';
import { Tugas } from './components/Tugas';
import { Penutup } from './components/Penutup';
import { Box, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('beranda');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Header with Responsive Desktop & Mobile Hamburger Navbar */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'beranda' && (
          <Beranda setActiveSection={setActiveSection} />
        )}

        {activeSection === 'pendahuluan' && (
          <Pendahuluan setActiveSection={setActiveSection} />
        )}

        {activeSection === 'materi' && (
          <Materi setActiveSection={setActiveSection} />
        )}

        {activeSection === 'eksplorasi' && (
          <Eksplorasi setActiveSection={setActiveSection} />
        )}

        {activeSection === 'kuis' && (
          <Kuis setActiveSection={setActiveSection} />
        )}

        {activeSection === 'tugas' && (
          <Tugas setActiveSection={setActiveSection} />
        )}

        {activeSection === 'penutup' && (
          <Penutup setActiveSection={setActiveSection} />
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">
                Media Pembelajaran Interaktif BAB 2: BANGUN RUANG
              </div>
              <div className="text-xs text-slate-400">
                Matematika Kelas 9 Fase D • Suwarto, S.Pd
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <button 
              onClick={() => { setActiveSection('beranda'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveSection('materi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Materi
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveSection('eksplorasi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Eksplorasi 3D
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveSection('kuis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              Kuis & Sertifikat
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-center md:justify-end gap-1">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>untuk Pembelajaran Matematika SMP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
