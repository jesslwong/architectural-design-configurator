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

const defaults = {
  facadeDepth: 3.2, panelRhythm: 1.8, balconySize: 2.5,
  shadingAngle: 45, glassRatio: 65, greenery: 30,
};

const getPercent = (val, min, max) => ((val - min) / (max - min)) * 100;

export default function DesignControls({ params, updateParam }) {
  const handleReset = () => {
    Object.entries(defaults).forEach(([key, val]) => updateParam(key, val));
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-semibold">Design Controls</span>
        <button className="text-white/20 hover:text-white/50 transition-colors">
          <span className="text-base">···</span>
        </button>
      </div>

      <style>{`
        .custom-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 20px;
          background: transparent;
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          margin: 0;
          padding: 0;
        }
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #12151c;
          cursor: pointer;
          border: 2px solid #2ec4e0;
          box-shadow: 0 0 6px #2ec4e080;
        }
        .custom-slider.gold::-webkit-slider-thumb {
          border-color: #c9a84c;
          box-shadow: 0 0 6px #c9a84c80;
        }
        .custom-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #12151c;
          cursor: pointer;
          border: 2px solid #2ec4e0;
          box-shadow: 0 0 6px #2ec4e080;
        }
      `}</style>

      <div className="flex flex-col gap-5">
        {sliders.map(({ key, label, unit, min, max, step }) => {
          const val = params[key];
          const pct = getPercent(val, min, max);
          const isGold = key === "shadingAngle";
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-xs">{label}</span>
                <span className={`text-xs font-semibold ${isGold ? "text-[#c9a84c]" : "text-white"}`}>
                  {val}{unit}
                </span>
              </div>
              <div className="relative h-1 rounded-full bg-white/10" style={{ marginTop: 6, marginBottom: 6 }}>
                <div
                  className="absolute left-0 top-0 h-full rounded-full pointer-events-none"
                  style={{
                    width: `${pct}%`,
                    background: isGold
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
                  className={`custom-slider ${isGold ? "gold" : ""}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleReset}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-xs font-medium transition-all"
        >
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