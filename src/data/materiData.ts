import { MateriItem } from '../types';

export const MATERI_DATA: MateriItem[] = [
  {
    id: 'materi-1',
    title: '1. Klasifikasi Bangun Ruang & Jaring-Jaring',
    category: 'Klasifikasi',
    badge: 'Konsep Dasar',
    summary: 'Peserta didik mampu mengklasifikasikan berbagai jenis bangun ruang (sisi datar dan sisi lengkung) dan membuat jaring-jaringnya.',
    detailedContent: {
      introduction: 'Bangun ruang adalah objek tiga dimensi (3D) yang memiliki volume, isi, dan dibatasi oleh sisi-sisi penutup. Secara umum, bangun ruang dikelompokkan menjadi dua kelompok besar: Bangun Ruang Sisi Datar (BRSD) dan Bangun Ruang Sisi Lengkung (BRSL).',
      properties: [
        'Bangun Ruang Sisi Datar (BRSD): Semua sisi pembatasnya berupa bidang datar (poligon/segi banyak). Contoh: Kubus, Balok, Prisma, dan Limas.',
        'Bangun Ruang Sisi Lengkung (BRSL): Memiliki sekurang-kurangnya satu sisi berupa bidang lengkung. Contoh: Tabung, Kerucut, dan Bola.',
        'Jaring-jaring adalah gabungan dari bangun datar pembentuk bangun ruang yang jika dilipat menurut rusuk-rusuknya akan membentuk bangun ruang semula.'
      ],
      formulas: [
        {
          name: 'Unsur Kubus & Balok',
          formula: 'Titik Sudut (V) + Sisi/Wajah (F) - Rusuk (E) = 2 (Teorema Euler)',
          explanation: 'Berlaku pada semua polihedron sederhana.'
        },
        {
          name: 'Banyak Rusuk & Sisi Prisma segi-n',
          formula: 'Banyak Sisi = n + 2, Banyak Rusuk = 3n, Banyak Titik Sudut = 2n',
          explanation: 'Untuk prisma dengan alas segi-n.'
        },
        {
          name: 'Banyak Rusuk & Sisi Limas segi-n',
          formula: 'Banyak Sisi = n + 1, Banyak Rusuk = 2n, Banyak Titik Sudut = n + 1',
          explanation: 'Untuk limas dengan alas segi-n.'
        }
      ],
      exampleProblem: {
        question: 'Sebuah prisma memiliki alas berbentuk segi-6 (heksagon). Tentukan berapa jumlah sisi, rusuk, dan titik sudut dari prisma tersebut!',
        steps: [
          'Alas prisma adalah segi-6, jadi n = 6.',
          'Banyak sisi = n + 2 = 6 + 2 = 8 sisi.',
          'Banyak rusuk = 3n = 3 × 6 = 18 rusuk.',
          'Banyak titik sudut = 2n = 2 × 6 = 12 titik sudut.'
        ],
        answer: 'Prisma segi-6 memiliki 8 sisi, 18 rusuk, dan 12 titik sudut.'
      }
    },
    shapeType: 'kubus'
  },
  {
    id: 'materi-2',
    title: '2. Luas Permukaan Bangun Ruang Sisi Datar',
    category: 'Sisi Datar',
    badge: 'Kubus, Balok, Prisma, Limas',
    summary: 'Peserta didik mampu menentukan luas permukaan bangun ruang sisi datar (kubus, balok, prisma, dan limas).',
    detailedContent: {
      introduction: 'Luas permukaan bangun ruang adalah jumlah total luas dari seluruh bidang atau sisi yang membatasi bangun ruang tersebut. Menghitung luas permukaan sama dengan menjumlahkan luas bidang pada jaring-jaringnya.',
      properties: [
        'Luas Permukaan Kubus: Memiliki 6 sisi persegi yang identik.',
        'Luas Permukaan Balok: Memiliki 3 pasang persegi panjang yang sejajar dan kongruen.',
        'Luas Permukaan Prisma: Terdiri dari 2 alas yang kongruen dan sisi-sisi tegak berbentuk persegi panjang.',
        'Luas Permukaan Limas: Terdiri dari 1 alas dan sisi-sisi tegak berbentuk segitiga.'
      ],
      formulas: [
        {
          name: 'Luas Permukaan Kubus',
          formula: 'L = 6 × s²',
          explanation: 's = panjang rusuk kubus'
        },
        {
          name: 'Luas Permukaan Balok',
          formula: 'L = 2 × (p·l + p·t + l·t)',
          explanation: 'p = panjang, l = lebar, t = tinggi balok'
        },
        {
          name: 'Luas Permukaan Prisma',
          formula: 'L = (2 × Luas Alas) + (Keliling Alas × t)',
          explanation: 't = tinggi prisma'
        },
        {
          name: 'Luas Permukaan Limas',
          formula: 'L = Luas Alas + Jumlah Luas Sisi Tegak (Segitiga)',
          explanation: 'Jumlahkan luas alas dengan luas seluruh segitiga tegaknya'
        }
      ],
      exampleProblem: {
        question: 'Sebuah balok memiliki panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Hitunglah luas permukaan balok tersebut!',
        steps: [
          'Gunakan rumus L = 2 × (p·l + p·t + l·t)',
          'Substitusi nilai: p = 12, l = 8, t = 5',
          'L = 2 × (12×8 + 12×5 + 8×5)',
          'L = 2 × (96 + 60 + 40) = 2 × 196 = 392 cm²'
        ],
        answer: 'Luas permukaan balok tersebut adalah 392 cm².'
      }
    },
    shapeType: 'balok'
  },
  {
    id: 'materi-3',
    title: '3. Volume Bangun Ruang Sisi Datar',
    category: 'Sisi Datar',
    badge: 'Kubus, Balok, Prisma, Limas',
    summary: 'Peserta didik mampu menentukan volume bangun ruang sisi datar (kubus, balok, prisma, dan limas).',
    detailedContent: {
      introduction: 'Volume adalah ukuran besarnya ruang yang dapat ditempati oleh suatu bangun ruang. Pada dasarnya, bangun berpenampang seragam (kubus, balok, prisma) memiliki volume = Luas Alas × Tinggi, sedangkan bangun yang meruncing pada satu titik (limas) memiliki volume = 1/3 × Luas Alas × Tinggi.',
      properties: [
        'Volume Kubus: Perkalian ketiga rusuknya (s × s × s).',
        'Volume Balok: Perkalian panjang, lebar, dan tinggi (p × l × t).',
        'Volume Prisma: Perkalian luas alasnya dengan tinggi prisma.',
        'Volume Limas: Tepat sepertiga (1/3) dari volume prisma dengan alas dan tinggi yang sama.'
      ],
      formulas: [
        {
          name: 'Volume Kubus',
          formula: 'V = s³',
          explanation: 's = rusuk kubus'
        },
        {
          name: 'Volume Balok',
          formula: 'V = p × l × t',
          explanation: 'p = panjang, l = lebar, t = tinggi'
        },
        {
          name: 'Volume Prisma',
          formula: 'V = Luas Alas × t_prisma',
          explanation: 'Luas alas disesuaikan dengan bentuk alas (segitiga, segi-4, dll)'
        },
        {
          name: 'Volume Limas',
          formula: 'V = 1/3 × Luas Alas × t_limas',
          explanation: 't_limas = tinggi tegak dari alas ke puncak limas'
        }
      ],
      exampleProblem: {
        question: 'Sebuah limas segiempat alasnya berbentuk persegi dengan panjang sisi 10 cm. Jika tinggi limas 12 cm, tentukan volume limas tersebut!',
        steps: [
          'Luas Alas (Persegi) = s × s = 10 × 10 = 100 cm²',
          'Rumus Volume Limas = 1/3 × Luas Alas × t',
          'V = 1/3 × 100 × 12',
          'V = 100 × 4 = 400 cm³'
        ],
        answer: 'Volume limas segiempat tersebut adalah 400 cm³.'
      }
    },
    shapeType: 'limas'
  },
  {
    id: 'materi-4',
    title: '4. Luas Permukaan Bangun Ruang Sisi Lengkung',
    category: 'Sisi Lengkung',
    badge: 'Tabung, Kerucut, Bola',
    summary: 'Peserta didik mampu menentukan luas permukaan bangun ruang sisi lengkung (tabung, kerucut, dan bola).',
    detailedContent: {
      introduction: 'Bangun ruang sisi lengkung memiliki pembatas berupa bidang lengkung melengkung yang mulus. Sisi lengkung ini sering dikorelasikan dengan nilai konstanta lingkaran π (pi = 22/7 atau 3,14).',
      properties: [
        'Tabung: Memiliki 2 lingkaran identik (alas & tutup) dan selimut tabung berbentuk persegi panjang yang digulung.',
        'Kerucut: Memiliki 1 alas lingkaran, selimut berupa juring lingkaran, dan garis pelukis (s).',
        'Bola: Bangun ruang yang dibatasi oleh satu bidang lengkung yang berjarak sama (r) ke titik pusat.'
      ],
      formulas: [
        {
          name: 'Luas Permukaan Tabung',
          formula: 'L = 2πr(r + t)',
          explanation: 'L_selimut = 2πrt, L_alas = πr², L_tutup = πr²'
        },
        {
          name: 'Luas Permukaan Kerucut',
          formula: 'L = πr(r + s)',
          explanation: 's = garis pelukis = √(r² + t²)'
        },
        {
          name: 'Luas Permukaan Bola',
          formula: 'L = 4πr²',
          explanation: 'Sama dengan luas 4 lingkaran berdiameter sama'
        }
      ],
      exampleProblem: {
        question: 'Sebuah kerucut memiliki jari-jari alas 7 cm dan tinggi 24 cm. Hitunglah luas permukaan kerucut tersebut! (Gunakan π = 22/7)',
        steps: [
          'Hitung garis pelukis s = √(r² + t²) = √(7² + 24²) = √(49 + 576) = √625 = 25 cm.',
          'Gunakan rumus L = πr(r + s)',
          'L = (22/7) × 7 × (7 + 25)',
          'L = 22 × 32 = 704 cm²'
        ],
        answer: 'Luas permukaan kerucut tersebut adalah 704 cm².'
      }
    },
    shapeType: 'kerucut'
  },
  {
    id: 'materi-5',
    title: '5. Volume Bangun Ruang Sisi Lengkung & Kontekstual',
    category: 'Sisi Lengkung',
    badge: 'Tabung, Kerucut, Bola',
    summary: 'Peserta didik mampu menentukan volume bangun ruang sisi lengkung (tabung, kerucut, dan bola) serta menyelesaikan masalah kontekstual terkait.',
    detailedContent: {
      introduction: 'Penentuan volume tabung, kerucut, dan bola sangat penting dalam kehidupan sehari-hari, seperti menghitung kapasitas tangki air, minyak bumi, volume kubah masjid, es krim, hingga bola olahraga.',
      properties: [
        'Volume Tabung: Mengikuti konsep prisma (V = Luas Alas Lingkaran × Tinggi = πr²t).',
        'Volume Kerucut: Mengikuti konsep limas (V = 1/3 × Luas Alas × Tinggi = 1/3 πr²t). Hubungan: V_kerucut = 1/3 V_tabung jika r dan t sama.',
        'Volume Bola: V = 4/3 πr³. Merupakan perbandingan khusus terhadap volume tabung penyelimutnya.'
      ],
      formulas: [
        {
          name: 'Volume Tabung',
          formula: 'V = πr²t',
          explanation: 'r = jari-jari alas, t = tinggi tabung'
        },
        {
          name: 'Volume Kerucut',
          formula: 'V = 1/3 πr²t',
          explanation: 'r = jari-jari alas, t = tinggi tegak'
        },
        {
          name: 'Volume Bola',
          formula: 'V = 4/3 πr³',
          explanation: 'r = jari-jari bola'
        }
      ],
      exampleProblem: {
        question: 'Sebuah wadah penampung air berbentuk tabung berdiameter 14 cm dan tinggi 20 cm terisi penuh air. Air tersebut dipindahkan seluruhnya ke dalam mangkuk berbentuk belahan bola (setengah bola) berdiameter sama (14 cm). Berapa banyak mangkuk setengah bola yang dibutuhkan untuk menampung seluruh air?',
        steps: [
          'Jari-jari r = 14 / 2 = 7 cm.',
          'Volume Tabung = πr²t = (22/7) × 7² × 20 = 22 × 7 × 20 = 3.080 cm³.',
          'Volume Setengah Bola = 1/2 × (4/3 πr³) = 2/3 πr³ = 2/3 × (22/7) × 7³ = 2/3 × 22 × 49 = 2/3 × 1.078 ≈ 718,67 cm³.',
          'Banyak Mangkuk = V_tabung / V_setengah_bola = 3.080 / 718,67 = 4,28 (dibulatkan ke atas jadi 5 mangkuk).'
        ],
        answer: 'Dibutuhkan 5 mangkuk setengah bola agar seluruh air tertampung.'
      }
    },
    shapeType: 'tabung'
  }
];
