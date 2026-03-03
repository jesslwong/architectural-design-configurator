import React, { useState } from "react";
import { Sun, Zap, DollarSign, Plus, FileText } from "lucide-react";

const IMG_A = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80&auto=format&fit=crop";
const IMG_B = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80&auto=format&fit=crop";

export default function DesignComparison() {
  const [activeOption, setActiveOption] = useState("B");

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-white font-semibold text-sm">Design Comparison</span>
        <div className="flex items-center gap-1.5">
          {["A", "B"].map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveOption(opt)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeOption === opt
                  ? "bg-[#2ec4e0] text-black"
                  : "bg-white/5 text-white/50 hover:text-white border border-white/10"
              }`}
            >
              Option {opt}
            </button>
          ))}
          <button className="flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-white/30 hover:text-white text-xs transition-colors">
            <Plus className="w-3 h-3" /> New Option
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-black text-xs font-bold transition-all"
            style={{ background: "linear-gradient(135deg, #2ec4e0, #1a9bbb)" }}>
            <FileText className="w-3 h-3" /> Generate Report
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-1">
        {/* Option A Card */}
        <OptionCard
          label="OPTION A"
          img={IMG_A}
          daylight={72}
          energy={26}
          cost="$1,920/m²"
          active={activeOption === "A"}
          accentColor="#2ec4e0"
          onSelect={() => setActiveOption("A")}
        />

        {/* Option B Card */}
        <OptionCard
          label="OPTION B"
          img={IMG_B}
          daylight={84}
          energy={21}
          cost="$2,050/m²"
          active={activeOption === "B"}
          accentColor="#2ec4e0"
          onSelect={() => setActiveOption("B")}
        />

        {/* Summary */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-white font-semibold text-sm">Summary</span>
          <div className="flex flex-col gap-2">
            <ComparisonBar label="Performance" aVal={72} bVal={84} />
            <ComparisonBar label="Cost" aVal={60} bVal={70} color="#c9a84c" />
            <ComparisonBar label="Sustainability" aVal={65} bVal={80} color="#22c55e" />
          </div>
          <div className="mt-1 p-2 rounded-xl bg-white/5 border border-white/5">
            <p className="text-white/40 text-xs">Recommendation:</p>
            <p className="text-[#2ec4e0] font-bold text-sm">Option B</p>
            <p className="text-white/30 text-[10px]">Higher score & efficiency</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionCard({ label, img, daylight, energy, cost, active, accentColor, onSelect }) {
  return (
    <div className={`w-[160px] flex-shrink-0 flex flex-col rounded-xl overflow-hidden border transition-all ${active ? "border-[#2ec4e0]/60" : "border-white/5"}`}
      style={{ background: "#12151c" }}>
      <div className="relative">
        <img src={img} alt={label} className="w-full h-20 object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-transparent to-transparent" />
        <span className="absolute top-1.5 left-2 text-white/60 text-[9px] font-bold tracking-widest">{label}</span>
      </div>
      <div className="flex flex-col gap-1 px-2 py-1.5 flex-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/40 flex items-center gap-1"><Sun className="w-2.5 h-2.5" /> Daylight</span>
          <span className="text-[#2ec4e0] font-semibold">{daylight}%</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/40 flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> Energy</span>
          <span className="text-orange-400 font-semibold">{energy}%</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/40 flex items-center gap-1"><DollarSign className="w-2.5 h-2.5" /> Cost</span>
          <span className="text-white font-semibold">{cost}</span>
        </div>
        <button
          onClick={onSelect}
          className="mt-1 w-full py-1 rounded-lg text-[10px] font-semibold transition-all"
          style={{
            background: active ? accentColor : "rgba(255,255,255,0.05)",
            color: active ? "black" : "rgba(255,255,255,0.5)",
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
}

function ComparisonBar({ label, aVal, bVal, color = "#2ec4e0" }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-white/40 text-[10px]">{label}</span>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${bVal}%`, background: color }}
        />
      </div>
    </div>
  );
}