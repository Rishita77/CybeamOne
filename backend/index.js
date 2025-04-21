const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const wss = new WebSocket.Server({ server });

const convertCSVtoExcel = require('./csvToExcel');
const { generateCypressTest } = require('./csvToCypress');
const { runCypressTest } = require('./runCypressTest');


const { startCSVSession, writeCSVLine, stopCSVSession } = require('./csvWriter');

app.use(cors());
app.use(express.json());
app.use('/data', express.static(path.join(__dirname, 'data')));

let connectedClients = [];
let lastLaunchedUrl = '';


let isTracking = false; 


wss.on('connection', (ws) => {
  console.log('🟢 WebSocket client connected');
  connectedClients.push(ws);

  ws.on('close', () => {
    console.log('🔴 WebSocket client disconnected');
    connectedClients = connectedClients.filter((client) => client !== ws);
  });

  ws.on('message', (message) => {
    
    if (isTracking) {
      console.log(`📥 Event received: ${message}`);
      connectedClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
  
      try {
        const parsed = JSON.parse(message);
        writeCSVLine(parsed);
      } catch (err) {
        console.error('❌ Failed to write to CSV:', err.message);
      }
    } else {
      console.log('⚠️ Ignored event (tracking is OFF)');
    }
  });
  
});

app.post('/start-tracking', (req, res) => {
  isTracking = true;
  const filename = startCSVSession(); 
  console.log('▶️ Tracking ENABLED');
  res.json({ status: 'Tracking started', csvFilename: filename }); 
});

app.post('/stop-tracking', (req, res) => {
  isTracking = false;
  console.log('⏹️ Tracking DISABLED');
  res.json({ status: 'Tracking stopped' });
});

app.post('/launch', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  lastLaunchedUrl = url;

  const pythonScript = path.join(__dirname, '..', 'automation', 'browser_launcher.py');
  const child = spawn('python', [pythonScript, url]);

  let stdoutData = '';
  let stderrData = '';

  child.stdout.on('data', (data) => {
    stdoutData += data.toString();
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    stderrData += data.toString();
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    if (code === 0) {
      res.json({ status: 'Browser launched successfully!', output: stdoutData });
    } else {
      res.status(500).json({
        error: 'Failed to launch browser',
        details: stderrData,
        code,
      });
    }
  });
});


app.post('/submit-outcome', async (req, res) => {
  const { outcome } = req.body;
  if (!outcome) return res.status(400).json({ error: 'No outcome provided' });

  try {
    const csvFile = stopCSVSession(outcome); 
    console.log(`✅ Outcome "${outcome}" saved to ${csvFile}`);

    const testFile = generateCypressTest(csvFile, outcome, lastLaunchedUrl);
    console.log(`🧪 Cypress test generated at: ${testFile}`);

    const { success, output, error } = await runCypressTest(testFile);
    if (!success) {
      console.error('❌ Cypress test run failed:', error);
    }

    res.json({
      status: 'Outcome saved, test generated, and test executed',
      csvFile,
      testFile,
      testResult: output,
      success,
    });
  } catch (err) {
    console.error('❌ Failed to write outcome or generate/run test:', err);
    res.status(500).json({ error: 'Error saving outcome or generating test' });
  }
});




app.post('/export-excel', async (req, res) => {
  const { csvFilename } = req.body;
  const csvPath = path.join(__dirname, 'data', csvFilename);
  const excelPath = csvPath.replace('.csv', '.xlsx');

  try {
    await convertCSVtoExcel(csvPath, excelPath);
    res.json({ status: 'Excel exported', file: path.basename(excelPath) });
  } catch (error) {
    console.error('❌ Error exporting Excel:', error);
    res.status(500).json({ error: 'Failed to export Excel' });
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
