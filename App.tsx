
import React, { useState } from 'react';
import Layout from './components/Layout';
import Step1Home from './components/Step1Home';
import Step2Estimate from './components/Step2Estimate';
import Step3Directions from './components/Step3Directions';
import { AppStep, PredictionResponse } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HOME);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  const handleStart = () => {
    setCurrentStep(AppStep.ESTIMATE);
  };

  const handlePredictionComplete = (location: string, result: PredictionResponse) => {
    setSelectedLocation(location);
    setPrediction(result);
    setCurrentStep(AppStep.DIRECTIONS);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.HOME:
        return <Step1Home onStart={handleStart} />;
      case AppStep.ESTIMATE:
        return <Step2Estimate onNext={handlePredictionComplete} />;
      case AppStep.DIRECTIONS:
        return (
          <Step3Directions 
            locationName={selectedLocation} 
            prediction={prediction!} 
            onBack={() => setCurrentStep(AppStep.ESTIMATE)} 
          />
        );
      default:
        return <Step1Home onStart={handleStart} />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case AppStep.ESTIMATE: return "Estimate Value";
      case AppStep.DIRECTIONS: return "Route Guidance";
      default: return "";
    }
  };

  return (
    <Layout title={getStepTitle()}>
      {renderStep()}
    </Layout>
  );
};

export default App;
