export interface HealthRecord {
  id: string; // รหัสบุคคล เช่น H0001
  screeningDate: string; // วันที่คัดกรอง
  zone: 'เมือง' | 'เหนือ' | 'ตะวันออก' | 'ตะวันตก' | 'ใต้' | string; // พื้นที่
  gender: 'หญิง' | 'ชาย' | string; // เพศ
  age: number; // อายุ
  heightCm: number; // ส่วนสูง cm
  weightKg: number; // น้ำหนัก kg
  bmi: number; // BMI
  sbpMmHg: number; // SBP mmHg
  dbpMmHg: number; // DBP mmHg
  pulseBpm: number; // ชีพจร bpm
  glucoseMgDl: number; // น้ำตาล mg/dL
  smoking: 'สูบ' | 'ไม่สูบ' | string; // สูบบุหรี่
  alcohol: 'ดื่ม' | 'ไม่ดื่ม' | string; // ดื่มแอลกอฮอล์
  exercise: 'สม่ำเสมอ' | 'บางครั้ง' | 'ไม่ออกกำลังกาย' | string; // การออกกำลังกาย
  diabetesRisk: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง' | string; // เบาหวาน_คัดกรอง
  htRisk: 'ไม่มี' | 'มีแนวโน้ม/เสี่ยง' | string; // ความดันโลหิตสูง_คัดกรอง
  riskScore: number; // คะแนนความเสี่ยง 0-7
  riskLevel: 'ต่ำ' | 'ปานกลาง' | 'สูง' | string; // ระดับความเสี่ยง
  month: string; // เดือน เช่น 2026-01
}

export interface FilterState {
  zone: string;
  gender: string;
  riskLevel: string;
  month: string;
  smoking: string;
  alcohol: string;
  exercise: string;
  ageGroup: string; // 'all' | '<30' | '30-45' | '46-60' | '>60'
  searchQuery: string;
}

export type ActiveTab = 'overview' | 'risks_trends' | 'behaviors_insights' | 'table';

export interface KPIData {
  totalCount: number;
  avgBmi: number;
  minBmi: number;
  maxBmi: number;
  avgSbp: number;
  minSbp: number;
  maxSbp: number;
  avgDbp: number;
  avgGlucose: number;
  minGlucose: number;
  maxGlucose: number;
  highRiskCount: number;
  highRiskPct: number;
  diabetesRiskCount: number;
  diabetesRiskPct: number;
  htRiskCount: number;
  htRiskPct: number;
  nonExerciseCount: number;
  nonExercisePct: number;
  smokerCount: number;
  smokerPct: number;
  drinkerCount: number;
  drinkerPct: number;
}
