import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { OpportunityForm } from './components/OpportunityForm';
import { PredictionResult } from './components/PredictionResult';
import { getPrediction } from './services/geminiService';
import type { OpportunityData, PredictionResponse } from './types';

function App() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async (formData: OpportunityData) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await getPrediction(formData);
      setPrediction(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get prediction. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/30 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-fuchsia-500/30">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Enter Opportunity Details</h2>
            <OpportunityForm onPredict={handlePredict} isLoading={isLoading} />
          </div>
          <div className="bg-black/30 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-fuchsia-500/30">
             <h2 className="text-2xl font-bold text-gray-100 mb-6">Prediction Analysis</h2>
            <PredictionResult prediction={prediction} isLoading={isLoading} error={error} />
          </div>
        </div>
        <footer className="text-center text-purple-400/80 mt-12 pb-4">
            <p>&copy; 2024 Propensity AI. Powered by Gemini.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;