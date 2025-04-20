const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

async function convertCSVtoExcel(csvPath, excelPath) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Interaction Log');

  const fileContents = fs.readFileSync(csvPath, 'utf-8');
  const lines = fileContents.trim().split('\n');
  const headers = lines[0].split(',');
  
  worksheet.columns = headers.map((header) => ({
    header: header.trim(),
    key: header.trim(),
    width: 25,
    style: { font: { bold: true } },
  }));

  lines.slice(1).forEach((line, i) => {
    const values = line.split(',');
    worksheet.addRow(values);

    if (i % 2 === 1) {
      worksheet.getRow(i + 2).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEFEFEF' },
      };
    }
  });

  await workbook.xlsx.writeFile(excelPath);
  console.log(`✅ Excel created at ${excelPath}`);
}

module.exports = convertCSVtoExcel;
