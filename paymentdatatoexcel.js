import XLSX from "xlsx";
import path from "path";
import fs from "fs";

const excelFile = path.join(process.cwd(), "payments.xlsx");

/**
 * Add payment to Excel with separate Credited/Debited columns
 */
export async function addPaymentToExcel(
    userId,
    userName,
    paidInRupees,
    why,
    type // "Credited" or "Debited"
) {
    let workbook;
    let worksheet;
    let existingData = [];

    try {
        // Check if file exists
        if (fs.existsSync(excelFile)) {
            try {
                // Read existing file
                workbook = XLSX.readFile(excelFile);
                
                // Check if sheet exists
                if (workbook.SheetNames.includes("Payments")) {
                    worksheet = workbook.Sheets["Payments"];
                    existingData = XLSX.utils.sheet_to_json(worksheet);
                    console.log(`📖 Found ${existingData.length} existing records`);
                } else {
                    // Sheet doesn't exist, create new
                    worksheet = XLSX.utils.json_to_sheet([]);
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
                }
            } catch (readError) {
                console.log("⚠️ Error reading file, creating new workbook:", readError.message);
                workbook = XLSX.utils.book_new();
                worksheet = XLSX.utils.json_to_sheet([]);
                XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
            }
        } else {
            // File doesn't exist, create new
            console.log("📁 Creating new Excel file...");
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.json_to_sheet([]);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
        }

    } catch (error) {
        console.log("❌ Error initializing workbook, creating new...");
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    }

    // Validate payment type
    const paymentType =
        type?.toLowerCase() === "credited"
            ? "Credited"
            : type?.toLowerCase() === "debited"
                ? "Debited"
                : null;

    if (!paymentType) {
        throw new Error(
            'Payment type must be either "Credited" or "Debited"'
        );
    }

    // Indian date/time
    const now = new Date();
    const indianDateTime = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    // Calculate running balance
    let currentBalance = 0;
    if (existingData.length > 0) {
        try {
            const lastRow = existingData[existingData.length - 1];
            const balanceValue = lastRow["Balance"];
            currentBalance = typeof balanceValue === 'number' ? balanceValue : parseFloat(balanceValue) || 0;
        } catch (error) {
            currentBalance = 0;
        }
    }

    console.log(`💰 Current balance: ₹${currentBalance}`);

    // Determine credited and debited amounts
    let creditedAmount = 0;
    let debitedAmount = 0;
    let newBalance = currentBalance;

    if (paymentType === "Credited") {
        creditedAmount = paidInRupees;
        newBalance = currentBalance + paidInRupees;
    } else if (paymentType === "Debited") {
        debitedAmount = paidInRupees;
        newBalance = currentBalance - paidInRupees;
    }

    // Create new data object
    const newEntry = {
        "User ID": String(userId),
        "User Name": String(userName),
        "Credited": creditedAmount,
        "Debited": debitedAmount,
        "Balance": newBalance,
        "Why": String(why),
        "Date/Time": String(indianDateTime)
    };

    // Add to existing data
    existingData.push(newEntry);
    console.log(`📝 Added new entry: ${paymentType} ₹${paidInRupees}`);

    // Convert to worksheet - ensure we're using the updated data
    worksheet = XLSX.utils.json_to_sheet(existingData);

    // Apply styling
    applyStyling(worksheet, existingData.length);

    // Add to workbook
    workbook.Sheets["Payments"] = worksheet;

    // Write file
    try {
        XLSX.writeFile(workbook, excelFile);
        console.log(`✅ File saved successfully: ${excelFile}`);
        
        // Verify the file was written
        if (fs.existsSync(excelFile)) {
            const stats = fs.statSync(excelFile);
            console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
            
            // Verify data was written
            const verifyWorkbook = XLSX.readFile(excelFile);
            const verifySheet = verifyWorkbook.Sheets["Payments"];
            if (verifySheet) {
                const verifyData = XLSX.utils.sheet_to_json(verifySheet);
                console.log(`✅ Verified: ${verifyData.length} records in file`);
            }
        }
    } catch (writeError) {
        console.error("❌ Error writing file:", writeError.message);
        throw writeError;
    }

    console.log(`📊 ${paymentType}: ₹${paidInRupees}`);
    console.log(`💰 New Balance: ₹${newBalance.toFixed(2)}`);
    console.log(`📈 Total entries: ${existingData.length}`);
}

/**
 * Apply styling to worksheet
 */
function applyStyling(worksheet, dataLength) {
    if (dataLength === 0) return;

    // Header style
    const headerStyle = {
        font: {
            bold: true,
            color: { rgb: "FFFFFF" },
            sz: 11,
            name: "Calibri"
        },
        fill: {
            fgColor: { rgb: "1E3A5F" }
        },
        alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true
        }
    };

    // Apply header styling
    const headers = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    headers.forEach(col => {
        const cellRef = `${col}1`;
        if (worksheet[cellRef]) {
            worksheet[cellRef].s = headerStyle;
        }
    });

    // Apply styling to data rows
    for (let row = 2; row <= dataLength + 1; row++) {
        // Credited column (C)
        const creditedCell = worksheet[`C${row}`];
        if (creditedCell && creditedCell.v > 0) {
            creditedCell.s = {
                font: { color: { rgb: "008000" }, bold: true },
                alignment: { horizontal: "right" },
                numFmt: '#,##0.00'
            };
        } else if (creditedCell) {
            creditedCell.s = {
                font: { color: { rgb: "808080" } },
                alignment: { horizontal: "right" },
                numFmt: '#,##0.00'
            };
        }

        // Debited column (D)
        const debitedCell = worksheet[`D${row}`];
        if (debitedCell && debitedCell.v > 0) {
            debitedCell.s = {
                font: { color: { rgb: "FF0000" }, bold: true },
                alignment: { horizontal: "right" },
                numFmt: '#,##0.00'
            };
        } else if (debitedCell) {
            debitedCell.s = {
                font: { color: { rgb: "808080" } },
                alignment: { horizontal: "right" },
                numFmt: '#,##0.00'
            };
        }

        // Balance column (E)
        const balanceCell = worksheet[`E${row}`];
        if (balanceCell) {
            const value = balanceCell.v || 0;
            balanceCell.s = {
                font: { 
                    color: { rgb: value >= 0 ? "008000" : "FF0000" }, 
                    bold: true 
                },
                alignment: { horizontal: "right" },
                numFmt: '#,##0.00'
            };
        }
    }

    // Set column widths
    worksheet["!cols"] = [
        { wch: 28 }, // User ID
        { wch: 25 }, // User Name
        { wch: 18 }, // Credited
        { wch: 18 }, // Debited
        { wch: 20 }, // Balance
        { wch: 40 }, // Why
        { wch: 22 }  // Date/Time
    ];
}

/**
 * Get current balance from Excel
 */
export async function getCurrentBalance() {
    try {
        if (!fs.existsSync(excelFile)) {
            return 0;
        }

        const workbook = XLSX.readFile(excelFile);
        const worksheet = workbook.Sheets["Payments"];
        
        if (!worksheet) {
            return 0;
        }

        const data = XLSX.utils.sheet_to_json(worksheet);
        
        if (data.length === 0) {
            return 0;
        }

        const lastRow = data[data.length - 1];
        const balance = typeof lastRow["Balance"] === 'number' ? 
            lastRow["Balance"] : 
            parseFloat(lastRow["Balance"]) || 0;
        
        return balance;

    } catch (error) {
        console.error("❌ Error reading balance:", error.message);
        return 0;
    }
}

/**
 * Get all payment records
 */
export async function getPaymentRecords() {
    try {
        if (!fs.existsSync(excelFile)) {
            return [];
        }

        const workbook = XLSX.readFile(excelFile);
        const worksheet = workbook.Sheets["Payments"];
        
        if (!worksheet) {
            return [];
        }

        return XLSX.utils.sheet_to_json(worksheet);

    } catch (error) {
        console.error("❌ Error reading records:", error.message);
        return [];
    }
}

/**
 * Generate summary statistics
 */
export async function getPaymentSummary() {
    try {
        if (!fs.existsSync(excelFile)) {
            return { totalCredited: 0, totalDebited: 0, balance: 0, count: 0 };
        }

        const workbook = XLSX.readFile(excelFile);
        const worksheet = workbook.Sheets["Payments"];
        
        if (!worksheet) {
            return { totalCredited: 0, totalDebited: 0, balance: 0, count: 0 };
        }

        const data = XLSX.utils.sheet_to_json(worksheet);
        
        const totalCredited = data.reduce(
            (sum, row) => sum + (typeof row["Credited"] === 'number' ? row["Credited"] : parseFloat(row["Credited"]) || 0), 
            0
        );
        const totalDebited = data.reduce(
            (sum, row) => sum + (typeof row["Debited"] === 'number' ? row["Debited"] : parseFloat(row["Debited"]) || 0), 
            0
        );

        return {
            totalCredited,
            totalDebited,
            balance: totalCredited - totalDebited,
            count: data.length
        };

    } catch (error) {
        console.error("❌ Error generating summary:", error.message);
        return { totalCredited: 0, totalDebited: 0, balance: 0, count: 0 };
    }
}

// Debug function to check file content
export async function debugExcelFile() {
    try {
        if (!fs.existsSync(excelFile)) {
            console.log("❌ File does not exist");
            return;
        }

        console.log(`📁 File exists: ${excelFile}`);
        const stats = fs.statSync(excelFile);
        console.log(`📊 File size: ${stats.size} bytes`);

        const workbook = XLSX.readFile(excelFile);
        console.log(`📚 Sheet names: ${workbook.SheetNames.join(', ')}`);

        const worksheet = workbook.Sheets["Payments"];
        if (worksheet) {
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(`📊 Records found: ${data.length}`);
            if (data.length > 0) {
                console.log("📝 First record:", JSON.stringify(data[0], null, 2));
            }
        } else {
            console.log("❌ 'Payments' sheet not found");
        }

    } catch (error) {
        console.error("❌ Debug error:", error.message);
    }
}

// Usage examples
/*
// Add a credited payment
await addPaymentToExcel(
    user._id.toString(),
    user.name,
    100,
    "New Coin Purchased",
    "Credited"
);

// Add a debited payment
await addPaymentToExcel(
    user._id.toString(),
    user.name,
    50,
    "Competition Entry Fee",
    "Debited"
);

// Debug the file
await debugExcelFile();

// Get current balance
const balance = await getCurrentBalance();
console.log("Current balance:", balance);

// Get all records
const records = await getPaymentRecords();
console.log("All records:", records);

// Get summary
const summary = await getPaymentSummary();
console.log("Summary:", summary);
*/