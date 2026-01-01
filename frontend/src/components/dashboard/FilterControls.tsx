export default function FilterControls() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Month Selector */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📅 Select Month
          </label>
          <select className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors bg-white text-gray-800 font-medium">
            <option>January 2026</option>
            <option>December 2025</option>
            <option>November 2025</option>
            <option>October 2025</option>
          </select>
        </div>

        {/* Date Range Picker */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📆 Custom Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors"
            />
            <span className="flex items-center text-gray-500 font-bold">→</span>
            <input
              type="date"
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
