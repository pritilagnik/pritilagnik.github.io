import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  AlertCircle,
  Upload,
  X,
  Camera,
  Car,
  Search,
  Clock,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { saveRegistration } from '../services/registrationService';
import { CarPassForm } from './CarPassForm';
import { exportElementAsPdf, exportElementAsImage } from '../utils/exportCardUtils';

interface RegistrationFormProps {
  onSuccess?: () => void;
  onNavigateStatusCheck?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onNavigateStatusCheck
}) => {
  const [activeFormTab, setActiveFormTab] = useState<'delegate' | 'car'>('delegate');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: 'Assam',
    maleCount: 1,
    femaleCount: 0,
    childrenCount: 0,
    delegationSize: 1,
    arrivalDate: '2026-12-20',
    departureDate: '2026-12-21',
    needAccommodation: true,
    accommodationType: 'Ashram Dormitory (Dotma Niwas)',
    foodPreference: 'Pure Satvik' as 'Pure Satvik' | 'Regular Satvik',
    volunteerInterest: false,
    photoUrl: '' as string | undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);

  const indianStates = [
    'Assam',
    'West Bengal',
    'Tripura',
    'Meghalaya',
    'Arunachal Pradesh',
    'Nagaland',
    'Manipur',
    'Mizoram',
    'Sikkim',
    'Bihar',
    'Jharkhand',
    'Odisha',
    'Delhi NCR',
    'Maharashtra',
    'Other / International'
  ];

  // Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setFormData(prev => ({ ...prev, photoUrl: dataUrl }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photoUrl: undefined }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid 10-digit mobile number is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email address format required';
    }
    if (!formData.city.trim()) errs.city = 'City or District is required';
    if (formData.delegationSize < 1) errs.delegationSize = 'Delegation size must be at least 1';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const totalDelegates = Math.max(1, (formData.maleCount || 0) + (formData.femaleCount || 0) + (formData.childrenCount || 0));

    const newRecord: RegistrationRecord = {
      id: `PLM26-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      state: formData.state,
      delegationSize: totalDelegates,
      maleCount: formData.maleCount || 0,
      femaleCount: formData.femaleCount || 0,
      childrenCount: formData.childrenCount || 0,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      needAccommodation: formData.needAccommodation,
      accommodationType: formData.accommodationType,
      foodPreference: formData.foodPreference,
      volunteerInterest: formData.volunteerInterest,
      photoUrl: formData.photoUrl || undefined,
      status: 'pending',
      confirmationSent: false,
      registeredAt: new Date().toISOString()
    };

    await saveRegistration(newRecord);
    setSubmittedRecord(newRecord);
    setIsSubmitting(false);

    if (onSuccess) onSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    const el = document.getElementById('delegate-acknowledgement-card');
    if (el) {
      exportElementAsPdf(el, `Acknowledgement_${submittedRecord?.id || 'Delegate'}.pdf`);
    } else {
      window.print();
    }
  };

  const handleExportImage = () => {
    const el = document.getElementById('delegate-acknowledgement-card');
    if (el) {
      exportElementAsImage(el, `Acknowledgement_${submittedRecord?.id || 'Delegate'}.png`);
    }
  };

  return (
    <section id="register" className="py-16 sm:py-24 bg-white dark:bg-stone-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>Official Portal Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-tight text-balance">
            Online Registration & Passes
          </h2>
          <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
            Apply for Delegate Participation or Vehicle Gate Passes. All applications receive an Acknowledgement Card and are verified by the Secretariat before Registered Cards are unlocked.
          </p>

          {/* Form Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => {
                setActiveFormTab('delegate');
                setSubmittedRecord(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                activeFormTab === 'delegate'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Delegate Registration</span>
            </button>

            <button
              onClick={() => {
                setActiveFormTab('car');
                setSubmittedRecord(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                activeFormTab === 'car'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Car & Vehicle Pass</span>
            </button>

            {onNavigateStatusCheck && (
              <button
                onClick={onNavigateStatusCheck}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Check Status & Print</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DELEGATE REGISTRATION */}
        {activeFormTab === 'delegate' && (
          <div>
            {/* If submitted, show Acknowledgement Card */}
            {submittedRecord ? (
              <div className="bg-amber-50 dark:bg-stone-900 border-2 border-amber-400 dark:border-amber-600/60 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between border-b border-amber-200 dark:border-stone-800 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif-cinzel font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                        Application Received · Acknowledgement Card
                      </h3>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Under verification by Dotma Reception Secretariat. Please print this slip for communication.
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">Ack Number</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base sm:text-lg">
                      {submittedRecord.id}
                    </span>
                  </div>
                </div>

                {/* Printable Acknowledgement Card */}
                <div
                  id="delegate-acknowledgement-card"
                  className="printable-card-target bg-white dark:bg-stone-850 rounded-2xl p-6 sm:p-8 border-2 border-amber-300 dark:border-stone-700 shadow-md space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-stone-700">
                    <div className="flex items-center gap-3">
                      <img
                        src="/src/assets/images/priti_lagnik_logo.webp"
                        alt="Priti Lagnik Logo"
                        className="w-12 h-12 rounded-full object-contain p-0.5 bg-amber-500/10 border border-amber-400"
                      />
                      <div>
                        <span className="text-[11px] font-mono uppercase font-bold text-amber-700 dark:text-amber-400 block tracking-wider">
                          Priti-Lagnik Maha Mahotsav 2026
                        </span>
                        <h4 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                          {submittedRecord.fullName}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          📍 {submittedRecord.city}, {submittedRecord.state} · Venue: West Dangarkuthi, Dotma
                        </p>
                      </div>
                    </div>

                    {/* Photo slot: Thumbnail if uploaded, else blank frame as requested */}
                    <div className="flex flex-col items-center">
                      {submittedRecord.photoUrl ? (
                        <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-amber-400 shadow-sm bg-stone-100">
                          <img
                            src={submittedRecord.photoUrl}
                            alt={submittedRecord.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-28 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center text-stone-400 bg-stone-50/50 dark:bg-stone-900">
                          <span className="text-[10px] uppercase font-mono font-medium">Photo</span>
                          <span className="text-[9px] text-stone-400 mt-0.5">(Blank)</span>
                        </div>
                      )}
                      <span className="text-[9px] text-stone-500 mt-1 uppercase font-medium">Delegate Photo</span>
                    </div>
                  </div>

                  {/* Pass details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Contact</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {submittedRecord.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Total Delegation</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {submittedRecord.delegationSize} Person(s)
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Event Date</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        Dec 20, 2026
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Accommodation</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {submittedRecord.needAccommodation ? (submittedRecord.accommodationType?.split(' ')[0] || 'Assistance') : "Self Arranged"}
                      </span>
                    </div>
                  </div>

                  {/* Gender & Demographic Breakdown as requested */}
                  <div className="p-3 bg-amber-50 dark:bg-stone-800 rounded-xl border border-amber-200 dark:border-stone-700 flex flex-wrap items-center justify-between text-xs gap-3">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Attendee Demographics Breakdown:
                    </span>
                    <div className="flex items-center gap-4 text-stone-900 dark:text-stone-100 font-medium">
                      <span>👨 Male: <strong>{submittedRecord.maleCount || 0}</strong></span>
                      <span>👩 Female: <strong>{submittedRecord.femaleCount || 0}</strong></span>
                      <span>🧒 Children: <strong>{submittedRecord.childrenCount || 0}</strong></span>
                    </div>
                  </div>

                  {/* Crucial Instruction Notice */}
                  <div className="p-3.5 rounded-xl bg-amber-100/70 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed border border-amber-300 dark:border-stone-700">
                    <strong>Important Notice:</strong> Registrants should print or save this Acknowledgement Slip for communication and reference. Your official <strong>Registered Card with QR Code</strong> will unlock for printing after acceptance from the Secretariat. Check status using Ack ID: <span className="font-mono font-bold text-amber-800 dark:text-amber-400">{submittedRecord.id}</span>.
                  </div>
                </div>

                {/* Actions: Print, Save as PDF, Save as Image */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSubmittedRecord(null)}
                    className="px-5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    ← Register Another Participant
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-colors"
                      title="Print Acknowledgement Slip"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Slip</span>
                    </button>

                    <button
                      onClick={handleExportPdf}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition-colors"
                      title="Export and Save as PDF"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save as PDF</span>
                    </button>

                    <button
                      onClick={handleExportImage}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow-sm transition-colors"
                      title="Save as PNG Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Save as Image</span>
                    </button>

                    {onNavigateStatusCheck && (
                      <button
                        onClick={onNavigateStatusCheck}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        <span>Check Status Portal</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Delegate Form */
              <form
                onSubmit={handleSubmit}
                className="bg-stone-50/70 dark:bg-stone-900/90 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6"
              >
                {/* Photo Upload */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-800 border border-amber-200/80 dark:border-stone-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-amber-600" />
                        <span>Upload Delegate Photo Thumbnail (Optional)</span>
                      </label>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Printed on the Registered Pass Card if provided. If left blank, a clean empty photo frame will be printed.
                      </p>
                    </div>

                    {formData.photoUrl ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.photoUrl}
                          alt="Thumbnail Preview"
                          className="w-14 h-16 object-cover rounded-xl border-2 border-amber-500 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-xs hover:bg-red-200"
                          title="Remove Photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-stone-700 hover:bg-amber-100 border border-amber-300 dark:border-stone-600 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors">
                        <Upload className="w-3.5 h-3.5 text-amber-600" />
                        <span>Choose Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Full Name of Head / Delegate *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Sanjib Narzary"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      City / District *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Kokrajhar, Guwahati, Siliguri"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      State / Region
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Male, Female, and Children demographic breakdown as requested */}
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-850 border border-amber-200 dark:border-stone-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>Delegation Attendees Composition *</span>
                      </label>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono">
                        Total: {Math.max(1, (formData.maleCount || 0) + (formData.femaleCount || 0) + (formData.childrenCount || 0))} Attendees
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          👨 Male Participants (Adults)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="200"
                          value={formData.maleCount}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setFormData(prev => ({
                              ...prev,
                              maleCount: val,
                              delegationSize: val + prev.femaleCount + prev.childrenCount
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          👩 Female Participants (Adults)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="200"
                          value={formData.femaleCount}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setFormData(prev => ({
                              ...prev,
                              femaleCount: val,
                              delegationSize: prev.maleCount + val + prev.childrenCount
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                          🧒 Children (Under 12 Yrs)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.childrenCount}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setFormData(prev => ({
                              ...prev,
                              childrenCount: val,
                              delegationSize: prev.maleCount + prev.femaleCount + val
                            }));
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Estimated Arrival Date at West Dangarkuthi, Dotma
                    </label>
                    <input
                      type="date"
                      min="2026-12-18"
                      max="2026-12-23"
                      value={formData.arrivalDate}
                      onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      Accommodation Assistance Required?
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="needAcc"
                          checked={formData.needAccommodation === true}
                          onChange={() => setFormData({ ...formData, needAccommodation: true })}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="needAcc"
                          checked={formData.needAccommodation === false}
                          onChange={() => setFormData({ ...formData, needAccommodation: false })}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>No, self-arranged</span>
                      </label>
                    </div>
                  </div>
                </div>

                {formData.needAccommodation && (
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700 space-y-2">
                    <label className="block text-xs font-semibold text-stone-800 dark:text-stone-200">
                      Select Preferred Accommodation Category:
                    </label>
                    <select
                      value={formData.accommodationType}
                      onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs"
                    >
                      <option value="Ashram Dormitory (Dotma Niwas)">
                        Ashram Dormitory (Dotma Niwas) - Complimentary with Satvik Prasad
                      </option>
                      <option value="Eco-Friendly Tent Village (Campus)">
                        Eco-Friendly Tent Village (Campus) - Complimentary for Youth Delegations
                      </option>
                      <option value="Bodoland Territorial Guest House">
                        Bodoland Territorial Guest House (₹800 - ₹1,500/night)
                      </option>
                      <option value="Hotel Gaurang / Kokrajhar Town Lodge">
                        Hotel Gaurang / Kokrajhar Town Lodge (Private tariff)
                      </option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Registering with Secretariat...</span>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Submit Registration & Get Acknowledgement Card</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: CAR & VEHICLE PASS REGISTRATION */}
        {activeFormTab === 'car' && (
          <CarPassForm
            onCheckStatus={onNavigateStatusCheck}
          />
        )}
      </div>
    </section>
  );
};
