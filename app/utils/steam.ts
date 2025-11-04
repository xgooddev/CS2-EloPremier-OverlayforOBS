export function parseSteam64Id(urlOrId: string): string | null {
  if (!urlOrId) return null;

  const trimmed = urlOrId.trim();

  // Si ya es Steam64 ID numérico
  if (/^\d{17}$/.test(trimmed)) return trimmed;

  try {
    const u = new URL(trimmed);

    // Steam URL: /profiles/76561197969209908
    if (u.pathname.includes("/profiles/")) {
      const parts = u.pathname.split("/");
      const id = parts.find((p) => /^\d{17}$/.test(p));
      return id || null;
    }

    // Steam URL: /id/alias → necesitamos convertir a Steam64 (opcional)
    // Para simplificar, podemos alertar que solo soporta /profiles/ o Steam64 directo
    return null;
  } catch {
    // Si es solo un número, pero con espacios u otros caracteres
    const digits = trimmed.replace(/\D/g, "");
    if (/^\d{17}$/.test(digits)) return digits;
    return null;
  }
}
