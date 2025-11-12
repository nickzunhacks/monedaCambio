# Imagen base de Node.js
FROM node:18-alpine

# Crea un directorio para la app
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala solo dependencias necesarias
RUN npm install --production

# Copia el resto del código
COPY . .

# Expón el puerto en el que corre tu app
EXPOSE 3000

# Ejecuta la app
CMD ["npm", "run", "dev"]
