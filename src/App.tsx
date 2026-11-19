import React, { useState } from 'react';
import { MOCK_JOBS } from './data/mockJobs';
import { JobCategory, JobPosting } from './types/job';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { JobDirectoryPage } from './components/JobDirectoryPage';
import { JobDetailPage } from './components/JobDetailPage';
import { AdmitCardsResultsPage } from './components/AdmitCardsResultsPage';
import { StateJobsPage } from './components/StateJobsPage';
import { RouterProvider, useRouter, parseRoute, Link } from './router';
import {
  usePublicJobs,
  useHomeSummary,
  useAdmitCards,
  useResults,
  useJobDetail,
} from './hooks/usePublicData';

const MainContent: React.FC = () => {
  const { route, navigate, goBack } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | 'ALL'>('ALL');

  const routeMatch = parseRoute(route.pathname, route.searchParams);

  // Live Data Hooks with automatic fallback to mock data
  const { jobs, isLive: jobsLive } = usePublicJobs();
  const { summary, isLive: summaryLive } = useHomeSummary();
  const { items: admitCards, isLive: admitCardsLive } = useAdmitCards();
  const { items: results, isLive: resultsLive } = useResults();

  // Merge live endpoint items with any live jobs marked RELEASED / DECLARED
  const resolvedAdmitCards = React.useMemo(() => {
    const list = [...admitCards];
    const seen = new Set(
      list.map((item) => (item.id || item.linkTo || '').toLowerCase())
    );

    for (const job of jobs) {
      if (job.admitCardStatus === 'RELEASED') {
        const link = `/job/${job.slug || job.id}`.toLowerCase();
        if (!seen.has(job.id.toLowerCase()) && !seen.has(link)) {
          seen.add(job.id.toLowerCase());
          list.push({
            id: job.id,
            title: `${job.organization}: ${job.shortTitle || job.title}`,
            org: job.organization.split(' ')[0] || 'Govt',
            date: job.examDate || 'Exam Pass Live',
            badge: 'AVAILABLE',
            badgeColor: 'success',
            linkTo: `/job/${job.slug || job.id}`,
          });
        }
      }
    }
    return list;
  }, [admitCards, jobs]);

  const resolvedResults = React.useMemo(() => {
    const list = [...results];
    const seen = new Set(
      list.map((item) => (item.id || item.linkTo || '').toLowerCase())
    );

    for (const job of jobs) {
      if (job.resultStatus === 'DECLARED') {
        const link = `/job/${job.slug || job.id}`.toLowerCase();
        if (!seen.has(job.id.toLowerCase()) && !seen.has(link)) {
          seen.add(job.id.toLowerCase());
          list.push({
            id: job.id,
            title: `${job.title} (${job.organization})`,
            org: job.organization.split(' ')[0] || 'Govt',
            date: job.resultDate || 'Declared',
            badge: 'CUTOFF OUT',
            badgeColor: 'danger',
            linkTo: `/job/${job.slug || job.id}`,
          });
        }
      }
    }
    return list;
  }, [results, jobs]);

  const isLive = jobsLive || summaryLive || admitCardsLive || resultsLive;

  // Single job resolution if on /job/:id
  const targetJobId = routeMatch.type === 'job-detail' ? routeMatch.jobId : '';
  const { job: singleJob, loading: singleJobLoading } = useJobDetail(targetJobId);

  const handleSelectJob = (job: JobPosting) => {
    navigate(`/job/${job.id}`);
  };

  const handleNavigateTab = (tab: string) => {
    if (tab.startsWith('/')) {
      navigate(tab);
    } else {
      navigate(`/${tab === 'home' ? '' : tab}`);
    }
  };

  // Determine current active tab id for Header highlighting
  let activeTabId = 'home';
  if (routeMatch.type === 'job-detail') {
    activeTabId = '';
  } else if (routeMatch.type === 'latest-jobs' || routeMatch.type === 'central-jobs') {
    activeTabId = routeMatch.type;
  } else if (routeMatch.type === 'admit-cards' || routeMatch.type === 'results') {
    activeTabId = routeMatch.type;
  } else if (routeMatch.type === 'state-jobs') {
    activeTabId = 'state-jobs';
  } else if (routeMatch.type === 'answer-keys') {
    activeTabId = 'answer-keys';
  } else if (routeMatch.type === 'eligibility-calculator') {
    activeTabId = 'eligibility-calculator';
  } else if (routeMatch.type === 'home') {
    activeTabId = 'home';
  }

  // If on a job detail route, find the job
  let selectedJob: JobPosting | undefined;
  if (routeMatch.type === 'job-detail') {
    const target = targetJobId.toLowerCase();
    if (isLive) {
      // WHEN API IS LIVE: ONLY check live jobs array and single fetched job from database! NEVER mock data!
      selectedJob =
        jobs.find((j) => j.id.toLowerCase() === target || j.slug.toLowerCase() === target) ||
        singleJob;
    } else {
      // OFFLINE MODE ONLY: check offline mock jobs
      selectedJob =
        jobs.find((j) => j.id.toLowerCase() === target || j.slug.toLowerCase() === target) ||
        MOCK_JOBS.find((j) => j.id.toLowerCase() === target || j.slug.toLowerCase() === target) ||
        singleJob;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* GLOBAL HEADER */}
      <Header
        currentTab={activeTabId}
        onSelectTab={handleNavigateTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryFilter={setSelectedCategory}
        isLive={isLive}
        trendingTickers={summary.trendingTickers}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {routeMatch.type === 'job-detail' ? (
          singleJobLoading && !selectedJob ? (
            <div className="bg-surface-container-lowest p-12 rounded-xl border border-surface-container text-center space-y-4 max-w-xl mx-auto my-12 shadow-xs">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="text-sm font-semibold text-primary">Fetching Official Notice Bulletin...</div>
            </div>
          ) : selectedJob ? (
            <JobDetailPage job={selectedJob} onBack={() => goBack('/latest-jobs')} />
          ) : (
            <div className="bg-surface-container-lowest p-10 rounded-xl border border-surface-container text-center space-y-4 max-w-xl mx-auto my-12 shadow-xs">
              <span className="material-symbols-outlined text-[52px] text-amber-600">error_outline</span>
              <h2 className="text-xl font-bold text-primary">Recruitment Notice Not Found</h2>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                The requested recruitment notification with identifier "<strong className="text-primary">{routeMatch.jobId}</strong>" was not found in the verified repository or its application window has concluded.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to="/latest-jobs"
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-colors shadow-xs no-underline"
                >
                  Browse All Latest Jobs →
                </Link>
                <Link
                  to="/"
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-xs font-bold transition-colors no-underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )
        ) : (
          <>
            {routeMatch.type === 'home' && (
              <HomePage
                jobs={jobs}
                onSelectJob={handleSelectJob}
                onNavigateTab={handleNavigateTab}
                summary={summary}
                admitCards={resolvedAdmitCards}
                results={resolvedResults}
                isLive={isLive}
              />
            )}

            {routeMatch.type === 'latest-jobs' && (
              <JobDirectoryPage
                jobs={jobs}
                onSelectJob={handleSelectJob}
                initialCategory={(routeMatch.category as JobCategory) || selectedCategory}
                initialSearch={routeMatch.search !== undefined ? routeMatch.search : searchQuery}
                initialState={routeMatch.state || 'ALL'}
              />
            )}

            {routeMatch.type === 'central-jobs' && (
              <JobDirectoryPage
                jobs={jobs}
                onSelectJob={handleSelectJob}
                initialCategory="ALL"
                initialSearch=""
                initialState="Central"
              />
            )}

            {routeMatch.type === 'admit-cards' && (
              <AdmitCardsResultsPage
                initialMode="ADMIT_CARD"
                jobs={jobs}
                onSelectJob={handleSelectJob}
                admitCards={resolvedAdmitCards}
                results={resolvedResults}
                isLive={isLive}
              />
            )}

            {routeMatch.type === 'results' && (
              <AdmitCardsResultsPage
                initialMode="RESULT"
                jobs={jobs}
                onSelectJob={handleSelectJob}
                admitCards={resolvedAdmitCards}
                results={resolvedResults}
                isLive={isLive}
              />
            )}

            {routeMatch.type === 'state-jobs' && (
              <StateJobsPage
                jobs={jobs}
                onSelectJob={handleSelectJob}
                initialStateCode={routeMatch.stateCode || 'UP'}
              />
            )}

            {routeMatch.type === 'answer-keys' && (
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-container text-center space-y-3 shadow-xs">
                <span className="material-symbols-outlined text-[48px] text-primary">key</span>
                <h2 className="text-xl font-bold text-primary">Official Answer Keys & Objections Hub</h2>
                <p className="text-xs text-on-surface-variant max-w-lg mx-auto">
                  Direct official links to download provisional & final answer keys from SSC, UPSC, and State Boards with online objection windows.
                </p>
                <div className="pt-2">
                  <Link
                    to="/latest-jobs"
                    className="inline-block px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-colors no-underline"
                  >
                    View All Active Examinations →
                  </Link>
                </div>
              </div>
            )}

            {routeMatch.type === 'eligibility-calculator' && (
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-container text-center space-y-3 shadow-xs">
                <span className="material-symbols-outlined text-[48px] text-amber-600">calculate</span>
                <h2 className="text-xl font-bold text-primary">Age & Eligibility Calculator</h2>
                <p className="text-xs text-on-surface-variant max-w-lg mx-auto">
                  Enter your Date of Birth, Category (General/OBC/SC/ST/PwD), and Educational Qualification to calculate your age as on official cut-off dates and find all eligible jobs.
                </p>
                <div className="pt-2">
                  <Link
                    to="/latest-jobs"
                    className="inline-block px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-colors no-underline"
                  >
                    Calculate Eligible Opportunities →
                  </Link>
                </div>
              </div>
            )}

            {routeMatch.type === 'not-found' && (
              <div className="bg-surface-container-lowest p-10 rounded-xl border border-surface-container text-center space-y-4 max-w-xl mx-auto my-12 shadow-xs">
                <span className="material-symbols-outlined text-[52px] text-rose-600">travel_explore</span>
                <h2 className="text-xl font-bold text-primary">Page Not Found (404)</h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  The requested page "<strong className="text-primary">{routeMatch.path}</strong>" does not exist or has been moved.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-bold transition-colors shadow-xs no-underline"
                  >
                    Go to Homepage
                  </Link>
                  <Link
                    to="/latest-jobs"
                    className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-xs font-bold transition-colors no-underline"
                  >
                    Explore Jobs
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <MainContent />
    </RouterProvider>
  );
};

export default App;
