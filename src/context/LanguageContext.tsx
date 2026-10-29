import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
}

// User specified preference order: Hindi, English, Bodo, Bengali, Assamese
export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'brx', label: 'Bodo', nativeName: 'बर’' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'as', label: 'Assamese', nativeName: 'অসমীয়া' }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  availableLanguages: LanguageOption[];
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  hi: {
    home: "मुख्य पृष्ठ",
    about: "परिचय",
    events: "कार्यक्रम",
    gallery: "गैलरी",
    accommodation: "आवास",
    contact: "संपर्क",
    check_status: "स्थिति जांचें",
    admin: "प्रशासक",
    register: "पंजीकरण",
    feedback: "प्रतिक्रिया",
    brandName: "प्रीति-लाग्निक २०२६",
    brandSub: "पश्चिम डांगरकुठी · डोटमा · कोकराझार",
    navHome: "मुख्य पृष्ठ",
    navAbout: "परिचय",
    navEvents: "कार्यक्रम व पंचांग",
    navGallery: "गैलरी",
    navAcc: "आवास व भोजन",
    navContact: "संपर्क व मार्ग",
    navStatus: "पास स्थिति",
    navAdmin: "प्रशासक",
    navRegister: "पंजीकरण",
    heroTitle: "प्रीति-लाग्निक महा महोत्सव २०२६",
    heroSub: "परम दयाल श्री श्री ठाकुर के पावन आदर्शों पर आधारित दिव्य प्रीति, आध्यात्मिक समर्पण एवं सर्वजनीन सेवा का महामिलन।",
    heroDate: "२० दिसंबर २०२६",
    heroVenue: "पश्चिम डांगरकुठी, डोटमा, कोकराझार, असम - ७८३३४७",
    btnDiscover: "और जानें",
    btnRegister: "प्रतिनिधि पंजीकरण",
    btnCarPass: "वाहन व कार पास",
    btnFeedback: "जन प्रतिक्रिया",
    countdownTitle: "महोत्सव की आधिकारिक उलटी गिनती",
    countdownTarget: "पावन तिथि · २० दिसंबर २०२६",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    documents: "दस्तावेज़",
    download: "डाउनलोड"
  },
  en: {
    home: "Home",
    about: "About",
    events: "Events",
    gallery: "Gallery",
    accommodation: "Accommodation",
    contact: "Contact",
    check_status: "Check Status",
    admin: "Admin",
    register: "Register",
    feedback: "Feedback",
    brandName: "Priti-Lagnik 2026",
    brandSub: "West Dangarkuthi · Dotma · Kokrajhar",
    navHome: "Home",
    navAbout: "About",
    navEvents: "Events & Calendar",
    navGallery: "Gallery",
    navAcc: "Accommodation",
    navContact: "Contact",
    navStatus: "Check Status",
    navAdmin: "Admin",
    navRegister: "Register",
    heroTitle: "Priti-Lagnik Maha Mahotsav 2026",
    heroSub: "Celebrating Divine Love (Priti), Existential Communion (Lagnik), and Universal Seva under the sacred inspiration of Sree Sree Thakur.",
    heroDate: "December 20, 2026",
    heroVenue: "West Dangarkuthi, Dotma, Kokrajhar, Assam - 783347",
    btnDiscover: "Discover More",
    btnRegister: "Register as Attendee",
    btnCarPass: "Vehicle & Car Pass",
    btnFeedback: "Feedback",
    countdownTitle: "Official Event Countdown",
    countdownTarget: "Auspicious Day · December 20, 2026",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    documents: "Documents",
    download: "Download"
  },
  brx: {
    home: "गाहाय बिखं",
    about: "सोमोन्दै",
    events: "हाबाफारि",
    gallery: "गैलारि",
    accommodation: "थाग्रा जायगा",
    contact: "योगयोग",
    check_status: "थासारि नायगिर",
    admin: "सामलायगिरि",
    register: "रेजिष्टार",
    feedback: "गोसोनि राव",
    brandName: "प्रीति-लाग्निक २०२६",
    brandSub: "पश्चिम डांगारखुथि · डथमा · कक्राझार",
    navHome: "गाहाय बिखं",
    navAbout: "सोमोन्दै",
    navEvents: "हाबाफारि आरो सानखौरां",
    navGallery: "गैलारि",
    navAcc: "थाग्रा जायगा",
    navContact: "योगयोग",
    navStatus: "पास थासारि",
    navAdmin: "सामलायगिरि",
    navRegister: "रेजिष्टार खालाम",
    heroTitle: "प्रीति-लाग्निक गेदेर फालिनाय २०२६",
    heroSub: "परम दयाल श्री श्री ठाकुरनि गथार आदर्शजों ईश्वरीय अननाय (प्रीति) आरो गासै सुबुंनि सिबिनाय (सेवा) फालिनाय।",
    heroDate: "२० डिसेम्बर २०२६",
    heroVenue: "पश्चिम डांगारखुथि, डथमा, कक्राझार, आसाम - ७८३३४७",
    btnDiscover: "गोबां मिथिनो",
    btnRegister: "बाहागो लागिरिनि रेजिष्ट्रेसन",
    btnCarPass: "गाड़ि आरो मथर पास",
    btnFeedback: "गोसोनि बिबुंथि",
    countdownTitle: "हाबाफारिनि सम नायनाय",
    countdownTarget: "गथार सान · २० डिसेम्बर २०२६",
    days: "सान",
    hours: "घन्टा",
    minutes: "मिनित",
    seconds: "सेकन्द",
    documents: "फोरमान बिलाइ",
    download: "दाउनल’ड"
  },
  bn: {
    home: "মূল পৃষ্ঠা",
    about: "পরিচিতি",
    events: "অনুষ্ঠানসূচী",
    gallery: "চিত্রশালা",
    accommodation: "থাকার ব্যবস্থা",
    contact: "যোগাযোগ",
    check_status: "স্ট্যাটাস দেখুন",
    admin: "প্রশাসক",
    register: "নিবন্ধন",
    feedback: "মতামত",
    brandName: "প্রীতি-লাগ্নিক ২০২৬",
    brandSub: "পশ্চিম ডাঙ্গারকুঠি · ডোটমা · কোকরাঝাড়",
    navHome: "মূল পৃষ্ঠা",
    navAbout: "পরিচিতি",
    navEvents: "অনুষ্ঠানসূচী ও দিনপঞ্জী",
    navGallery: "চিত্রশালা",
    navAcc: "আবাস ও খাদ্য",
    navContact: "যোগাযোগ",
    navStatus: "পাস স্ট্যাটাস",
    navAdmin: "প্রশাসক",
    navRegister: "নিবন্ধন করুন",
    heroTitle: "প্রীতি-লাগ্নিক মহা মহোৎসব ২০২৬",
    heroSub: "পরমদয়াল শ্রীশ্রীঠাকুরের পরম আদর্শে প্রীতি, আত্মিক সমর্পণ এবং সর্বজনীন মানব সেবার ঐতিহাসিক মহামিলন।",
    heroDate: "২০ ডিসেম্বর, ২০২৬",
    heroVenue: "পশ্চিম ডাঙ্গারকুঠি, ডোটমা, কোকরাঝাড়, আসাম - ৭৮৩৩৪৭",
    btnDiscover: "আরও জানুন",
    btnRegister: "প্রতিনিধি নিবন্ধন",
    btnCarPass: "যানবাহন ও কার পাস",
    btnFeedback: "ভক্তবৃন্দের মতামত",
    countdownTitle: "মহোৎসবের ক্ষণগণনা",
    countdownTarget: "পবিত্র তিথি · ২০ ডিসেম্বর, ২০২৬",
    days: "দিন",
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "সেকেন্ড",
    documents: "নথিপত্র",
    download: "ডাউনলোড"
  },
  as: {
    home: "মুখ্য পৃষ্ঠা",
    about: "বিৱৰণ",
    events: "কাৰ্যসূচী",
    gallery: "চিত্ৰশালা",
    accommodation: "থকা-মেলা",
    contact: "যোগাযোগ",
    check_status: "স্থিতি পৰীক্ষা",
    admin: "প্ৰশাসক",
    register: "পঞ্জীয়ন",
    feedback: "মতামত",
    brandName: "প্ৰীতি-লাগ্নিক ২০২৬",
    brandSub: "পশ্চিম ডাঙৰকুঠি · ডোটমা · কোকৰাঝাৰ",
    navHome: "মুখ্য পৃষ্ঠা",
    navAbout: "বিৱৰণ",
    navEvents: "কাৰ্যসূচী আৰু পঞ্জিকা",
    navGallery: "চিত্ৰশালা",
    navAcc: "থকা-মেলা",
    navContact: "যোগাযোগ",
    navStatus: "স্থিতি পৰীক্ষা",
    navAdmin: "প্ৰশাসক",
    navRegister: "পঞ্জীয়ন",
    heroTitle: "প্ৰীতি-লাগ্নিক মহা মহোৎসৱ ২০২৬",
    heroSub: "পৰমদয়াল শ্ৰীশ্ৰীঠাকুৰৰ পৱিত্ৰ আদৰ্শত প্ৰীতি, আত্মিক সমৰ্পণ আৰু সৰ্বজনীন মানৱ সেৱাৰ ঐতিহাসিক মহামিলন।",
    heroDate: "২০ ডিচেম্বৰ, ২০২৬",
    heroVenue: "পশ্চিম ডাঙৰকুঠি, ডোটমা, কোকৰাঝাৰ, অসম - ৭৮৩৩৪৭",
    btnDiscover: "অধিক জানক",
    btnRegister: "অংশগ্ৰহণকাৰী পঞ্জীয়ন",
    btnCarPass: "যান-বাহন কাৰ পাছ",
    btnFeedback: "ৰাইজৰ মতামত",
    countdownTitle: "মহোৎসৱলৈ বাকী থকা সময়",
    countdownTarget: "শুভ তিথি · ২০ ডিচেম্বৰ, ২০২৬",
    days: "দিন",
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "ছেকেণ্ড",
    documents: "নথিপত্ৰ",
    download: "ডাউনল’ড"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  lang: 'hi',
  setLang: () => {},
  availableLanguages: AVAILABLE_LANGUAGES,
  t: (key: string) => key
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pritilagnik_lang');
      if (saved && ['hi', 'en', 'brx', 'bn', 'as'].includes(saved)) {
        return saved as Language;
      }
      return 'hi'; // Default preference start: Hindi
    } catch {
      return 'hi';
    }
  });

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    try {
      localStorage.setItem('pritilagnik_lang', l);
    } catch {}
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      lang: language,
      setLang: setLanguage,
      availableLanguages: AVAILABLE_LANGUAGES,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
