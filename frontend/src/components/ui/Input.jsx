import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  id,
  type = 'text',
  icon,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-label-caps font-label-caps text-on-surface-variant">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant z-10 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`
            w-full bg-surface-container-lowest border rounded-xl text-body-md font-body-md text-on-surface transition-all outline-none
            ${icon ? 'pl-10 pr-4 py-3' : 'px-4 py-3'}
            ${error 
              ? 'border-error focus:border-error focus:ring-1 focus:ring-error' 
              : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary hover:border-outline'}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-body-sm font-body-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
