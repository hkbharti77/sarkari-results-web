export type JobCategory =
  | 'UPSC'
  | 'SSC'
  | 'Railway'
  | 'Banking'
  | 'Defence'
  | 'State Police'
  | 'Teaching'
  | 'Engineering'
  | 'Medical / Paramedical'
  | 'Other Central';

export type JobStatus = 'NEW' | 'ACTIVE' | 'CLOSING_SOON' | 'EXTENDED' | 'EXPIRED';

export interface VacancyBreakdown {
  postName: string;
  categoryCode?: string;
  vacancies: number;
  qualification: string;
}

export interface ImportantDate {
  event: string;
  date: string;
  isPast?: boolean;
}

export interface ApplicationFee {
  general: number;
  obc: number;
  scSt: number;
  female: number;
  paymentMode: string;
}

export interface JobFaq {
  question: string;
  answer: string;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  organization: string;
  department?: string;
  category: JobCategory;
  state: string; // e.g. "Central", "Uttar Pradesh", "Bihar", "Rajasthan", "Madhya Pradesh"
  totalVacancies: number;
  postDate: string;
  lastDate: string;
  examDate?: string;
  admitCardDate?: string;
  resultDate?: string;
  salary: string;
  qualificationSummary: string;
  ageLimitSummary: string;
  status: JobStatus;
  featured?: boolean;
  admitCardStatus?: 'RELEASED' | 'EXPECTED' | 'NOT_APPLICABLE';
  resultStatus?: 'DECLARED' | 'AWAITED' | 'NOT_APPLICABLE';
  answerKeyStatus?: 'RELEASED' | 'PENDING' | 'NOT_APPLICABLE';
  officialPdfUrl: string;
  applyOnlineUrl: string;
  officialSiteUrl: string;
  importantDates: ImportantDate[];
  fees: ApplicationFee;
  breakdown: VacancyBreakdown[];
  selectionStages: string[];
  description: string;
  faqs?: JobFaq[];
}

export interface QuickLinkItem {
  id: string;
  title: string;
  org: string;
  date: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'danger';
  linkTo: string;
}
