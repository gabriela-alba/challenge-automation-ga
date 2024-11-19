import * as xlsx from "xlsx";

export function readTestData(filePath: string) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData as { id: number; name: string; abilities: string }[];
}