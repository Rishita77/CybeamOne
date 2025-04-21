// backend/runCypressTest.js
const { exec } = require('child_process');
const path = require('path');

function runCypressTest(testFilePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(testFilePath);
    const command = `npx cypress run --spec "${fullPath}" --browser chrome`;

    exec(command, { maxBuffer: 1024 * 1000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({
          success: false,
          error: stderr || error.message,
          output: stdout,
        });
      } else {
        resolve({
          success: true,
          output: stdout,
        });
      }
    });
  });
}

module.exports = { runCypressTest };
