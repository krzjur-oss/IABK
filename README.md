# 🖥️ Interaktywny Atlas Komputera (Interactive Computer Atlas)
> **Nowoczesny, trójwymiarowy symulator i przewodnik dydaktyczny po budowie systemów komputerowych, architekturze układów krzemowych oraz projektowaniu i diagnostyce sieci LAN/WAN.**

[![Wersja oprogramowania](https://img.shields.io/badge/wersja-v5.0.0--STABLE-06b6d4.svg?style=flat-square)](https://github.com/krzjur-oss/IABK)
[![Licencja](https://img.shields.io/badge/licencja-Wolna%20Dydaktyczna-bfdbfe.svg?style=flat-square)](./LICENCJA.md)
[![RODO / GDPR](https://img.shields.io/badge/RODO%2FGDPR-Zgodny%20(100%25%20Local)-22c55e.svg?style=flat-square)](./REGULAMIN.md)
[![Zgodność PWA](https://img.shields.io/badge/PWA-Wspierane%20(Offline%20OK)-ec4899.svg?style=flat-square)](index.html)
[![Technologia](https://img.shields.io/badge/Stack-React%2018%20%2B%20TS%20%2B%20Vite-6366f1.svg?style=flat-square)](https://vite.dev)

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

---

## 🛠️ Architektura i Stack Technologiczny

Aplikacja została zaprojektowana zgodnie z regułą **"Zero External Dependencies Runtime"** w celach zapewnienia prywatności i bezpieczeństwa.

*   **Rendery i Grafika:** Customowy wektorowy i rzutowany 3D silnik przestrzenny (Pure Canvas Canvas2D Rendering) o ekstremalnej wydajności i bezproblemowej kompatybilności offline.
*   **UI / Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React (ikony).
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

## 👨‍💻 Autor i Kontakt

*   **Twórca projektu:** mgr Krzysztof Jureczek
*   **Rola:** Nauczyciel, pasjonat deweloper, promotor innowacji dydaktycznych.
*   **Cel:** Popularyzacja rzetelnej wiedzy o infrastrukturze sprzętowej w polskich placówkach oświatowych.

---
*Wyprodukowano z dbałością o detale pedagogiczne i inżynieryjne w 2026 r.*
