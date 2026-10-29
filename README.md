# 🪷 Priti-Lagnik Maha Mahotsav 2026 — Official Portal & Pass Issuance System

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/Built_with-React_19_•_Vite_•_Tailwind_v4-f97316.svg)](https://vitejs.dev/)
[![Database](https://img.shields.io/badge/Database-Google_Firebase_Firestore-FFCA28.svg)](https://firebase.google.com/)
[![Event Date](https://img.shields.io/badge/Event_Date-20_December_2026-emerald.svg)](#event-details)

The official web application and registration management system for the **Priti-Lagnik Maha Mahotsav 2026**, held in devotion to **Sree Sree Thakur Anukulchandra (Joyguru)**.

---

## 📍 Event Details

- **Event:** Priti-Lagnik Maha Mahotsav 2026
- **Main Celebration Date:** 20 December 2026
- **Venue:** West Dangarkuthi, Dotma, Kokrajhar, BTR, Assam, India — 783347
- **Official Portal:** [Priti-Lagnik 2026 Central Portal](https://www.narzary.com)



---

## ✨ Features Overview

### 1. 🌐 5-Language Multilingual Navigation
Attendees and devotees can switch instantly between 5 languages:
1. **हिंदी (Hindi)**
2. **English**
3. **बर' (Bodo)**
4. **বাংলা (Bengali)**
5. **অসমীয়া (Assamese)**

Language preference is persisted locally across sessions.

### 2. 🪪 Delegate Registration & Two-Stage Pass Issuance
- **Registration Form:** Collects full name, phone number, email, address (city & state), arrival/departure dates, accommodation needs, and demographic breakdown:
  - **Male Participants**
  - **Female Participants**
  - **Children Count**
  - Optional portrait photo upload
- **Immediate Acknowledgement Slip:** Once submitted, applicants immediately receive an **Acknowledgement Slip** with a unique Pass ID (e.g., `PLM26-839201`) to save as PDF or Image for future reference.
- **Admin Verification & Acceptance:** Secretariat administrators review incoming delegate applications.
- **Official Registered Delegate Pass:** Once accepted by an admin, the registrant can check their status and print or export their verified Pass Card featuring:
  - Official Priti-Lagnik insignia
  - Delegate photo
  - Single-line Pass ID
  - Demographic summary
  - **Dynamic Security QR Code** encoding Name, Address, and Contact Number for scanning at reception gates.

### 3. 🚗 Dedicated Windshield Car & Vehicle Pass System
- **Vehicle Registration:** Collects vehicle registration number (license plate), vehicle type (Sedan, SUV, Bus, Van, Two-Wheeler), driver name, driver contact number, and delegation address.
- **Giant Windshield / Dashboard Car Pass:** Accepted passes generate a high-visibility, large-format **`*** CAR PASS ***`** card designed specifically for placement on vehicle front windshields and dashboards:
  - Prominent high-contrast **CAR PASS** banner legible to gate marshals
  - Giant vehicle registration plate display
  - Assigned parking zone (e.g., Gate 1 Main Pavilion Bay, East VIP Ground, Bypass Compound)
  - Security QR Code encoding vehicle owner, plate number, address, and emergency driver contact.

### 4. 🖨️ High-Fidelity Printing & Export to PDF / PNG
- **Save as PDF:** Vector-accurate PDF generation using `jsPDF`.
- **Save as Image:** Ultra-crisp PNG snapshot generation using `html-to-image`.
- **Theme-Agnostic Light Mode Rendering:** In both Dark and Light site modes, the printable/exportable pass cards ALWAYS render in pure physical light cardstock (`bg-white` with gold trim and rich dark typography). This completely eliminates illegible white-on-white or dark-on-dark export issues.
- **Single-Line Pass ID:** Registration Pass IDs and Car Plate numbers are styled with `whitespace-nowrap font-mono inline-block` to guarantee they never wrap or break onto multiple lines.

### 5. 🔐 Multi-Admin Secretariat Dashboard
- **Default Administrative Credentials:**
  - **Email:** `admin@dotma.org`
  - **Password:** `PritiLagnik@2026`
- **Dashboard Capabilities:**
  - **Delegate Management:** Accept, reject, or delete registrations; view full demographic details; send 1-click WhatsApp confirmation messages.
  - **Vehicle Management:** Allocate designated parking zones (Gates 1, 2, School Field, Yatri Niwas), accept/reject passes, and print vehicle placards.
  - **Multi-Admin Delegation:** Root admins can invite and manage additional Secretariat officers and committee members.
  - **Dual-Mode File Uploader:** Upload event PDFs and DOCX guidelines directly from local device or provide direct links.
  - **Gallery Manager:** Upload devotional photos and link YouTube amritavani discourses with automated embed conversion.
  - **Attendee Feedback:** Review attendee ratings on reception, prasadam, and accommodation.

### 6. 📚 Event Documents & Teachings of Joyguru Gallery
- **Public Downloads:** Instant access to Schedule of Events, Travel and Parking Advisory, and Volunteer Seva Manual.
- **Sacred Archival Media:** High-resolution authentic archival portraits of Sree Sree Thakur Anukulchandra, Jagat Janani Sree Sree Boroma, Revered Boroda, and Revered Acharyadev, alongside sacred spiritual discourses.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, custom Cinzel and Plus Jakarta Sans typography
- **Database & Storage:** Google Cloud Firebase Firestore
- **Card Generation & Export:** `html-to-image`, `jspdf`, `qrcode`
- **Icons:** `lucide-react`

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18.0 or higher, v20 recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pritilagnik-2026.git
   cd pritilagnik-2026
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   Create a `.env` file based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   VITE_FIREBASE_DATABASE_ID="your-database-id"
   VITE_BASE_PATH="./"
   ```
   *(Note: The applet includes built-in fallback configuration in `firebase-applet-config.json`)*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages (Automated Workflow)

This repository includes a production-ready GitHub Actions workflow in `.github/workflows/deploy.yml`.

### How It Works:
1. Every push to the `main` branch triggers the workflow.
2. It checks out the repository, sets up Node.js 20, and installs all dependencies.
3. It builds the Vite app with relative pathing (`VITE_BASE_PATH: './'`).
4. It creates `dist/404.html` (copy of `index.html`) to ensure single-page application (SPA) client-side routes work seamlessly on refresh.
5. It deploys the compiled `dist/` directory to GitHub Pages via official GitHub Actions (`actions/deploy-pages@v4`).

### Enabling GitHub Pages on your repository:
1. Go to your GitHub repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
3. (Optional) Under **Settings** -> **Secrets and variables** -> **Actions**, you can add your custom Firebase credentials if not using the bundled configuration:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_DATABASE_ID`
4. Trigger the workflow manually under **Actions** or push to `main`. Your site will be live at `https://<username>.github.io/<repo-name>/`!

---

## 🔒 Firebase Firestore Security Rules

The application uses Firestore to persist registrations, vehicle passes, event documents, gallery media, admins, and attendee feedback. Ensure your `firestore.rules` allow public reads and writes while securing admin updates:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{registrationId} {
      allow read, list, create, update, delete: if true;
    }
    match /car_passes/{carPassId} {
      allow read, list, create, update, delete: if true;
    }
    match /admins/{adminId} {
      allow read, list, create, update, delete: if true;
    }
    match /event_documents/{documentId} {
      allow read, list, create, update, delete: if true;
    }
    match /gallery_items/{galleryId} {
      allow read, list, create, update, delete: if true;
    }
    match /feedback/{feedbackId} {
      allow read, list, create, update, delete: if true;
    }
  }
}
```

---

## 👨‍💻 Developer & Credits

Developed with ❤️ in **Kokrajhar** by **Narzary**.  
For inquiries, organizational support, or technical enhancements:  
🌐 Website: [https://www.narzary.com](https://www.narzary.com)

---

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for complete details.
