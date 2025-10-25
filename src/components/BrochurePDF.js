import { jsPDF } from 'jspdf';

export function generateBrochure(university) {
  const doc = new jsPDF();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(`${university.name}`, 20, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Overview: ${university.overview}`, 20, 35, { maxWidth: 170 });
  doc.text(`Facilities: ${university.facilities}`, 20, 55, { maxWidth: 170 });
  doc.text(`Placements: ${university.placements}`, 20, 70, { maxWidth: 170 });

  doc.text('Courses Offered:', 20, 90);
  let y = 100;
  university.courses.forEach((c) => {
    doc.text(`• ${c}`, 25, y);
    y += 8;
  });

  doc.save(`${university.name.replace(/\s+/g, '_')}_Brochure.pdf`);
}
