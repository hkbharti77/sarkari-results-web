import React from 'react';
import { Link } from '../router/Link';

export const TermsPage: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Terms and Conditions of Use</span>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              Legal Agreement
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-semibold">
              IT Act 2000 &amp; Intermediary Guidelines Compliant
            </span>
            <span className="text-xs text-on-surface-variant font-medium ml-auto">
              Last Updated: November 2025
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            BharatRojgar Terms of Service &amp; User Agreement
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Welcome to <strong>BharatRojgar</strong> (&ldquo;Portal&rdquo;, &ldquo;Website&rdquo;, or &ldquo;We&rdquo;). Please read these Terms and Conditions carefully before browsing our recruitment repository, using our eligibility calculator tools, or accessing public examination updates. By visiting or using this portal, you agree to be legally bound by these Terms in accordance with the <strong>Information Technology Act, 2000</strong> and the <strong>Digital Personal Data Protection Act, 2023</strong>.
          </p>

          {/* Core Disclaimers Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-2 text-amber-900 text-sm">
              <span className="material-symbols-outlined text-amber-700 text-[20px]">
                warning
              </span>
              <span>Crucial Notice for All Government Job Aspirants</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              <strong>BharatRojgar is an INDEPENDENT public information directory.</strong> We are <u>NOT</u> affiliated with, authorized by, sponsored by, or an agency of the Government of India, State Governments, UPSC, SSC, RRB, IBPS, or any recruitment commission. Official gazettes, notifications, and portals hosted on <code className="font-bold">.gov.in</code> or <code className="font-bold">.nic.in</code> domains remain the sole authoritative, legally binding records.
            </p>
          </div>
        </div>
      </div>

      {/* QUICK JUMP NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
        <span className="font-bold text-primary shrink-0 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">toc</span> Jump to:
        </span>
        <button
          onClick={() => scrollTo('term-electronic')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          1. Electronic Record
        </button>
        <button
          onClick={() => scrollTo('term-disclaimer')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          2. Non-Govt Status
        </button>
        <button
          onClick={() => scrollTo('term-accuracy')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          3. Gazette Accuracy
        </button>
        <button
          onClick={() => scrollTo('term-ip')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          4. Copyright &amp; IP
        </button>
        <button
          onClick={() => scrollTo('term-prohibited')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          5. Prohibited Use
        </button>
        <button
          onClick={() => scrollTo('term-liability')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          6. Liability Limit
        </button>
        <button
          onClick={() => scrollTo('term-jurisdiction')}
          className="px-3 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors whitespace-nowrap cursor-pointer font-semibold"
        >
          7. Law &amp; Grievance
        </button>
      </div>

      {/* DETAILED TERMS SECTIONS */}
      <div className="space-y-6">
        {/* SECTION 1 */}
        <section id="term-electronic" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h2 className="text-lg font-bold text-primary">
              Electronic Record &amp; User Acceptance
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            This document is an electronic record generated by a computer system in accordance with the <strong>Information Technology Act, 2000</strong> and applicable rules thereunder. This document does not require physical or digital signatures.
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            By accessing or browsing BharatRojgar, you acknowledge that you have read, understood, and unconditionally agree to be bound by these Terms and Conditions and our DPDP Act 2023 compliant <Link to="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>. If you do not agree with any part of these terms, please discontinue use of this portal.
          </p>
        </section>

        {/* SECTION 2 */}
        <section id="term-disclaimer" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h2 className="text-lg font-bold text-primary">
              Disclaimer of Government Affiliation &amp; Non-Intermediary Role
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            <strong>BharatRojgar is an independent information search and curation portal.</strong>
          </p>
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
            <ul className="list-disc pl-5 space-y-1.5 text-on-surface-variant text-[11px]">
              <li>We are <strong>not affiliated, endorsed, or associated</strong> with the Government of India, State Governments, Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Control Board (RRB), National Testing Agency (NTA), Institute of Banking Personnel Selection (IBPS), or any Central/State Public Sector Undertaking.</li>
              <li>BharatRojgar <strong>does not conduct recruitment examinations</strong>, does not receive job application forms, does not issue admit cards or appointment letters, and does not charge any application or processing fees from candidates.</li>
              <li>All recruitment notices, examination schedules, admit card links, and results published on this portal are compiled from publicly available official gazette releases and official websites for educational, awareness, and public reference purposes.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 3 */}
        <section id="term-accuracy" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h2 className="text-lg font-bold text-primary">
              Accuracy of Information &amp; Candidate Verification Mandate
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            While we exercise rigorous editorial care to ensure that vacancy counts, eligibility criteria, application deadlines, and fee structures match official press releases, inadvertent typographical errors or subsequent official corrigenda may occur.
          </p>
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold block">Candidate Verification Requirement:</span>
            <span className="text-[11px] leading-relaxed block">
              Every applicant is strictly advised to download and review the official notification PDF published by the recruiting authority before submitting an application form or paying any government application fee. In case of any conflict or ambiguity between the summary displayed on BharatRojgar and the official government gazette notification, the official government notification shall always prevail.
            </span>
          </div>
        </section>

        {/* SECTION 4 */}
        <section id="term-ip" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              04
            </span>
            <h2 className="text-lg font-bold text-primary">
              Intellectual Property Rights &amp; Public Domain Gazettes
            </h2>
          </div>
          <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
            <p>
              Official Government notifications, recruitment circulars, syllabi, and public exam bulletins belong to their respective governmental issuing authorities and are in the public domain for citizen dissemination.
            </p>
            <p>
              All proprietary aspects of BharatRojgar—including site architecture, visual design, custom UI components, eligibility calculation algorithms, logos, and compilation indexes—are the exclusive intellectual property of BharatRojgar and protected by Indian copyright and intellectual property laws. Reproduction, mirroring, or unauthorized automated crawling of the website for commercial resale is strictly prohibited.
            </p>
          </div>
        </section>

        {/* SECTION 5 */}
        <section id="term-prohibited" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              05
            </span>
            <h2 className="text-lg font-bold text-primary">
              Acceptable Use &amp; Prohibited Conduct
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            As a user of this portal, you agree not to engage in any of the following prohibited activities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block">No Malicious Traffic / DDoS</span>
              <span className="text-[11px] text-on-surface-variant">Deploying automated bots, scrapers, rate-flooding tools, or actions that degrade portal performance for other candidates.</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block">No Deceptive Impersonation</span>
              <span className="text-[11px] text-on-surface-variant">Falsely claiming to represent BharatRojgar, government commissions, or offering paid appointment services.</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block">No Spam / Abusive Feedback</span>
              <span className="text-[11px] text-on-surface-variant">Submitting offensive, harassing, obscene, or fraudulent information via our contact and correction channels.</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block">No Reverse Engineering</span>
              <span className="text-[11px] text-on-surface-variant">Attempting to decompile, bypass security measures, or probe administrative infrastructure.</span>
            </div>
          </div>
        </section>

        {/* SECTION 6 */}
        <section id="term-liability" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              06
            </span>
            <h2 className="text-lg font-bold text-primary">
              Limitation of Liability &amp; Indemnity
            </h2>
          </div>
          <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
            <p>
              To the fullest extent permitted by applicable Indian law, BharatRojgar and its founders, editors, and technical operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px]">
              <li>Candidate failure to submit job application forms prior to official server cutoffs.</li>
              <li>Changes, postponements, or cancellations of examination schedules made by recruiting commissions.</li>
              <li>Network downtime, transaction failures, or rejected payments on official government third-party gateways.</li>
              <li>Temporary technical unavailability or latency of our free indexing service.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 7 */}
        <section id="term-jurisdiction" className="bg-primary text-on-primary p-6 sm:p-8 rounded-2xl border-2 border-secondary-container shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-container text-[28px]">
              account_balance
            </span>
            <h2 className="text-xl font-bold text-on-primary">
              Governing Law, Jurisdiction &amp; Grievance Redressal
            </h2>
          </div>

          <p className="text-xs text-on-primary-container leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>. In the event of any legal dispute or proceeding arising under or in connection with these terms, the competent courts situated in <strong>New Delhi, India</strong> shall have exclusive jurisdiction.
          </p>

          <div className="p-4 rounded-xl bg-primary-container/80 border border-primary-fixed-dim/30 text-xs space-y-2">
            <div className="font-bold text-secondary-fixed">Statutory Grievance Redressal Mechanism:</div>
            <p className="text-on-primary-container text-[11px] leading-relaxed">
              If you have any questions, legal queries, or wish to report a copyright or information dispute under the Information Technology (Intermediary Guidelines) Rules, 2021, please reach our designated Grievance Officer:
            </p>
            <div className="text-[11px] text-on-primary-container">
              <strong className="text-on-primary">Email:</strong>{' '}
              <a href="mailto:grievance@bharatrojgar.org" className="text-secondary-container underline">
                grievance@bharatrojgar.org
              </a>{' '}
              • <strong className="text-on-primary">Address:</strong> BharatRojgar Digital Services, Connaught Place, New Delhi - 110001
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/privacy"
              className="px-4 py-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container text-xs font-bold transition-colors shadow-xs no-underline"
            >
              Review Privacy Policy (DPDPA 2023)
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-container/60 text-on-primary text-xs font-semibold transition-colors no-underline"
            >
              Contact Support &amp; Grievance
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
