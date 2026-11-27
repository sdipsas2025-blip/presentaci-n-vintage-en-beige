import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScaledSlide } from "@/components/deck/ScaledSlide";
import { SlideFrame, slides } from "@/components/deck/slides";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { slide?: number } => {
    const n = Number(search["slide"]);
    return n > 0 ? { slide: n } : {};
  },
  head: () => ({
    meta: [
      { title: "Manual Integral de Gestión · A&P Tostadores" },
      { name: "description", content: "Presentación del Manual Integral de Gestión y Control Organizacional de A&P Tostadores S.A.S." },
      { property: "og:title", content: "Manual Integral de Gestión · A&P Tostadores" },
      { property: "og:description", content: "Presentación vintage del manual de gestión de A&P Tostadores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

function Deck() {
  const total = slides.length;
  const { slide } = Route.useSearch();
  const navigate = Route.useNavigate();
  const index = Math.min(Math.max(slide ?? 1, 1), total) - 1;
  const [grid, setGrid] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), total - 1);
      void navigate({ to: ".", search: { slide: next + 1 }, replace: true });
    },
    [navigate, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(index - 1);
      else if (e.key.toLowerCase() === "g") setGrid((g) => !g);
      else if (e.key.toLowerCase() === "f" || e.key === "F5") { e.preventDefault(); void stageRef.current?.requestFullscreen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  useEffect(() => {
    document.title = `${index + 1}/${total} — ${slides[index]?.title ?? ""}`;
  }, [index, total]);

  const current = slides[index];

  return (
    <div className="flex h-screen flex-col bg-background font-serif text-foreground">
      <header className="flex items-center justify-between border-b border-caramel/30 px-6 py-3">
        <p className="font-display text-lg italic">A&amp;P Tostadores · Manual Integral de Gestión</p>
        <div className="flex gap-2 text-sm">
          <button onClick={() => setGrid((g) => !g)} className="rounded-sm border border-caramel/50 px-3 py-1.5 hover:bg-caramel/20">
            {grid ? "Ver diapositiva" : "Ver todas"}
          </button>
          <Link to="/print" target="_blank" className="rounded-sm border border-caramel/50 px-3 py-1.5 hover:bg-caramel/20">
            Exportar PDF
          </Link>
          <button onClick={() => void stageRef.current?.requestFullscreen()} className="rounded-sm bg-caramel px-3 py-1.5 text-paper hover:bg-caramel/80">
            Presentar
          </button>
        </div>
      </header>

      {grid ? (
        <div className="grid flex-1 grid-cols-2 gap-6 overflow-y-auto p-6 md:grid-cols-3 lg:grid-cols-4">
          {slides.map((s, i) => (
            <button key={s.title} onClick={() => { go(i); setGrid(false); }} className={`text-left ${i === index ? "ring-3 ring-caramel" : ""}`}>
              <div className="aspect-video">
                <ScaledSlide>
                  <SlideFrame n={i + 1} total={total} {...(s.dark ? { dark: true } : {})}>{s.render()}</SlideFrame>
                </ScaledSlide>
              </div>
              <p className="mt-2 text-sm text-foreground/70">{i + 1}. {s.title}</p>
            </button>
          ))}
        </div>
      ) : (
        <div
          ref={stageRef}
          className="relative flex-1 bg-background p-4"
          onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX;
            if (start == null || end == null) return;
            if (start - end > 50) go(index + 1);
            else if (end - start > 50) go(index - 1);
          }}
        >
          {current && (
            <ScaledSlide>
              <SlideFrame n={index + 1} total={total} {...(current.dark ? { dark: true } : {})}>{current.render()}</SlideFrame>
            </ScaledSlide>
          )}
        </div>
      )}

      {!grid && (
        <footer className="flex items-center justify-center gap-6 border-t border-caramel/30 py-3 text-sm">
          <button aria-label="Anterior" onClick={() => go(index - 1)} disabled={index === 0} className="rounded-sm border border-caramel/50 px-4 py-1.5 disabled:opacity-40">
            ← Anterior
          </button>
          <span className="tabular-nums">{index + 1} / {total}</span>
          <button aria-label="Siguiente" onClick={() => go(index + 1)} disabled={index === total - 1} className="rounded-sm border border-caramel/50 px-4 py-1.5 disabled:opacity-40">
            Siguiente →
          </button>
        </footer>
      )}
    </div>
  );
}
