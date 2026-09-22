import React from 'react';
import { Users, HeartPulse, ArrowUpDown, AlertCircle, Sparkles, Scale, Flame, Activity } from 'lucide-react';
import { KPIData, HealthRecord } from '../types';

interface KPICardsProps {
  kpis: KPIData;
  records: HealthRecord[];
}

export const KPICards: React.FC<KPICardsProps> = ({ kpis, records }) => {
  const maleCount = records.filter(r => r.gender === 'ชาย').length;
  const femaleCount = records.filter(r => r.gender === 'หญิง').length;
  const malePct = kpis.totalCount > 0 ? ((maleCount / kpis.totalCount) * 100).toFixed(1) : '0';
  const femalePct = kpis.totalCount > 0 ? ((femaleCount / kpis.totalCount) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* KPI 1: Total Count (จำนวนรวม) */}
      <div 
        id="kpi-total-screened"
        className="bg-sky-50/70 border border-sky-200/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-sky-800 tracking-wide uppercase flex items-center gap-1.5">
            <Users className="w-4 h-4 text-sky-600" />
            1. จำนวนรวม (Total Count)
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/80 text-sky-700 border border-sky-200">
            ผู้รับการคัดกรอง
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {kpis.totalCount.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-slate-600">ราย</span>
        </div>

        <div className="pt-2 border-t border-sky-200/60 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>ชาย: <strong>{maleCount}</strong> ({malePct}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>หญิง: <strong>{femaleCount}</strong> ({femalePct}%)</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Average (ค่าเฉลี่ยสุขภาพ) */}
      <div 
        id="kpi-average-biomarkers"
        className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            2. ค่าเฉลี่ย (Average)
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/80 text-emerald-700 border border-emerald-200">
            เกณฑ์สุขภาพ
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            {kpis.avgBmi}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            BMI เฉลี่ย (กก./ม.²)
          </span>
        </div>

        <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-700">
          <span>ความดันเฉลี่ย: <strong>{kpis.avgSbp}/{kpis.avgDbp}</strong></span>
          <span>น้ำตาลเฉลี่ย: <strong>{kpis.avgGlucose}</strong> mg/dL</span>
        </div>
      </div>

      {/* KPI 3: Min / Max (ค่าต่ำสุด / ค่าสูงสุด) */}
      <div 
        id="kpi-min-max-spread"
        className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-amber-800 tracking-wide uppercase flex items-center gap-1.5">
            <ArrowUpDown className="w-4 h-4 text-amber-600" />
            3. ต่ำสุด-สูงสุด (Min / Max)
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/80 text-amber-700 border border-amber-200">
            ช่วงกระจายตัว
          </span>
        </div>

        <div className="space-y-1.5 mb-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">น้ำตาลในเลือด:</span>
            <span className="font-bold text-slate-900 bg-white/90 px-2 py-0.5 rounded border border-amber-200">
              {kpis.minGlucose} – {kpis.maxGlucose} mg/dL
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">ความดัน SBP:</span>
            <span className="font-bold text-slate-900 bg-white/90 px-2 py-0.5 rounded border border-amber-200">
              {kpis.minSbp} – {kpis.maxSbp} mmHg
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-700">
          <span>ช่วง BMI ต่ำสุด-สูงสุด:</span>
          <strong>{kpis.minBmi} – {kpis.maxBmi}</strong>
        </div>
      </div>

      {/* KPI 4: Ratio / Percentage (สัดส่วน / ร้อยละ) */}
      <div 
        id="kpi-risk-ratio"
        className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-rose-800 tracking-wide uppercase flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            4. สัดส่วนและร้อยละ (Ratio & %)
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/80 text-rose-700 border border-rose-200">
            กลุ่มเสี่ยงสูง
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-bold tracking-tight text-rose-700">
            {kpis.highRiskPct}%
          </span>
          <span className="text-xs font-medium text-slate-600">
            ({kpis.highRiskCount}/{kpis.totalCount} คน)
          </span>
        </div>

        <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs text-slate-700">
          <span>เสี่ยงเบาหวาน: <strong>{kpis.diabetesRiskPct}%</strong></span>
          <span>เสี่ยงความดัน: <strong>{kpis.htRiskPct}%</strong></span>
        </div>
      </div>

    </div>
  );
};
