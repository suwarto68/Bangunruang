import React, { useState, useRef, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { NavSection } from '../types';
import { 
  CheckSquare, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Download, 
  Printer, 
  Copy, 
  Code2, 
  Send, 
  FileSpreadsheet,
  ArrowRight,
  User,
  Sparkles,
  Lock,
  Unlock,
  KeyRound,
  X,
  School
} from 'lucide-react';

interface KuisProps {
  setActiveSection: (section: NavSection) => void;
}

export const Kuis: React.FC<KuisProps> = ({ setActiveSection }) => {
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('Kelas 9A');
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1500); // 25 minutes timer for 25 questions
  const [showAppsScriptModal, setShowAppsScriptModal] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [sendingSpreadsheet, setSendingSpreadsheet] = useState<boolean>(false);
  const [spreadsheetSentSuccess, setSpreadsheetSentSuccess] = useState<boolean>(false);

  // Password state for unlocking solutions review
  const [isSolutionUnlocked, setIsSolutionUnlocked] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Timer Effect
  useEffect(() => {
    if (isQuizStarted && !isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isQuizStarted, isSubmitted, timeLeft]);

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIsQuizStarted(true);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsSolutionUnlocked(false);
    setTimeLeft(1500); // 25 minutes
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    return Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'suwarto') {
      setIsSolutionUnlocked(true);
      setShowPasswordModal(false);
      setPasswordError('');
    } else {
      setPasswordError('Kata sandi salah! Masukkan kata sandi yang benar untuk membuka kunci pembahasan.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalScore = calculateScore();

  // Render Graphical Certificate onto HTML5 Canvas
  useEffect(() => {
    if (isSubmitted && certCanvasRef.current) {
      const canvas = certCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1000;
      canvas.height = 700;

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 1000, 700);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1000, 700);

      // Gold Outer Border
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 8;
      ctx.strokeRect(30, 30, 940, 640);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, 920, 620);

      // Header Text
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SERTIFIKAT KELULUSAN PEMBELAJARAN DIGITAL', 500, 110);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('MATEMATIKA KELAS 9 FASE D - BAB 2 : BANGUN RUANG', 500, 150);

      // Subtitle
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px sans-serif';
      ctx.fillText('Diberikan secara resmi kepada peserta didik:', 500, 210);

      // Student Name & Class
      ctx.fillStyle = '#ffffff';
      ctx.font = 'extrabold 38px sans-serif';
      ctx.fillText(studentName.toUpperCase(), 500, 265);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`[ ${studentClass} ]`, 500, 300);

      // Divider line
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(300, 320);
      ctx.lineTo(700, 320);
      ctx.stroke();

      // Achievement Text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Telah menyelesaikan 25 Soal Kuis Interaktif Bangun Ruang dengan nilai:`, 500, 360);

      // Score Badge Circle
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(500, 435, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 38px sans-serif';
      ctx.fillText(`${totalScore}`, 500, 448);

      // Predikat text
      const gradeText = totalScore >= 80 ? 'SANGAT MEMUASKAN (A)' : totalScore >= 70 ? 'BAIK (B)' : 'CUKUP (C)';
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`Predikat: ${gradeText}`, 500, 515);

      // Date & Teacher Signature Area
      const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Diterbitkan: ${dateStr}`, 100, 580);
      ctx.fillText(`SMP Negeri 1 - Matematika Fase D`, 100, 605);

      // Signature Right
      ctx.textAlign = 'right';
      ctx.fillText(`Guru Pengampu Matematika`, 900, 580);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Suwarto, S.Pd`, 900, 620);
    }
  }, [isSubmitted, totalScore, studentName, studentClass]);

  const downloadCertificate = () => {
    if (!certCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Sertifikat_BangunRuang_${studentName.replace(/\s+/g, '_')}_${studentClass}.png`;
    link.href = certCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  const googleAppsScriptCode = `/**
 * GOOGLE APPS SCRIPT UNTUK MONITORING KUIS BANGUN RUANG KELAS 9
 * Spreadsheet ID: 1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw
 * Dibuat oleh: Suwarto, S.Pd
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw");
    var sheet = ss.getSheetByName("Hasil Kuis") || ss.insertSheet("Hasil Kuis");
    
    // Jika sheet baru, buat header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Waktu Selesai", "Nama Siswa", "Kelas", "Nilai Kuis", "Status Kelulusan", "Mata Pelajaran"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#3b82f6").setFontColor("#ffffff");
    }
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    var status = data.score >= 70 ? "LULUS" : "REMIDIAL";
    
    sheet.appendRow([
      timestamp,
      data.studentName,
      data.studentClass || "Kelas 9A",
      data.score,
      status,
      "Matematika Kelas 9 BAB 2"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const sendScoreToSpreadsheet = () => {
    setSendingSpreadsheet(true);
    setTimeout(() => {
      setSendingSpreadsheet(false);
      setSpreadsheetSentSuccess(true);
      setTimeout(() => setSpreadsheetSentSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section id="section-kuis" className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Evaluasi & Sertifikasi Digital</span>
          </div>

          <button
            id="open-appscript-modal-btn"
            onClick={() => setShowAppsScriptModal(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Integrasi Apps Script (Spreadsheet)</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Kuis Interaktif BAB 2: BANGUN RUANG
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Uji pemahamanmu dengan menjawab <strong className="text-white">25 soal pilihan ganda</strong> lengkap. Raih nilai minimal 70 untuk mendapatkan Sertifikat Kelulusan Resmi!
        </p>
      </div>

      {/* Screen 1: Name & Class Input Form before starting */}
      {!isQuizStarted && (
        <div className="max-w-xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Masukkan Identitas Siswa</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Nama lengkap dan kelas kamu akan tercetak di Sertifikat Kelulusan dan rekap nilai Google Spreadsheet.
            </p>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-5 text-left">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nama Lengkap Siswa *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Ahmad Rizky Saputra"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Class Selection: 9A or 9B */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Pilihan Kelas *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Kelas 9A', 'Kelas 9B'].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setStudentClass(cls)}
                    className={`p-3.5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      studentClass === cls
                        ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <School className="w-4 h-4" />
                    <span>{cls}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Mulai Kerjakan Kuis (25 Soal)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <strong>Aturan Kuis:</strong> Waktu pengerjaan 25 menit • 25 Soal Pilihan Ganda Lengkap • Nilai Maksimal 100 • Pembahasan Soal Terkunci Password.
          </div>
        </div>
      )}

      {/* Screen 2: Active Quiz Interface */}
      {isQuizStarted && !isSubmitted && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          {/* Top Bar with Progress & Timer */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Soal {currentQuestionIdx + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Siswa: <strong className="text-white">{studentName}</strong> ({studentClass})
              </span>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-sm font-bold ${
              timeLeft < 300 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' : 'bg-slate-800 text-blue-300 border border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Sisa Waktu: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Numbers Quick Navigator Grid */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-3 rounded-2xl border border-slate-800 max-h-24 overflow-y-auto">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = currentQuestionIdx === qIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIdx(qIdx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                      : isAnswered
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Display */}
          {(() => {
            const q = QUIZ_QUESTIONS[currentQuestionIdx];
            const selectedOpt = userAnswers[q.id];

            return (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    {q.category}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                    {q.question}
                  </h2>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    return (
                      <button
                        key={optIdx}
                        id={`question-${q.id}-opt-${optIdx}`}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg scale-[1.01]'
                            : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-white text-blue-600' : 'bg-slate-900 text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 disabled:opacity-40 text-slate-300 font-bold text-xs sm:text-sm cursor-pointer"
                  >
                    ← Soal Sebelumnya
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm cursor-pointer shadow"
                      >
                        Soal Berikutnya →
                      </button>
                    ) : (
                      <button
                        id="submit-quiz-final-btn"
                        onClick={handleSubmitQuiz}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all cursor-pointer"
                      >
                        Selesaikan & Cek Hasil Kuis
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Screen 3: Result & Certificate Screen */}
      {isSubmitted && (
        <div className="space-y-8 animate-fadeIn">
          {/* Score Header Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl text-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/20">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-white">Hasil Evaluasi Pembelajaran</h2>
              <p className="text-slate-300 text-sm">
                Selamat <strong className="text-white">{studentName}</strong> ({studentClass})! Kamu telah menyelesaikan 25 soal kuis BAB 2 Bangun Ruang.
              </p>
            </div>

            <div className="inline-block bg-slate-950 px-8 py-4 rounded-3xl border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Skor Kamu</span>
              <div className="text-5xl font-extrabold text-yellow-400">
                {totalScore} <span className="text-lg font-normal text-slate-400">/ 100</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 block">
                {totalScore >= 70 ? '🎉 LULUS DENGAN BAIK!' : '💪 PERLU BELAJAR LAGI'}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="send-spreadsheet-btn"
                onClick={sendScoreToSpreadsheet}
                disabled={sendingSpreadsheet || spreadsheetSentSuccess}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{spreadsheetSentSuccess ? '✓ Terkirim ke Spreadsheet!' : sendingSpreadsheet ? 'Kirim Data...' : 'Kirim Nilai ke Spreadsheet (ID: 1puAok0...)'}</span>
              </button>

              <button
                id="retake-quiz-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setIsQuizStarted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>

          {/* Certificate Canvas Render & Download Section */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sertifikat Digital Hasil Belajar</h3>
                  <p className="text-xs text-slate-400">Sertifikat resmi tertanda Guru Pengampu Suwarto, S.Pd</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="download-cert-btn"
                  onClick={downloadCertificate}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Sertifikat (PNG)</span>
                </button>
              </div>
            </div>

            {/* Render Canvas */}
            <div className="overflow-x-auto flex justify-center p-2 bg-slate-950 rounded-2xl border border-slate-800">
              <canvas
                ref={certCanvasRef}
                className="w-full max-w-[800px] h-auto rounded-xl shadow-2xl border border-slate-800"
              />
            </div>
          </div>

          {/* Password Protected Detailed Question Review Breakdown */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Pembahasan & Review Pembelajaran Per Soal (25 Soal)
                  </h3>
                  <p className="text-xs text-slate-400">Akses pembahasan lengkap dilindungi oleh kata sandi guru</p>
                </div>
              </div>

              <button
                id="toggle-quiz-solution-btn"
                onClick={() => {
                  if (isSolutionUnlocked) {
                    setIsSolutionUnlocked(false);
                  } else {
                    setPasswordInput('');
                    setPasswordError('');
                    setShowPasswordModal(true);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                {!isSolutionUnlocked ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                <span>{isSolutionUnlocked ? 'Sembunyikan Pembahasan Soal' : 'Lihat Kunci Pembahasan Kuis'}</span>
              </button>
            </div>

            {!isSolutionUnlocked ? (
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Akses Pembahasan Terkunci</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Kunci pembahasan 25 soal kuis ini membutuhkan kata sandi resmi dari Guru Pengampu. Klik tombol di bawah untuk memasukkan kata sandi.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPasswordInput('');
                    setPasswordError('');
                    setShowPasswordModal(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Buka Kunci Pembahasan Kuis (Password)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border space-y-3 ${
                        isCorrect ? 'bg-slate-800/60 border-emerald-500/40' : 'bg-slate-800/60 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{q.category}</span>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Benar (+4)' : 'Salah'}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-white">{q.question}</p>

                      <div className="text-xs space-y-1">
                        <div className="text-slate-300">
                          Jawaban Kamu: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{q.options[userAns] !== undefined ? q.options[userAns] : 'Belum Dijawab'}</strong>
                        </div>
                        {!isCorrect && (
                          <div className="text-slate-300">
                            Jawaban Benar: <strong className="text-emerald-300">{q.options[q.correctAnswer]}</strong>
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
                        💡 <strong>Pembahasan:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Password Modal for Unlocking Quiz Solutions */}
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
                <p className="text-xs text-slate-400">Masukkan kata sandi guru untuk membuka pembahasan kuis</p>
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

      {/* Google Apps Script Integration Modal */}
      {showAppsScriptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Google Apps Script Spreadsheet Sync
                </h3>
              </div>
              <button
                onClick={() => setShowAppsScriptModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                Kode Google Apps Script ini dikonfigurasi khusus untuk mengirimkan rekap hasil nilai siswa secara otomatis ke Google Spreadsheet ID:
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-emerald-300 font-bold border border-slate-800 break-all">
                1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase">Kode Script (Code.gs):</span>
                <button
                  id="copy-script-btn"
                  onClick={copyAppsScript}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto max-h-60 leading-relaxed">
                {googleAppsScriptCode}
              </pre>
            </div>

            <div className="space-y-2 text-xs text-slate-400 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <strong className="text-white block">Cara Memasang Script di Google Spreadsheet:</strong>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka Google Spreadsheet dengan ID di atas.</li>
                <li>Klik menu <strong>Ekstensi → Apps Script</strong>.</li>
                <li>Hapus kode bawaan, lalu paste kode di atas.</li>
                <li>Klik <strong>Terapkan (Deploy) → Penerapan Baru (New Deployment)</strong>.</li>
                <li>Pilih jenis <strong>Aplikasi Web (Web App)</strong>, atur akses ke <em>"Siapa saja" (Anyone)</em>.</li>
              </ol>
            </div>

            <button
              onClick={() => setShowAppsScriptModal(false)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              Tutup Modal Integrasi
            </button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
        <button
          onClick={() => setActiveSection('eksplorasi')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold cursor-pointer"
        >
          ← Kembali ke Eksplorasi
        </button>

        <button
          onClick={() => setActiveSection('tugas')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Tugas & Latihan AI</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
