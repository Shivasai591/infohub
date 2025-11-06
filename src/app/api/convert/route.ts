import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const inr = parseFloat(searchParams.get("inr") || "0");
    const to = (searchParams.get("to") || "USD").toUpperCase();

    if (isNaN(inr) || inr <= 0) {
      return NextResponse.json({ error: "Invalid INR amount" }, { status: 400 });
    }
    if (!["USD", "EUR"].includes(to)) {
      return NextResponse.json({ error: "Only USD or EUR supported" }, { status: 400 });
    }

    const res = await fetch("https://open.er-api.com/v6/latest/INR");
    if (!res.ok) throw new Error("Exchange API failed");
    const data = await res.json();

    const rate = data?.rates?.[to];
    if (!rate) throw new Error("Rate not available");

    return NextResponse.json({
      inr,
      to,
      rate,
      converted: inr * rate,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Convert error" }, { status: 500 });
  }
}
