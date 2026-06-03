/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Search, Filter, HelpCircle, Sparkles, AlertCircle } from "lucide-react";
import { GLOSSARY_DB } from "./DetailPanel";

export default function GlossaryTab() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const glossaryList = Object.values(GLOSSARY_DB).sort((a, b) => a.term.localeCompare(b.term));

  const availableLetters = Array.from(
    new Set(glossaryList.map((item) => item.term.charAt(0).toUpperCase()))
  ).sort();

  const filteredGlossary = glossaryList.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = !selectedLetter || item.term.toUpperCase().startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 w-full text-slate-200"
      id="glossary-tab-view"
    >
      {/* Upper Glowing Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0D1527] to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 bottom-0 w-[150px] h-full bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Kompendium Wiedzy Syntetycznej</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Słownik Terminów IT & Skrótów
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
              Kompleksowy wykaz pojęć inżynieryjnych i żargonu komputerowego stosowanego w naszym interaktywnym atlasie. Dowiedz się więcej o tajnikach konstrukcji krzemowych, standardach zasilania oraz innowacjach przyszłości.
            </p>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-xl px-4 py-3 shrink-0 flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-cyan-400 shrink-0 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Baza wiedzy</span>
              <span className="text-xs font-bold text-white block">{glossaryList.length} technicznych haseł</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
        
        {/* Interactive Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Wyszukaj pojęcie lub frazę w czasie rzeczywistym... (np. TDP, DDR, VRM)"
                className="w-full pl-10 pr-12 py-2.5 bg-slate-950/80 hover:bg-slate-900/60 focus:bg-slate-950 border border-slate-800/90 focus:border-cyan-500/40 rounded-xl text-xs text-slate-200 placeholder-slate-500 transition-all outline-none focus:ring-1 focus:ring-cyan-500/20"
                id="glossary-realtime-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono font-bold cursor-pointer"
                >
                  WYCZYŚĆ
                </button>
              )}
            </div>

            {/* Reset button */}
            {(selectedLetter || searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLetter(null);
                }}
                className="px-4 py-2.5 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-500/35 text-rose-405 hover:text-rose-300 rounded-xl text-xs font-mono font-bold transition-colors flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                id="glossary-clear-filters"
              >
                <span>Resetuj filtry</span>
              </button>
            )}
          </div>

          {/* Alphabet bar */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-mono uppercase flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Szybka selekcja alfabetyczna:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-950/45 border border-slate-900 rounded-xl">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor pointer ${
                  selectedLetter === null
                    ? "bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-900/40"
                }`}
              >
                Wszystkie haseł
              </button>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center cursor-pointer ${
                    selectedLetter === letter
                      ? "bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                      : "text-slate-400 hover:text-slate-250 hover:bg-slate-900/40"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="min-h-[250px] relative">
          <AnimatePresence mode="popLayout">
            {filteredGlossary.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="py-16 text-center space-y-3.5 bg-slate-950/30 border border-dashed border-slate-850 rounded-2xl flex flex-col items-center justify-center"
              >
                <HelpCircle className="w-10 h-10 text-slate-650 animate-pulse" />
                <div className="space-y-1">
                  <span className="text-slate-350 text-xs md:text-sm font-sans font-bold block">
                    Brak pojęć spełniających kryteria
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    Spróbuj wpisać inną frazę lub zresetować filtr literowy.
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLetter(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono font-bold text-cyan-400 rounded-xl transition-all cursor-pointer"
                >
                  Pokaż pełną listę terminów →
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredGlossary.map((entry) => {
                  const letter = entry.term.charAt(0).toUpperCase();
                  return (
                    <motion.div
                      key={entry.term}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group relative bg-[#090A0C] hover:bg-[#0E1116] border border-slate-900 hover:border-cyan-500/25 p-4.5 rounded-xl shadow-lg transition-all flex flex-col justify-between"
                      id={`glossary-card-${entry.term.toLowerCase()}`}
                    >
                      <div className="absolute left-0 top-3- bottom-3 w-0.5 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-all rounded-r" style={{ top: "12px", bottom: "12px" }} />

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-extrabold text-white text-xs md:text-sm tracking-tight flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                            {entry.term}
                          </h4>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-950 border border-slate-850 text-slate-500 group-hover:border-cyan-500/15 group-hover:text-cyan-400 transition-colors">
                            Indeks: {letter}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                          {entry.definition}
                        </p>
                      </div>

                      <div className="absolute top-1.5 right-2 text-[8px] font-mono text-cyan-400/5 group-hover:text-cyan-400/10 pointer-events-none select-none">
                        TECHNICAL_DICTIONARY
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
