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
    "id": "cm-1",
    "name": "Sjt. Hagrama Mohilary",
    "role": "Patron",
    "category": "Main Committee",
    "location": "Hon'ble CEM, BTC"
  },
  {
    "id": "cm-2",
    "name": "Sjt. Pramod Boro",
    "role": "Patron",
    "category": "Main Committee",
    "location": "Hon'ble MP, Rajya Sabha"
  },
  {
    "id": "cm-3",
    "name": "Sjt. Prakash Basumatary",
    "role": "President",
    "category": "Main Committee",
    "location": "EM, BTC",
    "phone": "8135825909"
  },
  {
    "id": "cm-4",
    "name": "Dr. Hemendra Nath Brahma",
    "role": "Working President",
    "category": "Main Committee",
    "location": "Ex MLA"
  },
  {
    "id": "cm-5",
    "name": "Shri Nitya Ranjan Brahma (S.P.R.)",
    "role": "Working President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-6",
    "name": "Shri Dharmeswar Roy (S.P.R.)",
    "role": "Working President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-7",
    "name": "Shri Raghunath Boro (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-8",
    "name": "Shri Nalendra Nath Narzary (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-9",
    "name": "Shri Subrata Hore (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-10",
    "name": "Shri Nimesh Chandra Baruah (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-11",
    "name": "Shri Munindra Roy (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-12",
    "name": "Shri Bhim Bahadur Gurung (S.P.R.)",
    "role": "Vice President",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-13",
    "name": "Shri Bakul Chandra Brahma",
    "role": "General Secretary",
    "category": "Main Committee",
    "location": "Chairman, Dotma Town Committee",
    "phone": "9435027290"
  },
  {
    "id": "cm-14",
    "name": "Shri Sibendra Brahma",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": "Erakdaw"
  },
  {
    "id": "cm-15",
    "name": "Shri Bibek Ananda Dey",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-16",
    "name": "Shri Kumud Chandra Brahma",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-17",
    "name": "Shri Bibeka Roy",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-18",
    "name": "Shri Sudem Chandra Brahma",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-19",
    "name": "Shri Samar Ray",
    "role": "Joint Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-20",
    "name": "Shri Gautam Basumatary",
    "role": "Secretary",
    "category": "Main Committee",
    "location": "JK"
  },
  {
    "id": "cm-21",
    "name": "Shri Jogeswar Das",
    "role": "Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-22",
    "name": "Shri Sharanidindu Brahma",
    "role": "Secretary",
    "category": "Main Committee",
    "location": "Bidung"
  },
  {
    "id": "cm-23",
    "name": "Shri Dimbeswar Upadhyay",
    "role": "Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-24",
    "name": "Shri Dipayan Narzary",
    "role": "Secretary",
    "category": "Main Committee",
    "location": "Nuthai, JK"
  },
  {
    "id": "cm-25",
    "name": "Shri Ramath Kumar Narzary",
    "role": "Cashier",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-26",
    "name": "Shri Rajkumar Roy",
    "role": "Asst. Cashier",
    "category": "Main Committee",
    "location": "JK"
  },
  {
    "id": "cm-27",
    "name": "Shri Jwngsar Narzary",
    "role": "Asst. Cashier",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-28",
    "name": "Shri Pradip Saha",
    "role": "Asst. Cashier",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-29",
    "name": "Dr. Surath Narzary (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-30",
    "name": "Shri Nagendra Brahma (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-31",
    "name": "Shri Gaur Kishore Dey Joardar (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-32",
    "name": "Shri Prashanta Kumar Saha Roy (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-33",
    "name": "Shri Abani Kumar Brahma (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-34",
    "name": "Shri Manaranjan Roy (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-35",
    "name": "Shri Rampal Singh (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-36",
    "name": "Shri Rajendra Nath Narzary (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-37",
    "name": "Shri Indra Mahan Basumatary (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-38",
    "name": "Shri Abani Kumar Brahma (S.P.R.)",
    "role": "Adviser to Main Committee",
    "category": "Main Committee",
    "location": "Listed twice in source"
  },
  {
    "id": "cm-39",
    "name": "Shri Gautam Dey Joardar",
    "role": "Adviser to Sub-Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-40",
    "name": "Shri Pritisundar Chakrabarty",
    "role": "Adviser to Sub-Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-41",
    "name": "Dr. Sudev Chandra Basumatary",
    "role": "Adviser to Sub-Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-42",
    "name": "Shri Sushanta Narzary",
    "role": "Adviser to Sub-Committee",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-43",
    "name": "Rhibhu Brahma",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-44",
    "name": "Satyananda Brahma",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-45",
    "name": "Suraj Saha",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-46",
    "name": "Sotta Sundar Roy",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-47",
    "name": "Raj Thapa",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-48",
    "name": "Shri Sambit Basumatary",
    "role": "Office Secretary",
    "category": "Main Committee",
    "location": ""
  },
  {
    "id": "cm-49",
    "name": "Dr. Sushanta Narzary (SPR)",
    "role": "Chairman",
    "category": "Finance Sub-Committee",
    "location": "Kokrajhar",
    "phone": "9954276091"
  },
  {
    "id": "cm-50",
    "name": "Nathuram Islary (SPR)",
    "role": "Vice Chairman",
    "category": "Finance Sub-Committee",
    "location": "Gossaigaon",
    "phone": "7002201331"
  },
  {
    "id": "cm-51",
    "name": "Dhritabrata Narzary (SPR)",
    "role": "Vice Chairman",
    "category": "Finance Sub-Committee",
    "location": ""
  },
  {
    "id": "cm-52",
    "name": "Jama Daimary",
    "role": "Convenor",
    "category": "Finance Sub-Committee",
    "location": "Amlaiguri",
    "phone": "9859985739"
  },
  {
    "id": "cm-53",
    "name": "Birkhang Boro",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Intibil"
  },
  {
    "id": "cm-54",
    "name": "Jwngsar Narzary",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Kokrajhar",
    "phone": "7002131960"
  },
  {
    "id": "cm-55",
    "name": "Nandalal Gurung",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Saralpara",
    "phone": "7896660774"
  },
  {
    "id": "cm-56",
    "name": "Bimal Boro",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Kachugaon",
    "phone": "9435127054"
  },
  {
    "id": "cm-57",
    "name": "Chakramani Basumatary",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Kokrajhar",
    "phone": "9678778311"
  },
  {
    "id": "cm-58",
    "name": "Ansuman Islary",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Gossaigaon",
    "phone": "7002622584"
  },
  {
    "id": "cm-59",
    "name": "Jogeswar Das",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Kokrajhar",
    "phone": "8638004677"
  },
  {
    "id": "cm-60",
    "name": "Subal Narzary",
    "role": "Joint Convenor",
    "category": "Finance Sub-Committee",
    "location": "Gossaigaon",
    "phone": "9957804486"
  },
  {
    "id": "cm-61",
    "name": "Ramat Narzary",
    "role": "Treasurer",
    "category": "Finance Sub-Committee",
    "location": "Intibil",
    "phone": "8135810244"
  },
  {
    "id": "cm-62",
    "name": "Pradip Saha",
    "role": "Asstt. Treasurer",
    "category": "Finance Sub-Committee",
    "location": "Dotma",
    "phone": "6000311713"
  },
  {
    "id": "cm-63",
    "name": "Shri Chandan Majumdar (SPR)",
    "role": "Chairman",
    "category": "Bhandara Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-64",
    "name": "Shri Manik Roy",
    "role": "Vice Chairman",
    "category": "Bhandara Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-65",
    "name": "Shri Pabitra Upadhyay",
    "role": "Vice Chairman",
    "category": "Bhandara Sub-Committee",
    "location": "Patagaon"
  },
  {
    "id": "cm-66",
    "name": "Shri Shana Gopal Saha",
    "role": "Convenor",
    "category": "Bhandara Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-67",
    "name": "Shri Samarendra Sarkar",
    "role": "Joint Convenor",
    "category": "Bhandara Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-68",
    "name": "Shri Ranjay Mushahary",
    "role": "Joint Convenor",
    "category": "Bhandara Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-69",
    "name": "Sudem Narzary",
    "role": "Responsible Person (Amlaiguri Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Amlaiguri Satsang Vihar",
    "phone": "6000849767"
  },
  {
    "id": "cm-70",
    "name": "Samar Roy",
    "role": "Responsible Person (Gossaigaon Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Gossaigaon Satsang Vihar",
    "phone": "9365900719"
  },
  {
    "id": "cm-71",
    "name": "Drithi Ranjan Roy",
    "role": "Responsible Person (Srinagar Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Srinagar Satsang Vihar",
    "phone": "7002581523"
  },
  {
    "id": "cm-72",
    "name": "Biraj Ghosh",
    "role": "Responsible Person (Srirampur Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Srirampur Satsang Kendra",
    "phone": "8638182723"
  },
  {
    "id": "cm-73",
    "name": "Bidhyasagar Basumatary",
    "role": "Responsible Person (Saraibil Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Saraibil Satsang Vihar",
    "phone": "8135872642"
  },
  {
    "id": "cm-74",
    "name": "Miniswrang Mushahary",
    "role": "Responsible Person (Anchalik Satsang Vihar, Thuribari)",
    "category": "Information and Communication Sub-Committee",
    "location": "Anchalik Satsang Vihar, Thuribari",
    "phone": "8135097485"
  },
  {
    "id": "cm-75",
    "name": "Sudem Brahma",
    "role": "Responsible Person (Dotma Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Dotma Satsang Kendra",
    "phone": "9957090439"
  },
  {
    "id": "cm-76",
    "name": "Jogeswar Das",
    "role": "Responsible Person (Kokrajhar Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Kokrajhar Satsang Vihar",
    "phone": "8638004677"
  },
  {
    "id": "cm-77",
    "name": "Jitendra Nath Medhi",
    "role": "Responsible Person (Putkibari Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Putkibari Satsang Kendra",
    "phone": "6901914127"
  },
  {
    "id": "cm-78",
    "name": "Sanswrang Basumatary",
    "role": "Responsible Person (Kachugaon Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Kachugaon Satsang Kendra",
    "phone": "8135076204"
  },
  {
    "id": "cm-79",
    "name": "Tapan Paul",
    "role": "Responsible Person (Tipkai Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Tipkai Satsang Kendra",
    "phone": "9613570594"
  },
  {
    "id": "cm-80",
    "name": "Bablu Saw",
    "role": "Responsible Person (Damrapara Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Damrapara Satsang Kendra",
    "phone": "9707373511"
  },
  {
    "id": "cm-81",
    "name": "Ajit Kr. Barman",
    "role": "Responsible Person (Gokulkhata Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Gokulkhata Satsang Kendra",
    "phone": "9101852712"
  },
  {
    "id": "cm-82",
    "name": "Nathuram Islary",
    "role": "Responsible Person (Bhadugiri Satsang Center)",
    "category": "Information and Communication Sub-Committee",
    "location": "Bhadugiri Satsang Center",
    "phone": "7002201331"
  },
  {
    "id": "cm-83",
    "name": "Nripendra Narzary",
    "role": "Responsible Person (Thandabajar Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Thandabajar Satsang Kendra",
    "phone": "8134856094"
  },
  {
    "id": "cm-84",
    "name": "Shilpi Ghosh",
    "role": "Responsible Person (Bhowraguri Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Bhowraguri Satsang Kendra",
    "phone": "7896869806"
  },
  {
    "id": "cm-85",
    "name": "Jagadish Rai Singha",
    "role": "Responsible Person (Chithila Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Chithila Satsang Kendra",
    "phone": "8136022811"
  },
  {
    "id": "cm-86",
    "name": "Gautam Debnath",
    "role": "Responsible Person (Shakti Ashram Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Shakti Ashram Satsang Kendra",
    "phone": "6001871127"
  },
  {
    "id": "cm-87",
    "name": "Udit Ch. Deka",
    "role": "Responsible Person (Fakiragram Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Fakiragram Satsang Kendra",
    "phone": "9957983203"
  },
  {
    "id": "cm-88",
    "name": "Sudharshan Rout",
    "role": "Responsible Person (Serfanguri Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Serfanguri Satsang Vihar",
    "phone": "9954141925"
  },
  {
    "id": "cm-89",
    "name": "Sriraj Gurung",
    "role": "Responsible Person (Saralpara Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Saralpara Satsang Kendra",
    "phone": "8133854154"
  },
  {
    "id": "cm-90",
    "name": "Nirmalya Barua",
    "role": "Responsible Person (Salakati Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Salakati Satsang Kendra",
    "phone": "8638285427"
  },
  {
    "id": "cm-91",
    "name": "Bibeka Roy",
    "role": "Responsible Person (Intibil Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Intibil Satsang Kendra",
    "phone": "9954574809"
  },
  {
    "id": "cm-92",
    "name": "Saneswar Brahma",
    "role": "Responsible Person (Patgaon Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Patgaon Satsang Kendra",
    "phone": "9954986590"
  },
  {
    "id": "cm-93",
    "name": "Alokesh Barman",
    "role": "Responsible Person (Joraigaon Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Joraigaon Satsang Kendra",
    "phone": "8471945252"
  },
  {
    "id": "cm-94",
    "name": "Ashok Basumatary",
    "role": "Responsible Person (Haltugaon Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Haltugaon Satsang Kendra",
    "phone": "9435512186"
  },
  {
    "id": "cm-95",
    "name": "Jiban Basumatary",
    "role": "Responsible Person (Magurmari Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Magurmari Satsang Kendra",
    "phone": "6002824027"
  },
  {
    "id": "cm-96",
    "name": "Parag Ranjan Roy Sarkar",
    "role": "Responsible Person (Hatidhura Satsang Vihar)",
    "category": "Information and Communication Sub-Committee",
    "location": "Hatidhura Satsang Vihar",
    "phone": "8812872980"
  },
  {
    "id": "cm-97",
    "name": "Biju Sarkar",
    "role": "Responsible Person (Kortimari Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Kortimari Satsang Kendra",
    "phone": "9957896634"
  },
  {
    "id": "cm-98",
    "name": "Shibaram Brahma",
    "role": "Responsible Person (Malalaguri Satsang Kendra)",
    "category": "Information and Communication Sub-Committee",
    "location": "Malalaguri Satsang Kendra",
    "phone": "8753987939"
  },
  {
    "id": "cm-99",
    "name": "Shri Sanjay Kr. Brahma (JK)",
    "role": "Chairman",
    "category": "Publicity Sub-Committee",
    "location": "Futkibari"
  },
  {
    "id": "cm-100",
    "name": "Dipayan Narzary (JK)",
    "role": "Vice Chairman",
    "category": "Publicity Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-101",
    "name": "Shri Sanjay Basumatary",
    "role": "Convenor",
    "category": "Publicity Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-102",
    "name": "Bablu Shaw",
    "role": "Joint Convenor",
    "category": "Publicity Sub-Committee",
    "location": "Damrapara"
  },
  {
    "id": "cm-103",
    "name": "Rajkumar Roy (JK)",
    "role": "Chairman",
    "category": "Local Sub-Committee",
    "location": "Dotma",
    "phone": "7896401821"
  },
  {
    "id": "cm-104",
    "name": "Jiban Basumatary",
    "role": "Vice Chairman",
    "category": "Local Sub-Committee",
    "location": "Dotma",
    "phone": "9365323928"
  },
  {
    "id": "cm-105",
    "name": "Erakdaw Brahma",
    "role": "Chief Convenor",
    "category": "Local Sub-Committee",
    "location": "Thuribari",
    "phone": "9101175816"
  },
  {
    "id": "cm-106",
    "name": "Bidung Brahma",
    "role": "Convenor",
    "category": "Local Sub-Committee",
    "location": "Dotma",
    "phone": "7002275624"
  },
  {
    "id": "cm-107",
    "name": "Alongbar Brahma",
    "role": "Convenor",
    "category": "Local Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-108",
    "name": "Deboraj Brahma",
    "role": "Convenor",
    "category": "Local Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-109",
    "name": "Ranendra Narzary",
    "role": "Convenor",
    "category": "Local Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-110",
    "name": "Smt. Saroti Daimary",
    "role": "Chairperson",
    "category": "Matri Shakti Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-111",
    "name": "Mrs. Jakhina Narzary",
    "role": "Vice Chair",
    "category": "Matri Shakti Sub-Committee",
    "location": "Saraibil"
  },
  {
    "id": "cm-112",
    "name": "Smt. Maya Thapa",
    "role": "Convenor",
    "category": "Matri Shakti Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-113",
    "name": "Smt. Anamika Hore",
    "role": "Joint Convenor",
    "category": "Matri Shakti Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-114",
    "name": "Smt. Haripriya Narzary",
    "role": "Joint Convenor",
    "category": "Matri Shakti Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-115",
    "name": "Dr. Nawadeep Basumatary",
    "role": "Chairman",
    "category": "Medical Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-116",
    "name": "Dr. Swarnadip mandal",
    "role": "Vice Chairman",
    "category": "Medical Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-117",
    "name": "Shri Bhaskar Brahma",
    "role": "Convenor",
    "category": "Medical Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-118",
    "name": "Shri Alok Ghosh",
    "role": "Joint Convenor",
    "category": "Medical Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-119",
    "name": "Dr. Jipen Narzary",
    "role": "Joint Convenor",
    "category": "Medical Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-120",
    "name": "Shri Vinod Yadav",
    "role": "Chairman",
    "category": "Transportation, Parking and Traffic Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-121",
    "name": "Shri Ranen Basumatary",
    "role": "Vice Chairman",
    "category": "Transportation, Parking and Traffic Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-122",
    "name": "Alongbar Brahma",
    "role": "Convenor",
    "category": "Transportation, Parking and Traffic Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-123",
    "name": "Bablu Shaw",
    "role": "Joint Convenor",
    "category": "Transportation, Parking and Traffic Sub-Committee",
    "location": "Damrapara"
  },
  {
    "id": "cm-124",
    "name": "Surjya Kanta Daimary",
    "role": "Joint Convenor",
    "category": "Transportation, Parking and Traffic Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-125",
    "name": "Shri Bigrai Brahma",
    "role": "Chairman",
    "category": "Cultural Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-126",
    "name": "Shri Debaraj Brahma",
    "role": "Vice Chairman",
    "category": "Cultural Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-127",
    "name": "Smt. Chikiri Mahilary",
    "role": "Vice Chairman",
    "category": "Cultural Sub-Committee",
    "location": "Serfanguri"
  },
  {
    "id": "cm-128",
    "name": "Shri Chakradhar Narzary",
    "role": "Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-129",
    "name": "Sameswar Mohilary",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-130",
    "name": "Narayan Saha",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-131",
    "name": "Sukriti Sutradhar",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-132",
    "name": "Aniruddha Basumatary",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Ghoskata"
  },
  {
    "id": "cm-133",
    "name": "Biplab Bhattacharjee",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-134",
    "name": "Bhudev Basumatary",
    "role": "Joint Convenor",
    "category": "Cultural Sub-Committee",
    "location": "Patgaon"
  },
  {
    "id": "cm-135",
    "name": "Jeevan Kr. Brahma",
    "role": "Chairman",
    "category": "Refreshment Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-136",
    "name": "Bijay Basumatary",
    "role": "Vice Chairman",
    "category": "Refreshment Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-137",
    "name": "Haribhushan Mushahary",
    "role": "Convenor",
    "category": "Refreshment Sub-Committee",
    "location": ""
  },
  {
    "id": "cm-138",
    "name": "Ratanlal Thapa",
    "role": "Joint Convenor",
    "category": "Refreshment Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-139",
    "name": "Bikash Ray",
    "role": "Joint Convenor",
    "category": "Refreshment Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-140",
    "name": "Shri Dhritabrata Narzary (SPR)",
    "role": "Chairman",
    "category": "DP Works Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-141",
    "name": "Shri Ashish Kr. Roy",
    "role": "Vice Chairman",
    "category": "DP Works Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-142",
    "name": "Jiten Talukdar",
    "role": "Convenor",
    "category": "DP Works Sub-Committee",
    "location": "Chithila"
  },
  {
    "id": "cm-143",
    "name": "Raju Borgoyary",
    "role": "Joint Convenor",
    "category": "DP Works Sub-Committee",
    "location": "Saraibil"
  },
  {
    "id": "cm-144",
    "name": "Badhuram Mushahary",
    "role": "Joint Convenor",
    "category": "DP Works Sub-Committee",
    "location": "Kachugaon"
  },
  {
    "id": "cm-145",
    "name": "Sanjit Saha",
    "role": "Chairman",
    "category": "Market Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-146",
    "name": "Gautam Saha",
    "role": "Vice Chairman",
    "category": "Market Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-147",
    "name": "Jaleswar Mushahary",
    "role": "Vice Chairman",
    "category": "Market Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-148",
    "name": "Naresh Sarkar",
    "role": "Convenor",
    "category": "Market Sub-Committee",
    "location": "Intibil"
  },
  {
    "id": "cm-149",
    "name": "Mukundo Basumatary",
    "role": "Joint Convenor",
    "category": "Market Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-150",
    "name": "Arup Kanti Dutta",
    "role": "Chairman",
    "category": "Water Supply Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-151",
    "name": "Shiba Nanda Mushahary",
    "role": "Vice-Chairman",
    "category": "Water Supply Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-152",
    "name": "Ashen Brahma",
    "role": "Convenor",
    "category": "Water Supply Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-153",
    "name": "Aditya Narzary",
    "role": "Joint Convenor",
    "category": "Water Supply Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-154",
    "name": "Pradip Shil",
    "role": "Chairman",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-155",
    "name": "Atul Kundu",
    "role": "Vice Chairman",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Bhaoraguri"
  },
  {
    "id": "cm-156",
    "name": "Gaurab Bagsi",
    "role": "Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-157",
    "name": "Bijay Rakit",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Bhaoraguri"
  },
  {
    "id": "cm-158",
    "name": "Indra Mahilary",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-159",
    "name": "Dwimalu Basumatary",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Salakati"
  },
  {
    "id": "cm-160",
    "name": "Deep Saha",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-161",
    "name": "Gobinda Dutta",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-162",
    "name": "Madhu Pandit",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-163",
    "name": "Sayan Chaki",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-164",
    "name": "Ajay Choudhury",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-165",
    "name": "Noni Gopal Roy",
    "role": "Joint Convenor",
    "category": "Electricity and Sound Sub-Committee",
    "location": "Intibil"
  },
  {
    "id": "cm-166",
    "name": "Shri Rana Brahma",
    "role": "Chairman",
    "category": "Accommodation Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-167",
    "name": "Shri Vidya Sagar Basumatary",
    "role": "Vice Chairman",
    "category": "Accommodation Sub-Committee",
    "location": "Saraibil"
  },
  {
    "id": "cm-168",
    "name": "Nipon Ray",
    "role": "Convenor",
    "category": "Accommodation Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-169",
    "name": "Birash Ghosh",
    "role": "Joint Convenor",
    "category": "Accommodation Sub-Committee",
    "location": "Srirampur"
  },
  {
    "id": "cm-170",
    "name": "Gutal Brahma",
    "role": "Joint Convenor",
    "category": "Accommodation Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-171",
    "name": "Shri Kanteswar Mohilary (SPR)",
    "role": "Chairman",
    "category": "Diksha Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-172",
    "name": "Shri Gaur Kishore Dey Juardar (SPR)",
    "role": "Vice Chairman",
    "category": "Diksha Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-173",
    "name": "Shri Dharmeswar Roy (SPR)",
    "role": "Convenor",
    "category": "Diksha Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-174",
    "name": "Jibon Basumatary (JK)",
    "role": "Joint Convenor",
    "category": "Diksha Sub-Committee",
    "location": "Ghoskata"
  },
  {
    "id": "cm-175",
    "name": "Shri Prafulla Brahma (SPR)",
    "role": "Chairman",
    "category": "VIP Reception Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-176",
    "name": "Shri Gaur Kishore Dey Juardar (SPR)",
    "role": "Vice Chairman",
    "category": "VIP Reception Sub-Committee",
    "location": "Gossaigaon"
  },
  {
    "id": "cm-177",
    "name": "Shri Baladev Mushahary",
    "role": "Convenor",
    "category": "VIP Reception Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-178",
    "name": "Dr. Sudev Ch. Basumatary",
    "role": "Joint Convenor",
    "category": "VIP Reception Sub-Committee",
    "location": "Patgaon"
  },
  {
    "id": "cm-179",
    "name": "Shri Shyam Kumar Brahma",
    "role": "Joint Convenor",
    "category": "VIP Reception Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-180",
    "name": "Lalit Mahan Basumatary",
    "role": "Joint Convenor",
    "category": "VIP Reception Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-181",
    "name": "Shri Nripendra Narzary (SPR)",
    "role": "Chairman",
    "category": "Volunteer Sub-Committee",
    "location": "Panbari"
  },
  {
    "id": "cm-182",
    "name": "Shri Sibaram Brahma",
    "role": "Vice Chairman",
    "category": "Volunteer Sub-Committee",
    "location": "Malaguri"
  },
  {
    "id": "cm-183",
    "name": "Shri Iragdao Basumatary",
    "role": "Convenor",
    "category": "Volunteer Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-184",
    "name": "Shri Bireswar Basumatary",
    "role": "Joint Convenor",
    "category": "Volunteer Sub-Committee",
    "location": "Saraibil"
  },
  {
    "id": "cm-185",
    "name": "Shri Biswasing Mushahary",
    "role": "Joint Convenor",
    "category": "Volunteer Sub-Committee",
    "location": "Kachugaon"
  },
  {
    "id": "cm-186",
    "name": "Shri Nripendra Narzary (SPR)",
    "role": "Chairman",
    "category": "Programme Arranger Sub-Committee",
    "location": "Panbari"
  },
  {
    "id": "cm-187",
    "name": "Shri Sibaram Brahma",
    "role": "Vice Chairman",
    "category": "Programme Arranger Sub-Committee",
    "location": "Malaguri"
  },
  {
    "id": "cm-188",
    "name": "Shri Iragdao Basumatary",
    "role": "Convenor",
    "category": "Programme Arranger Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-189",
    "name": "Shri Bireswar Basumatary",
    "role": "Joint Convenor",
    "category": "Programme Arranger Sub-Committee",
    "location": "Saraibil"
  },
  {
    "id": "cm-190",
    "name": "Shri Biswasing Mushahary",
    "role": "Joint Convenor",
    "category": "Programme Arranger Sub-Committee",
    "location": "Kachugaon"
  },
  {
    "id": "cm-191",
    "name": "Baladev Muchahary",
    "role": "Chairman",
    "category": "Gate Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-192",
    "name": "Erakdao Brahma",
    "role": "Vice Chairman",
    "category": "Gate Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-193",
    "name": "Bidung Brahma",
    "role": "Convenor",
    "category": "Gate Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-194",
    "name": "Mukundo Brahma",
    "role": "Joint Convenor",
    "category": "Gate Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-195",
    "name": "Birdao Narzary",
    "role": "Joint Convenor",
    "category": "Gate Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-196",
    "name": "Pabitra Mushahary",
    "role": "Joint Convenor",
    "category": "Gate Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-197",
    "name": "Dr. Phungkha Mohilary",
    "role": "Chairman",
    "category": "Official Permission Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-198",
    "name": "Bihung Brahma",
    "role": "Convenor",
    "category": "Official Permission Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-199",
    "name": "Irakdao Basumatary",
    "role": "Joint Convenor",
    "category": "Official Permission Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-200",
    "name": "Dhritabrata Narzary",
    "role": "Joint Convenor",
    "category": "Official Permission Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-201",
    "name": "Haribhushan Mushahary",
    "role": "Joint Convenor",
    "category": "Official Permission Sub-Committee",
    "location": "Magurmari"
  },
  {
    "id": "cm-202",
    "name": "Tridibesh Narzary (SPR)",
    "role": "Chairman",
    "category": "Pandal and Bargaining Sub-Committee",
    "location": "Amlaiguri"
  },
  {
    "id": "cm-203",
    "name": "Sudem Ch. Brahma",
    "role": "Convenor",
    "category": "Pandal and Bargaining Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-204",
    "name": "Shri Nitya Binode Wary (SPR)",
    "role": "Chairman",
    "category": "VIP Invitation Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-205",
    "name": "Shri Jwngsar Narzary",
    "role": "Convenor",
    "category": "VIP Invitation Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-206",
    "name": "Dr. Surath Narzary (SPR)",
    "role": "Chairman",
    "category": "Souvenir Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-207",
    "name": "Kanteswar Mahilary (SPR)",
    "role": "Vice-Chairman",
    "category": "Souvenir Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-208",
    "name": "Jwngsar Narzary",
    "role": "Chief Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Kokrajhar"
  },
  {
    "id": "cm-209",
    "name": "Jaynal Mahilary",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Thuribari"
  },
  {
    "id": "cm-210",
    "name": "Dr. Bihung Brahma",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-211",
    "name": "Dr. Sudev Basumatary",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Dotma"
  },
  {
    "id": "cm-212",
    "name": "Dr. Mahananda Brahma",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Intibil"
  },
  {
    "id": "cm-213",
    "name": "Dimbeswar Upadhya",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Patgaon"
  },
  {
    "id": "cm-214",
    "name": "Bibeka Roy",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Intibil"
  },
  {
    "id": "cm-215",
    "name": "Priti Prasun Debnath",
    "role": "Editor",
    "category": "Souvenir Sub-Committee",
    "location": "Kokrajhar"
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
    date: "Sunday, Dec 20, 2026",
    time: "At Dawn",
    title: "Veda Mangaliki (Vedic Invocation) and Nabahat Ushakirtan (Early-morning Kirtan)",
    category: "Ritual",
    venue: "Sri Mandir & Surrounding Campus",
    description: "Sacred dawn invocation chanting ancient Vedic hymns and early-morning Ushakirtan resonating across the serene campus.",
    speakers: ["Kirtan Mandali & Devotees"]
  },
  {
    id: "ev-2",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "6:07 AM onwards",
    title: "Morning Prayer, Meditation, Reading of Holy books, devotional offerings",
    category: "Ritual",
    venue: "Sri Mandir Sanctum",
    description: "Congregational morning prayers, collective silent meditation, recital of sacred books, and heartfelt devotional offerings to the Living Ideal.",
    speakers: ["Prarthana Parishad"]
  },
  {
    id: "ev-3",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "7:00 AM onwards",
    title: "Breakfast",
    category: "Seva",
    venue: "Anandabazar / Dining Complex",
    description: "Nutritious, warm, satvik morning prasad served to all participating delegates and morning assembly attendees.",
    speakers: ["Annadan Seva Team"]
  },
  {
    id: "ev-4",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "8:00 AM onwards",
    title: "Kendra-wise presentation of Bhajans-Kirtans (Chorus)",
    category: "Cultural",
    venue: "Central Cultural Stage",
    description: "Enthusiastic and harmonious choral devotional songs presented by Satsang Kendras across Kokrajhar and neighboring districts.",
    speakers: ["Participating Kendra Choirs"]
  },
  {
    id: "ev-5",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "9:00 AM onwards",
    title: "Free Medical Camp",
    category: "Seva",
    venue: "Health & Medical Pavilion",
    description: "Free medical consultations, diagnostic screenings, BP and glucose testing, and essential medicine distribution for attendees and local villagers.",
    speakers: ["Volunteer Doctors & Medical Staff"]
  },
  {
    id: "ev-6",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "10:00 AM",
    title: "Offering of Bhog to Sree Sree Thakur, Sree Sree Boroma and Sree Sree Boroda at Sri Mandir",
    category: "Ritual",
    venue: "Sri Mandir Sanctum",
    description: "Solemn ceremonial offering of sacred Bhog with traditional reverent rituals honoring Sree Sree Thakur, Sree Sree Boroma, and Sree Sree Boroda.",
    speakers: ["Pujari Parishad"]
  },
  {
    id: "ev-7",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "10:30 AM onwards",
    title: "Cultural Show and Satsang Sanmilani",
    category: "Satsang",
    venue: "Main Satsang Sanmilani Pavilion",
    description: "Grand ideological symposium and cultural showcase celebrating universal brotherhood, existential morality, and spiritual wisdom.",
    speakers: ["Distinguished Speakers & Cultural Artists"]
  },
  {
    id: "ev-8",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "11:00 AM onwards",
    title: "Bhandara distribution",
    category: "Seva",
    venue: "Anandabazar Pandal Complex",
    description: "Grand continuous Bhandara distribution serving sacred Satvik Mahaprasad to all pilgrims and visitors in orderly, disciplined rows.",
    speakers: ["Bhandara Seva Units"]
  },
  {
    id: "ev-9",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "4:37 PM onwards",
    title: "Evening Prayer, Meditation, Reading of Holy books",
    category: "Ritual",
    venue: "Sri Mandir Sanctum",
    description: "Solemn evening congregation prayer, collective meditation, and reading of divine messages of Sree Sree Thakur Anukulchandra.",
    speakers: ["Prarthana Mandali"]
  },
  {
    id: "ev-10",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "5:30 PM",
    title: "Candle lighting",
    category: "Ritual",
    venue: "Sri Mandir & Central Grounds",
    description: "Illumination of thousands of sacred earthen lamps and candles throughout the Utsav ground spreading peace, warmth, and divine light.",
    speakers: []
  },
  {
    id: "ev-11",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "6:30 PM",
    title: "Declaration of Closing of Utsav",
    category: "Satsang",
    venue: "Main Conference Dais",
    description: "Formal valedictory address, vote of thanks to volunteers, administration and attendees, and official declaration of the closing of Utsav.",
    speakers: ["Organising Committee Leadership"]
  },
  {
    id: "ev-12",
    day: 1,
    date: "Sunday, Dec 20, 2026",
    time: "till 8:30 PM",
    title: "Special Cultural programme",
    category: "Cultural",
    venue: "Central Cultural Stage",
    description: "Vibrant concluding musical and cultural presentations showcasing traditional dance, drama, and devotional symphonies.",
    speakers: ["Folk & Devotional Artists"]
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
