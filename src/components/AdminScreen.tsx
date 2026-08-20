import React, { useState } from 'react';
import { AssessmentSubmission } from '../types';
import { Shield, Search, Lock, Download, Trash2, Eye, LogOut, Users, Award, Clock, Plus, AlertCircle, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AdminScreenProps {
  submissions: AssessmentSubmission[];
  onSelectSubmission: (sub: AssessmentSubmission) => void;
  onDeleteSubmission: (id: string) => void;
  onAddSampleData: () => void;
  onClose: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  submissions,
  onSelectSubmission,
  onDeleteSubmission,
  onAddSampleData,
  onClose,
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mbtiFilter, setMbtiFilter] = useState('ALL');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'adminmbti123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Kata sandi admin salah! (Default: adminmbti123)');
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.mbti.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMbti = mbtiFilter === 'ALL' || sub.mbti === mbtiFilter;
    return matchesSearch && matchesMbti;
  });

  // Calculate stats
  const totalCount = submissions.length;
  const mbtiCounts: Record<string, number> = {};
  submissions.forEach((s) => {
    mbtiCounts[s.mbti] = (mbtiCounts[s.mbti] || 0) + 1;
  });
  let topMbti = '-';
  let topCount = 0;
  Object.entries(mbtiCounts).forEach(([mbti, count]) => {
    if (count > topCount) {
      topMbti = mbti;
      topCount = count;
    }
  });

  const exportCSV = () => {
    if (submissions.length === 0) return alert("Tidak ada data untuk diexport!");
    const headers = ["Nama", "NIK", "Jabatan", "Departemen", "Email", "WhatsApp", "MBTI", "Tanggal"];
    const rows = filteredSubmissions.map((s) => [
      `"${s.name}"`,
      `"${s.nik}"`,
      `"${s.position}"`,
      `"${s.area}"`,
      `"${s.email}"`,
      `"${s.whatsapp || '-'}"`,
      `"${s.mbti}"`,
      `"${s.formattedDate}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Data_Assessment_MBTI_DPP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    if (filteredSubmissions.length === 0) return alert("Tidak ada data untuk diexport!");

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Title & Corporate Header
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 138); // Deep Navy
    doc.setFont("helvetica", "bold");
    doc.text("PT. DIAN PANDU PRATAMA", 14, 15);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.text("Laporan Rekapitulasi Assessment MBTI - Human Capital & Talent Management", 14, 21);

    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(`Total Responden: ${filteredSubmissions.length} Kandidat  |  Archetype Dominan: ${topMbti}`, 14, 27);
    doc.text(`Tanggal Unduh: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB`, 14, 32);

    const tableColumn = ["No", "Nama Kandidat", "NIK / ID", "Jabatan & Departemen", "MBTI", "Email", "WhatsApp", "Tanggal Tes"];
    const tableRows = filteredSubmissions.map((s, idx) => [
      idx + 1,
      s.name,
      s.nik,
      `${s.position}\n${s.area}`,
      s.mbti,
      s.email,
      s.whatsapp || '-',
      s.formattedDate,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 37,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 2.5 },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        4: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
      },
    });

    doc.save(`Laporan_Rekapitulasi_MBTI_DPP_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="w-full max-w-5xl bg-surface-elevated border border-surface-border rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-text-primary">Autentikasi Portal HR Admin</h3>
            <p className="text-xs text-text-secondary mt-1">
              Akses terbatas untuk Pengelola SDM & Talent Management PT. Dian Pandu Pratama.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                required
                type="password"
                placeholder="Masukkan kata sandi admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-center text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-primary transition-all"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-error font-medium flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-fixed text-on-primary font-bold py-3 rounded-xl transition-all btn-glow cursor-pointer text-sm"
            >
              Autentikasi Kredensial
            </button>
          </form>

          <p className="text-[11px] text-text-secondary">
            Gunakan kata sandi default: <code className="text-primary font-bold">adminmbti123</code>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-border pb-4">
            <div>
              <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Assessment Registry Dashboard</span>
              </h3>
              <p className="text-xs text-text-secondary">
                Total <strong className="text-text-primary">{totalCount}</strong> rekam hasil tes kandidat tersimpan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-surface-container hover:bg-surface-container-high text-text-primary text-xs font-semibold px-4 py-2 rounded-xl border border-surface-border flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-surface-border p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium">Total Responden</div>
                <div className="text-xl font-extrabold text-text-primary">{totalCount} Kandidat</div>
              </div>
            </div>

            <div className="bg-surface border border-surface-border p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium">Dominan Archetype</div>
                <div className="text-xl font-extrabold text-tertiary">{topMbti} {topCount > 0 ? `(${topCount})` : ''}</div>
              </div>
            </div>

            <div className="bg-surface border border-surface-border p-4 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-text-secondary font-medium">Terakhir Diisi</div>
                <div className="text-xs font-semibold text-text-primary truncate max-w-[150px]">
                  {submissions[0]?.name || 'Belum ada'}
                </div>
              </div>
            </div>
          </div>

          {/* Search, Filter, & Export Actions */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari nama, NIK, jabatan, atau MBTI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-surface-border rounded-xl pl-9 pr-4 py-2 text-xs text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <select
                value={mbtiFilter}
                onChange={(e) => setMbtiFilter(e.target.value)}
                className="bg-background border border-surface-border rounded-xl px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="ALL">Semua MBTI</option>
                {["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {totalCount === 0 && (
                <button
                  onClick={onAddSampleData}
                  className="bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold px-3 py-2 rounded-xl border border-surface-border flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Data Demo</span>
                </button>
              )}

              <button
                onClick={exportCSV}
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={exportPDF}
                className="bg-surface-container hover:bg-surface-container-high text-text-primary border border-surface-border text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Registry Data Table */}
          <div className="overflow-x-auto rounded-xl border border-surface-border bg-background">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-surface-border font-bold text-text-secondary uppercase tracking-wider">
                  <th className="py-3 px-4">Kandidat</th>
                  <th className="py-3 px-4">NIK / ID</th>
                  <th className="py-3 px-4">Jabatan & Departemen</th>
                  <th className="py-3 px-4 text-center">MBTI Result</th>
                  <th className="py-3 px-4">Tanggal Assessment</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 text-text-primary">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-text-primary">
                      <div>{sub.name}</div>
                      <div className="text-[11px] text-text-secondary font-normal">{sub.email}</div>
                    </td>
                    <td className="py-3 px-4 text-text-secondary font-mono">{sub.nik}</td>
                    <td className="py-3 px-4">
                      <div>{sub.position}</div>
                      <div className="text-[11px] text-text-secondary">{sub.area}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-primary/15 text-primary font-bold px-2.5 py-1 rounded-md border border-primary/30 font-mono tracking-wider">
                        {sub.mbti}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{sub.formattedDate}</td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => onSelectSubmission(sub)}
                        title="Lihat Laporan Lengkap"
                        className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus rekam tes untuk ${sub.name}?`)) {
                            onDeleteSubmission(sub.id);
                          }
                        }}
                        title="Hapus Rekam"
                        className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredSubmissions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-text-secondary">
                      Tidak ditemukan rekam data assessment yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
