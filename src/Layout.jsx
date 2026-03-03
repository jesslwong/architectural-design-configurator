import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d0f14] text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #0d0f14; overflow: hidden; }
      `}</style>
      {children}
    </div>
  );
}