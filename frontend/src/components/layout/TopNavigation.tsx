import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function TopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Get user initials for avatar
  const userInitials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <nav className="bg-white border-b-4 border-sky-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🎓</span>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Champ Code Academy</h1>
              <p className="text-xs text-gray-500">Tutor Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isActive('/dashboard')
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/schedule"
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isActive('/schedule')
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
            >
              📅 Schedule
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-2xl">
              🌙
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-2xl">
              🔔
            </button>
            <div className="flex items-center space-x-2 pl-3 border-l border-gray-300">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                {userInitials}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest'}</p>
                <p className="text-xs text-gray-500">Tutor</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
