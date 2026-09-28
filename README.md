# 🖥️ Interaktywny Atlas Komputera (Interactive Computer Atlas)
> **Nowoczesny, trójwymiarowy symulator i przewodnik dydaktyczny po budowie systemów komputerowych, architekturze układów krzemowych oraz projektowaniu i diagnostyce sieci LAN/WAN.**

[![Wersja oprogramowania](https://img.shields.io/badge/wersja-v5.4.0--STABLE-06b6d4.svg?style=flat-square)](https://github.com/krzjur-oss/IABK)
[![Licencja](https://img.shields.io/badge/licencja-Wolna%20Dydaktyczna-bfdbfe.svg?style=flat-square)](./LICENCJA.md)
[![RODO / GDPR](https://img.shields.io/badge/RODO%2FGDPR-Zgodny%20(100%25%20Local)-22c55e.svg?style=flat-square)](./REGULAMIN.md)
[![Zgodność PWA](https://img.shields.io/badge/PWA-Wspierane%20(Offline%20OK)-ec4899.svg?style=flat-square)](index.html)
[![Technologia](https://img.shields.io/badge/Stack-React%2019%20%2B%20TS%20%2B%20Vite-6366f1.svg?style=flat-square)](https://vite.dev)

---

## 📖 O projekcie

**Interaktywny Atlas Komputera** to zaawansowana aplikacja internetowa (PWA) stworzona z myślą o uczniach szkół podstawowych i średnich, studentach kierunków technicznych oraz pasjonatach informatyki. Łączy w sobie interaktywną grafikę trójwymiarową rzutowaną na dwuwymiarowy profil wektorowy, symulator montażu sprzętu komputerowego z diagnostyką kolejności procesorowej, moduł projektowania sieci lokalnej oraz weryfikację wiedzy z systemem śledzenia skupienia uwagi.

Projekt powstał jako wolna inicjatywa edukacyjna, mająca na celu uprzystępnienie złożonych pojęć architektonicznych i sieciowych w unikalnej, estetycznej i bezstresowej formie cyfrowej.

---

## 🌟 Kluczowe Funkcjonalności

### 1. Interaktywna Eksploracja 3D (8 Klas Urządzeń)
Odkrywaj precyzyjne modele przestrzenne, rzuty geometryczne i widoki eksplodowane dla ośmiu kluczowych architektur komputerowych:
*   **Komputer Stacjonarny (Desktop)** – klasyczna płyta główna ATX, gniazda LGA/AM, dedykowana sekcja zasilania VRM/MOSFET, kości RAM i chłodzenie.
*   **Laptop** – zintegrowana konstrukcja, gniazda SO-DIMM, rurki cieplne (heatpipes) i akumulatory li-ion.
*   **Smartfon** – miniaturyzacja SoC (system-on-chip), pamięci wlutowane w standardzie LPDDR, silniki haptyczne i moduły foto-optyczne.
*   **Serwer Rack** – wydajność wieloprocesorowa, zasilacze redundantne (Hot-Swap) oraz macierze dyskowe SAS/U.2.
*   **Tablet** – zintegrowana cienka konstrukcja z laminowaną warstwą pojemnościową ekranu.
*   **Komputer jednopłytkowy (SBC)** – piny ogólnego przeznaczenia GPIO, zasilanie USB-C, gniazdo microSD i układ SoC (np. architektura ARM).
*   **Konsola do gier** – architektura APU (Integrated CPU+GPU), superszybka zunifikowana magistrala pamięci GDDR6.
*   **Superkomputer** – szafy obliczeniowe, klastry kasetowe (blade nodes), akceleratory tensorowe oraz magistrale bezśredniego chłodzenia cieczą (DLC).

### 2. Tryb Ostry Fokus (Sharp Focus 360°)** — *Nowość w v4.7.0* 🔍
Wdrożenie dedykowanego algorytmu orientacji przestrzennej kamery symulatora:
*   Po wybraniu dowolnego komponentu komputerowego, system automatycznie wykonuje dynamiczny i płynny najazd (zoom) centrujący punkt skupienia na wybranym podzespole.
*   Kamera wykonuje powolny obrót panoramiczny o **360 stopni**, pozwalając użytkownikowi na natychmiastowe zbadanie fizycznego usytuowania gniazd, styków oraz komponentów pomocniczych.
*   Dostępny poręczny przełącznik statusu w panelu kontrolnym 3D.

### 3. Symulator Montażu PC & Sekwencja Rozruchowa (POST) 🛠️
*   **Interaktywne stanowisko montażu** oraz weryfikacji komponentów oparte na precyzyjnych schematach wektorowych wraz z systemem powiadomień i wskazówek eksperckich (*Expert Insights*).
*   **Weryfikacja rygoru montażu**: program na bieżąco analizuje logiczną kolejność instalacji komponentów (np. blokuje instalację chłodzenia przed nałożeniem procesora, przypomina o kołkach dystansowych).
*   **Diagnostyka POST (Power-On Self-Test)**: realistyczna symulacja uruchomienia płyty głównej z dynamicznymi wielokolorowymi diodami kontrolnymi Debug LED (`CPU`, `DRAM`, `VGA`, `BOOT`), sygnałami dźwiękowymi z wbudowanego generatora kodów dźwiękowych (Beep Codes) i konsolą startową systemu operacyjnego `ATLAS_OS`.

### 4. Kreator i Diagnostyka Sieci WAN/LAN 🌐
*   Interaktywna makieta budowy lokalnych sieci domowych i biznesowych.
*   Konfiguracja, łączenie i adresowanie elementów: Router, Switch, Serwer WWW, Zapora sieciowa (Firewall), Stacje robocze.
*   Zaimplementowany moduł diagnostyki połączeń w czasie rzeczywistym ilustrujący drogę pakietów w sieci.

### 5. Dydaktyczny Quiz Wiedzy (30 pytań) z Systemem Uczciwości 🎓
*   Baza pytań podzielona na 6 stopni trudności – od prostych pytań ogólnych po specjalistyczne zagadnienia inżynierii sprzętu (silniki haptyczne, architektura LPDDR5, GPIO, chłodzenie DLC).
*   **Educational Integrity Tracker**: bezkompromisowy system weryfikacji samodzielności działający na poziomie karty SPA, Visibility API przeglądarki oraz utraty skupienia okna (Window Focus/Blur) uniemożliwiający łatwe wyszukiwanie odpowiedzi w tle.
*   Generator certyfikatu ukończenia z unikalnym cyfrowym ID rzetelności do przedłożenia nauczycielom w formacie raportu `.txt`, zapamiętywany lokalnie w historii osiągnięć ucznia.

### 6. Dynamiczne Linkowanie Specyfikacji (LIVE ARK / SPECS LOOKUP) — *Nowość w v5.0.0* 🔗
*   **Błyskawiczne linkowanie**: integracja z DetailPanel dla wszystkich 8 architektur sprzętowych oraz zakładką Peryferia, dająca dostęp do wyszukiwania rzeczywistych modeli sprzętowych w czasie rzeczywistym.
*   **Bazy danych LIVE**: dynamiczne odnośniki do oficjalnych baz specyfikacji (Intel ARK Search, AMD Specs Search, TechPowerUp GPU Database, Morele oraz Google), dopasowywane inteligentnie na podstawie wpisanej frazy lub wybranego gotowego wzorca (Preset).
*   **Wygoda bez obciążenia bazy**: wyszukiwanie odbywa się na żądanie w chmurze bez konieczności aktualizowania lub instalowania rozbudowanych lokalnych baz danych.

### 7. Cyberbezpieczeństwo, Podstawy OS, BHP Montażu i E-Odpady — *Nowość w v5.4.0* 🛡️
*   **Dwupoziomowe Bezpieczeństwo Sieciowe (`NetworkTab`):**
    *   *Szkoła Podstawowa (SP):* Netykieta, interaktywny Analizator Phishingu (dekonstrukcja socjotechniki, fałszywych linków i presji czasu), procedury reagowania na cyberprzemoc wraz z numerami zaufania (116 111, 800 100 100, Dyżurnet.pl).
    *   *Szkoła Ponadpodstawowa:* Szyfrowanie symetryczne (AES-GCM) vs asymetryczne (RSA, ECC), uzgadnianie kluczy i TLS/HTTPS, architektura tunelowania VPN (weryfikacja faktów i mitów) oraz zapory ogniowe (stateless vs stateful SPI) i segmentacja sieci VLAN (IEEE 802.1Q).
*   **Podstawy OS dla Początkujących (`OperatingSystemsTab`):**
    *   Interaktywny komparator skrótów klawiszowych (Windows z adnotacją odpowiedników w macOS Cmd) z wyszukiwarką i podziałem tematycznym.
    *   Wizualizacja hierarchii systemowej folder → podfolder → plik z zasadami higieny cyfrowej pulpitu.
    *   Nietechniczna tabela porównawcza „Który system do czego” dla uczniów SP z rekomendacją wyboru.
*   **Checklista Bezpieczeństwa BHP Serwisanta (`AssemblyGuide`):**
    *   Wymóg akceptacji 4 krytycznych zasad BHP (odłączenie 230V, uziemienie ESD, nieprzewodzący blat, śrubokręt magnetyczny) przed uruchomieniem wirtualnego montażu.
*   **Zdrowie i Środowisko (`PeripheralsTab`):**
    *   Ergonomia pracy przy komputerze: prawidłowa postawa, zasada kąta prostego 90°, reguła 20-20-20 z działającym timerem odpoczynku oczu.
    *   Kompendium postępowania z elektroodpadami (WEEE): metale ciężkie, recykling surowców i lokalizacja bezpłatnych punktów zbiórki (PSZOK, markety RTV/AGD).

---

## 🛠️ Architektura i Stack Technologiczny

Aplikacja została zaprojektowana zgodnie z regułą **"Zero External Dependencies Runtime"** w celach zapewnienia prywatności i bezpieczeństwa.

*   **Rendery i Grafika:** Customowy wektorowy i rzutowany 3D silnik przestrzenny (Pure Canvas Canvas2D Rendering) o ekstremalnej wydajności i bezproblemowej kompatybilności offline.
*   **UI / Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React (ikony).
*   **Animacje:** Motion (dawniej Framer Motion) zainstalowany z pakietu `motion/react`.
*   **Dźwięki:** Syntezator Audio API generujący czyste dźwięki procesorowe (sinusoida/kwadrat) w czasie rzeczywistym.
*   **PWA:** Service Workery pozwalające na 100% działanie w trybie offline, instalację jako aplikacja biurkowa/mobilna.
*   **RODO/GDPR:** Pełna zgodność. Dane osobowe (imię, nazwisko, klasa, wyniki) są zapisywane wyłącznie w pamięci `localStorage` urządzenia użytkownika – system nie posiada żadnej bazy chmurowej ani zewnętrznego API.

---

## 🚀 Uruchomienie lokalne

Aby pobrać i skompilować aplikację na własnym komputerze, potrzebujesz zainstalowanego środowiska **Node.js** (w wersji 18 lub nowszej) oraz menedżera pakietów **npm**.

1.  **Sklonuj repozytorium:**
    ```bash
    git clone https://github.com/krzjur-oss/IABK.git
    cd IABK
    ```

2.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```

3.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```
    Aplikacja uruchomi się domyślnie pod adresem: `http://localhost:3000` (lub innym wskazanym w konsoli).

4.  **Zbuduj wersję produkcyjną:**
    ```bash
    npm run build
    ```
    Pliki wynikowe, zoptymalizowane pod kątem hostowania np. na GitHub Pages lub dowolnym serwerze statycznym, zostaną wygenerowane w folderze `dist/`.

---

## 📝 Licencja, Regulamin i Warunki Użycia

Korzystając z programu lub kodu źródłowego, akceptujesz warunki określone w poniższych plikach:

*   📄  **[LICENCJA](./LICENCJA.md)** – Wolny model dydaktyczny, dopuszczający nielimitowany darmowy użytek szkolny i samokształceniowy, z restrykcyjnym zakazem modyfikacji kodu źródłowego, dystrybucji komercyjnej oraz czerpania korzyści majątkowych bez zgody twórcy.
*   📄  **[REGULAMIN I POLITYKA PRYWATNOŚCI](./REGULAMIN.md)** – Pełny opis procedury przetwarzania informacji (RODO 100% lokalne), działania modułu uczciwości dydaktycznej (*Integrity Tracker*) oraz zasad bezpiecznego montażu komputera.

---

## 🔄 Ostatnie Aktualizacje (Changelog)

### v5.4.0-STABLE — *Cyberbezpieczeństwo w Sieci, Podstawy OS dla Początkujących, BHP Serwisanta PC i E-Odpady (Wrzesień 2026)* 🛡️💻
*   **Nowy Moduł Edukacyjny — Bezpieczeństwo w Sieci (`NetworkSecuritySection` w `NetworkTab`):**
    *   **Ścieżka dla Szkoły Podstawowej (SP):**
        *   *Netykieta:* Zasady kultury komunikacji online, poszanowanie prywatności, ochrona własnego wizerunku i danych wrażliwych.
        *   *Interaktywny Analizator Phishingu:* Edukacyjny dekonstruktor podejrzanych wiadomości (np. fałszywa dopłata do paczki 1,49 zł, wygrana w loterii z prośbą o dane karty, przejęcie konta społecznościowego) z objaśnieniem mechanizmów socjotechniki, fałszowania domen oraz presji czasu.
        *   *Procedury Reagowania na Cyberprzemoc:* Ścieżka ratunkowa krok po kroku (zabezpieczenie dowodów/zrzutów ekranu, blokada sprawcy, kontakt z dorosłym) wraz z bezpośrednimi danymi kontaktowymi do certyfikowanych instytucji pomocowych w Polsce (Telefon Zaufania 116 111, Linia dla Rodziców 800 100 100, Dyżurnet.pl).
    *   **Ścieżka dla Szkoły Ponadpodstawowej:**
        *   *Podstawy Kryptografii:* Porównanie algorytmów symetrycznych (AES z szybkim szyfrowaniem strumieni danych) i asymetrycznych (RSA, Krzywe Eliptyczne ECC z parą kluczy publiczny/prywatny) oraz przebieg negocjacji sesji HTTPS / TLS Handshake.
        *   *Architektura Tunelowania VPN:* Dogłębna analiza protokołów (WireGuard, OpenVPN), scenariuszy uzasadnionego użycia (praca zdalna, bezpieczne korzystanie z publicznych hotspotów Wi-Fi) oraz weryfikacja powszechnych mitów marketingowych o „całkowitej anonimowości”.
        *   *Zapory Ogniowe i Segmentacja Sieci:* Różnice pomiędzy bezstanowym filtrowaniem pakietów a zaawansowaną inspekcją stanową SPI (Stateful Packet Inspection); podział sieci domowej na odizolowane strefy VLAN (standard IEEE 802.1Q) dla zaufanych stacji roboczych, sieci gościnnej (Guest) oraz podatnych urządzeń IoT (Smart Home).
*   **Sekcja „Podstawy dla Początkujących” w Systemach Operacyjnych (`OSBasicsForBeginners` w `OperatingSystemsTab`):**
    *   **Komparator Skrótów Klawiszowych:** Zestawienie najważniejszych kombinacji klawiszy (Windows z odpowiednikami macOS Cmd/Option) podzielonych na kategorie (*Edycja*, *Okna*, *System*) z filtrami i natychmiastową wyszukiwarką.
    *   **Wizualizacja Hierarchii Danych:** Edukacyjne drzewo struktury Dysk → Folder → Podfolder → Plik wraz z praktycznymi wzorcami higieny cyfrowej i organizacji pulpitu dla młodego ucznia.
    *   **Tabela „Który system do czego”:** Nietechniczne porównanie systemów Windows, macOS, Linux, Android oraz iOS pod kątem gier, szkoły, programowania i prostoty obsługi z interaktywnym doradcą wyboru.
*   **Checklista Bezpieczeństwa BHP Serwisanta PC (`AssemblyGuide`):**
    *   Ekran startowy symulatora montażu wzbogacono o obowiązkową procedurę „Zanim zaczniesz” (odłączenie przewodu 230V, nieprzewodzący blat roboczy, opaska antystatyczna / uziemienie ESD, śrubokręt magnetyczny) blokującą przejście do prac montażowych bez świadomej akceptacji.
*   **Nowy Moduł „Zdrowie i Środowisko” (`HealthAndEnvironmentSection` w `PeripheralsTab`):**
    *   **Ergonomia Stanowiska:** Wysokość monitora na linii wzroku, kąt 90° w łokciach i nadgarstkach, interaktywny timer reguły 20-20-20 na zmęczenie wzroku oraz zestaw ćwiczeń rozciągających.
    *   **Elektroodpady i Ekologia (WEEE):** Edukacja na temat szkodliwości metali ciężkich (ołów, rtęć, kadm), zasady bezpiecznego recyklingu oraz mapa bezpłatnych punktów zbiórki w Polsce (PSZOK, sklepy wielkopowierzchniowe, punkty zbiórki zużytego sprzętu).
*   **Oczyszczenie Danych Sprzętowych:**
    *   Trwale usunięto z kodu i modelu danych orientacyjne widełki cenowe (`priceRangePLN`), eliminując ryzyko dezinformacji ucznia spowodowane wahaniami rynkowymi.
*   **Pełna Synchronizacja Metadanych Ekosystemu:**
    *   Wszystkie moduły, raporty, certyfikaty egzaminacyjne, regulaminy i dokumentacja zostały zsynchronizowane ze stabilnym wydaniem **v5.4.0-STABLE**.

### v5.3.0-STABLE — *Audyt Bezpieczeństwa RODO, Odporność PWA i Dostępność Cyfrowa (Wrzesień 2026)* 🛡️
*   **Procedura Zgody RODO i Prywatność w Quizie Wiedzy (`Quiz`):**
    *   Wdrożono obowiązkową akceptację zgody RODO (Checkbox RODO) przed rozpoczęciem egzaminu – przycisk startu jest nieaktywny do momentu jej wyrażenia.
    *   Imię ucznia jest powiązane ze statusem zgody – cofnięcie zgody skutkuje natychmiastowym usunięciem danych z pamięci podręcznej `localStorage`.
    *   Zabezpieczono wszystkie operacje na pamięci lokalnej oraz interfejsie Web Audio API blokami `try/catch`, gwarantując stabilne działanie w trybach prywatnych/incognito.
*   **Rzetelność i Przejrzystość Raportów Dydaktycznych:**
    *   Usunięto z raportu i certyfikatu mylące sformułowania o „cyfrowym podpisie” czy „kryptograficznym kodzie autentyczności”. Zastąpiono je rzetelną klauzulą wyjaśniającą, że raport pełni wyłącznie funkcję pomocniczego podsumowania dydaktycznego.
*   **Eliminacja Martwych Odnośników i Bezpieczeństwo WebAR (`DetailPanel`):**
    *   Usunięto odwołania do zewnętrznych domen testowych; przyciski pobierania modeli `.USDZ` i `.GLB` zostały trwale zablokowane i oznaczone jako *(W przygotowaniu)* z czytelnym wyjaśnieniem dla użytkownika.
*   **Architektura Niezawodności — Granice Błędów (`ErrorBoundary`):**
    *   Zaimplementowano dedykowany komponent `ErrorBoundary` w React, którym otoczono każdą z 9 głównych zakładek aplikacji. Ewentualny błąd jednego modułu nie powoduje białego ekranu ani awarii całej platformy.
*   **Wydajność i Optymalizacja Pakietów (Code-Splitting):**
    *   Wszystkie moduły i panele aplikacji są ładowane leniwie za pomocą `React.lazy()` i `Suspense`.
    *   Zredukowano wagę głównego skryptu JS o ponad 90% (poniżej 150 kB), zapewniając błyskawiczny start na urządzeniach mobilnych i łączach szkolnych.
*   **Odporność Service Workera (PWA) i Izolacja Instancji Reacta:**
    *   Wdrożono automatyczne czyszczenie pamięci podręcznej i wyrejestrowywanie w trybie deweloperskim oraz wykluczenie ścieżek Vite z Service Workera, eliminując błędy *Invalid Hook Call* oraz konflikty zduplikowanych instancji Reacta.
*   **Dostępność Cyfrowa (a11y / WCAG 2.1):**
    *   Wzbogacono wszystkie przyciski ikonowe o polskojęzyczne opisy `aria-label`.
    *   Wdrożono wyraziste style `:focus-visible` (kontrastowa ramka 2px o barwie cyjanowej w trybie ciemnym i niebieskiej w trybie jasnym).
    *   Dodano automatyczne przenoszenie fokusu na kontener główny przy zmianie aktywnej zakładki.
*   **Czystość Kodu i TypeScript:**
    *   Wyeliminowano typy `any` w całej bazie kodu, oczyszczono `package.json` ze zbędnych pakietów serwerowych i unormowano typowanie pod `vite/client`.

### v5.2.0-STABLE — *Wdrożenie Modułu Systemy Operacyjne i Rozbudowa Bazy Wiedzy (Lipiec 2026)* 🌐
*   **Nowy Moduł Edukacyjny — Systemy Operacyjne (`OperatingSystemsTab`):**
    *   **Stos Architektury i Jądro (Kernel Stack):** Interaktywne zestawienie warstw systemu od fizycznego sprzętu, przez izolowane jądro Ring 0 (z planistą CPU, zarządcą VMM i VFS) po przestrzeń użytkownika Ring 3 z wywołaniami systemowymi (System Calls API).
    *   **Rodziny Systemów i Typy Jąder:** Porównanie specyfikacji i podsystemów rodzin: Microsoft Windows (NT Kernel), GNU/Linux (Monolithic), Apple macOS/iOS (XNU Hybrid), Android (Modified Linux + ART VM) oraz RTOS (Real-Time OS).
    *   **Interaktywny Symulator Planisty CPU:** Wizualizacja wielozadaniowości i przełączania kontekstu w czasie rzeczywistym z obsługą algorytmów Round Robin (RR z kwantem czasu), FCFS, SJF oraz planowania priorytetowego wraz z wykresem Gantta.
    *   **Konsola CLI Terminala:** Wbudowany wiersz poleceń z obsługą komend Bash (Linux) i PowerShell (Windows) (`uname -a`, `top`, `free -m`, `ls -la`, `get-process`).
    *   **Prawa Dostępu i Systemy Plików:** Tabela wartości chmod (rwx - 755/644) oraz omówienie systemów NTFS, ext4 i APFS.
*   **Wykres Transmisji Mediów w Czasie Rzeczywistym (`MediaThroughputChart` w `NetworkTab`):**
    *   **Pomiary Recharts w Czasie Rzeczywistym:** Wzbogacono moduł *Sieci LAN/WAN* o interaktywny symulator generujący wykresy przepustowości efektywnej (Mb/s) dla porównania: Skrętki Cat 5e, Cat 6a, Cat 8, Światłowodu Jednomodowego OS2 oraz bezprzewodowych Wi-Fi 6 i Wi-Fi 7.
    *   **Suwaki Środowiskowe:** Użytkownik może dynamicznie zmieniać długość toru (1m–300m), poziom zakłóceń elektromagnetycznych EMI (0%–100%) oraz liczbę ścian tłumiących sygnał radiowy.
    *   **Tryby Analizy:** Udostępniono 3 widoki: *Strumień na Żywo (Live Stream)*, *Krzywa Dystansu (1m-1000m)* oraz *Opóźnienia Ping (ms)*.
*   **Kategorie i Standardy Mediów Transmisyjnych (`PeripheralsTab`):**
    *   **Okablowanie Miedziane (Skrętka):** Dodano szczegółowe zestawienie kategorii skrętki (Cat 5, Cat 5e, Cat 6, Cat 6a, Cat 7/7a, Cat 8) z informacjami o paśmie częstotliwości (do 2000 MHz), przepustowości (do 40 Gb/s) i dystansie.
    *   **Standardy Ekranowania:** Wdrożono opisy i charakterystykę konstrukcji kabli U/UTP, F/UTP oraz S/FTP pod kątem odporności na zakłócenia elektromagnetyczne (EMI).
    *   **Łącza Światłowodowe:** Wprowadzono podział na włókna Jednomodowe (OS1/OS2 dla łączy WAN/ISP do 100+ km) i Wielomodowe (OM1, OM2, OM3, OM4 oraz OM5 z wielofalowością SWDM do 800 Gb/s) wraz ze złączami LC, SC, MPO/MTP.
    *   **Generacje Wi-Fi i Pasma Radiowe:** Zaimplementowano szczegółowe specyfikacje Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax) oraz Wi-Fi 7 (802.11be z MLO, 4K-QAM i pasmem 6 GHz).

### v5.1.2-STABLE — *Aktualizacja Samouczka i Poprawki Nawigacyjne (Lipiec 2026)* 🧭
*   **Synchronizacja Samouczka Wdrażającego (`OnboardingTutorial`):**
    *   Uaktualniono wieloetapowy interaktywny przewodnik 3D, dopasowując cel podświetlenia w ostatnim kroku do nowego, chowanego menu bocznego na przycisk hamburger (ID: `header-hamburger-btn`).
    *   Wzbogacono treść samouczka o jasne instrukcje dotyczące obsługi bocznego panelu z pozostałymi modułami atlasu (Symulator Montażu, Peryferia, Sieci, Historia, Quiz, Centrum Wiedzy).
    *   Upewniono się, że wszystkie kroki samouczka precyzyjnie nawigują po modelu 3D i parametrach fizycznych bez generowania martwych podświetleń.

### v5.1.1-STABLE — *Aktualizacja Kontrastu Suwaków (Lipiec 2026)* 🎚️
*   **Poprawa Widoczności Suwaków (`input[type="range"]`):**
    *   W motywie jasnym linia/tor suwaka (track) zlewał się dotychczas z jasnym tłem ze względu na zbyt ogólną regułę dla pól tekstowych i przycisków.
    *   Wprowadzono dedykowane reguły CSS dla `input[type="range"]` w ramach klasy `.theme-light`, nadając liniom suwaków wyraźny, ciepły odcień szaro-beżowy (`#c5c2b9`) o świetnym kontrascie, z dodatkowym ściemnieniem przy najechaniu myszką (`#9f9b90`).
    *   Zabezpieczono wyświetlanie linii suwaków we wszystkich przeglądarkach poprzez dodatkowe selektory `-webkit-slider-runnable-track` oraz `-moz-range-track`.

### v5.1.0-STABLE — *Aktualizacja Dostępności i Kontrastu (Lipiec 2026)* 🎨
*   **Optymalizacja Jasnego Motywu w Centrum Wiedzy:**
    *   **Słownik pojęć IT (`GlossaryTab`):** Przeprojektowano wygląd kafelków haseł. Ciemne, nieczytelne dotychczas tła zastąpiono ciepłym, jasnym odcieniem piaskowej bieli (`#faf9f6`) o wysokim współczynniku kontrastu, a kolory czujek i czcionek dostosowano do głębokiego grafitu (`#1a1c1e`). Dodano dynamiczne, miękkie tła dla stanów najechania (hover: `#eae8df`).
    *   **Sekcja Ciekawostek i Nowości (`CuriositiesTab`):** Dostosowano cały moduł ciekawostek, w tym lewy panel nawigacyjny, prawy główny panel informacyjny oraz wewnętrzne boksy symulacyjne/informacyjne, zapewniając pełną spójność kolorystyczną i komfort długiego czytania.
    *   **Adaptacyjne Banery Nagłówkowe:** Zaimplementowano dedykowane klasy `.glossary-banner` oraz `.curiosity-banner`, które po przełączeniu motywu płynnie zmieniają ciemny gradient na elegancki, jasny gradient piaskowo-alabastrowy.

---

## 👨‍💻 Autor i Kontakt

*   **Twórca projektu:** mgr Krzysztof Jureczek
*   **Rola:** Nauczyciel, pasjonat deweloper, promotor innowacji dydaktycznych.
*   **Cel:** Popularyzacja rzetelnej wiedzy o infrastrukturze sprzętowej w polskich placówkach oświatowych.

---
*Wyprodukowano z dbałością o detale pedagogiczne i inżynieryjne w 2026 r.*
