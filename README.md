# 🎓 Skillwell - Modern Online Course Platform

Skillwell is a premium, full-stack online learning platform built to connect instructors with eager students. It features a modern, responsive UI with glassmorphic aesthetics, seamless payment integration, timestamp-based video Q&A, and comprehensive course management tools.

![Skillwell Preview](https://via.placeholder.com/1200x600.png?text=Skillwell+-+Modern+Online+Course+Platform)

## ✨ Key Features

### For Students
*   **📚 Course Discovery**: Browse a rich catalog of courses across various categories with detailed preview pages.
*   **🛒 Seamless Checkout**: Secure and fast payments via Stripe integration.
*   **🎥 Interactive Learning**: Modern video player tailored for learning.
*   **🙋 Timestamped Q&A**: Stuck on a concept? Ask a question at an exact video timestamp. Instructors can see exactly where you got stuck.
*   **⭐ Course Reviews**: Rate and leave detailed feedback on completed courses.
*   **📈 Progress Tracking**: Visual indicators of your progress through modules and lessons.

### For Instructors
*   **🛠️ Intuitive Course Builder**: Create and structure courses using a drag-and-drop style module/lesson builder.
*   **☁️ Cloud Media Uploads**: Seamlessly upload course thumbnails and video lessons directly to Cloudinary.
*   **💬 Doubt Management**: A dedicated dashboard to view, track, and answer student questions.
*   **📊 Review Feedback**: Monitor student satisfaction with an aggregated reviews dashboard.

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 18 + Vite
*   **Routing**: React Router DOM v6
*   **Styling**: Tailwind CSS v4 (Modern Design System, OKLCH colors, Glassmorphism)
*   **Icons**: Lucide React / Material Symbols
*   **State Management & Fetching**: React Hooks, Axios
*   **Authentication**: Context API + Firebase Auth (for Google OAuth)

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB & Mongoose
*   **Authentication**: JSON Web Tokens (JWT) + bcryptjs
*   **Payments**: Stripe API
*   **Media Storage**: Cloudinary + Multer

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)
*   Cloudinary Account
*   Stripe Account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/skillwell.git
cd skillwell
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Setup
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```
Start the frontend development server:
```bash
npm run dev
```

## 🏗️ Project Architecture

*   **`backend/src/`**
    *   `controllers/`: Request handling and business logic.
    *   `models/`: Mongoose schemas (Course, Doubt, Review, User).
    *   `routes/`: Express API endpoints.
    *   `middleware/`: JWT authentication and role-based authorization guards.
*   **`frontend/src/`**
    *   `components/`: Reusable UI components (Modals, Navbars, Cards).
    *   `pages/`: Core application views organized by role (`student/`, `instructor/`, `courses/`).
    *   `services/`: Axios HTTP wrappers to interact with the backend API.
    *   `context/`: Global React Contexts (e.g., AuthContext).

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/your-username/skillwell/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.