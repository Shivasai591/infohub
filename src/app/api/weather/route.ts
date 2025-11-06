import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Hyderabad";

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    if (!geoRes.ok) throw new Error("Geocoding failed");

    const geo = await geoRes.json();
    if (!geo.results?.length) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { latitude, longitude, name, country } = geo.results[0];
    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!wRes.ok) throw new Error("Weather fetch failed");

    const weather = await wRes.json();

    return NextResponse.json({
      city: `${name}, ${country}`,
      current: weather.current_weather,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Weather error" }, { status: 500 });
  }
}
