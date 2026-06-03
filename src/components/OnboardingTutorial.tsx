/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  HelpCircle, 
  Cpu, 
  Layers, 
  Compass, 
  Crosshair, 
  BookOpen,
  CheckCircle2,
  Info
} from "lucide-react";
import { DeviceType } from "../types";

interface OnboardingTutorialProps {
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;
  scientificMode: boolean;
  setScientificMode: (mode: boolean) => void;
}

interface Step {
  title: string;
  content: string;
  targetId: string | null;
  position: "bottom" | "top" | "left" | "right" | "center";
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function OnboardingTutorial({
  onClose,
  activeTab,
  setActiveTab,
  deviceType,
  setDeviceType,
  scientificMode,
  setScientificMode
}: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  
  // Save original settings so we can restore if skipped
  const originalTab = useRef(activeTab);
  const originalDevice = useRef(deviceType);
  const originalScientific = useRef(scientificMode);

  const steps: Step[] = [
    {
      title: "Witaj w Interaktywnym Atlasie Komputera!",
      content: "Ten krótki, interaktywny przewodnik pokaże Ci, jak w pełni wykorzystać trójwymiarowy model komputera oraz dostępne tryby edukacyjne. Zajmie to tylko chwilę!",
      targetId: null,
      position: "center",
      onEnter: () => {
        setActiveTab("3d-explorer");
      }
    },
    {
      title: "Wybór Klasy Urządzenia",
      content: "Słownik Architektury IT pozwala Ci na zgłębianie budowy nie tylko komputerów stacjonarnych (PC)! Klikaj ikony u góry, by zbadać laptopy, nowoczesne smartfony, serwery WAN, minikomputery SBC (np. Raspberry Pi), a nawet potężne superkomputery.",
      targetId: "cat-select-desktop",
      position: "bottom",
      onEnter: () => {
        setActiveTab("3d-explorer");
        setDeviceType("desktop");
      }
    },
    {
      title: "Interaktywny Model Trójwymiarowy",
      content: "W tej sekcji generowany jest przestrzenny model wybranego urządzenia. Możesz wchodzić w nim w bezpośrednią interakcję: Obracaj model za pomocą przeciągania myszą/palcem, przybliżaj kółkiem myszy i klikaj dowolny podzespół makiety, aby go zidentyfikować.",
      targetId: "btn-zoom-in",
      position: "right",
      onEnter: () => {
        setActiveTab("3d-explorer");
      }
    },
    {
      title: "Szybki Przewodnik 3D",
      content: "Kliknij ten przycisk, aby uruchomić automatyczną ścieżkę dydaktyczną! Atlas samodzielnie wykona sekwencję rotacji i przybliżeń (Focus 360°), prezentując po kolei najważniejsze punkty konstrukcyjne urządzenia.",
      targetId: "btn-3d-tour",
      position: "top",
      onEnter: () => {
        setActiveTab("3d-explorer");
      }
    },
    {
      title: "Potoki i Przepływy Fizyczne",
      content: "Włącz ikonę naukowej eksploracji ('Potoki'), aby zwizualizować kierunek przepływu danych logicznych na magistralach, ruchu prądu z zasilacza (VRM) oraz stref cyrkulacji powietrza chłodzącego podzespoły!",
      targetId: "btn-scientific-mode",
      position: "top",
      onEnter: () => {
        setActiveTab("3d-explorer");
        setScientificMode(true);
      },
      onLeave: () => {
        setScientificMode(false);
      }
    },
    {
      title: "Tryb Fokus (Autocentrowanie)",
      content: "Gdy tryb Fokus jest włączony, wybrany podzespół komputera zostanie automatycznie umieszczony w centrum kamery 3D pod idealnym kątem diagnostycznym, ułatwiając orientację w przestrzeni trójwymiarowej.",
      targetId: "btn-focus-mode",
      position: "top",
      onEnter: () => {
        setActiveTab("3d-explorer");
      }
    },
    {
      title: "Zestawienie Elementów Składowych",
      content: "To szybki indeks części wybranego urządzenia. Każda pozycja posiada unikalny kolor ułatwiający zlokalizowanie jej na schemacie. Kliknięcie nazwy podświetli ten element na modelu trójwymiarowym.",
      targetId: "comp-grid-select-cpu",
      position: "left",
      onEnter: () => {
        setActiveTab("3d-explorer");
        setDeviceType("desktop");
      }
    },
    {
      title: "Panel Danych Technicznych",
      content: "Tutaj w czasie rzeczywistym wyświetla się karta dydaktyczna zaznaczonego elementu: opis roli, specyfikacji technicznej, zalecenia eksploatacyjne (filtry, pasty) oraz zaawansowane parametry fizyczne i typ gniazda.",
      targetId: "detail-panel-container",
      position: "left",
      onEnter: () => {
        setActiveTab("3d-explorer");
      }
    },
    {
      title: "Szeroka Baza Tematyczna",
      content: "Na koniec pamiętaj, że Atlas to nie tylko model 3D! Skorzystaj z górnego paska, aby wejść do 'Symulatora Montażu PC', 'Kompilatora Peryferii', 'Historii IT' czy sprawdzić swoją wiedzę w rozbudowanym 'Quizie Dydaktycznym'. Powodzenia!",
      targetId: "tab-assembly-guide",
      position: "bottom",
      onEnter: () => {
        // Spotlight back to first tabs
      }
    }
  ];

  const currentStepData = steps[currentStep];

  // Run triggers on state transitions
  useEffect(() => {
    if (currentStepData && currentStepData.onEnter) {
      currentStepData.onEnter();
    }
    return () => {
      if (currentStepData && currentStepData.onLeave) {
        currentStepData.onLeave();
      }
    };
  }, [currentStep]);

  // Measure target elements bounds
  useEffect(() => {
    const updatePosition = () => {
      if (!currentStepData || !currentStepData.targetId) {
        setCoords(null);
        return;
      }

      // Small delay to allow tab/device rendering to settle
      const timer = setTimeout(() => {
        const el = document.getElementById(currentStepData.targetId!);
        if (el) {
          const rect = el.getBoundingClientRect();
          setCoords({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          });
          
          // Smooth scroll element into view if out of viewport, excluding small mobile
          if (window.innerWidth > 640) {
            el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
          }
        } else {
          setCoords(null);
        }
      }, 150);

      return () => clearTimeout(timer);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [currentStep, deviceType, activeTab]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("atlas_onboarding_completed", "true");
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Restore initial state if user skips tutorial midway
    setScientificMode(originalScientific.current);
    setDeviceType(originalDevice.current);
    setActiveTab(originalTab.current);
    
    localStorage.setItem("atlas_onboarding_completed", "true");
    onClose();
  };

  // Determine tooltip style positioning based on step data
  const getTooltipStyle = (): React.CSSProperties => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < 768;

    if (isMobile) {
      // Mobile always sticky or bottom focused to avoid cramped rendering
      return {
        position: "fixed",
        bottom: "16px",
        left: "4%",
        width: "92%",
        maxWidth: "430px",
        zIndex: 1000
      };
    }

    const tooltipWidth = 380;
    const tooltipHeight = 240; // Approximate height with padding
    const margin = 16;

    if (!coords) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${tooltipWidth}px`,
        zIndex: 950
      };
    }

    const { top, left, width, height } = coords;
    let topPos = 0;
    let leftPos = 0;

    switch (currentStepData.position) {
      case "bottom":
        topPos = top + height + margin;
        leftPos = left + width / 2 - tooltipWidth / 2;
        break;
      case "top":
        topPos = top - tooltipHeight - margin;
        leftPos = left + width / 2 - tooltipWidth / 2;
        break;
      case "left":
        topPos = top + height / 2 - tooltipHeight / 2;
        leftPos = left - tooltipWidth - margin;
        break;
      case "right":
        topPos = top + height / 2 - tooltipHeight / 2;
        leftPos = left + width + margin;
        break;
      case "center":
      default:
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${tooltipWidth}px`,
          zIndex: 950
        };
    }

    // Clamp coordinates to keep tooltip completely visible within safe safe margin bounds
    const safePadding = 16;
    leftPos = Math.max(safePadding, Math.min(viewportWidth - tooltipWidth - safePadding, leftPos));
    topPos = Math.max(safePadding, Math.min(viewportHeight - tooltipHeight - safePadding, topPos));

    return {
      position: "fixed",
      top: `${topPos}px`,
      left: `${leftPos}px`,
      width: `${tooltipWidth}px`,
      zIndex: 950
    };
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[900] overflow-hidden select-none font-sans" 
        style={{ pointerEvents: "auto" }}
      >
        {/* Semi-transparent dark overlay */}
        <div 
          className="fixed inset-0 bg-[#020617]/75 backdrop-blur-[3px] transition-opacity cursor-pointer"
          onClick={handleSkip}
        />

        {/* Spotlight Ring over focused element */}
        {coords && (
          <motion.div
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="fixed rounded-xl border-2 border-cyan-400 pointer-events-none z-[910]"
            style={{
              top: coords.top - 6,
              left: coords.left - 6,
              width: coords.width + 12,
              height: coords.height + 12,
              boxShadow: "0 0 30px rgba(6,182,212,0.65), inset 0 0 15px rgba(6,182,212,0.3)"
            }}
          >
            {/* Spotlight ripple animation ring */}
            <span className="absolute inset-0 rounded-xl border border-cyan-400 animate-ping opacity-60" />
          </motion.div>
        )}

        {/* Onboarding Dialog Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-950 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-[950] pointer-events-auto"
          style={getTooltipStyle()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-900">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-900/40 text-cyan-400">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[10px] font-bold font-mono tracking-wider text-cyan-500 uppercase">AKADEMIA ATLASU</span>
            </div>
            <button
              onClick={handleSkip}
              className="p-1.5 hover:bg-slate-900 text-slate-500 hover:text-white rounded-lg transition-all cursor-pointer focus:outline-none"
              title="Pomiń samouczek"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 text-cyan-400">
              <span className="text-[10px] font-mono font-extrabold bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                KROK {currentStep + 1} / {steps.length}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            
            <h4 className="font-extrabold text-white text-base md:text-lg mt-2 leading-tight tracking-tight">
              {currentStepData.title}
            </h4>
            
            <p className="text-slate-300 text-xs md:text-sm mt-3 leading-relaxed select-text">
              {currentStepData.content}
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-slate-500 hover:text-slate-300 text-xs font-semibold cursor-pointer py-1.5 px-3 hover:bg-slate-900 rounded-xl transition-all"
            >
              Pomiń
            </button>

            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all flex items-center justify-center cursor-pointer active:scale-95"
                  title="Wstecz"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={handleNext}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold px-4.5 py-2 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer hover:shadow-cyan-500/20 active:scale-95 text-center min-w-[100px] justify-center"
              >
                <span>{currentStep === steps.length - 1 ? "Rozpocznij!" : "Dalej"}</span>
                {currentStep === steps.length - 1 ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-slate-950" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0 text-slate-950" />
                )}
              </button>
            </div>
          </div>

          {/* Page Indicators dots */}
          <div className="flex justify-center space-x-1.5 mt-4">
            {steps.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentStep === idx 
                    ? "w-4.5 bg-cyan-400" 
                    : "w-1.5 bg-slate-800 hover:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
