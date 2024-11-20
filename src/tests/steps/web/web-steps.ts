import { Then } from "@cucumber/cucumber";
import { When } from "../common/common-steps";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../world/world";
import { navigateToPokemonPage, getArtistName, downloadPokemonImage, getImageSize } from "../../../utils/helper"; 

When("se realiza una búsqueda en Wikipedia para el Pokemon", async function (this: CustomWorld) {
    if (!this.testData || this.testData.length === 0) {
        throw new Error("No se encontraron datos de los Pokémon en el contexto.");
    }

    // Iterar sobre todos los Pokemon en testData
    for (const pokemon of this.testData) {
        // Navegar a la página del Pokémon
        await navigateToPokemonPage(this.page!, pokemon.name);

        // Validar que el título de la página contiene el nombre del Pokemon
        const title = (await this.page!.title()).toLowerCase();
        if (!title || !title.includes(pokemon.name.toLowerCase())) {
            throw new Error(`La página no coincide con el Pokémon: ${pokemon.name}`);
        }

        console.log(`Página validada para: ${pokemon.name}`);
    }
});

When("se loguea el nombre del dibujante", async function (this: CustomWorld) {
    // Verificar que los datos del Pokemon están disponibles
    if (!this.pokemonData || this.pokemonData.length === 0) {
        this.pokemonData = this.testData;
    }
    if (!this.pokemonData || this.pokemonData.length === 0) {
        throw new Error("Los datos del Pokémon no están disponibles.");
    }

    // Verificar que la página está inicializada
    if (!this.page) {
        throw new Error("La página no está inicializada.");
    }

    // Iterar sobre todos los Pokémon en pokemonData
    for (const pokemon of this.pokemonData) {
        const artistName = await getArtistName(this.page!, pokemon.name);
        if (artistName) {
            console.log(`El nombre del dibujante para el Pokémon ${pokemon.name} es: ${artistName}`);
        } else {
            console.log(`No se encontró el nombre del dibujante para el Pokémon ${pokemon.name}`);
        }
    }
});

When("se descarga la imagen de la página de Wikipedia", async function (this: CustomWorld) {
    if (!this.testData || this.testData.length === 0) {
        throw new Error("No se encontraron datos de los Pokémon en el contexto.");
    }

    // Descargar la imagen para cada Pokémon
    for (const pokemon of this.testData) {
        const imagePath = await downloadPokemonImage(this.page!, pokemon.name);
        console.log(`Imagen descargada para: ${pokemon.name}`);
        pokemon.imagePath = imagePath;
    }
});

Then("se valida que la imagen descargada sea menor a 500000 bytes", async function () {
    if (!this.testData || this.testData.length === 0) {
        throw new Error("No se encontraron datos de los Pokémon en el contexto.");
    }

    for (const pokemon of this.testData) {
        // Obtener el tamaño de la imagen
        const imageSize = await getImageSize(pokemon.imagePath);

        // Validar que el tamaño de la imagen es menor a 500000 bytes
        expect(imageSize).toBeLessThan(500000);
    }
});