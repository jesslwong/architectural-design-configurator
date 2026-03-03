import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=300&q=80&auto=format&fit=crop",
];

export default function ImageGallery() {
  const [selected, setSelected] = useState(2);

  return (
    <div className="h-[110px] bg-[#0a0c11] border-t border-white/5 flex items-center px-4 gap-3 overflow-hidden">
      <button className="text-white/30 hover:text-white transition-colors flex-shrink-0">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
            style={{
              width: selected === i ? 130 : 110,
              height: selected === i ? 85 : 75,
              border: selected === i ? "2px solid #c9a84c" : "2px solid transparent",
              boxShadow: selected === i ? "0 0 12px #c9a84c40" : "none",
              opacity: selected === i ? 1 : 0.5,
              transition: "all 0.3s",
            }}
          >
            <img src={img} alt={`Option ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <button className="text-white/30 hover:text-white transition-colors flex-shrink-0">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}