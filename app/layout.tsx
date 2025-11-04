// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CS2 Premier Elo Tracker",
  description:
    "Overlay para streamers que muestra estadísticas de Premier ELO, últimas partidas y KD ratio.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const isOverlay = typeof window !== "undefined" && window.location.pathname.includes("/overlay");

  return (
    <html lang="es">
      <body className={isOverlay ? "overlay-mode" : "main-mode"}>
        <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
