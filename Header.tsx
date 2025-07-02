import React from 'react';

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 12.5C3 12.2239 3.22386 12 3.5 12H5.5C5.77614 12 6 12.2239 6 12.5V20.5C6 20.7761 5.77614 21 5.5 21H3.5C3.22386 21 3 20.7761 3 20.5V12.5ZM9 4.5C9 4.22386 9.22386 4 9.5 4H11.5C11.7761 4 12 4.22386 12 4.5V20.5C12 20.7761 11.7761 21 11.5 21H9.5C9.22386 21 9 20.7761 9 20.5V4.5ZM15 8.5C15 8.22386 15.2239 8 15.5 8H17.5C17.7761 8 18 8.22386 18 8.5V20.5C18 20.7761 17.7761 21 17.5 21H15.5C15.2239 21 15 20.7761 15 20.5V8.5Z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-black/40 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-fuchsia-500/20">
      <div className="container mx-auto px-4 py-4 md:px-8 flex items-center">
        <div className="bg-fuchsia-600 p-2 rounded-lg mr-4 shadow-fuchsia-600/50 shadow-md">
            <ChartBarIcon />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Sales Propensity Predictor
        </h1>
      </div>
    </header>
  );
};