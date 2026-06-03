/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { PC_COMPONENTS, ComponentInfo, DeviceType, DEVICE_CATEGORIES, LAPTOP_COMPONENTS, SMARTPHONE_COMPONENTS, SERVER_COMPONENTS, TABLET_COMPONENTS, SBC_COMPONENTS, GAME_CONSOLE_COMPONENTS, SUPERCOMPUTER_COMPONENTS } from "./types";
import { Cpu, Wrench, BookmarkCheck, BookOpen, Layers, Info, Sparkles, HelpCircle, HardDrive, Laptop, Smartphone, Server, Network, History, Tablet, Gamepad2, Database, Sun, Moon } from "lucide-react";

// Sub-components
import PC3DViewer from "./components/PC3DViewer";
import DetailPanel from "./components/DetailPanel";
import AssemblyGuide from "./components/AssemblyGuide";
import PeripheralsTab from "./components/PeripheralsTab";
import Quiz from "./components/Quiz";
import NetworkTab from "./components/NetworkTab";
import ComputerHistory from "./components/ComputerHistory";
import ProgramInfo from "./components/ProgramInfo";
import CuriositiesTab from "./components/CuriositiesTab";

type ActiveTab = "3d-explorer" | "assembly-guide" | "peripherals" | "network-lan" | "computer-history" | "quiz" | "curiosities" | "program-info";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("3d-explorer");
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [scientificMode, setScientificMode] = useState<boolean>(false);

  // Custom visual theme switcher
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.getElementById("app-root");
    if (theme === "light") {
      root?.classList.add("theme-light");
      document.body.classList.add("theme-light");
      document.documentElement.classList.add("theme-light");
      document.body.classList.remove("bg-slate-950", "text-slate-100");
      document.body.style.backgroundColor = "#f8fafc";
    } else {
      root?.classList.remove("theme-light");
      document.body.classList.remove("theme-light");
      document.documentElement.classList.remove("theme-light");
      document.body.classList.add("bg-slate-950", "text-slate-100");
      document.body.style.backgroundColor = "";
    }
  }, [theme]);

  // Track if user abandons quiz module to browse other modules
  useEffect(() => {
    if (activeTab !== "quiz") {
      try {
        const saved = localStorage.getItem("quiz_active_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.quizStarted && !parsed.quizFinished) {
            parsed.hasSwitchedTabs = true;
            localStorage.setItem("quiz_active_session", JSON.stringify(parsed));
          }
        }
      } catch (err) {
        console.error("Failed to mark tab switch in session", err);
      }
    }
  }, [activeTab]);

  const getComponentsForDevice = (type: DeviceType): ComponentInfo[] => {
    switch (type) {
      case "laptop":
        return LAPTOP_COMPONENTS;
      case "smartphone":
        return SMARTPHONE_COMPONENTS;
      case "server":
        return SERVER_COMPONENTS;
      case "tablet":
        return TABLET_COMPONENTS;
      case "sbc":
        return SBC_COMPONENTS;
      case "game_console":
        return GAME_CONSOLE_COMPONENTS;
      case "supercomputer":
        return SUPERCOMPUTER_COMPONENTS;
      case "desktop":
      default:
        return PC_COMPONENTS;
    }
  };

  const currentComponents = getComponentsForDevice(deviceType);
  const [selectedComp, setSelectedComp] = useState<ComponentInfo | null>(PC_COMPONENTS[1]); // Default to CPU or Płyta Główna (idx 1 is motherboard)

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-slate-50 text-slate-850" : "bg-[#0A0A0B] text-slate-200"} flex flex-col font-sans transition-colors duration-300 ${theme === "light" ? "theme-light" : ""}`} id="app-root">
      
      {/* Dynamic Header */}
      <header className="bg-[#0F0F12] border-b border-slate-800 shadow-lg px-4 py-4 md:px-8 relative overflow-hidden">
        {/* Absolute glowing vector lines */}
        <div className="absolute top-0 right-0 w-[450px] h-[150px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[200px] h-[100px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          
          {/* Logo / Brand Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-lg group">
              <div className="w-full h-full bg-[#0F0F12] rounded-[10px] flex items-center justify-center transition-all group-hover:bg-[#0F0F12]/40">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400 font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                  CORE ATLAS v4.8.0-STABLE
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h1 className="text-lg md:text-xl font-bold text-white tracking-tight leading-none mt-1">
                Interaktywny Atlas Budowy Komputera
              </h1>
            </div>
          </div>

          {/* Quick specs / Tech Indicators panel */}
          <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 md:border-l md:border-slate-800 md:pl-6">
            <div className="hidden sm:block">
              <p className="text-[10px] text-slate-500 uppercase font-sans">Język atlasu</p>
              <p className="font-bold text-slate-300">Polski (PL)</p>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <p className="text-[10px] text-slate-500 uppercase font-sans">Status makiety</p>
              <p className="font-bold text-cyan-400">SYSTEM GOTOWY</p>
            </div>
            {/* Elegant Theme Toggle Button */}
            <div className="border-l border-slate-800 pl-4 flex items-center h-full">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-sm relative group"
                title={theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"}
                id="theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-amber-500" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                )}
                <span className="absolute top-11 -left-1/2 -translate-x-[20%] hidden group-hover:block bg-slate-950/95 text-white text-[9px] font-mono px-2 py-1 rounded border border-slate-800 shadow-xl whitespace-nowrap z-50">
                  {theme === "light" ? "Ciemny motyw" : "Jasny motyw"}
                </span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Tab Navigation bar */}
      <section className="bg-[#0F0F12] border-b border-slate-800 py-2.5 px-4 md:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-nowrap space-x-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setActiveTab("3d-explorer")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "3d-explorer"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-3d-explorer"
          >
            <Layers className="w-4 h-4" />
            <span>Model 3D i Podzespoły</span>
          </button>

          <button
            onClick={() => setActiveTab("assembly-guide")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "assembly-guide"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-assembly-guide"
          >
            <Wrench className="w-4 h-4" />
            <span>Symulator Montażu PC</span>
          </button>

          <button
            onClick={() => setActiveTab("peripherals")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "peripherals"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-peripherals"
          >
            <BookOpen className="w-4 h-4" />
            <span>Makieta Peryferii</span>
          </button>

          <button
            onClick={() => setActiveTab("computer-history")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "computer-history"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-computer-history"
          >
            <History className="w-4 h-4" />
            <span>Historia i Ewolucja PC</span>
          </button>

          <button
            onClick={() => setActiveTab("network-lan")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "network-lan"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-network-lan"
          >
            <Network className="w-4 h-4" />
            <span>Budowa Sieci WAN/LAN</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "quiz"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-quiz"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Quiz Wiedzy</span>
          </button>

          <button
            onClick={() => setActiveTab("curiosities")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "curiosities"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-curiosities"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ciekawostki i Nowości</span>
          </button>

          <button
            onClick={() => setActiveTab("program-info")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all shrink-0 ${
              activeTab === "program-info"
                ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
            id="tab-program-info"
          >
            <Info className="w-4 h-4" />
            <span>O programie</span>
          </button>
        </div>
      </section>

      {/* Main Content View Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col justify-start">
        
        {/* Dynamic tabs render switch */}
        {activeTab === "3d-explorer" && (
          <div className="flex flex-col space-y-6 w-full h-full">
            {/* Dynamic category selector cards */}
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-4 shadow-xl shrink-0">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center font-mono">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-cyan-400 animate-pulse" />
                Słownik Architektury: Wybierz Kategorię Komputera
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5">
                {DEVICE_CATEGORIES.map((cat) => {
                  const isSelected = deviceType === cat.id;
                  const IconComp = 
                    cat.id === "desktop" ? Cpu : 
                    cat.id === "laptop" ? Laptop : 
                    cat.id === "smartphone" ? Smartphone : 
                    cat.id === "server" ? Server : 
                    cat.id === "tablet" ? Tablet : 
                    cat.id === "sbc" ? Cpu : 
                    cat.id === "game_console" ? Gamepad2 : 
                    Database;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setDeviceType(cat.id);
                        const comps = getComponentsForDevice(cat.id);
                        setSelectedComp(comps[0] || null);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3.5 cursor-pointer w-full min-w-0 overflow-hidden ${
                        isSelected
                          ? "border-cyan-500/85 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white"
                          : "border-slate-800 bg-[#0A0A0B]/60 hover:border-slate-700 hover:bg-[#0F0F12] text-slate-300"
                      }`}
                      id={`cat-select-${cat.id}`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-400"}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[11px] leading-tight text-slate-200">{cat.title}</p>
                        <p className="text-[9px] text-slate-500 leading-normal mt-1 line-clamp-2 md:line-clamp-1" title={cat.description}>{cat.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:h-[720px] items-stretch">
              {/* 3D Model Viewport (Left, span 7) */}
              <div className="xl:col-span-7 flex flex-col h-full min-h-0">
                <PC3DViewer
                  selectedComponent={selectedComp}
                  onSelectComponent={(comp) => setSelectedComp(comp)}
                  deviceType={deviceType}
                  componentsList={currentComponents}
                  theme={theme}
                  scientificMode={scientificMode}
                  onScientificModeToggle={() => setScientificMode(!scientificMode)}
                />
              </div>

              {/* Sidebar list + Component Specs Panel (Right, span 5) */}
              <div className="xl:col-span-5 flex flex-col space-y-4 justify-between h-full min-h-0">
                {/* Internal parts quick list selector card */}
                <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl shrink-0">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5 flex items-center">
                    <Cpu className="w-4 h-4 mr-1.5 text-cyan-400" />
                    Zestawienie Elementów Składowych
                  </h3>
                  
                  {/* Visual grid cards */}
                  <div className="grid grid-cols-2 gap-2">
                    {currentComponents.map((comp) => {
                      const isSelected = selectedComp?.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          onClick={() => setSelectedComp(comp)}
                          className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center space-x-2 bg-slate-950/40 cursor-pointer ${
                            isSelected
                              ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                              : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/45"
                          }`}
                          id={`comp-grid-select-${comp.id}`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: comp.colorHex }}
                          />
                          <span className="font-bold truncate text-slate-200">
                            {comp.shortName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specs detailed panel */}
                <div className="flex-1 min-h-0">
                  <DetailPanel component={selectedComp} scientificMode={scientificMode} theme={theme} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assembly-guide" && <AssemblyGuide />}

        {activeTab === "peripherals" && <PeripheralsTab />}

        {activeTab === "network-lan" && <NetworkTab />}

        {activeTab === "computer-history" && <ComputerHistory />}

        {activeTab === "quiz" && <Quiz />}

        {activeTab === "curiosities" && <CuriositiesTab />}

        {activeTab === "program-info" && <ProgramInfo />}

      </main>

      {/* Persistent Educational Footer */}
      <footer className="bg-[#070708] border-t border-slate-800 py-5 px-4 md:px-8 text-center shrink-0 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-500 font-sans">
          <p>© 2026 Interaktywny Atlas Komputera. Urządzenie dydaktyczne do nauki budowy i konserwacji komputerów stacjonarnych.</p>
          <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interaktywny model 3D działa bez wtyczek w standardzie HTML5 Canvas.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
