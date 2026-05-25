import type { Materia, EstadoMateria } from "@packages/core";
import { Celda } from "./Celda";

const NUM_ROMANO = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function FilaSemestre({ numero, materias, estados, onToggle, onInfo }: {
  numero: number;
  materias: Materia[];
  estados: Record<string, EstadoMateria>;
  onToggle: (codigo: string) => void;
  onInfo: (materia: Materia) => void;
}) {
  const ucSem = materias.reduce((s, m) => s + m.uc, 0);
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
      <div style={{ flex: "0 0 56px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#3b5bdb", lineHeight: 1 }}>{NUM_ROMANO[numero]}</span>
        <span style={{ fontSize: 9.5, color: "#5f6b80", marginTop: 4 }}>{ucSem} U.C.</span>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
        {materias.map((m) => (
          <Celda key={m.codigo} materia={m} estado={estados[m.codigo]} onToggle={onToggle} onInfo={onInfo} />
        ))}
      </div>
    </div>
  );
}