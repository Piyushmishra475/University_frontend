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
      fetch('/api/fees/riverside.json')
        .then((res) => res.json())
        .then(setFees)
        .catch(() => setFees([{ course: 'B.Tech CS', min: 120000, max: 160000 }]));
    }
  }, [modalOpen]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>{universityData.name}</h1>
          <p><b>Overview:</b> {universityData.overview}</p>
          <p><b>Facilities:</b> {universityData.facilities}</p>
          <p><b>Placements:</b> {universityData.placements}</p>
          <div className="cta-group">
            <button className="cta" onClick={() => setModalOpen(true)}>Check Course-wise Fees</button>
            <button className="cta" onClick={() => generateBrochure(universityData)}>Download Brochure</button>
           {/* <button className="cta" onClick={() => { document.getElementById('apply-btn')?.click(); }}>Apply Now</button> */}
          </div>
        </div>
        <div>
          <LeadForm pipedreamUrl={PIPEDREAM} />
        </div>
      </section>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} courseFees={fees} />
    </div>
  );
}
