
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionRequest, PredictionResponse } from "../types";

export const getPricePrediction = async (data: PredictionRequest): Promise<PredictionResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const isRent = data.mode === 'RENT';
  const targetMetric = isRent ? "monthly rental value" : "current market selling price";
  
  const prompt = `Act as a real estate expert specialized in Karnataka, India. 
  Predict the ${targetMetric} for a residential property with the following details:
  - Location: ${data.location}, Karnataka
  - Configuration: ${data.bhk}
  - Area: ${data.sqft} sqft
  - Transaction Type: ${data.mode}
  
  Provide a detailed estimation in Indian Rupees (INR). 
  ${isRent ? "Specify the expected monthly rent." : "Specify the total property value."}
  Include the average ${isRent ? "rent per sqft" : "price per sqft"} in that area.
  Provide 3-4 bullet points about ${isRent ? "rental demand, tenant profiles," : "market trends, capital appreciation,"} or neighborhood quality in that specific part of ${data.location}.
  Use Google Search to ensure the data is up-to-date for 2024-2025.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Unable to generate prediction at this time.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({ title: chunk.web!.title, uri: chunk.web!.uri }));

    // Refined regex to catch common Indian currency formats (e.g., 25,000 or 1.2 Cr)
    const priceMatch = text.match(/₹\s?[\d,.]+\s?(Cr|Lakh|Million|k|thousand)?/i);

    return {
      estimatedPrice: priceMatch ? priceMatch[0] : (isRent ? "Monthly rent estimation in details" : "Sale price estimation in details"),
      pricePerSqft: isRent ? "Rental yield info in insights" : "Market average in insights",
      marketInsights: text,
      sources: sources,
      mode: data.mode
    };
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Failed to fetch market data.");
  }
};
