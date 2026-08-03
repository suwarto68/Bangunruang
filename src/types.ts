export type NavSection = 
  | 'beranda' 
  | 'pendahuluan' 
  | 'materi' 
  | 'eksplorasi' 
  | 'kuis' 
  | 'tugas' 
  | 'penutup';

export type Mood = 'sedih' | 'biasa' | 'senang' | null;

export type Shape3DType = 
  | 'kubus' 
  | 'balok' 
  | 'prisma' 
  | 'limas' 
  | 'tabung' 
  | 'kerucut' 
  | 'bola';

export interface MoodMessage {
  emoji: string;
  title: string;
  message: string;
  quote: string;
  tip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'Sisi Datar' | 'Sisi Lengkung' | 'Konseptual' | 'Klasifikasi';
}

export interface MateriItem {
  id: string;
  title: string;
  category: 'Sisi Datar' | 'Sisi Lengkung' | 'Klasifikasi';
  badge: string;
  summary: string;
  detailedContent: {
    introduction: string;
    properties: string[];
    formulas: {
      name: string;
      formula: string;
      explanation: string;
    }[];
    exampleProblem: {
      question: string;
      steps: string[];
      answer: string;
    };
  };
  shapeType: Shape3DType;
}

export interface TaskItem {
  title: string;
  problem: string;
  hint: string;
  solution: string;
  answer: string;
}

export interface CertificateData {
  studentName: string;
  score: number;
  totalQuestions: number;
  date: string;
  teacherName: string;
  gradeText: string;
}
