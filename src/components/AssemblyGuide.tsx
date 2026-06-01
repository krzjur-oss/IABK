/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ASSEMBLY_STEPS, PC_COMPONENTS, ComponentInfo } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Check, Info, AlertTriangle, Monitor, Play, Wrench, RefreshCw, Volume2, Layers } from "lucide-react";

export default function AssemblyGuide() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [assembledParts, setAssembledParts] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBootSequence, setShowBootSequence] = useState<boolean>(false);
  const [bootLog, setBootLog2] = useState<string[]>([]);

  const currentStep = ASSEMBLY_STEPS[currentStepIdx];
  const totalSteps = ASSEMBLY_STEPS.length;
  const isFinished = currentStepIdx >= totalSteps;

  // Sound Synth Synthesizer for cool interface feedback
  const playSynthSound = (type: "success" | "fail" | "boot" | "click") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === "success") {
        // High double-beep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.setValueAtTime(900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "fail") {
        // Low buzzy sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "click") {
        // Tiny metal-like click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "boot") {
        // Full old PC bios beep with synth whine
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {
      console.log("AudioContext blocked or unsupport:", e);
    }
  };

  const handleComponentClick = (component: ComponentInfo) => {
    if (isFinished) return;

    playSynthSound("click");

    if (component.id === currentStep.targetComponentId) {
      // Correct component for the current step!
      playSynthSound("success");
      setAssembledParts([...assembledParts, component.id]);
      setErrorMessage(null);

      // Advance step
      if (currentStepIdx + 1 >= totalSteps) {
        // All parts assembled! Trigger successful boot preparation
        setCurrentStepIdx(totalSteps);
      } else {
        setCurrentStepIdx(currentStepIdx + 1);
      }
    } else {
      // Incorrect component!
      playSynthSound("fail");
      // Find what step the clicked component actually belongs to
      const actualStep = ASSEMBLY_STEPS.find(s => s.targetComponentId === component.id);
      if (actualStep) {
        setErrorMessage(
          `Błąd kolejności! "${component.name}" powinien być zamontowany w kroku ${actualStep.step}: "${actualStep.title}". Musisz najpierw wykonać: "${currentStep.title}".`
        );
      } else {
        setErrorMessage(
          `Tej części ("${component.name}") nie montujemy bezpośrednio w płycie głównej komputera lub jest ona częścią zewnętrzną.`
        );
      }
    }
  };

  const startBootProcess = () => {
    playSynthSound("boot");
    setShowBootSequence(true);
    setBootLog2([]);

    const messages = [
      "🔄 Phoenix BIOS v4.0.6 initialize...",
      "⚙️ Procesor: AMD Ryzen 5 detected @ 4.20GHz",
      "Memory: 32768 MB RAM DDR5 detected in Dual-Channel... OK!",
      "🔍 Szukanie urządzeń rozruchowych...",
      "💾 Wykryto napęd: NVMe SSD 1024GB (PCIe Gen4 x4) - Status SMART: IDEALNY",
      "🔌 Zasilanie stabilne (Vcore: 1.22V, +12V: 12.04V, +5V: 5.01V)",
      "🖥️ Karta graficzna: GPU vBIOS vxyz loaded. Resolution FHD ok.",
      "🚀 Wszystkie testy POST zakończone pomyślnie!",
      "🟢 BOOTING OPERATING SYSTEM 'ATLAS_OS v1.0.4'...",
      "🎮 Inicjalizacja sterowników graficznych DirectX/Vulkan...",
      "✨ SYSTEM URUCHOMIONY POMYŚLNIE!"
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setBootLog2((prev) => [...prev, msg]);
      }, (idx + 1) * 350);
    });
  };

  const handleReset = () => {
    playSynthSound("click");
    setCurrentStepIdx(0);
    setAssembledParts([]);
    setErrorMessage(null);
    setShowBootSequence(false);
    setBootLog2([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[530px] items-stretch" id="assembly-simulator-root">
      {/* Table / Workbench area (Left screen span 7) */}
      <div className="lg:col-span-7 flex flex-col h-full min-h-0">
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden h-full shadow-2xl">
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Workbench Header */}
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800/80 flex items-center w-fit">
                <Wrench className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                Warsztat i Stół Montażowy
              </span>
              <h1 className="text-xl font-bold text-white mt-2">
                {isFinished ? "Komputer Zmontowany!" : "Stanowisko Konstruktora"}
              </h1>
            </div>

            <button
              onClick={handleReset}
              className="text-xs flex items-center space-x-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/60 px-3 py-1.5 rounded-xl transition-all"
              id="btn-reset-assembly"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Zacznij od nowa</span>
            </button>
          </div>

          <div className="flex-1 my-6 flex flex-col items-center justify-center z-10 relative">
            <AnimatePresence mode="wait">
              {!isFinished ? (
                <motion.div
                  key="assembling-case"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Schematic Drawing of PC Frame that populates dynamically */}
                  <div className="relative w-64 h-64 border-4 border-dashed border-slate-800 rounded-3xl flex items-center justify-center bg-slate-950/60 p-6 shadow-inner">
                    <span className="absolute -top-3 bg-slate-900 px-3 text-xs font-semibold text-slate-400 border border-slate-800 rounded-full">
                      Pionowa tacka montażowa
                    </span>

                    {/* MOBO outline */}
                    <div
                      className={`w-full h-full border-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                        assembledParts.includes("mobo")
                          ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : "border-slate-850 bg-slate-900/10 opacity-30"
                      }`}
                    >
                      <span className="text-[10px] text-cyan-400 font-bold font-mono uppercase tracking-wider mb-2">
                        {assembledParts.includes("mobo") ? "✔ Płyta Główna (LGA)" : "Płyta Główna"}
                      </span>

                      <div className="grid grid-cols-2 gap-3 w-4/5">
                        {/* CPU Socket inside motherboard */}
                        <div
                          className={`aspect-square rounded border flex items-center justify-center transition-all ${
                            assembledParts.includes("cpu")
                              ? "border-red-500 bg-red-950/40"
                              : "border-slate-700"
                          }`}
                        >
                          <span className="text-[9px] text-red-400 font-bold">CPU</span>
                        </div>

                        {/* RAM Slots */}
                        <div className="flex flex-col space-y-1 justify-center">
                          <div
                            className={`h-2.5 w-full rounded-sm transition-all ${
                              assembledParts.includes("ram") ? "bg-purple-500" : "bg-slate-700"
                            }`}
                          />
                          <div
                            className={`h-2.5 w-full rounded-sm transition-all ${
                              assembledParts.includes("ram") ? "bg-purple-500" : "bg-slate-700"
                            }`}
                          />
                        </div>

                        {/* SSD slot */}
                        <div
                          className={`h-3 w-full rounded border flex items-center justify-center transition-all ${
                            assembledParts.includes("ssd")
                              ? "border-pink-500 bg-pink-950/40"
                              : "border-slate-700"
                          }`}
                        >
                          <span className="text-[8px] text-pink-400">SSD</span>
                        </div>

                        {/* Cooler icon overlay */}
                        <div
                          className={`aspect-square rounded border flex items-center justify-center transition-all ${
                            assembledParts.includes("cooler")
                              ? "border-sky-500 bg-sky-950/40"
                              : "border-slate-700"
                          }`}
                        >
                          <span className="text-[9px] text-sky-400">Cooler</span>
                        </div>
                      </div>

                      {/* GPU long horizontal block */}
                      <div
                        className={`mt-4 w-11/12 h-8 rounded border flex items-center justify-center transition-all ${
                          assembledParts.includes("gpu")
                            ? "border-amber-500 bg-amber-950/40"
                            : "border-slate-755 opacity-20"
                        }`}
                      >
                        <span className="text-[9px] text-amber-400 font-bold">GRAFIKA (GPU)</span>
                      </div>
                    </div>

                    {/* Floating indicator pointing to what is needed */}
                    <div className="absolute -right-3 top-1/4 bg-cyan-500 text-slate-950 rounded-full p-1.5 animate-bounce shadow-lg">
                      <Wrench className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-450 mt-4 text-center max-w-sm">
                    Po kliknięciu właściwej części na palecie po prawej, zostanie ona mechanicznie zablokowana we właściwym slocie płyty.
                  </p>
                </motion.div>
              ) : !showBootSequence ? (
                <motion.div
                  key="assembly-finished-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/40 border border-slate-800 rounded-3xl max-w-md w-full"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Check className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">Wszystkie części zamontowane!</h3>
                  <p className="text-xs text-slate-405 mt-2">
                    Skrzynia komputera została zamknięta, kable zasilające wpięte. Czas na ostateczny test rozruchowy (POST boot test) w symulatorze systemu!
                  </p>
                  <button
                    onClick={startBootProcess}
                    className="mt-6 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95"
                    id="btn-run-boot"
                  >
                    <Play className="w-4 h-4 fill-white text-white" />
                    <span>URUCHOM KOMPUTER (BOOT TEST)</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="boot-terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-[#070708] border border-slate-800/80 rounded-2xl p-4 font-mono text-xs text-cyan-400 shadow-inner h-64 overflow-y-auto flex flex-col text-left select-text relative"
                >
                  {/* Neon screen scanlines effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none [background-size:100%_4px]" />

                  {/* Terminal Output */}
                  <div className="flex-1 space-y-1 z-10">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1.5 mb-2 font-sans font-bold uppercase">
                      <span>🖥️ Wyjście monitora (HDMI_S1)</span>
                      <span className="text-cyan-400 animate-pulse">● LIVE STATUS</span>
                    </div>

                    {bootLog.map((log, index) => (
                      <div key={index} className="leading-5">
                        {log}
                      </div>
                    ))}

                    {bootLog.length < 11 && (
                      <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                    )}
                  </div>

                  {bootLog.length >= 11 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-cyan-300 flex items-center justify-between font-sans z-10"
                    >
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-5 h-5 text-cyan-400 animate-bounce" />
                        <div>
                          <p className="text-xs font-bold text-slate-200">Twój komputer działa!</p>
                          <p className="text-[10px] text-slate-400">Pomyślnie złożyłeś wydajną maszynę.</p>
                        </div>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded hover:bg-slate-800 transition-all"
                        id="btn-restart-simulator-boot"
                      >
                        Rozpocznij Nowy Montaż
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Step Instructions */}
          {!isFinished && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 z-10">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0 self-start">
                {currentStep.step}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-200 flex items-center">
                  Cel kroku: <span className="text-cyan-400 ml-1.5">{currentStep.title}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {currentStep.description}
                </p>
                <div className="flex items-center mt-2.5 text-[10.5px] text-amber-300 font-semibold bg-amber-500/5 px-2 py-1 rounded border border-amber-500/15 w-fit">
                  <Info className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Wskazówka: {currentStep.hint}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Error Status Alerts */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-300 flex items-start space-x-2.5 shadow-md"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 self-start mt-0.5" />
              <div>
                <span className="font-bold">Ostrzeżenie:</span> {errorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Assembly Component Parts Selector (Right screen span 5) */}
      <div className="lg:col-span-5 flex flex-col h-full min-h-0">
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl flex flex-col h-full overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-450 mb-3.5 flex items-center">
            <Layers className="w-4 h-4 mr-1.5 text-cyan-400" />
            Paleta Podzespołów (Spis Części)
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {PC_COMPONENTS.map((comp) => {
              const alreadyAssembled = assembledParts.includes(comp.id);
              const isTargetNext = !isFinished && currentStep.targetComponentId === comp.id;

              return (
                <button
                  key={comp.id}
                  onClick={() => handleComponentClick(comp)}
                  disabled={alreadyAssembled}
                  className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden flex items-center justify-between group ${
                    alreadyAssembled
                      ? "bg-slate-950/70 border-slate-900 opacity-40 cursor-not-allowed"
                      : isTargetNext
                      ? "bg-cyan-950/15 border-cyan-500/70 hover:bg-cyan-900/15 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                      : "bg-slate-950/30 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                  id={`palette-item-${comp.id}`}
                >
                  {/* Small absolute highlight border if it's the target */}
                  {isTargetNext && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
                  )}

                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: comp.colorHex }}
                      />
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-white">
                        {comp.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {comp.role}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {alreadyAssembled ? (
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-2.5 py-1 text-[10px] font-bold text-cyan-450 flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Dodane</span>
                      </div>
                    ) : isTargetNext ? (
                      <div className="bg-cyan-500 text-slate-950 font-bold px-2 py-1 rounded text-[10px] animate-pulse uppercase">
                        Zamontuj
                      </div>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-800">
                        Zadanie {comp.id === "case" ? "1" : comp.id === "cpu" ? "Krok 1" : "Krok " + (ASSEMBLY_STEPS.findIndex(s=>s.targetComponentId === comp.id) + 1)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3.5 mt-4 text-[10.5px] text-slate-400 flex items-center space-x-1.5 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            <Volume2 className="w-4 h-4 text-cyan-450" />
            <span>Kreator symuluje kompletne sygnały sprzętowe i procesy POST w gnieździe CPU.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
