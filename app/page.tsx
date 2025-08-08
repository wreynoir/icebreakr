
"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import VibePicker from "@/components/VibePicker";
import IceButton from "@/components/IceButton";
import { VIBES, Vibe, SUBMIT_FORM_URL } from "@/lib/siteConfig";
import questions from "@/data/questions.json";
import { pickRandom } from "@/lib/random";

type Q = { id:string; text:string; vibe:Vibe };

export default function Home() {
  const [vibe, setVibe] = useState<Vibe | "All" | null>("All");
  const [current, setCurrent] = useState<Q | null>(null);
  const history = useRef<Q[]>([]);

  const qs = questions as Q[];

  const counts = useMemo(()=>{
    const c: Record<string, number> = { All: qs.length };
    VIBES.forEach(v => c[v] = qs.filter(q=>q.vibe===v).length);
    return c;
  }, [qs]);

  const pool = useMemo(() => {
    if (!vibe || vibe==="All") return qs;
    return qs.filter(q => q.vibe === vibe);
  }, [qs, vibe]);

  const breakIce = () => {
    if (!pool.length) return;
    const next = pickRandom(pool, 12, history.current, (q)=>q.id);
    history.current.push(next);
    setCurrent(next);
  };

  useEffect(()=>{ if (!current && pool.length) setCurrent(pool[Math.floor(Math.random()*pool.length)]); },[]);

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <div className="mx-auto w-28 h-28 rounded-2xl frost-card flex items-center justify-center overflow-hidden">
          {/* If /public/logo.png exists it will render; else the alt shows */}
          <Image src="/logo.png" alt="Icebreakr Logo" width={112} height={112} />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-ice-800">Icebreakr</h1>
        <p className="text-ice-800/80 mt-1">Break the awkward silence with perfect conversation starters.</p>
      </header>

      <section className="frost-card p-4 mb-6">
        <h2 className="font-semibold mb-2">Choose your vibe</h2>
        <VibePicker value={vibe} onChange={setVibe} counts={counts} />
        <div className="mt-4">
          <IceButton onClick={breakIce}>{current ? "Another one" : "Break the Ice"}</IceButton>
        </div>
      </section>

      <section>
        {current && (
          <div className="frost-card p-5">
            <div className="text-sm uppercase tracking-wide text-ice-800/60">{current.vibe}</div>
            <p className="mt-2 text-lg font-medium">{current.text}</p>
            <div className="mt-4">
              <a href={SUBMIT_FORM_URL} target="_blank" className="block w-full py-3 text-center rounded-xl font-semibold text-ice-800 frost-card hover:shadow-md">
                Submit a question
              </a>
            </div>
          </div>
        )}
      </section>

      <footer className="mt-8 text-center text-xs text-ice-800/60">
        © {new Date().getFullYear()} Icebreakr
      </footer>
    </main>
  );
}
