import React, { useState, useEffect } from 'react';
import LeadForm from '../components/LeadForm';
import Modal from '../components/Modal';
import { generateBrochure } from '../components/BrochurePDF';

export default function LP1() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fees, setFees] = useState([]);
  const PIPEDREAM = import.meta.env.VITE_PIPEDREAM_URL || 'https://enpoint.m.pipedream.net/your_id';

  const universityData = {
    name: 'Riverside Private University',
    overview: 'A premier private university offering UG & PG programs with global exposure.',
    facilities: 'Library, Labs, Hostel, Sports, WiFi Campus',
    placements: '95% placement rate with top recruiters like Infosys, Deloitte, Amazon.',
    courses: ['B.Tech CS', 'MBA', 'B.Des']
  };

  useEffect(() => {
    if (modalOpen) {
      setFees([
        { course: 'B.Tech CS', min: 120000, max: 160000 },
        { course: 'MBA', min: 180000, max: 220000 },
        { course: 'B.Des', min: 100000, max: 140000 }
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
              <span className="stat-number">95%</span>
              <span className="stat-label">Placement Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Industry Partners</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Alumni Network</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Years of Excellence</span>
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
              <h3>World-Class Facilities</h3>
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
              <h3>Placement Excellence</h3>
              <div className="placement-stats">
                <div className="placement-stat">
                  <div className="placement-number">₹18L</div>
                  <div className="placement-label">Highest Package</div>
                </div>
                <div className="placement-stat">
                  <div className="placement-number">₹6.5L</div>
                  <div className="placement-label">Average Package</div>
                </div>
                <div className="placement-stat">
                  <div className="placement-number">500+</div>
                  <div className="placement-label">Companies</div>
                </div>
              </div>
              <div className="companies-list">
                <span className="company-tag">Infosys</span>
                <span className="company-tag">Deloitte</span>
                <span className="company-tag">Amazon</span>
                <span className="company-tag">TCS</span>
                <span className="company-tag">Wipro</span>
                <span className="company-tag">Accenture</span>
              </div>
            </div>

            <div className="cta-section">
              <h3>Ready to Start Your Journey?</h3>
              <p>Join thousands of successful graduates who started their career with us.</p>
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
