import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [browser, setBrowser] = useState('chromium');

  const handleNavigate = async () => {
    try {
      const response = await fetch('http://localhost:3000/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, browser }),
      });

      const data = await response.json();
      setLogs([...logs, `Launch status: ${data.status || data.error}`]);
    } catch (err) {
      setLogs([...logs, `Error launching site: ${err.message}`]);
    }
  };

  const handleStart = () => {
    setLogs([...logs, `Started tracking for ${url}`]);
  };

  const handleStop = () => {
    setLogs([...logs, `Stopped tracking for ${url}`]);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Website Interaction Tracker</h1>

        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />

        <select
          value={browser}
          onChange={(e) => setBrowser(e.target.value)}
          className="select"
        >
          <option value="chromium">Chromium</option>
          <option value="firefox">Firefox</option>
          <option value="webkit">WebKit</option>
        </select>

        <div className="button-container">
          <button
            className="button navigate-button"
            onClick={handleNavigate}
          >
            Navigate
          </button>
          <button
            className="button start-button"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="button stop-button"
            onClick={handleStop}
          >
            Stop
          </button>
        </div>

        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
