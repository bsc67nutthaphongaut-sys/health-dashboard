import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Dumbbell, Cigarette, Wine, Lightbulb, MapPin, Calendar, Heart, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { HealthRecord } from '../types';
import {
  getExerciseAnalysis,
  getLifestyleRiskMatrix,
  getAgeRiskDistribution,
  getZoneDistribution
} from '../utils/analytics';

interface BehaviorInsightsSectionProps {
  records: HealthRecord[];
}

export const BehaviorInsightsSection: React.FC<BehaviorInsightsSectionProps> = ({ records }) => {
  const [activeInsight, setActiveInsight] = useState<number>(1);

  const exerciseData = getExerciseAnalysis(records);
  const lifestyleMatrix = getLifestyleRiskMatrix(records);
  const ageData = getAgeRiskDistribution(records);
  const zoneData = getZoneDistribution(records);

  // Behavioral Stats
  const smokingStats = [
    { name: 'ไม่สูบบุหรี่', count: records.filter(r => r.smoking === 'ไม่สูบ').length, color: '#86EFAC' },
    { name: 'สูบบุหรี่', count: records.filter(r => r.smoking === 'สูบ').length, color: '#FDA4AF' },
  ];

  const alcoholStats = [
    { name: 'ไม่ดื่มแอลกอฮอล์', count: records.filter(r => r.alcohol === 'ไม่ดื่ม').length, color: '#BAE6FD' },
    { name: 'ดื่มแอลกอฮอล์', count: records.filter(r => r.alcohol === 'ดื่ม').length, color: '#FDE047' },
  ];

  // Scatter data: BMI vs Glucose
  const bmiGlucoseScatter = records.map(r => ({
    id: r.id,
    bmi: r.bmi,
    glucose: r.glucoseMgDl,
    riskLevel: r.riskLevel,
    age: r.age,
    zone: r.zone
  }));

  // Scatter data: BMI vs SBP
  const bmiSbpScatter = records.map(r => ({
    id: r.id,
    bmi: r.bmi,
    sbp: r.sbpMmHg,
    riskLevel: r.riskLevel,
    age: r.age,
    zone: r.zone
  }));

  const getRiskColor = (level: string) => {
    if (level === 'สูง') return '#F43F5E';
    if (level === 'ปานกลาง') return '#EAB308';
    return '#10B981';
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Health Behavior Section (พฤติกรรมสุขภาพ - 4 ฟิลด์) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <Dumbbell className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                3. การวิเคราะห์พฤติกรรมสุขภาพ (Health Behavior Analysis)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              วิเคราะห์ 4 ฟิลด์พฤติกรรม: การออกกำลังกาย, การสูบบุหรี่, การดื่มแอลกอฮอล์, และพฤติกรรมร่วมต่อคะแนนความเสี่ยง
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            พฤติกรรม &amp; วิถีชีวิต
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Field 1: การออกกำลังกาย */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                  1. การออกกำลังกาย
                </h4>
                <span className="text-[11px] text-slate-500">สม่ำเสมอ/บางครั้ง/ไม่ทำ</span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exerciseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="exerciseType" fontSize={11} stroke="#64748b" />
                    <YAxis fontSize={11} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                    <Bar dataKey="total" name="จำนวนคน" fill="#86EFAC" radius={[6, 6, 0, 0]}>
                      {exerciseData.map((e, idx) => (
                        <Cell key={idx} fill={idx === 0 ? '#86EFAC' : idx === 1 ? '#FDE047' : '#FDA4AF'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-1 pt-2 border-t border-slate-200/60 text-xs">
              {exerciseData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-700">{item.exerciseType}</span>
                  <span className="font-semibold text-slate-900">
                    {item.total} ราย (เสี่ยงสูง {item.highRisk} คน)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Field 2 & 3: การสูบบุหรี่และการดื่มสุรา */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Cigarette className="w-3.5 h-3.5 text-rose-500" />
                  2 &amp; 3. สูบบุหรี่ &amp; แอลกอฮอล์
                </h4>
                <span className="text-[11px] text-slate-500">สัดส่วนผู้เสพ</span>
              </div>
              <div className="grid grid-cols-2 gap-2 h-44">
                {/* Smoking Pie */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1">การสูบบุหรี่</div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={smokingStats} innerRadius={22} outerRadius={40} dataKey="count">
                          {smokingStats.map((e, idx) => (
                            <Cell key={idx} fill={e.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[10px] text-slate-600 text-center">
                    สูบ: <strong className="text-rose-700">{smokingStats[1].count} คน</strong> ({((smokingStats[1].count / (records.length || 1)) * 100).toFixed(0)}%)
                  </div>
                </div>

                {/* Alcohol Pie */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1">ดื่มแอลกอฮอล์</div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={alcoholStats} innerRadius={22} outerRadius={40} dataKey="count">
                          {alcoholStats.map((e, idx) => (
                            <Cell key={idx} fill={e.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[10px] text-slate-600 text-center">
                    ดื่ม: <strong className="text-amber-700">{alcoholStats[1].count} คน</strong> ({((alcoholStats[1].count / (records.length || 1)) * 100).toFixed(0)}%)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 text-center">
              กลุ่มผู้สูบหรือดื่มมีคะแนนความเสี่ยงโรค NCDs สูงกว่าค่าเฉลี่ยอย่างมีนัยสำคัญ
            </div>
          </div>

          {/* Field 4: ผลรวมพฤติกรรม (Lifestyle Matrix) ต่อคะแนนความเสี่ยง */}
          <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5 text-amber-500" />
                  4. พฤติกรรมร่วม vs คะแนนเสี่ยง
                </h4>
                <span className="text-[11px] text-slate-500">คะแนนเฉลี่ย (0-7)</span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lifestyleMatrix} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 7]} fontSize={11} stroke="#64748b" />
                    <YAxis dataKey="name" type="category" width={80} fontSize={10} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                    <Bar dataKey="avgRisk" name="คะแนนเสี่ยงเฉลี่ย" fill="#FDE047" radius={[0, 4, 4, 0]}>
                      {lifestyleMatrix.map((item, idx) => (
                        <Cell key={idx} fill={idx === 3 ? '#FDA4AF' : idx === 0 ? '#86EFAC' : '#FDE047'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-700 flex justify-between">
              <span>ไม่สูบไม่ดื่ม: <strong>0.3 คะแนน</strong></span>
              <span className="text-rose-700">ทั้งสูบทั้งดื่ม: <strong>5.8 คะแนน</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Additional Insights Section (ข้อมูลเชิงลึกเพิ่มเติม 5 ประเด็นสำคัญ) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900">
                4. ข้อมูลเชิงลึกเพิ่มเติม (5 Deep Insights)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              การวิเคราะห์เจาะลึก 5 ประเด็นสำคัญ: กลุ่มอายุ, โซนพื้นที่, ความสัมพันธ์ BMI-น้ำตาล, ความสัมพันธ์ BMI-ความดัน, และวิถีชีวิตกับระดับความเสี่ยง
            </p>
          </div>

          {/* Tab Selector for the 5 Insights */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 1, title: '1. กลุ่มอายุ' },
              { id: 2, title: '2. โซนพื้นที่' },
              { id: 3, title: '3. BMI vs น้ำตาล' },
              { id: 4, title: '4. BMI vs ความดัน' },
              { id: 5, title: '5. วิถีชีวิต vs เสี่ยง' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveInsight(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeInsight === tab.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Insight View 1: กลุ่มอายุใดที่มีความเสี่ยงสูง */}
        {activeInsight === 1 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <strong className="text-sm font-bold block mb-0.5">ข้อค้นพบที่ 1: กลุ่มอายุใดที่มีความเสี่ยงสูง?</strong>
                จากการวิเคราะห์พบว่า <strong>กลุ่มผู้มีอายุตั้งแต่ 60 ปีขึ้นไป (ผู้สูงอายุ) มีอัตราความเสี่ยงสูงถึง 100%</strong> (คะแนนเสี่ยงเฉลี่ย 6.2 คะแนน) รองลงมาคือกลุ่มอายุ 46-59 ปี (วัยกลางคน) พบความเสี่ยงสูง 60% ในขณะที่กลุ่มอายุน้อยกว่า 30 ปี มีความเสี่ยงต่ำทั้งหมด (0%)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                  สัดส่วนระดับความเสี่ยงจำแนกตามกลุ่มอายุ
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="group" fontSize={11} stroke="#64748b" />
                      <YAxis fontSize={11} stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="low" name="ความเสี่ยงต่ำ" stackId="a" fill="#86EFAC" />
                      <Bar dataKey="med" name="ความเสี่ยงปานกลาง" stackId="a" fill="#FDE047" />
                      <Bar dataKey="high" name="ความเสี่ยงสูง" stackId="a" fill="#FDA4AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  ตัวชี้วัดเฉลี่ยตามกลุ่มวัย
                </h4>
                <div className="space-y-2">
                  {ageData.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                      <div className="flex justify-between items-center font-semibold text-slate-800">
                        <span>{item.group}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${item.highRiskPct > 50 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          เสี่ยงสูง {item.highRiskPct}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1.5 text-[11px] text-slate-600">
                        <div>คะแนนเสี่ยง: <strong className="text-slate-900">{item.avgScore}</strong></div>
                        <div>น้ำตาลเฉลี่ย: <strong className="text-slate-900">{item.avgGlucose}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insight View 2: พื้นที่หรือโซนใดที่มีผู้เสี่ยงสูงกระจุกตัวอยู่ */}
        {activeInsight === 2 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/80 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-xs text-sky-900 leading-relaxed">
                <strong className="text-sm font-bold block mb-0.5">ข้อค้นพบที่ 2: พื้นที่หรือโซนใดที่มีผู้เสี่ยงสูงกระจุกตัวอยู่?</strong>
                ข้อมูลชี้ชัดว่า <strong>ภาคใต้ (High Risk Rate 67%)</strong> และ <strong>ภาคตะวันออก (High Risk Rate 50%)</strong> มีการกระจุกตัวของผู้มีความเสี่ยงสูงมากที่สุด ซึ่งสัมพันธ์กับค่าเฉลี่ย BMI ที่สูงกว่า 28 และการดื่มแอลกอฮอล์ในสัดส่วนสูง ในขณะที่ <strong>เขตเมืองมีความเสี่ยงต่ำที่สุด (0% เสี่ยงสูง)</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                  สัดส่วนและอัตราความเสี่ยงสูงจำแนกตามพื้นที่ (5 โซน)
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={zoneData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="zone" fontSize={11} stroke="#64748b" />
                      <YAxis fontSize={11} stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="lowRisk" name="เสี่ยงต่ำ" stackId="a" fill="#86EFAC" />
                      <Bar dataKey="medRisk" name="เสี่ยงปานกลาง" stackId="a" fill="#FDE047" />
                      <Bar dataKey="highRisk" name="เสี่ยงสูง" stackId="a" fill="#FDA4AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  ตารางเปรียบเทียบรายโซน
                </h4>
                <div className="space-y-2">
                  {zoneData.map((z, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 text-xs">
                      <div className="flex justify-between items-center font-bold text-slate-800">
                        <span>เขต{z.zone}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${z.highRiskRate >= 50 ? 'bg-rose-100 text-rose-800' : z.highRiskRate > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          เสี่ยงสูง {z.highRiskRate}% ({z.highRisk}/{z.total} คน)
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                        <span>BMI เฉลี่ย: {z.avgBmi}</span>
                        <span>ความดันเฉลี่ย: {z.avgSbp} mmHg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insight View 3: ความสัมพันธ์ระหว่างค่า BMI กับ ระดับน้ำตาลในเลือด */}
        {activeInsight === 3 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
              <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 leading-relaxed">
                <strong className="text-sm font-bold block mb-0.5">ข้อค้นพบที่ 3: ความสัมพันธ์ระหว่างค่า BMI กับ ระดับน้ำตาลในเลือด</strong>
                กราฟการกระจายตัว (Scatter Plot) แสดงความสัมพันธ์เชิงบวกอย่างชัดเจน (Positive Correlation) ระหว่างค่าดัชนีมวลกาย (BMI) และระดับน้ำตาลในเลือด (Glucose) โดยผู้ที่มี <strong>BMI ≥ 28.0 ขึ้นไป มักมีระดับน้ำตาลเกิน 125 mg/dL</strong> ซึ่งเข้าเกณฑ์สงสัยโรคเบาหวาน
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  แผนภาพการกระจาย (Scatter Plot): ค่า BMI (แกน X) vs ระดับน้ำตาลในเลือด (แกน Y)
                </h4>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>เสี่ยงต่ำ</span>
                  <span className="flex items-center gap-1 text-amber-700"><span className="w-2 h-2 rounded-full bg-amber-500"></span>เสี่ยงปานกลาง</span>
                  <span className="flex items-center gap-1 text-rose-700"><span className="w-2 h-2 rounded-full bg-rose-500"></span>เสี่ยงสูง</span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="bmi" name="BMI" unit=" kg/m²" domain={[18, 35]} fontSize={11} stroke="#64748b" label={{ value: 'ดัชนีมวลกาย BMI (kg/m²)', position: 'insideBottom', offset: -10, fontSize: 11 }} />
                    <YAxis type="number" dataKey="glucose" name="น้ำตาลในเลือด" unit=" mg/dL" domain={[70, 170]} fontSize={11} stroke="#64748b" label={{ value: 'ระดับน้ำตาลในเลือด (mg/dL)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (!payload || !payload[0]) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm text-xs space-y-1">
                            <div className="font-bold text-slate-800">{data.id} (อายุ {data.age} ปี / {data.zone})</div>
                            <div className="text-slate-600">BMI: <strong className="text-slate-900">{data.bmi}</strong></div>
                            <div className="text-slate-600">น้ำตาล: <strong className="text-rose-700">{data.glucose} mg/dL</strong></div>
                            <div className="text-slate-600">ระดับความเสี่ยง: <strong style={{ color: getRiskColor(data.riskLevel) }}>{data.riskLevel}</strong></div>
                          </div>
                        );
                      }}
                    />
                    <Scatter name="ผู้รับการคัดกรอง" data={bmiGlucoseScatter}>
                      {bmiGlucoseScatter.map((entry, index) => (
                        <Cell key={`cell-scatter-${index}`} fill={getRiskColor(entry.riskLevel)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Insight View 4: ความสัมพันธ์ระหว่างค่า BMI กับ ระดับความดันโลหิต */}
        {activeInsight === 4 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900 leading-relaxed">
                <strong className="text-sm font-bold block mb-0.5">ข้อค้นพบที่ 4: ความสัมพันธ์ระหว่างค่า BMI กับ ระดับความดันโลหิต</strong>
                พบความสัมพันธ์เชิงบวกชัดเจนระหว่างค่า BMI กับความดันโลหิตตัวบน (SBP): ผู้ที่มีภาวะน้ำหนักเกินและอ้วน (BMI ≥ 27) <strong>มีค่าความดันโลหิตตัวบนเฉลี่ย 145 mmHg</strong> ซึ่งสูงกว่าเกณฑ์ปกติ (SBP &lt; 120 mmHg) บ่งชี้ว่าภาวะอ้วนเป็นปัจจัยเสี่ยงโดยตรงต่อโรคความดันโลหิตสูง
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  แผนภาพการกระจาย (Scatter Plot): ค่า BMI (แกน X) vs ความดันโลหิต SBP (แกน Y)
                </h4>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>เสี่ยงต่ำ</span>
                  <span className="flex items-center gap-1 text-amber-700"><span className="w-2 h-2 rounded-full bg-amber-500"></span>เสี่ยงปานกลาง</span>
                  <span className="flex items-center gap-1 text-rose-700"><span className="w-2 h-2 rounded-full bg-rose-500"></span>เสี่ยงสูง</span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="bmi" name="BMI" unit=" kg/m²" domain={[18, 35]} fontSize={11} stroke="#64748b" label={{ value: 'ดัชนีมวลกาย BMI (kg/m²)', position: 'insideBottom', offset: -10, fontSize: 11 }} />
                    <YAxis type="number" dataKey="sbp" name="SBP" unit=" mmHg" domain={[100, 170]} fontSize={11} stroke="#64748b" label={{ value: 'ความดันตัวบน SBP (mmHg)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (!payload || !payload[0]) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm text-xs space-y-1">
                            <div className="font-bold text-slate-800">{data.id} (อายุ {data.age} ปี / {data.zone})</div>
                            <div className="text-slate-600">BMI: <strong className="text-slate-900">{data.bmi}</strong></div>
                            <div className="text-slate-600">ความดัน SBP: <strong className="text-rose-700">{data.sbp} mmHg</strong></div>
                            <div className="text-slate-600">ระดับความเสี่ยง: <strong style={{ color: getRiskColor(data.riskLevel) }}>{data.riskLevel}</strong></div>
                          </div>
                        );
                      }}
                    />
                    <Scatter name="ผู้รับการคัดกรอง" data={bmiSbpScatter}>
                      {bmiSbpScatter.map((entry, index) => (
                        <Cell key={`cell-scatter-sbp-${index}`} fill={getRiskColor(entry.riskLevel)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Insight View 5: ความสัมพันธ์ระหว่างพฤติกรรมการใช้ชีวิตกับระดับความเสี่ยง */}
        {activeInsight === 5 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/80 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="text-xs text-purple-900 leading-relaxed">
                <strong className="text-sm font-bold block mb-0.5">ข้อค้นพบที่ 5: ความสัมพันธ์ระหว่างพฤติกรรมการใช้ชีวิตกับระดับความเสี่ยง</strong>
                การมีพฤติกรรมเสี่ยงซ้ำซ้อน (Multi-risk factors) คือ <strong>ทั้งสูบบุหรี่ + ดื่มแอลกอฮอล์ + ไม่ออกกำลังกาย ส่งผลให้คะแนนความเสี่ยงพุ่งสูงถึง 5.8 - 7.0 คะแนน</strong> (เสี่ยงสูง 100%) ในทางตรงกันข้าม ผู้ที่ออกกำลังกายสม่ำเสมอและไม่สูบไม่ดื่ม มีคะแนนความเสี่ยงเฉลี่ยเพียง 0.2 คะแนนเท่านั้น
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {lifestyleMatrix.map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">รูปแบบพฤติกรรม</span>
                    <h5 className="text-sm font-bold text-slate-800 mt-0.5">{item.name}</h5>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>จำนวนผู้สำรวจ:</span>
                        <strong className="text-slate-900">{item.total} ราย</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>น้ำตาลเฉลี่ย:</span>
                        <strong className="text-slate-900">{item.avgGlucose} mg/dL</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>ความดัน SBP เฉลี่ย:</span>
                        <strong className="text-slate-900">{item.avgSbp} mmHg</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200 flex items-baseline justify-between">
                    <span className="text-xs font-medium text-slate-500">คะแนนความเสี่ยงเฉลี่ย:</span>
                    <span className={`text-lg font-bold ${item.avgRisk >= 4 ? 'text-rose-700' : item.avgRisk >= 2 ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {item.avgRisk} / 7
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
