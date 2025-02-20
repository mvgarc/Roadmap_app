# Usa una imagen base de Node.js (elige la versión que necesites)
FROM node:18-alpine as base

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias (package.json y package-lock.json o yarn.lock)
COPY package*.json ./
COPY yarn.lock ./

# Instala las dependencias (usa --frozen-lockfile para producción o cuando quieras asegurar la misma versión)
RUN npm install --legacy-peer-deps

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto que utiliza el servidor de desarrollo (si es necesario)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]