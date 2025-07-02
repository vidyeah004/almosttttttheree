import React from 'react';

interface GaugeProps {
  value: number; // 0 to 1
}

export const Gauge: React.FC<GaugeProps> = ({ value }) => {
  const clampedValue = Math.max(0, Math.min(1, value));
  const circumference = 2 * Math.PI * 45; // 2 * pi * r
  const strokeDashoffset = circumference * (1 - clampedValue * 0.5); // Use only half the circle
  
  const getGaugeColor = (val: number) => {
    if (val < 0.4) return 'stroke-fuchsia-500';
    if (val < 0.75) return 'stroke-purple-500';
    return 'stroke-cyan-400';
  };

  const colorClass = getGaugeColor(clampedValue);

  return (
    <div className="relative w-48 h-24 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 50">
        {/* Background Arc */}
        <path
          d="M5 50 A 45 45 0 0 1 95 50"
          fill="none"
          strokeWidth="10"
          className="stroke-purple-900/40"
        />
        {/* Foreground Arc */}
        <path
          d="M5 50 A 45 45 0 0 1 95 50"
          fill="none"
          strokeWidth="10"
          className={`${colorClass} transition-all duration-700 ease-in-out`}
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
    </div>
  );
};