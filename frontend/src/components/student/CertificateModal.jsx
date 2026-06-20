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
            className="relative w-full aspect-[1.414/1] shadow-2xl overflow-hidden shrink-0 bg-white"
            style={{ maxWidth: '1000px', color: '#1e293b' }}
          >
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Premium Borders */}
            <div className="absolute inset-6 border-2 pointer-events-none" style={{ borderColor: '#0f766e' }}></div>
            <div className="absolute inset-8 border pointer-events-none" style={{ borderColor: '#0f766e', opacity: 0.3 }}></div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{ background: 'linear-gradient(135deg, #0f766e 50%, transparent 50%)' }}></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'linear-gradient(-45deg, #0f766e 50%, transparent 50%)' }}></div>

            {/* Certificate Content */}
            <div className="absolute inset-0 flex flex-col items-center p-12 text-center z-10 pt-16">
              
              <div className="mb-6 flex items-center justify-center gap-4">
                <img src="/logo.png" alt="Skillwell Logo" className="h-10 w-auto object-contain" />
                <span className="text-2xl font-black tracking-[0.2em] uppercase" style={{ color: '#0f766e' }}>Skillwell</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide uppercase" style={{ fontFamily: 'Georgia, serif', color: '#1e293b' }}>
                Certificate of Completion
              </h1>
              
              <p className="text-base md:text-lg tracking-widest uppercase mb-6 font-medium" style={{ color: '#64748b' }}>
                This is to proudly certify that
              </p>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 border-b-2 inline-block px-16 font-serif italic" style={{ color: '#0f766e', borderColor: '#cbd5e1' }}>
                {user?.name || 'Student Name'}
              </h2>

              <p className="text-base md:text-lg mb-4 font-medium" style={{ color: '#475569' }}>
                has successfully completed the comprehensive program
              </p>

              <h3 className="text-2xl md:text-3xl font-bold mb-8 max-w-4xl leading-tight" style={{ color: '#1e293b' }}>
                {course?.title || 'Course Title'}
              </h3>

              {/* Signatures & Dates */}
              <div className="w-full flex justify-between items-end px-16 mt-auto pb-4">
                <div className="text-center w-48">
                  <div className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{issueDate}</div>
                  <div className="border-t pt-2 text-xs uppercase tracking-widest font-bold" style={{ borderColor: '#94a3b8', color: '#64748b' }}>
                    Date Issued
                  </div>
                </div>

                <div className="w-32 h-32 flex items-center justify-center rounded-full border-[5px] transform rotate-[-15deg] shadow-lg bg-white shrink-0" style={{ borderColor: '#0f766e', color: '#0f766e' }}>
                  <div className="text-center font-serif flex flex-col items-center justify-center">
                    <Award className="w-8 h-8 mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Official</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Certified</span>
                  </div>
                </div>

                <div className="text-center w-48">
                  <div className="text-xl font-bold mb-2 italic" style={{ fontFamily: 'Georgia, serif', color: '#1e293b' }}>
                    {course?.instructor?.name || 'Instructor'}
                  </div>
                  <div className="border-t pt-2 text-xs uppercase tracking-widest font-bold" style={{ borderColor: '#94a3b8', color: '#64748b' }}>
                    Instructor
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
