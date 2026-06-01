import React, { useState } from "react";
import { motion } from "motion/react";
import { Info, Award, ShieldAlert, History, FileText, CheckCircle, Terminal, Landmark } from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "maintenance";
  changes: string[];
}

const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    version: "v4.3.0-STABLE",
    date: "Czerwiec 2026 r. (Aktualna)",
    title: "Dodatkowe Kategorie Sprzętowe & Baza Quizu: 30 pytań",
    type: "major",
    changes: [
      "Wprowadzenie 4 nowych, bogato opisanych i zilustrowanych architektur sprzętowych: Tablet (unibody z laminowanym ekranem), Komputer Jednopłytkowy (SBC, piny GPIO, zintegrowane układy), Konsola do Gier (APU ze zunifikowaną pamięcią GDDR6) oraz Superkomputer (węzły blade, akceleratory tensorowe).",
      "Dodanie precyzyjnych i w pełni interaktywnych modeli geometrycznych 3D (eksplodowany widok warstw/podzespołów) dla wszystkich nowych kategorii komputerów bezpośrednio w symulatorze.",
      "Rozbudowa Quizu Wiedzy o 6 trudnych i specjalistycznych pytań (aktualny łączny zasób to aż 30 unikalnych pytań na wszystkich 6 poziomach trudności), poruszających tematykę m.in. silników haptycznych, magistral GPIO, interfejsu ciekłego metalu (Liquid Metal) czy sieci i rurociągów chłodzenia bezpośredniego cieczą (DLC) w superkomputerach.",
      "Optymalizacja siatki wyboru kategorii komputerowej celem wygody użytkowania i zapobieżenia ucięciom tekstu na wszelkich urządzeniach mobilnych oraz tabletach."
    ]
  },
  {
    version: "v4.2.0",
    date: "Maj 2026 r.",
    title: "Rozbudowa Quizu, Integracja PWA i Sekcja Metryczna",
    type: "major",
    changes: [
      "Wdrożenie pełnego standardu Progressive Web App (PWA) z automatyczną obsługą buforowania Service Worker, umożliwiając wygodną instalację oraz stabilną pracę offline.",
      "Zaprojektowanie zupełnie nowej, dedykowanej sekcji 'O programie i Autorze' z pełnymi informacjami prawno-licencyjnymi oraz changelogiem.",
      "Poważna rozbudowa Quizu wiedzy: wprowadzono bazę pytań podzielonych na precyzyjne poziomy trudności. Quiz generuje unikalny, losowy zestaw pytań od najprostszych do technicznego poziomu eksperckiego.",
      "Sformatowanie i przebudowanie kluczowych parametrów technicznych w sekcji 'Historia i ewolucja PC' w celu uniknięcia obcinania lub ucięć tekstu specyfikacji na mniejszych ekranach."
    ]
  },
  {
    version: "v4.1.0",
    date: "Maj 2026 r.",
    title: "Historia PC, Optymalizacje Sieciowe i GitHub Pages Compat",
    type: "minor",
    changes: [
      "Stworzenie interaktywnego, bogato ilustrowanego modułu 'Historia i ewolucja PC', prezentującego ewolucję maszyn liczących od starożytnego abakusa po nowoczesne układy wielordzeniowe.",
      "Skonfigurowanie relatywnej bazy adresowej `./` w konfiguratorze Vite, aby umożliwić elastyczne osadzanie aplikacji w głębokich strukturach adresacyjnych (np. subkatalogi GitHub Pages jak https://krzjur-oss.io/IABK/).",
      "Dodanie makiety sieciowej opartej na wizualizacji routerów, przełączników i stacji roboczych WAN/LAN z wbudowanym systemem diagnostyki połączeń."
    ]
  },
  {
    version: "v4.0.0",
    date: "Kwiecień 2026 r.",
    title: "Premiera Platformy i Interaktywności 3D",
    type: "major",
    changes: [
      "Uruchomienie pierwszej publicznej wersji Atlasu Budowy Komputera.",
      "Stworzenie interaktywnego silnika renderowania modeli 3D ułatwiającego eksplorację komponentów stacjonarnych, laptopów, smartfonów oraz serwerów.",
      "Zbudowanie trójwymiarowego, krokowego symulatora montażu jednostki komputerowej i systemu ewaluacji błędów instalacyjnych.",
      "Integracja makiety peryferyjnej ilustrującej urządzenia wejściowe, wyjściowe oraz zasady działania klawiatur mechanicznych."
    ]
  }
];

export default function ProgramInfo() {
  const [selectedVersion, setSelectedVersion] = useState<string>(CHANGELOG_DATA[0].version);

  const activeChangelog = CHANGELOG_DATA.find((entry) => entry.version === selectedVersion) || CHANGELOG_DATA[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6 w-full"
      id="program-info-tab"
    >
      {/* Top Welcome Title Grid */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0a0f1d] to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-full bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-4 h-4" />
              <span>Metryka i Przeznaczenie Platformy</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              O programie i Autorze
            </h2>
            <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
              Odkryj genezę projektu, warunki wolnego licencjonowania edukacyjnego stworzone przez nauczyciela informatyki, zasady darmowego użytku oraz pełną historię ewolucji platformy dydaktycznej.
            </p>
          </div>
          <div className="bg-[#0f172a]/80 border border-slate-800 rounded-xl px-4 py-3 shrink-0 flex flex-col justify-center text-center">
            <span className="text-[10px] text-slate-500 font-mono uppercase">Zalecana Wersja</span>
            <span className="text-sm font-bold text-cyan-400 font-mono mt-0.5">v4.3.0 - LATEST</span>
            <span className="text-[9px] text-[#22c55e]/90 font-mono mt-1 bg-[#22c55e]/15 px-2 py-0.5 rounded-full border border-[#22c55e]/20 inline-block mx-auto">
              Zgodność PWA: Offline OK
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Info + Legal (Left) | Interactive Changelog (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Editorial & Legal sections (span 7) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Section 1: Autor i Geneza */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 flex-1">
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-3">
              <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm md:text-base">Informacje o Autorze</h3>
                <p className="text-[10px] text-slate-500 font-mono">POMYSŁODAWCA & DEWELOPER PROJEKTU</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Autorem i twórcą oprogramowania jest <strong className="text-white font-semibold">mgr Krzysztof Jureczek</strong>, czynny zawodowo nauczyciel przedmiotów informatycznych.
            </p>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Program powstał z chęci dzielenia się rzetelną wiedzą z uczniami szkół podstawowych i średnich oraz w celu ułatwienia i uatrakcyjnienia codziennej pracy na zajęciach informatyki, kółkach naukowych oraz lekcjach sprzętowych. Platforma pozwala przenieść trudne tematy technologii półprzewodników i okablowania sieciowego do interaktywnego, bezpiecznego środowiska symulacji 3D.
            </p>
          </div>

          {/* Section 2: Regulamin, Licencja, Prawa */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-4 flex-1">
            <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-3">
              <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm md:text-base">Regulamin i Licencja Użytkowania</h3>
                <p className="text-[10px] text-slate-500 font-mono">DARMOWY DOTACYJNY MODEL DYDAKTYCZNY</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl space-y-1.5">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center font-mono">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                  Przeznaczenie i Regulamin
                </h4>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Program przeznaczony jest wyłącznie do <strong className="text-slate-200">darmowego użytku edukacyjnego</strong>, w tym do lekcji szkolnych realizowanych przez grona pedagogiczne, samokształcenia uczniów i studentów, a także pasjonatów chcących poznać architekturę systemów operacyjnych i fizyczną strukturę komputerów.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/40 border border-[#ea580c]/10 rounded-xl space-y-1.5">
                <h4 className="text-xs font-bold text-[#f97316] uppercase tracking-widest flex items-center font-mono">
                  <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full mr-2" />
                  Warunki Licencyjne
                </h4>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Można używać platformy w pełni za darmo w celach dydaktyczno-naukowych, jednak <strong className="text-slate-200">zabrania się kopiowania, modyfikowania, zmieniania kodu źródłowego oraz pobierania jakichkolwiek opłat</strong> za udostępnianie, wdrażanie bądź użytkowanie programu bez uprzedniej, pisemnej i imiennej zgody autora.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Version Changelog (span 5) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-xs md:text-sm">Vite & PWA Releases</h3>
                  <p className="text-[10px] text-slate-500 font-mono">DZIENNIK ZMIAN I AKTUALIZACJI</p>
                </div>
              </div>
            </div>

            {/* Version Selectors */}
            <div className="flex space-x-2 border-b border-slate-900 pb-3 overflow-x-auto scrollbar-none">
              {CHANGELOG_DATA.map((entry) => {
                const isActive = entry.version === selectedVersion;
                return (
                  <button
                    key={entry.version}
                    onClick={() => {
                      setSelectedVersion(entry.version);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border transition-colors shrink-0 ${
                      isActive
                        ? "bg-cyan-950/50 text-cyan-400 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                        : "bg-slate-950 text-slate-500 border-slate-900 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    {entry.version.replace("-STABLE", "")}
                  </button>
                );
              })}
            </div>

            {/* Details page content */}
            <motion.div
              layoutId="changelog-details"
              transition={{ duration: 0.2 }}
              className="space-y-3.5 pt-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 font-mono">{activeChangelog.version}</span>
                <span className="text-[10px] text-slate-500 font-mono">{activeChangelog.date}</span>
              </div>
              
              <h4 className="text-xs font-bold text-slate-200 uppercase mt-1 leading-normal">
                {activeChangelog.title}
              </h4>

              <div className="space-y-2 mt-3 max-h-[320px] overflow-y-auto pr-1">
                {activeChangelog.changes.map((change, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed">
                      {change}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Bottom terminal code signature block */}
          <div className="pt-4 mt-6 border-t border-slate-900 font-mono text-[9px] text-slate-600 flex items-center justify-between">
            <span className="flex items-center">
              <Terminal className="w-3.5 h-3.5 mr-1 text-cyan-500" />
              <span>build.log: 2026-06-01-stable</span>
            </span>
            <span>compiled safely</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
