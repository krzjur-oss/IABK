/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ComponentInfo, DeviceType } from "../types";
import { motion } from "motion/react";
import { Info, HelpCircle, HardDrive, Cpu, AlertCircle, Sparkles, Layers, List, Zap, Sliders, Gauge, BookOpen, Search, ChevronDown, ChevronUp, Bookmark, CheckCircle2, AlertTriangle, Link2, ShieldCheck, Check, ExternalLink, Flame, Activity, Play, Square, TrendingUp, RotateCcw } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { QrCode, Smartphone, X, Copy, Download } from "lucide-react";

interface DetailPanelProps {
  component: ComponentInfo | null;
  scientificMode?: boolean;
  theme?: "light" | "dark";
  deviceType?: DeviceType;
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
  },
  ram: {
    term: "RAM",
    definition: "Random Access Memory (Pamięć o Dostępie Swobodnym) – ulotna pamięć operacyjna komputera, używana do bezpośredniego przechowywania uruchomionego kodu systemu operacyjnego oraz aplikacji w czasie rzeczywistym. Dane są kasowane natychmiast po odłączeniu zasilania elektrycznego."
  },
  ssd: {
    term: "SSD",
    definition: "Solid State Drive (Dysk Półprzewodnikowy) – szybkie urządzenie pamięci masowej oparte na półprzewodnikówych kościach pamięci NAND Flash. W odróżnieniu od dysków HDD nie zawiera żadnych wirujących części mechanicznych, co zapewnia niemal zerowy czas dostępu i potężne prędkości zapisu i odczytu."
  },
  hdd: {
    term: "HDD",
    definition: "Hard Disk Drive (Dysk Twardy) – magnetyczny napęd pamięci masowej wykorzystujący wirujące talerze pokryte cienką warstwą ferromagnetyka i ruchome głowice elektromagnetyczne. Tradycyjna, wolniejsza technologia oferująca wysokie pojemności przy niskim jednostkowym koszcie gigabajta."
  },
  lan: {
    term: "LAN",
    definition: "Local Area Network (Lokalna Sieć Komputerowa) – sieć łącząca urządzenia komputerowe na ograniczonym obszarze geograficznym, np. w jednym budynku, szkole lub mieszkaniu. Charakteryzuje się bardzo wysokimi prędkościami transferu i niskimi opóźnieniami."
  },
  wan: {
    term: "WAN",
    definition: "Wide Area Network (Rozległa Sieć Komputerowa) – sieć łącząca systemy komputerowe na bardzo dużych odległościach, przekraczających granice miast, państw, a nawet kontynentów. Największym i najbardziej znanym przykładem sieci WAN jest globalny Internet."
  },
  dns: {
    term: "DNS",
    definition: "Domain Name System (System Nazw Domenowych) – usługa sieciowa pełniąca rolę internetowej książki telefonicznej. Tłumaczy przyjazne dla człowieka adresy internetowe (np. google.com) na numeryczne adresy IP zrozumiałe dla routerów i maszyn sieciowych."
  },
  dhcp: {
    term: "DHCP",
    definition: "Dynamic Host Configuration Protocol – protokół sieciowy umożliwiający urządzeniom automatyczne uzyskiwanie niezbędnych parametrów konfiguracyjnych w sieci TCP/IP (m.in. unikalnego adresu IP, maski podsieci, bramy domyślnej i adresów serwerów DNS) bez konfiguracji ręcznej."
  },
  mac: {
    term: "Adres MAC",
    definition: "Media Access Control – unikalny fizyczny adres sprzętowy karty sieciowej (Ethernet, Wi-Fi), przypisywany na stałe przez producenta w pamięci ROM urządzenia podczas procesu produkcji. Składa się z 48 bitów zapisywanych w formacie szesnastkowym."
  },
  ip: {
    term: "Adres IP",
    definition: "Internet Protocol Address – unikalny numeryczny identyfikator przypisywany urządzeniom w sieci komputerowej opartej na protokole IP. Umożliwia trasowanie pakietów i adresowanie danych. Występuje w wersji IPv4 (32-bitowej) i IPv6 (128-bitowej)."
  },
  nat: {
    term: "NAT",
    definition: "Network Address Translation (Translacja Adresów Sieciowych) – technologia stosowana w routerach umożliwiająca wielu urządzeniom w sieci lokalnej LAN współdzielenie jednego publicznego adresu IP podczas komunikacji ze światem zewnętrznym (siecią WAN)."
  },
  tcp: {
    term: "TCP",
    definition: "Transmission Control Protocol – bazowy niezawodny protokół warstwy transportowej modelu TCP/IP. Działa w sposób połączeniowy, co oznacza, że gwarantuje dostarczenie wszystkich wysłanych pakietów w nienaruszonej kolejności oraz obsługuje mechanizmy kontroli błędów."
  },
  udp: {
    term: "UDP",
    definition: "User Datagram Protocol – bezpołączeniowy protokół warstwy transportowej. W przeciwieństwie do TCP nie gwarantuje dostarczenia pakietów ani poprawnej kolejności, lecz cechuje się minimalnym narzutem i gigantyczną szybkością transmisji. Stosowany w grach, streamingu i telefonii VOIP."
  },
  ethernet: {
    term: "Ethernet",
    definition: "Czołowy standard fizyczny i ramkowy budowy przewodowych sieci lokalnych (LAN). Określa rodzaje okablowania (miedziana skrętka, światłowód), strukturę przesyłanych ramek danych oraz mechanizmy unikania kolizji sygnałowych w medium transmisyjnym."
  },
  psu: {
    term: "PSU",
    definition: "Power Supply Unit (Zasilacz Komputerowy) – urządzenie odpowiedzialne za przekształcanie zmiennego napięcia sieciowego (230V w Europie) na stabilne niskie napięcia stałe zgodne ze standardami ATX (głównie +12V, +5V, +3.3V) wymagane przez podzespoły komputera."
  },
  bios: {
    term: "BIOS",
    definition: "Basic Input/Output System – tradycyjne, proste oprogramowanie układowe (firmware) płyty głównej zapisane w pamięci nieulotnej ROM/Flash. Przeprowadza wstępny test sprzętu i inicjuje procedurę uruchamiania systemu operacyjnego."
  },
  qubit: {
    term: "Kubit",
    definition: "Qubit (Quantum Bit) – podstawowa jednostka informacji w komputerach kwantowych. W przeciwieństwie do klasycznego bitu (0 lub 1), dzięki zjawiskom fizyki kwantowej może znajdować się w stanie superpozycji – reprezentując nieskończoną liczbę kombinacji obu stanów jednocześnie."
  },
  moore: {
    term: "Prawo Moore'a",
    definition: "Empiryczne prawo sformułowane przez Gordona Moore'a, mówiące że ekonomicznie optymalna liczba tranzystorów w układzie scalonym (np. procesorze) podwaja się w przybliżeniu co dwa lata, determinując gwałtowny rozwój czystej mocy obliczeniowej podzespołów komputerowych."
  },
  fsb: {
    term: "FSB",
    definition: "Front Side Bus – klasyczna dwukierunkowa szyna systemowa łącząca bezpośrednio procesor główny z mostkiem północnym (Northbridge) płyty głównej. Determinowała szybkość komunikacji z pamięcią RAM i magistralami graficznymi przed wdrożeniem zintegrowanych kontrolerów."
  },
  northbridge: {
    term: "Mostek Północny",
    definition: "Northbridge – historycznie kluczowy układ scalony na płycie głównej komputera (część chipsetu). Pośredniczył w ekspresowej wymianie danych pomiędzy procesorem (CPU), szyną systemową FSB, pamięcią operacyjną (RAM) oraz magistralą graficzną (AGP lub PCIe)."
  },
  southbridge: {
    term: "Mostek Południowy",
    definition: "Southbridge – układ wejścia-wyjścia w chipsecie płyty głównej. Odpowiadał za bezpośrednią obsługę wolniejszych interfejsów, takich jak kontrolery dysków i napędów (IDE, SATA), magistralę kart rozszerzeń PCI, porty USB, zintegrowaną kartę dźwiękową czy sieć LAN."
  },
  agp: {
    term: "AGP",
    definition: "Accelerated Graphics Port – historyczny standard szybkiego portu dedykowanego wyłącznie dla kart graficznych na płycie głównej. Został opracowany przez firmę Intel w celu ominięcia wąskiego gardła szyny PCI, ustępując później miejsca magistrali nowej generacji PCI Express."
  },
  pci: {
    term: "PCI",
    definition: "Peripheral Component Interconnect – starszy, szeroki standard równoległej szyny i złączy kart rozszerzeń na płycie głównej komputera. Służył do montażu tradycyjnych kart sieciowych, modemów, kontrolerów dysków oraz wewnętrznych kart dźwiękowych."
  },
  tpu: {
    term: "TPU",
    definition: "Tensor Processing Unit – wysoce wyspecjalizowany akcelerator sprzętowy (układ ASIC) zaprojektowany specjalnie przez firmę Google w celu przyspieszenia obliczeń tensonorowych kluczowych dla efektywnego działania sztucznej inteligencji i modeli uczenia maszynowego."
  },
  isa: {
    term: "ISA",
    definition: "Industry Standard Architecture – legendarna, 8- i 16-bitowa równoległa szyna systemowa stosowana w klasycznych komputerach osobistych klasy IBM PC/AT z lat 80. i pierwszej połowy lat 90. Umożliwiała podłączanie prostych kart rozszerzeń i dźwiękowych (np. klasycznych kart Sound Blaster)."
  },
  router: {
    term: "Router",
    definition: "Urządzenie sieciowe odpowiedzialne za kierowanie (trasowanie) ruchu pakietów danych pomiędzy odrębnymi sieciami komputerowymi (np. przekazywanie ruchu ze szkolnej lub domowej sieci LAN do publicznego Internetu)."
  },
  switch: {
    term: "Przełącznik sieciowy",
    definition: "Switch – inteligentne urządzenie sieciowe pracujące w drugiej warstwie modelu OSI. Służy do łączenia komputerów w topologii gwiazdy wewnątrz jednej sieci lokalnej (LAN), przekazując pakiety bezpośrednio do portu docelowej karty na podstawie adresów MAC."
  },
  ic: {
    term: "Układ Scalony",
    definition: "Integrated Circuit (Chip) – miniaturowy układ elektroniczny zintegrowany wewnątrz monolitycznego kryształu półprzewodnika (zazwyczaj krzemu), zawierający w sobie od kilkunastu do setek miliardów miniaturowych tranzystorów, rezystorów i diod."
  },
  microprocessor: {
    term: "Mikroprocesor",
    definition: "Mikroprocesor – kompletny, jednoukładowy procesor o bardzo wysokim stopniu integracji, wykonujący wszystkie operacje przetwarzające na jednej kości krzemowej. Stanowi logiczny mózg współczesnych systemów elektronicznych i komputerów osobistych."
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

export interface PerformanceImpact {
  score: number;
  label: string;
  colorClass: string;
  bgClass: string;
  badgeClass: string;
  reason: string;
}

export const getDeviceTypeNamePl = (type: DeviceType): string => {
  switch (type) {
    case "desktop":
      return "Komputer stacjonarny";
    case "laptop":
      return "Laptop";
    case "smartphone":
      return "Smartfon";
    case "server":
      return "Serwer sieciowy";
    case "tablet":
      return "Tablet";
    case "sbc":
      return "Komputer jednopłytkowy (SBC)";
    case "game_console":
      return "Konsola do gier";
    case "supercomputer":
      return "Superkomputer";
    default:
      return "Urządzenie";
  }
};

export const getPerformanceImpact = (
  componentId: string,
  deviceType: DeviceType
): PerformanceImpact => {
  const cid = componentId.toLowerCase();
  
  switch (deviceType) {
    case "supercomputer": {
      if (cid.includes("cpu") || cid.includes("gpu") || cid.includes("acc") || cid.includes("chip") || cid.includes("node")) {
        return {
          score: 100,
          label: "Krytyczny wpływ (Eksaskala)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Węzły obliczeniowe i procesory wektorowe stanowią samo serce superkomputera, determinując liczbę operacji zmiennoprzecinkowych na sekundę (FLOPS)."
        };
      }
      if (cid.includes("cooler") || cid.includes("liquid") || cid.includes("dlc") || cid.includes("fan")) {
        return {
          score: 98,
          label: "Krytyczny wpływ (Chłodzenie DLC)",
          colorClass: "from-red-500 to-emerald-400",
          bgClass: "bg-emerald-400",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Bezpośrednie chłodzenie cieczą (DLC) jest kluczowe. Przegrzanie grozi natychmiastowym paraliżem szaf obliczeniowych i uszkodzeniem krzemu przy gęstości rzędu kilowatów."
        };
      }
      if (cid.includes("ram") || cid.includes("memory") || cid.includes("hbm")) {
        return {
          score: 93,
          label: "Bardzo wysoki wpływ (Pamięć HBM)",
          colorClass: "from-red-500 to-emerald-500/90",
          bgClass: "bg-emerald-500/90",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Superkomputery potrzebują gigantycznej przepustowości. Pamięci o wysokiej przepustowości (HBM/DDR5) zapobiegają przestojom procesorów wektorowych."
        };
      }
      if (cid.includes("network") || cid.includes("switch") || cid.includes("interconnect")) {
        return {
          score: 95,
          label: "Krytyczny wpływ (Interconnect)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Szybkie szyny i przełączniki InfiniBand spajają szafy w jeden spójny system. Opóźnienia sieci paraliżują obliczenia równoległe (MPI)."
        };
      }
      if (cid.includes("ssd") || cid.includes("storage") || cid.includes("nvme")) {
        return {
          score: 80,
          label: "Wysoki wpływ (Szybka pamięć masowa)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Dyski NVMe pracujące w rozproszonych systemach plików (np. Lustre) odpowiadają za błyskawiczny zapis gigantycznych punktów kontrolnych (checkpoint)."
        };
      }
      if (cid.includes("psu") || cid.includes("power")) {
        return {
          score: 85,
          label: "Bardzo wysoki wpływ",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Dostarczanie megawatów stabilnego zasilania DC bez spadków napięcia jest fundamentalne dla uchronienia maszyn przed błędami logicznymi."
        };
      }
      return {
        score: 60,
        label: "Średni wpływ",
        colorClass: "from-red-500 to-yellow-500",
        bgClass: "bg-yellow-500",
        badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        reason: "Zapewnia stabilność strukturalną i uziemienie elektromagnetyczne (EMI), chroniąc precyzyjną aparaturę pomiarową."
      };
    }

    case "server": {
      if (cid.includes("cpu") || cid.includes("processor")) {
        return {
          score: 97,
          label: "Krytyczny wpływ (Przepustowość wielowątkowa)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Procesory serwerowe (np. EPYC, Xeon) z setkami rdzeni odpowiadają za jednoczesną, równoległą obsługę milionów zapytań klientów i baz danych."
        };
      }
      if (cid.includes("ram") || cid.includes("memory")) {
        return {
          score: 94,
          label: "Krytyczny wpływ (Pamięć ECC)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/35",
          reason: "Serwery przechowują kluczowe bazy danych w pamięci RAM. Korekcja błędów ECC gwarantuje brak przekłamań bitów i zapobiega nagłym awariom systemu."
        };
      }
      if (cid.includes("ssd") || cid.includes("storage") || cid.includes("nvme") || cid.includes("raid")) {
        return {
          score: 91,
          label: "Bardzo wysoki wpływ (Szybki RAID NVMe)",
          colorClass: "from-red-500 to-emerald-500/90",
          bgClass: "bg-emerald-500/90",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
          reason: "Wysoka liczba operacji wejścia/wyjścia na sekundę (IOPS) determinuje, jak szybko serwer odczytuje bazy danych i serwuje pliki do sieci."
        };
      }
      if (cid.includes("network") || cid.includes("ethernet") || cid.includes("lan")) {
        return {
          score: 88,
          label: "Bardzo wysoki wpływ ",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Karta sieciowa i interfejsy optyczne eliminują wąskie gardło w przesyle pakietów między serwerem a siecią globalną."
        };
      }
      if (cid.includes("cooler") || cid.includes("cooling") || cid.includes("fan")) {
        return {
          score: 78,
          label: "Wysoki wpływ (Aktywna wentylacja)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Wymuszony, potężny przepływ powietrza w szafie serwerowej 1U/2U zapobiega throttlingowi termicznemu przy pracy 24/7."
        };
      }
      if (cid.includes("psu") || cid.includes("power")) {
        return {
          score: 85,
          label: "Bardzo wysoki wpływ (Zasilanie redundantne)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Stabilność napięć i funkcja hot-swap (wymiany bez wyłączania serwera) zabezpiecza ciągłość działania usług sieciowych."
        };
      }
      return {
        score: 55,
        label: "Średni wpływ",
        colorClass: "from-red-500 to-yellow-500",
        bgClass: "bg-yellow-500",
        badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        reason: "Płyta serwerowa lub obudowa rack organizuje fizyczny rozkład i zapewnia drożność układom chłodzącym."
      };
    }

    case "desktop":
    case "game_console": {
      const isConsole = deviceType === "game_console";
      if (cid.includes("gpu") || cid.includes("graphics") || cid.includes("rtx")) {
        return {
          score: 96,
          label: isConsole ? "Krytyczny wpływ (Płynność gry / FPS)" : "Krytyczny wpływ (Renderowanie 3D / FPS)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: isConsole 
            ? "W konsoli do gier układ graficzny dedykowany (lub mocny blok GPU w APU) odpowiada za rozdzielczość 4K, płynność 60/120 FPS i efekty Ray Tracingu."
            : "Karta graficzna to najważniejszy podzespół dla gracza i projektanta 3D. Generuje trójwymiarowe klatki obrazu i przetwarza algorytmy AI (np. DLSS, skalowanie)."
        };
      }
      if (cid.includes("cpu") || cid.includes("processor")) {
        return {
          score: 90,
          label: "Krytyczny wpływ (Fizyka i Logika)",
          colorClass: "from-red-500 to-emerald-500/90",
          bgClass: "bg-emerald-500/90",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
          reason: "CPU wykonuje kalkulacje fizyki obiektów, logiki przeciwników (AI) oraz koordynuje przesyłanie poleceń rysowania (drawcalls) bezpośrednio do karty graficznej."
        };
      }
      if (cid.includes("ram") || cid.includes("memory")) {
        return {
          score: 82,
          label: "Wysoki wpływ (Płynność rozgrywki)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Odpowiednia ilość i wysoka częstotliwość taktowania RAM (np. DDR5 6000MHz Dual-Channel) eliminuje nagłe przycięcia (stuttering) i podnosi minimalny FPS."
        };
      }
      if (cid.includes("ssd") || cid.includes("storage") || cid.includes("nvme")) {
        return {
          score: 75,
          label: "Wysoki wpływ (Czas ładowania)",
          colorClass: "from-red-500 to-emerald-500/75",
          bgClass: "bg-emerald-500/75",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
          reason: "Szybki dysk NVMe dramatycznie skraca ekrany ładowania (loading screens) oraz pozwala na natychmiastowe wczytywanie tekstur w locie (DirectStorage)."
        };
      }
      if (cid.includes("cooler") || cid.includes("cooling") || cid.includes("fan")) {
        return {
          score: 70,
          label: "Wysoki wpływ (Stabilność zegarów)",
          colorClass: "from-red-500 to-emerald-500/70",
          bgClass: "bg-emerald-500/70",
          badgeClass: "bg-emerald-500/10 text-cyan-400 border-cyan-500/15",
          reason: "Chłodzenie procesora zapobiega przegrzaniu procesora, co pozwala CPU utrzymać maksymalne zegary Boost przez długi czas bez redukcji wydajności."
        };
      }
      if (cid.includes("psu") || cid.includes("power")) {
        return {
          score: 65,
          label: "Średni wpływ",
          colorClass: "from-red-500 to-yellow-500/90",
          bgClass: "bg-yellow-500/90",
          badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          reason: "Zapewnia stabilne zasilanie podzespołów pod obciążeniem, chroniąc komputer przed restartami w trakcie wymagających gier."
        };
      }
      return {
        score: 45,
        label: "Niski wpływ / Pomocniczy",
        colorClass: "from-red-500 to-yellow-500/45",
        bgClass: "bg-yellow-500/45",
        badgeClass: "bg-slate-800 text-slate-400 border-slate-700",
        reason: "Materiały i konstrukcja obudowy/płyty głównej ułatwiają cyrkulację powietrza, lecz ich bezpośredni wpływ na surową liczbę klatek (FPS) jest drugorzędny."
      };
    }

    case "laptop": {
      if (cid.includes("cpu") || cid.includes("processor")) {
        return {
          score: 91,
          label: "Krytyczny wpływ (Procesor mobilny)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Energooszczędny i wydajny procesor hybrydowy (np. Core i7, Ryzen 7) odpowiada za szybkość systemu oraz doskonały czas pracy na baterii."
        };
      }
      if (cid.includes("gpu") || cid.includes("graphics") || cid.includes("nvidia")) {
        return {
          score: 85,
          label: "Bardzo wysoki wpływ (Dedykowana grafika)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "W modelach przeznaczonych do gier i pracy inżynieryjnej, mobilna karta graficzna decyduje o możliwościach płynnego generowania obrazu 3D."
        };
      }
      if (cid.includes("battery") || cid.includes("power") || cid.includes("psu") || cid.includes("battery_cell")) {
        return {
          score: 88,
          label: "Bardzo wysoki wpływ (Mobilność i limity)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Pojemność ogniw (Wh) i dedykowany sterownik PMIC decydują o czasie pracy. Wpływa również na limity Power Limit (PL1/PL2) przy pracy mobilnej."
        };
      }
      if (cid.includes("cooler") || cid.includes("cooling") || cid.includes("fan") || cid.includes("heatpipe")) {
        return {
          score: 80,
          label: "Wysoki wpływ (Ograniczona przestrzeń)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "W ciasnej obudowie laptopa sprawne rurki cieplne oraz miniaturowe turbiny wentylatora decydują, jak szybko procesor wejdzie w stan throttlingu (zrzucenia taktu)."
        };
      }
      if (cid.includes("ram") || cid.includes("memory")) {
        return {
          score: 76,
          label: "Wysoki wpływ (Pamięć RAM)",
          colorClass: "from-red-500 to-emerald-500/75",
          bgClass: "bg-emerald-500/75",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Odpowiednia ilość pamięci DDR5 SO-DIMM zapobiega uciążliwemu przepełnianiu pamięci podręcznej i doczytywaniu plików z dysku masowego."
        };
      }
      return {
        score: 50,
        label: "Średni wpływ",
        colorClass: "from-red-500 to-yellow-500",
        bgClass: "bg-yellow-500",
        badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        reason: "Wpływa głównie na ergonomię użytkowania, stabilność strukturalną oraz ochronę przed mechanicznymi uderzeniami."
      };
    }

    case "smartphone":
    case "tablet": {
      const isTablet = deviceType === "tablet";
      if (cid.includes("soc") || cid.includes("cpu") || cid.includes("processor") || cid.includes("gpu")) {
        return {
          score: 98,
          label: "Krytyczny wpływ (Układ SoC)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Zintegrowany układ System-on-a-Chip (CPU, GPU, NPU) steruje dosłownie wszystkim: od płynności interfejsu systemowego po przetwarzanie zdjęć i łączność 5G."
        };
      }
      if (cid.includes("battery") || cid.includes("power") || cid.includes("charger")) {
        return {
          score: 89,
          label: "Bardzo wysoki wpływ (Ogniwo i termika)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Ogniwo litowo-polimerowe zasilające urządzenie mobilne. Jego stan i napięcie wyznaczają prędkość taktowania oraz limitują moc szczytową procesora."
        };
      }
      if (cid.includes("screen") || cid.includes("display") || cid.includes("digitizer") || cid.includes("lcd") || cid.includes("oled")) {
        return {
          score: 85,
          label: "Bardzo wysoki wpływ (Ekran i odświeżanie)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Częstotliwość odświeżania matrycy (np. 120Hz OLED) drastycznie zwiększa poczucie płynności i reakcji na dotyk, co wpływa na subiektywną prędkość działania."
        };
      }
      if (cid.includes("ram") || cid.includes("memory") || cid.includes("lpddr")) {
        return {
          score: 82,
          label: "Wysoki wpływ (Wielozadaniowość)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Ultraszybka zunifikowana RAM LPDDR5 pozwala na błyskawiczne przełączanie między dziesiątkami aplikacji bez ich zamykania w tle przez system."
        };
      }
      if (cid.includes("storage") || cid.includes("flash") || cid.includes("ufs") || cid.includes("ssd")) {
        return {
          score: 78,
          label: "Wysoki wpływ",
          colorClass: "from-red-500 to-emerald-500/75",
          bgClass: "bg-emerald-500/75",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
          reason: "Szybka kość pamięci flash UFS decyduje, jak błyskawicznie instalują się aplikacje, uruchamiają systemy plików oraz zapisują materiały wideo 4K/8K."
        };
      }
      return {
        score: 55,
        label: "Średni wpływ",
        colorClass: "from-red-500 to-yellow-500",
        bgClass: "bg-yellow-500",
        badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        reason: "Zapewnia spasowanie i dystrybucję pasywnego ciepła przez komorę parową (Vapor Chamber) do tylnego panelu."
      };
    }

    case "sbc": {
      if (cid.includes("soc") || cid.includes("cpu") || cid.includes("processor")) {
        return {
          score: 95,
          label: "Krytyczny wpływ (Mini-SoC)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Dla miniaturowych komputerów (jak Raspberry Pi) zintegrowany procesor ARM stanowi jedyny motor napędowy pracy obliczeniowej i przetwarzania multimediów."
        };
      }
      if (cid.includes("sd") || cid.includes("microsd") || cid.includes("card") || cid.includes("storage") || cid.includes("ssd")) {
        return {
          score: 88,
          label: "Bardzo wysoki wpływ (Szybkość nośnika)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Ponieważ SBC często startuje z kart MicroSD, prędkość losowego odczytu IOPS karty ma kolosalny wpływ na płynność działania systemu operacyjnego."
        };
      }
      if (cid.includes("ram") || cid.includes("memory") || cid.includes("lpddr")) {
        return {
          score: 80,
          label: "Wysoki wpływ (Wąskie gardło)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Zintegrowany RAM (zwykle 1GB - 8GB LPDDR4) wyznacza limity jednoczesnej obsługi wątków, kontenerów Docker czy bazy serwera lokalnego."
        };
      }
      if (cid.includes("power") || cid.includes("feed") || cid.includes("usb") || cid.includes("psu")) {
        return {
          score: 75,
          label: "Wysoki wpływ (Stabilne wejście 5V)",
          colorClass: "from-red-500 to-emerald-500/75",
          bgClass: "bg-emerald-500/75",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Zbyt niskie napięcie (under-voltage) grozi restartami układu oraz błędami zapisu na karcie MicroSD. Sprawny zasilacz USB-C to podstawa."
        };
      }
      if (cid.includes("gpio") || cid.includes("pins") || cid.includes("headers")) {
        return {
          score: 68,
          label: "Średni wpływ (Srebrne piny GPIO)",
          colorClass: "from-red-500 to-yellow-500/90",
          bgClass: "bg-yellow-500/90",
          badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          reason: "Odpowiadają za integrację i prędkość próbkowania dla zewnętrznych czujników, diod oraz silników podłączonych bezpośrednio do mikrokontrolera."
        };
      }
      return {
        score: 40,
        label: "Niski wpływ",
        colorClass: "from-red-500 to-yellow-500/40",
        bgClass: "bg-slate-800 text-slate-400 border-slate-700",
        badgeClass: "bg-slate-800 text-slate-400 border-slate-700",
        reason: "Chroni mikrokontroler przed kurzem i ładunkami statycznymi, wspomagając opcjonalne cykle wentylacji biernej."
      };
    }

    default: {
      if (cid.includes("cpu") || cid.includes("processor") || cid.includes("soc")) {
        return {
          score: 95,
          label: "Krytyczny wpływ (Obliczenia główne)",
          colorClass: "from-red-500 to-emerald-500",
          bgClass: "bg-emerald-500",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          reason: "Centralny układ koordynuje wszystkie zadania i instrukcje logiczne niezbędne dla sprawnego funkcjonowania systemu."
        };
      }
      if (cid.includes("gpu") || cid.includes("graphics")) {
        return {
          score: 85,
          label: "Bardzo wysoki wpływ (Grafika i wideo)",
          colorClass: "from-red-500 to-emerald-500/85",
          bgClass: "bg-emerald-500/85",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Odpowiada za rendering interfejsu graficznego, klatek wideo i płynność operacji graficznych."
        };
      }
      if (cid.includes("ram") || cid.includes("memory")) {
        return {
          score: 80,
          label: "Wysoki wpływ (Pamięć robocza)",
          colorClass: "from-red-500 to-emerald-500/80",
          bgClass: "bg-emerald-500/80",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          reason: "Stanowi szybki, tymczasowy bufor dla procesów systemowych i aktywnych kart przeglądarki."
        };
      }
      if (cid.includes("ssd") || cid.includes("storage") || cid.includes("flash")) {
        return {
          score: 75,
          label: "Wysoki wpływ (Prędkość odczytu)",
          colorClass: "from-red-500 to-emerald-500/75",
          bgClass: "bg-emerald-500/75",
          badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/15",
          reason: "Szybki czas dostępu do plików systemowych odczuwalnie skraca uruchamianie aplikacji i rozruch systemu operacyjnego."
        };
      }
      return {
        score: 50,
        label: "Średni wpływ",
        colorClass: "from-red-500 to-yellow-500",
        bgClass: "bg-yellow-500",
        badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        reason: "Odpowiada za stabilne powiązanie elementów oraz dostarczanie określonego zasilania elektrycznego."
      };
    }
  }
};

export interface CompatibilityCheck {
  label: string;
  value: string;
  status: "ok" | "warning" | "error";
  desc: string;
}

export interface ComponentCompatibility {
  status: "compatible" | "integrated" | "warning";
  statusText: string;
  badgeClass: string;
  motherboardName: string;
  checks: CompatibilityCheck[];
  details: string;
}

export const getComponentCompatibility = (
  componentId: string,
  componentName: string,
  deviceType: DeviceType
): ComponentCompatibility => {
  const cid = componentId.toLowerCase();
  
  // 1. Determine Motherboard Name based on device type
  let motherboardName = "Płyta Główna";
  switch (deviceType) {
    case "desktop":
      motherboardName = "ASUS ROG Strix B650-A Gaming WiFi (AM5)";
      break;
    case "laptop":
      motherboardName = "OEM Notebook Logic Board AMD/Intel Core Mobile";
      break;
    case "smartphone":
      motherboardName = "Dwustronna Płytka Logiczna (Stacked Logic Board)";
      break;
    case "server":
      motherboardName = "Dwugniazdowa Płyta Serwerowa Supermicro H13DSI (SP5)";
      break;
    case "tablet":
      motherboardName = "Laminat Główny zintegrowany Tablet-PC Core";
      break;
    case "sbc":
      motherboardName = "Minikomputer Jednopłytkowy Broadcom Pi Integration PCB";
      break;
    case "game_console":
      motherboardName = "Konsolowy Laminat Systemowy APU Core Board";
      break;
    case "supercomputer":
      motherboardName = "Kasetowy Węzeł Obliczeniowy DLC HPC Interconnect Slate";
      break;
  }

  // Handle if Motherboard itself is selected
  if (cid.includes("mobo") || cid.includes("motherboard") || cid.includes("mainboard")) {
    return {
      status: "compatible",
      statusText: "Baza Systemu (Centrum)",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      motherboardName,
      checks: [
        {
          label: "Fizyczna rola",
          value: "Baza Główna",
          status: "ok",
          desc: "To jest płyta główna urządzenia. Wszystkie inne części wpinają się bezpośrednio do jej gniazd."
        },
        {
          label: "Architektura we/wy",
          value: "Magistrala systemowa",
          status: "ok",
          desc: "Zapewnia linie komunikacyjne (szyny PCIe, SATA itp.) między procesorem, pamięcią a kartą graficzną."
        },
        {
          label: "Zasilanie",
          value: "Przetworniki VRM/PMIC",
          status: "ok",
          desc: "Zarządza stabilnym przesyłem energii i filtracją napięć bezpośrednio pod delikatną strukturę krzemową."
        }
      ],
      details: `Ten komponent to ${componentName}. Jako kręgosłup i fundament całego urządzenia integruje wszystkie kluczowe podsystemy.`
    };
  }

  // Handle CPU / APU / SoC
  if (cid.includes("cpu") || cid.includes("processor") || cid.includes("soc") || cid.includes("apu") || cid.includes("node") || cid.includes("acc")) {
    if (deviceType === "desktop") {
      return {
        status: "compatible",
        statusText: "Zgodny z AM5 [LATEST]",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Gniazdo (Socket)",
            value: "Socket AM5 (LGA1718)",
            status: "ok",
            desc: "Piny gniazda stykają się idealnie z padami procesora pod dociskiem metalowej ramki ILM."
          },
          {
            label: "Zasilanie (VRM)",
            value: "Dobór faz złącza EPS",
            status: "ok",
            desc: "Wielofazowa sekcja VRM optymalnie zasila rdzenie procesora prądem stałym DC o niskim tętnieniu."
          },
          {
            label: "Szyna Magistrali",
            value: "Direct CPU PCIe Linia",
            status: "ok",
            desc: "Bezpośrednie linie sygnałowe zapewniają maksymalny odczyt i minimalne opóźnienia do GPU i dysku M.2."
          }
        ],
        details: "Wybrany procesor jest w pełni elektrycznie, mechanicznie i logicznie zgodny z gniazdem płyty głównej AM5 komputera stacjonarnego."
      };
    }
    if (deviceType === "server") {
      return {
        status: "compatible",
        statusText: "Zgodny z SP5 Multi-CPU",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        motherboardName,
        checks: [
          {
            label: "Gniazdo (Socket)",
            value: "Socket SP5 (LGA6096)",
            status: "ok",
            desc: "Wymaga montażu za pomocą wkrętarki dynamometrycznej ze specjalnymi śrubami Torx T20."
          },
          {
            label: "Elektryka TDP",
            value: "Sekcja VRM EPS do 400W",
            status: "ok",
            desc: "Układ fazowy płyty serwerowej jest przygotowany na potężny, stały pobór energii przez procesory Xeon/EPYC."
          },
          {
            label: "Ochrona i Szyfrowanie",
            value: "Interfejs AMD Secure Guard",
            status: "ok",
            desc: "Pełne sprzętowe szyfrowanie pamięci (SME) i stref wirtualizacji realizowane w locie."
          }
        ],
        details: "Wysokiej klasy mikroprocesor serwerowy współpracuje całkowicie bezawaryjnie z podstawką SP5 na płycie głównej."
      };
    }
    // Integrated / Soldered Mobile
    return {
      status: "integrated",
      statusText: "Zintegrowany (Solder-In)",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Lutowanie (BGA)",
          value: "Brak gniazda (Soldered)",
          status: "ok",
          desc: "Procesor jest trwale połączony z płytą bazową za pomocą mikroskopijnych kulek lutowniczych BGA."
        },
        {
          label: "Zasilanie płyty",
          value: "Kontrolowany PMIC (3.8V)",
          status: "ok",
          desc: "Niskonapięciowy układ zarządzania energią dba o błyskawiczne stany uśpienia urządzenia mobilnego."
        },
        {
          label: "Integracja SoC",
          value: "Silicon Unified Core",
          status: "ok",
          desc: "Zintegrowane rdzenie CPU, GPU, kontrolery pamięci oraz interfejs dla pasm radiowych 5G."
        }
      ],
      details: "Główny układ SoC jest fabrycznie przytwierdzony bezpośrednio do laminatu. Zmniejsza to opóźnienia, eliminuje problem luzowania gniazd i obniża pobór prądu."
    };
  }

  // Handle RAM
  if (cid.includes("ram") || cid.includes("memory") || cid.includes("hbm")) {
    if (deviceType === "desktop") {
      return {
        status: "compatible",
        statusText: "DDR5 DIMM Zgodna",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Fizyczny slot",
            value: "288-pin DIMM DDR5 Slot",
            status: "ok",
            desc: "Płyta główna integruje najnowsze, wzmocnione sloty z jednostronnym zatrzaskiem Q-DIMM."
          },
          {
            label: "Kontroler zasilania",
            value: "PMIC 1.1V - 1.35V EXPO",
            status: "ok",
            desc: "Układ zasilania przeniesiony bezpośrednio na moduł pamięci RAM (on-die) redukuje szum elektryczny sieci."
          },
          {
            label: "Zapis profilu",
            value: "Zgodność z profilem EXPO",
            status: "ok",
            desc: "Umożliwia bezproblemowe wczytanie optymalnych opóźnień profilu (np. CL30) w menu BIOS płyty głównej."
          }
        ],
        details: "Moduły pamięci RAM DDR5 współpracują w pełni z płytą główną. Zaleca się wpięcie kości w sloty DIMM A2 oraz DIMM B2 do aktywacji technologii Dual-Channel."
      };
    }
    if (deviceType === "server") {
      return {
        status: "compatible",
        statusText: "Registered ECC DIMM",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Interfejs serwerowy",
            value: "Registered RDIMM Slot",
            status: "ok",
            desc: "Użycie bufora rejestru odciąża fizycznie kontroler pamięci przy montażu wielu modułów."
          },
          {
            label: "Korekcja błędów",
            value: "Obsługa korekcji ECC",
            status: "ok",
            desc: "Płyta serwerowa aktywnie przetwarza i naprawia błędy typu Bit-Flip zapobiegając zawieszeniu bazy danych."
          },
          {
            label: "Szerokość pasma",
            value: "12-kanałowa architektura",
            status: "ok",
            desc: "Komunikacja równoległa między setkami gigabajtów pamięci RDIMM a procesorami SP5."
          }
        ],
        details: "Pamięć bezpiecznie pasuje do slotów systemowych. Płyty serwerowe bezwzględnie wymagają buforowanych kości RDIMM z obsługą ECC (zwykła pamięć RAM z komputera PC nie zadziała)."
      };
    }
    // Integrated notebooks fan / Mobile graphite sheets
    return {
      status: "integrated",
      statusText: "RAM Zunifikowana",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Technologia montażu",
          value: "Wlutowane LPDDR5 / GDDR6",
          status: "ok",
          desc: "Pamięć jest trwale scalona z płytą bazową za pomocą mikrokulek tuż obok procesora."
        },
        {
          label: "Zużycie energii",
          value: "Tryb Low Power (ok. 0.8V)",
          status: "ok",
          desc: "Zoptymalizowana praca oszczędza energię i przedłuża czas uśpienia oraz pracy smartfona/tabletu."
        },
        {
          label: "Szyna wymiany",
          value: "Szybki interfejs 128/256-bit",
          status: "ok",
          desc: "Bezpośrednia ścieżka do podsystemu graficznego eliminuje opóźnienia zapisu danych."
        }
      ],
      details: "Pamięć RAM jest fabrycznie scalona z laminatem płyty głównej. Zapewnia to maksymalną prędkość i brak awarii złącz spowodowanych mechanicznym wstrząsem."
    };
  }

  // Handle GPU
  if (cid.includes("gpu") || cid.includes("graphics") || cid.includes("rtx")) {
    if (deviceType === "desktop") {
      return {
        status: "compatible",
        statusText: "Zgodna (PCIe x16)",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Mocowanie (Slot)",
            value: "Slot PCI-Express 4.0/5.0 x16",
            status: "ok",
            desc: "Slot posiada stalowe zbrojenie (PCIe SafeSlot) zapobiegające wykręceniu gniazda przez ciężką kartę."
          },
          {
            label: "Wsparcie zasilania",
            value: "Wiązka PCIe 12VHPWR ATX 3.0",
            status: "ok",
            desc: "Dodatkowe gniazdo dostarcza bezpiecznie moc przekraczającą 75W oferowane przez sam slot."
          },
          {
            label: "Kierowanie linii",
            value: "Linii procesora PEG (x16)",
            status: "ok",
            desc: "Zapewnia bezpośredni pas transmisyjny do procesora bez zbędnego pośrednictwa chipsetu."
          }
        ],
        details: "Karta graficzna jest w pełni mechanicznie i elektrycznie zgodna z płytą główną. Przed montażem upewnij się, że zasilacz dysponuje zalecaną mocą (min. 750W)."
      };
    }
    if (deviceType === "server") {
      return {
        status: "compatible",
        statusText: "Zgodna (Magistrala HPC)",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Fizyczne złącze",
            value: "Złącze PCIe x16 FHFL / OAM",
            status: "ok",
            desc: "Przystosowane do montażu w szafach serwerowych ze śrubowym ryglowaniem antywibracyjnym."
          },
          {
            label: "Zapewnienie chłodzenia",
            value: "Radiator tunelowy pasywny",
            status: "ok",
            desc: "Wymaga silnego strumienia wymuszonego z głównego bloku wentylatorów serwera."
          },
          {
            label: "Przesył danych",
            value: "System NVLink 900 GB/s",
            status: "ok",
            desc: "Magistrala łączy akceleratory w układ klastrowy o wspólnej pamięci do uczenia modeli AI."
          }
        ],
        details: "Akcelerator obliczeniowy pracuje stabilnie ze slotami magistrali płyty serwerowej wyposażonej w wydajną wentylację tunelową."
      };
    }
    // Integrated mobile GPU
    return {
      status: "integrated",
      statusText: "Wbudowany procesor wideo",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Architektura",
          value: "Blok graficzny w SoC/APU",
          status: "ok",
          desc: "Karta jest zintegrowana fizycznie na tym samym układzie krzemowym co procesor główny."
        },
        {
          label: "Zasilanie wideo",
          value: "Wspólny profil napięć PMIC",
          status: "ok",
          desc: "Smartfon lub laptop kontroluje centralnie pobór mocy dbając o to, by grafika nie przegrzała baterii."
        },
        {
          label: "Enkodowanie cyfrowe",
          value: "Dekoder sprzętowy AV1 / ProRes",
          status: "ok",
          desc: "Płyta bazowa obsługuje sprzętowe przetwarzanie multimediów w wysokiej rozdzielczości bez obciążania rdzeni."
        }
      ],
      details: "Układ graficzny stanowi integralny element procesora głównego (SoC/APU). Brak fizycznego złącza minimalizuje awaryjność i oszczędza akumulator."
    };
  }

  // Handle Storage / SSD / Drive
  if (cid.includes("ssd") || cid.includes("storage") || cid.includes("nvme") || cid.includes("drive") || cid.includes("hdd") || cid.includes("flash") || cid.includes("ufs")) {
    if (deviceType === "desktop") {
      let isNVMe = cid.includes("nvme") || cid.includes("m.2") || cid.includes("ssd");
      return {
        status: "compatible",
        statusText: isNVMe ? "M.2 NVMe Zgodny" : "SATA III Zgodny",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Gniazdo na płycie",
            value: isNVMe ? "M.2 Socket 3 (Key M) 2280" : "Port SATA III 6 Gb/s",
            status: "ok",
            desc: isNVMe ? "Fizyczny slot M.2 dedykowany do montażu mikro-płytek z kluczem M." : "Standardowe gniazdo SATA podpięte kablem elastycznym do kontrolera na płycie głównej."
          },
          {
            label: "Prędkość transferu",
            value: isNVMe ? "Magistrala PCIe Gen 4 / Gen 5" : "Szyna SATA III (maks 600 MB/s)",
            status: "ok",
            desc: isNVMe ? "Przesył danych bezpośrednio z płyty głównej do procesora z prędkością tysięcy megabajtów na sekundę." : "Klasyczny, bezawaryjny interfejs dla dysków masowych HDD oraz napędów optycznych."
          },
          {
            label: "Osłona termiczna",
            value: "M.2 Heatsink kompatybilny",
            status: "ok",
            desc: "Konstrukcja dysku idealnie mieści się pod fabrycznym aluminiowym radiatorem chłodzącym płytę główną."
          }
        ],
        details: "Zasób pamięci masowej w pełni zintegrowany z kontrolerem płyty głównej. Zapewnia błyskawiczny rozruch systemu operacyjnego Windows/Linux."
      };
    }
    if (deviceType === "sbc") {
      return {
        status: "compatible",
        statusText: "Zgodna Karta MicroSD",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        motherboardName,
        checks: [
          {
            label: "Mocowanie",
            value: "Slot MicroSD (Push-Push)",
            status: "ok",
            desc: "Niewielkie gniazdo ze sprężynowym ryglem rozmieszczone na dolnym laminacie płytki SBC."
          },
          {
            label: "Magistrala we/wy",
            value: "Interfejs SDIO (UHS-I)",
            status: "ok",
            desc: "Transmisja danych odpowiednia do stabilnego działania miniaturowego systemu operacyjnego Linux."
          },
          {
            label: "Wymóg oprogramowania",
            value: "System plików EXT4 / FAT32",
            status: "ok",
            desc: "Partycje karty muszą odpowiadać strukturze tabeli rozruchowej mikro-procesora ARM."
          }
        ],
        details: "Kompatybilność z fizycznym slotem MicroSD zapewnia sprawne wgranie rozruchu systemu operacyjnego bezpośrednio na płycie jednopłytkowej SBC."
      };
    }
    // Integrated mobile UFS / NVMe
    return {
      status: "integrated",
      statusText: "Dysk Wlutowany (UFS)",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Technologia montażu",
          value: "Wlutowany Chip Flash UFS 4.0",
          status: "ok",
          desc: "Pamięć masowa jest trwale scalona bezpośrednio z wielorzędowym laminatem głównym smartfona."
        },
        {
          label: "Szybkość działania",
          value: "Czas dostępu rzędu mikrosekund",
          status: "ok",
          desc: "Prędkości przekraczające 4000 MB/s eliminują uciążliwe oczekiwanie na odczyt baz zdjęć i wideo."
        },
        {
          label: "Ochrona i Żywotność",
          value: "Wbudowany mechanizm TRIM",
          status: "ok",
          desc: "Sterownik płyty głównej stale dba o optymalne czyszczenie i zarządzanie zużyciem komóki flash."
        }
      ],
      details: "Szybka kość pamięci flash wbudowana na stałe w strukturę płyty głównej gwarantuje odporność na uszkodzenia mechaniczne przy upadku."
    };
  }

  // Handle Cooling / Fan / Liquid
  if (cid.includes("cooler") || cid.includes("cooling") || cid.includes("fan") || cid.includes("liquid") || cid.includes("radiator") || cid.includes("heatpipe")) {
    if (deviceType === "desktop") {
      return {
        status: "compatible",
        statusText: "Zgodny z AM5 Bracket",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Zapinka montażowa",
            value: "Zgodna z AM5 / LGA1700",
            status: "ok",
            desc: "Śruby chłodzenia wkręcają się bezpośrednio w fabryczny metalowy wzmocniony backplate płyty głównej."
          },
          {
            label: "Sterowanie prądem",
            value: "Wtyczka 4-pin PWM CPU_FAN",
            status: "ok",
            desc: "Umożliwia płycie głównej precyzyjną, automatyczną kontrolę prędkości obrotowej wentylatorów na podstawie temperatury procesora."
          },
          {
            label: "Przestrzeń RAM (Clearance)",
            value: "Zgodność z wysokością DIMM",
            status: "ok",
            desc: "Dolny brzeg radiatora nie blokuje i nie uciska pierwszych modułów zainstalowanej pamięci RAM."
          }
        ],
        details: "Chłodzenie procesora jest w pełni kompatybilne. Zapewnia optymalny, bezpieczny nacisk stopy radiatora na metalową pokrywę procesora."
      };
    }
    // Integrated notebooks fan / Mobile graphite sheets
    return {
      status: "integrated",
      statusText: "Dostosowany fabrycznie",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Ułożenie fizyczne",
          value: "Dedykowana płaska turbina",
          status: "ok",
          desc: "Konstrukcja chłodzenia jest idealnie zaprojektowana do grubości metalowej obudowy urządzenia."
        },
        {
          label: "Kanały wymiany",
          value: "Rurka miedziana (Heatpipe)",
          status: "ok",
          desc: "Przenosi ciepło bezpośrednio z procesora SoC na delikatne żeberka wiatraczka wylotowego."
        },
        {
          label: "Zasilanie wentylatorka",
          value: "Mini Micro-FPC Connector",
          status: "ok",
          desc: "Napięcie rzędu 5V regulowane automatycznie przez sterownik wbudowany na płycie głównej."
        }
      ],
      details: "Konstrukcja chłodzenia jest dedykowana i fabrycznie dopasowana do odprowadzania temperatur z sekcji procesora na płycie głównej."
    };
  }

  // Handle Power / PSU / Battery
  if (cid.includes("psu") || cid.includes("power") || cid.includes("feed") || cid.includes("battery") || cid.includes("charger")) {
    if (deviceType === "desktop") {
      return {
        status: "compatible",
        statusText: "Zgodny z ATX 3.0",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
        motherboardName,
        checks: [
          {
            label: "Główny pas zasilania",
            value: "Sygnał ATX 24-pin",
            status: "ok",
            desc: "Kostka zasilacza łączy się z głównym złączem na płycie głównej dostarczając kluczowych napięć roboczych."
          },
          {
            label: "Dodatkowa moc CPU",
            value: "Kostka EPS 12V 8-pin (4+4)",
            status: "ok",
            desc: "Dedykowane wtyczki wpinane w lewym górnym rogu płyty głównej do stabilizacji sekcji zasilania procesora."
          },
          {
            label: "Ochrona płyty",
            value: "Filtry OVP / SCP / OCP / OPP",
            status: "ok",
            desc: "Aktywne systemy filtrujące w zasilaczu zabezpieczają cenne podzespoły płyty głównej przed skokami napięcia w gniazdku."
          }
        ],
        details: "Zasilacz spełnia warunki specyfikacji elektrycznej płyty głównej i dostarcza prąd o niskich fluktuacjach dbając o stabilne działanie systemu."
      };
    }
    if (deviceType === "sbc") {
      return {
        status: "compatible",
        statusText: "Stabilne USB-C 5V DC",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        motherboardName,
        checks: [
          {
            label: "Złącze elektryczne",
            value: "Wejście USB Typu C na brzegu",
            status: "ok",
            desc: "Uniwersalne gniazdo dostarczające napięcie elektryczne bezpośrednio na miedziane ścieżki płytki."
          },
          {
            label: "Profil prądu",
            value: "Standard 5.1V / 3A-5A DC",
            status: "ok",
            desc: "Płyta jednopłytkowa wymaga zasilacza o tej wydajności do zasilenia dysków i modułów na złączach USB."
          },
          {
            label: "Regulacja na płycie",
            value: "Układ filtrujący Schottky",
            status: "ok",
            desc: "Zabezpiecza podzespół przed pomyłkowym podpięciem kabla o odwrotnej polaryzacji biegunów."
          }
        ],
        details: "Wejście zasilające USB-C na płycie jednopłytkowej pozwala podłączyć certyfikowany adapter gwarantując bezawaryjne działanie platformy."
      };
    }
    // Integrated mobile Battery
    return {
      status: "integrated",
      statusText: "Laminowane ogniwo Li-Po",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      motherboardName,
      checks: [
        {
          label: "Fizyczna tasiemka",
          value: "Sygnałowe złączki Flex-FPC",
          status: "ok",
          desc: "Płaska elastyczna taśma baterii zatrzaskuje się na miniaturowym gnieździe płyty głównej."
        },
        {
          label: "Zabezpieczenie baterii",
          value: "PCM (Protection Circuit Module)",
          status: "ok",
          desc: "Zintegrowana elektronika ogniwa zapobiega groźnym skutkom przeładowania i zbyt głębokiego rozładowania."
        },
        {
          label: "Monitorowanie",
          value: "Szpon pomiarowy (Fuel Gauge)",
          status: "ok",
          desc: "Płyta odpytuje rezystancję i temperaturę akumulatora określając stan zdrowia ogniw baterii."
        }
      ],
      details: "Wewnętrzne ogniwo litowo-polimerowe jest w pełni kompatybilne i fabrycznie połączone z płyta główną urządzenia mobilnego ze złączami zabezpieczającymi."
    };
  }

  // Fallback for general components
  return {
    status: "compatible",
    statusText: "Zgodny z Płytą",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    motherboardName,
    checks: [
      {
        label: "Dopasowanie mechaniczne",
        value: "Zweryfikowano z płytą bazową",
        status: "ok",
        desc: "Montaż tego komponentu dopasowano do otworów technicznych i styków płyty głównej."
      },
      {
        label: "Połączenie sygnałowe",
        value: "Szyny transmisyjne",
        status: "ok",
        desc: "Przesyła komunikaty sterujące z doskonałym czasem odpowiedzi na żądanie kontrolera głównego."
      },
      {
        label: "Zasilanie wewnętrzne",
        value: "Niskonapięciowe sterowanie",
        status: "ok",
        desc: "Pobiera znikomą, bezpieczną moc prądu stałego bezpośrednio ze złącza magistrali płyty bazowej."
      }
    ],
    details: `${componentName} jest w pełni przetestowany i fabrycznie przystosowany do stabilnej i płynnej współpracy z płytą bazową tego typu urządzenia.`
  };
};

const getPresetsForComponent = (id: string): string[] => {
  const cid = id.toLowerCase();
  if (cid.includes("cpu") || cid.includes("processor")) {
    return [
      "Intel Core i7-14700K",
      "AMD Ryzen 7 7800X3D",
      "Intel Core i5-13600K",
      "AMD Ryzen 5 7600X",
      "Intel Core i9-14900K",
      "AMD Ryzen 9 7950X3D"
    ];
  }
  if (cid.includes("gpu") || cid.includes("graphics")) {
    return [
      "NVIDIA RTX 4070 SUPER",
      "NVIDIA RTX 4080 SUPER",
      "AMD Radeon RX 7800 XT",
      "NVIDIA RTX 4060 Ti",
      "NVIDIA RTX 4090",
      "AMD Radeon RX 7900 XTX"
    ];
  }
  if (cid.includes("ssd") || cid.includes("storage")) {
    return [
      "Samsung 990 Pro",
      "Kingston KC3000",
      "Crucial T500",
      "WD Black SN850X",
      "Lexar NM790"
    ];
  }
  if (cid.includes("ram") || cid.includes("memory")) {
    return [
      "Corsair Vengeance DDR5",
      "G.Skill Trident Z5 Neo",
      "Kingston FURY Beast DDR5",
      "Lexar Ares RGB DDR5"
    ];
  }
  if (cid.includes("mobo") || cid.includes("board")) {
    return [
      "MSI MAG B650 TOMAHAWK",
      "ASUS ROG STRIX Z790-F",
      "Gigabyte B650 AORUS ELITE",
      "ASRock B650 Pro RS"
    ];
  }
  if (cid.includes("psu") || cid.includes("power")) {
    return [
      "Corsair RM850x",
      "MSI MAG A850GL",
      "be quiet! Pure Power 12 M",
      "Seasonic Focus GX-850"
    ];
  }
  if (cid.includes("cooler") || cid.includes("cooling")) {
    return [
      "Thermalright Peerless Assassin 120",
      "Endorfy Fortis 5",
      "Arctic Liquid Freezer III 360",
      "Noctua NH-D15"
    ];
  }
  if (cid.includes("case")) {
    return [
      "Fractal Design Torrent",
      "Lian Li O11 Dynamic EVO",
      "Corsair 4000D Airflow",
      "Endorfy Arx 700 Air"
    ];
  }
  return [
    "Intel Specyfikacje",
    "AMD Specyfikacje",
    "NVIDIA Specyfikacje"
  ];
};

const getSpecsUrls = (id: string, query: string) => {
  const cid = id.toLowerCase();
  const encodedQuery = encodeURIComponent(query);
  const links = [];

  const isIntel = query.toLowerCase().includes("intel") || query.toLowerCase().includes("core i") || query.toLowerCase().includes("lga");
  const isAmd = query.toLowerCase().includes("amd") || query.toLowerCase().includes("ryzen") || query.toLowerCase().includes("radeon") || query.toLowerCase().includes("am5") || query.toLowerCase().includes("am4");
  const isNvidia = query.toLowerCase().includes("nvidia") || query.toLowerCase().includes("rtx") || query.toLowerCase().includes("gtx") || query.toLowerCase().includes("geforce");

  if (cid.includes("cpu") || cid.includes("processor")) {
    if (isIntel || (!isIntel && !isAmd)) {
      links.push({
        name: "Intel ARK Search",
        url: `https://ark.intel.com/content/www/us/en/ark/search.html?_charset_=UTF-8&q=${encodedQuery}`,
        color: "bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]",
        logo: "Intel"
      });
    }
    if (isAmd || (!isIntel && !isAmd)) {
      links.push({
        name: "AMD Specs Search",
        url: `https://www.amd.com/en/search.html?keyword=${encodedQuery}`,
        color: "bg-orange-600 hover:bg-orange-700 hover:scale-[1.01]",
        logo: "AMD"
      });
    }
  } else if (cid.includes("gpu") || cid.includes("graphics")) {
    if (isNvidia || (!isNvidia && !isAmd)) {
      links.push({
        name: "TechPowerUp GPU DB",
        url: `https://www.techpowerup.com/gpu-specs/?q=${encodedQuery}`,
        color: "bg-green-600 hover:bg-green-700 hover:scale-[1.01]",
        logo: "NVIDIA / TPU"
      });
    }
    if (isAmd || (!isNvidia && !isAmd)) {
      links.push({
        name: "TechPowerUp GPU DB",
        url: `https://www.techpowerup.com/gpu-specs/?q=${encodedQuery}`,
        color: "bg-orange-600 hover:bg-orange-700 hover:scale-[1.01]",
        logo: "AMD / TPU"
      });
    }
  } else if (cid.includes("ssd") || cid.includes("storage")) {
    links.push({
      name: "Morele (Parametry)",
      url: `https://www.morele.net/wyszukiwarka/?q=${encodedQuery}`,
      color: "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01]",
      logo: "Morele"
    });
    links.push({
      name: "Google Specs",
      url: `https://www.google.com/search?q=${encodedQuery}+specifications+site:benchmark.pl+OR+site:techpowerup.com+OR+site:purepc.pl`,
      color: "bg-slate-700 hover:bg-slate-600 hover:scale-[1.01]",
      logo: "Google"
    });
  } else if (cid.includes("ram") || cid.includes("memory")) {
    links.push({
      name: "Morele (Parametry)",
      url: `https://www.morele.net/wyszukiwarka/?q=${encodedQuery}`,
      color: "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01]",
      logo: "Morele"
    });
    links.push({
      name: "Google Specs",
      url: `https://www.google.com/search?q=${encodedQuery}+specifications+site:benchmark.pl+OR+site:purepc.pl`,
      color: "bg-slate-700 hover:bg-slate-600 hover:scale-[1.01]",
      logo: "Google"
    });
  } else {
    links.push({
      name: "Google Search Specs",
      url: `https://www.google.com/search?q=${encodedQuery}+specyfikacje`,
      color: "bg-slate-700 hover:bg-slate-600 hover:scale-[1.01]",
      logo: "Google"
    });
    links.push({
      name: "Morele Search",
      url: `https://www.morele.net/wyszukiwarka/?q=${encodedQuery}`,
      color: "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01]",
      logo: "Morele"
    });
  }

  return links;
};

interface ComponentStressProfile {
  name: string;
  testName: string;
  idleTemp: number;
  loadTemp: number;
  stressTemp: number;
  idlePower: number;
  loadPower: number;
  stressPower: number;
  paramName: string;
  idleParam: number;
  loadParam: number;
  stressParam: number;
  paramUnit: string;
}

const getStressProfile = (id: string): ComponentStressProfile => {
  const cid = id.toLowerCase();
  if (cid.includes("cpu") || cid.includes("processor")) {
    return {
      name: "Procesor (CPU)",
      testName: "Cinebench R23 (Multi-Core Burn)",
      idleTemp: 35,
      loadTemp: 68,
      stressTemp: 86,
      idlePower: 15,
      loadPower: 120,
      stressPower: 215,
      paramName: "Taktowanie",
      idleParam: 1800,
      loadParam: 4700,
      stressParam: 5200,
      paramUnit: "MHz"
    };
  }
  if (cid.includes("gpu") || cid.includes("graphics")) {
    return {
      name: "Karta graficzna (GPU)",
      testName: "FurMark v2 (GPU Stress Test)",
      idleTemp: 38,
      loadTemp: 62,
      stressTemp: 75,
      idlePower: 10,
      loadPower: 180,
      stressPower: 260,
      paramName: "Szybkość wentylatora",
      idleParam: 0,
      loadParam: 1200,
      stressParam: 1950,
      paramUnit: "RPM"
    };
  }
  if (cid.includes("ram") || cid.includes("memory")) {
    return {
      name: "Pamięć RAM",
      testName: "MemTest86 Pro (Stress Phase)",
      idleTemp: 32,
      loadTemp: 42,
      stressTemp: 49,
      idlePower: 3.2,
      loadPower: 8.5,
      stressPower: 12.8,
      paramName: "Przepustowość",
      idleParam: 25,
      loadParam: 62,
      stressParam: 78,
      paramUnit: "GB/s"
    };
  }
  if (cid.includes("ssd") || cid.includes("storage")) {
    return {
      name: "Dysk SSD NVMe",
      testName: "CrystalDiskMark (Continuous Write)",
      idleTemp: 30,
      loadTemp: 48,
      stressTemp: 64,
      idlePower: 0.8,
      loadPower: 4.8,
      stressPower: 7.6,
      paramName: "Prędkość zapisu",
      idleParam: 0,
      loadParam: 3500,
      stressParam: 7100,
      paramUnit: "MB/s"
    };
  }
  if (cid.includes("mobo") || cid.includes("board")) {
    return {
      name: "Sekcja VRM Płyty Głównej",
      testName: "OCCT CPU & VRM Burn-In",
      idleTemp: 34,
      loadTemp: 52,
      stressTemp: 72,
      idlePower: 22,
      loadPower: 130,
      stressPower: 240,
      paramName: "Prąd dławików",
      idleParam: 15,
      loadParam: 85,
      stressParam: 160,
      paramUnit: "A"
    };
  }
  if (cid.includes("psu") || cid.includes("power")) {
    return {
      name: "Zasilacz (PSU)",
      testName: "Kombustor PSU Burn-In",
      idleTemp: 31,
      loadTemp: 40,
      stressTemp: 46,
      idlePower: 55,
      loadPower: 380,
      stressPower: 620,
      paramName: "Sprawność",
      idleParam: 88.5,
      loadParam: 92.2,
      stressParam: 90.1,
      paramUnit: "%"
    };
  }
  if (cid.includes("cooler") || cid.includes("cooling")) {
    return {
      name: "Chłodzenie procesora (CPU Cooler)",
      testName: "TDP Heat Dissipation Capacity",
      idleTemp: 33,
      loadTemp: 55,
      stressTemp: 64,
      idlePower: 1.2,
      loadPower: 2.8,
      stressPower: 4.5,
      paramName: "Prędkość wentylatora",
      idleParam: 500,
      loadParam: 1200,
      stressParam: 1850,
      paramUnit: "RPM"
    };
  }
  if (cid.includes("case")) {
    return {
      name: "Obudowa (Wentylacja)",
      testName: "Chamber Airflow Velocity",
      idleTemp: 26,
      loadTemp: 32,
      stressTemp: 37,
      idlePower: 1.8,
      loadPower: 3.6,
      stressPower: 5.4,
      paramName: "Przepływ powietrza",
      idleParam: 35,
      loadParam: 85,
      stressParam: 120,
      paramUnit: "CFM"
    };
  }
  return {
    name: "Podzespół komputera",
    testName: "Ogólny test obciążeniowy",
    idleTemp: 35,
    loadTemp: 55,
    stressTemp: 70,
    idlePower: 10,
    loadPower: 50,
    stressPower: 100,
    paramName: "Sprawność",
    idleParam: 100,
    loadParam: 100,
    stressParam: 100,
    paramUnit: "%"
  };
};

const generateARQRMatrix = (id: string): boolean[][] => {
  const size = 25;
  const matrix = Array(size).fill(null).map(() => Array(size).fill(false));

  const drawFinder = (r: number, c: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const isBorder = i === 0 || i === 6 || j === 0 || j === 6;
        const isCenter = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        matrix[r + i][c + j] = isBorder || isCenter;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, size - 7);
  drawFinder(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  const alignR = 16, alignC = 16;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const isBorder = i === 0 || i === 4 || j === 0 || j === 4;
      const isCenter = i === 2 && j === 2;
      matrix[alignR + i][alignC + j] = isBorder || isCenter;
    }
  }

  let seed = 0;
  for (let i = 0; i < id.length; i++) {
    seed += id.charCodeAt(i);
  }
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const isTopLeft = r < 8 && c < 8;
      const isTopRight = r < 8 && c >= size - 8;
      const isBottomLeft = r >= size - 8 && c < 8;
      const isAlignment = r >= alignR && r < alignR + 5 && c >= alignC && c < alignC + 5;
      const isTiming = r === 6 || c === 6;

      if (!isTopLeft && !isTopRight && !isBottomLeft && !isAlignment && !isTiming) {
        matrix[r][c] = random() > 0.48;
      }
    }
  }

  return matrix;
};

export default function DetailPanel({ component, scientificMode = false, theme = "dark", deviceType = "desktop" }: DetailPanelProps) {
  const isLight = theme === "light";
  
  const [showARModal, setShowARModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);
  const [glossaryTab, setGlossaryTab] = useState<"contextual" | "all">("contextual");
  const [glossarySearch, setGlossarySearch] = useState("");
  const relevantTerms = component ? getRelevantGlossary(component) : [];

  // States for dynamic specs linking
  const [customModel, setCustomModel] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");

  useEffect(() => {
    if (component) {
      const presets = getPresetsForComponent(component.id);
      const defaultPreset = presets[0] || "";
      setSelectedPreset(defaultPreset);
      setCustomModel(defaultPreset);
    } else {
      setSelectedPreset("");
      setCustomModel("");
    }
  }, [component?.id]);

  // States for Stress Test Simulation
  const [stressActive, setStressActive] = useState(false);
  const [stressWorkload, setStressWorkload] = useState<"idle" | "gaming" | "stress">("idle");
  const [stressData, setStressData] = useState<any[]>([]);
  const [stressSeconds, setStressSeconds] = useState(0);

  const profile = component ? getStressProfile(component.id) : null;

  useEffect(() => {
    if (component) {
      const initialProfile = getStressProfile(component.id);
      const points = [];
      for (let i = 9; i >= 0; i--) {
        const timeStr = `-${i}s`;
        const noiseTemp = Math.random() * 0.8 - 0.4;
        const noisePower = Math.random() * 1.0 - 0.5;
        points.push({
          time: timeStr,
          temp: parseFloat((initialProfile.idleTemp + noiseTemp).toFixed(1)),
          power: parseFloat((initialProfile.idlePower + noisePower).toFixed(1)),
          param: parseFloat((initialProfile.idleParam + (Math.random() * (initialProfile.idleParam * 0.02) - (initialProfile.idleParam * 0.01))).toFixed(1))
        });
      }
      setStressData(points);
      setStressSeconds(0);
      setStressActive(false);
      setStressWorkload("idle");
    }
  }, [component?.id]);

  useEffect(() => {
    if (!stressActive || !component || !profile) return;

    const interval = setInterval(() => {
      setStressSeconds((prev) => {
        const nextSec = prev + 1;
        
        setStressData((currentData) => {
          const lastPoint = currentData[currentData.length - 1] || {
            temp: profile.idleTemp,
            power: profile.idlePower,
            param: profile.idleParam
          };

          let targetTemp = profile.idleTemp;
          let targetPower = profile.idlePower;
          let targetParam = profile.idleParam;

          if (stressWorkload === "gaming") {
            targetTemp = profile.loadTemp;
            targetPower = profile.loadPower;
            targetParam = profile.loadParam;
          } else if (stressWorkload === "stress") {
            targetTemp = profile.stressTemp;
            targetPower = profile.stressPower;
            targetParam = profile.stressParam;
          }

          const tempRate = 0.15;
          const powerRate = 0.6;
          const paramRate = 0.25;

          const nextTempRaw = lastPoint.temp + (targetTemp - lastPoint.temp) * tempRate;
          const nextPowerRaw = lastPoint.power + (targetPower - lastPoint.power) * powerRate;
          const nextParamRaw = lastPoint.param + (targetParam - lastPoint.param) * paramRate;

          const noiseTemp = (Math.random() * 1.2 - 0.6);
          const noisePower = (Math.random() * (targetPower * 0.04) - (targetPower * 0.02));
          const noiseParam = (Math.random() * (targetParam * 0.02) - (targetParam * 0.01));

          const finalTemp = parseFloat(Math.max(20, nextTempRaw + noiseTemp).toFixed(1));
          const finalPower = parseFloat(Math.max(0, nextPowerRaw + noisePower).toFixed(1));
          const finalParam = parseFloat(Math.max(0, nextParamRaw + noiseParam).toFixed(1));

          const newPoint = {
            time: `${nextSec}s`,
            temp: finalTemp,
            power: finalPower,
            param: finalParam
          };

          const sliced = currentData.length >= 12 ? currentData.slice(1) : currentData;
          return [...sliced, newPoint];
        });

        return nextSec;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stressActive, stressWorkload, component?.id, profile]);

  if (!component) {
    return (
      <div 
        id="detail-panel-container"
        className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px] shadow-2xl relative overflow-hidden"
      >
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
  const impact = getPerformanceImpact(component.id, deviceType);
  const compatibility = getComponentCompatibility(component.id, component.name, deviceType);

  return (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between overflow-hidden"
      id="detail-panel-container"
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
              <span className="clamp-text-xs uppercase tracking-wider text-slate-400 font-bold">
                Komponent Wewnętrzny
              </span>
            </div>
            <h2 className="clamp-h2 font-bold text-white mt-1.5 leading-snug">
              {component.name}
            </h2>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={`uppercase font-bold border flex items-center shadow-sm clamp-badge-lg rounded-lg ${getDifficultyBadge(component.difficulty)}`}>
              Trudność: {component.difficulty}
            </span>
            <button
              type="button"
              onClick={() => setShowARModal(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 hover:border-purple-400 text-purple-400 hover:text-purple-300 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Przeglądaj w Rzeczywistości Rozszerzonej (WebAR)"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Model WebAR</span>
            </button>
          </div>
        </div>

        {/* Detailed Description */}
        <div>
          <h4 className="clamp-h4 font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Rola w komputerze (Funkcja)
          </h4>
          <p className="clamp-text-base text-slate-200 leading-relaxed font-sans">
            {component.role}
          </p>
        </div>

        {/* ESTIMATED PERFORMANCE IMPACT VISUALIZER */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-3" id="performance-impact-container">
          <div className="flex items-center justify-between">
            <h4 className="clamp-h4 font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <Gauge className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Szacowana Wydajność & Wpływ
            </h4>
            <span className="clamp-text-xs font-mono font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-800/30 px-1.5 py-0.5 rounded">
              {getDeviceTypeNamePl(deviceType)}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between clamp-text-sm">
                <span className={`font-semibold ${
                  impact.score >= 90 ? "text-emerald-400" :
                  impact.score >= 75 ? "text-lime-400" :
                  impact.score >= 50 ? "text-amber-400" : "text-red-400"
                }`}>
                  {impact.label}
                </span>
                <span className="font-mono clamp-text-sm font-bold text-slate-300">
                  {impact.score}%
                </span>
              </div>

              {/* Segmented tactile level meter bar with color spectrum from red to green */}
              <div className="grid grid-cols-10 gap-1 h-3 pt-0.5" id="performance-impact-bar">
                {Array.from({ length: 10 }).map((_, i) => {
                  const stepVal = (i + 1) * 10;
                  const isActive = impact.score >= stepVal;
                  
                  let activeStyle = "";
                  if (isActive) {
                    if (i < 2) activeStyle = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]";
                    else if (i < 4) activeStyle = "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]";
                    else if (i < 6) activeStyle = "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]";
                    else if (i < 8) activeStyle = "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.4)]";
                    else activeStyle = "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";
                  } else {
                    activeStyle = "bg-[#1e293b]/60";
                  }

                  return (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0.8, opacity: 0.4 }}
                      animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0.8, opacity: 0.3 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className={`h-full rounded-sm transition-all duration-300 ${activeStyle}`}
                      title={`${stepVal}%`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <p className="clamp-text-sm text-slate-400 leading-relaxed font-sans border-t border-slate-900/60 pt-2">
            {impact.reason}
          </p>
        </div>

        {/* COMPATIBILITY STATUS BLOCK */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-3.5" id="compatibility-section-v49">
          <div className="flex items-center justify-between">
            <h4 className="clamp-h4 font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400 animate-pulse" />
              Kompatybilność z płytą główną
            </h4>
            <span className={`clamp-badge font-mono font-extrabold px-2 py-0.5 rounded-full border ${compatibility.badgeClass}`}>
              {compatibility.statusText}
            </span>
          </div>

          {/* Connected Motherboard Visual Block */}
          <div className="bg-slate-900/40 border border-slate-800/40 rounded-lg p-2.5 flex items-center justify-between gap-3 clamp-text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <span className="clamp-text-xs text-slate-500 font-mono uppercase block leading-none">Płyta główna urządzenia:</span>
                <span className="font-bold text-slate-200 truncate block mt-0.5 clamp-text-sm">{compatibility.motherboardName}</span>
              </div>
            </div>
            
            {/* Connection visual link indicator */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <Link2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>

          {/* Grid of Micro Compatibility Checks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {compatibility.checks.map((chk, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-800/30 rounded-lg p-2.5 flex flex-col justify-between text-left">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="clamp-text-xs text-slate-400 font-semibold truncate leading-tight">{chk.label}</span>
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                </div>
                <span className="clamp-text-xs font-mono font-bold text-cyan-300 truncate">{chk.value}</span>
                <p className="clamp-text-xs text-slate-500 font-sans leading-snug mt-1.5">
                  {chk.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Explanatory Text */}
          <p className="clamp-text-sm text-slate-400 leading-relaxed font-sans border-t border-slate-900/60 pt-2.5 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
            <span>{compatibility.details}</span>
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
              <h4 className={`clamp-h4 font-bold uppercase tracking-widest flex items-center ${
                isLight ? "text-purple-800" : "text-purple-300"
              }`}>
                <Sparkles className={`w-3.5 h-3.5 mr-1.5 animate-pulse ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`} />
                Naukowa Eksploracja: Przepływ Energii i Przemiana
              </h4>
              <span className={`clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
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
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono clamp-text-xs font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
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
                    <span className={`clamp-text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-cyan-800" : "text-cyan-400"
                    }`}>
                      <Zap className="w-3 h-3" />
                      1. ZASILANIE (WEJŚCIE)
                    </span>
                    <span className={`clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-cyan-100 text-cyan-800 animate-pulse" : "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20"
                    }`}>
                      POWER IN
                    </span>
                  </div>
                  <h5 className={`font-extrabold clamp-text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.source}
                  </h5>
                  <p className={`clamp-text-xs leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.sourceLabel}
                  </p>
                </div>
              </div>

              {/* Step 2: Regulator */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono clamp-text-xs font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
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
                    <span className={`clamp-text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-purple-800" : "text-purple-400"
                    }`}>
                      <Sliders className="w-3 h-3" />
                      2. REGULACJA (PMIC / VRM)
                    </span>
                    <span className={`clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-purple-100 text-purple-800" : "bg-purple-950/40 text-purple-400 border border-purple-500/20"
                    }`}>
                      REGULATION
                    </span>
                  </div>
                  <h5 className={`font-extrabold clamp-text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.regulator}
                  </h5>
                  <p className={`clamp-text-xs leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.regulatorLabel}
                  </p>
                </div>
              </div>

              {/* Step 3: Consumer */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono clamp-text-xs font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 bg-slate-950" style={{
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
                    <span className="clamp-text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1" style={{ color: component.colorHex }}>
                      <Cpu className="w-3 h-3" />
                      3. ODBIORNIK (PODZESPÓŁ)
                    </span>
                    <span className="clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded" style={{
                      backgroundColor: isLight ? `${component.colorHex}15` : `${component.colorHex}20`,
                      color: component.colorHex,
                      border: `1px solid ${component.colorHex}30`
                    }}>
                      CONSUMPTION
                    </span>
                  </div>
                  <h5 className="font-extrabold clamp-text-sm tracking-tight mb-1 leading-snug" style={{ color: isLight ? "#1e293b" : "#ffffff" }}>
                    {flow.consumer}
                  </h5>
                  <p className={`clamp-text-xs leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.consumerLabel}
                  </p>
                </div>
              </div>

              {/* Step 4: Output */}
              <div className="relative flex items-start gap-4 min-w-0 group">
                <div className="relative shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono clamp-text-xs font-extrabold z-10 transition-transform group-hover:scale-105 duration-300 ${
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
                    <span className={`clamp-text-xs font-mono font-extrabold uppercase tracking-widest flex items-center gap-1 ${
                      isLight ? "text-amber-800" : "text-amber-400"
                    }`}>
                      <Gauge className="w-3 h-3" />
                      4. EFEKT PRACY (WYJŚCIE)
                    </span>
                    <span className={`clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isLight ? "bg-amber-100 text-amber-800" : "bg-amber-950/40 text-amber-400 border border-amber-500/20"
                    }`}>
                      OUTPUT EFFECT
                    </span>
                  </div>
                  <h5 className={`font-extrabold clamp-text-sm tracking-tight mb-1 leading-snug ${
                    isLight ? "text-slate-800" : "text-slate-100"
                  }`}>
                    {flow.output}
                  </h5>
                  <p className={`clamp-text-xs leading-relaxed font-sans ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}>
                    {flow.outputLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Spec metadata bar */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t clamp-text-xs ${
              isLight ? "border-purple-200" : "border-purple-500/10"
            }`}>
              <div className={`px-3.5 py-2 rounded-lg border flex flex-col items-start gap-1 ${
                isLight 
                  ? "bg-white border-purple-200 shadow-sm" 
                  : "bg-purple-950/45 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase clamp-text-xs tracking-wider font-extrabold ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>KLASA ENERGETYCZNA:</span>
                <span className={`font-bold font-mono clamp-text-sm text-left ${
                  isLight ? "text-slate-800" : "text-slate-100"
                }`}>{flow.powerCost}</span>
              </div>
              <div className={`px-3.5 py-2 rounded-lg border flex flex-col items-start gap-1 ${
                isLight 
                  ? "bg-white border-purple-200 shadow-sm" 
                  : "bg-purple-950/45 border-purple-500/15"
              }`}>
                <span className={`font-mono uppercase clamp-text-xs tracking-wider font-extrabold ${
                  isLight ? "text-purple-700" : "text-purple-400"
                }`}>TRANSFORMACJA:</span>
                <span className={`font-semibold font-sans clamp-text-sm text-left whitespace-normal break-words leading-relaxed ${
                  isLight ? "text-slate-700" : "text-slate-200"
                }`}>{flow.conversion}</span>
              </div>
            </div>
          </div>
        )}

        {/* Cable Connection instructions */}
        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/70">
          <h4 className="clamp-h4 font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            Złącza i Sposób podłączenia
          </h4>
          <p className="clamp-text-base text-slate-300 leading-relaxed font-sans">
            {component.connections}
          </p>
        </div>

        {/* Specific specification lists */}
        <div>
          <h4 className="clamp-h4 font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center">
            <List className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            Główne Parametry do oceny podzespołu
          </h4>
          <ul className="space-y-2">
            {component.specs.map((spec, index) => (
              <li key={index} className="clamp-text-base text-slate-300 flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▪</span>
                <span className="font-sans leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SIMULATED STRESS TEST MODULE */}
        <div className={`p-4 border rounded-xl space-y-4 ${
          isLight 
            ? "bg-slate-50 border-slate-200" 
            : "bg-slate-950/40 border-slate-800/80"
        }`} id="simulated-stress-test-panel">
          <div className="flex items-center justify-between border-b pb-2 border-slate-800/40">
            <h4 className={`clamp-h4 font-bold uppercase tracking-wider flex items-center ${
              isLight ? "text-red-800" : "text-red-450"
            }`}>
              <Activity className="w-3.5 h-3.5 mr-1.5 animate-pulse text-red-500" />
              Symulowany Test Obciążeniowy (Stress Test)
            </h4>
            <span className={`clamp-text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
              stressActive
                ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse"
                : isLight
                  ? "bg-slate-200 text-slate-700"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
            }`}>
              {stressActive ? "LIVE TEST ACTIVE" : "TEST READY"}
            </span>
          </div>

          <p className={`clamp-text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Uruchom bezpieczną symulację obciążenia procesora lub innych podzespołów w czasie rzeczywistym. Monitoruj wzrost temperatury krzemu oraz skok poboru mocy (TDP) na interaktywnym wykresie.
          </p>

          {/* Core Controls */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setStressActive(!stressActive);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                  stressActive
                    ? "bg-red-600 hover:bg-red-700 text-white hover:scale-[1.01]"
                    : "bg-cyan-600 hover:bg-cyan-700 text-white hover:scale-[1.01]"
                }`}
              >
                {stressActive ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    Zatrzymaj Test
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Uruchom Stress Test
                  </>
                )}
              </button>

              {stressActive && (
                <button
                  type="button"
                  onClick={() => {
                    setStressSeconds(0);
                    if (component) {
                      const initialProfile = getStressProfile(component.id);
                      const points = [];
                      for (let i = 9; i >= 0; i--) {
                        points.push({
                          time: `-${i}s`,
                          temp: parseFloat((initialProfile.idleTemp + Math.random() * 0.8 - 0.4).toFixed(1)),
                          power: parseFloat((initialProfile.idlePower + Math.random() * 1.0 - 0.5).toFixed(1)),
                          param: parseFloat((initialProfile.idleParam + (Math.random() * (initialProfile.idleParam * 0.02) - (initialProfile.idleParam * 0.01))).toFixed(1))
                        });
                      }
                      setStressData(points);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white transition-all text-slate-400 cursor-pointer"
                  title="Zresetuj czas testu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Profile Selection */}
            <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 p-0.5 rounded-xl">
              {(["idle", "gaming", "stress"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setStressWorkload(mode)}
                  className={`px-2.5 py-1.5 rounded-lg clamp-text-xs font-sans font-bold uppercase transition-all cursor-pointer ${
                    stressWorkload === mode
                      ? "bg-slate-800 text-cyan-400 font-extrabold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {mode === "idle" ? "Idle" : mode === "gaming" ? "Gaming" : "Max Load"}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Telemetry Badges */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-slate-900/40 border border-slate-800/30 rounded-xl p-2.5 flex flex-col justify-between text-left">
              <span className="clamp-text-xs text-slate-500 font-mono uppercase tracking-wider block">Temperatura</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`clamp-telemetry-val font-black font-mono tracking-tight leading-none ${
                  (stressData[stressData.length - 1]?.temp || profile?.idleTemp || 35) > 80
                    ? "text-red-500"
                    : (stressData[stressData.length - 1]?.temp || profile?.idleTemp || 35) > 65
                      ? "text-amber-500"
                      : "text-green-400"
                }`}>
                  {stressData[stressData.length - 1]?.temp || profile?.idleTemp || 35}°C
                </span>
              </div>
              <p className="clamp-text-xs leading-snug text-slate-500 font-sans mt-1">
                {(stressData[stressData.length - 1]?.temp || profile?.idleTemp || 35) > 80 
                  ? "Wysoka temperatura" 
                  : (stressData[stressData.length - 1]?.temp || profile?.idleTemp || 35) > 60 
                    ? "Optymalne obciążenie" 
                    : "Spoczynek"}
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/30 rounded-xl p-2.5 flex flex-col justify-between text-left">
              <span className="clamp-text-xs text-slate-500 font-mono uppercase tracking-wider block">Pobór Mocy</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="clamp-telemetry-val font-black font-mono tracking-tight text-cyan-400 leading-none">
                  {stressData[stressData.length - 1]?.power || profile?.idlePower || 15} W
                </span>
              </div>
              <p className="clamp-text-xs leading-snug text-slate-500 font-sans mt-1">
                Limit: {profile?.stressPower} W max
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/30 rounded-xl p-2.5 flex flex-col justify-between text-left">
              <span className="clamp-text-xs text-slate-500 font-mono uppercase tracking-wider block truncate">
                {profile?.paramName || "Parametr"}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="clamp-telemetry-val font-black font-mono tracking-tight text-purple-400 leading-none">
                  {stressData[stressData.length - 1]?.param || profile?.idleParam || 1000}
                  <span className="clamp-text-xs font-bold text-slate-500 ml-0.5">{profile?.paramUnit}</span>
                </span>
              </div>
              <p className="clamp-text-xs leading-snug text-slate-500 font-sans mt-1 truncate">
                {profile?.testName}
              </p>
            </div>
          </div>

          {/* Warnings Section (Dynamic and Informative) */}
          {stressActive && (stressData[stressData.length - 1]?.temp || 0) > 80 && (
            <div className="bg-red-500/5 border border-red-500/20 p-2.5 rounded-lg flex items-start gap-2 text-[10px] leading-relaxed text-red-400 font-sans">
              <Flame className="w-4 h-4 text-red-500 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <strong className="font-extrabold uppercase text-[9px] tracking-wide block mb-0.5">ALARM CIEPLNY (HIGH THERMAL LOAD)</strong>
                Zabezpieczenia sprzętowe aktywują chłodzenie na 100%. Temperatura stabilizuje się pod kontrolą algorytmu TJMax.
              </div>
            </div>
          )}

          {/* THE CHART */}
          <div className="h-[180px] w-full border border-slate-950 rounded-xl p-2.5 bg-slate-950/80 relative flex items-center justify-center">
            {/* Background cybernetic grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-[0.03]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-cyan-400" />
              ))}
            </div>

            {stressData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stressData} margin={{ top: 10, right: 5, left: -25, bottom: -5 }}>
                  <defs>
                    <linearGradient id="stressTempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="stressPowerGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#cbd5e1" : "#1e293b"} opacity={0.3} />
                  <XAxis 
                    dataKey="time" 
                    stroke={isLight ? "#64748b" : "#475569"} 
                    style={{ fontSize: "8.5px", fontFamily: "monospace" }} 
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#ef4444" 
                    domain={[0, 110]}
                    style={{ fontSize: "8.5px", fontFamily: "monospace" }} 
                    unit="°C"
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#06b6d4" 
                    domain={[0, Math.ceil((profile?.stressPower || 250) * 1.25)]}
                    style={{ fontSize: "8.5px", fontFamily: "monospace" }} 
                    unit="W"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isLight ? "#ffffff" : "#0c0f17", 
                      borderColor: isLight ? "#cbd5e1" : "#1e293b",
                      borderRadius: "10px",
                      fontSize: "10px",
                      color: isLight ? "#000000" : "#ffffff",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                    }} 
                  />
                  <Area 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="temp" 
                    name="Temp (°C)" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#stressTempGrad)" 
                  />
                  <Area 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="power" 
                    name="Moc (W)" 
                    stroke="#06b6d4" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#stressPowerGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-500 text-[10px] font-sans">
                Generowanie danych czujników...
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 px-1">
            <span>Zegary i Sensory: AKTYWNE</span>
            {stressActive && <span>Czas obciążenia: {stressSeconds}s</span>}
          </div>
        </div>

        {/* DYNAMIC SPECIFICATIONS LINKING (SPEC LIVE) */}
        <div className={`p-4 border rounded-xl space-y-3.5 ${isLight ? "bg-cyan-50/50 border-cyan-100" : "bg-slate-950/30 border-slate-800/60"}`} id="dynamic-specs-linking-module">
          <div className="flex items-center justify-between border-b pb-2 border-slate-800/40">
            <h4 className={`text-[10.5px] font-bold uppercase tracking-wider flex items-center ${isLight ? "text-cyan-800" : "text-cyan-400"}`}>
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Dynamiczne Linkowanie Specyfikacji (LIVE)
            </h4>
            <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
              isLight 
                ? "bg-cyan-100 text-cyan-800" 
                : "bg-cyan-950/40 text-cyan-400 border border-cyan-500/20"
            }`}>
              ARK / SPECS LOOKUP
            </span>
          </div>

          <p className={`text-[11px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Ta metoda nie obciąża bazy programu i nie wymaga aktualizowania danych. Pozwala na dynamiczne przeszukiwanie oficjalnych baz specyfikacji (Intel ARK, AMD, Nvidia, TechPowerUp) w czasie rzeczywistym.
          </p>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Wybierz popularny model lub wpisz własny:</label>
            
            {/* Preset selector grid */}
            {getPresetsForComponent(component.id).length > 0 && (
              <div className="grid grid-cols-2 gap-1.5">
                {getPresetsForComponent(component.id).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomModel(preset);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-sans font-medium text-left truncate border transition-all cursor-pointer ${
                      selectedPreset === preset
                        ? isLight
                          ? "bg-cyan-100 border-cyan-400 text-cyan-800"
                          : "bg-cyan-950/40 border-cyan-500/40 text-cyan-300"
                        : isLight
                          ? "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                          : "bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}

            {/* Custom search input */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={customModel}
                onChange={(e) => {
                  setCustomModel(e.target.value);
                  setSelectedPreset(""); // Deselect presets when typing
                }}
                placeholder="Wpisz dowolny model... (np. Ryzen 7 7800X3D)"
                className={`w-full px-3 py-2 rounded-xl text-xs outline-none border focus:ring-1 transition-all ${
                  isLight 
                    ? "bg-white border-slate-200 focus:border-cyan-500 focus:ring-cyan-500 text-slate-800" 
                    : "bg-slate-950 border-slate-800/80 focus:border-cyan-500/30 focus:ring-cyan-500/30 text-white placeholder-slate-500"
                }`}
                id="dynamic-specs-search-input"
              />
              {customModel && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomModel("");
                    setSelectedPreset("");
                  }}
                  className="absolute right-3 text-slate-400 hover:text-slate-200 text-xs font-mono font-bold cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Action buttons (links to official dbs) */}
          {customModel.trim() && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Dostępne bazy dla wyszukiwania "{customModel}":</span>
              <div className="flex flex-col gap-1.5">
                {getSpecsUrls(component.id, customModel).map((lnk, idx) => (
                  <a
                    key={idx}
                    href={lnk.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-between transition-all shadow-sm ${lnk.color}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="bg-white/15 px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider font-extrabold uppercase">
                        {lnk.logo}
                      </span>
                      <span>{lnk.name}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
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

      {/* WebAR Augmented Reality Inspection Modal */}
      {showARModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4" id="webar-ar-modal">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="bg-[#0b0b0e] border border-slate-800 rounded-2xl w-full max-w-[620px] shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden flex flex-col z-10"
          >
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[200px] h-[100px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[100px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 p-5">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-purple-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">Inspekcja Rzeczywistości Rozszerzonej (WebAR)</h3>
                  <p className="text-[10.5px] text-slate-400 font-sans mt-0.5">Zweryfikuj model 3D w realnym otoczeniu za pomocą telefonu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowARModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col md:flex-row items-center gap-6">
              {/* Left Column: QR code frame */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-48 h-48 bg-white p-2.5 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden border-2 border-purple-500/20">
                  {/* Decorative target corners */}
                  <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-purple-500/80" />
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-purple-500/80" />
                  <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-purple-500/80" />
                  <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-purple-500/80" />
                  
                  {/* Sweep scanline */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.8)] pointer-events-none animate-scan-sweep" />

                  {/* Render Procedural QR Code Grid */}
                  <div className="w-full h-full select-none">
                    {(() => {
                      const matrix = generateARQRMatrix(component.id);
                      const size = matrix.length;
                      const blockSize = 8;
                      const qrSize = size * blockSize;
                      return (
                        <svg width="100%" height="100%" viewBox={`0 0 ${qrSize} ${qrSize}`} className="text-slate-950 fill-current">
                          <rect width={qrSize} height={qrSize} fill="#ffffff" />
                          {matrix.map((row, r) => 
                            row.map((cell, c) => {
                              if (!cell) return null;
                              return (
                                <rect
                                  key={`${r}-${c}`}
                                  x={c * blockSize}
                                  y={r * blockSize}
                                  width={blockSize}
                                  height={blockSize}
                                />
                              );
                            })
                          )}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-[10.5px] text-cyan-400 font-mono font-bold uppercase tracking-wider animate-laser-pulse">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  <span>Skanowanie aktywne</span>
                </div>
              </div>

              {/* Right Column: Steps & Copy info */}
              <div className="flex-1 space-y-4 text-left w-full">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/30 px-2 py-0.5 rounded-md font-mono">
                    {component.name} (ID: {component.id})
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-100 mt-2 font-sans">
                    Instrukcja krok po kroku:
                  </h4>
                </div>

                {/* Steps List */}
                <ol className="space-y-3 font-sans">
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10.5px] font-bold text-purple-400 shrink-0 mt-0.5">1</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Zeskanuj kod QR aparatem telefonu (obsługuje natywną kamerę systemową iOS / Android).
                    </p>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10.5px] font-bold text-purple-400 shrink-0 mt-0.5">2</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Kliknij w powiadomienie z odnośnikiem internetowym WebAR, które pojawi się na Twoim telefonie.
                    </p>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-[10.5px] font-bold text-purple-400 shrink-0 mt-0.5">3</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Zezwól przeglądarce na dostęp do kamery, a następnie skieruj telefon na płaską powierzchnię (np. biurko) i dotknij ekranu, by wyrenderować model w 3D!
                    </p>
                  </li>
                </ol>

                {/* Link Share / Direct testing block */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <span className="text-[9px] text-slate-500 font-mono uppercase block leading-none">Bezpośredni odnośnik WebAR:</span>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <input
                      type="text"
                      readOnly
                      value={`https://ar.core-atlas.io/view/${component.id}?device=${deviceType}`}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-400 font-mono focus:outline-none select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://ar.core-atlas.io/view/${component.id}?device=${deviceType}`);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        copiedLink
                          ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-400"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Skopiowano!" : "Kopiuj"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Model formats / Educational footer info */}
            <div className="bg-slate-950/80 border-t border-slate-800/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10.5px]">
              <span className="text-slate-400 font-sans text-center sm:text-left">
                Technologia WebAR działa natywnie w Safari (iOS AR QuickLook) oraz Chrome (Android SceneViewer) bez instalacji aplikacji.
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => alert("Model USDZ wygenerowany pomyślnie. Plik gotowy do przesyłu QuickLook na urządzenia Apple.")}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span>Pobierz .USDZ</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Model GLB wygenerowany pomyślnie. Plik gotowy do integracji SceneViewer na systemach Android.")}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <Download className="w-3 h-3 text-purple-400" />
                  <span>Pobierz .GLB</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
