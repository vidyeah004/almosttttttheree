
export interface OpportunityData {
  pipelinePhase: string;
  modelSegment: string;
  estCloseDate: string;
  purchaseTimeframe: string;
  // Optional date fields
  enteredStageInterested: string;
  enteredStageProductExperienced: string;
  enteredStageCaseUnderFinance: string;
  enteredStageRetailedClosed: string;
  // Numeric and string fields
  numFollowUps: number;
  createOrder: string;
  dealerState: string;
  dealerZone: string;
}

export interface ScoreFactor {
    factor: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    reasoning: string;
    value: number; // A relative contribution value, e.g., 1 to 10
}

export interface PredictionResponse {
  propensityScore: number; // 0 to 1
  prediction: number; // 1 for Won, 0 for Lost
  priority: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  scoreBreakdown: ScoreFactor[];
}