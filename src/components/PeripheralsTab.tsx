/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PC_PERIPHERALS, PeripheralInfo } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Keyboard, MousePointer, Volume2, Printer, Cable, HelpCircle, ArrowRight } from "lucide-react";

export default function PeripheralsTab() {
  const [selectedPeripheralId, setSelectedPeripheralId] = useState<string>("monitor");

  const selectedPeripheral = PC_PERIPHERALS.find(p => p.id === selectedPeripheralId) || PC_PERIPHERALS[0];

  // Map icon strings to Lucide components
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Monitor":
        return <Monitor className={className} />;
      case "Keyboard":
        return <Keyboard className={className} />;
      case "MousePointer":
        return <MousePointer className={className} />;
      case "Volume2":
        return <Volume2 className={className} />;
      case "Printer":
        return <Printer className={className} />;
      default:
        return <Monitor className={className} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[620px] items-stretch" id="peripherals-root">
      {/* Visual Desk Setup / Cable Map (Left, span 6) */}
      <div className="lg:col-span-6 flex flex-col h-full min-0">
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative flex-1 flex flex-col justify-between overflow-hidden min-h-[440px]">
          {/* Decorative Grid Wall */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(8,145,178,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Setup Header */}
          <div className="z-10 flex justify-between items-center mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-405 font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-805 flex items-center">
                <Cable className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                Interaktywny Schemat Połączeń
              </span>
              <h2 className="text-lg font-bold text-white mt-1.5">Makieta Stanowiska Desktop</h2>
            </div>
          </div>

          {/* Interactive Visual Setup Canvas - Vector Scalable Mockup to prevent overflow */}
          <div className="flex-1 flex items-center justify-center relative my-4 w-full h-full min-h-[300px] xl:min-h-[350px] z-10 select-none" id="desk-canvas-container">
            <style>{`
              @keyframes cable-dash {
                to {
                  stroke-dashoffset: -40;
                }
              }
              .cable-active {
                stroke-dasharray: 6, 8;
                animation: cable-dash 1.8s linear infinite;
              }
            `}</style>

            <svg 
              viewBox="0 0 600 350" 
              className="w-full h-full max-h-[350px] aspect-[600/350]"
              id="desk-interactive-svg"
            >
              {/* Back Wall radial glow */}
              <defs>
                <radialGradient id="back-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.16)" />
                  <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
                </radialGradient>
                <linearGradient id="desk-wood" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="350" fill="url(#back-glow)" rx="16" />

              {/* Wooden Desk Plate */}
              <rect x="10" y="295" width="580" height="15" rx="4" fill="url(#desk-wood)" stroke="#92400e" strokeWidth="1" className="drop-shadow-lg" />
              <rect x="30" y="310" width="540" height="15" rx="4" fill="#090d16" opacity="0.4" />

              {/* CABLES UNDERPERIPHERAL ROUTING */}
              {/* Monitor Connection */}
              <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              {selectedPeripheralId === "monitor" && (
                <>
                  <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" className="cable-active" />
                </>
              )}

              {/* Keyboard Connection */}
              <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
              {selectedPeripheralId === "keyboard" && (
                <>
                  <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                </>
              )}

              {/* Mouse Connection */}
              <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
              {selectedPeripheralId === "mouse" && (
                <>
                  <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                </>
              )}

              {/* Audio Speakers Connection */}
              <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
              {selectedPeripheralId === "audio" && (
                <>
                  <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                </>
              )}

              {/* Printer Connection */}
              <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
              {selectedPeripheralId === "printer" && (
                <>
                  <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                </>
              )}


              {/* 1. PC TOWER CASE REPRESENTATION (CONNECTION TARGET) */}
              <g className="transition-all duration-300">
                {/* Tower Outer Body */}
                <rect x="480" y="100" width="80" height="200" rx="12" fill="#030712" stroke="#1e293b" strokeWidth="2.5" className="drop-shadow-2xl" />
                
                {/* Side Glass Window panel preview */}
                <rect x="486" y="108" width="68" height="150" rx="6" fill="#080c14" stroke="#334155" strokeWidth="1" />
                
                {/* Motherboard tracks mockup design */}
                <path d="M 495,115 L 535,115 L 535,145 M 510,130 L 510,170 C 510,170 518,170 530,170" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" fill="none" />
                <circle cx="535" cy="145" r="3" fill="#22d3ee" className="animate-ping" style={{ transformOrigin: '535px 145px', animationDuration: '3s' }} />
                <circle cx="535" cy="145" r="1.5" fill="#22d3ee" />
                <circle cx="530" cy="170" r="2" fill="#a855f7" />
                
                {/* Core components layout blocks */}
                <rect x="495" y="125" width="3" height="15" fill="#06b6d4" opacity="0.9" />
                <rect x="501" y="125" width="3" height="15" fill="#06b6d4" opacity="0.9" />
                
                {/* GPU Active cooling fans illustration */}
                <rect x="492" y="180" width="56" height="18" rx="4" fill="rgba(168, 85, 247, 0.08)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
                <circle cx="510" cy="189" r="6" fill="none" stroke="#a855f7" strokeWidth="1.2" className="animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '510px 189px' }} />
                <circle cx="530" cy="189" r="6" fill="none" stroke="#a855f7" strokeWidth="1.2" className="animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '530px 189px' }} />

                {/* Back Plate Input/Output markers */}
                <rect x="477" y="140" width="4" height="60" rx="1" fill="#475569" />
                
                {/* Running LED */}
                <circle cx="545" cy="280" r="1.8" fill="#10b981" className="animate-pulse" />
                <text x="500" y="282" fill="#64748b" fontSize="6px" fontFamily="monospace" fontWeight="bold">PC RUNNING</text>
              </g>


              {/* 2. MONITOR REPRESENTATION (INTERACTIVE) */}
              {selectedPeripheralId === "monitor" && (
                <rect x="135" y="75" width="210" height="140" rx="18" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="3" className="animate-pulse" />
              )}
              <g 
                onClick={() => setSelectedPeripheralId("monitor")} 
                id="desk-monitor"
                className="cursor-pointer group select-none transition-all duration-300"
              >
                {/* Foot and Stand */}
                <rect x="230" y="210" width="20" height="70" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <polygon points="210,280 270,280 265,270 215,270" fill="#0f172a" stroke="#1e293b" />
                
                {/* Main Frame Bezel */}
                <rect 
                  x="140" 
                  y="80" 
                  width="200" 
                  height="130" 
                  rx="14" 
                  fill={selectedPeripheralId === "monitor" ? "rgba(6, 182, 212, 0.05)" : "#090d16"} 
                  stroke={selectedPeripheralId === "monitor" ? "#06b6d4" : "#1e293b"} 
                  strokeWidth={selectedPeripheralId === "monitor" ? "3" : "2"} 
                />
                
                {/* Inner screen glass box */}
                <rect x="146" y="86" width="188" height="110" rx="8" fill="#020617" />
                
                {/* Graphic layout inside screen */}
                <g opacity={selectedPeripheralId === "monitor" ? "1" : "0.55"}>
                  <path d="M 155,140 Q 240,110 325,140 M 155,170 Q 240,135 325,165" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
                  <text x="158" y="108" fill="#22d3ee" fontSize="8.5px" fontFamily="monospace" fontWeight="bold">ATLAS MONITOR ONLINE</text>
                  <text x="158" y="121" fill="#475569" fontSize="6.5px" fontFamily="monospace">Refresh: 144Hz IPS</text>
                  <text x="158" y="131" fill="#475569" fontSize="6.5px" fontFamily="monospace">Signal: HDMI Digital</text>
                  
                  {/* Circle graph rendering */}
                  <circle cx="285" cy="122" r="15" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="2.5" />
                  <circle cx="285" cy="122" r="15" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="50,100" className="animate-[spin_8s_linear_infinite]" style={{ transformOrigin: '285px 122px' }} />
                  <text x="285" y="125" fill="#ffffff" fontSize="6.5px" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OK</text>
                </g>

                {/* Pulsing signal LED */}
                <circle cx="328" cy="202" r="1.8" fill="#22d3ee" className="animate-pulse" />
                
                {/* Embedded dynamic tag */}
                <rect x="205" y="180" width="70" height="13" rx="4.5" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="1" />
                <text x="240" y="189" fill={selectedPeripheralId === "monitor" ? "#22d3ee" : "#94a3b8"} fontSize="7px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  Monitor (HDMI)
                </text>
              </g>


              {/* 3. KEYBOARD REPRESENTATION (INTERACTIVE) */}
              {selectedPeripheralId === "keyboard" && (
                <rect x="140" y="250" width="160" height="42" rx="10" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="3" className="animate-pulse" />
              )}
              <g 
                onClick={() => setSelectedPeripheralId("keyboard")} 
                id="desk-keyboard"
                className="cursor-pointer group select-none transition-all duration-300"
              >
                {/* Keyboard body */}
                <rect 
                  x="145" 
                  y="255" 
                  width="150" 
                  height="32" 
                  rx="6" 
                  fill={selectedPeripheralId === "keyboard" ? "rgba(168, 85, 247, 0.15)" : "#090d16"} 
                  stroke={selectedPeripheralId === "keyboard" ? "#a855f7" : "#1e293b"} 
                  strokeWidth={selectedPeripheralId === "keyboard" ? "2" : "1.2"} 
                />
                
                {/* Keys row illustration */}
                <g opacity={selectedPeripheralId === "keyboard" ? "1" : "0.75"}>
                  <rect x="190" y="275" width="60" height="4" rx="1.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
                  <line x1="152" y1="262" x2="288" y2="262" stroke="#334155" strokeWidth="3" strokeDasharray="4,2" />
                  <line x1="152" y1="269" x2="288" y2="269" stroke="#334155" strokeWidth="3" strokeDasharray="3,1.5" />
                  <rect x="150" y="260" width="140" height="1.5" fill="none" stroke={selectedPeripheralId === "keyboard" ? "#a855f7" : "rgba(168, 85, 247, 0.25)"} strokeWidth="1" className="animate-pulse" />
                </g>
                <text x="220" y="249" fill={selectedPeripheralId === "keyboard" ? "#c084fc" : "#64748b"} fontSize="6.5px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">KLAWIATURA (USB)</text>
              </g>


              {/* 4. MOUSE REPRESENTATION (INTERACTIVE) */}
              {selectedPeripheralId === "mouse" && (
                <rect x="310" y="253" width="30" height="42" rx="12" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="3" className="animate-pulse" />
              )}
              <g 
                onClick={() => setSelectedPeripheralId("mouse")} 
                id="desk-mouse"
                className="cursor-pointer group select-none transition-all duration-300"
              >
                {/* Mouse Chassis */}
                <rect 
                  x="315" 
                  y="258" 
                  width="20" 
                  height="32" 
                  rx="10" 
                  fill={selectedPeripheralId === "mouse" ? "rgba(6, 182, 212, 0.15)" : "#090d16"} 
                  stroke={selectedPeripheralId === "mouse" ? "#06b6d4" : "#1e293b"} 
                  strokeWidth={selectedPeripheralId === "mouse" ? "2" : "1.2"} 
                />
                
                {/* Scroll track */}
                <line x1="325" y1="258" x2="325" y2="266" stroke="#475569" strokeWidth="1.2" />
                <circle cx="325" cy="265" r="1.5" fill={selectedPeripheralId === "mouse" ? "#22d3ee" : "#64748b"} />
                <text x="325" y="249" fill={selectedPeripheralId === "mouse" ? "#22d3ee" : "#64748b"} fontSize="6.5px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MYSZ</text>
              </g>


              {/* 5. GŁOŚNIKI AUDIO REPRESENTATION (INTERACTIVE) */}
              {selectedPeripheralId === "audio" && (
                <rect x="60" y="115" width="50" height="105" rx="12" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="3" className="animate-pulse" />
              )}
              <g 
                onClick={() => setSelectedPeripheralId("audio")} 
                id="desk-audio-speakers"
                className="cursor-pointer group select-none transition-all duration-300"
              >
                {/* Column Chassis structure */}
                <rect 
                  x="65" 
                  y="120" 
                  width="40" 
                  height="95" 
                  rx="8" 
                  fill={selectedPeripheralId === "audio" ? "rgba(6, 182, 212, 0.05)" : "#090d16"} 
                  stroke={selectedPeripheralId === "audio" ? "#06b6d4" : "#1e293b"} 
                  strokeWidth={selectedPeripheralId === "audio" ? "2" : "1.2"} 
                />
                
                {/* Membrane drivers layout */}
                <g opacity={selectedPeripheralId === "audio" ? "1" : "0.7"}>
                  <circle cx="85" cy="145" r="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                  <circle cx="85" cy="145" r="4" fill="#020617" stroke={selectedPeripheralId === "audio" ? "#22d3ee" : "transparent"} strokeWidth="1" className={selectedPeripheralId === "audio" ? "animate-ping" : ""} style={{ transformOrigin: '85px 145px', animationDuration: '3s' }} />
                  
                  <circle cx="85" cy="180" r="14" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                  <circle cx="85" cy="180" r="6" fill="#020617" stroke={selectedPeripheralId === "audio" ? "#22d3ee" : "transparent"} strokeWidth="1" className={selectedPeripheralId === "audio" ? "animate-pulse" : ""} style={{ transformOrigin: '85px 180px' }} />
                </g>
                <text x="85" y="109" fill={selectedPeripheralId === "audio" ? "#22d3ee" : "#64748b"} fontSize="6.5px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">GŁOŚNIK (JACK)</text>
              </g>


              {/* 6. PRINTER REPRESENTATION (INTERACTIVE) */}
              {selectedPeripheralId === "printer" && (
                <rect x="370" y="145" width="85" height="62" rx="12" fill="none" stroke="rgba(168, 85, 247, 0.15)" strokeWidth="3" className="animate-pulse" />
              )}
              <g 
                onClick={() => setSelectedPeripheralId("printer")} 
                id="desk-printer"
                className="cursor-pointer group select-none transition-all duration-300"
              >
                {/* Printer Body Box */}
                <rect 
                  x="375" 
                  y="150" 
                  width="75" 
                  height="52" 
                  rx="8" 
                  fill={selectedPeripheralId === "printer" ? "rgba(168, 85, 247, 0.05)" : "#090d16"} 
                  stroke={selectedPeripheralId === "printer" ? "#a855f7" : "#1e293b"} 
                  strokeWidth={selectedPeripheralId === "printer" ? "2" : "1.2"} 
                />
                
                {/* Paper feeds elements layout */}
                <rect x="387" y="140" width="50" height="20" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="382" y="180" width="60" height="5" rx="1.5" fill="#1e293b" />
                <rect x="390" y="184" width="44" height="15" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                <text x="412" y="193" fill="#64748b" fontSize="6px" fontFamily="monospace">PDF PRINT</text>
                <text x="412" y="131" fill={selectedPeripheralId === "printer" ? "#c084fc" : "#64748b"} fontSize="6.5px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DRUKARKA (USB)</text>
              </g>
            </svg>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/85 rounded-xl p-3.5 mt-2 flex items-center space-x-2 text-[11px] text-slate-400 z-10">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Kliknij sprzęt na makiecie biurka lub na liście obok, aby zobaczyć opis złączy kablowych.</span>
          </div>
        </div>
      </div>

      {/* Side Detail Card Panel & Selector List (Right, span 6) */}
      <div className="lg:col-span-6 flex flex-col h-full min-h-0 space-y-4">
        {/* Horizontal scroll select buttons list */}
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-2.5 flex space-x-2 overflow-x-auto shadow-md shrink-0">
          {PC_PERIPHERALS.map((p) => {
            const isSelected = p.id === selectedPeripheralId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPeripheralId(p.id)}
                className={`py-2 px-3.5 rounded-xl font-bold text-xs shrink-0 flex items-center space-x-2 transition-all ${
                  isSelected
                    ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                    : "bg-slate-950/35 text-slate-400 hover:text-slate-200 hover:bg-slate-950/60 border border-slate-800"
                }`}
                id={`peripheral-select-${p.id}`}
              >
                {renderIcon(p.iconName, "w-4 h-4")}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Peripheral Details Screen */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPeripheral.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto pr-1.5 scrollbar-thin space-y-5 mb-4 select-text">
                {/* Title badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-950/30 border border-cyan-500/30"
                    >
                      {renderIcon(selectedPeripheral.iconName, "w-4.5 h-4.5 text-cyan-450")}
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{selectedPeripheral.name}</h3>
                  </div>

                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 tracking-wider">
                    Urządzenie zewnętrzne
                  </span>
                </div>

                {/* Role Description */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rola i funkcja</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedPeripheral.role}
                  </p>
                </div>

                {/* Cable Specs Connection Guide */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/70">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                    <Cable className="w-3.5 h-3.5 mr-1 text-cyan-400 shrink-0" />
                    Złącze wejściowe i okablowanie
                  </h4>
                  <p className="text-xs text-cyan-300 leading-relaxed font-mono">
                    {selectedPeripheral.connectionType}
                  </p>
                </div>

                {/* Technical Parameters List */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Główne Parametry Techniczne</h4>
                  <ul className="space-y-2">
                    {selectedPeripheral.specs.map((spec, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1 shrink-0">▪</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tips for Peripherals */}
              <div className="pt-4 border-t border-slate-800/80 shrink-0">
                <div className="bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors border border-cyan-500/10 rounded-xl p-4 flex items-start space-x-3 text-xs leading-relaxed text-slate-300">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-bold">
                    i
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-[10.5px] uppercase tracking-wide mb-1">Rada Eksperta i Porównanie</h4>
                    <p className="text-slate-400">{selectedPeripheral.tip}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
