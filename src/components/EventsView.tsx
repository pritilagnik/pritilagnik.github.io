import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Printer,
  Download,
  Filter,
  CheckCircle2,
  FileText,
  ChevronRight,
  Upload,
  Trash2,
  Plus,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { EVENT_SCHEDULE, EVENT_DETAILS } from '../data/mahotsavData';
import { EventScheduleItem, EventDocument } from '../types';
import {
  fetchAllEventDocuments,
  saveEventDocument,
  removeEventDocument
} from '../services/registrationService';

export const EventsView: React.FC = () => {
  // Calendar state
  const [selectedDay, setSelectedDay] = useState<number>(2); // Default to Main Day 2 (Dec 20)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSession, setActiveSession] = useState<EventScheduleItem | null>(null);

  // Documents state
  const [documents, setDocuments] = useState<EventDocument[]>([]);
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('All');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');

  // Admin document management state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pritilagnik_admin_session') === 'true';
    } catch {
      return false;
    }
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState('admin@dotma.org');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');

  // Document Upload Form state
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventDocument['category']>('Schedule');
  const [newFileType, setNewFileType] = useState<'pdf' | 'docx'>('pdf');
  const [newDescription, setNewDescription] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileSize, setNewFileSize] = useState('');
  const [newFileData, setNewFileData] = useState<string>('');
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);
  const [docSuccessNotice, setDocSuccessNotice] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await fetchAllEventDocuments();
      setDocuments(data);
    } catch (err) {
      console.warn('Error loading documents:', err);
    }
  };

  const days = [
    {
      dayNumber: 1,
      dateStr: 'Dec 19, 2026',
      weekday: 'Saturday',
      title: 'Adhivasa & Grand Shobhayatra',
      tag: 'Opening Confluence'
    },
    {
      dayNumber: 2,
      dateStr: 'Dec 20, 2026',
      weekday: 'Sunday',
      title: 'Maha Mahotsav & Priti-Lagnik Sammelan',
      tag: 'Main Event Day'
    },
    {
      dayNumber: 3,
      dateStr: 'Dec 21, 2026',
      weekday: 'Monday',
      title: 'Universal Peace Conclave & Valedictory',
      tag: 'Sacred Conclusion'
    },
    {
      dayNumber: 0,
      dateStr: 'All 3 Days',
      weekday: 'Complete',
      title: 'Full Festival Program Timeline',
      tag: 'Consolidated View'
    }
  ];

  const sessionCategories = ['All', 'Ritual', 'Satsang', 'Cultural', 'Symposium', 'Seva'];
  const documentCategories = ['All', 'Schedule', 'Guidelines', 'Souvenir', 'Prasadam', 'Map', 'Brochure', 'Notice'];

  const filteredEvents = EVENT_SCHEDULE.filter((item) => {
    const matchesDay = selectedDay === 0 || item.day === selectedDay;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesCat && matchesSearch;
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesCat = selectedDocCategory === 'All' || doc.category === selectedDocCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(docSearchQuery.toLowerCase())) ||
      doc.category.toLowerCase().includes(docSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePrintSchedule = () => {
    window.print();
  };

  // Admin login handler for document management
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail.trim().toLowerCase() === 'admin@dotma.org' && adminPassword === 'PritiLagnik@2026') {
      setIsAdmin(true);
      localStorage.setItem('pritilagnik_admin_session', 'true');
      localStorage.setItem('pritilagnik_admin_email', 'admin@dotma.org');
      setShowAdminLoginModal(false);
      setAdminAuthError('');
      setAdminPassword('');
      setShowUploadForm(true);
    } else {
      setAdminAuthError('Invalid secretariat credentials. Check email and password.');
    }
  };

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    const isDocx = extension === 'docx' || extension === 'doc';
    const isPdf = extension === 'pdf';

    if (!isDocx && !isPdf) {
      alert('Please upload a PDF (.pdf) or Word document (.docx / .doc)');
      return;
    }

    setNewFileType(isDocx ? 'docx' : 'pdf');
    setNewFileName(file.name);

    // Format file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB < 1) {
      setNewFileSize(`${Math.round(file.size / 1024)} KB`);
    } else {
      setNewFileSize(`${sizeInMB.toFixed(1)} MB`);
    }

    if (!newTitle) {
      // Auto-populate title from filename if empty
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setNewTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    // Read file as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewFileData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit new document
  const handlePublishDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please enter a document title.');
      return;
    }

    setIsSubmittingDoc(true);
    try {
      const docItem: EventDocument = {
        id: `doc-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        fileType: newFileType,
        fileName: newFileName || `${newTitle.trim().replace(/\s+/g, '_')}.${newFileType}`,
        fileSize: newFileSize || '1.5 MB',
        fileData: newFileData || undefined,
        description: newDescription.trim() || undefined,
        uploadedAt: new Date().toISOString().split('T')[0]
      };

      await saveEventDocument(docItem);
      await loadDocuments();

      setDocSuccessNotice(`"${docItem.title}" published successfully!`);
      setTimeout(() => setDocSuccessNotice(''), 4000);

      // Reset form
      setNewTitle('');
      setNewDescription('');
      setNewFileName('');
      setNewFileSize('');
      setNewFileData('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setShowUploadForm(false);
    } catch (err) {
      console.error('Failed to save document:', err);
      alert('Failed to publish document. Please try again.');
    } finally {
      setIsSubmittingDoc(false);
    }
  };

  // Delete document
  const handleDeleteDocument = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"? Attendees will no longer see this document.`)) {
      try {
        await removeEventDocument(id);
        await loadDocuments();
        setDocSuccessNotice(`Document "${title}" removed.`);
        setTimeout(() => setDocSuccessNotice(''), 3000);
      } catch (err) {
        console.error('Failed to remove document:', err);
      }
    }
  };

  // Download document handler
  const handleDownloadDoc = (doc: EventDocument) => {
    if (doc.fileData) {
      const a = document.createElement('a');
      a.href = doc.fileData;
      a.download = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.${doc.fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (doc.url && doc.url.startsWith('http')) {
      window.open(doc.url, '_blank');
      return;
    }

    // Fallback: Generate a formatted official text notice
    const content = `=====================================================
PRITI-LAGNIK MAHA MAHOTSAV 2026
Central Organising Committee & Secretariat
West Dangarkuthi, Dotma, Kokrajhar, Assam, India - 783347
=====================================================

DOCUMENT: ${doc.title}
CATEGORY: ${doc.category}
ISSUED ON: ${doc.uploadedAt}
FILE FORMAT: ${doc.fileType.toUpperCase()}

OVERVIEW:
${doc.description || 'Official communication and guidelines issued by the Secretariat of Priti-Lagnik Maha Mahotsav 2026.'}

EVENT DATES:
19 - 21 December 2026 (Main Concourse: 20 December 2026)
VENUE: West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347

HELPLINE & ENQUIRIES:
Phone: +91 94350 12345 / +91 97060 45678
Email: secretariat@dotma.org
Developer Link: https://www.narzary.com

Joyguru!
=====================================================`;

    const blob = new Blob([content], {
      type: doc.fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.${doc.fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Interactive Festival Calendar</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Events & Commemorative Schedules
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Main Commemoration: <strong>20 December 2026</strong> at West Dangarkuthi, Dotma, Kokrajhar. Toggle through the interactive festival calendar to explore dawn kirtans, discourses, Anandabazar Annadan, and cultural symposiums.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrintSchedule}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Complete Program Guide</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE CALENDAR SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {days.map((d) => {
            const isSelected = selectedDay === d.dayNumber;
            return (
              <button
                key={d.dayNumber}
                onClick={() => {
                  setSelectedDay(d.dayNumber);
                  setActiveSession(null);
                }}
                className={`p-5 rounded-3xl text-left border-2 transition-all shadow-sm ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xl scale-[1.02]'
                    : 'bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {d.tag}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                    {d.weekday}
                  </span>
                </div>

                <div className={`text-xl sm:text-2xl font-serif-cinzel font-bold mt-1 ${isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-100'}`}>
                  {d.dateStr}
                </div>

                <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isSelected ? 'text-amber-100' : 'text-stone-500 dark:text-stone-400'}`}>
                  {d.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Category & Search Filter Bar for Sessions */}
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {sessionCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search session, venue, speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Timeline Event Cards */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
            <Calendar className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
              No sessions match your search criteria.
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Try clearing filters or switching to another day in the calendar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => setActiveSession(ev)}
                className="cursor-pointer group p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left Info: Day & Time */}
                <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-stone-100 dark:border-stone-800 pb-3 md:pb-0 md:pr-4">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 mb-1.5">
                    Day {ev.day} · {ev.category}
                  </span>
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {ev.date}
                  </div>
                </div>

                {/* Middle Info: Title, Venue, Description */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-600 transition-colors">
                    {ev.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{ev.venue}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {ev.description}
                  </p>

                  {ev.speakers && ev.speakers.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Presiding / Speakers:</span>
                      {ev.speakers.map((sp, idx) => (
                        <span key={idx} className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px]">
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center justify-end">
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-stone-900 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-stone-700 flex items-center gap-1">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* OFFICIAL EVENT DOCUMENTS & ADMIN MANAGEMENT INTERFACE */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Official Secretariat Publications</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mt-1">
                Event Documents & Downloads (PDF / DOCX)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Download official festival schedules, accommodation advisories, and parking maps published by the Secretariat.
              </p>
            </div>

            {/* Admin Controls Toggle */}
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Admin Active</span>
                  </span>
                  <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {showUploadForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{showUploadForm ? 'Close Upload Form' : 'Upload & Manage Documents'}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLoginModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 hover:border-amber-400 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-colors"
                  title="Authenticate as Secretariat Admin to upload and manage documents"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Document Portal</span>
                </button>
              )}
            </div>
          </div>

          {/* Success Notification Banner */}
          {docSuccessNotice && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{docSuccessNotice}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ADMIN FILE UPLOAD & MANAGEMENT INTERFACE (Shown when admin is active) */}
          {/* ========================================================================= */}
          {isAdmin && showUploadForm && (
            <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-stone-900 border-2 border-amber-300 dark:border-amber-500/40 shadow-lg space-y-6 animate-in slide-in-from-top-4 duration-200">
              <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-600" />
                  <h3 className="font-serif-cinzel font-bold text-base text-stone-900 dark:text-stone-100">
                    Secretariat Document Management: Upload PDF or DOCX
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
                  Dotma Secretariat Admin
                </span>
              </div>

              {/* Upload Form */}
              <form onSubmit={handlePublishDocument} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Document Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Document Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maha Mahotsav 2026 Official Daily Timetable"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as EventDocument['category'])}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Schedule">Schedule (Programs & Timings)</option>
                      <option value="Guidelines">Guidelines (Rules & Advisories)</option>
                      <option value="Souvenir">Souvenir (Smriti Grantha & Discourses)</option>
                      <option value="Prasadam">Prasadam (Anandabazar Guidelines)</option>
                      <option value="Map">Map (Venue & Parking Routes)</option>
                      <option value="Brochure">Brochure (Festival Information)</option>
                      <option value="Notice">Notice (Secretariat Press Release)</option>
                    </select>
                  </div>
                </div>

                {/* File Upload Dropzone / Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Select File (PDF or DOCX) <span className="text-red-500">*</span>
                  </label>
                  <div className="p-4 rounded-2xl border-2 border-dashed border-amber-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 text-center hover:bg-white transition-colors">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                      id="event-file-upload"
                    />
                    <label htmlFor="event-file-upload" className="cursor-pointer block space-y-2">
                      <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 dark:bg-stone-700 flex items-center justify-center text-amber-600">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-stone-700 dark:text-stone-300">
                        <span className="font-bold text-amber-700 dark:text-amber-400 underline">Click to browse file</span> or drag and drop
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Accepted formats: <strong>PDF (.pdf)</strong> or <strong>Word (.docx, .doc)</strong> up to 25MB
                      </p>
                    </label>

                    {newFileName && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-100/70 dark:bg-stone-700/80 text-xs flex items-center justify-between max-w-md mx-auto">
                        <div className="flex items-center gap-2 text-stone-800 dark:text-stone-100">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold truncate">{newFileName}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white dark:bg-stone-900">
                            {newFileType}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-300">
                          {newFileSize}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Brief Description / Instructions for Attendees (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide context or summary for devotees (e.g. Important instructions regarding entry pass and parking slots)..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingDoc || !newTitle.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-all disabled:opacity-50"
                  >
                    {isSubmittingDoc ? (
                      <span>Publishing...</span>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Publish Document to Attendees</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Admin Manage Existing Documents Table */}
              <div className="pt-4 border-t border-amber-200/80 dark:border-stone-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Manage Existing Uploaded Documents ({documents.length})
                </h4>
                <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Title & Category</th>
                        <th className="py-2.5 px-3">Size & Date</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40">
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                doc.fileType === 'pdf'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              }`}
                            >
                              {doc.fileType}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-stone-900 dark:text-stone-100">{doc.title}</div>
                            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                              {doc.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-stone-500">
                            <div>{doc.fileSize || '1.8 MB'}</div>
                            <div className="text-[10px] text-stone-400">{doc.uploadedAt}</div>
                          </td>
                          <td className="py-2.5 px-3 text-right space-x-2">
                            <button
                              onClick={() => handleDownloadDoc(doc)}
                              className="p-1 rounded text-stone-600 hover:text-amber-600 dark:text-stone-300"
                              title="Test Download"
                            >
                              <Download className="w-3.5 h-3.5 inline" />
                            </button>
                            <button
                              onClick={() => handleDeleteDocument(doc.id, doc.title)}
                              className="p-1 rounded text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
                              title="Delete Document"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ATTENDEE DOCUMENT FILTER & CLEAN LIST */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {documentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedDocCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    selectedDocCategory === cat
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input for Documents */}
            <div className="w-full md:w-64">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-1.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Clean List for Attendees */}
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 p-8">
              <FileText className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-xs text-stone-500 font-medium">
                No documents found matching the filter "{selectedDocCategory}".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocuments.map((doc) => {
                const isPdf = doc.fileType === 'pdf';
                return (
                  <div
                    key={doc.id}
                    className="group p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60 hover:bg-white dark:hover:bg-stone-850 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Header: Badge & Category */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            isPdf
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 ring-1 ring-red-400/30'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 ring-1 ring-blue-400/30'
                          }`}
                        >
                          <FileText className="w-3 h-3" />
                          <span>{doc.fileType.toUpperCase()}</span>
                        </span>

                        <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 leading-snug group-hover:text-amber-600 transition-colors">
                        {doc.title}
                      </h3>

                      {/* Description */}
                      {doc.description ? (
                        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                          {doc.description}
                        </p>
                      ) : (
                        <p className="text-xs text-stone-400 dark:text-stone-500 italic">
                          Official release for Priti-Lagnik Maha Mahotsav attendees.
                        </p>
                      )}
                    </div>

                    {/* Bottom Metadata & Download Button */}
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2">
                      <div className="text-[10px] text-stone-400 font-mono space-y-0.5">
                        <div>{doc.fileSize || '2.0 MB'}</div>
                        <div className="text-stone-500">{doc.uploadedAt}</div>
                      </div>

                      <button
                        onClick={() => handleDownloadDoc(doc)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white shadow-sm transition-all active:scale-95 ${
                          isPdf
                            ? 'bg-red-600 hover:bg-red-500'
                            : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {doc.fileType.toUpperCase()}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ADMIN SECRETARIAT LOGIN MODAL */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                  Secretariat Document Access
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setAdminAuthError('');
                }}
                className="text-stone-400 hover:text-stone-600 p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Authenticate with the Secretariat administrator credentials to upload, categorize, or delete event publications.
            </p>

            {adminAuthError && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminAuthError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Secretariat Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter secretariat password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="w-1/2 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-all"
                >
                  Unlock Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SESSION DETAILS MODAL */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Day {activeSession.day} · {activeSession.category}
              </span>
              <button
                onClick={() => setActiveSession(null)}
                className="text-stone-400 hover:text-stone-600 text-xs p-1"
              >
                ✕ Close
              </button>
            </div>

            <h3 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
              {activeSession.title}
            </h3>

            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>{activeSession.time} ({activeSession.date})</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{activeSession.venue}</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
              {activeSession.description}
            </p>

            {activeSession.speakers && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-stone-400">Presiding Dignitaries:</span>
                <div className="flex flex-wrap gap-1">
                  {activeSession.speakers.map((sp, i) => (
                    <span key={i} className="text-xs bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 font-medium">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveSession(null)}
              className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-stone-800 text-white font-bold text-xs mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
