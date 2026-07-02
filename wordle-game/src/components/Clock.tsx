import React, { useState, useEffect } from 'react';

export interface ClockProps {
  className?: string;
}

export const Clock: React.FC<ClockProps> = ({ className = '' }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const timeString = now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Format date as DD.MM.YYYY
  const dateString = now.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className={`text-center ${className}`} data-testid="clock">
      <div className="text-4xl font-mono font-bold text-gray-800" data-testid="clock-time">
        {timeString}
      </div>
      <div className="text-lg text-gray-600 mt-1" data-testid="clock-date">
        {dateString}
      </div>
    </div>
  );
};

export default Clock;
