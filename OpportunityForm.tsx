import React, { useState } from 'react';
import type { OpportunityData } from '../types';
import { 
    PIPELINE_PHASES, 
    MODEL_SEGMENTS, 
    PURCHASE_TIMEFRAMES, 
    DEALER_STATES, 
    DEALER_ZONES,
    CREATE_ORDER_OPTIONS
} from '../constants';

interface OpportunityFormProps {
  onPredict: (data: OpportunityData) => void;
  isLoading: boolean;
}

export const OpportunityForm: React.FC<OpportunityFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<OpportunityData>({
    pipelinePhase: PIPELINE_PHASES[0],
    modelSegment: MODEL_SEGMENTS[0],
    estCloseDate: '',
    purchaseTimeframe: PURCHASE_TIMEFRAMES[0],
    enteredStageInterested: '',
    enteredStageProductExperienced: '',
    enteredStageCaseUnderFinance: '',
    enteredStageRetailedClosed: '',
    numFollowUps: 0,
    createOrder: 'No',
    dealerState: DEALER_STATES[0],
    dealerZone: DEALER_ZONES[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPredict(formData);
  };
  
  const today = new Date().toISOString().split('T')[0];
  const formInputStyle = "w-full p-2.5 bg-black/20 border border-purple-700/50 rounded-md shadow-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-200 placeholder-gray-400 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Required Fields */}
        <div>
          <label htmlFor="pipelinePhase" className="block text-sm font-medium text-gray-300 mb-1">Pipeline Phase *</label>
          <select id="pipelinePhase" name="pipelinePhase" value={formData.pipelinePhase} onChange={handleChange} className={formInputStyle}>
            {PIPELINE_PHASES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="modelSegment" className="block text-sm font-medium text-gray-300 mb-1">Model Segment *</label>
          <select id="modelSegment" name="modelSegment" value={formData.modelSegment} onChange={handleChange} className={formInputStyle}>
            {MODEL_SEGMENTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="purchaseTimeframe" className="block text-sm font-medium text-gray-300 mb-1">Purchase Timeframe *</label>
          <select id="purchaseTimeframe" name="purchaseTimeframe" value={formData.purchaseTimeframe} onChange={handleChange} className={formInputStyle}>
            {PURCHASE_TIMEFRAMES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="dealerState" className="block text-sm font-medium text-gray-300 mb-1">Dealer State *</label>
          <select id="dealerState" name="dealerState" value={formData.dealerState} onChange={handleChange} className={formInputStyle}>
            {DEALER_STATES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="dealerZone" className="block text-sm font-medium text-gray-300 mb-1">Dealer Zone *</label>
          <select id="dealerZone" name="dealerZone" value={formData.dealerZone} onChange={handleChange} className={formInputStyle}>
            {DEALER_ZONES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="createOrder" className="block text-sm font-medium text-gray-300 mb-1">'Create Order' Exists *</label>
          <select id="createOrder" name="createOrder" value={formData.createOrder} onChange={handleChange} className={formInputStyle}>
            {CREATE_ORDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="estCloseDate" className="block text-sm font-medium text-gray-300 mb-1">Est. Close Date *</label>
          <input type="date" id="estCloseDate" name="estCloseDate" value={formData.estCloseDate} min={today} onChange={handleChange} required className={formInputStyle} />
        </div>
        <div>
          <label htmlFor="numFollowUps" className="block text-sm font-medium text-gray-300 mb-1">Number of Follow-Ups *</label>
          <input type="number" id="numFollowUps" name="numFollowUps" value={formData.numFollowUps} min="0" onChange={handleChange} required className={formInputStyle} />
        </div>
      </div>

      <div className="pt-4 border-t border-purple-900/50">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Optional Stage Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="enteredStageInterested" className="block text-sm font-medium text-gray-300 mb-1">Stage: Interested</label>
              <input type="date" id="enteredStageInterested" name="enteredStageInterested" value={formData.enteredStageInterested} onChange={handleChange} className={formInputStyle} />
            </div>
            <div>
              <label htmlFor="enteredStageProductExperienced" className="block text-sm font-medium text-gray-300 mb-1">Stage: Product Experienced</label>
              <input type="date" id="enteredStageProductExperienced" name="enteredStageProductExperienced" value={formData.enteredStageProductExperienced} onChange={handleChange} className={formInputStyle} />
            </div>
            <div>
              <label htmlFor="enteredStageCaseUnderFinance" className="block text-sm font-medium text-gray-300 mb-1">Stage: Case Under Finance</label>
              <input type="date" id="enteredStageCaseUnderFinance" name="enteredStageCaseUnderFinance" value={formData.enteredStageCaseUnderFinance} onChange={handleChange} className={formInputStyle} />
            </div>
             <div>
              <label htmlFor="enteredStageRetailedClosed" className="block text-sm font-medium text-gray-300 mb-1">Stage: Retailed/Closed</label>
              <input type="date" id="enteredStageRetailedClosed" name="enteredStageRetailedClosed" value={formData.enteredStageRetailedClosed} onChange={handleChange} className={formInputStyle} />
            </div>
        </div>
      </div>
      
      <div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-950 focus:ring-fuchsia-500 disabled:bg-fuchsia-600/50 disabled:cursor-not-allowed transition-all duration-300">
          {isLoading ? 'Analyzing...' : 'Predict Outcome'}
        </button>
      </div>
    </form>
  );
};