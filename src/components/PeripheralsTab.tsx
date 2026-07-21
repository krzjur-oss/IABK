/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { PC_PERIPHERALS, PeripheralInfo } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Monitor, Keyboard, MousePointer, Volume2, Printer, Cable, 
  HelpCircle, ArrowRight, History, Zap, Wifi, Sliders, Check, X, Info, RotateCcw,
  Cpu, Database, ExternalLink
} from "lucide-react";
import PinoutViewer from "./PinoutViewer";

interface HubConnector {
  id: string;
  name: string;
  cat: "video" | "data" | "audio";
  year: string;
  signal: string;
  speed: string;
  pins: string;
  volt: string;
  desc: string;
  retro: string;
  mid: string;
  modern: string;
}

const CONNECTORS: HubConnector[] = [
  {
    id: "usbc",
    name: "USB-C",
    cat: "data",
    year: "2014 r.",
    signal: "Cyfrowy (Wieloprotokołowy)",
    speed: "Do 40-80 Gb/s (Thunderbolt 4/5)",
    pins: "24 piny (Symetryczny)",
    volt: "Dynamiczne 5V-48V (PD do 240W)",
    desc: "Przyszłość połączeń komputerowych. Jedno uniwersalne złącze obsługuje szybką transmisję danych, wyjście obrazu (Alt Mode) i zasilanie o wielkiej mocy.",
    retro: "Osobne, grube kable dla zasilania, myszy (PS/2), drukarki (LPT) i ekranu (VGA).",
    mid: "Wprowadzenie USB-A zastępującego porty COM i LPT, lecz wciąż z podziałem na role.",
    modern: "Pełna unifikacja. Jeden port USB-C w ultrabooku zasila komputer, przesyła obraz na monitor 4K i łączy peryferia."
  },
  {
    id: "hdmi",
    name: "HDMI",
    cat: "video",
    year: "2002 r.",
    signal: "Cyfrowy TMDS / FRL",
    speed: "Do 48 Gb/s (w wersji HDMI 2.1)",
    pins: "19 pinów",
    volt: "Wideo 3.3V, zasilanie zwrotne 5V",
    desc: "Uniwersalny cyfrowy standard przesyłu nieskompresowanego obrazu wysokiej rozdzielczości oraz wielokanałowego dźwięku.",
    retro: "Analogowe gniazdo VGA przesyłające tylko obraz nienadający się do ekranów LCD o dużej ostrości.",
    mid: "Złącze DVI (cyfrowo-analogowe), które eliminowało szumy obrazu, lecz nie przesyłało dźwięku.",
    modern: "Standard HDMI 2.1 obsługujący bez problemu 4K przy 120Hz/144Hz lub 8K z obsługą zwrotnego kanału audio eARC."
  },
  {
    id: "vga",
    name: "VGA (D-Sub 15)",
    cat: "video",
    year: "1987 r.",
    signal: "Całkowicie analogowy (RGB)",
    speed: "N/A (pasmo analogowe ~150MHz)",
    pins: "15 pinów (3 rzędy po 5)",
    volt: "Sygnał wideo 0.7V RMS, piny sterowania 5V",
    desc: "Kultowy analogowy standard do podłączania monitorów kineskopowych (CRT) i wczesnych ekranów ciekłokrystalicznych (LCD).",
    retro: "Komputery pierwszej ery przesyłały obraz cyfrowy o bardzo niskiej palecie barw (standardy CGA/EGA).",
    mid: "Wprowadzenie VGA dającego pełną swobodę kolorów dzięki transmisji napięciami analogowymi.",
    modern: "Wyparty całkowicie przez interfejsy cyfrowe (HDMI/DP). Każdy szum elektromagnetyczny na kablu VGA psuje ostrość pikseli."
  },
  {
    id: "displayport",
    name: "DisplayPort",
    cat: "video",
    year: "2006 r.",
    signal: "Cyfrowy (Pakietowy jak Ethernet)",
    speed: "Do 80 Gb/s (DisplayPort 2.1)",
    pins: "20 pinów",
    volt: "Zasilanie portu DP_PWR 3.3V",
    desc: "Wysoko-wydajny standard projektowany specjalnie dla profesjonalnych monitorów komputerowych i stoisk wielodostępowych dla graczy.",
    retro: "Konieczność stosowania osobnych kart graficznych pod każdy dodatkowy analogowy monitor.",
    mid: "Wprowadzenie DVI dającego pierwszą cyfrową stabilność, lecz o zbyt wąskim paśmie do wysokiego odświeżania.",
    modern: "Złącze DisplayPort 2.1 pozwalające łączyć monitory szeregowo (Daisy Chaining - MST) pod jednym i tym samym portem."
  },
  {
    id: "ps2",
    name: "PS/2 Mini-DIN",
    cat: "data",
    year: "1987 r.",
    signal: "Cyfrowy szeregowy dedykowany",
    speed: "Około 10-16 KB/s",
    pins: "6 pinów",
    volt: "5V DC zasilania sterownika",
    desc: "Tradycyjne gniazda dedykowane (zielone dla myszek, fioletowe dla klawiatury). Brak wsparcia dla podłączania na gorąco (Hot-plug) - wpięcie przy uruchomionym PC groziło uszkodzeniem płyty.",
    retro: "Wielkie wtyczki standardu DIN-5 używane wyłącznie w klawiaturach starych maszyn AT.",
    mid: "Wprowadzenie mniejszego i kolorystycznie oznaczonego standardu PS/2 do komputerów z serii IBM.",
    modern: "Połączenia wyparte przez USB i sieci radiowe Bluetooth, które są uniwersalne i bezpieczne w eksploatacji."
  },
  {
    id: "lpt",
    name: "LPT Centronics",
    cat: "data",
    year: "1970 r. / 1994 r.",
    signal: "Cyfrowy równoległy",
    speed: "Do 2 MB/s",
    pins: "36 pinów (Centronics/DB25)",
    volt: "5V TTL",
    desc: "Szerokie, potężne kable z metalowymi zaciskami zabezpieczającymi, używane dawniej do łączenia drukarek igłowych i skanerów.",
    retro: "Transmisje szeregowe tak wolne, że wydruk jednostronicowego dokumentu trwał kilka minut.",
    mid: "Wprowadzenie portu równoległego (LPT) na płycie głównej komputera dającego skok wydajności transferu do drukarki.",
    modern: "Złącza wyeliminowane przez interfejs USB-B oraz bezprzewodowe standardy sieci lokalnej Wi-Fi."
  },
  {
    id: "jack",
    name: "Jack 3.5mm",
    cat: "audio",
    year: "Lata 50. XX wieku",
    signal: "Analogowy prąd zmienny audio",
    speed: "N/A (pasmo akustyczne 20Hz-20kHz)",
    pins: "3 lub 4 styki (TRS/TRRS)",
    volt: "Zwykle poniżej 2V RMS",
    desc: "Niezwykle trwały i legendarny analogowy wtyk słuchawkowy, oparty bezpośrednio na standardzie centrali telefonicznych z XIX wieku.",
    retro: "Wczesne komputery potrafiły wydawać jedynie proste sygnały dźwiękowe za pomocą prostego brzęczyka systemowego PC Speaker.",
    mid: "Dodawane dedykowanych kart dźwiękowych (np. Sound Blaster) z kolorowymi wtykami Mini-Jack dla głośników.",
    modern: "Format częściowo wypierany przez bezprzewodowy Bluetooth, jednak nieoceniony dla profesjonalistów za zerową latencję."
  },
  {
    id: "toslink",
    name: "TOSLINK (Optyczny)",
    cat: "audio",
    year: "1983 r.",
    signal: "Cyfrowy Optyczny (Sputtern LED)",
    speed: "Ok. 3-6 Mb/s (przepływy Audio)",
    pins: "Włókno optyczne (0 pinów miedzianych)",
    volt: "Nie dotyczy (0V - całkowita izolacja)",
    desc: "Standard przesyłania audio za pomocą modulowanego czerwonego światła diody LED przez polimerowe włókno światłowodowe.",
    retro: "Powszechne przydźwięki, piski i szumy sieciowe na tradycyjnych miedzianych kablach z powodu pętli masy.",
    mid: "S/PDIF Toslink eliminuje te zjawiska przenosząc do 8 kanałów audio skompresowanego cyfrowo omijając przewody miedziane.",
    modern: "Zastosowanie szybkich seryjnych cyfrowych szyn HDMI ARC/eARC, które wspierają bezstratne formaty TrueHD czy DTS:X."
  }
];

export interface InternalSocket {
  id: string;
  name: string;
  cat: "cpu" | "slots" | "storage" | "power";
  catLabel: string;
  year: string;
  pins: string;
  signal: string;
  speed: string;
  volt: string;
  desc: string;
  retro: string;
  mid: string;
  modern: string;
}

export const INTERNAL_SOCKETS: InternalSocket[] = [
  {
    id: "cpu_sockets",
    name: "Podstawki procesora (PGA vs LGA)",
    cat: "cpu",
    catLabel: "Gniazda CPU",
    year: "Od lat 70. do dziś",
    pins: "Od 40 do 1851+ pinów",
    signal: "Magistrala systemowa CPU (Direct Interconnect)",
    speed: "Do kilkunastu GT/s (QPI/UPI/Infinity Fabric)",
    volt: "Zwykle precyzyjne 0.8V - 1.4V",
    desc: "Gniazda montażowe procesora na płycie głównej. Dawniej dominowały podstawki PGA (nóżki w procesorze), dziś standardem są gniazda LGA (piny w gnieździe).",
    retro: "Socket 7 / Socket 370 (standardy PGA). Piny były umieszczone bezpośrednio na spodzie procesora i łatwo ulegały wygięciu lub złamaniu przy niewłaściwym montażu. Procesor był dociskany prostą boczną dźwignią (technologia Zero Insertion Force - ZIF). Istniały także pionowe złącza typu Slot 1 przypominające sloty na kartridże.",
    mid: "Przejście na standard LGA 775 przez firmę Intel (2004 r.). Delikatne, sprężynujące piny przeniesiono bezpośrednio do gniazda płyty głównej, co ułatwiło produkcję samych chipów i wyeliminowało problem krzywych nóżek procesora.",
    modern: "Współczesne, potężne gniazda Intel LGA 1700/LGA 1851 oraz AMD AM5 (LGA 1718). Bardzo wysoka gęstość styków umożliwia przesyłanie potężnych prądów o natężeniu rzędu 200A+ bezpośrednio do rdzeni procesora oraz obsługę nowoczesnych, szybkich linii PCIe 5.0 oraz pamięci DDR5 bezpośrednio z CPU."
  },
  {
    id: "expansion_slots",
    name: "Sloty kart rozszerzeń (PCIe vs PCI/ISA/AGP)",
    cat: "slots",
    catLabel: "Sloty kart",
    year: "1981 r. (ISA) / 2003 r. (PCIe)",
    pins: "Od 62 (ISA) do 164 (PCIe x16)",
    signal: "Szyna PCIe / Równoległe szyny adresowo-danych",
    speed: "Do 128 GB/s (PCI Express Gen 5 x16)",
    volt: "+3.3V, +12V zasilania bezpośredniego",
    desc: "Sloty rozszerzeń na płycie głównej pozwalające na montaż kart rozszerzeń, takich jak akceleratory 3D (karty graficzne), dedykowane karty dźwiękowe, szybkie kontrolery SATA/SAS czy nowoczesne karty sieciowe.",
    retro: "Sloty ISA (8/16-bit, czarne, bardzo długie, z szeroką szyną równoległą) oraz standard PCI (białe sloty, 32-bit). Wszystkie urządzenia na szynie PCI współdzieliły jedno pasmo transmisji, a instalacja kart wymagała ręcznego konfigurowania przerwań IRQ i adresów I/O na płycie za pomocą zworków.",
    mid: "Wprowadzenie dedykowanego slotu AGP (Accelerated Graphics Port) pod koniec lat 90. Posiadał on bezpośrednie, szybkie połączenie z pamięcią RAM i procesorem, eliminując wąskie gardło szyny PCI dla rodzącej się grafiki 3D.",
    modern: "Króluje standard PCI Express (PCIe) w wersjach Gen 4 i Gen 5. Transmisja odbywa się szeregowo za pomocą niezależnych, dedykowanych linii (np. x1, x4, x16) dla każdego slotu, co zapobiega zakłóceniom i daje gigantyczną wydajność. Sloty PCIe x16 dla ciężkich kart graficznych są dziś wzmacniane stalowym pancerzem (Steel Armor)."
  },
  {
    id: "storage_interfaces",
    name: "Złącza dysków (M.2 NVMe vs SATA / IDE)",
    cat: "storage",
    catLabel: "Dyski i napędy",
    year: "1986 r. (IDE) / 2013 r. (M.2)",
    pins: "40 pinów (IDE), 7 pinów (SATA), 75 pinów (M.2)",
    signal: "SATA / PCI Express (Protokół NVMe)",
    speed: "Do 14 500 MB/s (PCIe 5.0 x4 NVMe)",
    volt: "3.3V (M.2), 5V/12V (SATA i IDE)",
    desc: "Interfejsy i złącza fizyczne służące do trwałego podłączania dysków twardych, napędów optycznych (CD/DVD) oraz nowoczesnych, półprzewodnikowych nośników pamięci SSD.",
    retro: "Interfejs IDE/PATA wykorzystujący bardzo szerokie, szare taśmy 40- lub 80-żyłowe. Wymagał precyzyjnego ustawiania metalowych zworków Master/Slave na obudowie dysków, aby system wiedział, który dysk jest nadrzędny, a który podrzędny na danej taśmie.",
    mid: "Standard SATA (SATA I/II/III) wprowadzający wąskie kable sygnowane charakterystycznym L-kształtnym wtykiem. SATA uprościło montaż do schematu 'jeden dysk - jeden port', eliminując zworki i ułatwiając cyrkulację powietrza w obudowie komputera, z prędkością do 600 MB/s.",
    modern: "Złącze M.2 z protokołem komunikacyjnym NVMe. Ultra-kompaktowy dysk SSD o rozmiarze gumy do żucia montowany jest płasko na laminacie płyty głównej i zabezpieczany zatrzaskiem lub śrubką. Wykorzystuje bezpośrednie linie PCIe procesora, gwarantując niemal zerowe opóźnienia i transfery przekraczające 14 000 MB/s."
  },
  {
    id: "power_connectors",
    name: "Złącza zasilania (12VHPWR vs ATX 24-pin / AT)",
    cat: "power",
    catLabel: "Zasilanie wewnętrzne",
    year: "1995 r. (ATX) / 2022 r. (12VHPWR)",
    pins: "24 piny (ATX), 12+4 pinów (12VHPWR)",
    signal: "Stałe napięcia stałoprądowe DC oraz piny Sense",
    speed: "N/A (maksymalne obciążenie do 600W)",
    volt: "+3.3V, +5V, +12V, -12V, +5VSB",
    desc: "Wewnętrzne wtyczki prądowe wyprowadzone z zasilacza komputerowego (PSU), dostarczające stabilne napięcia stałe o wysokim natężeniu do płyty głównej, procesora i kart graficznych.",
    retro: "Dwuczęściowe złącza zasilania standardu AT (wtyczki P8 i P9). Ich pomyłkowe, odwrotne wpięcie (czarnymi kablami masowymi na zewnątrz zamiast obok siebie w środku) skutkowało natychmiastowym, spektakularnym spaleniem całej płyty głównej i podzespołów po wciśnięciu włącznika.",
    mid: "Wprowadzenie standardu ATX z jednoczęściową, profilowaną wtyczką 20-pinową (później 24-pinową), wyposażoną w bezpieczny boczny zatrzask uniemożliwiający błędne wpięcie. Dodatkowo popularne były 4-pinowe wtyczki Molex do zasilania napędów i dysków IDE.",
    modern: "Oprócz głównego standardu ATX 24-pin zasila się procesor osobnymi wtyczkami EPS 8-pin. Największą nowością jest złącze 12VHPWR (PCIe 5.0 12+4 pin) dedykowane dla ekstremalnie wydajnych kart graficznych. Pozwala ono przesłać do 600W mocy pojedynczym elastycznym kablem, posiadając dodatkowe 4 mikro-piny Sense monitorujące poprawność dociśnięcia wtyczki."
  }
];

interface MediaCategory {
  name: string;
  badge: string;
  freqOrBand: string;
  maxSpeed: string;
  maxRange?: string;
  description: string;
  standards: string;
}

interface ShieldingOrType {
  name: string;
  tag: string;
  desc: string;
}

interface MediumInfo {
  id: string;
  name: string;
  desc: string;
  speed: string;
  range: string;
  latency: number; // 0 to 100 indicator
  bandwidth: number; // 0 to 100 indicator
  resistance: number; // 0 to 100 (EMI resistance)
  pros: string[];
  cons: string[];
  categoriesTitle: string;
  categories: MediaCategory[];
  shieldingOrTypesTitle: string;
  shieldingOrTypes: ShieldingOrType[];
}

const MEDIA: MediumInfo[] = [
  {
    id: "miedz",
    name: "Miedź (Elektryczność)",
    desc: "Przesyłanie bitów informacji za pomocą impulsów elektrycznych (niskonapięciowych, np. 0-5V) przez miedziane druciki, ścieżki na płycie głównej lub kable typu skrętka (UTP/FTP/STP).",
    speed: "Do 40 Gb/s (na bardzo krótkich przewodach Cat 8)",
    range: "Krótki do średniego (znaczne tłumienie sygnału powyżej 100m)",
    latency: 95,
    bandwidth: 65,
    resistance: 25,
    pros: [
      "Bardzo niska cena i wysoka plastyczność kabli",
      "Możliwość jednoczesnego zasilania urządzeń (USB PD do 240W, PoE / PoE+ / PoE++)",
      "Prosty montaż i łatwe zaciskanie wtyków w standardzie RJ-45 (T568A / T568B)"
    ],
    cons: [
      "Wysoka wrażliwość na zakłócenia elektromagnetyczne (EMI) z sieci energetycznej",
      "Ryzyko wystąpienia pętli masy i ograniczenie dystansu transmisji do max 100 metrów"
    ],
    categoriesTitle: "Kategorie Okablowania Miedzianego (Skrętka Cat 5 — Cat 8)",
    categories: [
      {
        name: "Cat 5 / Cat 5e (Klasa D)",
        badge: "1 Gb/s (Gigabit Ethernet)",
        freqOrBand: "Pasmo: 100 MHz",
        maxSpeed: "1 Gb/s (1000BASE-T do 100m)",
        maxRange: "Do 100 m",
        description: "Najpopularniejszy klasyczny kabel sieciowy. Kategoria 5e zredukowała przesłuchy (crosstalk), umożliwiając realizację pełnego łączu Gigabit Ethernet na dystansie do 100 metrów.",
        standards: "IEEE 802.3ab, TIA/EIA-568-B"
      },
      {
        name: "Cat 6 (Klasa E)",
        badge: "10 Gb/s (do 55m)",
        freqOrBand: "Pasmo: 250 MHz",
        maxSpeed: "10 Gb/s (do 55m) / 1 Gb/s (100m)",
        maxRange: "55m (10G) / 100m (1G)",
        description: "Wyposażona w wewnętrzny separator krzyżowy z tworzywa rozdzielający cztery pary żył. Znacznie niższe opóźnienia i lepsze tłumienie interakcji między parami.",
        standards: "IEEE 802.3an, TIA-568-C.2"
      },
      {
        name: "Cat 6a (Klasa E_A)",
        badge: "10 Gb/s (do 100m)",
        freqOrBand: "Pasmo: 500 MHz",
        maxSpeed: "10 Gb/s (10GBASE-T do 100m)",
        maxRange: "Do 100 m",
        description: "Standard stworzony w celu całkowitej eliminacji przesłuchu obcego (Alien Crosstalk). Wymaga ekranowania oraz grubszej powłoki PVC/LSZH. Standard w nowoczesnych biurowcach i serwerowniach.",
        standards: "ANSI/TIA-568-C.2, ISO/IEC 11801"
      },
      {
        name: "Cat 7 / Cat 7a (Klasa F / F_A)",
        badge: "10 Gb/s – 40 Gb/s",
        freqOrBand: "Pasmo: 600 MHz – 1000 MHz",
        maxSpeed: "10 Gb/s (100m) / 40 Gb/s (50m)",
        maxRange: "50m – 100m",
        description: "Kabel z indywidualnym ekranem foliowym na każdej parze oraz wspólnym oplotem (S/FTP). Wymaga ciągłego uziemienia toru i dedykowanych złączy z metalowym ekranem (GG45, TERA lub ekranowany RJ45).",
        standards: "ISO/IEC 11801 Class F"
      },
      {
        name: "Cat 8 (8.1 / 8.2 — Klasa I / II)",
        badge: "25 Gb/s / 40 Gb/s (Datacenter)",
        freqOrBand: "Pasmo: 2000 MHz (2 GHz)",
        maxSpeed: "25 Gb/s / 40 Gb/s (25G/40GBASE-T)",
        maxRange: "Do 30 m",
        description: "Extremalnie szybka skrętka miedziana zaprojektowana do bezpośrednich połączeń serwerów z przełącznikami Top-of-Rack w centrach danych na małych odległościach.",
        standards: "IEEE 802.3bq, ANSI/TIA-568-C.2-1"
      }
    ],
    shieldingOrTypesTitle: "Standardy Ekranowania i Budowy Kabla Skrętki (ISO/IEC 11801)",
    shieldingOrTypes: [
      {
        name: "U/UTP (Unshielded TP)",
        tag: "Brak ekranu",
        desc: "Klasyczna skrętka nieekranowana. Bardzo elastyczna i tania, idealna do domowych sieci LAN i krótkich połączeń bez silnych pól magnetycznych."
      },
      {
        name: "F/UTP (Foiled TP)",
        tag: "Folia całościowa",
        desc: "Wszystkie 4 pary otoczone są wspólnym ekranem z folii aluminiowej chroniącym sygnał przed zewnętrznymi szumami elektromagnetycznymi."
      },
      {
        name: "S/FTP (Shielded Foiled TP)",
        tag: "Oplot + Folia na parach",
        desc: "Siatka oplotu miedzianego na zewnątrz + osobna folia na każdej parze. Maksymalna odporność na zakłócenia przemysłowe (EMI) i przesłuchy."
      }
    ]
  },
  {
    id: "swiatlo",
    name: "Światłowód (Światło)",
    desc: "Transmisja informacji za pomocą szybkich pulsów światła podczerwonego lub widzialnego, przemieszczającego się wewnątrz cienkiego włókna szklanego lub akrylowego.",
    speed: "Praktycznie nieograniczona (terabity na sekundę)",
    range: "Ekstremalnie daleki (kilometry do setek km bez ubytków)",
    latency: 98,
    bandwidth: 98,
    resistance: 100,
    pros: [
      "100% odporność na zakłócenia elektryczne, magnetyczne, przepięcia oraz burze",
      "Ogromna przepustowość danych na odległościach kontynentalnych i miejskich",
      "Brak wydzielania ciepła w przewodzie oraz brak promieniowania sygnału na zewnątrz"
    ],
    cons: [
      "Włókna szklane są wrażliwe na silne zagięcia promienia fizycznego (ryzyko pęknięcia)",
      "Brak możliwości przesyłania energii elektrycznej (brak PoE dla punktów dostępowych)"
    ],
    categoriesTitle: "Klasy i Kategorie Włókien Światłowodowych (Jednomodowe vs Wielomodowe)",
    categories: [
      {
        name: "OS1 / OS2 — Jednomodowe (Single-Mode SMF)",
        badge: "Zasięg: do 40 – 100+ km",
        freqOrBand: "Rdzeń: ~9 µm (laser 1310 / 1550 nm)",
        maxSpeed: "Terabity/s (WDM / DWDM)",
        maxRange: "Do 100+ km",
        description: "Bardzo cienki rdzeń sprawia, że promień spójnego światła lasera porusza się równolegle bez dyspersji modowej. Kluczowy fundament infrastruktury internetowej ISP, linii WAN oraz łączy podwodnych.",
        standards: "ITU-T G.652, G.657 (odporne na zginanie)"
      },
      {
        name: "OM1 / OM2 — Wielomodowe Klasyczne (MMF)",
        badge: "Zasięg: 100m – 300m",
        freqOrBand: "Rdzeń: 62.5 µm / 50 µm (diody LED 850 nm)",
        maxSpeed: "100 Mb/s – 1 Gb/s",
        maxRange: "100m – 300m",
        description: "Włókna o grubym rdzeniu, w którym impulsy światła odbijają się od ścianek pod różnymi kątami (rozproszenie modowe). Stosowane w starszych kampusach i instalacjach budynkowych.",
        standards: "ISO/IEC 11801 OM1 / OM2"
      },
      {
        name: "OM3 / OM4 — Wielomodowe Laser-Optimized (VCSEL)",
        badge: "10G / 40G / 100G (Datacenter)",
        freqOrBand: "Rdzeń: 50 µm (lasery VCSEL 850 nm)",
        maxSpeed: "10 Gb/s (300-550m) / 100 Gb/s (100-150m)",
        maxRange: "100m – 550m",
        description: "Włókna szklane zoptymalizowane do współpracy z tanimi nadajnikami laserowymi VCSEL. Główny standard okablowania w serwerowniach, przełącznikach dystrybucyjnych i macierzach SAN.",
        standards: "ISO/IEC 11801 OM3 (turkus), OM4 (fiolet)"
      },
      {
        name: "OM5 — Wielomodowy Szerokopasmowy (WBMMF)",
        badge: "400G+ (Wielofalowość SWDM)",
        freqOrBand: "Długości fal: 850 nm – 953 nm (SWDM)",
        maxSpeed: "400 Gb/s / 800 Gb/s",
        maxRange: "Do 150m (SWDM4)",
        description: "Najnowszy standard światłowodu wielomodowego wspierający technologię SWDM, przesyłając 4 różne długości fal opartych na podczerwieni jednocześnie po pojedynczym włóknie szklanym.",
        standards: "ISO/IEC 11801 OM5 (limonka)"
      }
    ],
    shieldingOrTypesTitle: "Popularne Typy Złączy i Modułów Optycznych",
    shieldingOrTypes: [
      {
        name: "Złącze LC (Lucent Connector)",
        tag: "Standard SFP / SFP+",
        desc: "Kompaktowe złącze zatrzaskowe z ceramiczną ferrulą 1.25 mm. Dominujący typ złącza w switchach zarządzalnych i karcie NIC."
      },
      {
        name: "Złącze SC (Subscriber Connector)",
        tag: "Standard FTTH / GPON",
        desc: "Prostokątne złącze push-pull z ferrulą 2.5 mm. Powszechny w gniazdkach abonenckich FTTH oraz terminalach ONT."
      },
      {
        name: "Złącze MPO / MTP",
        tag: "Wielowłóknowe (12-24 włókna)",
        desc: "Złącze zbiorcze pozwalające połączyć do 24 włókien optycznych w jednej wtyczce dla wysokozagęszczonych magistrali 40G/100G/400G."
      }
    ]
  },
  {
    id: "bezprzewodowe",
    name: "Bezprzewodowe (Fale Radiowe & Wi-Fi)",
    desc: "Przenoszenie danych poprzez wysyłanie fal elektromagnetycznych wysokiej częstotliwości (np. Bluetooth, Wi-Fi 2.4/5/6 GHz, RF 2.4GHz) bezpośrednio w przestrzeni otoczenia.",
    speed: "Do 46 Gb/s (w nowoczesnym standardzie Wi-Fi 7)",
    range: "Średni (od kilku metrów do kilkudziesięciu w budynku)",
    latency: 55,
    bandwidth: 70,
    resistance: 40,
    pros: [
      "Maksymalna wygoda użytkowania (brak fizycznego okablowania do urządzeń mobilnych)",
      "Możliwość skomunikowania wielu odbiorników naraz (MU-MIMO, Mesh)",
      "Pełna swoboda przemieszczania się z laptopem, smartfonem czy tabletem"
    ],
    cons: [
      "Podatność na tłumienie sygnału przez grube ściany, metalowe zbrojenia i wodę",
      "Wymaga lokalnego zasilania akumulatorowego oraz podatność na zakłócenia od sąsiednich sieci"
    ],
    categoriesTitle: "Generacje i Standardy Wi-Fi (IEEE 802.11)",
    categories: [
      {
        name: "Wi-Fi 4 — Standard IEEE 802.11n",
        badge: "2.4 GHz & 5 GHz",
        freqOrBand: "Pasma: 2.4 GHz oraz 5 GHz",
        maxSpeed: "Do 600 Mb/s (MIMO 4x4, kanał 40 MHz)",
        maxRange: "Do 70m w budynku",
        description: "Przełomowa generacja wprowadzająca technologię wielu anten MIMO (Multiple Input Multiple Output) oraz jednoczesną transmisję w paśmie 2.4 GHz i 5 GHz.",
        standards: "IEEE 802.11n (2009 r.), Modulacja 64-QAM"
      },
      {
        name: "Wi-Fi 5 — Standard IEEE 802.11ac",
        badge: "Dedykowane 5 GHz",
        freqOrBand: "Pasmo: Dedykowane 5 GHz",
        maxSpeed: "Do 3.5 Gb/s / 6.9 Gb/s (kanały 80/160 MHz)",
        maxRange: "Do 35m w budynku",
        description: "Skupienie transmisji na czystym paśmie 5 GHz. Wprowadziło wieloużytkownikowe MU-MIMO, precyzyjne kształtowanie wiązki (beamforming) oraz wyższą modulację 256-QAM.",
        standards: "IEEE 802.11ac Wave 2 (2013 r.)"
      },
      {
        name: "Wi-Fi 6 / Wi-Fi 6E — Standard IEEE 802.11ax",
        badge: "2.4 GHz / 5 GHz / 6 GHz",
        freqOrBand: "Pasma: 2.4 GHz, 5 GHz oraz 6 GHz (dla 6E)",
        maxSpeed: "Do 9.6 Gb/s (OFDMA + 1024-QAM)",
        maxRange: "Do 30m w budynku",
        description: "Podział kanału na wielodostęp cyfrowy OFDMA (jak w telefonii LTE/5G). Wersja 6E dodaje zupełnie nowe, bezkolizyjne pasmo 6 GHz oferujące 1200 MHz wolnej przestrzeni radiowej.",
        standards: "IEEE 802.11ax (2019/2021 r.), BSS Coloring"
      },
      {
        name: "Wi-Fi 7 — Extremely High Throughput (802.11be)",
        badge: "Multi-Link Operation (MLO)",
        freqOrBand: "Pasma: 2.4 GHz + 5 GHz + 6 GHz jednocześnie",
        maxSpeed: "Do 46 Gb/s (kanał 320 MHz, 4096-QAM)",
        maxRange: "Do 25m w budynku",
        description: "Przełomowa technologia MLO (Multi-Link Operation) pozwalająca przesyłać pakiety jednocześnie po wszystkich 3 pasmach naraz, redukując opóźnienia poniżej 5 milisekund (VR/AR, e-sport).",
        standards: "IEEE 802.11be (2024 r.), 4K-QAM, MLO"
      }
    ],
    shieldingOrTypesTitle: "Charakterystyka Pasm Radiowych (2.4 GHz vs 5 GHz vs 6 GHz)",
    shieldingOrTypes: [
      {
        name: "Pasmo 2.4 GHz",
        tag: "Największy Zasięg",
        desc: "Doskonała penetracja ścian i przeszkód budowlanych, lecz mała szerokość kanałów (20/40 MHz) i duże tłok z powodu kuchenek mikrofalowych i Bluetooth."
      },
      {
        name: "Pasmo 5 GHz",
        tag: "Wysoka Przepustowość",
        desc: "Szerokie kanały 80/160 MHz gwarantują wysoką szybkość transferu, lecz fali wyższa częstotliwość silniej tłumi się na ścianach żelbetowych."
      },
      {
        name: "Pasmo 6 GHz (Wi-Fi 6E/7)",
        tag: "Zero Zakłóceń & Ultra-low Latency",
        desc: "Super-szerokie pasmo radiowe z kanalami 320 MHz wolne od zakłóceń pochodzących ze starszych generacji kart sieciowych."
      }
    ]
  }
];

const getPresetsForPeripheral = (id: string): string[] => {
  const pid = id.toLowerCase();
  if (pid.includes("monitor")) {
    return [
      "ASUS ROG Swift PG27AQDM",
      "LG UltraGear 27GP850-B",
      "Samsung Odyssey G7",
      "Dell UltraSharp U2723QE"
    ];
  }
  if (pid.includes("keyboard")) {
    return [
      "Keychron Q1 Pro",
      "Logitech MX Keys S",
      "SteelSeries Apex Pro",
      "Razer BlackWidow V4"
    ];
  }
  if (pid.includes("mouse") || pid.includes("pointer")) {
    return [
      "Logitech G Pro X Superlight 2",
      "Razer DeathAdder V3 Pro",
      "Logitech MX Master 3S",
      "Glorious Model O 2"
    ];
  }
  if (pid.includes("audio") || pid.includes("volume") || pid.includes("headset")) {
    return [
      "Sennheiser HD 560S",
      "Beyerdynamic DT 990 Pro",
      "Sony WH-1000XM5",
      "HyperX Cloud Alpha"
    ];
  }
  if (pid.includes("printer")) {
    return [
      "Brother HL-L2352DW",
      "HP LaserJet M110w",
      "Epson EcoTank L3256",
      "Canon PIXMA G3411"
    ];
  }
  return [];
};

const getSpecsUrlsForPeripheral = (id: string, query: string) => {
  const encodedQuery = encodeURIComponent(query);
  return [
    {
      name: "Morele (Parametry)",
      url: `https://www.morele.net/wyszukiwarka/?q=${encodedQuery}`,
      color: "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01]",
      logo: "Morele"
    },
    {
      name: "Google Search Specs",
      url: `https://www.google.com/search?q=${encodedQuery}+specyfikacje`,
      color: "bg-slate-700 hover:bg-slate-600 hover:scale-[1.01]",
      logo: "Google"
    }
  ];
};

export default function PeripheralsTab() {
  const [viewMode, setViewMode] = useState<"setup" | "evolution">("setup");
  const [selectedPeripheralId, setSelectedPeripheralId] = useState<string>("monitor");
  const [evolutionTab, setEvolutionTab] = useState<"connectors" | "media" | "internal">("connectors");
  const [selectedConnectorId, setSelectedConnectorId] = useState<string>("usbc");
  const [selectedMediumId, setSelectedMediumId] = useState<string>("miedz");
  const [selectedInternalId, setSelectedInternalId] = useState<string>("cpu_sockets");

  const selectedPeripheral = PC_PERIPHERALS.find(p => p.id === selectedPeripheralId) || PC_PERIPHERALS[0];
  const selectedConnector = CONNECTORS.find(c => c.id === selectedConnectorId) || CONNECTORS[0];

  const [customModel, setCustomModel] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");

  useEffect(() => {
    if (selectedPeripheral) {
      const presets = getPresetsForPeripheral(selectedPeripheral.id);
      const defaultPreset = presets[0] || "";
      setSelectedPreset(defaultPreset);
      setCustomModel(defaultPreset);
    } else {
      setSelectedPreset("");
      setCustomModel("");
    }
  }, [selectedPeripheral?.id]);
  const selectedMedium = MEDIA.find(m => m.id === selectedMediumId) || MEDIA[0];
  const selectedInternalSocket = INTERNAL_SOCKETS.find(i => i.id === selectedInternalId) || INTERNAL_SOCKETS[0];

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Monitor":
        return <Monitor className={className} />;
      case "Keyboard":
        return <Keyboard className={className} />;
      case "MousePointer":
        return <MousePointer className={className} />;
      case "Volume2":
        return <Volume2 className={className} />;
      case "Printer":
        return <Printer className={className} />;
      default:
        return <Monitor className={className} />;
    }
  };

  const renderConnectorArt = (id: string) => {
    switch (id) {
      case "vga":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="vga-art">
            <div className="w-[124px] h-[55px] bg-blue-600 rounded-lg p-1.5 flex items-center justify-center shadow-lg relative border border-blue-500">
              <div className="absolute -left-3 top-[19px] w-2.5 h-4 bg-slate-400 border border-slate-500 rounded" />
              <div className="absolute -right-3 top-[19px] w-2.5 h-4 bg-slate-400 border border-slate-500 rounded" />
              <div 
                className="w-full h-full bg-[#1e293b] rounded flex flex-col justify-between p-1.5"
                style={{ clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)" }}
              >
                <div className="flex justify-between px-3">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />)}
                </div>
                <div className="flex justify-between px-3.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />)}
                </div>
                <div className="flex justify-between px-3">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400" />)}
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">VGA D-Sub 15 (Analog)</span>
          </div>
        );
      case "ps2":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="ps2-art">
            <div className="w-14 h-14 rounded-full border-4 border-purple-500 flex items-center justify-center shadow-lg bg-purple-950/40">
              <div className="w-10 h-10 rounded-full border-2 border-slate-400 bg-slate-950 flex items-center justify-center relative">
                <div className="absolute top-2 w-3.5 h-1.5 bg-slate-600 rounded-sm" />
                <div className="absolute left-2 top-4 w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute right-2 top-4 w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute left-1.5 top-6 w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute right-1.5 top-6 w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute left-3 bottom-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute right-3 bottom-1.5 w-1.5 h-1.5 bg-black rounded-full" />
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Mini-DIN 6 (PS/2 Interface)</span>
          </div>
        );
      case "lpt":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="lpt-art">
            <div className="w-[140px] h-[38px] bg-pink-500/10 border border-pink-500 rounded-lg flex items-center justify-center p-1 relative">
              <div 
                className="w-full h-full bg-[#151f33] rounded flex flex-col justify-between py-1 px-2 border border-pink-500/30 font-mono"
                style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
              >
                <div className="flex justify-between px-0.5 scale-y-75">
                  {Array.from({ length: 13 }).map((_, i) => <div key={i} className="w-[2px] h-2 bg-amber-400" />)}
                </div>
                <div className="flex justify-between px-2 scale-y-75">
                  {Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-[2px] h-2 bg-amber-400" />)}
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Centronics DB25 (Parallel)</span>
          </div>
        );
      case "hdmi":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="hdmi-art">
            <div className="w-[110px] h-[32px] bg-slate-900 border border-slate-700 rounded flex items-center justify-center p-0.5">
              <div 
                className="w-full h-full bg-[#1a233b] border border-amber-500/30 rounded flex justify-center items-center"
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)" }}
              >
                <div className="w-[92%] h-1 bg-slate-950 flex justify-between px-1 border-y border-amber-500/60">
                  {Array.from({ length: 14 }).map((_, i) => <div key={i} className="w-[1px] h-full bg-amber-400" />)}
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">HDMI Typ A (Digital Interface)</span>
          </div>
        );
      case "displayport":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="dp-art">
            <div className="w-[110px] h-[32px] bg-slate-900 border border-slate-700 rounded flex items-center justify-center p-0.5">
              <div 
                className="w-full h-full bg-[#152e42] border border-cyan-500/30 rounded flex justify-center items-center"
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 60%)" }}
              >
                <div className="w-[92%] h-1 bg-slate-950 flex justify-between px-1 border-b border-cyan-400/80">
                  {Array.from({ length: 15 }).map((_, i) => <div key={i} className="w-[1px] h-full bg-amber-400" />)}
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">DisplayPort v2.1 L-Shape</span>
          </div>
        );
      case "usbc":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="usbc-art">
            <div className="w-[100px] h-[26px] rounded-full border-2 border-slate-700 bg-slate-900 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center relative p-0.5">
                <div className="w-5/6 h-1.5 bg-[#17253d] rounded-full border border-slate-700 flex justify-between px-2 items-center">
                  {Array.from({ length: 10 }).map((_, i) => <div key={i} className="w-[1px] h-full bg-amber-400" />)}
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">USB-C (24-Pin Reversible)</span>
          </div>
        );
      case "jack":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="jack-art">
            <div className="flex items-center scale-110">
              <div className="w-3.5 h-6 bg-slate-800 rounded-l border-y border-l border-slate-700" />
              <div className="flex items-center">
                <div className="w-5 h-3.5 bg-slate-300 border-t border-b border-slate-400" />
                <div className="w-1 h-3.5 bg-black" />
                <div className="w-3 h-3.5 bg-slate-300 border-t border-b border-slate-400" />
                <div className="w-1 h-3.5 bg-black" />
                <div className="w-3 h-3.5 bg-slate-300" style={{ clipPath: "polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 100%)" }} />
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Jack 3.5mm TRS (Analog)</span>
          </div>
        );
      case "toslink":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="toslink-art">
            <div className="w-11 h-11 bg-slate-900 border border-slate-700 rounded-md flex items-center justify-center relative shadow-md">
              <div className="w-full h-full bg-slate-950 border border-slate-850 rounded flex items-center justify-center p-1">
                <div className="w-5 h-5 rounded bg-[#162133] border border-slate-700 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-red-600/40 border border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] flex items-center justify-center animate-pulse">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">TOSLINK S/PDIF (Optic Lens)</span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderInternalSocketArt = (id: string) => {
    switch (id) {
      case "cpu_sockets":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="cpu-socket-art">
            <div className="w-20 h-20 bg-slate-900 border-2 border-slate-750 rounded-lg p-1.5 flex flex-col justify-between relative shadow-lg">
              {/* Metal lever */}
              <div className="absolute -right-2 top-2 bottom-2 w-1 bg-slate-400 border border-slate-500 rounded-full" />
              <div className="absolute -right-4 top-2 w-3.5 h-1 bg-slate-400 border border-slate-500 rounded" />
              {/* Grid of contacts representing LGA */}
              <div className="w-full h-full bg-[#1e293b] rounded border border-slate-800 p-1 grid grid-cols-8 grid-rows-8 gap-0.5 opacity-80">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`rounded-full ${i % 9 === 0 ? 'bg-slate-800' : 'bg-amber-400/80'} w-1 h-1`} />
                ))}
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Gniazdo LGA / PGA (ZIF Lever)</span>
          </div>
        );
      case "expansion_slots":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="slots-art">
            <div className="w-[170px] h-[22px] bg-slate-800 border-2 border-slate-600 rounded flex items-center justify-between p-0.5 relative shadow-lg">
              <div className="w-[20%] h-full bg-[#0a0f1d] border border-slate-700 flex justify-around items-center px-1">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-[1px] h-3 bg-amber-400" />)}
              </div>
              <div className="w-[75%] h-full bg-[#0a0f1d] border border-slate-700 flex justify-around items-center px-2">
                {Array.from({ length: 24 }).map((_, i) => <div key={i} className="w-[1px] h-3 bg-amber-400" />)}
              </div>
              {/* Retention Latch on the right */}
              <div className="absolute -right-4 top-[-2px] h-[22px] w-3.5 bg-cyan-600 border border-cyan-500 rounded-r flex items-center justify-center text-[7px] text-white font-bold">▶</div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">PCI Express x16 (Steel Armor Slot)</span>
          </div>
        );
      case "storage_interfaces":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="storage-art">
            <div className="w-[140px] h-[45px] bg-emerald-900/10 border border-emerald-500/30 rounded-lg p-1.5 flex items-center relative shadow-lg">
              {/* M.2 Connector head */}
              <div className="w-2.5 h-[80%] bg-slate-800 border-y border-r border-slate-700 rounded-r flex flex-col justify-around py-1">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-1.5 h-[1px] bg-amber-400" />)}
              </div>
              {/* M.2 PCB representation */}
              <div className="w-[100px] h-[80%] bg-[#142d1f] border border-emerald-500 rounded flex items-center justify-between px-2 font-mono text-[7px] text-emerald-400">
                <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center font-bold scale-90">NAND</div>
                <div className="w-5 h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center font-bold scale-90">CTRL</div>
                <div className="w-3 h-3 rounded-full border border-slate-600 bg-[#0c1b12]" />
              </div>
              {/* Screw hold */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-slate-400 bg-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Złącze M.2 NVMe (Klucz M)</span>
          </div>
        );
      case "power_connectors":
        return (
          <div className="w-full h-32 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative z-10" id="power-art">
            <div className="w-[110px] h-[45px] bg-[#0c0d12] border border-slate-800 rounded-lg p-2 flex flex-col justify-between items-center shadow-lg">
              {/* 2 rows of 6 big pins */}
              <div className="w-[90%] h-5 border border-slate-700 bg-slate-900 rounded p-0.5 flex flex-col justify-between">
                <div className="flex justify-between px-1">
                  {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-1.5 h-1.5 border border-slate-600 bg-amber-400 rounded-sm" />)}
                </div>
                <div className="flex justify-between px-1">
                  {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-1.5 h-1.5 border border-slate-600 bg-amber-400 rounded-sm" />)}
                </div>
              </div>
              {/* Row of 4 tiny sense pins */}
              <div className="w-[60%] h-2.5 border border-slate-700 bg-slate-950 rounded flex justify-between px-1 items-center">
                {Array.from({ length: 4 }).map((_, i) => <div key={i} className="w-1 h-1 bg-amber-400 rounded-full" />)}
              </div>
            </div>
            <span className="absolute top-2 left-3 text-[9px] font-mono text-slate-500">Złącze 12VHPWR (PCIe 5.0 12+4 Pin)</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full" id="peripherals-tab-container">
      {/* Header Switching Panel */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5 align-middle self-start sm:self-auto">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Cable className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wide">Peryferia i Transmisja Danych</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Zbadaj setup biurowy lub poznaj pasiaste miedziane przewody, światłowody i ewolucję portów.</p>
          </div>
        </div>

        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setViewMode("setup")}
            className={`flex-1 sm:flex-initial py-2 px-3.5 rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              viewMode === "setup"
                ? "bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="view-setup-btn"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Makieta Biurka</span>
          </button>
          
          <button
            onClick={() => setViewMode("evolution")}
            className={`flex-1 sm:flex-initial py-2 px-3.5 rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              viewMode === "evolution"
                ? "bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="view-evo-btn"
          >
            <History className="w-3.5 h-3.5" />
            <span>Baza Wiedzy o Złączach</span>
          </button>
        </div>
      </div>

      {viewMode === "setup" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[620px] items-stretch" id="peripherals-root">
          {/* Visual Desk Setup / Cable Map (Left, span 6) */}
          <div className="lg:col-span-6 flex flex-col h-full min-0">
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl relative flex-1 flex flex-col justify-between overflow-hidden min-h-[440px]">
              {/* Decorative Grid Wall */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(8,145,178,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Setup Header */}
              <div className="z-10 flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800 flex items-center">
                    <Cable className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Interaktywny Schemat Połączeń
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1.5">Makieta Stanowiska Desktop</h2>
                </div>
              </div>

              {/* Interactive Visual Setup Canvas */}
              <div className="flex-1 flex items-center justify-center relative my-4 w-full h-full min-h-[300px] xl:min-h-[350px] z-10 select-none" id="desk-canvas-container">
                <style>{`
                  @keyframes cable-dash {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                  .cable-active {
                    stroke-dasharray: 6, 8;
                    animation: cable-dash 1.8s linear infinite;
                  }
                `}</style>

                <svg 
                  viewBox="0 0 600 350" 
                  className="w-full h-full max-h-[350px] aspect-[600/350]"
                  id="desk-interactive-svg"
                >
                  <defs>
                    <radialGradient id="back-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(6, 182, 212, 0.16)" />
                      <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
                    </radialGradient>
                    <linearGradient id="desk-wood" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#78350f" />
                      <stop offset="100%" stopColor="#451a03" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="600" height="350" fill="url(#back-glow)" rx="16" />

                  {/* Wood Desk */}
                  <rect x="10" y="295" width="580" height="15" rx="4" fill="url(#desk-wood)" stroke="#92400e" strokeWidth="1" className="drop-shadow-lg" />
                  <rect x="30" y="310" width="540" height="15" rx="4" fill="#090d16" opacity="0.4" />

                  {/* CABLES */}
                  <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                  {selectedPeripheralId === "monitor" && (
                    <>
                      <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 240,210 C 240,270 380,285 510,210" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" className="cable-active" />
                    </>
                  )}

                  <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
                  {selectedPeripheralId === "keyboard" && (
                    <>
                      <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 220,255 C 220,290 380,290 510,210" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                    </>
                  )}

                  <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
                  {selectedPeripheralId === "mouse" && (
                    <>
                      <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 325,258 C 340,290 420,290 510,210" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                    </>
                  )}

                  <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
                  {selectedPeripheralId === "audio" && (
                    <>
                      <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 85,215 C 100,280 380,290 510,210" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                    </>
                  )}

                  <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
                  {selectedPeripheralId === "printer" && (
                    <>
                      <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="rgba(168, 85, 247, 0.35)" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 412,202 C 430,260 480,260 510,210" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" className="cable-active" />
                    </>
                  )}

                  {/* 1. PC Case */}
                  <g>
                    <rect x="480" y="100" width="80" height="200" rx="12" fill="#030712" stroke="#1e293b" strokeWidth="2.5" />
                    <rect x="486" y="108" width="68" height="150" rx="6" fill="#080c14" stroke="#334155" strokeWidth="1" />
                    <path d="M 495,115 L 535,115 L 535,145 M 510,130 L 510,170" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" fill="none" />
                    <circle cx="535" cy="145" r="1.5" fill="#22d3ee" />
                    <circle cx="530" cy="170" r="2" fill="#a855f7" />
                    <circle cx="545" cy="280" r="1.8" fill="#10b981" className="animate-pulse" />
                    <text x="500" y="282" fill="#64748b" fontSize="6px" fontFamily="monospace" fontWeight="bold">PC RUNNING</text>
                  </g>

                  {/* 2. Monitor */}
                  <g onClick={() => setSelectedPeripheralId("monitor")} className="cursor-pointer">
                    <rect x="230" y="210" width="20" height="70" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    <polygon points="210,280 270,280 265,270 215,270" fill="#0f172a" stroke="#1e293b" />
                    <rect 
                      x="140" y="80" width="200" height="130" rx="14" 
                      fill={selectedPeripheralId === "monitor" ? "rgba(6, 182, 212, 0.05)" : "#090d16"} 
                      stroke={selectedPeripheralId === "monitor" ? "#06b6d4" : "#1e293b"} 
                      strokeWidth={selectedPeripheralId === "monitor" ? "3" : "2"} 
                    />
                    <rect x="146" y="86" width="188" height="110" rx="8" fill="#020617" />
                    <text x="156" y="108" fill="#22d3ee" fontSize="8px" fontFamily="monospace" fontWeight="bold">ATLAS MONITOR ONLINE</text>
                    <text x="156" y="122" fill="#475569" fontSize="6.5px" fontFamily="monospace">HDMI Digital Signal</text>
                    <circle cx="328" cy="202" r="1.8" fill="#22d3ee" className="animate-pulse" />
                  </g>

                  {/* 3. Keyboard */}
                  <g onClick={() => setSelectedPeripheralId("keyboard")} className="cursor-pointer">
                    <rect 
                      x="145" y="255" width="150" height="32" rx="6" 
                      fill={selectedPeripheralId === "keyboard" ? "rgba(168, 85, 247, 0.15)" : "#090d16"} 
                      stroke={selectedPeripheralId === "keyboard" ? "#a855f7" : "#1e293b"} 
                      strokeWidth={selectedPeripheralId === "keyboard" ? "2" : "1.2"} 
                    />
                    <rect x="190" y="275" width="60" height="4" rx="1.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
                    <line x1="152" y1="262" x2="288" y2="262" stroke="#334155" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="220" y="249" fill={selectedPeripheralId === "keyboard" ? "#c084fc" : "#64748b"} fontSize="6px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">KLAWIATURA (USB)</text>
                  </g>

                  {/* 4. Mouse */}
                  <g onClick={() => setSelectedPeripheralId("mouse")} className="cursor-pointer">
                    <rect 
                      x="315" y="258" width="20" height="32" rx="10" 
                      fill={selectedPeripheralId === "mouse" ? "rgba(6, 182, 212, 0.15)" : "#090d16"} 
                      stroke={selectedPeripheralId === "mouse" ? "#06b6d4" : "#1e293b"} 
                      strokeWidth={selectedPeripheralId === "mouse" ? "2" : "1.2"} 
                    />
                    <circle cx="325" cy="265" r="1.5" fill={selectedPeripheralId === "mouse" ? "#22d3ee" : "#64748b"} />
                    <text x="325" y="249" fill={selectedPeripheralId === "mouse" ? "#22d3ee" : "#64748b"} fontSize="6px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MYSZ</text>
                  </g>

                  {/* 5. Speakers */}
                  <g onClick={() => setSelectedPeripheralId("audio")} className="cursor-pointer">
                    <rect 
                      x="65" y="120" width="40" height="95" rx="8" 
                      fill={selectedPeripheralId === "audio" ? "rgba(6, 182, 212, 0.05)" : "#090d16"} 
                      stroke={selectedPeripheralId === "audio" ? "#06b6d4" : "#1e293b"} 
                      strokeWidth={selectedPeripheralId === "audio" ? "2" : "1.2"} 
                    />
                    <circle cx="85" cy="145" r="8" fill="#1e293b" stroke="#334155" />
                    <circle cx="85" cy="180" r="12" fill="#1e293b" stroke="#334155" />
                    <text x="85" y="109" fill={selectedPeripheralId === "audio" ? "#22d3ee" : "#64748b"} fontSize="6px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">GŁOŚNIK (JACK)</text>
                  </g>

                  {/* 6. Printer */}
                  <g onClick={() => setSelectedPeripheralId("printer")} className="cursor-pointer">
                    <rect 
                      x="375" y="150" width="75" height="52" rx="8" 
                      fill={selectedPeripheralId === "printer" ? "rgba(168, 85, 247, 0.05)" : "#090d16"} 
                      stroke={selectedPeripheralId === "printer" ? "#a855f7" : "#1e293b"} 
                      strokeWidth={selectedPeripheralId === "printer" ? "2" : "1.2"} 
                    />
                    <rect x="387" y="140" width="50" height="20" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    <rect x="390" y="184" width="44" height="15" rx="1" fill="#f8fafc" />
                    <text x="412" y="131" fill={selectedPeripheralId === "printer" ? "#c084fc" : "#64748b"} fontSize="6px" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DRUKARKA (USB)</text>
                  </g>
                </svg>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/85 rounded-xl p-3 flex items-center space-x-2 text-[11px] text-slate-400 z-10 font-sans">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Kliknij elementy na biurku lub przyciski po prawej stronie, aby przeanalizować ich specyfikację.</span>
              </div>
            </div>
          </div>

          {/* Details Screen (Right panel) */}
          <div className="lg:col-span-6 flex flex-col h-full min-h-0 space-y-4">
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-2 md:p-3 flex space-x-2 overflow-x-auto shadow-md shrink-0">
              {PC_PERIPHERALS.map((p) => {
                const isSelected = p.id === selectedPeripheralId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPeripheralId(p.id)}
                    className={`py-2 px-3.5 rounded-xl font-bold text-xs shrink-0 flex items-center space-x-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        : "bg-slate-950/35 text-slate-450 hover:text-slate-200 border border-slate-850"
                    }`}
                  >
                    {renderIcon(p.iconName, "w-4 h-4")}
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPeripheral.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-2xl h-full flex flex-col justify-between overflow-y-auto"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-950/30 border border-cyan-500/30">
                          {renderIcon(selectedPeripheral.iconName, "w-4 h-4 text-cyan-400")}
                        </div>
                        <h3 className="text-sm font-bold text-slate-100">{selectedPeripheral.name}</h3>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">Rola i funkcjonalność</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedPeripheral.role}</p>
                    </div>

                    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center font-mono">
                        <Cable className="w-3.5 h-3.5 mr-1 text-cyan-400 shrink-0" />
                        Technika połączenia i specyfikacja kabla:
                      </h4>
                      <p className="text-xs text-cyan-300 leading-relaxed font-mono">{selectedPeripheral.connectionType}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 font-mono">Kluczowe Parametry:</h4>
                      <ul className="space-y-1.5 font-sans">
                        {selectedPeripheral.specs.map((spec, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-cyan-400 shrink-0 mt-1">▪</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DYNAMIC SPECIFICATIONS LINKING (SPEC LIVE) */}
                    <div className="p-4 border rounded-xl border-slate-800/60 bg-slate-950/30 space-y-3.5" id="peripheral-dynamic-specs">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-800/40">
                        <h4 className="text-[10.5px] font-bold uppercase tracking-wider flex items-center text-cyan-400">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                          Dynamiczne Linkowanie Specyfikacji (LIVE)
                        </h4>
                        <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                          SPECS LOOKUP
                        </span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-400">
                        Wyszukaj parametry rzeczywistych modeli peryferiów na żywo. Ta metoda nie wymaga aktualizacji bazy programu.
                      </p>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Popularne modele:</label>
                        {getPresetsForPeripheral(selectedPeripheral.id).length > 0 && (
                          <div className="grid grid-cols-2 gap-1.5">
                            {getPresetsForPeripheral(selectedPeripheral.id).map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => {
                                  setSelectedPreset(preset);
                                  setCustomModel(preset);
                                }}
                                className={`px-2 py-1.5 rounded-lg text-[10px] font-sans font-medium text-left truncate border transition-all cursor-pointer ${
                                  selectedPreset === preset
                                    ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-300"
                                    : "bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 text-slate-400"
                                }`}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={customModel}
                            onChange={(e) => {
                              setCustomModel(e.target.value);
                              setSelectedPreset("");
                            }}
                            placeholder="Wpisz własny model..."
                            className="w-full px-3 py-2 rounded-xl text-xs outline-none border bg-slate-950 border-slate-800/80 focus:border-cyan-500/30 focus:ring-cyan-500/30 text-white placeholder-slate-500"
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

                      {customModel.trim() && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Szukaj w bazie dla "{customModel}":</span>
                          <div className="flex flex-col gap-1.5">
                            {getSpecsUrlsForPeripheral(selectedPeripheral.id, customModel).map((lnk, idx) => (
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
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 shrink-0">
                    <div className="bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 rounded-xl p-3.5 flex items-start space-x-3 text-xs leading-relaxed text-slate-300">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-bold font-mono">i</div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-[10px] uppercase tracking-wide mb-0.5">Rada eksperta</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{selectedPeripheral.tip}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        /* Evolution and Knowledge Base Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="evo-tab-root">
          {/* Sub-navigation side controls */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-3 shadow-md flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
              <button
                onClick={() => setEvolutionTab("connectors")}
                className={`flex-1 text-left p-3 rounded-xl font-bold text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                  evolutionTab === "connectors"
                    ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                    : "bg-slate-950/35 border border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Porty i Klasy Wtyczek</span>
              </button>

              <button
                onClick={() => setEvolutionTab("media")}
                className={`flex-1 text-left p-3 rounded-xl font-bold text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                  evolutionTab === "media"
                    ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                    : "bg-slate-950/35 border border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Media Transmisyjne</span>
              </button>

              <button
                onClick={() => setEvolutionTab("internal")}
                className={`flex-1 text-left p-3 rounded-xl font-bold text-xs flex items-center space-x-2.5 transition-all cursor-pointer ${
                  evolutionTab === "internal"
                    ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                    : "bg-slate-950/35 border border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Gniazda i Sloty Płyty</span>
              </button>
            </div>

            {/* List group based on subtab */}
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-4 shadow-xl flex-1 max-h-[460px] overflow-y-auto">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">
                {evolutionTab === "connectors" 
                  ? "Katalog Złączy i Portów" 
                  : evolutionTab === "media" 
                    ? "Zestawienie Mediów" 
                    : "Gniazda i Sloty Płyty"}
              </h4>

              {evolutionTab === "connectors" ? (
                <div className="flex flex-col space-y-1.5 font-sans">
                  {CONNECTORS.map((c) => {
                    const active = c.id === selectedConnectorId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedConnectorId(c.id)}
                        className={`text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                          active
                            ? "border-cyan-500/40 bg-cyan-950/20 text-cyan-400 font-bold"
                            : "border-transparent text-slate-400 hover:bg-slate-950/60 hover:text-slate-200"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 uppercase tracking-wider font-mono">{c.cat}</span>
                      </button>
                    );
                  })}
                </div>
              ) : evolutionTab === "media" ? (
                <div className="flex flex-col space-y-1.5 font-sans">
                  {MEDIA.map((m) => {
                    const active = m.id === selectedMediumId;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMediumId(m.id)}
                        className={`text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                          active
                            ? "border-cyan-500/40 bg-cyan-950/20 text-cyan-400 font-bold"
                            : "border-transparent text-slate-400 hover:bg-slate-950/60 hover:text-slate-200"
                        }`}
                      >
                        <span>{m.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col space-y-1.5 font-sans">
                  {INTERNAL_SOCKETS.map((s) => {
                    const active = s.id === selectedInternalId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedInternalId(s.id)}
                        className={`text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                          active
                            ? "border-cyan-500/40 bg-cyan-950/20 text-cyan-400 font-bold"
                            : "border-transparent text-slate-400 hover:bg-slate-950/60 hover:text-slate-200"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 uppercase tracking-wider font-mono">{s.catLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right dynamic panel depending on evolution tab values */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {evolutionTab === "connectors" ? (
                <motion.div
                  key={selectedConnector.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col h-full justify-between gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Art Representation and Base Specifications */}
                    <div className="space-y-4">
                      {renderConnectorArt(selectedConnector.id)}

                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900/60">
                        <h4 className="text-[10px] font-bold text-slate-550 uppercase tracking-wider mb-2.5 font-mono">Karta Parametrów Złącza:</h4>
                        <div className="grid grid-cols-2 gap-3.5 font-mono text-[11px] text-slate-400">
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550">Rok Debiutu:</p>
                            <p className="font-bold text-slate-250 mt-0.5">{selectedConnector.year}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550 font-sans">Liczba pinów / styków:</p>
                            <p className="font-bold text-slate-250 mt-0.5">{selectedConnector.pins}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550">Typ Sygnału:</p>
                            <p className="font-bold text-slate-250 mt-0.5 truncate" title={selectedConnector.signal}>{selectedConnector.signal}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550 font-sans">Maksymalny Transfer:</p>
                            <p className="font-bold text-cyan-450 mt-0.5" title={selectedConnector.speed}>{selectedConnector.speed}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg col-span-2">
                            <p className="text-[8px] text-slate-550 font-sans">Napięcie pracy / Prąd:</p>
                            <p className="font-bold text-amber-500 mt-0.5">{selectedConnector.volt}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evolutionary Timeline Information blocks */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/40">
                          ID podzespołu: {selectedConnector.id.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-extrabold text-white mt-2 leading-none">{selectedConnector.name}</h3>
                        <p className="text-xs text-slate-350 leading-relaxed mt-2.5 italic font-sans">{selectedConnector.desc}</p>
                      </div>

                      <div className="border-t border-slate-900 pt-3 space-y-3 font-sans text-xs">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono">Ewolucyjny Kamień Milowy:</h4>
                        
                        <div className="space-y-2">
                          <div className="p-2.5 bg-red-950/10 border border-red-900/10 rounded-lg">
                            <p className="text-[9px] font-bold text-red-400 font-mono">1. STAN DAWNY (RETRO):</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">{selectedConnector.retro}</p>
                          </div>

                          <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-lg">
                            <p className="text-[9px] font-bold text-slate-450 font-mono">2. OKRES PRZEJŚCIOWY:</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">{selectedConnector.mid}</p>
                          </div>

                          <div className="p-2.5 bg-emerald-950/15 border border-emerald-900/15 rounded-lg animate-pulse" style={{ animationDuration: '3s' }}>
                            <p className="text-[9px] font-bold text-emerald-400 font-mono">3. ROZWIĄZANIE WSPÓŁCZESNE:</p>
                            <p className="text-slate-300 text-[11px] mt-0.5">{selectedConnector.modern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interaktywny schemat wyprowadzeń (Pinout) */}
                  <PinoutViewer connectorId={selectedConnector.id} />

                  <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center border-t border-slate-900 pt-3">
                    <span className="flex items-center"><Info className="w-3 h-3 text-cyan-400 mr-1 shrink-0" /> Wybierz inne złącze z panelu po lewej stronie, aby przeanalizować ich budowę fizyczną oraz elektryczną.</span>
                    <span className="text-cyan-500">Model Standard IEEE/VGA/EIA</span>
                  </div>
                </motion.div>
              ) : evolutionTab === "media" ? (
                /* Transmission Media detail view */
                <motion.div
                  key={selectedMedium.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col h-full justify-between gap-6"
                >
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/40">
                        Medium: {selectedMedium.id.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1.5 font-sans">{selectedMedium.name}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">{selectedMedium.desc}</p>
                    </div>

                    {/* Interactive Parameter gauges / bars */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">Właściwości Fizyczne Sygnału:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Szybkość i Przepustowość fali:</span>
                            <span className="text-cyan-400">{selectedMedium.bandwidth}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedMedium.bandwidth}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Niskie Opóźnienie (Latency):</span>
                            <span className="text-cyan-400">{selectedMedium.latency}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedMedium.latency}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Odporność na zakłócenia (EMI):</span>
                            <span className="text-amber-400">{selectedMedium.resistance}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedMedium.resistance}%` }} />
                          </div>
                        </div>

                        <div className="p-2 border border-slate-900 rounded-lg flex flex-col justify-center bg-slate-900/20 font-mono">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">Zasada działania:</span>
                            <span className="text-slate-300 font-sans truncate">{selectedMedium.speed}</span>
                          </div>
                          <div className="flex justify-between text-[10px] mt-1">
                            <span className="text-slate-500">Maksymalny Zasięg:</span>
                            <span className="text-slate-300 font-sans">{selectedMedium.range}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Side Pros & Cons analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide mb-2 flex items-center font-mono">
                          <Check className="w-4 h-4 mr-1 text-emerald-400 shrink-0" />
                          Zalety technologii:
                        </h4>
                        <ul className="space-y-1.5 text-slate-300">
                          {selectedMedium.pros.map((p, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-xl">
                        <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-2 flex items-center font-mono">
                          <X className="w-4 h-4 mr-1 text-red-400 shrink-0" />
                          Ograniczenia / Wady:
                        </h4>
                        <ul className="space-y-1.5 text-slate-300">
                          {selectedMedium.cons.map((c, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-red-500 mt-0.5 shrink-0">✘</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Interactive Categories & Standards Section */}
                    <div className="bg-slate-950/70 border border-slate-900 p-4 rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                        <div className="flex items-center space-x-2">
                          <Sliders className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                            {selectedMedium.categoriesTitle}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
                          {selectedMedium.categories.length} Klasy / Generacje
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
                        {selectedMedium.categories.map((cat, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 p-3.5 rounded-xl transition-all space-y-2 group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-bold text-slate-100 text-xs font-mono group-hover:text-cyan-300 transition-colors">
                                {cat.name}
                              </h5>
                              <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded shrink-0">
                                {cat.badge}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-slate-400 border-y border-slate-800/60 py-1.5">
                              <span className="text-amber-400">{cat.freqOrBand}</span>
                              <span className="text-slate-600">|</span>
                              <span className="text-emerald-400">Szybkość: {cat.maxSpeed}</span>
                              {cat.maxRange && (
                                <>
                                  <span className="text-slate-600">|</span>
                                  <span className="text-slate-300">Zasięg: {cat.maxRange}</span>
                                </>
                              )}
                            </div>

                            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                              {cat.description}
                            </p>

                            <div className="text-[9px] font-mono text-slate-500 flex items-center justify-between pt-1">
                              <span>Standard: <strong className="text-slate-400">{cat.standards}</strong></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shielding / Frequency Bands / Fiber Types Section */}
                    <div className="bg-slate-950/50 border border-slate-900/80 p-4 rounded-xl space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center">
                        <Cable className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                        {selectedMedium.shieldingOrTypesTitle}:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
                        {selectedMedium.shieldingOrTypes.map((st, i) => (
                          <div key={i} className="bg-slate-900/40 border border-slate-850 p-3 rounded-lg space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-200 text-[11px] font-mono">{st.name}</span>
                              <span className="text-[9px] font-mono text-amber-400/90 bg-amber-950/40 border border-amber-900/30 px-1.5 py-0.5 rounded">{st.tag}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal">{st.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center border-t border-slate-900 pt-3">
                    <span className="flex items-center"><Info className="w-3 h-3 text-cyan-400 mr-1" /> Fizyka medium definiuje dopuszczalną przepustowość w złączach.</span>
                    <span className="text-cyan-500">Fale kablowe, fotonowe i radiowe</span>
                  </div>
                </motion.div>
              ) : (
                /* Motherboard Sockets and Internal Connectors detail view */
                <motion.div
                  key={selectedInternalSocket.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col h-full justify-between gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Visual Art Representation and Base Specifications */}
                    <div className="space-y-4">
                      {renderInternalSocketArt(selectedInternalSocket.id)}

                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900/60">
                        <h4 className="text-[10px] font-bold text-slate-550 uppercase tracking-wider mb-2.5 font-mono">Parametry techniczne:</h4>
                        <div className="grid grid-cols-2 gap-3.5 font-mono text-[11px] text-slate-400">
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550">Okres stosowania:</p>
                            <p className="font-bold text-slate-250 mt-0.5">{selectedInternalSocket.year}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550 font-sans">Liczba styków/pinów:</p>
                            <p className="font-bold text-slate-250 mt-0.5">{selectedInternalSocket.pins}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550">Typ sygnału:</p>
                            <p className="font-bold text-slate-250 mt-0.5 truncate" title={selectedInternalSocket.signal}>{selectedInternalSocket.signal}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg">
                            <p className="text-[8px] text-slate-550 font-sans">Maks. przepustowość:</p>
                            <p className="font-bold text-cyan-450 mt-0.5" title={selectedInternalSocket.speed}>{selectedInternalSocket.speed}</p>
                          </div>
                          <div className="p-2 border border-slate-900 rounded-lg col-span-2">
                            <p className="text-[8px] text-slate-550 font-sans">Typowe napięcia zasilania:</p>
                            <p className="font-bold text-amber-500 mt-0.5">{selectedInternalSocket.volt}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evolutionary Timeline Information blocks */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-800/40">
                          ID elementu płyty: {selectedInternalSocket.id.toUpperCase()}
                        </span>
                        <h3 className="text-xl font-extrabold text-white mt-2 leading-none">{selectedInternalSocket.name}</h3>
                        <p className="text-xs text-slate-350 leading-relaxed mt-2.5 italic font-sans">{selectedInternalSocket.desc}</p>
                      </div>

                      <div className="border-t border-slate-900 pt-3 space-y-3 font-sans text-xs">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono">Porównanie ewolucyjne (Przeszłość vs Teraźniejszość):</h4>
                        
                        <div className="space-y-2">
                          <div className="p-2.5 bg-red-950/10 border border-red-900/10 rounded-lg">
                            <p className="text-[9px] font-bold text-red-400 font-mono">1. KIEDYŚ (RETRO):</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">{selectedInternalSocket.retro}</p>
                          </div>

                          <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-lg">
                            <p className="text-[9px] font-bold text-slate-450 font-mono">2. OKRES PRZEJŚCIOWY:</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">{selectedInternalSocket.mid}</p>
                          </div>

                          <div className="p-2.5 bg-emerald-950/15 border border-emerald-900/15 rounded-lg animate-pulse" style={{ animationDuration: '3s' }}>
                            <p className="text-[9px] font-bold text-emerald-400 font-mono">3. DZIŚ (NOWOCZESNE):</p>
                            <p className="text-slate-300 text-[11px] mt-0.5">{selectedInternalSocket.modern}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center border-t border-slate-900 pt-3">
                    <span className="flex items-center"><Info className="w-3 h-3 text-cyan-400 mr-1 shrink-0" /> Wybierz inne gniazdo wewnętrzne z listy po lewej stronie, aby sprawdzić jego specyfikację.</span>
                    <span className="text-cyan-500">Katalog Standardów ATX/PCIe/NVMe</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
