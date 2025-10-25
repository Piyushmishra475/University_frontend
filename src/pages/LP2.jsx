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
      fetch('/api/fees/hillcrest.json')
        .then((res) => res.json())
        .then(setFees)
        .catch(() => setFees([{ course: 'MBA', min: 250000, max: 300000 }]));
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
