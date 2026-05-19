export type TaskStatus = 'todo' | 'doing' | 'done' | 'missed';

export interface UserProfile {
  currentStatus?: string;
  undergraduateSchool?: string;
  undergraduateMajor?: string;
  targetMajor?: string;
  isCrossMajor?: boolean;
  targetRegion?: string;
  targetSchool?: string;
  englishLevel?: string;
  mathLevel?: string;
  professionalLevel?: string;
  dailyStudyHours?: number;
  progress?: string;
  sleepSchedule?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  note?: string;
  status: TaskStatus;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface AiRequestPayload {
  apiKey: string;
  prompt: string;
  signal?: AbortSignal;
}

export interface RecommendationResult {
  id: string;
  title: string;
  category: string;
  reason: string;
  risk?: string;
  action?: string;
}

export interface ReviewRecord {
  id: string;
  date: string;
  mood: string;
  studyHours: number;
  unfinishedReason: string;
  aiAdvice?: string;
}

export type PromptType =
  | 'chat'
  | 'schoolRecommend'
  | 'courseRecommend'
  | 'studyPlan'
  | 'dailyTask'
  | 'checkinReview'
  | 'healthAdvice';
