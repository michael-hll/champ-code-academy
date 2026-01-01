import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 ${hoverEffect} ${className}`}>
      {children}
    </div>
  );
}
