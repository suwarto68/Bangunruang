import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Manakah di bawah ini yang SELURUHNYA tergolong sebagai Bangun Ruang Sisi Datar (BRSD)?',
    options: [
      'Kubus, Balok, Tabung, Limas',
      'Kubus, Balok, Prisma, Limas',
      'Balok, Kerucut, Prisma, Bola',
      'Tabung, Kerucut, Bola, Prisma'
    ],
    correctAnswer: 1,
    explanation: 'Bangun Ruang Sisi Datar (BRSD) adalah bangun ruang yang semua sisinya berbentuk bidang datar (poligon), yaitu Kubus, Balok, Prisma, dan Limas.',
    category: 'Klasifikasi'
  },
  {
    id: 2,
    question: 'Sebuah kubus memiliki panjang rusuk 8 cm. Luas permukaan kubus tersebut adalah...',
    options: [
      '256 cm²',
      '384 cm²',
      '512 cm²',
      '64 cm²'
    ],
    correctAnswer: 1,
    explanation: 'Luas Permukaan Kubus = 6 × s² = 6 × 8² = 6 × 64 = 384 cm².',
    category: 'Sisi Datar'
  },
  {
    id: 3,
    question: 'Berapa banyak rusuk dan titik sudut yang dimiliki oleh sebuah Prisma Segi-5?',
    options: [
      '10 rusuk dan 15 titik sudut',
      '15 rusuk dan 10 titik sudut',
      '7 rusuk dan 10 titik sudut',
      '15 rusuk dan 12 titik sudut'
    ],
    correctAnswer: 1,
    explanation: 'Pada prisma segi-n: Banyak rusuk = 3n = 3 × 5 = 15 rusuk. Banyak titik sudut = 2n = 2 × 5 = 10 titik sudut.',
    category: 'Klasifikasi'
  },
  {
    id: 4,
    question: 'Sebuah balok memiliki ukuran panjang 10 cm, lebar 6 cm, dan tinggi 4 cm. Volume balok tersebut adalah...',
    options: [
      '240 cm³',
      '120 cm³',
      '480 cm³',
      '248 cm³'
    ],
    correctAnswer: 0,
    explanation: 'Volume Balok = p × l × t = 10 × 6 × 4 = 240 cm³.',
    category: 'Sisi Datar'
  },
  {
    id: 5,
    question: 'Sebuah limas alasnya berbentuk persegi dengan sisi 6 cm. Jika tinggi limas adalah 10 cm, maka volume limas tersebut adalah...',
    options: [
      '360 cm³',
      '180 cm³',
      '120 cm³',
      '60 cm³'
    ],
    correctAnswer: 2,
    explanation: 'Luas alas = 6 × 6 = 36 cm². Volume Limas = 1/3 × Luas Alas × t = 1/3 × 36 × 10 = 12 × 10 = 120 cm³.',
    category: 'Sisi Datar'
  },
  {
    id: 6,
    question: 'Sebuah tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Volume tabung tersebut adalah... (Gunakan π = 22/7)',
    options: [
      '1.540 cm³',
      '440 cm³',
      '770 cm³',
      '3.080 cm³'
    ],
    correctAnswer: 0,
    explanation: 'Volume Tabung = πr²t = (22/7) × 7² × 10 = (22/7) × 49 × 10 = 22 × 7 × 10 = 1.540 cm³.',
    category: 'Sisi Lengkung'
  },
  {
    id: 7,
    question: 'Jika sebuah kerucut memiliki jari-jari alas 6 cm dan tinggi 8 cm, berapakah panjang garis pelukis (s) kerucut tersebut?',
    options: [
      '14 cm',
      '12 cm',
      '10 cm',
      '48 cm'
    ],
    correctAnswer: 2,
    explanation: 'Garis pelukis s = √(r² + t²) = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.',
    category: 'Sisi Lengkung'
  },
  {
    id: 8,
    question: 'Luas permukaan sebuah bola yang memiliki jari-jari 21 cm adalah... (Gunakan π = 22/7)',
    options: [
      '5.544 cm²',
      '1.386 cm²',
      '2.772 cm²',
      '38.808 cm²'
    ],
    correctAnswer: 0,
    explanation: 'Luas Permukaan Bola = 4πr² = 4 × (22/7) × 21 × 21 = 4 × 22 × 3 × 21 = 5.544 cm².',
    category: 'Sisi Lengkung'
  },
  {
    id: 9,
    question: 'Sebuah wadah berbentuk kerucut terisi penuh air. Jika jari-jari alas kerucut 7 cm dan tingginya 12 cm, volume air di dalamnya adalah... (Gunakan π = 22/7)',
    options: [
      '616 cm³',
      '1.848 cm³',
      '308 cm³',
      '154 cm³'
    ],
    correctAnswer: 0,
    explanation: 'Volume Kerucut = 1/3 πr²t = 1/3 × (22/7) × 7² × 12 = 1/3 × (22/7) × 49 × 12 = 1/3 × 22 × 7 × 12 = 616 cm³.',
    category: 'Sisi Lengkung'
  },
  {
    id: 10,
    question: 'Budi memiliki bak mandi berbentuk kubus. Jika bak tersebut diisi penuh air sebanyak 729 liter, berapakah panjang rusuk bagian dalam bak mandi tersebut?',
    options: [
      '70 cm',
      '80 cm',
      '90 cm',
      '100 cm'
    ],
    correctAnswer: 2,
    explanation: 'Volume = 729 liter = 729 dm³ = 729.000 cm³. Rusuk s = ∛729.000 = 90 cm (karena 90³ = 729.000).',
    category: 'Sisi Datar'
  }
];
