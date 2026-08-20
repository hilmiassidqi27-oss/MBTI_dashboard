import React, { useEffect } from 'react';
import { Question } from '../types';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface TestScreenProps {
  questions: Question[];
  currentQIndex: number;
  answers: Record<number, number>;
  onAnswer: (score: number) => void;
  onPrev: () => void;
  onJumpToQuestion: (index: number) => void;
  onCalculateResult: () => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  questions,
  currentQIndex,
  answers,
  onAnswer,
  onPrev,
  onJumpToQuestion,
  onCalculateResult,
}) => {
  const currentQ = questions[currentQIndex];
  const progressPct = Math.round(((currentQIndex + 1) / questions.length) * 100);
  const selectedScore = answers[currentQ.id];

  // Handle keyboard shortcuts (1 = Strongly Agree, 2 = Agree, 3 = Neutral, 4 = Disagree, 5 = Strongly Disagree)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') onAnswer(2);
      else if (e.key === '2') onAnswer(1);
      else if (e.key === '3') onAnswer(0);
      else if (e.key === '4') onAnswer(-1);
      else if (e.key === '5') onAnswer(-2);
      else if (e.key === 'ArrowLeft' && currentQIndex > 0) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQIndex, onAnswer, onPrev]);

  return (
    <div className="w-full max-w-3xl bg-surface-elevated border border-surface-border rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Question Header & Progress Bar */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-xs font-bold bg-surface-container-high text-primary px-3 py-1 rounded-full border border-primary/20 tracking-wider uppercase">
          SOAL {currentQIndex + 1} DARI {questions.length}
        </span>
        <span className="text-xs font-medium text-text-secondary">
          {progressPct}% Selesai ({Object.keys(answers).length}/{questions.length} Terjawab)
        </span>
      </div>

      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-tertiary h-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        ></div>
      </div>

      {/* Question Statement */}
      <div className="min-h-[140px] flex items-center justify-center text-center px-4 py-6 bg-surface-container/50 border border-surface-border/50 rounded-xl">
        <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-relaxed">
          "{currentQ.text}"
        </h3>
      </div>

      {/* 5-Point Likert Scale Buttons */}
      <div className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
          <span className="text-xs font-bold text-tertiary hidden md:block tracking-widest uppercase">
            SANGAT SETUJU
          </span>

          <div className="flex items-center justify-center space-x-3 sm:space-x-5">
            {/* Strongly Agree (+2) */}
            <button
              onClick={() => onAnswer(2)}
              title="Sangat Setuju (Tekan '1')"
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                selectedScore === 2
                  ? 'bg-tertiary border-tertiary text-on-tertiary scale-110 shadow-lg shadow-tertiary/30'
                  : 'border-tertiary text-tertiary hover:bg-tertiary/20 hover:scale-105'
              }`}
            >
              <span className="font-bold text-sm md:text-base">SS</span>
            </button>

            {/* Agree (+1) */}
            <button
              onClick={() => onAnswer(1)}
              title="Setuju (Tekan '2')"
              className={`w-11 h-11 md:w-13 md:h-13 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                selectedScore === 1
                  ? 'bg-tertiary/80 border-tertiary text-on-tertiary scale-110 shadow-md'
                  : 'border-tertiary/60 text-tertiary/80 hover:bg-tertiary/20 hover:scale-105'
              }`}
            >
              <span className="font-bold text-xs md:text-sm">S</span>
            </button>

            {/* Neutral (0) */}
            <button
              onClick={() => onAnswer(0)}
              title="Netral (Tekan '3')"
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                selectedScore === 0
                  ? 'bg-primary border-primary text-on-primary scale-110 shadow-md'
                  : 'bg-surface-container-high border-surface-border hover:bg-surface-border text-text-secondary hover:scale-105'
              }`}
            >
              <span className="font-medium text-xs">N</span>
            </button>

            {/* Disagree (-1) */}
            <button
              onClick={() => onAnswer(-1)}
              title="Tidak Setuju (Tekan '4')"
              className={`w-11 h-11 md:w-13 md:h-13 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                selectedScore === -1
                  ? 'bg-error/80 border-error text-on-error scale-110 shadow-md'
                  : 'border-error/60 text-error/80 hover:bg-error/20 hover:scale-105'
              }`}
            >
              <span className="font-bold text-xs md:text-sm">TS</span>
            </button>

            {/* Strongly Disagree (-2) */}
            <button
              onClick={() => onAnswer(-2)}
              title="Sangat Tidak Setuju (Tekan '5')"
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                selectedScore === -2
                  ? 'bg-error border-error text-on-error scale-110 shadow-lg shadow-error/30'
                  : 'border-error text-error hover:bg-error/20 hover:scale-105'
              }`}
            >
              <span className="font-bold text-sm md:text-base">STS</span>
            </button>
          </div>

          <span className="text-xs font-bold text-error hidden md:block tracking-widest uppercase">
            SANGAT TIDAK SETUJU
          </span>
        </div>

        {/* Mobile Labels */}
        <div className="flex justify-between md:hidden text-xs font-bold px-2 pt-1">
          <span className="text-tertiary">SANGAT SETUJU</span>
          <span className="text-error">SANGAT TIDAK SETUJU</span>
        </div>
      </div>

      {/* Grid of Quick Question Jump Pills */}
      <div className="pt-4 border-t border-surface-border/60">
        <p className="text-xs text-text-secondary mb-2 flex items-center gap-1">
          <span>Navigasi Cepat Soal:</span>
        </p>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-background/50 rounded-lg border border-surface-border/40">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentQIndex;
            return (
              <button
                key={q.id}
                onClick={() => onJumpToQuestion(idx)}
                className={`w-7 h-7 text-xs font-semibold rounded-md flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-primary text-on-primary ring-2 ring-primary/50 font-bold'
                    : isAnswered
                    ? 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                    : 'bg-surface-container text-text-secondary hover:bg-surface-container-high'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex justify-between items-center border-t border-surface-border pt-4 mt-4">
        <button
          disabled={currentQIndex === 0}
          onClick={onPrev}
          className="text-text-secondary hover:text-text-primary text-xs md:text-sm font-semibold flex items-center space-x-1.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all py-2 px-3 rounded-lg hover:bg-surface-container"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {currentQIndex === questions.length - 1 || Object.keys(answers).length === questions.length ? (
          <button
            onClick={onCalculateResult}
            className="bg-primary hover:bg-primary-fixed text-on-primary font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl flex items-center space-x-2 btn-glow transition-all cursor-pointer"
          >
            <span>Proses Hasil Evaluation</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <span className="text-xs text-text-secondary italic hidden sm:inline">
            Pilih salah satu skala untuk lanjut otomatis
          </span>
        )}
      </div>
    </div>
  );
};
