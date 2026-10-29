import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  RegistrationRecord,
  CarPassRecord,
  AdminUser,
  EventDocument,
  GalleryItem,
  FeedbackRecord
} from '../types';

const REGISTRATIONS_COL = 'registrations';
const CAR_PASSES_COL = 'car_passes';

// ==================== DELEGATE REGISTRATIONS ====================

export async function saveRegistration(record: RegistrationRecord): Promise<void> {
  // Always update local cache immediately
  try {
    const local = getLocalRegistrations();
    const updated = [record, ...local.filter(r => r.id !== record.id)];
    localStorage.setItem('pritilagnik_registrations', JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to cache registration locally', e);
  }

  // Persist to Firestore
  try {
    const docRef = doc(db, REGISTRATIONS_COL, record.id);
    await setDoc(docRef, record);
  } catch (error) {
    console.warn('Firestore saveRegistration warning (fallback to local cache):', error);
  }
}

export async function fetchAllRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const colRef = collection(db, REGISTRATIONS_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const records: RegistrationRecord[] = [];
      snap.forEach(docSnap => {
        records.push(docSnap.data() as RegistrationRecord);
      });
      // Merge with local storage
      const local = getLocalRegistrations();
      const mergedMap = new Map<string, RegistrationRecord>();
      records.forEach(r => mergedMap.set(r.id, r));
      local.forEach(r => {
        if (!mergedMap.has(r.id)) mergedMap.set(r.id, r);
      });
      const mergedList = Array.from(mergedMap.values());
      localStorage.setItem('pritilagnik_registrations', JSON.stringify(mergedList));
      return mergedList;
    }
  } catch (error) {
    console.warn('Fetching registrations from Firestore failed, using local storage cache:', error);
  }

  return getLocalRegistrations();
}

export async function getRegistrationById(id: string): Promise<RegistrationRecord | null> {
  const trimmed = id.trim();
  // Check local first
  const localList = getLocalRegistrations();
  const localFound = localList.find(
    r => r.id.toLowerCase() === trimmed.toLowerCase() || r.phone === trimmed
  );

  try {
    const docRef = doc(db, REGISTRATIONS_COL, trimmed);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as RegistrationRecord;
      // Sync local
      const updated = [data, ...localList.filter(r => r.id !== data.id)];
      localStorage.setItem('pritilagnik_registrations', JSON.stringify(updated));
      return data;
    }
  } catch (error) {
    console.warn('Firestore getRegistrationById error, returning local:', error);
  }

  return localFound || null;
}

export async function updateRegistrationStatus(
  id: string,
  status: 'accepted' | 'declined' | 'pending',
  notes?: string
): Promise<void> {
  const updates: Partial<RegistrationRecord> = { status };
  if (notes !== undefined) updates.notes = notes;
  if (status === 'accepted') {
    updates.confirmedAt = new Date().toISOString();
  }

  // Update local immediately
  try {
    const local = getLocalRegistrations();
    const updated = local.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem('pritilagnik_registrations', JSON.stringify(updated));
  } catch (e) {}

  // Update Firestore
  try {
    const docRef = doc(db, REGISTRATIONS_COL, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.warn('Firestore updateRegistrationStatus failed (updated locally):', error);
  }
}

export async function markConfirmationSent(id: string): Promise<void> {
  const updates = {
    confirmationSent: true,
    confirmedAt: new Date().toISOString()
  };

  try {
    const local = getLocalRegistrations();
    const updated = local.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem('pritilagnik_registrations', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, REGISTRATIONS_COL, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.warn('Firestore markConfirmationSent warning:', error);
  }
}

export async function removeRegistration(id: string): Promise<void> {
  try {
    const local = getLocalRegistrations();
    const updated = local.filter(r => r.id !== id);
    localStorage.setItem('pritilagnik_registrations', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, REGISTRATIONS_COL, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('Firestore removeRegistration warning:', error);
  }
}

export function getLocalRegistrations(): RegistrationRecord[] {
  try {
    const stored = localStorage.getItem('pritilagnik_registrations');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

// ==================== CAR & VEHICLE PASSES ====================

export async function saveCarPass(record: CarPassRecord): Promise<void> {
  try {
    const local = getLocalCarPasses();
    const updated = [record, ...local.filter(r => r.id !== record.id)];
    localStorage.setItem('pritilagnik_car_passes', JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to cache car pass locally', e);
  }

  try {
    const docRef = doc(db, CAR_PASSES_COL, record.id);
    await setDoc(docRef, record);
  } catch (error) {
    console.warn('Firestore saveCarPass warning (fallback to local cache):', error);
  }
}

export async function fetchAllCarPasses(): Promise<CarPassRecord[]> {
  try {
    const colRef = collection(db, CAR_PASSES_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const records: CarPassRecord[] = [];
      snap.forEach(docSnap => {
        records.push(docSnap.data() as CarPassRecord);
      });
      const local = getLocalCarPasses();
      const mergedMap = new Map<string, CarPassRecord>();
      records.forEach(r => mergedMap.set(r.id, r));
      local.forEach(r => {
        if (!mergedMap.has(r.id)) mergedMap.set(r.id, r);
      });
      const mergedList = Array.from(mergedMap.values());
      localStorage.setItem('pritilagnik_car_passes', JSON.stringify(mergedList));
      return mergedList;
    }
  } catch (error) {
    console.warn('Fetching car passes from Firestore failed, using local storage cache:', error);
  }

  return getLocalCarPasses();
}

export async function getCarPassById(idOrVehicle: string): Promise<CarPassRecord | null> {
  const query = idOrVehicle.trim().toUpperCase();
  const localList = getLocalCarPasses();
  const localFound = localList.find(
    c => c.id.toUpperCase() === query ||
         c.carRegistrationNumber.toUpperCase().replace(/\s+/g, '') === query.replace(/\s+/g, '') ||
         c.contactNumber === query
  );

  try {
    const docRef = doc(db, CAR_PASSES_COL, query);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as CarPassRecord;
      const updated = [data, ...localList.filter(r => r.id !== data.id)];
      localStorage.setItem('pritilagnik_car_passes', JSON.stringify(updated));
      return data;
    }
  } catch (error) {
    console.warn('Firestore getCarPassById warning:', error);
  }

  return localFound || null;
}

export async function updateCarPassStatus(
  id: string,
  status: 'accepted' | 'declined' | 'pending',
  allocatedZone?: string,
  notes?: string
): Promise<void> {
  const updates: Partial<CarPassRecord> = { status };
  if (allocatedZone !== undefined) updates.allocatedZone = allocatedZone;
  if (notes !== undefined) updates.notes = notes;
  if (status === 'accepted') {
    updates.confirmedAt = new Date().toISOString();
  }

  try {
    const local = getLocalCarPasses();
    const updated = local.map(c => c.id === id ? { ...c, ...updates } : c);
    localStorage.setItem('pritilagnik_car_passes', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, CAR_PASSES_COL, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.warn('Firestore updateCarPassStatus warning:', error);
  }
}

export async function removeCarPass(id: string): Promise<void> {
  try {
    const local = getLocalCarPasses();
    const updated = local.filter(c => c.id !== id);
    localStorage.setItem('pritilagnik_car_passes', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, CAR_PASSES_COL, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('Firestore removeCarPass warning:', error);
  }
}

export function getLocalCarPasses(): CarPassRecord[] {
  try {
    const stored = localStorage.getItem('pritilagnik_car_passes');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

// ==================== MULTI-ADMIN PROFILES ====================
const ADMINS_COL = 'admins';

export async function fetchAllAdmins(): Promise<AdminUser[]> {
  const defaultAdmins: AdminUser[] = [
    {
      id: 'admin-root',
      name: 'Central Secretariat Root Admin',
      email: 'admin@dotma.org',
      role: 'Root Admin',
      addedBy: 'System Bootstrap',
      createdAt: '2026-10-01T00:00:00Z'
    }
  ];

  try {
    const colRef = collection(db, ADMINS_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const records: AdminUser[] = [];
      snap.forEach(docSnap => {
        records.push(docSnap.data() as AdminUser);
      });
      // ensure root admin is present
      if (!records.some(a => a.email.toLowerCase() === 'admin@dotma.org')) {
        records.unshift(defaultAdmins[0]);
      }
      localStorage.setItem('pritilagnik_admins', JSON.stringify(records));
      return records;
    }
  } catch (err) {
    console.warn('Fetching admins failed, fallback to local cache:', err);
  }

  try {
    const stored = localStorage.getItem('pritilagnik_admins');
    return stored ? JSON.parse(stored) : defaultAdmins;
  } catch (e) {
    return defaultAdmins;
  }
}

export async function saveAdminUser(admin: AdminUser): Promise<void> {
  try {
    const current = await fetchAllAdmins();
    const updated = [admin, ...current.filter(a => a.id !== admin.id)];
    localStorage.setItem('pritilagnik_admins', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, ADMINS_COL, admin.id);
    await setDoc(docRef, admin);
  } catch (err) {
    console.warn('Firestore saveAdminUser warning:', err);
  }
}

export async function removeAdminUser(id: string): Promise<void> {
  try {
    const current = await fetchAllAdmins();
    const updated = current.filter(a => a.id !== id);
    localStorage.setItem('pritilagnik_admins', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, ADMINS_COL, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore removeAdminUser warning:', err);
  }
}

// ==================== EVENT DOCUMENTS ====================
const DOCUMENTS_COL = 'event_documents';

export async function fetchAllEventDocuments(): Promise<EventDocument[]> {
  const defaultDocs: EventDocument[] = [
    {
      id: "doc-1",
      title: "Priti-Lagnik 2026 Official Programme Guide",
      category: "Schedule",
      fileType: "pdf",
      fileName: "PritiLagnik_2026_Schedule.pdf",
      fileSize: "2.4 MB",
      uploadedAt: "2026-10-25"
    },
    {
      id: "doc-2",
      title: "Delegate Arrival, Accommodation & Parking Advisory",
      category: "Guidelines",
      fileType: "pdf",
      fileName: "Travel_and_Parking_Advisory_Dotma.pdf",
      fileSize: "1.8 MB",
      uploadedAt: "2026-10-26"
    },
    {
      id: "doc-3",
      title: "Volunteer Seva Manual & Emergency Contacts",
      category: "Guidelines",
      fileType: "docx",
      fileName: "Volunteer_Seva_Manual_2026.docx",
      fileSize: "950 KB",
      uploadedAt: "2026-10-27"
    }
  ];

  try {
    const colRef = collection(db, DOCUMENTS_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const docs: EventDocument[] = [];
      snap.forEach(d => docs.push(d.data() as EventDocument));
      localStorage.setItem('pritilagnik_documents', JSON.stringify(docs));
      return docs;
    }
  } catch (err) {
    console.warn('Fetching documents failed, fallback to local cache:', err);
  }

  try {
    const stored = localStorage.getItem('pritilagnik_documents');
    return stored ? JSON.parse(stored) : defaultDocs;
  } catch (e) {
    return defaultDocs;
  }
}

export async function saveEventDocument(docItem: EventDocument): Promise<void> {
  try {
    const current = await fetchAllEventDocuments();
    const updated = [docItem, ...current.filter(d => d.id !== docItem.id)];
    localStorage.setItem('pritilagnik_documents', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, DOCUMENTS_COL, docItem.id);
    await setDoc(docRef, docItem);
  } catch (err) {
    console.warn('Firestore saveEventDocument warning:', err);
  }
}

export async function removeEventDocument(id: string): Promise<void> {
  try {
    const current = await fetchAllEventDocuments();
    const updated = current.filter(d => d.id !== id);
    localStorage.setItem('pritilagnik_documents', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, DOCUMENTS_COL, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore removeEventDocument warning:', err);
  }
}

// ==================== DYNAMIC GALLERY ITEMS ====================
const GALLERY_COL = 'gallery_items';

export async function fetchDynamicGalleryItems(): Promise<GalleryItem[]> {
  const fallbackGallery: GalleryItem[] = [
    {
      id: "gal-1",
      type: "image",
      title: "Divine Portrait of Sree Sree Thakur Anukulchandra",
      category: "Rituals",
      url: "/src/assets/images/sree_sree_thakur.webp",
      thumbnail: "/src/assets/images/sree_sree_thakur.webp",
      description: "The divine countenance and compassionate gaze guiding millions along the path of existential elevation.",
      year: "Sacred Archival"
    },
    {
      id: "gal-2",
      type: "image",
      title: "Jagat Janani Sree Sree Boroma",
      category: "Rituals",
      url: "/src/assets/images/sree_sree_boroma.webp",
      thumbnail: "/src/assets/images/sree_sree_boroma.webp",
      description: "Embodiment of universal motherhood, compassion, and divine maternal grace.",
      year: "Sacred Archival"
    },
    {
      id: "gal-3",
      type: "image",
      title: "Revered Boroda (Amarendranath Chakravarty)",
      category: "Past Gatherings",
      url: "/src/assets/images/sree_sree_boroda.webp",
      thumbnail: "/src/assets/images/sree_sree_boroda.webp",
      description: "The architect of mass organizational seva, Anandabazar, and spiritual conventions.",
      year: "Sacred Archival"
    },
    {
      id: "gal-4",
      type: "image",
      title: "Revered Acharyadev",
      category: "Past Gatherings",
      url: "/src/assets/images/sree_sree_acharya.webp",
      thumbnail: "/src/assets/images/sree_sree_acharya.webp",
      description: "Leading the global spiritual mission of love, eco-harmony, and universal peace.",
      year: "Contemporary"
    },
    {
      id: "gal-5",
      type: "video",
      title: "Teachings of Joyguru: Sree Sree Thakur Anukulchandra Divine Amritavani",
      category: "Rituals",
      url: "https://www.youtube.com/embed?listType=search&list=Teachings+of+Joyguru+Sree+Sree+Thakur+Anukulchandra",
      thumbnail: "/src/assets/images/sree_sree_thakur.webp",
      description: "Sublime spiritual discourses and guiding amritavani of Sree Sree Thakur Anukulchandra (Joyguru) on concentric life, universal love, adherence to the Living Ideal, and human elevation.",
      duration: "18:40 min",
      year: "Sacred Teachings"
    },
    {
      id: "gal-6",
      type: "video",
      title: "Teachings of Joyguru: Satyanusaran & Life Elevation Principles",
      category: "Past Gatherings",
      url: "https://www.youtube.com/embed?listType=search&list=Joyguru+Satyanusaran+Discourses",
      thumbnail: "/src/assets/images/priti_lagnik_logo.webp",
      description: "Profound exposition of Satyanusaran teachings by revered exponents during Satsang philosophical sessions.",
      duration: "24:15 min",
      year: "Discourses"
    }
  ];

  try {
    const colRef = collection(db, GALLERY_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: GalleryItem[] = [];
      snap.forEach(d => items.push(d.data() as GalleryItem));
      // Merge with default archival items
      const mergedMap = new Map<string, GalleryItem>();
      items.forEach(i => mergedMap.set(i.id, i));
      fallbackGallery.forEach(i => {
        if (!mergedMap.has(i.id)) mergedMap.set(i.id, i);
      });
      const list = Array.from(mergedMap.values());
      localStorage.setItem('pritilagnik_gallery', JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Fetching gallery failed, fallback to local cache:', err);
  }

  try {
    const stored = localStorage.getItem('pritilagnik_gallery');
    return stored ? JSON.parse(stored) : fallbackGallery;
  } catch (e) {
    return fallbackGallery;
  }
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  try {
    const current = await fetchDynamicGalleryItems();
    const updated = [item, ...current.filter(i => i.id !== item.id)];
    localStorage.setItem('pritilagnik_gallery', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, GALLERY_COL, item.id);
    await setDoc(docRef, item);
  } catch (err) {
    console.warn('Firestore saveGalleryItem warning:', err);
  }
}

export async function removeGalleryItem(id: string): Promise<void> {
  try {
    const current = await fetchDynamicGalleryItems();
    const updated = current.filter(i => i.id !== id);
    localStorage.setItem('pritilagnik_gallery', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, GALLERY_COL, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore removeGalleryItem warning:', err);
  }
}

// ==================== FEEDBACK SUBMISSIONS ====================
const FEEDBACK_COL = 'feedback';

export async function saveFeedback(record: FeedbackRecord): Promise<void> {
  try {
    const local = getLocalFeedback();
    const updated = [record, ...local];
    localStorage.setItem('pritilagnik_feedback', JSON.stringify(updated));
  } catch (e) {}

  try {
    const docRef = doc(db, FEEDBACK_COL, record.id);
    await setDoc(docRef, record);
  } catch (err) {
    console.warn('Firestore saveFeedback warning:', err);
  }
}

export async function fetchAllFeedback(): Promise<FeedbackRecord[]> {
  try {
    const colRef = collection(db, FEEDBACK_COL);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const records: FeedbackRecord[] = [];
      snap.forEach(d => records.push(d.data() as FeedbackRecord));
      localStorage.setItem('pritilagnik_feedback', JSON.stringify(records));
      return records;
    }
  } catch (err) {
    console.warn('Fetching feedback failed, using local cache:', err);
  }

  return getLocalFeedback();
}

export function getLocalFeedback(): FeedbackRecord[] {
  try {
    const stored = localStorage.getItem('pritilagnik_feedback');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

