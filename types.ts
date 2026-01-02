
export interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export type PropertyMode = 'BUY' | 'RENT';

export interface PredictionRequest {
  location: string;
  bhk: string;
  sqft: number;
  mode: PropertyMode;
}

export interface PredictionResponse {
  estimatedPrice: string;
  pricePerSqft: string;
  marketInsights: string;
  sources: { title: string; uri: string }[];
  mode: PropertyMode;
}

export enum AppStep {
  HOME = 'HOME',
  ESTIMATE = 'ESTIMATE',
  DIRECTIONS = 'DIRECTIONS'
}
