import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Printer,
  Sparkles,
  QrCode,
  Car,
  User,
  ShieldCheck,
  MapPin,
  Phone,
  AlertCircle,
  FileDown,
  Image as ImageIcon
} from 'lucide-react';
import { RegistrationRecord, CarPassRecord } from '../types';
import { getRegistrationById, getCarPassById } from '../services/registrationService';
import { generateQrCodeDataUrl } from '../utils/qrGenerator';
import { exportElementAsPdf, exportElementAsImage } from '../utils/exportCardUtils';

export const StatusCheckView: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [delegateRecord, setDelegateRecord] = useState<RegistrationRecord | null>(null);
  const [carPassRecord, setCarPassRecord] = useState<CarPassRecord | null>(null);

  const [delegateQrUrl, setDelegateQrUrl] = useState<string>('');
  const [carPassQrUrl, setCarPassQrUrl] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setSearched(true);
    setDelegateRecord(null);
    setCarPassRecord(null);
    setDelegateQrUrl('');
    setCarPassQrUrl('');

    const query = searchInput.trim();

    // Check car pass first if query contains "CAR" or typical license plate pattern
    if (query.toUpperCase().includes('CAR')) {
      const car = await getCarPassById(query);
      if (car) {
        setCarPassRecord(car);
        if (car.status === 'accepted') {
          // Generate QR Code with Name, Car Reg Number, Address, Contact
          const qrText = `Name: ${car.name}\nCar Reg: ${car.carRegistrationNumber}\nAddress: ${car.address}\nDriver: ${car.driverName}\nContact: ${car.contactNumber}\nPass ID: ${car.id}`;
          const url = await generateQrCodeDataUrl(qrText);
          setCarPassQrUrl(url);
        }
        setLoading(false);
        return;
      }
    }

    // Try delegate registration
    const reg = await getRegistrationById(query);
    if (reg) {
      setDelegateRecord(reg);
      if (reg.status === 'accepted') {
        // Generate QR code with Name, Address and Contact Number as required
        const qrText = `Name: ${reg.fullName}\nAddress: ${reg.city}, ${reg.state}\nContact: ${reg.phone}\nReg ID: ${reg.id}`;
        const url = await generateQrCodeDataUrl(qrText);
        setDelegateQrUrl(url);
      }
      setLoading(false);
      return;
    }

    // Otherwise try car pass as fallback (e.g. searching by license plate)
    const carFallback = await getCarPassById(query);
    if (carFallback) {
      setCarPassRecord(carFallback);
      if (carFallback.status === 'accepted') {
        const qrText = `Name: ${carFallback.name}\nCar Reg: ${carFallback.carRegistrationNumber}\nAddress: ${carFallback.address}\nDriver: ${carFallback.driverName}\nContact: ${carFallback.contactNumber}\nPass ID: ${carFallback.id}`;
        const url = await generateQrCodeDataUrl(qrText);
        setCarPassQrUrl(url);
      }
    }

    setLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-20 bg-stone-50/50 dark:bg-stone-900/30 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Search className="w-4 h-4 text-amber-600" />
            <span>Verification & Pass Issuance Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
            Check Status & Print Passes
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Enter your Acknowledgement Reference Number (e.g. <span className="font-mono text-stone-800 dark:text-stone-200">PLM26-839201</span> or <span className="font-mono text-stone-800 dark:text-stone-200">PLM26-CAR-123456</span>), Registered Mobile Number, or Car Registration Number to verify status and print official cards.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-stone-850 p-2 rounded-2xl border border-stone-300 dark:border-stone-700 shadow-md">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Ack Number, Phone, or Car Plate (e.g. AS-16-E-1234)..."
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border-none bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
              <Search className="w-5 h-5 text-stone-400 absolute left-3 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:bg-stone-400 active:scale-95 whitespace-nowrap"
            >
              {loading ? 'Searching...' : 'Check Status'}
            </button>
          </div>
        </form>

        {/* Result Area */}
        {searched && !loading && !delegateRecord && !carPassRecord && (
          <div className="p-8 text-center bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm max-w-lg mx-auto space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
              No Record Found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              We couldn't find an application matching "<strong>{searchInput}</strong>". Please verify your Acknowledgement Number or mobile number, or submit a new registration.
            </p>
          </div>
        )}

        {/* ================= CASE 1: DELEGATE REGISTRATION ================= */}
        {delegateRecord && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Alert Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                delegateRecord.status === 'accepted'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200'
                  : delegateRecord.status === 'declined'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700/60 text-red-900 dark:text-red-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {delegateRecord.status === 'accepted' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : delegateRecord.status === 'declined' ? (
                  <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {delegateRecord.status === 'accepted'
                      ? 'Registration Accepted & Card Granted!'
                      : delegateRecord.status === 'declined'
                      ? 'Registration Status: Declined / Need Verification'
                      : 'Status: Pending Secretariat Review'}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {delegateRecord.status === 'accepted'
                      ? 'Your official Registered Delegate Card is ready for self-printing below.'
                      : delegateRecord.status === 'declined'
                      ? 'Please contact the Dotma Reception Secretariat (+91 94350 78334) for assistance.'
                      : 'The Reception Committee is verifying details. Only accepted participants can print the official card.'}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider block">
                  {delegateRecord.id}
                </span>
              </div>
            </div>

            {/* CARD 1A: IF ACCEPTED -> OFFICIAL REGISTERED CARD WITH QR CODE & PHOTO */}
            {delegateRecord.status === 'accepted' ? (
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800 gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Official Registered Delegate Card
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('delegate-official-pass-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsPdf(el, `Delegate_Pass_${delegateRecord.id}.pdf`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                    >
                      <FileDown className="w-4 h-4 text-amber-400" />
                      <span>{isExporting ? 'Exporting...' : 'Save as PDF'}</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('delegate-official-pass-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsImage(el, `Delegate_Pass_${delegateRecord.id}.png`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Save as Image</span>
                    </button>
                  </div>
                </div>

                {/* Printable Target Container */}
                <div
                  id="delegate-official-pass-card"
                  className="printable-card-target bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 dark:from-stone-850 dark:to-stone-900 rounded-2xl p-6 sm:p-8 border-2 border-amber-400 dark:border-amber-600 shadow-lg space-y-5"
                >
                  {/* Card Header with Logo */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b-2 border-amber-300 dark:border-stone-700">
                    <div className="flex items-center gap-3">
                      <img
                        src="/src/assets/images/priti_lagnik_logo.webp"
                        alt="Priti Lagnik Logo"
                        className="w-14 h-14 object-contain rounded-full shadow-sm"
                      />
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-amber-800 dark:text-amber-400 font-bold block">
                          Priti-Lagnik Maha Mahotsav 2026
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100 tracking-wide">
                          OFFICIAL REGISTERED DELEGATE PASS
                        </h3>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400">
                          Main Celebration: 20 December 2026 · West Dangarkuthi, Dotma, Kokrajhar, Assam
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-stone-400 block">Pass ID</span>
                      <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-300">
                        {delegateRecord.id}
                      </span>
                    </div>
                  </div>

                  {/* Body: Left Details, Center Photo, Right QR Code */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Left: Delegate Info */}
                    <div className="md:col-span-6 space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Delegate Full Name
                        </span>
                        <h4 className="text-xl sm:text-2xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                          {delegateRecord.fullName}
                        </h4>
                        <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
                          📍 {delegateRecord.city}, {delegateRecord.state}
                        </p>
                      </div>

                      {/* Demographic Breakdown: Male, Female, Children */}
                      <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-stone-800 border border-amber-300 dark:border-stone-700 text-xs">
                        <span className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300 block mb-1">
                          Delegation Breakdown ({delegateRecord.delegationSize || (Number(delegateRecord.maleCount || 0) + Number(delegateRecord.femaleCount || 0) + Number(delegateRecord.childrenCount || 0)) || 1} Total)
                        </span>
                        <div className="grid grid-cols-3 gap-2 text-center font-mono font-bold text-xs">
                          <div className="bg-white/80 dark:bg-stone-900 py-1 rounded">
                            <span className="text-stone-500 text-[10px] block font-sans">Male</span>
                            <span className="text-stone-900 dark:text-stone-100">{delegateRecord.maleCount || 0}</span>
                          </div>
                          <div className="bg-white/80 dark:bg-stone-900 py-1 rounded">
                            <span className="text-stone-500 text-[10px] block font-sans">Female</span>
                            <span className="text-stone-900 dark:text-stone-100">{delegateRecord.femaleCount || 0}</span>
                          </div>
                          <div className="bg-white/80 dark:bg-stone-900 py-1 rounded">
                            <span className="text-stone-500 text-[10px] block font-sans">Children</span>
                            <span className="text-stone-900 dark:text-stone-100">{delegateRecord.childrenCount || 0}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-stone-400 text-[10px] block">Contact Number</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">
                            {delegateRecord.phone}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Arrival Date</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">
                            {delegateRecord.arrivalDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Accommodation</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">
                            {delegateRecord.needAccommodation ? (delegateRecord.accommodationType?.split(' ')[0] || 'Assigned') : 'Self'}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block">Prasadam / Seva</span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            Anandabazar Access
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Photo (If available else blank frame as requested) */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center">
                      {delegateRecord.photoUrl ? (
                        <div className="w-28 h-32 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md bg-stone-100">
                          <img
                            src={delegateRecord.photoUrl}
                            alt={delegateRecord.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-32 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center text-stone-400 bg-stone-50/50 dark:bg-stone-800">
                          <span className="text-[10px] uppercase font-mono font-medium">Photo</span>
                          <span className="text-[9px] text-stone-400 mt-0.5">(Blank)</span>
                        </div>
                      )}
                      <span className="text-[9px] text-stone-500 mt-1 uppercase font-semibold">
                        Delegate Portrait
                      </span>
                    </div>

                    {/* Right: Dynamic Scannable QR Code */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center">
                      {delegateQrUrl ? (
                        <div className="p-2 bg-white rounded-xl border-2 border-stone-300 shadow-sm flex flex-col items-center">
                          <img
                            src={delegateQrUrl}
                            alt="Verification QR Code"
                            className="w-28 h-28 object-contain"
                          />
                          <span className="text-[9px] font-mono text-stone-700 font-bold mt-1">
                            {delegateRecord.id}
                          </span>
                        </div>
                      ) : (
                        <div className="w-28 h-28 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                          <QrCode className="w-8 h-8" />
                        </div>
                      )}
                      <span className="text-[9px] text-stone-500 mt-1 text-center font-medium">
                        Scan for Name, Address & Contact
                      </span>
                    </div>
                  </div>

                  {/* Card Security Footer */}
                  <div className="mt-6 pt-4 border-t border-amber-200 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-500">
                    <span>Central Reception Secretariat Seal: <strong>VERIFIED & GRANTED</strong></span>
                    <span className="font-mono">Issued: {delegateRecord.confirmedAt?.slice(0, 10) || '2026-12'}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* CARD 1B: IF PENDING -> ACKNOWLEDGEMENT CARD (Can print & export for reference) */
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
                      Registration Acknowledgement Slip
                    </span>
                    <h3 className="text-xl font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                      {delegateRecord.fullName}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('delegate-pending-ack-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsPdf(el, `Delegate_Ack_${delegateRecord.id}.pdf`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
                    >
                      <FileDown className="w-4 h-4 text-amber-400" />
                      <span>Save as PDF</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('delegate-pending-ack-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsImage(el, `Delegate_Ack_${delegateRecord.id}.png`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Save as Image</span>
                    </button>
                  </div>
                </div>

                {/* Printable Acknowledgement Card */}
                <div
                  id="delegate-pending-ack-card"
                  className="printable-card-target p-6 rounded-2xl bg-amber-50/50 dark:bg-stone-850 border border-amber-300 dark:border-stone-700 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/src/assets/images/priti_lagnik_logo.webp"
                        alt="Logo"
                        className="w-12 h-12 object-contain rounded-full shadow-sm"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-amber-800 dark:text-amber-300 font-bold uppercase block">
                          Priti-Lagnik Maha Mahotsav 2026
                        </span>
                        <h4 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
                          APPLICATION ACKNOWLEDGEMENT
                        </h4>
                        <p className="text-xs text-stone-500">
                          Ack Ref: <strong className="font-mono text-stone-900 dark:text-stone-100">{delegateRecord.id}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      {delegateRecord.photoUrl ? (
                        <img
                          src={delegateRecord.photoUrl}
                          alt={delegateRecord.fullName}
                          className="w-20 h-24 object-cover rounded-xl border border-amber-300"
                        />
                      ) : (
                        <div className="w-20 h-24 rounded-xl border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400 text-[10px]">
                          (Blank)
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-amber-200 dark:border-stone-700">
                    <div>
                      <span className="text-stone-400 text-[10px] block">Contact</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{delegateRecord.phone}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Delegation Breakdown</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                        {delegateRecord.maleCount || 0}M / {delegateRecord.femaleCount || 0}F / {delegateRecord.childrenCount || 0}C
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Arrival</span>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{delegateRecord.arrivalDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] block">Current Status</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400 uppercase">Under Review</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-100/70 dark:bg-stone-800 rounded-xl text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Attendee Instruction:</strong> Please retain or save this Acknowledgement Slip. The official Registered Card can only be printed after acceptance from the Secretariat.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= CASE 2: CAR & VEHICLE PASS ================= */}
        {carPassRecord && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Alert Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                carPassRecord.status === 'accepted'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200'
                  : carPassRecord.status === 'declined'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700/60 text-red-900 dark:text-red-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {carPassRecord.status === 'accepted' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : carPassRecord.status === 'declined' ? (
                  <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm">
                    {carPassRecord.status === 'accepted'
                      ? 'Vehicle Pass Granted & Ready for Print!'
                      : carPassRecord.status === 'declined'
                      ? 'Vehicle Pass Application Declined'
                      : 'Car Pass Application Pending Grant'}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {carPassRecord.status === 'accepted'
                      ? 'Print your official Windshield / Dashboard Car Pass below with security QR code.'
                      : carPassRecord.status === 'declined'
                      ? 'Please park at the Dotma bypass public overflow parking field.'
                      : 'Participants can check status with this acknowledgement number.'}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold uppercase tracking-wider block">
                  {carPassRecord.id}
                </span>
              </div>
            </div>

            {/* CARD 2A: IF ACCEPTED -> OFFICIAL WINDSHIELD CAR PASS WITH GIANT BANNER, QR CODE & PHOTO */}
            {carPassRecord.status === 'accepted' ? (
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800 gap-3">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Official Windshield / Dashboard Vehicle Pass
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('car-windshield-pass-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsPdf(el, `Car_Pass_${carPassRecord.carRegistrationNumber}.pdf`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                    >
                      <FileDown className="w-4 h-4 text-amber-400" />
                      <span>Save as PDF</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('car-windshield-pass-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsImage(el, `Car_Pass_${carPassRecord.carRegistrationNumber}.png`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Save as Image</span>
                    </button>
                  </div>
                </div>

                {/* Printable Target Windshield Display Pass */}
                <div
                  id="car-windshield-pass-card"
                  className="printable-card-target bg-white dark:bg-stone-850 rounded-3xl p-6 sm:p-8 border-4 border-black dark:border-amber-400 shadow-2xl space-y-5"
                >
                  {/* VERY BIG VISIBLE CAR PASS BANNER */}
                  <div className="bg-amber-400 text-black py-4 px-4 sm:px-6 rounded-2xl border-4 border-black text-center shadow-lg">
                    <div className="text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-widest uppercase flex items-center justify-center gap-3 sm:gap-6">
                      <Car className="w-8 h-8 sm:w-12 sm:h-12 stroke-[3]" />
                      <span>*** CAR PASS ***</span>
                      <Car className="w-8 h-8 sm:w-12 sm:h-12 stroke-[3]" />
                    </div>
                    <div className="text-xs sm:text-sm font-black tracking-widest uppercase mt-1 text-black">
                      OFFICIAL VEHICLE ENTRY & PARKING PASS · PRITI-LAGNIK MAHA MAHOTSAV 2026
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-3 border-b-2 border-black dark:border-stone-700">
                    <div className="flex items-center gap-3">
                      <img
                        src="/src/assets/images/priti_lagnik_logo.webp"
                        alt="Logo"
                        className="w-12 h-12 object-contain rounded-full shadow-sm"
                      />
                      <div>
                        <h4 className="text-lg font-serif-cinzel font-bold text-stone-900 dark:text-stone-100">
                          West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347
                        </h4>
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                          Main Celebration: 20 December 2026
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-stone-500 block">Pass Serial</span>
                      <span className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">
                        {carPassRecord.id}
                      </span>
                    </div>
                  </div>

                  {/* Gigantic Vehicle Registration Number Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-100 dark:bg-stone-800 border-3 border-black dark:border-amber-400 text-center shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 block mb-1">
                      Authorized Vehicle Registration Plate
                    </span>
                    <div className="text-3xl sm:text-5xl font-mono font-black tracking-widest text-stone-950 dark:text-amber-300 uppercase">
                      {carPassRecord.carRegistrationNumber}
                    </div>
                    <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wide">
                      📍 ALLOCATED PARKING: {carPassRecord.allocatedZone || 'GATE 1 MAIN CORRIDOR'}
                    </div>
                  </div>

                  {/* Body with QR Code and Photo */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                    {/* Left: Details */}
                    <div className="md:col-span-6 space-y-2 text-xs">
                      <div>
                        <span className="text-stone-400 text-[10px] block uppercase font-bold">Owner / Delegation Name</span>
                        <span className="font-bold text-stone-900 dark:text-stone-100 text-base font-serif-cinzel">
                          {carPassRecord.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 text-[10px] block uppercase font-bold">Origin Address</span>
                        <span className="font-medium text-stone-800 dark:text-stone-200">
                          {carPassRecord.address}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <span className="text-stone-400 text-[10px] block uppercase font-bold">Driver Name</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">{carPassRecord.driverName}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] block uppercase font-bold">Contact Number</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">{carPassRecord.contactNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Photo (if available, else blank) */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center">
                      {carPassRecord.photoUrl ? (
                        <div className="w-28 h-32 rounded-xl overflow-hidden border-2 border-black shadow-sm bg-stone-100">
                          <img
                            src={carPassRecord.photoUrl}
                            alt="Driver / Vehicle"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-28 h-32 rounded-xl border-2 border-dashed border-stone-400 flex flex-col items-center justify-center text-stone-400 bg-stone-50">
                          <span className="text-[10px] uppercase font-mono font-medium">Photo</span>
                          <span className="text-[9px] text-stone-400 mt-0.5">(Blank)</span>
                        </div>
                      )}
                      <span className="text-[9px] text-stone-500 mt-1 uppercase font-semibold">
                        Driver / Vehicle
                      </span>
                    </div>

                    {/* Right: Dynamic QR Code */}
                    <div className="md:col-span-3 flex flex-col items-center justify-center">
                      {carPassQrUrl ? (
                        <div className="p-2 bg-white rounded-xl border-2 border-black shadow-sm flex flex-col items-center">
                          <img
                            src={carPassQrUrl}
                            alt="Vehicle Pass QR Code"
                            className="w-28 h-28 object-contain"
                          />
                          <span className="text-[9px] font-mono font-bold text-black mt-1">
                            {carPassRecord.id}
                          </span>
                        </div>
                      ) : (
                        <div className="w-28 h-28 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                          <QrCode className="w-8 h-8" />
                        </div>
                      )}
                      <span className="text-[9px] text-stone-500 mt-1 text-center font-medium">
                        Scan for Name, Car Reg & Address
                      </span>
                    </div>
                  </div>

                  {/* Windshield Display Notice */}
                  <div className="pt-3 border-t-2 border-black dark:border-stone-700 text-center text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider bg-stone-100 dark:bg-stone-800 p-2 rounded-xl">
                    ⚠️ PLEASE DISPLAY THIS CAR PASS CLEARLY ON THE FRONT WINDSHIELD / DASHBOARD FOR ENTRY AT GATES
                  </div>
                </div>
              </div>
            ) : (
              /* CARD 2B: IF PENDING CAR PASS -> VEHICLE ACKNOWLEDGEMENT CARD */
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
                      Vehicle Pass Acknowledgement
                    </span>
                    <h3 className="text-xl font-bold font-serif-cinzel text-stone-900 dark:text-stone-100">
                      {carPassRecord.carRegistrationNumber}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 text-white font-semibold text-xs"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('vehicle-pending-ack-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsPdf(el, `Vehicle_Ack_${carPassRecord.carRegistrationNumber}.pdf`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs"
                    >
                      <FileDown className="w-4 h-4 text-amber-400" />
                      <span>Save as PDF</span>
                    </button>

                    <button
                      disabled={isExporting}
                      onClick={async () => {
                        const el = document.getElementById('vehicle-pending-ack-card');
                        if (!el) return;
                        setIsExporting(true);
                        await exportElementAsImage(el, `Vehicle_Ack_${carPassRecord.carRegistrationNumber}.png`);
                        setIsExporting(false);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 text-white font-semibold text-xs"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>Save as Image</span>
                    </button>
                  </div>
                </div>

                <div
                  id="vehicle-pending-ack-card"
                  className="printable-card-target p-6 rounded-2xl bg-amber-50/50 dark:bg-stone-850 border border-amber-300 dark:border-stone-700 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/src/assets/images/priti_lagnik_logo.webp"
                        alt="Logo"
                        className="w-12 h-12 object-contain rounded-full shadow-sm"
                      />
                      <div>
                        <h4 className="text-xl font-bold font-serif-cinzel">VEHICLE APPLICATION ACKNOWLEDGEMENT</h4>
                        <p className="text-xs text-stone-500">
                          Pass Ref: <strong className="font-mono text-stone-900 dark:text-stone-100">{carPassRecord.id}</strong>
                        </p>
                        <p className="text-xs mt-1">Vehicle Plate: <strong>{carPassRecord.carRegistrationNumber}</strong></p>
                      </div>
                    </div>

                    {carPassRecord.photoUrl ? (
                      <img src={carPassRecord.photoUrl} alt="Vehicle" className="w-20 h-24 object-cover rounded-xl border border-amber-300" />
                    ) : (
                      <div className="w-20 h-24 rounded-xl border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400 text-[10px]">
                        (Blank)
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-amber-100/70 dark:bg-stone-800 rounded-xl text-xs leading-relaxed">
                    <strong>Vehicle Notice:</strong> Application is pending review. Your printable Windshield Car Pass card with QR Code and parking bay will unlock once accepted by the Secretariat.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
