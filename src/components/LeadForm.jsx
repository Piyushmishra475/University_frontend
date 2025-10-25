import React, { useState } from 'react';

export default function LeadForm({ pipedreamUrl }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false,
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) {
      setStatus(' Enter valid 10-digit Indian phone number');
      return;
    }
    if (!form.consent) {
      setStatus(' Please provide consent to proceed');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(pipedreamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Submitted successfully!');
        setForm({ name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false });
      } else {
        setStatus('Submission failed!');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card lead-column" onSubmit={handleSubmit}>
      <div className="form-row"><label>Full Name</label><input name="name" value={form.name} onChange={handleChange} required /></div>
      <div className="form-row"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
      <div className="form-row"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} required maxLength={10} /></div>
      <div className="form-row"><label>State</label><input name="state" value={form.state} onChange={handleChange} required /></div>
      <div className="form-row"><label>Course Interested</label><input name="course" value={form.course} onChange={handleChange} required /></div>
      <div className="form-row"><label>Intake Year</label><input name="intake" type="number" value={form.intake} onChange={handleChange} required /></div>
      <div className="form-row">
        <label><input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} /> I agree to be contacted by the university.</label>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button type="submit" className="cta" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      </div>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </form>
  );
}
