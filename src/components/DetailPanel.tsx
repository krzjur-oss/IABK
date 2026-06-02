/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentInfo } from "../types";
import { motion } from "motion/react";
import { Info, HelpCircle, HardDrive, Cpu, AlertCircle, Sparkles, Layers, List } from "lucide-react";

interface DetailPanelProps {
  component: ComponentInfo | null;
  scientificMode?: boolean;
  theme?: "light" | "dark";
}

interface FlowData {
  source: string;
  sourceLabel: string;
  regulator: string;
  regulatorLabel: string;
  consumer: string;
  consumerLabel: string;
  output: string;
  outputLabel: string;
  powerCost: string;
  conversion: string;
}

const getEnergyFlow = (id: string, name: string): FlowData => {
  const lowercaseId = id.toLowerCase();
  
  if (lowercaseId.includes("cpu") || lowercaseId.includes("soc") || lowercaseId.includes("apu")) {
    return {
      source: "Zasilacz / Bateria",
      sourceLabel: "12V / 3.8V DC Bezpośrednie",
      regulator: "Sekcja VRM / PMIC",
      regulatorLabel: "Konwersja na niskonapięciowe Vcore (0.9V - 1.3V)",
      consumer: name,
      consumerLabel: "Przetwarzanie logiczne i kalkulacje",
      output: "Radiator / Throttling",
      outputLabel: "Pasywny/aktywny zrzut energii jako ciepło odpadowe",
      powerCost: "Średni pobór: 15W - 250W (zależnie od klasy)",
      conversion: "Energia Elektryczna ⚡ ➔ Cieplna 🌡️ + Dane 💻"
    };
  }
  
  if (lowercaseId.includes("gpu")) {
    return {
      source: "Złącze PCIe / Zasilacz",
      sourceLabel: "Stabilne zasilanie wysokoprądowe 12V",
      regulator: "VRM karty graficznej",
      regulatorLabel: "Precyzyjna konwersja prądu dla rdzenia GPU i VRAM",
      consumer: name,
      consumerLabel: "Równoległe renderowanie geometrii i tekstur 3D",
      output: "Monitor / Sygnał DP",
      outputLabel: "Ramki cyfrowe przesyłane przez DisplayPort/HDMI",
      powerCost: "Maks. pobór: 75W - 450W",
      conversion: "Energia Elektryczna ⚡ ➔ Fotony obrazu 🎨 + Cieplna 🌡️"
    };
  }

  if (lowercaseId.includes("battery") || lowercaseId.includes("psu") || lowercaseId.includes("power_feed") || lowercaseId.includes("power")) {
    return {
      source: "Gniazdo AC / Ogniwa",
      sourceLabel: "Napięcie przemienne sieci lub potencjał Li-Ion",
      regulator: "Prostownik / Przetwornica",
      regulatorLabel: "Kompensacja PFC, filtrowanie tętnień",
      consumer: name,
      consumerLabel: "Dystrybucja szyn głównych (12V, 5V, 3.3V)",
      output: "Linie EPS / ATX / PCIe",
      outputLabel: "Dostarczenie prądu o niskiej oporności",
      powerCost: "Sprawność: >90% (Złoty / Platynowy Standard)",
      conversion: "Napięcie Zmienne ⚡ ➔ DC Niskonapięciowe 🔌"
    };
  }

  if (lowercaseId.includes("mobo") || lowercaseId.includes("board")) {
    return {
      source: "Złącza ATX 24-Pin",
      sourceLabel: "Wejściowe zasilanie systemowe z zasilacza",
      regulator: "Kondensatory i dławiki",
      regulatorLabel: "Podział energii na dedykowane obwody sygnałowe",
      consumer: name,
      consumerLabel: "Magistrale komunikacyjne PCIe, linie sygnałowe",
      output: "Porty komunikacji",
      outputLabel: "Dystrybucja napięć do RAM, dysków oraz USB",
      powerCost: "Własny pobór: ~15W - 45W",
      conversion: "Dystrybucja Elektryczna 🔌 ➔ Komunikacja Magistralna 🧬"
    };
  }

  if (lowercaseId.includes("ram") || lowercaseId.includes("memory")) {
    return {
      source: "Stabilne zasilanie płyty",
      sourceLabel: "Stałe napięcie bazowe (1.1V - 1.35V)",
      regulator: "Układ PMIC na kości",
      regulatorLabel: "Zaawansowana faza prądowa na samym module",
      consumer: name,
      consumerLabel: "Utrzymywanie ładunków elektrycznych w kondensatorach rzędów",
      output: "Złącze IMC magistrali",
      outputLabel: "Dwukierunkowy ultraszybki transfer bitów pamięci",
      powerCost: "Pobór mocy: ~3W - 10W na moduł",
      conversion: "Sygnały Stanu Elektrycznego 💡 ➔ Tymczasowy Zapis Bitów 💾"
    };
  }

  if (lowercaseId.includes("cooler") || lowercaseId.includes("water") || lowercaseId.includes("fan")) {
    return {
      source: "Złącze CPU_FAN / SYS_FAN",
      sourceLabel: "Napięcie sterowane 12V z kontrolera płyty",
      regulator: "Modulacja PWM (Szerokość)",
      regulatorLabel: "Dynamiczna regulacja cyklu na bazie wskazań NTC",
      consumer: name,
      consumerLabel: "Silnik wentylatora i struktura rurek",
      output: "Konwekcja termiczna",
      outputLabel: "Pchnięcie nagrzanego powietrza z finów radiatora",
      powerCost: "Pobór wentylatora: 1.5W - 6W",
      conversion: "Energia Elektryczna ⚡ ➔ Praca kinetyczna wentylatora 🌀 ➔ Termodynamika 💨"
    };
  }

  if (lowercaseId.includes("ssd") || lowercaseId.includes("hotswap") || lowercaseId.includes("microsd")) {
    return {
      source: "Slot M.2 / Złącze SATA",
      sourceLabel: "Napięcie zasilania 3.3V ze slotu PCIe",
      regulator: "Zintegrowany regulator LDO",
      regulatorLabel: "Odporność na fluktuacje, tłumienie tętnień",
      consumer: name,
      consumerLabel: "Zapis/odczyt komórek flash NAND TLC/QLC",
      output: "Kolejki NVMe PCIe",
      outputLabel: "Szybki strumień pakietów przesyłany do procesora",
      powerCost: "Pobór mocy: ~0.1W do 8W",
      conversion: "Energia Elektryczna ⚡ ➔ Bramka ładunku bramki NAND 💾 + Sygnał logiczny 🧬"
    };
  }

  if (lowercaseId.includes("screen") || lowercaseId.includes("digitizer") || lowercaseId.includes("display")) {
    return {
      source: "Zasilanie panelu ekranu",
      sourceLabel: "Napięcie sterujące LCD / OLED",
      regulator: "Przetwornica matrycy",
      regulatorLabel: "Sterownik modulacji częstotliwości poziomej / pionowej",
      consumer: name,
      consumerLabel: "Emisja subpikselowa diod LED/OLED",
      output: "Fale świetlne",
      outputLabel: "Strumień świetlny budujący ostry obraz w oku użytkownika",
      powerCost: "Pobór mocy: ~2W - 15W",
      conversion: "Sygnał Sterujący ⚡ ➔ Strumień Świetlny (Fotony) 👁️"
    };
  }

  // Base fallback
  return {
    source: "Szyna zasilająca",
    sourceLabel: "Linia niskonapięciowa zasilania",
    regulator: "Mikrokontroler i filtry EMI",
    regulatorLabel: "Zabezpieczenie przed przeciążeniem i filtracja napięcia",
    consumer: name,
    consumerLabel: "Ustabilizowane działanie elementu w strukturze",
    output: "Praca interfejsowa",
    outputLabel: "Sygnały kontrolne przesyłane do stacji głównej",
    powerCost: "Pobór: <5W",
    conversion: "Dedykowany Przepływ Energii ⚡ ➔ Praca Mechaniczna/Sygnałowa 🛠️"
  };
};

export default function DetailPanel({ component, scientificMode = false, theme = "dark" }: DetailPanelProps) {
  const isLight = theme === "light";
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

  const flow = getEnergyFlow(component.id, component.name);

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

        {/* SCIENTIFIC MODE ENHANCEMENT */}
        {scientificMode && (
          <div className={`border rounded-xl p-4 space-y-4 shadow-inner relative overflow-hidden ${
            isLight 
              ? "bg-purple-50/70 border-purple-200" 
              : "bg-purple-950/20 border-purple-500/25"
          }`}>
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none ${
              isLight ? "bg-purple-400/10" : "bg-purple-500/5"
            }`} />
            
            <div className={`flex items-center justify-between border-b pb-2 ${
              isLight ? "border-purple-200" : "border-purple-500/20"
            }`}>
              <h4 className={`text-[10.5px] font-bold uppercase tracking-widest flex items-center ${
                isLight ? "text-purple-800" : "text-purple-300"
              }`}>
                <Sparkles className={`w-3.5 h-3.5 mr-1.5 animate-pulse ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`} />
                Naukowa Eksploracja: Przepływ Energii i Przemiana
              </h4>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isLight 
                  ? "bg-purple-100 border border-purple-300 text-purple-700" 
                  : "bg-purple-950/50 border border-purple-500/20 text-purple-400"
              }`}>
                LIVE SCHEMA
              </span>
            </div>

            {/* Vertical Flow Diagram for mobile, horizontal on desktop */}
            <div className="flex flex-col md:flex-row items-stretch md:items-stretch justify-between gap-3 min-w-0">
              {/* NODE 1: Source */}
              <div className={`flex-1 min-w-0 border p-3 rounded-lg flex flex-col justify-start gap-1 min-h-[115px] h-auto ${
                isLight ? "bg-white border-slate-200 shadow-sm" : "bg-slate-900/55 border-slate-850"
              }`}>
                <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase">1. Zasilanie (WE)</span>
                <p className={`font-bold text-[11px] leading-snug ${
                  isLight ? "text-slate-800" : "text-slate-200"
                }`}>{flow.source}</p>
                <p className={`text-[9.5px] leading-relaxed mt-0.5 whitespace-normal ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>{flow.sourceLabel}</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex md:flex-col items-center justify-center shrink-0">
                <div className={`hidden md:block text-[10px] font-mono mb-0.5 ${
                  isLight ? "text-purple-400" : "text-purple-500/40"
                }`}>▶</div>
                <div className="relative w-full md:w-6 h-1 bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  />
                </div>
              </div>

              {/* NODE 2: Regulator */}
              <div className={`flex-1 min-w-0 border p-3 rounded-lg flex flex-col justify-start gap-1 min-h-[115px] h-auto shadow-[0_0_10px_rgba(6,182,212,0.03)] ${
                isLight ? "bg-white border-cyan-200 shadow-sm" : "bg-slate-900/55 border-cyan-900/40"
              }`}>
                <span className={`text-[8.5px] font-mono font-bold uppercase ${
                  isLight ? "text-cyan-700" : "text-cyan-500"
                }`}>2. Regulacja (PMIC/VRM)</span>
                <p className={`font-bold text-[11px] leading-snug ${
                  isLight ? "text-cyan-800" : "text-cyan-400"
                }`}>{flow.regulator}</p>
                <p className={`text-[9.5px] leading-relaxed mt-0.5 whitespace-normal ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>{flow.regulatorLabel}</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex md:flex-col items-center justify-center shrink-0">
                <div className={`hidden md:block text-[10px] font-mono mb-0.5 ${
                  isLight ? "text-purple-400" : "text-purple-500/40"
                }`}>▶</div>
                <div className="relative w-full md:w-6 h-1 bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 2.1, ease: "linear" }}
                  />
                </div>
              </div>

              {/* NODE 3: Consumer component */}
              <div className={`flex-1 min-w-0 border p-3 rounded-lg flex flex-col justify-start gap-1 min-h-[115px] h-auto shadow-[0_0_10px_rgba(168,85,247,0.03)] ${
                isLight ? "bg-white shadow-sm" : "bg-slate-900/55"
              }`} style={{ borderColor: isLight ? `${component.colorHex}60` : `${component.colorHex}25` }}>
                <span className="text-[8.5px] font-mono font-bold uppercase" style={{ color: component.colorHex }}>3. Odbiornik</span>
                <p className={`font-bold text-[11px] leading-snug ${
                  isLight ? "text-slate-800" : "text-white"
                }`}>{flow.consumer}</p>
                <p className={`text-[9.5px] leading-relaxed mt-0.5 whitespace-normal ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>{flow.consumerLabel}</p>
              </div>

              {/* Arrow 3 */}
              <div className="flex md:flex-col items-center justify-center shrink-0">
                <div className={`hidden md:block text-[10px] font-mono mb-0.5 ${
                  isLight ? "text-purple-400" : "text-purple-500/40"
                }`}>▶</div>
                <div className="relative w-full md:w-6 h-1 bg-slate-800 rounded-full overflow-hidden shrink-0">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  />
                </div>
              </div>

              {/* NODE 4: Output */}
              <div className={`flex-1 min-w-0 border p-3 rounded-lg flex flex-col justify-start gap-1 min-h-[115px] h-auto ${
                isLight ? "bg-white border-amber-200 shadow-sm" : "bg-slate-900/55 border-slate-850"
              }`}>
                <span className={`text-[8.5px] font-mono font-bold uppercase ${
                  isLight ? "text-amber-700" : "text-amber-500"
                }`}>4. Efekt (WY)</span>
                <p className={`font-bold text-[11px] leading-snug ${
                  isLight ? "text-amber-800" : "text-amber-400"
                }`}>{flow.output}</p>
                <p className={`text-[9.5px] leading-relaxed mt-0.5 whitespace-normal ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>{flow.outputLabel}</p>
              </div>
            </div>

            {/* Spec metadata bar */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t text-[9.5px] ${
              isLight ? "border-purple-200" : "border-purple-500/10"
            }`}>
              <div className={`px-3 py-2 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                isLight 
                  ? "bg-white border-purple-200" 
                  : "bg-purple-950/40 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase text-[10px] md:text-xs shrink-0 ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>KLASA ENERGETYCZNA:</span>
                <span className={`font-bold font-mono text-[10px] md:text-xs text-left sm:text-right ${
                  isLight ? "text-slate-800" : "text-white"
                }`}>{flow.powerCost}</span>
              </div>
              <div className={`px-3 py-2 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                isLight 
                  ? "bg-white border-purple-200" 
                  : "bg-purple-950/40 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase shrink-0 text-[10px] md:text-xs ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>TRANSFORMACJA:</span>
                <span className={`font-bold mt-0.5 text-left sm:text-right font-sans text-[10px] md:text-xs whitespace-normal break-words leading-relaxed ${
                  isLight ? "text-slate-700" : "text-slate-200"
                }`}>{flow.conversion}</span>
              </div>
            </div>
          </div>
        )}

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
