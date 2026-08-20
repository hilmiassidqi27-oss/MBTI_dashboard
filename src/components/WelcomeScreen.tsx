import React, { useState } from 'react';
import { CandidateData } from '../types';
import { Timer, BarChart3, UserPlus, ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onSubmit: (data: CandidateData) => void;
  initialData?: CandidateData;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CandidateData>({
    name: initialData?.name || '',
    nik: initialData?.nik || '',
    position: initialData?.position || '',
    area: initialData?.area || '',
    email: initialData?.email || '',
    whatsapp: initialData?.whatsapp || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.nik.trim() || !formData.area.trim()) {
      alert("Nama Lengkap, NIK/Employee ID, Jabatan/Departemen, dan Email wajib diisi!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center py-6">
      {/* Left Column: Hero & Info */}
      <div className="md:col-span-7 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Corporate Assessment System</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight tracking-tight">
            MBTI Personality <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
              Profiling
            </span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed">
            Comprehensive personality mapping utilizing Jungian framework to determine optimal career paths, team dynamics, and personal development trajectories for PT. Dian Pandu Pratama.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="glass-panel p-5 rounded-2xl border-surface-border flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-3">
              <Timer className="w-5 h-5 text-tertiary" />
            </div>
            <div>
              <div className="text-xl font-bold text-text-primary">3 Minutes</div>
              <div className="text-xs text-text-secondary">Average completion time</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-surface-border flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold text-text-primary">16 Profiles</div>
              <div className="text-xs text-text-secondary">Detailed archetype analysis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Candidate Registration Card */}
      <div className="md:col-span-5 bg-surface-elevated border border-surface-border rounded-2xl p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-surface-border">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Candidate Registration</h3>
            <p className="text-xs text-text-secondary">Lengkapi data diri sebelum memulai tes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Nama Lengkap <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: Dian Pandu Pratama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Employee ID / NIK <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: DPP-2024-089"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
                Position <span className="text-error">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Jabatan"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
                Department <span className="text-error">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Area / Divisi"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              Email Perusahaan / Kerja <span className="text-error">*</span>
            </label>
            <input
              required
              type="email"
              placeholder="nama@dianpandupratama.co.id"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
              WhatsApp / No. HP (Opsional)
            </label>
            <input
              type="tel"
              placeholder="081234567890"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-text-secondary/50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-fixed text-on-primary font-bold py-3.5 px-6 rounded-xl shadow-lg flex justify-center items-center space-x-2 transition-all mt-4 btn-glow cursor-pointer"
          >
            <span>Begin Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
