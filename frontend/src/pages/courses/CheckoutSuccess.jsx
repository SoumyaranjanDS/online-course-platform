import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { paymentService } from "../../services/paymentService";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { jsPDF } from "jspdf";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const res = await paymentService.verifyCheckoutSession(sessionId);
        if (res.success) {
          setStatus("success");
          setCourseId(res.courseId);
          if (res.course) setCourse(res.course);
          if (res.invoice) setInvoice(res.invoice);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    verify();
  }, [sessionId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text("Skillwell Learning", pageWidth / 2, 25, { align: "center" });

    doc.setFontSize(16);
    doc.text("Payment Receipt", pageWidth / 2, 35, { align: "center" });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(20, 45, pageWidth - 20, 45);

    // Payment Details
    doc.setFontSize(14);
    doc.text("Payment Details", 20, 55);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    
    const startY = 65;
    const lineHeight = 8;
    
    doc.text("Invoice Number:", 20, startY);
    doc.text("Order Time:", 20, startY + lineHeight);
    doc.text("Payment Method:", 20, startY + lineHeight * 2);
    doc.text("Payment Status:", 20, startY + lineHeight * 3);
    doc.text("Amount:", 20, startY + lineHeight * 4);

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.text(invoice?.invoiceNumber || "N/A", 70, startY);
    doc.text(formatDate(invoice?.orderTime) || "N/A", 70, startY + lineHeight);
    doc.text(invoice?.paymentMethod || "Card", 70, startY + lineHeight * 2);
    doc.setTextColor(34, 197, 94);
    doc.text("Successful", 70, startY + lineHeight * 3);
    doc.setTextColor(30, 41, 59);
    doc.text(`INR ${invoice?.amountPaid?.toFixed(2) || "0.00"}`, 70, startY + lineHeight * 4);

    doc.setDrawColor(226, 232, 240);
    doc.line(20, startY + lineHeight * 5 + 2, pageWidth - 20, startY + lineHeight * 5 + 2);

    // Product Details
    const prodY = startY + lineHeight * 5 + 12;
    doc.setFontSize(14);
    doc.text("Product Details", 20, prodY);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    
    const courseTitle = course?.title || "Online Course";
    const instructorName = course?.instructor?.name ? `by ${course.instructor.name}` : "";
    
    doc.text("Course:", 20, prodY + 10);
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    
    const splitTitle = doc.splitTextToSize(courseTitle, 100);
    doc.text(splitTitle, 70, prodY + 10);
    
    const titleHeight = splitTitle.length * 5;
    
    if (instructorName) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text(instructorName, 70, prodY + 10 + titleHeight);
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text(`INR ${course?.price?.toFixed(2) || "0.00"}`, pageWidth - 20, prodY + 10, { align: "right" });

    doc.setDrawColor(226, 232, 240);
    const totalY = prodY + 10 + titleHeight + 10;
    doc.line(20, totalY, pageWidth - 20, totalY);

    doc.setFontSize(12);
    doc.text("Total Amount:", 20, totalY + 10);
    doc.text(`INR ${invoice?.amountPaid?.toFixed(2) || course?.price?.toFixed(2) || "0.00"}`, pageWidth - 20, totalY + 10, { align: "right" });

    // Footer note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("This is an electronic receipt and does not require a physical signature.", pageWidth / 2, totalY + 30, { align: "center" });

    doc.save(`Receipt_${invoice?.invoiceNumber || "Course"}.pdf`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).replace(',', '');
  };

  return (
    <div className="bg-[#f5f6f8] flex flex-col min-h-screen font-body print:bg-white">
      <div className="print:hidden"><Navbar /></div>
      <style>
        {`
          .receipt-jagged::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 10px;
            background-size: 20px 20px;
            background-image: radial-gradient(circle at 10px 0, transparent 10px, white 11px);
          }
          @media print {
            body {
              background-color: white !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .receipt-jagged {
              box-shadow: none !important;
              border: 1px solid #e2e8f0;
            }
          }
        `}
      </style>
      <main className="flex-grow flex items-center justify-center p-6 py-12 print:p-0">
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-headline-sm font-headline-sm text-on-surface">
              Verifying your payment...
            </h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Please don't close this page.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="w-full max-w-[420px] animate-in zoom-in duration-300 flex flex-col relative z-10 mx-auto">
            
            {/* The Receipt Container */}
            <div 
              ref={receiptRef}
              className="bg-white rounded-t-2xl px-8 pt-10 pb-6 relative receipt-jagged shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]"
            >
              {/* Header Icon & Title */}
              <div className="flex flex-col items-center mb-6">
                <img src="/logo.png" alt="Skillwell Logo" className="h-10 w-10 mb-2" />
                <h1 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Skillwell Learning</h1>

                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 relative">
                  <span className="material-symbols-outlined text-[36px]">
                    receipt_long
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Payment Successful
                </h2>
              </div>

              {/* Dotted Divider */}
              <div className="w-full border-t-2 border-dashed border-slate-200 my-6"></div>

              {/* Payment Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-[15px] mb-2">Payment Details</h3>
                
                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[14px]">
                  <span className="text-slate-500">Invoice Number</span>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-medium text-right">{invoice?.invoiceNumber || "N/A"}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[14px]">
                  <span className="text-slate-500">Order Time</span>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-medium text-right whitespace-nowrap">{formatDate(invoice?.orderTime) || "N/A"}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[14px]">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-medium text-right">{invoice?.paymentMethod || "Card"}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[14px]">
                  <span className="text-slate-500">Payment Status</span>
                  <span className="px-3 text-slate-400">:</span>
                  <div className="text-right">
                    <span className="bg-green-500 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      Successful
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[14px]">
                  <span className="text-slate-500">Amount</span>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-bold text-right">₹{invoice?.amountPaid?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className="w-full border-t-2 border-dashed border-slate-200 my-6"></div>

              {/* Product Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-[15px] mb-2">Product Details</h3>
                
                <div className="grid grid-cols-[1fr_auto_auto] items-start text-[14px]">
                  <div className="text-slate-500 pr-2 line-clamp-2 leading-snug">
                    {course?.title || "Online Course"}
                    {course?.instructor?.name && (
                      <div className="text-[12px] text-slate-400 mt-0.5">by {course.instructor.name}</div>
                    )}
                  </div>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-medium text-right">₹{course?.price?.toFixed(2) || "0.00"}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto_1fr] items-center text-[15px] pt-2">
                  <span className="text-slate-800 font-bold">Total Amount</span>
                  <span className="px-3 text-slate-400">:</span>
                  <span className="text-slate-800 font-bold text-right">₹{invoice?.amountPaid?.toFixed(2) || course?.price?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className="w-full border-t-2 border-dashed border-slate-200 my-6"></div>

              {/* Electronic Signature Note */}
              <p className="text-center text-[11px] text-slate-400 mt-6 italic px-4">
                This is an electronic receipt and does not require a physical signature.
              </p>

              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 mt-6 text-[15px] print:hidden"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                Download PDF Receipt
              </button>
            </div>
            
            {/* Action Buttons Below Receipt */}
            <div className="mt-12 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 print:hidden">
              <button
                onClick={() => navigate(`/student/course/${courseId}/learn`)}
                className="bg-primary text-on-primary py-3 px-8 rounded-xl font-label-md hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              >
                Start Learning Now
              </button>
            </div>
            
          </div>
        )}

        {status === "error" && (
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl">error</span>
              </div>
              <h2 className="text-headline-md font-headline-md text-slate-800 mb-2">
                Verification Failed
              </h2>
              <p className="text-body-md text-slate-600 mb-8">
                We couldn't verify your payment. If you were charged, please
                contact support.
              </p>
              <Link
                to="/student/dashboard"
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-label-md hover:bg-slate-200 transition-colors block text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
}
