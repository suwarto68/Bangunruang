import React, { useState } from 'react';
import { NavSection } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  Heart, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface PenutupProps {
  setActiveSection: (section: NavSection) => void;
}

export const Penutup: React.FC<PenutupProps> = ({ setActiveSection }) => {
  const [reflectionRating, setReflectionRating] = useState<number>(5);
  const [understoodTopic, setUnderstoodTopic] = useState<string>('');
  const [needPracticeTopic, setNeedPracticeTopic] = useState<string>('');
  const [messageToTeacher, setMessageToTeacher] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showEmbedForm, setShowEmbedForm] = useState<boolean>(false);

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="section-penutup" className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Rangkuman & Refleksi Pembelajaran</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Penutup Modul BAB 2: BANGUN RUANG
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Selamat! Kamu telah menyelesaikan rangkaian pembelajaran media interaktif pada BAB 2 Bangun Ruang. Mari simak rangkuman materi dan lakukan refleksi pembelajaran.
        </p>
      </div>

      {/* Paragraf Rangkuman Materi */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rangkuman Materi Keseluruhan</h2>
            <p className="text-xs text-slate-400">Ikhtisar Konsep Utama BAB 2 Bangun Ruang</p>
          </div>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 text-slate-200 text-sm sm:text-base leading-relaxed">
          <strong>Rangkuman Singkat:</strong> Bangun ruang terbagi menjadi dua kelompok besar, yaitu Bangun Ruang Sisi Datar (BRSD: Kubus, Balok, Prisma, Limas) yang seluruh sisinya berupa bidang datar, dan Bangun Ruang Sisi Lengkung (BRSL: Tabung, Kerucut, Bola) yang memiliki sekurang-kurangnya satu bidang lengkung. Menghitung luas permukaan pada dasarnya adalah menjumlahkan seluruh luas bidang pembentuk jaring-jaringnya, sedangkan volume mengukur kapasitas isi ruang di dalamnya. Untuk prisma dan tabung, volume dihitung dari hasil kali luas alas dengan tinggi (V = Luas Alas × tinggi), sementara untuk limas dan kerucut yang meruncing pada satu puncak, volumenya adalah sepertiga dari bangun penampungnya (V = 1/3 × Luas Alas × tinggi), dan bola memiliki volume khusus V = 4/3 π r³. Pemahaman konsep ini sangat krusial dalam menyelesaikan masalah kontekstual kehidupan nyata seperti perhitungan bahan kemasan, kapasitas wadah air, hingga konstruksi arsitektur.
        </div>
      </div>

      {/* Refleksi Pembelajaran Section */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Refleksi Pembelajaran Siswa</h2>
              <p className="text-xs text-slate-400">Isi refleksi diri untuk membantu evaluasi pengalaman belajarmu</p>
            </div>
          </div>

          <button
            id="toggle-google-form-btn"
            onClick={() => setShowEmbedForm(!showEmbedForm)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-indigo-400" />
            <span>{showEmbedForm ? 'Tampilkan Form Refleksi Langsung' : 'Embed Google Form Refleksi'}</span>
          </button>
        </div>

        {showEmbedForm ? (
          /* Embed Google Form Option */
          <div className="space-y-4 animate-fadeIn">
            <div className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>Formulir Refleksi Online Google Form</span>
              <span className="text-indigo-400 font-bold">Google Forms Embed</span>
            </div>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                title="Google Form Refleksi Pembelajaran"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfD_RefleksiBangunRuang/viewform?embedded=true"
                className="w-full h-full border-0"
              >
                Memuat Google Form...
              </iframe>
            </div>
          </div>
        ) : (
          /* Interactive Direct Reflection Form */
          <form onSubmit={handleSubmitReflection} className="space-y-6 max-w-2xl">
            {/* Rating Stars */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase block">
                Berapa bintang tingkat pemahamanmu pada materi Bangun Ruang ini?
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReflectionRating(star)}
                    className={`text-2xl p-2 rounded-xl transition-all cursor-pointer ${
                      star <= reflectionRating ? 'bg-yellow-500/20 text-yellow-300 scale-110' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-bold text-yellow-300 ml-2">{reflectionRating} dari 5 Bintang</span>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">
                  Bagian materi mana yang paling kamu pahami dengan baik?
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Menghitung volume kubus & balok"
                  value={understoodTopic}
                  onChange={(e) => setUnderstoodTopic(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">
                  Bagian materi mana yang masih membutuhkan lebih banyak latihan?
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Menghitung luas permukaan kerucut & bola"
                  value={needPracticeTopic}
                  onChange={(e) => setNeedPracticeTopic(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">
                  Pesan atau Kesan untuk Pak Suwarto, S.Pd
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan masukan atau pesan kesanmu tentang media ini..."
                  value={messageToTeacher}
                  onChange={(e) => setMessageToTeacher(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Refleksi Pembelajaran</span>
            </button>

            {isSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold animate-fadeIn">
                ✓ Terima kasih atas refleksi yang kamu berikan! Tanggapanmu sangat berharga untuk pengembangan modul pembelajaran berikutnya.
              </div>
            )}
          </form>
        )}
      </div>

      {/* Closing Teacher Card */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl border border-slate-800 p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Suwarto, S.Pd</h3>
            <p className="text-xs text-blue-300 font-semibold">Guru Pengampu Matematika Kelas 9 Fase D</p>
            <p className="text-xs text-slate-400 mt-1">"Tetaplah bersemangat menjelajahi indahnya dunia matematika!"</p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveSection('beranda');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </section>
  );
};
