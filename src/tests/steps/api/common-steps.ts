import { Given, When } from "@cucumber/cucumber";
import { encryptSecretKey } from "../../../fixtures/crypto-helper";
import { config } from "../../../fixtures/setupEnv";

// Loguear la clave secreta encriptada
Given("la clave secreta encriptada", async function () {
    const encryptedKey = encryptSecretKey(config.secretKey);
    this.encryptedKey = encryptedKey;
    console.log("Clave secreta encriptada:", this.encryptedKey);
  });

// Loguear la fecha y hora de finalización de la prueba
When("se loguea la fecha y hora de finalización de la prueba", async function () {
    const endTime = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
    console.log("Fecha y hora de finalización de la prueba:", endTime);
  });


// Exporta los pasos registrados
export { Given, When };