import type { EstadoMateria } from "@packages/core";

const COLORES: Record<EstadoMateria, { fondo: string; borde: string; etiqueta: string }> = {
  aprobada:   { fondo: "#15803d", borde: "#22c55e", etiqueta: "Aprobada" },
  disponible: { fondo: "#0e7490", borde: "#22d3ee", etiqueta: "Disponible" },
  bloqueada:  { fondo: "#1a1f29", borde: "#39414f", etiqueta: "Bloqueada" },
};

export function BarraResumen({ ucAcumuladas, totalUC, conteo, avisoGuardado, onReiniciar }: {
  ucAcumuladas: number;
  totalUC: number;
  conteo: Record<EstadoMateria, number>;
  avisoGuardado: boolean;
  onReiniciar: () => void;
}) {
  const progreso = Math.round((ucAcumuladas / totalUC) * 100);
  return (
    <div style={{ maxWidth: 1100, padding: "14px 16px", background: "#11151c", border: "1px solid #232a36", borderRadius: 8, marginBottom: 22 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", fontSize: 12.5, marginBottom: 12 }}>
        <span style={{ color: "#c0a05c", fontWeight: 700 }}>
          {ucAcumuladas} / {totalUC} U.C.  ·  {progreso}% de la carrera
        </span>
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
          <button
            onClick={onReiniciar}
            style={{ background: "transparent", border: "1px solid #39414f", color: "#9aa4b4", fontSize: 11.5, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}
          >
            Reiniciar
          </button>
        </span>
      </div>
      <div style={{ height: 6, background: "#1a1f29", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${progreso}%`, height: "100%", background: "linear-gradient(90deg,#15803d,#22c55e)", transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}