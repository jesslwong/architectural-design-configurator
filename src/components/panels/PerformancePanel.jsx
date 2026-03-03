import React, { useState } from "react";
import { Sun, Zap, TrendingUp, Lock, FileText } from "lucide-react";

const materials = [
  { color: "#c0c5cc", label: "Concrete" },
  { color: "#4a4e57", label: "Dark Steel" },
  { color: "#8b4513", label: "Timber" },
];

export default function PerformancePanel({ params }) {
  const score = Math.min(99, Math.round(60 + params.glassRatio * 0.3 + params.greenery * 0.2));
  const daylight = Math.min(99, Math.round(70 + params.glassRatio * 0.25 + params.shadingAngle * 0.1));
  const energy = Math.round(20 + (90 - params.glassRatio) * 0.2 + params.greenery * 0.1);
  const solarGain = Math.round(15 + params.shadingAngle * 0.15);
  const cost = (2000 + params.facadeDepth * 100 + params.balconySize * 80).toFixed(0);

  const [liveSimulation, setLiveSimulation] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-4 flex flex-col gap-5">
      {/* Generate Report */}
      <button className="w-full py-2.5 rounded-xl text-black font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
        style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96e)" }}>
        <FileText className="w-4 h-4" />
        Generate Report
      </button>

      {/* Performance Metrics Header */}
      <div>
        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-semibold">Performance Metrics</span>

        {/* Score Circle */}
        <div className="flex items-center gap-4 mt-3">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle
                cx="44" cy="44" r="36"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a9bbb" />
                  <stop offset="100%" stopColor="#2ec4e0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">{score}</span>
              <span className="text-white/30 text-[8px]">/100</span>
              <span className="text-white/30 text-[7px] mt-0.5">Score</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm">Score</span>
            <span className="text-white/40 text-xs">saliability</span>
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
              Excellent
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-3">
        <MetricRow icon={<Sun className="w-3.5 h-3.5 text-yellow-400" />} label="Daylight" value={`${daylight}%`} color="text-white" />
        <MetricRow icon={<Zap className="w-3.5 h-3.5 text-orange-400" />} label="Energy" value={`${energy}%`} color="text-orange-400" trend="▲" />
        <MetricRow icon={<TrendingUp className="w-3.5 h-3.5 text-red-400" />} label="Solar Gain" value={`${solarGain}%`} color="text-red-400" trend="▲" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-white/30" />
            <span className="text-white/50 text-xs">Cost Estimate</span>
          </div>
          <span className="text-[#c9a84c] font-bold text-sm">${cost}<span className="text-white/30 text-[10px] font-normal"> /m²</span></span>
        </div>
      </div>

      {/* Live Simulation Toggle */}
      <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/60 text-xs">Live Simulation</span>
        </div>
        <button
          onClick={() => setLiveSimulation(!liveSimulation)}
          className={`w-9 h-5 rounded-full transition-all relative ${liveSimulation ? "bg-[#2ec4e0]" : "bg-white/10"}`}
        >
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${liveSimulation ? "right-0.5" : "left-0.5"}`} />
        </button>
      </div>

      {/* Material Palette */}
      <div>
        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-semibold block mb-2">Material Palette</span>
        <div className="flex items-center gap-2">
          {materials.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMaterial(i)}
              className="w-9 h-9 rounded-lg border-2 transition-all"
              style={{
                background: m.color,
                borderColor: selectedMaterial === i ? "#c9a84c" : "transparent",
                boxShadow: selectedMaterial === i ? "0 0 8px #c9a84c60" : "none",
              }}
              title={m.label}
            />
          ))}
          <button className="px-2 py-1 rounded-lg border border-white/10 text-white/40 hover:text-white text-xs transition-colors">
            + Custom
          </button>
        </div>
      </div>

      {/* Export PDF */}
      <button className="w-full py-2.5 rounded-xl border border-[#c9a84c]/40 text-[#c9a84c] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#c9a84c]/10 transition-all mt-auto">
        Export PDF
      </button>
    </div>
  );
}

function MetricRow({ icon, label, value, color, trend }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-white/50 text-xs">{label}</span>
      </div>
      <span className={`font-semibold text-sm ${color}`}>
        {value}{trend && <span className="text-[10px] ml-0.5">{trend}</span>}
      </span>
    </div>
  );
}