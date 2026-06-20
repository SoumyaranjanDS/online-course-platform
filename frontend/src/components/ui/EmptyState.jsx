import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({ 
  icon = 'inbox', 
  title = 'No Data Found', 
  description = 'There is nothing to display here yet.',
  actionText,
  actionLink,
  onClick
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-container-lowest border border-outline-variant/30 rounded-2xl w-full">
      <div className="w-20 h-20 bg-surface-container-low text-on-surface-variant rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span className="material-symbols-outlined text-[40px] opacity-70" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
          {icon}
        </span>
      </div>
      
      <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-surface-variant max-w-md mb-8">{description}</p>
      
      {actionLink && actionText && (
        <Link 
          to={actionLink} 
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          {actionText}
        </Link>
      )}

      {!actionLink && actionText && onClick && (
        <button 
          onClick={onClick}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
