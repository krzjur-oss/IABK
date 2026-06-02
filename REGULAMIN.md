# 🛡️ REGULAMIN I POLITYKA PRYWATNOŚCI
### Platforma Dydaktyczna: Interaktywny Atlas Komputera (wersja v4.7.0)

Właścicielem, administratorem oraz jedynym autorem projektu jest **mgr Krzysztof Jureczek**.  
Niniejszy dokument określa warunki korzystania z platformy, zasady weryfikacji wiedzy, politykę prywatności (zgodność z RODO) oraz podstawowe zasady bezpieczeństwa przy montażu fizycznego sprzętu komputerowego.

---

## Rozdział I. Postanowienia Ogólne i Cel Projektu

1.  **Interaktywny Atlas Komputera** (zwany dalej "Programem" lub "Platformą") jest autorskim oprogramowaniem o charakterze całkowicie bezpłatnym, bezreklamowym i pomocniczym w edukacji technicznej i informatycznej.
2.  Głównym celem Programu jest wsparcie nauczycieli przedmiotów informatycznych oraz umożliwienie uczniom bezpiecznego, bezstresowego przyswajania wiedzy z zakresu:
    *   Fizycznej struktury urządzeń elektronicznych (komputery stacjonarne, laptopy, smartfony, serwery, superkomputery).
    *   Prawidłowych nawyków inżynierskich i monterskich sprzętu IT.
    *   Podstaw działania i diagnozowania systemów komputerowych (sekwencje POST, kody błędów diagnostycznych) oraz okablowania i adresowania sieciowego LAN/WAN.

---

## Rozdział II. Bezpieczeństwo przy Montażu Realnego Sprzętu Komputerowego

Aplikacja udostępnia wirtualne i uproszczone środowisko montażu podzespołów komputerowych (Symulator Montażu PC). Użytkownik planujący przełożenie nauki wirtualnej na rzeczywiste działania instalacyjne zobowiązany jest do bezwzględnego przestrzegania poniższych zasad bezpieczeństwa:

1.  **Odłączenie Zasilania (BHP):** Dowolne prace wewnątrz obudowy komputera mogą być wykonywane *wyłącznie* po całkowitym odłączeniu przewodu zasilającego od sieci elektrycznej 230V oraz przełączeniu wyłącznika zasilacza w pozycję **0** (OFF).
2.  **Wyładowania Elektrostatyczne (ESD):** Ładunki zgromadzone na ludzkim ciele mogą bezpowrotnie uszkodzić delikatne ścieżki krzemowe i układy pamięci. Przed dotknięciem jakichkolwiek podzespołów należy uziemić się (np. dotykając niepomalowanego metalowego kaloryfera) lub używać opaski antystatycznej ESD.
3.  **Delikatność Gniazd (np. LGA/AM5):** Piny w gniazdach procesora na płycie głównej są ekstremalnie cienkie i podatne na wygięcia. Montaż procesora musi odbywać się ze stuprocentową ostrożnością, a procesora nie wolno wciskać na siłę.
4.  **Opieka Pedagogiczna/Inżynierska:** Osoby niepełnoletnie powinny wykonywać wszelkie prace montażowe i diagnostyczne na rzeczywistym sprzęcie elektronicznym wyłącznie pod bezpośrednim nadzorem nauczyciela, rodzica lub wykwalifikowanego specjalisty.

---

## Rozdział III. System Weryfikacji Samodzielności (Educational Integrity Focus Tracker)

W celu zachowania walorów pedagogicznych i rzetelności procesów oceniania w szkole, panel Quizu Wiedzy zawiera zintegrowany mechanizm śledzenia skupienia (samodzielności) ucznia:

1.  **Mechanizm Wykrywania Opuszczania Obszaru Testu:** System w czasie rzeczywistym monitoruje:
    *   Próby zmiany zakładek (podstron) wewnątrz aplikacji (*SPA Router Protection*).
    *   Próby przełączania kart przeglądarki lub minimalizacji okna przy użyciu oficjalnego systemowego interfejsu **Visibility API** (*document.visibilityState*).
    *   Utratę ostrości aktywnego okna przez kliknięcie poza obszar egzaminacyjny (*Window Blur / Focus Events*).
2.  **Rejestracja Ostrzeżeń:** Każde wyjście poza aktywny obszar testu w celu np. skopiowania pytania do wyszukiwarki internetowej generuje natychmiastowe ostrzeżenie graficzne na ekranie oraz zostaje trwale odnotowane w pamięci podręcznej bieżącej sesji egzaminacyjnej.
3.  **Odnotowanie w Raportach:** Końcowy raport dydaktyczny generowany do pliku tekstowego `.txt` zawiera szczegółowe podsumowanie dotyczące rzetelności podejścia:
    *   Wykaz liczby uchybień samodzielności (utraty ostrości okna).
    *   Ostateczną ocenę statusu samodzielności ("Pełna", "Naruszenie", "Brak Samodzielności").
    *   Unikalny **Podpis Cyfrowy (Suma kontrolna autentyczności)**, uniemożliwiający uczniom samodzielne dopisywanie punktacji lub kasowanie ostrzeżeń w pliku tekstowym przed przesłaniem go nauczycielowi.

---

## Rozdział IV. RODO, Dane Osobowe i Polityka Prywatności

Platforma została wyprodukowana z uwzględnieniem rygorystycznych wymogów ochrony danych osobowych uczniów, nauczycieli i studentów w rozumieniu Ogólnego Rozporządzenia o Ochronie Danych (RODO / GDPR):

1.  **Całkowity Brak Przesyłu Danych (100% Local Processing):** Program nie posiada żadnej chmury bazodanowej ani systemów telemetrii wysyłających dane poza urządzenie Użytkownika. Wszystkie informacje są przetwarzane wyłącznie w przeglądarce klienta.
2.  **Zbierane Dane:** Imię, nazwisko, klasa oraz historia wyników quizu służą wyłącznie do wygenerowania certyfikatu lub dziennika ocen na ekranie Użytkownika.
3.  **No Cookies Policy:** Oprogramowanie nie korzysta z ciasteczek marketingowych, reklamowych ani systemów śledzenia aktywności (trackery Google Analytics itp.).
4.  **Trwałe Przechowywanie:** Dane statystyczne zapisywane są wyłącznie w module `localStorage` przeglądarki na danym komputerze. Uczeń ma pełną kontrolę i może je w każdej chwili skasować przyciskiem resetującym historię w zakładce "Weryfikacja Wiedzy" lub poprzez standardowe wyczyszczenie danych przeglądarki.

---

## Rozdział V. Postanowienia Końcowe

1.  Bezpłatność programu gwarantuje, że żadna szkoła ani nauczyciel nie potrzebuje zatwierdzania budżetów na zakup systemów nauczania budowy komputerów.
2.  Nauczyciele mają prawo do bezpłatnego rozprzestrzeniania linku do oficjalnego wdrożenia aplikacji uczniom w celach zadań domowych oraz pracy lekcyjnej.
3.  Kontakt z autorem projektu (mgr Krzysztof Jureczek) możliwy jest na warunkach dystrybucyjnych określonych na stronie głównej oprogramowania oraz w repozytorium GitHub.

---
*Zatwierdzono do użytku edukacyjnego – Kraków / Katowice, Czerwiec 2026 r.*
