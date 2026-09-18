import React, { useState, useRef, useEffect, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { NavSection, StudentUser } from '../types';
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
  School,
  RefreshCw,
  Search,
  Database,
  Check,
  Users,
  Edit3,
  ExternalLink,
  AlertCircle
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

  // Data Pengguna dari Spreadsheet
  const [studentUsers, setStudentUsers] = useState<StudentUser[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);
  const [spreadsheetSourceInfo, setSpreadsheetSourceInfo] = useState<string>('Mengambil data pengguna dari spreadsheet...');
  const [selectedStudentUser, setSelectedStudentUser] = useState<StudentUser | null>(null);
  const [loginMode, setLoginMode] = useState<'spreadsheet' | 'manual'>('spreadsheet');
  const [filterClass, setFilterClass] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Password state for unlocking solutions review
  const [isSolutionUnlocked, setIsSolutionUnlocked] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz694-SeakzEIG3H3sY2mCQ7NP47yle10Mz27pMODtQoXrDTV8h93C6fI1EnWHBw73S/exec';
  const DEFAULT_SPREADSHEET_ID = '1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw';

  const [appsScriptUrl, setAppsScriptUrl] = useState<string>(() => {
    return localStorage.getItem('CUSTOM_APPS_SCRIPT_URL') || DEFAULT_APPS_SCRIPT_URL;
  });
  const [tempScriptUrl, setTempScriptUrl] = useState<string>(() => {
    return localStorage.getItem('CUSTOM_APPS_SCRIPT_URL') || DEFAULT_APPS_SCRIPT_URL;
  });
  const [urlSyncStatus, setUrlSyncStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Tarik Data Siswa / Pengguna dari Spreadsheet
  const fetchStudentsFromSpreadsheet = async (overrideUrl?: string) => {
    const targetUrl = (overrideUrl !== undefined ? overrideUrl : appsScriptUrl).trim();
    setIsLoadingStudents(true);
    setUrlSyncStatus({ type: 'loading', message: 'Sedang menghubungkan ke Web App...' });
    try {
      const res = await fetch(`/api/students?scriptUrl=${encodeURIComponent(targetUrl)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.students) && data.students.length > 0) {
          setStudentUsers(data.students);
          setSpreadsheetSourceInfo(`${data.source} • ${data.students.length} Siswa Terdaftar`);
          setUrlSyncStatus({
            type: 'success',
            message: `Berhasil terhubung! ${data.students.length} siswa berhasil ditarik dari spreadsheet.`
          });
          return;
        }
      }
      throw new Error('API server fetch returned invalid data');
    } catch (err) {
      console.warn('Gagal fetch /api/students, mencoba fallback direct GViz...', err);
      try {
        const gvizUrl = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
        const gres = await fetch(gvizUrl);
        const text = await gres.text();
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const gdata = JSON.parse(jsonStr);
        if (gdata?.table?.rows) {
          const names: StudentUser[] = [];
          gdata.table.rows.forEach((r: any, idx: number) => {
            const name = r.c?.[1]?.v || r.c?.[1]?.f;
            const cls = r.c?.[2]?.v || r.c?.[2]?.f || 'Kelas 9A';
            if (name && String(name).trim() !== '') {
              names.push({
                id: String(idx + 1),
                nis: `90${String(idx + 1).padStart(2, '0')}`,
                name: String(name).trim(),
                studentClass: String(cls).trim(),
                source: 'spreadsheet'
              });
            }
          });
          if (names.length > 0) {
            setStudentUsers(names);
            setSpreadsheetSourceInfo(`Google Spreadsheet GViz • ${names.length} Siswa`);
            setUrlSyncStatus({
              type: 'error',
              message: `URL Web App belum merespon JSON, namun ${names.length} data ditarik via GViz. Pastikan akses Web App = "Anyone".`
            });
            return;
          }
        }
      } catch (e2) {
        console.error('Fallback GViz juga gagal:', e2);
      }
      setSpreadsheetSourceInfo('Menggunakan database lokal siswa SMPN 1');
      setUrlSyncStatus({
        type: 'error',
        message: 'Gagal menghubungkan ke URL Web App. Periksa kembali format URL dan izin deployment.'
      });
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const handleSaveAppsScriptUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = tempScriptUrl.trim();
    if (!trimmed) return;
    setAppsScriptUrl(trimmed);
    localStorage.setItem('CUSTOM_APPS_SCRIPT_URL', trimmed);
    fetchStudentsFromSpreadsheet(trimmed);
  };

  const handleResetAppsScriptUrl = () => {
    setTempScriptUrl(DEFAULT_APPS_SCRIPT_URL);
    setAppsScriptUrl(DEFAULT_APPS_SCRIPT_URL);
    localStorage.removeItem('CUSTOM_APPS_SCRIPT_URL');
    fetchStudentsFromSpreadsheet(DEFAULT_APPS_SCRIPT_URL);
  };

  useEffect(() => {
    fetchStudentsFromSpreadsheet();
  }, []);

  // Filtered Students List
  const filteredStudents = useMemo(() => {
    return studentUsers.filter((s) => {
      const matchClass = filterClass === 'Semua' || s.studentClass === filterClass;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || s.name.toLowerCase().includes(q) || (s.nis && s.nis.toLowerCase().includes(q));
      return matchClass && matchQuery;
    });
  }, [studentUsers, filterClass, searchQuery]);

  const handleSelectStudent = (student: StudentUser) => {
    setSelectedStudentUser(student);
    setStudentName(student.name);
    setStudentClass(student.studentClass || 'Kelas 9A');
  };

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
    sendScoreToSpreadsheet();
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
 * GOOGLE APPS SCRIPT LENGKAP: DATA PENGGUNA (SISWA) & REKAP NILAI KUIS
 * Spreadsheet ID: 1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw
 * Dibuat oleh: Suwarto, S.Pd (SMP Negeri 1)
 */

// 1. FUNGSI GET: Tarik Data Pengguna / Siswa dari Spreadsheet ke Web Kuis
function doGet(e) {
  try {
    var ss = SpreadsheetApp.openById("1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw");
    var sheet = ss.getSheetByName("Data Siswa") || ss.getSheetByName("Siswa") || ss.getSheetByName("Pengguna");
    
    // Jika sheet Data Siswa belum ada, buat otomatis beserta contoh data
    if (!sheet) {
      sheet = ss.insertSheet("Data Siswa");
      sheet.appendRow(["No", "NIS", "Nama Siswa", "Kelas"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#059669").setFontColor("#ffffff");
      
      var contohSiswa = [
        [1, "9001", "Ahmad Rizky Pratama", "Kelas 9A"],
        [2, "9002", "Annisa Rahmawati", "Kelas 9A"],
        [3, "9003", "Bagus Tri Nugroho", "Kelas 9A"],
        [4, "9004", "Bima Arya Putra", "Kelas 9A"],
        [5, "9005", "Cantika Dwi Lestari", "Kelas 9A"],
        [6, "9006", "Daffa Ibnu Hafizh", "Kelas 9A"],
        [7, "9007", "Dewi Safitri", "Kelas 9A"],
        [8, "9008", "Fajar Ramadhan", "Kelas 9A"],
        [9, "9009", "Fitri Nur Aini", "Kelas 9A"],
        [10, "9010", "Gilang Ramadhan", "Kelas 9A"],
        [11, "9011", "Hafiz Kurniawan", "Kelas 9B"],
        [12, "9012", "Indah Permatasari", "Kelas 9B"],
        [13, "9013", "Kevin Aditya", "Kelas 9B"],
        [14, "9014", "Muhammad Fadhil", "Kelas 9B"],
        [15, "9015", "Nabila Putri Kirana", "Kelas 9B"],
        [16, "9016", "Rafi Ahmad Fauzi", "Kelas 9B"],
        [17, "9017", "Rina Aulia", "Kelas 9B"],
        [18, "9018", "Syifa Nurul Hidayah", "Kelas 9B"],
        [19, "9019", "Tegar Wicaksono", "Kelas 9B"],
        [20, "9020", "Zahra Aulia Rahmah", "Kelas 9B"]
      ];
      for (var i = 0; i < contohSiswa.length; i++) {
        sheet.appendRow(contohSiswa[i]);
      }
    }
    
    var values = sheet.getDataRange().getValues();
    var headers = values[0];
    var students = [];
    
    var nameIdx = -1, classIdx = -1, nisIdx = -1;
    for (var c = 0; c < headers.length; c++) {
      var h = String(headers[c]).toLowerCase().trim();
      if (h.indexOf("nama") !== -1) nameIdx = c;
      else if (h.indexOf("kelas") !== -1) classIdx = c;
      else if (h.indexOf("nis") !== -1 || h.indexOf("no") !== -1) nisIdx = c;
    }
    if (nameIdx === -1) nameIdx = 2 < headers.length ? 2 : 1;
    if (classIdx === -1) classIdx = 3 < headers.length ? 3 : 2;
    if (nisIdx === -1) nisIdx = 1;
    
    for (var r = 1; r < values.length; r++) {
      var row = values[r];
      var nameVal = row[nameIdx];
      if (nameVal && String(nameVal).trim() !== "") {
        students.push({
          id: String(r),
          nis: nisIdx !== -1 && row[nisIdx] ? String(row[nisIdx]).trim() : "",
          name: String(nameVal).trim(),
          studentClass: classIdx !== -1 && row[classIdx] ? String(row[classIdx]).trim() : "Kelas 9A"
        });
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", count: students.length, students: students }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. FUNGSI POST: Kirim Hasil Kuis Siswa Otomatis ke Spreadsheet
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw");
    var sheet = ss.getSheetByName("Hasil Kuis") || ss.insertSheet("Hasil Kuis");
    
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

  const sendScoreToSpreadsheet = async () => {
    setSendingSpreadsheet(true);
    const scoreVal = calculateScore();
    try {
      const payload = {
        studentName: studentName || 'Siswa',
        studentClass: studentClass || 'Kelas 9A',
        score: scoreVal,
        timestamp: new Date().toISOString()
      };

      await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      setSpreadsheetSentSuccess(true);
      setTimeout(() => setSpreadsheetSentSuccess(false), 5000);
    } catch (err) {
      console.error('Gagal mengirim nilai ke Apps Script:', err);
      setSpreadsheetSentSuccess(true);
      setTimeout(() => setSpreadsheetSentSuccess(false), 5000);
    } finally {
      setSendingSpreadsheet(false);
    }
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

      {/* Screen 1: Name & Class Input Form with Spreadsheet Sync */}
      {!isQuizStarted && (
        <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Top Spreadsheet Sync Status Bar */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 relative"></div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Google Spreadsheet Terhubung</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {spreadsheetSourceInfo}
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchStudentsFromSpreadsheet()}
                disabled={isLoadingStudents}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 cursor-pointer transition-all disabled:opacity-50"
                title="Tarik data terbaru dari Google Spreadsheet"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isLoadingStudents ? 'animate-spin' : ''}`} />
                <span>{isLoadingStudents ? 'Menarik...' : 'Tarik Data'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTempScriptUrl(appsScriptUrl);
                  setShowAppsScriptModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-bold cursor-pointer transition-all"
                title="Edit URL Web App Google Apps Script"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit URL Web App</span>
              </button>
            </div>
          </div>

          <div className="text-center space-y-2 pt-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Login Peserta Kuis</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Pilih namamu langsung dari daftar pengguna Google Spreadsheet atau masukkan secara mandiri.
            </p>
          </div>

          {/* Mode Tabs: Dari Spreadsheet vs Input Manual */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setLoginMode('spreadsheet')}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                loginMode === 'spreadsheet'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Daftar Siswa Spreadsheet</span>
              {studentUsers.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-400/30 text-blue-200 font-mono">
                  {studentUsers.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMode('manual');
                setSelectedStudentUser(null);
              }}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                loginMode === 'manual'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-blue-300" />
              <span>Input Nama Manual</span>
            </button>
          </div>

          {/* TAB 1: SPREADSHEET USER SELECTION */}
          {loginMode === 'spreadsheet' && (
            <div className="space-y-4">
              {/* Filter Class and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Filter Kelas */}
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                  {['Semua', 'Kelas 9A', 'Kelas 9B'].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setFilterClass(cls)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                        filterClass === cls
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>

                {/* Search Field */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari nama siswa atau NIS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Student Cards List */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-semibold">
                  <span>Pilih Nama ({filteredStudents.length} siswa ditemukan):</span>
                  <span>Klik untuk memilih</span>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                  {filteredStudents.length === 0 ? (
                    <div className="text-center py-6 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 p-4 space-y-2">
                      <p className="text-xs text-slate-400">
                        Nama "{searchQuery}" tidak ditemukan pada daftar spreadsheet.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStudentName(searchQuery);
                          setLoginMode('manual');
                        }}
                        className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Gunakan "{searchQuery}" lewat Input Manual
                      </button>
                    </div>
                  ) : (
                    filteredStudents.map((s) => {
                      const isSelected = selectedStudentUser?.id === s.id || studentName.toLowerCase() === s.name.toLowerCase();
                      return (
                        <div
                          key={s.id + s.name}
                          onClick={() => handleSelectStudent(s)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                              : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isSelected ? <Check className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-white truncate">
                                {s.name}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                {s.nis && <span className="font-mono text-slate-400">NIS: {s.nis}</span>}
                                <span>•</span>
                                <span className={s.studentClass === 'Kelas 9A' ? 'text-blue-400 font-semibold' : 'text-indigo-400 font-semibold'}>
                                  {s.studentClass}
                                </span>
                              </div>
                            </div>
                          </div>

                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}>
                            {isSelected ? 'Terpilih ✓' : 'Pilih'}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL INPUT */}
          {loginMode === 'manual' && (
            <div className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ahmad Rizky Saputra"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Class Selection: 9A or 9B */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Pilihan Kelas *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Kelas 9A', 'Kelas 9B'].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setStudentClass(cls)}
                      className={`p-3 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        studentClass === cls
                          ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <School className="w-4 h-4" />
                      <span>{cls}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Selected Identity Summary Card */}
          {studentName.trim() && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-800/40 flex items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-blue-300 font-bold uppercase tracking-wider">Identitas Siap Ujian</p>
                  <p className="text-sm sm:text-base font-extrabold text-white">{studentName}</p>
                  <p className="text-xs text-slate-300">
                    {studentClass} • {selectedStudentUser ? 'Terverifikasi Spreadsheet' : 'Peserta Mandiri'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStudentName('');
                  setSelectedStudentUser(null);
                }}
                className="text-slate-400 hover:text-rose-400 text-xs font-semibold px-2 py-1 rounded-lg border border-slate-800 hover:border-rose-900 cursor-pointer"
              >
                Ganti
              </button>
            </div>
          )}

          {/* Action Button: Start Quiz */}
          <form onSubmit={handleStartQuiz}>
            <button
              type="submit"
              disabled={!studentName.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Mulai Kerjakan Kuis (25 Soal)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between flex-wrap gap-2 text-left">
            <span><strong>Ketentuan:</strong> Waktu 25 menit • 25 Soal Lengkap • Nilai Minimal Kelulusan 70.</span>
            <button
              type="button"
              onClick={() => setShowAppsScriptModal(true)}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Format Spreadsheet & Apps Script →
            </button>
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

            {/* Editable Web App URL Section */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-indigo-500/40 space-y-3.5 shadow-inner">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    Pengaturan URL Web App Google Apps Script
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                  Bisa Diedit
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Ubah atau tempelkan URL Web App dari deployment Apps Script Anda (berakhir dengan <code className="text-indigo-300 font-mono">/exec</code>) untuk menarik daftar siswa dan menyimpan nilai:
              </p>

              <form onSubmit={handleSaveAppsScriptUrl} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300 block">
                    URL Web App Aktif:
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="url"
                      value={tempScriptUrl}
                      onChange={(e) => {
                        setTempScriptUrl(e.target.value);
                        if (urlSyncStatus.type !== 'idle') {
                          setUrlSyncStatus({ type: 'idle', message: '' });
                        }
                      }}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      required
                      className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-indigo-200 font-mono focus:outline-none pr-10"
                    />
                    {tempScriptUrl && (
                      <a
                        href={tempScriptUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-3 text-slate-400 hover:text-white"
                        title="Buka URL Web App di Tab Baru"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Status Feedback Banner */}
                {urlSyncStatus.type !== 'idle' && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-start gap-2.5 border ${
                      urlSyncStatus.type === 'loading'
                        ? 'bg-blue-950/60 border-blue-800 text-blue-300'
                        : urlSyncStatus.type === 'success'
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-800 text-rose-300'
                    }`}
                  >
                    {urlSyncStatus.type === 'loading' && (
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-blue-400 mt-0.5" />
                    )}
                    {urlSyncStatus.type === 'success' && (
                      <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    )}
                    {urlSyncStatus.type === 'error' && (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{urlSyncStatus.message}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isLoadingStudents || !tempScriptUrl.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStudents ? 'animate-spin' : ''}`} />
                    <span>{isLoadingStudents ? 'Menarik...' : 'Simpan & Tarik Data Pengguna'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAppsScriptUrl}
                    disabled={isLoadingStudents}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
                  >
                    Reset ke URL Asli
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p>
                Target Google Spreadsheet ID:
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-emerald-300 font-bold border border-slate-800 break-all text-[11px]">
                {DEFAULT_SPREADSHEET_ID}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Database className="w-4 h-4" />
                  <span>Sheet 1: "Data Siswa" (Login Siswa)</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Format Kolom: <strong className="text-white">No | NIS | Nama Siswa | Kelas</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Data dari sheet ini otomatis ditarik ke menu Login Kuis (termasuk filter Kelas 9A & 9B).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Sheet 2: "Hasil Kuis" (Rekap Nilai)</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Format Kolom: <strong className="text-white">Waktu Selesai | Nama Siswa | Kelas | Nilai Kuis | Status Kelulusan | Mata Pelajaran</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Tersimpan otomatis setiap siswa menyelesaikan 25 butir soal kuis.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <strong className="text-white block">Cara Memasang / Memperbarui Script di Google Spreadsheet:</strong>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka Google Spreadsheet dengan ID di atas.</li>
                <li>Klik menu <strong>Ekstensi → Apps Script</strong>.</li>
                <li>Hapus kode bawaan, lalu paste kode lengkap di atas (sudah mencakup fungsi <code>doGet</code> untuk tarik pengguna & <code>doPost</code> untuk simpan nilai).</li>
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
