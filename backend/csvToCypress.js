// backend/csvToCypress.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const { runCypressTest } = require('./runCypressTest');

function generateCypressTest(csvPath, testName = 'generated_test', launchUrl = 'http://example.com') {
  const content = fs.readFileSync(csvPath, 'utf-8');

  const rawRecords = parse(content, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const records = rawRecords.filter(row =>
    row.timestamp && row.event_type && row.data
  );

  let commands = [];

  records.forEach((row, index) => {
    const { event_type, data } = row;

    if (!event_type || !data) {
      console.warn(`⚠️ Missing event_type or data at row ${index + 2}`);
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      console.warn(`⚠️ Invalid JSON at row ${index + 2}:`, data);
      return;
    }

    switch (event_type) {
      case 'click':
        if (parsedData.selector) {
          commands.push(`// Click on ${parsedData.selector}`);
          commands.push(`cy.get('${parsedData.selector}').click();`);
        } else {
          console.warn(`⚠️ Missing selector for click at row ${index + 2}`);
        }
        break;

      case 'input':
        if (parsedData.selector && parsedData.value !== undefined) {
          commands.push(`// Type '${parsedData.value}' into ${parsedData.selector}`);
          commands.push(`cy.get('${parsedData.selector}').type('${parsedData.value}');`);
        } else {
          console.warn(`⚠️ Missing selector/value for input at row ${index + 2}`);
        }
        break;

      case 'scroll':
        const direction = parsedData.direction || 'bottom';
        commands.push(`// Scroll to ${direction}`);
        commands.push(`cy.scrollTo('${direction}');`);
        break;

      case 'keydown':
        if (parsedData.selector && parsedData.key) {
          commands.push(`// Simulate keydown '${parsedData.key}' on ${parsedData.selector}`);
          commands.push(`cy.get('${parsedData.selector}').type('{${parsedData.key}}');`);
        } else {
          console.warn(`⚠️ Missing selector/key for keydown at row ${index + 2}`);
        }
        break;

      case 'xhr':
      case 'fetch':
        if (parsedData.url) {
          commands.push(`// Intercept and wait for network request to ${parsedData.url}`);
          commands.push(`cy.intercept('${parsedData.url}').as('request${index}');`);
          commands.push(`cy.wait('@request${index}').its('response.statusCode').should('eq', 200);`);
        } else {
          console.warn(`⚠️ Missing url for ${event_type} at row ${index + 2}`);
        }
        break;

      default:
        console.warn(`⚠️ Unhandled event type '${event_type}' at row ${index + 2}`);
        break;
    }
  });

  const testCode = `describe('Auto-Generated Cypress Test', () => {
  it('Replays user session', () => {
    cy.visit('${launchUrl}');
    ${commands.join('\n    ')}
  });
});`;

  const testDir = path.join(__dirname, '..', 'cypress-tests');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }

  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
  const testFilename = `test_${timestamp}.cy.js`;
  const testPath = path.join(testDir, testFilename);
  fs.writeFileSync(testPath, testCode);

  return testPath;
}

async function generateAndRun(csvPath, testName, launchUrl) {
  const testFilePath = generateCypressTest(csvPath, testName, launchUrl);
  const result = await runCypressTest(testFilePath);
  return { testFilePath, ...result };
}

module.exports = { generateCypressTest, generateAndRun };

module.exports = { generateCypressTest };
