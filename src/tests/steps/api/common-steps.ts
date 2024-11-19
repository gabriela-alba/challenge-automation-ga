import { Given, When } from "@cucumber/cucumber";
import { encryptSecretKey } from "../../../fixtures/crypto-helper";
import { config } from "../../../fixtures/setupEnv";
import { readTestData } from "../../../utils/xlsx-reader";
import {setTestData, PokemonTestData } from "../../../utils/data-store"

// Loguear la clave secreta encriptada
Given("la clave secreta encriptada", async function () {
    const encryptedKey = encryptSecretKey(config.secretKey);
    this.encryptedKey = encryptedKey;
    console.log("Clave secreta encriptada:", this.encryptedKey);
  });

// Se leen los datos del archivo Excel
When("se leen los datos del archivo excel Datos-pruebas.xlsx", async function () {
  const filePath = "src/data/Datos-pruebas.xlsx";
  const loadedData: PokemonTestData[] = await readTestData(filePath); // Especifica el tipo PokemonTestData
  if (!loadedData || loadedData.length === 0) {
    throw new Error("No se encontraron datos en el archivo Excel. Revisa el archivo y vuelve a intentar.");
  }

  // Se guardan los datos de prueba 
  this.testData = loadedData;
  setTestData(loadedData); // Guardarlos globalmente también con setTestData
  console.log(`Datos cargados desde Excel: ${JSON.stringify(loadedData, null, 2)}`);
});

// Loguear la fecha y hora de finalización de la prueba
When("se loguea la fecha y hora de finalización de la prueba", async function () {
    const endTime = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
    console.log("Fecha y hora de finalización de la prueba:", endTime);
  });

// Exporta los pasos registrados
export { Given, When };