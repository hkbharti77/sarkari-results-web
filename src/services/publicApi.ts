/**
 * BharatRojgar Public API Service
 * Handles all communication between the citizen portal and the govjob-backend API.
 */

export interface BackendCategoryBreakdown {
  UR: number;
  OBC: number;
  SC: number;
  ST: number;
  EWS: number;
}

export interface BackendApplicationFees {
  general?: number;
  obc?: number;
  scSt?: number;
  female?: number;
  paymentMode?: string;
}

export interface BackendPostBreakdownItem {
  postName: string;
  vacancies: number;
  qualification: string;
}

export interface BackendJobFaq {
  question: string;
  answer: string;
}

export interface BackendJob {
  _id?: string;
  customId: string;
  advtNo: string;
  postTitle: string;
  slug: string;
  department: string;
  ministryCode: string;
  payLevel: string;
  vacancies: number;
  categoryBreakdown: BackendCategoryBreakdown;
  applicationsReceived?: number;
  scrutinyPending?: number;
  startDate?: string | null;
  deadlineDate: string;
  examDate?: string | null;
  status:
    | 'Application Open / Active'
    | 'Admit Card / Active'
    | 'Answer Key Out'
    | 'Pending / Scrutiny'
    | 'Result Announced'
    | 'Rejected / Cancelled';
  cutoffMarks?: BackendCategoryBreakdown;
  gazetteRef: string;
  admitCardsReleased?: number;
  officialWebsiteUrl: string;
  applyOnlineUrl?: string | null;
  officialNoticePdfUrl?: string | null;
  admitCardUrl?: string | null;
  answerKeyUrl?: string | null;
  syllabusUrl?: string | null;
  selectionStages?: string[];
  stateCode: string;
  educationTier?: string;
  isTrending?: boolean;
  applicationFees?: BackendApplicationFees;
  qualificationSummary?: string;
  ageLimitSummary?: string;
  postBreakdown?: BackendPostBreakdownItem[];
  description?: string;
  faqs?: BackendJobFaq[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BackendPaginatedJobs {
  data: BackendJob[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TrendingTicker {
  id: string;
  title: string;
  detail: string;
  urgency: 'HIGH' | 'NORMAL';
  slug?: string;
  url?: string;
}

export interface BackendHomeSummary {
  totalVacancies: number;
  admitCardsToday: number;
  resultsPast24h: number;
  lastGazetteSyncTime: string;
  isVerified: boolean;
  trendingTickers: TrendingTicker[];
}

export interface BackendAdmitCardItem {
  id: string;
  customId: string;
  advtNo: string;
  postTitle: string;
  slug: string;
  department: string;
  vacancies: number;
  examDate: string;
  admitCardsReleased: number;
  officialWebsiteUrl: string;
  officialNoticePdfUrl: string | null;
  regionalPortals: Array<{ region: string; url: string }>;
  cityIntimationSlipStatus: string;
  reportingWindow: string;
}

export interface BackendAdmitCardsResponse {
  data: BackendAdmitCardItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BackendResultItem {
  id: string;
  customId: string;
  advtNo: string;
  postTitle: string;
  slug: string;
  department: string;
  vacancies: number;
  gazetteRef: string;
  cutoffMarks: BackendCategoryBreakdown;
  officialWebsiteUrl: string;
  officialNoticePdfUrl: string | null;
  resultAnnouncementDate: string;
  meritListPdfUrl: string;
}

export interface BackendResultsResponse {
  data: BackendResultItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface BackendStateCommission {
  name: string;
  code: string;
  website: string;
  description: string;
}

export interface BackendStateHub {
  state: {
    name: string;
    code: string;
    capital: string;
    emblemUrl: string;
    officialLanguage: string;
    domicileRule: string;
    commissions: BackendStateCommission[];
  };
  vacancies: {
    data: BackendJob[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface SearchJobsParams {
  search?: string;
  qualification?: string;
  state?: string;
  category?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ||
  'http://localhost:4000/api/v1';

const DEFAULT_TIMEOUT_MS = 5000;
const inFlightRequests = new Map<string, Promise<unknown>>();

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const method = (options.method || 'GET').toUpperCase();

  // Deduplicate identical in-flight GET requests
  if (method === 'GET') {
    const existing = inFlightRequests.get(url);
    if (existing) {
      return existing as Promise<T>;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      // The backend uses TransformInterceptor: { success: true, statusCode: 200, data: T }
      return (json && typeof json === 'object' && 'data' in json ? json.data : json) as T;
    } finally {
      clearTimeout(timer);
      if (method === 'GET') {
        inFlightRequests.delete(url);
      }
    }
  })();

  if (method === 'GET') {
    inFlightRequests.set(url, fetchPromise);
  }

  return fetchPromise as Promise<T>;
}

export const publicApi = {
  /**
   * Health / ping check
   */
  async ping(): Promise<boolean> {
    try {
      await request<BackendHomeSummary>('/public/home-summary');
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get homepage counters and trending ticker notifications
   */
  async getHomeSummary(): Promise<BackendHomeSummary> {
    return request<BackendHomeSummary>('/public/home-summary');
  },

  /**
   * Search jobs with filters and pagination
   */
  async searchJobs(params: SearchJobsParams = {}): Promise<BackendPaginatedJobs> {
    const query = new URLSearchParams();
    if (params.search) query.set('search', params.search);
    if (params.qualification) query.set('qualification', params.qualification);
    if (params.state && params.state !== 'ALL') query.set('state', params.state);
    if (params.category && params.category !== 'ALL') query.set('category', params.category);
    if (params.status) query.set('status', params.status);
    if (params.sort) query.set('sort', params.sort);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const qs = query.toString();
    return request<BackendPaginatedJobs>(`/public/jobs${qs ? `?${qs}` : ''}`);
  },

  /**
   * Get a single job by slug or customId
   */
  async getJobBySlug(slug: string): Promise<BackendJob> {
    return request<BackendJob>(`/public/jobs/${encodeURIComponent(slug.toLowerCase())}`);
  },

  /**
   * Get admit cards and hall ticket releases
   */
  async getAdmitCards(params: { agency?: string; search?: string; page?: number; limit?: number } = {}): Promise<BackendAdmitCardsResponse> {
    const query = new URLSearchParams();
    if (params.agency) query.set('agency', params.agency);
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const qs = query.toString();
    return request<BackendAdmitCardsResponse>(`/public/admit-cards${qs ? `?${qs}` : ''}`);
  },

  /**
   * Get declared results and cutoff marks
   */
  async getResults(params: { agency?: string; search?: string; page?: number; limit?: number } = {}): Promise<BackendResultsResponse> {
    const query = new URLSearchParams();
    if (params.agency) query.set('agency', params.agency);
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const qs = query.toString();
    return request<BackendResultsResponse>(`/public/results${qs ? `?${qs}` : ''}`);
  },

  /**
   * Get state government hub and active vacancies
   */
  async getStateHub(stateCode: string, params: { qualification?: string; search?: string; status?: string; page?: number; limit?: number } = {}): Promise<BackendStateHub> {
    const query = new URLSearchParams();
    if (params.qualification) query.set('qualification', params.qualification);
    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const qs = query.toString();
    return request<BackendStateHub>(`/public/state/${encodeURIComponent(stateCode.toUpperCase())}${qs ? `?${qs}` : ''}`);
  },
};
