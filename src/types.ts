export type PageTab = 'home' | 'about' | 'events' | 'gallery' | 'accommodation' | 'contact' | 'admin' | 'status-check';
export type AboutSubTab = 'overview' | 'committee' | 'teams' | 'organising-teams';

export interface ThakurProfile {
  id: string;
  name: string;
  title: string;
  period: string;
  image: string;
  keyContribution: string;
  quote: string;
  detailedBio: string;
  teachings: string[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  category: 'Patron' | 'Executive' | 'Secretariat' | 'Finance' | 'Cultural';
  location: string;
  phone?: string;
  image?: string;
}

export interface OrganisingTeam {
  id: string;
  name: string;
  lead: string;
  volunteersCount: number;
  responsibilities: string[];
  contactPerson: string;
  contactNumber: string;
}

export interface EventScheduleItem {
  id: string;
  day: number;
  date: string;
  time: string;
  title: string;
  category: 'Ritual' | 'Satsang' | 'Cultural' | 'Symposium' | 'Seva';
  venue: string;
  description: string;
  speakers?: string[];
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: 'Rituals' | 'Seva' | 'Cultural' | 'Past Gatherings' | 'Prasadam' | 'Venue';
  url: string;
  thumbnail: string;
  description: string;
  year?: string;
  duration?: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  type: 'Ashram Niwas' | 'Guest House' | 'Hotel' | 'Tent Village';
  distance: string;
  location: string;
  capacity: string;
  tariff: string;
  amenities: string[];
  contactName: string;
  phone: string;
  whatsapp: string;
  bookingStatus: 'Available' | 'Filling Fast' | 'Limited';
}

export interface RegistrationRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  delegationSize: number; // total = maleCount + femaleCount + childrenCount
  maleCount: number;
  femaleCount: number;
  childrenCount: number;
  arrivalDate: string;
  departureDate: string;
  needAccommodation: boolean;
  accommodationType?: string;
  foodPreference: 'Pure Satvik' | 'Regular Satvik';
  volunteerInterest: boolean;
  photoUrl?: string; // Optional thumbnail photo (base64 data URL)
  status: 'pending' | 'accepted' | 'declined';
  confirmationSent?: boolean;
  confirmedAt?: string;
  notes?: string;
  registeredAt: string;
}

export interface CarPassRecord {
  id: string; // e.g. PLM26-CAR-123456
  name: string;
  carRegistrationNumber: string;
  driverName: string;
  driverPhone?: string;
  contactNumber: string;
  address: string;
  vehicleType: string;
  photoUrl?: string; // Optional thumbnail photo (vehicle or driver)
  status: 'pending' | 'accepted' | 'declined';
  allocatedZone?: string;
  registeredAt: string;
  confirmedAt?: string;
  notes?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Root Admin' | 'Sub-Admin' | 'Reception Secretariat' | 'Security & Parking Admin' | 'Registrar' | 'Traffic & Security' | 'Coordinator';
  passwordHint?: string;
  addedBy?: string;
  createdAt: string;
}

export interface EventDocument {
  id: string;
  title: string;
  category: 'Schedule' | 'Guidelines' | 'Souvenir' | 'Prasadam' | 'Map' | 'Brochure' | 'Notice';
  fileType: 'pdf' | 'docx';
  fileName?: string;
  fileSize?: string;
  fileData?: string; // dataUrl or external url
  url?: string;
  description?: string;
  uploadedAt: string;
}

export interface FeedbackRecord {
  id: string;
  participantId?: string;
  participantIdOrPhone?: string;
  participantName: string;
  phone: string;
  overallRating: number;
  prasadamRating: number;
  accommodationRating: number;
  comments: string;
  submittedAt: string;
}

export type Language = 'hi' | 'en' | 'brx' | 'bn' | 'as';
