/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ComponentInfo } from "../types";
import { motion } from "motion/react";
import { Info, HelpCircle, HardDrive, Cpu, AlertCircle, Sparkles, Layers, List, Zap, Sliders, Gauge, BookOpen, Search, ChevronDown, ChevronUp, Bookmark } from "lucide-react";

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

export const GLOSSARY_DB: Record<string, { term: string; definition: string }> = {
  tdp: {
    term: "TDP",
    definition: "Thermal Design Power (Limit Mocy Termicznej) – teoretyczna maksymalna ilość wydzielanego ciepła (wyrażana w watach), którą musi odebrać i bezpiecznie rozproszyć układ chłodzenia komponentu podczas maksymalnego, długotrwałego obciążenia komputerowego."
  },
  vrm: {
    term: "VRM",
    definition: "Voltage Regulator Module (Sekcja Zasilania) – wielofazowy moduł regulacji napięcia na płycie głównej komputera lub laminacie karty graficznej. Odpowiada za precyzyjne obniżanie i ujednolicanie wejściowego napięcia stałego z zasilacza (zazwyczaj 12V) do mikroskopijnych, bezpiecznych wartości roboczych rzędu 0.9V - 1.35V wymaganych dla poprawnego działania delikatnego jądra krzemowego procesora."
  },
  dimm: {
    term: "DIMM",
    definition: "Dual In-line Memory Module – międzynarodowy standard fizycznego złącza i dwustronnych modułów pamięci operacyjnej RAM, będący uniwersalnym formatem fizycznym dla kości pamięci RAM w komputerach stacjonarnych (desktopy/stacje robocze)."
  },
  pmic: {
    term: "PMIC",
    definition: "Power Management Integrated Circuit (Zintegrowany Układ Zarządzania Energią) – zaawansowany dedykowany mikrochip sterujący budżetem prądowym. W najnowszym standardzie DDR5 został on przeniesiony z płyty głównej bezpośrednio na moduły laminatu pamięci RAM, co drastycznie obniża tętnienia, podnosi sprawność energetyczną oraz stabilność modułu w stresie."
  },
  nand: {
    term: "NAND Flash",
    definition: "Rodzaj nieulotnej półprzewodnikowej pamięci błyskowej używanej w dyskach SSD, pamięciach USB i smartfonach. Zachowuje wszystkie zapisane dane bez potrzeby ciągłego zasilania prądem dzięki wykorzystaniu tranzystorów z pływającą bramką (które potrafią fizycznie pułapkować ładunek elektryczny)."
  },
  nvme: {
    term: "NVMe",
    definition: "Non-Volatile Memory Express – nowoczesny standard cyfrowego protokołu komunikacyjnego zoptymalizowany specjalnie pod super-szybkie dyski SSD oparte o pamięć NAND Flash. Przesyła pakiety komend i danych bezpośrednio po liniach magistrali systemowej PCI Express, gwarantując minimalne opóźnienia i potężne przepustowości interfejsu."
  },
  pcie: {
    term: "PCIe",
    definition: "PCI Express – uniwersalna, szybka szeregowa magistrala komunikacyjna na płycie głównej komputera. Odpowiada za bezkompromisową, symetryczną, dwukierunkową wymianę informacji między rdzeniem procesora a potężnymi podzespołami dedykowanymi (m.in. kartą graficzną GPU oraz dyskami SSD NVMe)."
  },
  pwm: {
    term: "PWM",
    definition: "Pulse-Width Modulation (Modulacja Szerokości Impulsu) – cyfrowa metoda sterowania zasilaniem prądu stałego. Poprzez niesłychanie gwałtowne włączanie i wyłączanie prądu z wysoką częstotliwością oraz precyzyjną modyfikacją tzw. cyklu pracy (wypełnienia impulsu), reguluje np. obroty wirników wentylatorów systemowych w locie."
  },
  ldo: {
    term: "LDO",
    definition: "Low-Dropout Regulator (Stabilizator Liniowy LDO) – precyzyjny stabilizator napięcia, charakteryzujący się minimalnym wymaganym spadkiem napięcia roboczego roboczego między wejściem a wyjściem. Służy do dokładnego wygładzania zakłóceń i filtrowania tętnień prądowych tuż przed wrażliwymi mikroukładami scalonymi."
  },
  sata: {
    term: "SATA",
    definition: "Serial AT Attachment – klasyczny i dobrze sprawdzony standard szeregowej transmisji sygnałów dla dysków HDD, pamięci SSD cala 2.5 i napędów płyt. Zapewnia maksymalne prędkości transferu ograniczone fizyką taśmy kablowej do około 550 - 600 MB/s."
  },
  apu: {
    term: "APU",
    definition: "Accelerated Processing Unit – nowoczesny procesor hybrydowy łączący na jednej wspólnej płytce krzemu (jednej obudowie procesora) tradyzyjne wielozadaniowe rdzenie CPU oraz zintegrowany, wydajny układ renderowania graficznego GPU."
  },
  soc: {
    term: "SoC",
    definition: "System on a Chip – scalona struktura komputerowa zintegrowana wewnątrz pojedynczego, miniaturowego układu scalonego. Może obejmować rdzenie CPU, procesor GPU, kontroler dysków, mostek pamięci RAM oraz układy łączności bezprzewodowej."
  },
  atx: {
    term: "ATX",
    definition: "Advanced Technology Extended – dominujący standard konstrukcyjny określający m.in. dokładne gabaryty fizyczne płyt głównych (oraz standardów pobocznych jak mATX czy mini-ITX), poprawny rozstaw śrub montażowych, złączy zasilających i okablowania zasilaczy komputerowych."
  },
  rgb: {
    term: "RGB / ARGB",
    definition: "Multi-kolorowe podświetlenie estetyczne elementów komputera. Standardowy pasek RGB świeci całym pasmem na jeden kolor na raz. Standard ARGB (Addressable RGB) różni się tym, że każda dioda LED posiada swój własny mikrochip adresowy, umożliwiając niezależny dobór barwy i płynne efekty fali."
  },
  ntc: {
    term: "NTC",
    definition: "Negative Temperature Coefficient (Termistor NTC) – potocznie czujnik ciepła. Rezestor o ujemnym współczynniku zmian rezystancji, którego spadek oporu elektrycznego maleje wraz ze wzrostem temperatury otoczenia, co pozwala elektronice bardzo szybko obliczyć dokładny próg temperatury."
  },
  lga: {
    term: "LGA",
    definition: "Land Grid Array – typ bezbolesnego montażu procesora na płycie głównej, gdzie piny stykowe (sprężynujące cienkie blaszki) znajdują się bezpiecznie bezpośrednio wewnątrz podstawki (soketu) płyty głównej, a procesor na spodzie ma jedynie płaskie miedziane pola styku."
  },
  pga: {
    term: "PGA",
    definition: "Pin Grid Array – typ podstawki montażowej procesora, w którym złote piny stykowe wystają bezpośrednio ze spodu obudowy procesora i są wsuwane w precyzyjne otwory stykowe gniazda na płycie głównej (np. starsze gniazdo typu AMD AM4)."
  },
  bga: {
    term: "BGA",
    definition: "Ball Grid Array – metoda trwałego montażu powierzchniowego płyt krzemowych na laminacie. Piny są zastąpione kulkami ze stopu lutowniczego ułożonymi w siatce na spodzie komponentu. Układ jest lutowany maszynowo i uniemożliwia proste wyjęcie ze złącza bez wylutowywania."
  },
  xmp: {
    term: "XMP / EXPO",
    definition: "Intel XMP (eXtreme Memory Profile) i AMD EXPO (Extended Profiles for Overclocking) – fabryczne, dokładnie przetestowane ustawienia stabilnego podkręcania częstotliwości i redukcji opóźnień (timingów) pamięci RAM, które są zapisane na małym chipie SPD na kości i dają się łatwo aktywować bezpośrednio w oknie UEFI/BIOS płyty."
  },
  ddr5: {
    term: "DDR5",
    definition: "Double Data Rate 5 – najnowszy standard dynamicznej pamięci operacyjnej RAM charakteryzujący się podwyższoną przepustowością bazową startującą od 4800 MHz, On-Die ECC (wewnętrzną korekcją błędów) oraz wbudowanym bezpośrednio stabilizatorem zasilania PMIC."
  },
  spd: {
    term: "SPD",
    definition: "Serial Presence Detect – miniaturowa nieulotna pamięć EEPROM umieszczona na każdym module pamięci operacyjnej RAM. Zawiera tabele predefiniowanych opóźnień, prądów oraz fabrycznych szybkości taktowania wymaganych przez kontroler do bezpiecznego skomunikowania się z płytą główną."
  },
  mosfet: {
    term: "MOSFET",
    definition: "Metal-Oxide-Semiconductor Field-Effect Transistor – kluczowy element wykonawczy sekcji zasilania VRM. Te tranzystory polowe z izolowaną bramką działają jak niesamowicie szybkie przełączniki elektroniczne, redukując napięcie stałe wejściowe poprzez kontrolowane impulsowe dawkowanie ładunku."
  },
  gpu: {
    term: "GPU",
    definition: "Graphics Processing Unit – wyspecjalizowany koprocesor posiadający strukturę zbudowaną z tysięcy mikroskopijnych, wysoce równoległych rdzeni obliczeniowych. Zoptymalizowany specjalnie pod matematyczne operacje renderowania graficznego i przetwarzania danych matrycowych (m.in. sieci neuronowe)."
  },
  cpu: {
    term: "CPU",
    definition: "Central Processing Unit – serce komputera, główny uniwersalny mikrokontroler wykonujący rozkazy oprogramowania systemowego. Realizuje logikę warunkową, koordynuje przepływ informacji między pamięcią, dyskami i portami wejściowymi oraz odpowiada za ogólną spójność wykonywanych procesów."
  },
  uefi: {
    term: "UEFI / BIOS",
    definition: "Unified Extensible Firmware Interface – zaawansowane oprogramowanie niskopoziomowe wbudowane w płytę główną będące bezpośrednim następcą tradycyjnego systemu BIOS. Odpowiada za test POST podzespołów, inicjalizację mostków i załadowanie jądra systemu operacyjnego z dysku rozruchowego."
  },
  ecc: {
    term: "ECC",
    definition: "Error-Correcting Code – wysokiej klasy system kodowania i detekcji błędów pamięci RAM, zdolny do natychmiastowego wykrywania i sprzętowego korygowania losowych przekłamań bitów (spowodowanych np. polem magnetycznym lub cząstkami alfa promieniowania kosmicznego)."
  },
  emi: {
    term: "EMI",
    definition: "Electromagnetic Interference – szkodliwe zakłócenia elektromagnetyczne wywoływane przez szybkie zmiany prądów lub obce nadajniki radiowe, wprowadzające niepożądane szumy elektryczne do miedzianych pętli sygnałowych."
  },
  vram: {
    term: "VRAM",
    definition: "Video Random Access Memory – ultraszybka dedykowana pamięć graficzna używana bezpośrednio przez procesor GPU do buforowania klatek obrazu, struktur geometrycznych modeli, map tekstur oraz innych danych graficznych wymagających masowych transferów."
  },
  sbc: {
    term: "SBC",
    definition: "Single Board Computer (Komputer Jednopłytkowy) – zminiaturyzowany komputer umieszczony na pojedynczej płytce drukowanej (np. Raspberry Pi), gdzie procesor SoC, pamięć RAM oraz wszystkie wejścia-wyjścia są zintegrowane bezpośrednio bez wymiennych gniazd."
  },
  gpio: {
    term: "GPIO",
    definition: "General-Purpose Input/Output – wielozadaniowe piny sygnałowe wejścia-wyjścia w mikrokontrolerach i komputerach SBC, dające się dowolnie programować i konfigurować z poziomu oprogramowania do sterowania diodami, silnikami lub odczytu zewnętrznych sensorów."
  },
  dlc: {
    term: "DLC",
    definition: "Direct Liquid Cooling (Bezpośrednie Chłodzenie Cieczą) – technologia chłodzenia superkomputerów wysokiej klasy, polegająca na bezpośrednim przepływie cieczy nieprzewodzącej prądu przez metalowe bloki przylegające do procesorów, co eliminuje konieczność hałaśliwego chłodzenia powietrznego."
  }
};

export const getRelevantGlossary = (component: ComponentInfo): typeof GLOSSARY_DB[string][] => {
  const textToScan = [
    component.name,
    component.role,
    component.connections,
    component.tip,
    ...(component.specs || []),
    component.socketType || "",
    component.socketDetails || "",
  ].join(" ").toLowerCase();

  const matched: typeof GLOSSARY_DB[string][] = [];
  
  Object.entries(GLOSSARY_DB).forEach(([key, value]) => {
    const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedKey}\\b`, "i");
    if (regex.test(textToScan)) {
      matched.push(value);
    }
  });

  return matched.sort((a, b) => a.term.localeCompare(b.term));
};

export default function DetailPanel({ component, scientificMode = false, theme = "dark" }: DetailPanelProps) {
  const isLight = theme === "light";
  
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);
  const [glossaryTab, setGlossaryTab] = useState<"contextual" | "all">("contextual");
  const [glossarySearch, setGlossarySearch] = useState("");
  const relevantTerms = component ? getRelevantGlossary(component) : [];

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

            {/* High-Tech Vertical Process Flow Timeline */}
            <div className="relative space-y-6 pl-1 pr-1">
              {/* Vertical timeline connector line */}
              <div className={`absolute left-[15px] top-[16px] bottom-[16px] w-[2px] rounded-full overflow-hidden ${
                isLight ? "bg-purple-150" : "bg-purple-950/45"
              }`}>
                {/* Glowing flow animation traveling down */}
                <motion.div
                  className="absolute left-0 right-0 h-16 w-full rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                  animate={{ y: ["-64px", "450px"] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                />
              </div>

              {/* Step 1: Source */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10.5px] font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
                    isLight 
                      ? "bg-cyan-50 border-cyan-400 text-cyan-700 shadow-sm" 
                      : "bg-slate-950 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  }`}>
                    01
                  </div>
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-full animate-ping pointer-events-none opacity-40" />
                </div>

                <div className={`flex-1 min-w-0 border p-3.5 rounded-xl flex flex-col justify-center transition-all duration-300 ${
                  isLight 
                    ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300" 
                    : "bg-[#09090b]/80 border-slate-800/80 hover:border-cyan-500/20 hover:bg-[#0d0d11]/90"
                }`}>
                  <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                    <span className={`text-[8.5px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-cyan-800" : "text-cyan-400"
                    }`}>
                      <Zap className="w-3 h-3" />
                      1. ZASILANIE (WEJŚCIE)
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-cyan-100 text-cyan-800 animate-pulse" : "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20"
                    }`}>
                      POWER IN
                    </span>
                  </div>
                  <h5 className={`font-extrabold text-xs sm:text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.source}
                  </h5>
                  <p className={`text-[10px] sm:text-[11px] leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.sourceLabel}
                  </p>
                </div>
              </div>

              {/* Step 2: Regulator */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10.5px] font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
                    isLight 
                      ? "bg-purple-50 border-purple-400 text-purple-700 shadow-sm" 
                      : "bg-slate-950 border-purple-500/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                  }`}>
                    02
                  </div>
                  <div className="absolute inset-0 bg-purple-400/10 rounded-full animate-ping pointer-events-none opacity-30" />
                </div>

                <div className={`flex-1 min-w-0 border p-3.5 rounded-xl flex flex-col justify-center transition-all duration-300 ${
                  isLight 
                    ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300" 
                    : "bg-[#09090b]/80 border-slate-800/80 hover:border-purple-500/20 hover:bg-[#0d0d11]/90"
                }`}>
                  <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                    <span className={`text-[8.5px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-purple-800" : "text-purple-400"
                    }`}>
                      <Sliders className="w-3 h-3" />
                      2. REGULACJA (PMIC / VRM)
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-purple-100 text-purple-800" : "bg-purple-950/40 text-purple-400 border border-purple-500/20"
                    }`}>
                      REGULATION
                    </span>
                  </div>
                  <h5 className={`font-extrabold text-xs sm:text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.regulator}
                  </h5>
                  <p className={`text-[10px] sm:text-[11px] leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.regulatorLabel}
                  </p>
                </div>
              </div>

              {/* Step 3: Consumer */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10.5px] font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 bg-slate-950" style={{
                    borderColor: component.colorHex,
                    color: component.colorHex,
                    boxShadow: isLight ? "none" : `0 0 10px ${component.colorHex}25`
                  }}>
                    03
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-20" style={{ backgroundColor: `${component.colorHex}20` }} />
                </div>

                <div className={`flex-1 min-w-0 border p-3.5 rounded-xl flex flex-col justify-center transition-all duration-300 ${
                  isLight 
                    ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md" 
                    : "bg-[#09090b]/80 hover:bg-[#0d0d11]/90"
                }`} style={{ borderColor: isLight ? `${component.colorHex}40` : `${component.colorHex}20` }}>
                  <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                    <span className="text-[8.5px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1" style={{ color: component.colorHex }}>
                      <Cpu className="w-3 h-3" />
                      3. ODBIORNIK (PODZESPÓŁ)
                    </span>
                    <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded" style={{
                      backgroundColor: isLight ? `${component.colorHex}15` : `${component.colorHex}20`,
                      color: component.colorHex,
                      border: `1px solid ${component.colorHex}30`
                    }}>
                      CONSUMPTION
                    </span>
                  </div>
                  <h5 className="font-extrabold text-xs sm:text-sm tracking-tight mb-1 leading-snug" style={{ color: isLight ? "#1e293b" : "#ffffff" }}>
                    {flow.consumer}
                  </h5>
                  <p className={`text-[10px] sm:text-[11px] leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.consumerLabel}
                  </p>
                </div>
              </div>

              {/* Step 4: Output */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10.5px] font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
                    isLight 
                      ? "bg-amber-50 border-amber-400 text-amber-700 shadow-sm" 
                      : "bg-slate-950 border-amber-500/50 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                  }`}>
                    04
                  </div>
                  <div className="absolute inset-0 bg-amber-400/10 rounded-full animate-ping pointer-events-none opacity-30" />
                </div>

                <div className={`flex-1 min-w-0 border p-3.5 rounded-xl flex flex-col justify-center transition-all duration-300 ${
                  isLight 
                    ? "bg-white border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300" 
                    : "bg-[#09090b]/80 border-slate-800/80 hover:border-amber-500/20 hover:bg-[#0d0d11]/90"
                }`}>
                  <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                    <span className={`text-[8.5px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-amber-800" : "text-amber-400"
                    }`}>
                      <Gauge className="w-3 h-3" />
                      4. EFEKT PRACY (WYJŚCIE)
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-amber-100 text-amber-800" : "bg-amber-950/40 text-amber-400 border border-amber-500/20"
                    }`}>
                      OUTPUT EFFECT
                    </span>
                  </div>
                  <h5 className={`font-extrabold text-xs sm:text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.output}
                  </h5>
                  <p className={`text-[10px] sm:text-[11px] leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.outputLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Spec metadata bar */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t text-[9.5px] ${
              isLight ? "border-purple-200" : "border-purple-500/10"
            }`}>
              <div className={`px-3.5 py-2 rounded-lg border flex flex-col items-start gap-1 ${
                isLight 
                  ? "bg-white border-purple-200 shadow-sm" 
                  : "bg-purple-950/45 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase text-[8.5px] tracking-wider font-extrabold ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>KLASA ENERGETYCZNA:</span>
                <span className={`font-bold font-mono text-xs sm:text-sm text-left ${
                  isLight ? "text-slate-800" : "text-slate-100"
                }`}>{flow.powerCost}</span>
              </div>
              <div className={`px-3.5 py-2 rounded-lg border flex flex-col items-start gap-1 ${
                isLight 
                  ? "bg-white border-purple-200 shadow-sm" 
                  : "bg-purple-950/45 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase text-[8.5px] tracking-wider font-extrabold ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>TRANSFORMACJA:</span>
                <span className={`font-semibold font-sans text-xs sm:text-sm text-left whitespace-normal break-words leading-relaxed ${
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

        {/* INTERACTIVE COMPONENT GLOSSARY */}
        <div className={`mt-4 border rounded-xl overflow-hidden transition-all duration-300 ${isLight ? "bg-slate-50 border-slate-200" : "bg-[#09090b] border-slate-800/80"}`} id="interactive-glossary-module">
          {/* Header click bar */}
          <button
            type="button"
            onClick={() => setGlossaryExpanded(!glossaryExpanded)}
            className={`w-full flex items-center justify-between p-3.5 text-left font-sans transition-colors cursor-pointer ${
              isLight 
                ? "bg-slate-100 hover:bg-slate-200 text-slate-800" 
                : "bg-[#0F0F12] hover:bg-slate-900/60 text-slate-200"
            }`}
            id="glossary-header-toggle"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <BookOpen className={`w-4 h-4 shrink-0 ${isLight ? "text-cyan-600" : "text-cyan-400 animate-pulse"}`} />
              <div className="min-w-0">
                <span className="text-xs font-bold leading-none block">Słownik Pojęć i Skrótów</span>
                {relevantTerms.length > 0 ? (
                  <span className="text-[10px] text-cyan-400 font-mono font-medium mt-1 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                    Wykryto {relevantTerms.length} {relevantTerms.length === 1 ? "pojęcie" : relevantTerms.length < 5 ? "pojęcia" : "pojęć"} dla tego podzespołu
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">Zajrzyj do bazy technicznej</span>
                )}
              </div>
            </div>
            <div className={`p-1.5 rounded-lg border transition-transform duration-300 ${isLight ? "bg-white border-slate-200" : "bg-slate-950 border-slate-800"}`}>
              {glossaryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {/* Expanded Content with slide animation */}
          {glossaryExpanded && (
            <div className={`p-4 border-t space-y-4 ${isLight ? "border-slate-200" : "border-slate-800/80"}`}>
              {/* Tabs Switcher */}
              <div className="flex p-1 rounded-xl bg-slate-950/45 border border-slate-900 gap-1 text-[10px] font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setGlossaryTab("contextual")}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    glossaryTab === "contextual"
                      ? isLight 
                        ? "bg-slate-200 text-slate-800 shadow" 
                        : "bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  id="glossary-tab-context"
                >
                  <Bookmark className="w-3 h-3 shrink-0" />
                  <span>Dopasowane ({relevantTerms.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGlossaryTab("all")}
                  className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                    glossaryTab === "all"
                      ? isLight 
                        ? "bg-slate-200 text-slate-800 shadow" 
                        : "bg-cyan-950/40 text-cyan-400 border border-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  id="glossary-tab-all"
                >
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span>Wszystkie ({Object.keys(GLOSSARY_DB).length})</span>
                </button>
              </div>

              {/* All glossary search input */}
              {glossaryTab === "all" && (
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Wpisz szukany skrót lub pojęcie... (np. TDP, LDO)"
                    className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs outline-none border focus:ring-1 transition-all ${
                      isLight 
                        ? "bg-white border-slate-200 focus:border-cyan-500 focus:ring-cyan-500 text-slate-800" 
                        : "bg-slate-950/80 border-slate-800/85 focus:border-cyan-500/30 focus:ring-cyan-500/30 text-white placeholder-slate-500"
                    }`}
                    id="glossary-search-input"
                  />
                  {glossarySearch && (
                    <button
                      type="button"
                      onClick={() => setGlossarySearch("")}
                      className="absolute right-3 text-slate-400 hover:text-slate-250 text-xs font-mono font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              {/* Items Render Area */}
              <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-track-transparent">
                {glossaryTab === "contextual" ? (
                  relevantTerms.length > 0 ? (
                    relevantTerms.map((term, i) => (
                      <div
                        key={term.term + i}
                        className={`p-3 rounded-lg border text-xs leading-relaxed space-y-1 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all ${
                          isLight 
                            ? "bg-white border-slate-200 text-slate-800" 
                            : "bg-[#0c0c0e]/85 border-slate-850 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded font-mono border ${
                            isLight
                              ? "bg-cyan-50 border-cyan-200 text-cyan-800"
                              : "bg-cyan-950/30 border-cyan-500/20 text-cyan-400"
                          }`}>
                            {term.term}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                          {term.definition}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-slate-400">
                      <HelpCircle className="w-5 h-5 mx-auto mb-1.5 text-slate-500 opacity-60" />
                      <p className="text-[10px]">Brak precyzyjnych dopasowań skrótów dla tej części.</p>
                      <button
                        type="button"
                        onClick={() => setGlossaryTab("all")}
                        className="text-[10px] text-cyan-400 font-bold hover:underline mt-1.5 cursor-pointer"
                      >
                        Przeglądaj pełny słownik →
                      </button>
                    </div>
                  )
                ) : (
                  (() => {
                    const filtered = Object.values(GLOSSARY_DB).filter(
                      entry => 
                        entry.term.toLowerCase().includes(glossarySearch.toLowerCase()) || 
                        entry.definition.toLowerCase().includes(glossarySearch.toLowerCase())
                    );
                    return filtered.length > 0 ? (
                      filtered.map((term, i) => (
                        <div
                          key={term.term + i}
                          className={`p-3 rounded-lg border text-xs leading-relaxed space-y-1 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all ${
                            isLight 
                              ? "bg-white border-slate-200 text-slate-800" 
                              : "bg-[#0c0c0e]/85 border-slate-850 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded font-mono border ${
                              isLight
                                ? "bg-cyan-50 border-cyan-200 text-cyan-800"
                                : "bg-cyan-950/30 border-cyan-500/20 text-cyan-400"
                            }`}>
                              {term.term}
                            </span>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                            {term.definition}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-slate-400 font-sans">
                        <p className="text-[10px]">Nie znaleziono definicji pasujących do frazy "{glossarySearch}".</p>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          )}
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
