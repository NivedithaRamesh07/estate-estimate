
import React, { useState } from 'react';
import { KARNATAKA_CITIES, BHK_OPTIONS } from '../constants';
import { getPricePrediction } from '../services/geminiService';
import { PredictionResponse, PropertyMode } from '../types';

interface Step2EstimateProps {
  onNext: (location: string, prediction: PredictionResponse) => void;
}

const Step2Estimate: React.FC<Step2EstimateProps> = ({ onNext }) => {
  const [mode, setMode] = useState<PropertyMode>('BUY');
  const [location, setLocation] = useState(KARNATAKA_CITIES[0]);
  const [bhk, setBhk] = useState(BHK_OPTIONS[1]); // 2 BHK default
  const [sqft, setSqft] = useState(1200);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPricePrediction({ location, bhk, sqft, mode });
      setPrediction(result);
    } catch (err) {
      setError("Failed to get market data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className={`p-8 bg-gradient-to-br transition-colors duration-500 ${mode === 'BUY' ? 'from-blue-600 to-indigo-700' : 'from-emerald-600 to-teal-700'} text-white`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Property Estimator</h2>
            <div className="bg-white/20 p-1 rounded-lg flex gap-1">
              <button 
                onClick={() => setMode('BUY')}
                className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${mode === 'BUY' ? 'bg-white text-blue-600 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                BUY
              </button>
              <button 
                onClick={() => setMode('RENT')}
                className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${mode === 'RENT' ? 'bg-white text-emerald-600 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                RENT
              </button>
            </div>
          </div>
          <p className="text-white/90 text-sm">
            {mode === 'BUY' ? 'Estimate the current market value for buying.' : 'Estimate the monthly rental income/expense.'}
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Select City in Karnataka</label>
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                {KARNATAKA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">BHK Configuration</label>
                <select 
                  value={bhk} 
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {BHK_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Approx. Sq Ft</label>
                <input 
                  type="number" 
                  value={sqft} 
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : (mode === 'BUY' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200')
            } active:scale-95`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing {mode === 'BUY' ? 'Market' : 'Rental'} Data...
              </>
            ) : `Calculate ${mode === 'BUY' ? 'Price' : 'Rent'}`}
          </button>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          {prediction && !loading && (
            <div className={`mt-8 p-6 border rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${mode === 'BUY' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-xs font-bold uppercase tracking-wider ${mode === 'BUY' ? 'text-blue-800' : 'text-emerald-800'}`}>
                  {mode === 'BUY' ? 'Market Estimate' : 'Expected Monthly Rent'}
                </h3>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${mode === 'BUY' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {mode}
                </span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-4">
                {prediction.estimatedPrice}
                {mode === 'RENT' && <span className="text-sm font-medium text-slate-500 ml-1">/ month</span>}
              </div>
              
              <div className="prose prose-sm text-slate-600 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                <div className="whitespace-pre-wrap leading-relaxed">{prediction.marketInsights}</div>
              </div>

              {prediction.sources.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-slate-400 block mb-2 uppercase">Verified Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {prediction.sources.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md text-blue-600 hover:bg-blue-50 truncate max-w-[150px]"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => onNext(location, prediction)}
                className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                View Directions & Neighborhood
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Estimate;
