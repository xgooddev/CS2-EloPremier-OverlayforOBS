# CS2 Premier ELO Tracker — Overlay para streamers

> Overlay minimalista para OBS que muestra el ELO Premier, ELO Faceit (nivel) y las últimas 5 partidas usando la API pública de **Leetify**.  
> Diseñado para streamers que quieren mostrar sus estadísticas en tiempo real con estilo y animaciones suaves.

---

## Demo
- **Demo (local)**: `http://localhost:3000/overlay?steam64_id=TU_STEAM64_ID`
- **Demo (deploy)**: 

---

## Capturas


---

## Lo que hace
- Muestra el **ELO Premier** del jugador en un cuadro con color por rango.  
- Muestra **Faceit level** (ícono) debajo del ELO.  
- Muestra las **últimas 5 partidas** en formato `W - L - D`, coloreadas.  
- Animaciones: glow del cuadro de ELO cuando cambia, y borde verde/rojo temporal al ganar/perder.  
- Fuente de datos: **Leetify Public API** (fetch desde una API route serverless en Next.js).  
- Listo para usarse en **OBS (fuente navegador)** con estilo minimalista.

---

## Tech stack
- Next.js 16 (App Router) + TypeScript  
- Tailwind CSS  
- Framer Motion (animaciones)  
- Fetch API (servidor → Leetify)  
- Imagenes/íconos en `/public`  
- (Opcional) Recharts o librería de charts para métricas históricas

---

## Requisitos
- Node 18+ (LTS recomendado)  
- npm / pnpm / yarn  
- Cuenta y API key de Leetify (si aplica)  
- Vercel account para deploy (opcional)

---

## Instalación (local)

```bash
# clonar
git clone https://github.com/tuusuario/cs2-elo-tracker.git
cd cs2-elo-tracker

# instalar
npm install
# o con pnpm
# pnpm install
