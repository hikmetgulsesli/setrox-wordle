import React from 'react';

export type KeyStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface KeyProps {
  value: string;
  status?: KeyStatus;
  onClick: (value: string) => void;
  isWide?: boolean;
}

export const Key: React.FC<KeyProps> = ({ value, status = 'empty', onClick, isWide = false }) => {
  const baseClasses = 'flex items-center justify-center font-semibold text-sm rounded select-none transition-all duration-150 active:scale-95';
  
  const statusClasses: Record<KeyStatus, string> = {
    correct: 'bg-green-500 text-white border-green-500',
    present: 'bg-yellow-500 text-white border-yellow-500',
    absent: 'bg-gray-500 text-white border-gray-500',
    empty: 'bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300',
  };

  const widthClass = isWide ? 'w-16 sm:w-20' : 'w-8 sm:w-10';
  const heightClass = 'h-12 sm:h-14';

  return (
    <button
      data-testid={`key-${value}`}
      className={`${baseClasses} ${statusClasses[status]} ${widthClass} ${heightClass} border`}
      onClick={() => onClick(value)}
      type="button"
    >
      {value === 'BACKSPACE' ? '⌫' : value}
    </button>
  );
};

export default Key;
