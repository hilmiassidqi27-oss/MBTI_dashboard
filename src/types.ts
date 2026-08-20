export type MBTISpectrum = 'EI' | 'SN' | 'TF' | 'JP';

export interface Question {
  id: number;
  text: string;
  type: MBTISpectrum;
  direction: 1 | -1; // 1 means positive for first letter (E, S, T, J), -1 positive for second (I, N, F, P)
}

export interface CandidateData {
  name: string;
  nik: string;
  position: string;
  area: string;
  email: string;
  whatsapp?: string;
}

export interface DimensionPercentages {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface AssessmentSubmission {
  id: string;
  name: string;
  nik: string;
  position: string;
  area: string;
  email: string;
  whatsapp?: string;
  mbti: string;
  percentages: DimensionPercentages;
  rawScores: { EI: number; SN: number; TF: number; JP: number };
  aiAnalysis?: string;
  timestamp: number;
  formattedDate: string;
}

export interface ArchetypeDetail {
  title: string;
  desc: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  leadershipStyle: string;
  workplaceFit: string;
}
