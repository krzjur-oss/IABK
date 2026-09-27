import React, { useState } from "react";
import PeripheralTimeline from "./PeripheralTimeline";
import {
  History,
  Hourglass,
  Scale,
  Cpu,
  RotateCw,
  Server,
  Database,
  ArrowRight,
  Info,
  Sparkles,
  Layers,
  ChevronRight,
  Zap,
  Play,
  Hammer,
  HelpCircle,
  Plus,
  Minus,
  Terminal,
  Smartphone,
  ShieldCheck,
  Code,
  Monitor,
  FolderTree,
  Check,
  Laptop,
  Command,
  Award,
  Radio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Era {
  id: string;
  year: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  architectureDetails: {
    title: string;
    flow: string[];
    description: string;
  };
  specs: {
    clockSpeed: string;
    memorySize: string;
    techMedium: string;
    perfIndicator: string;
  };
  curiosity: string;
}

const ERAS: Era[] = [
  {
    id: "abacus",
    year: "ok. 2700 p.n.e.",
    name: "Abakus (Liczydło)",
    subtitle: "Pierwsze mechaniczne wsparcie pamięci i obliczeń",
    icon: Hourglass,
    description: "Starożytne narzędzie obliczeniowe oparte na przesuwanych koralikach. Służyło do wykonywania dodawania, odejmowania, a nawet mnożenia i dzielenia na systemach pozycyjnych przed wynalezieniem cyfr arabskich i zera w Europie.",
    architectureDetails: {
      title: "Zasada fizycznego kodowania wartości",
      flow: ["Rama trzymająca", "Rzędy dziesiętne", "Koraliki jednostek (1)", "Koraliki piątek (5)"],
      description: "Przesunięcie koralika do środkowej poprzeczki aktywuje jego wartość w danym rzędzie dziesiętnym (jedności, dziesiątki, setki)."
    },
    specs: {
      clockSpeed: "Manualna (~1-2 Hz)",
      memorySize: "Stan rejestru chwilowego (kilka rzędów cyfr)",
      techMedium: "Drewno, drut, koraliki ze stopu gliny lub kości",
      perfIndicator: "Zależna od palców operatora"
    },
    curiosity: "W 1946 roku w Tokio odbył się słynny pojedynek między japońskim mistrzem abakusa (Suanpan) a amerykańskim żołnierzem obsługującym nowoczesny kalkulator elektryczny. Abakus wygrał w 4 z 5 konkurencji obliczeniowych!"
  },
  {
    id: "pascaline",
    year: "1642 r.",
    name: "Pascalina Blaise'a Pascala",
    subtitle: "Kalkulator z automatycznym przeniesieniem nadmiaru",
    icon: RotateCw,
    description: "Pierwszy w pełni sprawny kalkulator mechaniczny stworzony przez Blaise'a Pascala dla ułatwienia pracy jego ojcu - poborcy podatkowemu. Maszyna automatycznie przenosiła dziesiątki na sąsiednie koła zębate.",
    architectureDetails: {
      title: "Architektura kół sprzężonych grawitacyjnie",
      flow: ["Tarcze nastawcze", "Koła zębate 10-pozycyjne", "Mechanizm SAUTOIRE (zapadka)", "Bębny wyświetlające wynik"],
      description: "Kluczowym elementem była opadająca grawitacyjnie dźwignia SAUTOIRE. Gdy koło obracało się z 9 na 0, dźwignia opadała i popychała sąsiednie koło dziesiątek o 1 pozycję w przód."
    },
    specs: {
      clockSpeed: "Manualna korba (~0.5 Hz)",
      memorySize: "Tylko akumulator wyniku (6-8 cyfr)",
      techMedium: "Mosiądz, brąz, koła zębate z bolcami",
      perfIndicator: "Tylko proste sumy i różnice"
    },
    curiosity: "Pascalina posiadała specjalny mechanizm bębnów z dwoma rzędami cyfr - jeden na potrzeby dodawania, a drugi (będący dopełnieniem do 9) używany przy odejmowaniu metodą dopełnień, gdyż koła mogły kręcić się tylko w jedną stronę."
  },
  {
    id: "babbage",
    year: "1837 r.",
    name: "Maszyna Analityczna Babbage'a",
    subtitle: "Mechaniczny protoplasta nowoczesnej architektury CPU/RAM",
    icon: History,
    description: "Rewolucyjny projekt Charlesa Babbage'a, który jako pierwszy na świecie rozdzielił jednostkę obliczeniową od pamięci. Angielska matematyczka Ada Lovelace napisała na nią pierwszy program komputerowy badający liczby Bernoullego.",
    architectureDetails: {
      title: "Konstrukcja rozproszona Babbage'a",
      flow: ["Młyn (Procesor ALU)", "Magazyn (Pamięć RAM z kół)", "Karty perforowane (Kod)", "Drukarka / Rysik mosiężny"],
      description: "Maszyna miała być zasilana silnikiem parowym. Posiadała pętle warunkowe, instrukcje skoku oraz pamięć magazynującą do 1000 liczb pięćdziesięciocyfrowych na kolumnach kół zębatych."
    },
    specs: {
      clockSpeed: "Napęd parowy (~1-3 Hz)",
      memorySize: "1000 słów rejestrowych (50-cyfrowych)",
      techMedium: "Stale, mosiądze, koła pasowe, karty żakardowe",
      perfIndicator: "Koncepcyjnie Turing-kompletna"
    },
    curiosity: "Maszyna nigdy nie została w pełni ukończona za życia twórcy ze względu na brak funduszy i zbyt małą tolerancję dokładności ówczesnych obrabiarek mechanicznych. Dopiero w 1991 r. zbudowano działającą Maszynę Różnicową według jego planów."
  },
  {
    id: "eniac",
    year: "1945 r.",
    name: "ENIAC & Schemat von Neumanna",
    subtitle: "Pierwszy w pełni elektroniczny cyfrowy gigant",
    icon: Server,
    description: "Elektroniczny integrator i kalkulator numeryczny o wadze 27 ton. Konstrukcja udowodniła niezwykłą prędkość lamp próżniowych. W tym okresie John von Neumann opracował architekturę stosowaną do dziś.",
    architectureDetails: {
      title: "Konstrukcja Von Neumanna (Wspólna szyna)",
      flow: ["Wspólna pamięć dla kodu/danych", "Jednostka Kontrolna (CU)", "Aparaty arytmetyczne (ALU)", "Rejestr Akumulatora"],
      description: "W przeciwieństwie do wcześniejszych maszyn, architektura von Neumanna przechowuje instrukcje programu i dane użytkownika w tej samej przestrzeni adresowej pamięci RAM."
    },
    specs: {
      clockSpeed: "100 kHz (Taktowanie impulsowe)",
      memorySize: "20 rejestrów dziesiętnych (Eniac), ok. 1-4 KB RAM",
      techMedium: "18 800 Lamp elektronowych (triod), kable krosowe",
      perfIndicator: "5 000 dodawań na sekundę"
    },
    curiosity: "Programowanie ENIAC-a początkowo nie odbywało się poprzez pisanie kodu, lecz dosłowne przełączanie setek kabli krosowniczych oraz ustawianie tysięcy przełączników na panelach ściennych. Prace te wykonywały głównie genialne programistki."
  },
  {
    id: "k-202",
    year: "1971 r.",
    name: "K-202 (Jacek Karpiński)",
    subtitle: "Pionierski polski minikomputer wyprzedzający epokę o dekadę",
    icon: Cpu,
    description: "Rewolucyjny 16-bitowy minikomputer modułowy skonstruowany przez zespół inż. Jacka Karpińskiego przy współpracy z brytyjskimi przedsiębiorstwami Data-Loop i MB Metals. Dzięki przełomowej koncepcji stronicowania pamięci logicznej (tzw. bank switching) K-202 potrafił teoretycznie zaadresować aż 8 MB pamięci operacyjnej w czasach, gdy światowe minikomputery tej klasy były ograniczone do zaledwie 64 KB.",
    architectureDetails: {
      title: "Adresowanie stronicowane (Bank Switching) i magistrala asynchroniczna",
      flow: ["Słowo 16-bitowe", "Rejestr banku pamięci", "Stronicowanie RAM (Bank Switching)", "Magistrala asynchroniczna"],
      description: "Jacek Karpiński podzielił przestrzeń adresową na 64 dynamiczne strony (banki) po 64 KB każda. K-202 tłumaczył 16-bitowy adres logiczny na 23-bitowy adres fizyczny magistrali pamięci ferrytowej. Ponadto jednostka centralna pracowała w trybie asynchronicznym — taktowanie automatycznie dostosowywało się do szybkości podłączonych modułów pamięci i peryferiów."
    },
    specs: {
      clockSpeed: "Taktowanie asynchroniczne (~1.5 MHz)",
      memorySize: "Do 8 MB (teoretycznie, bloki ferrytowe po 64 KB)",
      techMedium: "Krajowe i zachodnie układy scalone TTL (MSI), pamięć ferrytowa rdzeniowa",
      perfIndicator: "Ok. 1 000 000 operacji na sekundę (1 MIPS)"
    },
    curiosity: "K-202 był tak kompaktowy, że mieścił się w standardowej walizce podróżnej, a przy tym przewyższał mocą obliczeniową ówczesne amerykańskie minikomputery PDP-11. Niestety, w realiach PRL z przyczyn politycznych i zawiści partyjnych decydentów produkcję przerwano po zaledwie ok. 30 egzemplarzach, a Jacka Karpińskiego zmuszono do pracy przy hodowli trzody chlewnej."
  },
  {
    id: "polish-computers",
    year: "Lata 70. i 80. XX w.",
    name: "Polskie komputery: Odra i Meritum",
    subtitle: "Od potężnych maszyn szafowych Elwro po pierwszy szkolny mikrokomputer",
    icon: Terminal,
    description: "Wrocławskie Zakłady Elektroniczne Mera-Elwro stworzyły legendarną rodzinę komputerów Odra (szczególnie modele 1304, 1305 i 1325), które przez dziesięciolecia stanowiły fundament polskiego przemysłu, bankowości i kolei (PKP). W 1983 roku Zakłady Mera-Błonie i Elwro wprowadziły Meritum — pierwszy polski seryjny mikrokomputer osobisty przeznaczony do edukacji w szkołach.",
    architectureDetails: {
      title: "Architektura szafowa Odra 1300 i mikrokomputerowa Meritum",
      flow: ["Pulpit operatorski z kluczami", "Procesor ze scalakami TTL", "Pamięć rdzeniowa ferrytowa / RAM dynamiczny", "Peryferia (taśmy perforowane, magnetofon)"],
      description: "Odra 1305 pracowała na 24-bitowym słowie maszynowym i była kompatybilna z brytyjskim systemem ICL 1900 oraz zaawansowanym systemem operacyjnym George 3. Z kolei mikrokomputer Meritum (oparty na 8-bitowym procesorze U880D/Z80) zintegrował klawiaturę, 16–64 KB pamięci RAM, język BASIC w pamięci ROM oraz wejście magnetofonowe do zapisu programów na kasetach audio."
    },
    specs: {
      clockSpeed: "Odra 1305: ~1.5 MHz | Meritum: 2.5 MHz (U880D)",
      memorySize: "Odra: 32–256 kSłów (24-bit) | Meritum: 16–64 KB RAM",
      techMedium: "Pakiety logiczne TTL, pamięć ferrytowa, czytniki taśmy, kasety magnetofonowe",
      perfIndicator: "Odra: ~250 000 operacji/s | Meritum: 8-bit mikrokomputer"
    },
    curiosity: "Komputery Odra 1305 słynęły z legendarnej wręcz niezawodności — ostatnia pracująca komercyjnie Odra 1305 na stacji rozrządowej PKP Wrocław Brochów została wyłączona ze służby dopiero 30 kwietnia 2010 roku, po ponad 30 latach ciągłej pracy! Z kolei Meritum zapoczątkował edukację informatyczną dla tysięcy polskich uczniów."
  },
  {
    id: "ibm-pc",
    year: "1981 r.",
    name: "IBM PC 5150",
    subtitle: "Początek ery modularnych komputerów osobistych",
    icon: Cpu,
    description: "Premiera kultowego komputera IBM PC 5150 zdefiniowała architekturę składanego komputera osobistego. Zamiast zamkniętej konstrukcji, IBM zastosował system slotów rozszerzeń ISA oraz ogólnodostępne chipy od Intel i Microsoft.",
    architectureDetails: {
      title: "Modularna budowa szynowa (ISA)",
      flow: ["Płyta główna (Motherboard)", "Procesor Intel 8088", "Gniazda kart rozszerzeń (ISA)", "Zasilacz impulsowy w obudowie"],
      description: "Użytkownik mógł dokupić oddzielną kartę graficzną (MDA/CGA), kontroler dyskietek i zainstalować je w gnieździe płyty głównej. Standard zapoczątkował kompatybilność IBM-PC."
    },
    specs: {
      clockSpeed: "4.77 MHz (Procesor Intel 8088)",
      memorySize: "16 KB do 640 KB pamięci RAM",
      techMedium: "Układy scalone LSI, dyskietki 5.25 cala, płyta epoksydowa",
      perfIndicator: "0.25 MIPS (Milion instrukcji/s)"
    },
    curiosity: "Inżynierowie IBM zbudowali ten model w zaledwie rok z gotowych rynkowo podzespołów, ponieważ zarząd nie wierzył w rentowność małych komputerów biurowych. Ten 'eksperyment' zmienił bieg historii domowej technologii."
  },
  {
    id: "modern-pc",
    year: "Współczesność",
    name: "Współczesny Komputer PC x86-64",
    subtitle: "Równoległe przetwarzanie, krzemowa integracja SoC i NVMe",
    icon: Sparkles,
    description: "Obecna zintegrowana konstrukcja oparta na mikronowych litografiach półprzewodnikowych. Wielordzeniowe procesory wykonują miliardy operacji na sekundę, współpracując z pamięcią maszynową SSD PCI Express oraz wyspecjalizowanymi akceleratorami AI/GPU.",
    architectureDetails: {
      title: "Architektura warstwowa z kontrolerami zintegrowanymi",
      flow: ["Rdzenie procesora (CPU)", "Kontroler pamięci wbudowany", "Magistrala PCI-Express Gen 5", "Kości pamięci SSD 3D NAND"],
      description: "Większość kluczowych komponentów dawnej płyty głównej (jak mostek północny) została przeniesiona bezpośrednio do struktury procesora (system SoC / APU), maksymalizując prędkość przepływu danych."
    },
    specs: {
      clockSpeed: "3.5 GHz - 5.7 GHz+ (Wielordzeniowe)",
      memorySize: "16 GB - 128 GB+ DDR5 (SSD o pojemności TB)",
      techMedium: "Tranzystory FinFET 3nm, płytki wielowarstwowe",
      perfIndicator: "Ponad 100 000 000 MIPS"
    },
    curiosity: "Współczesny smartfon noszony w kieszeni ma około milion razy większą pamięć i jest miliardy razy szybszy niż komputery NASA kierujące misją Apollo 11 na Księżyc w 1969 roku!"
  }
];

interface ComponentMilestone {
  era: string;
  name: string;
  specs: string;
  tech: string;
  impact: string;
  perfValue: number;
}

interface ComponentTypeData {
  name: string;
  description: string;
  metricLabel: string;
  metricUnit: string;
  icon: React.ElementType;
  milestones: ComponentMilestone[];
}

const COMPONENT_EVOLUTION: Record<string, ComponentTypeData> = {
  cpu: {
    name: "Procesory (CPU)",
    description: "Serce komputera odpowiedzialne za sekwencyjne przetwarzanie instrukcji programu.",
    metricLabel: "Liczba tranzystorów",
    metricUnit: "tranzystorów",
    icon: Cpu,
    milestones: [
      {
        era: "Lata 1971-1974",
        name: "Intel 4004 / 8080",
        specs: "Zegar: 740 kHz | Architektura: 4-bit / 8-bit",
        tech: "Litografia: 10 μm | Tranzystory: 2 300 - 4 500",
        impact: "Pierwsze komercyjne jednoukładowe mikroprocesory na świecie. Początek rewolucji mikrokomputerowej.",
        perfValue: 2300
      },
      {
        era: "Lata 1978-1982",
        name: "Intel 8086 / 286",
        specs: "Zegar: 5 MHz - 12 MHz | Architektura: 16-bit",
        tech: "Litografia: 3 μm - 1.5 μm | Tranzystory: 29 000 - 134 000",
        impact: "Narodziny legendarnej architektury x86, która zdefiniowała standardy PC na kolejne dziesięciolecia.",
        perfValue: 134000
      },
      {
        era: "Lata 1985-1993",
        name: "Intel 386 / 486",
        specs: "Zegar: 16 MHz - 100 MHz | Architektura: 32-bit",
        tech: "Litografia: 1 μm - 0.6 μm | Tranzystory: 275 000 - 1.2 miliona",
        impact: "Wprowadzenie pełnego 32-bitowego trybu chronionego, umożliwiającego sprzętową wielozadaniowość i obsługę nowoczesnych systemów OS.",
        perfValue: 1200000
      },
      {
        era: "Lata 1993-2000",
        name: "Intel Pentium / AMD K6",
        specs: "Zegar: 60 MHz - 1 GHz | Architektura: superskalarna x86",
        tech: "Litografia: 800 nm - 180 nm | Tranzystory: 3.1 miliona - 22 miliony",
        impact: "Pojawienie się potokowości superskalarnej, zintegrowanego koprocesora FPU i pierwszych zestawów instrukcji multimedialnych MMX.",
        perfValue: 22000000
      },
      {
        era: "Lata 2000-2010",
        name: "Pentium 4 / Core 2 Duo",
        specs: "Zegar: 1.4 GHz - 3.8 GHz | Architektura: x86-64 / Wielordzeniowa",
        tech: "Litografia: 130 nm - 45 nm | Tranzystory: 42 miliony - 410 milionów",
        impact: "Wejście w erę 64-bitów, przełamanie bariery 3 GHz, a następnie odejście od pustych megaherców na rzecz architektury wielordzeniowej.",
        perfValue: 410000000
      },
      {
        era: "Lata 2011-2020",
        name: "Intel Core i7 / AMD Ryzen",
        specs: "Zegar: 3.2 GHz - 5.0 GHz | Wielowątkowość: do 16 rdzeni",
        tech: "Litografia: 32 nm - 7 nm FinFET | Tranzystory: 1.1 miliarda - 9.8 miliarda",
        impact: "Niezwykłe zagęszczenie tranzystorów dzięki strukturom 3D FinFET. Integracja kontrolerów RAM, grafiki i PCI-Express na jednym chipie.",
        perfValue: 9800000000
      },
      {
        era: "Współczesność",
        name: "Modern CPU (Intel Core Ultra / AMD Ryzen 9 / Apple M)",
        specs: "Zegar: do 6.2 GHz | Rdzenie: do 24+ hybrydowych (P+E) + NPU",
        tech: "Litografia: 3nm - 2nm (GAAFET) | Tranzystory: 15-100+ miliardów",
        impact: "Architektura hybrydowa łącząca rdzenie wydajne z energooszczędnymi, oraz sprzętowa integracja dedykowanych koprocesorów AI (NPU).",
        perfValue: 100000000000
      }
    ]
  },
  ram: {
    name: "Pamięć RAM",
    description: "Ultraszybka pamięć o dostępie swobodnym służąca jako bezpośredni magazyn roboczy dla CPU.",
    metricLabel: "Maksymalna prędkość transferu danych",
    metricUnit: "MB/s",
    icon: Layers,
    milestones: [
      {
        era: "Lata 1950-1970",
        name: "Pamięć rdzeniowa ferrytowa",
        specs: "Czas dostępu: ~1 - 10 μs | Pojemność: kilka KB",
        tech: "Fizyczne magnetyczne pierścienie ferrytowe nawlekane na druty miedziane",
        impact: "Pierwsza stabilna pamięć o dostępie swobodnym. Niezwykle odporna na promieniowanie, nieulotna, tkana ręcznie.",
        perfValue: 1
      },
      {
        era: "Lata 1970-1985",
        name: "Chipy DRAM (SIPP/SIMM 30-pin)",
        specs: "Czas dostępu: 150 ns - 80 ns | Taktowanie szyny: 4 - 10 MHz",
        tech: "Półprzewodnikowe układy scalone na kościach krzemowych",
        impact: "Przejście na pełną technologię krzemową DRAM. Pojawienie się modułów wtykanych bezpośrednio w płytę główną.",
        perfValue: 10
      },
      {
        era: "Lata 1990-2000",
        name: "FPM / EDO / SDRAM",
        specs: "Czas dostępu: 60 ns - 10 ns | Przepustowość: do 800 MB/s",
        tech: "Moduły SIMM 72-pin i pierwsze DIMM 168-pin (SDR)",
        impact: "Zsynchronizowanie pracy pamięci z zewnętrznym zegarem magistrali systemowej (SDRAM). Drastyczne skrócenie opóźnień.",
        perfValue: 800
      },
      {
        era: "Lata 2000-2010",
        name: "DDR1 / DDR2 / DDR3",
        specs: "Taktowanie: 266 MHz - 2133 MHz | Przepustowość: 2.1 GB/s - 17 GB/s",
        tech: "Moduły DIMM 184-pin i 240-pin | Obniżenie napięć (2.5V do 1.5V)",
        impact: "Przesyłanie danych na rosnącym i opadającym zboczu sygnału zegarowego (Double Data Rate). Narastająca szerokość pasma.",
        perfValue: 17000
      },
      {
        era: "Współczesność",
        name: "DDR4 / DDR5 / CAMM2",
        specs: "Taktowanie: 3200 MHz - 8400+ MHz | Przepustowość: 25 GB/s - 100+ GB/s",
        tech: "On-die ECC (korekcja błędów wewnątrz kości), PMIC (kontrola napięcia na PCB)",
        impact: "Wprowadzenie dwóch niezależnych kanałów na jeden moduł, redukcja napięć do 1.1V, olbrzymia gęstość i prędkości przesyłu.",
        perfValue: 100000
      }
    ]
  },
  gpu: {
    name: "Karty graficzne",
    description: "Układy przeznaczone do masowo równoległych obliczeń renderowania pikseli i geometrii trójwymiarowej.",
    metricLabel: "Moc obliczeniowa zmiennoprzecinkowa",
    metricUnit: "GFLOPS",
    icon: Sparkles,
    milestones: [
      {
        era: "Lata 1981-1989",
        name: "Karty znakowe MDA / CGA / EGA / VGA",
        specs: "Rozdzielczość: od 80x25 znaków (tekst) do 320x200 (4 kolory) i 640x480 (16 kolorów)",
        tech: "Brak akceleracji grafiki. CPU musiał samodzielnie obliczać i wpisywać wartości pikseli do pamięci bufora ramki.",
        impact: "Pierwsze standardy wyświetlania grafiki barwnej i tekstu. Pamięć wideo rzędu 4 KB do 256 KB.",
        perfValue: 0.0001
      },
      {
        era: "Lata 1990-1995",
        name: "Karty SVGA i akceleratory 2D",
        specs: "Rozdzielczość: do 1024x768 (256 kolorów lub True Color) przy dedykowanych układach GUI",
        tech: "Sprzętowe wspomaganie rysowania linii, wypełniania wielokątów oraz przewijania ekranu (BitBLT).",
        impact: "Odciążenie procesora z operacji okienkowych w środowiskach takich jak Windows 95 i systemach CAD.",
        perfValue: 0.01
      },
      {
        era: "Lata 1996-2005",
        name: "Narodziny 3D (3dfx Voodoo / RIVA TNT / GeForce 256)",
        specs: "Przełom: Sprzętowy rendering trójwymiarowy, teksturowanie, Z-Buffer, interfejsy Glide, OpenGL i DirectX",
        tech: "GeForce 256 przyniósł miano 'GPU' integrując silnik transformacji geometrii i oświetlenia (T&L).",
        impact: "Rewolucja w grach komputerowych i profesjonalnych silnikach 3D. Obraz nabrał płynności i realizmu geometrycznego.",
        perfValue: 5
      },
      {
        era: "Lata 2006-2015",
        name: "Zunifikowane Shadery (GeForce G80 / Radeon HD 5000)",
        specs: "Moc: setki rdzeni strumieniowych wykonujących dowolne operacje matematyczne (zamiast sztywnego potoku)",
        tech: "Pojawienie się platform CUDA i OpenCL. Karta graficzna staje się ogólnoużytkowym procesorem matematycznym (GPGPU).",
        impact: "Przeniesienie zaawansowanych obliczeń naukowych, symulacji fizyki i dekodowania wideo bezpośrednio na GPU.",
        perfValue: 1500
      },
      {
        era: "Współczesność",
        name: "Karty Ray Tracingu i AI (RTX / RX / Intel Arc)",
        specs: "Prędkości: dziesiątki tysięcy rdzeni CUDA, dedykowane rdzenie Ray Tracing (RT) oraz rdzenie Tensor (AI)",
        tech: "Architektury generujące całe klatki obrazu przy użyciu sztucznej inteligencji (DLSS/FSR frame generation).",
        impact: "Fotorealistyczne oświetlenie śledzenia promieni w czasie rzeczywistym oraz przetwarzanie algorytmów głębokiego uczenia.",
        perfValue: 80000
      }
    ]
  },
  storage: {
    name: "Dyski i Pamięć Masowa",
    description: "Nieulotne urządzenia przechowujące wszystkie dane użytkownika, system operacyjny i pliki po wyłączeniu zasilania.",
    metricLabel: "Prędkość odczytu sekwencyjnego",
    metricUnit: "MB/s",
    icon: Database,
    milestones: [
      {
        era: "Lata 1950-1970",
        name: "Karty perforowane i taśmy magnetyczne",
        specs: "Pojemność: kilka kilobajtów na rolkę | Czas dostępu: od sekund do minut (odczyt liniowy)",
        tech: "Papierowe karty z wycinanymi otworami lub namagnesowane taśmy nawijane na duże szpule",
        impact: "Początki archiwizacji danych. Aby odczytać plik na końcu taśmy, należało przewinąć całą rolkę fizycznie.",
        perfValue: 0.01
      },
      {
        era: "Lata 1970-1995",
        name: "Dyskietki magnetyczne (8\", 5.25\", 3.5\")",
        specs: "Pojemność: 160 KB do 1.44 MB | Prędkość transferu: ~15 - 30 KB/s",
        tech: "Elastyczny krążek z tworzywa sztucznego pokryty tlenkiem żelaza kręcący się wewnątrz plastikowej koperty",
        impact: "Umożliwienie przenoszenia oprogramowania, dystrybucji systemów operacyjnych i zapisywania prac domowych.",
        perfValue: 0.03
      },
      {
        era: "Lata 1980-2010",
        name: "Magnetyczne dyski twarde HDD (IDE/SATA)",
        specs: "Pojemność: 5 MB do kilku TB | Prędkość transferu: 1 MB/s do 150 MB/s",
        tech: "Wirujące szklane lub aluminiowe talerze pokryte warstwą magnetyczną, z ruchomym ramieniem głowicy (5400-7200 RPM)",
        impact: "Standard masowego przechowywania danych. Wprowadzenie interfejsów IDE/PATA, a następnie rewolucyjnego i szybkiego SATA.",
        perfValue: 120
      },
      {
        era: "Lata 2010-2018",
        name: "Dyski półprzewodnikowe SSD SATA III",
        specs: "Pojemność: 64 GB do kilku TB | Prędkość transferu: do 550 MB/s | Czas dostępu: poniżej 0.1 ms",
        tech: "Kości pamięci NAND Flash sterowane mikrokontrolerem, całkowity brak części ruchomych",
        impact: "Ogromny skok w responsywności systemów. Brak opóźnień na mechaniczny ruch głowicy. Wytrzymałość na wstrząsy.",
        perfValue: 550
      },
      {
        era: "Współczesność",
        name: "Dyski SSD NVMe M.2 (PCI Express Gen 4 / 5)",
        specs: "Pojemność: do 8+ TB | Prędkość transferu: od 3500 MB/s do 14 000+ MB/s",
        tech: "Protokół NVMe zoptymalizowany pod pamięci Flash, wpięcie bezpośrednio w linie PCI-Express procesora",
        impact: "Wyciskanie maksimum prędkości z półprzewodników. Błyskawiczny rozruch systemów i gier w ułamki sekund (DirectStorage).",
        perfValue: 14000
      }
    ]
  }
};

/** Interfejs reprezentujący jedną z 5 generacji komputerów */
export interface ComputerGeneration {
  id: string;
  genNumber: string;
  name: string;
  years: string;
  keyTech: string;
  exampleMachine: string;
  description: string;
  icon: React.ElementType;
  memoryTech: string;
  speed: string;
  programming: string;
  dimensionsAndPower: string;
  breakthrough: string;
  polishContribution: string;
  milestones: string[];
  relativeSpeedMultiplier: number;
}

/** 5 Generacji Komputerów: od lamp elektronowych po sztuczną inteligencję */
export const GENERATIONS: ComputerGeneration[] = [
  {
    id: "gen-1",
    genNumber: "I Generacja",
    name: "I Generacja: Lampy Elektronowe",
    years: "1945–1958",
    keyTech: "Lampy elektronowe próżniowe (triody, diody próżniowe)",
    exampleMachine: "ENIAC, UNIVAC I, EDVAC, IBM 701, polski XYZ (1958 r.)",
    description: "Pierwsza generacja w pełni elektronicznych komputerów cyfrowych. Zamiast powolnych przekaźników mechanicznych zastosowano lampy elektronowe działające jako szybkie przełączniki logiczne. Maszyny były kolosalnymi konstrukcjami zajmującymi całe hale, pobierały dziesiątki kilowatów mocy i wymagały ciągłego chłodzenia oraz ręcznej wymiany stale przepalających się lamp próżniowych.",
    icon: Server,
    memoryTech: "Rtęciowe linie opóźniające, lampy Williamsa, pamięci bębnowe magnetyczne",
    speed: "Około 1 000 – 10 000 operacji na sekundę (kHz)",
    programming: "Bezpośredni kod maszynowy (zera i jedynki), przełączniki panelowe i karty perforowane",
    dimensionsAndPower: "Waga do 30 ton, zajmowana powierzchnia do 150 m², zużycie mocy rzędu 50–150 kW",
    breakthrough: "Zastąpienie ruchomych części mechanicznych przepływem elektronów w próżni – tysiąckrotny skok prędkości obliczeń względem kalkulatorów mechanicznych.",
    polishContribution: "XYZ (1958 r.) – pierwszy polski cyfrowy komputer lampowy, skonstruowany przez zespół prof. Leona Łukaszewicza w Warszawie (Instytut Maszyn Matematycznych PAN).",
    milestones: [
      "1945 r. – ENIAC udowadnia wykonalność w pełni elektronicznych obliczeń cyfrowych",
      "1945 r. – John von Neumann publikuje opis architektury ze wspólną pamięcią programu i danych",
      "1951 r. – UNIVAC I staje się pierwszym komercyjnym komputerem seryjnym na świecie",
      "1958 r. – Polski komputer lampowy XYZ wykonuje pierwsze programy w Warszawie"
    ],
    relativeSpeedMultiplier: 1
  },
  {
    id: "gen-2",
    genNumber: "II Generacja",
    name: "II Generacja: Tranzystory Półprzewodnikowe",
    years: "1958–1964",
    keyTech: "Dyskretne tranzystory germanowe i krzemowe",
    exampleMachine: "IBM 7090, IBM 1401, DEC PDP-1, CDC 1604, polska Odra 1003 / UMC-10",
    description: "Kluczowym przełomem było zastąpienie kruchych i gorących lamp próżniowych tranzystorami wynalezionymi w Bell Labs (Shockley, Bardeen, Brattain). Tranzystory były setki razy mniejsze, nie wymagały żarników i pobierały ułamek energii. W tej generacji pojawiła się szybka i trwała pamięć ferrytowa (rdzeniowa) oraz pierwsze języki programowania wysokiego poziomu.",
    icon: Zap,
    memoryTech: "Pamięć rdzeniowa ferrytowa, magnetyczne pamięci taśmowe i dyskowe",
    speed: "Rzędu 100 000 – 500 000 operacji na sekundę (~1 MHz)",
    programming: "Asemblery oraz narodziny pierwszych języków wysokiego poziomu: Fortran, COBOL, Algol",
    dimensionsAndPower: "Wielkość kilku szaf przemysłowych, zużycie mocy zredukowane do kilku kilowatów",
    breakthrough: "Drastyczny wzrost niezawodności – czas bezawaryjnej pracy wzrósł z kilku godzin do setek dni; miniaturyzacja i redukcja wydzielanego ciepła.",
    polishContribution: "Odra 1003 (1963 r.) – seryjnie produkowany we Wrocławskich Zakładach Elektronicznych Elwro komputer tranzystorowy, pracujący m.in. dla polskiego przemysłu i geodezji.",
    milestones: [
      "1954 r. – Texas Instruments produkuje pierwszy komercyjny tranzystor krzemowy",
      "1957 r. – John Backus z IBM tworzy język Fortran, rewolucjonizując pisanie oprogramowania",
      "1959 r. – IBM 1401 staje się najpopularniejszym tranzystorowym komputerem biznesowym świata",
      "1963 r. – Elwro uruchamia seryjną produkcję tranzystorowej Odry 1003 we Wrocławiu"
    ],
    relativeSpeedMultiplier: 100
  },
  {
    id: "gen-3",
    genNumber: "III Generacja",
    name: "III Generacja: Układy Scalone (SSI / MSI)",
    years: "1964–1971",
    keyTech: "Układy scalone małej i średniej skali integracji (SSI i MSI, krzem)",
    exampleMachine: "IBM System/360, DEC PDP-8, Apollo Guidance Computer (AGC), polski K-202, Odra 1305",
    description: "Monolityczna integracja obwodów elektronicznych – umieszczenie dziesiątek, a później setek tranzystorów, diod i rezystorów na jednej krzemowej płytce półprzewodnikowej (Jack Kilby i Robert Noyce). Umożliwiło to standaryzację całych rodzin komputerów (słynna seria IBM/360), narodziny minikomputerów oraz systemów operacyjnych z podziałem czasu procesora.",
    icon: Layers,
    memoryTech: "Gęste matryce pamięci ferrytowej i pierwsze półprzewodnikowe układy scalone RAM (MOS)",
    speed: "Rzędu 1 000 000 – 10 000 000 operacji na sekundę (MIPS)",
    programming: "Zaawansowane systemy operacyjne z wielozadaniowością (OS/360, Multics, wczesny UNIX), języki C, BASIC, Pascal",
    dimensionsAndPower: "Pojawienie się minikomputerów wielkości biurka lub walizki podróżnej (np. K-202, PDP-8)",
    breakthrough: "Integracja wielu elementów w jednym krzemowym obwodzie; miniaturyzacja umożliwiła bezpieczny lot człowieka na Księżyc (komputer pokładowy AGC w misji Apollo 11).",
    polishContribution: "Rewolucyjny minikomputer K-202 Jacka Karpińskiego (o mocy 1 MIPS i 8 MB adresacji stronicowanej) oraz seryjna produkcja wielkich komputerów Odra 1305 w Elwro.",
    milestones: [
      "1964 r. – Premiera rodziny IBM System/360 wprowadzającej ujednolicony bajt 8-bitowy",
      "1965 r. – DEC prezentuje PDP-8, rozpoczynając światową erę minikomputerów laboratoryjnych",
      "1969 r. – Apollo Guidance Computer (AGC) bezpiecznie kieruje lądowaniem człowieka na Księżycu",
      "1971 r. – Jacek Karpiński prezentuje modułowy minikomputer K-202 z adresowaniem 8 MB"
    ],
    relativeSpeedMultiplier: 10000
  },
  {
    id: "gen-4",
    genNumber: "IV Generacja",
    name: "IV Generacja: Mikroprocesory Jednoukładowe (LSI / VLSI)",
    years: "1971–obecnie",
    keyTech: "Mikroprocesory jednoukładowe w wielkiej i ultrawielkiej skali integracji (LSI, VLSI, ULSI)",
    exampleMachine: "Intel 4004/8086, Apple II, IBM PC 5150, Commodore 64, polski Meritum / Elwro 800 Junior",
    description: "Skupienie całej jednostki centralnej (procesora) na jednym mikroskopijnym kawałku krzemu. Doprowadziło to do rewolucji komputerów osobistych (PC), laptopów, a w XXI wieku smartfonów. Zgodnie z Prawem Moore'a liczba tranzystorów rosła wykładniczo – od 2 300 w Intel 4004 do dziesiątek miliardów we współczesnych procesorach wielordzeniowych.",
    icon: Cpu,
    memoryTech: "Półprzewodnikowe pamięci dynamiczne DRAM, pamięci Flash NAND, ultraszybkie dyski SSD NVMe",
    speed: "Od setek tysięcy operacji (1971 r.) do setek miliardów operacji na sekundę (wielordzeniowe procesory GHz)",
    programming: "Graficzne interfejsy użytkownika (GUI: Windows, macOS, Linux), języki wysokopoziomowe i obiektowe (C++, Java, Python, JavaScript, Rust)",
    dimensionsAndPower: "Od kompaktowych obudów biurkowych i ultrabooków po urządzenia mieszczące się w dłoni (smartfony, smartwatche)",
    breakthrough: "Powszechna demokratyzacja technologii – komputer przestał być zarezerwowany dla laboratoriów wojskowych i stał się powszechnym narzędziem każdego człowieka na Ziemi.",
    polishContribution: "Meritum I/II (1983 r.) oraz Elwro 800 Junior (1986 r.) – polskie mikrokomputery osobiste, które wyposażyły setki pracowni szkolnych i wykształciły pokolenie programistów.",
    milestones: [
      "1971 r. – Federico Faggin i Ted Hoff tworzą Intel 4004 – pierwszy komercyjny mikroprocesor",
      "1977 r. – Trójca mikrokomputerowa: Apple II, Commodore PET i TRS-80 trafia pod strzechy",
      "1981 r. – Premiera IBM PC 5150 definiuje standard architektury otwartego komputera domowego",
      "1993 r. – Intel Pentium wprowadza architekturę superskalarną i zestawy multimedialne"
    ],
    relativeSpeedMultiplier: 100000000
  },
  {
    id: "gen-5",
    genNumber: "V Generacja",
    name: "V Generacja: Sztuczna Inteligencja i Przetwarzanie Równoległe",
    years: "Współczesność i Perspektywy",
    keyTech: "Akceleratory tensorowe NPU/TPU, masowo równoległe GPU, układy neuromorficzne i kwantowe (QPU)",
    exampleMachine: "Superkomputery (Frontier, Fugaku), klastry AI (NVIDIA Blackwell, Google TPU), procesory kwantowe (IBM Eagle, Google Sycamore)",
    description: "Przejście od klasycznego, czysto sekwencyjnego przetwarzania von Neumanna do masowo równoległych sieci tensorowych, wnioskowania probabilistycznego oraz zjawisk mechaniki kwantowej. Generacja ta łączy heterogeniczne układy SoC z wbudowanymi jednostkami NPU, hiperskalowe klastry głębokiego uczenia (Deep Learning) oraz komputery kwantowe rozwiązujące w ułamki sekund problemy niemożliwe dla klasycznych maszyn.",
    icon: Sparkles,
    memoryTech: "Stosowe pamięci ultrawysokiej przepustowości HBM3e/HBM4 w technologii 3D, optyczne nośniki danych",
    speed: "Wydajność mierzona w Eksaflopsach (10^18 operacji zmiennoprzecinkowych na sekundę) oraz FLOPS w formatach FP8/FP16",
    programming: "Duże modele językowe (LLM), generatywna AI, biblioteki PyTorch/TensorFlow, języki obliczeń kwantowych (Qiskit, Cirq)",
    dimensionsAndPower: "Od ogromnych serwerowni hiperskalowych (zużywających megawaty czystej energii) po miniaturowe chipy Edge AI w urządzeniach IoT",
    breakthrough: "Maszyny zyskały zdolność rozumienia języka naturalnego, syntezy wiedzy, percepcji multimodalnej i autonomicznego wnioskowania w czasie rzeczywistym.",
    polishContribution: "Polskie superkomputery Helios i Proxima w ACK Cyfronet AGH w Krakowie – plasujące się w ścisłej czołówce najszybszych klastrów obliczeniowych AI w Europie.",
    milestones: [
      "2012 r. – AlexNet zapoczątkowuje rewolucję głębokiego uczenia z wykorzystaniem GPU",
      "2017 r. – Publikacja 'Attention Is All You Need' wprowadza architekturę Transformerów",
      "2022 r. – Frontier przekracza barierę 1 EksaFlopsa, a modele LLM redefiniują pracę człowieka",
      "Dziś – Integracja procesorów kwantowych (QPU) i chipów NPU bezpośrednio w urządzeniach konsumenckich"
    ],
    relativeSpeedMultiplier: 1000000000000
  }
];

export default function ComputerHistory() {
  const [historyTab, setHistoryTab] = useState<"architecture" | "generations" | "components" | "os_evolution" | "peripherals">("architecture");
  const [activeEraId, setActiveEraId] = useState<string>("abacus");
  const selectedEra = ERAS.find((e) => e.id === activeEraId) || ERAS[0];

  // Interactive Abacus state
  const [abacusRows, setAbacusRows] = useState<number[]>([3, 7, 1, 0, 5, 2]); // beads active in columns (representing ones, tens, hundreds, thousands, ten-thousands, etc.)
  const getAbacusValue = () => {
    let sum = 0;
    abacusRows.forEach((val, i) => {
      sum += val * Math.pow(10, i);
    });
    return sum;
  };

  const updateAbacusBead = (rowIndex: number, val: number) => {
    const updated = [...abacusRows];
    updated[rowIndex] = Math.max(0, Math.min(9, val));
    setAbacusRows(updated);
  };

  // Difference Engine simple Simulator state
  const [babbageAccumulator, setBabbageAccumulator] = useState(1);
  const [babbageDifference, setBabbageDifference] = useState(3);
  const [crankTurns, setCrankTurns] = useState(0);
  const [engineLogs, setEngineLogs] = useState<string[]>([
    "Inicjalizacja Maszyny Różnicowej Babbage'a...",
    "Rejestr Akumulatora: f(x) = 1, Rejestr Różnicy: Δ = 3"
  ]);

  const turnBabbageCrank = () => {
    const prevAcc = babbageAccumulator;
    const addition = babbageDifference;
    const newAcc = prevAcc + addition;
    setCrankTurns((prev) => prev + 1);
    setBabbageAccumulator(newAcc);
    setEngineLogs((prev) => [
      ...prev,
      `[Obrót ${crankTurns + 1} v. Korbki]: Dodano różnicę ${addition} do akumulatora. Wynik: ${newAcc}`
    ]);
  };

  const resetBabbageEngine = () => {
    setBabbageAccumulator(1);
    setBabbageDifference(3);
    setCrankTurns(0);
    setEngineLogs(["Maszyna zresetowana do wartości początkowych f(0) = 1."]);
  };

  // von Neumann simple CPU emulator instructions
  const [accumulator, setAccumulator] = useState<number>(0);
  const [ram, setRam] = useState<number[]>([15, 27, 0, 0, 0]); // address 0,1,2,3,4
  const [pc, setPc] = useState<number>(0); // program counter
  const [instructionRegister, setInstructionRegister] = useState<string>("Brak");
  const [cycleLogs, setCycleLogs] = useState<string[]>([
    "Pamięć RAM: [15] w komórce 0, [27] w komórce 1.",
    "Gotowy do demonstracji cyklu rozkazowego (Pobierz -> Zdekoduj -> Wykonaj)."
  ]);

  const executeNextClockCycle = () => {
    let logs = [...cycleLogs];
    
    if (pc === 0) {
      // Step 1: FETCH instruction from RAM to IR (simulated Load Adr 0 to Acc)
      setInstructionRegister("LOAD ADR_0");
      setAccumulator(ram[0]);
      logs.push(`[FETCH & DECODE]: Cykl PC=0. Pobrano rozkaz 'LOAD ADR_0'. Akumulator załadowany wartością: ${ram[0]}`);
      setPc(1);
    } else if (pc === 1) {
      // Step 2: ADD ADR_1 to Acc
      setInstructionRegister("ADD ADR_1");
      const sum = accumulator + ram[1];
      setAccumulator(sum);
      logs.push(`[EXECUTE]: Cykl PC=1. Pobrano rozkaz 'ADD ADR_1'. Wykonano dodawanie ALU: ${accumulator} + ${ram[1]} = ${sum}`);
      setPc(2);
    } else if (pc === 2) {
      // Step 3: STORE result in RAM ADR_2
      setInstructionRegister("STORE ADR_2");
      const updatedRam = [...ram];
      updatedRam[2] = accumulator;
      setRam(updatedRam);
      logs.push(`[STORE BACK]: Cykl PC=2. Pobrano rozkaz 'STORE ADR_2'. Wynik ${accumulator} zapisano trwale w komórce RAM nr 2.`);
      setPc(3);
    } else {
      logs.push("[ZAKOŃCZONO]: Zmiana instrukcji zakończona. Osiągnięto limit programu w pamięci. Zresetuj procesor.");
    }
    setCycleLogs(logs);
  };

  const resetVonNeumann = () => {
    setAccumulator(0);
    setRam([Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1, 0, 0, 0]);
    setPc(0);
    setInstructionRegister("Brak");
    setCycleLogs([
      "Pamięć zainicjalizowana nowymi losowymi danymi.",
      "Rejestr akumulatora wyczyszczony. Gotowy do startu."
    ]);
  };

  return (
    <div className="flex flex-col space-y-8 w-full h-full" id="history-container">
      
      {/* 1. Header Hero section */}
      <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[100px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                Historia Architektury Maszyn Liczących
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5">
              Ewolucja Komputera: Od Abakusa do Współczesnego PC
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Prześledź drogę innowacji technologicznych i koncepcyjnych, które doprowadziły ludzkość od zwykłych
              drewnianych koralików do miliardów tranzystorów działających z częstotliwością gigaherców.
            </p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center space-x-3 self-start md:self-auto">
            <Scale className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-left font-mono">
              <p className="text-[10px] text-slate-500 leading-none">Skok wydajności</p>
              <p className="text-xs font-bold text-slate-200 mt-1">10<sup>11</sup>x szybsze obliczenia</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Sub-tabs Selector for History Tab */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-900/80 gap-2 font-sans">
        <button
          onClick={() => setHistoryTab("architecture")}
          className={`w-full py-3 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
            historyTab === "architecture"
              ? "bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          id="history-tab-architecture"
        >
          <History className="w-4 h-4 animate-duration-1000 shrink-0" />
          <span className="truncate">Oś Czasu (Architektura)</span>
        </button>
        <button
          onClick={() => setHistoryTab("generations")}
          className={`w-full py-3 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
            historyTab === "generations"
              ? "bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          id="history-tab-generations"
        >
          <Layers className="w-4 h-4 animate-duration-1000 shrink-0" />
          <span className="truncate">5 Generacji Komputerów</span>
        </button>
        <button
          onClick={() => setHistoryTab("components")}
          className={`w-full py-3 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
            historyTab === "components"
              ? "bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          id="history-tab-components"
        >
          <Cpu className="w-4 h-4 animate-pulse animate-duration-1000 shrink-0" />
          <span className="truncate">Ewolucja Podzespołów</span>
        </button>
        <button
          onClick={() => setHistoryTab("os_evolution")}
          className={`w-full py-3 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
            historyTab === "os_evolution"
              ? "bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          id="history-tab-os-evolution"
        >
          <Terminal className="w-4 h-4 animate-pulse animate-duration-1000 shrink-0" />
          <span className="truncate">Ewolucja Systemów (OS)</span>
        </button>
        <button
          onClick={() => setHistoryTab("peripherals")}
          className={`w-full py-3 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
            historyTab === "peripherals"
              ? "bg-cyan-950/50 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          id="history-tab-peripherals"
        >
          <Sparkles className="w-4 h-4 animate-duration-1000 shrink-0" />
          <span className="truncate">Oś Czasu Peryferii</span>
        </button>
      </div>

      {historyTab === "peripherals" ? (
        <PeripheralTimeline />
      ) : historyTab === "components" ? (
        <ComponentEvolutionView />
      ) : historyTab === "generations" ? (
        <GenerationsView />
      ) : historyTab === "os_evolution" ? (
        <OSEvolutionView />
      ) : (
        <>
          {/* 2. Interactive Timeline Slider Line */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl shrink-0">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center font-mono">
              <Layers className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Oś Czasu i Kamienie Milowe Ewolucji
            </h3>
        
        {/* Horizontal scroll timeline cards */}
        <div className="flex space-x-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {ERAS.map((era) => {
            const isSelected = era.id === activeEraId;
            const Icon = era.icon;
            return (
              <button
                key={era.id}
                onClick={() => setActiveEraId(era.id)}
                className={`flex-1 min-w-[190px] text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "border-slate-850 bg-[#0A0A0B]/60 hover:border-slate-700 text-slate-300"
                }`}
                id={`timeline-node-${era.id}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-cyan-400" : "text-amber-500"}`}>
                      {era.year}
                    </span>
                    <div className={`p-1 rounded ${isSelected ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-xs leading-tight mt-2 text-slate-100 line-clamp-1">
                    {era.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 leading-normal">
                    {era.subtitle}
                  </p>
                </div>
                <div className="mt-3.5 flex items-center text-[10px] font-bold text-cyan-500/80 group">
                  <span>zbadaj szczegóły</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Era split & Interactive construction visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left pane: Architectural & Physical description (6 cols) */}
        <div className="lg:col-span-6 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/20 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Analiza Architektury Era: {selectedEra.year}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 flex items-center">
                  <selectedEra.icon className="w-5 h-5 mr-2 text-cyan-400" />
                  {selectedEra.name}
                </h3>
                <p className="text-xs text-slate-400 italic mt-0.5">{selectedEra.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-slate-350 leading-relaxed mt-4 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
              {selectedEra.description}
            </p>

            {/* Component block flow visualizer */}
            <div className="mt-5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                {selectedEra.architectureDetails.title}:
              </h4>
              
              <div className="flex items-center flex-wrap gap-1.5 p-3.5 bg-slate-950/80 rounded-xl border border-slate-900">
                {selectedEra.architectureDetails.flow.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-center">
                      <p className="text-[10px] text-slate-400 font-medium">{step}</p>
                    </div>
                    {idx < selectedEra.architectureDetails.flow.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-cyan-500/60 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-normal">
                {selectedEra.architectureDetails.description}
              </p>
            </div>

            {/* Performance Parameters & Specifications Comparison */}
            <div className="mt-6 border-t border-slate-900 pt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Kluczowe Parametry Techniczne:
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900/60">
                  <p className="text-[9px] text-slate-500 leading-none">Taktowanie rzędu</p>
                  <p className="text-[11px] font-bold text-slate-200 mt-1 font-mono break-words whitespace-normal">{selectedEra.specs.clockSpeed}</p>
                </div>
                <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900/60">
                  <p className="text-[9px] text-slate-500 leading-none">Rozmiar Pamięci</p>
                  <p className="text-[11px] font-bold text-slate-200 mt-1 font-mono break-words whitespace-normal">{selectedEra.specs.memorySize}</p>
                </div>
                <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900/60">
                  <p className="text-[9px] text-slate-500 leading-none">Medium Technologiczne</p>
                  <p className="text-[11px] font-bold text-slate-200 mt-1 font-sans break-words whitespace-normal" title={selectedEra.specs.techMedium}>{selectedEra.specs.techMedium}</p>
                </div>
                <div className="p-2.5 bg-slate-950/40 rounded-lg border border-slate-900/60">
                  <p className="text-[9px] text-slate-500 leading-none">Zdolność obliczeniowa</p>
                  <p className="text-[11px] font-bold text-cyan-400 mt-1 font-mono break-words whitespace-normal">{selectedEra.specs.perfIndicator}</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 p-3.5 bg-amber-950/10 border border-amber-900/20 rounded-xl flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-500">Ciekawostka historyczna:</span>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {selectedEra.curiosity}
              </p>
            </div>
          </div>
        </div>

        {/* Right pane: Interactive Interactive Simulator Widget for current selected era (6 cols) */}
        <div className="lg:col-span-6 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center">
              <Zap className="w-4.5 h-4.5 mr-1.5 text-cyan-400" />
              Dotykowy Eksperyment & Symulacja Budowy
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-normal">
              Przetestuj autentyczne zasady fizycznego działania lub przetwarzania sygnału dla wybranej ery:
            </p>

            {/* Widget 1: Interactive Abacus Simulator */}
            {activeEraId === "abacus" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300">Wizualny suanpan (chińskie liczydło)</span>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded">
                      Suma zarejestrowana: {getAbacusValue().toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Abacus frame illustration */}
                  <div className="bg-amber-950/20 border-4 border-amber-900 rounded-xl p-3 relative shadow-inner">
                    <div className="absolute top-1/3 left-0 right-0 h-1 bg-amber-900/80" /> {/* Divider beam */}
                    
                    {/* Rows */}
                    <div className="grid grid-cols-6 gap-3 pt-2 pb-1 relative z-10">
                      {abacusRows.map((val, idx) => {
                        const isFiveActive = val >= 5;
                        const unitsCount = val % 5;
                        return (
                          <div key={idx} className="flex flex-col items-center space-y-4">
                            {/* Decimal header label (ones, tens, hundreds...) */}
                            <span className="text-[10px] font-mono text-amber-500 font-semibold select-none">
                              10<sup>{idx}</sup>
                            </span>

                            {/* Upper Deck (Bi-quinary: standard representation has 1/2 of beads above. Here 1 bead valued 5) */}
                            <div className="flex flex-col items-center space-y-1 h-12 justify-center border-b border-amber-900/30 pb-2">
                              <button
                                onClick={() => updateAbacusBead(idx, isFiveActive ? val - 5 : val + 5)}
                                className={`w-6 h-3 rounded-full cursor-pointer transition-all border border-slate-900 ${
                                  isFiveActive ? "bg-amber-600 translate-y-1" : "bg-slate-700/60"
                                }`}
                                title="Wartość 5"
                              />
                            </div>

                            {/* Lower Deck (4 or 5 beads. Each valued 1) */}
                            <div className="flex flex-col items-center space-y-1 h-24 justify-end pt-1">
                              {Array.from({ length: 4 }).map((_, bIdx) => {
                                const active = unitsCount > bIdx;
                                return (
                                  <button
                                    key={bIdx}
                                    onClick={() => updateAbacusBead(idx, isFiveActive ? 5 + (bIdx + 1) : bIdx + 1)}
                                    className={`w-6 h-3 rounded-full cursor-pointer transition-all border border-slate-900 ${
                                      active ? "bg-amber-500 -translate-y-1" : "bg-slate-700/60"
                                    }`}
                                  />
                                );
                              })}
                            </div>

                            {/* Interactive Quick Add/Sub buttons for easier training */}
                            <div className="flex space-x-1 pt-2">
                              <button
                                onClick={() => updateAbacusBead(idx, val - 1)}
                                className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[10px] flex items-center justify-center hover:bg-slate-800 cursor-pointer text-slate-400 font-bold"
                              >
                                -
                              </button>
                              <button
                                onClick={() => updateAbacusBead(idx, val + 1)}
                                className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[10px] flex items-center justify-center hover:bg-slate-800 cursor-pointer text-slate-400 font-bold"
                              >
                                +
                              </button>
                            </div>

                          </div>
                        );
                      }).reverse()} {/* Reverse so ones are on the right! */}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-400">
                  <p className="font-bold text-slate-350 mb-0.5">Metoda obsługi:</p>
                  Klikaj na koraliki, by je przesuwać, lub użyj przycisków <strong className="text-slate-300 font-normal">+ / -</strong> na każdej osi dziesiętnej. Koralik górny odpowiada wartości 5, koraliki dolne mają wartość 1.
                </div>
              </div>
            )}

            {/* Widget 2: Pascalina Crank mechanical rotate visualizer */}
            {activeEraId === "pascaline" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <PascalinaSimulator />
              </div>
            )}

            {/* Widget 3: Difference Engine Babbage Simulator */}
            {activeEraId === "babbage" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-300">Rachunek różnicowy Babbage'a: f(x) = cx + d</span>
                    <button
                      onClick={resetBabbageEngine}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 px-2 py-0.5 bg-slate-900 hover:bg-slate-850 rounded border border-slate-800 cursor-pointer"
                    >
                      Resetuj
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3 leading-normal">
                    Zasada działania opiera się na wykonywaniu dodawania bez skomplikowanego mnożenia maszynowego.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-500 font-mono">REJESTR AKUMULATORA (Wynik)</p>
                      <p className="text-xl font-bold font-mono text-cyan-400 mt-1">{babbageAccumulator}</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-500 font-mono">REJESTR RÓŻNICY (Krok Δ)</p>
                      <div className="flex items-center justify-center space-x-1.5 mt-1">
                        <button
                          onClick={() => setBabbageDifference((prev) => Math.max(1, prev - 1))}
                          className="w-5 h-5 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-slate-400 font-bold text-xs hover:bg-slate-800 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono text-slate-200 font-bold text-sm w-8">{babbageDifference}</span>
                        <button
                          onClick={() => setBabbageDifference((prev) => Math.min(10, prev + 1))}
                          className="w-5 h-5 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-slate-400 font-bold text-xs hover:bg-slate-800 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mechanical Crank Lever clicker */}
                  <div className="flex justify-center my-3">
                    <button
                      onClick={turnBabbageCrank}
                      className="px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-750 hover:from-amber-500 hover:to-amber-650 text-slate-950 font-extrabold font-sans rounded-xl border border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] text-xs flex items-center space-x-2 transition-all hover:scale-103 cursor-pointer"
                    >
                      <RotateCw className="w-4.5 h-4.5 text-slate-950 animate-spin-slow" />
                      <span>Obróć Korbel Mosiężną (Generuj Krok)</span>
                    </button>
                  </div>

                  {/* Live simulated steel-clank tape logs */}
                  <div className="mt-4">
                    <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Wydruk z taśmy zębatej:</p>
                    <div className="bg-black/80 rounded-lg p-2.5 border border-slate-900 max-h-[85px] overflow-y-auto font-mono text-[9.5px] text-amber-500/90 leading-tight">
                      {engineLogs.slice().reverse().map((log, i) => (
                        <p key={i}>{log}</p>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="text-[10px] text-slate-400 mt-2 italic leading-relaxed pt-2 border-t border-slate-900">
                  Charles Babbage odkrył, że dowolną funkcję wielomianową (np. do obliczeń tablic nawigacyjnych) można przybliżyć serią prostych dodawań różnicowych.
                </div>
              </div>
            )}

            {/* Widget 4: ENIAC & von Neumann registers emulator */}
            {activeEraId === "eniac" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300">Symulator Cyklu Rozkazowego Von Neumanna</span>
                    <button
                      onClick={resetVonNeumann}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 px-2 py-0.5 bg-slate-900 hover:bg-slate-850 rounded border border-slate-800 cursor-pointer"
                    >
                      Resetuj
                    </button>
                  </div>

                  {/* Architecture blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-4">
                    {/* ALU Block */}
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 bg-cyan-500 text-slate-950 text-[7px] px-1 font-mono uppercase rounded-br">ALU</div>
                      <p className="text-[9px] text-slate-500 font-mono mt-1">AKUMULATOR</p>
                      <p className="text-md font-bold font-mono text-cyan-400 mt-1">{accumulator}</p>
                    </div>

                    {/* CU Block */}
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 bg-amber-500 text-slate-950 text-[7px] px-1 font-mono uppercase rounded-br">CU</div>
                      <p className="text-[9px] text-slate-500 font-mono mt-1">Licznik rozkazów (PC)</p>
                      <p className="text-md font-bold font-mono text-amber-400 mt-1">ADRES: {pc}</p>
                    </div>

                    {/* IR Block */}
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 bg-purple-500 text-white text-[7px] px-1 font-mono uppercase rounded-br">Rejestr (IR)</div>
                      <p className="text-[9px] text-slate-500 font-mono mt-1">Dekodowany rozkaz</p>
                      <p className="text-[10px] font-bold font-mono text-purple-400 mt-1.5 truncate">{instructionRegister}</p>
                    </div>
                  </div>

                  {/* Memory (RAM) cells */}
                  <div className="mb-4">
                    <p className="text-[9px] font-mono text-slate-500 uppercase mb-1.5">Skojarzona pamięć RAM:</p>
                    <div className="grid grid-cols-5 gap-2 font-mono text-[10px]">
                      {ram.map((val, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg text-center border ${
                            pc === idx
                              ? "border-amber-500/70 bg-amber-950/20"
                              : "border-slate-900 bg-slate-950"
                          }`}
                        >
                          <p className="text-[8px] text-slate-500">Adres {idx}</p>
                          <p className="font-bold text-slate-200 mt-1">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trigger Clock Cycle */}
                  <div className="flex justify-center">
                    <button
                      onClick={executeNextClockCycle}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-650 text-slate-950 font-bold font-sans rounded-xl text-xs flex items-center space-x-1.5 shadow-lg cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Wykonaj takt zegara (CPU Cycle)</span>
                    </button>
                  </div>

                </div>

                {/* Simulated processor execution steps */}
                <div className="mt-4">
                  <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">Rejestracja stanów szyny:</p>
                  <div className="bg-black/95 rounded-lg p-2.5 border border-slate-900 max-h-[85px] overflow-y-auto font-mono text-[9px] text-green-400/90 leading-tight">
                    {cycleLogs.slice().reverse().map((log, i) => (
                      <p key={i}>{log}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Widget 4b: K-202 Bank Switching Memory Paging Emulator */}
            {activeEraId === "k-202" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <K202Simulator />
              </div>
            )}

            {/* Widget 4c: Polish Computers Odra & Meritum Simulator */}
            {activeEraId === "polish-computers" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <PolishComputersSimulator />
              </div>
            )}

            {/* Widget 5: IBM PC 5150 open slots & card diagnostic */}
            {activeEraId === "ibm-pc" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <IbmPcSimulator />
              </div>
            )}

            {/* Widget 6: Modern multi-core CPU Visualizer */}
            {activeEraId === "modern-pc" && (
              <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex flex-col h-full justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 font-sans">Mikroarchitektura wielordzeniowa (SoC)</span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 px-2.5 py-0.5 rounded border border-cyan-800/20 animate-pulse">
                      STATUS: LIVE (3.0 nm FinFET)
                    </span>
                  </div>

                  {/* Multi-core load bar sim */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {Array.from({ length: 4 }).map((_, i) => {
                      const load = Math.floor(Math.random() * 85) + 10;
                      return (
                        <div key={i} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-[9px] font-mono text-slate-500">RDZEŃ {i + 1}</p>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full mt-2 overflow-hidden">
                            <div
                              className="h-full bg-cyan-400 rounded-full"
                              style={{ width: `${load}%` }}
                            />
                          </div>
                          <p className="text-[10px] font-mono font-bold text-slate-300 mt-1">{load}%</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* PCIe Lane router schematic */}
                  <div className="border border-slate-900 bg-[#0A0A0B]/60 p-3 rounded-lg text-xs">
                    <p className="text-[10px] font-mono text-cyan-500 uppercase font-semibold mb-1.5">Inteligentne mostki PCIe & NVMe:</p>
                    <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
                      <div className="flex justify-between">
                        <span>CPU ↔ Pamięć RAM DDR5:</span>
                        <span className="text-emerald-400 font-bold">86.4 GB/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CPU ↔ Dysk SSD NVMe Gen 5:</span>
                        <span className="text-emerald-400 font-bold">14 000 MB/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CPU ↔ Karta GPU PCIe 5.0 x16:</span>
                        <span className="text-emerald-400 font-bold">64 GB/s</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 bg-slate-900 rounded-lg text-[10px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-300 font-bold">Zintegrowany krzem (System-on-Chip)</strong> skrócił drogi komunikacji z centymetrów do mikrometrów, całkowicie eliminując tradycyjne mostki na płycie głównej na rzecz szybkich, zintegrowanych z CPU kontrolerów.
                </div>
              </div>
            )}

          </div>

          <div className="mt-4 text-[10px] font-mono text-slate-500 flex justify-between items-center bg-slate-950/40 p-2 rounded-lg border border-slate-900/60">
            <span>Dydaktyczna makieta fizyczno-logiczna</span>
            <span className="text-cyan-400">Turing-zgodna</span>
          </div>
        </div>

      </div>

      {/* 4. Comprehensive Performance Scaling parameters */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center">
          <Scale className="w-4.5 h-4.5 mr-1.5 text-cyan-400" />
          Zestawienie Porównawcze Wydajności i Technologii na Przestrzeni Dziejów
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase">
                <th className="pb-3 pt-1">Era i Urządzenie</th>
                <th className="pb-3 pt-1">Główny Element</th>
                <th className="pb-3 pt-1">Typ Taktowania</th>
                <th className="pb-3 pt-1">Rozmiar RAM</th>
                <th className="pb-3 pt-1">Wydajność (Instrukcje/Sec)</th>
                <th className="pb-3 pt-1">Zaleta / Przełom</th>
              </tr>
            </thead>
            <tbody>
              {ERAS.map((e, idx) => (
                <tr
                  key={e.id}
                  onClick={() => setActiveEraId(e.id)}
                  className={`border-b border-slate-900 hover:bg-slate-950/40 transition-colors cursor-pointer ${
                    e.id === activeEraId ? "bg-cyan-950/10 text-white font-semibold" : "text-slate-300"
                  }`}
                >
                  <td className="py-3.5 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: idx === 0 ? "#bca" : idx === 1 ? "#cca" : idx === 2 ? "#da8" : idx === 3 ? "#0ea" : idx === 4 ? "#d25" : "#0be" }} />
                    <span className="font-bold">{e.name}</span>
                  </td>
                  <td className="py-3.5 text-slate-400">{e.specs.techMedium.split(",")[0]}</td>
                  <td className="py-3.5 font-mono text-[11px] text-slate-450">{e.specs.clockSpeed}</td>
                  <td className="py-3.5 font-mono text-[11px] text-slate-450">{e.specs.memorySize}</td>
                  <td className="py-3.5 font-mono text-[11px] text-cyan-400">{e.specs.perfIndicator}</td>
                  <td className="py-3.5 text-slate-400 text-[11px] font-sans italic">{e.subtitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

    </div>
  );
}

// Subcomponent: Pascalina Blaise Pascal gear rotating visual module
function PascalinaSimulator() {
  const [accumValue, setAccumValue] = useState<number>(14);

  // Convert number to individual digits representation
  const digitOnes = accumValue % 10;
  const digitTens = Math.floor((accumValue % 100) / 10);
  const digitHundreds = Math.floor((accumValue % 1000) / 100);

  const rotateGear = (column: "ones" | "tens" | "hundreds", amount: number) => {
    let diff = 0;
    if (column === "ones") diff = amount;
    else if (column === "tens") diff = amount * 10;
    else if (column === "hundreds") diff = amount * 100;

    setAccumValue((prev) => Math.max(0, Math.min(999, prev + diff)));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300">Grawitacyjny Mechanizm Przeniesień Dziesiętnych</span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
            Odczyt mosiężny: {accumValue.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="bg-[#1C160E] border-4 border-amber-800/80 rounded-2xl p-4 shadow-inner relative flex flex-col items-center">
          {/* Solid glass look panel */}
          <div className="absolute inset-0 bg-yellow-950/10 rounded-xl pointer-events-none" />

          {/* Windows / apertures for results digits */}
          <div className="flex space-x-6 mb-8 justify-center h-14 items-center bg-slate-950 border-2 border-amber-900 rounded-lg px-6 shadow-inner z-10">
            {/* Hundreds cylinder */}
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest font-mono">100 s</span>
              <span className="text-lg font-mono font-bold text-amber-500 animate-pulse">{digitHundreds}</span>
            </div>
            <div className="w-0.5 h-6 bg-amber-900/40" />

            {/* Tens cylinder */}
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest font-mono">10 s</span>
              <span className="text-lg font-mono font-bold text-amber-500 animate-pulse">{digitTens}</span>
            </div>
            <div className="w-0.5 h-6 bg-amber-900/40" />

            {/* Ones cylinder */}
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest font-mono">1 s</span>
              <span className="text-lg font-mono font-bold text-amber-500 animate-pulse">{digitOnes}</span>
            </div>
          </div>

          {/* Interactive Mechanical Gears layout */}
          <div className="grid grid-cols-3 gap-4 w-full px-2 z-10">
            {/* Gear column 3: Hundreds */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full border-4 border-dashed border-amber-600/40 flex items-center justify-center animate-spin-slow bg-amber-950/40">
                <div className="w-6 h-6 rounded-full border-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-500 select-none">
                  H
                </div>
              </div>
              <div className="flex space-x-1 mt-3">
                <button
                  onClick={() => rotateGear("hundreds", -1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  -100
                </button>
                <button
                  onClick={() => rotateGear("hundreds", 1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  +100
                </button>
              </div>
            </div>

            {/* Gear column 2: Tens */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full border-4 border-dashed border-amber-650 flex items-center justify-center animate-spin-slow bg-amber-950/50">
                <div className="w-6 h-6 rounded-full border-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-500 select-none">
                  T
                </div>
              </div>
              <div className="flex space-x-1 mt-3">
                <button
                  onClick={() => rotateGear("tens", -1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  -10
                </button>
                <button
                  onClick={() => rotateGear("tens", 1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Gear column 1: Ones */}
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full border-4 border-dashed border-amber-500 flex items-center justify-center animate-spin-slow bg-amber-950/60">
                <div className="w-6 h-6 rounded-full border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-400 select-none">
                  O
                </div>
              </div>
              <div className="flex space-x-1 mt-3">
                <button
                  onClick={() => rotateGear("ones", -1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  -1
                </button>
                <button
                  onClick={() => rotateGear("ones", 1)}
                  className="px-2 py-1 text-[10px] bg-amber-950/70 text-amber-400 font-bold border border-amber-900 hover:bg-amber-900 rounded cursor-pointer"
                >
                  +1
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 p-2.5 bg-slate-900 rounded-lg mt-4 leading-relaxed">
        <strong className="text-slate-300 font-medium">Jak to działa:</strong> Kiedy koło Jednostek (O) osiągnie wartość <strong className="text-amber-500">9</strong> i zwiększy się o 1, automatycznie popycha dźwignię, obracając koło Dziesiątek (T) o 1 pozycję. Zwiększenie sumy w rzędzie jedności wyzwala mechaniczne przeniesienie w lewo.
      </div>
    </div>
  );
}

// Subcomponent: IBM PC 5150 card insertion visualizer
function IbmPcSimulator() {
  const [insertedCards, setInsertedCards] = useState({
    cga: true,
    floppyController: true,
    memoryExpansion: false
  });

  const toggleCard = (card: "cga" | "floppyController" | "memoryExpansion") => {
    setInsertedCards((prev) => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300">Sloty rozszerzeń ISA (8-bit) na Płycie Głównej</span>
          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">System BIOS sprawdzony</span>
        </div>

        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Standard IBM PC 5150 umożliwił po raz pierwszy kupowanie dedykowanych kart rozszerzeń od zewnętrznych dostawców. Wciśnij lub wyjmij karty ze slotów płyty głównej:
        </p>

        {/* Visual Motherboard chassis representation */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4">
          
          {/* Card Slot 1 (CGA Graphics) */}
          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-900">
            <div>
              <p className="text-xs font-bold text-slate-200">Slot 1: Karta kontrolera obrazu CGA</p>
              <p className="text-[10px] text-slate-500">Obsługa trybu 4 kolorów dla monitora RGB</p>
            </div>
            <button
              onClick={() => toggleCard("cga")}
              className={`px-3 py-1 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                insertedCards.cga
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400/90"
              }`}
            >
              {insertedCards.cga ? "WPIĘTA (Active)" : "WYJĘTA (Empty)"}
            </button>
          </div>

          {/* Card Slot 2 (Floppy Disk Drive module) */}
          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-900">
            <div>
              <p className="text-xs font-bold text-slate-200">Slot 2: Kontroler stacji dyskietek 5.25"</p>
              <p className="text-[10px] text-slate-500">Wejście/wyjście dla napędu Shugart</p>
            </div>
            <button
              onClick={() => toggleCard("floppyController")}
              className={`px-3 py-1 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                insertedCards.floppyController
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400/90"
              }`}
            >
              {insertedCards.floppyController ? "WPIĘTA (Active)" : "WYJĘTA (Empty)"}
            </button>
          </div>

          {/* Card Slot 3 (RAM Expansion) */}
          <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-900">
            <div>
              <p className="text-xs font-bold text-slate-200">Slot 3: Rozszerzenie RAM o dodatkowe 64 KB</p>
              <p className="text-[10px] text-slate-500">Zwiększa pamięć operacyjną do granic systemowych DOS</p>
            </div>
            <button
              onClick={() => toggleCard("memoryExpansion")}
              className={`px-3 py-1 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                insertedCards.memoryExpansion
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-800 text-slate-400/90"
              }`}
            >
              {insertedCards.memoryExpansion ? "WPIĘTA (Active)" : "WYJĘTA (Empty)"}
            </button>
          </div>

        </div>

        {/* Dynamic POST check list feedback */}
        <div className="bg-[#050507] border border-slate-900 rounded-lg p-3 mt-4 text-[10px] font-mono leading-tight">
          <p className="text-amber-500/80 mb-1.5 uppercase font-bold">&gt;&gt; LOG ROZRUCHU IBM BIOS POST:</p>
          <div className="space-y-0.5 text-slate-400">
            <p>1. CPU Intel 8088 @ 4.77 MHz ... OK</p>
            <p>2. Pamięć RAM podstawowa (64KB) ... OK</p>
            <p>
              3. Wykryto rozszerzenia: {insertedCards.memoryExpansion ? "+64KB RAM (Suma 128KB)" : "Brak"}{" "}
            </p>
            <p className={insertedCards.cga ? "text-green-500" : "text-amber-500"}>
              4. Stan karty wideo: {insertedCards.cga ? "CGA aktywne (Wykryto 80x25)" : "Brak Sygnału Monitora [ERROR]"}.
            </p>
            <p className={insertedCards.floppyController ? "text-green-500" : "text-red-400"}>
              5. Stan Bootowania: {insertedCards.floppyController ? "Gotowy do odczytu dyskietki IBM DOS v1.0" : "Wymagane dyskiety startowe"}.
            </p>
          </div>
        </div>

      </div>

      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900/60 leading-normal">
        Magistrala ISA dawała pełną swobodę adresacji. Urządzenia komunikowały się poprzez bezpośredni dostęp do kanałów przerwań (IRQ) oraz portów I/O płyty głównej.
      </div>
    </div>
  );
}

// Subcomponent: K-202 Bank Switching / Memory Paging Simulator
function K202Simulator() {
  const [selectedBank, setSelectedBank] = useState<number>(0);
  const [addressOffsetHex, setAddressOffsetHex] = useState<string>("0100");
  const [readResult, setReadResult] = useState<string | null>(null);
  const [busCycleCount, setBusCycleCount] = useState<number>(1);

  const bankPresets = [
    { bank: 0, label: "Bank 0 (Jądro K-OS)" },
    { bank: 1, label: "Bank 1 (Pamięć robocza)" },
    { bank: 8, label: "Bank 8 (Matematyka)" },
    { bank: 15, label: "Bank 15 (Bufory I/O)" },
    { bank: 32, label: "Bank 32 (Dane tablicowe)" },
    { bank: 63, label: "Bank 63 (Limit 8 MB)" }
  ];

  const offsetNum = parseInt(addressOffsetHex, 16) || 0;
  // K-202 physical address: Bank * 65536 + Offset (up to 8 MB = 8388608 bytes)
  const physicalAddress = (selectedBank * 65536) + (offsetNum & 0xFFFF);
  const physicalHex = "0x" + physicalAddress.toString(16).toUpperCase().padStart(6, "0");

  const performAsyncBusRead = () => {
    const mockValue = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
    setReadResult(mockValue);
    setBusCycleCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-3 font-sans">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-300 font-sans flex items-center">
            <Cpu className="w-4 h-4 mr-1 text-cyan-400" />
            Symulator Stronicowania K-202 (Jacek Karpiński)
          </span>
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
            BANK SWITCHING
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3 leading-tight">
          Przetestuj rewolucyjny mechanizm Jacka Karpińskiego, który pozwalał 16-bitowej jednostce centralnej zaadresować 8 MB pamięci w 64 dynamicznych stronach po 64 KB!
        </p>

        {/* Bank selection chips */}
        <div className="mb-3">
          <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">
            Wybierz aktywny bank pamięci (0..63):
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {bankPresets.map((bp) => (
              <button
                key={bp.bank}
                onClick={() => {
                  setSelectedBank(bp.bank);
                  setReadResult(null);
                }}
                className={`text-[10px] p-1.5 rounded-lg border font-mono transition-all text-left truncate cursor-pointer ${
                  selectedBank === bp.bank
                    ? "bg-cyan-950/50 border-cyan-500 text-cyan-300 font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {bp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Translation diagram */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-500">Rejestr Strony (Bank):</span>
            <span className="text-amber-400 font-bold">
              Bank {selectedBank} (bin: {selectedBank.toString(2).padStart(6, "0")})
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-500">Adres Logiczny 16-bit:</span>
            <span className="text-slate-300">
              0x{offsetNum.toString(16).toUpperCase().padStart(4, "0")}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-cyan-400 font-bold text-[10px]">Adres Fizyczny Szyny K-202:</span>
            <span className="text-sm font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-700/40">
              {physicalHex}
            </span>
          </div>
          <p className="text-[9px] text-slate-500 pt-1 font-sans">
            Wskaźnik w obrębie 8 388 608 bajtów (8 MB) pamięci ferrytowej.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-3 flex items-center space-x-2">
          <button
            onClick={performAsyncBusRead}
            className="flex-1 py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Cykl Asynchroniczny Magistrali</span>
          </button>
          <button
            onClick={() => {
              setSelectedBank(0);
              setAddressOffsetHex("0100");
              setReadResult(null);
            }}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg cursor-pointer"
            title="Reset"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {readResult && (
          <div className="mt-2.5 p-2 bg-black/90 border border-cyan-800/40 rounded-lg font-mono text-[10px] text-green-400">
            <p>&gt; [CYKL #{busCycleCount}]: Odczyt z magistrali K-202 @ {physicalHex} ... SŁOWO = {readResult} (OK)</p>
          </div>
        )}
      </div>

      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900 leading-tight">
        K-202 wyprzedzał komputery IBM i DEC o dekadę. Niestety partyjne władze PRL uznały, że minikomputer "nie pasuje do socjalistycznego planu RWPG", niszcząc ten projekt.
      </div>
    </div>
  );
}

// Subcomponent: Polish Computers (Odra 1305 + Meritum) Simulator
function PolishComputersSimulator() {
  const [activeMode, setActiveMode] = useState<"odra" | "meritum">("odra");

  // Odra 1305 state: 24-bit accumulator switches (grouped in 8 octal digits)
  const [odraBits, setOdraBits] = useState<number[]>([
    1, 0, 1,  0, 1, 0,  1, 1, 0,  0, 0, 1,  1, 0, 0,  0, 1, 1,  1, 0, 1,  0, 1, 0
  ]);
  const [odraStatusLog, setOdraStatusLog] = useState<string>("Odra 1305 gotowa. System operacyjny George 3 aktywny.");

  // Toggle bit
  const toggleOdraBit = (idx: number) => {
    setOdraBits((prev) => {
      const copy = [...prev];
      copy[idx] = copy[idx] === 1 ? 0 : 1;
      return copy;
    });
  };

  // Convert 24 bits to octal
  const getOctalRepresentation = () => {
    let octalStr = "";
    for (let i = 0; i < 24; i += 3) {
      const val = (odraBits[i] << 2) | (odraBits[i + 1] << 1) | odraBits[i + 2];
      octalStr += val.toString();
    }
    return octalStr;
  };

  // Meritum state
  const [meritumProgram, setMeritumProgram] = useState<number>(0);
  const [meritumOutput, setMeritumOutput] = useState<string[]>([
    "*** MERA-ELWRO MERITUM I BASIC (C) 1983 ***",
    "16384 BYTES FREE",
    "READY."
  ]);

  const runMeritumProgram = () => {
    if (meritumProgram === 0) {
      setMeritumOutput([
        "RUN",
        "WITAJ W PRACOWNI SZKOLNEJ ELWRO!",
        "KOMPUTER: MERITUM I (MERA-ELWRO)",
        "CPU: U880D (2.50 MHz) | RAM: 16 KB",
        "PROGRAM WYKONANY.",
        "READY."
      ]);
    } else if (meritumProgram === 1) {
      const lines = ["RUN", "TABLICA POTĘG DWOJKI (2^N):"];
      for (let n = 1; n <= 8; n++) {
        lines.push(`2 ^ ${n} = ${Math.pow(2, n)}`);
      }
      lines.push("READY.");
      setMeritumOutput(lines);
    } else {
      setMeritumOutput([
        "LOAD \"GRAFIKA.BAS\"",
        "CZYTANIE Z KASETY MAGNETOFONOWEJ...",
        "ZROZUMIANO SYGNAŁ AUDIO: 1200 BAUD",
        "OK",
        "RUN",
        "████ POLSKA SZKOŁA INFORMATYKI ████",
        "READY."
      ]);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full space-y-3 font-sans">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300">
              Pulpit Maszyn Mera-Elwro
            </span>
          </div>

          {/* Mode switch */}
          <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
            <button
              onClick={() => setActiveMode("odra")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                activeMode === "odra"
                  ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Odra 1305
            </button>
            <button
              onClick={() => setActiveMode("meritum")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                activeMode === "meritum"
                  ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Meritum (1983)
            </button>
          </div>
        </div>

        {activeMode === "odra" ? (
          <div className="space-y-3">
            <p className="text-[11px] text-slate-400 leading-tight">
              Pulpit sterowniczy Odry 1305 ze słowem 24-bitowym (zapis ósemkowy). Klikaj przełączniki kluczowe:
            </p>

            {/* 24-bit switches */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-2">
                <span>REJESTR AKUMULATORA (24 BITY):</span>
                <span className="text-cyan-400 font-bold">Osemkowy: {getOctalRepresentation()}</span>
              </div>

              <div className="grid grid-cols-8 gap-1.5">
                {Array.from({ length: 8 }).map((_, groupIdx) => {
                  const bitsInGroup = odraBits.slice(groupIdx * 3, groupIdx * 3 + 3);
                  return (
                    <div key={groupIdx} className="bg-slate-950 p-1 rounded border border-slate-800 flex flex-col items-center">
                      <span className="text-[8px] font-mono text-slate-500 mb-1">G{groupIdx + 1}</span>
                      <div className="flex space-x-0.5">
                        {bitsInGroup.map((b, bitIdx) => {
                          const actualIdx = groupIdx * 3 + bitIdx;
                          return (
                            <button
                              key={bitIdx}
                              onClick={() => toggleOdraBit(actualIdx)}
                              className={`w-3.5 h-6 rounded text-[9px] font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                                b === 1
                                  ? "bg-amber-500 text-slate-950 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                  : "bg-slate-900 text-slate-500 hover:bg-slate-800"
                              }`}
                              title={`Bit ${actualIdx}: kliknij aby przełączyć`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setOdraStatusLog(`[KROK ROZKAZU]: Odczyt słowa 24-bit (0o${getOctalRepresentation()}) z pamięci ferrytowej. Instrukcja wykonana.`);
                }}
                className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Krok Cyklu Rozkazu Elwro
              </button>
              <button
                onClick={() => {
                  setOdraBits(new Array(24).fill(0));
                  setOdraStatusLog("Rejestr wyzerowany.");
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs rounded-lg border border-slate-800 cursor-pointer"
              >
                Zeruj
              </button>
            </div>

            <p className="text-[10px] font-mono text-green-400 bg-black/80 p-2 rounded border border-slate-800">
              &gt; {odraStatusLog}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] text-slate-400 leading-tight">
              Konsola wbudowanego języka BASIC w polskim mikrokomputerze osobistym Meritum I:
            </p>

            {/* Program selection */}
            <div className="flex space-x-1.5">
              {["Powitanie", "Potęgi 2", "Wczytaj kasetę"].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setMeritumProgram(idx)}
                  className={`flex-1 py-1 px-2 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                    meritumProgram === idx
                      ? "bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CRT Screen */}
            <div className="bg-[#050B05] border border-green-900/60 rounded-xl p-3 font-mono text-[10px] text-green-400 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)] min-h-[110px] space-y-0.5">
              {meritumOutput.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <button
              onClick={runMeritumProgram}
              className="w-full py-1.5 bg-green-600 hover:bg-green-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Wykonaj Program (RUN)</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-900 leading-tight">
        Komputery Odra 1305 pracowały w PKP do 2010 roku, a Meritum uczył podstaw algorytmiki pokolenia późniejszych polskich inżynierów i twórców oprogramowania.
      </div>
    </div>
  );
}

// Subcomponent: 5 Generations of Computers View
function GenerationsView() {
  const [selectedGenId, setSelectedGenId] = useState<string>("gen-1");
  const selectedGen = GENERATIONS.find((g) => g.id === selectedGenId) || GENERATIONS[0];
  const [compareStartId, setCompareStartId] = useState<string>("gen-1");
  const [compareEndId, setCompareEndId] = useState<string>("gen-5");

  const startGen = GENERATIONS.find((g) => g.id === compareStartId) || GENERATIONS[0];
  const endGen = GENERATIONS.find((g) => g.id === compareEndId) || GENERATIONS[4];
  const speedRatio = endGen.relativeSpeedMultiplier / startGen.relativeSpeedMultiplier;

  const IconComp = selectedGen.icon;

  return (
    <div className="space-y-6" id="generations-view">
      {/* 1. Header Banner */}
      <div className="bg-slate-900/60 border border-slate-855 p-5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[260px] h-[100px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                Klasyfikacja Architektoniczna
              </span>
              <span className="text-[10px] font-mono text-slate-500">I – V Generacja</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1.5 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-cyan-400" />
              5 Generacji Maszyn Cyfrowych
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Poznaj pięć fundamentalnych przełomów w budowie komputerów — od wielkich hal pełnych żarzących się lamp próżniowych, przez tranzystory i krzemowe układy scalone, aż po procesory neuronowe i obliczenia masowo równoległe.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Generation Selector Cards (5 generations) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {GENERATIONS.map((gen) => {
          const isActive = selectedGenId === gen.id;
          const Icon = gen.icon;
          return (
            <button
              key={gen.id}
              onClick={() => setSelectedGenId(gen.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? "border-cyan-500 bg-cyan-950/25 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40"
                  : "border-slate-850 bg-[#0A0A0B]/60 hover:border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              id={`gen-card-${gen.id}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? "text-cyan-400" : "text-amber-500"}`}>
                    {gen.genNumber}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className={`text-xs font-bold mt-2 line-clamp-1 ${isActive ? "text-slate-100" : "text-slate-300"}`}>
                  {gen.name.replace(/^[I|V]+ Generacja:\s*/, "")}
                </h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {gen.years}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-900/80">
                <span className="text-[9px] text-slate-500 line-clamp-1 block">
                  {gen.keyTech}
                </span>
                <div className={`mt-2 flex items-center text-[10px] font-bold ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                  <span>Szczegóły</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Split View for Selected Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left pane: Technological & Historical Narrative (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Header of selected generation */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded">
                    {selectedGen.genNumber} • {selectedGen.years}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1.5 flex items-center">
                  <IconComp className="w-5 h-5 mr-2 text-cyan-400" />
                  {selectedGen.name}
                </h3>
              </div>
            </div>

            {/* Key Technology Box */}
            <div className="p-3.5 bg-slate-950/70 border border-cyan-900/30 rounded-xl flex items-start space-x-3">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
                  Kluczowa Technologia Elementarna:
                </span>
                <p className="text-xs text-slate-200 mt-0.5 font-medium leading-relaxed">
                  {selectedGen.keyTech}
                </p>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl">
              <h4 className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-1.5">
                Charakterystyka Architektury:
              </h4>
              <p className="text-xs text-slate-350 leading-relaxed">
                {selectedGen.description}
              </p>
            </div>

            {/* Example Machines */}
            <div className="p-3.5 bg-slate-950/50 border border-slate-900 rounded-xl">
              <h4 className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-1.5 flex items-center">
                <Server className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Ikoniczne Maszyny i Konstrukcje:
              </h4>
              <p className="text-xs text-slate-200 font-mono">
                {selectedGen.exampleMachine}
              </p>
            </div>

            {/* Breakthrough card */}
            <div className="p-3.5 bg-amber-950/15 border border-amber-900/30 rounded-xl flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-500">
                  Przełom Inżynieryjny i Cywilizacyjny:
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {selectedGen.breakthrough}
                </p>
              </div>
            </div>

            {/* Polish Contribution Badge Card */}
            <div className="p-3.5 bg-rose-950/15 border border-rose-900/30 rounded-xl flex items-start space-x-3">
              <Award className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-rose-400">
                    Polski Wkład w tę Generację:
                  </span>
                  <span className="text-[9px] bg-rose-950/40 text-rose-300 border border-rose-800/40 px-1.5 py-0.5 rounded font-sans font-bold">
                    PL
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {selectedGen.polishContribution}
                </p>
              </div>
            </div>
          </div>

          {/* Milestones list */}
          <div className="border-t border-slate-900 pt-3">
            <h4 className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-2">
              Kluczowe Daty i Kamienie Milowe:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedGen.milestones.map((m, idx) => (
                <div key={idx} className="p-2 bg-slate-950/60 border border-slate-900 rounded-lg text-[10px] text-slate-400 font-sans leading-tight flex items-start space-x-1.5">
                  <span className="text-cyan-400 font-mono shrink-0">›</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right pane: Specs & Interactive Generational Leap Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          
          {/* Hardware Parameters Grid */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-cyan-400" />
              Parametry Techniczne Generacji
            </h4>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Nośnik Pamięci Operacyjnej:</span>
                <p className="text-xs font-sans text-slate-200 mt-0.5 font-medium">{selectedGen.memoryTech}</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Szybkość Przetwarzania / Taktowanie:</span>
                <p className="text-xs font-mono text-cyan-400 font-bold mt-0.5">{selectedGen.speed}</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Języki i Środowisko Oprogramowania:</span>
                <p className="text-xs font-sans text-slate-300 mt-0.5 leading-snug">{selectedGen.programming}</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Gabaryty, Waga i Zasilanie:</span>
                <p className="text-xs font-sans text-slate-300 mt-0.5 leading-snug">{selectedGen.dimensionsAndPower}</p>
              </div>
            </div>
          </div>

          {/* Interactive Generational Leap Calculator */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[180px] h-[90px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1 font-mono flex items-center">
              <Scale className="w-4 h-4 mr-1.5" />
              Kalkulator Przeskoku Pokoleniowego
            </h4>
            <p className="text-[11px] text-slate-500 mb-3.5 leading-normal">
              Porównaj dwie dowolne generacje, aby uświadomić sobie wykładnicze tempo rewolucji informatycznej:
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Od generacji:</label>
                <select
                  value={compareStartId}
                  onChange={(e) => setCompareStartId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  {GENERATIONS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.genNumber} ({g.years})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Do generacji:</label>
                <select
                  value={compareEndId}
                  onChange={(e) => setCompareEndId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  {GENERATIONS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.genNumber} ({g.years})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="mt-3.5 p-3.5 bg-gradient-to-r from-slate-950 to-[#121218] border border-amber-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-500 uppercase font-bold">
                  Wzrost mocy obliczeniowej:
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                  {speedRatio === 1
                    ? "Ten sam poziom"
                    : speedRatio > 1
                      ? `~${speedRatio >= 1000000000 ? "1 000 000 000 000x (bilion razy)" : speedRatio >= 1000000 ? "100 000 000x (sto milionów razy)" : `${speedRatio.toLocaleString()}x`} szybszy`
                      : `Regresja porównania`}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Zastąpienie <span className="text-slate-200 font-semibold">{startGen.keyTech}</span> przez <span className="text-cyan-400 font-semibold">{endGen.keyTech}</span> pozwoliło zredukować gabaryty milionkrotnie, zbijając zużycie prądu na jedną operację logiczną z setek watów do femtodżuli (10⁻¹⁵ J).
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Complete Comparison Matrix Table for All 5 Generations */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center">
            <FolderTree className="w-4 h-4 mr-1.5 text-cyan-400" />
            Matryca Porównawcza: Wszystkie 5 Generacji Komputerów
          </h4>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
            Kliknij dowolny wiersz, aby przejść do szczegółów
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-2.5 px-3">Generacja</th>
                <th className="py-2.5 px-3">Lata</th>
                <th className="py-2.5 px-3">Kluczowy element</th>
                <th className="py-2.5 px-3">Pamięć</th>
                <th className="py-2.5 px-3">Typowa prędkość</th>
                <th className="py-2.5 px-3">Oprogramowanie</th>
                <th className="py-2.5 px-3">Przykłady</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {GENERATIONS.map((gen) => {
                const isSelected = selectedGenId === gen.id;
                return (
                  <tr
                    key={gen.id}
                    onClick={() => setSelectedGenId(gen.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-cyan-950/20 text-white"
                        : "hover:bg-slate-900/40 text-slate-300"
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold whitespace-nowrap">
                      <span className={isSelected ? "text-cyan-400" : "text-amber-500"}>
                        {gen.genNumber}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                      {gen.years}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">
                      {gen.keyTech}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {gen.memoryTech}
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-400 whitespace-nowrap">
                      {gen.speed}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {gen.programming}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">
                      {gen.exampleMachine}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComponentEvolutionView() {
  const [activeComp, setActiveComp] = useState<"cpu" | "ram" | "gpu" | "storage">("cpu");
  const compData = COMPONENT_EVOLUTION[activeComp];
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(0);

  // For the calculator
  const [calcStartIdx, setCalcStartIdx] = useState<number>(0);
  const [calcEndIdx, setCalcEndIdx] = useState<number>(compData.milestones.length - 1);

  // Reset indices when changing active component
  React.useEffect(() => {
    setSelectedMilestoneIdx(0);
    setCalcStartIdx(0);
    setCalcEndIdx(COMPONENT_EVOLUTION[activeComp].milestones.length - 1);
  }, [activeComp]);

  const activeMilestone = compData.milestones[selectedMilestoneIdx] || compData.milestones[0];
  const startMilestone = compData.milestones[calcStartIdx] || compData.milestones[0];
  const endMilestone = compData.milestones[calcEndIdx] || compData.milestones[compData.milestones.length - 1];

  const ratio = endMilestone.perfValue / startMilestone.perfValue;

  const getMultiplierDescription = () => {
    if (ratio === 1) return "Porównujesz ten sam etap technologiczny.";
    
    const timesLabel = ratio >= 1000000 
      ? `${(ratio / 1000000).toFixed(1)} mln` 
      : ratio >= 1000 
        ? `${(ratio / 1000).toFixed(1)} tys.` 
        : ratio.toFixed(1);

    switch (activeComp) {
      case "cpu":
        return `Zagęszczenie tranzystorów wzrosło około ${timesLabel}x! Taka miniaturyzacja pozwala na wykonywanie nieskończenie bardziej złożonych algorytmów na powierzchni mniejszej niż kropla wody, redukując pobór prądu i generowanie ciepła.`;
      case "ram":
        return `Przepustowość przesyłu danych zwiększyła się około ${timesLabel}x! Dzięki temu procesor nie musi czekać bezczynnie na dostarczenie danych z pamięci operacyjnej, co pozwala na płynną wielozadaniowość i obsługę ogromnych zasobów w czasie rzeczywistym.`;
      case "gpu":
        return `Moc obliczeń graficznych (operacji zmiennoprzecinkowych) wzrosła około ${timesLabel}x! Umożliwiło to ewolucję od wyświetlania prostego tekstu do symulacji miliardów fotonów światła w czasie rzeczywistym (Ray Tracing) oraz zaawansowanych sieci neuronowych.`;
      case "storage":
        return `Prędkość odczytu danych przyspieszyła około ${timesLabel}x! Oznacza to natychmiastowe ładowanie systemu operacyjnego i brak jakichkolwiek opóźnień mechanicznych głowicy magnetycznej, które dawniej paraliżowały pracę komputerów.`;
      default:
        return "";
    }
  };

  const CompIcon = compData.icon;

  return (
    <div className="space-y-6" id="component-evolution-view">
      
      {/* Selector of Component Category */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(COMPONENT_EVOLUTION) as Array<"cpu" | "ram" | "gpu" | "storage">).map((key) => {
          const item = COMPONENT_EVOLUTION[key];
          const isActive = activeComp === key;
          const Icon = item.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveComp(key)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                isActive
                  ? "border-cyan-500 bg-cyan-950/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "border-slate-850 bg-[#0A0A0B]/60 hover:border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              id={`comp-select-${key}`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
              )}
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-900 text-slate-500 group-hover:text-cyan-400 transition-colors"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isActive ? "text-cyan-400" : "text-slate-300"}`}>{item.name}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Milestones list (5 cols) */}
        <div className="lg:col-span-5 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono flex items-center">
              <History className="w-4 h-4 mr-1.5 text-cyan-400" />
              Etapy Rozwoju i Kamienie Milowe
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Wybierz konkretną epokę, aby zobaczyć rewolucyjne zmiany konstrukcyjne tego podzespołu:
            </p>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
              {compData.milestones.map((milestone, idx) => {
                const isSelected = selectedMilestoneIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedMilestoneIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? "border-cyan-500/70 bg-cyan-950/15"
                        : "border-slate-850/80 bg-[#0A0A0B]/30 hover:border-slate-700 hover:bg-slate-900/40"
                    }`}
                    id={`milestone-btn-${idx}`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r" />
                    )}
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono font-bold text-amber-500">{milestone.era}</span>
                      <span className="text-[9px] font-mono text-slate-500">Krok {idx + 1}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">{milestone.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">{milestone.specs}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 p-3 bg-slate-950/60 rounded-xl border border-slate-900/80 text-[10px] text-slate-500 leading-normal">
            Każdy etap to unikalne innowacje, które rozwiązały krytyczne bariery fizyczne (np. emisję ciepła czy opóźnienia szyny danych).
          </div>
        </div>

        {/* Right column: Selected Milestone Detail + Evolution Calculator (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* Milestone Detail Card */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-800/60 pb-3">
              <div>
                <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                  {activeMilestone.era}
                </span>
                <h3 className="text-sm font-extrabold text-white mt-2 font-sans">
                  {activeMilestone.name}
                </h3>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <CompIcon className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900/80">
                <p className="text-[9px] font-mono text-slate-500 uppercase">Główne parametry:</p>
                <p className="text-xs font-mono font-bold text-slate-200 mt-1">{activeMilestone.specs}</p>
              </div>

              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900/80">
                <p className="text-[9px] font-mono text-slate-500 uppercase">Technologia i wykonanie:</p>
                <p className="text-xs font-sans text-slate-300 mt-1 font-medium">{activeMilestone.tech}</p>
              </div>

              <div className="p-3 bg-cyan-950/5 rounded-xl border border-cyan-950/30">
                <p className="text-[9px] font-mono text-cyan-400 uppercase font-bold">Wpływ i znaczenie historyczne:</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeMilestone.impact}</p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[100px] bg-amber-500/3 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1 font-mono flex items-center">
              <Scale className="w-4 h-4 mr-1.5" />
              Kalkulator Postępu Technologicznego
            </h3>
            <p className="text-[11px] text-slate-500 mb-4 leading-normal">
              Wybierz dwa punkty na osi czasu, aby obliczyć niesamowitą skalę ewolucji tego podzespołu:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 p-3.5 rounded-xl border border-slate-900/80">
              {/* Start Generation Selector */}
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Punkt startowy:</label>
                <select
                  value={calcStartIdx}
                  onChange={(e) => setCalcStartIdx(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer text-ellipsis overflow-hidden"
                  id="calc-start-select"
                >
                  {compData.milestones.map((milestone, idx) => (
                    <option key={idx} value={idx} disabled={idx >= calcEndIdx}>
                      {milestone.name} ({milestone.era})
                    </option>
                  ))}
                </select>
              </div>

              {/* End Generation Selector */}
              <div>
                <label className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Punkt końcowy:</label>
                <select
                  value={calcEndIdx}
                  onChange={(e) => setCalcEndIdx(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs p-2 text-slate-200 focus:outline-none focus:border-cyan-500/50 cursor-pointer text-ellipsis overflow-hidden"
                  id="calc-end-select"
                >
                  {compData.milestones.map((milestone, idx) => (
                    <option key={idx} value={idx} disabled={idx <= calcStartIdx}>
                      {milestone.name} ({milestone.era})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic Comparison results display */}
            <div className="mt-4 p-4 bg-gradient-to-r from-slate-950 to-[#12100E] border border-amber-500/20 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <p className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                    {compData.metricLabel}:
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Od: <span className="font-mono text-slate-200 font-semibold">{startMilestone.perfValue.toLocaleString()}</span> do{" "}
                    <span className="font-mono text-slate-200 font-semibold">{endMilestone.perfValue.toLocaleString()}</span> {compData.metricUnit}
                  </p>
                </div>
                
                {ratio > 1 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-center shrink-0">
                    <p className="text-[9px] font-mono text-amber-400 font-bold uppercase leading-none">Skok wydajności</p>
                    <p className="text-sm font-mono font-bold text-amber-500 mt-1">
                      {ratio >= 1000000 
                        ? `x ${(ratio / 1000000).toFixed(1)} mln` 
                        : ratio >= 1000 
                          ? `x ${(ratio / 1000).toFixed(1)} tys.` 
                          : `x ${ratio.toFixed(0)}`}
                    </p>
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-900 my-3" />

              <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans font-medium">
                {getMultiplierDescription()}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

interface OSEra {
  id: string;
  era: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  keyInnovations: string[];
  kernelArchitecture: string;
  multitaskingType: string;
  interfaceType: string;
  securityModel: string;
  historicalImpact: string;
  notableOS: string[];
  codeSnippet: {
    language: string;
    code: string;
    caption: string;
  };
  curiosity: string;
}

const OS_ERAS: OSEra[] = [
  {
    id: "batch-rtos",
    era: "Lata 1950 - 1960",
    title: "Systemy Wsadowe (Batch) i Wczesne RTOS",
    subtitle: "Od sekwencyjnych kart perforowanych po pierwsze pętle czasu rzeczywistego",
    badge: "Pionierska Era Komputacji",
    icon: Server,
    keyInnovations: [
      "Wczytywanie i automatyczne wykonywanie wsadowe programów (Batch Processing) bez udziału ludzkiego operatora między zadaniami",
      "Pierwsze monitory rezydentne (Executives) zarządzenia pamięcią i urządzeniami wejścia/wyjścia (I/O)",
      "Narodziny idei podziału czasu procesora (Time-Sharing w systemie CTSS na MIT w 1961 r.)",
      "Wczesne systemy czasu rzeczywistego (RTOS) w wojskowości i lotnictwie (SAGE, komputery pokładowe misji Gemini/Apollo)"
    ],
    kernelArchitecture: "Jednowątkowy, spójny monitor rezydentny wgrywany z taśmy magnetycznej do pamięci ferrytowej",
    multitaskingType: "Sekwencjonowanie jednoprocesorowe lub wczesny czasowy podział obciążenia (Time-Sharing)",
    interfaceType: "Karty perforowane, taśmy magnetyczne, konsola teletypowa (Teletype / TTY)",
    securityModel: "Fizyczna ochrona sali operacyjnej i kontrola dostępu do czytnika kart perforowanych",
    historicalImpact: "Eliminacja ręcznego przełączania kabli i przełączników panelowych na rzecz automatycznego sterowania wsadowego. Utworzono podwaliny pod mechanizmy przerwań sprzętowych i timery systemowe.",
    notableOS: ["GM-NAA I/O (1956)", "IBM IBSYS / FMS", "CTSS (1961)", "Multics (1964)", "SAGE Real-Time Monitor"],
    codeSnippet: {
      language: "job-control",
      code: `$JOB 0042 PROJECT_APOLLO\n$FORTRAN\n      READ (5,10) X, Y\n      Z = X * Y + 3.14159\n      WRITE (6,20) Z\n      STOP\n$EXECUTE\n$ENTRY`,
      caption: "Struktura wsadowej karty sterującej (Job Control) w systemach IBM z lat 60."
    },
    curiosity: "Słynny skrót TTY (używany do dziś w terminalach Linuxa jako /dev/tty) pochodzi od fizycznych maszyn teletypowych Teletype Model 33, które służyły jako pierwsze klawiatury i drukarki podłączone do komputerów mainframe!"
  },
  {
    id: "unix-posix",
    era: "Lata 1969 - 1970",
    title: "UNIX i Rewolucja C / POSIX",
    subtitle: "Filozofia 'Wszystko jest plikiem', potokowość i przenośność kodu",
    badge: "Fundament Nowoczesnej Informatyki",
    icon: Terminal,
    keyInnovations: [
      "Napisanie jądra w przenośnym języku C (Dennis Ritchie, 1972) zamiast w specyficznym dla procesora asemblerze",
      "Filozofia UNIX-a: tworzenie małych, modułowych programów realizujących jedno zadanie i łączonych potokami (|)",
      "Uniwersalna abstrakcja strumieniowa – pliki, urządzenia, dyski i gniazda są traktowane jako ciągi bajtów ('Wszystko jest plikiem')",
      "Hierarchiczny drzewiasty system plików, wieloużytkownikowy podział procesów oraz standard uprawnień POSIX (rwxr-xr-x)"
    ],
    kernelArchitecture: "Jądro monolityczne w języku C łączące planowanie procesów, sterowniki i obsługę pamięci",
    multitaskingType: "Wieloużytkownikowa wielozadaniowość z wywłaszczaniem i podziałem czasu (Preemptive Time-Sharing)",
    interfaceType: "Wiersz poleceń CLI (Unix Shell / Bash) obsługiwany przez terminale tekstowe",
    securityModel: "System uprawnień plików POSIX (Właściciel, Grupa, Pozostali) oraz konto superużytkownika root",
    historicalImpact: "UNIX zdefiniował architekturę niemal wszystkich współczesnych systemów operacyjnych. Linux, macOS, iOS, Android, BSD i QNX są bezpośrednimi potomkami lub systemami zgodnymi ze standardami UNIX/POSIX.",
    notableOS: ["UNIX System V", "Research Unix (Bell Labs)", "BSD (Berkeley Software Distribution)", "SunOS / Solaris", "HP-UX", "AIX"],
    codeSnippet: {
      language: "bash",
      code: `# Potokowość komend UNIX w wierszu poleceń (Shell):\ncat /var/log/syslog | grep "ERROR" | awk '{print $1, $2, $5}' | sort | uniq -c`,
      caption: "Potok łączący cztery niezależne programy w jeden potężny filtr danych."
    },
    curiosity: "Ken Thompson i Dennis Ritchie stworzyli pierwszą wersję UNIX-a w Bell Labs na nieużywanym minikomputerze PDP-7, głównie po to, by mieć płynną platformę do uruchamiania swojej ulubionej gry symulacyjnej 'Space Travel'!"
  },
  {
    id: "gui-microcomputer",
    era: "Lata 1980 - 1990",
    title: "Era Mikrokomputerów & Graficznego GUI (WIMP)",
    subtitle: "Pulpit z okienkami, mysz komputerowa i komputery trafiające pod strzechy",
    badge: "Demokratyzacja Dostępności",
    icon: Monitor,
    keyInnovations: [
      "Wprowadzenie i popularyzacja interfejsu graficznego WIMP (Windows, Icons, Menus, Pointer) ze sterowaniem myszą",
      "Pojawienie się komputerów osobistych dla domów i biur (IBM PC z MS-DOS, Apple Macintosh 1984, AmigaOS)",
      "Ewolucja od systemów jednoprocesorowych DOS do wielozadaniowości kooperacyjnej, a następnie 32-bitowej z wywłaszczaniem (Windows 95)",
      "Systemy obsługi zdarzeń (Event Loop), sterowniki urządzeń Plug and Play i akceleracja graficzna 2D/3D"
    ],
    kernelArchitecture: "Prosty monitor systemowy (MS-DOS) przechodzący w nakładki graficzne oraz jądra 32-bitowe z wywłaszczaniem (Windows 95 / Amiga Exec)",
    multitaskingType: "Jednozadaniowe (DOS) ➔ Kooperacyjna (Win 3.1) ➔ 32-bitowa z wywłaszczaniem (Windows 95 / AmigaOS)",
    interfaceType: "Graficzny pulpit WIMP (Okna, Ikony, Menu, Wskaźnik myszy)",
    securityModel: "Brak izolacji pamięci w trybie rzeczywistym 8086 ➔ Wprowadzenie trybu chronionego (Protected Mode) procesorów 386",
    historicalImpact: "Przekształcenie komputera z zarezerwowanego dla inżynierów terminala tekstowego w intuicyjne narzędzie pracy biurowej, twórczości graficznej, muzycznej i rozrywki dla każdego człowieka.",
    notableOS: ["MS-DOS / PC-DOS", "Apple System 1-7 (Macintosh)", "Windows 3.11 / Windows 95 / 98", "AmigaOS", "Atari TOS", "OS/2 Warp"],
    codeSnippet: {
      language: "dos",
      code: `C:\\> TYPE AUTOEXEC.BAT\n@ECHO OFF\nPROMPT $P$G\nPATH C:\\DOS;C:\\WINDOWS\nSET TEMP=C:\\TEMP\nSMARTDRV.EXE 2048 1024\nC:\\WINDOWS\\WIN.COM`,
      caption: "Skrypt startowy systemu MS-DOS ładujący sterownik pamięci podręcznej i uruchamiający Windows."
    },
    curiosity: "Słynny dźwięk startowy Windows 95 (The Microsoft Sound) został skomponowany przez kultowego muzyka Briana Eno na zlecenie Microsoftu... a kompozytor stworzył go w całości na komputerze Apple Macintosh!"
  },
  {
    id: "open-source-nt",
    era: "Lata 1990 - 2000",
    title: "Open Source, Linux & Stabilne Jądra NT / XNU",
    subtitle: "Ruch wolnego oprogramowania, ochrona pamięci w Ring 0/3 i stabilność serwerowa",
    badge: "Ergonomia & Stabilność Klasy Enterprise",
    icon: ShieldCheck,
    keyInnovations: [
      "Stworzenie wolnego jądra Linux (Linus Torvalds, 1991) na licencji GNU GPL – wybuch rewolucji Open Source",
      "Zaprojektowanie nowoczesnego hybrydowego jądra Windows NT przez Dave'a Cutlera (fundament Windows 2000, XP, 10, 11)",
      "Przekształcenie architektury NeXTSTEP opartej na mikrojądrze Mach i BSD w system Mac OS X (Darwin / XNU)",
      "Bezwzględna sprzętowa izolacja pamięci jądra (Ring 0) od przestrzeni użytkownika (Ring 3) – koniec z niebieskimi ekranami awarii po zawieszeniu pojedynczej aplikacji"
    ],
    kernelArchitecture: "Monolityczne z modułami dynamicznymi (Linux) lub Hybrydowe (Windows NT / XNU)",
    multitaskingType: "Zaawansowane wywłaszczanie z planistami priorytetowymi (Round Robin, CFS) i wsparciem dla wieloprocesorowości (SMP)",
    interfaceType: "Dojrzałe środowiska graficzne GUI (KDE, GNOME, Windows Shell, Aqua) zintegrowane z potężnymi konsolami CLI",
    securityModel: "Ochrona pamięci Ring 0/3, tablice uprawnień ACL, wieloużytkownikowe konta z ograniczonymi prawami, zapory ogniowe",
    historicalImpact: "Linux opanował całą światową infrastrukturę sieciową, serwery WWW i chmurę obliczeniową. Z kolei architektura Windows NT i NeXTSTEP/XNU stworzyły niezwykle stabilny fundament pod współczesne komputery osobiste.",
    notableOS: ["Linux (Debian, RedHat, Slackware, Ubuntu)", "Windows NT 4.0 / 2000 / XP", "Mac OS X (NeXTSTEP / Darwin)", "FreeBSD / OpenBSD"],
    codeSnippet: {
      language: "c",
      code: `/* Linus Torvalds - słynny post na grupie comp.os.minix (25 sierpnia 1991) */\nHello everybody out there using minix -\nI'm doing a (free) operating system (just a hobby, won't be big and professional like gnu)\nfor 386(486) AT clones...`,
      caption: "Historyczna wiadomość Linusa Torvaldsa ogłaszająca powstanie jądra Linux."
    },
    curiosity: "Ponad 99.8% z 500 najszybszych superkomputerów na świecie (ranking Top500) oraz infrastruktura serwerowa Google, Amazon, NASA i Międzynarodowej Stacji Kosmicznej (ISS) działa w całości na jądrze Linux!"
  },
  {
    id: "mobile-embedded-rtos",
    era: "2007 - Współczesność",
    title: "Rewolucja Mobilna, Smartfony & Zintegrowane RTOS",
    subtitle: "Ekran dotykowy Multi-Touch, piaskownice aplikacji, oszczędzanie energii ARM i IoT",
    badge: "Współczesna Era Smart & IoT",
    icon: Smartphone,
    keyInnovations: [
      "Przełomowe interfejsy dotykowe Multi-Touch i obsługa gestów w systemach mobilnych (iOS 2007, Android 2008)",
      "Architektura piaskownicy (Sandboxing) – odizolowanie każdej aplikacji we własnym bezpiecznym kontenerze z uprawnieniami na żądanie",
      "Agresywne zarządzanie energią dla procesorów SoC (ARM Big.LITTLE), zamrażanie nieużywanych aplikacji w tle i natychmiastowe wybudzanie",
      "Szybki rozwój mikrojądrowych systemów czasu rzeczywistego (RTOS) w systemach wbudowanych (FreeRTOS, Zephyr, VxWorks) w opaskach smart, samochodach autonomicznych i medycynie"
    ],
    kernelArchitecture: "Zmodyfikowane jądro Linux (Android) / XNU Darwin (iOS) / Zminiaturyzowany deterministyczny RTOS dla IoT",
    multitaskingType: "Wywłaszczaniowa z automatycznym zamrażaniem (Freeze) i ubijaniem procesów tła przy braku RAM (Low Memory Killer)",
    interfaceType: "Interfejs dotykowy Multi-Touch, Gestury, Biometria (Face ID, Czytnik linii papilarnych), Asystenci AI",
    securityModel: "Sprzętowe szyfrowanie pamięci w koprocesorach Secure Enclave / TPM, biometria, Sandboxing, uprawnienia na żądanie",
    historicalImpact: "Smartfony stały się najpopularniejszym osobistym komputerem na świecie. Integracja systemów mobilnych z mikrokontrolerami RTOS w IoT sprawia, że systemy operacyjne otaczają człowieka w każdym urządzeniu codziennego użytku.",
    notableOS: ["Android (Google / Open Handset Alliance)", "iOS / iPadOS / watchOS (Apple)", "FreeRTOS", "Zephyr RTOS", "VxWorks (NASA)", "QNX Neutrino"],
    codeSnippet: {
      language: "kotlin",
      code: `// Dynamiczne zapytanie o uprawnienie w systemie Android / iOS:\nif (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)\n    != PackageManager.PERMISSION_GRANTED) {\n  ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 101);\n}`,
      caption: "Nowoczesny mechanizm bezpieczeństwa – aplikacja musi poprosić użytkownika o dostęp do sprzętu w trakcie działania."
    },
    curiosity: "Marsjański łazik NASA Perseverance oraz śmigłowiec Ingenuity, który wykonał dziesiątki lotów w rozrzedzonej atmosferze Marsa, sterowane są w czasie rzeczywistym przez system RTOS VxWorks oraz specjalnie przystosowane jądro Linux!"
  }
];

interface OSFamilyNode {
  id: string;
  name: string;
  year: string;
  category: "unix" | "linux" | "dos_win" | "win_nt" | "rtos";
  description: string;
  keyFeature: string;
}

const OS_FAMILY_NODES: OSFamilyNode[] = [
  {
    id: "unix_1969",
    name: "UNIX (Bell Labs)",
    year: "1969",
    category: "unix",
    description: "Stworzony w AT&T Bell Labs przez Kena Thompsona i Dennisa Ritchie. Wprowadził pojęcie procesów, potoków i hierarchicznego systemu plików.",
    keyFeature: "Filozofia 'Wszystko jest plikiem', kod w języku C"
  },
  {
    id: "bsd_1977",
    name: "BSD (UC Berkeley)",
    year: "1977",
    category: "unix",
    description: "Wersja UNIX rozwijana na uniwersytecie w Berkeley. Wprowadziła m.in. protokół TCP/IP oraz edytor vi.",
    keyFeature: "Pierwszy stos TCP/IP, licencja wolnościowa BSD"
  },
  {
    id: "nextstep_1989",
    name: "NeXTSTEP (NeXT Computer)",
    year: "1989",
    category: "unix",
    description: "System stworzony przez firmę NeXT Steve'a Jobsa na bazie mikrojądra Mach i BSD. Pierwszy system, na którym zrealizowano pierwszą stronę WWW i przeglądarkę.",
    keyFeature: "Obiektowe API Objective-C, mikrojądro Mach"
  },
  {
    id: "macos_2001",
    name: "Mac OS X / macOS",
    year: "2001",
    category: "unix",
    description: "Przekształcenie NeXTSTEP w flagowy system Apple. Oparty na otwartym rdzeniu Darwin (jądro hybrydowe XNU).",
    keyFeature: "Jądro XNU, interfejs Aqua, stabilność uniksowa"
  },
  {
    id: "ios_2007",
    name: "iOS / iPadOS (Apple)",
    year: "2007",
    category: "unix",
    description: "Mobilna wersja systemu macOS dostosowana do ekranów dotykowych, Multi-Touch i pełnego bezpieczeństwa (Sandboxing).",
    keyFeature: "Multi-Touch, Sandboxing, Secure Enclave"
  },
  {
    id: "gnu_1983",
    name: "Projekt GNU (Richard Stallman)",
    year: "1983",
    category: "linux",
    description: "Inicjatywa stworzenia całkowicie wolnego systemu operacyjnego kompatybilnego z UNIX.",
    keyFeature: "Kompilator GCC, licencja GPL, narzędzia Bash i coreutils"
  },
  {
    id: "linux_1991",
    name: "Jądro Linux (Linus Torvalds)",
    year: "1991",
    category: "linux",
    description: "Monolityczne jądro Open Source stworzone przez Linusa Torvaldsa. Połączone z narzędziami GNU utworzyło system GNU/Linux.",
    keyFeature: "Otwarty kod źródłowy, modularna architektura"
  },
  {
    id: "distros_1993",
    name: "Dystrybucje Linux (Debian/Ubuntu/RHEL)",
    year: "1993+",
    category: "linux",
    description: "Kompletne zestawy oprogramowania serwerowego i biurkowego budowane wokół jądra Linux. Dominują na serwerach i superkomputerach.",
    keyFeature: "Menedżery pakietów (apt, rpm), stabilność enterprise"
  },
  {
    id: "android_2008",
    name: "Android (Google)",
    year: "2008",
    category: "linux",
    description: "Mobilny system operacyjny Google oparty na zmodyfikowanym jądrze Linuxa i wirtualnej maszynie Java/Kotlin (ART). Najpopularniejszy OS na świecie.",
    keyFeature: "Jądro Linux, wirtualna maszyna ART, ekosystem mobilny"
  },
  {
    id: "dos_1981",
    name: "MS-DOS / PC-DOS",
    year: "1981",
    category: "dos_win",
    description: "Jednozadaniowy tekstowy system operacyjny Microsoftu stworzony na potrzeby pierwszych komputerów IBM PC 5150.",
    keyFeature: "Dostęp do trybu rzeczywistego 8086, komendy C:\\>"
  },
  {
    id: "win95_1995",
    name: "Windows 95 / 98 / Me",
    year: "1995",
    category: "dos_win",
    description: "Przełomowy 32-bitowy system ze zintegrowanym pulpitem, menu Start, paskiem zadań i wielozadaniowością z wywłaszczaniem.",
    keyFeature: "Menu Start, Plug and Play, rejestr systemowy"
  },
  {
    id: "win_nt_1993",
    name: "Windows NT",
    year: "1993",
    category: "win_nt",
    description: "Architektura zaprojektowana od zera przez Dave'a Cutlera z myślą o stabilności biznesowej, wieloprocesorowości i pełnym trybie chronionym.",
    keyFeature: "Hybrydowe jądro, system plików NTFS, pełna ochrona Ring 0/3"
  },
  {
    id: "win_modern_2001",
    name: "Windows XP / 7 / 10 / 11",
    year: "2001+",
    category: "win_nt",
    description: "Połączenie przyjaznego interfejsu rodziny Windows 9x z potężną i niezawodną architekturą jądra Windows NT.",
    keyFeature: "Dominacja na rynku PC, obsługa DirectX, x86-64 & ARM64"
  },
  {
    id: "rtos_embedded",
    name: "RTOS (FreeRTOS / Zephyr / VxWorks)",
    year: "1980+",
    category: "rtos",
    description: "Systemy operacyjne czasu rzeczywistego dla mikrokontrolerów i urządzeń krytycznych. Gwarantują natychmiastową odpowiedź w wyznaczonym reżimie czasowym.",
    keyFeature: "Determinizm czasowy, miniaturowy rozmiar RAM (kilka KB)"
  }
];

function OSEvolutionView() {
  const [activeEraId, setActiveEraId] = useState<string>("batch-rtos");
  const activeEra = OS_ERAS.find((e) => e.id === activeEraId) || OS_ERAS[0];

  const [selectedFamilyNodeId, setSelectedFamilyNodeId] = useState<string>("unix_1969");
  const selectedFamilyNode = OS_FAMILY_NODES.find((n) => n.id === selectedFamilyNodeId) || OS_FAMILY_NODES[0];

  // Mini Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: "cmd" | "res" | "err"; text: string }>>([
    { type: "res", text: "Witaj w Interaktywnym Symulatorze CLI & POSIX Systemu Operacyjnego!" },
    { type: "res", text: "Wpisz polecenie lub kliknij jeden z przycisków pomocniczych poniżej:" }
  ]);

  const handleRunCommand = (cmdToRun?: string) => {
    const cmd = (cmdToRun !== undefined ? cmdToRun : terminalInput).trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    const newLogs = [...terminalLogs, { type: "cmd" as const, text: `$ ${cmd}` }];

    if (lower === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else if (lower === "ls" || lower === "ls -l" || lower === "ls -la") {
      newLogs.push({
        type: "res",
        text: `total 48\ndrwxr-xr-x 2 root root 4096 Jul 21 12:00 documents/\n-rwxr-xr-x 1 root root  820 Jul 21 12:05 build_kernel.sh*\n-rw-r--r-- 1 root root 2048 Jul 21 12:10 system.conf\n-rw-r--r-- 1 root root  512 Jul 21 12:15 posix_spec.txt\n-rwxr-xr-x 1 root root 4096 Jul 21 12:20 rtos_scheduler.elf*`
      });
    } else if (lower.startsWith("chmod")) {
      newLogs.push({
        type: "res",
        text: `[POSIX SECURITY]: Zmieniono bit uprawnień pliku (${cmd.substring(6).trim()}).\nNowe prawidła: Właściciel=Odczyt/Zapis/Wykonanie (7), Grupa=Odczyt/Wykonanie (5), Inni=Odczyt/Wykonanie (5).`
      });
    } else if (lower === "uname -a") {
      newLogs.push({
        type: "res",
        text: `Linux os-evolution 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC Tue Jul 21 12:00:00 UTC 2026 x86_64 GNU/Linux`
      });
    } else if (lower === "top" || lower === "ps") {
      newLogs.push({
        type: "res",
        text: `PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n  1 root      20   0  168420  13200   8400 S   0.0   0.1   0:02.14 systemd\n 42 kernel    20   0       0      0      0 S   1.2   0.0   0:15.80 kworker/0:1\n 101 posix     20   0  524100  48200  21000 S   4.5   0.8   1:23.10 bash_shell\n 205 rtos_task -20  0    8192   1024    512 R  12.0   0.0   5:12.04 rtos_timer`
      });
    } else if (lower === "cat /etc/os-release") {
      newLogs.push({
        type: "res",
        text: `NAME="OS Evolution Multi-Kernel"\nVERSION="2026.1 LTS"\nID=posevolution\nPRETTY_NAME="OS Evolution Learning Environment (POSIX / RTOS / Microkernel)"\nHOME_URL="https://ais.studio/"`
      });
    } else if (lower === "help") {
      newLogs.push({
        type: "res",
        text: `Dostępne polecenia symulatora:\n - ls -l              : Lista plików z pełnymi uprawnieniami POSIX\n - chmod 755 system.conf : Modyfikacja praw dostępu pliku\n - uname -a           : Informacje o jądrze systemu\n - top                : Podgląd aktywnych procesów w czasie rzeczywistym\n - cat /etc/os-release: Dane wersji systemu\n - clear              : Czyszczenie ekranu terminala`
      });
    } else {
      newLogs.push({
        type: "err",
        text: `bash: ${cmd}: command not found. Wpisz 'help' aby zobaczyć listę komend.`
      });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  const IconComp = activeEra.icon;

  return (
    <div className="space-y-8" id="os-evolution-view">
      
      {/* Top Banner / Hero Intro */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[250px] h-[100px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded flex items-center">
                <Terminal className="w-3 h-3 mr-1" />
                Dedykowana Pod-sekcja OS
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-extrabold text-white mt-2 font-sans">
              Ewolucja Systemów Operacyjnych (OS)
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Prześledź historyczną ewolucję warstwy oprogramowania systemowego: od wczesnych systemów wsadowych i RTOS, przez rewolucję UNIX i komercyjne GUI, aż po dojrzały Open Source, architekturę NT/XNU i nowoczesne systemy mobilne oraz IoT.
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 shrink-0">
            <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
            <div className="text-left font-mono">
              <p className="text-[9px] text-slate-500 uppercase">Architektura</p>
              <p className="text-xs font-bold text-slate-200 mt-0.5">Ring 0 / Ring 3 & POSIX</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Interactive Timeline of OS Eras */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center font-mono">
          <History className="w-4 h-4 mr-1.5 text-cyan-400" />
          Pięć Epok Ewolucji Systemów Operacyjnych
        </h3>

        {/* Horizontal Era selector buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {OS_ERAS.map((era) => {
            const isSelected = era.id === activeEraId;
            const EraIcon = era.icon;
            return (
              <button
                key={era.id}
                onClick={() => setActiveEraId(era.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/25 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white"
                    : "border-slate-850 bg-[#0A0A0B]/60 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
                id={`os-era-btn-${era.id}`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/20 rounded-full blur-md animate-pulse" />
                )}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono font-bold text-amber-500">{era.era}</span>
                    <EraIcon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-600"}`} />
                  </div>
                  <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? "text-cyan-400" : "text-slate-300"}`}>
                    {era.title}
                  </h4>
                </div>
                <span className="text-[9px] text-slate-500 mt-2 block font-mono truncate">{era.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Deep Dive Detail Card for Selected OS Era */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Innovations & Details (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-start justify-between border-b border-slate-800/60 pb-3">
              <div>
                <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                  {activeEra.era} • {activeEra.badge}
                </span>
                <h3 className="text-base font-extrabold text-white mt-2 font-sans">
                  {activeEra.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeEra.subtitle}</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
                <IconComp className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* Key Innovations List */}
            <div className="mt-4">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-400" />
                Główne Innowacje Architektoniczne:
              </h4>
              <ul className="space-y-2">
                {activeEra.keyInnovations.map((innovation, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-900">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{innovation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Representative Systems Tags */}
          <div className="pt-3 border-t border-slate-800/60">
            <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1.5">Ważne Systemy tej Epoki:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeEra.notableOS.map((osName, idx) => (
                <span key={idx} className="text-[10px] font-mono font-semibold bg-cyan-950/30 text-cyan-300 border border-cyan-800/30 px-2.5 py-0.5 rounded-md">
                  {osName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Specs Breakdown & Code Snippet (5 cols) */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          
          {/* Architectural Specs Table */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 font-mono flex items-center">
              <Code className="w-4 h-4 mr-1.5 text-cyan-400" />
              Specyfikacja Techniczna OS
            </h4>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Architektura Jądra:</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{activeEra.kernelArchitecture}</span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Model Wielozadaniowości:</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{activeEra.multitaskingType}</span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Główny Interfejs:</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{activeEra.interfaceType}</span>
              </div>

              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Model Bezpieczeństwa:</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{activeEra.securityModel}</span>
              </div>
            </div>
          </div>

          {/* Historical Curiosity Box */}
          <div className="bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/20 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 mb-1.5 font-mono text-[10px] font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ciekawostka Historyczna:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
              {activeEra.curiosity}
            </p>
          </div>

        </div>

      </div>

      {/* 3. Interactive OS Family Tree (Rodzina & Genealogia OS) */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center">
              <FolderTree className="w-4 h-4 mr-1.5 text-cyan-400" />
              Interaktywne Drzewo Genealogiczne Systemów Operacyjnych
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Kliknij dowolne ogniwo w drzewie rodziny, aby poznać jego historycznych przodków i wpływ na współczesność:
            </p>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950/40 border border-cyan-800/30 text-cyan-300 px-2.5 py-1 rounded-md shrink-0">
            5 Rodzin Systemowych
          </span>
        </div>

        {/* Family Nodes Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {OS_FAMILY_NODES.map((node) => {
            const isSelected = node.id === selectedFamilyNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedFamilyNodeId(node.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-950/30 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    : "border-slate-850 bg-[#0A0A0B]/60 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
                id={`os-family-node-${node.id}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-mono font-bold text-amber-500">{node.year}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-cyan-400" : "bg-slate-700"}`} />
                </div>
                <h4 className={`text-[11px] font-bold line-clamp-2 ${isSelected ? "text-cyan-300" : "text-slate-300"}`}>
                  {node.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Family Node Detailed Card */}
        {selectedFamilyNode && (
          <div className="mt-3 p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-cyan-400">{selectedFamilyNode.name}</span>
                <span className="text-[10px] font-mono text-amber-500 font-bold bg-amber-950/30 border border-amber-800/30 px-2 py-0.5 rounded">
                  {selectedFamilyNode.year} r.
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedFamilyNode.description}</p>
            </div>
            <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg shrink-0 sm:max-w-xs text-right sm:text-left">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Kluczowa cecha:</span>
              <span className="text-xs font-bold text-slate-200 font-mono mt-0.5 block">{selectedFamilyNode.keyFeature}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Interactive Mini Terminal Simulator */}
      <div className="bg-[#0A0A0C] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold ml-2 flex items-center">
              <Terminal className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Interaktywny Terminal CLI & POSIX Simulator
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500">Bash v5.2 / POSIX Shell</span>
        </div>

        {/* Quick Command Action Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500">Wypróbuj polecenie:</span>
          {[
            { label: "ls -l (Katalog)", cmd: "ls -l" },
            { label: "chmod 755 (Uprawnienia)", cmd: "chmod 755 system.conf" },
            { label: "uname -a (Jądro)", cmd: "uname -a" },
            { label: "top (Procesy CPU)", cmd: "top" },
            { label: "cat /etc/os-release (Wersja OS)", cmd: "cat /etc/os-release" },
            { label: "clear", cmd: "clear" }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleRunCommand(btn.cmd)}
              className="text-[10px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 px-2.5 py-1 rounded-md transition-all cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Terminal Output Screen */}
        <div className="bg-[#050507] p-4 rounded-xl border border-slate-900 font-mono text-xs max-h-[220px] overflow-y-auto space-y-1.5 scrollbar-thin">
          {terminalLogs.map((log, idx) => (
            <div key={idx}>
              {log.type === "cmd" ? (
                <p className="text-cyan-400 font-bold">{log.text}</p>
              ) : log.type === "err" ? (
                <p className="text-red-400">{log.text}</p>
              ) : (
                <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">{log.text}</pre>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand();
          }}
          className="flex items-center space-x-2 bg-slate-950 p-2 rounded-xl border border-slate-800"
        >
          <span className="text-cyan-400 font-mono text-xs font-bold pl-2">$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Wpisz polecenie CLI (np. ls, chmod 755, uname -a, top, help)..."
            className="flex-1 bg-transparent text-slate-200 font-mono text-xs focus:outline-none placeholder:text-slate-600"
            id="terminal-input-field"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
          >
            Wykonaj
          </button>
        </form>

      </div>

    </div>
  );
}
