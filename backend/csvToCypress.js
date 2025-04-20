// backend/csvToCypress.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

function sanitizeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function fixJSON(data) {
  try {
    return JSON.parse(data);
  } catch {
    // Try un-escaping quotes
    try {
      return JSON.parse(data.replace(/""/g, '"').replace(/^"|"$/g, ''));
    } catch (e2) {
      return null;
    }
  }
}

function generateCypressTest(csvPath, testName = 'generated_test', defaultLaunchUrl = 'http://example.com') {
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
  let launchUrl = defaultLaunchUrl;

  records.forEach((row, index) => {
    const { event_type, data } = row;

    if (!event_type || !data) {
      console.warn(`⚠️ Missing event_type or data at row ${index + 2}`);
      return;
    }

    const parsedData = fixJSON(data);
    if (!parsedData) {
      console.warn(`⚠️ Invalid JSON at row ${index + 2}:`, data);
      return;
    }

    switch (event_type.toLowerCase()) {
      case 'navigate':
        if (parsedData.url) {
          launchUrl = parsedData.url;
        } else {
          console.warn(`⚠️ Missing url for navigate at row ${index + 2}`);
        }
        break;

      case 'click':
        if (parsedData.selector) {
          commands.push(`cy.get('${sanitizeString(parsedData.selector)}').click();`);
        } else {
          console.warn(`⚠️ Missing selector for click at row ${index + 2}`);
        }
        break;

      case 'input':
        if (parsedData.selector && parsedData.value !== undefined) {
          commands.push(`cy.get('${sanitizeString(parsedData.selector)}').type('${sanitizeString(parsedData.value)}');`);
        } else {
          console.warn(`⚠️ Missing selector/value for input at row ${index + 2}`);
        }
        break;

      case 'scroll':
        if (parsedData.y !== undefined) {
          commands.push(`cy.scrollTo(0, ${parsedData.y});`);
        } else {
          commands.push(`cy.scrollTo('${parsedData.direction || 'bottom'}');`);
        }
        break;

      case 'keydown':
        if (parsedData.selector && parsedData.key) {
          commands.push(`cy.get('${sanitizeString(parsedData.selector)}').type('{${parsedData.key}}');`);
        } else {
          console.warn(`⚠️ Missing selector/key for keydown at row ${index + 2}`);
        }
        break;

      case 'xhr':
      case 'fetch':
        if (parsedData.url) {
          commands.push(`cy.intercept('${parsedData.url}').as('request${index}');`);
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

    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    const testFilename = `test_${timestamp}.cy.js`;
    const testPath = path.join(testDir, testFilename);
    fs.writeFileSync(testPath, testCode);

    return testPath;

}

module.exports = { generateCypressTest };
