
"use client";
import { VIBES, Vibe } from "@/lib/siteConfig";

export default function VibePicker({
  value, onChange, counts
}:{ value: Vibe | "All" | null; onChange:(v:Vibe|"All")=>void; counts: Record<string, number> }){
  const items = ["All", ...VIBES] as const;
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(v => (
        <button key={v}
          onClick={()=>onChange(v)}
          className={`px-4 py-3 rounded-xl text-sm font-medium frost-card hover:shadow-md transition
            ${value===v ? "ring-2 ring-ice-600" : ""}`}
        >
          <span className="block">{v}</span>
          <span className="text-xs text-ice-900/60">{counts[v] ?? 0} q’s</span>
        </button>
      ))}
    </div>
  );
}
