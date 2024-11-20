import { setWorldConstructor, World } from "@cucumber/cucumber";
import { Page, Browser } from "@playwright/test";

export class CustomWorld extends World {
  browser?: Browser;       // Instancia del navegador
  page?: Page;             // Página actual
  testData?: any[];        // Datos de prueba cargados desde el archivo Excel
  pokemonData?: any;       // Pokemon actual para la prueba

  constructor(options: any) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);