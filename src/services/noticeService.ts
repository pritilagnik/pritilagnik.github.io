import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { NoticeCategory, NoticeItem, NoticePriority } from '../types';

const NOTICES_COL = 'notices';
const LOCAL_NOTICES_KEY = 'pritilagnik_notices';

const VALID_CATEGORIES: NoticeCategory[] = [
  'General',
  'Schedule',
  'Accommodation',
  'Transport',
  'Urgent',
  'Seva',
];

const VALID_PRIORITIES: NoticePriority[] = ['Normal', 'Important', 'Urgent'];

function getLocalNotices(): NoticeItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_NOTICES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setLocalNotices(notices: NoticeItem[]): void {
  try {
    localStorage.setItem(LOCAL_NOTICES_KEY, JSON.stringify(notices));
  } catch {
    // ignore storage quota errors
  }
}

export function sortNotices(items: NoticeItem[]): NoticeItem[] {
  return [...items].sort((a, b) => {
    if (Boolean(a.isPinned) !== Boolean(b.isPinned)) {
      return a.isPinned ? -1 : 1;
    }
    const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
    const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
    return timeB - timeA;
  });
}

export function sanitizeNotice(input: Partial<NoticeItem> & { id?: string }): NoticeItem {
  const nowIso = new Date().toISOString();
  const rawId = (input.id || `NTC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`)
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 64);

  const category: NoticeCategory = VALID_CATEGORIES.includes(input.category as NoticeCategory)
    ? (input.category as NoticeCategory)
    : 'General';

  const priority: NoticePriority = VALID_PRIORITIES.includes(input.priority as NoticePriority)
    ? (input.priority as NoticePriority)
    : 'Normal';

  const title = (input.title || 'Official Announcement').trim().slice(0, 160) || 'Official Announcement';
  const content = (input.content || '').trim().slice(0, 5000) || title;
  const linkUrl = (input.linkUrl || '').trim().slice(0, 512);
  const createdBy = (input.createdBy || 'Secretariat Admin').trim().slice(0, 128);
  const createdAt = (input.createdAt || nowIso).slice(0, 64);
  const updatedAt = nowIso.slice(0, 64);

  return {
    id: rawId,
    title,
    content,
    category,
    priority,
    isActive: input.isActive !== undefined ? Boolean(input.isActive) : true,
    showInTicker: input.showInTicker !== undefined ? Boolean(input.showInTicker) : true,
    isPinned: Boolean(input.isPinned),
    linkUrl,
    createdBy,
    createdAt,
    updatedAt,
  };
}

export async function fetchAllNotices(): Promise<NoticeItem[]> {
  try {
    const snap = await getDocs(collection(db, NOTICES_COL));
    const list: NoticeItem[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as Partial<NoticeItem>;
      list.push(sanitizeNotice({ ...data, id: data.id || docSnap.id, updatedAt: data.updatedAt }));
    });
    // Preserve exact stored updatedAt/createdAt when reading
    const rawList: NoticeItem[] = [];
    snap.forEach((docSnap) => {
      const d = docSnap.data() as NoticeItem;
      rawList.push({
        id: d.id || docSnap.id,
        title: d.title || '',
        content: d.content || '',
        category: VALID_CATEGORIES.includes(d.category) ? d.category : 'General',
        priority: VALID_PRIORITIES.includes(d.priority) ? d.priority : 'Normal',
        isActive: Boolean(d.isActive),
        showInTicker: Boolean(d.showInTicker),
        isPinned: Boolean(d.isPinned),
        linkUrl: d.linkUrl || '',
        createdBy: d.createdBy || 'Secretariat Admin',
        createdAt: d.createdAt || new Date().toISOString(),
        updatedAt: d.updatedAt || d.createdAt || new Date().toISOString(),
      });
    });
    const sorted = sortNotices(rawList);
    setLocalNotices(sorted);
    return sorted;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.LIST, NOTICES_COL);
    } catch {
      // fall back to local cache
    }
    return sortNotices(getLocalNotices());
  }
}

export function subscribeToNotices(
  onUpdate: (notices: NoticeItem[]) => void
): () => void {
  const cached = getLocalNotices();
  if (cached.length > 0) {
    onUpdate(sortNotices(cached));
  }

  return onSnapshot(
    collection(db, NOTICES_COL),
    (snap) => {
      const list: NoticeItem[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data() as NoticeItem;
        list.push({
          id: d.id || docSnap.id,
          title: d.title || '',
          content: d.content || '',
          category: VALID_CATEGORIES.includes(d.category) ? d.category : 'General',
          priority: VALID_PRIORITIES.includes(d.priority) ? d.priority : 'Normal',
          isActive: Boolean(d.isActive),
          showInTicker: Boolean(d.showInTicker),
          isPinned: Boolean(d.isPinned),
          linkUrl: d.linkUrl || '',
          createdBy: d.createdBy || 'Secretariat Admin',
          createdAt: d.createdAt || new Date().toISOString(),
          updatedAt: d.updatedAt || d.createdAt || new Date().toISOString(),
        });
      });
      const sorted = sortNotices(list);
      setLocalNotices(sorted);
      onUpdate(sorted);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, NOTICES_COL);
      } catch {
        // handled gracefully
      }
    }
  );
}

export async function saveNotice(notice: Partial<NoticeItem> & { title: string; content: string }): Promise<NoticeItem> {
  const sanitized = sanitizeNotice(notice);
  const docPath = `${NOTICES_COL}/${sanitized.id}`;

  const existingLocal = getLocalNotices();
  const updatedLocal = sortNotices([sanitized, ...existingLocal.filter((n) => n.id !== sanitized.id)]);
  setLocalNotices(updatedLocal);

  try {
    await setDoc(doc(db, NOTICES_COL, sanitized.id), sanitized);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }

  return sanitized;
}

export async function deleteNotice(id: string): Promise<void> {
  const docPath = `${NOTICES_COL}/${id}`;
  const existingLocal = getLocalNotices();
  setLocalNotices(existingLocal.filter((n) => n.id !== id));

  try {
    await deleteDoc(doc(db, NOTICES_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
