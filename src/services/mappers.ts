import { JobPosting, JobCategory, JobStatus, QuickLinkItem, VacancyBreakdown, ImportantDate } from '../types/job';
import {
  BackendJob,
  BackendAdmitCardItem,
  BackendResultItem,
} from './publicApi';

const STATE_CODE_TO_NAME: Record<string, string> = {
  ALL: 'Central',
  CENTRAL: 'Central',
  UP: 'Uttar Pradesh',
  BR: 'Bihar',
  RJ: 'Rajasthan',
  MP: 'Madhya Pradesh',
  DL: 'Delhi',
  HR: 'Haryana',
  PB: 'Punjab',
  UK: 'Uttarakhand',
  JH: 'Jharkhand',
  WB: 'West Bengal',
  MH: 'Maharashtra',
  GJ: 'Gujarat',
  TN: 'Tamil Nadu',
  KA: 'Karnataka',
  AP: 'Andhra Pradesh',
  TG: 'Telangana',
  KL: 'Kerala',
  OR: 'Odisha',
  AS: 'Assam',
};

export function inferCategory(department: string, ministryCode = '', postTitle = ''): JobCategory {
  const text = `${department} ${ministryCode} ${postTitle}`.toLowerCase();

  if (text.includes('upsc') || text.includes('civil services') || text.includes('ias') || text.includes('ips')) {
    return 'UPSC';
  }
  if (text.includes('ssc') || text.includes('staff selection')) {
    return 'SSC';
  }
  if (text.includes('railway') || text.includes('rrb') || text.includes('ntpc')) {
    return 'Railway';
  }
  if (text.includes('bank') || text.includes('ibps') || text.includes('sbi') || text.includes('financial services')) {
    return 'Banking';
  }
  if (text.includes('defence') || text.includes('drdo') || text.includes('army') || text.includes('navy') || text.includes('air force') || text.includes('ceptam')) {
    return 'Defence';
  }
  if (text.includes('police') || text.includes('constable') || text.includes('sub-inspector') || text.includes('upprpb') || text.includes('csbc')) {
    return 'State Police';
  }
  if (text.includes('teach') || text.includes('reet') || text.includes('ctet') || text.includes('tgt') || text.includes('pgt') || text.includes('school')) {
    return 'Teaching';
  }
  if (text.includes('engineering') || text.includes('engineer') || text.includes('cpwd') || text.includes('ese')) {
    return 'Engineering';
  }
  if (text.includes('medical') || text.includes('paramedical') || text.includes('hospital') || text.includes('aiims') || text.includes('health')) {
    return 'Medical / Paramedical';
  }

  return 'Other Central';
}

export function formatFriendlyDate(dateStr?: string | null): string {
  if (!dateStr) return 'To be notified';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function mapBackendJobToJobPosting(bj: BackendJob): JobPosting {
  const category = inferCategory(bj.department, bj.ministryCode, bj.postTitle);
  const state = STATE_CODE_TO_NAME[bj.stateCode?.toUpperCase()] || bj.stateCode || 'Central';

  let status: JobStatus = 'ACTIVE';
  if (bj.status === 'Pending / Scrutiny' || bj.status === 'Application Open / Active') {
    status = 'NEW';
  } else if (bj.status === 'Rejected / Cancelled') {
    status = 'EXPIRED';
  } else if (bj.deadlineDate) {
    const deadline = new Date(bj.deadlineDate);
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      status = 'EXPIRED';
    } else if (diffDays <= 5) {
      status = 'CLOSING_SOON';
    }
  }

  // Construct category / post-wise breakdowns
  const breakdown: VacancyBreakdown[] = [];
  if (bj.postBreakdown && Array.isArray(bj.postBreakdown) && bj.postBreakdown.length > 0) {
    // Admin configured post-wise eligibility breakdown
    for (const pb of bj.postBreakdown) {
      breakdown.push({
        postName: pb.postName,
        vacancies: pb.vacancies,
        qualification: pb.qualification || bj.qualificationSummary || bj.educationTier || 'Graduate',
      });
    }
  } else if (bj.categoryBreakdown) {
    const cb = bj.categoryBreakdown;
    if (cb.UR > 0) breakdown.push({ postName: 'Unreserved (UR)', vacancies: cb.UR, qualification: bj.qualificationSummary || bj.educationTier || 'Graduate' });
    if (cb.OBC > 0) breakdown.push({ postName: 'Other Backward Classes (OBC)', vacancies: cb.OBC, qualification: bj.qualificationSummary || bj.educationTier || 'Graduate' });
    if (cb.SC > 0) breakdown.push({ postName: 'Scheduled Castes (SC)', vacancies: cb.SC, qualification: bj.qualificationSummary || bj.educationTier || 'Graduate' });
    if (cb.ST > 0) breakdown.push({ postName: 'Scheduled Tribes (ST)', vacancies: cb.ST, qualification: bj.qualificationSummary || bj.educationTier || 'Graduate' });
    if (cb.EWS > 0) breakdown.push({ postName: 'Economically Weaker Section (EWS)', vacancies: cb.EWS, qualification: bj.qualificationSummary || bj.educationTier || 'Graduate' });
  }
  if (breakdown.length === 0) {
    breakdown.push({
      postName: bj.postTitle,
      vacancies: bj.vacancies,
      qualification: bj.qualificationSummary || bj.educationTier || 'Degree / Diploma in relevant discipline',
    });
  }

  // Generate important dates list
  const releaseDate = bj.startDate
    ? formatFriendlyDate(bj.startDate)
    : bj.createdAt
      ? formatFriendlyDate(bj.createdAt)
      : 'Official Notification';

  const gazetteOrAdvt = bj.advtNo || (bj.gazetteRef || '').replace(/^DRAFT-/i, '') || 'Advt. Notice';
  const importantDates: ImportantDate[] = [
    {
      event: `Official Gazette Release / Application Begin (${gazetteOrAdvt})`,
      date: releaseDate,
      isPast: true,
    },
    {
      event: 'Last Date for Online Application & Submission',
      date: formatFriendlyDate(bj.deadlineDate),
      isPast: new Date(bj.deadlineDate).getTime() < Date.now(),
    },
  ];

  const hasExamDate = Boolean(
    bj.examDate &&
    bj.examDate.trim().length > 0 &&
    !bj.examDate.toLowerCase().includes('notif') &&
    !bj.examDate.toLowerCase().includes('soon')
  );

  importantDates.push({
    event: 'Examination / CBT Date',
    date: hasExamDate
      ? formatFriendlyDate(bj.examDate)
      : 'As per Schedule / To be Announced Soon',
    isPast: hasExamDate
      ? !isNaN(new Date(bj.examDate!).getTime()) &&
      new Date(bj.examDate!).getTime() < Date.now()
      : false,
  });

  if (bj.status === 'Result Announced') {
    importantDates.push({
      event: 'Final Result / Merit List Published',
      date: bj.updatedAt ? formatFriendlyDate(bj.updatedAt) : 'Declared',
      isPast: true,
    });
  }

  // Dynamic selection stages: use admin-configured stages or category defaults
  let selectionStages: string[] = [];
  if (
    bj.selectionStages &&
    Array.isArray(bj.selectionStages) &&
    bj.selectionStages.length > 0 &&
    bj.selectionStages.some((s) => Boolean(s && s.trim().length > 0))
  ) {
    selectionStages = bj.selectionStages.filter(
      (s) => Boolean(s && s.trim().length > 0)
    );
  } else if (category === 'State Police') {
    selectionStages = [
      'Stage 1: Offline / Online Objective Written Examination',
      'Stage 2: Physical Standard Test (PST) & Document Scrutiny',
      'Stage 3: Physical Efficiency Test (PET Run) & Medical Board',
    ];
  } else if (category === 'Defence') {
    selectionStages = [
      'Stage 1: Tier-I CBT (Screening Test)',
      'Stage 2: Tier-II Trade / Skill Test',
      'Stage 3: Comprehensive Medical & Security Clearance',
    ];
  } else {
    selectionStages = [
      'Stage 1: Preliminary Computer Based Exam / Screening Test',
      'Stage 2: Main Written Examination / Technical Evaluation',
      'Stage 3: Document Verification & Final Cadre Allocation',
    ];
  }

  const officialSite = bj.officialWebsiteUrl || 'https://upsc.gov.in';
  const applyOnline =
    bj.applyOnlineUrl || bj.officialWebsiteUrl || 'https://upsc.gov.in';
  const noticePdf =
    bj.officialNoticePdfUrl || bj.officialWebsiteUrl || 'https://upsc.gov.in';

  // Sanitize customId and advtNo so visitors never see internal "DRAFT-" prefixes
  const cleanId = (bj.customId || '').replace(/^DRAFT-/i, '');
  const cleanAdvtNo = (bj.advtNo || '').trim();
  const cleanSlug = (bj.slug || cleanId.toLowerCase()).replace(/-draft-[0-9]+/i, '');

  const displayShortTitle = cleanAdvtNo
    ? `${cleanAdvtNo} · ${bj.postTitle}`
    : `${cleanId} · ${bj.postTitle}`;

  return {
    id: cleanId,
    advtNo: cleanAdvtNo,
    slug: cleanSlug,
    title: `${bj.department} — ${bj.postTitle}`,
    shortTitle: displayShortTitle,
    organization: bj.department,
    department: bj.ministryCode,
    category,
    state,
    totalVacancies: bj.vacancies,
    postDate: bj.startDate ? formatFriendlyDate(bj.startDate) : bj.createdAt ? formatFriendlyDate(bj.createdAt) : 'Recently Added',
    lastDate: formatFriendlyDate(bj.deadlineDate),
    examDate: hasExamDate
      ? formatFriendlyDate(bj.examDate)
      : 'Will be announced soon (As per schedule)',
    salary: bj.payLevel || 'As per 7th Central Pay Commission',
    qualificationSummary:
      bj.qualificationSummary ||
      `${bj.educationTier || 'Graduate'} in required discipline from recognized university / board`,
    ageLimitSummary:
      bj.ageLimitSummary ||
      '18 to 32 Years (Relaxations: OBC 3 yrs, SC/ST 5 yrs, PwD 10 yrs)',
    status,
    featured: Boolean(bj.isTrending),
    admitCardStatus:
      (bj.admitCardsReleased && bj.admitCardsReleased > 0) || bj.status === 'Admit Card / Active'
        ? 'RELEASED'
        : 'EXPECTED',
    resultStatus: bj.status === 'Result Announced' ? 'DECLARED' : 'AWAITED',
    answerKeyStatus:
      bj.status === 'Answer Key Out' || bj.status === 'Result Announced'
        ? 'RELEASED'
        : 'NOT_APPLICABLE',
    officialPdfUrl: noticePdf,
    applyOnlineUrl: applyOnline,
    officialSiteUrl: officialSite,
    admitCardUrl: bj.admitCardUrl || ((bj.admitCardsReleased && bj.admitCardsReleased > 0) || bj.status === 'Admit Card / Active' ? applyOnline : undefined),
    answerKeyUrl: bj.answerKeyUrl || undefined,
    syllabusUrl: bj.syllabusUrl || noticePdf,
    importantDates,
    fees: {
      general: bj.applicationFees?.general ?? 100,
      obc: bj.applicationFees?.obc ?? bj.applicationFees?.general ?? 100,
      scSt: bj.applicationFees?.scSt ?? 0,
      female: bj.applicationFees?.female ?? 0,
      paymentMode: bj.applicationFees?.paymentMode || 'Online via Net Banking, Debit / Credit Card, or UPI',
    },
    breakdown,
    selectionStages,
    description:
      bj.description && bj.description.trim().length > 0
        ? bj.description.trim()
        : `${bj.postTitle} announced by ${bj.department} (${bj.ministryCode}). Total vacancies: ${bj.vacancies}. Official advertisement reference: ${bj.advtNo}. Applications strictly accepted online via official commission portal.`,
    faqs:
      bj.faqs && Array.isArray(bj.faqs) && bj.faqs.length > 0
        ? bj.faqs.filter((f) => Boolean(f.question?.trim() && f.answer?.trim()))
        : [
          {
            question: `What is the educational qualification required for ${bj.postTitle}?`,
            answer:
              bj.qualificationSummary ||
              `Candidates must possess a ${bj.educationTier || 'Graduate Degree'} in the relevant discipline from a recognized University or Institute recognized by the Government of India.`,
          },
          {
            question: `What are the category-wise application fees for this recruitment?`,
            answer: `General/EWS/OBC candidates: ₹${bj.applicationFees?.general ?? 100}/-. SC/ST/PwD/Female candidates: Fully Exempted (₹0). Payment mode: ${bj.applicationFees?.paymentMode || 'Online via UPI / Net Banking / Debit Card'}.`,
          },
          {
            question: `Can candidates appearing in final year of graduation apply?`,
            answer: `Candidates awaiting final qualifying degree results may apply provisionally, provided proof of passing is produced before the prescribed verification deadline as specified in the official gazette notification.`,
          },
          {
            question: `How can applicants apply for this vacancy?`,
            answer: `Applications must strictly be submitted through the official portal (${applyOnline}). Physical or postal hard-copy forms will not be accepted.`,
          },
        ],
  };
}

export function mapBackendAdmitCardToQuickLink(item: BackendAdmitCardItem): QuickLinkItem {
  return {
    id: item.customId || item.id,
    title: `${item.department}: ${item.postTitle}`,
    org: item.department.split(' ')[0] || 'Govt',
    date: item.examDate ? formatFriendlyDate(item.examDate) : 'Exam Pass Live',
    badge: 'AVAILABLE',
    badgeColor: 'success',
    linkTo: `/job/${item.slug || item.customId}`,
  };
}

export function mapBackendResultToQuickLink(item: BackendResultItem): QuickLinkItem {
  return {
    id: item.customId || item.id,
    title: `${item.postTitle} (${item.department})`,
    org: item.department.split(' ')[0] || 'Govt',
    date: item.resultAnnouncementDate ? formatFriendlyDate(item.resultAnnouncementDate) : 'Declared',
    badge: 'CUTOFF OUT',
    badgeColor: 'danger',
    linkTo: `/job/${item.slug || item.customId}`,
  };
}
