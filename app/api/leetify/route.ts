import { NextResponse } from "next/server";

const cache: Record<string, { data: any; timestamp: number }> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const steam64Id = searchParams.get("steam64_id");

  if (!steam64Id) {
    return NextResponse.json(
      { error: "steam64_id requerido en query" },
      { status: 400 }
    );
  }

  // Cache simple 30s
  const cached = cache[steam64Id];
  if (cached && Date.now() - cached.timestamp < 30_000) {
    return NextResponse.json(cached.data);
  }

  try {
    const headers: HeadersInit = {
      "_leetify_key": process.env.LEETIFY_API_KEY || "",
    };

    const res = await fetch(
      `https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${steam64Id}`,
      { headers }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Error en Leetify API", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    if (!data.name) {
      return NextResponse.json(
        { error: "No se pudieron obtener datos del perfil. ¿Es público y válido?" },
        { status: 404 }
      );
    }

    cache[steam64Id] = { data, timestamp: Date.now() };
    return NextResponse.json(data);

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
