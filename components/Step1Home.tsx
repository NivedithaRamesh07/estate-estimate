
import React from 'react';
import { LOGO_SVG } from '../constants';

interface Step1HomeProps {
  onStart: () => void;
}

const Step1Home: React.FC<Step1HomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-in fade-in duration-700">
      <div className="flex justify-center mb-8">
        <div className="p-6 bg-white rounded-3xl shadow-xl shadow-blue-100 border border-slate-100">
          {LOGO_SVG}
        </div>
      </div>
      <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Estate <span className="text-blue-600">Estimate</span>
      </h1>
      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Predict property values across Karnataka using advanced AI. Get real-time market data, localized insights, and navigation to your dream home.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Precise Valuation", desc: "Powered by Gemini 3 Flash and real-time Google Search grounding." },
          { title: "Karnataka Wide", desc: "Covers major cities from Bangalore to Mangalore and beyond." },
          { title: "Smart Navigation", desc: "Find the exact distance and directions from your current location." }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
            <h3 className="font-bold text-slate-800 mb-2">{feat.title}</h3>
            <p className="text-slate-500 text-sm">{feat.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-200 active:scale-95"
      >
        Start Estimation
      </button>
    </div>
  );
};

export default Step1Home;
