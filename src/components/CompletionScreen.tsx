import React from 'react';
import { AssessmentSubmission } from '../types';
import { CheckCircle2, Building, User, Mail, Phone, Calendar, Clock, ShieldCheck, Home } from 'lucide-react';

interface CompletionScreenProps {
  submission: AssessmentSubmission;
  onReset: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ submission, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-6 animate-fade-in">
      <div className="bg-surface border border-surface-border rounded-2xl shadow-xl overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-primary/10 border-b border-primary/20 p-8 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-primary/10 shadow-inner animate-pulse">
            <CheckCircle2 className="w-10 h-10 text-primary stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Asesmen Berhasil Disimpan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Terima Kasih, Asesmen Telah Selesai!
          </h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
            Seluruh rangkaian pertanyaan telah Anda jawab dengan lengkap. Data telah terkirim dan tercatat secara aman di database Human Capital PT. Dian Pandu Pratama.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Submission Details Card */}
          <div className="bg-surface-container/60 border border-surface-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>Ringkasan Data Partisipan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Nama Lengkap</span>
                <p className="font-semibold text-text-primary">{submission.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-secondary">NIK / ID Karyawan</span>
                <p className="font-semibold text-text-primary">{submission.nik}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Posisi / Jabatan</span>
                <p className="font-semibold text-text-primary flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-text-secondary" />
                  {submission.position}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Departemen / Area</span>
                <p className="font-semibold text-text-primary">{submission.area}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Email</span>
                <p className="font-medium text-text-primary text-xs truncate flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-text-secondary" />
                  {submission.email}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-secondary">Waktu Penyelesaian</span>
                <p className="font-medium text-text-primary text-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-text-secondary" />
                  {submission.formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps Information Box */}
          <div className="bg-tertiary/10 border border-tertiary/20 rounded-xl p-4 text-xs sm:text-sm text-text-primary space-y-2">
            <div className="font-semibold text-tertiary flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Informasi Tahapan Selanjutnya</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Hasil asesmen kepribadian ini bersifat rahasia dan dipergunakan khusus untuk keperluan evaluasi talenta dan pengembangan organisasi oleh Manajemen PT. Dian Pandu Pratama. Informasi tahapan selanjutnya akan dihubungi oleh Tim HR melalui email atau nomor WhatsApp resmi Anda.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={onReset}
              className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-fixed text-on-primary font-bold text-sm rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Halaman Depan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
