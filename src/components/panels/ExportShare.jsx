import React from "react";
import { Download, Link2, Check, ChevronDown } from "lucide-react";

const EXPORT_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80&auto=format&fit=crop";

const exportItems = [
  "3D Model (Rhino)",
  "2D Drawings (PDF)",
  "Performance Report",
  "Cost Estimate",
];

const steps = ["Design", "Analyze", "Iterate", "Finalize"];

export default function ExportShare() {
  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Export & Share</span>
        <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors border border-white/10 rounded-lg px-2 py-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-[8px] font-bold text-white">AW</div>
          Client View
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-3 flex-1">
        {/* Building image */}
        <div className="w-[140px] flex-shrink-0 rounded-xl overflow-hidden">
          <img src={EXPORT_IMG} alt="Export preview" className="w-full h-full object-cover opacity-80" />
        </div>

        {/* Checklist + Actions */}
        <div className="flex-1 flex flex-col gap-2">
          {exportItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-[#2ec4e0]/20 border border-[#2ec4e0]/40 flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-[#2ec4e0]" />
              </div>
              <span className="text-white/60 text-xs">{item}</span>
            </div>
          ))}

          <button className="mt-auto w-full py-2 rounded-xl text-black font-bold text-xs flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #2ec4e0, #1a9bbb)" }}>
            <Download className="w-3.5 h-3.5" />
            Download Package
          </button>
          <button className="w-full py-1.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-xs flex items-center justify-center gap-2 transition-all">
            <Link2 className="w-3 h-3" />
            Share Link
          </button>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="flex items-center justify-center gap-2 mt-auto">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <span className={`text-xs font-medium ${step === "Analyze" ? "text-[#2ec4e0]" : "text-white/30"}`}>
              {step}
            </span>
            {i < steps.length - 1 && (
              <div className="flex items-center">
                <div className="w-4 h-[1px]" style={{ background: i < 1 ? "#2ec4e0" : "rgba(255,255,255,0.1)" }} />
                <div className="w-0 h-0 border-t-2 border-b-2 border-l-4 border-transparent"
                  style={{ borderLeftColor: i < 1 ? "#2ec4e0" : "rgba(255,255,255,0.1)" }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}