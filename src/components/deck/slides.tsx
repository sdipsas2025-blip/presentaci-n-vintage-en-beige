import type { ReactNode } from "react";
import finca from "@/assets/finca.jpg.asset.json";
import tostadora from "@/assets/tostadora.jpg.asset.json";
import archivo from "@/assets/archivo.jpg.asset.json";
import rama from "@/assets/rama.jpg.asset.json";

export type SlideDef = { title: string; dark?: boolean; render: () => ReactNode };

function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" className={`h-6 w-[400px] text-caramel ${className}`} aria-hidden>
      <line x1="0" y1="12" x2="170" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M200 2 L210 12 L200 22 L190 12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="178" cy="12" r="3" fill="currentColor" />
      <circle cx="222" cy="12" r="3" fill="currentColor" />
      <line x1="230" y1="12" x2="400" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Paper page with a double engraved frame and a footer. */
export function SlideFrame({ n, total, dark, children }: { n: number; total: number; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`slide-content ${dark ? "slide-dark" : ""}`}>
      <div className={`pointer-events-none absolute inset-8 border-2 ${dark ? "border-caramel/70" : "border-espresso/60"}`} />
      <div className={`pointer-events-none absolute inset-11 border ${dark ? "border-caramel/40" : "border-espresso/30"}`} />
      <div className="absolute inset-0 px-32 pb-28 pt-24">{children}</div>
      <div className={`absolute bottom-16 left-32 right-32 flex items-center justify-between ${dark ? "text-paper/70" : "text-ink-soft"}`}>
        <span className="slide-chrome">A&amp;P Tostadores S.A.S · Manual Integral de Gestión</span>
        <span className="slide-chrome">{String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

function Header({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14">
      <p className="slide-kicker text-caramel">{kicker}</p>
      <h2 className="slide-title mt-4">{title}</h2>
      <Ornament className="mt-6" />
    </div>
  );
}

function Chapter({ num, title, text, img }: { num: string; title: string; text: string; img: string }) {
  return (
    <div className="grid h-full grid-cols-[1fr_640px] items-center gap-24">
      <div>
        <p className="slide-kicker text-caramel">Capítulo {num}</p>
        <h2 className="slide-title-lg mt-6">{title}</h2>
        <Ornament className="mt-10" />
        <p className="slide-body-lg mt-10 max-w-[900px] italic text-ink-soft">{text}</p>
      </div>
      <img src={img} alt="" className="engraving h-[640px] w-[640px] rounded-full border-4 border-double border-espresso/50 object-cover" />
    </div>
  );
}

function Numbered({ items, cols = 1 }: { items: [string, string][]; cols?: 1 | 2 | 3 }) {
  const grid = cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1";
  return (
    <div className={`grid ${grid} gap-x-16 gap-y-14`}>
      {items.map(([t, d], i) => (
        <div key={t} className="flex gap-6">
          <span className="slide-subtitle shrink-0 not-italic text-caramel">{["I", "II", "III", "IV", "V", "VI", "VII"][i]}.</span>
          <div className="min-w-0">
            <p className="slide-body-lg font-semibold">{t}</p>
            {d && <p className="slide-body mt-2 text-ink-soft">{d}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export const slides: SlideDef[] = [
  {
    title: "Portada",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_820px] items-center gap-20">
        <div>
          <p className="slide-kicker text-caramel">A&amp;P Tostadores S.A.S</p>
          <h1 className="slide-title mt-8">Manual Integral de Gestión y Control Organizacional</h1>
          <Ornament className="mt-10" />
          <p className="slide-subtitle mt-10 text-ink-soft">Café que conecta personas, ideas y grandes historias</p>
          <p className="slide-chrome mt-10 text-ink-soft">Código GTH-MIGCO-001 · Versión 001 · 22/10/2026</p>
        </div>
        <img src={finca.url} alt="Grabado de una finca cafetera" className="engraving h-[560px] w-[820px] border-8 border-double border-espresso/40 object-cover" />
      </div>
    ),
  },
  {
    title: "Contenido",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_520px] gap-24">
        <div>
          <Header kicker="Índice" title="Contenido del manual" />
          <div className="space-y-8">
            {[
              ["01", "Introducción, objetivos y alcance"],
              ["02", "Gestión de procesos y procedimientos"],
              ["03", "Gestión documental"],
              ["04", "Auditoría y control interno"],
            ].map(([n, t]) => (
              <div key={n} className="flex items-baseline gap-8 border-b border-dashed border-espresso/30 pb-5">
                <span className="slide-title text-caramel">{n}</span>
                <span className="slide-body-lg">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <img src={rama.url} alt="Grabado botánico de una rama de café" className="engraving h-[800px] w-[520px] object-cover" />
      </div>
    ),
  },
  {
    title: "Introducción",
    render: () => (
      <div>
        <Header kicker="Introducción" title="Una herramienta para gestionar, controlar y mejorar" />
        <div className="grid grid-cols-2 gap-20">
          <p className="slide-body-lg">
            El manual establece los lineamientos para <em>planificar, organizar, dirigir, supervisar, evaluar y controlar</em> los procesos de la organización, fortaleciendo su desempeño y promoviendo la mejora continua.
          </p>
          <div className="space-y-6 border-l-2 border-caramel/60 pl-12">
            <p className="slide-body"><strong>Áreas:</strong> administrativas, productivas, formativas, comerciales y de apoyo.</p>
            <p className="slide-body"><strong>Actividad:</strong> tostión artesanal, maquila, trilla, molienda, formación de baristas y acompañamiento a caficultores.</p>
            <p className="slide-body"><strong>Referentes:</strong> ISO 9001, ISO 19011 y normativa colombiana.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Objetivos",
    render: () => (
      <div>
        <Header kicker="1 · Objetivos" title="Objetivo general y específicos" />
        <div className="grid grid-cols-[640px_1fr] gap-20">
          <div className="border-2 border-double border-espresso/40 bg-paper-deep/50 p-12">
            <p className="slide-kicker text-caramel">General</p>
            <p className="slide-body mt-6">Establecer los lineamientos para la gestión y el control integral de la empresa, orientados al cumplimiento de sus objetivos y al mejoramiento continuo.</p>
          </div>
          <Numbered
            items={[
              ["Planificar y controlar los procesos", ""],
              ["Definir responsabilidades y autoridad", ""],
              ["Medir con indicadores y control interno", ""],
              ["Identificar y controlar riesgos", ""],
              ["Mejorar con auditorías y acciones correctivas", ""],
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    title: "Alcance",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_560px] items-center gap-24">
        <div>
          <Header kicker="2 · Alcance" title="¿A quién está dirigido?" />
          <p className="slide-body-lg max-w-[950px]">A la Gerencia General, directores, administradores, coordinadores, líderes de proceso y demás colaboradores que participan en la gestión, ejecución, supervisión y control de la organización.</p>
          <p className="slide-body mt-10 italic text-ink-soft">Abarca todos los procesos estratégicos, misionales y de apoyo.</p>
        </div>
        <div className="flex aspect-square items-center justify-center rounded-full border-4 border-double border-espresso/40 p-16 text-center">
          <p className="slide-subtitle">Todos los procesos, todas las áreas</p>
        </div>
      </div>
    ),
  },
  {
    title: "Capítulo 2",
    render: () => (
      <Chapter num="II" title="Gestión de procesos y procedimientos" text="Secuencias de trabajo, responsables, entradas y salidas de cada área de la organización." img={tostadora.url} />
    ),
  },
  {
    title: "Clasificación de procesos",
    render: () => (
      <div>
        <Header kicker="2.1 · Descripción de procesos" title="Tres grupos de procesos" />
        <div className="grid grid-cols-3 gap-12">
          {[
            ["Estratégicos", ["Planeación estratégica"]],
            ["Misionales", ["Gestión de maquila", "Abastecimiento, elaboración y calidad", "Transformación de producto", "Capacitación", "Servicio al cliente"]],
            ["De apoyo", ["Gestión administrativa", "Gestión contable", "Talento humano", "Seguridad y Salud en el Trabajo", "Diseño y desarrollo"]],
          ].map(([t, list]) => (
            <div key={t as string} className="border-t-4 border-double border-espresso/50 pt-8">
              <p className="slide-subtitle text-caramel">{t as string}</p>
              <ul className="mt-6 space-y-3">
                {(list as string[]).map((l) => (
                  <li key={l} className="slide-body">— {l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Mapa de procesos",
    render: () => (
      <div>
        <Header kicker="2.2 · Mapa de procesos" title="De la necesidad a la satisfacción" />
        <div className="grid grid-cols-[260px_1fr_260px] items-stretch gap-8">
          <div className="flex items-center border-2 border-espresso/40 p-6 text-center slide-caption italic">Necesidades de clientes y partes interesadas</div>
          <div className="space-y-5">
            {[
              ["Estratégicos", "Planeación estratégica"],
              ["Misionales", "Maquila · Abastecimiento y calidad · Transformación · Capacitación · Servicio al cliente"],
              ["Apoyo", "Administrativa · Contable · Talento humano · SST · Diseño y desarrollo"],
            ].map(([k, v], i) => (
              <div key={k} className={`border-2 border-espresso/50 px-10 py-6 ${i === 1 ? "bg-espresso text-paper" : "bg-paper-deep/50"}`}>
                <p className={`slide-kicker ${i === 1 ? "text-paper/70" : "text-caramel"}`}>{k}</p>
                <p className="slide-body mt-2">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center border-2 border-espresso/40 p-6 text-center slide-caption italic">Calidad, cumplimiento, buena atención y fidelización</div>
        </div>
      </div>
    ),
  },
  {
    title: "Procedimientos misionales",
    render: () => (
      <div>
        <Header kicker="2.4 · Procedimientos" title="El corazón del negocio cafetero" />
        <Numbered
          cols={2}
          items={[
            ["Gestión de maquila", "Del requerimiento del cliente a la entrega del producto terminado."],
            ["Abastecimiento y calidad", "Materias primas, proveedores, recepción y almacenamiento."],
            ["Transformación de producto", "Planificar, ejecutar y controlar la producción."],
            ["Capacitación", "Formación de baristas y acompañamiento a caficultores."],
            ["Servicio al cliente", "Atención, satisfacción y fidelización en tiendas."],
          ]}
        />
      </div>
    ),
  },
  {
    title: "Flujo de producción",
    render: () => (
      <div>
        <Header kicker="2.6 · Diagrama de flujo" title="Del grano al cliente" />
        <div className="grid grid-cols-4 gap-8">
          {[
            ["Recepción", "Solicitud, requerimientos y café del caficultor", "¿Cumple calidad y humedad?"],
            ["Tostión", "Limpieza, tostión con control de temperatura, enfriamiento", "¿Cumple evaluación sensorial?"],
            ["Empaque", "Molienda, empaque, sellado y etiquetado", "¿Peso y etiqueta conformes?"],
            ["Despacho", "Almacenamiento del producto terminado y entrega", ""],
          ].map(([t, d, c], i) => (
            <div key={t} className="relative border-2 border-espresso/50 bg-paper-deep/40 p-8">
              <p className="slide-title text-caramel">{i + 1}</p>
              <p className="slide-subtitle mt-2 not-italic">{t}</p>
              <p className="slide-caption mt-4">{d}</p>
              {c && <p className="slide-caption mt-6 border-t border-dashed border-espresso/40 pt-4 italic text-ink-soft">Control: {c}</p>}
            </div>
          ))}
        </div>
        <p className="slide-caption mt-10 italic text-ink-soft">Si un control no se cumple, el lote se devuelve, reprocesa o corrige antes de continuar.</p>
      </div>
    ),
  },
  {
    title: "Capítulo 3",
    render: () => (
      <Chapter num="III" title="Gestión documental" text="Elaborar, identificar, almacenar y consultar los documentos físicos y digitales de la empresa." img={archivo.url} />
    ),
  },
  {
    title: "Objetivos documentales",
    render: () => (
      <div>
        <Header kicker="3.1 · Objetivos" title="Información ordenada, segura y disponible" />
        <Numbered
          cols={2}
          items={[
            ["Unificar los documentos", "Formatos y criterios comunes para todas las áreas."],
            ["Mantener la información vigente", "Versiones actualizadas de manuales y formatos."],
            ["Rastrear el recorrido del café", "Recepción, tostión, almacenamiento y distribución."],
            ["Prevenir pérdidas", "Archivo, copias de respaldo y permisos por cargo."],
          ]}
        />
      </div>
    ),
  },
  {
    title: "Políticas documentales",
    render: () => (
      <div>
        <Header kicker="3.2 · Políticas" title="Seis políticas de información" />
        <div className="grid grid-cols-3 gap-8">
          {[
            "Registro y veracidad de la información",
            "Organización y clasificación documental",
            "Identificación y control de documentos",
            "Trazabilidad de las operaciones cafeteras",
            "Protección de datos personales",
            "Almacenamiento y custodia documental",
          ].map((t, i) => (
            <div key={t} className="flex min-h-[200px] flex-col justify-between border-2 border-espresso/40 p-8">
              <span className="slide-kicker text-caramel">Política {i + 1}</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Codificación documental",
    render: () => (
      <div>
        <Header kicker="3.4 · Codificación" title="Cada documento con un código único" />
        <div className="grid grid-cols-4 border-4 border-double border-espresso/50 text-center">
          {[
            ["GTH", "Área", "Talento Humano"],
            ["FOR", "Tipo de documento", "Formato"],
            ["APO", "Tipo de proceso", "Apoyo"],
            ["001", "Consecutivo", "Número de tres dígitos"],
          ].map(([c, l, d], i) => (
            <div key={c} className={`p-10 ${i < 3 ? "border-r-2 border-espresso/30" : ""}`}>
              <p className="slide-title-lg text-caramel">{c}</p>
              <p className="slide-kicker mt-6">{l}</p>
              <p className="slide-caption mt-3 italic text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
        <p className="slide-body mt-12">Los documentos codificados se incorporan al <strong>listado maestro</strong> y se custodian en el <strong>banco documental</strong>.</p>
      </div>
    ),
  },
  {
    title: "Capítulo 4",
    render: () => (
      <Chapter num="IV" title="Auditoría y control interno" text="Evaluar el cumplimiento de procesos, políticas y requisitos legales, y convertir los hallazgos en mejora." img={rama.url} />
    ),
  },
  {
    title: "Principios de auditoría",
    render: () => (
      <div>
        <Header kicker="4.3 · Principios" title="Siete principios del auditor" />
        <div className="grid grid-cols-4 gap-6">
          {["Integridad", "Presentación imparcial", "Debido cuidado profesional", "Confidencialidad", "Independencia", "Enfoque basado en evidencias", "Enfoque basado en riesgos"].map((t, i) => (
            <div key={t} className={`flex min-h-[220px] flex-col justify-between p-8 ${i === 0 ? "bg-espresso text-paper" : "border-2 border-espresso/40"}`}>
              <span className={`slide-subtitle ${i === 0 ? "text-paper/70" : "text-caramel"}`}>{["I", "II", "III", "IV", "V", "VI", "VII"][i]}</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
          <div className="flex min-h-[220px] items-center p-8">
            <p className="slide-caption italic text-ink-soft">Fundamento: ISO 19011, principios de auditoría.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Ciclo de auditoría",
    render: () => (
      <div>
        <Header kicker="4.5 – 4.12 · Ciclo" title="El ciclo de auditoría y mejora" />
        <div className="grid grid-cols-4 gap-x-10 gap-y-20">
          {["Planeación", "Ejecución y evidencias", "Informe de resultados", "Hallazgos y no conformidades", "Acciones correctivas y preventivas", "Seguimiento y verificación", "Eficacia del control interno", "Mejoramiento continuo"].map((t, i) => (
            <div key={t} className="flex items-start gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-caramel slide-body text-caramel">{i + 1}</span>
              <p className="slide-body-lg pt-3">{t}</p>
            </div>
          ))}
        </div>
        <p className="slide-caption mt-14 italic text-ink-soft">Referentes: ISO 9001, ISO 19011, ISO 31000, ISO 22000, ISO 45001 e ISO 14001.</p>
      </div>
    ),
  },
  {
    title: "Cierre",
    dark: true,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="slide-kicker text-caramel">A&amp;P Tostadores S.A.S</p>
        <h2 className="slide-title-lg mt-8 max-w-[1300px]">Café que conecta personas, ideas y grandes historias</h2>
        <Ornament className="mt-10" />
        <p className="slide-kicker mt-14 text-paper/70">Elaborado por</p>
        <p className="slide-body mt-5 max-w-[1300px]">María José Díaz Manzi · Sahyam Fernando Jiménez Ochoa · Nasly Michel Ramírez Guerrero · Valentina Rojas Vivas · Julián Andrés Ruiz Osorio</p>
      </div>
    ),
  },
];
