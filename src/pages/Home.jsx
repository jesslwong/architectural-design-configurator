import React, { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import DesignControls from "@/components/panels/DesignControls";
import BuildingViewer from "@/components/panels/BuildingViewer";
import PerformancePanel from "@/components/panels/PerformancePanel";
import DesignComparison from "@/components/panels/DesignComparison";
import FacadeCustomization from "@/components/panels/FacadeCustomization";
import ExportShare from "@/components/panels/ExportShare";
import ImageGallery from "@/components/panels/ImageGallery";

export default function Home() {
  const [params, setParams] = useState({
    facadeDepth: 3.2,
    panelRhythm: 1.8,
    balconySize: 2.5,
    shadingAngle: 45,
    glassRatio: 65,
    greenery: 30,
  });

  const [activeView, setActiveView] = useState("3D View");
  const [activeTab, setActiveTab] = useState("Facade");

  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white font-sans">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-60px)] overflow-hidden">
        {/* Left Panel - Design Controls */}
        <div className="w-[220px] min-w-[220px] flex flex-col bg-[#12151c] border-r border-white/5 overflow-y-auto">
          <DesignControls params={params} updateParam={updateParam} />
        </div>

        {/* Center - Building Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <BuildingViewer activeView={activeView} setActiveView={setActiveView} />
          <ImageGallery />
        </div>

        {/* Right Panel - Performance + Export */}
        <div className="w-[260px] min-w-[260px] flex flex-col bg-[#12151c] border-l border-white/5 overflow-y-auto">
          <PerformancePanel params={params} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex border-t border-white/5 bg-[#0d0f14]" style={{ minHeight: 220 }}>
        <div className="flex-1 border-r border-white/5">
          <DesignComparison />
        </div>
        <div className="flex-1 border-r border-white/5">
          <FacadeCustomization params={params} updateParam={updateParam} />
        </div>
        <div className="flex-1">
          <ExportShare />
        </div>
      </div>
    </div>
  );
}