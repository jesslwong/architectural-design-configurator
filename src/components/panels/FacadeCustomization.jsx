import React, { useState } from "react";

const BUILDING_FACADE = "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=400&q=80&auto=format&fit=crop";

const getPercent = (val, min, max) => ((val - min) / (max - min)) * 100;

export default function FacadeCustomization({ params, updateParam }) {
  const facadeSliders = [
    { key: "facadeDepth", label: "Depth", unit: "m", min: 0.5, max: 6, step: 0.1, display: `${params.facadeDepth.toFixed(1)}m` },
    { key: "panelRhythm", label: "Rhythm", unit: "cm", min: 30, max: 150, step: 1, display: `${Math.round(params.panelRhythm * 100)} cm` },
    { key: "shadingAngle", label: "Rotation", unit: "°", min: 0, max: 90, step: 1, display: `${params.shadingAngle}°` },
  ];

  const materials = [
    { color: "#c0c5cc" },
    { color: "#4a4e57" },
    { color: "#8b4513" },
  ];

  const [selectedMat, setSelectedMat] = useState(0);

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Facade Customization</span>
      </div>

      <div className="flex gap-3 flex-1">
        {/* Sliders */}
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-[9px] tracking-widest uppercase text-white/25 font-semibold">Parameters</span>
          {facadeSliders.map(({ key, label, unit, min, max, step, display }) => {
            const pct = getPercent(params[key], min, max);
            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-white/50 text-xs">{label}</span>
                  <span className="text-white/80 text-xs font-medium">{display}</span>
                </div>
                <div className="relative h-1 rounded-full bg-white/10">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, #1a9bbb, #2ec4e0)",
                    }}
                  />
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={params[key]}
                    onChange={(e) => updateParam(key, parseFloat(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#2ec4e0] bg-[#12151c] pointer-events-none"
                    style={{ left: `calc(${pct}% - 5px)` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Material */}
          <div>
            <span className="text-white/50 text-xs">Material</span>
            <div className="flex gap-2 mt-1">
              {materials.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMat(i)}
                  className="w-7 h-7 rounded-md border-2 transition-all"
                  style={{
                    background: m.color,
                    borderColor: selectedMat === i ? "#2ec4e0" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>

          <button className="mt-auto w-full py-2 rounded-xl text-black font-bold text-xs transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #2ec4e0, #1a9bbb)" }}>
            Apply & Update
          </button>
        </div>

        {/* Facade Image */}
        <div className="w-[110px] rounded-xl overflow-hidden flex-shrink-0 relative">
          <img src={BUILDING_FACADE} alt="Facade" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Daylight Analysis */}
        <div className="w-[130px] flex-shrink-0 flex flex-col gap-2">
          <span className="text-white/50 text-xs font-medium">Daylight Analysis</span>
          <DaylightMap />
          <div className="flex flex-col gap-1">
            <LegendItem color="#c9a84c" label="Solar Heat Gain" />
            <LegendItem color="#2ec4e0" label="Shading Efficiency" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DaylightMap() {
  // Simple colorful heatmap representation
  const colors = [
    ["#ff4444", "#ff6644", "#ff8844", "#ffaa44", "#ffcc44"],
    ["#ff6644", "#ffaa44", "#ffcc44", "#eecc44", "#ccee44"],
    ["#ffaa44", "#ffcc44", "#eecc44", "#88cc44", "#44cc88"],
    ["#ffcc44", "#eecc44", "#88cc44", "#44cc88", "#2ec4e0"],
    ["#eecc44", "#88cc44", "#44cc88", "#2ec4e0", "#1a9bbb"],
  ];

  return (
    <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "1" }}>
      <div className="grid grid-cols-5 h-full">
        {colors.flat().map((color, i) => (
          <div key={i} style={{ background: color, opacity: 0.85 }} />
        ))}
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-4 h-0.5 rounded-full" style={{ background: color }} />
      <span className="text-white/30 text-[9px]">{label}</span>
    </div>
  );
}