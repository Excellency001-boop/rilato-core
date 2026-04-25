"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RilatoUltimateSystem() {
  const [guess, setGuess] = useState("");
  const [level, setLevel] = useState(1);
  const [terminalOutput, setTerminalOutput] = useState("SYSTEM ENCRYPTED. INPUT LEVEL 1 SIGNAL...");
  const [stage, setStage] = useState("terminal"); // "terminal", "carousel", "archive"
  const [isProcessing, setIsProcessing] = useState(false);

  const archiveSecrets = {
    1: { key: "MIMESIS", fact: "MIMESIS UNLOCKED: The interface is a mirror. Perception is the only reality.", next: "INPUT 'MODERNITY' FOR LEVEL 2..." },
    2: { key: "MODERNITY", fact: "MODERNITY SHATTERED: Objects are dead. Only the digital process remains.", next: "INPUT 'UNISON' FOR FINAL ACCESS..." },
    3: { key: "UNISON", fact: "UNISON ACHIEVED: Boundary dissolved. WELCOME HOME.", next: "INITIATING CELEBRATION SEQUENCE..." }
  };

  const handleSync = () => {
    const current = archiveSecrets[level as keyof typeof archiveSecrets];
    if (guess.toUpperCase() === current.key) {
      setIsProcessing(true);
      setTerminalOutput(current.fact);
      setTimeout(() => {
        if (level < 3) {
          setLevel(level + 1);
          setGuess("");
          setIsProcessing(false);
          setTerminalOutput(archiveSecrets[(level + 1) as keyof typeof archiveSecrets].next);
        } else {
          setStage("carousel");
          setTimeout(() => setStage("archive"), 5000); 
        }
      }, 3000);
    } else {
      setTerminalOutput("SIGNAL REJECTED. CHECK WORKING NOTES.");
    }
  };

  const carouselImages = ["note-1.png", "note-2.png", "note-3.png", "note-10.png", "note-12.png", "panel-1.png", "panel-2.png"];

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-x-hidden">
      
      <AnimatePresence mode="wait">
        {stage === "terminal" && (
          <motion.div key="terminal" exit={{ opacity: 0, scale: 0.8 }} className="h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-red-600 font-black tracking-tighter">LVL_0{level}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.5em] animate-pulse">Neural Sync Active</span>
                </div>
                <div className={`p-8 border-2 ${isProcessing ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5'} min-h-[160px] relative`}>
                   <p className={`text-xs font-bold leading-relaxed ${isProcessing ? 'text-green-500' : 'text-white'}`}>
                     {">"} {terminalOutput}
                   </p>
                   {isProcessing && <div className="absolute bottom-2 right-2 text-[8px] animate-bounce">DECRYPTING...</div>}
                </div>
                <div className="flex gap-2">
                  <input value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSync()}
                    className="bg-black border-2 border-white/10 p-4 w-full text-sm font-black focus:border-red-600 outline-none transition-all" placeholder="INPUT CLEARANCE..." />
                  <button onClick={handleSync} className="bg-white text-black px-8 font-black text-xs hover:bg-red-600 hover:text-white transition-all transform skew-x-[-10deg]">SYNC</button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className={`absolute inset-0 blur-[100px] transition-colors ${isProcessing ? 'bg-green-500/20' : 'bg-red-600/10'}`} />
                <motion.img animate={isProcessing ? { rotate: 360, scale: 1.2 } : { rotate: 0 }} src="/rilato-assets/unison.png" className="w-80 invert brightness-200 z-10" />
              </div>
            </div>
          </motion.div>
        )}

        {stage === "carousel" && (
          <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex items-center justify-center relative bg-[radial-gradient(circle,rgba(255,0,0,0.2),transparent)]">
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-center z-50 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              WELCOME TO <br/><span className="text-red-600">RILATO</span>
            </h2>
            {carouselImages.map((img, i) => (
              <motion.img
                key={i}
                src={`/rilato-assets/${img}`}
                className="absolute w-32 md:w-48 grayscale-0 border-2 border-white shadow-2xl"
                animate={{
                  rotate: [0, 360],
                  x: [Math.cos(i) * 300, Math.cos(i + 6.28) * 300],
                  y: [Math.sin(i) * 300, Math.sin(i + 6.28) * 300],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </motion.div>
        )}

        {stage === "archive" && (
          <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
            <section className="h-screen flex flex-col items-center justify-center text-center space-y-12">
               <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-[120px]" />
                  <img src="/rilato-assets/hero-workstation.png" className="w-[650px] border border-white/20 relative z-10" />
               </motion.div>
               <h1 className="text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white">RILATO</h1>
            </section>

            <section className="max-w-6xl mx-auto space-y-64 py-40 px-6">
              {[
                { id: 1, title: "The End of Modernity", fact: "Modernity ends when the object is replaced by a process. We track the movement, not the thing." },
                { id: 2, title: "Interface for the Psyche", fact: "A transparent, structured mode where one observes their own psyche in real time." },
                { id: 3, title: "Mimesis of Psyche", fact: "Copying the way the mind perceives nature, rather than copying nature itself." },
                { id: 10, title: "Language of Perception", fact: "Technical threads and on-chain research are the new poetry of the digital age." },
                { id: 12, title: "Aesthetic Approach", fact: "A living system where visual chaos signals deep structural health and integration." }
              ].map((note, i) => (
                <motion.div key={note.id} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} transition={{ duration: 0.8 }}
                  className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 items-center`}>
                  <div className="flex-1 space-y-8">
                    <div className="inline-block bg-red-600 text-white text-[10px] px-4 py-1 font-black tracking-widest">DATA_STREAM_00{note.id}</div>
                    <h3 className="text-6xl font-black italic uppercase tracking-tighter">{note.title}</h3>
                    <div className="relative p-8 border-l-4 border-red-600 bg-white/5 backdrop-blur-sm">
                      <p className="text-gray-300 text-lg leading-relaxed font-light italic">"{note.fact}"</p>
                    </div>
                  </div>
                  <img src={`/rilato-assets/note-${note.id}.png`} className="flex-1 w-full border-4 border-white shadow-[20px_20px_0px_rgba(220,38,38,1)]" />
                </motion.div>
              ))}
            </section>

            <section className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-12">
                <h2 className="text-8xl font-black italic tracking-tighter mb-12 uppercase text-center">Possible Scenario</h2>
                <img src="/rilato-assets/scenario.png" className="max-w-5xl w-full border-8 border-black mb-12 shadow-[30px_30px_0px_rgba(0,0,0,0.1)]" />
                <a href="https://x.com/0xProportio" target="_blank" className="bg-black text-white px-20 py-10 font-black text-2xl hover:bg-red-600 transition-all transform hover:scale-110 active:scale-95">
                  CHECK_BADGE
                </a>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}