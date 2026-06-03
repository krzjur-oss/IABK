/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Tv, MousePointer, Keyboard, Printer, Eye, Trash2, Zap, 
  History, Sparkles, Sliders, ArrowRight, Layers, Volume2, RotateCcw, HelpCircle, Check, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for the timeline data
interface Milestone {
  year: string;
  title: string;
  description: string;
  breakthrough: string;
  funFact: string;
}

interface PeripheralTimelineData {
  id: string;
  name: string;
  icon: typeof Tv | typeof MousePointer | typeof Keyboard | typeof Printer;
  color: string;
  glowColor: string;
  steps: Milestone[];
}

const PERIPHERAL_DATA: PeripheralTimelineData[] = [
  {
    id: "monitory",
    name: "Monitory i Ekrany",
    icon: Tv,
    color: "cyan",
    glowColor: "rgba(6,182,212,0.15)",
    steps: [
      {
        year: "Lata 70. XX w.",
        title: "Monochromatyczne terminale CRT",
        description: "Pierwsze ekrany kineskopowe wyświetlające wyłącznie zielony lub bursztynowy tekst za pomocą generatora znaków. Brak obsługi grafiki rastrowej, wysokie napięcie rzędu kilkunastu kilowoltów i wyraźne migotanie.",
        breakthrough: "Zastąpienie papierowych dalekopisów (teletype) natychmiastowym podglądem na ekranie.",
        funFact: "Monochromatyczne monitory kineskopowe mogły doznać trwałego wypalenia luminoforu, jeśli ten sam obraz statyczny (np. znak zachęty terminala) pozostawał wyświetlany zbyt długo bez zmian."
      },
      {
        year: "Lata 80. XX w.",
        title: "Grafika CGA, EGA i rewolucja analogowego VGA",
        description: "Pojawienie się pierwszych kolorów. Od skrajnie ograniczonego trybu CGA (4 kolory w 320x200) do legendarnego, analogowego standardu VGA (640x480 przy 16 kolorach lub 320x200 w 256 barwach) obsługującego płynną paletę kolorów RGB.",
        breakthrough: "Wprowadzenie sygnału analogowego napięcia w kablu D-Sub, dającego pełną swobodę głębi i odcieni dla gier i interfejsów GUI.",
        funFact: "Aby uzyskać ładny obraz, maska cienia w kineskopach VGA musiała rozdzielić paski o szerokości mniejszej niż 0,28 mm. Wymagało to doskonałej osłony magnetycznej przed polem magnetycznym Ziemi!"
      },
      {
        year: "Lata 2000.",
        title: "Przejście na płaskie panele LCD",
        description: "Wyparcie ciężkich i niebezpiecznych lamp CRT na rzecz cienkich i płaskich matryc ciekłokrystalicznych (LCD) z podświetleniem świetlówkowym CCFL. Pojawienie się w pełni cyfrowych złączy transmisyjnych DVI i HDMI.",
        breakthrough: "Wyeliminowanie zjawiska migotania ekranu, perfekcyjna geometria obrazu 'piksel w piksel' oraz radykalne obniżenie poboru prądu.",
        funFact: "Pierwsze komercyjne monitory LCD miały czas pionowego i poziomego odświeżania kryształów tak wolny (rzędu 25-50 ms), że w grach za każdym ruchem kursora powstawała potężna, rozmazana smuga!"
      },
      {
        year: "Współczesność",
        title: "OLED, IPS, ultra-odświeżanie 360Hz+ i HDR",
        description: "Doskonała jakość oparta na technologii organicznych diod OLED (gdzie każdy piksel świeci niezależnie i daje absolutną czerń). Rozdzielczości 4K/8K, częstotliwości odświeżania rzędu 144-360Hz, szerokie spektrum HDR i mikrosekundowy czas reakcji.",
        breakthrough: "Unifikacja transmisji wideo, audio i zasilania za pomocą pojedynczego pasma kabla USB-C z technologiami adaptacyjnej synchronizacji klatek (G-Sync/FreeSync).",
        funFact: "Podświetlenie Mini-LED we współczesnych monitorach potrafi zintegrować na kilkunastu calach ponad 1000 indywidualnych stref przyciemniania, dając jasność punktową przekraczającą 1500 nitów - czyli jaśniej niż bezpośrednie słońce w biurze!"
      }
    ]
  },
  {
    id: "myszy",
    name: "Manipulatory i Myszy",
    icon: MousePointer,
    color: "teal",
    glowColor: "rgba(20,184,166,0.15)",
    steps: [
      {
        year: "1964 r.",
        title: "Drewniana mysz Engelbarta",
        description: "Pierwszy na świecie prototyp fizycznego wskaźnika ekranowego stworzony przez Douglasa Engelbarta. Składał się z solidnej drewnianej obudowy z dwoma prostopadłymi pod kątem 90 stopni metalowymi kółkami pod spodem.",
        breakthrough: "Stworzenie mechanicznego układu współrzędnych osi X i Y zamieniającego ruch ręki na ruch kursora.",
        funFact: "Przewód łączący urządzenie z maszyną wychodził z tylnej części obudowy, co przypominało naukowcom ogon gryzonia. Stąd narodziła się uniwersalna, używana do dziś nazwa 'mysz' (mouse)."
      },
      {
        year: "Lata 80-90. XX w.",
        title: "Kultowe myszy mechaniczne (kulkowe)",
        description: "Ciężka gumowa kulka umieszczona wewnątrz obudowy, która podczas toczenia po powierzchni obraca dwa plastikowe wałki. Na końcu wałków zainstalowano tarcze szczelinowe przecinające strumień podczerwieni z fotodiod.",
        breakthrough: "Masowa produkcja tanich wskaźników, które zrewolucjonizowały systemy operacyjne Macintosh oraz Windows 95.",
        funFact: "Najczęstszą 'czynnością serwisową' tamtej ery było rozkręcanie dolnej pokrywy myszy i mechaniczne usuwanie paznokciem lub wacikiem warstwy zbitego kurzu i tłuszczu osadzającego się na wałkach obrotowych."
      },
      {
        year: "Lata 2000.",
        title: "Sensory optyczne z diodą LED",
        description: "Wyparcie ruchomych elementów mechanicznych. Mysz wykorzystuje miniaturową diodę świecącą w podczerwieni lub czerwieni oraz ultraszybki procesor sygnałowy DSP z mikrokamerą rejestrującą teksturę podłoża.",
        breakthrough: "Koniec zużywania się wałków, idealna precyzja i odporność na zanieczyszczenia - mysz działa bezpośrednio na biurku bez podkładki.",
        funFact: "Pierwsze klasyczne sensory optyczne (jak legendarne Microsoft IntelliMouse) potrafiły wykonywać 'jedynie' 1500-2000 zdjęć powierzchni na sekundę. Przy szybkim ruchu gracza sensor całkowicie gubił orientację graficzną."
      },
      {
        year: "Współczesność",
        title: "Bezprzewodowe opto-lasery o ultra-DPI",
        description: "Wyspecjalizowane sensory laserowe o rozdzielczościach rzędu 26 000+ DPI, bezprzewodowa transmisja radiowa 2.4 GHz o opóźnieniach poniżej 1ms (szybsza niż tradycyjne kable) oraz optyczne przełączniki fizycznych kliknięć.",
        breakthrough: "Komunikacja radiowa o zerowej latencji z polling-rate rzędu 4000-8000 Hz i eliminacja fizycznych styków miedzianych psujących mikrostyki.",
        funFact: "Profesjonalne myszy ważą dziś poniżej 50 gramów bez potrzeby perforacji szkieletu, a ich akumulatory wystarczają na ponad 100 godzin ciągłej rozgrywki lub pracy biurowej z szybkim ładowaniem USB-C."
      }
    ]
  },
  {
    id: "klawiatury",
    name: "Klawiatury",
    icon: Keyboard,
    color: "purple",
    glowColor: "rgba(168,85,247,0.15)",
    steps: [
      {
        year: "Lata 70. XX w.",
        title: "Klawiatury terminali z kontaktronami",
        description: "Wytrzymałe, potężne klawiatury mechaniczne oparte o kontaktrony magnetyczne lub przełączniki z efektem Halla. Każdy klawisz stanowił osobny, niezależny moduł lutowany do ciężkiej stalowej płyty usztywniającej.",
        breakthrough: "Stworzenie niemal niezniszczalnych paneli wejściowych odpornych na miliony uderzeń urzędników mainframe.",
        funFact: "Klawiatury te ważyły niejednokrotnie od 3 do ponad 5 kilogramów, a koszt ich produkcji przekraczał równowartość dzisiejszych kilkuset dolarów za jedną sztukę!"
      },
      {
        year: "Lata 90. XX w.",
        title: "Era piankowych kopułek membranowych",
        description: "Radykalne obniżenie kosztów. Zamiast drogich niezależnych przełączników zastosowano trójwarstwową folię z nadrukowanymi ścieżkami węglowymi i elastyczną matę z gumowymi kopułkami (rubber dome).",
        breakthrough: "Możliwość dołączania klawiatury do każdego taniego domowego komputera PC za ułamek ceny.",
        funFact: "Tania budowa membranowa wprowadziła jednak tzw. 'mushiness' (brak ostrego progu wciśnięcia) oraz problem Ghostingu - niemożność odczytania kombinacji np. więcej niż 3 klawiszy wciśniętych jednocześnie."
      },
      {
        year: "Lata 2010.",
        title: "Odrodzenie mechaniczne i oświetlenie RGB",
        description: "Złota era renesansu przełączników mechanicznych (Cherry MX, Kailh, Gateron). Gracze i programiści doceniają wyczuwalny fizyczny punkt aktywacji oraz sprężynowy powrót klawisza. Pojawia się pełne adresowane RGB.",
        breakthrough: "Standard N-Key Rollover (NKRO) pozwalający na bezbłędny odczyt wszystkich wciśniętych klawiszy naraz.",
        funFact: "Słynny 'niebieski switch' (Blue clicky) wydaje charakterystyczny dźwięk nie poprzez styk elektryczny, lecz upuszczany gwałtownie wewnętrzny plastikowy suwak, który uderza w plastikowy dół obudowy przełącznika."
      },
      {
        year: "Współczesność",
        title: "Przełączniki magnetyczne Halla (Rapid Trigger)",
        description: "Najwyższy technologiczny stopień ewolucji. Rezygnacja ze styków metalowych na rzecz magnesu wbudowanego w trzon klawisza i sensora Halla na płycie PCB. Pozwala to na ciągły pomiar położenia klawisza z dokładnością do 0.1 mm.",
        breakthrough: "Możliwość płynnego programowania punktu aktywacji przez oprogramowanie oraz funkcja Rapid Trigger (natychmiastowy reset rozkazu przy minimalnym uniesieniu palca).",
        funFact: "Współczesne klawiatury magnetyczne mogą służyć jako precyzyjne kontrolery analogowe - wciśnięcie klawisza 'W' dopasowuje np. stopień otwarcia przepustnicy w symulatorze samochodu w zależności od siły nacisku!"
      }
    ]
  },
  {
    id: "drukarki",
    name: "Drukarki i Plotery",
    icon: Printer,
    color: "amber",
    glowColor: "rgba(245,158,11,0.15)",
    steps: [
      {
        year: "Lata 70-80. XX w.",
        title: "Głośny druk igłowy (Dot-Matrix)",
        description: "Drukarki uderzeniowe. Głowica drukująca wyposażona w zestaw pionowych stalowych igieł (zwykle 9 lub 24), które dynamicznie uderzają poprzez taśmę nasączoną czarnym lub kolorowym tuszem w papier.",
        breakthrough: "Możliwość drukowania na papierze składanym z perforacją oraz tworzenie kopii za pomocą kalki samokopiującej.",
        funFact: "Charakterystyczny, piskliwy, głośny dźwięk drukarek igłowych powstawał na skutek drgań igieł uderzających z częstotliwością kilku tysięcy herców. W biurach budowano dla nich specjalne, dźwiękoszczelne szafy!"
      },
      {
        year: "Lata 90. XX w.",
        title: "Druk atramentowy (Bąbelkowy i Piezo)",
        description: "Wdrożenie precyzyjnych głowic natryskujących mikroskopijne kropelki płynnego tuszu. Stosowano rewolucyjne metody termiczne (podgrzanie bąbelka pary) lub piezoelektryczne (fizyczny nacisk na zbiornik mikro-kryształem).",
        breakthrough: "Dostępność taniego, cichego druku kolorowego o wysokiej rozdzielczości (generowanie barwnych zdjęć w domu).",
        funFact: "Krople atramentu we współczesnych głowicach mają objętość rzędu 1-2 pikolitrów. Spiekany tusz porusza się w powietrzu z prędkością nawet do 40 km/h, zanim trafi idealnie w wyznaczony punkt na kartce."
      },
      {
        year: "Lata 2000.",
        title: "Bęben elektrofotograficzny (Druk Laserowy)",
        description: "Druk bezkontaktowy o ekspresowej wydajności. Wiązka lasera 'rysuje' ładunkiem na specjalnym naelektryzowanym bębnie światłoczułym (OPC). Do naładowanych miejsc przyciągany jest sproszkowany toner, który następnie zostaje wtłoczony termicznie przez wałki rozgrzewające (fuzer).",
        breakthrough: "Niezwykła prędkość druku jednokolorowego i barwnego, nieskazitelne ostre krawędzie czcionek tekstowych i pełna wodoodporność wydruków.",
        funFact: "Temperatura wałka utrwalacza (fuser) w drukarce laserowej sięga blisko 200°C. Kartka podróżuje przez ten element tak szybko, że papier nie ulega zapłonowi, lecz wychodzi z urządzenia przyjemnie ciepły!"
      },
      {
        year: "Współczesność",
        title: "Drukarki 3D (FDM / żywiczne SLA)",
        description: "Ewolucja seryjnego drukowania 2D na papierze w kierunku trójwymiarowego formowania fizycznych obiektów z modeli CAD. Drukarki 3D precyzyjnie nakładają warstwa po warstwie stopiony termoplast (PLA/PETG) lub utwardzają płynną żywicę promieniami UV.",
        breakthrough: "Wdrożenie technologii addytywnego szybkiego prototypowania (Rapid Prototyping) bezpośrednio na domowym biurku.",
        funFact: "Dysza standardowej drukarki FDM nakłada nitkę plastiku o grubości zaledwie 0.4 mm. Jedna szpula filamentu o masie 1 kg może rozwinąć się w nieprzerwany przewód z tworzywa o łącznej długości powyżej 330 metrów!"
      }
    ]
  }
];

export default function PeripheralTimeline() {
  const [activeCategory, setActiveCategory] = useState<string>("monitory");
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  // Simulation specific states
  // 1. Monitors
  const [monitorMode, setMonitorMode] = useState<"crt" | "oled">("crt");
  
  // 2. Mouse ball dirt sim
  const [mouseDirt, setMouseDirt] = useState<number>(35); // percentage of dust on rollers
  const [mouseYCoord, setMouseYCoord] = useState<number>(100);
  const [mouseXCoord, setXCoord] = useState<number>(100);
  const [opticalVector, setOpticalVector] = useState<{dx: number, dy: number}>({dx: 0, dy: 0});
  const [mouseCleanMessage, setMouseCleanMessage] = useState<string>("");

  // 3. Keyboards switch profiles
  const [keyboardProfile, setKeyboardProfile] = useState<"dome" | "cherry" | "hall">("dome");
  const [keyPressProgress, setKeyPressProgress] = useState<number>(0); // 0 to 100
  const [hallTriggerPoint, setHallTriggerPoint] = useState<number>(1.8); // mm
  const [rapidTriggerActive, setRapidTriggerActive] = useState<boolean>(true);
  const [simulatedLog, setSimulatedLog] = useState<string[]>(["Gotowy do symulacji wciśnięcia klawisza..."]);

  // 4. Printer simulation
  const [printerText, setPrinterText] = useState<string>("CORE");
  const [activePrinterType, setActivePrinterType] = useState<"dot" | "laser">("dot");
  const [printProgress, setPrintProgress] = useState<number>(0);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printedOutput, setPrintedOutput] = useState<string[]>([]);
  const [printerFeed, setPrinterFeed] = useState<string[]>([]);

  const selectedPeripheral = PERIPHERAL_DATA.find(p => p.id === activeCategory) || PERIPHERAL_DATA[0];
  const step = selectedPeripheral.steps[selectedStepIndex] || selectedPeripheral.steps[0];

  // Helper colors
  const getColorClasses = (color: string) => {
    switch (color) {
      case "cyan":
        return {
          text: "text-cyan-400",
          border: "border-cyan-500/30",
          borderActive: "border-cyan-500",
          bg: "bg-cyan-950/20",
          bgBadge: "bg-cyan-500/10",
          glow: "rgba(6, 182, 212, 0.15)",
          accent: "cyan"
        };
      case "teal":
        return {
          text: "text-teal-400",
          border: "border-teal-500/30",
          borderActive: "border-teal-500",
          bg: "bg-teal-950/20",
          bgBadge: "bg-teal-500/10",
          glow: "rgba(20, 184, 166, 0.15)",
          accent: "teal"
        };
      case "purple":
        return {
          text: "text-purple-400",
          border: "border-purple-500/30",
          borderActive: "border-purple-500",
          bg: "bg-purple-950/20",
          bgBadge: "bg-purple-500/10",
          glow: "rgba(168, 85, 247, 0.15)",
          accent: "purple"
        };
      case "amber":
        return {
          text: "text-amber-400",
          border: "border-amber-500/30",
          borderActive: "border-amber-500",
          bg: "bg-amber-950/20",
          bgBadge: "bg-amber-500/10",
          glow: "rgba(245, 158, 11, 0.15)",
          accent: "amber"
        };
      default:
        return {
          text: "text-cyan-400",
          border: "border-cyan-500/30",
          borderActive: "border-cyan-500",
          bg: "bg-cyan-950/20",
          bgBadge: "bg-cyan-500/10",
          glow: "rgba(6, 182, 212, 0.15)",
          accent: "cyan"
        };
    }
  };

  const scheme = getColorClasses(selectedPeripheral.color);

  // Interaction handlers
  // Mouse roller drag simulation
  const handleMouseMoveSimulation = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate direction deltas
    const dx = x - mouseXCoord;
    const dy = y - mouseYCoord;
    
    setXCoord(x);
    setMouseYCoord(y);
    setOpticalVector({ dx, dy });

    if (mouseDirt < 100) {
      // Accumulate dirty particles during physical rolling
      setMouseDirt(prev => Math.min(100, prev + Math.abs(dx + dy) * 0.05));
    }
  };

  const cleanMouseRollers = () => {
    setMouseDirt(0);
    setMouseCleanMessage("Wyczyszczono wałki z kurzu! Czułość 100% płynności przywrócona.");
    setTimeout(() => setMouseCleanMessage(""), 3500);
  };

  // Switch tester trigger simulation
  useEffect(() => {
    if (keyPressProgress > 0) {
      const depth = (keyPressProgress / 100) * 4.0; // max depth 4.0mm
      const logs = [];

      if (keyboardProfile === "dome") {
        if (depth > 1.2 && depth < 1.4) {
          logs.push(`[MATA MEMBRANOWA]: Próg ugięcia kopułki pokonany na głębokości ${depth.toFixed(2)}mm. Kopułka gwałtownie zapada się!`);
        }
        if (depth >= 3.6) {
          logs.push(`[ZAMKNIĘCIE OBWODU]: Pełne dociśnięcie gumy na głębokości ${depth.toFixed(2)}mm. Zwarcie styków węglowych. KLAWIATURA ODNOTOWAŁA SYGNAŁ.`);
        }
      }

      if (keyboardProfile === "cherry") {
        if (depth >= 2.0 && depth < 2.2) {
          logs.push(`[SWITCH MECHANICZNY]: Pokonano próg aktywacji miedzianego listka na wysokości ${depth.toFixed(2)}mm. Aktywacja logiczna! (Sygnał wysłany przed końcem skoku).`);
        }
        if (depth >= 4.0) {
          logs.push(`[BOTTOM OUT]: Klaster suwaka uderzył w spód obudowy na głębokości 4.00mm. Maksymalny skok sprężyny.`);
        }
      }

      if (keyboardProfile === "hall") {
        logs.push(`[EFEKT HALLA]: Pomiar napięcia sensora. Magnes na głębokości ${depth.toFixed(2)}mm. Wykrywane pole: ${(depth * 180).toFixed(0)} Gaussów.`);
        if (depth >= hallTriggerPoint) {
          logs.push(`[CYFROWY ALASKA]: Magnes minął zaprogramowany punkt aktywacji (${hallTriggerPoint.toFixed(1)}mm). Naciśnięcie ROZPOZNANE.`);
        } else if (rapidTriggerActive && depth > 0.4) {
          logs.push(`[RAPID TRIGGER]: Klawisz w bezpiecznej dynamicznej strefie aktywacji.`);
        }
      }

      if (logs.length > 0) {
        setSimulatedLog(prev => {
          const fresh = [...prev, ...logs];
          if (fresh.length > 12) fresh.shift();
          return fresh;
        });
      }
    }
  }, [keyPressProgress, keyboardProfile]);

  // Dot matrix printer simulator runner
  const runPrintingSimulation = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setPrintProgress(0);
    setPrintedOutput([]);
    setPrinterFeed([]);

    const chars = printerText.toUpperCase().split("");
    let currentProgress = 0;

    if (activePrinterType === "dot") {
      // Dot matrix prints character columns slowly
      const interval = setInterval(() => {
        currentProgress += 5;
        setPrintProgress(currentProgress);

        if (currentProgress % 20 === 0) {
          const charIndex = Math.floor(currentProgress / 25);
          if (charIndex < chars.length) {
            const c = chars[charIndex];
            // Dot matrix pixel grid visualization lines
            const lines = [
              c === "C" ? ".•••." : c === "O" ? ".•••." : c === "R" ? "••••." : c === "E" ? "•••••" : "•••",
              c === "C" ? "•...•" : c === "O" ? "•...•" : c === "R" ? "•...•" : c === "E" ? "•...." : ".•.",
              c === "C" ? "•...." : c === "O" ? "•...•" : c === "R" ? "••••." : c === "E" ? "•••.." : ".•.",
              c === "C" ? "•...•" : c === "O" ? "•...•" : c === "R" ? "•..•." : c === "E" ? "•...." : ".•.",
              c === "C" ? ".•••." : c === "O" ? ".•••." : c === "R" ? "•...•" : c === "E" ? "•••••" : "•••"
            ];
            setPrintedOutput(prev => [...prev, `Igła drukuje znak '${c}': column po kolumnie...`]);
            setPrinterFeed(prev => {
              if (prev.length === 0) return lines;
              return prev.map((l, i) => l + "   " + lines[i]);
            });
          }
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsPrinting(false);
          setPrintProgress(100);
          setPrintedOutput(prev => [...prev, "ZAKOŃCZONO DRUKOWANIE IGŁOWE. Papier perforowany wysunięty."]);
        }
      }, 150);
    } else {
      // Laser instantly fuzes with heat
      const interval = setInterval(() => {
        currentProgress += 10;
        setPrintProgress(currentProgress);

        if (currentProgress === 10) {
          setPrintedOutput(prev => [...prev, "1. Wiązka lasera ładuje lustrzany bęben światłoczuły OPC..."]);
        }
        if (currentProgress === 40) {
          setPrintedOutput(prev => [...prev, "2. Sproszkowany czarny polimer (toner) zostaje przyciągnięty statycznie do bębna..."]);
        }
        if (currentProgress === 70) {
          setPrintedOutput(prev => [...prev, "3. Wałek grzejnika (fuzer) natychmiast wtapia proszek w papier w temperaturze 195°C!"]);
          setPrinterFeed([
            `██████   ██████  ██████  ████████`,
            `██      ██    ██ ██   ██ ██      `,
            `██      ██    ██ ██████  ██████  `,
            `██      ██    ██ ██   ██ ██      `,
            ` ██████  ██████  ██   ██ ████████`
          ]);
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsPrinting(false);
          setPrintProgress(100);
          setPrintedOutput(prev => [...prev, "ZAKOŃCZONO DRUKOWANIE LASEROWE. Wydruk idealnie ostry, wodoodporny i ciepły!"]);
        }
      }, 200);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full" id="peripheral-timeline-module">
      
      {/* Category selector panel */}
      <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-slate-900/80 grid grid-cols-2 md:grid-cols-4 gap-2 shadow-inner">
        {PERIPHERAL_DATA.map((p) => {
          const isSelected = p.id === activeCategory;
          const Icon = p.icon;
          const sch = getColorClasses(p.color);
          return (
            <button
              key={p.id}
              onClick={() => {
                setActiveCategory(p.id);
                setSelectedStepIndex(0);
              }}
              className={`p-3 rounded-xl border text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2.5 cursor-pointer ${
                isSelected
                  ? `${sch.border} ${sch.bg} ${sch.text} shadow-[0_0_15px_rgba(6,182,212,0.06)]`
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main split: left step list / timeline chain, right step detail card & simulators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left pane: Step navigation chain (span 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-550 uppercase">
                OŚ CZASU: {selectedPeripheral.name.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold text-slate-250 mt-1">Główne przełomy ewolucyjne</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                Kliknij dowolny etap poniżej, aby wyświetlić szczegóły, dane specyfikacji i uruchomić interaktywny symulator.
              </p>

              {/* Vertical timeline stepper */}
              <div className="relative mt-6 pl-4 space-y-4">
                {/* Thin vertical glow bar */}
                <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-slate-850" />
                <div 
                  className="absolute left-[7px] top-1 w-0.5 transition-all duration-300"
                  style={{ 
                    height: `${(selectedStepIndex / (selectedPeripheral.steps.length - 1)) * 100}%`,
                    backgroundColor: selectedPeripheral.color === "cyan" ? "#22d3ee" : selectedPeripheral.color === "teal" ? "#14b8a6" : selectedPeripheral.color === "purple" ? "#a855f7" : "#f59e0b"
                  }} 
                />

                {selectedPeripheral.steps.map((s, idx) => {
                  const active = idx === selectedStepIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedStepIndex(idx)}
                      className="text-left w-full pl-6 pr-2 py-2.5 rounded-xl border relative transition-all block cursor-pointer group"
                      style={{
                        backgroundColor: active ? scheme.bg : "transparent",
                        borderColor: active ? scheme.borderActive : "transparent"
                      }}
                    >
                      {/* Round timeline indicator */}
                      <div 
                        className={`absolute left-[-15px] top-[14px] w-[14px] h-[14px] rounded-full border-2 transition-all flex items-center justify-center ${
                          active
                            ? "bg-slate-950"
                            : "bg-slate-900 border-slate-800 group-hover:border-slate-600"
                        }`}
                        style={{
                          borderColor: active ? (selectedPeripheral.color === "cyan" ? "#22d3ee" : selectedPeripheral.color === "teal" ? "#14b8a6" : selectedPeripheral.color === "purple" ? "#a855f7" : "#f59e0b") : ""
                        }}
                      >
                        {active && (
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: selectedPeripheral.color === "cyan" ? "#22d3ee" : selectedPeripheral.color === "teal" ? "#14b8a6" : selectedPeripheral.color === "purple" ? "#a855f7" : "#f59e0b"
                            }}
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-start font-sans">
                        <span className={`text-[10px] font-bold font-mono ${active ? scheme.text : "text-slate-500"}`}>
                          {s.year}
                        </span>
                        {active && (
                          <span className={`${scheme.bgBadge} ${scheme.text} text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${scheme.border} uppercase`}>
                            Aktywny
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold leading-normal mt-1 ${active ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"}`}>
                        {s.title}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl mt-6 text-[10px] text-slate-500 leading-normal font-sans">
              <strong>Zjawisko ucieczki pasmowej:</strong> Im nowsza epoka, tym więcej danych (interfejsów cyfrowych) potrzebujemy do obsłużenia szybkich odświeżeń peryferiów komputerowych.
            </div>
          </div>
        </div>

        {/* Right pane: Milestone description card & interactive simulator widgets (span 8) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Detailed step characteristics screen */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[180px] h-[60px] rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: scheme.glow }} />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-900">
                <div className="flex items-center space-x-2.5">
                  <span className={`${scheme.bgBadge} p-1.5 rounded-lg border ${scheme.border} ${scheme.text}`}>
                    <History className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-550 uppercase">Formacja Technologiczna</span>
                    <h4 className="text-md font-extrabold text-white leading-none mt-0.5">{step.title} ({step.year})</h4>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">Opis i znaczenie historyczne</h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{step.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between">
                  <h6 className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono">Główny Przełom Techniczny:</h6>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">{step.breakthrough}</p>
                </div>

                <div className="p-3 bg-amber-950/10 rounded-xl border border-amber-900/10 flex flex-col justify-between">
                  <h6 className="text-[9px] font-bold text-amber-500 uppercase tracking-wider font-mono">Ciekawostka / Czy wiesz że?</h6>
                  <p className="text-[11px] text-slate-350 leading-relaxed mt-1 italic font-sans">{step.funFact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive tactile playground simulator widget */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">Interaktywny Eksperyment i Tester Technologii</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-900">
                  Tryb Fizyczno-Edukacyjny
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-4 leading-normal font-sans">
                Przetestuj fizyczną zasadę działania, która zdefiniowała tę kategorię urządzeń. Wypróbuj miniaturowy tester poniżej:
              </p>

              {/* DYNAMIC SIMULATOR WIDGET DETERMINED BY SELECTED CATEGORY */}
              
              {/* 1. MONITOR WIDGET (CRT vs OLED pixel structure zoom) */}
              {activeCategory === "monitory" && (
                <div className="bg-slate-950 rounded-xl border border-slate-900 p-4 space-y-4" id="sim-monitor">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">Struktura subpikseli z bliska</span>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setMonitorMode("crt")}
                        className={`py-1 px-3.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          monitorMode === "crt" ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Kineskop CRT
                      </button>
                      <button
                        onClick={() => setMonitorMode("oled")}
                        className={`py-1 px-3.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          monitorMode === "oled" ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Matryca OLED
                      </button>
                    </div>
                  </div>

                  {/* Pixel display render block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Visual schematic */}
                    <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-850 flex items-center justify-center">
                      {monitorMode === "crt" ? (
                        /* CRT Grid look */
                        <div className="w-full h-full relative p-2 flex flex-col justify-between">
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6))] z-10 pointer-events-none" />
                          {/* Horizontal Scanlines representation pattern */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[size:100%_4px] pointer-events-none" />
                          
                          {/* Glowing circular triad structure (phosphorus dot pattern) */}
                          <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center opacity-85 select-none relative z-0">
                            {Array.from({ length: 48 }).map((_, i) => (
                              <div key={i} className="flex space-x-0.5 scale-75 animate-pulse" style={{ animationDelay: `${(i % 5) * 0.1}s`, animationDuration: "2s" }}>
                                <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_2px_rgba(220,38,38,0.7)]" title="Red phosphor" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_2px_rgba(34,197,94,0.7)]" title="Green phosphor" />
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_2px_rgba(37,99,235,0.7)]" title="Blue phosphor" />
                              </div>
                            ))}
                          </div>
                          
                          {/* Beam flicker effect element */}
                          <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-wider font-mono text-red-500/80 bg-red-950/20 px-1.5 py-0.5 rounded border border-red-900/30">
                            Sygnał analogowy 15.6 kHz (Flicker)
                          </span>
                        </div>
                      ) : (
                        /* OLED sharp screen look */
                        <div className="w-full h-full relative flex flex-col justify-between p-2">
                          <div className="w-full h-full grid grid-cols-12 gap-1 items-center justify-center p-2 opacity-95">
                            {Array.from({ length: 96 }).map((_, i) => {
                              // Simulate some pixels being fully OFF (0V absolute black) - representing high contrast
                              const isOff = i % 8 === 0 || i % 11 === 0;
                              return (
                                <div 
                                  key={i} 
                                  className={`w-3.5 h-4 rounded-sm flex flex-col justify-between p-0.5 border border-slate-900/60 transition-all ${
                                    isOff ? "bg-black opacity-10" : "bg-slate-950 border border-slate-900"
                                  }`}
                                >
                                  {!isOff && (
                                    <>
                                      <div className="w-full h-[3px] bg-red-500 rounded-sm" />
                                      <div className="w-full h-[3px] bg-green-400 rounded-sm" />
                                      <div className="w-full h-[3px] bg-blue-500 rounded-sm" />
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-wider font-mono text-emerald-400/90 bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/30">
                            Kontrast nieskończony (Piksel wygaszony = 0V)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Educational feedback text */}
                    <div className="space-y-2.5 font-sans">
                      <h6 className="text-[11px] font-bold text-slate-300 font-mono">
                        {monitorMode === "crt" ? "Technologia Kineskopowa (CRT):" : "Technologia Samoemisyjna (OLED):"}
                      </h6>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {monitorMode === "crt" ? (
                          "Ekrany CRT manipulowały wiązką elektronów uderzającą w warstwę luminoforu na szkle. Maska cienia fizycznie separowała paski barwne. Pixele nie były fizycznie ograniczone krawędziami - sygnał wideo był ciągłą falą napięcia analogowego."
                        ) : (
                          "W technologii OLED każdy pojedynczy subpiksel to niezależna organiczna dioda emitująca światło. Aby wyświetlić głęboką czerń, dioda zostaje całkowicie odcięta od prądu, dzięki czemu nie emituje blasku (kontrast dążący do nieskończoności)."
                        )}
                      </p>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-cyan-400 font-mono">
                        {monitorMode === "crt" ? "Wymaga rozmagnesowywania cewkami (Degauss)" : "Czas reakcji subpiksela: <0.03 ms"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MOUSE WIDGET (Dirt accumulation and optical sensor deltas) */}
              {activeCategory === "myszy" && (
                <div className="bg-slate-950 rounded-xl border border-slate-900 p-4 space-y-4 font-sans" id="sim-mouse">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-slate-900 pb-2.5">
                    <div>
                      <span className="text-[11px] font-bold text-slate-300">
                        {selectedStepIndex <= 1 ? "Sim wałków kulkowych (Retro):" : "Sim sensora optycznego (Dziś):"}
                      </span>
                      <p className="text-[10px] text-slate-500">Przesuwaj kursor wewnątrz ciemnej areny, aby generować ruch:</p>
                    </div>

                    {selectedStepIndex <= 1 && (
                      <button
                        onClick={cleanMouseRollers}
                        className="py-1 px-3 bg-red-950/40 hover:bg-red-900/60 text-red-400 font-bold border border-red-900/40 rounded flex items-center space-x-1.5 cursor-pointer text-[10px]"
                        title="Usuń zebrany kurz z wałków miedzianych"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Wyczyść wałki z kurzu</span>
                      </button>
                    )}
                  </div>

                  {mouseCleanMessage && (
                    <div className="p-2 bg-emerald-950/20 border border-emerald-900/20 rounded-lg text-[10px] text-emerald-400 animate-fade-in flex items-center">
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400 shrink-0" />
                      <span>{mouseCleanMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Active Trackpad Area */}
                    <div 
                      onMouseMove={handleMouseMoveSimulation}
                      className="h-32 rounded-lg bg-black border-2 border-dashed border-slate-800 hover:border-cyan-500/30 transition-all flex items-center justify-center relative cursor-move overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-10" />
                      
                      {selectedStepIndex <= 1 ? (
                        /* Ball tracker view */
                        <div className="text-center relative z-15">
                          <div className="w-12 h-12 rounded-full bg-slate-700 border-4 border-slate-650 flex items-center justify-center mx-auto shadow-xl relative animate-pulse">
                            <span className="text-[8px] font-mono font-bold text-slate-900">KULKA</span>
                          </div>
                          <p className="text-[8px] text-slate-500 font-mono mt-1 uppercase">Złap i poruszaj, aby obracać wałkami</p>
                        </div>
                      ) : (
                        /* Optical flow view */
                        <div className="text-center w-full h-full relative flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9)] animate-ping absolute" />
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute" />
                          <span className="text-[8px] font-mono text-red-500/80 uppercase absolute bottom-2 tracking-widest">
                            DSP sensor LED @ 8500 FPS
                          </span>
                        </div>
                      )}

                      {/* Display coordinates tracking tooltip */}
                      <span className="absolute top-2 right-2 font-mono text-[8px] text-slate-500">
                        X: {mouseXCoord.toFixed(0)}px | Y: {mouseYCoord.toFixed(0)}px
                      </span>
                    </div>

                    {/* Indicators details */}
                    <div className="space-y-2.5">
                      {selectedStepIndex <= 1 ? (
                        /* Dirt indicator bar */
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-400">Zabrudzenie klinowe wałków:</span>
                            <span className={mouseDirt > 70 ? "text-red-400 font-bold" : "text-amber-500"}>
                              {mouseDirt.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                mouseDirt > 70 ? "bg-gradient-to-r from-red-650 to-red-550" : "bg-gradient-to-r from-amber-600 to-amber-450"
                              }`}
                              style={{ width: `${mouseDirt}%` }}
                            />
                          </div>
                          
                          <p className="text-[10px] text-slate-450 leading-relaxed font-sans mt-1">
                            {mouseDirt < 40 ? (
                              "Wałki obracają się płynnie. Impulsy z transoptorów są zliczane poprawnie, kursor porusza się stabilnie z czułością fizyczną."
                            ) : mouseDirt < 75 ? (
                              "Ostrzeżenie: Brud zaczyna oblepiać osie. Mysz sporadycznie pomija ułamki ruchów, delikatne szarpanie wskaźnika."
                            ) : (
                              "Krytyczny stopień ślizgania! Mysz całkowicie gubi odczyt osi pionowej. Wymagane pilne czyszczenie wacikiem z alkoholem izopropylowym."
                            )}
                          </p>
                        </div>
                      ) : (
                        /* Optical tracking displacement vectors */
                        <div className="space-y-2 font-mono text-[10px]">
                          <span className="text-slate-400 font-sans">Sygnał procesora DSP (Deltas):</span>
                          
                          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850 space-y-1 text-slate-350">
                            <p>Wektor przemieszczenia dX: <span className="text-cyan-400 font-bold font-mono">{opticalVector.dx > 0 ? "+" : ""}{opticalVector.dx.toFixed(1)} DPI</span></p>
                            <p>Wektor przemieszczenia dY: <span className="text-cyan-400 font-bold font-mono">{opticalVector.dy > 0 ? "+" : ""}{opticalVector.dy.toFixed(1)} DPI</span></p>
                            <p>Częstotliwość raportowania: <span className="text-emerald-400 font-bold">1000 Hz / 1.0 ms</span></p>
                          </div>
                          <p className="text-[10px] text-slate-450 font-sans leading-relaxed">
                            Brak tarcia elementów stałych. Cyfrowy procesor sygnału (DSP) wykonuje algorytmy korelacji krzyżowej i porównuje mikrofotografie powierzchni w czasie rzeczywistym.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. KEYBOARD SWITCH TESTING MODULE */}
              {activeCategory === "klawiatury" && (
                <div className="bg-slate-950 rounded-xl border border-slate-900 p-4 space-y-4" id="sim-keyboard">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-900 pb-2.5">
                    <span className="text-[11px] font-bold text-slate-300">Weryfikator profilu ugięcia sprężyny</span>
                    
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                      {[
                        { id: "dome", label: "Membrana" },
                        { id: "cherry", label: "Mechaniczna" },
                        { id: "hall", label: "Magnetyczna (Hall)" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setKeyboardProfile(item.id as any);
                            setKeyPressProgress(0);
                          }}
                          className={`py-1 px-2.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                            keyboardProfile === item.id ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40" : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                    {/* Visual switch outline slider (span 5) */}
                    <div className="md:col-span-5 bg-slate-900/60 p-3 rounded-lg border border-slate-850 flex flex-col justify-between items-center text-center">
                      <div className="space-y-1 mb-2">
                        <p className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Regulacja głębokości skoku:</p>
                        <p className="text-[11px] font-mono text-amber-500 font-bold">
                          Głębokość: {((keyPressProgress / 100) * 4.0).toFixed(2)} mm
                        </p>
                      </div>

                      {/* Interactive Drag/Slider simulating the keycap push */}
                      <div className="flex items-center space-x-3 w-full my-4">
                        <span className="text-[9px] text-slate-550 font-mono">0 mm (Góra)</span>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={keyPressProgress}
                          onChange={(e) => setKeyPressProgress(parseInt(e.target.value))}
                          className="flex-1 accent-cyan-400 h-1.5 bg-slate-950 rounded-full cursor-pointer border border-slate-800"
                        />
                        <span className="text-[9px] text-slate-550 font-mono">4 mm (Dół)</span>
                      </div>

                      {/* Hall trigger customize slider */}
                      {keyboardProfile === "hall" && (
                        <div className="w-full bg-slate-950 p-2 rounded-lg border border-slate-850 text-left space-y-1.5 mt-1">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-slate-450">Punkt aktywacji Halla:</span>
                            <span className="text-cyan-400 font-bold">{hallTriggerPoint.toFixed(1)} mm</span>
                          </div>
                          <input 
                            type="range"
                            min="1"
                            max="38"
                            step="1"
                            value={hallTriggerPoint * 10}
                            onChange={(e) => setHallTriggerPoint(parseInt(e.target.value) / 10)}
                            className="w-full accent-amber-500 h-1 bg-slate-900 rounded-full cursor-pointer"
                          />
                          <div className="flex items-center justify-between text-[8px] font-mono text-slate-550 pt-0.5">
                            <span>0.1 mm (Czuły)</span>
                            <span>3.8 mm (Głęboki)</span>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setKeyPressProgress(0);
                          setSimulatedLog(["Wyczyszczono historię, gotowy do kliknięcia."]);
                        }}
                        className="w-full py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded text-[9.5px] cursor-pointer mt-2"
                      >
                        Wyczyszczenie testu
                      </button>
                    </div>

                    {/* Operational monitor graph screen logs (span 7) */}
                    <div className="md:col-span-7 flex flex-col justify-between space-y-2">
                      <p className="text-[9px] font-mono text-slate-500 uppercase uppercase">Odczyt fizycznych stanów szyny klawisza:</p>
                      
                      <div className="bg-black/90 rounded-lg p-3 border border-slate-900 text-[10px] font-mono text-cyan-400/90 leading-tight space-y-1 flex-1 min-h-[140px] max-h-[160px] overflow-y-auto">
                        {simulatedLog.map((log, idx) => (
                          <p key={idx} className={log.includes("KLAWIATURA") || log.includes("ROZPOZNANE") ? "text-amber-400 font-bold" : ""}>
                            &gt; {log}
                          </p>
                        ))}
                      </div>

                      <div className="text-[9.5px] text-slate-500 italic leading-relaxed">
                        {keyboardProfile === "dome" && "Kopułka gumowa ma charakterystyczny stromy garb odporności, zapobiegający przypadkowym kliknięciom."}
                        {keyboardProfile === "cherry" && "Przełącznik mechaniczny aktywuje styk miedziany dokładnie w połowie drogi (2.0mm), co umożliwia szybsze pisanie."}
                        {keyboardProfile === "hall" && "Dzięki brakowi fizycznych styków, magnetyczna klawiatura z sensorem Halla przetrwa ponad 100 milionów kliknięć i nie posiada zjawiska odbicia styków (Debounce delay)."}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PRINTER PRINTING FLOW SIMULATOR */}
              {activeCategory === "drukarki" && (
                <div className="bg-slate-950 rounded-xl border border-slate-900 p-4 space-y-4" id="sim-printer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2.5">
                    <span className="text-[11px] font-bold text-slate-300">Wizualizacja formowania druku</span>
                    
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          setActivePrinterType("dot");
                          setPrintedOutput([]);
                          setPrinterFeed([]);
                        }}
                        className={`py-1 px-3.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          activePrinterType === "dot" ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Igłowa (Dot-Matrix)
                      </button>
                      <button
                        onClick={() => {
                          setActivePrinterType("laser");
                          setPrintedOutput([]);
                          setPrinterFeed([]);
                        }}
                        className={`py-1 px-3.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          activePrinterType === "laser" ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40" : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Laserowa (Toner & Heat)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Controls (span 4) */}
                    <div className="lg:col-span-4 bg-slate-900/60 p-3 rounded-lg border border-slate-850 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[9.5px] font-mono text-slate-400 uppercase font-bold">Tekst do wydrukowania:</label>
                          <input 
                            type="text"
                            maxLength={8}
                            value={printerText}
                            onChange={(e) => setPrinterText(e.target.value.toUpperCase().replace(/[^A-Z]/g, " "))}
                            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded p-1.5 text-xs text-white font-mono uppercase"
                            placeholder="CORE"
                            disabled={isPrinting}
                          />
                        </div>

                        {/* Fire printing action btn */}
                        <button
                          onClick={runPrintingSimulation}
                          disabled={isPrinting || !printerText}
                          className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-650 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center space-x-1 cursor-pointer transition-all"
                        >
                          {isPrinting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mr-1.5" />
                              <span>Drukowanie... {printProgress}%</span>
                            </>
                          ) : (
                            <span>Uruchom Wydruk</span>
                          )}
                        </button>
                      </div>

                      <div className="p-2 border border-slate-800 rounded bg-slate-950 text-[8.5px] font-mono text-slate-500 mt-3 leading-normal">
                        <strong>Papier:</strong> {activePrinterType === "dot" ? "Mechaniczny papier składany o masie 80g z perforacją boczną" : "Uniwersalny papier kserograficzny A4"}
                      </div>
                    </div>

                    {/* Paper screen visual output display (span 8) */}
                    <div className="lg:col-span-8 flex flex-col justify-between space-y-2.5">
                      {/* Interactive physical printer sheet visualization */}
                      <div className="flex-1 bg-amber-50/5 p-4 rounded-lg border border-slate-900 relative overflow-hidden flex flex-col justify-center items-center min-h-[140px]">
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-[#1C1D24] to-transparent pointer-events-none" />
                        
                        {/* Printable sheet paper simulation box */}
                        <div className="bg-slate-100 dark:bg-slate-100 rounded p-4 text-[#0F172A] w-5/6 shadow-2xl relative border-y-2 border-dashed border-slate-350 min-h-[110px] select-none flex flex-col justify-center items-center">
                          {printerFeed.length > 0 ? (
                            <pre className="font-mono text-[9px] leading-tight text-[#0F172A] font-extrabold whitespace-pre break-all animate-pulse">
                              {printerFeed.map((line, idx) => (
                                <div key={idx}>{line}</div>
                              ))}
                            </pre>
                          ) : (
                            <span className="text-slate-400 font-sans text-xs italic text-center">
                              {isPrinting ? "Trwa nanoszenie fizycznej warstwy..." : "Papier czysty, czeka na rozkaz wysiewu bębna."}
                            </span>
                          )}

                          {isPrinting && activePrinterType === "laser" && (
                            /* Laser glowing sweep beam line visual element */
                            <div 
                              className="absolute inset-x-0 h-1.5 bg-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.8)] border-y border-cyan-300 animate-bounce pointer-events-none"
                              style={{ animationDuration: "3s" }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Log status line printers */}
                      <div className="bg-black text-[9.5px] font-mono text-green-400 p-2.5 rounded border border-slate-900 overflow-y-auto h-20 space-y-0.5 leading-tight select-none">
                        {printedOutput.length > 0 ? (
                          printedOutput.slice().reverse().map((o, idx) => <p key={idx}>&gt; {o}</p>)
                        ) : (
                          <p className="text-slate-500">&gt; Bezczynność zespołu ładującego ...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
