import React from 'react';
import { Link } from '../router/Link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-on-primary mt-12 border-t-4 border-secondary-container">
      {/* Top Disclaimer Band */}
      <div className="bg-primary-container px-4 py-4 text-xs border-b border-primary-fixed-dim/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-on-primary-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">
              verified
            </span>
            <span className="font-semibold text-on-primary">
              100% Human-Verified Public Recruitment Records
            </span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-3xl">
            BharatRojgar is an informational repository indexing official gazettes, press releases, and notifications published by Central and State Public Service Commissions, Staff Selection Commissions, and Railway Recruitment Boards. We do not process application forms or collect applicant fees.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
        {/* Col 1: About */}
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container font-extrabold flex items-center justify-center text-sm">
              BR
            </div>
            <span className="font-bold text-lg text-on-primary">BharatRojgar</span>
          </div>
          <p className="text-xs text-on-primary-container leading-relaxed">
            India&apos;s fast, mobile-friendly government recruitment directory. Built to eliminate deceptive ads and provide direct, verified links to official notifications.
          </p>
          <div className="pt-1 flex flex-col gap-1 text-[11px] text-secondary-fixed">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[15px]">security</span>
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <span className="text-on-primary-container/80 text-[10px]">
              Zero personal document harvesting • Free public service
            </span>
          </div>
        </div>

        {/* Col 2: Top Central Commissions */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            Central Commissions
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><a href="https://upsc.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">UPSC (Civil Services &amp; NDA)</a></li>
            <li><a href="https://ssc.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">SSC (CGL, CHSL, MTS, GD)</a></li>
            <li><a href="https://rrbcdg.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">RRB (Railways NTPC &amp; Group D)</a></li>
            <li><a href="https://ibps.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">IBPS (PO, Clerk, SO)</a></li>
            <li><a href="https://nta.ac.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">NTA (Exam Testing Agency)</a></li>
          </ul>
        </div>

        {/* Col 3: State Recruitment Hubs */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            State Recruitment Hubs
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><Link to="/state-jobs?state=UP" className="hover:text-on-primary">Uttar Pradesh (UPPSC / UPSSSC)</Link></li>
            <li><Link to="/state-jobs?state=BIHAR" className="hover:text-on-primary">Bihar (BPSC / BSSC / CSBC)</Link></li>
            <li><Link to="/state-jobs?state=RAJASTHAN" className="hover:text-on-primary">Rajasthan (RPSC / RSMSSB)</Link></li>
            <li><Link to="/state-jobs?state=MP" className="hover:text-on-primary">Madhya Pradesh (MPPSC / MPESB)</Link></li>
            <li><Link to="/state-jobs?state=DELHI" className="hover:text-on-primary">Delhi NCR (DSSSB)</Link></li>
          </ul>
        </div>

        {/* Col 4: Candidate Tools */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            Candidate Tools
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><Link to="/eligibility-calculator" className="hover:text-on-primary">Age Limit &amp; Eligibility Tool</Link></li>
            <li><Link to="/answer-keys" className="hover:text-on-primary">Answer Keys &amp; Objections</Link></li>
            <li><Link to="/admit-cards" className="hover:text-on-primary">Admit Card Downloads</Link></li>
            <li><Link to="/results" className="hover:text-on-primary">Merit Lists &amp; Cutoff Scores</Link></li>
            <li><Link to="/central-jobs" className="hover:text-on-primary">Central Govt Recruitment</Link></li>
          </ul>
        </div>

        {/* Col 5: Legal & DPDPA Compliance */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            <span>Legal &amp; Grievance</span>
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li>
              <Link to="/privacy" className="hover:text-on-primary font-medium flex items-center gap-1 text-secondary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Privacy Policy (DPDPA 2023)</span>
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-on-primary">
                Terms &amp; Conditions of Use
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-on-primary">
                Contact &amp; Helpdesk
              </Link>
            </li>
            <li>
              <Link to="/contact?type=dpdp" className="hover:text-on-primary">
                Data Principal Rights Request
              </Link>
            </li>
            <li>
              <Link to="/contact?type=correction" className="hover:text-on-primary">
                Report Inaccurate Link / Bug
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice & Compliance Strip */}
      <div className="border-t border-primary-container/80 bg-primary-container/40 py-4 px-4 text-[11px] text-on-primary-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <div>© 2025 BharatRojgar. Independent Public Information Repository. All rights reserved.</div>
            <div className="text-[10px] text-on-primary-container/80">
              Not affiliated with UPSC, SSC, or Central/State Ministries. Verify official notices on <code className="text-secondary-fixed">.gov.in</code> domains.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <Link to="/privacy" className="hover:text-on-primary underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-on-primary underline">Terms of Use</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-on-primary underline">Grievance Officer (DPO)</Link>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-extrabold text-[10px]">
              DPDP Act 2023 Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
