import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

/**
 * Read data from an Excel file located in the `testdata` directory
 * @param fileName Excel file name (e.g., "CaseDatVe.xlsx")
 * @returns Parsed data as an array of objects from the first sheet
 */
export function getExcelData<T>(fileName: string): T[] {
  // Absolute path to the Excel file
  const filePath = path.resolve("E:/Hicas/jasminetest/testdata", fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  // Read workbook from the Excel file
  const workbook = XLSX.readFile(filePath);

  // Get the first sheet name
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  if (!worksheet) {
    throw new Error(`First sheet not found in file: ${fileName}`);
  }

  // Return parsed data as JSON
  const data: T[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  return data;
}

/**
 * Read and merge data from multiple Excel files
 * @param paths Array of Excel file paths
 * @returns Combined parsed data from all provided files
 */
export async function getExcelDataFromMultipleFiles<T>(
  paths: string[]
): Promise<T[]> {
  let result: T[] = [];
  for (let filePath of paths) {
    result.push(...(await getExcelData<T>(filePath)));
  }
  return result;
}
