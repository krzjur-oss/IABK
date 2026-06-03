/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ComponentInfo, DeviceType } from "../types";
import { motion } from "motion/react";
import { Info, HelpCircle, HardDrive, Cpu, AlertCircle, Sparkles, Layers, List, Zap, Sliders, Gauge, BookOpen, Search, ChevronDown, ChevronUp, Bookmark } from "lucide-react";

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

export default function DetailPanel({ component, scientificMode = false, theme = "dark", deviceType = "desktop" }: DetailPanelProps) {
  const isLight = theme === "light";
  
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);
  const [glossaryTab, setGlossaryTab] = useState<"contextual" | "all">("contextual");
  const [glossarySearch, setGlossarySearch] = useState("");
  const relevantTerms = component ? getRelevantGlossary(component) : [];

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

        {/* ESTIMATED PERFORMANCE IMPACT VISUALIZER */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 space-y-3" id="performance-impact-container">
          <div className="flex items-center justify-between">
            <h4 className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <Gauge className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Szacowana Wydajność & Wpływ
            </h4>
            <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-800/30 px-1.5 py-0.5 rounded">
              {getDeviceTypeNamePl(deviceType)}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${
                  impact.score >= 90 ? "text-emerald-400" :
                  impact.score >= 75 ? "text-lime-400" :
                  impact.score >= 50 ? "text-amber-400" : "text-red-400"
                }`}>
                  {impact.label}
                </span>
                <span className="font-mono text-xs font-bold text-slate-300">
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

          <p className="text-[11px] text-slate-400 leading-relaxed font-sans border-t border-slate-900/60 pt-2">
            {impact.reason}
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
