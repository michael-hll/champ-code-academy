import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';

interface FilterControlsProps {
  onFilterChange: (startDate: string | null, endDate: string | null) => void;
}

type PresetType = 'current' | 'six-months' | 'all' | 'custom';

export default function FilterControls({ onFilterChange }: FilterControlsProps) {
  const now = new Date();

  const [selectedPreset, setSelectedPreset] = useState<PresetType>('current');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Calculate date range based on preset
  const getDateRangeForPreset = (preset: PresetType): { start: string | null; end: string | null } => {
    switch (preset) {
      case 'current': {
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        return {
          start: format(start, 'yyyy-MM-dd'),
          end: format(end, 'yyyy-MM-dd'),
        };
      }
      case 'six-months': {
        // 3 months ago to 2 months forward (total 6 months)
        const start = startOfMonth(subMonths(now, 3));
        const end = endOfMonth(addMonths(now, 2));
        return {
          start: format(start, 'yyyy-MM-dd'),
          end: format(end, 'yyyy-MM-dd'),
        };
      }
      case 'all':
        return { start: null, end: null };
      case 'custom':
        return { start: startDate, end: endDate };
      default:
        return { start: null, end: null };
    }
  };

  // Handle preset selection
  const handlePresetChange = (preset: PresetType) => {
    setSelectedPreset(preset);

    if (preset === 'custom') {
      // Don't apply filter yet, wait for user to set dates
      return;
    }

    const range = getDateRangeForPreset(preset);
    // We already returned above for the 'custom' preset, so here
    // `preset` cannot be 'custom'. Apply the calculated range.
    setStartDate(range.start || '');
    setEndDate(range.end || '');
    onFilterChange(range.start, range.end);
  };

  // Handle custom date changes
  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    onFilterChange(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    onFilterChange(startDate, value);
  };

  // Apply current month filter on mount
  useEffect(() => {
    handlePresetChange('current');
  }, []);

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md border border-gray-200 dark:border-dark-border p-6 mb-6 transition-colors duration-300">
      <div className="space-y-4">
        {/* Preset Buttons */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
            📅 Date Range
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePresetChange('current')}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all ${selectedPreset === 'current'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-bg dark:text-dark-text dark:hover:bg-dark-border'
                }`}
            >
              Current Month
            </button>
            <button
              onClick={() => handlePresetChange('six-months')}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all ${selectedPreset === 'six-months'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-bg dark:text-dark-text dark:hover:bg-dark-border'
                }`}
            >
              6 Months
            </button>
            <button
              onClick={() => handlePresetChange('all')}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all ${selectedPreset === 'all'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-bg dark:text-dark-text dark:hover:bg-dark-border'
                }`}
            >
              All
            </button>
            <button
              onClick={() => handlePresetChange('custom')}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all ${selectedPreset === 'custom'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-bg dark:text-dark-text dark:hover:bg-dark-border'
                }`}
            >
              📆 Custom
            </button>
          </div>
        </div>

        {/* Custom Date Range (shown only when Custom is selected) */}
        {selectedPreset === 'custom' && (
          <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
            <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
              Select Custom Date Range
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-dark-muted mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-end justify-center pb-2">
                <span className="text-gray-400 font-bold">→</span>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-dark-muted mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-dark-border dark:bg-dark-bg dark:text-dark-text focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
