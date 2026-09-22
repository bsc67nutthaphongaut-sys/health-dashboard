import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { ShieldAlert, TrendingUp, Activity, CheckCircle2, Heart, AlertOctagon } from 'lucide-react';
import { HealthRecord } from '../types';
import { getMonthlyTrend, getBMICategories, getZoneDistribution } from '../utils/analytics';

interface RiskTrendSectionProps {
  records: HealthRecord[];
}

export const RiskTrendSection: React.FC<RiskTrendSectionProps> = ({ records }) => {
  const monthlyData = getMonthlyTrend(records);
  const bmiCategories = getBMICategories(records);
  const zoneStats = getZoneDistribution(records);

  // Health Risk Field 1: Risk Level Distribution (ต่ำ, ปานกลาง, สูง)
  const riskLevels = [
    { name: 'ความเสี่ยงต่ำ (0-1 คะแนน)', value: records.filter(r => r.riskLevel === 'ต่ำ').length, color: '#86EFAC' }, // pastel green
    { name: 'ความเสี่ยงปานกลาง (2 คะแนน)', value: records.filter(r => r.riskLevel === 'ปานกลาง').length, color: '#FDE047' }, // pastel yellow
    { name: 'ความเสี่ยงสูง (≥ 4 คะแนน)', value: records.filter(r => r.riskLevel === 'สูง').length, color: '#FDA4AF' }, // pastel rose
  ];

  // Health Risk Field 3 & 4: Screening NCDs Conditions (เบาหวาน vs ความดัน)
  const diabetesRiskCount = records.filter(r => r.diabetesRisk === 'มีแนวโน้ม/เสี่ยง').length;
  const diabetesNormalCount = records.filter(r => r.diabetesRisk === 'ไม่มี').length;
  const htRiskCount = records.filter(r => r.htRisk === 'มีแนวโน้ม/เสี่ยง').length;
  const htNormalCount = records.filter(r => r.htRisk === 'ไม่มี').length;

  const ncdScreeningData = [
    {
      disease: 'คัดกรองโรคเบาหวาน',
      'ไม่มีความเสี่ยง': diabetesNormalCount,
      'มีแนวโน้ม/เสี่ยง': diabetesRiskCount,
      riskRate: records.length > 0 ? ((diabetesRiskCount / records.length) * 100).toFixed(1) : 0,
    },
    {
      disease: 'คัดกรองความดันโลหิตสูง',
      'ไม่มีความเสี่ยง': htNormalCount,
      'มีแนวโน้ม/เสี่ยง': htRiskCount,
      riskRate: records.length > 0 ? ((htRiskCount / records.length) * 100).toFixed(1) : 0,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Health Risk Analysis (วิเคราะห์ความเสี่ยงด้านสุขภาพ - 4+ ฟิลด์) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                1. การวิเคราะห์ความเสี่ยงด้านสุขภาพ (Health Risk Analysis)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              วิเคราะห์ความเสี่ยง 5 ฟิลด์: ระดับความเสี่ยง, คะแนนความเสี่ยง, คัดกรองเบาหวาน, คัดกรองความดันสูง, และเกณฑ์ BMI
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            วิเคราะห์ครอบคลุม 5 มิติ
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Chart A: ระดับความเสี่ยง (ต่ำ / ปานกลาง / สูง) */}
          <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  สัดส่วนระดับความเสี่ยง (Risk Levels)
                </h4>
                <span className="text-[11px] text-slate-500">รวม {records.length} ราย</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskLevels}
                      cx="50%"
                      cy="50%"
                      innerRadius={44}
                      outerRadius={72}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {riskLevels.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any, name: any) => [`${val} ราย (${records.length > 0 ? (((val || 0) / records.length) * 100).toFixed(1) : 0}%)`, name]}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
              {riskLevels.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    {item.value} ราย ({records.length > 0 ? ((item.value / records.length) * 100).toFixed(0) : 0}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart B: การคัดกรองเบาหวานและความดันโลหิตสูง */}
          <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  ผลคัดกรองโรคเรื้อรัง (NCDs Screening)
                </h4>
                <span className="text-[11px] text-slate-500">เบาหวาน vs ความดัน</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ncdScreeningData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" fontSize={11} stroke="#64748b" />
                    <YAxis dataKey="disease" type="category" width={110} fontSize={10} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="ไม่มีความเสี่ยง" stackId="a" fill="#86EFAC" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="มีแนวโน้ม/เสี่ยง" stackId="a" fill="#FDA4AF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <div className="text-slate-500 text-[11px]">เสี่ยงเบาหวาน</div>
                <div className="text-sm font-bold text-rose-700">{diabetesRiskCount} ราย ({((diabetesRiskCount / (records.length || 1)) * 100).toFixed(1)}%)</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <div className="text-slate-500 text-[11px]">เสี่ยงความดัน</div>
                <div className="text-sm font-bold text-rose-700">{htRiskCount} ราย ({((htRiskCount / (records.length || 1)) * 100).toFixed(1)}%)</div>
              </div>
            </div>
          </div>

          {/* Chart C: การกระจายตัวตามเกณฑ์ BMI */}
          <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  การกระจายตัวตามเกณฑ์ BMI
                </h4>
                <span className="text-[11px] text-slate-500">ภาวะโภชนาการ</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bmiCategories} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="label" tick={false} />
                    <YAxis fontSize={11} stroke="#64748b" />
                    <Tooltip
                      formatter={(val: any, _name: any, props: any) => [`${val} ราย`, props?.payload?.label || '']}
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {bmiCategories.map((entry, index) => (
                        <Cell key={`cell-bmi-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-200/60 text-[11px]">
              {bmiCategories.map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900 shrink-0 ml-1">{cat.count} ราย</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Health Trend Analysis (แนวโน้มทางสุขภาพ - 2+ ฟิลด์ตามช่วงเวลา) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                2. การวิเคราะห์แนวโน้มทางสุขภาพ (Health Trend Analysis)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ติดตามการเปลี่ยนแปลงข้ามเดือน (ไตรมาสที่ 1/2569): แนวโน้มระดับน้ำตาลเฉลี่ย (Glucose), ความดันโลหิตเฉลี่ย (SBP/DBP) และจำนวนผู้มีความเสี่ยงสูง
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-sky-700 font-medium">
              <span className="w-3 h-1 bg-sky-500 rounded-full"></span> น้ำตาลเฉลี่ย (mg/dL)
            </span>
            <span className="flex items-center gap-1.5 text-rose-700 font-medium">
              <span className="w-3 h-1 bg-rose-400 rounded-full"></span> ความดัน SBP (mmHg)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Trend Line Chart */}
          <div className="lg:col-span-8 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                แนวโน้มระดับน้ำตาลและความดันโลหิตรายเดือน
              </h4>
              <span className="text-xs text-slate-500">มกราคม – มีนาคม 2569</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 15, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="monthLabel" stroke="#64748b" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#0284c7" fontSize={12} domain={[70, 160]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#e11d48" fontSize={12} domain={[100, 170]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="avgGlucose"
                    name="น้ำตาลเฉลี่ย (mg/dL)"
                    stroke="#0284c7"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#0284c7' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgSbp"
                    name="ความดันตัวบนเฉลี่ย SBP (mmHg)"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#f43f5e' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgDbp"
                    name="ความดันตัวล่างเฉลี่ย DBP (mmHg)"
                    stroke="#a855f7"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 4, fill: '#a855f7' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly High-Risk Cases Metric Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                จำนวนผู้มีความเสี่ยงสูงสะสมรายเดือน
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="monthLabel" fontSize={11} stroke="#64748b" />
                    <YAxis fontSize={11} stroke="#64748b" allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                    <Bar dataKey="highRiskCount" name="ผู้เสี่ยงสูง (คน)" fill="#FDA4AF" radius={[6, 6, 0, 0]}>
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-m-${index}`} fill={index === 2 ? '#F43F5E' : '#FDA4AF'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5 mt-2">
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                สรุปแนวโน้มไตรมาส 1:
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                ค่าน้ำตาลและความดันมีแนวโน้มทรงตัวในเกณฑ์เฝ้าระวัง โดยเดือนมีนาคมมีผู้รับการตรวจกลุ่มเสี่ยงสูงจำนวน 4 ราย แนะนำเพิ่มกิจกรรมตรวจวัดเชิงรุกในชุมชน
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
