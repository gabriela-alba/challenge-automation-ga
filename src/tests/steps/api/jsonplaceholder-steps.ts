import { Then } from "@cucumber/cucumber";
import { Given, When } from "./common-steps";
import { expect, request } from "@playwright/test";
import { config } from "../../../fixtures/setupEnv";

let response: any;
let requestData: { userId: number, title: string, body: string };

When("se realiza una solicitud POST al endpoint JSONPlaceholder con los siguientes datos", async function (dataTable) {
    // Se extrae los datos de la tabla, se elimina la primera fila (cabecera) y se asigna valores
    const [userId, title, body] = dataTable.raw()[1];

    // Datos de la solicitud
    requestData = {
        userId: parseInt(userId),
        title,
        body,
    };

    const endpoint = "/posts";
    const url = `${config.jsonplaceholderURL}${endpoint}`;
    this.request = await request.newContext();
  
    // Se realiza la solicitud POST
    response = await this.request.post(url, {
        data: requestData
    });
  });

Then("se valida que el código de respuesta sea 201", async function () {
    const statusCode = response.status();
    console.log("El código de respuesta es:", statusCode);
    expect(statusCode).toBe(201);
});

Then("se valida que los datos enviados coincidan con los de la respuesta", async function () {
    const responseBody = await response.json();
    // Se compara con los valores de la respuesta
    validateResponseBody(responseBody, requestData);
});

// Función para validar el body de la respuesta
function validateResponseBody(responseBody: any, requestData: { userId: number, title: string, body: string }) {
    console.log("Datos enviados:", requestData);
    console.log("Respuesta recibida: ", responseBody);
    expect(responseBody.userId).toBe(requestData.userId);
    expect(responseBody.title).toBe(requestData.title);
    expect(responseBody.body).toBe(requestData.body);
  }