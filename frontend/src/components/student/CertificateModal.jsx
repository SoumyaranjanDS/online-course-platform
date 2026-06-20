import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { X, Download, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function CertificateModal({ course, onClose }) {
  const { user } = useAuth();
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    try {
      setDownloading(true);
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.title.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate', error);
      alert('Failed to generate certificate');
    } finally {
      setDownloading(false);
    }
  };

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-surface rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3 text-primary">
            <Award className="w-8 h-8" />
            <h2 className="text-headline-sm font-bold text-on-surface">Your Certificate</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              <Download className="w-5 h-5" />
              {downloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 bg-surface-container-lowest flex items-center justify-center">
          
          {/* Certificate Design Container */}
          <div 
            ref={certificateRef}
            className="relative w-full aspect-[1.414/1] shadow-xl overflow-hidden shrink-0"
            style={{ maxWidth: '1000px', backgroundColor: '#ffffff', color: '#1e293b' }}
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 border-[24px] border-double pointer-events-none" style={{ borderColor: '#e2e8f0' }}></div>
            <div className="absolute inset-4 border pointer-events-none" style={{ borderColor: '#cbd5e1' }}></div>
            
            <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full pointer-events-none mix-blend-multiply opacity-50" style={{ backgroundColor: '#ecfdf5' }}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-tr-full pointer-events-none mix-blend-multiply opacity-50" style={{ backgroundColor: '#eff6ff' }}></div>

            {/* Certificate Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center z-10">
              
              <div className="mb-8 flex items-center justify-center gap-3" style={{ color: '#047857' }}>
                <Award className="w-12 h-12" />
                <span className="text-2xl font-black tracking-widest uppercase">LearnHub</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif', color: '#0f172a' }}>
                Certificate of Completion
              </h1>
              
              <p className="text-lg md:text-xl tracking-widest uppercase mb-12" style={{ color: '#64748b' }}>
                This is to certify that
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 pb-4 border-b-2 inline-block px-16" style={{ color: '#0f172a', borderColor: '#e2e8f0' }}>
                {user?.name || 'Student Name'}
              </h2>

              <p className="text-lg md:text-xl mb-4" style={{ color: '#475569' }}>
                has successfully completed the course
              </p>

              <h3 className="text-2xl md:text-3xl font-bold mb-16 max-w-3xl leading-snug" style={{ color: '#065f46' }}>
                {course?.title || 'Course Title'}
              </h3>

              {/* Signatures & Dates */}
              <div className="w-full flex justify-between items-end px-12 mt-auto">
                <div className="text-center">
                  <div className="text-lg font-bold mb-2" style={{ color: '#1e293b' }}>{issueDate}</div>
                  <div className="w-48 border-t pt-2 text-sm uppercase tracking-wider" style={{ borderColor: '#94a3b8', color: '#64748b' }}>
                    Date of Issue
                  </div>
                </div>

                <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 transform rotate-12 shadow-sm" style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5', color: '#047857' }}>
                  <div className="text-center font-serif text-sm">
                    <Award className="w-8 h-8 mx-auto mb-1" />
                    <strong>Verified</strong><br/>Completion
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xl font-cursive mb-2 italic" style={{ fontFamily: 'cursive', color: '#1e293b' }}>
                    {course?.instructor?.name || 'Instructor'}
                  </div>
                  <div className="w-48 border-t pt-2 text-sm uppercase tracking-wider" style={{ borderColor: '#94a3b8', color: '#64748b' }}>
                    Course Instructor
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
