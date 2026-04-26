"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CHARACTERS = [
  { id: "sketch-star", name: "STARRY_SKETCH", cost: 0, img: "/penni-lore/penni-sketch-starry.png", speed: 5, mult: 1 },
  { id: "sketch-pink", name: "PINK_ORIGIN", cost: 500, img: "/penni-lore/penni-sketch-pink.png", speed: 5.5, mult: 1.2 },
  { id: "robot-cyan", name: "CYAN_MECH", cost: 1200, img: "/penni-lore/penni-robot-cyan.png", speed: 6, mult: 1.5 },
  { id: "robot-purple", name: "PURPLE_VOX", cost: 2000, img: "/penni-lore/penni-robot-purple.png", speed: 6.5, mult: 1.8 },
  { id: "fuzzy", name: "VOID_FUZZ", cost: 3500, img: "/penni-lore/penni-fuzzy.png", speed: 6, mult: 2.2 },
  { id: "fuzzy-blue", name: "BLUE_TEXTILE", cost: 5000, img: "/penni-lore/penni-fuzzy-blue.png", speed: 6.5, mult: 2.5 },
  { id: "glow-blue", name: "BLUE_ETHER", cost: 7500, img: "/penni-lore/penni-glow-blue.png", speed: 7, mult: 3 },
  { id: "glow-red", name: "RED_SIGNAL", cost: 10000, img: "/penni-lore/penni-glow-red.png", speed: 7.5, mult: 3.5 },
  { id: "robot-chip", name: "CHIP_SET", cost: 15000, img: "/penni-lore/penni-robot-chip.png", speed: 8, mult: 4 },
  { id: "robot-yellow", name: "YELLOW_CIRCUIT", cost: 20000, img: "/penni-lore/penni-robot-yellow.png", speed: 8.5, mult: 4.5 },
  { id: "3d-clean", name: "CLEAN_RENDER", cost: 30000, img: "/penni-lore/penni-3d-clean.png", speed: 8, mult: 5 },
  { id: "3d-green", name: "GREEN_DIM", cost: 45000, img: "/penni-lore/penni-3d-green.png", speed: 9, mult: 6 },
  { id: "3d-chain", name: "CHAIN_REACTION", cost: 60000, img: "/penni-lore/penni-3d-chain.png", speed: 9.5, mult: 7 },
  { id: "3d-mono", name: "MONO_STATIC", cost: 80000, img: "/penni-lore/penni-3d-mono.png", speed: 10, mult: 8 },
  { id: "fuzzy-devil", name: "DEVIL_FUZZ", cost: 100000, img: "/penni-lore/penni-fuzzy-devil.png", speed: 11, mult: 10 },
  { id: "fuzzy-king", name: "THE_MONARCH", cost: 250000, img: "/penni-lore/penni-fuzzy-king.png", speed: 12, mult: 15 },
  { id: "3d-gold", name: "GOLD_CROWN", cost: 500000, img: "/penni-lore/penni-3d-gold.png", speed: 15, mult: 25 },
];

interface CharType { id: string; name: string; cost: number; img: string; speed: number; mult: number; }

export default function PenniArena() {
  const [view, setView] = useState<"landing" | "arena" | "play">("landing");
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeChar, setActiveChar] = useState<CharType>(CHARACTERS[0]);
  const [unlocked, setUnlocked] = useState(["sketch-star"]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); refreshLeaderboard(); }, []);

  const refreshLeaderboard = () => {
    const registry = JSON.parse(localStorage.getItem("penni_registry") || "[]");
    const legends = [{ name: "W3XCEL", score: 4500 }, { name: "AYO_XTT", score: 3820 }, { name: "SERAPHINA", score: 2900 }];
    const combined = [...legends, ...registry].sort((a, b) => b.score - a.score);
    setLeaderboard(combined.slice(0, 8));
  };

  const handleInitialize = () => {
    const cleanName = username.trim().toUpperCase();
    if (!cleanName) return;
    const savedData = localStorage.getItem(`penni_v6_${cleanName}`);
    if (savedData) {
      const data = JSON.parse(savedData);
      setPoints(data.points || 0);
      setHighScore(data.highScore || 0);
      setUnlocked(data.unlocked || ["sketch-star"]);
      const lastId = data.unlocked[data.unlocked.length - 1];
      setActiveChar(CHARACTERS.find(c => c.id === lastId) || CHARACTERS[0]);
    } else {
      setPoints(0); setHighScore(0); setUnlocked(["sketch-star"]); setActiveChar(CHARACTERS[0]);
    }
    setView("arena");
  };

  const syncData = (p: number, h: number, u: string[]) => {
    const cleanName = username.trim().toUpperCase();
    localStorage.setItem(`penni_v6_${cleanName}`, JSON.stringify({ points: p, highScore: h, unlocked: u }));
    let registry = JSON.parse(localStorage.getItem("penni_registry") || "[]");
    const idx = registry.findIndex((e: any) => e.name === cleanName);
    if (idx > -1) { registry[idx].score = h; } else { registry.push({ name: cleanName, score: h }); }
    localStorage.setItem("penni_registry", JSON.stringify(registry));
    refreshLeaderboard();
  };

  const handleUnlock = (char: CharType) => {
    if (points >= char.cost && !unlocked.includes(char.id)) {
      const nextPoints = points - char.cost;
      const nextUnlocked = [...unlocked, char.id];
      setPoints(nextPoints); setUnlocked(nextUnlocked);
      syncData(nextPoints, highScore, nextUnlocked);
    }
  };

  const handleGameEnd = (finalScore: number) => {
    const earned = Math.floor(finalScore * activeChar.mult);
    const nextPoints = points + earned;
    const nextHigh = Math.max(highScore, finalScore);
    setPoints(nextPoints); setHighScore(nextHigh);
    syncData(nextPoints, nextHigh, unlocked);
    setView("arena");
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between bg-black/90 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-black italic tracking-tighter">PENNI_ARENA</h1>
        {view !== "landing" && (
          <div className="flex gap-4 text-[10px] items-center">
            <span className="text-zinc-500 uppercase">ID: <b className="text-white">{username}</b></span>
            <span>BAL: <b className="text-pink-500">{points.toLocaleString()}</b></span>
            <button onClick={() => setView("landing")} className="ml-2 text-zinc-600 hover:text-white border border-zinc-800 px-2 py-1">LOGOUT</button>
          </div>
        )}
      </nav>

      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-[10vw] font-black italic leading-none tracking-tighter mb-8">PENNI_ARENA</h2>
            <div className="max-w-md w-full space-y-4">
              <input 
                type="text" placeholder="ENTER OPERATOR ID" value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 font-black italic text-center focus:border-pink-500 outline-none"
              />
              <button onClick={handleInitialize} className="w-full bg-white text-black py-4 font-black italic hover:bg-pink-500 hover:text-white transition-all skew-x-[-10deg]">
                INITIALIZE_DATA
              </button>
            </div>
          </motion.div>
        )}

        {view === "arena" && (
          <motion.section key="arena" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-6">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">The_Vault</h2>
                <button onClick={() => setView("play")} className="bg-pink-600 px-12 py-3 font-black italic skew-x-[-10deg] hover:scale-105 transition-transform">LAUNCH</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {CHARACTERS.map((char) => {
                  const isUnlocked = unlocked.includes(char.id);
                  const isActive = activeChar.id === char.id;
                  return (
                    <div key={char.id} className={`p-4 border transition-all ${isActive ? 'border-pink-500 bg-pink-500/10' : 'border-zinc-800 bg-zinc-900/50'}`}>
                      <div className="relative aspect-square mb-4">
                        <Image src={char.img} alt={char.name} fill className={`object-contain ${!isUnlocked && 'grayscale blur-md opacity-30'}`} unoptimized />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[8px] font-bold">
                          <p className="truncate uppercase">{char.name}</p>
                          <span className="text-pink-500">x{char.mult}</span>
                        </div>
                        {!isUnlocked ? (
                          <button onClick={() => handleUnlock(char)} className="bg-white text-black text-[9px] py-1 font-black">BUY {char.cost}</button>
                        ) : (
                          <button onClick={() => setActiveChar(char)} className={`text-[9px] py-1 font-black ${isActive ? 'bg-pink-500 text-white' : 'bg-zinc-700'}`}>
                            {isActive ? 'ACTIVE' : 'SELECT'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl h-fit">
              <h3 className="text-pink-500 font-black italic mb-6 text-xs uppercase tracking-widest">Global Rankings</h3>
              <div className="space-y-4">
                {leaderboard.map((e, i) => (
                  <div key={i} className={`flex justify-between border-b border-white/5 pb-2 text-[10px] ${e.name === username.toUpperCase() ? 'text-pink-500 font-bold' : ''}`}>
                    <span><span className="text-zinc-600 mr-2">0{i+1}</span>{e.name}</span>
                    <span className="font-black italic">{e.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {view === "play" && <GameScene key="play" character={activeChar} onEnd={handleGameEnd} />}
      </AnimatePresence>
    </div>
  );
}

// GAME ENGINE - STABILIZED COLLISION
function GameScene({ character, onEnd }: { character: CharType; onEnd: (s: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [curScore, setCurScore] = useState(0);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let frame = 0, active = true;
    let player = { x: 100, y: 200, vY: 0, size: 45 };
    let obstacles: any[] = [];
    const charImg = new window.Image(); charImg.src = character.img;

    const loop = () => {
      if (!active) return;
      frame++;
      
      // Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Player Physics
      player.vY += 0.45;
      player.y += player.vY;
      
      // Ground/Ceiling Bounds
      if (player.y > canvas.height - player.size) { player.y = canvas.height - player.size; player.vY = 0; }
      if (player.y < 0) { player.y = 0; player.vY = 0; }
      
      // Draw Player
      ctx.drawImage(charImg, player.x, player.y, player.size, player.size);

      // Spawn Obstacles (Every 1.5s approx)
      if (frame % 100 === 0) {
        obstacles.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 130),
          w: 25,
          h: 130
        });
      }

      // Process Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= (character.speed + (frame / 3000)); // Gradual speed increase

        ctx.fillStyle = "#ec4899";
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        // STRICTOR COLLISION BOX (Padding)
        const hitPadding = 12;
        if (frame > 60 && 
            player.x + hitPadding < obs.x + obs.w &&
            player.x + player.size - hitPadding > obs.x &&
            player.y + hitPadding < obs.y + obs.h &&
            player.y + player.size - hitPadding > obs.y) {
          active = false;
          setCrashed(true);
          setTimeout(() => onEnd(Math.floor(frame / 10)), 1500);
          return;
        }

        // Cleanup
        if (obs.x < -100) obstacles.splice(i, 1);
      }

      setCurScore(Math.floor(frame / 10));
      requestAnimationFrame(loop);
    };

    const jump = (e: any) => { 
      if (e.type === "touchstart" || e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        player.vY = -8; 
      }
    };

    window.addEventListener("keydown", jump);
    window.addEventListener("touchstart", jump, { passive: false });
    const animId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", jump);
      window.removeEventListener("touchstart", jump);
    };
  }, [character, onEnd]);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      <AnimatePresence>
        {crashed && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <h2 className="text-pink-500 text-6xl font-black italic animate-pulse tracking-tighter">PENNI_CRASHED</h2>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full max-w-[900px] flex justify-between mb-4 font-black italic text-[10px]">
        <span className="text-pink-500">SCORE: {curScore}</span>
        <span className="text-zinc-600 uppercase">{character.name}</span>
      </div>
      <canvas ref={canvasRef} width={900} height={450} className="w-full max-w-[900px] border border-zinc-900 rounded-2xl bg-[#050505]" />
    </div>
  );
}