import { Then } from "@cucumber/cucumber";
import { Given, When } from "./common-steps";
import { expect, request } from "@playwright/test";
import { config } from "../../../fixtures/setupEnv";
import { getTestData } from "../../../utils/data-store"

// Se realiza solicitudes GET al endpoint con ID o nombre del Pokemon
When("se realiza solicitudes GET al endpoint con ID o nombre del Pokemon", async function () {
  const testData = getTestData(); // Se obtiene los datos de prueba del módulo compartido
  
  if (!this.testData || this.testData.length === 0) {
    throw new Error("No hay datos cargados desde el archivo Excel.");
  }

  this.request = await request.newContext();
  this.responseData = []; // Inicializar el array de respuestas

  for (const { id, name } of testData) {
    const endpoint = `/pokemon/${id || name}`;
    const url = `${config.apiURL}${endpoint}`;
    
    // Se realiza la solicitud GET
    const startTime = Date.now();
    const response = await this.request.get(url);
    const responseTime = Date.now() - startTime;

    // Se guarda la respuesta y el tiempo si la respuesta es exitosa (200)
    if (response.status() === 200) {
      const body = await response.json();
      this.responseData.push({ id, name, body, responseTime });
    } else {
      console.error(`Error: ${response.status()} - ${await response.text()}`);
    }
  }
  console.log("Datos almacenados en responseData:", this.responseData);
});

Then("se valida que la respuesta se correcta para el Pokemon", async function () {
    // Se verifica que hay datos de respuestas guardadas
  if (!this.responseData || this.responseData.length === 0) {
    throw new Error("No se encontraron respuestas almacenadas.");
  }

  // Se itera sobre las respuestas almacenadas
  for (const { id, name, body, responseTime } of this.responseData) {
    console.log(`Validando respuesta para el Pokemon: ${name || id}`);

    // Se valida las habilidades si están en los datos de prueba
    const testPokemon = this.testData.find((pokemon: { id: any; name: string; }) => pokemon.id === id || pokemon.name.toLowerCase() === name.toLowerCase());
    if (testPokemon && testPokemon.abilities) {
      const expectedAbilities = testPokemon.abilities.split(", ").map((a: string) => a.toLowerCase());
      const responseAbilities = body.abilities.map((a: any) => a.ability.name.toLowerCase());

      // Se valida que las habilidades esperadas coincidan con las de la respuesta
      expect(responseAbilities).toEqual(expect.arrayContaining(expectedAbilities));
      console.log(`Habilidades válidas para ${name || id}.`);
    }

    console.log(`Tiempo de respuesta para ${name || id}: ${responseTime} ms`);
    console.log(`Validación completada para el Pokemon: ${name || id}`);
  }
});

// Se valida que el tiempo de respuesta sea menor a 10s
When("el tiempo de respuesta debe ser menor a 10s", async function () {
  // Verificar que haya datos de respuestas
  if (!this.responseData || this.responseData.length === 0) {
    throw new Error("No se encontraron respuestas almacenadas.");
  }

  // Se valida el tiempo de respuesta de cada Pokemon
  for (const { responseTime, id, name } of this.responseData) {
    console.log(`Validando tiempo de respuesta para ${name || id}: ${responseTime} ms`);
    expect(responseTime).toBeLessThan(10000);
  }
});


