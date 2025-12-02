import { GoogleGenAI } from "@google/genai";
import { HanziChar } from "../types";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStory = async (characters: HanziChar[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "请配置 API Key 来体验 AI 故事功能！";
  }

  if (characters.length === 0) return "";

  const charString = characters.map(c => `${c.char}`).join(', ');

  const prompt = `
    请为5岁的中国小朋友写一个非常简短、可爱且有趣的小故事（最多3句话）。
    故事必须包含以下汉字：${charString}。
    请将这些汉字在故事中用方括号标记出来，例如：[字]。
    故事必须使用简单通俗的中文。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "熊猫现在想不出故事了，稍后再试吧！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "哎呀！讲故事的熊猫睡着了（网络错误）。";
  }
};