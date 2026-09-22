import React, { useState } from 'react';
import { 
  Activity, 
  RefreshCw, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Table2,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lastUpdated: string;
  isSyncing: boolean;
  onRefresh: () => void;
  creatorName: string;
  setCreatorName: (name: string) => void;
  totalFiltered: number;
  totalAll: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lastUpdated,
  isSyncing,
  onRefresh,
  creatorName,
  setCreatorName,
  totalFiltered,
  totalAll
}) => {
  const [isEditingCreator, setIsEditingCreator] = useState(false);
  const [tempCreator, setTempCreator] = useState(creatorName);

  const handleSaveCreator = () => {
    if (tempCreator.trim()) {
      setCreatorName(tempCreator.trim());
    }
    setIsEditingCreator(false);
  };

  const navItems = [
    { id: 'overview' as ActiveTab, label: 'ภาพรวมและตัวชี้วัด KPI', sublabel: 'Health Overview', icon: BarChart3 },
    { id: 'risks_trends' as ActiveTab, label: 'ความเสี่ยงและแนวโน้มสุขภาพ', sublabel: 'Health Risks & Trends', icon: TrendingUp },
    { id: 'behaviors_insights' as ActiveTab, label: 'พฤติกรรมและข้อมูลเชิงลึก', sublabel: 'Behaviors & 5 Insights', icon: PieChart },
    { id: 'table' as ActiveTab, label: 'ตารางคัดกรองเชิงลึก', sublabel: 'Detailed Records', icon: Table2 },
  ];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      {/* Top Banner / Identity Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Main Title & Objective */}
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Pastel Tech Analytics
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100/70 text-sky-800 border border-sky-200/80">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                NCDs Health Surveillance
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                แสดงผล {totalFiltered} จาก {totalAll} ระเบียน
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 text-sky-700 shadow-xs">
                <Activity className="w-6 h-6 sm:w-7 sm:h-7" />
              </span>
              ระบบแดชบอร์ดเฝ้าระวังและวิเคราะห์สุขภาพเชิงรุก
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              แดชบอร์ดบูรณาการข้อมูลคัดกรองสุขภาพปฐมภูมิ เพื่อวิเคราะห์แนวโน้มสุขภาพ ประเมินระดับความเสี่ยงโรคไม่ติดต่อเรื้อรัง (NCDs) และพฤติกรรมเสี่ยงสำหรับการส่งเสริมสุขภาพอย่างตรงจุด
            </p>
          </div>

          {/* Metadata: Last Updated & Author Profile */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 text-xs shrink-0">
            {/* Sync & Timestamp */}
            <div className="flex items-center gap-2 bg-slate-50/90 border border-slate-200/70 px-3 py-1.5 rounded-xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>อัปเดตล่าสุด: <strong className="text-slate-800 font-semibold">{lastUpdated}</strong></span>
              </div>
              <button
                type="button"
                onClick={onRefresh}
                disabled={isSyncing}
                title="รีเฟรชและซิงก์ข้อมูลจากฐานข้อมูล"
                className="ml-1 p-1 hover:bg-white rounded-lg text-slate-600 hover:text-sky-600 transition-colors border border-transparent hover:border-slate-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-600' : ''}`} />
              </button>
            </div>

            {/* Creator Information */}
            <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200/80 px-3 py-1.5 rounded-xl">
              <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
              {isEditingCreator ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempCreator}
                    onChange={(e) => setTempCreator(e.target.value)}
                    className="px-1.5 py-0.5 text-xs bg-white border border-amber-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="ชื่อ-นามสกุล ผู้จัดทำ"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveCreator}
                    className="text-[11px] px-2 py-0.5 bg-amber-600 text-white rounded hover:bg-amber-700 font-medium"
                  >
                    บันทึก
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="text-slate-700">
                    <span className="text-slate-500 font-medium">ผู้จัดทำ: </span>
                    <span className="font-semibold text-slate-900">{creatorName}</span>
                  </div>
                  <button
                    onClick={() => {
                      setTempCreator(creatorName);
                      setIsEditingCreator(true);
                    }}
                    className="text-[10px] text-amber-700 underline hover:text-amber-900 ml-1 font-medium"
                    title="แก้ไขชื่อผู้จัดทำ"
                  >
                    (แก้ไข)
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Navigation Tabs (ระบบนำทาง Navigation Controls) */}
        <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1.5 sm:space-x-2" aria-label="Dashboard Tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-100 text-sky-900 shadow-xs border border-sky-300/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-700' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div>{item.label}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
