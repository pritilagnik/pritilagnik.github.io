import {
  ThakurProfile,
  CommitteeMember,
  OrganisingTeam,
  EventScheduleItem,
  GalleryItem,
  AccommodationOption
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
  helplinePhone: "+91 94350 78334",
  whatsappNumber: "+919435078334",
  email: "pritilagnik2026@dotma.org",
  mission: "Fostering universal brotherhood, moral elevation, community seva, and spiritual awakening under the divine inspiration of Sree Sree Thakur.",
  theme: "Unconditional Love (Priti), Divine Communion (Lagnik) & Universal Wellbeing (Swastyayani)"
};

export const THAKUR_PROFILES: ThakurProfile[] = [
  {
    id: "sree-sree-thakur",
    name: "Sree Sree Thakur Anukulchandra",
    title: "The Supreme Guide & Propounder of Being and Becoming",
    period: "1888 – 1969",
    image: "/src/assets/images/sree_sree_thakur.webp",
    keyContribution: "Propounder of Yajan, Jaajan, Ishtabhrity, Swastyayani, and Sadachara for holistic existential elevation of every human being.",
    quote: "Do never die, nor cause death; but resist death to the utmost.",
    detailedBio: "Sree Sree Thakur Anukulchandra was a revolutionary spiritual guide, physician, sociologist, and philanthropist. His universal philosophy bridges science and spirituality, emphasizing that life is an unbroken journey of 'Being and Becoming'. His advent at Himaitpur, Pabna, and subsequent establishment of the grand Satsang movement at Deoghar, inspired millions worldwide toward character building, inter-communal amity, and active social service. His principles of Priti (love) and Lagnik (unwavering attachment to the Ideal) form the spiritual beacon of this Maha Mahotsav.",
    teachings: [
      "Yajan (Self-realization & personal elevation through holy name meditation)",
      "Jaajan (Infusing living inspiration and divine love into others)",
      "Ishtabhrity (Daily devotional offering before taking meals for collective welfare)",
      "Swastyayani (Five-fold existential principles for health, longevity, and prosperity)",
      "Sadachara (Pure physical and mental conduct, hygiene, and satvik diet)"
    ]
  },
  {
    id: "sree-sree-boroma",
    name: "Jagat Janani Sree Sree Boroma (Manomohini Devi)",
    title: "Embodiment of Divine Motherhood, Seva & Unfathomable Grace",
    period: "1894 – 1968",
    image: "/src/assets/images/sree_sree_boroma.webp",
    keyContribution: "Nurtured the spiritual household of Satsang, guiding mothers, establishing women's moral education, and personifying supreme compassion.",
    quote: "To love the Lord is to serve His creation with a mother's tender heart.",
    detailedBio: "Sree Sree Boroma, divine consort of Sree Sree Thakur Anukulchandra, is revered across millions of homes as the supreme mother figure of the Satsang fellowship. Her life was an incessant prayer and service, providing solace to thousands of distressed souls who sought refuge in Satsang. Her maternal grace and teachings on Matri-Shakti (maternal power), family harmony, and devotion form an essential pillar of Priti-Lagnik Maha Mahotsav 2026.",
    teachings: [
      "Ideal motherhood and compassionate child-rearing",
      "Unwavering faith and dedicated service to the Ideal",
      "Preserving domestic peace, purity, and sacred kitchen hygiene",
      "Empathy and feeding every guest as the divine child"
    ]
  },
  {
    id: "boroda",
    name: "Revered Boroda (Amarendranath Chakravarty)",
    title: "Architect of Organizational Seva & Satsang Heritage",
    period: "1911 – 1994",
    image: "/src/assets/images/sree_sree_boroda.webp",
    keyContribution: "Systematized mass community Annadan (Anandabazar), educational institutions, rural hospital networks, and all-India spiritual conventions.",
    quote: "True devotion blooms in the tireless service to the suffering and hungry.",
    detailedBio: "Revered Boroda, eldest son of Sree Sree Thakur, carried the spiritual burden of the mission with monumental dignity. He instituted disciplined community kitchens feeding hundreds of thousands daily without discrimination of caste, creed, or tribe. His extensive travels throughout Assam and the Northeast ignited deep cultural ties and peace missions, establishing educational centers and medical dispensaries that continue to uplift remote communities in Kokrajhar and beyond.",
    teachings: [
      "Unbroken Seva (Selfless service as the highest form of prayer)",
      "Disciplined Community Harmony across all linguistic backgrounds",
      "Establishment of sustainable rural schools and vocational hubs",
      "Sanctity and purity in the preparation and distribution of Prasadam"
    ]
  },
  {
    id: "acharyadev",
    name: "Revered Acharyadev",
    title: "Present Spiritual Guide & Global Peace Patron",
    period: "Contemporary",
    image: "/src/assets/images/sree_sree_acharya.webp",
    keyContribution: "Fosters interfaith dialogue, eco-restoration, international youth peace conclaves, and digital dissemination of Thakur's ideology.",
    quote: "Hold on to the living Ideal, love every life, and make your surroundings blossom.",
    detailedBio: "Under the benign guidance of Revered Acharyadev, the Satsang ethos expands globally as an all-encompassing family of humanity. His special blessings and benevolent patronage to the Dotma, Kokrajhar Maha Mahotsav 2026 bring together delegates from every district of Assam, Northeast India, West Bengal, and nationwide spiritual seekers.",
    teachings: [
      "Active communal harmony and brotherhood across the Bodoland region",
      "Global digital outreach of Thakur's divine literature and epistles",
      "Tree plantation drives and eco-friendly zero-waste spiritual gatherings",
      "Nurturing families through mutual reverence, moral parenthood, and love"
    ]
  }
];

export const BIRTH_ANNIVERSARY_INFO = {
  edition: "138th Sacred Advent Commemoration",
  dates: "Sacred Observance · December 20, 2026",
  theme: "Light of Compassion, Universal Kinship, and Living Righteousness",
  highlights: [
    {
      title: "Usha Kirtan & Dawn Concord",
      time: "04:30 AM – 06:00 AM",
      desc: "Sacred dawn chorus winding through West Dangarkuthi and Dotma with traditional Mridanga, Taal, Khol, and conch shells."
    },
    {
      title: "Maha Anandabazar Annadan",
      time: "11:30 AM – 04:30 PM",
      desc: "Sacred satvik mass feast prepared with reverent hygiene serving over 80,000 pilgrims on clean sal leaves in continuous disciplined rows."
    },
    {
      title: "Matri Sammelan (Women's Conclave)",
      time: "02:00 PM – 04:30 PM",
      desc: "A dedicated gathering honoring Sree Sree Boroma, ideal motherhood, health, ethical education, and family harmony."
    },
    {
      title: "Grand Cultural Concourse",
      time: "06:30 PM – 09:30 PM",
      desc: "Symbiotic confluence of Bodo traditional Bagurumba, Assamese Borgeet, Sattriya Nritya, and devotional hymns."
    }
  ],
  significanceText: "The sacred commemoration at West Dangarkuthi, Dotma symbolizes spiritual renewal, communal harmony, and selfless collective action. Devotees reaffirm their dedication to Yajan, Jaajan, and Ishtabhrity, experiencing the transformative power of divine love."
};

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: "c1",
    name: "Sjt. Biseswar Ramchiary",
    role: "Chief Patron & Community Elder",
    category: "Patron",
    location: "Kokrajhar, Assam",
    phone: "+91 94350 11223"
  },
  {
    id: "c2",
    name: "Dr. Hitesh Chandra Roy",
    role: "President, Central Reception Committee",
    category: "Executive",
    location: "Dotma, Kokrajhar",
    phone: "+91 94350 44556"
  },
  {
    id: "c3",
    name: "Sjt. Manoj Kumar Das",
    role: "Working President",
    category: "Executive",
    location: "Bongaigaon / Dotma",
    phone: "+91 94351 77889"
  },
  {
    id: "c4",
    name: "Sjt. Pranab Jyoti Sarkar",
    role: "General Secretary",
    category: "Secretariat",
    location: "Dotma, Kokrajhar",
    phone: "+91 94350 99001"
  },
  {
    id: "c5",
    name: "Sjt. Dwijen Barman",
    role: "Chief Finance Secretary & Treasurer",
    category: "Finance",
    location: "Fakiragram, Kokrajhar",
    phone: "+91 94352 33445"
  },
  {
    id: "c6",
    name: "Smt. Anamika Basumatary",
    role: "Joint Secretary (Matri Seva & Reception)",
    category: "Secretariat",
    location: "Dotma, Kokrajhar",
    phone: "+91 94353 55667"
  },
  {
    id: "c7",
    name: "Sjt. Niren Boro",
    role: "Secretary, Cultural & Stage Affairs",
    category: "Cultural",
    location: "Kokrajhar Town",
    phone: "+91 94354 77880"
  },
  {
    id: "c8",
    name: "Sjt. Tapas K. Bhattacharya",
    role: "Convenor, Maha Annadan & Kitchen Logistics",
    category: "Executive",
    location: "Dhubri / Dotma",
    phone: "+91 94355 99112"
  }
];

export const ORGANISING_TEAMS: OrganisingTeam[] = [
  {
    id: "team-reception",
    name: "Reception & Atithi Seva Cell",
    lead: "Sjt. Rupen Narzary & Smt. Minati Roy",
    volunteersCount: 140,
    responsibilities: [
      "Warm reception at Fakiragram & Kokrajhar railway stations and Rupsi airport",
      "Registration badge distribution and guidance for outstation delegations",
      "Information counters with multilingual staff (Bodo, Assamese, Bengali, Hindi, English)"
    ],
    contactPerson: "Sjt. Rupen Narzary",
    contactNumber: "+91 98540 12345"
  },
  {
    id: "team-annadan",
    name: "Maha Annadan & Kitchen Logistics Wing",
    lead: "Sjt. Tapas K. Bhattacharya & Team",
    volunteersCount: 380,
    responsibilities: [
      "Preparation of pure satvik meals for 80,000+ attendees daily",
      "Maintenance of sacred hygiene, firewood and clean steam cauldrons",
      "Eco-friendly zero-plastic leaf plate distribution and water stations"
    ],
    contactPerson: "Sjt. Tapas Bhattacharya",
    contactNumber: "+91 94355 99112"
  },
  {
    id: "team-security",
    name: "Volunteer Shanti Sena & Traffic Control",
    lead: "Sjt. Hemanta Kumar Brahma",
    volunteersCount: 260,
    responsibilities: [
      "Pandal crowd order, entry/exit management, and queue guidance",
      "Vehicle parking coordination at West Dangarkuthi designated zones",
      "Liaison with local police administration and emergency corridors"
    ],
    contactPerson: "Sjt. H. K. Brahma",
    contactNumber: "+91 97060 45678"
  },
  {
    id: "team-medical",
    name: "Arogya Medical Camp & Emergency First Aid",
    lead: "Dr. N. C. Roy, MBBS, MS",
    volunteersCount: 45,
    responsibilities: [
      "24/7 on-site primary clinic with doctors, nurses, and paramedical staff",
      "Dedicated emergency ambulance bay connected to Kokrajhar Civil Hospital",
      "Free essential medicines, hydration points, and geriatric care"
    ],
    contactPerson: "Dr. N. C. Roy",
    contactNumber: "+91 94350 88221"
  },
  {
    id: "team-accommodation",
    name: "Accommodation & Pilgrim Niwas Board",
    lead: "Sjt. Sanjib Debnath",
    volunteersCount: 85,
    responsibilities: [
      "Room allocation at Yatri Niwas, partner guest houses, and community halls",
      "Bedding, blankets, pure drinking water, and clean restroom management",
      "Daily luggage cloakroom and lost-and-found desk"
    ],
    contactPerson: "Sjt. Sanjib Debnath",
    contactNumber: "+91 94352 66778"
  },
  {
    id: "team-media",
    name: "Media, Stage & High-Definition Broadcast",
    lead: "Sjt. Gautam Swargiary",
    volunteersCount: 35,
    responsibilities: [
      "Ultra-clear live streaming across YouTube and social media channels",
      "State-of-the-art acoustic sound engineering for devotional discourses",
      "Press media releases, daily newsletter bulletins, and photography archive"
    ],
    contactPerson: "Sjt. Gautam Swargiary",
    contactNumber: "+91 98640 77112"
  }
];

export const EVENT_SCHEDULE: EventScheduleItem[] = [
  {
    id: "ev-1",
    day: 1,
    date: "Saturday, Dec 19, 2026",
    time: "06:00 AM – 08:30 AM",
    title: "Adhivas & Mangal Shobhayatra",
    category: "Ritual",
    venue: "West Dangarkuthi Entry Arch to Central Grounds",
    description: "Grand ceremonial procession carrying sacred symbols, accompanied by traditional khol, cymbals, conch blowing, and youth scout band.",
    speakers: ["Central Committee Elders", "Visiting Acharya Pratinidhis"]
  },
  {
    id: "ev-2",
    day: 1,
    date: "Saturday, Dec 19, 2026",
    time: "10:30 AM – 01:00 PM",
    title: "Reception & Swastyayani Inaugural Assembly",
    category: "Satsang",
    venue: "Main Priti Pandal, West Dangarkuthi",
    description: "Welcome address to visiting delegates from Assam, Bengal, and across India, chanting of divine epistles, and exposition of Priti-Lagnik.",
    speakers: ["Dr. Hitesh Chandra Roy", "Distinguished Guests from BTR Administration"]
  },
  {
    id: "ev-3",
    day: 1,
    date: "Saturday, Dec 19, 2026",
    time: "06:00 PM – 09:30 PM",
    title: "Devotional Sangeet Sandhya (Borgeet, Kirtan & Bhajans)",
    category: "Cultural",
    venue: "Cultural Stage",
    description: "Soul-stirring classical raga-based kirtans, borgeet, and devotional compositions dedicated to Sree Sree Thakur.",
    speakers: ["Renowned Devotional Vocalists of Assam & Bengal"]
  },
  {
    id: "ev-4",
    day: 2,
    date: "Sunday, Dec 20, 2026",
    time: "04:30 AM – 06:00 AM",
    title: "Sacred Advent Usha Kirtan & Dawn Concord",
    category: "Ritual",
    venue: "West Dangarkuthi Township & Campus",
    description: "Centenary dawn prayer invoking universal peace, righteous living, and auspiciousness for all living beings.",
    speakers: ["Satsang Kirtan Mandali"]
  },
  {
    id: "ev-5",
    day: 2,
    date: "Sunday, Dec 20, 2026",
    time: "08:00 AM – 11:00 AM",
    title: "Grand Janmotsav Assembly & Philosophical Symposium",
    category: "Symposium",
    venue: "Central Priti Pavilion",
    description: "High-level discourse on Sree Sree Thakur's blueprint for universal coexistence, scientific spirituality, and human character building.",
    speakers: ["Eminent Academicians", "Socio-Spiritual Leaders"]
  },
  {
    id: "ev-6",
    day: 2,
    date: "Sunday, Dec 20, 2026",
    time: "11:30 AM – 04:30 PM",
    title: "Maha Anandabazar: All-Community Satvik Prasad Seva",
    category: "Seva",
    venue: "Anandabazar Pandal Complex",
    description: "Unbroken mass feeding serving over 80,000 pilgrims sitting in harmonious discipline, receiving warm khichuri, labra, and payasam.",
    speakers: []
  },
  {
    id: "ev-7",
    day: 2,
    date: "Sunday, Dec 20, 2026",
    time: "02:00 PM – 04:30 PM",
    title: "Matri Sammelan & Women's Conclave",
    category: "Symposium",
    venue: "Priti Auditorium",
    description: "Tribute to Jagat Janani Sree Sree Boroma, discussing motherhood, child upbringing, health, and moral family harmony.",
    speakers: ["Distinguished Women Social Workers & Educators"]
  },
  {
    id: "ev-8",
    day: 2,
    date: "Sunday, Dec 20, 2026",
    time: "06:30 PM – 10:00 PM",
    title: "Grand Cultural Concourse & Folk Drama",
    category: "Cultural",
    venue: "Central Grounds Stage",
    description: "Magnificent confluence of Bodo Bagurumba, Assamese Sattriya Nritya, and the sacred drama 'The Advent of Compassion'.",
    speakers: ["Dotma & Kokrajhar Cultural Guild"]
  },
  {
    id: "ev-9",
    day: 3,
    date: "Monday, Dec 21, 2026",
    time: "08:30 AM – 12:30 PM",
    title: "All-Northeast Yuva Sammelan (Youth Conclave)",
    category: "Symposium",
    venue: "Central Mandap",
    description: "Empowering youth in ethics, service, community leadership, de-addiction, and existential vitality.",
    speakers: ["Youth Mentors & Motivational Speakers"]
  },
  {
    id: "ev-10",
    day: 3,
    date: "Monday, Dec 21, 2026",
    time: "02:00 PM – 05:00 PM",
    title: "Valedictory Peace Assembly & Akhanda Kirtan",
    category: "Ritual",
    venue: "Main Sanctum",
    description: "Concluding universal prayer, volunteer felicitation, and distribution of commemorative prasadam.",
    speakers: ["Central Committee Leadership"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
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

export const DEFAULT_EVENT_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Priti-Lagnik 2026 Official Programme Guide",
    category: "Schedule" as const,
    fileType: "pdf" as const,
    fileName: "PritiLagnik_2026_Schedule.pdf",
    fileSize: "2.4 MB",
    uploadedAt: "2026-10-25"
  },
  {
    id: "doc-2",
    title: "Delegate Arrival, Accommodation & Parking Advisory",
    category: "Guidelines" as const,
    fileType: "pdf" as const,
    fileName: "Travel_and_Parking_Advisory_Dotma.pdf",
    fileSize: "1.8 MB",
    uploadedAt: "2026-10-26"
  },
  {
    id: "doc-3",
    title: "Volunteer Seva Manual & Emergency Contacts",
    category: "Guidelines" as const,
    fileType: "docx" as const,
    fileName: "Volunteer_Seva_Manual_2026.docx",
    fileSize: "950 KB",
    uploadedAt: "2026-10-27"
  }
];

export const ACCOMMODATIONS: AccommodationOption[] = [
  {
    id: "acc-1",
    name: "Dotma Central Yatri Ashram Niwas",
    type: "Ashram Niwas",
    distance: "On-site (0.1 km from Mandap)",
    location: "Mahotsav Grounds, Dotma",
    capacity: "2,500 Pilgrims",
    tariff: "Complimentary / Voluntary Donation",
    amenities: ["Clean Foam Mattresses & Blankets", "Pure Filtered Drinking Water", "Hot Water for Elders", "Separate Wings for Families & Women", "Satvik Langar Access"],
    contactName: "Sjt. Sanjib Debnath (Niwas In-charge)",
    phone: "+91 94352 66778",
    whatsapp: "+919435266778",
    bookingStatus: "Available"
  },
  {
    id: "acc-2",
    name: "Bodoland Territorial Guest House & Circuit Annexe",
    type: "Guest House",
    distance: "1.2 km from Venue",
    location: "Dotma Town Center",
    capacity: "45 AC & Non-AC Rooms",
    tariff: "₹ 800 – ₹ 1,500 / night",
    amenities: ["Attached Bathrooms", "Free Wi-Fi", "Dedicated Mahotsav Shuttle", "24/7 Power Backup", "Secure Parking"],
    contactName: "Sjt. Babul Basumatary",
    phone: "+91 98540 88990",
    whatsapp: "+919854088990",
    bookingStatus: "Filling Fast"
  },
  {
    id: "acc-3",
    name: "Hotel Gaurang Kokrajhar",
    type: "Hotel",
    distance: "16 km (20 min by Festival Shuttle)",
    location: "J.D. Road, Kokrajhar Town",
    capacity: "60 Deluxe Rooms & Suites",
    tariff: "₹ 1,800 – ₹ 3,200 / night",
    amenities: ["Central Air Conditioning", "Elevator", "Pure Veg Restaurant on site", "Express Laundry", "Room Service"],
    contactName: "Front Desk Manager",
    phone: "+91 3661 270450",
    whatsapp: "+919435123980",
    bookingStatus: "Available"
  },
  {
    id: "acc-4",
    name: "Bodoland Residency & Conference Lodge",
    type: "Hotel",
    distance: "17 km from Venue",
    location: "Near Railway Station, Kokrajhar",
    capacity: "40 Executive Rooms",
    tariff: "₹ 1,400 – ₹ 2,600 / night",
    amenities: ["Pick-up from Kokrajhar Station", "Wi-Fi", "Generator Backup", "Card / UPI Payment", "Travel Desk"],
    contactName: "Sjt. K. Brahma",
    phone: "+91 97061 33221",
    whatsapp: "+919706133221",
    bookingStatus: "Available"
  },
  {
    id: "acc-5",
    name: "Eco-Friendly Pilgrim Tent City (Yatri Camp)",
    type: "Tent Village",
    distance: "0.3 km from Main Pandal",
    location: "Dotma Higher Secondary Green Campus",
    capacity: "4,000 Volunteers & Youth Delegates",
    tariff: "Free for Registered Delegations",
    amenities: ["Waterproof Heavy Canvas Tents", "Individual Cots & Linens", "Solar Street Lights", "Eco-friendly Washrooms", "Luggage Storage Locker"],
    contactName: "Sjt. R. K. Singha",
    phone: "+91 94355 44332",
    whatsapp: "+919435544332",
    bookingStatus: "Available"
  }
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

export const TRUSTED_ORGANIZATIONS = [
  {
    name: "Satsang Central Mission, Deoghar",
    role: "Spiritual Guidance & Parent Philanthropic Body",
    established: "1946"
  },
  {
    name: "Bodoland Cultural & Seva Council",
    role: "Regional Coordination & Heritage Integration",
    established: "2003"
  },
  {
    name: "Assam Pradesh Satsang Sammelan",
    role: "State-wide Devotee Delegation Network",
    established: "1968"
  },
  {
    name: "Arogya Bharat Free Medical Mission",
    role: "Mobile Health Camps & Emergency Response",
    established: "2012"
  },
  {
    name: "Green Assam Youth Ecological Foundation",
    role: "Zero-Plastic & Eco-Friendly Grounds Partner",
    established: "2018"
  }
];
