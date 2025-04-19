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

app.use(cors());
app.use(express.json());

let connectedClients = [];

let isTracking = false; 


// WebSocket server setup
wss.on('connection', (ws) => {
  console.log('🟢 WebSocket client connected');
  connectedClients.push(ws);

  ws.on('close', () => {
    console.log('🔴 WebSocket client disconnected');
    connectedClients = connectedClients.filter((client) => client !== ws);
  });

  ws.on('message', (message) => {
    console.log(`📥 Event received: ${message}`);
    
    if (isTracking) {
      connectedClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } else {
      console.log('⚠️ Ignored event (tracking is OFF)');
    }
  });
  
});

app.post('/start-tracking', (req, res) => {
  isTracking = true;
  console.log('▶️ Tracking ENABLED');
  res.json({ status: 'Tracking started' });
});

app.post('/stop-tracking', (req, res) => {
  isTracking = false;
  console.log('⏹️ Tracking DISABLED');
  res.json({ status: 'Tracking stopped' });
});

// Launch Python + browser script
app.post('/launch', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

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

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
