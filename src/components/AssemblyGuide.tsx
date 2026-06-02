/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ASSEMBLY_STEPS, PC_COMPONENTS, ComponentInfo } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  Info, 
  AlertTriangle, 
  Monitor, 
  Play, 
  Wrench, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Layers, 
  ShieldAlert, 
  Cpu, 
  Activity 
} from "lucide-react";

// Pro Safety and Expert details for education
const EXPERT_NOTES: Record<string, { warning: string; proTip: string }> = {
  cpu: {
    warning: "Nigdy nie dotykaj pinów w gnieździe LGA na płycie głównej! Wygięcie chociaż jednego z nich trwale uszkodzi piny socketu.",
    proTip: "Dopasuj złoty narożny trójkąt procesora do trójkątnego oznaczenia na narożniku gniazda. Procesor powinien gładko opaść bez użycia jakiejkolwiek siły."
  },
  ram: {
    warning: "Niedociśnięcie pamięci RAM to najczęstsza przyczyna czarnego ekranu przy pierwszym rozruchu. Wywołuje to świecenie diody DRAM Debug LED.",
    proTip: "Pamiętaj o instalacji w bankach 2 i 4 (A2 i B2), aby uruchomić tryb Dual-Channel, zwiększający przepustowość pamięci o niemal 100%."
  },
  ssd: {
    warning: "Zawsze używaj dedykowanego kołka dystansowego. Dokręcenie dysku bezpośrednio do laminatu płyty głównej wygnie i uszkodzi złącze M.2.",
    proTip: "Jeśli Twoja płyta posiada fabryczne radiatory M.2 (heatsinki), koniecznie zdejmij przezroczystą folię z taśmy termoprzewodzącej przed nałożeniem."
  },
  cooler: {
    warning: "KARDYNALNY BŁĄD: Pozostawienie przezroczystej naklejki 'PEEL OFF' na miedzianej stopce chłodzenia uniemożliwi odprowadzanie ciepła i grozi spaleniem CPU.",
    proTip: "Przewód 4-pin od wentylatora wepnij wyłącznie w gniazdo oznaczone 'CPU_FAN'. Inne złącza (np. SYS_FAN, CHA_FAN) nie regulują prawidłowo obrotów."
  },
  psu: {
    warning: "Unikaj tanich zasilaczy bez certyfikatu sprawności. Słabej jakości zasilacz impulsowy może w razie zwarcia uszkodzić pozostałe drogie podzespoły.",
    proTip: "Zamontuj zasilacz wentylatorem skierowanym ku dołowi, aby samodzielnie pobierał chłodne powietrze spod spodu obudowy przez wydzielony filtr."
  },
  gpu: {
    warning: "Niedociśnięcie wtyczek zasilania (zwłaszcza 16-pinowych 12VHPWR) może wywołać iskrzenie, skrajne nagrzanie i stopienie gniazda graficznego.",
    proTip: "Wsuwaj kartę pionowo w slot PCIe x16, aż usłyszysz wyraźne kliknięcie plastikowego zatrzasku z boku. Pamiętaj o dokręceniu śledzi do tyłu obudowy."
  }
};

export default function AssemblyGuide() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [assembledParts, setAssembledParts] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showBootSequence, setShowBootSequence] = useState<boolean>(false);
  const [bootLog, setBootLog2] = useState<string[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  const currentStep = ASSEMBLY_STEPS[currentStepIdx];
  const totalSteps = ASSEMBLY_STEPS.length;
  const isFinished = currentStepIdx >= totalSteps;

  // Sound Synth Synthesizer for cool interface feedback
  const playSynthSound = (type: "success" | "fail" | "boot" | "click") => {
    if (!isSoundEnabled) return;
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
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "fail") {
        // Low buzzy sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "click") {
        // Tiny metal-like click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
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
        osc.frequency.setValueAtTime(950, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.15);
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
          `Błąd kolejności! "${component.name}" powinien być zamontowany w kroku ${actualStep.step}: "${actualStep.title}". Postępuj zgodnie z instrukcją techniczną – musisz najpierw wykonać: "${currentStep.title}".`
        );
      } else {
        setErrorMessage(
          `Komponent "${component.name}" został już zamontowany lub nie montujemy go bezpośrednio w gniazdach płyty.`
        );
      }
    }
  };

  const startBootProcess = () => {
    playSynthSound("boot");
    setShowBootSequence(true);
    setBootLog2([]);

    const messages = [
      "🔄 Inicjalizacja magistrali UEFI / Phoenix BIOS v4.0.6...",
      "⚙️ POST CPU Check: Wykryto procesor AMD Ryzen 5 @ 4.20GHz... SPRAWNY",
      "📊 POST DRAM Check: System wykrył 32768 MB RAM DDR5 Dual-Channel @ 6000MHz",
      "💾 POST NVMe Check: Wykryto szybki nośnik M.2 SSD 1024GB (PCIe Gen4 x4)",
      "🔍 Testowanie zasilania: Vcore: 1.21V, linia +12V: 12.02V, linia +5V: 5.00V [MOC STABILNA]",
      "🖥️ POST VGA Check: Wykryto i załadowano BIOS karty graficznej (PCIe Gen4 16x)",
      "🚀 Testy diagnostyczne POST (Power-On Self-Test) zakończone PEMYSŚLNIE!",
      "🟢 Rozpoczynanie rozruchu systemu operacyjnego 'ATLAS_OS v1.0.4'...",
      "🎮 Inicjalizacja sterowników akceleracji sprzętowej DirectX 12 / Vulkan API...",
      "🔧 Konfiguracja podsieci sieciowej oraz diagnostyka lokalnych interfejsów...",
      "✨ SYSTEM ATLAS_OS URUCHOMIONY POMYŚLNIE!"
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

  // Helper flags
  const hasCpu = assembledParts.includes("cpu");
  const hasRam = assembledParts.includes("ram");
  const hasSsd = assembledParts.includes("ssd");
  const hasCooler = assembledParts.includes("cooler");
  const hasPsu = assembledParts.includes("psu");
  const hasGpu = assembledParts.includes("gpu");

  // Determine current component we are targeting
  const targetId = !isFinished ? currentStep.targetComponentId : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="assembly-simulator-root">
      
      {/* Table / Workbench area (Left screen span 7) */}
      <div className="lg:col-span-7 flex flex-col h-full min-h-0 min-w-0">
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-4 md:p-6 relative flex flex-col justify-between overflow-hidden h-full shadow-2xl">
          {/* Subtle grid accent background */}
          <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Workbench Header */}
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-405 font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800/80 flex items-center w-fit">
                <Wrench className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                Interaktywny Schemat Montażu
              </span>
              <h1 className="text-lg md:text-xl font-bold text-white mt-1.5">
                {isFinished ? "Komputer Zmontowany Pomyślnie!" : "Stanowisko Konstruktora Hardware"}
              </h1>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {/* Sound Toggle Button */}
              <button
                onClick={() => {
                  setIsSoundEnabled(!isSoundEnabled);
                  playSynthSound("click");
                }}
                className={`p-2 rounded-xl border text-xs flex items-center justify-center transition-all ${
                  isSoundEnabled 
                    ? "bg-slate-900 border-cyan-500/30 text-cyan-400 hover:bg-slate-800" 
                    : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400"
                }`}
                title={isSoundEnabled ? "Wyłącz dźwięki" : "Włącz dźwięki"}
                id="btn-toggle-sound"
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleReset}
                className="text-xs flex items-center space-x-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/60 px-3 py-2 rounded-xl transition-all"
                id="btn-reset-assembly"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Graphical Workbench Board (SVG centered, fully vector-scalable to prevent layout breaks) */}
          <div className="flex-1 my-4 flex flex-col items-center justify-center z-10 relative bg-slate-950/40 rounded-xl border border-slate-900 p-2 md:p-4 min-h-[320px] md:min-h-[380px]" id="workbench-board-viewport">
            <AnimatePresence mode="wait">
              {!isFinished ? (
                <motion.div
                  key="assembling-case"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <svg 
                    viewBox="0 0 540 380" 
                    className="w-full h-full max-h-[350px] aspect-[540/380] drop-shadow-2xl select-none"
                    id="motherboard-svg"
                  >
                    <defs>
                      {/* Grid Pattern inside target slot frames */}
                      <pattern id="slot-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#475569" opacity="0.6" />
                      </pattern>
                      {/* Circuit board copper trace lines */}
                      <path id="circuit-wire" d="M 50,50 L 100,50 L 120,70" stroke="#0e7490" strokeWidth="1" fill="none" opacity="0.4" />
                    </defs>

                    {/* INTERACTIVE WORKSPACE BACKGROUND BOARD */}
                    {/* If PSU (Step 5+) is on, show inside ATX Cabinet Chassis block, otherwise show Anti-static cardboard box packaging! */}
                    {hasPsu ? (
                      <g id="atx-chassis-layer">
                        {/* Dark steel cabinet chassis frame */}
                        <rect x="15" y="15" width="510" height="350" rx="16" fill="#030712" stroke="#334155" strokeWidth="3" />
                        <rect x="25" y="25" width="490" height="330" rx="10" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
                        {/* Mesh background design */}
                        <line x1="30" y1="28" x2="480" y2="28" stroke="#1e293b" strokeWidth="3" strokeDasharray="5,5" />
                        {/* Screws mounting on chassis corners */}
                        <circle cx="35" cy="35" r="4.5" fill="#475569" stroke="#1e293b" />
                        <circle cx="505" cy="35" r="4.5" fill="#475569" stroke="#1e293b" />
                        <circle cx="35" cy="345" r="4.5" fill="#475569" stroke="#1e293b" />
                        <text x="40" y="32" fill="#475569" fontSize="7px" fontFamily="monospace">CHASSIS MOUNT - ATX STANDARD</text>
                      </g>
                    ) : (
                      <g id="cardboard-box-layer">
                        {/* Simulated Motherboard Retail Box holding laminate */}
                        <rect x="15" y="15" width="510" height="350" rx="16" fill="#080d19" stroke="#0891b2" strokeWidth="2.5" opacity="0.9" />
                        <rect x="25" y="25" width="490" height="330" rx="10" fill="#0d1527" stroke="#1e293b" strokeWidth="1" />
                        {/* Tech box printing decoration */}
                        <line x1="25" y1="25" x2="160" y2="160" stroke="#0891b2" strokeWidth="0.5" opacity="0.15" />
                        <line x1="490" y1="25" x2="350" y2="165" stroke="#0891b2" strokeWidth="0.5" opacity="0.15" />
                        <text x="40" y="42" fill="#0891b2" fontSize="9px" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2" opacity="0.4">ATLAS HARDWARE WORKBENCH</text>
                        <text x="40" y="55" fill="#475569" fontSize="7px" fontFamily="monospace" opacity="0.5">LAMINAT POZA OBUDOWĄ (STÓŁ ANTYSTATYCZNY)</text>
                      </g>
                    )}


                    {/* 1. THE MOTHERBOARD BOARD PCB */}
                    {/* Situate at (80, 50) of width 340, height 280 */}
                    <g id="motherboard-pcb">
                      {/* PCB Laminat */}
                      <rect 
                        x="80" 
                        y="50" 
                        width="350" 
                        height="260" 
                        rx="12" 
                        fill={hasPsu ? "#050f1a" : "#021220"} 
                        stroke={hasPsu ? "#0ea5e9" : "#0891b2"} 
                        strokeWidth="2" 
                      />
                      
                      {/* Decorative Copper/Gold Circuits lanes */}
                      <path d="M 90,65 L 140,65" stroke="rgba(8, 145, 178, 0.25)" strokeWidth="1.5" fill="none" />
                      <path d="M 90,85 L 130,85 L 145,100" stroke="rgba(8, 145, 178, 0.25)" strokeWidth="1.5" fill="none" />
                      <path d="M 230,165 L 230,220 L 260,225" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1.5" fill="none" />
                      <path d="M 180,250 L 180,275 L 195,290" stroke="rgba(8, 145, 178, 0.25)" strokeWidth="1.5" fill="none" />
                      <line x1="280" y1="60" x2="280" y2="150" stroke="rgba(8, 145, 178, 0.15)" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Left I/O Shield Ports Block */}
                      <rect x="70" y="65" width="10" height="120" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                      <rect x="72" y="73" width="6" height="10" rx="1" fill="#475569" />
                      <rect x="72" y="90" width="6" height="15" rx="1" fill="#0891b2" />
                      <rect x="72" y="112" width="6" height="15" rx="1" fill="#475569" />

                      {/* Sata Ports at right */}
                      <rect x="422" y="195" width="10" height="25" rx="2" fill="#0f172a" stroke="#334155" />
                      <rect x="422" y="225" width="10" height="25" rx="2" fill="#0f172a" stroke="#334155" />

                      {/* PCIe x16 Socket Slot (Bottom portion of Mobo) */}
                      <rect x="110" y="235" width="280" height="10" rx="2" fill="#090d16" stroke="#334155" strokeWidth="1" />
                      <text x="120" y="232" fill="#475569" fontSize="6px" fontFamily="monospace">PCIEX16_1 STEEL ARMOR</text>

                      {/* Chipset Heatsink styling */}
                      <rect x="335" y="170" width="65" height="50" rx="4" fill="#111827" stroke="#1f2937" strokeWidth="1" />
                      <path d="M 345,175 L 390,175 M 345,182 L 390,182 M 345,189 L 390,189" stroke="#374151" strokeWidth="2" />
                      <text x="367" y="210" fill="#0ea5e9" fontSize="7px" fontFamily="sans-serif" fontWeight="bold">CHIPSET B650</text>


                      {/* 2. CPU SOCKET & CPU HARDWARE */}
                      {/* Situated around (170, 115) */}
                      <g id="cpu-socket-area">
                        {/* Target breathing halo circle if target is cpu */}
                        {targetId === "cpu" && (
                          <circle cx="170" cy="115" r="45" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                        )}

                        {/* CPU Socket Plastic frame */}
                        <rect x="135" y="80" width="70" height="70" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        
                        {/* Grid of contact pads pins */}
                        <rect x="141" y="86" width="58" height="58" rx="2" fill="url(#slot-grid)" />

                        {/* Metal Lever ARM */}
                        {!hasCpu ? (
                          // Lever open pointing diagonally upward
                          <line x1="205" y1="120" x2="225" y2="85" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                        ) : (
                          // Lever down locked
                          <line x1="205" y1="120" x2="205" y2="148" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                        )}

                        {/* Render CPU once added */}
                        {hasCpu && (
                          <motion.g 
                            initial={{ opacity: 0, scale: 1.2, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="transition-all duration-300"
                          >
                            {/* CPU IHS (Integrated Heat Spreader) metal lid */}
                            <rect x="139" y="84" width="62" height="62" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                            <rect x="145" y="90" width="50" height="50" rx="2" fill="#1e293b" />
                            <text x="170" y="105" fill="#94a3b8" fontSize="7px" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">AMD RYZEN</text>
                            <text x="170" y="117" fill="#475569" fontSize="6px" fontFamily="monospace" textAnchor="middle">AM5 LGA-1718</text>
                            <text x="170" y="128" fill="#475569" fontSize="6px" fontFamily="monospace" textAnchor="middle">DIFF 1.25V</text>

                            {/* Small golden triangle helper in bottom-left corner */}
                            <polygon points="140,144 145,144 140,139" fill="#f59e0b" />
                          </motion.g>
                        )}

                        {/* Thermal Paste layer - visible ONLY: cpu is assembled but CPU Cooler is NOT yet */}
                        {hasCpu && !hasCooler && (
                          <g id="thermal-paste-cross">
                            <line x1="160" y1="105" x2="180" y2="125" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                            <line x1="180" y1="105" x2="160" y2="125" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                            <circle cx="170" cy="115" r="5" fill="#cbd5e1" />
                            <text x="170" y="141" fill="#38bdf8" fontSize="6.5px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PASTA NAŁOŻONA</text>
                          </g>
                        )}
                      </g>


                      {/* 3. DDR5 MEMORY SLOTS & RAM MODULES */}
                      {/* Situate to the right of CPU: x positions around 250 - 280 */}
                      <g id="dimm-slots-area">
                        {/* Target breathing halo highlight for RAM */}
                        {targetId === "ram" && (
                          <rect x="250" y="60" width="46" height="110" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
                        )}

                        {/* 4 physical slots */}
                        {/* Slot 1 */}
                        <rect x="253" y="65" width="4" height="100" rx="1" fill="#090d16" stroke="#1e293b" strokeWidth="0.5" />
                        {/* Slot 2 (Target Channel A2) */}
                        <rect x="263" y="65" width="4" height="100" rx="1" fill="#020617" stroke="#1e293b" strokeWidth="0.5" />
                        {/* Slot 3 */}
                        <rect x="273" y="65" width="4" height="100" rx="1" fill="#090d16" stroke="#1e293b" strokeWidth="0.5" />
                        {/* Slot 4 (Target Channel B2) */}
                        <rect x="283" y="65" width="4" height="100" rx="1" fill="#020617" stroke="#1e293b" strokeWidth="0.5" />

                        {/* Side Retention clips */}
                        <rect x="251" y="60" width="8" height="5" fill="#475569" rx="1" />
                        <rect x="251" y="165" width="8" height="5" fill="#475569" rx="1" />
                        <rect x="271" y="60" width="8" height="5" fill="#475569" rx="1" />
                        <rect x="271" y="165" width="8" height="5" fill="#475569" rx="1" />

                        {/* Active clips for target slots A2/B2 (pulled open if RAM not present) */}
                        {!hasRam ? (
                          <>
                            <line x1="265" y1="63" x2="260" y2="58" stroke="#475569" strokeWidth="2" />
                            <line x1="285" y1="63" x2="280" y2="58" stroke="#475569" strokeWidth="2" />
                          </>
                        ) : (
                          <>
                            {/* Clipped down */}
                            <line x1="265" y1="63" x2="265" y2="60" stroke="#cbd5e1" strokeWidth="2.5" />
                            <line x1="285" y1="63" x2="285" y2="60" stroke="#cbd5e1" strokeWidth="2.5" />
                          </>
                        )}

                        {/* Assembled RAM sticks in Slot 2 and Slot 4 (Dual-channel) */}
                        {hasRam && (
                          <motion.g 
                            initial={{ opacity: 0, y: -25 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="transition-all duration-300"
                          >
                            {/* Ram Module Slot A2 */}
                            <rect x="261" y="58" width="8" height="114" rx="3" fill="#090d16" stroke="#a855f7" strokeWidth="1" />
                            <rect x="264" y="62" width="2" height="106" fill="#c084fc" className="animate-pulse" />
                            {/* Gold pins tiny accents */}
                            <line x1="261" y1="165" x2="269" y2="165" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="1,1" />

                            {/* Ram Module Slot B2 */}
                            <rect x="281" y="58" width="8" height="114" rx="3" fill="#090d16" stroke="#a855f7" strokeWidth="1" />
                            <rect x="284" y="62" width="2" height="106" fill="#c084fc" className="animate-pulse" />
                            <line x1="281" y1="165" x2="289" y2="165" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="1,1" />
                            
                            <text x="272" y="52" fill="#c084fc" fontSize="6px" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DDR5 RGB</text>
                          </motion.g>
                        )}
                      </g>


                      {/* 4. NVMe PCIe M.2 SSD UNIT */}
                      {/* Located between CPU socket and PCIe: centered around (180, 185) */}
                      <g id="m2-ssd-area">
                        {/* Target breathing highlight */}
                        {targetId === "ssd" && (
                          <rect x="140" y="178" width="70" height="14" rx="3" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
                        )}

                        {/* M.2 Connector slot block */}
                        <rect x="135" y="179" width="6" height="12" fill="#090d16" stroke="#334155" />
                        <circle cx="210" cy="185" r="2.5" fill="#64748b" /> {/* Screw post */}

                        {/* Added SSD card */}
                        {hasSsd && (
                          <motion.g 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="transition-all duration-300"
                          >
                            {/* Matte black SSD board */}
                            <rect x="141" y="179" width="65" height="12" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                            {/* DRAM & NAND Flash controllers block layout */}
                            <rect x="145" y="181" width="8" height="8" rx="0.5" fill="#0f172a" />
                            <rect x="156" y="181" width="14" height="8" rx="0.5" fill="#0f172a" />
                            <rect x="173" y="181" width="14" height="8" rx="0.5" fill="#0f172a" />
                            {/* Shiny brand label */}
                            <rect x="190" y="181" width="12" height="8" fill="#ec4899" opacity="0.7" />
                            
                            {/* Tiny lock screw tightened */}
                            <circle cx="210" cy="185" r="2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
                            <line x1="209" y1="185" x2="211" y2="185" stroke="#1e293b" />
                          </motion.g>
                        )}
                      </g>


                      {/* 5. CPU COOLER DEVICE (HEATSINK + ACTIVE FAN) */}
                      {/* Centered directly over the CPU socket coordinates (170, 115) */}
                      {hasCooler && (
                        <motion.g 
                          initial={{ opacity: 0, scale: 1.3 }}
                          animate={{ opacity: 1, scale: 1 }}
                          id="cpu-cooler-assembly"
                          className="transition-all duration-300"
                        >
                          {/* Radial glowing ring of cooler fan */}
                          <circle cx="170" cy="115" r="48" fill="none" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="4" />
                          
                          {/* Square mounting brackets brackets on the sides */}
                          <rect x="120" y="90" width="10" height="50" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.8" />
                          <circle cx="125" cy="98" r="2" fill="#cbd5e1" />
                          <circle cx="125" cy="132" r="2" fill="#cbd5e1" />

                          <rect x="210" y="90" width="10" height="50" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.8" />
                          <circle cx="215" cy="98" r="2" fill="#cbd5e1" />
                          <circle cx="215" cy="132" r="2" fill="#cbd5e1" />

                          {/* Large circular radiator outer frame shroud */}
                          <circle cx="170" cy="115" r="44" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" className="drop-shadow-lg" />
                          {/* Outer copper cooling pipe lines circles */}
                          <circle cx="170" cy="115" r="34" fill="none" stroke="#1e293b" strokeWidth="5.5" />

                          {/* Spinning RGB Fan Blades group */}
                          {/* Uses rotate animation IF boot sequence screen running (simulating real system active state) */}
                          <g 
                            className={showBootSequence ? "animate-[spin_2.5s_linear_infinite]" : ""} 
                            style={{ transformOrigin: "170px 115px" }}
                          >
                            {/* Inner core circle */}
                            <circle cx="170" cy="115" r="14" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
                            <circle cx="170" cy="115" r="8" fill="#38bdf8" className="animate-pulse" />

                            {/* Black aerodynamic blades (6 blades structure) */}
                            <path d="M 170,101 C 180,95 190,102 185,115 L 170,115 Z" fill="#1e293b" opacity="0.85" />
                            <path d="M 184,122 C 193,126 193,137 180,135 L 170,115 Z" fill="#1e293b" opacity="0.85" />
                            <path d="M 164,128 C 158,137 147,134 148,121 L 170,115 Z" fill="#1e293b" opacity="0.85" />
                            <path d="M 156,108 C 147,104 147,93 160,95 L 170,115 Z" fill="#1e293b" opacity="0.85" />
                          </g>

                          {/* 4-pin PWM wire routing to CPU_FAN connector */}
                          <path d="M 195,78 C 210,65 240,65 240,65" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" />
                          <circle cx="240" cy="65" r="1.5" fill="#f59e0b" />
                          <text x="240" y="58" fill="#0ea5e9" fontSize="6px" fontFamily="monospace" textAnchor="middle">CPU_FAN</text>
                        </motion.g>
                      )}

                      {/* Highlight area around CPU for cooler mounting step */}
                      {targetId === "cooler" && (
                        <circle cx="170" cy="115" r="50" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,4" className="animate-pulse" />
                      )}


                      {/* 6. POWER SUPPLY & ATX CABINET CABLING SYSTEM */}
                      {/* Situate at bottom PSU bay (coordinates 50 to 450) */}
                      {targetId === "psu" && (
                        <rect x="70" y="295" width="370" height="20" rx="3" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
                      )}

                      {hasPsu && (
                        <g id="power-supply-and-cabling">
                          {/* High-wattage PSU Block in the bottom left side of the ATX chassis chamber */}
                          <rect x="60" y="315" width="130" height="40" rx="6" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
                          {/* Modular Cable sleeves outlets */}
                          <rect x="180" y="322" width="10" height="25" rx="1.5" fill="#1e293b" />
                          
                          {/* Grid texture on PSU representing exhaust fan panel */}
                          <line x1="70" y1="322" x2="135" y2="322" stroke="#1e293b" strokeWidth="2" strokeDasharray="2,2" />
                          <line x1="70" y1="330" x2="135" y2="330" stroke="#1e293b" strokeWidth="2" strokeDasharray="2,2" />
                          <line x1="70" y1="338" x2="135" y2="338" stroke="#1e293b" strokeWidth="2" strokeDasharray="2,2" />
                          <text x="110" y="347" fill="#cbd5e1" fontSize="7px" fontFamily="sans-serif" fontWeight="bold">ATLAS 850W GOLD</text>

                          {/* Thick Power supply sleeved cables (routing up and plugging into Motherboard power headers) */}
                          {/* MB 24-Pin Power flow cable */}
                          <path 
                            d="M 185,330 C 240,332 305,290 305,160" 
                            fill="none" 
                            stroke={showBootSequence ? "#a855f7" : "#0f172a"} 
                            strokeWidth={showBootSequence ? "4" : "3.5"} 
                            strokeLinecap="round" 
                            className={showBootSequence ? "animate-pulse" : ""} 
                          />
                          {/* Motherboard EPS 8-pin power flower cable routing straight down from top */}
                          <path 
                            d="M 140,317 C 110,290 100,105 100,60" 
                            fill="none" 
                            stroke={showBootSequence ? "#a855f7" : "#0f172a"} 
                            strokeWidth={showBootSequence ? "2.5" : "2"} 
                            strokeLinecap="round" 
                          />

                          {/* Physical connectors headers on the mother board */}
                          <rect x="298" y="145" width="14" height="18" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                          <rect x="94" y="52" width="12" height="8" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                        </g>
                      )}


                      {/* 7. GRAPHICS CARD (GPU) OVERLAY */}
                      {/* Mounts into the PCIe slot at coordinates around (70, 190) */}
                      {targetId === "gpu" && (
                        <rect x="90" y="180" width="320" height="52" rx="4" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" className="animate-pulse" />
                      )}

                      {hasGpu && (
                        <motion.g 
                          initial={{ opacity: 0, scale: 1.15, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          id="assembled-gpu-unit"
                          className="transition-all duration-300"
                        >
                          {/* Radial back-glow for active GPU on booting */}
                          {showBootSequence && (
                            <rect x="85" y="178" width="315" height="54" rx="8" fill="none" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="8" className="animate-pulse" />
                          )}

                          {/* Massive metal GPU casing block seating in PCIe slot */}
                          <rect x="90" y="182" width="310" height="46" rx="6" fill="#090d16" stroke="#f59e0b" strokeWidth="2" className="drop-shadow-2xl" />
                          
                          {/* Front shroud geometric plastic details */}
                          <rect x="96" y="188" width="298" height="34" rx="3" fill="#0f172a" />
                          
                          {/* 3 Active cooling Fans on the GPU Shroud */}
                          {/* Fans spin dynamically during BIOS POST boot sequence tests */}
                          {/* Fan 1 (Left) */}
                          <g className={showBootSequence ? "animate-[spin_3.5s_linear_infinite]" : ""} style={{ transformOrigin: "148px 205px" }}>
                            <circle cx="148" cy="205" r="13" fill="#111827" stroke="#374151" strokeWidth="1" />
                            <circle cx="148" cy="205" r="5" fill="#f59e0b" />
                            <line x1="148" y1="192" x2="148" y2="218" stroke="#4b5563" strokeWidth="1.5" />
                            <line x1="135" y1="205" x2="161" y2="205" stroke="#4b5563" strokeWidth="1.5" />
                          </g>

                          {/* Fan 2 (Center) */}
                          <g className={showBootSequence ? "animate-[spin_3.5s_linear_infinite]" : ""} style={{ transformOrigin: "245px 205px" }}>
                            <circle cx="245" cy="205" r="13" fill="#111827" stroke="#374151" strokeWidth="1" />
                            <circle cx="245" cy="205" r="5" fill="#f59e0b" />
                            <line x1="245" y1="192" x2="245" y2="218" stroke="#4b5563" strokeWidth="1.5" />
                            <line x1="232" y1="205" x2="258" y2="205" stroke="#4b5563" strokeWidth="1.5" />
                          </g>

                          {/* Fan 3 (Right) */}
                          <g className={showBootSequence ? "animate-[spin_3.5s_linear_infinite]" : ""} style={{ transformOrigin: "342px 205px" }}>
                            <circle cx="342" cy="205" r="13" fill="#111827" stroke="#374151" strokeWidth="1" />
                            <circle cx="342" cy="205" r="5" fill="#f59e0b" />
                            <line x1="342" y1="192" x2="342" y2="218" stroke="#4b5563" strokeWidth="1.5" />
                            <line x1="329" y1="205" x2="355" y2="205" stroke="#4b5563" strokeWidth="1.5" />
                          </g>

                          {/* Heavy Copper heatsink pipes lines routing through fans */}
                          <line x1="105" y1="205" x2="135" y2="205" stroke="#ea580c" strokeWidth="2.5" opacity="0.6" />
                          <line x1="161" y1="205" x2="232" y2="205" stroke="#ea580c" strokeWidth="2.5" opacity="0.6" />
                          <line x1="258" y1="205" x2="329" y2="205" stroke="#ea580c" strokeWidth="2.5" opacity="0.6" />

                          {/* PCIe GPU power cord (plugged from PSU) */}
                          {hasPsu && (
                            <path 
                              d="M 180,317 C 220,290 380,270 380,220" 
                              fill="none" 
                              stroke={showBootSequence ? "#10b981" : "#111827"} 
                              strokeWidth="3.2" 
                              strokeLinecap="round" 
                              className={showBootSequence ? "animate-pulse" : ""} 
                            />
                          )}

                          <rect x="368" y="180" width="16" height="5" fill="#1e293b" />
                          
                          <text x="245" y="180" fill="#f6e05e" fontSize="7px" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GEFORCE RTX HIGH-POWER DESKTOP GPU</text>
                        </motion.g>
                      )}


                      {/* 8. MOTHERBOARD POST BUG REPORT DIAGNOSTIC DEBUG LEDS */}
                      {/* Located in the upper right corner of the Motherboard layout coordinates (395, 60) */}
                      <g id="motherboard-post-debug-leds">
                        {/* 4 tiny physical SMD LED packages */}
                        <rect x="378" y="58" width="44" height="15" rx="2.5" fill="#040812" stroke="#1e293b" strokeWidth="0.8" />
                        
                        {/* 1. CPU LED (Red) */}
                        <circle 
                          cx="384" cy="65" r="1.8" 
                          fill={showBootSequence && bootLog.length > 0 && bootLog.length <= 2 ? "#ef4444" : "#1e293b"} 
                          className={showBootSequence && bootLog.length > 0 && bootLog.length <= 2 ? "animate-pulse" : ""} 
                        />
                        {/* 2. DRAM LED (Yellow) */}
                        <circle 
                          cx="394" cy="65" r="1.8" 
                          fill={showBootSequence && bootLog.length > 2 && bootLog.length <= 4 ? "#eab308" : "#1e293b"} 
                          className={showBootSequence && bootLog.length > 2 && bootLog.length <= 4 ? "animate-pulse" : ""} 
                        />
                        {/* 3. VGA LED (White) */}
                        <circle 
                          cx="404" cy="65" r="1.8" 
                          fill={showBootSequence && bootLog.length > 4 && bootLog.length <= 7 ? "#f8fafc" : "#1e293b"} 
                          className={showBootSequence && bootLog.length > 4 && bootLog.length <= 7 ? "animate-pulse" : ""} 
                        />
                        {/* 4. BOOT LED (Green) */}
                        <circle 
                          cx="414" cy="65" r="1.8" 
                          fill={showBootSequence && bootLog.length > 7 && bootLog.length < 11 ? "#22c55e" : "#1e293b"} 
                          className={showBootSequence && bootLog.length > 7 && bootLog.length < 11 ? "animate-pulse" : ""} 
                        />

                        {/* Labels for Debug LEDs */}
                        <text x="384" y="70" fill="#475569" fontSize="3.5px" textAnchor="middle" fontFamily="monospace">CPU</text>
                        <text x="394" y="70" fill="#475569" fontSize="3.5px" textAnchor="middle" fontFamily="monospace">RAM</text>
                        <text x="404" y="70" fill="#475569" fontSize="3.5px" textAnchor="middle" fontFamily="monospace">VGA</text>
                        <text x="414" y="70" fill="#475569" fontSize="3.5px" textAnchor="middle" fontFamily="monospace">BT</text>

                        {/* Solid Green System Status OK LED (Lit once BIOS completes boot sequence) */}
                        <circle 
                          cx="414" cy="80" r="2" 
                          fill={showBootSequence && bootLog.length >= 11 ? "#10b981" : "#1e293b"} 
                        />
                        <text x="382" y="82" fill="#475569" fontSize="5px" fontFamily="monospace">POST_OK LED</text>
                      </g>
                    </g>
                  </svg>

                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mt-3 bg-slate-900/60 py-1.5 px-3 rounded-full border border-slate-800">
                    <Activity className="w-3 h-3 text-cyan-400 rotate-12" />
                    <span>Elementy podświetlają się na błękitno w oczekiwaniu na montaż. Kliknij część z palety.</span>
                  </div>
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
                    <Check className="w-8 h-8 text-cyan-400 animate-bounce" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-200">Wszystkie części zamontowane!</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Szklana płyta obudowy została zaryglowana, a wtyczka zasilająca wetknięta do sieci w ścianie. Czas na test diagnostyczny POST oraz próbny boot systemu operacyjnego!
                  </p>
                  <button
                    onClick={startBootProcess}
                    className="mt-6 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-lg hover:shadow-cyan-550/15 active:scale-95"
                    id="btn-run-boot"
                  >
                    <Play className="w-4 h-4 fill-white text-white" />
                    <span>URUCHOM TEST POST I ZAKOŃCZ MONTAŻ</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="boot-terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-[#070708] border border-slate-800/80 rounded-2xl p-4 font-mono text-[11px] md:text-xs text-cyan-400 shadow-inner h-[260px] md:h-[300px] overflow-y-auto flex flex-col text-left select-text relative"
                >
                  {/* Neon screen scanlines effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none [background-size:100%_4px]" />

                  {/* Terminal Output */}
                  <div className="flex-1 space-y-1 z-10">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1.5 mb-2 font-sans font-bold uppercase">
                      <span>🖥️ DIAGNOSTYK HARWDARE-U (HDMI PORT 1)</span>
                      <span className="text-cyan-400 animate-pulse flex items-center">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5" />
                        POST SYGNAL: LIVE
                      </span>
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
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-cyan-300 flex items-center justify-between font-sans z-10"
                    >
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-5 h-5 text-cyan-400 animate-bounce" />
                        <div>
                          <p className="text-xs font-bold text-slate-200">Jednostka jest całkowicie sprawna!</p>
                          <p className="text-[10px] text-slate-400">Wszystkie procedury zakończone pomyślnie.</p>
                        </div>
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded hover:bg-slate-800 transition-all font-semibold"
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
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0 self-start mt-0.5" id="step-number-badge">
                {currentStep.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-200 flex items-center">
                  Cel montażowy: <span className="text-cyan-400 ml-1.5">{currentStep.title}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {currentStep.description}
                </p>
                <div className="flex items-start mt-2 text-[10.5px] text-amber-300 font-semibold bg-amber-500/5 px-2.5 py-1.5 rounded border border-amber-500/15">
                  <Info className="w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5" />
                  <span>Procedura: {currentStep.hint}</span>
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
              className="bg-red-950/40 border border-red-500/30 rounded-xl p-3.5 mt-3 text-xs text-red-300 flex items-start space-x-2.5 shadow-md z-20"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 self-start mt-0.5" />
              <div>
                <span className="font-bold">Błąd instalacji:</span> {errorMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Assembly Component Parts Selector (Right screen span 5) */}
      <div className="lg:col-span-5 flex flex-col h-full min-h-0 min-w-0 select-none">
        
        {/* Component Drawer Box */}
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl flex flex-col h-full overflow-hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-0.5 flex items-center">
            <Layers className="w-4 h-4 mr-1.5 text-cyan-400" />
            Paleta Podzespołów Komputerowych
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[360px] lg:max-h-none">
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
                      ? "bg-cyan-950/15 border-cyan-500/70 hover:bg-cyan-900/15 hover:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                      : "bg-slate-950/30 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                  id={`palette-item-${comp.id}`}
                >
                  {/* Thick visual highlight if target is next */}
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
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-2.5 py-1 text-[10px] font-bold text-cyan-400 flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Zamontowano</span>
                      </div>
                    ) : isTargetNext ? (
                      <div className="bg-cyan-500 text-slate-950 font-extrabold px-2.5 py-1 rounded text-[10px] animate-pulse uppercase tracking-wider">
                        Wybierz
                      </div>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-800">
                        {comp.id === "case" ? "Zadanie 1" : comp.id === "mobo" ? "Baza" : "Krok " + (ASSEMBLY_STEPS.findIndex(s=>s.targetComponentId === comp.id) + 1)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Educational Safety Tips sidebar component based on current step */}
          <div className="border-t border-slate-800 pt-3 mt-4">
            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-wide flex items-center mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
              Poradnik Serwisanta (Podpowiedź Edukacyjna)
            </h3>
            
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 text-[11px] leading-relaxed">
              {!isFinished ? (
                <>
                  <div className="text-red-400/90 font-semibold mb-1 flex items-start">
                    <span className="text-[10px] bg-red-500/10 text-red-400 px-1 py-0.2 rounded mr-1.5 uppercase shrink-0 font-bold mt-0.5">UWAGA!</span>
                    <span>{EXPERT_NOTES[targetId]?.warning || "Postępuj powoli i rozważnie. Półprzewodniki są podatne na ładunki elektrostatyczne."}</span>
                  </div>
                  <div className="text-slate-400/95 font-medium border-t border-slate-900 pt-1.5 mt-1.5 flex items-start">
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1 py-0.2 rounded mr-1.5 uppercase shrink-0 font-bold mt-0.5">WSKAZÓWKA PRO</span>
                    <span>{EXPERT_NOTES[targetId]?.proTip || "Dotknij niemalowanego metalowego kaloryfera lub uziemionego elementu przed montażem, by wyładować ładunek z dłoni."}</span>
                  </div>
                </>
              ) : (
                <div className="text-emerald-400 font-medium flex items-start py-1">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded mr-1.5 uppercase shrink-0 font-bold mt-0.5">SUKCES</span>
                  <span>Wszystkie kroki montażu zostały pomyślnie zweryfikowane. Komputer przeszedł pomyślnie testy POST na płycie głównej i uruchomił system ATLAS_OS!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
