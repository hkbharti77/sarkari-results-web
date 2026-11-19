import React, { useState, useEffect } from 'react';
import { JobPosting } from '../types/job';
import { Link } from '../router/Link';
import { useRouter } from '../router/RouterContext';
import { useStateHub } from '../hooks/usePublicData';

interface StateJobsPageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
  initialStateCode?: string;
}

interface StateInfo {
  name: string;
  code: string;
  commissions: string[];
  bannerDesc: string;
  activeCount: string;
}

const STATES_DATA: StateInfo[] = [
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    commissions: ['UPPSC (Prayagraj)', 'UPSSSC (Lucknow)', 'UPPRPB (Police Board)'],
    bannerDesc: 'Major state recruitments including UP Police Constable, Lekhpal, RO/ARO, and PCS examinations.',
    activeCount: '60,244+ Vacancies',
  },
  {
    name: 'Bihar',
    code: 'BIHAR',
    commissions: ['BPSC (Patna)', 'BSSC (Staff Selection)', 'CSBC (Police Constable)'],
    bannerDesc: 'State civil services, police sub-inspector, secondary teacher TRE, and clerk recruitment notifications.',
    activeCount: '2,035+ Vacancies',
  },
  {
    name: 'Rajasthan',
    code: 'RAJASTHAN',
    commissions: ['RPSC (Ajmer)', 'RSMSSB (Jaipur)', 'Rajasthan Police'],
    bannerDesc: 'Teacher eligibility REET, Patwari, Police Constable, RAS, and junior assistant state vacancies.',
    activeCount: '34,000+ Vacancies',
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    commissions: ['MPPSC (Indore)', 'MPESB / Vyapam (Bhopal)'],
    bannerDesc: 'MP Police Constable, Subedar, MP Forest Guard, Patwari, and State Service preliminary examinations.',
    activeCount: '6,100+ Vacancies',
  },
];

export const StateJobsPage: React.FC<StateJobsPageProps> = ({ jobs, onSelectJob, initialStateCode = 'UP' }) => {
  const { navigate } = useRouter();
  const [selectedStateCode, setSelectedStateCode] = useState<string>(initialStateCode);

  useEffect(() => {
    if (initialStateCode) {
      setSelectedStateCode(initialStateCode.toUpperCase());
    }
  }, [initialStateCode]);

  const { hubData, jobs: hubJobs, isLive: hubLive } = useStateHub(selectedStateCode);

  const handleStateClick = (code: string) => {
    setSelectedStateCode(code);
    navigate(`/state-jobs?state=${code}`, { replace: true, scroll: false });
  };

  const activeState = STATES_DATA.find((s) => s.code === selectedStateCode) || STATES_DATA[0];

  const filteredMockJobs = jobs.filter(
    (j) => j.state.toLowerCase() === activeState.name.toLowerCase()
  );

  // When live: only show live backend state jobs (empty array if 0). Never mock data!
  const stateJobs = hubLive ? hubJobs : filteredMockJobs;

  return (
    <div className="space-y-6">
      {/* HEADER BREADCRUMB */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">State Government Jobs Directory</span>
        </div>
        <h1 className="text-xl font-extrabold text-primary">
          State Government Jobs Hub — UP, Bihar, Rajasthan & MP
        </h1>
        <p className="text-xs text-on-surface-variant">
          Find vacancies verified directly from State Public Service Commissions and Recruitment Boards.
        </p>
      </div>

      {/* STATE SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {STATES_DATA.map((state) => {
          const isSelected = state.code === selectedStateCode;
          return (
            <button
              key={state.code}
              type="button"
              onClick={() => handleStateClick(state.code)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-lowest text-primary hover:bg-surface-container border border-surface-container'
              }`}
            >
              <span>{state.name}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isSelected ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {state.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE STATE OVERVIEW CARD */}
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-xs font-bold">
                {activeState.code}
              </span>
              <h2 className="text-lg font-bold text-primary">{activeState.name} Recruitment Hub</h2>
            </div>
            <p className="text-xs text-on-surface-variant max-w-2xl">{activeState.bannerDesc}</p>
          </div>
          <div className="bg-secondary-fixed text-on-secondary-fixed px-4 py-2 rounded-lg text-right sm:shrink-0">
            <div className="text-[11px] font-medium">Verified Opportunities</div>
            <div className="text-sm font-extrabold">{activeState.activeCount}</div>
          </div>
        </div>

        {/* Domicile Rule (Live from API if available) */}
        {hubData?.state?.domicileRule && (
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-700 text-[18px] shrink-0 mt-0.5">policy</span>
            <div className="space-y-0.5">
              <span className="font-bold">Official Reservation & Domicile Rule: </span>
              <span>{hubData.state.domicileRule}</span>
            </div>
          </div>
        )}

        {/* Boards List */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-2 border-t border-surface-container">
          <span className="text-on-surface-variant font-semibold">Indexed Commissions:</span>
          {hubData?.state?.commissions && hubData.state.commissions.length > 0 ? (
            hubData.state.commissions.map((comm) => (
              <a
                key={comm.code}
                href={comm.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-primary text-[11px] font-semibold flex items-center gap-1 transition-colors border border-surface-container no-underline"
              >
                <span>{comm.code}</span>
                <span className="text-[10px] text-on-surface-variant font-normal">({comm.name.split(' ')[0]})</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            ))
          ) : (
            activeState.commissions.map((comm, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-surface-container-low text-primary text-[11px] font-medium"
              >
                {comm}
              </span>
            ))
          )}
        </div>
      </div>

      {/* STATE VACANCIES LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
          <h3 className="text-sm font-bold text-primary">
            Active Recruitment Drives in {activeState.name} ({stateJobs.length})
          </h3>
          <span>Direct Commission Application Links</span>
        </div>

        {stateJobs.length === 0 ? (
          <div className="bg-surface-container-lowest p-8 text-center rounded-xl border border-surface-container space-y-2">
            <span className="material-symbols-outlined text-[36px] text-outline">inbox</span>
            <div className="text-sm font-bold text-primary">No Active Postings for {activeState.name}</div>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              No active recruitment advertisements currently published for {activeState.name}. Please check back after the next commission gazette publication.
            </p>
            <Link
              to="/latest-jobs"
              className="mt-2 inline-block px-4 py-1.5 bg-primary text-on-primary rounded text-xs font-semibold no-underline"
            >
              Browse All Active Vacancies →
            </Link>
          </div>
        ) : (
          stateJobs.map((job) => (
            <div
              key={job.id}
              className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container shadow-xs hover:border-outline-variant transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary text-[10px] font-bold">
                      {job.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      VERIFIED GAZETTE
                    </span>
                  </div>
                  <Link
                    to={`/job/${job.id}`}
                    onClick={() => onSelectJob(job)}
                    className="text-base font-bold text-primary hover:text-primary-container cursor-pointer block text-inherit no-underline"
                  >
                    {job.title}
                  </Link>
                  <div className="text-xs text-on-surface-variant font-medium">
                    {job.organization}
                  </div>
                </div>

                <div className="text-right sm:shrink-0 bg-surface-container-low px-3 py-1.5 rounded-lg border border-surface-container">
                  <div className="text-xs font-semibold text-rose-700">Deadline</div>
                  <div className="text-sm font-bold text-primary">{job.lastDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-surface-container-low/50 p-3 rounded-lg border border-surface-container">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Vacancies:</span>
                  <span className="font-bold text-primary">{job.totalVacancies.toLocaleString()} Posts</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Qualification:</span>
                  <span className="font-medium text-on-surface line-clamp-1">{job.qualificationSummary}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Pay Scale:</span>
                  <span className="font-medium text-on-surface">{job.salary}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                <a
                  href={job.officialPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                  Download State Notification PDF
                </a>
                <Link
                  to={`/job/${job.id}`}
                  onClick={() => onSelectJob(job)}
                  className="px-4 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded text-xs font-bold transition-colors shadow-xs inline-flex items-center no-underline"
                >
                  View Details & Apply →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
