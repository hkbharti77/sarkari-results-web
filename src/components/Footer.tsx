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
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Col 1: About */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container font-extrabold flex items-center justify-center text-sm">
              BR
            </div>
            <span className="font-bold text-lg text-on-primary">BharatRojgar</span>
          </div>
          <p className="text-xs text-on-primary-container leading-relaxed">
            India's fast, mobile-friendly government recruitment directory. Built to eliminate deceptive ads and provide direct, verified links to official notifications.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-secondary-fixed">
            <span className="material-symbols-outlined text-[16px]">security</span>
            <span>Zero Data Collection • Free Public Service</span>
          </div>
        </div>

        {/* Col 2: Top Central Commissions */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            Central Commissions
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><a href="https://upsc.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">UPSC (Union Public Service Commission)</a></li>
            <li><a href="https://ssc.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">SSC (Staff Selection Commission)</a></li>
            <li><a href="https://rrbcdg.gov.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">RRB (Railway Recruitment Control Board)</a></li>
            <li><a href="https://ibps.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">IBPS (Banking Personnel Selection)</a></li>
            <li><a href="https://nta.ac.in" target="_blank" rel="noreferrer" className="hover:text-on-primary">NTA (National Testing Agency)</a></li>
          </ul>
        </div>

        {/* Col 3: State Recruitment Hubs */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            State Recruitment Hubs
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><Link to="/state-jobs?state=UP" className="hover:text-on-primary">Uttar Pradesh (UPPSC / UPSSSC / UPPRPB)</Link></li>
            <li><Link to="/state-jobs?state=BIHAR" className="hover:text-on-primary">Bihar (BPSC / BSSC / CSBC)</Link></li>
            <li><Link to="/state-jobs?state=RAJASTHAN" className="hover:text-on-primary">Rajasthan (RPSC / RSMSSB)</Link></li>
            <li><Link to="/state-jobs?state=MP" className="hover:text-on-primary">Madhya Pradesh (MPPSC / MPESB)</Link></li>
            <li><Link to="/state-jobs?state=UP" className="hover:text-on-primary">Delhi NCR (DSSSB)</Link></li>
          </ul>
        </div>

        {/* Col 4: Quick Resources */}
        <div className="space-y-3">
          <h4 className="font-bold text-secondary-container text-xs uppercase tracking-wider">
            Quick Tools & Help
          </h4>
          <ul className="space-y-2 text-xs text-on-primary-container">
            <li><Link to="/eligibility-calculator" className="hover:text-on-primary">Age Limit & Eligibility Calculator</Link></li>
            <li><Link to="/answer-keys" className="hover:text-on-primary">Official Objection & Answer Key Links</Link></li>
            <li><Link to="/latest-jobs" className="hover:text-on-primary">Syllabus & Exam Pattern PDFs</Link></li>
            <li><Link to="/" className="hover:text-on-primary">Terms of Use & Copyright Disclaimer</Link></li>
            <li><Link to="/latest-jobs" className="hover:text-on-primary">Report an Inaccurate Link / Correction</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-primary-container/80 bg-primary-container/40 py-4 px-4 text-center text-[11px] text-on-primary-container">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2025 BharatRojgar. Built for Indian Government Job Aspirants. All rights reserved.</span>
          <span className="text-[10px] text-secondary-fixed">
            Compliant with PRD 2.0 & GovJob Verification Specs
          </span>
        </div>
      </div>
    </footer>
  );
};
