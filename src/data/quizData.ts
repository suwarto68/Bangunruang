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
  },
  {
    id: 11,
    question: 'Banyak sisi, titik sudut, dan rusuk pada sebuah limas segi-4 secara berturut-turut adalah...',
    options: [
      '4 sisi, 4 titik sudut, 6 rusuk',
      '5 sisi, 5 titik sudut, 8 rusuk',
      '5 sisi, 8 titik sudut, 5 rusuk',
      '6 sisi, 8 titik sudut, 12 rusuk'
    ],
    correctAnswer: 1,
    explanation: 'Limas segi-4 memiliki 1 sisi alas + 4 sisi tegak = 5 sisi. Banyak titik sudut = n + 1 = 4 + 1 = 5. Banyak rusuk = 2n = 2 × 4 = 8.',
    category: 'Klasifikasi'
  },
  {
    id: 12,
    question: 'Sebuah balok memiliki panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Luas permukaan balok tersebut adalah...',
    options: [
      '196 cm²',
      '236 cm²',
      '392 cm²',
      '480 cm²'
    ],
    correctAnswer: 2,
    explanation: 'Luas Permukaan Balok = 2 × (pl + pt + lt) = 2 × (12×8 + 12×5 + 8×5) = 2 × (96 + 60 + 40) = 2 × 196 = 392 cm².',
    category: 'Sisi Datar'
  },
  {
    id: 13,
    question: 'Sebuah kerucut memiliki diameter alas 14 cm dan tinggi 24 cm. Luas selimut kerucut tersebut adalah... (Gunakan π = 22/7)',
    options: [
      '550 cm²',
      '154 cm²',
      '704 cm²',
      '308 cm²'
    ],
    correctAnswer: 0,
    explanation: 'r = 14/2 = 7 cm. Garis pelukis s = √(7² + 24²) = √(49 + 576) = √625 = 25 cm. Luas Selimut = π × r × s = (22/7) × 7 × 25 = 550 cm².',
    category: 'Sisi Lengkung'
  },
  {
    id: 14,
    question: 'Sebuah kubus memiliki volume 343 cm³. Luas permukaan kubus tersebut adalah...',
    options: [
      '343 cm²',
      '294 cm²',
      '196 cm²',
      '49 cm²'
    ],
    correctAnswer: 1,
    explanation: 'Volume = s³ = 343 ⇒ s = ∛343 = 7 cm. Luas Permukaan = 6 × s² = 6 × 7² = 6 × 49 = 294 cm².',
    category: 'Sisi Datar'
  },
  {
    id: 15,
    question: 'Suatu tabung tanpa tutup memiliki jari-jari 10 cm dan tinggi 15 cm. Luas permukaan tabung tanpa tutup tersebut adalah... (Gunakan π = 3,14)',
    options: [
      '942 cm²',
      '1.570 cm²',
      '628 cm²',
      '1.256 cm²'
    ],
    correctAnswer: 3,
    explanation: 'Luas tanpa tutup = Luas Alas + Luas Selimut = πr² + 2πrt = πr(r + 2t) = 3,14 × 10 × (10 + 2×15) = 31,4 × 40 = 1.256 cm².',
    category: 'Sisi Lengkung'
  },
  {
    id: 16,
    question: 'Prisma dengan alas berbentuk segitiga siku-siku memiliki panjang sisi siku-siku 6 cm dan 8 cm. Jika tinggi prisma 12 cm, maka volume prisma tersebut adalah...',
    options: [
      '144 cm³',
      '288 cm³',
      '576 cm³',
      '240 cm³'
    ],
    correctAnswer: 1,
    explanation: 'Luas Alas Segitiga = 1/2 × a × t = 1/2 × 6 × 8 = 24 cm². Volume Prisma = Luas Alas × tinggi prisma = 24 × 12 = 288 cm³.',
    category: 'Sisi Datar'
  },
  {
    id: 17,
    question: 'Sebuah bola pejal (padat) dibelah menjadi dua bagian sama besar. Jika jari-jari bola 7 cm, berapa luas permukaan setengah bola pejal tersebut? (Gunakan π = 22/7)',
    options: [
      '308 cm²',
      '616 cm²',
      '462 cm²',
      '154 cm²'
    ],
    correctAnswer: 2,
    explanation: 'Luas permukaan setengah bola pejal = 3πr² = 3 × (22/7) × 7² = 3 × 22 × 7 = 462 cm².',
    category: 'Sisi Lengkung'
  },
  {
    id: 18,
    question: 'Kawat sepanjang 3 meter akan dibuat kerangka kubus dengan panjang rusuk 20 cm. Banyak kerangka kubus yang dapat dibuat secara utuh adalah...',
    options: [
      '1 buah',
      '2 buah',
      '3 buah',
      '4 buah'
    ],
    correctAnswer: 0,
    explanation: 'Satu kubus butuh 12 rusuk = 12 × 20 cm = 240 cm = 2,4 meter. Kawat tersedia 3 meter = 300 cm. Banyak kubus = 300 / 240 = 1 kubus utuh (sisa 60 cm kawat).',
    category: 'Konseptual'
  },
  {
    id: 19,
    question: 'Manakah di bawah ini yang MERUPAKAN rumus Luas Permukaan Kerucut lengkap dengan alasnya?',
    options: [
      'L = 2 π r (r + t)',
      'L = π r s',
      'L = π r (r + s)',
      'L = 1/3 π r² t'
    ],
    correctAnswer: 2,
    explanation: 'Luas Permukaan Kerucut = Luas Alas + Luas Selimut = πr² + πrs = πr(r + s).',
    category: 'Konseptual'
  },
  {
    id: 20,
    question: 'Sebuah topi ulang tahun berbentuk kerucut memiliki jari-jari 8 cm dan tinggi 15 cm. Luas kertas karton minimal yang dibutuhkan untuk membuat topi tersebut adalah... (Gunakan π = 3,14)',
    options: [
      '200,96 cm²',
      '427,04 cm²',
      '628,00 cm²',
      '376,80 cm²'
    ],
    correctAnswer: 1,
    explanation: 'Topi ulang tahun berbentuk kerucut tanpa alas (hanya selimut). s = √(8² + 15²) = √(64 + 225) = √289 = 17 cm. Luas Selimut = π × r × s = 3,14 × 8 × 17 = 427,04 cm².',
    category: 'Sisi Lengkung'
  },
  {
    id: 21,
    question: 'Sebuah prisma alasnya berbentuk belah ketupat dengan panjang diagonal 16 cm dan 12 cm. Jika tinggi prisma 10 cm, volume prisma tersebut adalah...',
    options: [
      '1.920 cm³',
      '480 cm³',
      '960 cm³',
      '240 cm³'
    ],
    correctAnswer: 2,
    explanation: 'Luas alas belah ketupat = 1/2 × d1 × d2 = 1/2 × 16 × 12 = 96 cm². Volume Prisma = Luas alas × t = 96 × 10 = 960 cm³.',
    category: 'Sisi Datar'
  },
  {
    id: 22,
    question: 'Sebuah kelereng berbentuk bola sempurna memiliki diameter 14 mm. Volume kelereng tersebut adalah... (Gunakan π = 22/7)',
    options: [
      '1.078,00 mm³',
      '616,00 mm³',
      '1.437,33 mm³',
      '2.874,67 mm³'
    ],
    correctAnswer: 2,
    explanation: 'r = 14/2 = 7 mm. Volume Bola = 4/3 πr³ = 4/3 × (22/7) × 7³ = 4/3 × 22 × 49 = 4312 / 3 ≈ 1.437,33 mm³.',
    category: 'Sisi Lengkung'
  },
  {
    id: 23,
    question: 'Dua buah kubus masing-masing memiliki panjang rusuk 3 cm dan 6 cm. Perbandingan volume kedua kubus tersebut adalah...',
    options: [
      '1 : 2',
      '1 : 4',
      '1 : 8',
      '1 : 27'
    ],
    correctAnswer: 2,
    explanation: 'V1 : V2 = s1³ : s2³ = 3³ : 6³ = 27 : 216 = 1 : 8.',
    category: 'Konseptual'
  },
  {
    id: 24,
    question: 'Sebuah kaleng biskuit berbentuk tabung berisi air penuh. Jika jari-jari alasnya diperbesar 2 kali dan tingginya diperbesar 3 kali, maka volume kaleng baru dibandingkan volume kaleng awal menjadi...',
    options: [
      '6 kali semula',
      '8 kali semula',
      '12 kali semula',
      '4 kali semula'
    ],
    correctAnswer: 2,
    explanation: 'Volume awal V1 = π r² t. Volume baru V2 = π (2r)² (3t) = π (4r²) (3t) = 12 π r² t = 12 V1.',
    category: 'Konseptual'
  },
  {
    id: 25,
    question: 'Sebuah tangki penampungan air berbentuk gabungan silinder (tabung) dan setengah bola di bagian atasnya. Jika jari-jari alas 2,1 meter dan tinggi bagian tabungnya 5 meter, berapakah total kapasitas volume air tangki tersebut? (Gunakan π = 22/7)',
    options: [
      '69,300 m³',
      '88,803 m³',
      '19,503 m³',
      '108,306 m³'
    ],
    correctAnswer: 1,
    explanation: 'Volume Tabung = πr²t = (22/7) × 2,1² × 5 = 69,3 m³. Volume 1/2 Bola = 2/3 πr³ = 2/3 × (22/7) × (2,1)³ = 19,503 m³. Total Volume = 69,3 + 19,503 = 88,803 m³.',
    category: 'Sisi Lengkung'
  }
];
