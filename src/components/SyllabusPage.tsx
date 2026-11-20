import React, { useState, useMemo } from 'react';
import { JobPosting, JobCategory } from '../types/job';
import { Link } from '../router/Link';

interface SyllabusPageProps {
  jobs: JobPosting[];
  onSelectJob: (job: JobPosting) => void;
}

interface MasterSyllabusItem {
  id: string;
  examTitle: string;
  commission: string;
  category: JobCategory;
  stages: {
    stageName: string;
    subjects: string[];
    duration: string;
    totalMarks: string;
    negativeMarking: string;
  }[];
  pdfUrl: string;
  relatedJobId?: string;
}

const STATIC_MASTER_SYLLABUS: MasterSyllabusItem[] = [
  {
    id: 'syl-upsc-cse',
    examTitle: 'Civil Services Examination (CSE Prelims & Mains Scheme)',
    commission: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    stages: [
      {
        stageName: 'Preliminary Examination (Objective)',
        subjects: ['Paper I: General Studies (100 Qs / 200 Marks)', 'Paper II: CSAT Aptitude (80 Qs / 200 Marks, 33% Qualifying)'],
        duration: '2 Hours per Paper',
        totalMarks: '400 Marks',
        negativeMarking: '1/3rd (0.33) marks deducted per wrong answer',
      },
      {
        stageName: 'Mains Written Examination (Descriptive)',
        subjects: ['Essay (250 Marks)', 'GS Paper I, II, III, IV (250 Marks each)', 'Optional Subject Paper I & II (250 Marks each)'],
        duration: '3 Hours per Paper',
        totalMarks: '1750 Marks (Written) + 275 Marks (Interview)',
        negativeMarking: 'No negative marking in descriptive papers',
      },
    ],
    pdfUrl: 'https://upsc.gov.in/sites/default/files/Notif-CSP-24-engl-140224.pdf',
  },
  {
    id: 'syl-ssc-cgl',
    examTitle: 'Combined Graduate Level (SSC CGL Tier-I & Tier-II)',
    commission: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    stages: [
      {
        stageName: 'Tier-I: Computer Based Examination (Screening)',
        subjects: ['General Intelligence & Reasoning (25 Qs / 50 M)', 'General Awareness (25 Qs / 50 M)', 'Quantitative Aptitude (25 Qs / 50 M)', 'English Comprehension (25 Qs / 50 M)'],
        duration: '60 Minutes (1 Hour)',
        totalMarks: '200 Marks (100 Questions)',
        negativeMarking: '0.50 marks per incorrect response',
      },
      {
        stageName: 'Tier-II: Paper-I (Compulsory for All Posts)',
        subjects: ['Maths + Reasoning (60 Qs / 180 M)', 'English + GA (70 Qs / 210 M)', 'Computer Knowledge Module (20 Qs / 60 M)', 'Data Entry Speed Test (DEST)'],
        duration: '2 Hours 15 Minutes',
        totalMarks: '390 Merit Marks + 60 Qualifying',
        negativeMarking: '1 mark deducted for each wrong answer in Sec I, II & III',
      },
    ],
    pdfUrl: 'https://ssc.gov.in',
  },
  {
    id: 'syl-rrb-ntpc',
    examTitle: 'Non-Technical Popular Categories (RRB NTPC CBT 1 & 2)',
    commission: 'Railway Recruitment Control Board (RRB)',
    category: 'Railway',
    stages: [
      {
        stageName: '1st Stage Computer Based Test (CBT-1)',
        subjects: ['General Awareness (40 Qs)', 'Mathematics (30 Qs)', 'General Intelligence & Reasoning (30 Qs)'],
        duration: '90 Minutes',
        totalMarks: '100 Marks (100 Questions)',
        negativeMarking: '1/3rd mark deducted per wrong answer',
      },
      {
        stageName: '2nd Stage Computer Based Test (CBT-2)',
        subjects: ['General Awareness (50 Qs)', 'Mathematics (35 Qs)', 'General Intelligence & Reasoning (35 Qs)'],
        duration: '90 Minutes',
        totalMarks: '120 Marks (120 Questions)',
        negativeMarking: '1/3rd mark deducted per wrong answer',
      },
    ],
    pdfUrl: 'https://indianrailways.gov.in',
  },
  {
    id: 'syl-ibps-po',
    examTitle: 'Probationary Officers / Management Trainees (CWE PO/MT)',
    commission: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Banking',
    stages: [
      {
        stageName: 'Preliminary Examination (Online Objective)',
        subjects: ['English Language (30 Qs / 30 M)', 'Quantitative Aptitude (35 Qs / 35 M)', 'Reasoning Ability (35 Qs / 35 M)'],
        duration: '60 Minutes (20 Min Sectional Timers)',
        totalMarks: '100 Marks (100 Questions)',
        negativeMarking: '0.25 (1/4th) penalty per wrong response',
      },
      {
        stageName: 'Main Examination + English Descriptive',
        subjects: ['Reasoning & Computer Aptitude (45 Qs)', 'General / Economy / Banking Awareness (40 Qs)', 'English Language (35 Qs)', 'Data Analysis & Interpretation (35 Qs)', 'Letter & Essay Writing (25 Marks)'],
        duration: '3 Hours 30 Minutes',
        totalMarks: '225 Marks',
        negativeMarking: '0.25 penalty per wrong question',
      },
    ],
    pdfUrl: 'https://ibps.in',
  },
  {
    id: 'syl-police-si',
    examTitle: 'Sub-Inspector & Police Constable Scheme of Examination',
    commission: 'State Police Recruitment & Promotion Boards',
    category: 'State Police',
    stages: [
      {
        stageName: 'Written Examination (Objective CBT / OMR)',
        subjects: ['General Hindi / Regional Language (100 M)', 'Law & Constitution / General Knowledge (100 M)', 'Numerical & Mental Ability (100 M)', 'Mental Aptitude / IQ Test / Reasoning (100 M)'],
        duration: '2 Hours (120 Minutes)',
        totalMarks: '400 Marks (160 Questions)',
        negativeMarking: 'Sectional qualifying criteria 35% each subject',
      },
      {
        stageName: 'Physical Standard Test (PST) & Efficiency Test (PET)',
        subjects: ['Height & Chest Measurement (Male: 168 cm, Female: 152 cm)', 'Running: 4.8 km in 28 mins (Male) / 2.4 km in 16 mins (Female)'],
        duration: 'Qualifying Nature',
        totalMarks: 'Qualifying only (No merit marks)',
        negativeMarking: 'Disqualification upon failure to meet benchmark',
      },
    ],
    pdfUrl: 'https://uppbpb.gov.in',
  },
];

export const SyllabusPage: React.FC<SyllabusPageProps> = ({ jobs, onSelectJob }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Combine static master syllabus with any active jobs that have syllabusUrl
  const allSyllabusItems = useMemo(() => {
    const jobItems: MasterSyllabusItem[] = jobs
      .filter((j) => Boolean(j.syllabusUrl))
      .map((j) => ({
        id: `job-syl-${j.id}`,
        examTitle: `${j.title} — Official Scheme of Examination`,
        commission: j.organization,
        category: j.category,
        stages: j.selectionStages && j.selectionStages.length > 0
          ? j.selectionStages.map((stage) => ({
              stageName: stage,
              subjects: ['As per official notification syllabus & cadre rules'],
              duration: 'As prescribed by commission schedule',
              totalMarks: 'Standard gazette pattern',
              negativeMarking: 'Standard 1/3rd or 1/4th penalty',
            }))
          : [
              {
                stageName: 'Preliminary / Screening Examination',
                subjects: ['General Studies, Reasoning, Quantitative Aptitude & Language'],
                duration: '2 Hours',
                totalMarks: 'As per gazette',
                negativeMarking: '1/3rd penalty per wrong answer',
              },
            ],
        pdfUrl: j.syllabusUrl || j.officialPdfUrl,
        relatedJobId: j.id,
      }));

    return [...jobItems, ...STATIC_MASTER_SYLLABUS];
  }, [jobs]);

  const filtered = useMemo(() => {
    return allSyllabusItems.filter((item) => {
      const matchCat =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.examTitle.toLowerCase().includes(q) ||
        item.commission.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allSyllabusItems, selectedCategory, searchQuery]);

  const categories: Array<JobCategory | 'ALL'> = [
    'ALL',
    'UPSC',
    'SSC',
    'Railway',
    'Banking',
    'Defence',
    'State Police',
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#12305A] to-[#1C4478] text-white p-6 sm:p-8 rounded-xl shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[28px] text-amber-400">menu_book</span>
          <span className="px-2.5 py-0.5 rounded bg-white/10 text-xs font-bold uppercase tracking-wider border border-white/20">
            Official Examination Pattern & Scheme Hub
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Government Examination Syllabus & Marking Scheme
        </h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed">
          Comprehensive, commission-verified syllabus, question distribution, stage-wise patterns, negative marking penalties, and direct official PDF downloads for UPSC, SSC, Railways, Banking, and Police examinations.
        </p>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search syllabus by exam or commission name..."
              className="w-full pl-9 pr-3 py-2 bg-white text-gray-900 placeholder:text-gray-500 text-xs rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-[#12305A]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat === 'ALL' ? 'All Commissions' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SYLLABUS CARDS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">fact_check</span>
            <span>Official Examination Schemes ({filtered.length})</span>
          </h2>
          <span className="text-xs text-on-surface-variant font-medium">
            Based on latest gazette rules
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-xs space-y-4 hover:border-primary/40 transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                      {item.category}
                    </span>
                    <span className="text-xs text-on-surface-variant font-semibold">
                      {item.commission}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-primary">
                    {item.examTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-amber-300">picture_as_pdf</span>
                    <span>Download Official Syllabus PDF</span>
                  </a>
                  {item.relatedJobId && (
                    <Link
                      to={`/job/${item.relatedJobId}`}
                      onClick={() => {
                        const matched = jobs.find((j) => j.id === item.relatedJobId);
                        if (matched && onSelectJob) onSelectJob(matched);
                      }}
                      className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold transition-colors"
                    >
                      View Notice
                    </Link>
                  )}
                </div>
              </div>

              {/* STAGES BREAKDOWN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.stages.map((stage, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-lg bg-surface-container-low border border-surface-container space-y-2 text-xs"
                  >
                    <div className="font-bold text-primary flex items-center gap-1.5 border-b border-surface-container pb-1.5">
                      <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span>{stage.stageName}</span>
                    </div>

                    <ul className="space-y-1 text-on-surface pl-2 list-disc list-inside">
                      {stage.subjects.map((subj, subIdx) => (
                        <li key={subIdx} className="font-medium">{subj}</li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-surface-container grid grid-cols-2 gap-2 text-[11px] text-on-surface-variant">
                      <div>
                        <strong>Duration:</strong> {stage.duration}
                      </div>
                      <div>
                        <strong>Total Marks:</strong> {stage.totalMarks}
                      </div>
                      <div className="col-span-2 text-rose-700">
                        <strong>Negative Marking:</strong> {stage.negativeMarking}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
