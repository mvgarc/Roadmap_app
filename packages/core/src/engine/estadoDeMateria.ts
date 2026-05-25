import type { Materia, EstadoMateria } from "../types";
import { prelacionCumplida } from "./prelacionCumplida";

export function estadoDeMateria(
  materia: Materia,
  aprobadas: Set<string>,
  ucAcumuladas: number
): EstadoMateria {
  if (aprobadas.has(materia.codigo)) return "aprobada";
  const todasCumplen = materia.prelaciones.every((p) =>
    prelacionCumplida(p, aprobadas, ucAcumuladas)
  );
  return todasCumplen ? "disponible" : "bloqueada";
}