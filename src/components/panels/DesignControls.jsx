import React from "react";
import { RotateCcw, Sparkles } from "lucide-react";

const sliders = [
  { key: "facadeDepth", label: "Facade Depth", unit: "m", min: 0.5, max: 6, step: 0.1 },
  { key: "panelRhythm", label: "Panel Rhythm", unit: "m", min: 0.5, max: 4, step: 0.1 },
  { key: "balconySize", label: "Balcony Size", unit: "m", min: 0.5, max: 5, step: 0.1 },
  { key: "shadingAngle", label: "Shading Angle", unit: "°", min: 0, max: 90, step: 1 },
  { key: "glassRatio", label: "Glass Ratio", unit: "%", min: 10, max: 95, step: 1 },
  { key: "greenery", label: "Greenery", unit: "%", min: 0, max: 80, step: 1 },
];

const getPercent = (val, min, max) => ((val - min) / (max - min)) * 100;

export default function DesignControls({ params, updateParam }) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-semibold">Design Controls</span>
        <button className="text-white/20 hover:text-white/50 transition-colors">
          <span className="text-base">···</span>
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {sliders.map(({ key, label, unit, min, max, step }) => {
          const val = params[key];
          const pct = getPercent(val, min, max);
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs">{label}</span>
                <span className={`text-xs font-semibold ${key === "shadingAngle" ? "text-[#c9a84c]" : "text-white"}`}>
                  {val}{unit}
                </span>
              </div>
              <div className="relative h-1 rounded-full bg-white/10">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: key === "shadingAngle"
                      ? "linear-gradient(90deg, #c9a84c, #e8c96e)"
                      : "linear-gradient(90deg, #1a9bbb, #2ec4e0)",
                  }}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={val}
                  onChange={(e) => updateParam(key, parseFloat(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 shadow-lg pointer-events-none"
                  style={{
                    left: `calc(${pct}% - 6px)`,
                    borderColor: key === "shadingAngle" ? "#c9a84c" : "#2ec4e0",
                    background: "#12151c",
                    boxShadow: `0 0 6px ${key === "shadingAngle" ? "#c9a84c80" : "#2ec4e080"}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-xs font-medium transition-all">
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-black text-xs font-bold transition-all"
          style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96e)" }}>
          <Sparkles className="w-3 h-3" />
          AI Optimize
        </button>
      </div>
    </div>
  );
}