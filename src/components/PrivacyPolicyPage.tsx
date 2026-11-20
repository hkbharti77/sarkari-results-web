import React from 'react';
import { Link } from '../router/Link';

export const PrivacyPolicyPage: React.FC = () => {
  const scrollToSection = (id: string) => {
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
          <span className="text-primary font-semibold">Privacy Policy (DPDP Act, 2023)</span>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              DPDPA 2023 Compliant Notice
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
              Digital Personal Data Protection Act, 2023 (Act 22 of 2023)
            </span>
            <span className="text-xs text-on-surface-variant font-medium ml-auto">
              Effective Date: November 2025 • Version 2.4
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            BharatRojgar Digital Privacy &amp; Data Protection Policy
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            This Privacy Notice is issued by <strong>BharatRojgar</strong> (&ldquo;Portal&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) in full compliance with the provisions of India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act 2023)</strong> and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>.
          </p>

          {/* Quick Notice Summary Card */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
            <div className="font-bold text-primary flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-secondary-container text-[20px]">
                shield
              </span>
              <span>Executive Data Protection Summary for Indian Citizens &amp; Job Seekers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container">
                <span className="font-bold text-primary block">Zero Aadhaar / Sensitive Collection</span>
                <span className="text-on-surface-variant">We never collect Aadhaar, PAN, caste documents, or application fees.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container">
                <span className="font-bold text-primary block">Full Data Principal Rights</span>
                <span className="text-on-surface-variant">Right to access, correct, erase, and withdraw consent under Sections 11–14.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container">
                <span className="font-bold text-primary block">Protection of Minors</span>
                <span className="text-on-surface-variant">Strict compliance with Section 9: zero profiling, tracking, or ads targeting minors.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container">
                <span className="font-bold text-primary block">Statutory Redressal &amp; DPO</span>
                <span className="text-on-surface-variant">Dedicated Grievance Officer with 7-day SLA and escalation to DPBI.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK JUMP NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
        <span className="font-bold text-primary shrink-0 flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">menu_book</span> Quick Jump:
        </span>
        <button
          onClick={() => scrollToSection('sec-fiduciary')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          1. Data Fiduciary
        </button>
        <button
          onClick={() => scrollToSection('sec-data-collected')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          2. Data Processed
        </button>
        <button
          onClick={() => scrollToSection('sec-purpose-consent')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          3. Notice &amp; Consent
        </button>
        <button
          onClick={() => scrollToSection('sec-principal-rights')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          4. Citizen Rights (Sec 11–14)
        </button>
        <button
          onClick={() => scrollToSection('sec-children')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          5. Children&apos;s Data (Sec 9)
        </button>
        <button
          onClick={() => scrollToSection('sec-security')}
          className="px-3 py-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors whitespace-nowrap cursor-pointer font-medium"
        >
          6. Security &amp; Breach
        </button>
        <button
          onClick={() => scrollToSection('sec-dpo')}
          className="px-3 py-1 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors whitespace-nowrap cursor-pointer font-semibold"
        >
          7. Grievance &amp; DPO
        </button>
      </div>

      {/* DETAILED CONTENT SECTIONS */}
      <div className="space-y-6">
        {/* SECTION 1: DATA FIDUCIARY IDENTIFICATION */}
        <section id="sec-fiduciary" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h2 className="text-lg font-bold text-primary">
              Identity of the Data Fiduciary &amp; Operational Scope
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Under Section 2(i) of the DPDP Act 2023, <strong>BharatRojgar</strong> functions as a <strong>Data Fiduciary</strong> solely with respect to personal data voluntarily furnished by citizens when submitting feedback, reporting broken notification links, or requesting examination notification updates.
          </p>
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container text-xs space-y-1.5 text-on-surface">
            <div className="font-semibold text-primary">Core Operational Classification:</div>
            <ul className="list-disc pl-5 space-y-1 text-on-surface-variant text-[11px]">
              <li>BharatRojgar is an <strong>independent public recruitment directory &amp; indexing service</strong>.</li>
              <li>We aggregate and publish links to official public gazettes and employment circulars released by the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), State Public Service Commissions, and public sector undertakings.</li>
              <li><strong>We are NOT a recruitment board, recruiting agency, or government agency.</strong> We never issue job offers, conduct examinations, or charge candidate application fees.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: CATEGORIES OF DATA PROCESSED */}
        <section id="sec-data-collected" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              02
            </span>
            <h2 className="text-lg font-bold text-primary">
              Personal Data We Collect vs. Data We Never Collect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* What we process */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <span className="material-symbols-outlined text-[20px] text-emerald-700">check_circle</span>
                <span>Personal Data Processed (With Consent Only)</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-emerald-950">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Contact &amp; Grievance Inquiries:</strong> Name, email address, inquiry subject, and message details provided when submitting our public contact form.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Optional Job Alert Subscriptions:</strong> Email address or mobile phone number (solely for dispatching requested recruitment updates, when opted in).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Technical &amp; Security Telemetry:</strong> Anonymized IP addresses, browser user agent strings, and request timestamps used strictly for rate-limiting, DDoS mitigation, and server security.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Accessibility Preferences:</strong> Local browser storage of font size (Normal/Large/XLarge) and interface language (EN/HI).</span>
                </li>
              </ul>
            </div>

            {/* What we NEVER collect */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-900 font-bold">
                <span className="material-symbols-outlined text-[20px] text-rose-700">block</span>
                <span>Data We STRICTLY NEVER Collect or Store</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-rose-950">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>National Identity Identifiers:</strong> We NEVER ask for or store Aadhaar numbers, PAN cards, Voter ID, or Passport records.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Sensitive Certificates:</strong> We NEVER collect caste certificates, income/EWS affidavits, or medical disability documents.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Financial &amp; Payment Data:</strong> Zero bank account details, UPI PINs, credit/debit card numbers, or payment gateway records.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold">•</span>
                  <span><strong>Biometric or Examination Hall Credentials:</strong> Zero biometric thumbprints, iris scans, or candidate commission login passwords.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: LAWFUL BASIS, NOTICE & CONSENT ARCHITECTURE */}
        <section id="sec-purpose-consent" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h2 className="text-lg font-bold text-primary">
              Notice &amp; Lawful Consent Architecture (Sections 5 &amp; 6)
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            In compliance with Section 6 of the DPDP Act 2023, consent obtained by BharatRojgar is:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container font-semibold text-primary">
              Freely Given
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container font-semibold text-primary">
              Specific &amp; Informed
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container font-semibold text-primary">
              Unconditional
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container font-semibold text-primary">
              Unambiguous Affirmative Action
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Whenever personal data is gathered (e.g. submitting a contact ticket or subscribing to exam alerts), a clear itemized notice in plain language is presented accompanying the request. You have the unconditional right to withdraw this consent at any time without negative consequences.
          </p>
        </section>

        {/* SECTION 4: CITIZEN RIGHTS UNDER DPDP ACT */}
        <section id="sec-principal-rights" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              04
            </span>
            <h2 className="text-lg font-bold text-primary">
              Rights of the Data Principal (Sections 11, 12, 13 &amp; 14)
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            As a Data Principal under the DPDP Act 2023, you hold statutory rights regarding any personal data processed by BharatRojgar:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-start gap-3">
              <span className="px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold shrink-0">
                Section 11
              </span>
              <div>
                <h3 className="font-bold text-primary">Right to Access Information About Personal Data</h3>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  You have the right to request a summary of personal data being processed by us, the processing activities undertaken, and the identities of any Data Processors involved.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-start gap-3">
              <span className="px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold shrink-0">
                Section 12
              </span>
              <div>
                <h3 className="font-bold text-primary">Right to Correction, Completion, Updating &amp; Erasure</h3>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  You may request the correction of inaccurate or misleading personal data, completion of incomplete data, or complete erasure of data that is no longer necessary for the purpose for which it was collected.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-start gap-3">
              <span className="px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold shrink-0">
                Section 13
              </span>
              <div>
                <h3 className="font-bold text-primary">Right of Grievance Redressal</h3>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  You have the right to accessible, timely grievance redressal through our designated Grievance Officer. If unsatisfied with the resolution or if no response is received within the statutory period, you have the right to register a complaint with the <strong>Data Protection Board of India (DPBI)</strong>.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-start gap-3">
              <span className="px-2 py-1 rounded bg-primary text-on-primary text-[10px] font-bold shrink-0">
                Section 14
              </span>
              <div>
                <h3 className="font-bold text-primary">Right to Nominate</h3>
                <p className="text-on-surface-variant text-[11px] leading-relaxed mt-0.5">
                  You have the statutory right to nominate another individual who, in the event of your death or incapacity, shall exercise your rights as a Data Principal.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/contact?type=dpdp"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors shadow-xs no-underline flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Submit a Data Principal Request (Sec 11–14)</span>
            </Link>
            <span className="text-[11px] text-on-surface-variant">
              Requests are logged with a verifiable Tracking ID and acknowledged within 24 hours.
            </span>
          </div>
        </section>

        {/* SECTION 5: PROTECTION OF CHILDREN'S DATA */}
        <section id="sec-children" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              05
            </span>
            <h2 className="text-lg font-bold text-primary">
              Protection of Children&apos;s Personal Data (Section 9)
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            In compliance with Section 9 of the DPDP Act 2023:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-on-surface-variant">
            <li>
              BharatRojgar <strong>does NOT engage in tracking, behavioral monitoring, or profiling</strong> of children (individuals under 18 years of age).
            </li>
            <li>
              We <strong>do NOT display targeted advertisements</strong> directed at minors or process any personal data that may cause detrimental effects on the well-being of a child.
            </li>
            <li>
              Where a candidate under 18 years accesses recruitment alerts for defense academies (NDA, Naval Academy) or 10th-pass apprenticeships, only publicly released examination dates and age qualification limits are displayed without harvesting personal records.
            </li>
          </ul>
        </section>

        {/* SECTION 6: SECURITY SAFEGUARDS & DATA BREACH PROTOCOL */}
        <section id="sec-security" className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              06
            </span>
            <h2 className="text-lg font-bold text-primary">
              Security Safeguards &amp; Personal Data Breach Reporting (Section 8(5))
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            We maintain stringent technical, organizational, and physical safeguards to prevent unauthorized access, accidental alteration, or disclosure of digital personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block text-sm">TLS 1.3 / SSL</span>
              <span className="text-[11px] text-on-surface-variant">All transmission encrypted in transit using industry-standard cryptography.</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block text-sm">Zero Persistence</span>
              <span className="text-[11px] text-on-surface-variant">Feedback messages automatically purged within 90 days of inquiry closure.</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container">
              <span className="font-bold text-primary block text-sm">Mandatory Incident Notification</span>
              <span className="text-[11px] text-on-surface-variant">Immediate intimation to the Data Protection Board of India and affected users upon any breach event.</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: OUTBOUND OFFICIAL GOVERNMENT LINKS */}
        <section className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              07
            </span>
            <h2 className="text-lg font-bold text-primary">
              Outbound Government Links &amp; Third-Party Portals
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            BharatRojgar includes direct links to official Central and State government recruitment websites (e.g. <code className="text-primary font-bold">upsc.gov.in</code>, <code className="text-primary font-bold">ssc.gov.in</code>, <code className="text-primary font-bold">rrbcdg.gov.in</code>, <code className="text-primary font-bold">onlinebpsc.bihar.gov.in</code>).
          </p>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <strong>Important Notice:</strong> Once you click an outbound link and leave BharatRojgar, you are governed by the privacy policy and terms of that respective government agency. We encourage candidates to always verify that the address bar displays an authentic <code className="font-bold">.gov.in</code> or <code className="font-bold">.nic.in</code> domain.
          </div>
        </section>

        {/* SECTION 8: DESIGNATED DPO & GRIEVANCE REDRESSAL MECHANISM */}
        <section id="sec-dpo" className="bg-primary text-on-primary p-6 sm:p-8 rounded-2xl border-2 border-secondary-container shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-[28px]">
                support_agent
              </span>
              <h2 className="text-xl font-bold text-on-primary">
                Designated Grievance Redressal Officer &amp; Data Protection Officer (DPO)
              </h2>
            </div>
            <span className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-extrabold">
              DPDP Act 2023 Mandatory Redressal Desk
            </span>
          </div>

          <p className="text-xs text-on-primary-container leading-relaxed">
            In compliance with Section 8(9) and Section 13 of the DPDP Act 2023 and the Information Technology Rules, 2021, the contact credentials of our designated Data Protection Officer are published below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-4 rounded-xl bg-primary-container/80 border border-primary-fixed-dim/30 space-y-2">
              <div className="text-secondary-fixed text-sm font-bold">Officer Profile &amp; Jurisdiction</div>
              <div className="space-y-1 text-on-primary-container text-[11px]">
                <p><strong className="text-on-primary">Name:</strong> Dr. Arvind R. Sharma</p>
                <p><strong className="text-on-primary">Designation:</strong> Chief Grievance Redressal &amp; Data Protection Officer</p>
                <p><strong className="text-on-primary">Physical Office:</strong> BharatRojgar Digital Services, Connaught Place, New Delhi - 110001, India</p>
                <p><strong className="text-on-primary">Working Hours:</strong> Monday through Friday, 09:30 AM to 05:30 PM IST</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary-container/80 border border-primary-fixed-dim/30 space-y-2">
              <div className="text-secondary-fixed text-sm font-bold">Contact &amp; SLA Timelines</div>
              <div className="space-y-1 text-on-primary-container text-[11px]">
                <p><strong className="text-on-primary">Official Email:</strong> <a href="mailto:grievance@bharatrojgar.org" className="text-secondary-container hover:underline">grievance@bharatrojgar.org</a></p>
                <p><strong className="text-on-primary">DPO Direct:</strong> <a href="mailto:dpo@bharatrojgar.org" className="text-secondary-container hover:underline">dpo@bharatrojgar.org</a></p>
                <p><strong className="text-on-primary">Acknowledgment SLA:</strong> Within 24 business hours</p>
                <p><strong className="text-on-primary">Resolution Target:</strong> Maximum 7 to 15 working days</p>
                <p><strong className="text-on-primary">Appellate Escalation:</strong> Data Protection Board of India (DPBI), MeitY, New Delhi</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/contact?type=dpdp"
              className="px-5 py-2.5 rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container text-xs font-extrabold transition-colors shadow-xs no-underline"
            >
              Contact Data Protection Officer →
            </Link>
            <Link
              to="/terms"
              className="px-4 py-2 rounded-lg bg-primary-container hover:bg-primary-container/60 text-on-primary text-xs font-semibold transition-colors no-underline"
            >
              View Terms of Service
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
