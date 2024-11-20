import { Page } from "@playwright/test";
import { selectors } from "./selectors";
import { config } from "../fixtures/setupEnv";
import * as path from 'path';
import * as fs from 'fs';

// Función para navegar a la página del Pokemon
export async function navigateToPokemonPage(page: Page, pokemonName: string): Promise<void> {
    const searchUrl = `/${encodeURIComponent(pokemonName)}`;
    const url = `${config.wikiURL}${searchUrl}`;
    console.log(`Buscando página para ${pokemonName}: ${url}`);

    // Navegar a la página correspondiente
    await page.goto(url);
}

// Función auxiliar para obtener el nombre del dibujante
export async function getArtistName(page: Page, pokemonName: string): Promise<string | null> {
    // Asegurarse de que el selector del dibujante esté presente en la página
    const artistSelector = selectors.artistName; // Ajusta el selector según el HTML de la página
    await page.waitForSelector(artistSelector);

    try {
        const artistName = await page.locator(artistSelector).textContent(); // Obtener el texto del dibujante
        return artistName;
    } catch (error) {
        console.error("Error al obtener el nombre del dibujante:", error);
        throw new Error(`No se pudo obtener el nombre del dibujante para el Pokémon ${pokemonName}.`);
    }
}

// Función para descargar la imagen del Pokemon
export async function downloadPokemonImage(page: Page, pokemonName: string): Promise<string> {
    const searchUrl = `/${encodeURIComponent(pokemonName)}`;
    const url = `${config.wikiURL}${searchUrl}`;

    console.log(`Buscando imagen para ${pokemonName}: ${url}`);

    // Navegar a la página del Pokemon
    await page.goto(url);

    // Obtener el selector de la imagen
    const imageSelector = selectors.pokemonImage;
    const imageElement = await page.locator(imageSelector);

    // Obtener la URL de la imagen
    let imageUrl = await imageElement.getAttribute('src');
    if (!imageUrl) {
        throw new Error(`No se encontró la imagen del Pokémon: ${pokemonName}`);
    }

    // Verificar si la URL comienza con // y agregar https:
    if (imageUrl.startsWith('//')) {
        imageUrl = `https:${imageUrl}`;
    }

    // Crear 'images' si no existe
    const dirPath = path.resolve(__dirname, '../../images');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Descarga la imagen
    const imagePath = path.resolve(dirPath, `${pokemonName}.png`);
    const viewSource = await page.goto(imageUrl); // Hacer una solicitud HTTP para la imagen

    if (!viewSource) {
        throw new Error(`No se pudo descargar la imagen del Pokémon: ${pokemonName}`);
    }

    // Guarda la imagen 
    const buffer = await viewSource.body();
    fs.writeFileSync(imagePath, buffer);

    console.log(`Imagen descargada para: ${pokemonName}`);
    return imagePath;
}

// Función que devuelve el tamaño de la imagen
export async function getImageSize(imagePath: string): Promise<number> {
    if (!imagePath) {
        throw new Error("La ruta de la imagen no es válida.");
    }
    const stats = fs.statSync(imagePath); // Obtener información de la imagen
    const fileSizeInBytes = stats.size;
    console.log(`El tamaño de la imagen es: ${fileSizeInBytes} bytes.`);
    return fileSizeInBytes;
}