import type { OpportunityData, PredictionResponse } from '../types';

export const getPrediction = async (data: OpportunityData): Promise<PredictionResponse> => {
  const endpoint = '/api/getPrediction';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching prediction from backend function:', error);
    if (error instanceof Error) {
        throw new Error(`Could not connect to the prediction service: ${error.message}`);
    }
    throw new Error('An unknown error occurred while connecting to the prediction service.');
  }
};