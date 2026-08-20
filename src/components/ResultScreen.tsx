import React, { useState } from 'react';
import { AssessmentSubmission } from '../types';
import { mbtiDetails } from '../data/mbtiData';
import { Download, Check, AlertTriangle, Briefcase, FileText, Share2, RotateCcw, User, Building, Award, Compass } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ResultScreenProps {
  submission: AssessmentSubmission;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ submission, onReset }) => {
  const { name, nik, position, area, email, whatsapp, mbti, percentages, formattedDate } = submission;
  const detail = mbtiDetails[mbti] || {
    title: "Profil Kepribadian",
    desc: "Deskripsi rinci profil kepribadian profesional.",
    strengths: ["Pekerja Keras", "Analitis", "Kerjasama Tim"],
    weaknesses: ["Cenderung Kaku dalam Situasi Tertentu"],
    careers: ["Profesional / Manajerial"],
    leadershipStyle: "Kepemimpinan terstruktur.",
    workplaceFit: "Lingkungan kerja profesional."
  };

  const [copied, setCopied] = useState<boolean>(false);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Header Banner
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 32, 'F');

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("PT. DIAN PANDU PRATAMA", 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("LAPORAN EVALUASI MBTI - HUMAN CAPITAL & TALENT MANAGEMENT", 14, 23);

    // Candidate Info Block
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(`Kandidat: ${name}`, 14, 42);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`NIK / ID: ${nik}  |  Jabatan: ${position} (${area})`, 14, 48);
    doc.text(`Email: ${email}  |  WhatsApp: ${whatsapp || '-'}  |  Tanggal Assessment: ${formattedDate}`, 14, 54);

    // MBTI Result Card
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, 60, 182, 32, 3, 3, 'F');

    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.text(mbti, 20, 78);

    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(detail.title, 55, 71);

    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(detail.desc, 135);
    doc.text(splitDesc, 55, 77);

    // Dimension Table
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("ANALISIS DIMENSI KEPRIBADIAN", 14, 102);

    const dimData = [
      ["Mind (E vs I)", `Extraversion (${percentages.E}%)`, `Introversion (${percentages.I}%)`],
      ["Energy (S vs N)", `Sensing (${percentages.S}%)`, `Intuition (${percentages.N}%)`],
      ["Nature (T vs F)", `Thinking (${percentages.T}%)`, `Feeling (${percentages.F}%)`],
      ["Tactics (J vs P)", `Judging (${percentages.J}%)`, `Perceiving (${percentages.P}%)`],
    ];

    autoTable(doc, {
      head: [["Dimensi MBTI", "Skor Kiri", "Skor Kanan"]],
      body: dimData,
      startY: 106,
      theme: 'striped',
      headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 2.5 }
    });

    let currentY = (doc as any).lastAutoTable.finalY + 10;

    // Strengths & Weaknesses
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("KEKUATAN UTAMA & AREA PENGEMBANGAN", 14, currentY);

    currentY += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129); // Green
    doc.text("Kekuatan Utama (Key Strengths):", 14, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    detail.strengths.forEach((s) => {
      currentY += 5;
      doc.text(`• ${s}`, 18, currentY);
    });

    currentY += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(239, 68, 68); // Red
    doc.text("Area Pengembangan (Weaknesses):", 14, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    detail.weaknesses.forEach((w) => {
      currentY += 5;
      doc.text(`• ${w}`, 18, currentY);
    });

    currentY += 9;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("GAYA KEPEMIMPINAN", 14, currentY);

    currentY += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    const leadText = doc.splitTextToSize(detail.leadershipStyle, 182);
    doc.text(leadText, 14, currentY);

    // Save File
    const cleanFileName = name.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Hasil_Assessment_MBTI_${cleanFileName}.pdf`);
  };

  const handleCopySummary = () => {
    const text = `HASIL EVALUASI MBTI - PT. DIAN PANDU PRATAMA\n` +
      `Kandidat: ${name} (${nik})\n` +
      `Jabatan: ${position} - ${area}\n` +
      `Tipe MBTI: ${mbti} - ${detail.title}\n` +
      `Tanggal Assessment: ${formattedDate}\n\n` +
      `Dimensi:\n` +
      `- Extraversion (${percentages.E}%) vs Introversion (${percentages.I}%)\n` +
      `- Sensing (${percentages.S}%) vs Intuition (${percentages.N}%)\n` +
      `- Thinking (${percentages.T}%) vs Feeling (${percentages.F}%)\n` +
      `- Judging (${percentages.J}%) vs Perceiving (${percentages.P}%)\n\n` +
      `Gaya Kepemimpinan: ${detail.leadershipStyle}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-4xl space-y-8 py-4 print-area">
      {/* Top Banner Card */}
      <div className="bg-surface-elevated border border-surface-border rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold bg-tertiary/10 text-tertiary px-3 py-1 rounded-full border border-tertiary/20 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>ASSESSMENT COMPLETE</span>
            </div>

            <div>
              <p className="text-sm text-text-secondary">
                Laporan Evaluasi Psikometri untuk <span className="text-text-primary font-bold text-base">{name}</span>
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> NIK: {nik}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {position} ({area})</span>
              </div>

              <h3 className="text-5xl font-black text-primary tracking-widest mt-4 font-mono">
                {mbti}
              </h3>
              <h4 className="text-xl font-bold text-text-primary mt-1">
                {detail.title}
              </h4>
              <p className="text-xs text-text-secondary mt-1">
                Diases pada: {formattedDate}
              </p>
            </div>
          </div>

          {/* Dimension Breakdown Sliders */}
          <div className="bg-surface border border-surface-border p-5 rounded-2xl w-full lg:w-80 space-y-3.5 shadow-inner">
            <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center justify-between">
              <span>Analisis Dimensi MBTI</span>
              <Compass className="w-3.5 h-3.5 text-primary" />
            </h5>

            {[
              { leftLabel: 'E', leftPct: percentages.E, rightLabel: 'I', rightPct: percentages.I, title: 'Mind (E vs I)' },
              { leftLabel: 'S', leftPct: percentages.S, rightLabel: 'N', rightPct: percentages.N, title: 'Energy (S vs N)' },
              { leftLabel: 'T', leftPct: percentages.T, rightLabel: 'F', rightPct: percentages.F, title: 'Nature (T vs F)' },
              { leftLabel: 'J', leftPct: percentages.J, rightLabel: 'P', rightPct: percentages.P, title: 'Tactics (J vs P)' },
            ].map((dim, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-text-primary">
                  <span>{dim.leftLabel} <span className="text-text-secondary text-[11px]">({dim.leftPct}%)</span></span>
                  <span className="text-[11px] text-text-secondary font-normal">{dim.title}</span>
                  <span>{dim.rightLabel} <span className="text-text-secondary text-[11px]">({dim.rightPct}%)</span></span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                  <div className="bg-primary h-full transition-all duration-500" style={{ width: `${dim.leftPct}%` }}></div>
                  <div className="bg-secondary-container h-full transition-all duration-500" style={{ width: `${dim.rightPct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Overview & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Overview & Strengths */}
        <div className="bg-surface-elevated p-6 rounded-2xl border border-surface-border space-y-5">
          <div>
            <h5 className="text-base font-bold text-text-primary flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Overview Profil Workstyle</span>
            </h5>
            <p className="text-sm text-text-secondary leading-relaxed">
              {detail.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-surface-border">
            <h5 className="text-base font-bold text-text-primary flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-tertiary" />
              <span>Kekuatan Utama (Key Strengths)</span>
            </h5>
            <ul className="space-y-2">
              {detail.strengths.map((st, i) => (
                <li key={i} className="text-xs md:text-sm bg-tertiary/10 border border-tertiary/20 text-tertiary px-3.5 py-2 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Careers & Development Areas */}
        <div className="bg-surface-elevated p-6 rounded-2xl border border-surface-border space-y-5">
          <div>
            <h5 className="text-base font-bold text-text-primary flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>Kesesuaian Karir & Peran</span>
            </h5>
            <div className="flex flex-wrap gap-2 mb-3">
              {detail.careers.map((car, i) => (
                <span key={i} className="text-xs bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg font-medium">
                  {car}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-secondary leading-relaxed bg-surface p-3 rounded-xl border border-surface-border">
              <strong className="text-text-primary">Gaya Kepemimpinan:</strong> {detail.leadershipStyle}
            </p>
          </div>

          <div className="pt-4 border-t border-surface-border">
            <h5 className="text-base font-bold text-text-primary flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-error" />
              <span>Area Pengembangan (Weaknesses)</span>
            </h5>
            <ul className="space-y-2">
              {detail.weaknesses.map((we, i) => (
                <li key={i} className="text-xs md:text-sm bg-error/10 border border-error/20 text-error px-3.5 py-2 rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error shrink-0"></span>
                  <span>{we}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-4 no-print">
        <button
          onClick={onReset}
          className="bg-surface-container hover:bg-surface-container-high text-text-primary font-semibold text-xs md:text-sm px-5 py-2.5 rounded-xl border border-surface-border flex items-center space-x-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Kembali ke Awal</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="bg-surface-container hover:bg-surface-container-high text-text-primary font-semibold text-xs md:text-sm px-5 py-2.5 rounded-xl border border-surface-border flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-primary" />
            <span>{copied ? "Ringkasan Tersalin!" : "Salin Ringkasan"}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="bg-primary hover:bg-primary-fixed text-on-primary font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl flex items-center space-x-2 btn-glow transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
