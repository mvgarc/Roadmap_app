# Roadmap App — Pensum Inteligente

> Consulta el pensum de tu carrera y descubre qué materias puedes cursar según tus prelaciones.

**[English version below](#english-version)**

---

## ¿Qué es?

Roadmap App es una aplicación para estudiantes universitarios que permite visualizar el pensum de su carrera, marcar materias aprobadas y descubrir automáticamente cuáles están disponibles para cursar — respetando las reglas de prelación de cada universidad.

Inspirada en [Si la paso (Pensum UJAP)](https://apkpure.com/es/pensum-ujap), pero diseñada desde cero para soportar múltiples universidades y carreras.

## Características

- Visualización del pensum por semestres
- Cálculo automático de materias disponibles según prelaciones por materia y por créditos acumulados
- Marcado de materias aprobadas con un toque
- Progreso guardado automáticamente en el dispositivo
- Detalle de cada materia con estado de prelaciones
- Arquitectura multiuniversidad — agregar una carrera nueva es solo agregar un archivo de datos

## Estado actual

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Formato de datos del pensum | ✅ Completo |
| 2 | Vista del pensum en cuadrícula | ✅ Completo |
| 3 | Lógica de prerrequisitos | ✅ Completo |
| 4 | Guardado local del progreso | ✅ Completo |
| 5 | Multiuniversidad y multicarrera | 🔜 Próximo |
| 6 | App mobile (React Native) | 🔜 Pendiente |
| 7 | Pulido y publicación | 🔜 Pendiente |

**Pensum disponibles actualmente:** Ingeniería en Computación — UJAP

## Estructura del proyecto

```
Roadmap_app/
├── apps/
│   └── web/                        # Aplicación web (React + Vite + TypeScript)
│       └── src/
│           ├── components/
│           │   ├── Celda.tsx        # Tarjeta de una materia
│           │   ├── FilaSemestre.tsx # Fila de un semestre
│           │   ├── BarraResumen.tsx # Barra de progreso y leyenda
│           │   └── ModalMateria.tsx # Detalle de una materia
│           ├── App.tsx              # Componente principal
│           └── persistencia.ts     # Guardado en localStorage
│
├── packages/
│   ├── core/                       # Lógica de prerrequisitos (sin dependencias de UI)
│   │   └── src/
│   │       ├── engine/
│   │       │   ├── prelacionCumplida.ts
│   │       │   ├── estadoDeMateria.ts
│   │       │   └── calcularEstados.ts
│   │       └── types/
│   │           └── index.ts        # Tipos: Materia, Pensum, Prelacion, EstadoMateria
│   │
│   └── data/                       # Datos de pensum por universidad
│       └── src/
│           └── ujap/
│               └── ujap-ing-computacion.json
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Cómo funciona la lógica

Cada materia tiene un estado calculado a partir de las materias aprobadas:

| Estado | Color | Condición |
|--------|-------|-----------|
| **Aprobada** | 🟢 Verde | El estudiante la marcó como aprobada |
| **Disponible** | 🔵 Celeste | Todas sus prelaciones están cumplidas |
| **Bloqueada** | ⚫ Gris | Al menos una prelación no está cumplida |

Las prelaciones pueden ser de dos tipos:
- **Por materia:** requiere haber aprobado una materia específica
- **Por créditos:** requiere haber acumulado un mínimo de unidades crédito

## Formato de datos del pensum

Cada carrera es un archivo `.json` con esta estructura:

```json
{
  "universidad": "UJAP",
  "carrera": "Ingeniería en Computación",
  "plan": "I-2019",
  "materias": [
    {
      "codigo": "MAI01506",
      "nombre": "Matemática I",
      "semestre": 1,
      "uc": 5,
      "prelaciones": []
    },
    {
      "codigo": "PRO02305",
      "nombre": "Programación I",
      "semestre": 2,
      "uc": 3,
      "prelaciones": [
        { "tipo": "materia", "codigo": "LOG01404" },
        { "tipo": "creditos", "minimo": 9 }
      ]
    }
  ]
}
```

Para agregar una nueva carrera: crea un archivo con esta estructura en `packages/data/src/<universidad>/` y expórtalo desde `packages/data/src/index.ts`.

## Instalación y desarrollo

**Requisitos:** Node.js 22+, pnpm 11+

```bash
# Clonar el repositorio
git clone https://github.com/mvgarc/Roadmap_app.git
cd Roadmap_app

# Instalar dependencias
pnpm install

# Correr en desarrollo
pnpm dev
```

La app estará disponible en `http://localhost:5173`.

## Stack técnico

| Herramienta | Uso |
|-------------|-----|
| React 19 + TypeScript | UI de la app web |
| Vite 8 | Bundler y servidor de desarrollo |
| pnpm Workspaces | Gestión del monorepo |
| Turbo | Orquestación de tareas del monorepo |

---

<a name="english-version"></a>
# Roadmap App — Smart Pensum Viewer

> Browse your university curriculum and find out which courses you can take based on your prerequisites.

## What is it?

Roadmap App helps university students visualize their academic curriculum, mark completed courses, and automatically discover which ones are available to take — based on each university's prerequisite rules.

Inspired by [Si la paso (Pensum UJAP)](https://apkpure.com/es/pensum-ujap), but built from scratch to support multiple universities and programs.

## Features

- Semester-by-semester curriculum view
- Automatic course availability calculation based on subject and credit prerequisites
- One-tap course approval marking
- Progress saved automatically on the device
- Course detail with prerequisite status
- Multi-university architecture — adding a new program is just adding a data file

## Getting Started

**Requirements:** Node.js 22+, pnpm 11+

```bash
git clone https://github.com/mvgarc/Roadmap_app.git
cd Roadmap_app
pnpm install
pnpm dev
```

App runs at `http://localhost:5173`.

## How to add a new university program

1. Create a JSON file following the data format in `packages/data/src/<university>/`
2. Export it from `packages/data/src/index.ts`
3. Import it in the app and assign it to a route

No code changes needed in the logic or UI layers.

## Contributing

Contributions are welcome, especially new university curriculum data files. Please open an issue first to discuss what you'd like to add.

## License

ISC