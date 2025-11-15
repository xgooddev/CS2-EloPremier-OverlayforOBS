"use client";
import { useBodyClass } from "@/hooks/useBodyClass";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

interface Match {
  outcome: "win" | "loss";
  score: number[];
  map_name: string;
  kda?: string;
  animate?: boolean;
}

interface PlayerData {
  name: string;
  ranks: { premier: number; faceit?: number };
  recent_matches: Match[];
}

function OverlayContent() {
  useBodyClass("overlay-mode");
  const searchParams = useSearchParams();
  const steam64Id = searchParams?.get("steam64_id");
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState<"idle" | "win" | "lose">("idle");
  const prevLastMatchRef = useRef<string>("");

  // Mapeo de ELO -> archivo e info de color
  const getEloContainer = (elo: number) => {
    if (elo >= 30000) return { img: "/elobox/rating.oro.png", color: "rgb(252, 219, 0)" };
    if (elo >= 25000) return { img: "/elobox/rating.rojo.png", color: "rgb(238, 70, 70)" };
    if (elo >= 20000) return { img: "/elobox/rating.pink.png", color: "rgb(234, 19, 227)" };
    if (elo >= 15000) return { img: "/elobox/rating.violeta.png", color: "rgb(187, 110, 249)" };
    if (elo >= 10000) return { img: "/elobox/rating.azul.png", color: "rgb(98, 155, 255)" };
    if (elo >= 5000) return { img: "/elobox/rating.celeste.png", color: "rgb(127, 187, 224)" };
    return { img: "/elobox/rating.gris.png", color: "rgb(190, 198, 209)" };
  };

  const getFaceitIcon = (level?: number) =>
    level ? `/faceit-icons/level${level}.png` : null;

  useEffect(() => {
    if (!steam64Id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/leetify?steam64_id=${steam64Id}`);
        const json = await res.json();

        if (json.error) {
          setError(json.error);
          setPlayer(null);
          return;
        }

        setError(null);
        const recent_matches = (json.recent_matches || []).slice(0, 5).map((m: any) => ({
          ...m,
          kda:
            m.kills && m.deaths && m.assists
              ? `${m.kills}/${m.deaths}/${m.assists}`
              : undefined,
        }));

        const lastMatchStr = recent_matches.map((m: Match) => m.outcome).join(",");
        if (prevLastMatchRef.current && prevLastMatchRef.current !== lastMatchStr) {
          const latest = recent_matches[0];
          if (latest) {
            setAnimationState(latest.outcome === "win" ? "win" : "lose");
            setTimeout(() => setAnimationState("idle"), 3000);
          }
        }
        prevLastMatchRef.current = lastMatchStr;
        setPlayer({ ...json, recent_matches });
      } catch (err) {
        setError("Error al obtener datos del overlay");
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [steam64Id]);

  if (!steam64Id) return null;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!player) return <div className="text-gray-300">Cargando...</div>;

  const elo = player.ranks.premier;
  const { img, color } = getEloContainer(elo);
  const eloFormatted = elo.toLocaleString("es-ES");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <motion.div
        className="backdrop-blur-md bg-black rounded-2xl px-5 py-3 flex flex-row items-center justify-between w-[500px] shadow-md border border-white/20 text-white"
        animate={{
          boxShadow:
            animationState === "win"
              ? "0 0 30px 6px rgba(0,255,0,0.4)"
              : animationState === "lose"
              ? "0 0 30px 6px rgba(255,0,0,0.4)"
              : "0 0 0 0 rgba(0,0,0,0)",
          borderColor:
            animationState === "win"
              ? "rgba(0,255,0,0.6)"
              : animationState === "lose"
              ? "rgba(255,0,0,0.6)"
              : "rgba(255,255,255,0.2)",
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {/* Nombre e historial */}
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-3xl font-bold mb-1 drop-shadow-md leading-tight">
            {player.name}
          </h2>
          <div className="text-lg font-bold tracking-widest">
            {player.recent_matches.map((m, i) => (
              <span
                key={i}
                className={clsx(
                  m.outcome === "win" ? "text-green-500" : "text-red-400",
                  "mx-0.5"
                )}
              >
                {m.outcome === "win" ? "W" : "L"}
                {i < player.recent_matches.length - 1 && " - "}
              </span>
            ))}
          </div>
        </div>

        {/* ELO + Faceit */}
        <div className="flex flex-col items-end justify-center text-right">
          <div className="flex flex-col items-center relative">
            <motion.div
              key={elo} // fuerza re-render animado cuando cambia el número
              initial={{ rotateX: animationState === "win" ? -90 : animationState === "lose" ? 90 : 0, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <Image
                src={img}
                alt="ELO Container"
                width={180}
                height={60}
                className="object-contain"
              />
              <span
                className="absolute text-4xl font-bold"
                style={{
                  color,
                  textShadow:
                    "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {eloFormatted}
              </span>
            </motion.div>
            {player.ranks.faceit && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-gray-100">FACEIT:</span>
                <Image
                  src={getFaceitIcon(player.ranks.faceit) || ""}
                  alt={`Faceit Level ${player.ranks.faceit}`}
                  width={32}
                  height={32}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Suspense Wrapper
export default function OverlayPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Cargando overlay...</div>}>
      <OverlayContent />
    </Suspense>
  );
}
