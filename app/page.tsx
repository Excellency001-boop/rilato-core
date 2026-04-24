"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- THE DATA CORE ---
const TRAITS: Record<string, { label: string, stamina: number, intel: number, speed: number, color: string, glow: string, rarity: string, mult: number }> = {
  'shellmate.png.JPG': { label: 'Base Unit', stamina: 88, intel: 85, speed: 82, color: 'text-blue-400', glow: 'from-blue-600/20', rarity: 'Standard', mult: 1.0 },
  'crown.png': { label: 'Royal King', stamina: 82, intel: 99, speed: 75, color: 'text-yellow-400', glow: 'from-yellow-500/30', rarity: 'Legendary', mult: 5.0 },
  'ninja.png': { label: 'Shinobi', stamina: 92, intel: 88, speed: 100, color: 'text-zinc-400', glow: 'from-zinc-500/20', rarity: 'Rare', mult: 2.5 },
  'cyber.png': { label: 'Cyber Runner', stamina: 85, intel: 95, speed: 95, color: 'text-cyan-400', glow: 'from-cyan-500/30', rarity: 'Epic', mult: 3.2 },
  'arc.png': { label: 'Ether Mage', stamina: 65, intel: 100, speed: 80, color: 'text-purple-400', glow: 'from-purple-600/30', rarity: 'Mystic', mult: 4.5 },
  'street.png': { label: 'Vandal', stamina: 90, intel: 82, speed: 90, color: 'text-pink-400', glow: 'from-pink-500/30', rarity: 'Uncommon', mult: 1.5 },
  'waste.png': { label: 'Raider', stamina: 99, intel: 75, speed: 82, color: 'text-orange-500', glow: 'from-orange-600/30', rarity: 'Rare', mult: 2.2 },
  'steam.png': { label: 'Steampunk', stamina: 82, intel: 90, speed: 70, color: 'text-amber-600', glow: 'from-amber-700/30', rarity: 'Rare', mult: 2.1 },
  'TMA.png': { label: 'TMA 420', stamina: 42, intel: 99, speed: 42, color: 'text-emerald-400', glow: 'from-emerald-500/40', rarity: 'Exotic', mult: 4.2 },
  'Retro.png': { label: 'Retro Gamer', stamina: 88, intel: 92, speed: 95, color: 'text-red-400', glow: 'from-red-500/40', rarity: 'Rare', mult: 2.0 },
  'ssheyii.png': { label: 'Ssheyii 1/1', stamina: 100, intel: 100, speed: 100, color: 'text-rose-500', glow: 'from-rose-600/40', rarity: 'Artifact', mult: 10.0 },
  'gold-shell.png': { label: 'GOLDEN SHELL', stamina: 999, intel: 999, speed: 999, color: 'text-yellow-200', glow: 'from-yellow-400/60', rarity: 'God-Mode', mult: 50.0 },
};

export default function ShellmatesOS() {
  const [sync, setSync] = useState(false);
  const [trait, setTrait] = useState('shellmate.png.JPG');
  const [xp, setXp] = useState(0);
  const [logs, setLogs] = useState<string[]>(["SYSTEM READY", "NEURAL LINK WAITING..."]);
  const [isScanning, setIsScanning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [achievement, setAchievement] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const active = TRAITS[trait] || TRAITS['shellmate.png.JPG'];

  // --- BRAIN LOGIC ---
  useEffect(() => {
    const savedXp = localStorage.getItem('shell_xp');
    if (savedXp) setXp(parseInt(savedXp));
    
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    localStorage.setItem('shell_xp', xp.toString());
    if (xp >= 10000 && !achievement) {
      setAchievement("UNLOCKED: SHELL MASTER 🐢");
      setTimeout(() => setAchievement(null), 5000);
    }
  }, [xp]);

  const pushLog = useCallback((msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) audioRef.current = new Audio('/bg-music.mp3');
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    audioRef.current.loop = true;
    setIsPlaying(!isPlaying);
    pushLog(isPlaying ? "AUDIO TERMINATED" : "AMBIENCE INITIALIZED");
  };

  const triggerScan = () => {
    setIsScanning(true);
    pushLog("DEEP SCANNING...");
    setTimeout(() => {
      const bonus = Math.floor(Math.random() * 500 * active.mult);
      setXp(v => v + bonus);
      pushLog(`YIELD DETECTED: +${bonus} XP`);
      setIsScanning(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#020306] text-white font-mono p-4 lg:p-10 overflow-hidden cursor-none selection:bg-blue-500/30">
      
      {/* CUSTOM NEURAL CURSOR */}
      <div className="fixed w-6 h-6 border border-white/20 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-75" style={{ left: mousePos.x, top: mousePos.y }}>
        <div className={`w-1 h-1 rounded-full ${sync ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/40'}`} />
      </div>

      {/* ACHIEVEMENT NOTIFICATION */}
      {achievement && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900 border-2 border-blue-500 px-10 py-4 rounded-full animate-bounce shadow-[0_0_40px_rgba(59,130,246,0.5)]">
          <p className="text-xs font-black tracking-widest text-blue-400 uppercase italic">{achievement}</p>
        </div>
      )}

      {/* DYNAMIC BACKGROUND GLOW */}
      <div className={`fixed inset-0 bg-gradient-radial ${active.glow} to-transparent opacity-40 transition-all duration-1000 pointer-events-none`} />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* LEFT: CHARACTER HUB */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/40 border border-white/10 rounded-[40px] p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-2xl group shadow-2xl">
            
            {/* HIDDEN LOGO BUTTON (EASTER EGG) */}
            <div onClick={() => { setTrait('gold-shell.png'); pushLog("SECRET PROTOCOL ACTIVATED"); }} className="absolute top-8 left-8 cursor-pointer opacity-10 hover:opacity-100 transition-opacity">
              <h2 className="text-[10px] font-black tracking-tighter">SHELL_OS_V2.7</h2>
            </div>
            
            <img 
              src={`/${trait}`} 
              className={`w-4/5 object-contain transition-all duration-1000 ${sync ? 'scale-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]' : 'grayscale opacity-10 blur-2xl'}`}
              onError={(e) => { e.currentTarget.src = "/shellmate.png.JPG"; }}
            />

            <div className="absolute bottom-10 right-10 text-right">
              <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${active.color}`}>{active.rarity}</p>
              <div className="flex gap-1.5 justify-end">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-4 h-1 rounded-full transition-colors duration-500 ${i < (active.mult) ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/5'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/80 border border-white/5 p-6 rounded-3xl h-36 flex flex-col justify-end shadow-inner">
            {logs.map((l, i) => (
              <p key={i} className={`text-[11px] mb-1 font-bold ${i === 0 ? 'text-blue-400' : 'text-zinc-700'}`}> {`> ${l}`} </p>
            ))}
          </div>
        </div>

        {/* RIGHT: INTERFACE CONTROLS */}
        <div className="lg:col-span-7 space-y-8">
          <header className="flex justify-between items-center border-b border-white/5 pb-8">
            <div className="flex items-center gap-6">
              <button onClick={toggleMusic} className={`w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isPlaying ? 'bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] border-blue-400' : 'bg-zinc-900'}`}>
                {isPlaying ? '🔊' : '🔈'}
              </button>
              <div>
                <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">THE <span className={active.color}>SHELL</span></h1>
                <p className="text-[10px] text-zinc-500 mt-2 tracking-[0.5em] font-bold">NEURAL_OS // BY AYO_XTT</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-600 block font-black mb-1">TOTAL_XP_SYNCED</span>
              <span className="text-5xl font-black text-blue-500 italic tabular-nums shadow-blue-500/20">{xp.toLocaleString()}</span>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => { setSync(!sync); pushLog(sync ? "CONNECTION SEVERED" : "NEURAL BRIDGE ACTIVE"); }} className={`py-6 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all ${sync ? 'bg-blue-600 shadow-2xl border-t border-white/20' : 'bg-zinc-900 text-zinc-600 border border-white/5 hover:border-white/20'}`}>
              {sync ? 'SYSTEM ONLINE' : 'INITIALIZE SYNC'}
            </button>
            <button disabled={!sync || isScanning} onClick={triggerScan} className="bg-white text-black py-6 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all hover:bg-blue-500 hover:text-white disabled:opacity-10">
              {isScanning ? 'SCANNING...' : 'NETWORK HARVEST'}
            </button>
          </div>

          {/* TRAIT SELECTOR GRID */}
          <div className="grid grid-cols-4 gap-2.5">
            {Object.entries(TRAITS).filter(([id]) => id !== 'gold-shell.png').map(([id, data]) => (
              <button 
                key={id} 
                onClick={() => { setTrait(id); pushLog(`LOADED: ${data.label.toUpperCase()}`); setXp(v => v + 25); }} 
                className={`p-4 rounded-2xl text-[9px] font-black border transition-all ${trait === id ? 'bg-white text-black border-white shadow-xl' : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:bg-zinc-800'}`}
              >
                {data.label}
              </button>
            ))}
          </div>

          {/* STATS AREA */}
          <div className="bg-zinc-900/20 border border-white/5 rounded-[32px] p-10 grid grid-cols-3 gap-12 backdrop-blur-md">
            {[ { l: 'STAMINA', v: active.stamina }, { l: 'INTEL', v: active.intel }, { l: 'SPEED', v: active.speed } ].map(s => (
              <div key={s.l} className="space-y-4">
                <p className="text-[10px] text-zinc-600 font-black tracking-widest">{s.l}</p>
                <p className="text-4xl font-black italic tabular-nums">{sync ? `${s.v}%` : '--'}</p>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 bg-blue-500 shadow-[0_0_10px_#3b82f6]`} style={{ width: sync ? `${Math.min(s.v, 100)}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              const text = `Shellmates OS Neural Link: ACTIVE 🐢\nXP: ${xp}\nLevel: ${active.rarity}\n\nBuild by @Ayo_xtt\n\nLink: shellmate-os.vercel.app`;
              window.open(`x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
            }} 
            className="w-full py-6 bg-[#1DA1F2] rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:shadow-[0_0_40px_rgba(29,161,242,0.4)] transition-all active:scale-95"
          >
            Broadcast Neural Signature
          </button>
        </div>
      </div>
    </main>
  );
}
