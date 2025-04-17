const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/launch', (req, res) => {
  const { url, browser } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const pythonScript = path.join(__dirname, '../automation/browser_launcher.py');

  const child = spawn('python', [pythonScript, url]);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    if (code === 0) {
      res.json({ status: 'Browser launched successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to launch browser' });
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
