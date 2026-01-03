# 🧑‍🏫 Champ Code Academy — Tutor Portal

A modern tutor portal frontend built with React, TypeScript, and TailwindCSS v4. This application allows tutors to manage their teaching schedules, view lessons across different categories, and take on available classes.

## ✨ Features Implemented

### ✅ Core Requirements

- **Login Page** — Simple authentication with mock credentials (any email/password in mock mode)
- **Tutor Dashboard** — Four lesson categories with dynamic filtering:
  - 📚 Today's Lessons
  - 🔜 Upcoming Lessons  
  - 📂 Available Lessons (with "Take Class" action)
  - 📖 Historic Lessons (completed)
- **Monthly & Date Filters** — Grouped by month with custom date range picker
- **Better UI/UX** — Clean, professional design with consistent components
- **Backend Integration** — Dual mode support (real API + mock data)
  - Loading states with spinners
  - Error handling with user-friendly messages
  - Optimistic updates with React Query

### 🎁 Bonus Features Implemented

- ✅ **Light/Dark Mode Toggle** — Persistent theme with smooth transitions
- ✅ **Calendar View** — Monthly grid with clickable days and lesson details
- ✅ **Responsive Layout** — Mobile-friendly design
- ✅ **Smooth Animations** — Polished UI interactions

## 🛠 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS v4 (no UI kits)
- **State Management**:
  - Zustand (auth, theme — client state)
  - React Query v5 (lessons — server state)
- **API Handling**: Axios with interceptors
- **Date Utilities**: date-fns
- **Backend**: Express (Node.js) mock API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# 1. Clone the repository
git clone <repo-url>
cd champ-code-academy

# 2. Install dependencies for both frontend and backend
npm install
cd backend && npm install
cd ../frontend && npm install

# 3. Start the backend (Terminal 1)
cd backend
npm run dev
# Server runs at http://localhost:4000

# 4. Start the frontend (Terminal 2)
cd frontend
npm run dev
# App runs at http://localhost:5173
```

## 📦 Environment Configuration

The app supports two modes controlled by environment variables:

### Development Mode (with backend)

Create `frontend/.env.development`:

```env
VITE_USE_BACKEND=true
VITE_ENABLE_RQ_DEVTOOLS=true
```

### Production Mode (static deployment)

Create .env.production:

```env
VITE_USE_BACKEND=false
VITE_ENABLE_RQ_DEVTOOLS=false
```

When `VITE_USE_BACKEND=false`, the app uses client-side mock data

## 🎨 Design Highlights

- **Clean UI**: Card-based design with consistent spacing and typography
- **Color System**: Semantic colors for lesson types (blue, green, purple, gray)
- **Dark Mode**: Full theme support with TailwindCSS v4 custom properties
- **Responsive**: Mobile-first approach with breakpoints
- **Accessibility**: Semantic HTML, proper contrast ratios

## 🔄 State Management Strategy

### Client State (Zustand)

- Authentication (user, tokens)
- Theme preferences (light/dark mode)

### Server State (React Query)

- Lesson data with smart caching
- Optimistic updates for mutations
- Automatic refetching on window focus
- Separate cache keys for Dashboard vs Calendar

**Benefits**: Clear separation between client/server state, automatic cache invalidation, bandwidth optimization via HTTP ETags

## 📱 Deployment

### Build for Production

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### GitHub Pages Deployment

The app is configured for static deployment with `VITE_USE_BACKEND=false`:

1. Build creates static assets in `dist/`
2. Mock data mode enabled automatically
3. All features work client-side (no backend required)
4. Mutations reset on page refresh (perfect for demos)

## 🧪 Features Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| Login Page | ✅ | Mock authentication |
| Tutor Dashboard | ✅ | 4 lesson categories with counts |
| Monthly Filters | ✅ | Grouped by month by default |
| Date Range Filter | ✅ | Custom date picker |
| Better UI/UX | ✅ | TailwindCSS v4, card-based design |
| Backend Integration | ✅ | Express API + Axios |
| Loading States | ✅ | Spinners with React Query |
| Error Handling | ✅ | User-friendly error messages |
| State Management | ✅ | Zustand + React Query |
| Light/Dark Mode | ✅ | Persistent with smooth transitions |
| Calendar View | ✅ | Monthly grid with lesson details |
| Responsive Design | ✅ | Mobile-friendly |
| GitHub Pages Deploy | ✅ | Mock mode for static hosting |


## 📄 License

MIT
