import {
  ThakurProfile,
  EventScheduleItem,
  GalleryItem
} from '../types';

export const EVENT_DETAILS = {
  title: "Priti-Lagnik Maha Mahotsav 2026",
  subtitle: "Grand Spiritual & Cultural Confluence · Dotma, Kokrajhar, Assam",
  dates: "December 20, 2026",
  targetIsoDate: "2026-12-20T06:00:00+05:30",
  venue: "West Dangarkuthi, Dotma, Kokrajhar, Assam, India 783347",
  pinCode: "783347",
  coordinates: {
    lat: 26.4633,
    lng: 90.1583
  },
  helplinePhone: "+918472014223",
  whatsappNumber: "+918472014223",
  email: "#",
  mission: "Fostering universal brotherhood, moral elevation, community seva, and spiritual awakening under the divine inspiration of Sree Sree Thakur.",
  theme: "Unconditional Love (Priti), Divine Communion (Lagnik) & Universal Wellbeing (Swastyayani)"
};

export const THAKUR_PROFILES: ThakurProfile[] = [
  
];

export const BIRTH_ANNIVERSARY_INFO: {
  edition: string;
  dates: string;
  theme: string;
  highlights: { title: string; time: string; desc: string }[];
  significanceText: string;
} = {
  edition: "",
  dates: "",
  theme: "",
  highlights: [],
  significanceText: ""
};

export const EVENT_SCHEDULE: EventScheduleItem[] = [
  
];

export const GALLERY_ITEMS: GalleryItem[] = [
  
];

export const TRANSIT_GUIDE = {
  byAir: {
    title: "By Air",
    nearest: "Rupsi Airport (RUP) · 55 km | Guwahati LGBI Airport (GAU) · 220 km",
    details: "Rupsi Airport has direct daily flights from Kolkata and Guwahati. From Rupsi, taxis and festival express vans reach Dotma in approximately 1 hour 15 minutes. From Guwahati LGBI Airport, multiple Vande Bharat and express trains connect to Fakiragram and Kokrajhar stations, or private cabs can take NH-27 via Bongaigaon (approx. 4.5 hours)."
  },
  byTrain: {
    title: "By Train",
    nearest: "Fakiragram Junction (FKM) · 7 km | Kokrajhar (KOJ) · 18 km",
    details: "Fakiragram Jn is only 10–12 minutes from the venue; all passenger and major express trains stop here. Kokrajhar Station is an A-grade junction on the main Northeast Frontier Railway line with stops for Rajdhani, Saraighat, Kamrup, and Brahmaputra Mail. Dedicated free festival shuttle e-rickshaws and buses operate round-the-clock from both stations to the Dotma grounds."
  },
  byRoad: {
    title: "By Road & Bus",
    nearest: "National Highway 27 / 31 (East-West Corridor)",
    details: "Dotma is conveniently located off the National Highway connecting Bongaigaon, Bilasipara, Dhubri, and Kokrajhar. ASTC (Assam State Transport Corporation) and private deluxe sleeper buses run regular services to Kokrajhar and Dotma from Guwahati, Siliguri, Jalpaiguri, and Cooch Behar."
  },
  landmarks: [
    "Dotma Higher Secondary School Playfield (Adjacent to Central Mandap)",
    "Circle Office Dotma (0.5 km)",
    "Dotma Police Station (0.7 km - Emergency & Traffic Desk)",
    "Fakiragram Railway Crossing (6.5 km)"
  ]
};

export const TRUSTED_ORGANIZATIONS: { name: string; role: string; established: string }[] = [
  
];
