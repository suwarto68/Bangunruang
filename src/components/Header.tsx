import React, { useState } from 'react';
import { NavSection } from '../types';
import { 
  Home, 
  BookOpen, 
  Layers, 
  Box, 
  CheckSquare, 
  FileText, 
  Sparkles, 
  Menu, 
  X,
  GraduationCap,
  Calculator
} from 'lucide-react';

interface HeaderProps {
  activeSection: NavSection;
  setActiveSection: (section: NavSection) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavSection; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'pendahuluan', label: 'Pendahuluan', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'materi', label: 'Materi', icon: <Layers className="w-4 h-4" /> },
    { id: 'eksplorasi', label: 'Eksplorasi', icon: <Box className="w-4 h-4" /> },
    { id: 'kuis', label: 'Kuis', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'tugas', label: 'Tugas', icon: <FileText className="w-4 h-4" /> },
    { id: 'penutup', label: 'Penutup', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const handleNavClick = (section: NavSection) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner Info */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold tracking-wide">
            <GraduationCap className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span className="text-yellow-300 font-extrabold uppercase">BAB 2 : BANGUN RUANG</span>
            <span className="hidden md:inline text-blue-200">|</span>
            <span className="text-white font-medium">Kelas 9 Fase D MATEMATIKA</span>
          </div>
          <div className="flex items-center gap-2 text-blue-100 font-medium">
            <Calculator className="w-3.5 h-3.5 text-blue-300" />
            <span>Guru Pengampu: <strong className="text-white">Suwarto, S.Pd</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Box className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-blue-300 via-indigo-200 to-white bg-clip-text text-transparent">
                Media Interaktif 3D
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                Matematika SMP Negeri 1
              </div>
            </div>
          </button>

          {/* Desktop Navigation (Horizontal) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-rose-400" />
              ) : (
                <Menu className="w-6 h-6 text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in / Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 animate-fadeIn shadow-2xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Menu Navigasi Pembelajaran
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-blue-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
