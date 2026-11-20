import React, { useState, useMemo } from 'react';
import { JobPosting, JobCategory } from '../types/job';
import { Link } from '../router/Link';

interface AnswerKeysPageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
}

export const AnswerKeysPage: React.FC<AnswerKeysPageProps> = ({ jobs, onSelectJob }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect jobs that have answer keys released or configured
  const answerKeyJobs = useMemo(() => {
    return jobs.filter((job) => {
      const hasKey =
        job.answerKeyStatus === 'RELEASED' ||
        job.status === 'ACTIVE' ||
        Boolean(job.answerKeyUrl);
      return hasKey;
    });
  }, [jobs]);

  const filtered = useMemo(() => {
    return answerKeyJobs.filter((job) => {
      const matchCat =
        selectedCategory === 'ALL' || job.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.organization.toLowerCase().includes(q) ||
        job.shortTitle.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [answerKeyJobs, selectedCategory, searchQuery]);

  const categories: Array<JobCategory | 'ALL'> = [
    'ALL',
    'SSC',
    'UPSC',
    'Railway',
    'Banking',
    'Defence',
    'State Police',
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#12305A] to-[#1C4478] text-white p-6 sm:p-8 rounded-xl shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-amber-400">key</span>
            <span className="px-2.5 py-0.5 rounded bg-white/10 text-xs font-bold uppercase tracking-wider border border-white/20">
              Official Key & Objection Portal
            </span>
          </div>
          <span className="text-xs text-white/80 font-medium">
            Updated in real-time from official commission gazettes
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Government Examination Answer Keys & Objection Windows
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed">
          Download verified provisional, tentative, and final answer key question papers directly from official boards (SSC, UPSC, RRB, IBPS). Review response sheets and submit candidate objections before prescribed deadlines.
        </p>

        {/* SEARCH BAR & FAST FILTERS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by exam name, commission, or advertisement..."
              className="w-full pl-9 pr-3 py-2 bg-white text-gray-900 placeholder:text-gray-500 text-xs rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-[#12305A]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat === 'ALL' ? 'All Commissions' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STATUTORY OBJECTION NOTICE */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-amber-700 shrink-0 mt-0.5">
            info
          </span>
          <div>
            <strong className="block text-amber-950 font-bold">
              Important Guideline on Raising Answer Key Objections:
            </strong>
            <span>
              Commissions typically allow a 3 to 7-day objection window post release. Objections must be substantiated with recognized reference book citations and the statutory fee (generally ₹50–₹100 per question, refunded if upheld).
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-md bg-amber-200 text-amber-950 font-extrabold text-[11px] shrink-0">
          Official Links Only
        </span>
      </div>

      {/* ANSWER KEYS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Available Answer Keys ({filtered.length})</span>
          </h2>
          <span className="text-xs text-on-surface-variant">
            Showing verified releases
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 text-center rounded-xl border border-surface-container space-y-3">
            <span className="material-symbols-outlined text-[48px] text-outline">key_off</span>
            <h3 className="font-bold text-sm text-primary">No Answer Keys Found</h3>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              No examination answer keys match your active filter. Answer keys are published within 3-10 days of CBT completion.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filtered.map((job) => {
              const directKeyUrl = job.answerKeyUrl || job.officialPdfUrl;
              const directObjectionUrl = job.officialSiteUrl || job.applyOnlineUrl;

              return (
                <div
                  key={job.id}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container hover:border-primary/40 transition-shadow shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-[11px] font-bold">
                        {job.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        Key Active
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        Advt. No: {job.advtNo || job.id.replace(/^DRAFT-/i, '')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-primary leading-snug">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                      <span><strong>Commission:</strong> {job.organization}</span>
                      <span><strong>Vacancies:</strong> {job.totalVacancies.toLocaleString('en-IN')}</span>
                      <span><strong>Exam Date:</strong> {job.examDate || 'Scheduled'}</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                    <a
                      href={directKeyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] text-amber-300">download</span>
                      <span>Download Answer Key PDF</span>
                    </a>

                    <a
                      href={directObjectionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">help_center</span>
                      <span>Objection Portal</span>
                    </a>

                    <Link
                      to={`/job/${job.id}`}
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Details</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
