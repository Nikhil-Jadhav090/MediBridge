# 🚀 Quick Start Guide - MediBridge Hospital Management System

## ⚡ Fast Setup (Windows PowerShell)

### 1. Install Dependencies
```powershell
cd C:\Users\gateWay\Desktop\HPM
npm install
```

### 2. Start the Application
```powershell
npm run dev
```

### 3. Access the System
Open your browser and go to: **http://localhost:3000**

## 🔑 Test Login

### Login with Any Credentials:
- **Username:** `admin` (or any text)
- **Password:** `password` (or any text)
- **Select Role:** Choose from dropdown

### Available Roles:
1. **Admin** → Full system management
2. **Doctor** → Patient care & prescriptions
3. **Receptionist** → Registration & appointments
4. **Pharmacy** → Medicine inventory
5. **Patient** → Personal health portal

## 📱 Navigation

Once logged in:
- Use the **sidebar** to navigate between modules
- **Collapse/Expand** sidebar with the button
- **Hover** over items for glow effects
- **Logout** button at the bottom

## 🎨 Features to Explore

### Admin Dashboard:
✅ Live stat cards with animations
✅ Patient flow line chart
✅ Medicine usage bar chart
✅ Emergency alerts panel
✅ AI stock predictions
✅ System status indicators

### User Management:
✅ Search users
✅ Add new user (modal popup)
✅ Edit/Delete users
✅ Role badges
✅ Status indicators

### Doctor Management:
✅ Doctor cards with photos
✅ Availability status
✅ Weekly schedule grid
✅ Specialization badges

### Pharmacy Management:
✅ Stock bars (visual inventory)
✅ Expiry warnings (red glow)
✅ AI predictions with confidence
✅ Low stock alerts

### Ambulance Management:
✅ Live ambulance tracking
✅ Emergency status (pulsing red)
✅ Driver details
✅ Map visualization

## 🎯 UI Interactions

### Animations:
- **Hover** over cards → Glow effect
- **Hover** over buttons → Lift animation
- **Emergency alerts** → Pulsing red
- **Status dots** → Continuous pulse
- **Stats** → Floating icons

### Colors:
- **Blue** = Primary actions
- **Green** = Success/Available
- **Yellow** = Warning/Pending
- **Red** = Emergency/Critical
- **Purple** = Special features

## 🛠️ Build Commands

```powershell
# Development
npm run dev

# Production Build
npm run build

# Preview Production
npm run preview
```

## 📊 Live Features

All these are **WORKING**:
- ✅ Role-based authentication
- ✅ Protected routes
- ✅ Sidebar navigation
- ✅ Collapsible menu
- ✅ Real-time charts (Recharts)
- ✅ Modal popups
- ✅ Search functionality
- ✅ Animated components
- ✅ Responsive tables
- ✅ Glowing effects

## 🎬 Screen Tour

### 1. Login Screen
- Animated particles
- Neon glowing inputs
- Role selector dropdown
- System status badge

### 2. Admin Dashboard
- 6 stat cards with live data
- 2 interactive charts
- Emergency alerts list
- Recent activities
- AI predictions panel

### 3. User Management
- Search bar
- Data table
- Add user modal
- Edit/Delete actions

### 4. Doctor Management
- Doctor cards grid
- Schedule calendar
- Availability badges

### 5. Pharmacy
- Stock visualization
- AI predictions
- Expiry warnings

### 6. Ambulance
- Live status cards
- Map preview
- Emergency alerts

## 🔧 Troubleshooting

### If npm install fails:
```powershell
# Clear cache
npm cache clean --force

# Install again
npm install
```

### If port 3000 is busy:
The app will automatically use the next available port (3001, 3002, etc.)

### If styles don't load:
1. Stop the server (Ctrl+C)
2. Delete `node_modules` folder
3. Run `npm install` again
4. Run `npm run dev`

## 📱 Browser Recommendation

**Chrome** or **Edge** for best experience
- Full CSS support
- Smooth animations
- All modern features

## 🎓 Next Steps

1. ✅ Start the app
2. ✅ Login as Admin
3. ✅ Explore all modules
4. ✅ Test sidebar collapse
5. ✅ View charts
6. ✅ Check emergency alerts
7. ✅ Try different roles
8. ✅ Test modal popups

## 💡 Tips

- **Theme:** All screens use consistent neon blue theme
- **Navigation:** Sidebar remembers collapsed state
- **Performance:** Vite provides fast hot reload
- **Responsive:** Works on 1920×1080 desktop
- **Animations:** CSS + Recharts animations

---

## 🏥 Enjoy MediBridge!

Your futuristic hospital management system is ready! 🚀✨
