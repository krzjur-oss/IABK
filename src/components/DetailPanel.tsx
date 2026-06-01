/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentInfo } from "../types";
import { motion } from "motion/react";
import { Info, HelpCircle, HardDrive, Cpu, AlertCircle, Sparkles, Layers, List } from "lucide-react";

interface DetailPanelProps {
  component: ComponentInfo | null;
}

export default function DetailPanel({ component }: DetailPanelProps) {
  if (!component) {
    return (
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px] shadow-2xl relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 animate-pulse">
          <HardDrive className="w-6 h-6 text-cyan-500" />
        </div>
        <h3 className="text-sm font-bold text-slate-200">Wybierz komponent</h3>
        <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
          Kliknij dowolną część na obracającym się modelu 3D komputera lub wybierz ją z bocznej listy, aby zobaczyć opis funkcji i parametry techniczne.
        </p>
      </div>
    );
  }

  // Choose level of difficulty badge colors
  const getDifficultyBadge = (difficulty: "Łatwy" | "Średni" | "Trudny") => {
    switch (difficulty) {
      case "Łatwy":
        return "bg-cyan-950/20 text-cyan-400 border-cyan-500/30";
      case "Średni":
        return "bg-amber-950/20 text-amber-400 border-amber-500/30";
      case "Trudny":
        return "bg-red-950/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-950 text-slate-400 border-slate-800";
    }
  };

  return (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between overflow-hidden"
      id={`detail-panel-${component.id}`}
    >
      <div className="flex-1 overflow-y-auto pr-1.5 scrollbar-thin space-y-5 mb-4 select-text">
        {/* Header Details */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span
                className="w-3.5 h-3.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ backgroundColor: component.colorHex }}
              />
              <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold">
                Komponent Wewnętrzny
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1.5 leading-snug">
              {component.name}
            </h2>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg border flex items-center shadow-sm ${getDifficultyBadge(component.difficulty)}`}>
              Trudność: {component.difficulty}
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Rola w komputerze (Funkcja)
          </h4>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
            {component.role}
          </p>
        </div>

        {/* Cable Connection instructions */}
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/70">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            Złącza i Sposób podłączenia
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {component.connections}
          </p>
        </div>

        {/* Specific specification lists */}
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center">
            <List className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            Główne Parametry do oceny podzespołu
          </h4>
          <ul className="space-y-2">
            {component.specs.map((spec, index) => (
              <li key={index} className="text-xs text-slate-300 flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▪</span>
                <span className="font-sans leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assembly Expert Tip section */}
      <div className="pt-4 border-t border-slate-800/80 shrink-0">
        <div className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors border border-amber-500/10 rounded-xl p-4 flex items-start space-x-3 text-xs leading-relaxed text-slate-300">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500 font-bold">
            !
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-[10.5px] uppercase tracking-wide mb-1 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Rada Serwisowa i Montażowa
            </h4>
            <p className="text-slate-400">{component.tip}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
