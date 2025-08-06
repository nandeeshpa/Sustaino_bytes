# GiveWell – Donate with Dignity

A full-stack web application that enables users to donate and receive usable items (food, clothes, books, etc.) to reduce waste and help the underprivileged.

## 🌟 Features

### ✅ Implemented Core Features

- **Universal User System**: All users can both donate and receive items (no role separation at signup)
- **Authentication**: Email/password authentication with email verification
- **Donation Management**: Create, view, and manage donations with categories (Food, Clothes, Books, Others)
- **Real-time Donation Feed**: Browse available donations with search and filtering
- **Donation Details**: Detailed view with QR codes, sharing, and acceptance functionality
- **Location Detection**: Auto-detect pickup locations using Geolocation API
- **Gamification System**: Points and badges (Bronze, Silver, Gold) based on donation activity
- **Leaderboard**: Track top donors and their contributions
- **Responsive Design**: Mobile-first design with dark mode support
- **Eco-friendly Theme**: Green and orange color scheme

### 🚧 Features in Development

- Real-time chat system using Firebase Realtime Database
- Interactive maps with Leaflet.js integration
- NGO verification system with admin approval
- Comprehensive admin panel
- Push notifications
- Multi-language support (English + Tamil)
- Voice input for donation forms

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 Demo Usage

### Demo Credentials

The application includes pre-configured demo accounts:

- **Admin**: `admin@givewell.com` / `admin123`
- **Regular User**: `user@givewell.com` / `user123`
- **NGO**: `ngo@givewell.com` / `ngo123`

### Sample Data

The app automatically loads sample donations and users for demonstration purposes. This data is stored in localStorage and persists across sessions.

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **QRCode.react** for QR code generation

### Backend (Planned)
- **Firebase Auth** for authentication
- **Firebase Firestore** for data storage
- **Firebase Realtime Database** for chat
- **Firebase Storage** for image uploads

### Current Implementation
- **Mock Service** using localStorage for demo purposes
- **Sample data** for realistic user experience
- **Responsive design** optimized for all devices

## 📱 Pages & Features

### Public Pages
- **Landing Page**: App introduction, features, and call-to-action
- **Login/Register**: Authentication with form validation

### Protected Pages
- **Donation Feed**: Browse and filter available donations
- **Create Donation**: Form with category selection, image upload, location detection
- **Donation Details**: Detailed view with acceptance, QR codes, and sharing
- **Profile**: User information and statistics
- **Leaderboard**: Top donors ranking with badges
- **History**: Track donation activities (placeholder)
- **Map View**: Interactive map for NGOs and donations (placeholder)
- **NGO Verification**: Apply for NGO status (placeholder)
- **Chat**: Real-time messaging (placeholder)

### Admin Pages
- **Admin Panel**: User and donation management (placeholder)

## 🎨 Design System

### Colors
- **Primary**: Green shades (#22c55e family)
- **Secondary**: Orange shades (#f97316 family)
- **Neutral**: Gray shades for text and backgrounds

### Components
- **Cards**: Consistent styling for content containers
- **Buttons**: Primary, secondary, and outline variants
- **Forms**: Styled inputs with validation states
- **Navigation**: Responsive navbar with mobile menu

## 🔧 Configuration

### Environment Variables
For production deployment, create a `.env` file with:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Realtime Database
5. Set up Storage for image uploads
6. Configure security rules

## 📦 Build & Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Build Verification
```bash
npm run build
npx serve -s build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Roadmap

### Phase 1 (Current)
- ✅ Basic donation system
- ✅ User authentication
- ✅ Responsive UI
- ✅ Mock data integration

### Phase 2
- 🔄 Firebase integration
- 🔄 Real-time chat
- 🔄 Interactive maps
- 🔄 Image upload

### Phase 3
- 📅 NGO verification system
- 📅 Admin panel
- 📅 Push notifications
- 📅 Analytics dashboard

### Phase 4
- 📅 Mobile app (React Native)
- 📅 Multi-language support
- 📅 Advanced matching algorithms
- 📅 Integration with delivery services

## 🐛 Known Issues

- Firebase authentication is configured for demo mode only
- Image uploads use placeholder URLs
- Real-time features are simulated
- Location detection may require HTTPS in production

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- UI inspiration from modern donation platforms
- Built with love for community impact

## 📞 Support

For support, email support@givewell.com or create an issue in the repository.

---

**Made with ❤️ for a better world**
