import { HealthRecord } from '../types';

export const INITIAL_RECORDS: HealthRecord[] = [
  { id: "H0001", screeningDate: "3/1/2026", zone: "เมือง", gender: "หญิง", age: 24, heightCm: 158, weightKg: 52, bmi: 20.8, sbpMmHg: 112, dbpMmHg: 72, pulseBpm: 76, glucoseMgDl: 91, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-01" },
  { id: "H0002", screeningDate: "5/1/2026", zone: "เหนือ", gender: "ชาย", age: 45, heightCm: 170, weightKg: 78, bmi: 27.0, sbpMmHg: 138, dbpMmHg: 88, pulseBpm: 82, glucoseMgDl: 118, smoking: "สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-01" },
  { id: "H0003", screeningDate: "8/1/2026", zone: "ตะวันออก", gender: "หญิง", age: 63, heightCm: 155, weightKg: 69, bmi: 28.7, sbpMmHg: 151, dbpMmHg: 94, pulseBpm: 86, glucoseMgDl: 142, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 6, riskLevel: "สูง", month: "2026-01" },
  { id: "H0004", screeningDate: "11/1/2026", zone: "ตะวันตก", gender: "ชาย", age: 37, heightCm: 175, weightKg: 70, bmi: 22.9, sbpMmHg: 121, dbpMmHg: 78, pulseBpm: 74, glucoseMgDl: 97, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-01" },
  { id: "H0005", screeningDate: "14/1/2026", zone: "ใต้", gender: "หญิง", age: 52, heightCm: 160, weightKg: 74, bmi: 28.9, sbpMmHg: 146, dbpMmHg: 92, pulseBpm: 88, glucoseMgDl: 131, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 5, riskLevel: "สูง", month: "2026-01" },
  { id: "H0006", screeningDate: "17/1/2026", zone: "เมือง", gender: "ชาย", age: 29, heightCm: 168, weightKg: 63, bmi: 22.3, sbpMmHg: 117, dbpMmHg: 76, pulseBpm: 80, glucoseMgDl: 89, smoking: "สูบ", alcohol: "ไม่ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 1, riskLevel: "ต่ำ", month: "2026-01" },
  { id: "H0007", screeningDate: "20/1/2026", zone: "เหนือ", gender: "หญิง", age: 41, heightCm: 162, weightKg: 67, bmi: 25.5, sbpMmHg: 129, dbpMmHg: 84, pulseBpm: 79, glucoseMgDl: 108, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 1, riskLevel: "ต่ำ", month: "2026-01" },
  { id: "H0008", screeningDate: "23/1/2026", zone: "ตะวันออก", gender: "ชาย", age: 68, heightCm: 165, weightKg: 82, bmi: 30.1, sbpMmHg: 158, dbpMmHg: 98, pulseBpm: 91, glucoseMgDl: 154, smoking: "สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 7, riskLevel: "สูง", month: "2026-01" },
  { id: "H0009", screeningDate: "26/1/2026", zone: "ตะวันตก", gender: "หญิง", age: 56, heightCm: 157, weightKg: 61, bmi: 24.7, sbpMmHg: 134, dbpMmHg: 86, pulseBpm: 83, glucoseMgDl: 113, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 1, riskLevel: "ต่ำ", month: "2026-01" },
  { id: "H0010", screeningDate: "29/1/2026", zone: "ใต้", gender: "ชาย", age: 48, heightCm: 172, weightKg: 86, bmi: 29.1, sbpMmHg: 143, dbpMmHg: 91, pulseBpm: 87, glucoseMgDl: 126, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 4, riskLevel: "สูง", month: "2026-01" },
  { id: "H0011", screeningDate: "2/2/2026", zone: "เมือง", gender: "หญิง", age: 33, heightCm: 161, weightKg: 58, bmi: 22.4, sbpMmHg: 118, dbpMmHg: 75, pulseBpm: 77, glucoseMgDl: 94, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-02" },
  { id: "H0012", screeningDate: "5/2/2026", zone: "เหนือ", gender: "ชาย", age: 59, heightCm: 169, weightKg: 81, bmi: 28.4, sbpMmHg: 148, dbpMmHg: 93, pulseBpm: 89, glucoseMgDl: 137, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 5, riskLevel: "สูง", month: "2026-02" },
  { id: "H0013", screeningDate: "8/2/2026", zone: "ตะวันออก", gender: "หญิง", age: 27, heightCm: 154, weightKg: 55, bmi: 23.2, sbpMmHg: 109, dbpMmHg: 70, pulseBpm: 72, glucoseMgDl: 87, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-02" },
  { id: "H0014", screeningDate: "11/2/2026", zone: "ตะวันตก", gender: "ชาย", age: 51, heightCm: 178, weightKg: 92, bmi: 29.0, sbpMmHg: 141, dbpMmHg: 89, pulseBpm: 84, glucoseMgDl: 124, smoking: "สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "ไม่มี", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 4, riskLevel: "สูง", month: "2026-02" },
  { id: "H0015", screeningDate: "14/2/2026", zone: "ใต้", gender: "หญิง", age: 46, heightCm: 159, weightKg: 72, bmi: 28.5, sbpMmHg: 136, dbpMmHg: 87, pulseBpm: 81, glucoseMgDl: 116, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-02" },
  { id: "H0016", screeningDate: "17/2/2026", zone: "เมือง", gender: "ชาย", age: 22, heightCm: 173, weightKg: 64, bmi: 21.4, sbpMmHg: 110, dbpMmHg: 68, pulseBpm: 75, glucoseMgDl: 83, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-02" },
  { id: "H0017", screeningDate: "20/2/2026", zone: "เหนือ", gender: "หญิง", age: 65, heightCm: 156, weightKg: 76, bmi: 31.2, sbpMmHg: 155, dbpMmHg: 96, pulseBpm: 92, glucoseMgDl: 149, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 6, riskLevel: "สูง", month: "2026-02" },
  { id: "H0018", screeningDate: "23/2/2026", zone: "ตะวันออก", gender: "ชาย", age: 39, heightCm: 171, weightKg: 75, bmi: 25.6, sbpMmHg: 127, dbpMmHg: 82, pulseBpm: 79, glucoseMgDl: 103, smoking: "สูบ", alcohol: "ไม่ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-02" },
  { id: "H0019", screeningDate: "26/2/2026", zone: "ตะวันตก", gender: "หญิง", age: 58, heightCm: 163, weightKg: 70, bmi: 26.3, sbpMmHg: 139, dbpMmHg: 89, pulseBpm: 85, glucoseMgDl: 121, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-02" },
  { id: "H0020", screeningDate: "1/3/2026", zone: "ใต้", gender: "ชาย", age: 67, heightCm: 166, weightKg: 88, bmi: 31.9, sbpMmHg: 162, dbpMmHg: 101, pulseBpm: 94, glucoseMgDl: 161, smoking: "สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 7, riskLevel: "สูง", month: "2026-03" },
  { id: "H0021", screeningDate: "4/3/2026", zone: "เมือง", gender: "หญิง", age: 35, heightCm: 160, weightKg: 63, bmi: 24.6, sbpMmHg: 122, dbpMmHg: 79, pulseBpm: 76, glucoseMgDl: 99, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-03" },
  { id: "H0022", screeningDate: "7/3/2026", zone: "เหนือ", gender: "ชาย", age: 43, heightCm: 174, weightKg: 83, bmi: 27.4, sbpMmHg: 135, dbpMmHg: 86, pulseBpm: 82, glucoseMgDl: 111, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-03" },
  { id: "H0023", screeningDate: "10/3/2026", zone: "ตะวันออก", gender: "หญิง", age: 61, heightCm: 152, weightKg: 68, bmi: 29.4, sbpMmHg: 149, dbpMmHg: 94, pulseBpm: 88, glucoseMgDl: 139, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 5, riskLevel: "สูง", month: "2026-03" },
  { id: "H0024", screeningDate: "13/3/2026", zone: "ตะวันตก", gender: "ชาย", age: 31, heightCm: 180, weightKg: 79, bmi: 24.4, sbpMmHg: 116, dbpMmHg: 74, pulseBpm: 78, glucoseMgDl: 92, smoking: "สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 1, riskLevel: "ต่ำ", month: "2026-03" },
  { id: "H0025", screeningDate: "16/3/2026", zone: "ใต้", gender: "หญิง", age: 49, heightCm: 158, weightKg: 78, bmi: 31.2, sbpMmHg: 145, dbpMmHg: 91, pulseBpm: 86, glucoseMgDl: 128, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 5, riskLevel: "สูง", month: "2026-03" },
  { id: "H0026", screeningDate: "19/3/2026", zone: "เมือง", gender: "ชาย", age: 26, heightCm: 169, weightKg: 67, bmi: 23.5, sbpMmHg: 114, dbpMmHg: 72, pulseBpm: 74, glucoseMgDl: 88, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-03" },
  { id: "H0027", screeningDate: "22/3/2026", zone: "เหนือ", gender: "หญิง", age: 54, heightCm: 164, weightKg: 73, bmi: 27.1, sbpMmHg: 137, dbpMmHg: 88, pulseBpm: 83, glucoseMgDl: 117, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 2, riskLevel: "ปานกลาง", month: "2026-03" },
  { id: "H0028", screeningDate: "25/3/2026", zone: "ตะวันออก", gender: "ชาย", age: 64, heightCm: 167, weightKg: 85, bmi: 30.5, sbpMmHg: 153, dbpMmHg: 97, pulseBpm: 90, glucoseMgDl: 145, smoking: "สูบ", alcohol: "ดื่ม", exercise: "ไม่ออกกำลังกาย", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 7, riskLevel: "สูง", month: "2026-03" },
  { id: "H0029", screeningDate: "28/3/2026", zone: "ตะวันตก", gender: "หญิง", age: 40, heightCm: 157, weightKg: 60, bmi: 24.3, sbpMmHg: 124, dbpMmHg: 80, pulseBpm: 77, glucoseMgDl: 101, smoking: "ไม่สูบ", alcohol: "ไม่ดื่ม", exercise: "สม่ำเสมอ", diabetesRisk: "ไม่มี", htRisk: "ไม่มี", riskScore: 0, riskLevel: "ต่ำ", month: "2026-03" },
  { id: "H0030", screeningDate: "31/3/2026", zone: "ใต้", gender: "ชาย", age: 57, heightCm: 172, weightKg: 89, bmi: 30.1, sbpMmHg: 147, dbpMmHg: 92, pulseBpm: 87, glucoseMgDl: 133, smoking: "ไม่สูบ", alcohol: "ดื่ม", exercise: "บางครั้ง", diabetesRisk: "มีแนวโน้ม/เสี่ยง", htRisk: "มีแนวโน้ม/เสี่ยง", riskScore: 5, riskLevel: "สูง", month: "2026-03" }
];

// Internal Sheet ID only - Note: per instruction, DO NOT display this link in UI
const GOOGLE_SHEET_ID = "1fQanAGEKh9nfW6eysb0b4eY-7ldTSqLezFhsIrw6EqI";

export async function fetchGoogleSheetData(): Promise<HealthRecord[]> {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const text = await response.text();
    const rows = parseCSV(text);
    if (rows.length < 2) return INITIAL_RECORDS;

    const records: HealthRecord[] = [];
    // Header is row 0
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r[0] || !r[0].trim()) continue;
      records.push({
        id: r[0].trim(),
        screeningDate: r[1]?.trim() || '',
        zone: r[2]?.trim() || 'เมือง',
        gender: r[3]?.trim() || 'ชาย',
        age: parseFloat(r[4]) || 0,
        heightCm: parseFloat(r[5]) || 0,
        weightKg: parseFloat(r[6]) || 0,
        bmi: parseFloat(r[7]) || 0,
        sbpMmHg: parseFloat(r[8]) || 0,
        dbpMmHg: parseFloat(r[9]) || 0,
        pulseBpm: parseFloat(r[10]) || 0,
        glucoseMgDl: parseFloat(r[11]) || 0,
        smoking: r[12]?.trim() || 'ไม่สูบ',
        alcohol: r[13]?.trim() || 'ไม่ดื่ม',
        exercise: r[14]?.trim() || 'บางครั้ง',
        diabetesRisk: r[15]?.trim() || 'ไม่มี',
        htRisk: r[16]?.trim() || 'ไม่มี',
        riskScore: parseFloat(r[17]) || 0,
        riskLevel: r[18]?.trim() || 'ต่ำ',
        month: r[19]?.trim() || ''
      });
    }
    return records.length > 0 ? records : INITIAL_RECORDS;
  } catch (error) {
    console.warn("Using offline snapshot due to network restriction:", error);
    return INITIAL_RECORDS;
  }
}

function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/);
  const result: string[][] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let inQuotes = false;
    let current = '';
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current);
    result.push(row);
  }
  return result;
}
