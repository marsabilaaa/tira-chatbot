// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 300,
    temperature: 0.7,
    topP: 0.6,
    topK: 16,
};
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

export async function POST(request: NextRequest) {
    const { messages } = await request.json();
    const prompt = messages[messages.length - 1].content + "jawab seakan kamu adalah asisten virtual bernama tira";

    const result = await model.generateContent(prompt);
    const resultText = result.response.text();
 
    return new NextResponse(resultText, { status: 200 });
}

