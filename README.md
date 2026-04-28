# Green Valley Clinic

A full-featured clinic management web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It includes a public-facing website, a staff dashboard, and a patient portal — all powered by a mock in-browser data store (no backend required).

---

## Features

- **Public Website** — Home, Services, Doctors, Online Booking, Contact, and Health Resources pages
- **Staff Dashboard** — Manage appointments, patients, staff, and reports (Admin / Doctor / Receptionist roles)
- **Patient Portal** — Patients can view their appointments and medical history
- **Role-based access control** with persistent sessions via `localStorage`

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Dev server & bundler |
| Tailwind CSS 4 | Styling |
| React Router DOM 7 | Client-side routing |
| Recharts | Charts & reports |

---

## Prerequisites

Make sure the following are installed on your machine before you begin:

- **Node.js** v18 or higher — [https://nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- **Git** — [https://git-scm.com](https://git-scm.com)

Verify your versions:

```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the Repository

**Git Bash / macOS / Linux Terminal:**
```bash
git clone https://github.com/Izaek256/green_valley.git
cd green_valley
```

**Windows CMD:**
```cmd
git clone https://github.com/Izaek256/green_valley.git
cd green_valley
```

**Windows PowerShell:**
```powershell
git clone https://github.com/Izaek256/green_valley.git
Set-Location green_valley
```

---

### 2. Navigate to the App Directory

The React application lives inside the `green-valley-clinic` subfolder.

**Git Bash / macOS / Linux Terminal:**
```bash
cd green-valley-clinic
```

**Windows CMD:**
```cmd
cd green-valley-clinic
```

**Windows PowerShell:**
```powershell
Set-Location green-valley-clinic
```

---

### 3. Install Dependencies

**Git Bash / macOS / Linux Terminal:**
```bash
npm install
```

**Windows CMD:**
```cmd
npm install
```

**Windows PowerShell:**
```powershell
npm install
```

---

### 4. Start the Development Server

**Git Bash / macOS / Linux Terminal:**
```bash
npm run dev
```

**Windows CMD:**
```cmd
npm run dev
```

**Windows PowerShell:**
```powershell
npm run dev
```

Once running, open your browser and go to:

```
http://localhost:5173
```

---

## Available Scripts

Run these from inside the `green-valley-clinic` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Compile TypeScript and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## Application Routes

| URL | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/services` | Available services | Public |
| `/doctors` | Doctor profiles | Public |
| `/book` | Book an appointment | Public |
| `/contact` | Contact page | Public |
| `/health-resources` | Health articles | Public |
| `/login` | Login page | Public |
| `/register` | Patient registration | Public |
| `/staff` | Staff dashboard | Admin / Doctor / Receptionist |
| `/staff/appointments` | Appointment management | Admin / Doctor / Receptionist |
| `/staff/patients` | Patient records | Admin / Doctor / Receptionist |
| `/staff/staff` | Staff management | Admin only |
| `/staff/reports` | Reports & analytics | Admin only |
| `/portal` | Patient portal | Patient only |

---

## Demo Login Credentials

The app uses a mock data store seeded with the following accounts. Use any of these to log in at `/login`:

| Role | Email | Password |
|---|---|---|
| Admin | `admin@greenvalleyclinic.com` | `admin123` |
| Receptionist | `receptionist@greenvalleyclinic.com` | `recep123` |
| Doctor | `drsarahjohnson@greenvalleyclinic.com` | `doctor123` |
| Doctor | `drmichaelchen@greenvalleyclinic.com` | `doctor123` |
| Doctor | `dremilyrodriguez@greenvalleyclinic.com` | `doctor123` |
| Doctor | `drjameswilson@greenvalleyclinic.com` | `doctor123` |
| Doctor | `drlisthompson@greenvalleyclinic.com` | `doctor123` |
| Patient | `jane.smith@email.com` | `patient123` |
| Patient | `john.doe@email.com` | `patient123` |
| Patient | `emily.davis@email.com` | `patient123` |

> **Note:** All data is stored in your browser's `localStorage`. Clearing browser data will reset the app to its default seed data on next load.

---

## Building for Production

**Git Bash / macOS / Linux Terminal:**
```bash
npm run build
npm run preview
```

**Windows CMD:**
```cmd
npm run build
npm run preview
```

**Windows PowerShell:**
```powershell
npm run build
npm run preview
```

The production preview will be available at `http://localhost:4173`.

---

## Project Structure

```
green_valley/
├── green-valley-clinic/        # Main React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React context (Auth, App state)
│   │   ├── data/               # Mock data store & seed data
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── pages/
│   │   │   ├── portal/         # Patient portal pages
│   │   │   ├── public/         # Public website pages
│   │   │   └── staff/          # Staff dashboard pages
│   │   ├── App.tsx             # Root component & routing
│   │   └── main.tsx            # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Troubleshooting

**Port already in use:**  
If port 5173 is busy, Vite will automatically try the next available port (e.g. 5174). Check your terminal output for the exact URL.

**`npm install` fails:**  
Make sure you are inside the `green-valley-clinic` directory, not the root `green_valley` folder.

**Login not working:**  
Try clearing your browser's `localStorage` for `localhost`. In Chrome DevTools: **Application → Local Storage → localhost → Clear All**.
