import React from 'react';
import { Filter, RotateCcw, Search, MapPin, Users, AlertTriangle, Calendar, Cigarette, Wine, Dumbbell } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalRecords: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalRecords,
  filteredCount,
}) => {
  const handleReset = () => {
    setFilters({
      zone: 'all',
      gender: 'all',
      riskLevel: 'all',
      month: 'all',
      smoking: 'all',
      alcohol: 'all',
      exercise: 'all',
      ageGroup: 'all',
      searchQuery: '',
    });
  };

  const isFiltered =
    filters.zone !== 'all' ||
    filters.gender !== 'all' ||
    filters.riskLevel !== 'all' ||
    filters.month !== 'all' ||
    filters.smoking !== 'all' ||
    filters.alcohol !== 'all' ||
    filters.exercise !== 'all' ||
    filters.ageGroup !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
            <Filter className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-semibold text-slate-800">
            ระบบควบคุมและตัวกรองข้อมูลสุขภาพ (Interactive Filters)
          </h2>
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
            กรองพบ {filteredCount} / {totalRecords} คน
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="filter-search-input"
              placeholder="ค้นหารหัสบุคคล เช่น H0001..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-colors cursor-pointer"
              title="ล้างตัวกรองทั้งหมด"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ล้างตัวกรอง</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Select Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-3.5">
        
        {/* 1. Zone / พื้นที่ */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <MapPin className="w-3 h-3 text-sky-500" /> พื้นที่ / โซน
          </label>
          <select
            id="filter-zone"
            value={filters.zone}
            onChange={(e) => setFilters(prev => ({ ...prev, zone: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-800 font-medium"
          >
            <option value="all">ทุกพื้นที่ (5 โซน)</option>
            <option value="เมือง">เขตเมือง</option>
            <option value="เหนือ">ภาคเหนือ</option>
            <option value="ตะวันออก">ภาคตะวันออก</option>
            <option value="ตะวันตก">ภาคตะวันตก</option>
            <option value="ใต้">ภาคใต้</option>
          </select>
        </div>

        {/* 2. Gender / เพศ */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <Users className="w-3 h-3 text-emerald-500" /> เพศ
          </label>
          <select
            id="filter-gender"
            value={filters.gender}
            onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-800 font-medium"
          >
            <option value="all">ทุกเพศ</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </div>

        {/* 3. Risk Level / ระดับความเสี่ยง */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <AlertTriangle className="w-3 h-3 text-amber-500" /> ระดับความเสี่ยง
          </label>
          <select
            id="filter-risk"
            value={filters.riskLevel}
            onChange={(e) => setFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 text-slate-800 font-medium"
          >
            <option value="all">ทุกระดับความเสี่ยง</option>
            <option value="ต่ำ">ความเสี่ยงต่ำ (0-1 คะแนน)</option>
            <option value="ปานกลาง">ความเสี่ยงปานกลาง (2 คะแนน)</option>
            <option value="สูง">ความเสี่ยงสูง (≥ 4 คะแนน)</option>
          </select>
        </div>

        {/* 4. Month / เดือน */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <Calendar className="w-3 h-3 text-indigo-500" /> เดือนที่คัดกรอง
          </label>
          <select
            id="filter-month"
            value={filters.month}
            onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 font-medium"
          >
            <option value="all">ทุกเดือน (ไตรมาส 1/2569)</option>
            <option value="2026-01">มกราคม 2569</option>
            <option value="2026-02">กุมภาพันธ์ 2569</option>
            <option value="2026-03">มีนาคม 2569</option>
          </select>
        </div>

        {/* 5. Age Group / ช่วงอายุ */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            ช่วงอายุ
          </label>
          <select
            id="filter-age"
            value={filters.ageGroup}
            onChange={(e) => setFilters(prev => ({ ...prev, ageGroup: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-800 font-medium"
          >
            <option value="all">ทุกช่วงวัย</option>
            <option value="<30">&lt; 30 ปี (วัยหนุ่มสาว)</option>
            <option value="30-45">30 - 45 ปี (วัยทำงาน)</option>
            <option value="46-60">46 - 59 ปี (วัยกลางคน)</option>
            <option value=">60">≥ 60 ปี (ผู้สูงอายุ)</option>
          </select>
        </div>

        {/* 6. Smoking / สูบบุหรี่ */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <Cigarette className="w-3 h-3 text-rose-500" /> สูบบุหรี่
          </label>
          <select
            id="filter-smoking"
            value={filters.smoking}
            onChange={(e) => setFilters(prev => ({ ...prev, smoking: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 text-slate-800 font-medium"
          >
            <option value="all">ทั้งหมด</option>
            <option value="สูบ">สูบ</option>
            <option value="ไม่สูบ">ไม่สูบ</option>
          </select>
        </div>

        {/* 7. Exercise / ออกกำลังกาย */}
        <div>
          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mb-1">
            <Dumbbell className="w-3 h-3 text-emerald-500" /> ออกกำลังกาย
          </label>
          <select
            id="filter-exercise"
            value={filters.exercise}
            onChange={(e) => setFilters(prev => ({ ...prev, exercise: e.target.value }))}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-800 font-medium"
          >
            <option value="all">ทั้งหมด</option>
            <option value="สม่ำเสมอ">สม่ำเสมอ</option>
            <option value="บางครั้ง">บางครั้ง</option>
            <option value="ไม่ออกกำลังกาย">ไม่ออกกำลังกาย</option>
          </select>
        </div>

      </div>
    </div>
  );
};
