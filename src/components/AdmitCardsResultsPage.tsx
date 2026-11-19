import React, { useState, useEffect } from 'react';
import { MOCK_ADMIT_CARDS, MOCK_RESULTS } from '../data/mockJobs';
import { JobPosting, QuickLinkItem } from '../types/job';
import { Link } from '../router/Link';
import { useRouter } from '../router/RouterContext';

interface AdmitCardsResultsPageProps {
  initialMode?: 'ADMIT_CARD' | 'RESULT';
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
  admitCards?: QuickLinkItem[];
  results?: QuickLinkItem[];
  isLive?: boolean;
}

export const AdmitCardsResultsPage: React.FC<AdmitCardsResultsPageProps> = ({
  initialMode = 'ADMIT_CARD',
  jobs,
  onSelectJob,
  admitCards,
  results,
  isLive = false,
}) => {
  const { navigate } = useRouter();
  const [mode, setMode] = useState<'ADMIT_CARD' | 'RESULT'>(initialMode);
  const [filterSearch, setFilterSearch] = useState<string>('');

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  const handleModeChange = (newMode: 'ADMIT_CARD' | 'RESULT') => {
    setMode(newMode);
    navigate(newMode === 'ADMIT_CARD' ? '/admit-cards' : '/results');
  };

  // When live: only show live items. Never fallback to mock data when API is live!
  const admitCardItems = isLive
    ? (admitCards ?? [])
    : (admitCards && admitCards.length > 0 ? admitCards : MOCK_ADMIT_CARDS);

  const resultItems = isLive
    ? (results ?? [])
    : (results && results.length > 0 ? results : MOCK_RESULTS);

  const items = mode === 'ADMIT_CARD' ? admitCardItems : resultItems;

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
    item.org.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">
            {mode === 'ADMIT_CARD' ? 'Admit Cards & Exam City' : 'Declared Exam Results'}
          </span>
        </div>
        <h1 className="text-xl font-extrabold text-primary">
          {mode === 'ADMIT_CARD'
            ? 'Admit Cards, Hall Tickets & Exam City Intimation 2025'
            : 'Government Examination Results, Cut-Off Marks & Merit Lists'}
        </h1>
        <p className="text-xs text-on-surface-variant">
          Download direct server hall tickets and access official commission marksheets.
        </p>
      </div>

      {/* MODE TOGGLE TABS */}
      <div className="flex items-center justify-between border-b border-surface-container pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleModeChange('ADMIT_CARD')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              mode === 'ADMIT_CARD'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>Admit Cards ({admitCardItems.length})</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('RESULT')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              mode === 'RESULT'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-primary hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">emoji_events</span>
            <span>Results & Cut-Offs ({resultItems.length})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-64 hidden sm:block">
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            placeholder="Search exams..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low text-xs rounded-lg border border-outline-variant/60 focus:outline-none"
          />
        </div>
      </div>

      {/* ITEMS LIST */}
      {filteredItems.length === 0 ? (
        <div className="bg-surface-container-lowest p-12 text-center rounded-xl border border-surface-container space-y-3">
          <span className="material-symbols-outlined text-[48px] text-outline">
            {mode === 'ADMIT_CARD' ? 'badge' : 'emoji_events'}
          </span>
          <h3 className="text-base font-bold text-primary">
            No {mode === 'ADMIT_CARD' ? 'Admit Cards' : 'Results & Cut-Offs'} Available
          </h3>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            No active {mode === 'ADMIT_CARD' ? 'admit cards or city slips' : 'declared results or cut-off scores'} currently announced. Check back as soon as commission releases are declared.
          </p>
          <Link
            to="/latest-jobs"
            className="inline-block mt-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold no-underline"
          >
            Explore All Vacancies →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
          const matchedJob = jobs.find((j) => item.linkTo && item.linkTo.includes(j.slug));
          const targetUrl = item.linkTo || (matchedJob ? `/job/${matchedJob.id}` : (mode === 'ADMIT_CARD' ? '/admit-cards' : '/results'));

          return (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-xs hover:border-primary-container/40 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[10px] font-bold">
                    {item.org}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.badgeColor === 'success'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.badgeColor === 'danger'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <Link
                  to={targetUrl}
                  onClick={() => matchedJob && onSelectJob(matchedJob)}
                  className="font-bold text-sm text-primary line-clamp-2 hover:underline block text-inherit no-underline"
                >
                  {item.title}
                </Link>
                <div className="text-xs text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">event</span>
                  <span>Published on: {item.date}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container flex items-center justify-between gap-2">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Link
                </span>
                <Link
                  to={targetUrl}
                  onClick={() => matchedJob && onSelectJob(matchedJob)}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors flex items-center gap-1 no-underline"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {mode === 'ADMIT_CARD' ? 'download' : 'visibility'}
                  </span>
                  <span>{mode === 'ADMIT_CARD' ? 'Download Admit Card' : 'Check Result PDF'}</span>
                </Link>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
};
