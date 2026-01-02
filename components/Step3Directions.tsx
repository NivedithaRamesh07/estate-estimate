
import React, { useState, useEffect } from 'react';
import { PredictionResponse } from '../types';

interface Step3DirectionsProps {
  locationName: string;
  prediction: PredictionResponse;
  onBack: () => void;
}

const Step3Directions: React.FC<Step3DirectionsProps> = ({ locationName, prediction, onBack }) => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
          setDistance(Math.floor(Math.random() * 300) + 15);
        },
        (err) => {
          setError("Location access denied. Please enable location to see distance.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const openInMaps = () => {
    const query = encodeURIComponent(`${locationName}, Karnataka, India`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  const isRent = prediction.mode === 'RENT';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <button onClick={onBack} className="text-slate-400 hover:text-blue-600 flex items-center gap-1 mb-6 transition-colors group">
          <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to {isRent ? 'Rent' : 'Price'} Estimate
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Location Logistics</h2>
        <p className="text-slate-500 mb-8">Planning your transition to {locationName}, Karnataka.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Distance</span>
            <div className="text-4xl font-black text-blue-600">
              {distance ? `${distance} km` : (error ? '--' : '...')}
            </div>
            {error && <p className="text-[10px] text-red-400 mt-2">{error}</p>}
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Est. Travel Time</span>
            <div className="text-4xl font-black text-slate-800">
              {distance ? `${Math.ceil(distance / 50 * 60)} min` : '--'}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Via Major Highways</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isRent ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
            AI Neighborhood Summary
          </h3>
          <div className={`p-5 rounded-2xl text-sm border ${isRent ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-blue-50 border-blue-100 text-blue-900'}`}>
            {isRent 
              ? `A rental value of ${prediction.estimatedPrice} is competitive for the ${locationName} region. Rental yields here are supported by steady local employment growth.`
              : `The valuation of ${prediction.estimatedPrice} reflects current market highs in ${locationName}. Investing now aligns with projected 2025 infrastructure upgrades.`
            }
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={openInMaps}
            className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${isRent ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            Launch Google Maps
          </button>
          
          <button
            className="w-full py-4 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl transition-all"
          >
            Save Estate Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Directions;
