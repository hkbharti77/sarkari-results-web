import React, { useState, useEffect } from 'react';
import { Link } from '../router/Link';

export const DpdpCookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const acknowledged = localStorage.getItem('bharatrojgar_dpdp_ack');
      if (!acknowledged) {
        // Small delay so user sees initial load smoothly
        const timer = setTimeout(() => setIsOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem('bharatrojgar_dpdp_ack', 'true');
      localStorage.setItem('bharatrojgar_dpdp_ack_time', new Date().toISOString());
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Digital Personal Data Protection Act Notice"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-primary text-on-primary border-t-2 border-secondary-container shadow-2xl transition-all animate-in slide-in-from-bottom"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-secondary-container text-[24px] shrink-0 mt-0.5">
            verified_user
          </span>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-sm text-secondary-fixed">
                DPDP Act 2023 Compliance Notice
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-container">
                Act No. 22 of 2023
              </span>
            </div>
            <p className="text-on-primary-container leading-relaxed max-w-4xl text-[11px] sm:text-xs">
              BharatRojgar respects your digital privacy under India&apos;s <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>. We only use minimal local session cookies for font accessibility and search state. We do NOT harvest Aadhaar numbers, sell personal records, or track minors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center w-full md:w-auto justify-end pt-1 md:pt-0">
          <Link
            to="/privacy"
            className="px-3 py-1.5 rounded-lg border border-primary-fixed-dim/40 text-on-primary hover:bg-primary-container text-xs font-semibold transition-colors no-underline text-center"
          >
            Review Policy
          </Link>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="px-4 py-1.5 rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            I Acknowledge &amp; Accept
          </button>
        </div>
      </div>
    </div>
  );
};
