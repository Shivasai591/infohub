"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tab, setTab] = useState<"weather" | "convert" | "quotes">("weather");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">InfoHub</h1>
          <p className="text-sm text-gray-600">
            Weather • INR Converter • Motivational Quotes
          </p>
        </header>

        <nav className="flex gap-2 justify-center">
          {(["weather", "convert", "quotes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full border ${
                tab === t ? "bg-black text-white" : "bg-white"
              }`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>

        {tab === "weather" && <WeatherCard />}
        {tab === "convert" && <ConvertCard />}
        {tab === "quotes" && <QuoteCard />}
      </div>
    </main>
  );
}

function WeatherCard() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow p-5 space-y-4">
      <h2 className="text-xl font-semibold">Weather</h2>
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Enter city (e.g., Hyderabad)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Get Weather
        </button>
      </div>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {data && (
        <div>
          <p className="font-medium">{data.city}</p>
          <p>Temperature: {data.current.temperature} °C</p>
          <p>Wind: {data.current.windspeed} km/h</p>
        </div>
      )}
    </section>
  );
}

function ConvertCard() {
  const [inr, setInr] = useState("1000");
  const [to, setTo] = useState("USD");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/convert?inr=${inr}&to=${to}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow p-5 space-y-4">
      <h2 className="text-xl font-semibold">
        Currency Conversion (INR → USD/EUR)
      </h2>
      <div className="flex gap-2 items-center">
        <input
          className="border rounded px-3 py-2 w-40"
          type="number"
          value={inr}
          onChange={(e) => setInr(e.target.value)}
        />
        <span>to</span>
        <select
          className="border rounded px-3 py-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button
          onClick={convert}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Convert
        </button>
      </div>
      {loading && <p>Converting…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {data && (
        <div>
          <p>
            {data.inr} INR = {data.converted.toFixed(2)} {data.to}
          </p>
        </div>
      )}
    </section>
  );
}

function QuoteCard() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quote");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setQuote(json.quote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="bg-white rounded-2xl shadow p-5 space-y-4">
      <h2 className="text-xl font-semibold">Motivational Quote</h2>
      <button
        onClick={fetchQuote}
        className="px-4 py-2 rounded bg-black text-white"
      >
        New Quote
      </button>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {quote && <blockquote>“{quote}”</blockquote>}
    </section>
  );
}
