import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const { rows } = await query("SELECT * FROM tokens ORDER BY created_at DESC LIMIT 50");
    return NextResponse.json({ tokens: rows });
  } catch (error) {
    console.error("Token tracker error:", error);
    return NextResponse.json({ error: "Failed to fetch tokens", tokens: [] }, { status: 500 });
  }
}
