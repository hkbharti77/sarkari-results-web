import React, { useState } from 'react';
import { JobPosting, QuickLinkItem } from '../types/job';
import { MOCK_ADMIT_CARDS, MOCK_RESULTS } from '../data/mockJobs';
import { Link } from '../router/Link';

import { BackendHomeSummary } from '../services/publicApi';

interface HomePageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
  onNavigateTab: (tab: string) => void;
  summary?: BackendHomeSummary;
  admitCards?: QuickLinkItem[];
  results?: QuickLinkItem[];
  isLive?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  jobs,
  onSelectJob,
  onNavigateTab,
  summary,
  admitCards,
  results,
  isLive = false,
}) => {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommission, setSelectedCommission] = useState('');

  const activeJobs = jobs.filter((j) => j.status === 'ACTIVE' || j.status === 'NEW');
  // When API is live: only show live admit cards and results (empty array if 0). Never mock data!
  const displayedAdmitCards = isLive
    ? (admitCards ?? [])
    : (admitCards && admitCards.length > 0 ? admitCards : MOCK_ADMIT_CARDS);

  const displayedResults = isLive
    ? (results ?? [])
    : (results && results.length > 0 ? results : MOCK_RESULTS);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeywords.trim()) params.set('q', searchKeywords.trim());
    if (selectedQualification) params.set('qualification', selectedQualification);
    if (selectedRegion) params.set('state', selectedRegion);
    if (selectedCommission) params.set('category', selectedCommission.toUpperCase());
    const query = params.toString();
    onNavigateTab(`latest-jobs${query ? `?${query}` : ''}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. STATS & PUBLIC NOTICE BANNER */}
      <section className="w-full bg-surface-container-low rounded-xl p-4 shadow-xs border border-surface-container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">policy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-primary">Public Recruitment Repository</h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded">
                  100% VERIFIED
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Real-time indexed gazettes from 42 Central & State Recruitment Commissions. Daily 06:00 AM bulletin updated.
              </p>
            </div>
          </div>

          {/* Key Counters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-xs border border-surface-container flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <div>
                <div className="text-base font-extrabold text-primary">
                  {isLive ? (summary?.totalVacancies?.toLocaleString('en-IN') ?? '0') : (summary?.totalVacancies ? `${summary.totalVacancies.toLocaleString('en-IN')}+` : '42,850+')}
                </div>
                <div className="text-[11px] font-medium text-on-surface-variant">Active Vacancies</div>
              </div>
            </div>
            <div className="bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-xs border border-surface-container flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-700 text-[20px]">
                assignment_turned_in
              </span>
              <div>
                <div className="text-base font-extrabold text-primary">
                  {isLive ? `${summary?.admitCardsToday ?? 0} New` : (summary?.admitCardsToday !== undefined ? `${summary.admitCardsToday} New` : '14 New')}
                </div>
                <div className="text-[11px] font-medium text-on-surface-variant">Admit Cards Today</div>
              </div>
            </div>
            <div className="bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-xs border border-surface-container flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">
                workspace_premium
              </span>
              <div>
                <div className="text-base font-extrabold text-primary">
                  {isLive ? `${summary?.resultsPast24h ?? 0} Results` : (summary?.resultsPast24h !== undefined ? `${summary.resultsPast24h} Results` : '8 Results')}
                </div>
                <div className="text-[11px] font-medium text-on-surface-variant">Declared Past 24h</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. ADVANCED SEARCH & DISCOVERY COMPONENT */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-4 lg:p-5 shadow-xs border border-surface-container space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              <span>Filter Government Vacancies by Qualification & Region</span>
            </h2>
            <p className="text-xs text-on-surface-variant">
              Locate vacancies meeting your eligibility across central ministries and state commissions.
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Zero Fake Postings Guarantee</span>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Keyword Input */}
          <div className="lg:col-span-4 bg-surface-container-low rounded-lg px-3 py-2 flex items-center gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider leading-none mb-1">
                Keyword / Role
              </label>
              <input
                type="text"
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
                placeholder="e.g. Constable, Inspector, Typist, Clerk..."
                className="w-full bg-transparent text-xs text-on-surface focus:outline-none placeholder:text-outline"
              />
            </div>
          </div>

          {/* Qualification Dropdown */}
          <div className="lg:col-span-2 bg-surface-container-low rounded-lg px-3 py-2 flex items-center gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[18px]">school</span>
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider leading-none mb-1">
                Qualification
              </label>
              <select
                value={selectedQualification}
                onChange={(e) => setSelectedQualification(e.target.value)}
                className="w-full bg-transparent text-xs text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="">Any Qualification</option>
                <option value="10th">10th / Matric</option>
                <option value="12th">12th / Intermediate</option>
                <option value="grad">Graduate (Any Stream)</option>
                <option value="eng">B.E. / B.Tech</option>
                <option value="dip">Diploma / ITI</option>
                <option value="pg">Post Graduate</option>
              </select>
            </div>
          </div>

          {/* State / Region */}
          <div className="lg:col-span-2 bg-surface-container-low rounded-lg px-3 py-2 flex items-center gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[18px]">map</span>
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider leading-none mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-transparent text-xs text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="">All India (Central)</option>
                <option value="up">Uttar Pradesh</option>
                <option value="br">Bihar</option>
                <option value="rj">Rajasthan</option>
                <option value="mp">Madhya Pradesh</option>
                <option value="dl">Delhi NCR</option>
              </select>
            </div>
          </div>

          {/* Commission */}
          <div className="lg:col-span-2 bg-surface-container-low rounded-lg px-3 py-2 flex items-center gap-2 border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[18px]">corporate_fare</span>
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider leading-none mb-1">
                Commission
              </label>
              <select
                value={selectedCommission}
                onChange={(e) => setSelectedCommission(e.target.value)}
                className="w-full bg-transparent text-xs text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="">All Commissions</option>
                <option value="ssc">SSC</option>
                <option value="upsc">UPSC</option>
                <option value="rrb">Railway RRB</option>
                <option value="ibps">Banking (IBPS/SBI)</option>
                <option value="police">Defence & Police</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex items-stretch">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 px-3 py-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">travel_explore</span>
              <span>Search 42k+ Posts</span>
            </button>
          </div>
        </form>

        {/* Quick Pill Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase shrink-0">
            Popular Tiers:
          </span>
          {[
            { label: '🎓 10th Pass Jobs', count: '14.2k' },
            { label: '📜 12th Pass Jobs', count: '9.8k' },
            { label: '🎓 Graduate Jobs', count: '18.4k' },
            { label: '👮 Police & Paramilitary' },
            { label: '🚆 Railway RRB' },
            { label: '🏦 Bank PO & Clerk' },
            { label: '⚔️ Defence & CDS' },
          ].map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigateTab('latest-jobs')}
              className="px-3 py-1 bg-surface-container hover:bg-surface-container-high rounded text-xs font-semibold text-primary whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{pill.label}</span>
              {pill.count && (
                <span className="px-1.5 py-0.2 bg-surface-container-lowest rounded text-[10px] font-bold text-slate-700">
                  {pill.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. URGENT DEADLINES COUNTDOWN RIBBON */}
      <section className="w-full bg-secondary-fixed text-on-secondary-fixed rounded-xl p-4 shadow-xs border border-secondary-fixed-dim/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px] animate-pulse">timer</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-secondary-fixed">
                Registration Window Closing Soon
              </h2>
              <p className="text-xs text-on-secondary-fixed-variant">
                Applications terminate on midnight strictly as per official commission server time.
              </p>
            </div>
          </div>

          {/* Urgent Post Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-xs flex flex-col justify-between border border-surface-container">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                  18 hrs left
                </span>
                <span className="text-[11px] text-on-surface-variant">Railway RRB</span>
              </div>
              <div className="text-xs font-bold text-primary truncate">Eastern Railway 4,103 Posts</div>
              <Link
                to="/latest-jobs?category=Railway"
                className="mt-2 text-right text-[11px] text-amber-800 font-bold hover:underline flex items-center justify-end gap-0.5"
              >
                Apply Now <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-xs flex flex-col justify-between border border-surface-container">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  2 days left
                </span>
                <span className="text-[11px] text-on-surface-variant">RSMSSB</span>
              </div>
              <div className="text-xs font-bold text-primary truncate">Rajasthan CET Graduate Level</div>
              <Link
                to="/latest-jobs?state=Rajasthan"
                className="mt-2 text-right text-[11px] text-amber-800 font-bold hover:underline flex items-center justify-end gap-0.5"
              >
                Apply Now <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="bg-surface-container-lowest p-2.5 rounded-lg shadow-xs flex flex-col justify-between border border-surface-container">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  3 days left
                </span>
                <span className="text-[11px] text-on-surface-variant">MoD Defence</span>
              </div>
              <div className="text-xs font-bold text-primary truncate">Indian Navy SSR / MR Agniveer</div>
              <Link
                to="/latest-jobs?category=Defence"
                className="mt-2 text-right text-[11px] text-amber-800 font-bold hover:underline flex items-center justify-end gap-0.5"
              >
                Apply Now <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE FAMOUS 3-COLUMN SARKARI RECRUITMENT GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* COLUMN 1: LATEST RECRUITMENT NOTIFICATIONS */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container flex flex-col">
          <div className="bg-primary text-on-primary px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary-container">
                work
              </span>
              <h2 className="font-bold text-sm">Latest Jobs 2025</h2>
            </div>
            <Link
              to="/latest-jobs"
              className="text-[11px] font-semibold text-secondary-container hover:underline"
            >
              View All ({jobs.length})
            </Link>
          </div>

          <div className="divide-y divide-surface-container p-2 flex-1">
            {activeJobs.length === 0 ? (
              <div className="p-8 text-center text-xs text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-[32px] text-outline">search_off</span>
                <p className="font-bold text-primary text-sm">No Active Notices Today</p>
                <p className="text-[11px] text-on-surface-variant">
                  Central & state gazettes update daily at 06:00 AM IST. Check back soon.
                </p>
              </div>
            ) : (
              activeJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/job/${job.id}`}
                  onClick={() => onSelectJob(job)}
                  className="block p-3 hover:bg-surface-container-low/60 rounded-lg cursor-pointer transition-colors space-y-1.5 text-inherit no-underline"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-primary hover:underline line-clamp-2">
                      {job.shortTitle}
                    </span>
                    {job.status === 'NEW' && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded shrink-0">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>{job.organization}</span>
                    <span className="font-semibold text-rose-700">Last: {job.lastDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">{job.totalVacancies.toLocaleString()} Posts</span>
                    <span className="text-primary font-semibold hover:text-primary-container flex items-center gap-0.5">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-3 border-t border-surface-container bg-surface-container-low/40 rounded-b-xl text-center">
            <Link
              to="/latest-jobs"
              className="text-xs font-bold text-primary hover:underline"
            >
              Browse All Central & State Vacancies →
            </Link>
          </div>
        </div>

        {/* COLUMN 2: ADMIT CARDS & HALL TICKETS */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container flex flex-col">
          <div className="bg-primary text-on-primary px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary-container">
                badge
              </span>
              <h2 className="font-bold text-sm">Admit Cards</h2>
            </div>
            <Link
              to="/admit-cards"
              className="text-[11px] font-semibold text-secondary-container hover:underline"
            >
              View Hub
            </Link>
          </div>

          <div className="divide-y divide-surface-container p-2 flex-1">
            {displayedAdmitCards.length === 0 ? (
              <div className="p-8 text-center text-xs text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-[32px] text-outline">badge</span>
                <p className="font-bold text-primary text-sm">No New Hall Tickets</p>
                <p className="text-[11px] text-on-surface-variant">
                  Exam entry passes and city intimation slips are published upon commission release.
                </p>
              </div>
            ) : (
              displayedAdmitCards.map((item: QuickLinkItem) => (
                <Link
                  key={item.id}
                  to={item.linkTo || '/admit-cards'}
                  className="block p-3 hover:bg-surface-container-low/60 rounded-lg cursor-pointer transition-colors space-y-1.5 text-inherit no-underline"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-primary hover:underline line-clamp-2">
                      {item.title}
                    </span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>{item.org}</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    Direct Download Link
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-3 border-t border-surface-container bg-surface-container-low/40 rounded-b-xl text-center">
            <Link
              to="/admit-cards"
              className="text-xs font-bold text-primary hover:underline"
            >
              Search All Exam City & Hall Tickets →
            </Link>
          </div>
        </div>

        {/* COLUMN 3: RESULTS & MERIT LISTS */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container flex flex-col">
          <div className="bg-primary text-on-primary px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary-container">
                emoji_events
              </span>
              <h2 className="font-bold text-sm">Exam Results</h2>
            </div>
            <Link
              to="/results"
              className="text-[11px] font-semibold text-secondary-container hover:underline"
            >
              View Hub
            </Link>
          </div>

          <div className="divide-y divide-surface-container p-2 flex-1">
            {displayedResults.length === 0 ? (
              <div className="p-8 text-center text-xs text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-[32px] text-outline">emoji_events</span>
                <p className="font-bold text-primary text-sm">No Results Declared Today</p>
                <p className="text-[11px] text-on-surface-variant">
                  Official merit lists and cut-off scorecards are published upon declaration.
                </p>
              </div>
            ) : (
              displayedResults.map((item: QuickLinkItem) => (
                <Link
                  key={item.id}
                  to={item.linkTo || '/results'}
                  className="block p-3 hover:bg-surface-container-low/60 rounded-lg cursor-pointer transition-colors space-y-1.5 text-inherit no-underline"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-xs text-primary hover:underline line-clamp-2">
                      {item.title}
                    </span>
                    <span className="px-1.5 py-0.5 bg-rose-100 text-rose-800 text-[9px] font-bold rounded shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>{item.org}</span>
                    <span className="text-slate-500">{item.date}</span>
                  </div>
                  <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">table_chart</span>
                    Check Score & Cutoff PDF
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-3 border-t border-surface-container bg-surface-container-low/40 rounded-b-xl text-center">
            <Link
              to="/results"
              className="text-xs font-bold text-primary hover:underline"
            >
              View All Declared Government Results →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 8-BOX OFFICIAL NOTIFICATION FEED & DIRECT LINKS */}
      <section className="w-full space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-primary flex items-center gap-2">
              <span>Official Notification Feed & Direct Links</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            </h2>
            <p className="text-xs text-on-surface-variant">
              Categorized instant links directly to government hostings, gazettes, and response servers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Answer Keys */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">key</span>
                </div>
                <h3 className="font-bold text-xs text-primary">Answer Keys</h3>
              </div>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">LIVE</span>
            </div>
            <ul className="text-xs space-y-2">
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">SSC CHSL Tier-I Final Key</div>
                <div className="text-[11px] text-on-surface-variant">Response Sheet & Objections</div>
              </li>
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">UPSC NDA & NA Exam Answer Key</div>
                <div className="text-[11px] text-on-surface-variant">Paper 1 (Maths) & Paper 2 (GAT)</div>
              </li>
            </ul>
          </div>

          {/* Card 2: Syllabus & Pattern */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                </div>
                <h3 className="font-bold text-xs text-primary">Syllabus & Pattern</h3>
              </div>
              <span className="px-1.5 py-0.5 bg-surface-container text-primary text-[10px] font-bold rounded">PDF</span>
            </div>
            <ul className="text-xs space-y-2">
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">Railway RRB Technician Syllabus</div>
                <div className="text-[11px] text-on-surface-variant">Grade 1 & Grade 3 Topic List</div>
              </li>
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">UP Police Sub-Inspector Scheme</div>
                <div className="text-[11px] text-on-surface-variant">400 Marks Detailed Syllabus</div>
              </li>
            </ul>
          </div>

          {/* Card 3: Admissions & CET */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                </div>
                <h3 className="font-bold text-xs text-primary">Admissions</h3>
              </div>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">ACTIVE</span>
            </div>
            <ul className="text-xs space-y-2">
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">NTA CUET UG / PG 2025</div>
                <div className="text-[11px] text-on-surface-variant">Central University Entrance</div>
              </li>
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">IIT JEE Advanced 2025 Form</div>
                <div className="text-[11px] text-on-surface-variant">Registration & Information Brochure</div>
              </li>
            </ul>
          </div>

          {/* Card 4: Document Verification & Medical */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                </div>
                <h3 className="font-bold text-xs text-primary">Verification & DV</h3>
              </div>
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">SCHEDULE</span>
            </div>
            <ul className="text-xs space-y-2">
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">SSC CGL 2024 User Dept DV</div>
                <div className="text-[11px] text-on-surface-variant">Document Verification Schedule</div>
              </li>
              <li className="bg-surface-container-low p-2 rounded-lg hover:bg-surface-container cursor-pointer">
                <div className="font-semibold text-primary truncate">IBPS PO Interview Call Letter</div>
                <div className="text-[11px] text-on-surface-variant">Attestation Form Download</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. STATE GOVERNMENT RECRUITMENT HUBS */}
      <section className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-surface-container space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-primary">State Government Jobs Directory</h3>
            <p className="text-xs text-on-surface-variant">
              Dedicated portals covering UP, Bihar, Rajasthan, MP, Haryana, Delhi, and other state commissions.
            </p>
          </div>
          <Link
            to="/state-jobs"
            className="text-xs font-bold text-primary hover:underline"
          >
            Explore All States →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'Uttar Pradesh', code: 'UP', count: '14,200+ Posts', boards: 'UPPSC, UPSSSC, UPPRPB' },
            { name: 'Bihar', code: 'BIHAR', count: '8,450+ Posts', boards: 'BPSC, BSSC, CSBC' },
            { name: 'Rajasthan', code: 'RAJASTHAN', count: '34,000+ Posts', boards: 'RPSC, RSMSSB' },
            { name: 'Madhya Pradesh', code: 'MP', count: '6,100+ Posts', boards: 'MPPSC, MPESB' },
            { name: 'Delhi NCR', code: 'UP', count: '3,800+ Posts', boards: 'DSSSB' },
            { name: 'Haryana', code: 'UP', count: '5,200+ Posts', boards: 'HPSC, HSSC' },
          ].map((state) => (
            <Link
              key={state.name}
              to={`/state-jobs?state=${state.code}`}
              className="block p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors border border-surface-container space-y-1 text-center text-inherit no-underline"
            >
              <div className="font-bold text-xs text-primary">{state.name}</div>
              <div className="text-[11px] font-semibold text-emerald-700">{state.count}</div>
              <div className="text-[10px] text-on-surface-variant truncate">{state.boards}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
