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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="peripherals-root">
      {/* Visual Desk Setup / Cable Map (Left, span 6) */}
      <div className="lg:col-span-6 flex flex-col space-y-4">
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative min-h-[440px] flex flex-col justify-between overflow-hidden">
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

          {/* Interactive Visual Setup Canvas */}
          <div className="flex-1 flex items-center justify-center relative my-6 min-h-[220px] z-10 select-none">
            {/* The Wooden Desk Outline */}
            <div className="absolute bottom-4 left-4 right-4 h-3 bg-amber-900 rounded-full border border-amber-1000/60 shadow-lg" />
            <div className="absolute bottom-0 left-8 right-8 h-4 bg-slate-950/40 rounded-b-md border-t border-slate-800/40" />

            {/* Simulated components on table */}
            {/* 1. PC Tower Case representation (Right) */}
            <div className="absolute right-8 bottom-7 w-20 h-32 border border-slate-800 bg-slate-950/90 rounded-xl flex flex-col justify-between p-2 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                <span className="text-[7.5px] font-bold font-mono text-slate-500 text-right">PŁYTA GŁÓWNA</span>
              </div>
              {/* Internal abstract visual cords */}
              <div className="flex-1 flex flex-col justify-center space-y-1.5">
                <div className="h-1.5 bg-cyan-500/20 w-4/5 rounded" />
                <div className="h-2 bg-slate-800 w-3/5 rounded" />
                <div className="h-1 bg-cyan-500/30 w-11/12 rounded" />
              </div>
              {/* Backports illustration section */}
              <span className="text-[6.5px] text-slate-550 uppercase font-bold text-center border-t border-slate-800 pt-1">
                PC Tower Core
              </span>
            </div>

            {/* 2. Monitor representation (Center) */}
            <button
              onClick={() => setSelectedPeripheralId("monitor")}
              className={`absolute left-[30%] bottom-16 -translate-x-[30%] w-44 aspect-video rounded-xl border flex flex-col justify-between p-1.5 shadow-xl transition-all ${
                selectedPeripheralId === "monitor"
                  ? "bg-cyan-950/20 border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-950/95 border-slate-800/80 hover:border-slate-700"
              }`}
              id="desk-monitor"
            >
              <div className="flex-1 rounded bg-slate-900 flex items-center justify-center relative">
                <Monitor className="w-10 h-10 text-slate-800" />
                {/* Embedded dynamic display wallpaper mockup */}
                <div className="absolute inset-2 border border-slate-800/40 bg-[linear-gradient(45deg,#020617,#0c1a2e)] rounded flex flex-col justify-center items-center text-[7px] font-mono text-slate-500">
                  <span className="text-cyan-400 font-bold">ATLAS SYSTEM</span>
                  <span>v1.0.4 Online</span>
                </div>

                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-cyan-450 animate-pulse" />
              </div>
              <span className="text-[8px] font-bold text-center text-slate-400">Monitor</span>
            </button>
            {/* Monitor foot stand */}
            <div className="absolute left-[30%] -translate-x-[30%] bottom-7 w-8 h-10 bg-slate-850 border border-slate-800/60" />

            {/* 3. Keyboard (Front bottom center) */}
            <button
              onClick={() => setSelectedPeripheralId("keyboard")}
              className={`absolute left-[26%] bottom-7 -translate-x-[26%] w-32 h-6 border rounded-md shadow-md flex items-center justify-around px-2 transition-all ${
                selectedPeripheralId === "keyboard"
                  ? "bg-cyan-950/20 border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-950/95 border-slate-800/80 hover:border-slate-700"
              }`}
              id="desk-keyboard"
            >
              <div className="flex space-x-0.5 w-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 h-3 bg-slate-800 rounded-[1px] border-[0.5px] border-slate-700/60" />
                ))}
              </div>
            </button>

            {/* 4. Mouse (Front right center) */}
            <button
              onClick={() => setSelectedPeripheralId("mouse")}
              className={`absolute left-[54%] bottom-7 w-6 h-9 border rounded-full shadow-md flex flex-col items-center justify-start py-0.5 transition-all ${
                selectedPeripheralId === "mouse"
                  ? "bg-cyan-950/20 border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-950/95 border-slate-800/80 hover:border-slate-700"
              }`}
              id="desk-mouse"
            >
              <div className="w-0.5 h-2.5 bg-slate-800 rounded-full" />
            </button>

            {/* 5. Głośniki (Stereo Left side of monitor) */}
            <button
              onClick={() => setSelectedPeripheralId("audio")}
              className={`absolute left-[8%] bottom-7 w-8 h-16 border rounded-lg p-1.5 shadow-md flex flex-col justify-between items-center transition-all ${
                selectedPeripheralId === "audio"
                  ? "bg-cyan-950/20 border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-950/95 border-slate-800/80 hover:border-slate-700"
              }`}
              id="desk-audio-speakers"
            >
              <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              </div>
            </button>

            {/* 6. Drukarka (Left desk corner) */}
            <button
              onClick={() => setSelectedPeripheralId("printer")}
              className={`absolute left-[70%] bottom-7 w-16 h-12 border rounded-md shadow-md flex flex-col justify-between p-1 transition-all ${
                selectedPeripheralId === "printer"
                  ? "bg-cyan-950/20 border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-950/95 border-slate-800/80 hover:border-slate-700"
              }`}
              id="desk-printer"
            >
              <div className="w-full h-2 bg-slate-800 rounded-sm" />
              <div className="flex-1 flex items-center justify-center">
                <Printer className="w-5 h-5 text-slate-700" />
              </div>
              <div className="w-4/5 h-1 bg-slate-800 self-center rounded-sm" />
            </button>

            {/* Simulated Cable connections showing lines traveling back to the computer case */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 animate-pulse">
              {/* Dynamic glowing cables running from active peripheral right to the PC box */}
              {selectedPeripheralId === "monitor" && (
                <path d="M 152,190 Q 250,220 330,170" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[dash_10s_linear_infinite]" />
              )}
              {selectedPeripheralId === "keyboard" && (
                <path d="M 150,240 Q 240,250 330,195" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[dash_10s_linear_infinite]" />
              )}
              {selectedPeripheralId === "mouse" && (
                <path d="M 245,240 Q 280,240 330,195" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[dash_10s_linear_infinite]" />
              )}
              {selectedPeripheralId === "audio" && (
                <path d="M 50,210 Q 180,240 330,175" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[dash_10s_linear_infinite]" />
              )}
              {selectedPeripheralId === "printer" && (
                <path d="M 330,240 Q 350,230 350,195" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4,4" className="animate-[dash_10s_linear_infinite]" />
              )}
            </svg>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/85 rounded-xl p-3.5 mt-2 flex items-center space-x-2 text-[11px] text-slate-400 z-10">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Kliknij sprzęt na makiecie biurka lub na liście obok, aby zobaczyć opis złączy kablowych.</span>
          </div>
        </div>
      </div>

      {/* Side Detail Card Panel & Selector List (Right, span 6) */}
      <div className="lg:col-span-6 flex flex-col space-y-4">
        {/* Horizontal scroll select buttons list */}
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-2.5 flex space-x-2 overflow-x-auto shadow-md">
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
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPeripheral.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between"
            >
              <div>
                {/* Title badge */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center space-x-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-950/30 border border-cyan-500/30"
                    >
                      {renderIcon(selectedPeripheral.iconName, "w-4.5 h-4.5 text-cyan-405")}
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
                <div className="mt-5 bg-slate-950/50 p-4 rounded-xl border border-slate-800/70">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
                    <Cable className="w-3.5 h-3.5 mr-1 text-cyan-400 shrink-0" />
                    Złącze wejściowe i okablowanie
                  </h4>
                  <p className="text-xs text-cyan-300 leading-relaxed font-mono">
                    {selectedPeripheral.connectionType}
                  </p>
                </div>

                {/* Technical Parameters List */}
                <div className="mt-5">
                  <h4 className="text-[10px] font-bold text-slate-405 uppercase tracking-wider mb-2">Główne Parametry Techniczne</h4>
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
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors border border-cyan-500/10 rounded-xl p-4 flex items-start space-x-3 text-xs leading-relaxed text-slate-300">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-bold">
                    i
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-[10.5px] uppercase tracking-wide mb-1">Rada Eksperta i Porównanie</h4>
                    <p className="text-slate-450">{selectedPeripheral.tip}</p>
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
