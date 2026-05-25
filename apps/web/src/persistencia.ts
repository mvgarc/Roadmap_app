const CLAVE = "silapaso:ujap:ing-computacion:aprobadas";

export function guardarProgreso(aprobadas: Set<string>): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...aprobadas]));
  } catch (e) {
    console.error("No se pudo guardar el progreso:", e);
  }
}

export function cargarProgreso(): Set<string> {
  try {
    const crudo = localStorage.getItem(CLAVE);
    return crudo ? new Set(JSON.parse(crudo)) : new Set();
  } catch (e) {
    console.error("No se pudo cargar el progreso:", e);
    return new Set();
  }
}