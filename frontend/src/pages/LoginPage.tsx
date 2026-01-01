import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Champ Code Academy
          </h1>
          <p className="text-xl text-white/90 font-semibold">Tutor Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back! 👋
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tutor@champcode.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors text-gray-800"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors text-gray-800"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2 w-4 h-4 text-sky-500 rounded" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sky-600 hover:text-sky-700 font-semibold">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button type="submit" variant="primary" size="lg" fullWidth>
              🚀 Login to Dashboard
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <p className="text-xs font-semibold text-purple-700 mb-2">
              💡 Demo Credentials:
            </p>
            <p className="text-xs text-purple-600">
              Email: <span className="font-mono">tutor@champcode.com</span>
            </p>
            <p className="text-xs text-purple-600">
              Password: <span className="font-mono">password123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/90 text-sm mt-6">
          Need help? Contact us at{' '}
          <a href="mailto:support@champcode.com" className="font-semibold underline">
            support@champcode.com
          </a>
        </p>
      </div>
    </div>
  );
}
