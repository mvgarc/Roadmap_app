import type { Materia, ResultadoEstados } from "../types";
import { estadoDeMateria } from "./estadoDeMateria";

export function calcularEstados(
  materias: Materia[],
  aprobadas: Set<string>
): ResultadoEstados {
  const ucAcumuladas = materias
    .filter((m) => aprobadas.has(m.codigo))
    .reduce((suma, m) => suma + m.uc, 0);

  const estados: ResultadoEstados["estados"] = {};
  for (const materia of materias) {
    estados[materia.codigo] = estadoDeMateria(materia, aprobadas, ucAcumuladas);
  }
  return { estados, ucAcumuladas };
}