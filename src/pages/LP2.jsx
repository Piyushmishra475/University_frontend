import React, { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import Modal from '../components/Modal';
import { generateBrochure } from '../components/BrochurePDF';




export default function LP2() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fees, setFees] = useState([]);
  const PIPEDREAM = import.meta.env.VITE_PIPEDREAM_URL || 'https://enpoint.m.pipedream.net/your_id';

  const universityData = {
    name: 'Hillcrest Global Institute',
    overview: 'Focused on international programs and strong industry ties.',
    facilities: 'Innovation Lab, Incubator, Cafeteria, Hostel, Gym',
    placements: '90% placement rate with partners like Accenture, TCS, Capgemini.',
    courses: ['MBA', 'B.Des', 'M.Sc AI']
  };

  useEffect(() => {
    if (modalOpen) {
      setFees([
        { course: 'MBA', min: 250000, max: 300000 },
        { course: 'B.Des', min: 150000, max: 180000 },
        { course: 'M.Sc AI', min: 200000, max: 250000 }
      ]);
    }
  }, [modalOpen]);

  return (
    <div className="page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{universityData.name}</h1>
          <p className="hero-subtitle">{universityData.overview}</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">Placement Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Global Partners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Alumni Worldwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Countries Presence</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="info-grid">
          <div className="info-content">
            <div className="info-card">
              <h3>Courses Offered</h3>
              <div className="courses-grid">
                {universityData.courses.map((course, i) => (
                  <div key={i} className="course-item">
                    <div className="course-name">{course}</div>
                    <div className="course-duration">Full-time Program</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3>Premium Facilities</h3>
              <div className="facilities-grid">
                {universityData.facilities.split(', ').map((facility, i) => (
                  <div key={i} className="facility-item">
                    <div className="facility-icon"></div>
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3>Global Placement Success</h3>
              <div className="placement-stats">
                <div className="placement-stat">
                  <div className="placement-number">₹22L</div>
                  <div className="placement-label">Highest Package</div>
                </div>
                <div className="placement-stat">
                  <div className="placement-number">₹7.2L</div>
                  <div className="placement-label">Average Package</div>
                </div>
                <div className="placement-stat">
                  <div className="placement-number">300+</div>
                  <div className="placement-label">MNCs</div>
                </div>
              </div>
              <div className="companies-list">
                <span className="company-tag">Accenture</span>
                <span className="company-tag">TCS</span>
                <span className="company-tag">Capgemini</span>
                <span className="company-tag">IBM</span>
                <span className="company-tag">Microsoft</span>
                <span className="company-tag">Google</span>
              </div>
            </div>

            <div className="cta-section">
              <h3>Shape Your Global Future</h3>
              <p>Join our international community of innovators and entrepreneurs.</p>
              <div className="cta-group">
                <button className="cta" onClick={() => setModalOpen(true)}>View Fee Structure</button>
                <button className="cta secondary" onClick={() => generateBrochure(universityData)}>Download Brochure</button>
                <button className="cta" onClick={() => { document.getElementById('lead-form')?.scrollIntoView({behavior: 'smooth'}); document.querySelector('input[name="name"]')?.focus(); }}>Apply Now</button>
              </div>
            </div>
          </div>

          <div>
            <LeadForm pipedreamUrl={PIPEDREAM} />
          </div>
        </div>
      </section>
      
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} courseFees={fees} />
    </div>
  );
}
