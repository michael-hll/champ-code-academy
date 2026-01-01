import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'today' | 'upcoming' | 'available' | 'historic';
}

export default function Badge({ children, variant = 'today' }: BadgeProps) {
  const variants = {
    today: 'bg-red-100 text-red-700 border-red-300',
    upcoming: 'bg-amber-100 text-amber-700 border-amber-300',
    available: 'bg-purple-100 text-purple-700 border-purple-300',
    historic: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${variants[variant]}`}>
      {children}
    </span>
  );
}
