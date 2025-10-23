
import { GoogleGenAI, Type } from "@google/genai";
import type { RecruitmentAssets } from '../types';

const RECRUITMENT_ASSETS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    jobDescription: {
      type: Type.STRING,
      description: "A complete, professionally formatted job description suitable for LinkedIn, including sections like Role Overview, Responsibilities, and Qualifications. Use markdown for formatting with bold headers and bullet points.",
    },
    interviewGuide: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of exactly 10 behavioral interview questions designed to assess the soft and hard skills mentioned in the job description.",
    },
  },
  required: ["jobDescription", "interviewGuide"],
};


export async function generateRecruitmentAssets(rawNotes: string, thinkingMode: boolean): Promise<RecruitmentAssets> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const model = thinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
  const config: {
      systemInstruction?: string;
      thinkingConfig?: { thinkingBudget: number };
      responseMimeType: "application/json";
      responseSchema: typeof RECRUITMENT_ASSETS_SCHEMA
  } = {
    systemInstruction: "You are an expert recruitment consultant. Your task is to transform raw, unstructured notes into a polished job description and a relevant interview guide.",
    responseMimeType: "application/json",
    responseSchema: RECRUITMENT_ASSETS_SCHEMA,
  };

  if (thinkingMode) {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }
  
  const prompt = `
    Based on the following raw notes, please generate a professional job description suitable for LinkedIn and a corresponding interview guide with 10 behavioral questions.

    Raw Notes:
    ---
    ${rawNotes}
    ---

    Please provide the output in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: config
    });
    
    const text = response.text.trim();
    const parsedResponse = JSON.parse(text);
    
    if (parsedResponse.jobDescription && Array.isArray(parsedResponse.interviewGuide)) {
        return parsedResponse as RecruitmentAssets;
    } else {
        throw new Error("Invalid response format from Gemini API.");
    }

  } catch (error) {
    console.error("Error generating recruitment assets:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
