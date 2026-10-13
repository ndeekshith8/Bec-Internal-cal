import React, { useState } from 'react';
import './Calculator.css';

export default function Calculator() {
  const [formData, setFormData] = useState({
    mid1: '',
    mid2: '',
    aat1: '',
    aat2: '',
    attendance: '',
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calculateMarks = (e) => {
    e.preventDefault();

    const mid1 = parseFloat(formData.mid1);
    const mid2 = parseFloat(formData.mid2);
    const aat1 = parseFloat(formData.aat1);
    const aat2 = parseFloat(formData.aat2);
    const attendance = parseFloat(formData.attendance);

    if (isNaN(mid1) || isNaN(mid2) || isNaN(aat1) || isNaN(aat2) || isNaN(attendance)) {
      alert('Error: All text fields must be filled with numbers. Use 0 if a field is blank.');
      return;
    }

    if (mid1 < 0 || mid1 > 30 || mid2 < 0 || mid2 > 30) {
      alert('Error: Mid-term marks must remain within the 0 to 30 range.');
      return;
    }

    if (aat1 < 0 || aat1 > 10 || aat2 < 0 || aat2 > 10) {
      alert('Error: Individual AAT scores must remain within the 0 to 10 range.');
      return;
    }

    if (attendance < 0 || attendance > 5) {
      alert('Error: Attendance score must remain within the 0 to 5 range.');
      return;
    }

    // Calculations
    const mid1Scaled = (mid1 / 30) * 20;
    const mid2Scaled = (mid2 / 30) * 20;
    const bestMid = Math.max(mid1Scaled, mid2Scaled);
    const leastMid = Math.min(mid1Scaled, mid2Scaled);
    const finalMidMarks = 0.75 * bestMid + 0.25 * leastMid;

    const avgAatScore = (aat1 + aat2) / 2;
    const finalAatMarks = (avgAatScore / 10) * 15;
    const totalInternals = finalMidMarks + finalAatMarks + attendance;

    setResults({
      mid: finalMidMarks.toFixed(2),
      aatAvg: avgAatScore.toFixed(2),
      aat: finalAatMarks.toFixed(2),
      attendance: attendance.toFixed(2),
      total: totalInternals.toFixed(2),
      isSafe: totalInternals >= 20.0,
    });
  };

  return (
    <div className="calculator-card">
      <h2>Bapatla Engineering College</h2>
      <div className="subtitle">Theory Internal Calculator (R24 Regulation)</div>

      <form onSubmit={calculateMarks}>
        {/* Mid Exam Section */}
        <div className="section-title">Mid-Term Examinations</div>
        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="mid1">Mid-1 Marks (0-30):</label>
            <input
              type="number"
              id="mid1"
              min="0"
              max="30"
              step="0.01"
              placeholder="e.g. 25"
              value={formData.mid1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mid2">Mid-2 Marks (0-30):</label>
            <input
              type="number"
              id="mid2"
              min="0"
              max="30"
              step="0.01"
              placeholder="e.g. 22"
              value={formData.mid2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* AAT Section */}
        <div className="section-title">Alternate Assessment Tools (AAT)</div>
        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="aat1">AAT 1 Score (0-10):</label>
            <input
              type="number"
              id="aat1"
              min="0"
              max="10"
              step="0.01"
              placeholder="e.g. 8.5"
              value={formData.aat1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="aat2">AAT 2 Score (0-10):</label>
            <input
              type="number"
              id="aat2"
              min="0"
              max="10"
              step="0.01"
              placeholder="e.g. 9.0"
              value={formData.aat2}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Attendance Section */}
        <div className="section-title">Class Attendance</div>
        <div className="form-group">
          <label htmlFor="attendance">Attendance Marks (0-5):</label>
          <input
            type="number"
            id="attendance"
            min="0"
            max="5"
            step="0.01"
            placeholder="e.g. 4.5"
            value={formData.attendance}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Calculate Internals</button>
      </form>

      {/* Results Display Panel */}
      {results && (
        <div className="results-box" key={results.total}>
          <div className="result-row">
            <span>Scaled Mid Marks (Max 20):</span>
            <strong>{results.mid}</strong>
          </div>
          <div className="result-row">
            <span>AAT Average Score (Out of 10):</span>
            <strong>{results.aatAvg}</strong>
          </div>
          <div className="result-row">
            <span>Scaled AAT Marks (Max 15):</span>
            <strong>{results.aat}</strong>
          </div>
          <div className="result-row">
            <span>Attendance Score (Max 5):</span>
            <strong>{results.attendance}</strong>
          </div>
          <div className="total-row">
            <span>Total Internal Marks (Max 40):</span>
            <span>{results.total} / 40</span>
          </div>
          <div className={`status-msg ${results.isSafe ? 'safe' : 'danger'}`}>
            {results.isSafe ? (
              <>
                ✅ <strong>Status:</strong> Clear! you are qualify to write semester exam.
              </>
            ) : (
              <>
                ⚠️ <strong>Recommendation:</strong> Marks are below 20
                  you are not qualify
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
