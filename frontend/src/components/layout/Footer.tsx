export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-3">About</h3>
            <p className="text-sm text-gray-600 dark:text-dark-muted">
              Champ Code Academy - Your gateway to quality tutoring and learning excellence.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-muted">
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Help Center</a></li>
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Support</a></li>
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-muted">
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Email Us</a></li>
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Community Forum</a></li>
              <li><a href="#" className="hover:text-sky-500 dark:hover:text-sky-400">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-dark-muted">
            © {new Date().getFullYear()} Champ Code Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
