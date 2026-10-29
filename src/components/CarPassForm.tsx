import React, { useState } from 'react';
import {
  Car,
  Camera,
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  Printer,
  Sparkles,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  FileDown,
  Image as ImageIcon
} from 'lucide-react';
import { CarPassRecord } from '../types';
import { saveCarPass } from '../services/registrationService';
import { exportElementAsPdf, exportElementAsImage } from '../utils/exportCardUtils';
import pritiLogo from '../assets/images/priti_lagnik_logo.webp';

interface CarPassFormProps {
  onSuccess?: (record: CarPassRecord) => void;
  onCheckStatus?: () => void;
}

export const CarPassForm: React.FC<CarPassFormProps> = ({ onSuccess, onCheckStatus }) => {
  const [formData, setFormData] = useState({
    name: '',
    carRegistrationNumber: '',
    driverName: '',
    driverPhone: '',
    contactNumber: '',
    address: '',
    vehicleType: 'Car / Sedan / Hatchback',
    photoUrl: '' as string | undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<CarPassRecord | null>(null);

  const vehicleTypes = [
    'Car / Sedan / Hatchback',
    'SUV / MUV',
    'Mini-Bus / Traveler (12-24 Seater)',
    'Bus (30+ Seater)',
    'Auto / E-Rickshaw Delegation',
    'Two Wheeler / Bike'
  ];

  // Handle Photo Upload (Driver or Vehicle)
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
    if (!formData.name.trim()) errs.name = 'Owner / Organization name is required';
    if (!formData.carRegistrationNumber.trim()) {
      errs.carRegistrationNumber = 'Vehicle registration number is required (e.g. AS-16-E-1234)';
    }
    if (!formData.driverName.trim()) errs.driverName = 'Driver name is required';
    if (!formData.contactNumber.trim() || formData.contactNumber.length < 10) {
      errs.contactNumber = 'Valid 10-digit contact number is required';
    }
    if (!formData.address.trim()) errs.address = 'Origin address (City, State) is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const newRecord: CarPassRecord = {
      id: `PLM26-CAR-${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name.trim(),
      carRegistrationNumber: formData.carRegistrationNumber.trim().toUpperCase(),
      driverName: formData.driverName.trim(),
      driverPhone: formData.driverPhone.trim() || formData.contactNumber.trim(),
      contactNumber: formData.contactNumber.trim(),
      address: formData.address.trim(),
      vehicleType: formData.vehicleType,
      photoUrl: formData.photoUrl || undefined,
      status: 'pending',
      allocatedZone: 'Pending Secretariat Allocation',
      registeredAt: new Date().toISOString()
    };

    await saveCarPass(newRecord);
    setSubmittedRecord(newRecord);
    setIsSubmitting(false);

    if (onSuccess) onSuccess(newRecord);
  };

  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    const el = document.getElementById('car-acknowledgement-card');
    if (!el || !submittedRecord) return;
    setIsExporting(true);
    await exportElementAsPdf(el, `Car_Pass_Ack_${submittedRecord.carRegistrationNumber}.pdf`);
    setIsExporting(false);
  };

  const handleExportImage = async () => {
    const el = document.getElementById('car-acknowledgement-card');
    if (!el || !submittedRecord) return;
    setIsExporting(true);
    await exportElementAsImage(el, `Car_Pass_Ack_${submittedRecord.carRegistrationNumber}.png`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6">
      {/* If submitted, show Acknowledgement Slip */}
      {submittedRecord ? (
        <div className="bg-amber-50 dark:bg-stone-900 border-2 border-amber-400 dark:border-amber-600/60 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-stone-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-cinzel font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                  Car Pass Application Received
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Acknowledgement Slip generated · Retain for entry validation
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

          {/* Acknowledgement Card (Printable with Big CAR PASS Banner) */}
          <div
            id="car-acknowledgement-card"
            className="printable-card-target bg-white dark:bg-stone-850 rounded-2xl p-6 sm:p-8 border-4 border-amber-500 dark:border-amber-400 shadow-md space-y-5"
          >
            {/* VERY BIG VISIBLE CAR PASS BANNER */}
            <div className="bg-amber-500 text-stone-950 font-black tracking-widest text-center py-3 px-4 rounded-xl shadow-inner border-2 border-amber-600">
              <div className="text-2xl sm:text-3xl font-mono tracking-widest uppercase flex items-center justify-center gap-3">
                <Car className="w-7 h-7 sm:w-8 sm:h-8" />
                <span>*** CAR PASS ACKNOWLEDGEMENT ***</span>
                <Car className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="text-xs tracking-wider font-semibold uppercase mt-0.5 text-stone-900">
                Priti-Lagnik Maha Mahotsav 2026 · West Dangarkuthi, Dotma
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <img
                    src={pritiLogo}
                    alt="Priti Lagnik Logo"
                    className="w-10 h-10 object-contain rounded-full shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-amber-700 dark:text-amber-400 font-bold block">
                      Event Date: 20 December 2026
                    </span>
                    <span className="text-xs text-stone-500">
                      West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Registered Vehicle Plate
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest">
                    {submittedRecord.carRegistrationNumber}
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                  Owner / Delegation: <strong>{submittedRecord.name}</strong> · {submittedRecord.address}
                </p>

                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  <span>Status: Pending Secretariat Grant (Grant required for Windshield Pass)</span>
                </div>
              </div>

              {/* Photo: Photo if available, else blank frame as requested */}
              <div className="flex flex-col items-center">
                {submittedRecord.photoUrl ? (
                  <div className="w-28 h-32 rounded-xl overflow-hidden border-2 border-amber-500 shadow-sm bg-stone-100">
                    <img
                      src={submittedRecord.photoUrl}
                      alt={submittedRecord.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-32 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center text-stone-400 bg-stone-50/50 dark:bg-stone-900">
                    <span className="text-[10px] uppercase font-mono font-medium">Photo</span>
                    <span className="text-[9px] text-stone-400 mt-0.5">(Blank)</span>
                  </div>
                )}
                <span className="text-[9px] text-stone-500 mt-1 uppercase font-medium">Driver / Vehicle</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Driver Name</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                  {submittedRecord.driverName}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Driver Contact</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                  {submittedRecord.driverPhone}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Vehicle Type</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                  {submittedRecord.vehicleType}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Parking Allocation</span>
                <span className="font-semibold text-stone-500 text-sm">
                  Assigned upon Grant
                </span>
              </div>
            </div>

            {/* Instruction Banner */}
            <div className="p-4 rounded-xl bg-amber-100/60 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed border border-amber-200 dark:border-stone-700">
              <strong>Notice:</strong> Please save this Acknowledgement Slip as PDF or image. Once the Secretariat approves your vehicle entry, your official <strong>Printable Windshield Car Pass</strong> (with parking bay and security QR code) will be unlocked in the <em>Check Status</em> portal.
            </div>
          </div>

          {/* Action Buttons with Save as PDF and Save as Image */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setSubmittedRecord(null)}
              className="px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              ← Apply for Another Vehicle
            </button>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Slip</span>
              </button>

              <button
                onClick={handleExportPdf}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                <FileDown className="w-4 h-4 text-amber-400" />
                <span>{isExporting ? 'Generating...' : 'Save as PDF'}</span>
              </button>

              <button
                onClick={handleExportImage}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold shadow-sm transition-colors disabled:opacity-50"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Save as Image</span>
              </button>

              {onCheckStatus && (
                <button
                  onClick={onCheckStatus}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <span>Check Pass Status</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Car Pass Registration Form */
        <form
          onSubmit={handleSubmit}
          className="bg-stone-50/70 dark:bg-stone-900/90 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6"
        >
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <Car className="w-5 h-5 text-amber-600" />
              <span>Official Vehicle & Parking Pass Application</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Required for all private four-wheelers, buses, and delegation vans seeking entry into the Dotma Mahotsav parking zones.
            </p>
          </div>

          {/* Optional Photo Upload */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-amber-200/80 dark:border-stone-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Upload Driver or Vehicle Photo (Optional)</span>
                </label>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Printed on the granted vehicle windshield pass card. If left empty, a blank photo frame will be printed.
                </p>
              </div>

              {formData.photoUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={formData.photoUrl}
                    alt="Vehicle Thumbnail"
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
            {/* Owner / Org Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Name of Vehicle Owner / Delegation *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sanjib Narzary / Kokrajhar Satsang Delegation"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Car Registration Number Plate */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Car Registration Number (Plate) *
              </label>
              <input
                type="text"
                value={formData.carRegistrationNumber}
                onChange={(e) => setFormData({ ...formData, carRegistrationNumber: e.target.value.toUpperCase() })}
                placeholder="e.g. AS-16-E-1234 or WB-74-B-9988"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono font-bold text-sm uppercase focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              {errors.carRegistrationNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.carRegistrationNumber}</span>
                </p>
              )}
            </div>

            {/* Driver Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Driver Details (Full Name) *
              </label>
              <input
                type="text"
                value={formData.driverName}
                onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                placeholder="Driver Name"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              {errors.driverName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.driverName}</span>
                </p>
              )}
            </div>

            {/* Driver Phone */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Driver Mobile / WhatsApp
              </label>
              <input
                type="tel"
                value={formData.driverPhone}
                onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                placeholder="Driver Contact Number"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Owner / Delegate Contact Number *
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="10-digit primary mobile"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.contactNumber}</span>
                </p>
              )}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Vehicle Type
              </label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {vehicleTypes.map((vt) => (
                  <option key={vt} value={vt}>
                    {vt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Origin Address (Town, District, State) *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Kokrajhar Town, Assam"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.address}</span>
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98"
          >
            {isSubmitting ? (
              <span>Submitting Application to Firebase...</span>
            ) : (
              <>
                <Car className="w-4 h-4" />
                <span>Submit Car Pass Application & Get Acknowledgement</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
