import React, { useState } from 'react';
import { JobPosting } from '../types/job';
import { Link } from '../router/Link';

interface JobDetailPageProps {
  job: JobPosting;
  onBack: () => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onBack }) => {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="space-y-6">
      {/* BREADCRUMB & BACK NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to All Jobs</span>
        </button>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/latest-jobs?category=${encodeURIComponent(job.category)}`} className="hover:text-primary transition-colors">
            {job.category}
          </Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-xs">{job.shortTitle}</span>
        </div>
      </div>

      {/* TOP HERO CARD */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-xs font-bold">
            {job.category}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-surface-container text-primary text-xs font-semibold">
            {job.state}
          </span>
          <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Official Notification Verified
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary leading-tight">
            {job.title}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
            <strong>Recruiting Authority:</strong> {job.organization}
            {job.department ? ` (${job.department})` : ''}
          </p>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-lg border border-surface-container text-xs">
          <div>
            <span className="text-on-surface-variant block text-[11px]">Total Vacancies</span>
            <span className="font-extrabold text-primary text-base">
              {job.totalVacancies.toLocaleString()} Posts
            </span>
          </div>
          <div>
            <span className="text-on-surface-variant block text-[11px]">Application Deadline</span>
            <span className="font-bold text-rose-700 text-sm">{job.lastDate}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block text-[11px]">Pay Scale / Salary</span>
            <span className="font-semibold text-primary">{job.salary}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block text-[11px]">Exam Schedule</span>
            <span className="font-semibold text-on-surface">
              {job.examDate || 'Will be announced soon'}
            </span>
          </div>
        </div>

        {/* PRIMARY OFFICIAL ACTIONS */}
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="font-bold text-sm text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-amber-700">link</span>
              <span>Official Recruitment Portal Direct Links</span>
            </div>
            <p className="text-xs text-amber-800">
              BharatRojgar directs applicants directly to the government source. Never pay money on third-party websites.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={job.officialPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-xs rounded-lg border border-outline-variant flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-rose-700">picture_as_pdf</span>
              <span>Download Notice PDF</span>
            </a>
            <a
              href={job.applyOnlineUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span>Apply Online (Official)</span>
            </a>
          </div>
        </div>
      </div>

      {/* DATES & FEES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMPORTANT DATES TABLE */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-surface-container pb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
            <h2 className="font-bold text-sm text-primary">Important Dates Timeline</h2>
          </div>

          <div className="divide-y divide-surface-container">
            {job.importantDates.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-on-surface font-medium">{item.event}</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded ${item.isPast
                      ? 'bg-surface-container text-on-surface-variant'
                      : item.date.toLowerCase().includes('soon') ||
                        item.date.toLowerCase().includes('schedule')
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                        : 'bg-emerald-50 text-emerald-800 font-bold'
                    }`}
                >
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATION FEES TABLE */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-surface-container pb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
            <h2 className="font-bold text-sm text-primary">Application Fee Structure</h2>
          </div>

          <div className="divide-y divide-surface-container text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-on-surface font-medium">General / EWS / OBC</span>
              <span className="font-bold text-primary">₹{job.fees.general}/-</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-on-surface font-medium">SC / ST / PwD Candidates</span>
              <span className="font-bold text-emerald-700">
                {job.fees.scSt === 0 ? 'Exempted (₹0)' : `₹${job.fees.scSt}/-`}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-on-surface font-medium">Female Candidates (All Categories)</span>
              <span className="font-bold text-emerald-700">
                {job.fees.female === 0 ? 'Exempted (₹0)' : `₹${job.fees.female}/-`}
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-on-surface font-medium">Payment Mode</span>
              <span className="text-on-surface-variant text-[11px] font-medium text-right">
                {job.fees.paymentMode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RECRUITMENT OVERVIEW & JOB DESCRIPTION */}
      {job.description && (
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-surface-container pb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
            <h2 className="font-bold text-sm text-primary">Recruitment Overview & Role Description</h2>
          </div>

          <div className="text-xs text-on-surface leading-relaxed">
            <p className="bg-surface-container-low p-4 rounded-lg border border-surface-container whitespace-pre-line text-on-surface">
              {job.description}
            </p>
          </div>
        </div>
      )}

      {/* ELIGIBILITY & AGE LIMIT */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-surface-container pb-2">
          <span className="material-symbols-outlined text-primary text-[20px]">school</span>
          <h2 className="font-bold text-sm text-primary">Eligibility & Age Limit Requirements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-surface-container-low p-4 rounded-lg space-y-1 border border-surface-container">
            <div className="font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Educational Qualification</span>
            </div>
            <p className="text-on-surface leading-relaxed">{job.qualificationSummary}</p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-lg space-y-1 border border-surface-container">
            <div className="font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>Age Calculation & Limit</span>
            </div>
            <p className="text-on-surface leading-relaxed">{job.ageLimitSummary}</p>
            <p className="text-[11px] text-on-surface-variant">
              * Age relaxation applicable for OBC (3 years), SC/ST (5 years), PwD (10 years) per govt rules.
            </p>
          </div>
        </div>
      </div>

      {/* VACANCY BREAKDOWN TABLE */}
      {job.breakdown.length > 0 && (
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-surface-container pb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">format_list_bulleted</span>
            <h2 className="font-bold text-sm text-primary">Post-Wise Vacancy & Qualification Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-surface-container">
              <thead className="bg-surface-container-low text-primary uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3 border-b border-surface-container">Post Name / Designation</th>
                  <th className="p-3 border-b border-surface-container">Total Vacancies</th>
                  <th className="p-3 border-b border-surface-container">Required Qualification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {job.breakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40">
                    <td className="p-3 font-semibold text-primary">{row.postName}</td>
                    <td className="p-3 font-bold text-emerald-800">{row.vacancies}</td>
                    <td className="p-3 text-on-surface">{row.qualification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SELECTION PROCESS */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-surface-container pb-2">
          <span className="material-symbols-outlined text-primary text-[20px]">stairs</span>
          <h2 className="font-bold text-sm text-primary">Selection Process & Exam Scheme</h2>
        </div>

        <ul className="space-y-2 text-xs">
          {job.selectionStages.map((stage, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-on-surface font-medium">{stage}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CANDIDATE FAQs ACCORDION */}
      {job.faqs && job.faqs.length > 0 && (
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-surface-container pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">help_outline</span>
              <h2 className="font-bold text-sm text-primary">Frequently Asked Questions (Recruitment FAQs)</h2>
            </div>
            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              {job.faqs.length} FAQs
            </span>
          </div>

          <div className="space-y-2.5">
            {job.faqs.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-surface-container overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3.5 bg-surface-container-low hover:bg-surface-container flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <span className="font-bold text-xs text-primary">{faq.question}</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 transition-transform duration-200">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-3.5 bg-surface-container-lowest border-t border-surface-container text-xs text-on-surface leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          A
                        </span>
                        <p className="flex-1 text-on-surface font-normal whitespace-pre-line">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VERIFIED LINKS FOOTER BOX */}
      <div className="bg-surface-container-low p-6 rounded-xl border-2 border-primary-container space-y-4">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-primary">
            Official Commission Links for {job.shortTitle}
          </h3>
          <p className="text-xs text-on-surface-variant">
            All candidates are advised to read the full official gazette notification before submitting the application form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={job.applyOnlineUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-primary text-on-primary text-center font-bold text-xs hover:bg-primary-container transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Apply Online Portal</span>
          </a>
          <a
            href={job.officialPdfUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-surface-container-lowest text-primary text-center font-bold text-xs hover:bg-surface-container transition-colors border border-outline-variant flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-rose-700">picture_as_pdf</span>
            <span>Download Official Notification</span>
          </a>
          <a
            href={job.officialSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-lg bg-surface-container-lowest text-primary text-center font-bold text-xs hover:bg-surface-container transition-colors border border-outline-variant flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">public</span>
            <span>Official Commission Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};
