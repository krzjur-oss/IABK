/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PC_COMPONENTS, ComponentInfo, DeviceType, DEVICE_CATEGORIES, LAPTOP_COMPONENTS, SMARTPHONE_COMPONENTS, SERVER_COMPONENTS, TABLET_COMPONENTS, SBC_COMPONENTS, GAME_CONSOLE_COMPONENTS, SUPERCOMPUTER_COMPONENTS } from "./types";
import { Cpu, Wrench, BookmarkCheck, BookOpen, Layers, Info, Sparkles, HelpCircle, HardDrive, Laptop, Smartphone, Server, Network, History, Tablet, Gamepad2, Database, Sun, Moon, Menu, X, Cable, ChevronDown } from "lucide-react";

// Sub-components
import PC3DViewer from "./components/PC3DViewer";
import DetailPanel from "./components/DetailPanel";
import AssemblyGuide from "./components/AssemblyGuide";
import PeripheralsTab from "./components/PeripheralsTab";
import Quiz from "./components/Quiz";
import NetworkTab from "./components/NetworkTab";
import ComputerHistory from "./components/ComputerHistory";
import ProgramInfo from "./components/ProgramInfo";
import OnboardingTutorial from "./components/OnboardingTutorial";
import KnowledgeCenterTab from "./components/KnowledgeCenterTab";

type ActiveTab = "3d-explorer" | "assembly-guide" | "peripherals" | "network-lan" | "computer-history" | "quiz" | "knowledge-center" | "program-info";

const NAVIGATION_TABS = [
  { id: "3d-explorer", label: "Model 3D", icon: Layers, desc: "Interaktywny model przestrzenny i szczegółowa specyfikacja komponentów" },
  { id: "assembly-guide", label: "Symulator Montażu", icon: Wrench, desc: "Wirtualny warsztat z instruktażem krok po kroku budowy komputera" },
  { id: "peripherals", label: "Porty i Peryferia", icon: Cable, desc: "Wizualizacja podłączeń zewnętrznych, kabli, mediów oraz gniazd płyty głównej" },
  { id: "computer-history", label: "Historia i Ewolucja", icon: History, desc: "Edukacyjna oś czasu przedstawiająca generacje i rozwój podzespołów" },
  { id: "network-lan", label: "Sieci LAN/WAN", icon: Network, desc: "Wizualny projektor topologii sieciowych, okablowania i adresacji IP" },
  { id: "quiz", label: "Quiz Wiedzy", icon: BookmarkCheck, desc: "Certyfikowany sprawdzian wiedzy o budowie i sieciach komputerowych" },
  { id: "knowledge-center", label: "Centrum Wiedzy", icon: BookOpen, desc: "Zintegrowana baza terminów IT, interaktywne ciekawostki naukowe i ciekawostki technologiczne" },
  { id: "program-info", label: "O programie", icon: Info, desc: "Założenia metodyczne, metryka projektu i informacje o platformie" },
] as const;

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("3d-explorer");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [scientificMode, setScientificMode] = useState<boolean>(false);

  // Custom visual theme switcher
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem("atlas_onboarding_completed");
    if (!isCompleted) {
      setIsOnboardingOpen(true);
    }
  }, []);

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

        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          
          {/* Logo / Brand Title with Hamburger */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 hover:text-white rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-sm relative group focus:outline-none shrink-0"
              title="Otwórz menu kart atlasu"
              id="header-hamburger-btn"
            >
              <Menu className="w-5 h-5" />
              <span className="absolute top-11 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-950/95 text-white text-[9px] font-mono px-2 py-1 rounded border border-slate-800 shadow-xl whitespace-nowrap z-50">
                Menu Kart Programu
              </span>
            </button>

            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-lg group shrink-0">
              <div className="w-full h-full bg-[#0F0F12] rounded-[10px] flex items-center justify-center transition-all group-hover:bg-[#0F0F12]/40">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400 font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                  CORE ATLAS v5.0.0-STABLE
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse hidden sm:inline-block" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-purple-400 font-mono bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                  MODUŁ: {NAVIGATION_TABS.find(t => t.id === activeTab)?.label}
                </span>
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

            {/* Elegant Manual Tutorial Replay Button */}
            <div className="border-l border-slate-800 pl-4 flex items-center h-full">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-sm relative group"
                title="Uruchom samouczek wdrażający"
                id="onboarding-replay-btn"
              >
                <HelpCircle className="w-4.5 h-4.5 text-cyan-400" />
                <span className="absolute top-11 -left-1/2 -translate-x-[20%] hidden group-hover:block bg-slate-950/95 text-white text-[9px] font-mono px-2 py-1 rounded border border-slate-800 shadow-xl whitespace-nowrap z-50">
                  Pomoc / Samouczek
                </span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content View Frame */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 py-6 md:px-8 md:py-8 flex flex-col justify-start">
        
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
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col items-start space-y-2.5 cursor-pointer w-full min-w-0 overflow-hidden ${
                        isSelected
                          ? "border-cyan-500/85 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white"
                          : "border-slate-800 bg-[#0A0A0B]/60 hover:border-slate-700 hover:bg-[#0F0F12] text-slate-300"
                      }`}
                      id={`cat-select-${cat.id}`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-400"}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 w-full">
                        <p className="font-bold text-[11px] leading-tight text-slate-200">{cat.title}</p>
                        <p className="text-[9px] text-slate-500 leading-snug mt-1.5 line-clamp-3 xl:line-clamp-4" title={cat.description}>{cat.description}</p>
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
                  <DetailPanel component={selectedComp} scientificMode={scientificMode} theme={theme} deviceType={deviceType} />
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

        {activeTab === "knowledge-center" && <KnowledgeCenterTab theme={theme} />}

        {activeTab === "program-info" && <ProgramInfo />}

      </main>

      {/* Persistent Educational Footer */}
      <footer className="bg-[#070708] border-t border-slate-800 py-5 px-4 md:px-8 text-center shrink-0 text-xs">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-500 font-sans">
          <p>© 2026 Interaktywny Atlas Komputera. Urządzenie dydaktyczne do nauki budowy i konserwacji komputerów stacjonarnych.</p>
          <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interaktywny model 3D działa bez wtyczek w standardzie HTML5 Canvas.</span>
          </div>
        </div>
      </footer>

      {/* Sliding Sidebar Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 cursor-pointer"
              id="sidebar-backdrop"
            />
            
            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`fixed top-0 left-0 bottom-0 w-full sm:w-[420px] max-w-[90vw] ${
                theme === "light" 
                  ? "bg-slate-50 border-r border-slate-200 text-slate-800" 
                  : "bg-[#0B0C0E] border-r border-slate-800 text-slate-100"
              } z-50 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}
              id="sidebar-drawer-panel"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800 bg-[#0F1013] flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-widest text-cyan-400 font-mono">
                      Karty Programu
                    </h2>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Wybierz moduł edukacyjny atlasu
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer focus:outline-none"
                  id="sidebar-close-btn"
                  aria-label="Zamknij menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Navigation List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800">
                {NAVIGATION_TABS.map((tab) => {
                  const TabIcon = tab.icon;
                  const isTabActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ActiveTab);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-4 cursor-pointer relative group ${
                        isTabActive
                          ? "border-cyan-500/85 bg-cyan-950/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : theme === "light"
                            ? "border-slate-200 bg-white hover:border-cyan-500/40 hover:bg-slate-50"
                            : "border-slate-800/80 bg-[#0F1013]/60 hover:border-cyan-500/40 hover:bg-[#0F1013]"
                      }`}
                      id={`drawer-tab-${tab.id}`}
                    >
                      {/* Active glowing indicator indicator left */}
                      {isTabActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                      )}

                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isTabActive 
                          ? "bg-cyan-500/20 text-cyan-400" 
                          : "bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-850 transition-colors"
                      }`}>
                        <TabIcon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`font-bold text-xs tracking-tight ${isTabActive ? "text-cyan-400" : "text-slate-200 group-hover:text-white"}`}>
                          {tab.label}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-normal mt-1">
                          {tab.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer info */}
              <div className="p-4 border-t border-slate-800 bg-[#07080A] text-center shrink-0">
                <p className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">
                  Interaktywny Atlas Komputera v5.0.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isOnboardingOpen && (
        <OnboardingTutorial
          onClose={() => setIsOnboardingOpen(false)}
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
          deviceType={deviceType}
          setDeviceType={(type) => setDeviceType(type)}
          scientificMode={scientificMode}
          setScientificMode={(mode) => setScientificMode(mode)}
        />
      )}

    </div>
  );
}
