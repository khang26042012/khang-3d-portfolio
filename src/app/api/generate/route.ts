import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const routerUrl = process.env.NINEROUTER_URL || "https://9router-production-04be.up.railway.app";
    const routerKey = process.env.NINEROUTER_KEY || "sk-bacafb154a4937ca-ivern5-ceaf8d31";

    const response = await fetch(`${routerUrl}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${routerKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "ag/gemini-3.1-flash-image",
        prompt: prompt,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
