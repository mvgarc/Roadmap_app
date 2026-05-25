import { useState, useMemo, useEffect } from "react";
import { calcularEstados } from "@packages/core";
import { guardarProgreso, cargarProgreso } from "./persistencia";
import type { Materia, Pensum, EstadoMateria } from "@packages/core";
import { ujapIngComputacion } from "@packages/data";
import { Celda } from "./components/Celda";
import { FilaSemestre } from "./components/FilaSemestre";
import { BarraResumen } from "./components/BarraResumen";
import { ModalMateria } from "./components/ModalMateria";

const PENSUM = ujapIngComputacion as Pensum;
const NOMBRE_POR_CODIGO = Object.fromEntries(PENSUM.materias.map((m) => [m.codigo, m.nombre]));

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
  const conteo = { aprobada: 0, disponible: 0, bloqueada: 0 } as Record<EstadoMateria, number>;
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

      <BarraResumen ucAcumuladas={ucAcumuladas} totalUC={totalUC} conteo={conteo} avisoGuardado={avisoGuardado} onReiniciar={() => setAprobadas(new Set())} />

      <main style={{ maxWidth: 1100 }}>
        {semestres.map((sem) => (
          <FilaSemestre key={sem.numero} numero={sem.numero} materias={sem.materias} estados={estados as Record<string, EstadoMateria>} onToggle={toggleMateria} onInfo={setSeleccionada} />
        ))}
      </main>

      <ModalMateria materia={seleccionada} estado={seleccionada ? estados[seleccionada.codigo] as EstadoMateria : "bloqueada"} aprobadas={aprobadas} ucAcumuladas={ucAcumuladas} nombrePorCodigo={NOMBRE_POR_CODIGO} onClose={() => setSeleccionada(null)} />
    </div>
  );
}