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

// AI Task & Problem Generation Route
app.post('/api/generate-task', async (req, res) => {
  const { topic, difficulty, promptText } = req.body;

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `Anda adalah Suwarto, S.Pd., guru Matematika Kelas 9 SMP. Buatkan 1 soal cerita matematika konteks kehidupan nyata tentang BAB 2 BANGUN RUANG (Topik: ${topic || 'Umum'}, Tingkat Kesulitan: ${difficulty || 'Sedang'}). 
Sertakan:
1. Soal Cerita Kontekstual yang menarik
2. Petunjuk (Hint) awal untuk membantu siswa
3. Langkah-langkah penyelesaian lengkap beserta rumus dan jawaban akhir
Format jawaban dalam JSON rapi:
{
  "title": "Judul Soal",
  "problem": "Teks soal cerita...",
  "hint": "Petunjuk pengerjaan...",
  "solution": "Langkah penyelesaian lengkap...",
  "answer": "Jawaban akhir..."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      // Try parsing JSON from AI output
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, data: parsed });
      } else {
        return res.json({
          success: true,
          data: {
            title: `Tugas Interaktif: ${topic || 'Bangun Ruang'}`,
            problem: responseText,
            hint: 'Gunakan rumus luas permukaan atau volume yang sesuai dengan bentuk bangun ruang pada soal.',
            solution: 'Perhatikan komponen-komponen yang diketahui (panjang, lebar, tinggi, jari-jari) lalu masukkan ke rumus.',
            answer: 'Silakan periksa perhitungan Anda.'
          }
        });
      }
    } catch (error) {
      console.error('Error generating AI task:', error);
    }
  }

  // Fallback if AI key is missing or fails
  const fallbackTasks: Record<string, any[]> = {
    'Sisi Datar': [
      {
        title: 'Tugas Kontekstual: Kemasan Kado Ulang Tahun (Kubus & Balok)',
        problem: 'Budi ingin membungkus dua jenis hadiah ulang tahun. Hadiah pertama berbentuk kubus dengan panjang rusuk 15 cm. Hadiah kedua berbentuk balok dengan ukuran panjang 20 cm, lebar 12 cm, dan tinggi 10 cm. Jika kertas kado yang tersedia berukuran 60 cm x 40 cm, apakah kertas kado tersebut cukup untuk membungkus kedua hadiah itu? Berikan alasan perhitunganmu!',
        hint: 'Hitung Luas Permukaan Kubus ($6s^2$) dan Luas Permukaan Balok ($2(pl + pt + lt)$), lalu bandingkan dengan Luas Kertas Kado ($60 \\times 40$).',
        solution: '1. Luas Kado Kubus = 6 × 15² = 6 × 225 = 1.350 cm².\n2. Luas Kado Balok = 2 × (20×12 + 20×10 + 12×10) = 2 × (240 + 200 + 120) = 2 × 560 = 1.120 cm².\n3. Total Luas Diperlukan = 1.350 + 1.120 = 2.470 cm².\n4. Luas Kertas Kado = 60 × 40 = 2.400 cm².\nKarena 2.400 cm² < 2.470 cm², maka kertas kado TIDAK CUKUP (kurang 70 cm²).',
        answer: 'Kertas kado tidak cukup karena butuh 2.470 cm², sedangkan yang ada hanya 2.400 cm².'
      }
    ],
    'Sisi Lengkung': [
      {
        title: 'Tugas Kontekstual: Kapasitas Tangki Air Rumah Tangga (Tabung)',
        problem: 'Sebuah keluarga menggunakan tangki penampung air berbentuk tabung dengan diameter alas 1,4 meter dan tinggi 2 meter. Jika tangki terisi penuh air dan keluarga tersebut mengonsumsi rata-rata 308 liter air per hari, dalam berapa hari air di dalam tangki akan habis? (Gunakan $\\pi = 22/7$, catat: $1 m^3 = 1.000$ liter).',
        hint: 'Hitung Volume Tabung ($V = \\pi r^2 t$). Ingat jari-jari $r = d / 2 = 0,7$ meter. Konversikan $m^3$ ke liter dengan mengali 1.000, lalu bagi dengan konsumsi harian (308 liter/hari).',
        solution: '1. Jari-jari r = 1,4 / 2 = 0,7 m.\n2. Volume = (22/7) × (0,7)² × 2 = (22/7) × 0,49 × 2 = 22 × 0,07 × 2 = 3,08 m³.\n3. Konversi ke Liter = 3,08 × 1.000 = 3.080 liter.\n4. Durasi Air Habis = 3.080 / 308 = 10 hari.',
        answer: 'Air dalam tangki akan habis dalam waktu 10 hari.'
      }
    ]
  };

  const topicKey = (topic && fallbackTasks[topic]) ? topic : 'Sisi Datar';
  const selectedTask = fallbackTasks[topicKey][0];

  res.json({
    success: true,
    data: selectedTask,
    isFallback: true
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
