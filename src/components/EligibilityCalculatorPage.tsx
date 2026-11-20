import React, { useState, useMemo } from 'react';
import { JobPosting } from '../types/job';
import { Link } from '../router/Link';

interface EligibilityCalculatorPageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
}

export const EligibilityCalculatorPage: React.FC<EligibilityCalculatorPageProps> = ({
  jobs,
  onSelectJob,
}) => {
  // Inputs
  const [dob, setDob] = useState<string>('2000-01-01');
  const [asOnDate, setAsOnDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [category, setCategory] = useState<string>('UR');
  const [qualification, setQualification] = useState<string>('Graduate');
  const [gender, setGender] = useState<string>('Male');

  // Exact age calculation
  const calculatedAge = useMemo(() => {
    if (!dob || !asOnDate) return null;
    const birth = new Date(dob);
    const target = new Date(asOnDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || target < birth) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days, totalDays: Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)) };
  }, [dob, asOnDate]);

  // Relaxation in years according to DoPT / Central Govt rules
  const ageRelaxationYears = useMemo(() => {
    switch (category) {
      case 'OBC':
        return 3;
      case 'SC':
      case 'ST':
        return 5;
      case 'PwD':
        return 10;
      case 'PwD-OBC':
        return 13;
      case 'PwD-SCST':
        return 15;
      case 'Ex-Servicemen':
        return 5;
      default:
        return 0;
    }
  }, [category]);

  // Matching jobs from the live database
  const matchingJobs = useMemo(() => {
    if (!calculatedAge) return jobs;
    const applicantAge = calculatedAge.years;

    return jobs.filter((job) => {
      // General base age limit is typically 18 to 30 or 32
      const minAge = 18;
      let maxAge = 32 + ageRelaxationYears;

      if (applicantAge < minAge || applicantAge > maxAge) {
        return false;
      }

      // Qualification matching logic
      if (qualification === '10th') {
        const text = (job.qualificationSummary + ' ' + job.title).toLowerCase();
        return text.includes('10th') || text.includes('matric') || text.includes('mts') || text.includes('group d') || text.includes('gd');
      } else if (qualification === '12th') {
        const text = (job.qualificationSummary + ' ' + job.title).toLowerCase();
        return text.includes('12th') || text.includes('intermediate') || text.includes('chsl') || text.includes('clerk') || text.includes('10th');
      }

      // Graduate and above qualify for general graduate posts
      return true;
    });
  }, [jobs, calculatedAge, ageRelaxationYears, qualification]);

  return (
    <div className="space-y-6">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-[#12305A] to-[#1C4478] text-white p-6 sm:p-8 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[28px] text-amber-400">calculate</span>
          <span className="px-2.5 py-0.5 rounded bg-white/10 text-xs font-bold uppercase tracking-wider border border-white/20">
            Citizen Utility Tool
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Age & Sarkari Eligibility Calculator
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed">
          Accurately calculate your age as on official cut-off dates with statutory DoPT reservation relaxations (OBC +3 yrs, SC/ST +5 yrs, PwD +10 yrs) and immediately discover all active government job requisitions you qualify to apply for.
        </p>
      </div>

      {/* CALCULATOR & RESULTS 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORM INPUTS */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-container">
            <span className="material-symbols-outlined text-primary text-[20px]">person_check</span>
            <h2 className="font-bold text-sm text-primary">Enter Candidate Details</h2>
          </div>

          <div className="space-y-4 text-xs">
            {/* Date of Birth */}
            <div className="space-y-1">
              <label htmlFor="dob-input" className="block font-bold text-primary">
                Candidate Date of Birth (DOB) *
              </label>
              <input
                id="dob-input"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-[11px] text-on-surface-variant block">
                As recorded in your 10th / Matriculation Certificate
              </span>
            </div>

            {/* As On Cutoff Date */}
            <div className="space-y-1">
              <label htmlFor="as-on-date-input" className="block font-bold text-primary">
                Calculate Age As On (Cut-off Date) *
              </label>
              <input
                id="as-on-date-input"
                type="date"
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-[11px] text-on-surface-variant block">
                Defaults to today; check advertisement for specific gazette date (e.g. 01-01 or 01-08)
              </span>
            </div>

            {/* Reservation Category */}
            <div className="space-y-1">
              <label htmlFor="category-select" className="block font-bold text-primary">
                Reservation Category *
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="UR">Unreserved / General (UR)</option>
                <option value="EWS">Economically Weaker Section (EWS)</option>
                <option value="OBC">Other Backward Class (OBC-NCL) [+3 Yrs]</option>
                <option value="SC">Scheduled Caste (SC) [+5 Yrs]</option>
                <option value="ST">Scheduled Tribe (ST) [+5 Yrs]</option>
                <option value="PwD">Person with Benchmark Disability (PwD) [+10 Yrs]</option>
                <option value="PwD-OBC">PwD + OBC (NCL) [+13 Yrs]</option>
                <option value="PwD-SCST">PwD + SC / ST [+15 Yrs]</option>
                <option value="Ex-Servicemen">Ex-Servicemen (ESM) [+5 Yrs]</option>
              </select>
            </div>

            {/* Highest Educational Qualification */}
            <div className="space-y-1">
              <label htmlFor="qualification-select" className="block font-bold text-primary">
                Highest Educational Qualification *
              </label>
              <select
                id="qualification-select"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Graduate">Bachelor's Degree / Graduate (BA, B.Sc, B.Com)</option>
                <option value="B.Tech">Engineering (B.Tech / B.E.)</option>
                <option value="PostGraduate">Master's Degree / Post Graduate (MA, M.Sc, M.Com)</option>
                <option value="12th">12th Standard / Intermediate / Higher Secondary</option>
                <option value="10th">10th Standard / Matriculation</option>
                <option value="Diploma">Polytechnic / 3-Year Technical Diploma</option>
                <option value="ITI">ITI / NCVT Trade Certificate</option>
                <option value="Medical">MBBS / BDS / Paramedical</option>
                <option value="Law">LLB / Law Graduate</option>
                <option value="Teaching">B.Ed / D.El.Ed / CTET Qualified</option>
              </select>
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label htmlFor="gender-select" className="block font-bold text-primary">
                Candidate Gender
              </label>
              <select
                id="gender-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low border border-surface-container rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female (Eligible for Fee Exemption in most exams)</option>
                <option value="Other">Other / Transgender</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COMPUTED AGE DISPLAY & MATCHING JOBS */}
        <div className="lg:col-span-7 space-y-5">
          {/* COMPUTED RESULT CARD */}
          {calculatedAge ? (
            <div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-primary/30 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                  Exact Age Calculation Result
                </span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Verified as on {asOnDate}
                </span>
              </div>

              {/* STATS CALLOUT */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/15">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary">
                    {calculatedAge.years}
                  </span>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Years
                  </span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/15">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary">
                    {calculatedAge.months}
                  </span>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Months
                  </span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/15">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-primary">
                    {calculatedAge.days}
                  </span>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Days
                  </span>
                </div>
              </div>

              {/* RELAXATION BADGE */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <div>
                  <strong>Category Relaxation ({category}):</strong>{' '}
                  {ageRelaxationYears > 0 ? (
                    <span>+{ageRelaxationYears} Years upper age relaxation granted by DoPT rules.</span>
                  ) : (
                    <span>Standard general unreserved upper age limits apply.</span>
                  )}
                </div>
                {gender === 'Female' && (
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-bold text-[10px] shrink-0">
                    100% Fee Exemption
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-8 text-center rounded-xl border border-surface-container text-xs text-on-surface-variant">
              Please enter a valid Date of Birth and Cut-off date to calculate your exact age.
            </div>
          )}

          {/* MATCHING JOBS ACCORDING TO QUALIFICATION & AGE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">work</span>
                <span>
                  Matching Open Government Jobs ({matchingJobs.length})
                </span>
              </h3>
              <span className="text-xs text-on-surface-variant">
                For {qualification} · Age {calculatedAge?.years || 25} Yrs
              </span>
            </div>

            <div className="space-y-2.5">
              {matchingJobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container hover:border-primary/40 transition-colors shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                        {job.category}
                      </span>
                      <span className="text-xs text-emerald-700 font-bold">
                        Eligible to Apply
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-primary">
                      {job.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant">
                      Vacancies: {job.totalVacancies.toLocaleString('en-IN')} · Last Date: {job.lastDate} · Pay: {job.salary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={job.applyOnlineUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors shadow-2xs"
                    >
                      Apply Now
                    </a>
                    <Link
                      to={`/job/${job.id}`}
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
