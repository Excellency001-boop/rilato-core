"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const [sync, setSync] = useState(false);
  const [trait, setTrait] = useState('shellmate.png.JPG');
  const [xp, setXp] = useState(0);
  const [logs, setLogs] = useState<string[]>(["SYSTEM READY", "NEURAL LINK WAITING..."]);
  const [isScanning, setIsScanning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const active = TRAITS[trait] || TRAITS['shellmate.png.JPG'];

  useEffect(() => {
    const savedXp = localStorage.getItem('shell_xp');
    if (savedXp) setXp(parseInt(savedXp));
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => { localStorage.setItem('shell_xp', xp.toString()); }, [xp]);

  const pushLog = useCallback((msg: string) => { setLogs(prev => [msg, ...prev].slice(0, 4)); }, []);

  return (
    <main className="min-h-screen bg-[#020306] text-white font-mono p-4 lg:p-10 overflow-hidden cursor-none">
      {/* CUSTOM CURSOR */}
      <div className="fixed w-6 h-6 border border-white/20 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-75" style={{ left: mousePos.x, top: mousePos.y }}>
        <div className={`w-1 h-1 rounded-full ${sync ? 'bg-blue-500 shadow-[0_0_15px_#3b82f6]' : 'bg-white/40'}`} />
      </div>

      {/* DYNAMIC ATMOSPHERE */}
      <div className={`fixed inset-0 bg-gradient-radial ${active.glow} to-transparent opacity-40 transition-all duration-1000 pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        
        {/* CHARACTER SECTION - THE STAGE */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-zinc-900/30 border border-white/10 rounded-[60px] p-12 aspect-square flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            
            {/* STAGE LIGHTS & PEDESTAL */}
            <div className={`absolute bottom-[-10%] w-[120%] h-[30%] bg-gradient-to-t ${active.glow} to-transparent opacity-60 blur-3xl rounded-full`} />
            <div className="absolute bottom-12 w-48 h-4 bg-black/40 blur-xl rounded-full" /> {/* Shadow beneath turtle */}

            {/* NEURAL HUD OVERLAY (Only shows when synced) */}
            {sync && (
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-10 rounded-[40px] overflow-hidden">
                <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-white/20" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 animate-pulse" />
              </div>
            )}

            <div onClick={() => { setTrait('gold-shell.png'); pushLog("SECRET PROTOCOL ACTIVATED"); }} className="absolute top-10 left-10 cursor-pointer z-50">
              <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-500/50 hover:text-blue-400 transition-colors">OS_LINK_V2.8</h2>
            </div>
            
            {/* THE ANIMATED CHARACTER */}
            <img 
              key={trait} 
              src={`/${trait}`} 
              className={`w-4/5 object-contain transition-all duration-1000 z-20 
                ${sync ? `scale-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] ${active.anime}` : 'grayscale opacity-5 blur-2xl translate-y-10'}`}
              style={{ animationDuration: '3s' }}
              onError={(e) => { e.currentTarget.src = "/shellmate.png.JPG"; }}
            />

            <div className="absolute bottom-12 right-12 text-right">
              <p className={`text-xs font-black uppercase tracking-widest ${active.color}`}>{active.rarity}</p>
              <p className="text-[8px] text-white/20 mt-1 uppercase">Neural Stability: 99.9%</p>
            </div>
          </div>

          <div className="bg-black/90 border border-white/5 p-6 rounded-3xl h-32 flex flex-col justify-end">
            {logs.map((l, i) => (
              <p key={i} className={`text-[11px] mb-1 font-bold ${i === 0 ? 'text-blue-500' : 'text-zinc-800'}`}> {`> ${l}`} </p>
            ))}
          </div>
        </div>

        {/* CONTROLS SECTION */}
        <div className="lg:col-span-6 space-y-8">
          <header className="border-b border-white/5 pb-8">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase">THE <span className={active.color}>SHELL</span></h1>
            <div className="flex justify-between items-center mt-4">
               <p className="text-[10px] text-zinc-600 tracking-[0.5em] font-bold uppercase">Ayo_xtt // Protocol</p>
               <div className="text-right">
                  <span className="text-4xl font-black text-blue-500 tabular-nums italic">{xp.toLocaleString()} <span className="text-xs not-italic text-zinc-600">XP</span></span>
               </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => { setSync(!sync); pushLog(sync ? "OFFLINE" : "BRIDGE ACTIVE"); }} className={`py-8 rounded-[30px] font-black uppercase text-xs tracking-widest transition-all ${sync ? 'bg-blue-600 shadow-[0_0_40px_rgba(59,130,246,0.3)] border-t border-white/20' : 'bg-zinc-900 text-zinc-700 border border-white/5'}`}>
              {sync ? 'NEURAL SYNC ON' : 'CONNECT BRAIN'}
            </button>
            <button disabled={!sync || isScanning} onClick={() => { setIsScanning(true); pushLog("SCANNING..."); setTimeout(() => { setXp(v => v + 350); setIsScanning(false); pushLog("HARVEST COMPLETE"); }, 1200); }} className="bg-white text-black py-8 rounded-[30px] font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-10">
              {isScanning ? 'SCANNING...' : 'DATA HARVEST'}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {Object.entries(TRAITS).filter(([id]) => id !== 'gold-shell.png').map(([id, data]) => (
              <button 
                key={id} 
                onClick={() => { setTrait(id); pushLog(`SWITCHED TO ${data.label.toUpperCase()}`); }} 
                className={`p-4 rounded-2xl text-[9px] font-black border transition-all ${trait === id ? 'bg-white text-black scale-105 border-white shadow-xl' : 'bg-zinc-900/50 border-white/5 text-zinc-600 hover:text-white'}`}
              >
                {data.label}
              </button>
            ))}
          </div>

          {/* DETAILED STATS BARS */}
          <div className="bg-zinc-900/20 border border-white/5 rounded-[40px] p-10 space-y-8 backdrop-blur-xl shadow-inner">
            {[ { l: 'STAMINA CORE', v: active.stamina }, { l: 'INTELLECT ENGINE', v: active.intel }, { l: 'SPEED KINETICS', v: active.speed } ].map(s => (
              <div key={s.l} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-zinc-600 font-black tracking-[0.2em]">{s.l}</p>
                  <p className="text-xl font-black italic">{sync ? `${s.v}%` : '??%'}</p>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${active.color.replace('text', 'bg')} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} style={{ width: sync ? `${s.v}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

