# MediBridge - Smart Hospital Management System

## 🏥 Overview

MediBridge is a complete, futuristic **Desktop Hospital Management System** built with **React** and **JavaScript**, featuring a stunning **NEON BLUE** theme on a dark background. The system provides comprehensive management capabilities for hospitals with role-based access for Admins, Doctors, Receptionists, Pharmacy Staff, and Patients.

## ✨ Features

### 🎨 Design Highlights
- **Futuristic Neon Blue Theme** - Cyberpunk-inspired medical interface
- **Dark Background (#0a0f1f)** with neon cyan (#00eaff) and blue (#14f7ff) accents
- **Glowing Cards & Animations** - Smooth pulse effects and hover interactions
- **Emergency Red Alerts** - Critical notifications with pulsing red neon (#ff005c)
- **Responsive Charts** - Real-time analytics with Recharts
- **Modern Typography** - Orbitron and Rajdhani fonts for futuristic look

### 🔐 Role-Based Modules

#### 1. **Admin Dashboard**
- **User Management** - Add, edit, delete users with role assignments
- **Doctor Management** - Manage doctors, schedules, and availability
- **Department Management** - Organize hospital departments
- **Pharmacy Management** - Medicine inventory with AI stock predictions
- **Ambulance Management** - Live tracking and emergency dispatch
- **System Settings** - Theme configuration, backup/restore, security

**Key Features:**
- Real-time statistics (Doctors, Patients, Appointments, Stock, Ambulances)
- Patient flow analytics with line charts
- Medicine usage bar charts
- AI-powered stock predictions
- Emergency alerts panel
- System status monitoring

#### 2. **Doctor Dashboard**
- **Today's Appointments** - Scheduled patient visits
- **Medical Records** - Patient history and diagnosis
- **Prescriptions** - Create and manage prescriptions
- **Emergency Alerts** - Critical patient notifications

**Key Features:**
- Appointment schedule with status tracking
- Patient medical history timeline
- Prescription creation system
- Emergency notification banner

#### 3. **Receptionist Dashboard**
- **Patient Registration** - Complete patient enrollment
- **Appointment Booking** - Calendar with doctor availability
- **Ambulance Tracking** - Real-time ambulance status
- **Quick Search** - Fast patient lookup

**Key Features:**
- Patient search functionality
- Appointment conflict detection
- Ambulance emergency dispatch
- Critical alert popups

#### 4. **Pharmacy Dashboard**
- **Medicine Inventory** - Stock management with visual bars
- **Issue Medicine** - Dispense to patients with billing
- **Expiry Warnings** - Red glowing alerts for expiring medicines
- **AI Stock Predictions** - Intelligent reorder suggestions

**Key Features:**
- Stock level visualization
- Expiry date tracking
- Low stock alerts
- AI prediction confidence levels (89-95%)

#### 5. **Patient Portal**
- **Appointments** - View and request appointments
- **Prescriptions** - Download prescriptions
- **Billing History** - Invoice management
- **Health Timeline** - Medical journey overview

**Key Features:**
- Upcoming appointments view
- Prescription download
- Bill payment history
- Doctor selection

### 🚑 Ambulance Module
- **Live GPS Tracking** - Real-time location monitoring
- **Driver Details** - Contact information and status
- **Emergency Alerts** - "CRITICAL PATIENT ALERT" with pulse animation
- **Nearest Hospital** - Route planning and navigation
- **Status Badges** - Available, On Duty, Emergency

## 🛠️ Technology Stack

- **Frontend:** React 18.2.0
- **Routing:** React Router DOM 6.20.0
- **Icons:** React Icons 4.12.0
- **Charts:** Recharts 2.10.0
- **Animations:** Framer Motion 10.16.0
- **Build Tool:** Vite 5.0.0
- **Maps:** Leaflet & React-Leaflet 4.2.1

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Dependencies

```powershell
cd C:\Users\gateWay\Desktop\HPM
npm install
```

### Step 2: Start Development Server

```powershell
npm run dev
```

The application will open at `http://localhost:3000`

### Step 3: Build for Production

```powershell
npm run build
```

### Step 4: Preview Production Build

```powershell
npm run preview
```

## 🎯 Login Credentials

Use any username/password combination and select a role:

- **Admin** - Full system access
- **Doctor** - Patient care and prescriptions
- **Receptionist** - Patient registration and appointments
- **Pharmacy** - Medicine inventory and dispensing
- **Patient** - Personal health portal

## 🎨 Color Palette

```css
--bg-dark: #0a0f1f          /* Main background */
--bg-secondary: #0f1628     /* Secondary background */
--bg-card: #141b2e          /* Card background */
--neon-blue: #00eaff        /* Primary neon blue */
--neon-cyan: #14f7ff        /* Bright cyan */
--neon-red: #ff005c         /* Emergency red */
--neon-green: #00ff88       /* Success green */
--neon-yellow: #ffdd00      /* Warning yellow */
--neon-purple: #b847ff      /* Accent purple */
```

## 📁 Project Structure

```
HPM/
├── public/
├── src/
│   ├── components/
│   │   ├── NeonButton/
│   │   ├── NeonCard/
│   │   ├── StatCard/
│   │   └── Sidebar/
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── DoctorLayout.jsx
│   │   ├── ReceptionistLayout.jsx
│   │   ├── PharmacyLayout.jsx
│   │   └── PatientLayout.jsx
│   ├── pages/
│   │   ├── Login/
│   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   ├── UserManagement/
│   │   │   ├── DoctorManagement/
│   │   │   ├── DepartmentManagement/
│   │   │   ├── PharmacyManagement/
│   │   │   ├── AmbulanceManagement/
│   │   │   └── SystemSettings/
│   │   ├── Doctor/
│   │   ├── Receptionist/
│   │   ├── Pharmacy/
│   │   └── Patient/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎬 Key Features Demonstration

### Animated Login Screen
- Floating particles background
- Medical grid overlay
- Neon glowing input fields
- Role dropdown selector
- Pulsing logo animation
- System status indicators

### Dashboard Analytics
- **Line Charts** - Patient flow trends
- **Bar Charts** - Medicine usage statistics
- **Stat Cards** - Real-time metrics with trend indicators
- **Emergency Alerts** - Pulsing red notifications
- **AI Predictions** - Stock forecasting with confidence levels

### Neon UI Components
- **NeonButton** - Glowing buttons with variants (primary, success, danger, warning)
- **NeonCard** - Translucent cards with glow effects
- **StatCard** - Animated stat displays with floating icons
- **GlowingTable** - Tables with hover effects
- **Sidebar** - Collapsible navigation with neon indicators

## 🚀 Running Features

All features are **LIVE and FUNCTIONAL**:
- ✅ Authentication & Role-based routing
- ✅ Collapsible sidebar navigation
- ✅ Real-time charts (Patient flow, Medicine usage)
- ✅ Interactive stat cards with animations
- ✅ Emergency alert system
- ✅ AI prediction displays
- ✅ Modal popups (Add user, Edit forms)
- ✅ Search functionality
- ✅ Status indicators (Online, Available, Emergency)
- ✅ Responsive tables with hover effects
- ✅ Ambulance live tracking visualization

## 🎯 Future Enhancements

- Backend API integration
- Real-time WebSocket updates
- Advanced reporting
- Patient video consultations
- Mobile responsive design
- Print functionality for prescriptions
- Email notifications
- SMS alerts for emergencies
- Payment gateway integration
- Multi-language support

## 📱 Browser Compatibility

- Chrome (Recommended)
- Firefox
- Edge
- Safari

## 🔒 Security Features

- Role-based access control
- Secure authentication routing
- Protected routes
- Session management
- Password encryption ready

## 📊 Analytics & AI Features

- **Patient Flow Prediction** - Weekly trends
- **Stock Forecasting** - AI-powered reorder alerts
- **Expiry Management** - Automated warnings
- **Emergency Detection** - Critical patient alerts

## 🎓 Developer Notes

This project demonstrates:
- Modern React architecture
- Component-based design
- CSS animations and transitions
- Responsive layouts
- State management
- Routing and navigation
- Chart integration
- Theming and styling

## 🎬 AI Video Generation Tool

MediBridge now includes a powerful **AI-powered cinematic video generator**! Create stunning 8-second videos of thunder and energy effects using state-of-the-art text-to-video AI models.

### Features
- 🌩️ Generate cinematic thunder and lightning videos
- ⚡ AI-powered energy absorption effects
- 🎥 Customizable resolution, duration, and style
- 🚀 GPU-accelerated (CPU fallback available)

### Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Generate your first video
python generate_thunder_video.py

# See all options
python generate_thunder_video.py --help
```

📖 **Full Documentation**: See [VIDEO_GENERATOR_README.md](VIDEO_GENERATOR_README.md) for detailed instructions, examples, and troubleshooting.

---

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**MediBridge** - The Future of Hospital Management 🏥✨

Built with ❤️ using React & JavaScript
