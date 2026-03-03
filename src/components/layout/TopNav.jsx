import React from "react";
import { Save, FileText } from "lucide-react";

const tabs = ["Massing", "Facade", "Landscape", "Interior"];

export default function TopNav({ activeTab, setActiveTab }) {
  return (
    <div className="h-[60px] bg-[#12151c] border-b border-white/5 flex items-center px-5 gap-6">
      {/* Logo */}
      <div className="flex flex-col leading-tight mr-4">
        <div className="flex items-baseline gap-1">
          <span className="text-white font-black text-xl tracking-wide">WOW</span>
          <span className="text-white/50 text-xs font-light tracking-[0.2em] uppercase ml-1">Architects</span>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-[#c9a84c] to-transparent mt-[2px]" />
        <span className="text-white/30 text-[9px] tracking-widest uppercase mt-[2px]">Parametric Design Configurator</span>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1 ml-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[#c9a84c] text-black font-bold"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {tab}
            {(tab === "Landscape" || tab === "Interior") && (
              <span className="ml-1 text-white/30">›</span>
            )}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
          <Save className="w-3.5 h-3.5" />
          Save Project
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
          AW
        </div>
      </div>
    </div>
  );
}