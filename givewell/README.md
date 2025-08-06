# GiveWell – Donate with Dignity 🎁

A full-stack social platform that enables anyone to donate or receive usable items (food, clothes, books, etc.) to reduce waste and help the underprivileged. Built by **Team Sustaino Bytes**.

## 🌟 Features

### ✨ Core Functionality
- **Universal Access**: No role-based login - every user can donate OR receive
- **Item Categories**: Food, Clothes, Books, and Others
- **Smart Matching**: Location-based donation discovery
- **Real-time Chat**: Direct communication between donors and receivers
- **Gamification**: Points, badges, and leaderboard system
- **NGO Integration**: Verified NGO support and verification system

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Eco-friendly Theme**: Green and orange color scheme
- **Intuitive Navigation**: Clean, modern interface
- **Real-time Updates**: Live notifications and status updates

### 🔐 Authentication & Security
- **Firebase Auth**: Email/password authentication with email verification
- **Protected Routes**: Secure access control
- **Admin Panel**: Special admin access for platform management
- **User Profiles**: Comprehensive profile management

### 📱 Key Pages
- **Landing Page**: App introduction with call-to-action
- **Donation Feed**: Browse and filter available donations
- **Create Donation**: Easy donation posting with location detection
- **Profile Page**: User stats, badges, and donation history
- **Leaderboard**: Community recognition and competition
- **Chat System**: Real-time messaging between users
- **Admin Panel**: Platform management and NGO verification

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite for fast development
- **Tailwind CSS** for styling and responsive design
- **React Router** for navigation
- **Heroicons** for consistent iconography

### Backend & Database
- **Firebase Authentication** for user management
- **Firestore** for database storage
- **Firebase Realtime Database** for chat functionality
- **Firebase Storage** for file uploads

### Additional Libraries
- **date-fns** for date formatting
- **uuid** for unique ID generation
- **qrcode.react** for QR code generation
- **leaflet/react-leaflet** for maps integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd givewell
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Realtime Database
   - Update `src/firebase.js` with your Firebase config

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Seed demo data** (optional)
   - Click the "Seed Demo Data" button on the landing page
   - This creates sample users and donations for testing

## 📊 Demo Data

The application includes a demo data seeding feature with:

### Demo Users
- **Admin User**: admin@givewell.com (100 points, Gold badge)
- **John Doe**: john@example.com (75 points, Gold badge)
- **Sarah Johnson**: sarah@example.com (45 points, Silver badge)
- **Helping Hands NGO**: info@helpinghandsngo.org (Verified NGO, 120 points)
- **Mike Wilson**: mike@example.com (25 points, Silver badge)
- **Emma Davis**: emma@example.com (15 points, Bronze badge)

### Demo Donations
- Fresh vegetables, winter clothes, educational books
- Home-cooked meals, household items, professional attire
- Various categories with realistic data and locations

## 🎮 Gamification System

### Points System
- **Create donation**: +10 points
- **Complete donation**: +5 points
- **Positive feedback**: +3 points
- **NGO verification help**: +15 points

### Badge Levels
- 🥉 **Bronze**: 10+ points
- 🥈 **Silver**: 25+ points
- 🥇 **Gold**: 50+ points

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation with auth state
│   └── ProtectedRoute.jsx # Route protection
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Main application pages
│   ├── LandingPage.jsx # Home/marketing page
│   ├── LoginPage.jsx   # User authentication
│   ├── RegisterPage.jsx # User registration
│   ├── DonationFeed.jsx # Browse donations
│   ├── CreateDonation.jsx # Post new donations
│   ├── Profile.jsx     # User profile & history
│   ├── Leaderboard.jsx # Community rankings
│   └── [other pages]   # Additional features
├── utils/              # Utility functions
│   ├── donationUtils.js # Donation CRUD operations
│   └── seedData.js     # Demo data seeding
├── firebase.js         # Firebase configuration
└── index.css          # Global styles & Tailwind
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Features to Implement Next
1. **Real-time Chat** - Firebase Realtime Database integration
2. **Map Integration** - Leaflet.js for location visualization
3. **NGO Verification System** - Document upload and approval
4. **Admin Dashboard** - User and donation management
5. **Notification System** - Email and in-app notifications
6. **QR Code Integration** - Donation tracking
7. **Multi-language Support** - English + Tamil

## 🌍 Deployment

### Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop build folder or connect Git
- **AWS S3**: Upload build files to S3 bucket with CloudFront

## 🤝 Contributing

This project was built for a hackathon/demo purposes. The code is structured to be:
- **Modular**: Easy to extend with new features
- **Responsive**: Works on all screen sizes
- **Accessible**: Follows web accessibility guidelines
- **Performant**: Optimized for fast loading

## 📄 License

Built by **Team Sustaino Bytes** - © 2024 GiveWell Platform

## 🎯 Demo Instructions

1. **Visit the landing page** - Overview of features and statistics
2. **Seed demo data** - Click button to populate with sample content
3. **Register/Login** - Create account or use demo credentials
4. **Browse donations** - Filter by category and search
5. **Create donation** - Post items with location detection
6. **View leaderboard** - See community rankings and badges
7. **Check profile** - View personal stats and donation history
8. **Test responsiveness** - Switch between desktop and mobile
9. **Toggle dark mode** - Use the moon/sun icon in navbar

### Demo Credentials
- **User**: demo@givewell.com / password123
- **Admin**: admin@givewell.com / admin123

---

**Mission**: Reduce waste, help communities, and promote sustainable sharing through technology. 🌱
