import { NextResponse } from "next/server";

const QUOTES = [
  "The best way to get started is to quit talking and begin doing. — Walt Disney",
  "It always seems impossible until it’s done. — Nelson Mandela",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "The secret of getting ahead is getting started. — Mark Twain",
  "If you get tired, learn to rest, not to quit. — Banksy",
];

export async function GET() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return NextResponse.json({ quote });
}
