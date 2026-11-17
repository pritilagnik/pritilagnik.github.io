import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { VisitorLog, VisitorStats } from '../types';

const VISITOR_STATS_COL = 'visitor_stats';
const VISITOR_LOGS_COL = 'visitor_logs';
const SESSION_EMAILS_KEY = 'pritilagnik_session_emails';

let inFlightVisitPromise: Promise<void> | null = null;
let authListenerInitialized = false;

export function getTodayDateKey(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

export interface DeviceInfo {
  userAgent: string;
  deviceType: 'mobile' | 'desktop';
  mobileOs: 'iOS' | 'Android' | 'Other' | 'N/A';
}

export function detectDeviceInfo(): DeviceInfo {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const uaLower = ua.toLowerCase();
  const platform = typeof navigator !== 'undefined' ? (navigator.platform || '').toLowerCase() : '';
  const maxTouchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0;

  // iPadOS 13+ may report MacIntel with touch points > 1
  const isIPadOS = platform === 'macintel' && maxTouchPoints > 1;
  const isIOS = /iphone|ipad|ipod/.test(uaLower) || isIPadOS;
  const isAndroid = /android/.test(uaLower);
  const isOtherMobile = /webos|blackberry|iemobile|opera mini|mobile|tablet|silk|kindle/.test(uaLower);
  const navUaDataMobile =
    typeof navigator !== 'undefined' && (navigator as { userAgentData?: { mobile?: boolean } }).userAgentData?.mobile === true;

  const isMobile = isIOS || isAndroid || isOtherMobile || navUaDataMobile;

  let mobileOs: 'iOS' | 'Android' | 'Other' | 'N/A' = 'N/A';
  if (isMobile) {
    if (isIOS) mobileOs = 'iOS';
    else if (isAndroid) mobileOs = 'Android';
    else mobileOs = 'Other';
  }

  return {
    userAgent: ua.slice(0, 512) || 'unknown',
    deviceType: isMobile ? 'mobile' : 'desktop',
    mobileOs,
  };
}

async function fetchVisitorIp(): Promise<string> {
  const endpoints: Array<{ url: string; field: string }> = [
    { url: 'https://api.ipify.org?format=json', field: 'ip' },
    { url: 'https://api64.ipify.org?format=json', field: 'ip' },
    { url: 'https://ipwho.is/', field: 'ip' },
  ];

  for (const ep of endpoints) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    try {
      const res = await fetch(ep.url, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const ip = data?.[ep.field];
        if (typeof ip === 'string' && ip.trim().length > 0) {
          return ip.trim().slice(0, 64);
        }
      }
    } catch {
      clearTimeout(timer);
    }
  }

  return 'unavailable';
}

export function collectSessionEmails(): string[] {
  const emailSet = new Set<string>();

  const addEmail = (raw: string | null | undefined) => {
    if (!raw) return;
    const cleaned = raw.trim().toLowerCase().slice(0, 128);
    if (cleaned.includes('@') && cleaned.includes('.')) {
      emailSet.add(cleaned);
    }
  };

  // 1. Firebase Auth user email if signed in
  addEmail(auth.currentUser?.email);

  // 2. Active Secretariat Admin session email if signed in
  try {
    if (localStorage.getItem('pritilagnik_admin_session') === 'true') {
      addEmail(localStorage.getItem('pritilagnik_admin_email'));
    }
  } catch {
    // ignore storage errors
  }

  // 3. Stored emails from current browser session
  try {
    const rawList = sessionStorage.getItem(SESSION_EMAILS_KEY);
    if (rawList) {
      const parsed = JSON.parse(rawList);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (typeof item === 'string') addEmail(item);
        });
      }
    }
  } catch {
    // ignore storage errors
  }

  return Array.from(emailSet).slice(0, 10);
}

export async function recordSessionEmail(email: string): Promise<void> {
  const cleaned = email?.trim().toLowerCase().slice(0, 128);
  if (!cleaned || !cleaned.includes('@') || !cleaned.includes('.')) return;

  const existing = collectSessionEmails();
  const updated = Array.from(new Set([...existing, cleaned])).slice(0, 10);

  try {
    sessionStorage.setItem(SESSION_EMAILS_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }

  const dateKey = getTodayDateKey();
  let visitId: string | null = null;
  try {
    visitId = sessionStorage.getItem(`pritilagnik_visit_id_${dateKey}`);
  } catch {
    visitId = null;
  }

  if (!visitId) return;

  const logPath = `${VISITOR_LOGS_COL}/${visitId}`;
  try {
    await updateDoc(doc(db, VISITOR_LOGS_COL, visitId), {
      sessionEmails: updated,
      primaryEmail: updated[0] || '',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Log structured Firestore error per Firebase integration guidelines without crashing UX
    try {
      handleFirestoreError(error, OperationType.UPDATE, logPath);
    } catch {
      // handled silently so form submissions never fail due to telemetry
    }
  }
}

function initAuthEmailWatcher(): void {
  if (authListenerInitialized) return;
  authListenerInitialized = true;
  try {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        void recordSessionEmail(user.email);
      }
    });
  } catch {
    // ignore auth listener setup errors
  }
}

function createVisitId(dateKey: string): string {
  const compactDate = dateKey.replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).slice(2, 10);
  return `VIS-${compactDate}-${Date.now().toString(36)}-${randomSuffix}`;
}

export async function recordVisitorVisit(): Promise<void> {
  initAuthEmailWatcher();

  const dateKey = getTodayDateKey();
  const sessionVisitKey = `pritilagnik_visit_id_${dateKey}`;

  try {
    if (sessionStorage.getItem(sessionVisitKey)) {
      return;
    }
  } catch {
    // proceed even if sessionStorage is restricted
  }

  if (inFlightVisitPromise) {
    return inFlightVisitPromise;
  }

  inFlightVisitPromise = (async () => {
    const visitId = createVisitId(dateKey);
    const nowIso = new Date().toISOString();
    const device = detectDeviceInfo();
    const ip = await fetchVisitorIp();
    const sessionEmails = collectSessionEmails();

    try {
      sessionStorage.setItem(sessionVisitKey, visitId);
      if (sessionEmails.length > 0) {
        sessionStorage.setItem(SESSION_EMAILS_KEY, JSON.stringify(sessionEmails));
      }
    } catch {
      // ignore storage errors
    }

    const allTimeRef = doc(db, VISITOR_STATS_COL, 'all_time');
    const dailyRef = doc(db, VISITOR_STATS_COL, `daily_${dateKey}`);
    const logRef = doc(db, VISITOR_LOGS_COL, visitId);

    const pagePath =
      typeof window !== 'undefined'
        ? `${window.location.pathname || '/'}${window.location.hash || ''}`.slice(0, 256)
        : '/';
    const referrer =
      typeof document !== 'undefined' ? (document.referrer || '').slice(0, 512) : '';

    const logEntry: VisitorLog = {
      id: visitId.slice(0, 64),
      date: dateKey,
      userAgent: device.userAgent,
      ip,
      deviceType: device.deviceType,
      mobileOs: device.mobileOs,
      sessionEmails,
      primaryEmail: sessionEmails[0] || '',
      pagePath,
      referrer,
      visitedAt: nowIso,
      updatedAt: nowIso,
    };

    try {
      await Promise.all([
        setDoc(
          allTimeRef,
          {
            totalCount: increment(1),
            updatedAt: nowIso,
          },
          { merge: true }
        ),
        setDoc(
          dailyRef,
          {
            date: dateKey,
            count: increment(1),
            updatedAt: nowIso,
          },
          { merge: true }
        ),
        setDoc(logRef, logEntry),
      ]);
    } catch (error) {
      // Clear session lock if write failed so a retry can succeed later
      try {
        sessionStorage.removeItem(sessionVisitKey);
      } catch {
        // ignore
      }
      handleFirestoreError(error, OperationType.WRITE, VISITOR_STATS_COL);
    }
  })().finally(() => {
    inFlightVisitPromise = null;
  });

  return inFlightVisitPromise;
}

export async function fetchVisitorCounts(): Promise<VisitorStats> {
  const dateKey = getTodayDateKey();
  let dailyCount = 0;
  let allTimeCount = 0;

  try {
    const [dailySnap, allTimeSnap] = await Promise.all([
      getDoc(doc(db, VISITOR_STATS_COL, `daily_${dateKey}`)),
      getDoc(doc(db, VISITOR_STATS_COL, 'all_time')),
    ]);

    if (dailySnap.exists()) {
      dailyCount = Number(dailySnap.data()?.count) || 0;
    }
    if (allTimeSnap.exists()) {
      allTimeCount = Number(allTimeSnap.data()?.totalCount) || 0;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, VISITOR_STATS_COL);
  }

  return { dailyCount, allTimeCount, dateKey };
}

export function subscribeToVisitorCounts(
  onUpdate: (stats: VisitorStats) => void
): () => void {
  const dateKey = getTodayDateKey();
  let dailyCount = 0;
  let allTimeCount = 0;
  let hasDaily = false;
  let hasAllTime = false;

  const emit = () => {
    if (hasDaily || hasAllTime) {
      onUpdate({ dailyCount, allTimeCount, dateKey });
    }
  };

  const dailyPath = `${VISITOR_STATS_COL}/daily_${dateKey}`;
  const allTimePath = `${VISITOR_STATS_COL}/all_time`;

  const unsubDaily = onSnapshot(
    doc(db, VISITOR_STATS_COL, `daily_${dateKey}`),
    (snap) => {
      hasDaily = true;
      dailyCount = snap.exists() ? Number(snap.data()?.count) || 0 : 0;
      emit();
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, dailyPath);
      } catch {
        // handled cleanly
      }
    }
  );

  const unsubAllTime = onSnapshot(
    doc(db, VISITOR_STATS_COL, 'all_time'),
    (snap) => {
      hasAllTime = true;
      allTimeCount = snap.exists() ? Number(snap.data()?.totalCount) || 0 : 0;
      emit();
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, allTimePath);
      } catch {
        // handled cleanly
      }
    }
  );

  return () => {
    unsubDaily();
    unsubAllTime();
  };
}
