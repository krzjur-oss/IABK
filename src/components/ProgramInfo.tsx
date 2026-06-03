import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Award, ShieldAlert, History, FileText, CheckCircle, Terminal, Landmark, X, Scale, Shield } from "lucide-react";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "maintenance";
  changes: string[];
}

const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    version: "v4.8.0-STABLE",
    date: "Czerwiec 2026 r. (Aktualna)",
    title: "Interaktywny Słownik Techniczny, Osobliwości Kwantowo-Biologiczne i Fizyczne Granice Krzemu",
    type: "major",
    changes: [
      "Wdrożenie dedykowanego, samodzielnego modułu nawigacyjnego 'Słownik IT' (Interactive Technical Glossary), umiejscowionego bezpośrednio w menu głównym pomiędzy Ciekawostkami a informacjami O Programie.",
      "Zaimplementowanie interaktywnego paska wyszukiwania działającego w czasie rzeczywistym, pozwalającego natychmiastowo przeszukiwać bazy terminów technicznych i ich definicji według fraz oraz słów kluczowych.",
      "Zaprojektowanie responsywnego indeksu alfabetycznego (szybkiej selekcji literowej) umożliwiającego szybkie klastrowanie i filtrowanie haseł według pierwszej litery.",
      "Ekspansja technicznej bazy definicyjnej i uzupełnienie słownika o wszystkie kluczowe pojęcia i skróty IT niewyjaśnione dotąd w atlasie, m.in. RAM, SSD, HDD, LAN, WAN, DNS, DHCP, MAC, IP, NAT, TCP, UDP, Ethernet, PSU, BIOS, Qubit, Moore, FSB, Northbridge, Southbridge, AGP, PCI, TPU, ISA, Router, Switch, Układ Scalony oraz Mikroprocesor.",
      "Zaprojektowanie i wdrożenie dedykowanego obszaru 'Ciekawostki i Nowości' (Osobliwości Informatyczne) z interaktywnymi stanowiskami badawczymi analizującymi przyszłość systemów obliczeniowych.",
      "Zaimplementowanie interaktywnego Symulatora Pojedynczego Kubitu: umożliwiono aplikowanie kwantowych bramek logicznych (Hadamard H, Pauli-X NOT, reset) na sferze Blocha, obserwując prawdopodobieństwo superpozycji stanów |0⟩ i |1⟩ oraz kolaps fali przy pomiarze.",
      "Wdrożenie Kalkulatora Gęstości DNA: pozwala na dynamiczne przeliczenie danych cyfrowych (GB/TB) na rzeczywistą masę fizyczną cząsteczek genetycznych w nanogramach i par zasad nukleotydowych A-T/C-G.",
      "Opracowanie interaktywnego analizatora barier krzemowych i prawa Moore'a: symulator tunelowania kwantowego wizualizuje ucieczki prądu w procesie schodzenia tranzystorów poniżej 5nm.",
      "Stworzenie symulatora hydro-fizycznego zanurzeniowego chłodzenia (Cray-2 Aquarium Model) z interaktywną kontrolą obciążenia rdzeni oraz wyliczaniem przepływu cieczy.",
      "Pełna synchronizacja metadanych i systemu wersji interfejsu (v4.8.0-STABLE) w raportach diagnostycznych quizu, nakładkach licencyjnych oraz nagłówkach aplikacji celem zachowania spójności dydaktycznej."
    ]
  },
  {
    version: "v4.7.0-STABLE",
    date: "Czerwiec 2026 r.",
    title: "Tryb Ostry Fokus 360°, Gesty Multitouch, Baza Wiedzy o Złączach, Oś Czasu Peryferii i Diagnostyka 'Szybki Serwis'",
    type: "major",
    changes: [
      "Zaprojektowanie i wdrożenie fotorealistycznych detali struktur 3D w oknie podglądu sprzętu (PC3DViewer): rozbudowano warstwy geometryczne podzespołów o precyzyjne elementy – m.in. wielofazowe sekcje zasilania VRM i sloty PCIe na płycie głównej, miedziane rurki cieplne oraz obracający się wirnik wentylatora chłodzenia, metalowe osłony i pasek świetlny RAM, kości pamięci NAND ze srebrnym kontrolerem na dysku SSD M.2, a także trójwentylatorową pokrywę maskującą karty graficznej (GPU) z podświetlanym panelem LED.",
      "Rozbudowa sekcji 'Historia i Ewolucja PC' o dedykowaną, interaktywną Oś Czasu Peryferii Komputerowych (monitory, myszy, klawiatury, drukarki) rejestrującą kluczowe przełomy technologiczne wraz z zaawansowanymi symulacjami fizyczno-pomiarowym (porównanie emisyjności CRT i OLED, stopień zabrudzenia wałków myszy kulkowej i regeneracja izopropanolem, sprawdzian profilu nacisku kopułek oraz przełączników magnetycznych Halla z technologią Rapid Trigger, a także dynamiczne drukowanie kolumnowe igłowe oraz laserowe wtapianie elektrostatyczne).",
      "Zaimplementowanie modułu interaktywnej diagnostyki 'Szybki Serwis' w karcie Sieci: dodano dedykowany system generowania losowych awarii sieciowych (takich jak zerwane połączenie WAN z ONT, brak hosta DHCP dający adresy APIPA, błędny DNS czy błędy statycznych podsieci), zmuszający do użycia komend diagnostycznych w wbudowanym terminalu i wprowadzenia procedur naprawczych.",
      "Wdrożenie Trybu Ostry Fokus (Sharp Focus) dla Modelu 3D: po zaznaczeniu dowolnego podzespołu w symulatorze geometrycznym, kamera wykonuje płynny zoptymalizowany najazd (zoom) oraz automatyczny obrót o 360 stopni wokół wybranego elementu, umożliwiając precyzyjną inspekcję przestrzenną pod każdym kątem.",
      "Wzbogacenie sterowania dotykowego w oknie 3D: dodano pełne wsparcie dla gestów wielodotykowych (multitouch). Zaimplementowano płynne przybliżanie i oddalanie metodą szczypania (pinch-to-zoom) oraz obracanie kamery wokół osi poprzez przeciąganie dwoma palcami, usprawniając interakcję na tabletach i smartfonach.",
      "Opracowanie interaktywnej bazy wiedzy o ewolucji peryferii i złączy transmisyjnych (Baza Wiedzy o Złączach) w module Peryferii: wdrożono wielowarstwowe zestawienie złączy wideo (VGA, HDMI, DisplayPort, USB-C Alt Mode), transferowych (PS/2, LPT Centronics, USB-A, USB-C) oraz audio (Jack 3.5mm, optyczny TOSLINK/SPDIF) wraz ze schematycznymi sylwetkami wtyków, liczbą styków, napięciem, datą debiutu oraz historycznym podziałem ewolucyjnym (Dawniej vs Dziś).",
      "Dodanie interaktywnego przewodnika po mediach transmisyjnych: zawarto zintegrowany algorytm porównywania cech fizycznych miedzi, światłowodów i fal radiowych wraz z dynamicznymi wskaźnikami poziomu przepustowości, opóźnień fali elektromagnetycznej, ubytków napięć i szczegółową analizą zalet i wad.",
      "Integracja prawnej dokumentacji wewnętrznej: wdrożono zintegrowaną przeglądarkę postanowień licencyjnych (WALD) oraz Regulaminu z polityką ochrony danych osobowych (RODO / GDPR) w postaci eleganckich, responsywnych nakładek modalnych dostępnych offline.",
      "Opracowanie dedykowanych dokumentów opisowych: przygotowano kompletne akta repozytoryjne projektu (pliki README.md, LICENCJA.md oraz REGULAMIN.md) opisujące rygory bezpieczeństwa BHP montażu i transparentność działania modułów Integrity Tracker.",
      "Uproszczenie i optymalizacja sterowania kamerą: dodano dedykowany przełącznik stanu 'Ostry Fokus' (WŁ/WYŁ) bezpośrednio na dolnym pasku narzędziowym przeglądarki trójwymiarowej w celu pełnej kontroli nad automatycznym najazdem.",
      "Ulepszenie układu sekcji metadanych: zmieniono strukturę prezentacji etykiet \"KLASA ENERGETYCZNA\" oraz \"TRANSFORMACJA\" w panelu szczegółów. Od teraz nagłówki i etykiety wyświetlane są w układzie pionowym, natomiast powiązane z nimi szczegółowe opisy rozciągają się w poziomie, co znacznie zwiększa czytelność i eliminuje nadmierne ściskanie tekstu na urządzeniach mobilnych.",
      "Podniesienie wersji bazowej środowiska oprogramowania do v4.7.0 w celu zapewnienia spójności dokumentacyjnej."
    ]
  },
  {
    version: "v4.6.0-STABLE",
    date: "Czerwiec 2026 r.",
    title: "Detalizacja Gniazd Sprzętowych, Uszczegółowienie Modeli 3D i Śledzenie Rzetelności Dydaktycznej",
    type: "major",
    changes: [
      "Uszczegółowienie fizycznej i technicznej architektury gniazd procesora (Socket/Bus): dodano dokładne dane o gniazdach procesora (LGA1700, AM5, BGA, itp.) oraz technologii szyny pamięci ram/pamięci zintegrowanej dla wszystkich 8 klas urządzeń (Desktop, Laptop, Smartfon, Serwer, Tablet, SBC, Game Console, Supercomputer).",
      "Wzbogacenie integracji quizowej (Weryfikacja Wiedzy): skorelowano pytania quizu z programem nauczania, dodając automatyczne, precyzyjne odnośniki referencyjne wskazujące, gdzie uczeń znajdzie właściwe odpowiedzi po udzieleniu błędnej odpowiedzi.",
      "Zabezpieczenie testów (Educational Integrity Tracker): wdrożono bezkompromisowe systemy wykrywania opuszczania modułu testu, działające na poziomie zmiany zakładek SPA, zmiany kart przeglądarki (Visibility API) oraz utraty ostrości okna (Window Focus/Blur) w celu eliminacji ściągania.",
      "Aktualizacja silnika eksplozji geometrycznych: skompilowano bardziej szczegółowe opisy dla wszystkich modeli 3D i warstw sprzętowych w Atlasie."
    ]
  },
  {
    version: "v4.5.1-STABLE",
    date: "Czerwiec 2026 r.",
    title: "Weryfikacja Rzetelności Quizu i Trwała Pamięć Sesji",
    type: "minor",
    changes: [
      "Wdrożenie mechanizmu trwałego zapisu stanu sesji aktywnego quizu w pamięci podręcznej przeglądarki (localStorage) zapobiegającego utracie postępów przy odświeżeniu/przeładowaniu strony.",
      "Zaimplementowanie inteligentnego systemu śledzenia zmiany modułów i opuszczania obszaru testu (Educational Integrity Focus Tracker) w czasie rzeczywistym.",
      "Dodanie dynamicznych ostrzeżeń interfejsu o utracie statusu samodzielności przy próbie zaglądania do innych zakładek.",
      "Rozbudowanie raportów dydaktycznych (.txt), historii prób na urządzeniu oraz certyfikatu końcowego o dedykowaną rubrykę 'Weryfikacja Samodzielności' z unikalnym podpisem cyfrowym."
    ]
  },
  {
    version: "v4.5.0-STABLE",
    date: "Czerwiec 2026 r.",
    title: "Rozbudowane Udoskonalenia Symulatora Montażu PC, Diagnostyki POST oraz Dźwięków",
    type: "major",
    changes: [
      "Wdrożenie zaawansowanego interaktywnego stanowiska montażu jednostki komputerowej opartego na w pełni skalowalnym, precyzyjnym schemacie wektorowym.",
      "Zaimplementowanie dedykowanych ostrzeżeń technicznych i wskazówek eksperckich (Expert Insights) dla każdego krytycznego podzespołu w celu ochrony przed błędami montażowymi (np. ochrona gniazda LGA, konfiguracja pamięci Dual-Channel, poprawne kołki dystansowe M.2).",
      "Dodanie aktywnego systemu wykrywania i raportowania błędów kolejności montażu podzespołów z precyzyjnymi instrukcjami korygującymi kolejny krok.",
      "Wkomponowanie unikalnego syntezatora efektów dźwiękowych Web Audio API z dedykowanym panelem sterującym bezpośrednio w obszarze symulatora.",
      "Opracowanie pełnej sekwencji diagnostycznej płyty głównej (Power-On Self-Test) z dynamicznymi wielokolorowymi diodami Debug LED (CPU, DRAM, VGA, BOOT) oraz interaktywną konsolą bootowania systemu operacyjnego ATLAS_OS."
    ]
  },
  {
    version: "v4.4.0-STABLE",
    date: "Czerwiec 2026 r.",
    title: "Integracja Nowego Systemu Dydaktyczno-Quizowego i Zgodności z RODO",
    type: "major",
    changes: [
      "Wdrożenie modułu autoryzacyjnego i personalizacji dyplomów (wprowadzanie imienia, nazwiska oraz klasy ucznia) zapamiętywanego w bezpiecznej sesji.",
      "Dodanie precyzyjnego, dynamicznego stopwatcha (stoper lekcyjny) mierzącego dokładny czas rozwiązywania testu wiedzy.",
      "Zaprojektowanie i implementacja 'Dziennika Dydaktycznego' (Historia Wyników) zapamiętującego historyczne próby rozwiązań lokalnie z pełnymi statystykami średnich wyników, rekordami punktowymi i czasem.",
      "Stworzenie systemu bezpiecznego generowania i pobierania oficjalnego raportu (.txt) z cyfrowym tokenem zabezpieczającym (sumą kontrolną autentyczności) do przedłożenia nauczycielom w klasie.",
      "Opracowanie i umieszczenie oficjalnego oświadczenia o pełnej zgodności z przepisami RODO / GDPR (całkowity brak przesyłu danych osobowych na zewnętrzne bazy danych, przetwarzanie 100% lokalne).",
      "Dodanie ścieżki dźwiękowej retro-komputerowej opartej o syntezator Web Audio API, dający natychmiastowy feedback audio przy wyborze odpowiedzi i zwycięstwie.",
      "Wzbogacenie interfejsu Quizu o angażujące, płynne animacje przejść między kolejnymi pytaniami oraz elementami opcji za pomocą Framer Motion (motion/react).",
      "Rozszerzenie architektury offline (Service Worker) o buforowanie pobieranego dynamicznie pliku pytań 'quiz-questions.json' z sieci oraz zintegrowanie dynamicznego mechanizmu ładowania asynchronicznego bazy pytań z fallbackiem na zasoby lokalne."
    ]
  },
  {
    version: "v4.3.0",
    date: "Czerwiec 2026 r.",
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
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);
  const [showRegulationsModal, setShowRegulationsModal] = useState<boolean>(false);

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
              Odkryj genezę projektu, warunki wolnego licencjonowania edukacyjnego stworzone przez nauczyciela i pasjonata programowania, zasady darmowego użytku oraz pełną historię ewolucji platformy dydaktycznej.
            </p>
          </div>
          <div className="bg-[#0f172a]/80 border border-slate-800 rounded-xl px-4 py-3 shrink-0 flex flex-col justify-center text-center">
            <span className="text-[10px] text-slate-500 font-mono uppercase">Zalecana Wersja</span>
            <span className="text-sm font-bold text-cyan-400 font-mono mt-0.5">v4.8.0 - LATEST</span>
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
              Autorem i twórcą oprogramowania jest <strong className="text-white font-semibold">mgr Krzysztof Jureczek</strong>, czynny zawodowo nauczyciel (posiadający pełne uprawnienia do nauczania informatyki, choć na co dzień uczący innych przedmiotów) oraz wielki pasjonat programowania.
            </p>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Program powstał z pasji programistycznej oraz chęci dzielenia się rzetelną wiedzą z uczniami szkół podstawowych i średnich. Ma on na celu ułatwienie i uatrakcyjnienie codziennej pracy na zajęciach lekcyjnych, kółkach komputerowych/programistycznych oraz lekcjach sprzętowych. Platforma pozwala przenieść trudne tematy technologii półprzewodników i okablowania sieciowego do interaktywnego, bezpiecznego środowiska symulacji 3D.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <button
                onClick={() => setShowLicenseModal(true)}
                className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 cursor-pointer"
                id="btn-show-license"
              >
                <Scale className="w-4 h-4 shrink-0" />
                <span>Tekst Licencji (WALD)</span>
              </button>
              <button
                onClick={() => setShowRegulationsModal(true)}
                className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 cursor-pointer"
                id="btn-show-regulations"
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span>Regulamin i RODO</span>
              </button>
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


      {/* Embedded Full License Modal Overlay */}
      <AnimatePresence>
        {showLicenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="license-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-slate-800 max-w-2xl w-full max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <Scale className="w-5 h-5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">Pełna Licencja WALD</h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">Wolna Autorska Licencja Dydaktyczna</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLicenseModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Zamknij"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable document style text) */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs md:text-sm leading-relaxed font-sans max-h-[60vh] scrollbar-thin scrollbar-thumb-slate-850">
                <div className="text-center pb-4 border-b border-slate-900 space-y-1">
                  <h4 className="font-extrabold text-white text-base tracking-tight font-sans">WOLNA AUTORSKA LICENCJA DYDAKTYCZNA (WALD)</h4>
                  <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">Projekt: Interaktywny Atlas Komputera (wersja v4.8.0 i wyższe)</p>
                  <div className="text-[11px] text-slate-500 py-1 leading-normal font-mono">
                    Właściciel Praw Autorskich i Twórca: <strong className="text-slate-300">mgr Krzysztof Jureczek</strong><br />
                    Copyright © 2026 mgr Krzysztof Jureczek. Wszelkie prawa zastrzeżone.
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" /> PREAMBUŁA
                  </h5>
                  <p className="text-slate-400 bg-slate-900/30 p-3 rounded-lg border border-slate-900 italic">
                    Niniejsza licencja powstała w celu zabezpieczenia niekomercyjnego, wyłącznie edukacyjnego charakteru projektu "Interaktywny Atlas Komputera". Intencją autora jest bezpłatne dostarczenie kompletnej platformy edukacyjnej dla szkół, nauczycieli, uczniów oraz samouków, przy jednoczesnym zachowaniu nienaruszalności kodu źródłowego i zabezpieczeniu przed nieautoryzowanym wykorzystaniem komercyjnym oraz dystrybucją zarobkową przez podmioty trzecie.
                  </p>
                </div>

                <div className="space-y-2 text-slate-300">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider">§ 1. DEFINICJE</h5>
                  <p className="pl-1">
                    <strong>Oprogramowanie</strong> – aplikacja internetowa (SPA/PWA) „Interaktywny Atlas Komputera” wraz z kodem źródłowym (HTML, CSS/Tailwind, TypeScript/JavaScript), modelami geometrycznymi, bazą pytań quizowych, grafiką wektorową oraz skompilowanymi plikami wykonywalnymi.
                  </p>
                  <p className="pl-1">
                    <strong>Autor</strong> – mgr Krzysztof Jureczek, jedyny twórca i wyłączny dysponent autorskich praw majątkowych i osobistych do Oprogramowania.
                  </p>
                  <p className="pl-1">
                    <strong>Użytkownik</strong> – każda osoba fizyczna, szkoła, uczelnia, placówka oświatowo-wychowawcza lub inna instytucja dydaktyczna korzystająca z Oprogramowania.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-900/25 p-4 rounded-xl border border-slate-900">
                  <h5 className="font-bold text-cyan-400 uppercase font-mono text-xs tracking-wider font-semibold">§ 2. DOZWOLONY UŻYTEK (BEZPŁATNY)</h5>
                  <p className="text-slate-200">
                    Autor udziela Użytkownikowi bezpłatnej, niewyłącznej, nieprzenoszalnej i ograniczonej terytorialnie licencji na korzystanie z Oprogramowania na następujących polach eksploatacji i w celach:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong className="text-slate-200 font-medium">Dydaktyka Szkolna i Akademicka:</strong> Wykorzystanie Oprogramowania na zajęciach lekcyjnych, wykładach, laboratoriach komputerowych, kółkach naukowych realizowanych przez publiczne i niepubliczne placówki edukacyjne.</li>
                    <li><strong className="text-slate-200 font-medium">Samokształcenie:</strong> Indywidualne korzystanie przez uczniów, studentów oraz entuzjastów technologii komputerowych w celu poszerzania własnej wiedzy i umiejętności.</li>
                    <li><strong className="text-slate-200 font-medium">Instalacja Lokalna (PWA):</strong> Instalowanie i uruchamianie Oprogramowania w pamięci podręcznej przeglądarek na szkolnych stacjach roboczych w celu uzyskania pełnej kompatybilności offline.</li>
                    <li><strong className="text-slate-200 font-medium">Prezentacje Edukacyjne:</strong> Publiczne demonstrowanie działania Oprogramowania w celach popularyzacji nauki, na konferencjach nauczycielskich i piknikach naukowych.</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-red-950/15 p-4 rounded-xl border border-red-500/10">
                  <h5 className="font-bold text-red-450 uppercase font-mono text-xs tracking-wider font-semibold">§ 3. RESTRYKCJE I WARUNKI LICENCYJNE (ZAKAZY)</h5>
                  <p className="text-slate-200">
                    Wszelkie działania wykraczające poza zakres określony w § 2 wymagają uprzedniej, pisemnej i imiennej zgody Autora pod rygorem odpowiedzialności cywilnoprawnej. W szczególności surowo zabrania się:
                  </p>
                  <ul className="list-decimal list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong className="text-slate-200 font-medium">Dystrybucji i Użytku Komercyjnego:</strong> Pobierania jakichkolwiek opłat za instalację, wdrożenie, udostępnienie, pobranie lub użytkowanie Oprogramowania.</li>
                    <li><strong className="text-slate-200 font-medium font-medium">Modyfikowania i Zmian Kodu:</strong> Dokonywania samodzielnych zmian w kodzie źródłowym, usuwania logotypów lub informacji o autorze, modyfikowania pytań oraz dekompilacji aplikacji.</li>
                    <li><strong className="text-slate-200 font-medium">Płatnego Subskrybowania lub Reklam:</strong> Umieszczania Oprogramowania wewnątrz płatnych portali e-learningowych, aplikacji mobilnych obciążonych mikropłatnościami lub stron z reklamami.</li>
                    <li><strong className="text-slate-200 font-medium">Dystrybucji Kodu pod Innym Nazwiskiem:</strong> Publikowania kodu źródłowego na platformach hostingowych jako własnego dzieła lub tworzenia tzw. "forków" ze zmienioną tożsamością twórcy.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider">§ 4. INTEGRALNOŚĆ I ATYBUTY AUTORSTWA</h5>
                  <p>
                    1. Użytkownik zobowiązuje się do zachowania w niezmienionym stanie wszystkich oznaczeń praw autorskich, logotypów "Interaktywny Atlas Komputera" oraz informacji o autorze (mgr Krzysztof Jureczek) w stopce aplikacji.<br />
                    2. Wszelkie raporty końcowe (np. wygenerowane certyfikaty wiedzy dydaktycznej <code>.txt</code>) muszą posiadać nienaruszone stopki poświadczające autentyczność oprogramowania.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider">§ 5. WYŁĄCZENIE ODPOWIEDZIALNOŚCI (AS-IS)</h5>
                  <p className="text-slate-450 text-xs">
                    1. Oprogramowanie jest dostarczane w stanie, w jakim się znajduje ("AS IS"), bez jakichkolwiek gwarancji, wyraźnych lub dorozumianych, w tym gwarancji przydatności do określonego celu.<br />
                    2. Autor nie ponosi żadnej odpowiedzialności za ewentualne szkody wynikłe z użytkowania lub niemożności użytkowania Oprogramowania, w tym za błędy merytoryczne (mimo dołożenia najwyższej staranności dydaktycznej), błędy techniczne, awarie komputerów, uszkodzenia sprzętu w trakcie samodzielnych prób montażu opierających się na uproszczonym symulatorze wirtualnym, czy też utratę danych.
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-900 pt-3 text-slate-450">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider font-semibold">§ 6. POSTANOWIENIA KOŃCOWE</h5>
                  <p className="text-[11px]">
                    1. Złamanie któregokolwiek z warunków niniejszej licencji skutkuje natychmiastowym i automatycznym jej wygaśnięciem, a Użytkownik jest zobowiązany do trwałego usunięcia wszystkich kopii Oprogramowania ze swoich nośników.<br />
                    2. W sprawach nieuregulowanych niniejszą licencją mają zastosowanie przepisy ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych oraz właściwe przepisy Kodeksu Cywilnego Rzeczypospolitej Polskiej.
                  </p>
                  <p className="text-[10px] text-slate-600 font-mono text-right mt-2">Kraków / Katowice, Polska – Czerwiec 2026 r.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/20 text-right flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">WALD License v1.0</span>
                <button
                  onClick={() => setShowLicenseModal(false)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  Akceptuję i Zamykam
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded Full Regulations / GDPR Modal Overlay */}
      <AnimatePresence>
        {showRegulationsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="regulations-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-950 border border-slate-800 max-w-2xl w-full max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                <div className="flex items-center space-x-3 text-cyan-400">
                  <Shield className="w-5 h-5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">Regulamin i Polityka Prywatności</h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">Warunki i Polityka RODO Platformy Dydaktycznej</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRegulationsModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Zamknij"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-300 text-xs md:text-sm leading-relaxed font-sans max-h-[60vh] scrollbar-thin scrollbar-thumb-slate-850">
                <div className="text-center pb-4 border-b border-slate-900 space-y-1">
                  <h4 className="font-extrabold text-white text-base tracking-tight font-sans">REGULAMIN I WARUNKI PRYWATNOŚCI</h4>
                  <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider">Platforma Dydaktyczna: Interaktywny Atlas Komputera (wersja v4.8.0)</p>
                  <p className="text-[11px] text-slate-500 py-1 font-mono">
                    Wlasciciel i Administrator projektu: <strong>mgr Krzysztof Jureczek</strong><br />
                    Zgodność z RODO oraz standardami BHP szkolnej edukacji IT.
                  </p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" /> ROZDZIAŁ I. POSTANOWIENIA OGÓLNE I CEL PROJEKTU
                  </h5>
                  <p>
                    1. <strong>Interaktywny Atlas Komputera</strong> jest autorskim oprogramowaniem o charakterze całkowicie bezpłatnym, bezreklamowym i pomocniczym w edukacji technicznej i informatycznej.<br />
                    2. Głównym celem Programu jest wsparcie nauczycieli przedmiotów informatycznych oraz umożliwienie uczniom bezpiecznego, bezstresowego przyswajania wiedzy z zakresu fizycznej struktury urządzeń elektronicznych, poprawnego montażu i topologii sieciowej LAN/WAN.
                  </p>
                </div>

                <div className="space-y-2 bg-[#7c2d12]/10 p-4 rounded-xl border border-[#ea580c]/25">
                  <h5 className="font-bold text-[#f97316] uppercase font-mono text-xs tracking-wider flex items-center font-semibold">
                    <span className="w-1.5 h-1.5 bg-[#f97316] rounded-full mr-2" /> ROZDZIAŁ II. BEZPIECZEŃSTWO PRZY REALNYM MONTAŻU (BHP)
                  </h5>
                  <p className="text-slate-300 italic">
                    Aplikacja udostępnia wirtualne i uproszczone środowisko montażu podzespołów komputerowych. Użytkownik planujący przełożenie nauki wirtualnej na rzeczywiste działania instalacyjne zobowiązany jest do bezwzględnego przestrzegania poniższych zasad bezpieczeństwa:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong className="text-slate-200">Odłączenie Zasilania (BHP):</strong> Dowolne prace wewnątrz obudowy komputera mogą być wykonywane wyłącznie po całkowitym odłączeniu przewodu zasilającego od sieci elektrycznej 230V oraz przełączeniu wyłącznika zasilacza w pozycję 0 (OFF).</li>
                    <li><strong className="text-slate-200">Wyładowania Elektrostatyczne (ESD):</strong> Ładunki elektrostatyczne na ciele mogą bezpowrotnie uszkodzić elektronikę. Przed pracą należy zdjąć ładunek static (np. dotykając uziemienia) lub stosować opaskę ESD.</li>
                    <li><strong className="text-slate-200">Delikatność Gniazd (np. LGA/AM5):</strong> Piny w gniazdach procesora są wyjątkowo cienkie i podatne na uszkodzenie. Nigdy nie należy dociskać procesora na siłę.</li>
                    <li><strong className="text-slate-200">Opieka Specjalistyczna:</strong> Osoby niepełnoletnie powinny wykonywać wszelkie działania techniczne wyłącznie pod bezpośrednią opieką i wskazówkami nauczyciela informatyki, rodzica lub specjalisty.</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" /> ROZDZIAŁ III. SYSTEM UCZCIWOŚCI (INTEGRITY FOCUS TRACKER)
                  </h5>
                  <p className="text-slate-300">
                    W celu zachowania walorów pedagogicznych i rzetelności quizu wiedzy, panel testowy zawiera zintegrowany mechanizm śledzenia skupienia ucznia:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong className="text-slate-100">Wykrywanie Opuszczania Obszaru Testu:</strong> System monitoruje w czasie rzeczywistym próby zmiany karty przeglądarki przy użyciu systemowych interfejsów <strong>Visibility API</strong> (<em>document.visibilityState</em>) i utratę focusu okna (Window Focus/Blur).</li>
                    <li><strong className="text-slate-100">Zapis Naruszeń:</strong> Opuszczanie aktywnej karty egzaminu celem przepisania pytania do wyszukiwarek skutkuje zalogowaniem uchybienia w historii sesji.</li>
                    <li><strong className="text-slate-100 font-medium">Podpis Cyfrowy:</strong> Końcowy raport tekstowy (.txt) pobierany przez ucznia do weryfikacji nauczycielskiej zawiera pełną informację o uchybieniach samodzielności wraz z unikalnym podpisem kontrolnym uniemożliwiającym sfałszowanie pliku.</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-emerald-950/15 p-4 rounded-xl border border-emerald-500/20">
                  <h5 className="font-bold text-emerald-400 uppercase font-mono text-xs tracking-wider flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" /> ROZDZIAŁ IV. RODO, DANE OSOBOWE I POLITYKA PRYWATNOŚCI
                  </h5>
                  <p className="text-slate-300">
                    Platforma powstała z uwzględnieniem rygorystycznych przepisów ochrony danych osobowych (RODO / GDPR) w strukturach szkolnych:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong className="text-slate-200">100% Przetwarzanie Lokalne (RODO):</strong> Wszelkie imiona, nazwiska, klasy i oceny wpisywane na dyplomie są zapisywane wyłącznie lokalnie w przeglądarce (część modułu <code>localStorage</code>) i nigdy nie opuszczają komputera klienta.</li>
                    <li><strong className="text-slate-200">Brak Google Analytics / Telemetrii:</strong> Program nie gromadzi statystyk, nie śledzi ruchów i nie posiada podpiętych ciasteczek szpiegujących.</li>
                    <li><strong className="text-slate-200">Zarządzanie Historią:</strong> Uczeń może samodzielnie skasować historię swoich dyplomów i podejść za pomocą dedykowanych przycisków resetu w module Quizu wiedzy.</li>
                  </ul>
                </div>

                <div className="space-y-2 border-t border-slate-900 pt-3 text-slate-500">
                  <h5 className="font-bold text-slate-100 uppercase font-mono text-xs tracking-wider">ROZDZIAŁ V. POSTANOWIENIA KOŃCOWE</h5>
                  <p className="text-xs">
                    1. Pełna bezpłatność ułatwia powszechne stosowanie aplikacji bez angażowania środków finansowych i administracyjnych szkół.<br />
                    2. Nauczyciele posiadają pełne prawo do bezpłatnego rozprzestrzeniania linku wdrożeniowego aplikacji.<br />
                    Ostatnia zmiana regulaminu zatwierdzona: Kraków / Katowice, Czerwiec 2026 r.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/20 text-right flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">RODO / GDPR Compliant</span>
                <button
                  onClick={() => setShowRegulationsModal(false)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  Zapoznałem się i Zamykam
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
