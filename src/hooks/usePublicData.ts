import { useState, useEffect, useCallback } from 'react';
import { JobPosting, QuickLinkItem } from '../types/job';
import {
  MOCK_JOBS,
  MOCK_ADMIT_CARDS,
  MOCK_RESULTS,
  MOCK_TRENDING_TICKER,
} from '../data/mockJobs';
import {
  publicApi,
  SearchJobsParams,
  BackendHomeSummary,
  BackendStateHub,
} from '../services/publicApi';
import {
  mapBackendJobToJobPosting,
  mapBackendAdmitCardToQuickLink,
  mapBackendResultToQuickLink,
} from '../services/mappers';

/**
 * Attaches smart window focus / visibility revalidation with a relaxed background sync timer.
 * Replaces aggressive rapid polling floods with high-efficiency event-driven updates.
 */
function attachSmartRevalidation(fetchFn: () => void, intervalMs = 90000): () => void {
  fetchFn();

  const handleRevalidate = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      fetchFn();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('focus', handleRevalidate);
    document.addEventListener('visibilitychange', handleRevalidate);
  }

  const timer = setInterval(() => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      fetchFn();
    }
  }, intervalMs);

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', handleRevalidate);
      document.removeEventListener('visibilitychange', handleRevalidate);
    }
    clearInterval(timer);
  };
}

// ─── 1. usePublicJobs Hook ────────────────────────────────────────────────────
export interface UsePublicJobsResult {
  jobs: JobPosting[];
  loading: boolean;
  error: string | null;
  isLive: boolean;
  total: number;
  refetch: () => void;
}

export function usePublicJobs(params: SearchJobsParams = {}): UsePublicJobsResult {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await publicApi.searchJobs(params);
      // BACKEND IS LIVE: Only use backend data. If empty, keep it empty!
      setIsLive(true);
      if (response && Array.isArray(response.data)) {
        const mapped = response.data.map(mapBackendJobToJobPosting);
        setJobs(mapped);
        setTotal(response.meta?.total ?? mapped.length);
      } else {
        setJobs([]);
        setTotal(0);
      }
    } catch (err: unknown) {
      // BACKEND IS OFFLINE: Only then fallback to mock data
      setIsLive(false);
      setError(err instanceof Error ? err.message : 'API offline');
      setJobs(MOCK_JOBS);
      setTotal(MOCK_JOBS.length);
    } finally {
      setLoading(false);
    }
  }, [params.search, params.qualification, params.state, params.category, params.status, params.sort, params.page, params.limit]);

  useEffect(() => {
    return attachSmartRevalidation(fetchJobs, 90000);
  }, [fetchJobs]);

  return { jobs, loading, error, isLive, total, refetch: fetchJobs };
}

// ─── 2. useJobDetail Hook ─────────────────────────────────────────────────────
export interface UseJobDetailResult {
  job: JobPosting | undefined;
  loading: boolean;
  error: string | null;
  isLive: boolean;
}

export function useJobDetail(jobIdOrSlug: string): UseJobDetailResult {
  const [job, setJob] = useState<JobPosting | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    const target = jobIdOrSlug.toLowerCase();

    async function loadJob() {
      setLoading(true);
      setError(null);
      try {
        const backendJob = await publicApi.getJobBySlug(jobIdOrSlug);
        if (!isCancelled) {
          setIsLive(true);
          if (backendJob) {
            setJob(mapBackendJobToJobPosting(backendJob));
          } else {
            setJob(undefined);
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const errMessage = err instanceof Error ? err.message : '';
          const is404 = errMessage.includes('404');

          if (is404) {
            // Live backend responded 404: The job does NOT exist in the database!
            // Do NOT fall back to mock data!
            setIsLive(true);
            setJob(undefined);
            setError(`Notification not found in live database for identifier: ${jobIdOrSlug}`);
          } else {
            // Server offline / network unreachable -> Use mock catalog
            setIsLive(false);
            const mockMatch = MOCK_JOBS.find(
              (j) => j.id.toLowerCase() === target || j.slug.toLowerCase() === target
            );
            if (mockMatch) {
              setJob(mockMatch);
            } else {
              setJob(undefined);
              setError('Recruitment notice not found in offline catalog');
            }
          }
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    if (jobIdOrSlug) {
      loadJob();
    } else {
      setLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [jobIdOrSlug]);

  return { job, loading, error, isLive };
}

// ─── 3. useHomeSummary Hook ───────────────────────────────────────────────────
export interface UseHomeSummaryResult {
  summary: BackendHomeSummary;
  loading: boolean;
  isLive: boolean;
  refetch: () => void;
}

const OFFLINE_MOCK_SUMMARY: BackendHomeSummary = {
  totalVacancies: 119869,
  admitCardsToday: 14,
  resultsPast24h: 8,
  lastGazetteSyncTime: 'Offline Demo Data',
  isVerified: false,
  trendingTickers: MOCK_TRENDING_TICKER.map((title, idx) => ({
    id: String(idx + 1),
    title,
    detail: 'Offline Demo Bulletin',
    urgency: idx < 2 ? 'HIGH' : 'NORMAL',
  })),
};

export function useHomeSummary(): UseHomeSummaryResult {
  const [summary, setSummary] = useState<BackendHomeSummary>(OFFLINE_MOCK_SUMMARY);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const data = await publicApi.getHomeSummary();
      if (data) {
        setIsLive(true);
        setSummary({
          totalVacancies: data.totalVacancies ?? 0,
          admitCardsToday: data.admitCardsToday ?? 0,
          resultsPast24h: data.resultsPast24h ?? 0,
          lastGazetteSyncTime: data.lastGazetteSyncTime || 'Live Synced',
          isVerified: true,
          trendingTickers: Array.isArray(data.trendingTickers) ? data.trendingTickers : [],
        });
      }
    } catch {
      // Backend offline -> use offline mock summary
      setIsLive(false);
      setSummary(OFFLINE_MOCK_SUMMARY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return attachSmartRevalidation(fetchSummary, 60000);
  }, [fetchSummary]);

  return { summary, loading, isLive, refetch: fetchSummary };
}

// ─── 4. useAdmitCards Hook ───────────────────────────────────────────────────
export interface UseAdmitCardsResult {
  items: QuickLinkItem[];
  loading: boolean;
  isLive: boolean;
}

export function useAdmitCards(): UseAdmitCardsResult {
  const [items, setItems] = useState<QuickLinkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  const load = useCallback(async () => {
    try {
      const res = await publicApi.getAdmitCards();
      setIsLive(true);
      // When live: only show live data. If empty, keep empty!
      if (res && Array.isArray(res.data)) {
        setItems(res.data.map(mapBackendAdmitCardToQuickLink));
      } else {
        setItems([]);
      }
    } catch {
      // When offline: show mock admit cards
      setIsLive(false);
      setItems(MOCK_ADMIT_CARDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return attachSmartRevalidation(load, 90000);
  }, [load]);

  return { items, loading, isLive };
}

// ─── 5. useResults Hook ──────────────────────────────────────────────────────
export interface UseResultsResult {
  items: QuickLinkItem[];
  loading: boolean;
  isLive: boolean;
}

export function useResults(): UseResultsResult {
  const [items, setItems] = useState<QuickLinkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  const load = useCallback(async () => {
    try {
      const res = await publicApi.getResults();
      setIsLive(true);
      // When live: only show live data. If empty, keep empty!
      if (res && Array.isArray(res.data)) {
        setItems(res.data.map(mapBackendResultToQuickLink));
      } else {
        setItems([]);
      }
    } catch {
      // When offline: show mock results
      setIsLive(false);
      setItems(MOCK_RESULTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return attachSmartRevalidation(load, 90000);
  }, [load]);

  return { items, loading, isLive };
}

// ─── 6. useStateHub Hook ─────────────────────────────────────────────────────
export interface UseStateHubResult {
  hubData: BackendStateHub | null;
  jobs: JobPosting[];
  loading: boolean;
  isLive: boolean;
}

export function useStateHub(stateCode: string): UseStateHubResult {
  const [hubData, setHubData] = useState<BackendStateHub | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    async function load() {
      setLoading(true);
      try {
        let code = stateCode.toUpperCase();
        if (code === 'BIHAR') code = 'BR';
        if (code === 'RAJASTHAN') code = 'RJ';

        const res = await publicApi.getStateHub(code);
        if (!isCancelled && res) {
          setIsLive(true);
          setHubData(res);
          // When live: only show live state jobs. If empty, keep empty!
          if (res.vacancies && Array.isArray(res.vacancies.data)) {
            setJobs(res.vacancies.data.map(mapBackendJobToJobPosting));
          } else {
            setJobs([]);
          }
        }
      } catch {
        if (!isCancelled) {
          // Offline only -> fallback to mock jobs
          setIsLive(false);
          setHubData(null);
          const target = stateCode.toLowerCase();
          const filtered = MOCK_JOBS.filter((j) => {
            const st = j.state.toLowerCase();
            return (
              st.includes(target) ||
              (target === 'up' && st.includes('uttar')) ||
              (target === 'br' && st.includes('bihar')) ||
              (target === 'rj' && st.includes('rajasthan')) ||
              (target === 'mp' && st.includes('madhya'))
            );
          });
          setJobs(filtered);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    load();
    return () => {
      isCancelled = true;
    };
  }, [stateCode]);

  return { hubData, jobs, loading, isLive };
}
