import React from "react";
import { RotateCw, ZoomIn, Maximize2 } from "lucide-react";

const viewTabs = ["3D View", "Wireframe", "Concept A", "Concept B"];

const BUILDING_IMG = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=90&auto=format&fit=crop";

export default function BuildingViewer({ activeView, setActiveView }) {
  return (
    <div className="flex-1 relative overflow-hidden bg-[#0a0c11]">
      {/* View Tabs */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
        {viewTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveView(tab)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeView === tab
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sun compass overlay */}
      <div className="absolute top-3 right-3 z-20">
        <SunCompass />
      </div>

      {/* Building Image */}
      <div className="w-full h-full">
        <img
          src={BUILDING_IMG}
          alt="Building 3D View"
          className="w-full h-full object-cover opacity-90"
          style={{ filter: "brightness(0.85) contrast(1.1)" }}
        />
        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3">
        <span className="text-white font-semibold text-sm">Design Options</span>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors">
            <RotateCw className="w-3.5 h-3.5" /> Rotate
          </button>
          <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors">
            <ZoomIn className="w-3.5 h-3.5" /> Zoom
          </button>
          <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors">
            <Maximize2 className="w-3.5 h-3.5" /> Reset View
          </button>
        </div>
      </div>
    </div>
  );
}

function SunCompass() {
  return (
    <div className="w-16 h-16 relative">
      <svg viewBox="0 0 64 64" className="w-full h-full opacity-80">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="32" cy="32" r="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="32" y1="8" x2="32" y2={deg % 90 === 0 ? "14" : "11"}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
        <text x="32" y="6" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">N</text>
        <text x="60" y="34" textAnchor="middle" fill="white" fontSize="5">E</text>
        <text x="32" y="62" textAnchor="middle" fill="white" fontSize="5">S</text>
        <text x="4" y="34" textAnchor="middle" fill="white" fontSize="5">W</text>
        {/* Sun indicator */}
        <circle cx="44" cy="14" r="4" fill="#c9a84c" opacity="0.9" />
        <circle cx="44" cy="14" r="6" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
        <text x="44" y="16.5" textAnchor="middle" fill="black" fontSize="4" fontWeight="bold">92</text>
      </svg>
    </div>
  );
}