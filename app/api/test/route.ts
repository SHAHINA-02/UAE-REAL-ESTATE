import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No API key found" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Say hello" }] }],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      keyPrefix: apiKey.slice(0, 10) + "...",
      geminiResponse: data,
    });
  } catch (err) {
    return NextResponse.json({ fetchError: String(err) });
  }
}