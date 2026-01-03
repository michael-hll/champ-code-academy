import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';

export default function TopNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
    <nav className="bg-white dark:bg-dark-surface border-b-4 border-sky-500 dark:border-sky-600 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <span className="text-2xl sm:text-4xl">🎓</span>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Champ Code Academy</h1>
              <p className="text-xs text-gray-500 dark:text-dark-muted">Tutor Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base font-semibold transition-colors ${isActive('/dashboard')
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 dark:text-dark-text hover:bg-sky-50 dark:hover:bg-dark-bg hover:text-sky-600'
                }`}
            >
              <span className="hidden sm:inline">📊 </span>Dashboard
            </Link>
            <Link
              to="/schedule"
              className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-base font-semibold transition-colors ${isActive('/schedule')
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 dark:text-dark-text hover:bg-sky-50 dark:hover:bg-dark-bg hover:text-sky-600'
                }`}
            >
              <span className="hidden sm:inline">📅 </span>Calendar
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
              onClick={toggleTheme}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors text-xl sm:text-2xl"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {/* <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg transition-colors text-2xl">
              🔔
            </button> */}
            <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-gray-300 dark:border-dark-border">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                {userInitials}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name || 'Guest'}</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Tutor</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-dark-bg rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
