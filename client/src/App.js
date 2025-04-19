import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onmessage = async (event) => {
      try {
        const text = await event.data.text(); // 👈 Convert Blob to text
        const data = JSON.parse(text);
        const summary = `[${data.timestamp}] ${data.type.toUpperCase()} — ${JSON.stringify(data.data)}`;
        setLogs((prev) => [...prev, summary]);
      } catch (err) {
        console.error('Invalid WebSocket data:', event.data);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
      setLogs((prev) => [...prev, '❌ WebSocket connection failed.']);
    };

    return () => socket.close();
  }, []);

  const handleNavigate = async () => {
    try {
      const response = await fetch('http://localhost:3000/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setLogs((prev) => [...prev, `🔗 Launch status: ${data.status || data.error}`]);
    } catch (err) {
      setLogs((prev) => [...prev, `❌ Error launching browser: ${err.message}`]);
    }
  };

  const startTracking = async () => {
    try {
      const res = await fetch('http://localhost:3000/start-tracking', { method: 'POST' });
      const data = await res.json();
      setLogs((prev) => [...prev, `✅ ${data.status}`]);
    } catch (err) {
      setLogs((prev) => [...prev, `❌ Error starting tracking: ${err.message}`]);
    }
  };

  const stopTracking = async () => {
    try {
      const res = await fetch('http://localhost:3000/stop-tracking', { method: 'POST' });
      const data = await res.json();
      setLogs((prev) => [...prev, `🛑 ${data.status}`]);
      setShowOutcomeModal(true); // Show popup after stopping
    } catch (err) {
      setLogs((prev) => [...prev, `❌ Error stopping tracking: ${err.message}`]);
    }
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

        <div className="button-container">
          <button className="button navigate-button" onClick={handleNavigate}>
            Navigate
          </button>
          <button className="button start-button" onClick={startTracking}>
            Start
          </button>
          <button className="button stop-button" onClick={stopTracking}>
            Stop
          </button>
        </div>

        <div className="log-container">
          {logs.map((log, i) => (
            <div key={i} className="log">{log}</div>
          ))}
        </div>
      </div>

      {showOutcomeModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Test Outcome</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Passed"
                  checked={selectedOutcome === 'Passed'}
                  onChange={() => setSelectedOutcome('Passed')}
                /> ✅ Passed
              </label>
              <label>
                <input
                  type="radio"
                  value="Partially Passed"
                  checked={selectedOutcome === 'Partially Passed'}
                  onChange={() => setSelectedOutcome('Partially Passed')}
                /> ⚠️ Partial
              </label>
              <label>
                <input
                  type="radio"
                  value="Failed"
                  checked={selectedOutcome === 'Failed'}
                  onChange={() => setSelectedOutcome('Failed')}
                /> ❌ Failed
              </label>
            </div>
            <button
              className="submit-button"
              onClick={async () => {
                if (!selectedOutcome) {
                  alert('Please select an outcome before submitting.');
                  return;
                }
                try {
                  await fetch('http://localhost:3000/submit-outcome', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ outcome: selectedOutcome }),
                  });
                  setLogs((prev) => [...prev, `📌 Outcome recorded: ${selectedOutcome}`]);
                } catch (e) {
                  setLogs((prev) => [...prev, `❌ Error saving outcome: ${e.message}`]);
                }
                setShowOutcomeModal(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
