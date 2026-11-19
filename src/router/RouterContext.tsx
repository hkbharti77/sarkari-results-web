import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface RouteState {
  pathname: string;
  search: string;
  hash: string;
  searchParams: URLSearchParams;
}

export interface NavigateOptions {
  replace?: boolean;
  scroll?: boolean;
}

export interface RouterContextValue {
  route: RouteState;
  navigate: (to: string, options?: NavigateOptions) => void;
  goBack: (fallback?: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function parseCurrentLocation(): RouteState {
  if (typeof window === 'undefined') {
    return {
      pathname: '/',
      search: '',
      hash: '',
      searchParams: new URLSearchParams(),
    };
  }

  let pathname = window.location.pathname || '/';
  let search = window.location.search || '';
  const hash = window.location.hash || '';

  // Support hash-based SPA fallback if user opened e.g. /#/latest-jobs
  if ((pathname === '/' || pathname === '') && hash.startsWith('#/')) {
    const rawHashPath = hash.slice(1); // e.g. "/latest-jobs?category=SSC"
    const [hPath, hQuery] = rawHashPath.split('?');
    pathname = hPath || '/';
    if (hQuery) {
      search = '?' + hQuery;
    }
  }

  return {
    pathname,
    search,
    hash,
    searchParams: new URLSearchParams(search),
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(parseCurrentLocation);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    if (typeof window === 'undefined') return;

    // Parse the target URL
    const url = new URL(to, window.location.origin);
    const targetPath = url.pathname;
    const targetSearch = url.search;
    const targetHash = url.hash;
    const fullTarget = targetPath + targetSearch + targetHash;

    if (options?.replace) {
      window.history.replaceState(null, '', fullTarget);
    } else {
      window.history.pushState(null, '', fullTarget);
    }

    setRoute({
      pathname: targetPath,
      search: targetSearch,
      hash: targetHash,
      searchParams: new URLSearchParams(targetSearch),
    });

    if (options?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goBack = useCallback((fallback: string = '/latest-jobs') => {
    if (typeof window === 'undefined') return;
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(fallback);
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      route,
      navigate,
      goBack,
    }),
    [route, navigate, goBack]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const useRouter = (): RouterContextValue => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export const useLocation = (): RouteState => {
  return useRouter().route;
};

export const useNavigate = () => {
  return useRouter().navigate;
};

export const useSearchParams = (): [URLSearchParams, (params: URLSearchParams | Record<string, string>) => void] => {
  const { route, navigate } = useRouter();

  const setSearchParams = useCallback(
    (next: URLSearchParams | Record<string, string>) => {
      const searchString = next instanceof URLSearchParams ? next.toString() : new URLSearchParams(next).toString();
      const target = `${route.pathname}${searchString ? `?${searchString}` : ''}${route.hash}`;
      navigate(target, { replace: true, scroll: false });
    },
    [route.pathname, route.hash, navigate]
  );

  return [route.searchParams, setSearchParams];
};
