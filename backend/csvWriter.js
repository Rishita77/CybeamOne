const fs = require('fs');
const path = require('path');

let stream = null;
let currentFile = '';

function startCSVSession() {
  const filename = `session-${new Date().toISOString().replace(/[:.]/g, '_')}.csv`;
  const filepath = path.join(__dirname, 'data', filename);
  currentFile = filepath;
  stream = fs.createWriteStream(filepath, { flags: 'a' });
  stream.write('timestamp,event_type,data\n'); 
  return filename;
}

function writeCSVLine({ timestamp, type, data }) {
  if (stream) {
    const line = `"${timestamp}","${type}","${JSON.stringify(data).replace(/"/g, '""')}"\n`;
    stream.write(line);
  }
}

function stopCSVSession(outcome) {
  if (stream) {
    stream.write(`\nTest Outcome: ${outcome}\n`);
    stream.end();
    stream = null;
  }
  return currentFile;
}

module.exports = {
  startCSVSession,
  writeCSVLine,
  stopCSVSession,
};
