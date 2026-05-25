import { useState, useMemo, useEffect } from "react";
import { calcularEstados, prelacionCumplida } from "@packages/core";
import { guardarProgreso, cargarProgreso } from "./persistencia";
import type { Materia, Pensum, EstadoMateria } from "@packages/core";
import { ujapIngComputacion } from "@packages/data";

const PENSUM = ujapIngComputacion as Pensum;

const NUM_ROMANO = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const NOMBRE_POR_CODIGO = Object.fromEntries(PENSUM.materias.map((m) => [m.codigo, m.nombre]));

const COLORES: Record<EstadoMateria, { fondo: string; borde: string; texto: string; etiqueta: string }> = {
  aprobada:   { fondo: "#15803d", borde: "#22c55e", texto: "#ffffff", etiqueta: "Aprobada" },
  disponible: { fondo: "#0e7490", borde: "#22d3ee", texto: "#ffffff", etiqueta: "Disponible" },
  bloqueada:  { fondo: "#1a1f29", borde: "#39414f", texto: "#6b7585", etiqueta: "Bloqueada" },
};

//  Celda 
function Celda({ materia, estado, onToggle, onInfo }: {
  materia: Materia;
  estado: EstadoMateria;
  onToggle: (codigo: string) => void;
  onInfo: (materia: Materia) => void;
}) {
  const c = COLORES[estado];
  return (
    <div
      onClick={() => onToggle(materia.codigo)}
      style={{
        position: "relative", background: c.fondo, border: `1px solid ${c.borde}`,
        borderRadius: 6, padding: "12px 10px", minHeight: 64, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", fontSize: 12.5, fontWeight: 600, lineHeight: 1.3,
        color: c.texto, transition: "background 0.15s ease",
      }}
    >
      {materia.nombre}
      <button
        onClick={(e) => { e.stopPropagation(); onInfo(materia); }}
        style={{
          position: "absolute", top: 4, right: 4, width: 18, height: 18,
          borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.18)",
          color: c.texto, fontSize: 11, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        i
      </button>
    </div>
  );
}

//  Modal 
function ModalMateria({ materia, estado, aprobadas, ucAcumuladas, onClose }: {
  materia: Materia | null;
  estado: EstadoMateria;
  aprobadas: Set<string>;
  ucAcumuladas: number;
  onClose: () => void;
}) {
  if (!materia) return null;
  const c = COLORES[estado];
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(5,7,10,0.78)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#11151c", border: "1px solid #2a323f", borderRadius: 12,
          width: "100%", maxWidth: 380, padding: "22px 22px 20px",
          color: "#e8ebf2", boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{materia.nombre}</h2>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#7d8799", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "inline-block", background: c.fondo, border: `1px solid ${c.borde}`, color: c.texto, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: 16 }}>
          {c.etiqueta.toUpperCase()}
        </div>
        {[["Código", materia.codigo], ["Semestre", NUM_ROMANO[materia.semestre]], ["Créditos", `${materia.uc} U.C.`]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #1c222b", fontSize: 13 }}>
            <span style={{ color: "#7d8799" }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#c0a05c", marginBottom: 8 }}>PRELACIONES</div>
          {materia.prelaciones.length === 0 ? (
            <div style={{ fontSize: 13, color: "#7d8799" }}>Sin prelación — disponible desde el inicio.</div>
          ) : materia.prelaciones.map((p, i) => {
            const cumplida = prelacionCumplida(p, aprobadas, ucAcumuladas);
            return (
              <div key={i} style={{ background: "#161b24", border: "1px solid #232a36", borderRadius: 6, padding: "8px 10px", fontSize: 12.5, display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: cumplida ? "#22c55e" : "#6b7585", fontWeight: 700 }}>{cumplida ? "✓" : "○"}</span>
                <span style={{ color: cumplida ? "#e8ebf2" : "#9aa4b4" }}>
                  {p.tipo === "creditos" ? `Haber aprobado al menos ${p.minimo} U.C.` : NOMBRE_POR_CODIGO[p.codigo] || p.codigo}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//  App principal 
export default function App() {
  const [aprobadas, setAprobadas] = useState<Set<string>>(() => cargarProgreso());
  const [seleccionada, setSeleccionada] = useState<Materia | null>(null);
  const [avisoGuardado, setAvisoGuardado] = useState(false);

  useEffect(() => {
    guardarProgreso(aprobadas);
    setAvisoGuardado(true);
    const t = setTimeout(() => setAvisoGuardado(false), 1400);
    return () => clearTimeout(t);
  }, [aprobadas]);

  const { estados, ucAcumuladas } = useMemo(
    () => calcularEstados(PENSUM.materias, aprobadas),
    [aprobadas]
  );

  function toggleMateria(codigo: string) {
    setAprobadas((prev) => {
      const next = new Set(prev);
      next.has(codigo) ? next.delete(codigo) : next.add(codigo);
      return next;
    });
  }

  const totalUC = PENSUM.materias.reduce((s, m) => s + m.uc, 0);
  const progreso = Math.round((ucAcumuladas / totalUC) * 100);
  const conteo = { aprobada: 0, disponible: 0, bloqueada: 0 };
  for (const m of PENSUM.materias) conteo[estados[m.codigo] as EstadoMateria]++;

  const semestres = Array.from({ length: 10 }, (_, i) => ({
    numero: i + 1,
    materias: PENSUM.materias.filter((m) => m.semestre === i + 1),
  }));

  return (
    <div style={{ background: "#0a0c10", minHeight: "100vh", padding: "28px 22px 40px", fontFamily: "'Outfit', system-ui, sans-serif", color: "#e8ebf2" }}>
      <header style={{ marginBottom: 18, maxWidth: 1100 }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.18em", color: "#c0a05c", marginBottom: 6 }}>
          {PENSUM.universidad}  ·  {PENSUM.plan}
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0 }}>{PENSUM.carrera}</h1>
      </header>

      {/* Barra de resumen */}
      <div style={{ maxWidth: 1100, padding: "14px 16px", background: "#11151c", border: "1px solid #232a36", borderRadius: 8, marginBottom: 22 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", fontSize: 12.5, marginBottom: 12 }}>
          <span style={{ color: "#c0a05c", fontWeight: 700 }}>{ucAcumuladas} / {totalUC} U.C.  ·  {progreso}% de la carrera</span>
          {(["aprobada", "disponible", "bloqueada"] as EstadoMateria[]).map((est) => (
            <span key={est} style={{ display: "flex", alignItems: "center", gap: 6, color: "#9aa4b4" }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: COLORES[est].fondo, border: `1px solid ${COLORES[est].borde}`, display: "inline-block" }} />
              {COLORES[est].etiqueta}: {conteo[est]}
            </span>
          ))}
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11.5, color: avisoGuardado ? "#22c55e" : "#5f6b80", transition: "color 0.3s" }}>
              {avisoGuardado ? "✓ Progreso guardado" : "Guardado automático"}
            </span>
            <button onClick={() => setAprobadas(new Set())} style={{ background: "transparent", border: "1px solid #39414f", color: "#9aa4b4", fontSize: 11.5, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>
              Reiniciar
            </button>
          </span>
        </div>
        <div style={{ height: 6, background: "#1a1f29", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${progreso}%`, height: "100%", background: "linear-gradient(90deg,#15803d,#22c55e)", transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Cuadrícula */}
      <main style={{ maxWidth: 1100 }}>
        {semestres.map((sem) => (
          <div key={sem.numero} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
            <div style={{ flex: "0 0 56px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#3b5bdb", lineHeight: 1 }}>{NUM_ROMANO[sem.numero]}</span>
              <span style={{ fontSize: 9.5, color: "#5f6b80", marginTop: 4 }}>{sem.materias.reduce((s, m) => s + m.uc, 0)} U.C.</span>
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {sem.materias.map((m) => (
                <Celda key={m.codigo} materia={m} estado={estados[m.codigo] as EstadoMateria} onToggle={toggleMateria} onInfo={setSeleccionada} />
              ))}
            </div>
          </div>
        ))}
      </main>

      <ModalMateria materia={seleccionada} estado={seleccionada ? estados[seleccionada.codigo] as EstadoMateria : "bloqueada"} aprobadas={aprobadas} ucAcumuladas={ucAcumuladas} onClose={() => setSeleccionada(null)} />
    </div>
  );
}