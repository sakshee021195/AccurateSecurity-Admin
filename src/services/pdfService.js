import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/Images/logo.png'; // This is a string (URL), not a File

export const generatePDF = async (user, logoFile) => {
    const doc = new jsPDF();

  doc.setFontSize(18);
//   doc.text('ENROLMENT FORM', 105, 20, { align: 'center' });
 // Convert logo image to base64
 const logoBase64 = await toBase64FromUrl(logoFile); // ✅ Now this is valid
 const img = new Image();
 img.src = logo;
 
 // Add logo to top left
 doc.addImage(logoBase64, 'JPEG', 15, 10, 30, 30);

 // Header text (centered)
 doc.setFontSize(16);
 doc.setFont(undefined, 'bold');
 doc.text('ACCURATE SECURITY & ALLIED SERVICES', 105, 15, { align: 'center' });

 doc.setFontSize(14);
 doc.setFont(undefined, 'normal');
 doc.text('ENROLMENT FORM', 105, 35, { align: 'center' });

 doc.setFontSize(10);
 doc.text(
     '47, CITY CENTRE, NR. SWASTIK CROSS ROAD, C.G. ROAD, NAVRANGPURA, AHMEDABAD – 380009',
     105,
     22,
     { align: 'center' }
 );
 doc.text('MOB: 8160880528, EMAIL: accurate.adi@gmail.com', 105, 26, { align: 'center' });
 doc.text('WEBSITE: www.accuratesecurity.in', 105, 30, { align: 'center' });
  // User details in table
  const tableBody = [
    ['Full Name', user.fullName],
    ['Mobile', user.mobile1],
    ['DOB', user.dob],
    ['Aadhar No', user.aadharNo],
    ['Father\'s Name', user.fatherName],
    ['Gender', user.gender],
    ['Education', user.education],
    ['Area', user.area],
    ['Location', user.location],
    ['Experience', user.experience],
  ];

  autoTable(doc, {
    startY: 45,
    head: [['Field', 'Value']],
    body: tableBody,
    theme: 'grid',
    styles: { fontSize: 12, cellPadding: 3 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  // Add image if available (assume user.photo is a File object)
  if (user.photo) {
    const imageData = await toBase64FromUrl(user.photo);
    doc.addImage(imageData, 'JPEG', 150, 30, 40, 40); // Adjust position/size
  }

  doc.save(`${user.fullName || 'user'}-enrolment-form.pdf`);
};

// Helper to convert image file to base64
const toBase64FromUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  