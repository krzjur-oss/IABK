import React, { useState } from "react";
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
  Minus
} from "lucide-react";

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

export default function ComputerHistory() {
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
