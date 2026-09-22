import { HealthRecord, KPIData } from '../types';

export function calculateKPIs(records: HealthRecord[]): KPIData {
  const totalCount = records.length;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      avgBmi: 0,
      minBmi: 0,
      maxBmi: 0,
      avgSbp: 0,
      minSbp: 0,
      maxSbp: 0,
      avgDbp: 0,
      avgGlucose: 0,
      minGlucose: 0,
      maxGlucose: 0,
      highRiskCount: 0,
      highRiskPct: 0,
      diabetesRiskCount: 0,
      diabetesRiskPct: 0,
      htRiskCount: 0,
      htRiskPct: 0,
      nonExerciseCount: 0,
      nonExercisePct: 0,
      smokerCount: 0,
      smokerPct: 0,
      drinkerCount: 0,
      drinkerPct: 0,
    };
  }

  const bmis = records.map(r => r.bmi);
  const sbps = records.map(r => r.sbpMmHg);
  const dbps = records.map(r => r.dbpMmHg);
  const glucoses = records.map(r => r.glucoseMgDl);

  const sumBmi = bmis.reduce((a, b) => a + b, 0);
  const sumSbp = sbps.reduce((a, b) => a + b, 0);
  const sumDbp = dbps.reduce((a, b) => a + b, 0);
  const sumGlucose = glucoses.reduce((a, b) => a + b, 0);

  const highRiskCount = records.filter(r => r.riskLevel === 'สูง').length;
  const diabetesRiskCount = records.filter(r => r.diabetesRisk === 'มีแนวโน้ม/เสี่ยง').length;
  const htRiskCount = records.filter(r => r.htRisk === 'มีแนวโน้ม/เสี่ยง').length;
  const nonExerciseCount = records.filter(r => r.exercise === 'ไม่ออกกำลังกาย').length;
  const smokerCount = records.filter(r => r.smoking === 'สูบ').length;
  const drinkerCount = records.filter(r => r.alcohol === 'ดื่ม').length;

  return {
    totalCount,
    avgBmi: Number((sumBmi / totalCount).toFixed(1)),
    minBmi: Math.min(...bmis),
    maxBmi: Math.max(...bmis),
    avgSbp: Number((sumSbp / totalCount).toFixed(1)),
    minSbp: Math.min(...sbps),
    maxSbp: Math.max(...sbps),
    avgDbp: Number((sumDbp / totalCount).toFixed(1)),
    avgGlucose: Number((sumGlucose / totalCount).toFixed(1)),
    minGlucose: Math.min(...glucoses),
    maxGlucose: Math.max(...glucoses),
    highRiskCount,
    highRiskPct: Number(((highRiskCount / totalCount) * 100).toFixed(1)),
    diabetesRiskCount,
    diabetesRiskPct: Number(((diabetesRiskCount / totalCount) * 100).toFixed(1)),
    htRiskCount,
    htRiskPct: Number(((htRiskCount / totalCount) * 100).toFixed(1)),
    nonExerciseCount,
    nonExercisePct: Number(((nonExerciseCount / totalCount) * 100).toFixed(1)),
    smokerCount,
    smokerPct: Number(((smokerCount / totalCount) * 100).toFixed(1)),
    drinkerCount,
    drinkerPct: Number(((drinkerCount / totalCount) * 100).toFixed(1)),
  };
}

export function getMonthlyTrend(records: HealthRecord[]) {
  const months = ['2026-01', '2026-02', '2026-03'];
  return months.map(m => {
    const list = records.filter(r => r.month === m);
    const count = list.length;
    if (count === 0) {
      return {
        month: m,
        monthLabel: m === '2026-01' ? 'ม.ค. 2569' : m === '2026-02' ? 'ก.พ. 2569' : 'มี.ค. 2569',
        avgGlucose: 0,
        avgSbp: 0,
        avgDbp: 0,
        highRiskCount: 0,
        total: 0,
        highRiskPct: 0
      };
    }
    const avgGlucose = Number((list.reduce((s, r) => s + r.glucoseMgDl, 0) / count).toFixed(1));
    const avgSbp = Number((list.reduce((s, r) => s + r.sbpMmHg, 0) / count).toFixed(1));
    const avgDbp = Number((list.reduce((s, r) => s + r.dbpMmHg, 0) / count).toFixed(1));
    const highRiskCount = list.filter(r => r.riskLevel === 'สูง').length;
    return {
      month: m,
      monthLabel: m === '2026-01' ? 'ม.ค. 2569' : m === '2026-02' ? 'ก.พ. 2569' : 'มี.ค. 2569',
      avgGlucose,
      avgSbp,
      avgDbp,
      highRiskCount,
      total: count,
      highRiskPct: Number(((highRiskCount / count) * 100).toFixed(1))
    };
  });
}

export function getAgeRiskDistribution(records: HealthRecord[]) {
  const groups = [
    { label: '< 30 ปี (วัยหนุ่มสาว)', min: 0, max: 29 },
    { label: '30 - 45 ปี (วัยทำงาน)', min: 30, max: 45 },
    { label: '46 - 59 ปี (วัยกลางคน)', min: 46, max: 59 },
    { label: '≥ 60 ปี (ผู้สูงอายุ)', min: 60, max: 120 },
  ];

  return groups.map(g => {
    const filtered = records.filter(r => r.age >= g.min && r.age <= g.max);
    const total = filtered.length;
    const low = filtered.filter(r => r.riskLevel === 'ต่ำ').length;
    const med = filtered.filter(r => r.riskLevel === 'ปานกลาง').length;
    const high = filtered.filter(r => r.riskLevel === 'สูง').length;
    const avgScore = total > 0 ? Number((filtered.reduce((s, r) => s + r.riskScore, 0) / total).toFixed(2)) : 0;
    const avgBmi = total > 0 ? Number((filtered.reduce((s, r) => s + r.bmi, 0) / total).toFixed(1)) : 0;
    const avgGlucose = total > 0 ? Number((filtered.reduce((s, r) => s + r.glucoseMgDl, 0) / total).toFixed(1)) : 0;

    return {
      group: g.label,
      total,
      low,
      med,
      high,
      avgScore,
      avgBmi,
      avgGlucose,
      highRiskPct: total > 0 ? Number(((high / total) * 100).toFixed(1)) : 0
    };
  });
}

export function getZoneDistribution(records: HealthRecord[]) {
  const zones = ['เมือง', 'เหนือ', 'ตะวันออก', 'ตะวันตก', 'ใต้'];
  return zones.map(zone => {
    const list = records.filter(r => r.zone === zone);
    const total = list.length;
    const highRisk = list.filter(r => r.riskLevel === 'สูง').length;
    const medRisk = list.filter(r => r.riskLevel === 'ปานกลาง').length;
    const lowRisk = list.filter(r => r.riskLevel === 'ต่ำ').length;
    const avgGlucose = total > 0 ? Number((list.reduce((s, r) => s + r.glucoseMgDl, 0) / total).toFixed(1)) : 0;
    const avgSbp = total > 0 ? Number((list.reduce((s, r) => s + r.sbpMmHg, 0) / total).toFixed(1)) : 0;
    const avgBmi = total > 0 ? Number((list.reduce((s, r) => s + r.bmi, 0) / total).toFixed(1)) : 0;

    return {
      zone,
      total,
      highRisk,
      medRisk,
      lowRisk,
      avgGlucose,
      avgSbp,
      avgBmi,
      highRiskRate: total > 0 ? Number(((highRisk / total) * 100).toFixed(1)) : 0
    };
  });
}

export function getLifestyleRiskMatrix(records: HealthRecord[]) {
  const categories = [
    { label: 'ไม่สูบ + ไม่ดื่ม', test: (r: HealthRecord) => r.smoking === 'ไม่สูบ' && r.alcohol === 'ไม่ดื่ม' },
    { label: 'สูบอย่างเดียว (ไม่ดื่ม)', test: (r: HealthRecord) => r.smoking === 'สูบ' && r.alcohol === 'ไม่ดื่ม' },
    { label: 'ดื่มอย่างเดียว (ไม่สูบ)', test: (r: HealthRecord) => r.smoking === 'ไม่สูบ' && r.alcohol === 'ดื่ม' },
    { label: 'ทั้งสูบ + ทั้งดื่ม', test: (r: HealthRecord) => r.smoking === 'สูบ' && r.alcohol === 'ดื่ม' },
  ];

  return categories.map(cat => {
    const list = records.filter(cat.test);
    const total = list.length;
    const avgRisk = total > 0 ? Number((list.reduce((s, r) => s + r.riskScore, 0) / total).toFixed(2)) : 0;
    const avgGlucose = total > 0 ? Number((list.reduce((s, r) => s + r.glucoseMgDl, 0) / total).toFixed(1)) : 0;
    const avgSbp = total > 0 ? Number((list.reduce((s, r) => s + r.sbpMmHg, 0) / total).toFixed(1)) : 0;
    const highRiskCount = list.filter(r => r.riskLevel === 'สูง').length;

    return {
      name: cat.label,
      total,
      avgRisk,
      avgGlucose,
      avgSbp,
      highRiskCount,
      highRiskPct: total > 0 ? Number(((highRiskCount / total) * 100).toFixed(1)) : 0
    };
  });
}

export function getExerciseAnalysis(records: HealthRecord[]) {
  const types = ['สม่ำเสมอ', 'บางครั้ง', 'ไม่ออกกำลังกาย'];
  return types.map(t => {
    const list = records.filter(r => r.exercise === t);
    const total = list.length;
    const avgScore = total > 0 ? Number((list.reduce((s, r) => s + r.riskScore, 0) / total).toFixed(2)) : 0;
    const avgBmi = total > 0 ? Number((list.reduce((s, r) => s + r.bmi, 0) / total).toFixed(1)) : 0;
    const highRisk = list.filter(r => r.riskLevel === 'สูง').length;

    return {
      exerciseType: t,
      total,
      avgScore,
      avgBmi,
      highRisk,
      highRiskPct: total > 0 ? Number(((highRisk / total) * 100).toFixed(1)) : 0
    };
  });
}

export function getBMICategories(records: HealthRecord[]) {
  return [
    { label: 'สมส่วนปกติ (BMI 18.5 - 22.9)', count: records.filter(r => r.bmi < 23).length, color: '#86EFAC' },
    { label: 'น้ำหนักเกิน/ท้วม (BMI 23.0 - 24.9)', count: records.filter(r => r.bmi >= 23 && r.bmi < 25).length, color: '#BAE6FD' },
    { label: 'อ้วนระดับ 1 (BMI 25.0 - 29.9)', count: records.filter(r => r.bmi >= 25 && r.bmi < 30).length, color: '#FDE047' },
    { label: 'อ้วนอันตราย (BMI ≥ 30.0)', count: records.filter(r => r.bmi >= 30).length, color: '#FDA4AF' },
  ];
}
