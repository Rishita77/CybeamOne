const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/launch', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  exec(`python ../automation/browser_launcher.py ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Python error:', stderr);
      return res.status(500).json({ error: stderr });
    }
    return res.json({ status: 'Browser launched', message: stdout });
  });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
