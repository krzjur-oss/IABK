/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Shield, Zap, Cable, CheckCircle2 } from "lucide-react";

export type PinCategory = "power" | "gnd" | "highspeed" | "lowspeed" | "control" | "aux";

export interface PinInfo {
  id: string; // designator, e.g., "A1", "Pin 1"
  name: string; // pin name, e.g., "GND", "TMDS Data2+"
  category: PinCategory;
  desc: string; // Polish description
}

interface ConnectorPinout {
  name: string;
  pins: PinInfo[];
  plugShape: "usbc" | "hdmi" | "vga" | "displayport";
  techTip: string;
}

const PINOUT_DATA: Record<string, ConnectorPinout> = {
  usbc: {
    name: "USB-C (USB Type-C)",
    techTip: "Interfejs USB-C jest symetryczny. Zawiera zdublowane piny w rzędzie A i B, co pozwala na obracanie wtyczki bez utraty funkcjonalności. Dodatkowo potrafi obsłużyć przesyłanie sygnałów wideo DisplayPort (Alt Mode) oraz ładowanie z mocą do 240W przy pomocy protokołu USB Power Delivery.",
    plugShape: "usbc",
    pins: [
      // ROW A
      { id: "A1", name: "GND", category: "gnd", desc: "Masa odniesienia dla zasilania i szybkich sygnałów." },
      { id: "A2", name: "TX1+", category: "highspeed", desc: "Nadajnik SuperSpeed (Tx1, linia dodatnia). Służy do szybkiego przesyłu danych lub wideo." },
      { id: "A3", name: "TX1-", category: "highspeed", desc: "Nadajnik SuperSpeed (Tx1, linia ujemna). Służy do szybkiego przesyłu danych lub wideo." },
      { id: "A4", name: "VBUS", category: "power", desc: "Główne napięcie zasilania magistrali USB (od 5V do 48V w standardzie Power Delivery do 240W)." },
      { id: "A5", name: "CC1", category: "control", desc: "Kanał konfiguracyjny 1. Wykrywa obecność urządzenia, orientację wtyku i negocjuje moc ładowania." },
      { id: "A6", name: "D+", category: "lowspeed", desc: "Dodatnia linia klasycznego interfejsu USB 2.0 (do 480 Mb/s)." },
      { id: "A7", name: "D-", category: "lowspeed", desc: "Ujemna linia klasycznego interfejsu USB 2.0 (do 480 Mb/s)." },
      { id: "A8", name: "SBU1", category: "aux", desc: "Linia pomocnicza 1 (Sideband Use). Wykorzystywana np. do sygnałów audio lub kanału AUX w trybie DisplayPort." },
      { id: "A9", name: "VBUS", category: "power", desc: "Zasilanie magistrali USB (zmostkowane z pinem A4)." },
      { id: "A10", name: "RX2-", category: "highspeed", desc: "Odbiornik SuperSpeed (Rx2, linia ujemna). Szybka transmisja powrotna danych/wideo." },
      { id: "A11", name: "RX2+", category: "highspeed", desc: "Odbiornik SuperSpeed (Rx2, linia dodatnia). Szybka transmisja powrotna danych/wideo." },
      { id: "A12", name: "GND", category: "gnd", desc: "Masa odniesienia (zmostkowana z pinem A1)." },
      // ROW B
      { id: "B12", name: "GND", category: "gnd", desc: "Masa odniesienia dla zasilania i szybkich sygnałów." },
      { id: "B11", name: "RX1+", category: "highspeed", desc: "Odbiornik SuperSpeed (Rx1, linia dodatnia). Służy do szybkiego odbioru danych." },
      { id: "B10", name: "RX1-", category: "highspeed", desc: "Odbiornik SuperSpeed (Rx1, linia ujemna). Służy do szybkiego odbioru danych." },
      { id: "B9", name: "VBUS", category: "power", desc: "Główne napięcie zasilania magistrali USB." },
      { id: "B8", name: "SBU2", category: "aux", desc: "Linia pomocnicza 2 (Sideband Use). Wykorzystywana m.in. w Alternate Mode." },
      { id: "B7", name: "D-", category: "lowspeed", desc: "Ujemna linia klasycznego USB 2.0 (zwykle połączona z A7)." },
      { id: "B6", name: "D+", category: "lowspeed", desc: "Dodatnia linia klasycznego USB 2.0 (zwykle połączona z A6)." },
      { id: "B5", name: "CC2", category: "control", desc: "Kanał konfiguracyjny 2. Używany do wykrywania odwrócenia wtyku i negocjacji PD." },
      { id: "B4", name: "VBUS", category: "power", desc: "Główne napięcie zasilania magistrali USB." },
      { id: "B3", name: "TX2-", category: "highspeed", desc: "Nadajnik SuperSpeed (Tx2, linia ujemna). Szybka transmisja danych/wideo." },
      { id: "B2", name: "TX2+", category: "highspeed", desc: "Nadajnik SuperSpeed (Tx2, linia dodatnia). Szybka transmisja danych/wideo." },
      { id: "B1", name: "GND", category: "gnd", desc: "Masa odniesienia (zmostkowana z pinem B12)." }
    ]
  },
  hdmi: {
    name: "HDMI (Type A)",
    techTip: "Interfejs HDMI przesyła sygnał wideo i audio bez kompresji przy użyciu różnicowej transmisji minimalizującej zakłócenia (TMDS). Zawiera dedykowany kanał DDC (piny SCL/SDA) pozwalający karcie graficznej na automatyczny odczyt parametrów monitora (profil EDID).",
    plugShape: "hdmi",
    pins: [
      { id: "Pin 1", name: "TMDS Data2+", category: "highspeed", desc: "Kanal danych TMDS 2 (pozytywny). Odpowiada za przesył składowej koloru czerwonego." },
      { id: "Pin 2", name: "TMDS Data2 Shield", category: "gnd", desc: "Ekranowanie kanału TMDS 2. Chroni sygnał przed zakłóceniami zewnętrznymi." },
      { id: "Pin 3", name: "TMDS Data2-", category: "highspeed", desc: "Kanał danych TMDS 2 (negatywny). Różnicowa składowa koloru czerwonego." },
      { id: "Pin 4", name: "TMDS Data1+", category: "highspeed", desc: "Kanał danych TMDS 1 (pozytywny). Przesyła składową koloru zielonego." },
      { id: "Pin 5", name: "TMDS Data1 Shield", category: "gnd", desc: "Ekranowanie kanału TMDS 1 (ochrona linii koloru zielonego)." },
      { id: "Pin 6", name: "TMDS Data1-", category: "highspeed", desc: "Kanał danych TMDS 1 (negatywny). Różnicowa składowa koloru zielonego." },
      { id: "Pin 7", name: "TMDS Data0+", category: "highspeed", desc: "Kanał danych TMDS 0 (pozytywny). Przesyła składową koloru niebieskiego." },
      { id: "Pin 8", name: "TMDS Data0 Shield", category: "gnd", desc: "Ekranowanie kanału TMDS 0 (ochrona linii koloru niebieskiego)." },
      { id: "Pin 9", name: "TMDS Data0-", category: "highspeed", desc: "Kanał danych TMDS 0 (negatywny). Różnicowa składowa koloru niebieskiego." },
      { id: "Pin 10", name: "TMDS Clock+", category: "highspeed", desc: "Kanał zegara TMDS (pozytywny). Zapewnia synchronizację odbieranego sygnału wideo." },
      { id: "Pin 11", name: "TMDS Clock Shield", category: "gnd", desc: "Ekranowanie zegara TMDS (redukuje zakłócenia częstotliwości taktującej)." },
      { id: "Pin 12", name: "TMDS Clock-", category: "highspeed", desc: "Kanał zegara TMDS (negatywny). Zapewnia synchronizację taktowania wideo." },
      { id: "Pin 13", name: "CEC", category: "control", desc: "Consumer Electronics Control. Magistrala jednoprzewodowa umożliwiająca sterowanie wieloma podłączonymi urządzeniami za pomocą jednego pilota." },
      { id: "Pin 14", name: "HEAC+ / Utility", category: "aux", desc: "Zarezerwowany / Linia dodatnia kanału Ethernet oraz zwrotnego audio ARC/eARC." },
      { id: "Pin 15", name: "SCL", category: "control", desc: "Zegar szeregowy magistrali DDC (Display Data Channel). Używa protokołu I2C." },
      { id: "Pin 16", name: "SDA", category: "control", desc: "Dane szeregowe magistrali DDC (Display Data Channel). Umożliwia pobranie profilu rozdzielczości EDID z monitora." },
      { id: "Pin 17", name: "DDC/CEC GND", category: "gnd", desc: "Masa odniesienia dla magistrali sterujących DDC, CEC oraz HEAC." },
      { id: "Pin 18", name: "+5V Power", category: "power", desc: "Zasilanie pomocnicze +5V. Służy do zasilania układu EDID w monitorze, gdy jest on wyłączony ze standby." },
      { id: "Pin 19", name: "Hot Plug Detect / HEAC-", category: "aux", desc: "Wykrywanie podłączenia (Hot Plug Detect) informujące system o podpięciu kabla, oraz linia ujemna kanału Ethernet/eARC." }
    ]
  },
  displayport: {
    name: "DisplayPort (DP)",
    techTip: "DisplayPort przesyła dane wideo w postaci pakietowej (podobnie do sieci Ethernet), co odróżnia go od strumieniowego HDMI. Wspiera MST (Daisy Chaining - łączenie szeregowe monitorów) oraz posiada bardzo szybki pomocniczy kanał komunikacji AUX (piny 15/17) o dużej odporności na zakłócenia.",
    plugShape: "displayport",
    pins: [
      { id: "Pin 1", name: "ML_Lane 0+", category: "highspeed", desc: "Główny kanał danych, linia 0 (pozytywny). Przesyła pakiety wideo/audio." },
      { id: "Pin 2", name: "GND", category: "gnd", desc: "Masa odniesienia dla linii danych 0." },
      { id: "Pin 3", name: "ML_Lane 0-", category: "highspeed", desc: "Główny kanał danych, linia 0 (negatywny). Różnicowa transmisja wideo." },
      { id: "Pin 4", name: "ML_Lane 1+", category: "highspeed", desc: "Główny kanał danych, linia 1 (pozytywny). Druga linia przesyłowa wideo." },
      { id: "Pin 5", name: "GND", category: "gnd", desc: "Masa odniesienia dla linii danych 1." },
      { id: "Pin 6", name: "ML_Lane 1-", category: "highspeed", desc: "Główny kanał danych, linia 1 (negatywny). Druga linia przesyłowa wideo." },
      { id: "Pin 7", name: "ML_Lane 2+", category: "highspeed", desc: "Główny kanał danych, linia 2 (pozytywny). Trzecia linia przesyłowa wideo." },
      { id: "Pin 8", name: "GND", category: "gnd", desc: "Masa odniesienia dla linii danych 2." },
      { id: "Pin 9", name: "ML_Lane 2-", category: "highspeed", desc: "Główny kanał danych, linia 2 (negatywny). Trzecia linia przesyłowa wideo." },
      { id: "Pin 10", name: "ML_Lane 3+", category: "highspeed", desc: "Główny kanał danych, linia 3 (pozytywny). Czwarta linia przesyłowa wideo." },
      { id: "Pin 11", name: "GND", category: "gnd", desc: "Masa odniesienia dla linii danych 3." },
      { id: "Pin 12", name: "ML_Lane 3-", category: "highspeed", desc: "Główny kanał danych, linia 3 (negatywny). Czwarta linia przesyłowa wideo." },
      { id: "Pin 13", name: "Config 1", category: "control", desc: "Pin konfiguracyjny 1. Bezpośrednio zwarty z masą GND na płycie." },
      { id: "Pin 14", name: "Config 2", category: "control", desc: "Pin konfiguracyjny 2. Bezpośrednio zwarty z masą GND na płycie." },
      { id: "Pin 15", name: "AUX CH+", category: "aux", desc: "Kanał pomocniczy (pozytywny). Służy do dwukierunkowej, szybkiej transmisji komend sterujących oraz odczytu EDID." },
      { id: "Pin 16", name: "GND", category: "gnd", desc: "Masa odniesienia dla kanału pomocniczego i sygnałów Hot Plug." },
      { id: "Pin 17", name: "AUX CH-", category: "aux", desc: "Kanał pomocniczy (negatywny). Różnicowa linia sterująca." },
      { id: "Pin 18", name: "Hot Plug Detect", category: "control", desc: "Wykrywanie podłączenia na gorąco. Informuje komputer o fizycznym podłączeniu monitora." },
      { id: "Pin 19", name: "DP_PWR Return", category: "gnd", desc: "Masa powrotna dla zasilania portu DP_PWR." },
      { id: "Pin 20", name: "DP_PWR", category: "power", desc: "Zasilanie portu +3.3V (do 500mA). Służy do zasilania aktywnych adapterów i konwerterów sygnału." }
    ]
  },
  vga: {
    name: "VGA (D-Sub 15)",
    techTip: "Interfejs VGA jest w pełni analogowy. Przesyła trzy podstawowe składowe barwne (Czerwony, Zielony, Niebieski) za pomocą napięć analogowych (0 - 0.7V). Każdy szum elektryczny lub niska jakość ekranowania kabla przekłada się na widoczne smugi, zakłócenia i spadek ostrości obrazu.",
    plugShape: "vga",
    pins: [
      { id: "Pin 1", name: "RED", category: "highspeed", desc: "Analogowy sygnał składowej koloru czerwonego (napięcie od 0V do 0.7V)." },
      { id: "Pin 2", name: "GREEN", category: "highspeed", desc: "Analogowy sygnał składowej koloru zielonego. Odpowiada za jasność w trybach monochromatycznych." },
      { id: "Pin 3", name: "BLUE", category: "highspeed", desc: "Analogowy sygnał składowej koloru niebieskiego." },
      { id: "Pin 4", name: "ID2 / RES", category: "control", desc: "Zarezerwowany / Dawniej bit identyfikacyjny monitora 2." },
      { id: "Pin 5", name: "GND", category: "gnd", desc: "Masa ogólna i cyfrowa masa powrotna." },
      { id: "Pin 6", name: "RED_GND", category: "gnd", desc: "Masa powrotna dla analogowej linii koloru czerwonego (ekranowanie kabla)." },
      { id: "Pin 7", name: "GREEN_GND", category: "gnd", desc: "Masa powrotna dla analogowej linii koloru zielonego (ekranowanie kabla)." },
      { id: "Pin 8", name: "BLUE_GND", category: "gnd", desc: "Masa powrotna dla analogowej linii koloru niebieskiego (ekranowanie kabla)." },
      { id: "Pin 9", name: "KEY / PWR", category: "power", desc: "Zasilanie pomocnicze +5V DC. Dostarczane z karty graficznej do zasilania układu EDID w monitorze." },
      { id: "Pin 10", name: "SGND", category: "gnd", desc: "Masa odniesienia dla sygnałów synchronizacji pionowej i poziomej." },
      { id: "Pin 11", name: "ID0 / RES", category: "control", desc: "Zarezerwowany / Dawniej bit identyfikacyjny monitora 0." },
      { id: "Pin 12", name: "SDA", category: "control", desc: "Dane szeregowe magistrali DDC (Display Data Channel). Do przesyłu profilu EDID przez I2C." },
      { id: "Pin 13", name: "HSYNC", category: "control", desc: "Synchronizacja pozioma. Przesyła impulsy informujące monitor o początku rysowania nowej linii pikseli." },
      { id: "Pin 14", name: "VSYNC", category: "control", desc: "Synchronizacja pionowa. Przesyła impulsy informujące o początku rysowania nowej klatki obrazu." },
      { id: "Pin 15", name: "SCL", category: "control", desc: "Zegar szeregowy magistrali DDC (Display Data Channel I2C)." }
    ]
  }
};

const CATEGORIES: Record<PinCategory, { label: string; color: string; bg: string; border: string }> = {
  power: { label: "Zasilanie", color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-500/30" },
  gnd: { label: "Masa (GND)", color: "text-slate-400", bg: "bg-slate-900/40", border: "border-slate-800" },
  highspeed: { label: "Szybkie Dane (Tx/Rx/Wideo)", color: "text-cyan-400", bg: "bg-cyan-950/30", border: "border-cyan-500/30" },
  lowspeed: { label: "Wolne Dane / USB 2.0", color: "text-purple-400", bg: "bg-purple-950/30", border: "border-purple-500/30" },
  control: { label: "Sterowanie (CC/CEC/I2C)", color: "text-emerald-400", bg: "bg-emerald-950/30", border: "border-emerald-500/30" },
  aux: { label: "Pomocnicze (SBU/eARC)", color: "text-indigo-400", bg: "bg-indigo-950/30", border: "border-indigo-500/30" }
};

interface PinoutViewerProps {
  connectorId: string;
}

export default function PinoutViewer({ connectorId }: PinoutViewerProps) {
  const data = PINOUT_DATA[connectorId];
  const [hoveredPin, setHoveredPin] = useState<PinInfo | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<PinCategory | "all">("all");

  if (!data) {
    return (
      <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 text-center text-slate-500 font-sans text-xs">
        <Info className="w-5 h-5 mx-auto mb-2 text-slate-600" />
        Dla wybranego złącza nie ma jeszcze dostępnego interaktywnego schematu wyprowadzeń.
        Wybierz <span className="text-cyan-400 font-bold">USB-C</span>, <span className="text-cyan-400 font-bold">HDMI</span>, <span className="text-cyan-400 font-bold">DisplayPort</span> lub <span className="text-cyan-400 font-bold">VGA</span> z panelu po lewej stronie.
      </div>
    );
  }

  const handleMouseEnterPin = (pin: PinInfo) => {
    setHoveredPin(pin);
  };

  const handleMouseLeavePin = () => {
    setHoveredPin(null);
  };

  const pinsFiltered = data.pins.filter(
    (p) => activeCategoryFilter === "all" || p.category === activeCategoryFilter
  );

  const renderVisualPlug = () => {
    switch (data.plugShape) {
      case "usbc":
        return (
          <div className="w-full flex justify-center py-6 select-none relative" id="usbc-pinout-diagram">
            <svg viewBox="0 0 540 140" className="w-full max-w-[540px] drop-shadow-2xl">
              {/* Outer metal plug frame */}
              <rect x="10" y="20" width="520" height="100" rx="46" fill="#0c111a" stroke="#475569" strokeWidth="4" />
              {/* Inner black insulation tongue */}
              <rect x="25" y="32" width="490" height="76" rx="34" fill="#030712" stroke="#1e293b" strokeWidth="2" />
              {/* Central horizontal dividing plastic bar */}
              <rect x="35" y="66" width="470" height="8" rx="2" fill="#1e293b" opacity="0.3" />

              {/* Pins A1-A12 (Top Row, left-to-right) */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const pinId = `A${idx + 1}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 55 + idx * 39;
                const y = 45;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;
                const catColor = CATEGORIES[pin.category];

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    {/* Interactive glowing ring */}
                    <rect 
                      x={x - 12} y={y - 10} width="24" height="20" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                      className="transition-all duration-150"
                    />
                    {/* Metal Contact Pin */}
                    <rect 
                      x={x - 6} y={y - 5} width="12" height="10" rx="2"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                      className="transition-all duration-150"
                    />
                    {/* Small text indicating pin name */}
                    <text 
                      x={x} y={y - 12} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pin.id}
                    </text>
                  </g>
                );
              })}

              {/* Pins B12-B1 (Bottom Row, left-to-right B12 to B1) */}
              {Array.from({ length: 12 }).map((_, idx) => {
                // Pin order B12, B11, B10, ..., B1
                const pinNum = 12 - idx;
                const pinId = `B${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 55 + idx * 39;
                const y = 95;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;
                const catColor = CATEGORIES[pin.category];

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    {/* Interactive glowing ring */}
                    <rect 
                      x={x - 12} y={y - 10} width="24" height="20" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                      className="transition-all duration-150"
                    />
                    {/* Metal Contact Pin */}
                    <rect 
                      x={x - 6} y={y - 5} width="12" height="10" rx="2"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                      className="transition-all duration-150"
                    />
                    {/* Small text indicating pin name */}
                    <text 
                      x={x} y={y + 20} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pin.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      case "hdmi":
        return (
          <div className="w-full flex justify-center py-6 select-none relative" id="hdmi-pinout-diagram">
            <svg viewBox="0 0 540 140" className="w-full max-w-[540px] drop-shadow-2xl">
              {/* Outer metal plug frame - trapezoid/angled at bottom */}
              <path 
                d="M 15 20 L 525 20 L 525 80 L 485 120 L 55 120 L 15 80 Z" 
                fill="#0c111a" stroke="#475569" strokeWidth="4" strokeLinejoin="round" 
              />
              <path 
                d="M 27 30 L 513 30 L 513 78 L 477 110 L 63 110 L 27 78 Z" 
                fill="#030712" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" 
              />

              {/* Pins 1,3,5,7,9,11,13,15,17,19 (Top Row, 10 pins) */}
              {Array.from({ length: 10 }).map((_, idx) => {
                const pinNum = idx * 2 + 1;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 50 + idx * 48;
                const y = 50;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <rect 
                      x={x - 14} y={y - 12} width="28" height="22" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <rect 
                      x={x - 7} y={y - 6} width="14" height="12" rx="1.5"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y - 15} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}

              {/* Pins 2,4,6,8,10,12,14,16,18 (Bottom Row, staggered, 9 pins) */}
              {Array.from({ length: 9 }).map((_, idx) => {
                const pinNum = idx * 2 + 2;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 74 + idx * 48; // Offset staggered
                const y = 88;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <rect 
                      x={x - 14} y={y - 12} width="28" height="22" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <rect 
                      x={x - 7} y={y - 6} width="14" height="12" rx="1.5"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y + 24} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      case "displayport":
        return (
          <div className="w-full flex justify-center py-6 select-none relative" id="dp-pinout-diagram">
            <svg viewBox="0 0 540 140" className="w-full max-w-[540px] drop-shadow-2xl">
              {/* Outer metal DP shape - angled bottom-right corner */}
              <path 
                d="M 15 15 L 525 15 L 525 90 L 490 125 L 15 125 Z" 
                fill="#0c111a" stroke="#475569" strokeWidth="4" strokeLinejoin="round" 
              />
              <path 
                d="M 27 25 L 513 25 L 513 85 L 482 115 L 27 115 Z" 
                fill="#030712" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" 
              />

              {/* Even pins (Top row: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20) */}
              {Array.from({ length: 10 }).map((_, idx) => {
                const pinNum = (idx + 1) * 2;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 50 + idx * 45;
                const y = 48;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <rect 
                      x={x - 12} y={y - 12} width="24" height="24" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <rect 
                      x={x - 5} y={y - 7} width="10" height="14" rx="1"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y - 15} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}

              {/* Odd pins (Bottom row: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19) */}
              {Array.from({ length: 10 }).map((_, idx) => {
                const pinNum = idx * 2 + 1;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 50 + idx * 45;
                const y = 90;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <rect 
                      x={x - 12} y={y - 12} width="24" height="24" rx="4"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <rect 
                      x={x - 5} y={y - 7} width="10" height="14" rx="1"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y + 25} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      case "vga":
        return (
          <div className="w-full flex justify-center py-4 select-none relative" id="vga-pinout-diagram">
            <svg viewBox="0 0 540 150" className="w-full max-w-[540px] drop-shadow-2xl">
              {/* Outer metal VGA socket shape (DB-15 Shield) */}
              <path 
                d="M 50 15 L 490 15 L 460 135 L 80 135 Z" 
                fill="#0c111a" stroke="#475569" strokeWidth="4" strokeLinejoin="round" 
              />
              <path 
                d="M 60 25 L 480 25 L 452 125 L 88 125 Z" 
                fill="#030712" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" 
              />

              {/* Row 1 (Pins 1-5, Top row) */}
              {Array.from({ length: 5 }).map((_, idx) => {
                const pinNum = idx + 1;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 110 + idx * 80;
                const y = 45;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <circle 
                      cx={x} cy={y} r="18"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <circle 
                      cx={x} cy={y} r="8"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y - 20} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}

              {/* Row 2 (Pins 6-10, Middle row, staggered) */}
              {Array.from({ length: 5 }).map((_, idx) => {
                const pinNum = idx + 6;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 150 + idx * 60; // Denser spacing / shifted
                const y = 78;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <circle 
                      cx={x} cy={y} r="16"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <circle 
                      cx={x} cy={y} r="7"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x - 14} y={y + 3} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}

              {/* Row 3 (Pins 11-15, Bottom row) */}
              {Array.from({ length: 5 }).map((_, idx) => {
                const pinNum = idx + 11;
                const pinId = `Pin ${pinNum}`;
                const pin = data.pins.find((p) => p.id === pinId);
                if (!pin) return null;
                const x = 110 + idx * 80;
                const y = 110;
                const isHovered = hoveredPin?.id === pin.id;
                const isHighlightedByFilter = activeCategoryFilter === "all" || pin.category === activeCategoryFilter;

                return (
                  <g 
                    key={pin.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => handleMouseEnterPin(pin)}
                    onMouseLeave={handleMouseLeavePin}
                  >
                    <circle 
                      cx={x} cy={y} r="18"
                      fill={isHovered ? "rgba(34, 211, 238, 0.2)" : "transparent"}
                      stroke={isHovered ? "#22d3ee" : "transparent"}
                      strokeWidth="1.5"
                    />
                    <circle 
                      cx={x} cy={y} r="8"
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#d97706" : "#475569"}
                      opacity={isHighlightedByFilter ? 1 : 0.25}
                    />
                    <text 
                      x={x} y={y + 24} 
                      fill={isHovered ? "#22d3ee" : isHighlightedByFilter ? "#94a3b8" : "#475569"}
                      fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle"
                      opacity={isHighlightedByFilter ? 1 : 0.2}
                    >
                      {pinNum}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-slate-800/80 rounded-2xl p-5 bg-slate-950/40 space-y-5" id="pinout-viewer-root">
      {/* Visual Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-3 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cable className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Interaktywny Schemat Wyprowadzeń (Pinout)</h4>
            <p className="text-[10px] text-slate-400">Najedź kursorem myszy na piny gniazda, aby odczytać ich funkcję i rolę w transmisji.</p>
          </div>
        </div>

        {/* Filter categories directly */}
        <div className="flex flex-wrap gap-1.5 shrink-0 max-w-full">
          <button
            onClick={() => setActiveCategoryFilter("all")}
            className={`px-2 py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
              activeCategoryFilter === "all"
                ? "bg-slate-800/80 border-slate-700 text-slate-100"
                : "bg-slate-950 border-transparent text-slate-500 hover:text-slate-350"
            }`}
          >
            Wszystkie ({data.pins.length})
          </button>
          {(Object.keys(CATEGORIES) as PinCategory[]).map((cat) => {
            const count = data.pins.filter((p) => p.category === cat).length;
            if (count === 0) return null;
            const meta = CATEGORIES[cat];
            const active = activeCategoryFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                  active
                    ? `${meta.bg} ${meta.border} ${meta.color} font-extrabold ring-1 ring-cyan-500/10`
                    : "bg-slate-950 border-transparent text-slate-500 hover:text-slate-350"
                }`}
              >
                {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Board & Spec Details Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Visual interactive map (Col span 7) */}
        <div className="lg:col-span-7 bg-[#0b0c10] border border-slate-900 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px] relative">
          <div className="absolute top-2 left-3 text-[9.5px] font-mono font-bold text-slate-550 uppercase tracking-widest">
            Fizyczny układ gniazda (Widok z przodu)
          </div>

          {renderVisualPlug()}

          <div className="text-[9.5px] text-slate-500 font-mono mt-1 w-full text-center">
            {hoveredPin ? (
              <span className="text-cyan-400 font-bold animate-pulse">● Podgląd aktywnego pinu: {hoveredPin.id}</span>
            ) : (
              <span>* Wskazówka: Przejedź kursorem nad pinami, aby wyświetlić ich opisy.</span>
            )}
          </div>
        </div>

        {/* Selected / Hovered Pin specifications (Col span 5) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {hoveredPin ? (
              <motion.div
                key={hoveredPin.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.12 }}
                className="bg-[#0e1118]/80 border border-cyan-500/15 rounded-xl p-4.5 space-y-3 shadow-lg"
              >
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black bg-cyan-950/40 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                      {hoveredPin.id}
                    </span>
                    <h5 className="text-xs font-extrabold text-white font-mono">{hoveredPin.name}</h5>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${CATEGORIES[hoveredPin.category].bg} ${CATEGORIES[hoveredPin.category].border} ${CATEGORIES[hoveredPin.category].color}`}>
                    {CATEGORIES[hoveredPin.category].label}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-slate-550 uppercase tracking-wider">Opis funkcjonalny i elektryczny:</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{hoveredPin.desc}</p>
                </div>

                <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-cyan-500/60" />
                  <span>Sygnał ustandaryzowany specyfikacją {data.name}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-pinout-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900/10 border border-slate-900 rounded-xl p-5 flex flex-col items-center justify-center text-center h-full min-h-[140px] space-y-2.5"
              >
                <Info className="w-6 h-6 text-slate-600 animate-pulse" />
                <div className="space-y-1 max-w-[280px]">
                  <p className="text-[11.5px] font-semibold text-slate-350">Najedź na dowolny pin</p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Najedź na piny na schemacie, aby natychmiast zobaczyć opis ich ról elektrycznych, sygnałowych i komunikacyjnych.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Expert tip bottom banner */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3.5 flex items-start space-x-3 text-xs leading-relaxed text-slate-400 font-sans" id="pinout-expert-banner">
        <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-slate-200 text-[10.5px] uppercase tracking-wide block mb-0.5">Ciekawostka Inżynieryjna o {data.name}:</span>
          <p className="text-[11px] text-slate-450 leading-relaxed">{data.techTip}</p>
        </div>
      </div>
    </div>
  );
}
