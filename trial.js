import XLSX from "xlsx";
import path from "path";

const filePath = path.join(process.cwd(), "~$live-history.xlsx");

const workbook = XLSX.readFile(filePath);

console.log("Sheets:", workbook.SheetNames);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet, {
    defval: ""
});

console.log("Total rows:", data.length);
console.log("First row:", data[0]);

console.table(data);