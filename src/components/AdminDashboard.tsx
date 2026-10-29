import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  FileSpreadsheet,
  Search,
  Filter,
  MessageSquare,
  Eye,
  Trash2,
  LogOut,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
  Image as ImageIcon,
  AlertCircle,
  Car,
  Users,
  FileText,
  Video,
  Star,
  Plus,
  Download,
  ExternalLink,
  FileDown,
  Upload,
  UserPlus
} from 'lucide-react';
import {
  RegistrationRecord,
  CarPassRecord,
  AdminUser,
  EventDocument,
  GalleryItem,
  FeedbackRecord
} from '../types';
import {
  fetchAllRegistrations,
  updateRegistrationStatus,
  markConfirmationSent,
  removeRegistration,
  fetchAllCarPasses,
  updateCarPassStatus,
  removeCarPass,
  fetchAllAdmins,
  saveAdminUser,
  removeAdminUser,
  fetchAllEventDocuments,
  saveEventDocument,
  removeEventDocument,
  fetchDynamicGalleryItems,
  saveGalleryItem,
  removeGalleryItem,
  fetchAllFeedback
} from '../services/registrationService';
import { EVENT_DETAILS } from '../data/mahotsavData';
import { generateQrCodeDataUrl } from '../utils/qrGenerator';
import { exportElementAsPdf, exportElementAsImage } from '../utils/exportCardUtils';

interface AdminDashboardProps {
  onClose?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pritilagnik_admin_session') === 'true';
  });

  const [currentAdmin, setCurrentAdmin] = useState<{ email: string; isRoot: boolean; name: string }>(() => {
    const email = localStorage.getItem('pritilagnik_admin_email') || 'admin@dotma.org';
    const isRoot = email === 'admin@dotma.org';
    const name = localStorage.getItem('pritilagnik_admin_name') || (isRoot ? 'Root Administrator' : 'Co-Administrator');
    return { email, isRoot, name };
  });

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  type TabType = 'delegates' | 'cars' | 'multi_admin' | 'documents' | 'gallery' | 'feedback';
  const [activeTab, setActiveTab] = useState<TabType>('delegates');

  // Delegates data
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [selectedDelegateQr, setSelectedDelegateQr] = useState<string>('');

  // Car passes data
  const [carPasses, setCarPasses] = useState<CarPassRecord[]>([]);
  const [selectedCarPass, setSelectedCarPass] = useState<CarPassRecord | null>(null);
  const [selectedCarQr, setSelectedCarQr] = useState<string>('');
  const [parkingZoneInput, setParkingZoneInput] = useState('Gate 1 Main Pavilion Parking Bay');

  // Multi-Admin data
  const [adminList, setAdminList] = useState<AdminUser[]>([]);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'Registrar' | 'Traffic & Security' | 'Reception Secretariat' | 'Coordinator'>('Registrar');
  const [adminSaveSuccess, setAdminSaveSuccess] = useState('');

  // Event Documents data
  const [documents, setDocuments] = useState<EventDocument[]>([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<'Schedule' | 'Brochure' | 'Guidelines' | 'Map' | 'Notice'>('Schedule');
  const [newDocFileType, setNewDocFileType] = useState<'pdf' | 'docx'>('pdf');
  const [newDocUrl, setNewDocUrl] = useState('');
  const [newDocDesc, setNewDocDesc] = useState('');
  const [docFile, setDocFile] = useState<{ name: string; size: string; dataUrl: string } | null>(null);
  const [docSaveSuccess, setDocSaveSuccess] = useState('');

  // Gallery Media data
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalType, setNewGalType] = useState<'image' | 'video'>('image');
  const [newGalCategory, setNewGalCategory] = useState<'Rituals' | 'Past Gatherings' | 'Prasadam' | 'Cultural' | 'Venue'>('Past Gatherings');
  const [newGalUrl, setNewGalUrl] = useState('');
  const [newGalDesc, setNewGalDesc] = useState('');
  const [galImageFile, setGalImageFile] = useState<{ name: string; dataUrl: string } | null>(null);
  const [galSaveSuccess, setGalSaveSuccess] = useState('');

  // Feedback data
  const [feedbackList, setFeedbackList] = useState<FeedbackRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isExporting, setIsExporting] = useState(false);

  // Load all data on mount or auth change
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [regs, cars, admins, docs, gallery, feedback] = await Promise.all([
        fetchAllRegistrations(),
        fetchAllCarPasses(),
        fetchAllAdmins(),
        fetchAllEventDocuments(),
        fetchDynamicGalleryItems(),
        fetchAllFeedback()
      ]);
      setRegistrations(regs);
      setCarPasses(cars);
      setAdminList(admins);
      setDocuments(docs);
      setGalleryItems(gallery);
      setFeedbackList(feedback);
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputEmail = emailInput.trim().toLowerCase();
    const inputPass = passwordInput;

    // Check Root admin credentials
    if (inputEmail === 'admin@dotma.org' && inputPass === 'PritiLagnik@2026') {
      setIsAuthenticated(true);
      setCurrentAdmin({ email: 'admin@dotma.org', isRoot: true, name: 'Root Administrator' });
      localStorage.setItem('pritilagnik_admin_session', 'true');
      localStorage.setItem('pritilagnik_admin_email', 'admin@dotma.org');
      localStorage.setItem('pritilagnik_admin_name', 'Root Administrator');
      loadAllData();
      return;
    }

    // Check registered sub-admins
    try {
      const admins = await fetchAllAdmins();
      const matched = admins.find(a => a.email.toLowerCase() === inputEmail && a.password === inputPass);
      if (matched) {
        setIsAuthenticated(true);
        setCurrentAdmin({ email: matched.email, isRoot: false, name: matched.name });
        localStorage.setItem('pritilagnik_admin_session', 'true');
        localStorage.setItem('pritilagnik_admin_email', matched.email);
        localStorage.setItem('pritilagnik_admin_name', matched.name);
        loadAllData();
        return;
      }
    } catch (err) {
      console.warn('Sub-admin verification error:', err);
    }

    setLoginError('Invalid administrator credentials.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pritilagnik_admin_session');
    localStorage.removeItem('pritilagnik_admin_email');
    localStorage.removeItem('pritilagnik_admin_name');
  };

  // ================= DELEGATE ACTIONS =================
  const handleDelegateStatusChange = async (id: string, newStatus: 'accepted' | 'declined' | 'pending') => {
    await updateRegistrationStatus(id, newStatus);
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord(prev => prev ? { ...prev, status: newStatus } : null);
      if (newStatus === 'accepted') {
        const qr = await generateQrCodeDataUrl(
          `Name: ${selectedRecord.fullName}\nAddress: ${selectedRecord.city}, ${selectedRecord.state}\nContact: ${selectedRecord.phone}\nReg ID: ${selectedRecord.id}`
        );
        setSelectedDelegateQr(qr);
      }
    }
  };

  const handleDeleteDelegate = async (id: string) => {
    if (confirm('Are you sure you want to remove this delegate registration?')) {
      await removeRegistration(id);
      setRegistrations(prev => prev.filter(r => r.id !== id));
      if (selectedRecord?.id === id) setSelectedRecord(null);
    }
  };

  const handleViewDelegate = async (rec: RegistrationRecord) => {
    setSelectedRecord(rec);
    if (rec.status === 'accepted') {
      const qr = await generateQrCodeDataUrl(
        `Name: ${rec.fullName}\nAddress: ${rec.city}, ${rec.state}\nContact: ${rec.phone}\nReg ID: ${rec.id}`
      );
      setSelectedDelegateQr(qr);
    } else {
      setSelectedDelegateQr('');
    }
  };

  const handleSendWhatsAppConfirmation = async (rec: RegistrationRecord) => {
    const totalDelegates = (Number(rec.maleCount) || 0) + (Number(rec.femaleCount) || 0) + (Number(rec.childrenCount) || 0) || rec.delegationSize || 1;
    const message = `Hari Om! Dear ${rec.fullName},\n\nWe are pleased to inform you that your registration for Priti-Lagnik Maha Mahotsav 2026 at West Dangarkuthi, Dotma, Kokrajhar has been ACCEPTED & CONFIRMED by the Secretariat.\n\n📌 Registration ID: ${rec.id}\n👥 Total Delegates: ${totalDelegates} (${rec.maleCount || 0} Male, ${rec.femaleCount || 0} Female, ${rec.childrenCount || 0} Children)\n📅 Event Date: 20 December 2026\n🏠 Accommodation: ${rec.needAccommodation ? (rec.accommodationType || 'Arranged') : 'Self-Arranged'}\n🍲 Satvik Annadan: Anandabazar Pass Active\n\nVenue: West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347.\nHelpline: ${EVENT_DETAILS.helplinePhone}\n\nYou can now print your Official Registered Card with QR Code at the portal using your Registration ID.\n\nWith spiritual regards,\nCentral Reception Secretariat, Priti-Lagnik 2026`;

    const cleanPhone = rec.phone.replace(/[^0-9]/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    await markConfirmationSent(rec.id);
    setRegistrations(prev => prev.map(r => r.id === rec.id ? { ...r, confirmationSent: true } : r));
  };

  // ================= CAR PASS ACTIONS =================
  const handleCarPassStatusChange = async (
    id: string,
    newStatus: 'accepted' | 'declined' | 'pending',
    allocatedZone?: string
  ) => {
    await updateCarPassStatus(id, newStatus, allocatedZone);
    setCarPasses(prev => prev.map(c => c.id === id ? { ...c, status: newStatus, allocatedZone: allocatedZone || c.allocatedZone } : c));
    if (selectedCarPass && selectedCarPass.id === id) {
      setSelectedCarPass(prev => prev ? { ...prev, status: newStatus, allocatedZone: allocatedZone || prev.allocatedZone } : null);
      if (newStatus === 'accepted') {
        const qr = await generateQrCodeDataUrl(
          `Name: ${selectedCarPass.name}\nCar Reg: ${selectedCarPass.carRegistrationNumber}\nAddress: ${selectedCarPass.address}\nDriver: ${selectedCarPass.driverName}\nContact: ${selectedCarPass.contactNumber}\nPass ID: ${selectedCarPass.id}`
        );
        setSelectedCarQr(qr);
      }
    }
  };

  const handleDeleteCarPass = async (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle pass?')) {
      await removeCarPass(id);
      setCarPasses(prev => prev.filter(c => c.id !== id));
      if (selectedCarPass?.id === id) setSelectedCarPass(null);
    }
  };

  const handleViewCarPass = async (car: CarPassRecord) => {
    setSelectedCarPass(car);
    if (car.status === 'accepted') {
      const qr = await generateQrCodeDataUrl(
        `Name: ${car.name}\nCar Reg: ${car.carRegistrationNumber}\nAddress: ${car.address}\nDriver: ${car.driverName}\nContact: ${car.contactNumber}\nPass ID: ${car.id}`
      );
      setSelectedCarQr(qr);
    } else {
      setSelectedCarQr('');
    }
  };

  const handleSendCarPassWhatsApp = (car: CarPassRecord) => {
    const message = `Hari Om! Dear ${car.name},\n\nYour Vehicle Pass for Priti-Lagnik Maha Mahotsav 2026 at West Dangarkuthi, Dotma has been GRANTED.\n\n🚗 Car Registration: ${car.carRegistrationNumber}\n📌 Pass ID: ${car.id}\n🅿️ Allocated Parking: ${car.allocatedZone || 'Gate 1 Main Corridor'}\n👤 Driver: ${car.driverName} (${car.driverPhone || car.contactNumber})\n📅 Event Date: 20 December 2026\n\nPlease visit the Check Status portal to print your official Windshield Car Pass card for checkpoint entry.\n\nDotma Traffic & Security Management Team`;

    const cleanPhone = (car.driverPhone || car.contactNumber).replace(/[^0-9]/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // ================= MULTI-ADMIN ACTIONS =================
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail || !newAdminPassword) return;

    const newAdmin: AdminUser = {
      id: `ADM-${Date.now().toString().slice(-6)}`,
      name: newAdminName.trim(),
      email: newAdminEmail.trim().toLowerCase(),
      password: newAdminPassword,
      role: newAdminRole,
      createdAt: new Date().toISOString()
    };

    await saveAdminUser(newAdmin);
    setAdminList(prev => [newAdmin, ...prev.filter(a => a.email !== newAdmin.email)]);
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setAdminSaveSuccess(`Co-administrator ${newAdmin.name} added successfully!`);
    setTimeout(() => setAdminSaveSuccess(''), 4000);
  };

  const handleDeleteAdmin = async (id: string) => {
    if (confirm('Are you sure you want to remove this administrator?')) {
      await removeAdminUser(id);
      setAdminList(prev => prev.filter(a => a.id !== id));
    }
  };

  // ================= DOCUMENT ACTIONS =================
  const handleDocFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type.includes('pdf');
    const isDocx = file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc') || file.type.includes('word');

    if (!isPdf && !isDocx) {
      alert('Please select a valid PDF (.pdf) or Word document (.docx).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setDocFile({
        name: file.name,
        size: `${sizeMb} MB`,
        dataUrl
      });
      if (!newDocTitle) {
        setNewDocTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      setNewDocFileType(isPdf ? 'pdf' : 'docx');
    };
    reader.readAsDataURL(file);
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) {
      alert('Please enter a document title.');
      return;
    }

    const finalUrl = docFile ? docFile.dataUrl : (newDocUrl.trim() || '#');
    if (!docFile && !newDocUrl.trim()) {
      alert('Please choose a document file to upload OR provide a direct URL.');
      return;
    }

    const docItem: EventDocument = {
      id: `DOC-${Date.now().toString().slice(-6)}`,
      title: newDocTitle.trim(),
      category: newDocCategory,
      fileType: newDocFileType,
      fileName: docFile?.name || (newDocUrl ? newDocUrl.split('/').pop()?.split('?')[0] : 'document'),
      fileSize: docFile?.size,
      fileData: docFile?.dataUrl,
      url: finalUrl,
      uploadedAt: new Date().toISOString(),
      description: newDocDesc.trim() || undefined
    };

    await saveEventDocument(docItem);
    setDocuments(prev => [docItem, ...prev]);
    setNewDocTitle('');
    setNewDocUrl('');
    setNewDocDesc('');
    setDocFile(null);
    setDocSaveSuccess('Document uploaded and published successfully to Events section!');
    setTimeout(() => setDocSaveSuccess(''), 4000);
  };

  const handleDeleteDocument = async (id: string) => {
    if (confirm('Are you sure you want to remove this event document?')) {
      await removeEventDocument(id);
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  // ================= GALLERY ACTIONS =================
  const handleGalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setGalImageFile({ name: file.name, dataUrl });
          if (!newGalTitle) {
            setNewGalTitle(file.name.replace(/\.[^/.]+$/, ''));
          }
        }
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle.trim()) {
      alert('Please enter a title for the media item.');
      return;
    }

    let processedUrl = '';
    if (newGalType === 'image') {
      if (!galImageFile && !newGalUrl.trim()) {
        alert('Please choose an image file to upload OR provide a direct image URL.');
        return;
      }
      processedUrl = galImageFile ? galImageFile.dataUrl : newGalUrl.trim();
    } else {
      if (!newGalUrl.trim()) {
        alert('Please provide a YouTube video link.');
        return;
      }
      processedUrl = newGalUrl.trim();
      if (processedUrl.includes('youtube.com/watch?v=')) {
        const vidId = processedUrl.split('v=')[1]?.split('&')[0];
        if (vidId) processedUrl = `https://www.youtube.com/embed/${vidId}`;
      } else if (processedUrl.includes('youtu.be/')) {
        const vidId = processedUrl.split('youtu.be/')[1]?.split('?')[0];
        if (vidId) processedUrl = `https://www.youtube.com/embed/${vidId}`;
      }
    }

    const item: GalleryItem = {
      id: `GAL-${Date.now().toString().slice(-6)}`,
      title: newGalTitle.trim(),
      type: newGalType,
      category: newGalCategory,
      url: processedUrl,
      thumbnail: newGalType === 'image' ? processedUrl : '/src/assets/images/priti_lagnik_logo.webp',
      description: newGalDesc.trim() || 'Priti-Lagnik Maha Mahotsav Moment',
      year: '2026'
    };

    await saveGalleryItem(item);
    setGalleryItems(prev => [item, ...prev]);
    setNewGalTitle('');
    setNewGalUrl('');
    setNewGalDesc('');
    setGalImageFile(null);
    setGalSaveSuccess('Gallery media published successfully!');
    setTimeout(() => setGalSaveSuccess(''), 4000);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this gallery item?')) {
      await removeGalleryItem(id);
      setGalleryItems(prev => prev.filter(g => g.id !== id));
    }
  };

  // ================= EXPORTS =================
  const exportDelegatesCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      'Reg ID', 'Full Name', 'Phone', 'Email', 'City', 'State',
      'Male Count', 'Female Count', 'Children Count', 'Total Persons',
      'Arrival Date', 'Accommodation Required', 'Accommodation Type',
      'Food Preference', 'Volunteer Interest', 'Status', 'Confirmation Sent', 'Registered At'
    ];
    const rows = registrations.map(r => {
      const totalPersons = (Number(r.maleCount) || 0) + (Number(r.femaleCount) || 0) + (Number(r.childrenCount) || 0) || r.delegationSize || 1;
      return [
        r.id,
        `"${r.fullName.replace(/"/g, '""')}"`,
        r.phone,
        r.email || '',
        `"${r.city.replace(/"/g, '""')}"`,
        `"${r.state.replace(/"/g, '""')}"`,
        r.maleCount || 0,
        r.femaleCount || 0,
        r.childrenCount || 0,
        totalPersons,
        r.arrivalDate,
        r.needAccommodation ? 'Yes' : 'No',
        `"${(r.accommodationType || '').replace(/"/g, '""')}"`,
        r.foodPreference,
        r.volunteerInterest ? 'Yes' : 'No',
        r.status,
        r.confirmationSent ? 'Yes' : 'No',
        r.registeredAt
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Delegates_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCarPassesCSV = () => {
    if (carPasses.length === 0) return;
    const headers = [
      'Pass ID', 'Owner Name', 'Car Registration Plate', 'Driver Name', 'Driver Phone',
      'Contact Number', 'Origin Address', 'Vehicle Type', 'Allocated Parking Zone', 'Status', 'Registered At'
    ];
    const rows = carPasses.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.carRegistrationNumber}"`,
      `"${c.driverName.replace(/"/g, '""')}"`,
      c.driverPhone || '',
      c.contactNumber,
      `"${c.address.replace(/"/g, '""')}"`,
      `"${c.vehicleType}"`,
      `"${(c.allocatedZone || '').replace(/"/g, '""')}"`,
      c.status,
      c.registeredAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Car_Passes_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Demographics calculation
  const totalDelegates = registrations.length;
  const totalPersons = registrations.reduce((acc, r) => {
    const sum = (Number(r.maleCount) || 0) + (Number(r.femaleCount) || 0) + (Number(r.childrenCount) || 0);
    return acc + (sum > 0 ? sum : (Number(r.delegationSize) || 1));
  }, 0);
  const totalMales = registrations.reduce((acc, r) => acc + (Number(r.maleCount) || 0), 0);
  const totalFemales = registrations.reduce((acc, r) => acc + (Number(r.femaleCount) || 0), 0);
  const totalChildren = registrations.reduce((acc, r) => acc + (Number(r.childrenCount) || 0), 0);
  const totalCars = carPasses.length;

  // Filter delegates
  const filteredRegistrations = registrations.filter(r => {
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesQuery =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // Filter car passes
  const filteredCarPasses = carPasses.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.carRegistrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactNumber.includes(searchQuery) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // LOGIN SCREEN (Strictly without any credential hints in the UI)
  if (!isAuthenticated) {
    return (
      <div className="py-16 sm:py-24 bg-stone-50 dark:bg-stone-950 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
              Secretariat Admin Sign In
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Priti-Lagnik Maha Mahotsav 2026 · Dotma Central Secretariat
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md active:scale-98"
            >
              Sign In to Secretariat Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-stone-50/50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/50">
                Firestore Connected
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {currentAdmin.name} ({currentAdmin.isRoot ? 'Root Admin' : 'Co-Admin'})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 mt-1">
              Secretariat Administration Hub
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeTab === 'delegates' && (
              <button
                onClick={exportDelegatesCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-colors"
                title="Export all delegates to Excel/CSV"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Delegates CSV</span>
              </button>
            )}

            {activeTab === 'cars' && (
              <button
                onClick={exportCarPassesCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-colors"
                title="Export vehicle passes to Excel/CSV"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Car Passes CSV</span>
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 text-white shadow-sm transition-colors"
              title="Print Roster / List"
            >
              <Printer className="w-4 h-4" />
              <span>Print Active View</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setActiveTab('delegates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'delegates'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Delegates ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cars')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'cars'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicle Passes ({carPasses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('multi_admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'multi_admin'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Multi-Admin Scope ({adminList.length + 1})</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'documents'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Event Documents ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'gallery'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Gallery Media ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              activeTab === 'feedback'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Feedback ({feedbackList.length})</span>
          </button>
        </div>

        {/* DEMOGRAPHIC SUMMARY METRICS FOR ORGANIZERS */}
        {(activeTab === 'delegates' || activeTab === 'cars') && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Delegations</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-stone-900 dark:text-stone-100">
                {totalDelegates}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Attendees</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                {totalPersons}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-blue-200 dark:border-blue-900 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-blue-500 block">Male Attendees</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {totalMales}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-pink-200 dark:border-pink-900 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-pink-500 block">Female Attendees</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-pink-600 dark:text-pink-400">
                {totalFemales}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-purple-200 dark:border-purple-900 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-purple-500 block">Children (&lt;12)</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-purple-600 dark:text-purple-400">
                {totalChildren}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-900 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-500 block">Vehicle Passes</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {totalCars}
              </span>
            </div>
          </div>
        )}

        {/* ================= TAB 1: DELEGATES ================= */}
        {activeTab === 'delegates' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                {['All', 'pending', 'accepted', 'declined'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                      statusFilter === st
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  placeholder="Search name, phone, city, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 font-semibold uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Photo</th>
                      <th className="py-3 px-4">Delegate Name & ID</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Breakdown (M / F / C)</th>
                      <th className="py-3 px-4">Arrival</th>
                      <th className="py-3 px-4">Stay</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-stone-400">
                          No registrations found matching the criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((rec) => {
                        const total = (Number(rec.maleCount) || 0) + (Number(rec.femaleCount) || 0) + (Number(rec.childrenCount) || 0) || rec.delegationSize || 1;
                        return (
                          <tr key={rec.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-850/50 transition-colors">
                            <td className="py-3 px-4">
                              {rec.photoUrl ? (
                                <img
                                  src={rec.photoUrl}
                                  alt={rec.fullName}
                                  className="w-10 h-12 object-cover rounded-lg border border-amber-400"
                                />
                              ) : (
                                <div className="w-10 h-12 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center text-[9px] text-stone-400 bg-stone-50">
                                  Blank
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-stone-900 dark:text-stone-100 block">
                                {rec.fullName}
                              </span>
                              <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                                {rec.id}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono text-stone-800 dark:text-stone-200 block">{rec.phone}</span>
                              {rec.email && <span className="text-[10px] text-stone-400">{rec.email}</span>}
                            </td>
                            <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                              {rec.city}, {rec.state}
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                                {rec.maleCount || 0}M / {rec.femaleCount || 0}F / {rec.childrenCount || 0}C
                              </span>
                              <span className="text-[10px] text-stone-400 block font-sans">({total} Total)</span>
                            </td>
                            <td className="py-3 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                              {rec.arrivalDate}
                            </td>
                            <td className="py-3 px-4">
                              {rec.needAccommodation ? (
                                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 block">
                                  {rec.accommodationType?.split(' ')[0] || 'Required'}
                                </span>
                              ) : (
                                <span className="text-[10px] text-stone-400">Self</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  rec.status === 'accepted'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                    : rec.status === 'declined'
                                    ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {rec.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleViewDelegate(rec)}
                                  className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                                  title="View & Print Card"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {rec.status !== 'accepted' && (
                                  <button
                                    onClick={() => handleDelegateStatusChange(rec.id, 'accepted')}
                                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                                    title="Accept Registration"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                )}

                                {rec.status !== 'declined' && (
                                  <button
                                    onClick={() => handleDelegateStatusChange(rec.id, 'declined')}
                                    className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                                    title="Reject Registration"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleSendWhatsAppConfirmation(rec)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    rec.confirmationSent
                                      ? 'text-emerald-600'
                                      : 'text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950'
                                  }`}
                                  title="Send WhatsApp Confirmation"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => handleDeleteDelegate(rec.id)}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CAR PASSES ================= */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                {['All', 'pending', 'accepted', 'declined'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                      statusFilter === st
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  placeholder="Search car plate, owner, driver, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-400 font-semibold uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Photo</th>
                      <th className="py-3 px-4">Car Plate & Pass ID</th>
                      <th className="py-3 px-4">Owner / Org</th>
                      <th className="py-3 px-4">Driver & Contact</th>
                      <th className="py-3 px-4">Vehicle Type</th>
                      <th className="py-3 px-4">Parking Zone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {filteredCarPasses.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-stone-400">
                          No vehicle passes found matching the criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCarPasses.map((car) => (
                        <tr key={car.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-850/50 transition-colors">
                          <td className="py-3 px-4">
                            {car.photoUrl ? (
                              <img
                                src={car.photoUrl}
                                alt={car.name}
                                className="w-10 h-12 object-cover rounded-lg border border-black"
                              />
                            ) : (
                              <div className="w-10 h-12 rounded-lg border border-dashed border-stone-300 flex items-center justify-center text-[9px] text-stone-400 bg-stone-50">
                                Blank
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono font-extrabold text-sm text-stone-900 dark:text-stone-100 block">
                              {car.carRegistrationNumber}
                            </span>
                            <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                              {car.id}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-stone-800 dark:text-stone-200">
                            {car.name}
                            <span className="text-[10px] text-stone-400 block">{car.address}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold block">{car.driverName}</span>
                            <span className="font-mono text-[10px] text-stone-500">
                              {car.driverPhone || car.contactNumber}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                            {car.vehicleType}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                              {car.allocatedZone || 'Unassigned'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                car.status === 'accepted'
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                  : car.status === 'declined'
                                  ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                              }`}
                            >
                              {car.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleViewCarPass(car)}
                                className="p-1.5 rounded-lg text-stone-600 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                                title="View & Print Pass"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {car.status !== 'accepted' && (
                                <button
                                  onClick={() => handleCarPassStatusChange(car.id, 'accepted', 'Gate 1 Main Corridor')}
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                                  title="Grant Pass"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}

                              {car.status !== 'declined' && (
                                <button
                                  onClick={() => handleCarPassStatusChange(car.id, 'declined')}
                                  className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                                  title="Reject Pass"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => handleSendCarPassWhatsApp(car)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-600 hover:bg-emerald-50"
                                title="Send WhatsApp Pass"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteCarPass(car.id)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: MULTI-ADMIN TEAM SCOPE ================= */}
        {activeTab === 'multi_admin' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-600" />
                  <span>Add Co-Administrator for Multiple Administration</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Root Administrator scope: Register authorized team members to manage delegates, issue car passes, and update event materials.
                </p>
              </div>

              {adminSaveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{adminSaveSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Administrator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    placeholder="e.g. Subrata Bhowmik"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="admin-name@dotma.org"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Set temporary password"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Registrar">Registrar (Delegates & Passes)</option>
                    <option value="Traffic & Security">Traffic & Security Warden</option>
                    <option value="Reception Secretariat">Reception Secretariat</option>
                    <option value="Coordinator">General Coordinator</option>
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Administrator Profile</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Admins */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Registered Secretariat Team
              </h4>

              <div className="divide-y divide-stone-200 dark:divide-stone-800">
                {/* Root Admin Entry */}
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xs">
                      ROOT
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-900 dark:text-stone-100 block">
                        Root Administrator
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">admin@dotma.org</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Primary Authority
                  </span>
                </div>

                {/* Sub-admins */}
                {adminList.map((adm) => (
                  <div key={adm.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-xs">
                        {adm.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100 block">
                          {adm.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono">{adm.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {adm.role}
                      </span>
                      {currentAdmin.isRoot && (
                        <button
                          onClick={() => handleDeleteAdmin(adm.id)}
                          className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                          title="Remove Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: EVENT DOCUMENTS ================= */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>Upload & Publish Event Documents (PDF / DOCX)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Published documents are directly downloadable by attendees on the public Events page.
                </p>
              </div>

              {docSaveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{docSaveSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddDocument} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="e.g. Daily Kirtan & Discourse Schedule"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Schedule">Schedule</option>
                      <option value="Brochure">Brochure</option>
                      <option value="Guidelines">Guidelines</option>
                      <option value="Map">Map & Routes</option>
                      <option value="Notice">Notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      File Type Format
                    </label>
                    <select
                      value={newDocFileType}
                      onChange={(e) => setNewDocFileType(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="pdf">PDF Document (.pdf)</option>
                      <option value="docx">Word Document (.docx)</option>
                    </select>
                  </div>
                </div>

                {/* File Upload OR Direct URL Dual Mode */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>Document Source (Choose File OR Enter Direct URL)</span>
                    </span>
                    <span className="text-[10px] text-stone-500">PDF or DOCX supported up to 10MB</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Method 1: File Upload */}
                    <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                      <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                        Option 1: Upload File from Computer
                      </span>
                      {docFile ? (
                        <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                            <div className="truncate">
                              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block truncate">
                                {docFile.name}
                              </span>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {docFile.size}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDocFile(null)}
                            className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs"
                            title="Remove File"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-600 hover:border-amber-500 bg-stone-50 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors">
                          <Upload className="w-4 h-4 text-amber-600" />
                          <span>Select PDF or DOCX File</span>
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleDocFileUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Method 2: Direct URL */}
                    <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                      <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                        Option 2: Direct URL / Cloud Link (Optional)
                      </span>
                      <input
                        type="text"
                        value={newDocUrl}
                        onChange={(e) => setNewDocUrl(e.target.value)}
                        placeholder="https://example.com/document.pdf or /assets/..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="text-[10px] text-stone-400 block">
                        Used if no file is uploaded or to link to external drives/hosted PDFs.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Brief Summary / Description
                  </label>
                  <input
                    type="text"
                    value={newDocDesc}
                    onChange={(e) => setNewDocDesc(e.target.value)}
                    placeholder="Official schedule and guidelines for attendees on Dec 20, 2026..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Document to Events Page</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Document List */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Published Event Documents ({documents.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            doc.fileType === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {doc.fileType}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {doc.category}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {doc.title}
                      </h5>
                      {doc.description && (
                        <p className="text-xs text-stone-500">{doc.description}</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-stone-200 dark:border-stone-800 mt-3 flex items-center justify-between">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-amber-600 hover:text-amber-500 flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-stone-400 hover:text-red-600"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: GALLERY MEDIA ================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-600" />
                  <span>Add Images & YouTube Video Links to Gallery</span>
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Add photos or YouTube videos to appear dynamically in the interactive Gallery page.
                </p>
              </div>

              {galSaveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{galSaveSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddGalleryItem} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Media Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGalTitle}
                      onChange={(e) => setNewGalTitle(e.target.value)}
                      placeholder="e.g. Maha Annadan Preparation"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Media Type
                    </label>
                    <select
                      value={newGalType}
                      onChange={(e) => {
                        setNewGalType(e.target.value as any);
                        setGalImageFile(null);
                      }}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="image">Image Photo</option>
                      <option value="video">YouTube Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newGalCategory}
                      onChange={(e) => setNewGalCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Past Gatherings">Past Gatherings</option>
                      <option value="Rituals">Rituals & Seva</option>
                      <option value="Prasadam">Prasadam (Anandabazar)</option>
                      <option value="Cultural">Cultural Programme</option>
                      <option value="Venue">Venue & Grounds</option>
                    </select>
                  </div>
                </div>

                {/* Media Input Area based on Type */}
                {newGalType === 'image' ? (
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-amber-600" />
                        <span>Gallery Photo Source (Upload File OR Direct Image URL)</span>
                      </span>
                      <span className="text-[10px] text-stone-500">Supports JPG, PNG, WebP</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Option 1: Upload Photo */}
                      <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                        <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                          Option 1: Upload Image File
                        </span>
                        {galImageFile ? (
                          <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <img
                                src={galImageFile.dataUrl}
                                alt="Preview"
                                className="w-12 h-12 object-cover rounded-lg border border-amber-400 shrink-0"
                              />
                              <div className="truncate">
                                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block truncate">
                                  {galImageFile.name}
                                </span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                                  ✓ Ready for Gallery
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setGalImageFile(null)}
                              className="p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs"
                              title="Remove Image"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-600 hover:border-amber-500 bg-stone-50 dark:bg-stone-900/50 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors">
                            <Upload className="w-4 h-4 text-amber-600" />
                            <span>Choose Photo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleGalImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      {/* Option 2: Direct Image URL */}
                      <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 space-y-2">
                        <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 block">
                          Option 2: Direct Image URL (Optional)
                        </span>
                        <input
                          type="text"
                          value={newGalUrl}
                          onChange={(e) => setNewGalUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg or /src/assets/..."
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="text-[10px] text-stone-400 block">
                          Used if no image file is uploaded from device.
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      YouTube Video Link *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGalUrl}
                      onChange={(e) => setNewGalUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Auto-converts watch URLs to standard responsive embeds for the public Gallery.
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newGalDesc}
                    onChange={(e) => setNewGalDesc(e.target.value)}
                    placeholder="Brief description of this celebration moment..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Media to Gallery</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Gallery Media Grid */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Active Gallery Media ({galleryItems.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                      {item.type === 'video' ? (
                        <div className="relative w-full h-full">
                          <iframe
                            src={item.url}
                            title={item.title}
                            className="w-full h-full pointer-events-none"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase">
                            YouTube Video
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="p-3 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-600 block">
                        {item.category}
                      </span>
                      <h5 className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                        {item.title}
                      </h5>
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] text-stone-400">{item.year || '2026'}</span>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="text-stone-400 hover:text-red-600"
                          title="Delete Gallery Media"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: FEEDBACK ================= */}
        {activeTab === 'feedback' && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>Attendee Feedback & Suggestions ({feedbackList.length})</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Ratings and feedback submitted by registered delegates regarding reception, prasadam, and accommodation.
              </p>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {feedbackList.length === 0 ? (
                <div className="py-8 text-center text-stone-400 text-xs">
                  No feedback reviews submitted yet.
                </div>
              ) : (
                feedbackList.map((fb) => (
                  <div key={fb.id} className="py-4 space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                          {fb.participantName}
                        </span>
                        <span className="font-mono text-[11px] text-stone-400 ml-2">
                          ({fb.participantIdOrPhone})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">
                        {new Date(fb.submittedAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1 text-amber-600">
                        Overall: {fb.overallRating} ★
                      </span>
                      {fb.prasadamRating && (
                        <span className="text-stone-500">
                          Prasadam: {fb.prasadamRating} ★
                        </span>
                      )}
                      {fb.accommodationRating && (
                        <span className="text-stone-500">
                          Accommodation: {fb.accommodationRating} ★
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-850 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
                      "{fb.comments}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL 1: VIEW & PRINT DELEGATE CARD ================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-300 dark:border-stone-700">
            <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Delegate Pass Card Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Printable Pass Container */}
            <div
              id="admin-delegate-card-modal"
              className="printable-card-target bg-gradient-to-br from-amber-50/60 via-white to-amber-50/40 text-stone-900 rounded-2xl p-6 border-2 border-amber-400 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between border-b-2 border-amber-300 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/images/priti_lagnik_logo.webp"
                    alt="Logo"
                    className="w-12 h-12 object-contain rounded-full shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold block">
                      Priti-Lagnik Maha Mahotsav 2026
                    </span>
                    <h3 className="text-xl font-serif-cinzel font-bold text-stone-900">
                      OFFICIAL DELEGATE PASS
                    </h3>
                    <p className="text-[10px] text-stone-600">
                      20 December 2026 · West Dangarkuthi, Dotma, Kokrajhar
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 whitespace-nowrap inline-block shrink-0 shadow-sm">
                    {selectedRecord.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-6 space-y-2 text-xs">
                  <div>
                    <span className="text-stone-500 text-[10px] block font-bold uppercase">Delegate Name</span>
                    <h4 className="text-xl font-bold font-serif-cinzel text-stone-900">{selectedRecord.fullName}</h4>
                    <p className="text-stone-700 font-medium">📍 {selectedRecord.city}, {selectedRecord.state}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300 text-xs">
                    <span className="text-[10px] font-bold block uppercase text-amber-900 mb-0.5">Demographic Breakdown:</span>
                    <span className="font-mono font-bold text-stone-900">
                      {selectedRecord.maleCount || 0} Male / {selectedRecord.femaleCount || 0} Female / {selectedRecord.childrenCount || 0} Children
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-stone-500 block text-[10px]">Contact:</span>
                      <strong className="text-stone-900">{selectedRecord.phone}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Stay:</span>
                      <strong className="text-stone-900">
                        {selectedRecord.needAccommodation ? (selectedRecord.accommodationType?.split(' ')[0] || 'Assigned') : 'Self'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3 flex flex-col items-center">
                  {selectedRecord.photoUrl ? (
                    <img src={selectedRecord.photoUrl} alt="Delegate" className="w-24 h-28 object-cover rounded-xl border-2 border-amber-400 shadow-sm" />
                  ) : (
                    <div className="w-24 h-28 rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-[10px] text-stone-400 bg-stone-50">
                      <span>Photo</span>
                      <span className="text-[9px]">(Blank)</span>
                    </div>
                  )}
                  <span className="text-[9px] uppercase font-bold text-stone-600 mt-1">Photo</span>
                </div>

                <div className="sm:col-span-3 flex flex-col items-center">
                  {selectedDelegateQr ? (
                    <div className="p-1.5 bg-white rounded-xl border border-stone-300 shadow-sm">
                      <img src={selectedDelegateQr} alt="QR Code" className="w-24 h-24 object-contain" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-stone-100 rounded-xl flex items-center justify-center text-[9px] text-stone-400 border border-stone-200">
                      QR on Accept
                    </div>
                  )}
                  <span className="text-[8px] font-mono text-center text-stone-600 mt-1">Name/Address/Phone</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-2">
                {selectedRecord.status !== 'accepted' && (
                  <button
                    onClick={() => handleDelegateStatusChange(selectedRecord.id, 'accepted')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Accept Delegate
                  </button>
                )}
                {selectedRecord.status !== 'declined' && (
                  <button
                    onClick={() => handleDelegateStatusChange(selectedRecord.id, 'declined')}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                  >
                    Reject Delegate
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-stone-800 text-white text-xs font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  disabled={isExporting}
                  onClick={async () => {
                    const el = document.getElementById('admin-delegate-card-modal');
                    if (!el) return;
                    setIsExporting(true);
                    try {
                      await exportElementAsPdf(el, `Delegate_Pass_${selectedRecord.id}.pdf`);
                    } catch (err) {
                      console.error('Failed to export delegate PDF:', err);
                      alert('Could not export PDF. Please try printing or saving as image.');
                    } finally {
                      setIsExporting(false);
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>{isExporting ? 'Exporting PDF...' : 'Save as PDF'}</span>
                </button>

                <button
                  disabled={isExporting}
                  onClick={async () => {
                    const el = document.getElementById('admin-delegate-card-modal');
                    if (!el) return;
                    setIsExporting(true);
                    try {
                      await exportElementAsImage(el, `Delegate_Pass_${selectedRecord.id}.png`);
                    } catch (err) {
                      console.error('Failed to export delegate image:', err);
                      alert('Could not export image. Please try saving as PDF or printing.');
                    } finally {
                      setIsExporting(false);
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-white" />
                  <span>{isExporting ? 'Exporting Image...' : 'Save as Image'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: VIEW & PRINT WINDSHIELD CAR PASS ================= */}
      {selectedCarPass && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-300 dark:border-stone-700">
            <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Vehicle Windshield Pass Preview
                </span>
              </div>
              <button
                onClick={() => setSelectedCarPass(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* Parking Allocation selector */}
            <div className="p-3 bg-amber-50 dark:bg-stone-800 rounded-xl border border-amber-200 dark:border-stone-700 flex items-center justify-between gap-4">
              <label className="text-xs font-bold text-amber-900 dark:text-amber-300 shrink-0">
                Designated Parking Zone:
              </label>
              <select
                value={parkingZoneInput}
                onChange={(e) => setParkingZoneInput(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs w-full font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Gate 1 Main Pavilion Parking Bay">Gate 1 Main Pavilion Parking Bay</option>
                <option value="Gate 2 East VIP & Delegation Ground">Gate 2 East VIP & Delegation Ground</option>
                <option value="School Field Bypass Parking Compound">School Field Bypass Parking Compound</option>
                <option value="North Yatri Niwas General Parking">North Yatri Niwas General Parking</option>
              </select>
            </div>

            {/* Printable Target Windshield Display Pass */}
            <div
              id="admin-car-pass-modal"
              className="printable-card-target bg-white rounded-3xl p-6 border-4 border-black shadow-xl space-y-4 text-stone-900"
            >
              {/* VERY BIG VISIBLE CAR PASS BANNER */}
              <div className="bg-amber-400 text-black py-3 px-4 rounded-xl border-3 border-black text-center shadow-md">
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-widest uppercase flex items-center justify-center gap-3 text-black">
                  <Car className="w-8 h-8 stroke-[3]" />
                  <span>*** CAR PASS ***</span>
                  <Car className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="text-[11px] font-black tracking-wider uppercase mt-0.5 text-black">
                  PRITI-LAGNIK MAHA MAHOTSAV 2026 · WEST DANGARKUTHI, DOTMA
                </div>
              </div>

              {/* Header and Pass Serial */}
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="text-[11px] font-bold uppercase text-stone-600">Official Windshield Credential</span>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300 whitespace-nowrap inline-block shrink-0 shadow-sm">
                    {selectedCarPass.id}
                  </span>
                </div>
              </div>

              {/* Big Car Plate */}
              <div className="p-3 bg-amber-100 rounded-xl border-2 border-black text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-700 block">
                  Authorized Vehicle Plate
                </span>
                <div className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-black uppercase whitespace-nowrap inline-block">
                  {selectedCarPass.carRegistrationNumber}
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-1 uppercase">
                  📍 Parking Zone: {selectedCarPass.allocatedZone || parkingZoneInput}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center text-xs">
                <div className="sm:col-span-6 space-y-2">
                  <div>
                    <span className="text-stone-500 text-[10px] block font-bold uppercase">Owner / Delegation:</span>
                    <strong className="text-base text-stone-900 font-serif-cinzel">{selectedCarPass.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block font-bold uppercase">Origin Address:</span>
                    <span className="text-stone-800 font-medium">{selectedCarPass.address}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block font-bold uppercase">Driver Details:</span>
                    <span className="text-stone-800 font-semibold">{selectedCarPass.driverName} ({selectedCarPass.driverPhone || selectedCarPass.contactNumber})</span>
                  </div>
                </div>

                <div className="sm:col-span-3 flex flex-col items-center">
                  {selectedCarPass.photoUrl ? (
                    <img src={selectedCarPass.photoUrl} alt="Vehicle" className="w-24 h-28 object-cover rounded-xl border-2 border-black shadow-sm" />
                  ) : (
                    <div className="w-24 h-28 rounded-xl border-2 border-dashed border-stone-400 flex flex-col items-center justify-center text-stone-400 bg-stone-50 text-[10px]">
                      <span>Photo</span>
                      <span className="text-[9px]">(Blank)</span>
                    </div>
                  )}
                  <span className="text-[9px] uppercase font-bold text-stone-600 mt-1">Photo</span>
                </div>

                <div className="sm:col-span-3 flex flex-col items-center">
                  {selectedCarQr ? (
                    <div className="p-1.5 bg-white border border-black rounded-xl shadow-sm">
                      <img src={selectedCarQr} alt="QR Code" className="w-24 h-24 object-contain" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-stone-100 rounded-xl flex items-center justify-center text-[10px] text-stone-400 border border-stone-300">
                      QR on Grant
                    </div>
                  )}
                  <span className="text-[8px] font-mono text-center text-stone-600 mt-1">Name/Plate/Address</span>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-black text-center text-[10px] font-black uppercase tracking-wider text-black bg-stone-100 p-2 rounded-xl border border-stone-300">
                DISPLAY CLEARLY ON WINDSHIELD / DASHBOARD FOR CHECKPOINT ENTRY
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-2">
                {selectedCarPass.status !== 'accepted' && (
                  <button
                    onClick={() => handleCarPassStatusChange(selectedCarPass.id, 'accepted', parkingZoneInput)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Grant Pass
                  </button>
                )}
                {selectedCarPass.status !== 'declined' && (
                  <button
                    onClick={() => handleCarPassStatusChange(selectedCarPass.id, 'declined')}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                  >
                    Reject Pass
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendCarPassWhatsApp(selectedCarPass)}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-stone-800 text-white text-xs font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  disabled={isExporting}
                  onClick={async () => {
                    const el = document.getElementById('admin-car-pass-modal');
                    if (!el) return;
                    setIsExporting(true);
                    try {
                      await exportElementAsPdf(el, `Car_Pass_${selectedCarPass.carRegistrationNumber}.pdf`);
                    } catch (err) {
                      console.error('Failed to export vehicle pass PDF:', err);
                      alert('Could not export PDF. Please try printing or saving as image.');
                    } finally {
                      setIsExporting(false);
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>{isExporting ? 'Exporting PDF...' : 'Save as PDF'}</span>
                </button>

                <button
                  disabled={isExporting}
                  onClick={async () => {
                    const el = document.getElementById('admin-car-pass-modal');
                    if (!el) return;
                    setIsExporting(true);
                    try {
                      await exportElementAsImage(el, `Car_Pass_${selectedCarPass.carRegistrationNumber}.png`);
                    } catch (err) {
                      console.error('Failed to export vehicle pass image:', err);
                      alert('Could not export image. Please try saving as PDF or printing.');
                    } finally {
                      setIsExporting(false);
                    }
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-white" />
                  <span>{isExporting ? 'Exporting Image...' : 'Save as Image'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
