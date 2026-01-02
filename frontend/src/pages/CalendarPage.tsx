import DashboardLayout from '../components/layout/DashboardLayout';

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="text-center py-20">
        <div className="text-8xl mb-6">📅</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Calendar View
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Calendar view coming soon! 🚀
        </p>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 max-w-2xl mx-auto">
          <p className="text-gray-700">
            This page will display a monthly calendar view of all your lessons.
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
