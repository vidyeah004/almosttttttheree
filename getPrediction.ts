import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { OpportunityData, PredictionResponse } from "../types";

// Note: Do not instantiate the client here with the key.
// It should be initialized inside the handler to ensure it has access
// to the environment variables at runtime.
let ai: GoogleGenAI;

function initializeAi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable not set.");
  }
  // Initialize the AI client if it hasn't been already.
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
}

function cleanAndParseJSON(text: string): PredictionResponse {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    
    try {
        const parsed = JSON.parse(jsonStr);
        // Basic validation
        if (typeof parsed.propensityScore !== 'number' || 
            typeof parsed.prediction !== 'number' ||
            !['High', 'Medium', 'Low'].includes(parsed.priority) ||
            typeof parsed.recommendedAction !== 'string' ||
            !Array.isArray(parsed.scoreBreakdown)
        ) {
            throw new Error('Invalid JSON structure in AI response.');
        }
        return parsed;
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error("AI returned a response in an invalid format.");
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    initializeAi();
  } catch (error) {
    return res.status(500).json({ error: 'API key not configured on the server.' });
  }

  const data: OpportunityData = req.body;

  if (!data) {
     return res.status(400).json({ error: 'Invalid request body. No data provided.' });
  }
  
  const prompt = `
    You are an AI simulating a sophisticated sales propensity model for a vehicle sales company. Your task is to analyze a sales opportunity and provide a detailed prediction analysis.
    
    Analyze the following opportunity data. Factors like a "Very High" purchase timeframe, being in a later pipeline phase (e.g., 'Case Under Finance'), and a higher number of follow-ups increase the win probability. Certain regions or vehicle models may also have higher success rates. A 'Create Order' record being 'Yes' is a strong positive signal.
    
    Opportunity Data:
    - Pipeline Phase: "${data.pipelinePhase}"
    - Vehicle Model Segment: "${data.modelSegment}"
    - Estimated Close Date: "${data.estCloseDate}"
    - Purchase Timeframe: "${data.purchaseTimeframe}"
    - Date Entered 'Interested' Stage: "${data.enteredStageInterested || 'N/A'}"
    - Date Entered 'Product Experienced' Stage: "${data.enteredStageProductExperienced || 'N/A'}"
    - Date Entered 'Case Under Finance' Stage: "${data.enteredStageCaseUnderFinance || 'N/A'}"
    - Date Retailed/Closed: "${data.enteredStageRetailedClosed || 'N/A'}"
    - Number of Follow-Ups: ${data.numFollowUps}
    - 'Create Order' Record Exists: "${data.createOrder}"
    - Dealer State: "${data.dealerState}"
    - Dealer Zone: "${data.dealerZone}"

    Based on this data, provide a detailed prediction. Return your response ONLY in a valid JSON format. Do not include any other text, explanations, or markdown fences. The JSON object must have the following structure:
    {
      "propensityScore": number,
      "prediction": number,
      "priority": "'High' | 'Medium' | 'Low'",
      "recommendedAction": "string",
      "scoreBreakdown": [
        {
          "factor": "string",
          "impact": "'Positive' | 'Negative' | 'Neutral'",
          "reasoning": "string",
          "value": number
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          temperature: 0.3,
      },
    });
    
    const predictionResult = cleanAndParseJSON(response.text);

    return res.status(200).json(predictionResult);

  } catch (error) {
    console.error('Error in Vercel function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return res.status(500).json({ error: errorMessage });
  }
}