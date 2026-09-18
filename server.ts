import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily when requested
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Dynamic Task Generator Function for Fallback
function generateDynamicTask(topic?: string, difficulty?: string) {
  const chosenTopic = topic || 'Sisi Datar';
  const chosenDiff = difficulty || 'Sedang';

  const names = ['Ahmad', 'Siti', 'Budi', 'Dewi', 'Rizky', 'Rina', 'Fajar', 'Nabila'];
  const name = names[Math.floor(Math.random() * names.length)];

  if (chosenTopic === 'Sisi Lengkung') {
    const rChoices = [7, 14, 21];
    const r = rChoices[Math.floor(Math.random() * rChoices.length)];
    const t = (Math.floor(Math.random() * 3) + 1) * 10; // 10, 20, 30 cm
    const volTabung = Math.round((22 / 7) * r * r * t);
    const luastabung = Math.round(2 * (22 / 7) * r * (r + t));

    const templates = [
      {
        title: `Tugas Kontekstual: Tangki Air Minum (${chosenDiff})`,
        problem: `${name} memiliki wadah penampungan air berbentuk tabung dengan jari-jari alas ${r} cm dan tinggi ${t} cm. Wadah tersebut akan diisi penuh air untuk kebutuhan acara bakti sosial sekolah. Hitunglah berapa liter volume air maksimum yang dapat ditampung wadah tersebut! (Catatan: 1 liter = 1.000 cm³, $\\pi = 22/7$).`,
        hint: `Gunakan rumus Volume Tabung: $V = \\pi \\times r^2 \\times t$. Setelah mendapatkan volume dalam cm³, bagilah dengan 1.000 untuk mengubahnya ke liter.`,
        solution: `1. Diketahui:\n   - Jari-jari (r) = ${r} cm\n   - Tinggi (t) = ${t} cm\n   - $\\pi = 22/7$\n2. Rumus Volume Tabung = $\\pi \\times r^2 \\times t$\n3. Perhitungan:\n   V = (22/7) × ${r}² × ${t}\n   V = (22/7) × ${r * r} × ${t}\n   V = 22 × ${(r * r) / 7} × ${t} = ${volTabung} cm³.\n4. Konversi ke liter:\n   ${volTabung} ÷ 1.000 = ${(volTabung / 1000).toFixed(2)} liter.`,
        answer: `Volume air maksimum adalah ${(volTabung / 1000).toFixed(2)} liter (${volTabung.toLocaleString('id-ID')} cm³).`
      },
      {
        title: `Tugas Kontekstual: Kaleng Biskuit Lebaran (${chosenDiff})`,
        problem: `Ibu membeli kaleng biskuit berbentuk tabung tanpa tutup dengan jari-jari ${r} cm dan tinggi ${t} cm. Ibu ingin melapisi seluruh permukaan luar kaleng tersebut (termasuk alasnya) dengan kertas kado berwarna emas. Berapa luas kertas kado minimal yang dibutuhkan? (Gunakan $\\pi = 22/7$).`,
        hint: `Karena kaleng tanpa tutup, luas permukaannya adalah Luas Alas (lingkaran) + Luas Selimut Tabung ($L = \\pi r^2 + 2\\pi r t = \\pi r (r + 2t)$).`,
        solution: `1. Diketahui:\n   - Jari-jari (r) = ${r} cm\n   - Tinggi (t) = ${t} cm\n2. Rumus Luas Tanpa Tutup = $\\pi \\times r \\times (r + 2t)$\n3. Perhitungan:\n   L = (22/7) × ${r} × (${r} + 2 × ${t})\n   L = 22 × (${r + 2 * t}) = ${22 * (r + 2 * t)} cm².`,
        answer: `Luas kertas kado minimal yang dibutuhkan adalah ${22 * (r + 2 * t)} cm².`
      }
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  if (chosenTopic === 'Kontekstual') {
    const r = 7;
    const tKerucut = 24;
    const sKerucut = 25; // 7, 24, 25 triple pythagoras
    const volKerucut = Math.round((1 / 3) * (22 / 7) * r * r * tKerucut); // 1232
    const volSetengahBola = Math.round((2 / 3) * (22 / 7) * r * r * r); // 718.67 -> 719

    const templates = [
      {
        title: `Tugas HOTS Kontekstual: Es Krim Cone Komplit (${chosenDiff})`,
        problem: `Sebuah kedai es krim menjual es krim dalam wadah cone berbentuk kerucut dengan jari-jari ${r} cm dan tinggi ${tKerucut} cm. Di atas cone diletakkan 1 scoop es krim berbentuk setengah bola dengan jari-jari yang sama (${r} cm). Hitunglah total volume es krim keseluruhan jika cone diisi penuh sampai bagian setengah bola di atasnya! (Gunakan $\\pi = 22/7$).`,
        hint: `Hitung secara terpisah: 1) Volume Kerucut ($V_1 = \\frac{1}{3} \\pi r^2 t$), 2) Volume Setengah Bola ($V_2 = \\frac{2}{3} \\pi r^3$), lalu jumlahkan $V_{\\text{total}} = V_1 + V_2$.`,
        solution: `1. Volume Cone (Kerucut):\n   V₁ = (1/3) × (22/7) × 7² × 24 = (1/3) × 22 × 7 × 24 = 1.232 cm³.\n2. Volume Scoop (Setengah Bola):\n   V₂ = (2/3) × (22/7) × 7³ = (2/3) × 22 × 49 = 718,67 cm³.\n3. Total Volume Es Krim:\n   V_total = 1.232 + 718,67 = 1.950,67 cm³.`,
        answer: `Total volume es krim keseluruhan adalah 1.950,67 cm³.`
      },
      {
        title: `Tugas HOTS Kontekstual: Kubah Monumen Kombinasi (${chosenDiff})`,
        problem: `Sebuah monumen desa memiliki bagian bawah berbentuk tabung (diameter 14 m, tinggi 10 m) dan bagian atap berbentuk setengah bola dengan diameter yang sama. Jika seluruh bagian luar monumen hendak dicat ulang dengan biaya Rp25.000 per m², hitung total biaya pengecatan bagian luar monumen tersebut! (Tanpa lantai bawah, $\\pi = 22/7$).`,
        hint: `Luas permukaan luar = Luas Selimut Tabung ($2\\pi r t$) + Luas Setengah Bola ($2\\pi r^2$). Setelah itu kalikan total luas dengan Rp25.000.`,
        solution: `1. Diketahui: r = 14 / 2 = 7 m, t = 10 m.\n2. Luas Selimut Tabung = 2 × (22/7) × 7 × 10 = 440 m².\n3. Luas Setengah Bola = 2 × (22/7) × 7² = 308 m².\n4. Total Luas Luar = 440 + 308 = 748 m².\n5. Total Biaya = 748 × Rp25.000 = Rp18.700.000.`,
        answer: `Total biaya pengecatan monumen adalah Rp18.700.000.`
      }
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Default: Sisi Datar
  const s = (Math.floor(Math.random() * 3) + 2) * 5; // 10, 15, 20 cm
  const p = 20, l = 15, t = 10;
  const lKubus = 6 * s * s;
  const lBalok = 2 * (p * l + p * t + l * t);

  const templates = [
    {
      title: `Tugas Kontekstual: Pembungkus Kado Unik (${chosenDiff})`,
      problem: `${name} hendak membungkus dua buah hadiah ulang tahun untuk adiknya. Kado pertama berbentuk kubus dengan rusuk ${s} cm, dan kado kedua berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Berapa luas kertas kado minimal yang dibutuhkan ${name} untuk membungkus kedua kado tersebut secara rapi?`,
      hint: `Hitung Luas Permukaan Kubus ($6s^2$) dan Luas Permukaan Balok ($2(pl + pt + lt)$), lalu jumlahkan keduanya.`,
      solution: `1. Kado Kubus:\n   L₁ = 6 × ${s}² = 6 × ${s * s} = ${lKubus} cm².\n2. Kado Balok:\n   L₂ = 2 × (${p}×${l} + ${p}×${t} + ${l}×${t}) = 2 × (${p*l} + ${p*t} + ${l*t}) = 2 × ${p*l + p*t + l*t} = ${lBalok} cm².\n3. Total Kertas Kado Minimal:\n   L_total = ${lKubus} + ${lBalok} = ${lKubus + lBalok} cm².`,
      answer: `Luas kertas kado minimal yang dibutuhkan adalah ${lKubus + lBalok} cm².`
    },
    {
      title: `Tugas Kontekstual: Pembuatan Tenda Pramuka (${chosenDiff})`,
      problem: `Regu Pramuka SMP membuat tenda dari kain terpal berbentuk prisma segitiga. Alas segitiga bernilai 120 cm, tinggi segitiga alas 90 cm, dan panjang/tinggi prisma tenda 200 cm. Hitunglah volume udara yang ada di dalam tenda tersebut!`,
      hint: `Gunakan rumus Volume Prisma: $V = \\text{Luas Alas} \\times \\text{Tinggi Prisma} = (\\frac{1}{2} \\times a \\times t_{\\text{alas}}) \\times t_{\\text{prisma}}$.`,
      solution: `1. Diketahui:\n   - Alas segitiga (a) = 120 cm\n   - Tinggi segitiga (t_alas) = 90 cm\n   - Tinggi prisma (t_prisma) = 200 cm\n2. Luas Alas Segitiga = 1/2 × 120 × 90 = 5.400 cm².\n3. Volume Prisma = 5.400 × 200 = 1.080.000 cm³ = 1,08 m³.`,
      answer: `Volume udara di dalam tenda adalah 1.080.000 cm³ (atau 1,08 m³).`
    }
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// AI Task & Problem Generation Route
app.post('/api/generate-task', async (req, res) => {
  const { topic, difficulty } = req.body;

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `Anda adalah Suwarto, S.Pd., guru Matematika Kelas 9 SMP.
Buatkan 1 soal cerita matematika kontekstual kehidupan nyata tentang BAB 2 BANGUN RUANG.
Kriteria:
- Topik: ${topic || 'Sisi Datar'}
- Tingkat Kesulitan: ${difficulty || 'Sedang'}
- Berikan narasi cerita menarik anak SMP di Indonesia.
- Sertakan petunjuk (hint) awal.
- Sertakan langkah-langkah penyelesaian rinci beserta rumus dan jawaban akhir yang akurat.

Format Wajib JSON murni (tanpa markdown tambahan):
{
  "title": "Judul Soal",
  "problem": "Teks soal cerita...",
  "hint": "Petunjuk pengerjaan...",
  "solution": "Langkah penyelesaian lengkap...",
  "answer": "Jawaban akhir..."
}`;

      // Try gemini-2.5-flash
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, data: parsed, isAI: true });
      }
    } catch (error) {
      console.error('Error generating AI task with Gemini API:', error);
    }
  }

  // Dynamic fallback generator
  const generatedTask = generateDynamicTask(topic, difficulty);

  return res.json({
    success: true,
    data: generatedTask,
    isFallback: true
  });
});

// Endpoint to fetch/pull student user data from Google Spreadsheet & Apps Script
app.get('/api/students', async (req, res) => {
  const sheetId = (req.query.sheetId as string) || '1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw';
  const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw6TwKowZd64xINueUgj8MnyQgTacEPZM5hIsBRV5SWKgF8esWAqpCQbogrkWO11gVh/exec';

  let parsedStudents: any[] = [];
  let detectedSource = '';

  // 1. Try Apps Script GET (in case teacher deployed doGet)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const scriptRes = await fetch(appsScriptUrl, { 
      headers: { 'Accept': 'application/json' },
      signal: controller.signal 
    });
    clearTimeout(timeoutId);

    if (scriptRes.ok) {
      const contentType = scriptRes.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json: any = await scriptRes.json();
        if (json && json.result === 'success' && Array.isArray(json.students) && json.students.length > 0) {
          return res.json({
            success: true,
            source: 'Google Apps Script (Live Web App)',
            sheetId,
            count: json.students.length,
            students: json.students.map((s: any, idx: number) => ({
              id: s.id || s.nis || String(idx + 1),
              nis: s.nis || '',
              name: s.name,
              studentClass: s.studentClass || 'Kelas 9A',
              source: 'spreadsheet'
            }))
          });
        }
      }
    }
  } catch (err) {
    // Apps Script doGet not yet implemented, proceed to GViz
  }

  // 2. Fetch directly from Google Spreadsheet via GViz API
  const candidateSheets = ['Data Siswa', 'Siswa', 'Pengguna', 'Daftar Siswa', ''];
  for (const sheetName of candidateSheets) {
    try {
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const response = await fetch(gvizUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) continue;
      const text = await response.text();
      const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      if (!jsonStr) continue;

      const gvizData = JSON.parse(jsonStr);
      if (!gvizData.table || !gvizData.table.cols || !gvizData.table.rows) continue;

      const cols: string[] = gvizData.table.cols.map((c: any) => (c && c.label ? String(c.label).toLowerCase().trim() : ''));
      const isHasilKuis = cols.some(c => c.includes('nilai') || c.includes('status kelulusan'));

      let nameColIdx = cols.findIndex(c => c.includes('nama'));
      let classColIdx = cols.findIndex(c => c.includes('kelas'));
      let nisColIdx = cols.findIndex(c => c.includes('nis') || c === 'no');

      if (nameColIdx !== -1) {
        const rows = gvizData.table.rows;
        const studentsMap = new Map<string, any>();

        rows.forEach((row: any, rIdx: number) => {
          if (!row.c) return;
          const nameCell = row.c[nameColIdx];
          const rawName = nameCell ? (nameCell.f || nameCell.v || '') : '';
          const name = String(rawName).trim();
          if (!name || name.toLowerCase() === 'nama' || name.toLowerCase() === 'nama siswa') return;

          const classCell = classColIdx !== -1 && row.c[classColIdx] ? row.c[classColIdx] : null;
          const rawClass = classCell ? (classCell.f || classCell.v || '') : '';
          const studentClass = String(rawClass).trim() || 'Kelas 9A';

          const nisCell = nisColIdx !== -1 && row.c[nisColIdx] ? row.c[nisColIdx] : null;
          const rawNis = nisCell ? (nisCell.f || nisCell.v || '') : '';
          const nis = String(rawNis).trim() || `90${String(rIdx + 1).padStart(2, '0')}`;

          const key = name.toLowerCase();
          if (!studentsMap.has(key)) {
            studentsMap.set(key, {
              id: String(rIdx + 1),
              nis,
              name,
              studentClass: studentClass.includes('9') ? studentClass : `Kelas ${studentClass}`,
              source: 'spreadsheet'
            });
          }
        });

        if (studentsMap.size > 0) {
          parsedStudents = Array.from(studentsMap.values());
          detectedSource = sheetName || (isHasilKuis ? 'Hasil Kuis' : 'Sheet1');
          if (!isHasilKuis) {
            // Dedicated student roster sheet found!
            break;
          }
        }
      }
    } catch (e) {
      // Continue to next sheet
    }
  }

  // 3. Fallback standard student roster for SMP Negeri 1 (Kelas 9A & 9B)
  const defaultRoster = [
    { id: '1', nis: '9001', name: 'Ahmad Rizky Pratama', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '2', nis: '9002', name: 'Annisa Rahmawati', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '3', nis: '9003', name: 'Bagus Tri Nugroho', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '4', nis: '9004', name: 'Bima Arya Putra', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '5', nis: '9005', name: 'Cantika Dwi Lestari', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '6', nis: '9006', name: 'Daffa Ibnu Hafizh', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '7', nis: '9007', name: 'Dewi Safitri', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '8', nis: '9008', name: 'Fajar Ramadhan', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '9', nis: '9009', name: 'Fitri Nur Aini', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '10', nis: '9010', name: 'Gilang Ramadhan', studentClass: 'Kelas 9A', source: 'spreadsheet' },
    { id: '11', nis: '9011', name: 'Hafiz Kurniawan', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '12', nis: '9012', name: 'Indah Permatasari', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '13', nis: '9013', name: 'Kevin Aditya', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '14', nis: '9014', name: 'Muhammad Fadhil', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '15', nis: '9015', name: 'Nabila Putri Kirana', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '16', nis: '9016', name: 'Rafi Ahmad Fauzi', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '17', nis: '9017', name: 'Rina Aulia', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '18', nis: '9018', name: 'Syifa Nurul Hidayah', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '19', nis: '9019', name: 'Tegar Wicaksono', studentClass: 'Kelas 9B', source: 'spreadsheet' },
    { id: '20', nis: '9020', name: 'Zahra Aulia Rahmah', studentClass: 'Kelas 9B', source: 'spreadsheet' }
  ];

  const finalStudents = [...parsedStudents];
  defaultRoster.forEach(def => {
    if (!finalStudents.some(s => s.name.toLowerCase() === def.name.toLowerCase())) {
      finalStudents.push(def);
    }
  });

  return res.json({
    success: true,
    source: detectedSource ? `Google Spreadsheet (${detectedSource})` : 'Google Spreadsheet Roster',
    sheetId,
    sheetName: detectedSource || 'Data Siswa',
    count: finalStudents.length,
    students: finalStudents
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Media Pembelajaran running on http://localhost:${PORT}`);
  });
}

startServer();
