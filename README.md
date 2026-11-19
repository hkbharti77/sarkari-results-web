# Sarkari Results Web (BharatRojgar Public Portal)

India's Verified Public Sector Recruitment & Exam Information Portal built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Part of the **GovJob / Sarkari Results Suite**:
- 🌐 **Public Candidate Portal**: [sarkari-results-web](https://github.com/hkbharti77/sarkari-results-web) (This Repository)
- ⚙️ **Administrative Scrutiny Console**: [sarkari-admin-desk](https://github.com/hkbharti77/sarkari-admin-desk)
- 🔌 **REST API & Database Services**: [sarkari-api-service](https://github.com/hkbharti77/sarkari-api-service)

---

## 🌟 Key Features

- **3-Column Sarkari Grid**: Live sections for Latest Jobs, Admit Cards, and Results.
- **Dynamic Search & Filtering**: Multi-criteria filters by category (UPSC, SSC, Railway, Banking, Police, Teaching, Defense), state jurisdiction, and keywords.
- **Verified Vacancy Details**: Timeline countdowns, application fees, eligibility criteria, post-wise vacancy matrix, and safe official commission redirect links.
- **State-Wise Recruitment Hubs**: Dedicated listings for UP, Bihar, Rajasthan, MP, Haryana, Delhi, and other states.
- **Mobile Responsive & Accessible**: Clean, fast, low-bandwidth optimized interface for mobile users across India.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Communicates with [Sarkari API Service](https://github.com/hkbharti77/sarkari-api-service) (`/api/v1`)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Default content:
```env
VITE_API_BASE_URL="http://localhost:4000/api/v1"
```

### 4. Running the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```
