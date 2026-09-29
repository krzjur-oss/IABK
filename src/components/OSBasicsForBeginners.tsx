/**
 * @file OSBasicsForBeginners.tsx
 * @description Sekcja "Podstawy dla początkujących" przygotowana z myślą o uczniach szkoły podstawowej (SP).
 * Zawiera:
 * 1. Tabelę najważniejszych skrótów klawiszowych (Windows + odpowiedniki macOS Cmd)
 * 2. Przystępne wyjaśnienie hierarchii folder -> podfolder -> plik oraz zasady organizacji na pulpicie
 * 3. Tabelę porównawczą "Który system do czego" (Windows, macOS, Linux, Android, iOS) w języku nietechnicznym
 */

import React, { useState } from "react";
import {
  Keyboard,
  Command,
  FolderTree,
  Folder,
  FileText,
  File,
  Monitor,
  Smartphone,
  Gamepad2,
  Briefcase,
  Code,
  Smile,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Star,
  Search,
  Check,
  ChevronRight,
  Info,
  Laptop,
  AlertTriangle,
  Lightbulb,
  X,
  CornerDownRight,
  ArrowRight
} from "lucide-react";

interface ShortcutItem {
  id: string;
  action: string;
  winKeys: string[];
  macKeys: string[];
  category: "edycja" | "okna" | "system";
  explanation: string;
  whyUseful: string;
}

const SHORTCUTS_DATA: ShortcutItem[] = [
  {
    id: "copy",
    action: "Kopiuj",
    winKeys: ["Ctrl", "C"],
    macKeys: ["Cmd ⌘", "C"],
    category: "edycja",
    explanation: "Kopiuje zaznaczony tekst, obrazek lub plik do pamięci komputera (tzw. schowka).",
    whyUseful: "Oryginał pozostaje na swoim miejscu, a Ty możesz wkleić kopię gdzie indziej."
  },
  {
    id: "paste",
    action: "Wklej",
    winKeys: ["Ctrl", "V"],
    macKeys: ["Cmd ⌘", "V"],
    category: "edycja",
    explanation: "Wstawia skopiowany wcześniej element ze schowka w wybrane miejsce.",
    whyUseful: "Podstawa szybkiej pracy w edytorach tekstu i zarządzaniu plikami."
  },
  {
    id: "cut",
    action: "Wytnij",
    winKeys: ["Ctrl", "X"],
    macKeys: ["Cmd ⌘", "X"],
    category: "edycja",
    explanation: "Usuwa element z bieżącego miejsca i przenosi go do schowka.",
    whyUseful: "Idealne, gdy chcesz przenieść plik do innego folderu lub zdanie do innego akapitu."
  },
  {
    id: "undo",
    action: "Cofnij (Ratunek!)",
    winKeys: ["Ctrl", "Z"],
    macKeys: ["Cmd ⌘", "Z"],
    category: "edycja",
    explanation: "Cofa ostatnio wykonany krok (np. przypadkowe skasowanie tekstu lub pliku).",
    whyUseful: "Najważniejszy skrót ratunkowy każdego informatyka — ratuje przed pomyłkami!"
  },
  {
    id: "redo",
    action: "Ponów",
    winKeys: ["Ctrl", "Y"],
    macKeys: ["Cmd ⌘", "Shift ⇧", "Z"],
    category: "edycja",
    explanation: "Przywraca czynność, którą przed chwilą cofnąłeś skrótem Cofnij.",
    whyUseful: "Przydatne, gdy cofnąłeś o jeden krok za dużo."
  },
  {
    id: "save",
    action: "Zapisz plik",
    winKeys: ["Ctrl", "S"],
    macKeys: ["Cmd ⌘", "S"],
    category: "edycja",
    explanation: "Błyskawicznie zapisuje bieżący dokument, zapobiegając utracie pracy.",
    whyUseful: "Wciskaj go co kilka minut podczas pisania wypracowania lub rysowania!"
  },
  {
    id: "select_all",
    action: "Zaznacz wszystko",
    winKeys: ["Ctrl", "A"],
    macKeys: ["Cmd ⌘", "A"],
    category: "edycja",
    explanation: "Zaznacza cały tekst na stronie lub wszystkie pliki w otwartym folderze.",
    whyUseful: "Nie musisz przeciągać myszką przez 10 stron dokumentu."
  },
  {
    id: "find",
    action: "Znajdź / Szukaj",
    winKeys: ["Ctrl", "F"],
    macKeys: ["Cmd ⌘", "F"],
    category: "edycja",
    explanation: "Otwiera pasek wyszukiwania słowa w dokumencie, pliku PDF lub na stronie WWW.",
    whyUseful: "Pozwala znaleźć dowolne hasło w ułamku sekundy bez czytania całej książki."
  },
  {
    id: "switch_windows",
    action: "Przełącz program",
    winKeys: ["Alt", "Tab"],
    macKeys: ["Cmd ⌘", "Tab"],
    category: "okna",
    explanation: "Szybko przełącza widok między otwartymi oknami aplikacji bez użycia myszki.",
    whyUseful: "Pozwala płynnie przeskakiwać np. z przeglądarki ze źródłami do Worda."
  },
  {
    id: "show_desktop",
    action: "Pokaż pulpit",
    winKeys: ["Win ⊞", "D"],
    macKeys: ["F11", "lub gest 4 palców"],
    category: "okna",
    explanation: "Błyskawicznie minimalizuje wszystkie otwarte okna, odsłaniając pulpit.",
    whyUseful: "Gdy masz otwartych 10 programów i chcesz natychmiast kliknąć plik na pulpicie."
  },
  {
    id: "screenshot",
    action: "Wycinek ekranu (Zrzut)",
    winKeys: ["Win ⊞", "Shift ⇧", "S"],
    macKeys: ["Cmd ⌘", "Shift ⇧", "4"],
    category: "system",
    explanation: "Pozwala zaznaczyć fragment ekranu myszką i zapisać go jako obrazek.",
    whyUseful: "Świetne do robienia zrzutów zadań domowych, wykresów czy błędów do zgłoszenia."
  },
  {
    id: "close_window",
    action: "Zamknij program",
    winKeys: ["Alt", "F4"],
    macKeys: ["Cmd ⌘", "Q"],
    category: "okna",
    explanation: "Zamyka aktywne okno programu lub całkowicie wyłącza bieżącą aplikację.",
    whyUseful: "Szybki sposób na zamknięcie programu bez celowania myszką w mały krzyżyk X."
  },
  {
    id: "task_manager",
    action: "Menedżer zadań",
    winKeys: ["Ctrl", "Shift ⇧", "Esc"],
    macKeys: ["Cmd ⌘", "Opt ⌥", "Esc"],
    category: "system",
    explanation: "Otwiera listę działających programów i pozwala zamknąć zawieszony program.",
    whyUseful: "Gdy gra lub program 'zawiśnie' i nie reaguje na klikanie."
  }
];

interface SimpleOSComparison {
  id: string;
  name: string;
  type: string;
  deviceExample: string;
  icon: React.ElementType;
  color: string;
  borderHex: string;
  scores: {
    games: number;
    office: number;
    coding: number;
    simplicity: number;
  };
  prosForKids: string;
  consForKids: string;
  targetUser: string;
}

const OS_COMPARISON_DATA: SimpleOSComparison[] = [
  {
    id: "windows",
    name: "Microsoft Windows (10 / 11)",
    type: "Komputery PC i Laptopy",
    deviceExample: "Komputery stacjonarne, laptopy Dell, Lenovo, HP, Asus",
    icon: Monitor,
    color: "#0284c7",
    borderHex: "border-sky-500/40",
    scores: {
      games: 5,
      office: 5,
      coding: 4,
      simplicity: 4
    },
    prosForKids: "Działa na nim praktycznie każda gra komputerowa (Steam, Epic, Roblox, Minecraft, Fortnite). Standard w polskich szkołach i pracowniach komputerowych.",
    consForKids: "Czasami długo się aktualizuje; wymaga ostrożności przed wirusami ze stron z grami.",
    targetUser: "Dla graczy, do nauki w szkole i jako wszechstronny komputer dla całej rodziny."
  },
  {
    id: "macos",
    name: "Apple macOS",
    type: "Komputery Apple (MacBook, iMac, Mac mini)",
    deviceExample: "Laptopy MacBook Air, MacBook Pro, komputery stacjonarne Mac",
    icon: Laptop,
    color: "#a855f7",
    borderHex: "border-purple-500/40",
    scores: {
      games: 2,
      office: 5,
      coding: 5,
      simplicity: 5
    },
    prosForKids: "Piękny, przejrzysty i bardzo prosty w obsłudze. Praktycznie brak wirusów w codziennym użytku. Fantastyczny czas pracy na baterii w laptopach.",
    consForKids: "Słaby do gier — wiele znanych gier PC na niego nie wychodzi. Komputery Apple są bardzo drogie.",
    targetUser: "Dla osób ceniących prostotę, dla młodych grafików, montażystów wideo i programistów."
  },
  {
    id: "linux",
    name: "Linux (np. Ubuntu, Mint)",
    type: "Darmowy system na dowolny komputer",
    deviceExample: "Stare i nowe laptopy, minikomputery Raspberry Pi, serwery",
    icon: Code,
    color: "#f59e0b",
    borderHex: "border-amber-500/40",
    scores: {
      games: 3,
      office: 4,
      coding: 5,
      simplicity: 3
    },
    prosForKids: "Całkowicie bezpłatny i legalny! Działa bardzo szybko nawet na starych komputerach. Uczy, jak naprawdę działa komputer 'od środka'.",
    consForKids: "Część gier z zabezpieczeniami anty-cheat nie działa. Czasami trzeba poszukać rozwiązań problemów w internecie.",
    targetUser: "Dla przyszłych programistów, pasjonatów technologii i do ożywienia starszego laptopa."
  },
  {
    id: "android",
    name: "Google Android",
    type: "Smartfony i Tablety",
    deviceExample: "Telefony i tablety Samsung, Xiaomi, Motorola, Realme",
    icon: Smartphone,
    color: "#10b981",
    borderHex: "border-emerald-500/40",
    scores: {
      games: 4,
      office: 3,
      coding: 1,
      simplicity: 5
    },
    prosForKids: "Obsługiwany dotykowo — każdy uczeń opanuje go w kilka minut. Miliony darmowych gier i aplikacji w sklepie Google Play.",
    consForKids: "Trudno pisać długie wypracowania szkolne na małym ekranie bez fizycznej klawiatury. Nie nadaje się do profesjonalnego kodowania.",
    targetUser: "Do rozrywki, kontaktu z rodzicami i znajomymi, oglądania filmów i prostych gier mobilnych."
  },
  {
    id: "ios",
    name: "Apple iOS / iPadOS",
    type: "Smartfony iPhone i Tablety iPad",
    deviceExample: "Telefony iPhone, tablety Apple iPad",
    icon: Smartphone,
    color: "#06b6d4",
    borderHex: "border-cyan-500/40",
    scores: {
      games: 4,
      office: 4,
      coding: 2,
      simplicity: 5
    },
    prosForKids: "Niezwykle płynny, bezpieczny i łatwy. iPad z rysikiem Apple Pencil to wspaniały cyfrowy zeszyt do rysowania i notatek w szkole.",
    consForKids: "Wysoka cena urządzeń. Zamknięty system — pliki wgrywa się inaczej niż przez zwykły pendrive.",
    targetUser: "Do wygodnej nauki na tablecie, rysowania, czytania lektur i multimediów."
  }
];

export default function OSBasicsForBeginners() {
  // Stan filtrów skrótów klawiszowych
  const [shortcutSearch, setShortcutSearch] = useState<string>("");
  const [shortcutFilter, setShortcutFilter] = useState<"all" | "edycja" | "okna" | "system">("all");

  // Stan filtra przeznaczenia systemu operacyjnego
  const [systemGoalFilter, setSystemGoalFilter] = useState<"all" | "games" | "office" | "coding" | "simplicity">("all");

  // Filtrowanie skrótów
  const filteredShortcuts = SHORTCUTS_DATA.filter((s) => {
    const matchesCategory = shortcutFilter === "all" || s.category === shortcutFilter;
    const matchesSearch =
      s.action.toLowerCase().includes(shortcutSearch.toLowerCase()) ||
      s.winKeys.join("+").toLowerCase().includes(shortcutSearch.toLowerCase()) ||
      s.macKeys.join("+").toLowerCase().includes(shortcutSearch.toLowerCase()) ||
      s.explanation.toLowerCase().includes(shortcutSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-8 w-full text-slate-200" id="os-basics-container">
      
      {/* 1. Header Banner Sekcji Podstawowej */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[120px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 bg-sky-950/70 border border-sky-800/60 px-2.5 py-0.5 rounded">
                Dla Uczniów Szkoły Podstawowej
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Smile className="w-6 h-6 text-sky-400" />
              Podstawy dla Początkujących — Jak Działa Twój Komputer?
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Zanim przejdziesz do skomplikowanych jąder systemowych i terminala, opanuj 3 fundamenty:
              super-szybkie <strong>skróty klawiszowe</strong>, porządek w <strong>folderach i plikach</strong> oraz dowiedz się, <strong>który system wybrać</strong> do gier, szkoły i programowania.
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center space-x-3 self-start md:self-auto shrink-0">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-left font-sans">
              <p className="text-[10px] text-slate-500 font-mono leading-none">Poziom trudności</p>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">Klasy 4–8 SP (Podstawowy)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ZAWARTOSC 1: TABELA SKRÓTÓW KLAWISZOWYCH (WINDOWS + MAC) */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-850 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-sky-400" />
              1. Niezbędne Skróty Klawiszowe (Windows & macOS)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Skróty klawiszowe pozwalają wykonać operację w ułamku sekundy bez sięgania po myszkę. W macOS klawisz <strong className="text-purple-400 font-mono">Cmd (Command ⌘)</strong> odpowiada klawiszowi <strong className="text-sky-400 font-mono">Ctrl</strong> z Windowsa.
            </p>
          </div>

          {/* Filtry kategorii i wyszukiwarka */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Szukaj skrótu..."
                value={shortcutSearch}
                onChange={(e) => setShortcutSearch(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs rounded-lg pl-8 pr-7 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans w-36 sm:w-44"
              />
              {shortcutSearch && (
                <button
                  type="button"
                  onClick={() => setShortcutSearch("")}
                  aria-label="Wyczyść pole wyszukiwania skrótów klawiszowych"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div role="tablist" aria-label="Filtruj skróty klawiszowe według kategorii" className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                role="tab"
                aria-selected={shortcutFilter === "all"}
                onClick={() => setShortcutFilter("all")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                  shortcutFilter === "all" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Wszystkie
              </button>
              <button
                role="tab"
                aria-selected={shortcutFilter === "edycja"}
                onClick={() => setShortcutFilter("edycja")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                  shortcutFilter === "edycja" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Edycja
              </button>
              <button
                role="tab"
                aria-selected={shortcutFilter === "okna"}
                onClick={() => setShortcutFilter("okna")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                  shortcutFilter === "okna" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Okna
              </button>
              <button
                role="tab"
                aria-selected={shortcutFilter === "system"}
                onClick={() => setShortcutFilter("system")}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                  shortcutFilter === "system" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                System
              </button>
            </div>
          </div>
        </div>

        {/* Tabela skrótów */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <th className="py-3 px-4">Funkcja / Akcja</th>
                <th className="py-3 px-4 text-sky-400 font-bold">Skrót Windows</th>
                <th className="py-3 px-4 text-purple-400 font-bold">Odpowiednik macOS</th>
                <th className="py-3 px-4">Co robi w praktyce?</th>
                <th className="py-3 px-4">Dlaczego warto znać?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 font-sans">
              {filteredShortcuts.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    {s.action}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {s.winKeys.map((k, i) => (
                        <React.Fragment key={i}>
                          <kbd className="px-2 py-1 bg-slate-900 border border-sky-800/40 rounded text-[11px] font-mono font-bold text-sky-300 shadow-sm">
                            {k}
                          </kbd>
                          {i < s.winKeys.length - 1 && <span className="text-slate-500 font-bold">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {s.macKeys.map((k, i) => (
                        <React.Fragment key={i}>
                          <kbd className="px-2 py-1 bg-slate-900 border border-purple-800/40 rounded text-[11px] font-mono font-bold text-purple-300 shadow-sm">
                            {k}
                          </kbd>
                          {i < s.macKeys.length - 1 && <span className="text-slate-500 font-bold">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 leading-snug">
                    {s.explanation}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] leading-snug italic">
                    {s.whyUseful}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wskazówka dydaktyczna o skrótach */}
        <div className="bg-sky-950/20 border border-sky-800/30 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Wskazówka na lekcję informatyki:</strong> Nie musisz uczyć się wszystkich skrótów na pamięć w jeden dzień! Zacznij od <strong>Ctrl+C</strong> (kopiuj), <strong>Ctrl+V</strong> (wklej), <strong>Ctrl+Z</strong> (ratunkowe cofnij) i <strong>Ctrl+S</strong> (zapisz plik). Te cztery skróty zaoszczędzą Ci godziny pracy!
          </p>
        </div>
      </div>

      {/* 3. ZAWARTOSC 2: HIERARCHIA FOLDER -> PODFOLDER -> PLIK & PORZĄDEK NA PULPICIE */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-850 pb-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-amber-400" />
            2. Jak Działa Drzewo Katalogów: Folder → Podfolder → Plik
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dysk komputera jest zorganizowany jak wielka szafa z segregatorami. Zobacz, czym różni się folder od pliku i jak utrzymać porządek w materiałach szkolnych.
          </p>
        </div>

        {/* 3 Podstawowe Pojęcia w kartach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400 mb-3">
                <Folder className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">1. Folder (Katalog)</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                To cyfrowy segregator / teczka. Sam w sobie nie zawiera tekstu ani obrazka — służy wyłącznie do <strong>przechowywania i grupowania</strong> innych elementów.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-850 text-[11px] font-mono text-amber-400">
              Przykład: Folder „Szkoła_Klasa_6”
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-sky-950/60 border border-sky-800/50 flex items-center justify-center text-sky-400 mb-3">
                <FolderTree className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">2. Podfolder (Subfolder)</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                To folder umieszczony <strong>wewnątrz innego folderu</strong> (jak przegródka w piórniku lub kieszeń w plecaku). Tworzy kolejne gałęzie drzewa katalogów.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-850 text-[11px] font-mono text-sky-400">
              Przykład: Folder „Informatyka” wewnątrz „Szkoła”
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">3. Plik (Dokument/Zdjęcie)</h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                To konkretny zapisany dokument, obrazek, piosenka czy prezentacja. Posiada nazwę i <strong>rozszerzenie</strong> po kropce (np. <code className="text-emerald-400">.docx</code>, <code className="text-emerald-400">.jpg</code>, <code className="text-emerald-400">.sb3</code>).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-850 text-[11px] font-mono text-emerald-400">
              Przykład: „Projekt_Scratch_Janek.sb3”
            </div>
          </div>

        </div>

        {/* Graficzna wizualizacja struktury drzewiastej (Interaktywny schemat) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Lewa kolumna: Schemat drzewa katalogów ucznia (Span 7) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-850 p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FolderTree className="w-4 h-4" />
                Wzorcowe Drzewo Katalogów Ucznia
              </span>
              <span className="text-[10px] text-slate-500">Dysk lokalny (C:\) / Dokumenty</span>
            </div>

            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center space-x-2 text-white font-bold">
                <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                <span>📁 Dokumenty</span>
              </div>

              <div className="pl-6 flex items-center space-x-2 text-white font-semibold">
                <span className="text-slate-600">└──</span>
                <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                <span>📁 Szkoła_Klasa_6</span>
                <span className="text-[10px] text-slate-500 font-sans font-normal">(Folder główny roku szkolnego)</span>
              </div>

              <div className="pl-12 flex items-center space-x-2">
                <span className="text-slate-600">├──</span>
                <Folder className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sky-300 font-bold">📁 01_Informatyka</span>
              </div>

              <div className="pl-20 flex items-center space-x-2 text-[11px]">
                <span className="text-slate-600">├──</span>
                <Folder className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>📁 Projekty_Scratch</span>
              </div>
              <div className="pl-28 flex items-center space-x-2 text-[11px] text-emerald-400">
                <span className="text-slate-600">└──</span>
                <File className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>📄 gra_labirynt_v2.sb3</span>
              </div>

              <div className="pl-20 flex items-center space-x-2 text-[11px]">
                <span className="text-slate-600">└──</span>
                <Folder className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>📁 Prezentacje_PowerPoint</span>
              </div>
              <div className="pl-28 flex items-center space-x-2 text-[11px] text-emerald-400">
                <span className="text-slate-600">└──</span>
                <File className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>📄 Budowa_komputera_Kowalski.pptx</span>
              </div>

              <div className="pl-12 flex items-center space-x-2">
                <span className="text-slate-600">├──</span>
                <Folder className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-purple-300 font-bold">📁 02_Jezyk_Polski</span>
              </div>
              <div className="pl-20 flex items-center space-x-2 text-[11px] text-emerald-400">
                <span className="text-slate-600">└──</span>
                <File className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>📄 Wypracowanie_Mitologia.docx</span>
              </div>

              <div className="pl-12 flex items-center space-x-2">
                <span className="text-slate-600">└──</span>
                <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-bold">📁 03_Matematyka</span>
              </div>
              <div className="pl-20 flex items-center space-x-2 text-[11px] text-emerald-400">
                <span className="text-slate-600">└──</span>
                <File className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>📄 Wzory_i_ulamki_notatka.pdf</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850 text-[10px] text-slate-500 font-sans">
              Ścieżka do pliku: <code>C:\Użytkownicy\Uczeń\Dokumenty\Szkoła_Klasa_6\01_Informatyka\Projekty_Scratch\gra_labirynt_v2.sb3</code>
            </div>
          </div>

          {/* Prawa kolumna: Porównanie - Bałagan na Pulpicie vs Dobra Organizacja (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Zły przykład */}
            <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-xs mb-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>ZŁY PRZYKŁAD: Bałagan na Pulpicie</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Pulpit zasypany 60 luźnymi plikami o nazwach: <code className="text-red-300">bez_nazwy.png</code>, <code className="text-red-300">Nowy Dokument (3).docx</code>, <code className="text-red-300">aaa.txt</code>.
              </p>
              <span className="text-[10px] text-red-400/80 font-mono mt-2 block">
                Skutek: Znalezienie czegokolwiek zajmuje 10 minut, a pliki łatwo przypadkowo skasować.
              </span>
            </div>

            {/* Dobry przykład */}
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>DOBRY PRZYKŁAD: Porządek i Czysty Pulpit</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Pulpit to biurko — leżą na nim tylko skróty do ulubionych programów i folder <strong>„Do Posortowania”</strong>. Wszystkie prace trafiają do folderu <strong>Dokumenty</strong>.
              </p>
              <span className="text-[10px] text-emerald-400/80 font-mono mt-2 block">
                Skutek: Komputer uruchamia się szybciej, a Ty zawsze wiesz, gdzie są zadania domowe.
              </span>
            </div>

            {/* 3 Żelazne reguły */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 block mb-1">3 Złote Zasady Nazewnictwa Plików:</span>
              <p>1. Podawaj przedmiot i temat (np. <code>Historia_Notatka_Rzym.docx</code>).</p>
              <p>2. Dodaj swoje nazwisko, jeśli wysyłasz plik nauczycielowi (np. <code>Prezentacja_Jan_Kowalski.pptx</code>).</p>
              <p>3. Nie kasuj rozszerzenia po kropce (np. <code>.docx</code>) — bez niego komputer nie wie, czym otworzyć plik!</p>
            </div>

          </div>

        </div>
      </div>

      {/* 4. ZAWARTOSC 3: TABELA PORÓWNAWCZA "KTÓRY SYSTEM DO CZEGO" */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-850 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-emerald-400" />
              3. Który System Operacyjny Do Czego? (Przewodnik Ucznia)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Porównanie Windows, macOS, Linux, Android i iOS w 4 codziennych kategoriach w prostym języku.
            </p>
          </div>

          {/* Szybki selektor celu ucznia */}
          <div role="tablist" aria-label="Wybierz cel użytkowania komputera" className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-mono text-slate-500 mr-1">Co jest dla Ciebie najważniejsze?</span>
            <button
              role="tab"
              aria-selected={systemGoalFilter === "all"}
              onClick={() => setSystemGoalFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-sans text-xs ${
                systemGoalFilter === "all" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Wszystko
            </button>
            <button
              role="tab"
              aria-selected={systemGoalFilter === "games"}
              onClick={() => setSystemGoalFilter("games")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                systemGoalFilter === "games" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Gry</span>
            </button>
            <button
              role="tab"
              aria-selected={systemGoalFilter === "office"}
              onClick={() => setSystemGoalFilter("office")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                systemGoalFilter === "office" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Szkoła i Biuro</span>
            </button>
            <button
              role="tab"
              aria-selected={systemGoalFilter === "coding"}
              onClick={() => setSystemGoalFilter("coding")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                systemGoalFilter === "coding" ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Programowanie</span>
            </button>
            <button
              role="tab"
              aria-selected={systemGoalFilter === "simplicity"}
              onClick={() => setSystemGoalFilter("simplicity")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${
                systemGoalFilter === "simplicity" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Prostota</span>
            </button>
          </div>
        </div>

        {/* Tabela porównawcza 5 systemów */}
        <div className="grid grid-cols-1 gap-4">
          {OS_COMPARISON_DATA.map((os) => {
            const Icon = os.icon;
            
            // Highlight na podstawie wybranego celu
            const isHighlighted =
              (systemGoalFilter === "games" && os.scores.games >= 5) ||
              (systemGoalFilter === "office" && os.scores.office >= 5) ||
              (systemGoalFilter === "coding" && os.scores.coding >= 5) ||
              (systemGoalFilter === "simplicity" && os.scores.simplicity >= 5);

            return (
              <div
                key={os.id}
                className={`bg-slate-950/70 border rounded-2xl p-5 transition-all shadow-md ${
                  isHighlighted
                    ? "border-sky-400 ring-2 ring-sky-500/30 bg-slate-900/60"
                    : "border-slate-850 hover:border-slate-700"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  
                  {/* Lewa kolumna: Nazwa, typ, ikona (Span 4) */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{ backgroundColor: `${os.color}15`, borderColor: `${os.color}40`, color: os.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{os.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          {os.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      <strong>Przykładowe urządzenia:</strong> {os.deviceExample}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-sky-300">
                      🎯 {os.targetUser}
                    </div>
                  </div>

                  {/* Środkowa kolumna: 4 Oceny Gwiazdkowe (Span 4) */}
                  <div className="lg:col-span-4 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                        <Gamepad2 className="w-3.5 h-3.5 text-sky-400" /> Gry komputerowe:
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < os.scores.games ? "text-amber-400 fill-amber-400" : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Szkoła i Biuro:
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < os.scores.office ? "text-amber-400 fill-amber-400" : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                        <Code className="w-3.5 h-3.5 text-purple-400" /> Programowanie:
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < os.scores.coding ? "text-amber-400 fill-amber-400" : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                        <Smile className="w-3.5 h-3.5 text-pink-400" /> Prostota obsługi:
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < os.scores.simplicity ? "text-amber-400 fill-amber-400" : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prawa kolumna: Plusy i Minusy dla ucznia (Span 4) */}
                  <div className="lg:col-span-4 space-y-2 text-xs font-sans">
                    <div className="flex items-start space-x-2 text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="leading-snug text-[11px]">{os.prosForKids}</p>
                    </div>
                    <div className="flex items-start space-x-2 text-red-300 bg-red-950/30 p-2 rounded-lg border border-red-900/40">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <p className="leading-snug text-[11px]">{os.consForKids}</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Podsumowanie końcowe */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-slate-300 leading-snug">
              Gotowy poznać tajniki inżynieryjne? Przełącz powyższe zakładki na <strong>Warstwy i Jądro</strong> lub <strong>Planistę CPU</strong>, aby zobaczyć, jak system zarządza pamięcią RAM i procesorem!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
