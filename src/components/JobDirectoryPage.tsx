import React, { useState, useMemo, useEffect } from 'react';
import { JobCategory, JobPosting } from '../types/job';
import { Link } from '../router/Link';
import { useRouter } from '../router/RouterContext';

interface JobDirectoryPageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
  initialCategory?: JobCategory | 'ALL';
  initialSearch?: string;
  initialState?: string;
}

export const JobDirectoryPage: React.FC<JobDirectoryPageProps> = ({
  jobs,
  onSelectJob,
  initialCategory = 'ALL',
  initialSearch = '',
  initialState = 'ALL',
}) => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | 'ALL'>(initialCategory);
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'LATEST' | 'CLOSING_SOON' | 'VACANCIES'>('LATEST');

  // Sync external props (e.g. when URL params change)
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialState) setSelectedState(initialState);
  }, [initialState]);

  // Update URL params when filters change without reload
  const updateUrlParams = (cat: string, state: string, search: string) => {
    const params = new URLSearchParams();
    if (cat && cat !== 'ALL') params.set('category', cat);
    if (state && state !== 'ALL') params.set('state', state);
    if (search.trim()) params.set('q', search.trim());
    const query = params.toString();
    navigate(`/latest-jobs${query ? `?${query}` : ''}`, { replace: true, scroll: false });
  };

  const categories: Array<JobCategory | 'ALL'> = [
    'ALL',
    'UPSC',
    'SSC',
    'Railway',
    'Banking',
    'Defence',
    'State Police',
    'Teaching',
  ];

  const states = ['ALL', 'Central', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh'];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchCat = selectedCategory === 'ALL' || job.category === selectedCategory;
      const matchState =
        selectedState === 'ALL' ||
        job.state.toLowerCase() === selectedState.toLowerCase() ||
        (selectedState.toLowerCase() === 'up' && job.state.toLowerCase() === 'uttar pradesh') ||
        (selectedState.toLowerCase() === 'mp' && job.state.toLowerCase() === 'madhya pradesh');
      const matchSearch =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.qualificationSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchState && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'VACANCIES') {
        return b.totalVacancies - a.totalVacancies;
      }
      return 0; // maintain default
    });
  }, [jobs, selectedCategory, selectedState, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* DIRECTORY HEADER & BREADCRUMB */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Government Jobs Search Directory</span>
        </div>
        <h1 className="text-xl font-extrabold text-primary">
          Latest Government Recruitment Vacancies 2025
        </h1>
        <p className="text-xs text-on-surface-variant">
          Explore and filter verified central and state civil services, police, banking, railway, and teaching notifications.
        </p>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              updateUrlParams(selectedCategory, selectedState, val);
            }}
            placeholder="Filter by keyword (e.g. Graduate, Inspector, Police, SSC, Assistant)..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-sm rounded-lg border border-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Category Dropdown/Pills */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-primary block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value as JobCategory | 'ALL';
                setSelectedCategory(val);
                updateUrlParams(val, selectedState, searchQuery);
              }}
              className="w-full px-3 py-1.5 bg-surface-container-low rounded-lg text-xs font-medium border border-outline-variant/60"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Categories (UPSC, SSC, RRB...)' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Region / State */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-primary block">Region / State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedState(val);
                updateUrlParams(selectedCategory, val, searchQuery);
              }}
              className="w-full px-3 py-1.5 bg-surface-container-low rounded-lg text-xs font-medium border border-outline-variant/60"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'All Regions (Central + States)' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-primary block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'LATEST' | 'CLOSING_SOON' | 'VACANCIES')}
              className="w-full px-3 py-1.5 bg-surface-container-low rounded-lg text-xs font-medium border border-outline-variant/60"
            >
              <option value="LATEST">Latest Published Date</option>
              <option value="CLOSING_SOON">Application Closing Soonest</option>
              <option value="VACANCIES">Highest Vacancy Count</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-surface-container text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-outline uppercase shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                updateUrlParams(cat, selectedState, searchQuery);
              }}
              className={`px-3 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container text-primary hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* JOBS FEED LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
          <span>
            Showing <strong className="text-primary">{filteredJobs.length}</strong> verified vacancies
          </span>
          <span>Daily 06:00 AM Synchronized</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 text-center rounded-xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <h3 className="text-base font-bold text-primary">No Matching Vacancies Found</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              No active recruitment advertisements currently match your selected filters. Try clearing filters or exploring all central opportunities.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedState('ALL');
                setSearchQuery('');
                updateUrlParams('ALL', 'ALL', '');
              }}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs hover:border-outline-variant transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                      {job.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[10px] font-semibold">
                      {job.state}
                    </span>
                    {job.featured && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/job/${job.id}`}
                    onClick={() => onSelectJob(job)}
                    className="text-base font-bold text-primary hover:text-primary-container cursor-pointer transition-colors block text-inherit no-underline"
                  >
                    {job.title}
                  </Link>
                  <div className="text-xs text-on-surface-variant font-medium">
                    {job.organization}
                  </div>
                </div>

                <div className="text-right sm:shrink-0 bg-surface-container-low px-3 py-1.5 rounded-lg border border-surface-container">
                  <div className="text-xs font-semibold text-rose-700">Last Date</div>
                  <div className="text-sm font-bold text-primary">{job.lastDate}</div>
                </div>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-surface-container-low/50 p-3 rounded-lg border border-surface-container">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Total Vacancies:</span>
                  <span className="font-bold text-primary text-sm">
                    {job.totalVacancies.toLocaleString()} Posts
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Qualification:</span>
                  <span className="font-medium text-on-surface line-clamp-1">
                    {job.qualificationSummary}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Age Limit:</span>
                  <span className="font-medium text-on-surface">{job.ageLimitSummary}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-container">
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Official Gazette Verified</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={job.officialPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                    <span>Notice PDF</span>
                  </a>
                  <Link
                    to={`/job/${job.id}`}
                    onClick={() => onSelectJob(job)}
                    className="px-4 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded text-xs font-bold transition-colors shadow-xs inline-flex items-center no-underline"
                  >
                    View Details & Apply →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
