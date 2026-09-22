import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KPICards } from './components/KPICards';
import { RiskTrendSection } from './components/RiskTrendSection';
import { BehaviorInsightsSection } from './components/BehaviorInsightsSection';
import { DataTableSection } from './components/DataTableSection';
import { HealthRecord, FilterState, ActiveTab } from './types';
import { INITIAL_RECORDS, fetchGoogleSheetData } from './data/initialData';
import { calculateKPIs } from './utils/analytics';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Table2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<HealthRecord[]>(INITIAL_RECORDS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [lastUpdated, setLastUpdated] = useState<string>('22 ก.ย. 2569, 10:30 น.');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const creatorName = 'นายณัฐพงษ์ อุตตะราชา';

  const [filters, setFilters] = useState<FilterState>({
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

  // Sync data from Google Sheet on mount and on refresh
  const syncData = async () => {
    setIsSyncing(true);
    try {
      const data = await fetchGoogleSheetData();
      if (data && data.length > 0) {
        setRecords(data);
        const now = new Date();
        const thaiMonths = [
          'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
          'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];
        const dateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} น.`;
        setLastUpdated(dateStr);
      }
    } catch (err) {
      console.warn("Sync failed, using active snapshot:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      if (filters.zone !== 'all' && item.zone !== filters.zone) return false;
      if (filters.gender !== 'all' && item.gender !== filters.gender) return false;
      if (filters.riskLevel !== 'all' && item.riskLevel !== filters.riskLevel) return false;
      if (filters.month !== 'all' && item.month !== filters.month) return false;
      if (filters.smoking !== 'all' && item.smoking !== filters.smoking) return false;
      if (filters.alcohol !== 'all' && item.alcohol !== filters.alcohol) return false;
      if (filters.exercise !== 'all' && item.exercise !== filters.exercise) return false;

      // Age group filter
      if (filters.ageGroup === '<30' && item.age >= 30) return false;
      if (filters.ageGroup === '30-45' && (item.age < 30 || item.age > 45)) return false;
      if (filters.ageGroup === '46-60' && (item.age < 46 || item.age > 59)) return false;
      if (filters.ageGroup === '>60' && item.age < 60) return false;

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchId = item.id.toLowerCase().includes(query);
        const matchZone = item.zone.toLowerCase().includes(query);
        const matchRisk = item.riskLevel.toLowerCase().includes(query);
        if (!matchId && !matchZone && !matchRisk) return false;
      }

      return true;
    });
  }, [records, filters]);

  // Statistics calculation
  const kpis = useMemo(() => calculateKPIs(filteredRecords), [filteredRecords]);

  return (
    <div className="min-h-screen bg-[#F6F8FA] text-slate-800 flex flex-col font-['Prompt',sans-serif]">
      
      {/* 1. Header & Navigation Controls */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastUpdated={lastUpdated}
        isSyncing={isSyncing}
        onRefresh={syncData}
        creatorName={creatorName}
        totalFiltered={filteredRecords.length}
        totalAll={records.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Filter Controls Bar */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          totalRecords={records.length}
          filteredCount={filteredRecords.length}
        />

        {/* Tab 1: Overview & KPI Cards */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Cards (Section 2) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-sky-100 text-sky-700">
                    <BarChart3 className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    สรุปตัวชี้วัดสุขภาพสำคัญ (Health Overview &amp; Statistical KPIs)
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  ประมวลผลจากข้อมูลที่กรอง ({filteredRecords.length} ราย)
                </span>
              </div>
              <KPICards kpis={kpis} records={filteredRecords} />
            </div>

            {/* Combined View: Risk Overview & Fast Trend Preview */}
            <div className="grid grid-cols-1 gap-6">
              <RiskTrendSection records={filteredRecords} />
            </div>

            {/* Quick Link to Table or Deep Insights */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-amber-50 to-emerald-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white text-sky-700 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    ต้องการเจาะลึก 5 มิติข้อมูลสุขภาพ หรือดูบันทึกคัดกรองรายบุคคล?
                  </h4>
                  <p className="text-xs text-slate-600">
                    สำรวจความสัมพันธ์ระหว่าง BMI, ระดับน้ำตาล, ความดันโลหิต และพฤติกรรมเสี่ยง
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('behaviors_insights')}
                  className="px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  วิเคราะห์ 5 ข้อมูลเชิงลึก
                </button>
                <button
                  onClick={() => setActiveTab('table')}
                  className="px-3.5 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  เปิดตารางตรวจคัดกรอง
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Health Risks & Health Trends */}
        {activeTab === 'risks_trends' && (
          <div className="space-y-6">
            <RiskTrendSection records={filteredRecords} />
          </div>
        )}

        {/* Tab 3: Health Behaviors & 5 Additional Insights */}
        {activeTab === 'behaviors_insights' && (
          <div className="space-y-6">
            <BehaviorInsightsSection records={filteredRecords} />
          </div>
        )}

        {/* Tab 4: In-depth Detail Table View */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <DataTableSection records={filteredRecords} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ระบบแดชบอร์ดเฝ้าระวังและวิเคราะห์สุขภาพเชิงรุก • Pastel Tech Design System</span>
          </div>
          <div className="flex items-center gap-3">
            <span>การคุ้มครองข้อมูล: รหัสคัดกรองนิรนาม (PDPA Compliant)</span>
            <span>•</span>
            <span className="font-medium text-slate-700">{creatorName}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
