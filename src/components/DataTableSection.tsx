import React, { useState } from 'react';
import {
  Table,
  ArrowUpDown,
  Download,
  Search,
  Eye,
  X,
  AlertTriangle,
  Heart,
  Activity,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { HealthRecord } from '../types';

interface DataTableSectionProps {
  records: HealthRecord[];
}

export const DataTableSection: React.FC<DataTableSectionProps> = ({ records }) => {
  const [sortField, setSortField] = useState<keyof HealthRecord>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [quickSearch, setQuickSearch] = useState<string>('');

  const handleSort = (field: keyof HealthRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filtered = records.filter(r => {
    if (!quickSearch.trim()) return true;
    const q = quickSearch.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      r.zone.toLowerCase().includes(q) ||
      r.gender.toLowerCase().includes(q) ||
      r.riskLevel.toLowerCase().includes(q)
    );
  });

  const sortedRecords = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // Export CSV safely without revealing any external Google sheet URLs
  const handleExportCSV = () => {
    const headers = [
      'รหัสบุคคล', 'วันที่คัดกรอง', 'พื้นที่', 'เพศ', 'อายุ', 'BMI',
      'SBP_mmHg', 'DBP_mmHg', 'ชีพจร_bpm', 'น้ำตาล_mg_dL', 'สูบบุหรี่',
      'ดื่มแอลกอฮอล์', 'การออกกำลังกาย', 'คัดกรองเบาหวาน', 'คัดกรองความดัน',
      'คะแนนเสี่ยง', 'ระดับความเสี่ยง'
    ];
    const rows = sortedRecords.map(r => [
      r.id, r.screeningDate, r.zone, r.gender, r.age, r.bmi,
      r.sbpMmHg, r.dbpMmHg, r.pulseBpm, r.glucoseMgDl, r.smoking,
      r.alcohol, r.exercise, r.diabetesRisk, r.htRisk, r.riskScore, r.riskLevel
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `health_audit_records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
      
      {/* Table Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
              <Table className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              ตารางคัดกรองรายบุคคลเชิงลึก (Health Screening Detail &amp; Conditional Audit)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ใช้การจัดรูปแบบตามเงื่อนไข (Conditional Formatting) ด้วยสีพาสเทลเพื่อบ่งชี้ภาวะน้ำตาล ความดัน และ BMI ผิดปกติ
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาในตาราง..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 w-44"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/70 border border-emerald-300/80 rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออก CSV</span>
          </button>
        </div>
      </div>

      {/* Conditional Formatting Color Legend Guide */}
      <div className="p-3 bg-slate-50/80 border border-slate-200/70 rounded-xl text-xs flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          เกณฑ์สีการเน้นข้อมูล (Conditional Formatting):
        </span>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-200 border border-rose-300"></span>
            <span><strong>สีแดงพาสเทล:</strong> เกินเกณฑ์อันตราย (น้ำตาล ≥ 126 / SBP ≥ 140 / BMI ≥ 30)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300"></span>
            <span><strong>สีส้ม/เหลือง:</strong> เริ่มมีความเสี่ยง (น้ำตาล 100-125 / SBP 120-139 / BMI 25-29.9)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-300"></span>
            <span><strong>สีเขียวพาสเทล:</strong> ค่าปกติ (น้ำตาล &lt; 100 / SBP &lt; 120 / BMI &lt; 23)</span>
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs divide-y divide-slate-200">
          <thead className="bg-slate-100/80 text-slate-700 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">
                  <span>รหัสบุคคล</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3">วันที่</th>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('zone')}>
                <div className="flex items-center gap-1">
                  <span>พื้นที่</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3">เพศ/อายุ</th>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('bmi')}>
                <div className="flex items-center gap-1">
                  <span>BMI (กก./ม.²)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('sbpMmHg')}>
                <div className="flex items-center gap-1">
                  <span>ความดัน (SBP/DBP)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('glucoseMgDl')}>
                <div className="flex items-center gap-1">
                  <span>น้ำตาล (mg/dL)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3">พฤติกรรม (สูบ/ดื่ม/ออกกำลัง)</th>
              <th className="py-2.5 px-3 cursor-pointer hover:bg-slate-200/60" onClick={() => handleSort('riskScore')}>
                <div className="flex items-center gap-1">
                  <span>คะแนนเสี่ยง</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-2.5 px-3">ระดับความเสี่ยง</th>
              <th className="py-2.5 px-3 text-center">ดูข้อมูล</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-8 text-center text-slate-500 text-xs">
                  ไม่พบข้อมูลตามเงื่อนไขการกรอง
                </td>
              </tr>
            ) : (
              sortedRecords.map((r) => {
                // Conditional highlights
                const isHighGlucose = r.glucoseMgDl >= 126;
                const isPreGlucose = r.glucoseMgDl >= 100 && r.glucoseMgDl < 126;
                const isNormalGlucose = r.glucoseMgDl < 100;

                const isHighBP = r.sbpMmHg >= 140 || r.dbpMmHg >= 90;
                const isPreBP = (r.sbpMmHg >= 120 && r.sbpMmHg < 140) || (r.dbpMmHg >= 80 && r.dbpMmHg < 90);

                const isHighBmi = r.bmi >= 30;
                const isPreBmi = r.bmi >= 25 && r.bmi < 30;

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-800">
                      {r.id}
                    </td>
                    <td className="py-2 px-3 text-slate-500 whitespace-nowrap">
                      {r.screeningDate}
                    </td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
                        {r.zone}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-700">
                      {r.gender} ({r.age} ปี)
                    </td>

                    {/* Conditional BMI */}
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-md font-semibold text-xs inline-block ${
                        isHighBmi
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : isPreBmi
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {r.bmi.toFixed(1)}
                      </span>
                    </td>

                    {/* Conditional Blood Pressure */}
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-md font-semibold text-xs inline-block ${
                        isHighBP
                          ? 'bg-rose-100 text-rose-800 border border-rose-300 font-bold'
                          : isPreBP
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {r.sbpMmHg}/{r.dbpMmHg}
                      </span>
                    </td>

                    {/* Conditional Blood Glucose */}
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-xs inline-block ${
                        isHighGlucose
                          ? 'bg-rose-100 text-rose-900 border border-rose-300 shadow-xs'
                          : isPreGlucose
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {r.glucoseMgDl}
                      </span>
                    </td>

                    {/* Behaviors */}
                    <td className="py-2 px-3 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-1.5 py-0.5 rounded ${r.smoking === 'สูบ' ? 'bg-rose-100 text-rose-700 font-medium' : 'bg-slate-100 text-slate-500'}`}>
                          {r.smoking === 'สูบ' ? 'สูบ' : 'ไม่สูบ'}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded ${r.alcohol === 'ดื่ม' ? 'bg-amber-100 text-amber-700 font-medium' : 'bg-slate-100 text-slate-500'}`}>
                          {r.alcohol === 'ดื่ม' ? 'ดื่ม' : 'ไม่ดื่ม'}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-700">
                          {r.exercise}
                        </span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-2 px-3 font-bold text-slate-900 text-center">
                      {r.riskScore}
                    </td>

                    {/* Risk Level Badge */}
                    <td className="py-2 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                        r.riskLevel === 'สูง'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : r.riskLevel === 'ปานกลาง'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {r.riskLevel}
                      </span>
                    </td>

                    {/* Action button */}
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => setSelectedRecord(r)}
                        className="p-1 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                        title="ดูรายละเอียดผลตรวจ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Individual Modal Dialog */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-100 text-sky-700 font-bold text-sm">
                  {selectedRecord.id}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    ข้อมูลคัดกรองสุขภาพรายบุคคล (Anonymized)
                  </h4>
                  <p className="text-xs text-slate-500">
                    ตรวจเมื่อ {selectedRecord.screeningDate} • เขต{selectedRecord.zone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ข้อมูลพื้นฐาน:</span>
                <div className="font-semibold text-slate-800 mt-1">
                  เพศ: {selectedRecord.gender} • อายุ: {selectedRecord.age} ปี
                </div>
                <div className="text-slate-600 mt-0.5">
                  ส่วนสูง: {selectedRecord.heightCm} ซม. • น้ำหนัก: {selectedRecord.weightKg} กก.
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ดัชนีมวลกาย (BMI):</span>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {selectedRecord.bmi.toFixed(1)} กก./ม.²
                </div>
                <div className="text-[11px] text-slate-600">
                  {selectedRecord.bmi >= 30 ? 'อ้วนอันตราย' : selectedRecord.bmi >= 25 ? 'อ้วนระดับ 1' : 'ปกติ'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ความดันโลหิต / ชีพจร:</span>
                <div className="text-base font-bold text-slate-900 mt-1">
                  {selectedRecord.sbpMmHg} / {selectedRecord.dbpMmHg} mmHg
                </div>
                <div className="text-[11px] text-slate-600">
                  ชีพจร: {selectedRecord.pulseBpm} bpm
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">ระดับน้ำตาลในเลือด:</span>
                <div className={`text-base font-bold mt-1 ${selectedRecord.glucoseMgDl >= 126 ? 'text-rose-700' : 'text-slate-900'}`}>
                  {selectedRecord.glucoseMgDl} mg/dL
                </div>
                <div className="text-[11px] text-slate-600">
                  {selectedRecord.glucoseMgDl >= 126 ? 'เกณฑ์สงสัยเบาหวาน' : selectedRecord.glucoseMgDl >= 100 ? 'เสี่ยงเบาหวาน' : 'ปกติ'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
              <span className="font-semibold text-amber-800">พฤติกรรมและการประเมินความเสี่ยง:</span>
              <div className="grid grid-cols-3 gap-2 text-slate-700 text-[11px] mt-1">
                <div>สูบบุหรี่: <strong>{selectedRecord.smoking}</strong></div>
                <div>แอลกอฮอล์: <strong>{selectedRecord.alcohol}</strong></div>
                <div>ออกกำลังกาย: <strong>{selectedRecord.exercise}</strong></div>
              </div>
              <div className="pt-2 mt-1 border-t border-amber-200/60 flex justify-between items-center text-xs">
                <span>ผลประเมินระดับความเสี่ยง:</span>
                <span className="font-bold px-2 py-0.5 rounded bg-white text-slate-900 border border-amber-300">
                  {selectedRecord.riskLevel} (คะแนน: {selectedRecord.riskScore}/7)
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
