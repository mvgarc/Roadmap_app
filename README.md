# X

Este proyecto es una aplicación React Native construida utilizando Docker para asegurar un entorno de desarrollo consistente y reproducible.

## Descripción

Esta aplicación móvil se encarga de ayudar a los estudiantes de las distintas universidades enfocarse en las materias principales de la carrera universitaria, al igual que realizar proyecciones según sus notas académicas. 

## TO-DO

- [ X ] Definir la necesidad y alcance del proyecto
    - Estructura de trabajo
    - Necesidad principal
    - Alcance
- [   ] Definir las tecnologías a usar
    - Backend
    - Frontend
    - Web server
    - CI / CD
- [   ] Diagrama ER
    - Actores principales
    - Flujo de aplicación
    - Entradas y salidas
- [   ] Esquema de base de datos
- [   ] Desarrollo Backend
- [   ] Desarrollo Front
- [   ] Testing - QA
- [   ] Despliegue


## Estructura

*   `android/`: Código nativo de Android (generado por React Native).
*   `ios/`: Código nativo de iOS (generado por React Native).
*   `src/`: Código fuente de React Native (componentes, lógica, etc.).
*   `.docker/`:  Configuración de Docker para el entorno de desarrollo (Node.js, Android, iOS).
*   `docker-compose.yml`: Define los servicios (contenedores) de Docker.

## Requisitos

*   Docker y Docker Compose instalados. Consulta [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) para obtener instrucciones de instalación.

## Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <URL del repositorio>
    cd mi-proyecto-react-native
    ```

2.  **Construye y levanta los contenedores:**
    ```bash
    docker-compose up --build
    ```
    Esto construirá las imágenes Docker (si es la primera vez) e iniciará los contenedores definidos en `docker-compose.yml`.
