
import React, { useState } from 'react';

// Component for handling student admission lead form submissions
export default function LeadForm({ pipedreamUrl }) {
  const courses = [
    'B.Tech Computer Science',
    'B.Tech Electrical Engineering', 
    'MBA',
    'BBA',
    'B.Des',
    'M.Des',
    'M.Tech',
    'M.Sc AI',
    'BSc Computer Science'
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep',
    'Andaman and Nicobar Islands'
  ];

  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false,
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // ------------- Handles form input changes and updates the form state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ------------- Handles form submission, validates inputs and makes API call
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
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: window.location.pathname
        }),
      });
      if (res.ok) {
        setStatus('Submitted successfully!');
        setForm({ name: '', email: '', phone: '', state: '', course: '', intake: '', consent: false });
        setTimeout(() => setStatus(null), 3000);
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

  // ------------------ Renders the admission form with input fields and submission handling
  return (
    <form id="lead-form" className="application-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3 className="form-title">Apply Now</h3>
        <p className="form-subtitle">Start your admission process today</p>
      </div>
      
      <div className="form-row">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required />
      </div>
      
      <div className="form-row">
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required />
      </div>
      
      <div className="form-row">
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required maxLength={10} />
      </div>
      
      <div className="form-row">
        <select name="state" value={form.state} onChange={handleChange} required>
          <option value="">Select State *</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>
      
      <div className="form-row">
        <select name="course" value={form.course} onChange={handleChange} required>
          <option value="">Select Course *</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>
      
      <div className="form-row">
        <input name="intake" type="number" value={form.intake} onChange={handleChange} placeholder="Intake Year *" min={new Date().getFullYear()} max={new Date().getFullYear() + 5} required />
      </div>
      
      <div className="checkbox-row">
        <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
        <label>I agree to be contacted by the university for admission guidance and updates.</label>
      </div>
      
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Submitting Application...' : 'Submit Application'}
      </button>
      
      {status && (
        <div className={`status-message ${status.includes('successfully') ? 'success' : 'error'}`}>
          {status}
        </div>
      )}
    </form>
  );
}
