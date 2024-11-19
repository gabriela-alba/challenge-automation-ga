import * as dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY no está definida en el archivo .env");
}

if (!process.env.API_URL) {
  throw new Error("API_URL no está definida en el archivo .env");
}

if (!process.env.JSONPLACEHOLDER_URL) {
  throw new Error("JSONPLACEHOLDER_URL no está definida en el archivo .env");
}

// Exportar las variables de entorno
export const config = {
  secretKey: process.env.SECRET_KEY,
  apiURL: process.env.API_URL, 
  jsonplaceholderURL: process.env.JSONPLACEHOLDER_URL,
};
