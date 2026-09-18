// Vercel Serverless Function handler for /api/students
export default async function handler(req: any, res: any) {
  // Enable CORS for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sheetId = (req.query?.sheetId as string) || '1puAok0spjyAdD8u9JsLAWjBrvths2U-mf96jh1mb6Rw';
  const customScriptUrl = (req.query?.scriptUrl as string) || '';
  const appsScriptUrl = customScriptUrl.trim() || 'https://script.google.com/macros/s/AKfycbz694-SeakzEIG3H3sY2mCQ7NP47yle10Mz27pMODtQoXrDTV8h93C6fI1EnWHBw73S/exec';

  // 1. Try Apps Script GET (live web app doGet)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);
    const scriptRes = await fetch(appsScriptUrl, {
      headers: { 'Accept': 'application/json' },
      redirect: 'follow',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (scriptRes.ok) {
      const contentType = scriptRes.headers.get('content-type') || '';
      if (contentType.includes('application/json') || contentType.includes('text/plain')) {
        const json: any = await scriptRes.json();
        const studentList = Array.isArray(json)
          ? json
          : (json && (json.students || json.data || json.users));
        if (Array.isArray(studentList) && studentList.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'Google Apps Script (Live Web App)',
            sheetId,
            scriptUrl: appsScriptUrl,
            count: studentList.length,
            students: studentList.map((s: any, idx: number) => ({
              id: s.id || s.nis || String(idx + 1),
              nis: s.nis || '',
              name: s.name || s.nama || s.Nama || '',
              studentClass: s.studentClass || s.kelas || s.Kelas || 'Kelas 9A',
              source: 'spreadsheet'
            }))
          });
        }
      }
    }
  } catch (err) {
    console.warn('Vercel API Apps Script warning:', err);
  }

  // 2. Fetch directly from Google Spreadsheet via GViz API
  const candidateSheets = ['Data Siswa', 'Siswa', 'Pengguna', 'Daftar Siswa', ''];
  for (const sheetName of candidateSheets) {
    try {
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(gvizUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) continue;
      const text = await response.text();
      const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      if (!jsonStr) continue;

      const gvizData = JSON.parse(jsonStr);
      if (!gvizData.table || !gvizData.table.cols || !gvizData.table.rows) continue;

      const cols: string[] = gvizData.table.cols.map((c: any) => (c && c.label ? String(c.label).toLowerCase().trim() : ''));
      let nameColIdx = cols.findIndex(c => c.includes('nama'));
      let classColIdx = cols.findIndex(c => c.includes('kelas'));
      let nisColIdx = cols.findIndex(c => c.includes('nis'));

      if (nameColIdx === -1 && gvizData.table.cols.length >= 3) {
        nameColIdx = 2; // Column C in standard roster
        classColIdx = 3; // Column D in standard roster
        nisColIdx = 1; // Column B in standard roster
      }

      if (nameColIdx !== -1) {
        const rows = gvizData.table.rows;
        const students: any[] = [];

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

          students.push({
            id: String(rIdx + 1),
            nis,
            name,
            studentClass: studentClass.includes('9') ? studentClass : `Kelas ${studentClass}`,
            source: 'spreadsheet'
          });
        });

        if (students.length > 0) {
          return res.status(200).json({
            success: true,
            source: `Google Spreadsheet (${sheetName || 'Data Siswa'})`,
            sheetId,
            sheetName: sheetName || 'Data Siswa',
            count: students.length,
            students
          });
        }
      }
    } catch (e) {
      // Continue
    }
  }

  return res.status(500).json({
    success: false,
    message: 'Unable to fetch students from Apps Script or Spreadsheet'
  });
}
