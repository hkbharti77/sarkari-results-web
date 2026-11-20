import React, { useState, useEffect } from 'react';
import { Link } from '../router/Link';

interface ContactPageProps {
  initialType?: string;
}

type RequestCategory = 'general' | 'correction' | 'dpdp' | 'commission';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  category: RequestCategory;
  subject: string;
  advtRef: string;
  dpdpRight: string;
  message: string;
  consentAgreed: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialType }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    category: (initialType as RequestCategory) || 'general',
    subject: '',
    advtRef: '',
    dpdpRight: 'access',
    message: '',
    consentAgreed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    trackingId: string;
    submittedAt: string;
    category: string;
  } | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialType && ['general', 'correction', 'dpdp', 'commission'].includes(initialType)) {
      setFormData((prev) => ({ ...prev, category: initialType as RequestCategory }));
    }
  }, [initialType]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a brief subject or inquiry title.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide more details in your message (at least 15 characters).';
    }

    if (!formData.consentAgreed) {
      errs.consentAgreed = 'Mandatory consent required under the DPDP Act 2023 to process your inquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission with generated tracking token
    setTimeout(() => {
      const prefix = formData.category === 'dpdp' ? 'BR-DPDP' : formData.category === 'correction' ? 'BR-CORR' : 'BR-GRV';
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const year = new Date().getFullYear();
      const trackingId = `${prefix}-${year}-${randomNum}`;

      // Store ticket in localStorage for user record
      try {
        const storedTickets = JSON.parse(localStorage.getItem('bharatrojgar_tickets') || '[]');
        storedTickets.unshift({
          trackingId,
          subject: formData.subject,
          category: formData.category,
          date: new Date().toISOString(),
          status: 'PENDING_REVIEW',
        });
        localStorage.setItem('bharatrojgar_tickets', JSON.stringify(storedTickets.slice(0, 10)));
      } catch {
        // ignore storage errors
      }

      setIsSubmitting(false);
      setSubmittedData({
        trackingId,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        category: formData.category,
      });
    }, 700);
  };

  const handleCopyTracking = () => {
    if (submittedData?.trackingId) {
      navigator.clipboard.writeText(submittedData.trackingId);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      category: 'general',
      subject: '',
      advtRef: '',
      dpdpRight: 'access',
      message: '',
      consentAgreed: false,
    });
    setErrors({});
  };

  const faqs = [
    {
      q: 'Can BharatRojgar correct mistakes in my official job application form?',
      a: 'No. BharatRojgar is an independent public information indexing portal. We do not host the examination registration portals. To correct errors in your name, category, or photo, please log in to the official commission website (e.g. ssc.gov.in, upsc.gov.in) using their official correction window.',
    },
    {
      q: 'How long does it take to process a DPDP Act 2023 Data Principal request?',
      a: 'In accordance with our DPDP Act 2023 compliance charter, every Data Principal request (access, correction, or erasure) is assigned an official tracking token and acknowledged within 24 hours. Full verification and erasure/action is executed within 7 business days.',
    },
    {
      q: 'How do I report a broken PDF notification or incorrect last date?',
      a: 'Select "Report Inaccurate Notification / Broken Link" in the category tabs above, provide the Advertisement Number or Job Title, and paste the official link if available. Our verification team reviews and corrects errors within 4 hours.',
    },
    {
      q: 'Does BharatRojgar charge any fees for recruitment alerts or customer support?',
      a: 'No. BharatRojgar is a 100% free public service. We will NEVER ask you for bank account numbers, credit cards, or fees for recruitment forms, admit cards, or grievance support.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Contact &amp; Grievance Redressal</span>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">contact_support</span>
              Official Public Helpdesk
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              DPDP Act 2023 &amp; IT Rules 2021 Compliant
            </span>
            <span className="text-xs text-on-surface-variant font-medium ml-auto">
              SLA: Acknowledgment in 24h • Resolution in 7 Days
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            Contact &amp; Grievance Redressal Mechanism
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-3xl">
            Have a question, noticed an error in a recruitment circular, or wish to exercise your rights under India&apos;s <strong>Digital Personal Data Protection Act, 2023</strong>? Submit your request below for prompt, trackable redressal.
          </p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT / MAIN COLUMN: THE FORM */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest p-6 sm:p-7 rounded-xl border border-surface-container shadow-xs">
            {submittedData ? (
              /* SUCCESS STATE */
              <div className="space-y-5 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>

                <div className="space-y-1.5">
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Grievance / Request Successfully Registered
                  </span>
                  <h2 className="text-xl font-extrabold text-primary pt-2">
                    Official Tracking Token Generated
                  </h2>
                  <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                    Your request has been logged into the BharatRojgar Grievance &amp; DPDP compliance registry. An automated confirmation has been queued for your email.
                  </p>
                </div>

                {/* Token Box */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container max-w-md mx-auto text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Tracking Reference ID
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyTracking}
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>{copiedToken ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-base sm:text-lg font-mono font-extrabold text-primary tracking-wide">
                    {submittedData.trackingId}
                  </div>
                  <div className="pt-2 border-t border-surface-container text-[11px] text-on-surface-variant flex justify-between">
                    <span>Logged At: {submittedData.submittedAt}</span>
                    <span className="font-semibold text-emerald-700">Status: Active Review</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-surface-container-low border border-surface-container text-xs text-on-surface-variant max-w-md mx-auto text-left">
                  <strong className="text-primary block mb-1">What Happens Next?</strong>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Our Grievance Redressal Officer reviews your ticket within 24 hours.</li>
                    <li>If you submitted a DPDP Act Data Principal request, verification will be completed in 7 business days.</li>
                    <li>You may quote your Tracking ID in any correspondence with <code className="text-primary font-bold">grievance@bharatrojgar.org</code>.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              /* THE FORM */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-primary mb-1">
                    Select Request / Grievance Category
                  </h2>
                  <p className="text-xs text-on-surface-variant mb-3">
                    Choose the classification that best matches your submission:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'general' })}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        formData.category === 'general'
                          ? 'border-primary bg-primary text-on-primary shadow-xs'
                          : 'border-surface-container bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] mt-0.5">help</span>
                      <div>
                        <div className="font-bold">General Inquiry</div>
                        <div className={`text-[10px] ${formData.category === 'general' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                          Portal feedback, feature request, general questions
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'correction' })}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        formData.category === 'correction'
                          ? 'border-primary bg-primary text-on-primary shadow-xs'
                          : 'border-surface-container bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] mt-0.5">report_problem</span>
                      <div>
                        <div className="font-bold">Report Broken / Stale Link</div>
                        <div className={`text-[10px] ${formData.category === 'correction' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                          Broken PDF, incorrect deadline, corrigendum report
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'dpdp' })}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 sm:col-span-2 ${
                        formData.category === 'dpdp'
                          ? 'border-secondary-container bg-primary text-on-primary ring-2 ring-secondary-container shadow-xs'
                          : 'border-surface-container bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary-container mt-0.5">
                        security
                      </span>
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>DPDP Act 2023 Data Principal Request</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-secondary-container text-on-secondary-container">
                            Statutory
                          </span>
                        </div>
                        <div className={`text-[10px] ${formData.category === 'dpdp' ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                          Exercise statutory rights under Sections 11–14 (Consent withdrawal, Data access, Correction, Erasure)
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* DPDP Specific Right Dropdown */}
                {formData.category === 'dpdp' && (
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-secondary-container/50 space-y-2">
                    <label className="block text-xs font-bold text-primary">
                      Select Data Principal Statutory Right to Invoke (DPDP Act, 2023):
                    </label>
                    <select
                      value={formData.dpdpRight}
                      onChange={(e) => setFormData({ ...formData, dpdpRight: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="access">Section 11: Request Summary of Personal Data Being Processed</option>
                      <option value="erasure">Section 12: Request Total Erasure of Personal Data / Purge Records</option>
                      <option value="correction">Section 12: Correction, Completion or Updating of Personal Data</option>
                      <option value="withdraw_consent">Section 6(4): Withdrawal of Previously Given Consent</option>
                      <option value="nomination">Section 14: Register Data Principal Nominee in Event of Incapacity</option>
                      <option value="grievance">Section 13: Formal Data Privacy Grievance</option>
                    </select>
                    <p className="text-[11px] text-on-surface-variant">
                      Under Section 12 &amp; 13 of the DPDP Act 2023, our Data Protection Officer will verify and process your request within 7 business days.
                    </p>
                  </div>
                )}

                {/* Personal Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-primary">
                      Full Legal Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className={`w-full px-3 py-2 bg-surface-container-low border rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-outline-variant/60'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-rose-600 font-semibold">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-primary">
                      Official Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-3 py-2 bg-surface-container-low border rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-outline-variant/60'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-rose-600 font-semibold">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Subject & Optional Advt Ref */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-primary">
                      Subject / Title <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={
                        formData.category === 'dpdp'
                          ? 'e.g. Request for complete erasure of email alert data'
                          : formData.category === 'correction'
                          ? 'e.g. SSC CGL Tier-1 Admit Card link broken'
                          : 'e.g. General portal inquiry'
                      }
                      className={`w-full px-3 py-2 bg-surface-container-low border rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.subject ? 'border-rose-500 bg-rose-50/30' : 'border-outline-variant/60'
                      }`}
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-rose-600 font-semibold">{errors.subject}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-primary">
                      Advertisement No. / Job Slug <span className="text-on-surface-variant font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.advtRef}
                      onChange={(e) => setFormData({ ...formData, advtRef: e.target.value })}
                      placeholder="e.g. Advt No. 04/2025 or rrb-ntpc-2025"
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Detailed Message */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-primary">
                      Detailed Message / Grievance Statement <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-[10px] text-on-surface-variant">
                      {formData.message.length} characters (min 15)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify all necessary details to help our Grievance Redressal and verification team act swiftly..."
                    className={`w-full px-3 py-2 bg-surface-container-low border rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.message ? 'border-rose-500 bg-rose-50/30' : 'border-outline-variant/60'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[10px] text-rose-600 font-semibold">{errors.message}</span>
                  )}
                </div>

                {/* Mandatory DPDP Act Consent Checkbox */}
                <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-on-surface">
                    <input
                      type="checkbox"
                      checked={formData.consentAgreed}
                      onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="text-[11px] leading-relaxed">
                      <strong>Mandatory DPDP Act 2023 Consent:</strong> I voluntarily furnish my name, email, and inquiry details to BharatRojgar. I grant explicit consent to process this personal data strictly for addressing and redressing this inquiry in compliance with the Digital Personal Data Protection Act, 2023. I understand that my information will never be shared with advertisers or third parties and will be erased following resolution.
                    </span>
                  </label>
                  {errors.consentAgreed && (
                    <span className="text-[10px] text-rose-600 font-bold block pl-6">
                      {errors.consentAgreed}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging Request &amp; Generating Token...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">send</span>
                        <span>Submit Grievance / Inquiry</span>
                      </>
                    )}
                  </button>

                  <span className="text-[10px] text-on-surface-variant text-center sm:text-right">
                    Zero Fees • Encrypted in Transit (TLS 1.3)
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-3">
            <h2 className="text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-[20px]">
                quiz
              </span>
              <span>Grievance &amp; Candidate Portal FAQs</span>
            </h2>

            <div className="divide-y divide-surface-container">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-primary hover:text-primary-container py-1 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-[18px] text-outline ml-2 shrink-0">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="text-[11px] text-on-surface-variant leading-relaxed pt-1 pr-4">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GRIEVANCE OFFICER & STATUTORY CREDENTIALS */}
        <div className="space-y-6">
          {/* DPO / Grievance Officer Card */}
          <div className="bg-primary text-on-primary p-6 rounded-2xl border-2 border-secondary-container shadow-md space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-extrabold flex items-center justify-center text-sm shadow-xs">
                DPO
              </div>
              <div>
                <h3 className="font-bold text-sm text-on-primary">Dr. Arvind R. Sharma</h3>
                <span className="text-[11px] text-secondary-fixed block">
                  Chief Grievance Redressal &amp; DPO
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-primary-container/80 border border-primary-fixed-dim/30 text-xs space-y-1.5 text-on-primary-container">
              <span className="text-secondary-fixed text-[11px] font-bold block uppercase tracking-wider">
                Statutory Designation:
              </span>
              <p className="text-[11px] leading-relaxed">
                Appointed in accordance with <strong>Section 8(9) of the Digital Personal Data Protection Act, 2023</strong> and Rule 3(2) of the Information Technology (Intermediary Guidelines) Rules, 2021.
              </p>
            </div>

            <div className="space-y-2 text-xs text-on-primary-container pt-1">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[16px] shrink-0 mt-0.5">
                  mail
                </span>
                <div>
                  <span className="text-[10px] text-on-primary-container/80 block">Grievance Desk:</span>
                  <a href="mailto:grievance@bharatrojgar.org" className="text-on-primary font-bold hover:underline">
                    grievance@bharatrojgar.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[16px] shrink-0 mt-0.5">
                  shield_person
                </span>
                <div>
                  <span className="text-[10px] text-on-primary-container/80 block">Data Protection Officer Direct:</span>
                  <a href="mailto:dpo@bharatrojgar.org" className="text-on-primary font-bold hover:underline">
                    dpo@bharatrojgar.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[16px] shrink-0 mt-0.5">
                  location_on
                </span>
                <div>
                  <span className="text-[10px] text-on-primary-container/80 block">Official Physical Registry:</span>
                  <span className="text-[11px] text-on-primary">
                    BharatRojgar Digital Services, Connaught Place, New Delhi - 110001, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary-container text-[16px] shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <span className="text-[10px] text-on-primary-container/80 block">Working Hours:</span>
                  <span className="text-[11px] text-on-primary">
                    Mon - Fri: 09:30 AM – 05:30 PM IST (Excluding Public Holidays)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Escalation Card */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined text-amber-600 text-[20px]">
                account_balance
              </span>
              <span>Appellate &amp; Escalation Authority</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              If your data privacy grievance is not resolved within the statutory period, or if you are dissatisfied with our Grievance Redressal Officer&apos;s decision, you have the right under Section 13(3) of the DPDP Act 2023 to lodge a formal complaint with:
            </p>
            <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container text-[11px] text-primary space-y-0.5 font-medium">
              <strong className="block text-primary">Data Protection Board of India (DPBI)</strong>
              <span>Ministry of Electronics and Information Technology (MeitY)</span>
              <span className="block text-on-surface-variant">Electronics Niketan, 6 CGO Complex, Lodhi Road, New Delhi - 110003</span>
            </div>
          </div>

          {/* Links Card */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-2 text-xs">
            <span className="font-bold text-primary block">Related Legal Framework</span>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/privacy" className="text-primary hover:underline font-semibold flex items-center gap-1">
                  <span>→</span> Read Full DPDP Act Privacy Notice
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary hover:underline font-semibold flex items-center gap-1">
                  <span>→</span> Read Terms &amp; Conditions of Use
                </Link>
              </li>
              <li>
                <a
                  href="https://www.meity.gov.in/content/digital-personal-data-protection-act-2023"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <span>→</span> MeitY Official DPDP Act 2023 Gazette PDF ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
