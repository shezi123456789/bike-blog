import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { bikeName } = await request.json();

  if (!bikeName) {
    return NextResponse.json(
      { error: "bikeName is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are a motorcycle data assistant. Given the bike name "${bikeName}", return ONLY a valid JSON object (no markdown, no explanation, no code fences) with these exact fields:

{
  "name": "model name only, e.g. R15",
  "brand": "manufacturer, e.g. Yamaha",
  "modelYear": number (latest known model year),
  "category": "one of: Sport, Commuter, Cruiser, Naked, Adventure, Touring",
  "engineCc": number,
  "powerHp": number or null,
  "torqueNm": number or null,
  "topSpeedKmh": number or null,
  "weightKg": number or null,
  "price": number or null,
  "description": "a 2-3 sentence engaging description of the bike"
}

If you are not confident about a numeric field, use null rather than guessing. Respond with ONLY the JSON object, nothing else.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const rawText = response.text ?? "";
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    try {
      const data = JSON.parse(cleanedText);
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to parse AI response", raw: rawText },
        { status: 500 },
      );
    }
  } catch (err: any) {
    // Return the provider error message to aid debugging (safe in preview but avoid leaking in production)
    const message = err?.message || String(err);
    return NextResponse.json({ error: "AI provider error", message }, { status: 500 });
  }
}
