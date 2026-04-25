"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- NEURAL DATA CORE ---
const TRAITS: Record<string, { label: string, stamina: number, intel: number, speed: number, color: string, glow: string, rarity: string, mult: number, anime: string }> = {
  'shellmate.png.JPG': { label: 'Base Unit', stamina: 88, intel: 85, speed: 82, color: 'text-blue-400', glow: 'from-blue-600/30', rarity: 'Standard', mult: 1.0, anime: 'animate-bounce' },
  'crown.png': { label: 'Royal King', stamina: 82, intel: 99, speed: 75, color: 'text-yellow-400', glow: 'from-yellow-500/30', rarity: 'Legendary', mult: 5.0, anime: 'animate-pulse' },
  'ninja.png': { label: 'Shinobi', stamina: 92, intel: 88, speed: 100, color: 'text-zinc-400', glow: 'from-zinc-500/20', rarity: 'Rare', mult: 2.5, anime: 'animate-pulse' },
  'cyber.png': { label: 'Cyber Runner', stamina: 85, intel: 95, speed: 95, color: 'text-cyan-400', glow: 'from-cyan-500/30', rarity: 'Epic', mult: 3.2, anime: 'animate-bounce' },
  'arc.png': { label: 'Ether Mage', stamina: 65, intel: 100, speed: 80, color: 'text-purple-400', glow: 'from-purple-600/30', rarity: 'Mystic', mult: 4.5, anime: 'animate-pulse' },
  'street.png': { label: 'Vandal', stamina: 90, intel: 82, speed: 90, color: 'text-pink-400', glow: 'from-pink-500/30', rarity: 'Uncommon', mult: 1.5, anime: 'animate-bounce' },
  'waste.png': { label: 'Raider', stamina: 99, intel: 75, speed: 82, color: 'text-orange-500', glow: 'from-orange-600/30', rarity: 'Rare', mult: 2.2, anime: 'animate-bounce' },
  'steam.png': { label: 'Steam Punk', stamina: 82, intel: 90, speed: 70, color: 'text-amber-600', glow: 'from-amber-700/30', rarity: 'Rare', mult: 2.1, anime: 'animate-bounce' },
  'TMA.png': { label: 'TMA 420', stamina: 42, intel: 99, speed: 42, color: 'text-emerald-400', glow: 'from-emerald-500/40', rarity: 'Exotic', mult: 4.2, anime: 'animate-pulse' },
  'Retro.png': { label: 'Retro Gamer', stamina: 88, intel: 92, speed: 95, color: 'text-red-400', glow: 'from-red-500/40', rarity: 'Rare', mult: 2.0, anime: 'animate-bounce' },
  'ssheyii.png': { label: 'Ssheyii 1/1', stamina: 100, intel: 100, speed: 100, color: 'text-rose-500', glow: 'from-rose-600/40', rarity: 'Artifact', mult: 10.0, anime: 'animate-bounce' },
  'gold-shell.png': { label: 'GOLDEN SHELL', stamina: 999, intel: 999, speed: 999, color: 'text-yellow-200', glow: 'from-yellow-400/60', rarity: 'God-Mode', mult: 50.0, anime: 'animate-pulse' },
};

export default function ShellmatesOS() {
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState("");
  const [sync, setSync] = useState(false);
  const [trait, setTrait] = useState('shellmate.png.JPG');
  const [xp, setXp] = useState(0);
  const [logs, setLogs] = useState<string[]>(["SYSTEM BOOTED", "NEURAL LINK WAITING..."]);
  const [isScanning, setIsScanning] = useState(false);

  const fullStory = `Ty0xide once said: "Several people have told me not to drop my project yet. 'The markets aren't ready.'\n\nI am creating something I love. I have extreme passion for it and I'm going to begin when I feel ready, not the markets."\n\nHe said again: "For me, building is what makes me happy. Some of my irl friends think I don't enjoy life enough and my screen time would agree 😂 but..\n\never since I wrote this idea down 6 months ago, I've been smiling. I guess the conclusion is, do what makes you happy.\n\nAnd for me right now, it's NFTs. Building something that outlives cycles."`;

  const active = TRAITS[trait] || TRAITS['shellmate.png.JPG'];

  // --- TYPEWRITER ENGINE ---
  useEffect(() => {
    if (showIntro) {
      let i = 0;
      const interval = setInterval(() => {
        setIntroText(fullStory.slice(0, i));
        i++;
        if (i > fullStory.length) clearInterval(interval);
      }, 30); // Clean typing speed
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  useEffect(() => {
    const savedXp = localStorage.getItem('shell_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  const pushLog = useCallback((msg: string) => { setLogs(prev => [msg, ...prev].slice(0, 4)); }, []);

  // --- 1. THE ADVENTURE PROLOGUE SCREEN ---
  if (showIntro) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-3xl space-y-12">
          {/* THE NARRATOR */}
          <img 
            src="/gold-shell.png" 
            className="w-40 md:w-56 mx-auto animate-pulse drop-shadow-[0_0_50px_rgba(234,179,8,0.2)]" 
            alt="Founder Vision"
          />
          
          <div className="min-h-[280px] flex flex-col justify-center">
            <p className="text-zinc-300 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap italic">
              {introText}
              <span className="inline-block w-2 h-5 bg-yellow-500 ml-2 animate-ping" />
            </p>
          </div>

          {/* THE GATEWAY */}
          <div className={`transition-all duration-1000 ${introText.length >= fullStory.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={() => setShowIntro(false)}
              className="group relative px-12 py-5 overflow-hidden border border-yellow-500/50 rounded-full"
            >
              <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-all" />
              <span className="relative text-yellow-500 font-black uppercase text-[10px] tracking-[0.4em]">Initialize Shell OS</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- 2. THE MAIN OS INTERFACE ---
  return (
    <main className="min-h-screen bg-[#020306] text-white font-mono p-4 lg:p-10 overflow-hidden">
      <div className={`fixed inset-0 bg-gradient-radial ${active.glow} to-transparent opacity-40 transition-all duration-1000 pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        
        {/* LEFT: THE STAGE */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-zinc-900/30 border border-white/10 rounded-[60px] p-12 aspect-square flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            
            {/* AMBIENT STAGE LIGHT */}
            <div className={`absolute bottom-[-10%] w-[130%] h-[35%] bg-gradient-to-t ${active.glow} to-transparent opacity-70 blur-3xl rounded-full transition-all duration-1000`} />
            
            {/* BRANDING / SECRET BUTTON */}
            <div onClick={() => { setTrait('gold-shell.png'); pushLog("FOUNDER MODE ACTIVE"); }} className="absolute top-10 left-10 cursor-pointer group">
              <h2 className="text-[10px] font-black tracking-[0.5em] text-zinc-600 group-hover:text-blue-400 transition-colors uppercase">Shellmates // OS</h2>
            </div>
            
            {/* THE CHARACTER */}
            <img 
              key={trait} 
              src={`/${trait}`} 
              className={`w-4/5 object-contain transition-all duration-1000 z-20 
                ${sync ? `scale-110 drop-shadow-[0_0_60px_rgba(255,255,255,0.1)] ${active.anime}` : 'grayscale opacity-5 blur-3xl'}`}
              style={{ animationDuration: '4s' }}
              onError={(e) => { e.currentTarget.src = "/shellmate.png.JPG"; }}
            />

            <div className="absolute bottom-12 right-12 text-right">
              <p className={`text-xs font-black uppercase tracking-widest ${active.color}`}>{active.rarity}</p>
              <p className="text-[8px] text-zinc-600 mt-2 font-bold tracking-widest uppercase">Sync Stability: Optmized</p>
            </div>
          </div>

          <div className="bg-black/90 border border-white/5 p-6 rounded-3xl h-32 flex flex-col justify-end shadow-inner">
            {logs.map((l, i) => (
              <p key={i} className={`text-[11px] mb-1 font-bold ${i === 0 ? 'text-blue-500' : 'text-zinc-800'}`}> {`> ${l}`} </p>
            ))}
          </div>
        </div>

        {/* RIGHT: THE CONTROLS */}
        <div className="lg:col-span-6 space-y-8">
          <header className="border-b border-white/5 pb-8 flex justify-between items-end">
            <div>
                <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">THE <span className={active.color}>SHELL</span></h1>
                <p className="text-[10px] text-zinc-600 tracking-[0.5em] font-bold mt-3 uppercase">Neural Signature Hub</p>
            </div>
            <div className="text-right">
                <span className="text-4xl font-black text-blue-500 tabular-nums italic">{xp.toLocaleString()} <span className="text-xs text-zinc-600 not-italic">XP</span></span>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => { setSync(!sync); pushLog(sync ? "BRIDGE DISCONNECTED" : "NEURAL BRIDGE SECURED"); }} className={`py-8 rounded-[30px] font-black uppercase text-xs tracking-widest transition-all ${sync ? 'bg-blue-600 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : 'bg-zinc-900 text-zinc-700 border border-white/5'}`}>
              {sync ? 'SYNC ACTIVE' : 'CONNECT'}
            </button>
            <button disabled={!sync || isScanning} onClick={() => { setIsScanning(true); pushLog("DATA HARVESTING..."); setTimeout(() => { setXp(v => v + 500); setIsScanning(false); pushLog("YIELD SECURED"); }, 1200); }} className="bg-white text-black py-8 rounded-[30px] font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-10">
              {isScanning ? 'SCANNING...' : 'NETWORK HARVEST'}
            </button>
          </div>

          {/* COMPACT TRAIT GRID */}
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(TRAITS).filter(([id]) => id !== 'gold-shell.png').map(([id, data]) => (
              <button 
                key={id} 
                onClick={() => { setTrait(id); pushLog(`SIGNAL: ${data.label.toUpperCase()}`); }} 
                className={`p-4 rounded-2xl text-[9px] font-black border transition-all ${trait === id ? 'bg-white text-black scale-105 border-white shadow-xl' : 'bg-zinc-900/50 border-white/5 text-zinc-700 hover:text-white'}`}
              >
                {data.label}
              </button>
            ))}
          </div>

          {/* STATS BARS */}
          <div className="bg-zinc-900/20 border border-white/5 rounded-[40px] p-10 space-y-6 backdrop-blur-xl">
            {[ { l: 'STAMINA', v: active.stamina }, { l: 'INTELLECT', v: active.intel }, { l: 'SPEED', v: active.speed } ].map(s => (
              <div key={s.l} className="space-y-3">
                <div className="flex justify-between items-end"><p className="text-[10px] text-zinc-600 font-black tracking-widest">{s.l}</p><p className="text-xl font-black">{sync ? `${s.v}%` : '??%'}</p></div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full transition-all duration-1000 ${active.color.replace('text', 'bg')}`} style={{ width: sync ? `${s.v}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

