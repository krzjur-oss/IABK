/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles } from "lucide-react";
import CuriositiesTab from "./CuriositiesTab";
import GlossaryTab from "./GlossaryTab";

interface KnowledgeCenterTabProps {
  theme: "light" | "dark";
}

export default function KnowledgeCenterTab({ theme }: KnowledgeCenterTabProps) {
  const [subTab, setSubTab] = useState<"glossary" | "curiosities">("glossary");

  return (
    <div className="flex flex-col space-y-6 w-full" id="knowledge-center-container">
      {/* Subtab navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/45 border border-slate-800/80 p-3 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <BookOpen className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400 font-mono">
              Centrum Wiedzy i Rozwoju
            </h2>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Kompleksowy moduł edukacyjny: słownik terminologii oraz ciekawostki IT
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto p-1 bg-[#0F0F12] border border-slate-800 rounded-xl space-x-1">
          <button
            onClick={() => setSubTab("glossary")}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              subTab === "glossary"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Słownik IT</span>
          </button>
          
          <button
            onClick={() => setSubTab("curiosities")}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              subTab === "curiosities"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Ciekawostki i Nowości</span>
          </button>
        </div>
      </div>

      <div className="relative w-full min-h-0">
        <AnimatePresence mode="wait">
          {subTab === "glossary" ? (
            <motion.div
              key="glossary-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GlossaryTab />
            </motion.div>
          ) : (
            <motion.div
              key="curiosities-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <CuriositiesTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
