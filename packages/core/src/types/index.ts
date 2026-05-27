export type PrelacionMateria = {
  tipo: "materia";
  codigo: string;
};

export type PrelacionCreditos = {
  tipo: "creditos";
  minimo: number;
};

export type Prelacion = PrelacionMateria | PrelacionCreditos;

//  Materia 
export type Materia = {
  codigo: string;
  nombre: string;
  semestre: number;
  uc: number;
  prelaciones: Prelacion[];
};

// Pensum 
export type Pensum = {
  universidad: string;
  facultad: string;
  carrera: string;
  plan: string;
  materias: Materia[];
};

// Estados posibles de una materia 
export type EstadoMateria = "aprobada" | "disponible" | "bloqueada";

//  Resultado de calcularEstados 
export type ResultadoEstados = {
  estados: Record<string, EstadoMateria>;
  ucAcumuladas: number;
};