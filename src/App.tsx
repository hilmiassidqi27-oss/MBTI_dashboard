import React, { useState, useEffect, useRef } from 'react';
import { CandidateData, AssessmentSubmission } from './types';
import { questions } from './data/questions';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TestScreen } from './components/TestScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminScreen } from './components/AdminScreen';
import { saveSubmissionToFirestore, deleteSubmissionFromFirestore, subscribeToSubmissions } from './lib/firebase';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'test' | 'result' | 'admin'>('welcome');
  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: '',
    nik: '',
    position: '',
    area: '',
    email: '',
    whatsapp: '',
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [activeSubmission, setActiveSubmission] = useState<AssessmentSubmission | null>(null);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);

  const answersRef = useRef<Record<number, number>>({});

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    const unsubscribe = subscribeToSubmissions(
      (firestoreData) => {
        setSubmissions(firestoreData);
        localStorage.setItem('dpp_mbti_submissions', JSON.stringify(firestoreData));
      },
      (err) => {
        console.warn('Falling back to local storage due to Firestore sync error:', err);
        const cached = localStorage.getItem('dpp_mbti_submissions');
        if (cached) {
          try {
            setSubmissions(JSON.parse(cached));
          } catch (_) {}
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Save submission to Firestore
  const saveSubmission = async (newSub: AssessmentSubmission) => {
    try {
      await saveSubmissionToFirestore(newSub);
    } catch (e) {
      console.error('Failed to save submission to Firestore:', e);
      // Fallback local state update
      const updated = [newSub, ...submissions.filter((s) => s.id !== newSub.id)];
      setSubmissions(updated);
      localStorage.setItem('dpp_mbti_submissions', JSON.stringify(updated));
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    try {
      await deleteSubmissionFromFirestore(id);
    } catch (e) {
      console.error('Failed to delete submission from Firestore:', e);
      const updated = submissions.filter((s) => s.id !== id);
      setSubmissions(updated);
      localStorage.setItem('dpp_mbti_submissions', JSON.stringify(updated));
    }
  };

  const handleStartTest = (data: CandidateData) => {
    setCandidateData(data);
    setAnswers({});
    answersRef.current = {};
    setCurrentQIndex(0);
    setStep('test');
  };

  const handleAnswerSelect = (score: number) => {
    const qId = questions[currentQIndex].id;
    answersRef.current = { ...answersRef.current, [qId]: score };
    setAnswers({ ...answersRef.current });

    if (currentQIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQIndex((prev) => prev + 1);
      }, 250);
    }
  };

  const handleCalculateResult = () => {
    const currentAnswers = answersRef.current;
    const unanswered = questions.filter((q) => currentAnswers[q.id] === undefined);

    if (unanswered.length > 0) {
      alert(`Masih terdapat ${unanswered.length} pertanyaan yang belum dijawab. Anda akan diarahkan ke pertanyaan teratas yang belum diisi.`);
      const firstUnansweredIndex = questions.findIndex((q) => currentAnswers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        setCurrentQIndex(firstUnansweredIndex);
      }
      return;
    }

    // Calculate Scores for E-I, S-N, T-F, J-P
    let rawScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    questions.forEach((q) => {
      const val = currentAnswers[q.id] || 0;
      rawScores[q.type] += val * q.direction;
    });

    // Score range per dimension is -16 to +16. Convert to 0-100 percentage.
    const getPct = (score: number) => Math.min(100, Math.max(0, Math.round(((score + 16) / 32) * 100)));

    const eiPct = getPct(rawScores.EI);
    const snPct = getPct(rawScores.SN);
    const tfPct = getPct(rawScores.TF);
    const jpPct = getPct(rawScores.JP);

    const mbtiCode = [
      eiPct >= 50 ? 'E' : 'I',
      snPct >= 50 ? 'S' : 'N',
      tfPct >= 50 ? 'T' : 'F',
      jpPct >= 50 ? 'J' : 'P',
    ].join('');

    const newSub: AssessmentSubmission = {
      id: 'SUB-' + Date.now().toString(36).toUpperCase(),
      name: candidateData.name,
      nik: candidateData.nik,
      position: candidateData.position,
      area: candidateData.area,
      email: candidateData.email,
      whatsapp: candidateData.whatsapp,
      mbti: mbtiCode,
      rawScores,
      percentages: {
        E: eiPct,
        I: 100 - eiPct,
        S: snPct,
        N: 100 - snPct,
        T: tfPct,
        F: 100 - tfPct,
        J: jpPct,
        P: 100 - jpPct,
      },
      timestamp: Date.now(),
      formattedDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    saveSubmission(newSub);
    setActiveSubmission(newSub);
    setStep('result');
  };

  const handleAddSampleData = () => {
    const sampleCandidates: AssessmentSubmission[] = [
      {
        id: 'SUB-SAMPLE-1',
        name: 'Dian Pandu Pratama',
        nik: 'DPP-2024-001',
        position: 'General Manager',
        area: 'Corporate Management',
        email: 'dian.pandu@dianpandupratama.co.id',
        whatsapp: '081234567890',
        mbti: 'ENTJ',
        rawScores: { EI: 12, SN: -8, TF: 10, JP: 14 },
        percentages: { E: 88, I: 12, S: 25, N: 75, T: 81, F: 19, J: 94, P: 6 },
        timestamp: Date.now() - 3600000 * 24,
        formattedDate: '12 Agustus 2026, 10:30 WIB',
      },
      {
        id: 'SUB-SAMPLE-2',
        name: 'Budi Santoso',
        nik: 'DPP-2024-042',
        position: 'Supervisor Maintenance',
        area: 'Operasional Lapangan',
        email: 'budi.santoso@dianpandupratama.co.id',
        whatsapp: '081398765432',
        mbti: 'ISTJ',
        rawScores: { EI: -10, SN: 12, TF: 8, JP: 12 },
        percentages: { E: 19, I: 81, S: 88, N: 12, T: 75, F: 25, J: 88, P: 12 },
        timestamp: Date.now() - 3600000 * 48,
        formattedDate: '11 Agustus 2026, 14:15 WIB',
      },
      {
        id: 'SUB-SAMPLE-3',
        name: 'Siti Rahmawati',
        nik: 'DPP-2024-088',
        position: 'HRD & Talent Specialist',
        area: 'Human Capital',
        email: 'siti.rahma@dianpandupratama.co.id',
        whatsapp: '081567891234',
        mbti: 'ENFJ',
        rawScores: { EI: 10, SN: -6, TF: -12, JP: 8 },
        percentages: { E: 81, I: 19, S: 31, N: 69, T: 12, F: 88, J: 75, P: 25 },
        timestamp: Date.now() - 3600000 * 72,
        formattedDate: '10 Agustus 2026, 09:00 WIB',
      },
    ];

    sampleCandidates.forEach((s) => saveSubmission(s));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-primary">
      <Header
        currentStep={step}
        onHomeClick={() => setStep('welcome')}
        onAdminToggle={() => setStep(step === 'admin' ? 'welcome' : 'admin')}
      />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {step === 'welcome' && (
          <WelcomeScreen
            onSubmit={handleStartTest}
            initialData={candidateData}
          />
        )}

        {step === 'test' && (
          <TestScreen
            questions={questions}
            currentQIndex={currentQIndex}
            answers={answers}
            onAnswer={handleAnswerSelect}
            onPrev={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
            onJumpToQuestion={(idx) => setCurrentQIndex(idx)}
            onCalculateResult={handleCalculateResult}
          />
        )}

        {step === 'result' && activeSubmission && (
          <ResultScreen
            submission={activeSubmission}
            onReset={() => setStep('welcome')}
          />
        )}

        {step === 'admin' && (
          <AdminScreen
            submissions={submissions}
            onSelectSubmission={(sub) => {
              setActiveSubmission(sub);
              setStep('result');
            }}
            onDeleteSubmission={handleDeleteSubmission}
            onAddSampleData={handleAddSampleData}
            onClose={() => setStep('welcome')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
