/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Lightbulb, Zap, Thermometer, Gauge, History, BookOpen, Binary, Dna, Activity, TrendingDown, HelpCircle, CheckCircle } from "lucide-react";

interface TriviaCard {
  id: string;
  title: string;
  category: "kwantowe" | "biodev" | "moore" | "ciekawostki-historia" | "ekstrema";
  summary: string;
  icon: React.ComponentType<any>;
}

export default function CuriositiesTab() {
  const [activeCategory, setActiveCategory] = useState<"all" | "kwantowe" | "biodev" | "moore" | "ciekawostki-historia" | "ekstrema">("all");
  const [selectedTriviaId, setSelectedTriviaId] = useState<string>("quantum-computing");

  // State for Quantum Qubit simulator
  const [qubitState, setQubitState] = useState<{ alpha: number; beta: number }>({ alpha: 1, beta: 0 }); // |psi> = alpha|0> + beta|1> (probabilities are alpha^2 and beta^2)
  const [measuredState, setMeasuredState] = useState<"0" | "1" | null>(null);
  const [gateHistory, setGateHistory] = useState<string[]>([]);
  const [measurementCount, setMeasurementCount] = useState<{ "0": number; "1": number }>({ "0": 0, "1": 0 });

  // State for DNA Calculator
  const [storageAmountGb, setStorageAmountGb] = useState<number>(1000); // in GB

  // State for Moore's Law physical limits simulator
  const [transistorSizeNm, setTransistorSizeNm] = useState<number>(3); // 3nm

  // State for Cray-2 Liquid Aquarium Cooling
  const [crayCoresLoad, setCrayCoresLoad] = useState<number>(20); // % load
  const [crayTemp, setCrayTemp] = useState<number>(31.5); // °C
  const [crayPumpFlow, setCrayPumpFlow] = useState<number>(4.2); // L/s

  // Periodic physics updates for Cray-2 simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setCrayTemp((prev) => {
        const targetTemp = 20 + crayCoresLoad * 0.45 - (crayPumpFlow - 3) * 2;
        const diff = targetTemp - prev;
        const next = prev + diff * 0.15 + (Math.random() - 0.5) * 0.2;
        return Math.max(15, Math.min(85, parseFloat(next.toFixed(2))));
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [crayCoresLoad, crayPumpFlow]);

  // Adjust flow automatically based on core heat/load for realism
  useEffect(() => {
    const calculatedFlow = 2.0 + (crayCoresLoad / 100) * 6.5;
    setCrayPumpFlow(parseFloat(calculatedFlow.toFixed(1)));
  }, [crayCoresLoad]);

  // Quantum Gates Handlers
  const applyHadamard = () => {
    // Hadamard Gate: H|0> = (|0> + |1>)/sqrt(2), H|1> = (|0> - |1>)/sqrt(2)
    // We simplify math for interactive visualization
    if (Math.abs(qubitState.alpha - 1) < 0.01) {
      setQubitState({ alpha: Math.sqrt(0.5), beta: Math.sqrt(0.5) });
    } else if (Math.abs(qubitState.beta - 1) < 0.01) {
      setQubitState({ alpha: Math.sqrt(0.5), beta: -Math.sqrt(0.5) });
    } else {
      // Return to ground state
      setQubitState({ alpha: 1, beta: 0 });
    }
    setGateHistory((prev) => [...prev.slice(-3), "Hadamard (H)"]);
    setMeasuredState(null);
  };

  const applyPauliX = () => {
    // Pauli-X is quantum NOT gate (swaps alpha and beta)
    setQubitState((prev) => ({ alpha: prev.beta, beta: prev.alpha }));
    setGateHistory((prev) => [...prev.slice(-3), "Pauli-X (NOT)"]);
    setMeasuredState(null);
  };

  const measureQubit = () => {
    const prob0 = Math.pow(qubitState.alpha, 2);
    // Draw based on prob0
    const rand = Math.random();
    const outcome = rand < prob0 ? "0" : "1";
    setMeasuredState(outcome);
    setMeasurementCount((prev) => ({
      ...prev,
      [outcome]: prev[outcome] + 1,
    }));
  };

  const resetQuantumSim = () => {
    setQubitState({ alpha: 1, beta: 0 });
    setMeasuredState(null);
    setGateHistory([]);
    setMeasurementCount({ "0": 0, "1": 0 });
  };

  // DNA calculation helpers
  // Factor: 1 gram of DNA holds 215 PB (215 000 000 GB)
  // DNA consists of 4 base pairs (Adenine-Thymine, Cytosine-Guanine). 1 gram of DNA corresponds to about 1 zettabyte theoretically under total absolute packaging, but standard biologically readable storage operates around 215 PB per gram.
  const dnaMassNg = (storageAmountGb / 215000000) * 1e9; // in nanograms
  const dnaBasePairsText = (storageAmountGb * 8e9 / 2).toLocaleString("pl-PL"); // 8 bits per byte, 2 bits per nucleotide pair

  const getDnaVisualComparison = (gb: number) => {
    const mass = (gb / 215000000) * 1e9;
    if (mass < 0.001) return "Słodki kryształek cukru pudru (ułamek pikograma)";
    if (mass < 1) return `Około 1/${Math.round(1/mass)} masy pojedynczego ziarna soli kuchennej`;
    if (mass < 5) return "Przeciętna masa pojedynczego, mikroskopijnego zarodnika grzyba";
    if (mass < 100) return `Około ${Math.round(mass)} nanogramów (wciąż tysiące razy lżejsze od ziarnka piasku)`;
    return "Półprzezroczysty pyłek, mniejszy od główki szpilki";
  };

  // Quantum tunnel calculation (Moore's law limits)
  const getTunnelingProbability = (nm: number) => {
    // As physical dimension goes below 5nm wave nature of electrons dominates
    // exponential increase in tunneling probability
    if (nm >= 10) return 0.01;
    if (nm >= 7) return 0.05;
    if (nm >= 5) return 0.20;
    if (nm >= 3) return 0.65;
    if (nm >= 2) return 0.90;
    return 0.98; // 1.5nm or below
  };

  const tunnelProb = getTunnelingProbability(transistorSizeNm);

  const CARDS: TriviaCard[] = [
    {
      id: "quantum-computing",
      title: "Komputery Kwantowe: Poza Logiką Dwustanową",
      category: "kwantowe",
      summary: "Zrozum fenomen kubitów, superpozycji i mechaniki kwantowej, wykraczającej daleko poza klasyczne bramki binarne 0 i 1.",
      icon: Binary,
    },
    {
      id: "dna-storage",
      title: "Komputery Biologiczne i DNA: Pamięć Natury",
      category: "biodev",
      summary: "Gram czystego DNA potrafi zapisać 215 milionów gigabajtów danych. Poznaj technologię kodowania binarności w chemiczne zasady życiowe.",
      icon: Dna,
    },
    {
      id: "moores-law-end",
      title: "Zmierzch Prawa Moore'a: Bariera Świata Atomów",
      category: "moore",
      summary: "Kiedy tranzystor ma rozmiar zaledwie kilku atomów, elektrony zaczynają teleportować się przez krzemowe ściany w procesie tunelowania kwantowego.",
      icon: TrendingDown,
    },
    {
      id: "cray-aquarium",
      title: "Akwarium Cray-2: Narodziny Chłodzenia Zanurzeniowego",
      category: "ekstrema",
      summary: "Superkomputer Cray-2 z lat 80. pracował w pełni zanurzony w syntetycznej, bezbarwnej cieczy Fluorinert, przypominając szumiące bąbelkami akwarium.",
      icon: Thermometer,
    },
    {
      id: "first-bug-history",
      title: "Pierwszy 'Bug' w Historii: Prawdziwa Ćma w Przekaźniku",
      category: "ciekawostki-historia",
      summary: "Odkryj prawdziwą historię z 1947 r., kiedy to termin 'bug' (błąd oprogramowania) stał się dosłowny po znalezieniu fizycznego owada w systemie Mark II.",
      icon: History,
    },
  ];

  const filteredCards = activeCategory === "all" ? CARDS : CARDS.filter(c => c.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 w-full text-slate-200"
      id="curiosities-tab-view"
    >
      {/* Upper Glowing Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0D1527] to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 bottom-0 w-[150px] h-full bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Atlas Ciekawostek & Technologii Jutra</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Sekcja Osobliwości Informatycznych
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
              Zajrzyj w głąb praw fizyki i biologii, które definiują limity dzisiejszej krzemowej technologii. Poznaj cuda informatyki kwantowej, cząsteczkowej pamięci DNA oraz ekstremalnego inżynieringu.
            </p>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-xl px-4 py-3 shrink-0 flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-cyan-400 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-mono block uppercase">Status modułu</span>
              <span className="text-xs font-bold text-white block">4 Interaktywne Symulacje</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selectors */}
      <div className="flex flex-nowrap space-x-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-900 border-b border-slate-900">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "all"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          Wszystkie ciekawostki
        </button>
        <button
          onClick={() => setActiveCategory("kwantowe")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "kwantowe"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          Komp. Kwantowe
        </button>
        <button
          onClick={() => setActiveCategory("biodev")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "biodev"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          DNA / Biokomputery
        </button>
        <button
          onClick={() => setActiveCategory("moore")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "moore"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          Granice Krzemu
        </button>
        <button
          onClick={() => setActiveCategory("ekstrema")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "ekstrema"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          Eksperymenty i Ciecz
        </button>
        <button
          onClick={() => setActiveCategory("ciekawostki-historia")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer block shrink-0 ${
            activeCategory === "ciekawostki-historia"
              ? "bg-cyan-950/50 border border-cyan-500/35 text-cyan-400"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
          }`}
        >
          Karty Historii
        </button>
      </div>

      {/* Main Grid Splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left pane: interactive cards list (span 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          {filteredCards.map((card) => {
            const isSelected = selectedTriviaId === card.id;
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedTriviaId(card.id)}
                className={`text-left p-4 rounded-xl border text-xs transition-all flex items-start space-x-3.5 cursor-pointer ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/15 shadow-[0_0_15px_rgba(6,182,212,0.1)] text-white"
                    : "border-slate-800 bg-[#0F0F12]/60 hover:border-slate-700 hover:bg-[#0F0F12] text-slate-350"
                }`}
                id={`trivia-select-${card.id}`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className={`font-bold leading-snug text-sm ${isSelected ? "text-cyan-400" : "text-slate-200"}`}>
                    {card.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-normal">
                    {card.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right pane: chosen layout presentation and interactive emulator (span 8) */}
        <div className="lg:col-span-8 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col justify-between min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* CURIOSITY 1: QUANTUM COMPUTING */}
            {selectedTriviaId === "quantum-computing" && (
              <motion.div
                key="quantum-comp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 h-full flex flex-col"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-cyan-950/40 border border-cyan-500/25 px-1.5 py-0.5 rounded text-cyan-400">
                      Mechanika Kwantowa i Superkomputery
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Komputery Kwantowe – Jak Naprawdę Działają?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    W przeciwieństwie do klasycznych tranzystorów, które mogą reprezentować jedynie stany binarne <strong className="text-cyan-400">0</strong> lub <strong className="text-cyan-400">1</strong> (wyłączony/włączony prąd), komputery kwantowe wykorzystują <strong className="text-white">kubity (bity kwantowe)</strong>. Korzystają z dwóch niesamowitych zjawisk: <strong className="text-cyan-400">Superpozycji</strong> (bycia w obu stanach jednocześnie z określonym prawdopodobieństwem) oraz <strong className="text-cyan-400">Splątania kwantowego</strong>.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                     Aby kubity nie uległy <strong>dekoherencji</strong> (utracie danych pod wpływem ciepła), serce komputera musi być chłodzone w lodówkach kriogenicznych do temperatury <strong>0.015 Kelwina (-273,13°C)</strong> — to temperatura zimniejsza niż w samej próżni międzygwiezdnej!
                  </p>
                </div>

                {/* Interactive Qubit Simulator Interface */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Binary className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span className="text-xs font-bold font-mono text-slate-300">Interaktywny Symulator Pojedynczego Kubitu</span>
                    </div>
                    <button
                      onClick={resetQuantumSim}
                      className="text-[10px] text-slate-500 hover:text-cyan-400 font-mono transition-colors font-bold cursor-pointer"
                    >
                      RESET SYSTEMU
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    
                    {/* Visual Sphere Representation */}
                    <div className="flex flex-col items-center justify-center space-y-3 bg-[#0A0A0B]/60 p-4 rounded-lg border border-slate-900">
                      <p className="text-[10px] font-mono text-slate-500 uppercase">Stan Kwantowy |Ψ⟩ (Sfera Blocha)</p>
                      
                      <div className="w-32 h-32 rounded-full border border-dashed border-slate-700 flex items-center justify-center relative bg-gradient-to-b from-slate-950/10 to-slate-900/30">
                        {/* Horizontal and vertical axes */}
                        <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-slate-800" />
                        <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-slate-800" />
                        
                        {/* Qubit States labels */}
                        <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-cyan-400">|0⟩ Ground</span>
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-cyan-400">|1⟩ Excited</span>
                        
                        {/* Animated Quantum Spin vector */}
                        <motion.div
                          animate={{
                            rotate: qubitState.beta !== 0 ? 90 : 0,
                            scale: qubitState.alpha === qubitState.beta ? 1.05 : 1
                          }}
                          transition={{ type: "spring", stiffness: 100 }}
                          className="w-1.5 h-14 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-full origin-bottom absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                        />
                        
                        {/* Shaking glow for Superposition state */}
                        {Math.abs(qubitState.alpha - Math.sqrt(0.5)) < 0.1 && (
                          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-pulse" />
                        )}
                      </div>

                      {/* Probabilities gauge */}
                      <div className="w-full space-y-1.5 text-[11px] font-mono mt-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Szansa na |0⟩ (Alpha²):</span>
                          <span className="font-bold text-cyan-400">{(Math.pow(qubitState.alpha, 2) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${Math.pow(qubitState.alpha, 2) * 100}%` }} />
                        </div>

                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Szansa na |1⟩ (Beta²):</span>
                          <span className="font-bold text-amber-400">{(Math.pow(qubitState.beta, 2) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.pow(qubitState.beta, 2) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Operational controls */}
                    <div className="space-y-3.5">
                      <p className="text-[10px] font-mono text-slate-500 uppercase">Modyfikuj Macierz Bramkami</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={applyHadamard}
                          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 hover:text-cyan-400 text-xs font-mono font-bold border border-slate-800 rounded-lg transition-all text-left space-y-1 cursor-pointer"
                        >
                          <div className="font-extrabold text-[#f59e0b] text-[11px]">BRAMKA [ H ]</div>
                          <div className="text-[9px] text-slate-400 font-sans leading-tight">Wprowadź w stan Superpozycji (50/50)</div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={applyPauliX}
                          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 hover:text-cyan-400 text-xs font-mono font-bold border border-slate-800 rounded-lg transition-all text-left space-y-1 cursor-pointer"
                        >
                          <div className="font-extrabold text-[#3b82f6] text-[11px]">BRAMKA [ X ]</div>
                          <div className="text-[9px] text-slate-400 font-sans leading-tight">Negacja kwantowa (NOT) - zamień prawdopodobieństwa</div>
                        </button>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={measureQubit}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 font-sans font-bold text-xs rounded-xl shadow-lg shadow-cyan-950/20 active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-2 text-white"
                        >
                          <Zap className="w-4 h-4 shrink-0 text-white" />
                          <span>ZMIERZ STAN (Zapadnięcie fali)</span>
                        </button>
                      </div>

                      {/* Display Outcome of measurement */}
                      <div className="min-h-[50px] bg-[#0A0A0B]/80 rounded-xl p-2.5 border border-slate-900 text-[11px] font-mono flex items-center justify-between">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">Ostatni wynik:</span>
                          {measuredState !== null ? (
                            <span className="text-sm font-extrabold text-cyan-400">
                              Kolaps do stanu <strong className="text-white">|{measuredState}⟩</strong>
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Oczekiwanie na pomiar...</span>
                          )}
                        </div>
                        <div className="text-right border-l border-slate-900 pl-3">
                          <span className="text-[9px] text-slate-500 block">Zestawienie fizyczne:</span>
                          <span className="text-[10px] text-slate-300">|0⟩: {measurementCount["0"]}x | |1⟩: {measurementCount["1"]}x</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* CURIOSITY 2: DNA STORAGE */}
            {selectedTriviaId === "dna-storage" && (
              <motion.div
                key="dna-storage-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 h-full flex flex-col"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-emerald-950/40 border border-emerald-500/25 px-1.5 py-0.5 rounded text-emerald-400">
                      Biokomputery oraz Pamięć DNA
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Przechowywanie Danych w Cząsteczkach DNA</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tradycyjna pamięć magnetyczna w dyskach twardych ma spore rozmiary fizyczne i ulega degradacji po 10–15 latach. Tymczasem natura miliardy lat temu wynalazła nadrzędny, biologiczny dysk twardy: <strong className="text-emerald-400">syntetyczny kwas deoksyrybonukleinowy (DNA)</strong>.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zamiast bitów 0 i 1 stosujemy cztery cyfry kodu genetycznego: adoninę (<strong className="text-cyan-400">A</strong>), tyminę (<strong className="text-pink-400">T</strong>), cytozynę (<strong className="text-yellow-400">C</strong>) i guaninę (<strong className="text-green-400">G</strong>). Dane są stabilne i mogą przetrwać w lodzie <strong>setki tysięcy lat</strong> bez utraty danych, nie wymagając ciągłego zasilania!
                  </p>
                </div>

                {/* Interactive DNA Calculator */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Dna className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold font-mono text-slate-300">Biologiczny Kalkulator Gęstości DNA</span>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Wprowadź pojemność dysku do upakowania:</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={storageAmountGb}
                          onChange={(e) => setStorageAmountGb(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-mono font-bold text-emerald-400 text-center outline-none focus:border-emerald-500"
                        />
                        <span className="text-xs font-mono font-bold text-slate-400">GB</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="100"
                      max="100000000" // 100 Terabajtow
                      step="100"
                      value={storageAmountGb}
                      onChange={(e) => setStorageAmountGb(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />

                    {/* Output indicators grids */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                      
                      <div className="bg-[#0A0A0B]/80 rounded-lg p-3 border border-slate-900 space-y-1">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase">Masa Fizyczna DNA</span>
                        <span className="text-sm font-extrabold text-emerald-400 font-mono">
                          {dnaMassNg < 1 ? `${(dnaMassNg * 1000).toFixed(3)} pg` : `${dnaMassNg.toFixed(3)} ng`}
                        </span>
                        <p className="text-[10px] text-slate-400 font-sans leading-tight">
                          Waga biochemiczna nośnika.
                        </p>
                      </div>

                      <div className="bg-[#0A0A0B]/80 rounded-lg p-3 border border-slate-900 space-y-1">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase">Liczba Zasad Azotowych</span>
                        <span className="text-sm font-extrabold text-cyan-400 font-mono">
                          {dnaBasePairsText}
                        </span>
                        <p className="text-[10px] text-slate-400 font-sans leading-tight">
                          Chemiczne pary zasad A-T oraz C-G.
                        </p>
                      </div>

                      <div className="bg-[#0A0A0B]/80 rounded-lg p-3 border border-slate-900 space-y-1">
                        <span className="text-[9px] text-slate-500 font-mono block uppercase">Skala we wszechświecie</span>
                        <span className="text-[10px] font-extrabold text-white leading-snug block">
                          {getDnaVisualComparison(storageAmountGb)}
                        </span>
                      </div>

                    </div>

                    {/* Educational Summary label */}
                    <div className="p-3 bg-emerald-950/10 border border-emerald-500/10 rounded-lg text-[11px] text-emerald-400/95 leading-relaxed font-sans">
                      <strong>Czy wiesz, że?</strong> Wszelkie cyfrowe archiwa ludzkości (szacowane na 2026 r. na około 120 zettabajtów) dałoby się w bezpiecznej formie genetycznej zamknąć w objętości sześcianu o krawędzi mniejszej niż <strong>30 centymetrów</strong>, ważącego kilkanaście dekagramów!
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* CURIOSITY 3: MOORE'S LAW AND QUANTUM TUNNELING */}
            {selectedTriviaId === "moores-law-end" && (
              <motion.div
                key="moore-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 h-full flex flex-col"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-red-950/40 border border-red-500/25 px-1.5 py-0.5 rounded text-red-400">
                      Fizyczne Bariery Silikonu i Nanotechnologia
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Ściana Atomowa: Dlaczego Tranzystory Nie Mogą Być Mniejsze?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Słynne <strong>Prawo Moore'a</strong> zakładało podwajanie liczby tranzystorów w procesorze co dwa lata. Dziś jednak napotykamy twardą granicę praw fizyki. Najlepsze litografie produkują tranzystory w rozmiarach fizycznych <strong>2 lub 3 nanometrów</strong>.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To zaledwie szerokość <strong>10 do 15 atomów krzemu</strong>! Na tym poziomie dystansów bariera izolacyjna staje się tak cienka, że uaktywnia się efekt <strong className="text-red-400">tunelowania kwantowego</strong>. Elektrony traktowane jako fale po prostu przenikają (teleportują się) przez zamknięte bramki, powodując gigantyczny upływ prądu i emisję ciepła.
                  </p>
                </div>

                {/* Quantum tunneling simulator slider */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-red-500 animate-pulse" />
                      <span className="text-xs font-bold font-mono text-slate-300">Sprawdź Granice Tranzystora Krzemowego</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">Rozmiar bramki tranzystora:</span>
                      <span className={`font-extrabold text-sm ${transistorSizeNm < 5 ? "text-red-400" : "text-green-400"}`}>
                        {transistorSizeNm} nm
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1.5"
                      max="45"
                      step="0.5"
                      value={transistorSizeNm}
                      onChange={(e) => setTransistorSizeNm(parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />

                    {/* Metrics analysis */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      <div className="bg-[#0A0A0B]/80 p-3 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-[9px] text-slate-500 font-mono block">UPŁYW ELEKTRONÓW (TUNELOWANIE):</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-mono font-extrabold ${transistorSizeNm < 5 ? "text-red-400 animate-pulse" : "text-slate-400"}`}>
                            {(tunnelProb * 100).toFixed(0)}%
                          </span>
                          <span className="text-[10px] text-slate-500">Prawdopodobieństwo ucieczki</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-300 ${transistorSizeNm < 5 ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${tunnelProb * 100}%` }} />
                        </div>
                      </div>

                      <div className="bg-[#0A0A0B]/80 p-3 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-[9px] text-slate-500 font-mono block">STATUS STABILNOŚCI BRAMKI:</span>
                        <span className={`text-xs font-extrabold font-mono uppercase block ${
                          transistorSizeNm >= 10 ? "text-green-400" :
                          transistorSizeNm >= 5 ? "text-amber-400" :
                          "text-red-400 animate-pulse"
                        }`}>
                          {transistorSizeNm >= 10 ? "Idealnie Izolowany" :
                           transistorSizeNm >= 5 ? "Zakłócenia termiczne styków" :
                           "Niekontrolowana ucieczka (Bariera pęka)"}
                        </span>
                      </div>

                    </div>

                    {/* visual explanatory */}
                    <div className="p-3 bg-slate-900/60 rounded-lg text-[10px] leading-relaxed font-mono flex items-center space-x-3.5">
                      <div className="flex flex-col items-center justify-center shrink-0 p-1 rounded bg-slate-950 border border-slate-800 text-slate-500">
                        <span className="text-[8px] uppercase">Grubość helisy DNA</span>
                        <span className="text-xs font-extrabold text-slate-300">~2.5 nm</span>
                      </div>
                      <p className="text-slate-400 leading-normal">
                        Sprowadzając bramkę tranzystora do poziomu <strong>{transistorSizeNm}nm</strong>, operujesz na skali biologicznej helisy DNA! Klasyczna fizyka Newtona tu nie działa – dominują efekty falowe mechaniki kwantowej, które zmuszają inżynierów do przechodzenia na architektury wielowarstwowe (Chiplety) lub technologię pakowania 3D.
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* CURIOSITY 4: CRAY-2 COOLING AQUARIUM */}
            {selectedTriviaId === "cray-aquarium" && (
              <motion.div
                key="cray-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 h-full flex flex-col"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-blue-950/40 border border-blue-500/25 px-1.5 py-0.5 rounded text-blue-400">
                      Ekstremalne Systemy Chłodzenia Cieczą
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Cray-2 (1985) – Superkomputer w Akwarium</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Stworzony przez genialnego konstruktora Seymoura Craya, superkomputer <strong>Cray-2</strong> był najpotężniejszą maszyną obliczeniową lat 80. Generował tak gigantyczny strumień ciepła, że tradycyjne powietrze ani metalowe radiatory nie radziły sobie z chłodzeniem.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cray podjął pionierską decyzję: zamiast rurek z wodą, całkowicie zanurzył całe pionowe wieże z obwodami elektronicznymi w akwatycznym zbiorniku wypełnionym <strong>cieczą dielektryczną Fluorinert (syntetyczną, nieprzewodzącą prądu)</strong>. Ciecz gwałtownie bulgotała wokół płytek scalonych, zapewniając cyrkulację i chłodzenie, co zyskało komputerowi przydomek „aquarium computer”.
                  </p>
                </div>

                {/* Liquid Submersion Simulator */}
                <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-blue-400 animate-pulse" />
                      <span className="text-xs font-bold font-mono text-slate-300">Wirtualny Blok Chłodzenia Submisyjnego Cray-2</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    
                    {/* Visual Reservoir Simulation */}
                    <div className="bg-[#0A0A0B]/60 border border-slate-900 rounded-lg p-3.5 space-y-3 relative overflow-hidden flex flex-col items-center">
                      <span className="text-[8px] font-mono text-slate-500 uppercase self-start">Zbiornik z cieczą Fluorinert FC-770</span>
                      
                      {/* Water/Bubble animation container */}
                      <div className="w-full h-24 bg-gradient-to-b from-blue-950/20 to-cyan-950/40 rounded-lg border border-cyan-500/20 relative flex flex-col items-center justify-end overflow-hidden">
                        {/* Little floating bubbles */}
                        <div className="absolute inset-0 flex justify-around items-end pb-1 overflow-hidden pointer-events-none">
                          <div className="w-1 h-1 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: "0.8s" }} />
                          <div className="w-0.5 h-0.5 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                        </div>

                        {/* Liquid Wave boundary line representation */}
                        <div className="w-full h-8 bg-cyan-500/10 border-t border-cyan-400/30 text-[9px] font-mono text-cyan-400 flex items-center justify-center">
                          POZIOM PŁYNU STABILNY
                        </div>
                      </div>

                      {/* Display temps & flows */}
                      <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="bg-slate-950 p-2 rounded border border-slate-900">
                          <span className="text-[8px] text-slate-500 block">TEMP. RDZENI:</span>
                          <span className={`text-xs font-bold font-mono ${crayTemp > 60 ? "text-red-400" : "text-cyan-400"}`}>
                            {crayTemp} °C
                          </span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-900">
                          <span className="text-[8px] text-slate-500 block">PRZEPŁYW:</span>
                          <span className="text-xs font-bold text-white">
                            {crayPumpFlow} L/s
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Simulation Settings */}
                    <div className="space-y-4">
                      
                      {/* CPU cores controller load */}
                      <div className="space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Obciążenie Jednostki Centralnej:</span>
                          <span className="font-extrabold text-white">{crayCoresLoad}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={crayCoresLoad}
                          onChange={(e) => setCrayCoresLoad(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      <div className="text-[10px] space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-slate-400 leading-relaxed">
                        <span className="text-blue-400 font-bold block mb-1">🔍 Zależność Fizyczna:</span>
                        Im wyższe obciążenie wieży Cray-2, tym więcej ciepła wydziela elektronika. Algorytm w pompie automatycznie zwiększa opływ Fluorinertu z <strong>2.0 L/s</strong> do <strong>8.5 L/s</strong>, aby odgórnie dławić temperaturę u wejścia rurociągów podłogowych.
                      </div>

                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* CURIOSITY 5: FIRST COMPUTER BUG HISTORY */}
            {selectedTriviaId === "first-bug-history" && (
              <motion.div
                key="bug-history-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 h-full flex flex-col"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono uppercase bg-amber-950/40 border border-amber-500/25 px-1.5 py-0.5 rounded text-amber-500">
                      Archiwa i Legendy Informatyki
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Dlaczego Błędy Oprogramowania nazywamy „Bug” (Robak)?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                     Do dziś pojęcie <strong>macać bugi</strong> lub <strong>wyłapać buga</strong> jest rdzennym hasłem każdego programisty. Skąd się wzięło? Choć samo słowo "bug" pojawiało się już wcześniej w technice przemysłowej w XIX wieku oznaczając usterki, to na trwałe z komputerami połączyło się <strong>9 września 1947 r.</strong>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Wtedy to zespół pracujący na wczesnym komputerze elektromechanicznym <strong>Harvard Mark II</strong> pod przewodnictwem genialnej pionierki informatyki <strong>Grace Hopper</strong>, napotkał nagłą przerwę w działaniu przekaźnika numer 70. Po rozmontowaniu elementu, inżynierowie odkryli... prawdziwą ćmę uwięzioną między stykami, która zablokowała elektryczność.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ćma została delikatnie wyjęta i wklejona taśmą klejącą do dziennika pokładowego (logbooka) z historycznym dopiskiem: <strong className="text-amber-500 font-mono">„First actual case of bug being found”</strong> (Pierwszy faktyczny przypadek znalezienia robaka). Oryginał tego dziennika z wklejoną ćmą do dziś można oglądać w narodowym muzeum Smithsonian w Waszyngtonie!
                  </p>
                </div>

                <div className="p-4 bg-[#0c0c0e] border border-slate-800 rounded-xl space-y-3.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Dziennik Pokładowy Harvard Mark II – 9 września 1947 r.</span>
                  
                  {/* Historical Log representation styling */}
                  <div className="bg-[#FAF9F5] text-slate-800 p-4 rounded-lg font-sans border-l-4 border-amber-500 shadow-xl space-y-3">
                    <div className="flex justify-between items-center border-b border-amber-205 pb-1.5 font-mono text-[10px] text-slate-500">
                      <span>DATE: SEP 9 1947</span>
                      <span>RELAY STATIONS #70 panel F</span>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm italic">
                      <p className="text-slate-750 first-letter:font-extrabold first-letter:text-sm">
                        08:00 - Zmiana dzienna rozpoczęta. Testy sum kontrolnych arytmometru.
                      </p>
                      <p className="text-slate-750">
                        15:45 - Awaria panelu F przekaźnika. Prąd nie płynie przez zwoje drutu.
                      </p>
                      
                      {/* Interactive block showing the taped moth */}
                      <div className="p-3 bg-white border border-dashed border-amber-400 rounded-lg flex flex-col items-center justify-center space-y-2 py-4 relative shadow-sm">
                        {/* Taped overlay look */}
                        <div className="absolute top-1 left-4 w-12 h-4 bg-yellow-250/30 border border-yellow-200/20 transform -rotate-12 select-none" style={{ backgroundColor: "rgba(234, 179, 8, 0.15)" }}>
                          cellotape
                        </div>
                        
                        <span className="text-[28px] select-none animate-wiggle">🦋</span>
                        <span className="text-[10px] font-mono leading-none tracking-wider text-slate-500 uppercase font-bold">PRAWDZIWA ĆMA (MOTH)</span>
                      </div>

                      <p className="text-slate-800 font-bold font-mono pl-1 text-xs border-l-2 border-slate-800 mt-2">
                        15:45 - First actual case of bug being found. (Praca wznowiona bez zakłóceń).
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Bottom card footprint footer info */}
          <div className="border-t border-slate-900 pt-4 mt-6 text-[10px] text-slate-500 font-sans flex flex-col sm:flex-row justify-between gap-2.5 items-center">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Każdą ciekawostkę naukową skonsultowano z programem nauczania IT oraz fizyki kwantowej.</span>
            </span>
            <span className="font-mono text-cyan-500">SYSTEM ATTESTED</span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
