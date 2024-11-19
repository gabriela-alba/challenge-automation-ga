import { Given, When, Then } from "@cucumber/cucumber";
import { expect, request } from "@playwright/test";
import { encryptSecretKey } from "../../../fixtures/crypto-helper";
import { config } from "../../../fixtures/setupEnv";
import { readTestData } from "../../../utils/xlsx-reader";

let testData: { id: number; name: string; abilities: string }[] = [];

// Loguear la clave secreta encriptada
Given("la clave secreta encriptada", async function () {
  const encryptedKey = encryptSecretKey(config.secretKey);
  this.encryptedKey = encryptedKey;
  console.log("Clave secreta encriptada:", this.encryptedKey);
});

// Leer los datos del archivo Excel
When("se leen los datos del archivo excel Datos-pruebas.xlsx", async function () {
  const filePath = "src/data/Datos-pruebas.xlsx";
  testData = readTestData(filePath);
  console.log(`Datos cargados desde Excel: ${JSON.stringify(testData, null, 2)}`);
});

// Realizar solicitudes GET al endpoint con ID o nombre del Pokemon
When("se realiza solicitudes GET al endpoint con ID o nombre del Pokemon", async function () {
  this.request = await request.newContext();
  this.responseData = []; // Inicializar el array de respuestas

  for (const { id, name } of testData) {
    const endpoint = `/pokemon/${id || name}`;
    const url = `${config.apiURL}${endpoint}`;
    
    // Se realiza la solicitud GET
    const startTime = Date.now();
    const response = await this.request.get(url);
    const responseTime = Date.now() - startTime;

    // Guardar la respuesta y el tiempo si la respuesta es exitosa (200)
    if (response.status() === 200) {
      const body = await response.json();
      this.responseData.push({ id, name, body, responseTime });
    } else {
      console.error(`Error: ${response.status()} - ${await response.text()}`);
    }
  }
});

Then("se valida que la respuesta se correcta para el Pokemon", async function () {
  // Verificar que hay datos de respuestas guardadas
  if (!this.responseData || this.responseData.length === 0) {
    throw new Error("No se encontraron respuestas almacenadas.");
  }

  // Iterar sobre las respuestas almacenadas
  for (const { id, name, body, responseTime } of this.responseData) {
    console.log(`Validando respuesta para el Pokemon: ${name || id}`);

    // Validar las habilidades si están en los datos de prueba
    const testPokemon = testData.find((pokemon) => pokemon.id === id || pokemon.name === name.toLowerCase());
    if (testPokemon && testPokemon.abilities) {
      const expectedAbilities = testPokemon.abilities.split(", ").map((a) => a.toLowerCase());
      const responseAbilities = body.abilities.map((a: any) => a.ability.name.toLowerCase());

      // Validar que las habilidades esperadas coincidan con las devueltas
      expect(responseAbilities).toEqual(expect.arrayContaining(expectedAbilities));
      console.log(`Habilidades válidadas para ${name || id}.`);
    }

    // Depurar tiempo de respuesta
    console.log(`Tiempo de respuesta para ${name || id}: ${responseTime} ms`);
    console.log(`Validación completada para el Pokemon: ${name || id}`);
  }
});

// Validar que el tiempo de respuesta sea menor a 10s
When("el tiempo de respuesta debe ser menor a 10s", async function () {
  // Verificar que haya datos de respuestas
  if (!this.responseData || this.responseData.length === 0) {
    throw new Error("No se encontraron respuestas almacenadas.");
  }

  // Validar el tiempo de respuesta de cada Pokemon
  for (const { responseTime, id, name } of this.responseData) {
    console.log(`Validando tiempo de respuesta para ${name || id}: ${responseTime} ms`);
    expect(responseTime).toBeLessThan(10000); // Validar que el tiempo de respuesta sea menor a 10 segundos (10000 ms)
  }
});

// Loguear la fecha y hora de finalización de la prueba
When("se loguea la fecha y hora de finalización de la prueba", async function () {
  const endTime = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
  console.log("Fecha y hora de finalización de la prueba:", endTime);
});
