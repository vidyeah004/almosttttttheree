import React from 'react';
import type { PredictionResponse } from '../types';
import { Gauge } from './Gauge';
import { Spinner } from './Spinner';
import { ScoreBreakdownChart } from './ScoreBreakdownChart';

interface PredictionResultProps {
  prediction: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Spinner />
        <p className="text-gray-300 mt-4 text-lg">Analyzing data with AI...</p>
        <p className="text-purple-300 text-sm">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-rose-900/30 p-6 rounded-lg border border-rose-500/50">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-rose-300 font-semibold text-xl mt-4">An Error Occurred</h3>
        <p className="text-rose-400 mt-2">{error}</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-purple-300 mt-4 text-lg">Prediction results will appear here.</p>
        <p className="text-purple-400/80 text-sm">Fill out the form to get started.</p>
      </div>
    );
  }

  const { propensityScore, prediction: outcome, priority, recommendedAction, scoreBreakdown } = prediction;
  const isWon = outcome === 1;

  const priorityStyles: {[key: string]: string} = {
    High: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30',
    Medium: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    Low: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-fade-in">
      {/* Top section: Gauge and Score */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-around text-center gap-4 md:gap-0">
        <Gauge value={propensityScore} />
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-purple-300 mb-1">Propensity Score</p>
          <p className="text-5xl font-bold text-gray-100">
              {(propensityScore * 100).toFixed(1)}%
          </p>
        </div>
      </div>
      
      {/* Result and Priority */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className={`px-4 py-2 rounded-lg ${isWon ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
          <p className="text-lg font-bold">
            Prediction: {isWon ? 'WON' : 'LOST'}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${priorityStyles[priority]}`}>
          <p className="text-lg font-bold">
            Priority: {priority}
          </p>
        </div>
      </div>
      
      <div className="space-y-5 pt-5 border-t border-purple-900/50">
        {/* Recommended Action */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Recommended Action
          </h3>
          <p className="text-purple-200 bg-black/20 p-3 rounded-lg border border-purple-800/60">{recommendedAction}</p>
        </div>

        {/* Score Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Score Contribution
          </h3>
          <ScoreBreakdownChart breakdown={scoreBreakdown} />
        </div>
      </div>
    </div>
  );
};