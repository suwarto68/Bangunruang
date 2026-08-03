import React, { useState } from 'react';
import { TaskItem, NavSection } from '../types';
import { 
  FileText, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  RefreshCw, 
  Send, 
  HelpCircle,
  ArrowRight,
  BookOpen,
  Lock,
  Unlock,
  KeyRound,
  X
} from 'lucide-react';

interface TugasProps {
  setActiveSection: (section: NavSection) => void;
}

export const Tugas: React.FC<TugasProps> = ({ setActiveSection }) => {
  const [topic, setTopic] = useState<'Sisi Datar' | 'Sisi Lengkung' | 'Kontekstual'>('Sisi Datar');
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Tantangan/HOTS'>('Sedang');
  const [taskData, setTaskData] = useState<TaskItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [studentResponse, setStudentResponse] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Password protection state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const fetchAITask = async (reqTopic = topic, reqDiff = difficulty) => {
    setIsLoading(true);
    setShowHint(false);
    setShowSolution(false);
    setIsAnswerSubmitted(false);
    setStudentResponse('');

    try {
      const res = await fetch('/api/generate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: reqTopic, difficulty: reqDiff })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTaskData(json.data);
      }
    } catch (err) {
      console.error('Error fetching task:', err);
      // Fallback local task if network fails
      setTaskData({
        title: `Tugas Kontekstual: Bangun Ruang ${reqTopic} (${reqDiff})`,
        problem: `Ahmad sedang membuat kerajinan tangan berbentuk ${reqTopic === 'Sisi Lengkung' ? 'tabung dengan diameter 14 cm dan tinggi 20 cm' : 'balok berukuran 20 cm × 15 cm × 10 cm'}. Jika ia ingin melapisi seluruh permukaan kerajinan tersebut dengan kain flanel, berapa cm² luas kain flanel minimal yang dibutuhkan? (Gunakan $\\pi = 22/7$).`,
        hint: `Gunakan rumus luas permukaan ${reqTopic === 'Sisi Lengkung' ? 'Tabung ($L = 2\\pi r(r+t)$)' : 'Balok ($L = 2(pl + pt + lt)$)'}.`,
        solution: `1. Diketahui:\n   - ${reqTopic === 'Sisi Lengkung' ? 'Jari-jari (r) = 7 cm, Tinggi (t) = 20 cm' : 'p = 20, l = 15, t = 10'}\n2. Perhitungan Luas Permukaan:\n   ${reqTopic === 'Sisi Lengkung' ? 'L = 2 × (22/7) × 7 × (7 + 20) = 44 × 27 = 1.188 cm²' : 'L = 2 × (20×15 + 20×10 + 15×10) = 2 × (300 + 200 + 150) = 1.300 cm²'}.`,
        answer: `Luas kain flanel minimal yang dibutuhkan adalah ${reqTopic === 'Sisi Lengkung' ? '1.188 cm²' : '1.300 cm²'}.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicChange = (newTopic: 'Sisi Datar' | 'Sisi Lengkung' | 'Kontekstual') => {
    setTopic(newTopic);
    fetchAITask(newTopic, difficulty);
  };

  const handleDifficultyChange = (newDiff: 'Mudah' | 'Sedang' | 'Tantangan/HOTS') => {
    setDifficulty(newDiff);
    fetchAITask(topic, newDiff);
  };

  const handleToggleSolution = () => {
    if (showSolution) {
      setShowSolution(false);
    } else {
      if (isUnlocked) {
        setShowSolution(true);
      } else {
        setPasswordInput('');
        setPasswordError('');
        setShowPasswordModal(true);
      }
    }
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'suwarto') {
      setIsUnlocked(true);
      setShowSolution(true);
      setShowPasswordModal(false);
      setPasswordError('');
    } else {
      setPasswordError('Kata sandi salah! Masukkan kata sandi yang benar untuk membuka pembahasan.');
    }
  };

  // Initial load if null
  React.useEffect(() => {
    if (!taskData) {
      fetchAITask();
    }
  }, []);

  return (
    <section id="section-tugas" className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Fitur Tugas Otomatis Berbasis AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tugas & Latihan Soal Interaktif AI
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Tugas pada modul ini dihasilkan secara otomatis oleh Artificial Intelligence (AI) berdasarkan materi Bangun Ruang. Kamu dapat menghasilkan soal cerita baru secara tak terbatas!
        </p>
      </div>

      {/* AI Task Generator Generator Controls */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Generator Tugas Otomatis AI</h2>
              <p className="text-xs text-slate-400">Pilih topik dan tingkat kesulitan untuk membuat tugas baru</p>
            </div>
          </div>

          <button
            id="generate-ai-task-btn"
            onClick={() => fetchAITask(topic, difficulty)}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Membuat Tugas...' : 'Buat Tugas AI Baru'}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Topik Bangun Ruang</label>
            <select
              value={topic}
              onChange={(e) => handleTopicChange(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="Sisi Datar">Bangun Ruang Sisi Datar (Kubus, Balok, Prisma, Limas)</option>
              <option value="Sisi Lengkung">Bangun Ruang Sisi Lengkung (Tabung, Kerucut, Bola)</option>
              <option value="Kontekstual">Masalah Kontekstual Campuran (HOTS)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Tingkat Kesulitan</label>
            <select
              value={difficulty}
              onChange={(e) => handleDifficultyChange(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="Mudah">Mudah (Pemahaman Konsep)</option>
              <option value="Sedang">Sedang (Aplikasi Rumus)</option>
              <option value="Tantangan/HOTS">Tantangan / HOTS (Analisis Kontekstual)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Content Card */}
      {taskData && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {topic} • {difficulty}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                {taskData.title}
              </h2>
            </div>
            <FileText className="w-8 h-8 text-purple-400" />
          </div>

          {/* Problem Box */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <strong className="text-purple-300 text-xs uppercase tracking-wider block">Deskripsi Soal Tugas:</strong>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {taskData.problem}
            </p>
          </div>

          {/* Interactive Hint Toggle */}
          <div className="space-y-3">
            <button
              id="toggle-ai-hint-btn"
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-yellow-300 font-bold text-xs flex items-center gap-2 border border-slate-700 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span>{showHint ? 'Sembunyikan Petunjuk AI' : 'Buka Petunjuk (Hint) AI'}</span>
            </button>

            {showHint && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs leading-relaxed animate-fadeIn">
                <strong>💡 Petunjuk Pengerjaan AI:</strong> {taskData.hint}
              </div>
            )}
          </div>

          {/* Student Interactive Answer Box */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-slate-300 uppercase block">Lembar Jawaban Siswa</label>
            <textarea
              rows={4}
              placeholder="Tuliskan langkah-langkah perhitungan dan jawaban akhirmu di sini..."
              value={studentResponse}
              onChange={(e) => setStudentResponse(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <button
                id="submit-student-answer-btn"
                onClick={() => setIsAnswerSubmitted(true)}
                disabled={!studentResponse.trim()}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs shadow flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Jawaban Tugas</span>
              </button>

              <button
                id="toggle-ai-solution-btn"
                onClick={handleToggleSolution}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                {!isUnlocked ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                )}
                <span>{showSolution ? 'Sembunyikan Pembahasan AI' : 'Lihat Kunci Pembahasan AI'}</span>
              </button>
            </div>

            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold animate-fadeIn">
                ✓ Jawaban tugasmu telah tersimpan! Kamu dapat mencocokkan langkahmu dengan Kunci Pembahasan AI di bawah.
              </div>
            )}
          </div>

          {/* AI Solution Box */}
          {showSolution && (
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Kunci Pembahasan Langkah-demi-Langkah (AI Solution)</span>
              </div>

              <div className="whitespace-pre-line text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-900 p-4 rounded-xl border border-slate-800">
                {taskData.solution}
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800 text-indigo-300 text-xs sm:text-sm font-bold">
                🎯 Jawaban Akhir: {taskData.answer}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Akses Pembahasan Terkunci</h3>
                <p className="text-xs text-slate-400">Masukkan kata sandi guru untuk membuka kunci pembahasan</p>
              </div>
            </div>

            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase block">Kata Sandi (Password)</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Masukkan kata sandi..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    autoFocus
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {passwordError && (
                  <p className="text-xs text-rose-400 font-semibold animate-fadeIn">
                    ⚠️ {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Buka Pembahasan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
        <button
          onClick={() => setActiveSection('kuis')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
        >
          ← Kembali ke Kuis
        </button>

        <button
          onClick={() => setActiveSection('penutup')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Penutup & Refleksi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
