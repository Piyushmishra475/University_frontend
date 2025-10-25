import React from 'react';

export default function Modal({ open, onClose, courseFees }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Course-wise Fee Range</h3>
        <ul>
          {courseFees.map((c, i) => (
            <li key={i}><b>{c.course}</b>: ₹{c.min} – ₹{c.max} / year</li>
          ))}
        </ul>
        <div style={{textAlign:'right', marginTop:12}}>
          <button onClick={onClose} className="cta">Close</button>
        </div>
      </div>
    </div>
  );
}
