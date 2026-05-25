import type { Materia, EstadoMateria } from "@packages/core";
import { prelacionCumplida } from "@packages/core";

const NUM_ROMANO = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const COLORES: Record<EstadoMateria, { fondo: string; borde: string; texto: string; etiqueta: string }> = {
  aprobada:   { fondo: "#15803d", borde: "#22c55e", texto: "#ffffff", etiqueta: "Aprobada" },
  disponible: { fondo: "#0e7490", borde: "#22d3ee", texto: "#ffffff", etiqueta: "Disponible" },
  bloqueada:  { fondo: "#1a1f29", borde: "#39414f", texto: "#6b7585", etiqueta: "Bloqueada" },
};

export function ModalMateria({ materia, estado, aprobadas, ucAcumuladas, nombrePorCodigo, onClose }: {
  materia: Materia | null;
  estado: EstadoMateria;
  aprobadas: Set<string>;
  ucAcumuladas: number;
  nombrePorCodigo: Record<string, string>;
  onClose: () => void;
}) {
  if (!materia) return null;
  const c = COLORES[estado];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(5,7,10,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 100 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#11151c", border: "1px solid #2a323f", borderRadius: 12, width: "100%", maxWidth: 380, padding: "22px 22px 20px", color: "#e8ebf2", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
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
                  {p.tipo === "creditos" ? `Haber aprobado al menos ${p.minimo} U.C.` : nombrePorCodigo[p.codigo] || p.codigo}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}