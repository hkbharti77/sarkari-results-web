import React, { useState, useEffect } from 'react';
import { JobCategory } from '../types/job';
import { Link } from '../router/Link';
import { useRouter } from '../router/RouterContext';

interface HeaderProps {
  currentTab?: string;
  onSelectTab?: (tab: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onCategoryFilter?: (category: JobCategory | 'ALL') => void;
  selectedCategory?: JobCategory | 'ALL';
  isLive?: boolean;
  trendingTickers?: Array<{ id: string; title: string; detail?: string }>;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab = 'home',
  onSelectTab,
  searchQuery = '',
  onSearchChange,
  onCategoryFilter,
  selectedCategory = 'ALL',
  isLive = false,
  trendingTickers,
}) => {
  const { route, navigate } = useRouter();
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [fontSize, setFontSize] = useState<'NORMAL' | 'LARGE' | 'XLARGE'>('NORMAL');
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'LARGE') {
      root.style.fontSize = '17px';
    } else if (fontSize === 'XLARGE') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'latest-jobs', label: 'Latest Jobs', path: '/latest-jobs', badge: 'NEW', badgeColor: 'bg-secondary-container text-on-secondary-container' },
    { id: 'admit-cards', label: 'Admit Cards', path: '/admit-cards' },
    { id: 'results', label: 'Results', path: '/results', badge: 'LIVE', badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { id: 'answer-keys', label: 'Answer Keys', path: '/answer-keys' },
    { id: 'state-jobs', label: 'State Jobs', path: '/state-jobs' },
    { id: 'central-jobs', label: 'Central Jobs', path: '/central-jobs' },
    { id: 'eligibility-calculator', label: 'Age & Eligibility Tool', path: '/eligibility-calculator' },
  ];

  const quickFilters: Array<JobCategory | 'ALL'> = ['ALL', 'UPSC', 'SSC', 'Railway', 'Banking', 'Defence', 'State Police'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = localSearch.trim();
    if (onSearchChange) onSearchChange(q);
    const target = q ? `/latest-jobs?q=${encodeURIComponent(q)}` : '/latest-jobs';
    navigate(target);
    if (onSelectTab) onSelectTab('latest-jobs');
  };

  const handleCategoryClick = (cat: JobCategory | 'ALL') => {
    if (onCategoryFilter) onCategoryFilter(cat);
    const target = cat === 'ALL' ? '/latest-jobs' : `/latest-jobs?category=${encodeURIComponent(cat)}`;
    navigate(target);
    if (onSelectTab) onSelectTab('latest-jobs');
  };

  const getIsActive = (item: typeof navItems[0]) => {
    if (item.path === '/') {
      return route.pathname === '/' || route.pathname === '/home' || currentTab === 'home';
    }
    return route.pathname.startsWith(item.path) || currentTab === item.id;
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.06)] bg-surface-container-lowest">
      {/* TOP COMPLIANCE & ACCESSIBILITY BAR */}
      <div className="bg-secondary-fixed text-on-secondary-fixed text-xs px-4 py-1.5 border-b border-secondary-fixed-dim/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 text-center md:text-left font-medium">
            <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
            <span>
              <strong>Official Disclaimer:</strong> BharatRojgar is an independent public recruitment directory. Not affiliated with any ministry. Verify on official gazettes.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-1 rounded transition-colors ${language === 'EN' ? 'bg-primary text-on-primary' : 'hover:text-primary'}`}
              >
                English
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => setLanguage('HI')}
                className={`px-1 rounded transition-colors ${language === 'HI' ? 'bg-primary text-on-primary' : 'hover:text-primary'}`}
              >
                हिंदी
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFontSize('NORMAL')}
                className={`px-1.5 py-0.5 rounded shadow-xs text-[11px] font-semibold transition-colors ${
                  fontSize === 'NORMAL'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
                title="Standard font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('LARGE')}
                className={`px-1.5 py-0.5 rounded shadow-xs text-[11px] font-semibold transition-colors ${
                  fontSize === 'LARGE'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
                title="Medium font size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('XLARGE')}
                className={`px-1.5 py-0.5 rounded shadow-xs text-[11px] font-semibold transition-colors ${
                  fontSize === 'XLARGE'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
                title="Large font size"
              >
                A+
              </button>
            </div>
            <div className="flex items-center gap-3 font-medium">
              <span className="hidden md:flex items-center gap-1 text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[14px]">send</span> 1.2M+ Alerts
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Official Live Feed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container text-on-surface-variant border border-surface-container-highest">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Verified Directory
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LOGO & SEARCH HEADER */}
      <div className="bg-surface-container-lowest px-4 py-3 border-b border-surface-container">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Logo with Link */}
          <Link
            to="/"
            onClick={() => onSelectTab && onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none no-underline text-inherit"
          >
            <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xl shadow-sm">
              BR
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-primary tracking-tight leading-tight">
                BharatRojgar
              </span>
              <span className="text-[11px] font-medium text-on-surface-variant">
                India's Verified Public Recruitment & Exam Portal
              </span>
            </div>
          </Link>

          {/* Search Bar & Quick Filters */}
          <div className="w-full lg:max-w-xl flex flex-col gap-1.5">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="Search SSC CGL, Railway NTPC, UPSC, Bank PO, Police..."
                className="w-full pl-10 pr-24 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container border border-outline-variant/50"
              />
              <button
                type="submit"
                className="absolute right-1 px-3 py-1 bg-primary text-on-primary text-xs font-semibold rounded hover:bg-primary-container transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-0.5 scrollbar-none">
              <span className="text-outline text-[11px] shrink-0 font-medium">Fast Filters:</span>
              {quickFilters.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'bg-surface-container text-primary hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-surface-container-highest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-on-surface">Live Bulletin Active</span>
            </div>
            <button
              type="button"
              onClick={() => alert('Free SMS/WhatsApp notification subscription registered!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container text-xs font-bold hover:bg-secondary-fixed-dim transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>Free Alerts</span>
            </button>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="bg-primary text-on-primary px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = getIsActive(item);
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => onSelectTab && onSelectTab(item.id)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-1.5 no-underline ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'text-on-primary-container hover:bg-primary-container/60 hover:text-on-primary'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* TRENDING TICKER BAR */}
      <div className="bg-surface-container-high px-4 py-1 border-b border-surface-container-highest overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-on-surface">
          <span className="flex items-center gap-1 font-bold text-amber-800 shrink-0">
            <span className="material-symbols-outlined text-[16px] text-amber-600">bolt</span>
            <span>Trending:</span>
          </span>
          <div className="truncate text-on-surface-variant text-xs">
            {trendingTickers && trendingTickers.length > 0 ? (
              trendingTickers.map((t, idx) => (
                <React.Fragment key={t.id || idx}>
                  <span className="font-semibold text-primary">{t.title}</span>
                  {t.detail ? <span className="text-on-surface-variant"> ({t.detail})</span> : null}
                  {idx < trendingTickers.length - 1 ? ' • ' : ''}
                </React.Fragment>
              ))
            ) : (
              <>
                <span className="font-semibold text-primary">SSC CGL 2025</span> Tier-I Admit Card Out •{' '}
                <span className="font-semibold text-primary">UP Police 60,244</span> Result Declared •{' '}
                <span className="font-semibold text-primary">Railway RRB NTPC</span> 11,558 Posts Active •{' '}
                <span className="font-semibold text-primary">UPSC CSE 2025</span> Prelims Notice Released •{' '}
                <span className="font-semibold text-primary">BPSC 70th CCE</span> Registration Open
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
