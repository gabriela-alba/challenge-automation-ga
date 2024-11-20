export interface PokemonTestData {
  id: number;
  name: string;
  abilities: string;
}

// Variable interna para almacenar los datos de prueba
let testData: PokemonTestData[] = [];

/**
 * Guarda los datos de prueba
 * @param data - Array de datos de prueba
 */
export function setTestData(data: PokemonTestData[]) {
  testData = data;
}

/**
 * Obtiene los datos de prueba almacenados
 * @returns - Array de datos de prueba
 */
export function getTestData(): PokemonTestData[] {
  console.log("Datos de prueba almacenados:", testData);
  return testData;
}