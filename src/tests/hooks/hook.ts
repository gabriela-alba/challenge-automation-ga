import { Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { CustomWorld } from "../world/world";
import { readTestData } from "../../utils/xlsx-reader";
import { setTestData } from "../../utils/data-store";

let browser: Browser;

Before(async function (this: CustomWorld) {
  console.log("Inicializando navegador...");

  browser = await chromium.launch({ headless: true });
  this.browser = browser;
  this.page = await browser.newPage();

  // Carga datos de prueba desde el archivo Excel
  const filePath = "src/data/Datos-pruebas.xlsx";
  const loadedData = await readTestData(filePath);

  if (!loadedData || loadedData.length === 0) {
    throw new Error("No se encontraron datos en el archivo Excel.");
  }

  setTestData(loadedData); // Guarda los datos globalmente
  this.testData = loadedData;
  console.log("Datos de prueba cargados:", this.testData);
});

After(async function (this: CustomWorld) {
  if (this.page) {
    console.log("Cerrando la página...");
    await this.page.close();
  }
  if (browser) {
    console.log("Cerrando el navegador...");
    await browser.close();
  }
});