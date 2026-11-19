export type AppRoute =
  | { type: 'home' }
  | { type: 'latest-jobs'; category?: string; search?: string; state?: string }
  | { type: 'central-jobs' }
  | { type: 'admit-cards' }
  | { type: 'results' }
  | { type: 'answer-keys' }
  | { type: 'state-jobs'; stateCode?: string }
  | { type: 'eligibility-calculator' }
  | { type: 'job-detail'; jobId: string }
  | { type: 'not-found'; path: string };

export function parseRoute(pathname: string, searchParams: URLSearchParams): AppRoute {
  // Clean and normalize pathname
  let path = pathname.trim();
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (path === '' || path === '/' || path === '/home') {
    return { type: 'home' };
  }

  if (path === '/latest-jobs') {
    return {
      type: 'latest-jobs',
      category: searchParams.get('category') || undefined,
      search: searchParams.get('q') || searchParams.get('search') || undefined,
      state: searchParams.get('state') || undefined,
    };
  }

  if (path === '/central-jobs') {
    return { type: 'central-jobs' };
  }

  if (path === '/admit-cards') {
    return { type: 'admit-cards' };
  }

  if (path === '/results') {
    return { type: 'results' };
  }

  if (path === '/answer-keys') {
    return { type: 'answer-keys' };
  }

  if (path === '/eligibility-calculator' || path === '/calculator') {
    return { type: 'eligibility-calculator' };
  }

  if (path.startsWith('/state-jobs')) {
    const parts = path.split('/').filter(Boolean);
    // e.g. /state-jobs/up or /state-jobs?state=UP
    const stateCode = (parts[1] || searchParams.get('state') || '').toUpperCase() || undefined;
    return { type: 'state-jobs', stateCode };
  }

  if (path.startsWith('/job/') || path.startsWith('/jobs/')) {
    const parts = path.split('/').filter(Boolean);
    const jobId = parts[1];
    if (jobId) {
      return { type: 'job-detail', jobId };
    }
  }

  return { type: 'not-found', path };
}
