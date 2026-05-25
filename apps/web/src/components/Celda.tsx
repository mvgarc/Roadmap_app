import type { Materia, EstadoMateria } from "@packages/core";

const COLORES: Record<EstadoMateria, { fondo: string; borde: string; texto: string }> = {
  aprobada:   { fondo: "#15803d", borde: "#22c55e", texto: "#ffffff" },
  disponible: { fondo: "#0e7490", borde: "#22d3ee", texto: "#ffffff" },
  bloqueada:  { fondo: "#1a1f29", borde: "#39414f", texto: "#6b7585" },
};

export function Celda({ materia, estado, onToggle, onInfo }: {
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