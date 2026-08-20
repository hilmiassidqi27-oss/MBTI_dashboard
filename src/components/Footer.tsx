import React, { useState } from 'react';
import { Shield, FileText, HelpCircle, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  return (
    <>
      <footer className="bg-background w-full py-8 border-t border-surface-border flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto mt-auto text-xs">
        <div className="flex items-center space-x-2 text-text-secondary mb-4 md:mb-0">
          <span>© 2024 PT. Dian Pandu Pratama. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-primary/70 hidden sm:inline">Corporate HR Profiling System</span>
        </div>

        <div className="flex space-x-6 text-text-secondary">
          <button
            onClick={() => setModalType('privacy')}
            className="hover:text-primary transition-colors flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setModalType('terms')}
            className="hover:text-primary transition-colors flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setModalType('support')}
            className="hover:text-primary transition-colors flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support</span>
          </button>
        </div>
      </footer>

      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-elevated border border-surface-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-text-primary space-y-4">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-surface-border"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacy' && (
              <>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Keamanan & Kebijakan Privasi
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Semua data kandidat dan hasil evaluasi psikometri MBTI PT. Dian Pandu Pratama disimpan secara terenkripsi dan khusus dipergunakan untuk kejelasan penempatan karir, dinamika kerja tim, serta evaluasi internal HR.
                </p>
                <div className="bg-surface p-3 rounded-lg border border-surface-border text-xs text-text-secondary space-y-1">
                  <p>• Data pribadi tidak akan diperjualbelikan atau disebarkan ke pihak ketiga.</p>
                  <p>• Rekam hasil penilaian tersimpan aman pada server database internal.</p>
                </div>
              </>
            )}

            {modalType === 'terms' && (
              <>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Syarat & Ketentuan Layanan
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Tes MBTI ini dirancang sebagai instrumen pemetaan kecenderungan kepribadian tempat kerja berbasis kerangka analisis Carl Jung. Hasil penilaian bersifat indikatif dan digunakan sebagai acuan pengembangan karyawan.
                </p>
                <div className="bg-surface p-3 rounded-lg border border-surface-border text-xs text-text-secondary space-y-1">
                  <p>• Isilah seluruh pertanyaan dengan jujur sesuai situasi aktual Anda di lapangan.</p>
                  <p>• Tidak ada jawaban benar atau salah dalam tes ini.</p>
                </div>
              </>
            )}

            {modalType === 'support' && (
              <>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" /> Bantuan & Dukungan Layanan
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Jika Anda mengalami kendala teknis saat pengisian tes atau membutuhkan bantuan verifikasi hasil assessment, silakan hubungi tim HRD PT. Dian Pandu Pratama.
                </p>
                <div className="bg-surface p-3 rounded-lg border border-surface-border text-xs space-y-1.5 text-text-primary">
                  <p><strong>Email HRD:</strong> hrd@dianpandupratama.co.id</p>
                  <p><strong>Layanan Kendala:</strong> +62 812-3456-7890 (Ext. 104 - Talent Management)</p>
                  <p><strong>Jam Operasional:</strong> Senin - Jumat, 08:00 - 17:00 WIB</p>
                </div>
              </>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="bg-primary text-on-primary font-medium px-4 py-2 rounded-lg text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
