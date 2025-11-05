"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { parseSteam64Id } from "../app/utils/steam";
import { useBodyClass } from "@/hooks/useBodyClass";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [link, setLink] = useState("");

  const handleGenerate = () => {
    const id = parseSteam64Id(input);
    if (!id) {
      alert("Porfavor pega tu Steam64 ID directamente.");
      return;
    }
    setLink(`/overlay?steam64_id=${id}`);
  };
  
  
      


  return (  
    <main className="min-h-screen flex flex-col items-center bg-black text-white overflow-x-hidden">
      {/*  Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/Leetifylogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-md opacity-90"
            />
            <h1 className="text-lg font-bold tracking-tight">
              CS2<span className="text-yellow-400">Overlay</span>
            </h1>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#overlay" className="hover:text-yellow-400 transition">Overlay</a>
            <a href="#donar" className="hover:text-yellow-400 transition">Apoyar</a>
            <a href="#contacto" className="hover:text-yellow-400 transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center pt-40 px-6 space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Premier CS2 + OBS <span className="text-yellow-400">Overlay</span>
        </h1>
        <p className="text-gray-400 max-w-lg leading-relaxed">
          Mostrá tus estadísticas de CS2 en tiempo real. Integrá tu cuenta y
          generá un overlay dinámico, moderno y minimalista para tus streams.
        </p>

        {/* Input */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="text"
            placeholder="Ingresá tu Steam64 ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-900/70 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 w-72 placeholder-gray-400"
          />
          <button onClick={handleGenerate} 
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105">
            Generar Overlay
          </button>
           {link && (
        <a
          href={link}
          target="_blank"
          className="text-blue-400 mt-2 hover:underline"
        >
          Abrir overlay
        </a>
      )}
          
        </div>
        <p>Si no sabes cual es tu Stream64 ID podes obtenerlo pegando tu link de perfil de steam <u><a href="https://steamid.xyz/" target="_blank">aqui</a>.</u></p>
      </motion.section>

      {/* Overlay Preview */}
      <motion.section
        id="overlay"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full mt-24 px-6"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Vista previa del overlay
        </h2>

        <motion.div
          className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-gray-700 backdrop-blur-md bg-white/5 shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <Image
            src="/captura.jpg"
            alt="Overlay Preview"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </motion.div>

        <p className="text-gray-200 text-sm mt-3 text-center">
          Así se verá tu overlay en OBS con tu rango de Premier y ultimos 5 mapas jugados.
        </p>
      </motion.section>

      {/* ⚙️ Powered by */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24 space-y-3 px-6"
      >
        <p className="text-gray-200 text-sm">Datos obtenidos de</p>
        <div className="flex justify-center">
          <Image
            src="/Leetifylogo.png"
            alt="https://leetify.com/"
            width={160}
            height={40}
            className="opacity-80 hover:opacity-100 transition-all"
          />
        </div>
      </motion.section>

      {/*  Donar */}
      <motion.section
        id="donar"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24 space-y-4 px-6"
      >
        <h3 className="text-xl font-semibold">¿Querés apoyar el proyecto?</h3>
        <p className="text-gray-400 text-sm">
          Tu ayuda mantiene vivo el desarrollo del overlay y futuras mejoras 
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://www.paypal.com/paypalme/xgoodtrip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition hover:scale-105 shadow-md"
          >
            ☕ Donar por Paypal
          </a>
          <a
            href="https://ceneka.net/mp/d/xgoodtrip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition hover:scale-105 shadow-md"
          >
            💙 Donar por MercadoPago
          </a>
        </div>
      </motion.section>

      {/* Contacto */}
      <motion.section
        id="contacto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 mb-20 text-center space-y-3 px-6"
      >
        <h3 className="text-xl font-semibold">Contacto</h3>
        <p className="text-gray-400 text-sm">
          ¿Tenés ideas o encontraste un bug? Escribime por mis redes 👇
        </p>
        <div className="flex justify-center gap-5 text-2xl">
          <a
            href="https://x.com/goodtripdev"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            <i className="ri-twitter-x-line"></i>
          </a>
          <a
            href="https://github.com/xgooddev"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            <i className="ri-github-fill"></i>
          </a>
          <a
            href="mailto:gonzaespindoladj@gmail.com"
            className="hover:text-yellow-400 transition"
          >
            <i className="ri-mail-line"></i>
          </a>
        </div>
      </motion.section>

      {/*  Footer */}
      <footer className="text-gray-500 text-sm text-center border-t border-white/10 py-6 w-full">
        © {new Date().getFullYear()} CS2 Overlay — Creado por{" "}
        <span className="text-yellow-400 font-medium">GoodtripDev</span>
      </footer>
    </main>
    
    )}
