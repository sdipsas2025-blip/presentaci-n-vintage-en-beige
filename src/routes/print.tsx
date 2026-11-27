import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SlideFrame, slides } from "@/components/deck/slides";

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title: "Imprimir presentación · A&P Tostadores" },
      { name: "description", content: "Versión para imprimir o guardar en PDF de la presentación." },
      { property: "og:title", content: "Imprimir presentación · A&P Tostadores" },
      { property: "og:description", content: "Versión imprimible de la presentación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrintDeck,
});

function PrintDeck() {
  useEffect(() => {
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) setTimeout(() => window.print(), 600);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-paper">
      {slides.map((s, i) => (
        <div key={s.title} className="print-slide">
          <SlideFrame n={i + 1} total={slides.length} {...(s.dark ? { dark: true } : {})}>{s.render()}</SlideFrame>
        </div>
      ))}
    </div>
  );
}
