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
    <div className="mb-12">
      <p className="slide-kicker text-caramel">{kicker}</p>
      <h2 className="slide-title mt-4 max-w-[1600px]">{title}</h2>
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

function Bullets({ items, cols = 1, size = "body" }: { items: string[]; cols?: 1 | 2 | 3; size?: "body" | "caption" | "body-lg" }) {
  const grid = cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1";
  return (
    <ul className={`grid ${grid} gap-x-16 gap-y-5`}>
      {items.map((t) => (
        <li key={t} className={`slide-${size} flex gap-4`}>
          <span className="shrink-0 text-caramel">❧</span>
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows, widths }: { head: string[]; rows: string[][]; widths?: string }) {
  return (
    <div className="border-2 border-double border-espresso/50">
      <div className="grid bg-espresso text-paper" style={{ gridTemplateColumns: widths ?? `repeat(${head.length}, 1fr)` }}>
        {head.map((h) => (
          <div key={h} className="slide-chrome px-6 py-4 !whitespace-normal">{h}</div>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} className={`grid ${ri % 2 ? "bg-paper-deep/40" : ""}`} style={{ gridTemplateColumns: widths ?? `repeat(${head.length}, 1fr)` }}>
          {r.map((c, ci) => (
            <div key={ci} className={`slide-caption border-t border-espresso/20 px-6 py-3 ${ci === 0 ? "font-semibold" : ""}`}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Text({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <div>
      <Header kicker={kicker} title={title} />
      {children}
    </div>
  );
}

function Para({ children }: { children: ReactNode }) {
  return <p className="slide-body-lg max-w-[1500px]">{children}</p>;
}

const C1 = "Introducción · Objetivos · Alcance";
const C2 = "Capítulo 2 · Gestión de procesos y procedimientos";
const C3 = "Capítulo 3 · Gestión documental";
const C4 = "Capítulo 4 · Auditoría y control interno";

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
      <div className="grid h-full grid-cols-[1fr_440px] gap-20">
        <div>
          <Header kicker="Índice" title="Contenido" />
          <div className="space-y-4">
            {[
              ["", "INTRODUCCIÓN"],
              ["1.", "OBJETIVOS"],
              ["2.", "ALCANCE"],
              ["II", "CAPÍTULO 2. GESTIÓN DE PROCESOS Y PROCEDIMIENTOS"],
              ["III", "CAPÍTULO 3. GESTIÓN DOCUMENTAL"],
              ["IV", "CAPÍTULO 4. AUDITORÍA Y CONTROL INTERNO"],
              ["", "CONCLUSIÓN"],
            ].map(([n, t]) => (
              <div key={t} className="flex items-baseline gap-8 border-b border-dashed border-espresso/30 pb-3">
                <span className="slide-subtitle w-20 shrink-0 text-caramel">{n}</span>
                <span className="slide-body-lg">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <img src={rama.url} alt="Grabado botánico de una rama de café" className="engraving h-[800px] w-[440px] object-cover" />
      </div>
    ),
  },
  {
    title: "INTRODUCCIÓN",
    render: () => (
      <Text kicker={C1} title="INTRODUCCIÓN">
        <div className="grid grid-cols-2 gap-20">
          <p className="slide-body-lg">
            El manual establece los lineamientos, procedimientos y mecanismos para <em>planificar, organizar, dirigir, supervisar, evaluar y controlar</em> las actividades de los procesos, fortaleciendo el desempeño institucional y promoviendo el mejoramiento continuo.
          </p>
          <div className="space-y-6 border-l-2 border-caramel/60 pl-12">
            <p className="slide-body"><strong>Aplicación:</strong> áreas administrativas, productivas, formativas, comerciales y de apoyo.</p>
            <p className="slide-body"><strong>Actividad:</strong> transformación artesanal del café, maquila, trilla, tostión, molienda, comercialización, formación de baristas y acompañamiento a caficultores.</p>
            <p className="slide-body"><strong>Metodología:</strong> gestión por procesos, enfoque basado en riesgos, control interno y calidad (ISO 9001, ISO 19011 y normativa colombiana).</p>
          </div>
        </div>
      </Text>
    ),
  },
  {
    title: "1.1. Objetivo general",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-20">
        <div>
          <Header kicker="1. OBJETIVOS" title="1.1. Objetivo general" />
          <Para>Establecer los lineamientos para la gestión y el control integral de A&amp;P Tostadores S.A.S., mediante la definición de procedimientos, responsabilidades, mecanismos de seguimiento, herramientas de evaluación y controles organizacionales orientados al cumplimiento de los objetivos institucionales y al mejoramiento continuo de los procesos.</Para>
        </div>
        <img src={rama.url} alt="" className="engraving h-[520px] w-[520px] rounded-full border-4 border-double border-espresso/50 object-cover" />
      </div>
    ),
  },
  {
    title: "1.2. Objetivos específicos",
    render: () => (
      <Text kicker="1. OBJETIVOS" title="1.2. Objetivos específicos">
        <Numbered
          items={[
            ["Lineamientos para planificar, organizar, dirigir y controlar los procesos.", ""],
            ["Definir responsabilidades, funciones y niveles de autoridad.", ""],
            ["Implementar seguimiento con indicadores de gestión y control interno.", ""],
            ["Identificar, evaluar y controlar riesgos, desviaciones e incumplimientos.", ""],
            ["Promover la mejora con auditorías internas y acciones correctivas.", ""],
          ]}
        />
      </Text>
    ),
  },
  {
    title: "2. ALCANCE",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-24">
        <div>
          <Header kicker={C1} title="2. ALCANCE" />
          <Para>Dirigido a la Gerencia General, directores, administradores, coordinadores, líderes de proceso y demás colaboradores que participan en la gestión, ejecución, supervisión y control de las actividades de la organización.</Para>
          <p className="slide-body mt-10 italic text-ink-soft">Abarca todos los procesos estratégicos, misionales y de apoyo.</p>
        </div>
        <div className="flex aspect-square items-center justify-center rounded-full border-4 border-double border-espresso/40 p-16 text-center">
          <p className="slide-subtitle">Todos los procesos, todas las áreas</p>
        </div>
      </div>
    ),
  },
  {
    title: "CAPÍTULO 2",
    render: () => (
      <Chapter num="2" title="GESTIÓN DE PROCESOS Y PROCEDIMIENTOS" text="Estructura de procesos y procedimientos: secuencias de trabajo, responsables, entradas y salidas, mapa de procesos, caracterizaciones y diagramas." img={tostadora.url} />
    ),
  },
  {
    title: "2.1 DESCRIPCIÓN DE PROCESOS",
    render: () => (
      <Text kicker={C2} title="2.1 DESCRIPCIÓN DE PROCESOS">
        <div className="grid grid-cols-3 gap-12">
          {[
            ["1. Procesos estratégicos", ["Planeación estratégica"]],
            ["2. Procesos misionales", ["Gestión de maquila", "Gestión de abastecimiento, elaboración y control de calidad", "Transformación de producto", "Capacitación", "Servicio al cliente"]],
            ["3. Procesos de apoyo", ["Gestión administrativa", "Gestión contable", "Gestión de talento humano", "Gestión de Seguridad y Salud en el Trabajo", "Gestión de diseño y desarrollo"]],
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
      </Text>
    ),
  },
  {
    title: "2.2 MAPA DE PROCESOS",
    render: () => (
      <Text kicker={C2} title="2.2 MAPA DE PROCESOS">
        <div className="grid grid-cols-[260px_1fr_260px] items-stretch gap-8">
          <div className="flex items-center border-2 border-espresso/40 p-6 text-center slide-caption italic">Necesidades de clientes y partes interesadas</div>
          <div className="space-y-5">
            {[
              ["Procesos estratégicos", "Planeación estratégica"],
              ["Procesos misionales", "Maquila · Abastecimiento, elaboración y control de calidad · Transformación de producto · Capacitación · Servicio al cliente"],
              ["Procesos de apoyo", "Administrativa · Contable · Talento humano · SST · Diseño y desarrollo"],
            ].map(([k, v], i) => (
              <div key={k} className={`border-2 border-espresso/50 px-10 py-6 ${i === 1 ? "bg-espresso text-paper" : "bg-paper-deep/50"}`}>
                <p className={`slide-kicker ${i === 1 ? "text-paper/70" : "text-caramel"}`}>{k}</p>
                <p className="slide-body mt-2">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center border-2 border-espresso/40 p-6 text-center slide-caption italic">Calidad del producto, cumplimiento, buena atención y fidelización</div>
        </div>
      </Text>
    ),
  },
  {
    title: "2.3 CARACTERIZACIÓN DE PROCESOS",
    render: () => (
      <Text kicker={C2} title="2.3 CARACTERIZACIÓN DE PROCESOS">
        <p className="slide-body mb-8 max-w-[1500px]">Identifica el propósito de cada proceso, los recursos e información que necesita y los resultados que debe generar.</p>
        <Table
          head={["Proceso", "Objetivo", "Entradas", "Salidas"]}
          widths="300px 1.4fr 1fr 1fr"
          rows={[
            ["Planeación estratégica", "Definir objetivos y estrategias que orientan el funcionamiento y crecimiento de la empresa.", "Necesidades de la empresa, información del mercado.", "Objetivos, estrategias y planes de acción."],
            ["Gestión de maquila", "Desarrollar los servicios de maquila según las solicitudes de los clientes.", "Solicitudes de clientes, café suministrado, especificaciones.", "Producto procesado y entregado."],
            ["Gestión contable", "Registrar y controlar las operaciones contables y financieras.", "Facturas, comprobantes, soportes contables.", "Informes contables y estados financieros."],
          ]}
        />
      </Text>
    ),
  },
  {
    title: "2.4 DESCRIPCIÓN DE PROCEDIMIENTOS",
    render: () => (
      <Text kicker={C2} title="2.4 DESCRIPCIÓN DE PROCEDIMIENTOS">
        <div className="grid grid-cols-2 gap-x-16 gap-y-7">
          {[
            ["Planeación estratégica", "Lineamientos, objetivos y estrategias a partir del contexto interno y externo."],
            ["Gestión de maquila", "Del requerimiento del cliente a la entrega del producto terminado."],
            ["Abastecimiento, elaboración y control de calidad", "Materias primas, proveedores, recepción y almacenamiento."],
            ["Transformación de producto", "Planificación, ejecución y control de las operaciones productivas."],
            ["Capacitación", "Formación de baristas y acompañamiento a caficultores."],
            ["Servicio al cliente", "Atención, satisfacción y fidelización."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-2 border-caramel/60 pl-8">
              <p className="slide-body font-semibold">{t}</p>
              <p className="slide-caption mt-1 text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "2.4 Procesos de apoyo",
    render: () => (
      <Text kicker="2.4 DESCRIPCIÓN DE PROCEDIMIENTOS" title="3. Procesos de apoyo">
        <div className="grid grid-cols-2 gap-x-16 gap-y-8">
          {[
            ["Gestión administrativa", "Manejo de recursos y documentación de apoyo a las áreas."],
            ["Gestión contable", "Registro y control de operaciones contables y financieras."],
            ["Gestión del talento humano", "Selección, contratación, inducción, capacitación y bienestar."],
            ["Gestión de Seguridad y Salud en el Trabajo (SST)", "Prevención de peligros y riesgos laborales."],
            ["Gestión de diseño y desarrollo", "Identidad visual, contenidos y nuevos desarrollos."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-2 border-caramel/60 pl-8">
              <p className="slide-body font-semibold">{t}</p>
              <p className="slide-caption mt-1 text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "2.5 RESPONSABLES Y FUNCIONES",
    render: () => (
      <Text kicker={C2} title="2.5 RESPONSABLES Y FUNCIONES">
        <div className="grid grid-cols-4 gap-5">
          {[
            ["Gerente", "Planear estrategias y dirigir la operación general."],
            ["Director Administrativo", "Dirigir operaciones administrativas e indicadores."],
            ["Administradora y Gestora de Talento Humano", "Selección, nómina, inducción y bienestar."],
            ["Coordinador de Producción", "Recepción del café, turnos, maquinaria y calidad."],
            ["Coordinador de Academia", "Cronogramas y programas de formación."],
            ["Coordinador de Tiendas", "Operación, metas comerciales y servicio."],
            ["Coordinador de Marketing Digital", "Estrategias y campañas digitales."],
            ["Creador de Contenido y Diseño", "Piezas gráficas e identidad visual."],
            ["Gestor de SST", "Peligros, inspecciones y emergencias."],
            ["Barista Manager", "Turnos, baristas, inventarios y servicio."],
            ["Instructor Líder", "Clases de barismo y evaluación de estudiantes."],
          ].map(([t, d]) => (
            <div key={t} className="border border-espresso/40 p-5">
              <p className="slide-caption font-semibold">{t}</p>
              <p className="slide-caption mt-1 text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "2.6 DIAGRAMA DE FLUJO",
    render: () => (
      <Text kicker={C2} title="2.6 DIAGRAMA DE FLUJO">
        <div className="grid grid-cols-4 gap-8">
          {[
            ["Recepción", "Solicitud del cliente, análisis de requerimientos y recepción del café", "¿Cumple con los estándares?"],
            ["Tostión", "Almacenamiento, limpieza del grano, tostión, enfriamiento y reposo", "¿El producto cumple con los estándares?"],
            ["Empaque", "Molienda, empaque, sellado y etiquetado", "¿Producto conforme?"],
            ["Despacho", "Almacenamiento del producto terminado y entrega al cliente", ""],
          ].map(([t, d, c], i) => (
            <div key={t} className="border-2 border-espresso/50 bg-paper-deep/40 p-8">
              <p className="slide-title text-caramel">{i + 1}</p>
              <p className="slide-subtitle mt-2 not-italic">{t}</p>
              <p className="slide-caption mt-4">{d}</p>
              {c && <p className="slide-caption mt-6 border-t border-dashed border-espresso/40 pt-4 italic text-ink-soft">{c}</p>}
            </div>
          ))}
        </div>
        <p className="slide-caption mt-10 italic text-ink-soft">Si un control no se cumple: se devuelve al caficultor, se reprocesa el lote o se corrige el empaque.</p>
      </Text>
    ),
  },
  {
    title: "2.7 MATRIZ DETALLADA DE PROCESOS",
    render: () => (
      <Text kicker={C2} title="2.7 MATRIZ DETALLADA DE PROCESOS">
        <Table
          head={["Actividad", "Descripción", "Responsable", "Control"]}
          widths="300px 1.5fr 1fr 1fr"
          rows={[
            ["Inicio del proceso", "Se recibe la solicitud de servicio o pedido de maquila.", "Coordinador de Producción", "Registro de la solicitud y datos del cliente."],
            ["Gestión comercial", "Se analizan cantidad, tipo de grano, perfil de tostión, empaque y fecha.", "Coord. de Producción / Tiendas", "Especificaciones confirmadas."],
            ["Recepción de materia prima", "Se recibe y registra el café verde del caficultor.", "Coord. / Auxiliar de Producción", "Procedencia, cantidad y registro."],
            ["Inspección", "Estado físico, impurezas y porcentaje de humedad.", "Maestro Tostador", "Registro de humedad y resultado."],
          ]}
        />
      </Text>
    ),
  },
  {
    title: "2.8 CONTROL DE CAMBIOS Y APROBACIÓN DEL DOCUMENTO",
    render: () => (
      <Text kicker={C2} title="2.8 CONTROL DE CAMBIOS Y APROBACIÓN DEL DOCUMENTO">
        <p className="slide-body mb-10 max-w-[1500px]">Permiten mantener la trazabilidad y validez de la información documentada: versión, fecha, descripción de ajustes y responsables de revisar y aprobar.</p>
        <div className="grid grid-cols-3 gap-8">
          {[["Elaboró", "Asesores Pyme"], ["Revisó", "Firma"], ["Aprobó", "Firma"]].map(([t, d]) => (
            <div key={t} className="border-2 border-double border-espresso/50 p-8 text-center">
              <p className="slide-subtitle text-caramel">{t}</p>
              <p className="slide-caption mt-4 text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
        <p className="slide-caption mt-8 italic text-ink-soft">Control de cambios — Versión 1 · Fecha de aprobación 11/11/2026</p>
      </Text>
    ),
  },
  {
    title: "CAPÍTULO 3",
    render: () => (
      <Chapter num="3" title="GESTIÓN DOCUMENTAL" text="Criterios para elaborar, identificar, almacenar y consultar los documentos físicos y digitales." img={archivo.url} />
    ),
  },
  {
    title: "3.1. Objetivos de la gestión documental",
    render: () => (
      <Text kicker={C3} title="3.1. Objetivos de la gestión documental">
        <Bullets
          cols={2}
          size="body-lg"
          items={[
            "Unificar la elaboración de los documentos",
            "Mantener actualizada la información de trabajo",
            "Fortalecer el seguimiento del proceso del café",
            "Conservar las evidencias de formación y desarrollo del personal",
            "Mejorar el intercambio de información entre las áreas",
            "Prevenir la pérdida y el uso inadecuado de los documentos",
            "Apoyar la mejora de los procesos",
          ]}
        />
      </Text>
    ),
  },
  {
    title: "3.2. Políticas documentales",
    render: () => (
      <Text kicker={C3} title="3.2. Políticas documentales">
        <div className="grid grid-cols-3 gap-8">
          {[
            "Política de registro y veracidad de la información",
            "Política de organización y clasificación documental",
            "Política de identificación y control de documentos",
            "Política de trazabilidad y control de las operaciones cafeteras",
            "Política de protección de la información confidencial y los datos personales",
            "Política de almacenamiento y custodia documental",
          ].map((t, i) => (
            <div key={t} className="flex min-h-[200px] flex-col justify-between border-2 border-espresso/40 p-8">
              <span className="slide-subtitle text-caramel">{i + 1}.</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "3.3. NORMATIVIDAD LEGAL VIGENTE APLICABLE",
    render: () => (
      <Text kicker={C3} title="3.3. NORMATIVIDAD LEGAL VIGENTE APLICABLE">
        <Table
          head={["Norma", "Cómo se aplica en A&P Tostadores"]}
          widths="520px 1fr"
          rows={[
            ["Código de Comercio — Decreto 410 de 1971", "Conservación de documentos contables y comerciales."],
            ["Ley 962 de 2005, art. 28", "Diez años de conservación de libros y papeles de comercio."],
            ["Ley 1581 de 2012 y Decreto 1074 de 2015", "Protección de datos personales y bases de datos."],
            ["Ley 527 de 1999", "Mensajes de datos y registros digitales."],
            ["Decreto 1072 de 2015", "Conservación documental del SG-SST."],
            ["Resolución 2674 de 2013", "Requisitos sanitarios en el manejo del café."],
            ["Decisión 486 de 2000 (CAN)", "Protección de mezclas y conocimientos de tostión."],
            ["ISO 9001:2015, numeral 7.5", "Referente para controlar la información documentada."],
          ]}
        />
      </Text>
    ),
  },
  {
    title: "3.3. Recepción y clasificación de documentos",
    render: () => (
      <Text kicker={C3} title="3.3. Recepción y clasificación de documentos">
        <p className="slide-kicker text-caramel">Procedimiento de recepción documental</p>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {["Recepción del documento", "Verificación de la información", "Registro documental", "Clasificación", "Almacenamiento", "Consulta y seguimiento"].map((t, i) => (
            <div key={t} className="flex items-center gap-6 border-2 border-espresso/40 p-7">
              <span className="slide-title shrink-0 text-caramel">{i + 1}</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
        </div>
        <p className="slide-caption mt-8 italic text-ink-soft"><strong>Objetivo:</strong> garantizar la organización, disponibilidad, trazabilidad y conservación de los documentos que ingresan a la empresa.</p>
      </Text>
    ),
  },
  {
    title: "Clasificación documental de A&P Tostadores S.A.S.",
    render: () => (
      <Text kicker="3.3. Recepción y clasificación de documentos" title="Clasificación documental de A&P Tostadores S.A.S.">
        <Bullets
          cols={3}
          items={["Administración", "Contabilidad y finanzas", "Compras y proveedores", "Producción y tostión", "Calidad", "Talento humano", "Academia y formación", "Tiendas y comercialización", "Atención al cliente", "Marketing y comunicaciones", "Seguridad y Salud en el Trabajo", "Gerencia y dirección"]}
        />
      </Text>
    ),
  },
  {
    title: "Responsables de la recepción y clasificación documental",
    render: () => (
      <Text kicker="3.3. Recepción y clasificación de documentos" title="Responsables de la recepción y clasificación documental">
        <Table
          head={["Responsable", "Responsabilidad"]}
          widths="560px 1fr"
          rows={[
            ["Gerencia General", "Supervisar los lineamientos y autorizar disposiciones generales."],
            ["Director Administrativo", "Coordinar recepción, clasificación y almacenamiento."],
            ["Administradora y Gestora de Talento Humano", "Organizar y conservar documentos del personal."],
            ["Coordinadores y líderes de proceso", "Verificar y clasificar la documentación de su área."],
            ["Colaboradores", "Entregar documentos completos y cumplir los lineamientos."],
          ]}
        />
      </Text>
    ),
  },
  {
    title: "Registros y formatos de control",
    render: () => (
      <div className="grid grid-cols-2 gap-20">
        <div>
          <Header kicker="3.3. Recepción y clasificación" title="Registros y formatos de control" />
          <Bullets size="caption" items={["Formato de recepción de documentos", "Registro de correspondencia recibida", "Planilla de distribución documental", "Formato de control de documentos físicos y digitales", "Inventario de documentos por área", "Registro de préstamo y consulta documental", "Listado maestro de documentos y registros"]} />
        </div>
        <div>
          <Header kicker="3.3. Recepción y clasificación" title="Resultado esperado" />
          <p className="slide-body">Un procedimiento organizado, estandarizado y controlado para identificar, registrar, distribuir, almacenar y consultar oportunamente la documentación.</p>
        </div>
      </div>
    ),
  },
  {
    title: "3.4. Codificación documental",
    render: () => (
      <Text kicker={C3} title="3.4. Codificación documental">
        <p className="slide-kicker mb-6 text-caramel">3.4.1. Estructura de la codificación</p>
        <div className="grid grid-cols-4 border-4 border-double border-espresso/50 text-center">
          {[
            ["GTH", "Área", "Gestión de Talento Humano"],
            ["FOR", "Tipo de documento", "Formato"],
            ["APO", "Tipo de proceso", "Apoyo"],
            ["001", "Consecutivo", "Número consecutivo"],
          ].map(([c, l, d], i) => (
            <div key={c} className={`p-10 ${i < 3 ? "border-r-2 border-espresso/30" : ""}`}>
              <p className="slide-title-lg text-caramel">{c}</p>
              <p className="slide-kicker mt-6">{l}</p>
              <p className="slide-caption mt-3 italic text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
        <p className="slide-body mt-10">Ejemplo: <strong>GTH-FOR-APO-001</strong></p>
      </Text>
    ),
  },
  {
    title: "3.4.2. y 3.4.3. Códigos",
    render: () => (
      <div className="grid grid-cols-2 gap-16">
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.2. Códigos de identificación por proceso" />
          <Table head={["Proceso", "Código", "Clase"]} widths="1fr 120px 120px" rows={[["Planeación estratégica", "PLA", "EST"], ["Gestión de maquila", "MAQ", "MIS"], ["Abastecimiento y calidad", "ABA", "MIS"], ["Transformación de producto", "TRA", "MIS"], ["Capacitación", "CAP", "MIS"], ["Servicio al cliente", "SAC", "MIS"], ["Gestión administrativa", "ADM", "APO"], ["Gestión contable", "CON", "APO"], ["Talento humano", "GTH", "APO"], ["SST", "SST", "APO"], ["Diseño y desarrollo", "DIS", "APO"]]} />
        </div>
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.3. Códigos según el tipo de documento" />
          <Table head={["Documento", "Código", "Documento", "Código"]} widths="1fr 110px 1fr 110px" rows={[["Manual", "MAN", "Procedimiento", "PRO"], ["Formato", "FOR", "Instructivo", "INS"], ["Registro", "REG", "Acta", "ACT"], ["Informe", "INF", "Matriz", "MAT"], ["Política", "POL", "Caracterización", "CAR"], ["Cronograma", "CRO", "Presupuesto", "PRE"], ["Plan", "PLA", "Indicadores", "IND"], ["Carta", "CAR", "Certificado", "CER"]]} />
        </div>
      </div>
    ),
  },
  {
    title: "3.4.4. y 3.4.5. Consecutivo y ejemplos",
    render: () => (
      <div className="grid grid-cols-[1fr_1.1fr] gap-16">
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.4. Asignación del consecutivo y ejemplos" />
          <p className="slide-body">Número de tres dígitos: <strong>001</strong>, <strong>002</strong>, <strong>003</strong>… que no se repite dentro de la misma combinación de área, tipo de documento y tipo de proceso.</p>
        </div>
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.5. Ejemplos de codificación documental" />
          <Table head={["Documento", "Código propuesto"]} widths="1fr 300px" rows={[["Formato de planeación estratégica", "PLA-FOR-EST-001"], ["Procedimiento de gestión de maquila", "MAQ-PRO-MIS-001"], ["Registro de control de calidad", "ABA-REG-MIS-001"], ["Formato de transformación de producto", "TRA-FOR-MIS-001"], ["Registro de capacitación", "CAP-REG-MIS-001"]]} />
        </div>
      </div>
    ),
  },
  {
    title: "3.4.6. Lineamientos para la aplicación",
    render: () => (
      <Text kicker="3.4. Codificación documental" title="3.4.6. Lineamientos para la aplicación">
        <Bullets cols={2} items={["Cada documento con un código único de identificación.", "El código corresponde al proceso responsable.", "Clasificación por tipo de proceso: estratégico, misional o de apoyo.", "Las modificaciones se registran con control de versiones.", "Los documentos se incorporan al listado maestro.", "Los documentos obsoletos se mantienen bajo control.", "Aplica a documentos físicos y digitales."]} />
      </Text>
    ),
  },
  {
    title: "3.4.7. Responsables · 3.4.8. Resultado esperado",
    render: () => (
      <div className="grid grid-cols-[1.2fr_1fr] gap-16">
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.7. Responsables" />
          <Table head={["Responsable", "Responsabilidad"]} widths="380px 1fr" rows={[["Gerencia General", "Supervisar la aplicación de los lineamientos."], ["Control documental / área administrativa", "Coordinar identificación, organización y actualización."], ["Líderes de proceso", "Verificar clasificación y codificación."], ["Colaboradores", "Usar documentos vigentes."]]} />
        </div>
        <div>
          <Header kicker="3.4. Codificación documental" title="3.4.8. Resultado esperado" />
          <p className="slide-body">Un sistema de codificación organizado, uniforme y estandarizado que facilite la búsqueda, evite duplicidades y mantenga la trazabilidad.</p>
        </div>
      </div>
    ),
  },
  {
    title: "3.5. Banco documental",
    render: () => (
      <Text kicker={C3} title="3.5. Banco documental">
        <div className="grid grid-cols-5 gap-5">
          {["Estratégica y de dirección", "Administrativa", "Contable y financiera", "Compras y proveedores", "Inventarios y almacenamiento", "Producción y maquila", "Calidad y laboratorio", "Comercial, tiendas y marketing digital", "Academia y formación", "Talento humano"].map((t, i) => (
            <div key={t} className="flex min-h-[200px] flex-col justify-between border-2 border-espresso/40 p-6">
              <span className="slide-kicker text-caramel">Carpeta {i + 1}</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "3.6. Listado maestro",
    render: () => (
      <Text kicker={C3} title="3.6. Listado maestro">
        <p className="slide-body mb-10 max-w-[1500px]">Registra los documentos vigentes por trimestre: código, versión, fecha, área y ubicación.</p>
        <div className="grid grid-cols-3 gap-6">
          {["3.6.1. Primer trimestre", "3.6.2. Segundo trimestre", "3.6.3. Tercer trimestre", "3.6.4. Cuarto trimestre", "3.6.5. Quinto trimestre", "3.6.6. Sexto trimestre"].map((t) => (
            <div key={t} className="border-2 border-double border-espresso/40 p-7 text-center">
              <p className="slide-body">{t}</p>
            </div>
          ))}
        </div>
        <p className="slide-caption mt-8 italic text-ink-soft">Ejemplo: Perfil de cargos · Talento Humano · PC-GTH-001 · Versión 1 · 01/09/2025</p>
      </Text>
    ),
  },
  {
    title: "CAPÍTULO 4",
    render: () => (
      <Chapter num="4" title="AUDITORÍA Y CONTROL INTERNO" text="Evaluar el cumplimiento de procesos, procedimientos, políticas y requisitos legales aplicables." img={rama.url} />
    ),
  },
  {
    title: "4.1. Objetivos de las auditorías",
    render: () => (
      <Text kicker={C4} title="4.1. Objetivos de las auditorías">
        <Numbered items={[["Evaluar el cumplimiento de los procesos organizacionales", "Según procedimientos, políticas internas y requisitos legales."], ["Identificar y controlar los riesgos", "Errores o situaciones que afecten producción, calidad o seguridad."], ["Promover el mejoramiento continuo", "Recomendaciones y acciones correctivas a partir de los resultados."]]} />
        <p className="slide-caption mt-10 italic text-ink-soft">Referentes: ISO 9001, ISO 19011, ISO 31000, ISO 22000, ISO 45001 e ISO 14001.</p>
      </Text>
    ),
  },
  {
    title: "4.2. Alcance de las auditorías",
    render: () => (
      <Text kicker={C4} title="4.2. Alcance de las auditorías">
        <Para>Aplica a todos los procesos estratégicos, misionales y de apoyo: producción y tostión de café, comercialización, servicio al cliente, talento humano y gestión administrativa.</Para>
        <div className="mt-12"><Bullets cols={2} items={["Evaluación de procedimientos", "Identificación de riesgos", "Verificación de controles", "Seguimiento a acciones correctivas"]} /></div>
      </Text>
    ),
  },
  {
    title: "4.3. Principios de auditoría",
    render: () => (
      <Text kicker={C4} title="4.3. Principios de auditoría">
        <div className="grid grid-cols-4 gap-6">
          {["Integridad", "Presentación imparcial", "Debido cuidado profesional", "Confidencialidad", "Independencia", "Enfoque basado en evidencias", "Enfoque basado en riesgos"].map((t, i) => (
            <div key={t} className={`flex min-h-[200px] flex-col justify-between p-8 ${i === 0 ? "bg-espresso text-paper" : "border-2 border-espresso/40"}`}>
              <span className={`slide-subtitle ${i === 0 ? "text-paper/70" : "text-caramel"}`}>{["I", "II", "III", "IV", "V", "VI", "VII"][i]}</span>
              <p className="slide-body">{t}</p>
            </div>
          ))}
          <div className="flex items-center p-8"><p className="slide-caption italic text-ink-soft">Fundamento: ISO 19011, principios de auditoría.</p></div>
        </div>
      </Text>
    ),
  },
  {
    title: "4.4. Responsables y funciones",
    render: () => (
      <Text kicker={C4} title="4.4. Responsables y funciones">
        <Table head={["Responsable", "Funciones"]} widths="560px 1fr" rows={[["Propietario / gerente", "Aprobar el programa, dar recursos y decidir correcciones."], ["Administrador", "Coordinar controles diarios y seguimiento a compromisos."], ["Encargado de compras y proveedores", "Revisar proveedores, cotizaciones y órdenes de compra."], ["Encargado de inventarios", "Controlar existencias, lotes y rotación."], ["Responsable de producción y tostión", "Verificar fichas técnicas y perfiles de tostión."], ["Responsable de calidad", "Revisar calidad e inocuidad y no conformidades."], ["Encargado de caja / contable", "Revisar ingresos, egresos y cierres de caja."], ["Auditor interno designado", "Revisar evidencias, hallazgos e informes."]]} />
      </Text>
    ),
  },
  {
    title: "4.5. Planeación de auditorías",
    render: () => (
      <Text kicker={C4} title="4.5. Planeación de auditorías">
        <p className="slide-kicker mb-6 text-caramel">Programa de auditorías internas propuesto</p>
        <Table head={["Proceso", "Frecuencia", "Responsable"]} widths="1.4fr 260px 1fr" rows={[["Planeación estratégica", "Anual", "Gerente General"], ["Gestión de maquila", "Semestral", "Coordinador de Producción"], ["Abastecimiento, elaboración y control de calidad", "Trimestral", "Coordinador de Producción"], ["Transformación de producto", "Trimestral", "Maestro Tostador"], ["Capacitación", "Semestral", "Coordinador de Academia"], ["Servicio al cliente", "Trimestral", "Coordinador de Tiendas"], ["Gestión administrativa", "Semestral", "Director Administrativo"]]} />
      </Text>
    ),
  },
  {
    title: "4.6. Ejecución de auditorías y recolección de evidencias",
    render: () => (
      <Text kicker={C4} title="4.6. Ejecución de auditorías y recolección de evidencias">
        <p className="slide-kicker mb-8 text-caramel">Métodos de verificación y recolección de evidencias</p>
        <Bullets cols={2} items={["Revisión documental", "Observación directa", "Inspección de instalaciones y equipos", "Entrevistas al personal", "Verificación de registros y trazabilidad", "Evaluación de indicadores de gestión", "Verificación de la inocuidad alimentaria"]} />
      </Text>
    ),
  },
  {
    title: "4.7. Elaboración y presentación de informes",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-20">
        <div>
          <Header kicker={C4} title="4.7. Elaboración y presentación de informes" />
          <Para>El informe de auditoría presenta de manera ordenada los criterios evaluados, las evidencias recopiladas, los hallazgos identificados y las conclusiones de la revisión.</Para>
        </div>
        <img src={archivo.url} alt="" className="engraving h-[520px] w-[520px] rounded-full border-4 border-double border-espresso/50 object-cover" />
      </div>
    ),
  },
  {
    title: "4.8. Identificación de hallazgos y no conformidades",
    render: () => (
      <Text kicker={C4} title="4.8. Identificación de hallazgos y no conformidades">
        <Para>Registrar las situaciones detectadas en auditorías o revisiones, valorar su relación con los requisitos y documentar las acciones necesarias, desde su identificación hasta su cierre.</Para>
        <div className="mt-12 grid grid-cols-4 gap-6 text-center">
          {["Identificación", "Valoración", "Acción", "Cierre"].map((t, i) => (
            <div key={t} className="border-2 border-espresso/40 p-8"><p className="slide-title text-caramel">{i + 1}</p><p className="slide-body mt-2">{t}</p></div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "4.9. Formulación de acciones correctivas y preventivas",
    render: () => (
      <Text kicker={C4} title="4.9. Formulación de acciones correctivas y preventivas">
        <Table head={["Situación", "Acción correctiva", "Medida preventiva"]} rows={[["Inconsistencias en inventario de café verde", "Revisar entradas y salidas y ajustar registros", "Verificaciones periódicas de existencias"], ["Diferencias en parámetros de tostión", "Revisar temperatura, tiempo y perfiles", "Fichas técnicas por producto y lote"], ["Desperdicio de materia prima", "Analizar etapas con pérdidas", "Controles de cantidades y rendimiento"], ["Trazabilidad de lotes", "Revisar registros sin información", "Sistema de identificación de lotes"], ["Registros de limpieza y desinfección", "Verificar actividades pendientes", "Cronogramas de limpieza"]]} />
      </Text>
    ),
  },
  {
    title: "4.10. Seguimiento y verificación de acciones correctivas",
    render: () => (
      <Text kicker={C4} title="4.10. Seguimiento y verificación de acciones correctivas">
        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          {["Registro de los hallazgos", "Asignación de responsables", "Definición de plazos", "Revisión de evidencias", "Verificación del cumplimiento", "Registro de resultados", "Comunicación de resultados"].map((t, i) => (
            <div key={t} className="flex items-start gap-5">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-caramel slide-body text-caramel">{i + 1}</span>
              <p className="slide-body pt-3">{t}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "4.11. Evaluación de la eficacia del control interno",
    render: () => (
      <Text kicker={C4} title="4.11. Evaluación de la eficacia del control interno">
        <Para>Determinar si los controles contribuyen a los objetivos, al desarrollo de las actividades y a prevenir riesgos sobre la calidad, la inocuidad, la seguridad laboral y los servicios.</Para>
        <div className="mt-12"><Bullets cols={3} items={["Resultados de auditorías internas", "Revisión de documentos", "Cumplimiento de procedimientos", "Registros de producción", "Controles administrativos", "Evidencias de gestión"]} /></div>
      </Text>
    ),
  },
  {
    title: "4.12. Plan de mejoramiento continuo",
    render: () => (
      <Text kicker={C4} title="4.12. Plan de mejoramiento continuo">
        <p className="slide-body mb-12 max-w-[1500px]">Propuesta para fortalecer los procesos administrativos, productivos, formativos y comerciales, con base en el ciclo PHVA.</p>
        <div className="grid grid-cols-4 gap-6 text-center">
          {[["P", "Planear"], ["H", "Hacer"], ["V", "Verificar"], ["A", "Actuar"]].map(([l, t]) => (
            <div key={l} className="border-4 border-double border-espresso/40 p-10">
              <p className="slide-title-lg text-caramel">{l}</p>
              <p className="slide-subtitle mt-4">{t}</p>
            </div>
          ))}
        </div>
      </Text>
    ),
  },
  {
    title: "CONCLUSIÓN",
    render: () => (
      <div className="grid h-full grid-cols-[1fr_560px] items-center gap-20">
        <div>
          <Header kicker="Cierre" title="CONCLUSIÓN" />
          <Para>El Manual es una herramienta fundamental para organizar, orientar y controlar los procesos de la empresa. Fortalece la gestión administrativa, documental y operativa, previene riesgos y favorece el crecimiento y el mejoramiento continuo de la organización.</Para>
        </div>
        <img src={finca.url} alt="" className="engraving h-[560px] w-[560px] rounded-full border-4 border-double border-espresso/50 object-cover" />
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
