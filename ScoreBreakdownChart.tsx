import React from 'react';
import type { ScoreFactor } from '../types';

interface ScoreBreakdownChartProps {
  breakdown: ScoreFactor[];
}

export const ScoreBreakdownChart: React.FC<ScoreBreakdownChartProps> = ({ breakdown }) => {
  if (!breakdown || breakdown.length === 0) {
    return null;
  }
  
  const maxVal = 10; // The AI is instructed to use a scale of 1-10

  const getBarColor = (impact: ScoreFactor['impact']) => {
    switch (impact) {
      case 'Positive': return 'bg-cyan-500';
      case 'Negative': return 'bg-fuchsia-500';
      case 'Neutral': return 'bg-purple-700';
    }
  };

  return (
    <div className="space-y-4">
      {breakdown.map((item, index) => (
        <div key={index} className="space-y-1.5" >
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-300">{item.factor}</span>
            <span className={`font-semibold ${item.impact === 'Positive' ? 'text-cyan-400' : item.impact === 'Negative' ? 'text-fuchsia-400' : 'text-purple-400'}`}>
              {item.impact}
            </span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-2.5" title={`${item.impact} impact: value ${item.value}/10`}>
             <div
              className={`h-2.5 rounded-full ${getBarColor(item.impact)} transition-all duration-500 ease-out`}
              style={{ width: `${(item.value / maxVal) * 100}%` }}
             ></div>
          </div>
           <p className="text-xs text-purple-200/80 italic">"{item.reasoning}"</p>
        </div>
      ))}
    </div>
  );
};