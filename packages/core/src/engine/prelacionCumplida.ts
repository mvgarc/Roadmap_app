import type { Prelacion } from "../types";

export function prelacionCumplida(
  prelacion: Prelacion,
  aprobadas: Set<string>,
  ucAcumuladas: number
): boolean {
  if (prelacion.tipo === "creditos") {
    return ucAcumuladas >= prelacion.minimo;
  }
  return aprobadas.has(prelacion.codigo);
}