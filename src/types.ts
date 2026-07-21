/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Face {
  indices: number[];
  color: string;
  outlineColor: string;
  partId: string;
  normal?: Vec3;
  centerDepth?: number;
}

export interface ComponentInfo {
  id: string;
  name: string;
  shortName: string;
  role: string;
  specs: string[];
  tip: string;
  connections: string;
  difficulty: "Łatwy" | "Średni" | "Trudny";
  colorHex: string; // Tailwind color or hex for canvas highlighting
  socketType?: string; // Standard gniazda/slotu (np. AM5, LGA1700, PCIe 5.0, M.2 NVMe)
  socketDetails?: string; // Szczegóły techniczne, piny, prędkość transferu i typ klucza
}

export interface PeripheralInfo {
  id: string;
  name: string;
  role: string;
  specs: string[];
  connectionType: string;
  cableColor: string;
  tip: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number; // Poziom trudności od 1 do 6
}

export interface AssemblyStep {
  step: number;
  title: string;
  description: string;
  targetComponentId: string;
  hint: string;
  validationCheck: string;
}

export interface Part3D {
  id: string;
  name: string;
  color: string;
  opacity?: number;
  vertices: Vec3[];
  faces: Face[];
  explodeOffset: Vec3; // Direction in which the part moves under "exploded view"
}

// Full Dataset definition
export const PC_COMPONENTS: ComponentInfo[] = [
  {
    id: "case",
    name: "Obudowa (PC Case)",
    shortName: "Obudowa",
    role: "Chroni i porządkuje wszystkie podzespoły wewnętrzne komputera, organizuje przepływ powietrza i uziemia elektrycznie całą strukturę.",
    specs: [
      "Standardy płyt: ATX, m-ATX, Mini-ITX",
      "Maksymalna długość GPU: np. 360-400 mm",
      "Filtry przeciwkurzowe i boczny panel ze szkła hartowanego (Tempered Glass)",
      "Złącza panelu przedniego: USB-C, USB 3.0, porty Audio Jack"
    ],
    tip: "Zanim zaczniesz montaż, zdejmij oba panele boczne obudowy i zaplanuj układ kabli za płytą montażową (Cable management). Ułatwi to chłodzenie i konserwację.",
    connections: "Mocowana do powierzchni roboczej za pomocą metalowych śrub. Łączy się z płytą główną za pomocą małych pinów panelu przedniego (F_PANEL).",
    difficulty: "Łatwy",
    colorHex: "#475569", // slate-600
    socketType: "Kołki dystansowe (Standoffs #6-32) & Zatoki napędów",
    socketDetails: "Obudowa integruje metalowe kołki dystansowe pełniące rolę punktów uziemienia i izolacji płyty głównej. Dyski montowane są w specjalnych gumowanych zatokach 2.5/3.5 cala."
  },
  {
    id: "mobo",
    name: "Płyta główna (Motherboard)",
    shortName: "Płyta główna",
    role: "Kręgosłup komputera. Zapewnia fizyczne połączenie i linie komunikacyjne (szyny PCIe, SATA itp.) między procesorem, pamięcią, kartą graficzną i dyskami.",
    specs: [
      "Chpset (np. AMD B650, Intel Z790)",
      "Gniazdo procesora (Socket - np. AM5, LGA1700)",
      "Standard pamięci: DDR5 lub DDR4",
      "Sekcja zasilania (VRM): np. 14+2+1 fazy z radiatorami"
    ],
    tip: "Pamiętaj o zainstalowaniu metalowych kołków dystansowych w obudowie przed montażem płyty głównej. Zabezpieczysz ją przed bezpośrednim kontaktem z metalem, co mogłoby wywołać zwarcie.",
    connections: "Wymaga zasilania 24-pin ATX (główne) oraz 8-pin EPS (dla procesora). Posiada liczne sloty instalacyjne PCIe, M.2 i banki RAM.",
    difficulty: "Średni",
    colorHex: "#10b981", // emerald-500
    socketType: "Panel Gniazd (AM5 Intel LGA1700, DDR5 DIMM, PCIe 5.0 x16, M.2 M-Key)",
    socketDetails: "Najważniejsza platforma gniazdowa. Integruje gniazdo procesora z ramką dociskową ILM, 4 gniazda DIMM z jednostronnym zatrzaskiem, wzmocnione PCIe Steel Armor x16 o przepustowości 128 GB/s oraz gniazda M.2 z radiatorem typu fuzja."
  },
  {
    id: "cpu",
    name: "Procesor (CPU)",
    shortName: "Procesor",
    role: "Centralna Jednostka Przetwarzająca - 'mózg' komputera. Wykonuje miliardy obliczeń na sekundę, kierując dystrybucją zadań w całym systemie.",
    specs: [
      "Liczba rdzeni i wątków: np. 6 rdzeni / 12 wątków, 8/16 lub więcej",
      "Taktowanie: Bazowe np. 3.8 GHz, Boost np. 5.1 GHz",
      "Pobór mocy (TDP): np. 65W, 105W, 125W+",
      "Pamięć podręczna: L3 Cache (np. 32MB lub 96MB 3D V-Cache)"
    ],
    tip: "Zwróć uwagę na mały trójkątny znacznik w rogu procesora i dopasuj go do identycznego znacznika na gnieździe płyty głównej. Nie używaj siły - procesor powinien sam wpaść w gniazdo.",
    connections: "Montowany bezpośrednio w gnieździe (Socket - np. AM5) na płycie głównej komputera.",
    difficulty: "Trudny",
    colorHex: "#ef4444", // red-500
    socketType: "Socket AM5 (LGA1718) / LGA1700",
    socketDetails: "Gniazdo CPU typu LGA (Land Grid Array) posiada 1718 lub 1700 giętkich pozłacanych igieł pinów wewnątrz podstawki płyty głównej. Układ dociska się za pomocą metalowej klapy i dźwigni zabezpieczającej tak, by płaskie pady (końcówki) pod procesorem dotknęły wszystkich pinów."
  },
  {
    id: "ram",
    name: "Pamięć RAM",
    shortName: "Pamięć RAM",
    role: "Pamięć o dostępie losowym. Bardzo szybka, tymczasowa przestrzeń robocza dla systemu operacyjnego i otwartych aplikacji, w której dane są stale nadpisywane.",
    specs: [
      "Standard: DDR4 lub DDR5",
      "Pojemność: np. 16 GB, 32 GB (Dual-Channel)",
      "Taktowanie: np. 6000 MHz (XMP / EXPO)",
      "Opóźnienia: np. CL30, CL36"
    ],
    tip: "Instaluj moduły pamięci w gniazdach oznaczonych jako 'A2' i 'B2' (zwykle drugi i czwarty slot od procesora), aby umożliwić komputerowi pracę w trybie dwukanałowym (Dual-Channel), co znacznie przyspiesza system.",
    connections: "Wciskana Pionowo w gniazda DIMM na płycie głównej aż do usłyszenia kliknięcia zatrzasków.",
    difficulty: "Łatwy",
    colorHex: "#a855f7", // purple-500
    socketType: "Slot DIMM DDR5 (288-pin, Jednostronny zatrzask)",
    socketDetails: "Slot standardu DIMM ze specyficznym ułożeniem niesymetrycznego wycięcia (klucza) uniemożliwiającego montaż niezgodnej generacji pamięci. Posiada 288 mikro-styków sprężynowych, a instalacja wymaga równomiernego dociśnięcia modułu pionowo w dół, aż zablokuje się boczny zatrzask samozaciskowy."
  },
  {
    id: "cooler",
    name: "Chłodzenie procesora (CPU Cooler)",
    shortName: "Chłodzenie",
    role: "Odprowadza ogromne ilości ciepła wydzielanego przez pracujący procesor. Zapobiega przegrzaniu i redukcji wydajności (tzw. throttlingowi).",
    specs: [
      "Typ: Chłodzenie powietrzne (radiator + wentylator) lub wodne (AIO 240/360mm)",
      "Maksymalne TDP: np. do 220W odprowadzanego ciepła",
      "Poziom hałasu: np. 15-28 dB(A) pod obciążeniem",
      "Regulacja obrotów: PWM złącze 4-pin"
    ],
    tip: "POD ŻADNYM POZOREM NIE zapomnij o nałożeniu pasty termoprzewodzącej na procesor przed montażem chłodzenia oraz zerwaniu folii ochronnej z miedzianej podstawy radiatora!",
    connections: "Mocowane mechanicznie metalowymi uchwytami do płyty głównej bezpośrednio nad procesorem. Zasilanie podłącza się do pinu 'CPU_FAN'.",
    difficulty: "Średni",
    colorHex: "#0ea5e9", // sky-500
    socketType: "Metalowy wspornik gniazda (Backplate) & Złącze 4-pin PWM",
    socketDetails: "Używa tylnej płyty oporowej (Backplate) zapobiegającej odkształceniu laminatu płyty pod wpływem naciągu chłodzenia. Płyta ta dopasowana jest do rozstawu otworów gniazda LGA1700 lub AM5. Wentylator wykorzystuje gniazdo 4-pin ze sterowaniem wypełnieniem sygnału prostokątnego (PWM) 12V."
  },
  {
    id: "gpu",
    name: "Karta graficzna (GPU)",
    shortName: "Karta graficzna",
    role: "Dedykowana jednostka renderująca grafikę 3D, generująca obraz przesyłany na monitor. Kluczowy komponent do gier, modelowania 3D i obróbki wideo.",
    specs: [
      "Ilość pamięci własnej: np. 8 GB, 12 GB, 16 GB, 24 GB GDDR6 / GDDR6X",
      "Szyna pamięci: np. 192-bit, 256-bit",
      "Rdzenie obliczeniowe: CUDA Cores (Nvidia) lub Stream Processors (AMD)",
      "Architektura obsługująca sprzętowy Ray Tracing i rekonstrukcję obrazu (DLSS / FSR)"
    ],
    tip: "Karty graficzne są ciężkie. Zawsze po wciśnięciu karty w slot PCIe przykręć jej metalowy śledź do obudowy i rozważ użycie podpórki GPU (anti-sag bracket), aby karta nie wygięła slotu.",
    connections: "Instalowana w pierwszym (głównym) slocie PCIe x16 na płycie głównej. Wymaga podłączenia dedykowanych kabli zasilających PCIe 6+2 pin lub nowego 12VHPWR.",
    difficulty: "Średni",
    colorHex: "#f59e0b", // amber-500
    socketType: "Slot PCI Express x16 (Gen 4.0 / 5.0) & Gniazdo 12VHPWR/PCIe 8-pin",
    socketDetails: "Slot PCIe x16 posiada zamek mechaniczny na końcu gniazda. Styki o niskiej oporności przesyłają sygnał różnicowy wysokiej częstotliwości (do 32 GT/s na linię w Gen 5). Dodatkowa dostawa energii realizowana jest standardem 12VHPWR (szesnaście pinów: 12 prądowych i 4 sygnałowe Sense) lub PCIe 8-pin."
  },
  {
    id: "ssd",
    name: "Dysk SSD NVMe (M.2)",
    shortName: "Dysk SSD",
    role: "Trwała pamięć masowa. Przechowuje system operacyjny, programy i gry. Dzięki technologii NVMe oferuje prędkości do kilkunastu razy wyższe niż tradycyjne dyski SATA.",
    specs: [
      "Pojemność: np. 1 TB, 2 TB",
      "Interfejs: M.2 PCIe Gen 4.0 x4",
      "Prędkości: do 7400 MB/s odczytu i 6000 MB/s zapisu",
      "Technologia kości: 3D TLC NAND"
    ],
    tip: "Układy M.2 grzeją się pod dużym obciążeniem. Jeśli Twoja płyta główna posiada aluminiowy radiator z taśmą termoprzewodzącą dla slotu M.2, zawsze zamontuj go na dysku.",
    connections: "Montowany w gniazdo M.2 na płycie głównej pod kątem ok. 30%, delikatnie dociskany w dół i blokowany zatrzaskiem lub małą śrubką.",
    difficulty: "Łatwy",
    colorHex: "#ec4899", // pink-500
    socketType: "M.2 Socket 3 (Key M - Format 2280)",
    socketDetails: "Złącze M.2 (dawniej NGFF) w standardowym kluczu typu M (Key M) przeznaczonym dla dysków PCI Express x4. Posiada profilowane nacięcie po prawej stronie (piny 59-66 są usunięte). Dysk styka się bezpośrednio z liniami CPU, a mocowanie stanowi pojedynczy plastikowy klips obrotowy EZ-Latch lub miniaturowa śrubka M2."
  },
  {
    id: "psu",
    name: "Zasilacz (PSU)",
    shortName: "Zasilacz",
    role: "Serce układu zasilania. Zamienia prąd zmienny z sieci (230V) na prąd stały o niskim napięciu (12V, 5V, 3.3V) wymagany przez wrażliwą elektronikę.",
    specs: [
      "Moc znamionowa: np. 650W, 750W, 850W+",
      "Certyfikat energetyczny: 80 Plus Bronze / Gold / Platinum (wysoka sprawność)",
      "Budowa: Modularna (pozwala podłączyć tylko te kable, których faktycznie potrzebujesz)",
      "Zabezpieczenia elektryczne: OVP, UVP, SCP, OPP, OCP"
    ],
    tip: "Instaluj zasilacz wentylatorem skierowanym do dołu (jeśli obudowa posiada kratkę i filtr przeciwkurzowy u spodu). Pozwoli mu to zasysać chłodne powietrze z zewnątrz niezależnie od grafiki.",
    connections: "Mocowany z tyłu na dole obudowy. Od niego odchodzą bezpośrednie wiązki kabli do płyty głównej (24pin, 8pin EPS), karty graficznej (PCIe) i ewentualnych dysków SATA.",
    difficulty: "Średni",
    colorHex: "#6366f1", // indigo-500
    socketType: "Złącza ATX 24-Pin, EPS 8-Pin, PCIe 8-Pin & Gniazdo wejściowe C14",
    socketDetails: "Gniazdo wejściowe to standardowy trójstykowy standard IEC C14 przeznaczony do pracy pod napięciem 230V AC z uziemieniem ochronnym (PE). Wyjścia niskonapięciowe to dedykowane gniazda modularne na panelu zasilacza dające stabilne wiązki prądu 12V dla procesora (EPS 8-pin) i płyty głównej (ATX 24-pin)."
  }
];

export const PC_PERIPHERALS: PeripheralInfo[] = [
  {
    id: "monitor",
    name: "Monitor",
    role: "Zewnętrzne urządzenie wyświetlające, które przekształca sygnały elektryczne z karty graficznej w obraz widoczny dla użytkownika.",
    specs: [
      "Rozdzielczość: np. 2560x1440 QHD (2K) lub 3840x2160 (4K)",
      "Częstotliwość odświeżania: np. 144Hz, 240Hz (dla płynności w grach)",
      "Typ matrycy: IPS (świetne kolory) lub OLED (idealna czerń i kontrast)",
      "Czas reakcji: np. 1ms (GtG)"
    ],
    connectionType: "Kabel DisplayPort (zalecany do wysokiego odświeżania) lub HDMI podłączony bezpośrednio do gniazda w karcie graficznej (nie płycie głównej!).",
    cableColor: "#3b82f6", // blue-500
    tip: "Zawsze upewnij się, że kabel wideo podłączasz do karty graficznej (niższe porty z tyłu), a nie do płyty głównej (wyższe porty). Podłączenie do płyty głównej zmusi komputer do pracy na wolnej, zintegrowanej grafice procesora.",
    iconName: "Monitor"
  },
  {
    id: "keyboard",
    name: "Klawiatura",
    role: "Główne urządzenie wprowadzania danych tekstowych oraz sterowania interfejsem komputera za pomocą fizycznych przycisków.",
    specs: [
      "Typ przełączników: Mechaniczne (np. Red, Brown, Blue) lub membranowe",
      "Układ klawiszy: QWERTY standardowy, format 100%, TKL lub 60%",
      "Funkcje: Anti-Ghosting, pełne podświetlenie RGB, programowalne makra"
    ],
    connectionType: "Kabel USB-A, USB-C lub bezprzewodowo (odbiornik radiowy USB 2.4GHz / Bluetooth).",
    cableColor: "#10b981",
    tip: "Klawiatury mechaniczne posiadają fizyczne przełączniki dla każdego klawisza. Gwarantują o wiele dłuższą żywotność (do 100 mln wciśnięć) oraz charakterystyczny, precyzyjny skok idealny do pisania i e-sportu.",
    iconName: "Keyboard"
  },
  {
    id: "mouse",
    name: "Mysz komputerowa",
    role: "Ułatwia nawigację po graficznym systemie operacyjnym za pośrednictwem wirtualnego kursora śledzącego ruchy ręki użytkownika.",
    specs: [
      "Czułość sensora: np. do 26 000 DPI (dokładność śledzenia)",
      "Rodzaj sensora: Optyczny wysokiej precyzji",
      "Częstotliwość próbkowania: np. 1000 - 4000 Hz",
      "Waga: Modele ultralight dla graczy (często < 60g)"
    ],
    connectionType: "Kabel USB-A lub bezprzewodowy moduł USB / Bluetooth.",
    cableColor: "#eab308",
    tip: "Warto zainwestować w dobrą, ergonomiczną podkładkę pod mysz. Chroni ona ślizgacze myszki przed nadmiernym wycieraniem i znacząco poprawia precyzję pracy wskaźnika.",
    iconName: "MousePointer"
  },
  {
    id: "audio",
    name: "Słuchawki / Głośniki",
    role: "Urządzenia wyjściowe audio, przetwarzające sygnały cyfrowe na fale akustyczne słyszalne dla ludzkiego ucha.",
    specs: [
      "Pasmo przenoszenia: standardowo 20 Hz - 20 000 Hz",
      "Konfiguracja: Słuchawki stereo, systemy głośników 2.0, 2.1 lub przestrzenne 5.1",
      "Impedancja: np. 32 Ohm (łatwe do wysterowania) do 250 Ohm (wymagające wzmacniacza DAC/AMP)"
    ],
    connectionType: "Złącze Mini-Jack 3.5mm (port zielony na wyjście, różowy na mikrofon) lub bezpośrednio cyfrowy port USB zintegrowany z przetwornikiem DAC.",
    cableColor: "#ec4899",
    tip: "Jeśli zależy Ci na czystym wokalu i doskonałym pozycjonowaniu kroków w grach, przetestuj dedykowaną, zewnętrzną kartę dźwiękową USB (tzw. DAC) zamiast karty wbudowanej w płytę główną.",
    iconName: "Volume2"
  },
  {
    id: "printer",
    name: "Drukarka / Urządzenie Wielofunkcyjne",
    role: "Umożliwia fizyczne powielenie i zapisanie danych z komputera na papierze (drukarka) oraz odwrotnie - przeniesienie druku do wersji cyfrowej (skaner).",
    specs: [
      "Typ technologii: Laserowa (bardzo tanie czarno-białe teksty) lub atramentowa (piękne, nasycone zdjęcia kolorowe)",
      "Rozdzielczość druku: np. 1200x1200 DPI",
      "Funkcje dodatkowe: Automatyczny druk dwustronny (Duplex), podajnik ADF"
    ],
    connectionType: "Przewodowo przez kabel USB-B do USB-A lub, najczęściej dzisiaj, bezprzewodowo za pośrednictwem domowej sieci Wi-Fi.",
    cableColor: "#6366f1",
    tip: "Drukarki laserowe są znacznie lepsze, jeśli drukujesz sporadycznie. Atramenty w drukarkach atramentowych nieużywanych przez 2-3 tygodnie potrafią trwale zaschnąć w głowicy drukującej.",
    iconName: "Printer"
  }
];

export const ASSEMBLY_STEPS: AssemblyStep[] = [
  {
    step: 1,
    title: "Instalacja Procesora (CPU)",
    description: "Wyjmij płytę główną z kartonu. Otwórz metalową dźwignię gniazda procesora (Socketu). Dopasuj trójkąt na procesorze do trójkąta na gnieździe, delikatnie umieść procesor i zamknij dźwignię.",
    targetComponentId: "cpu",
    hint: "Zwróć uwagę na wypustki po bokach nośnika i złoty trójkąt w lewym rogu CPU.",
    validationCheck: "Procesor poprawnie zapięty w gnieździe."
  },
  {
    step: 2,
    title: "Montaż Pamięci RAM",
    description: "Odchyl zatrzaski skrajnych slotów ramowych (zazwyczaj sloty 2 i 4), dopasuj wcięcie w dolnej części kości RAM do wypustki w slocie i wciśnij mocno obiema rękami z góry.",
    targetComponentId: "ram",
    hint: "Prawidłowa instalacja zakończy się wyraźnym, podwójnym kliknięciem zatrzasków.",
    validationCheck: "Ram zablokowany w bankach DIMM."
  },
  {
    step: 3,
    title: "Montaż Dysku SSD NVMe (M.2)",
    description: "Odszukaj gniazdo M.2 nad pierwszym slotem kart graficznych. Wsuń dysk SSD w port pod kątem 30 stopni, dociśnij do dołu i zabezpiecz specjalnym zatrzaskiem lub śrubką.",
    targetComponentId: "ssd",
    hint: "M.2 montuje się bez użycia jakichkolwiek kabli bezpośrednio na laminacie płyty głównej.",
    validationCheck: "Dysk SSD osadzony i dokręcony."
  },
  {
    step: 4,
    title: "Chłodzenie Procesora (Cooler CPU)",
    description: "Zdejmij folię z podstawy chłodzenia. Nałóż ziarnko pasty termoprzewodzącej na powierzchnię CPU. Przykręć radiator chłodzenia do uchwytów montażowych płyty i podepnij przewód zasilający wentylatora.",
    targetComponentId: "cooler",
    hint: "Przewód fan chłodzenia bezwzględnie wetknij w 4-pinowe gniazdo na płycie oznaczone jako CPU_FAN.",
    validationCheck: "Radiator dociśnięty do pasty, wentylator wpięty."
  },
  {
    step: 5,
    title: "Instalacja Zasilacza (PSU) i Płyty Głównej w Obudowie",
    description: "Przykręć zasilacz na dole obudowy. Zamontuj płytę główną w obudowie na uprzednio przygotowanych wkrętach dystansowych, a następnie przykręć ją dedykowanymi śrubkami do tacki obudowy.",
    targetComponentId: "psu",
    hint: "Upewnij się, że wentylator zasilacza kieruje się ku dołowi (pobiera chłodne powietrze spod obudowy).",
    validationCheck: "Zasilacz i Płyta Główna stabilnie dokręcone w obudowie."
  },
  {
    step: 6,
    title: "Montaż Karty Graficznej (GPU)",
    description: "Wyłam odpowiednie śledzie z tyłu obudowy na wysokości slotu PCIe x16. Odchyl blokadę slotu PCIe. Wsuń kartę graficzną w gniazdo do oporu, a następnie dokręć śledzie karty śrubami do ramy obudowy.",
    targetComponentId: "gpu",
    hint: "Po instalacji GPU, nie zapomnij o wpięciu do niej grubego, czarnego przewodu zasilania PCIe (6+2 pin) idącego bezpośrednio od zasilacza.",
    validationCheck: "Karta osadzona w PCIe x16 i przykręcona do tyłu obudowy."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Difficulty Level 1 (Bardzo łatwe - Podstawy podzespołów)
  {
    id: 1,
    question: "Który komponent trwale przechowuje wszystkie pliki, system operacyjny oraz gry, nawet gdy komputer zostanie całkowicie wyłączony z prądu?",
    options: [
      "Mózg komputera (procesor CPU)",
      "Pamięć operacyjna RAM",
      "Szybki dysk SSD NVMe (M.2/SATA)",
      "Zasilacz impulsowy (PSU)"
    ],
    correctAnswer: 2,
    explanation: "Pamięć RAM jest pamięcią ulotną i traci zawartość zaraz po wyłączeniu zasilania. Do stałego przechowywania Twoich osobistych plików, zdjęć i gier służy nośnik pamięci masowej, czyli dysk SSD lub dawniejszy HDD.",
    difficulty: 1
  },
  {
    id: 2,
    question: "Jaka jest podstawowa rola myszy komputerowej w graficznym systemie operacyjnym (GUI)?",
    options: [
      "Wyświetlanie obrazu o wysokiej częstotliwości odświeżania",
      "Ułatwianie sterowania i nawigacji za pomocą wirtualnego kursora śledzącego ruchy dłoni",
      "Przetwarzanie sygnałów dźwiękowych na fale akustyczne",
      "Dodatkowy dopływ zasilania do płyty głównej"
    ],
    correctAnswer: 1,
    explanation: "Mysz komputerowa śledzi ruch dłoni (optycznie lub laserowo) i przesyła te współrzędne do komputera, co pozwala na intuicyjne klikanie i przemieszczanie kursora na ekranie.",
    difficulty: 1
  },
  {
    id: 3,
    question: "Który komponent stanowi fizyczną osłonę całego zestawu, chroni delikatną elektronikę przed kurzem i uszkodzeniami oraz uziemia elektrycznie całą strukturę?",
    options: [
      "Płyta główna (Motherboard)",
      "Zasilacz (PSU)",
      "Obudowa (PC Case)",
      "Karta graficzna (GPU)"
    ],
    correctAnswer: 2,
    explanation: "Obudowa komputera nie tylko porządkuje podzespoły wewnętrzne i zapewnia odpowiedni obieg powietrza (Airflow), ale stanowi również osłonę ochronną i punkt uziemienia całości.",
    difficulty: 1
  },
  {
    id: 4,
    question: "Który port analogowy, powszechnie nazywany Mini-Jack 3.5mm, służy do podłączenia klasycznych słuchawek stereofonicznych lub mikrofonu?",
    options: [
      "Cyfrowe złącze HDMI",
      "Uniwersalny port Jack 3.5mm (kolor zielony/różowy)",
      "Szybki port USB-C",
      "Gniazdo zasilające z uziemieniem"
    ],
    correctAnswer: 1,
    explanation: "Port Mini-Jack 3.5mm to od dekad najpopularniejszy standard analogowy do transmisji sygnałów audio, montowany zarówno na płycie głównej, jak i przednim panelu obudowy.",
    difficulty: 1
  },

  // Difficulty Level 2 (Łatwe - Peryferia i instalacje)
  {
    id: 5,
    question: "Do którego portu należy podłączyć kabel wideo z monitora (HDMI/DisplayPort), aby w pełni korzystać z wydajności dedykowanej karty graficznej w grach trójwymiarowych?",
    options: [
      "Do portu USB-A na przednim panelu obudowy",
      "Do portów płyty głównej umieszczonych wysoko na tylnym panelu (I/O)",
      "Do poziomych portów w karcie graficznej (GPU – umieszczonych niżej z tyłu obudowy)",
      "Do bezpośredniego gniazdka zasilacza w sieci 230V"
    ],
    correctAnswer: 2,
    explanation: "Podłączenie monitora do gniazda na płycie głównej zmusi komputer do pracy na powolnej zintegrowanej grafice wbudowanej w procesor. Dedykowane karty graficzne posiadają własne wyjścia wideo umieszczone niżej z tyłu.",
    difficulty: 2
  },
  {
    id: 6,
    question: "Jakie podstawowe urządzenie w sieci domowej odpowiada za rozdzielanie sygnału internetowego na wiele domowych odbiorników (np. smartfon, laptop) oraz automatyczny przydział wewnętrznych adresów IP?",
    options: [
      "Drukarka sieciowa",
      "Przełącznik sieciowy (Switch)",
      "Router sieciowy",
      "Karta dźwiękowa"
    ],
    correctAnswer: 2,
    explanation: "Router to serce domowej sieci. Kojarzy sieć lokalną (LAN) z globalną (WAN) i przydziela unikalne adresy lokalne urządzeniom przy użyciu zintegrowanej usługi DHCP.",
    difficulty: 2
  },
  {
    id: 7,
    question: "Który element elektroniczny, wynaleziony w połowie XX wieku, zastąpił podatne na awarie, duże i gorące lampy próżniowe, dając początek współczesnej mikroelektronice i miniaturyzacji?",
    options: [
      "Opornik węglowy",
      "Tranzystor",
      "Światłowód polimerowy",
      "Moduł pamięci taśmowej"
    ],
    correctAnswer: 1,
    explanation: "Tranzystory dokonały kolosalnej rewolucji rynkowej – pobierały mało energii, wydzielały niewiele ciepła i zajmowały znikomy ułamek przestrzeni lamp próżniowych, zapoczątkowując erę układów scalonych.",
    difficulty: 2
  },
  {
    id: 8,
    question: "Jaki typ klawiatury cechuje się obecnością niezależnych fizycznych przełączników mechanicznych pod każdym klawiszem, oferując znacznie wyższą trwałość (do 100 mln wciśnięć) oraz precyzyjne odczucie skoku?",
    options: [
      "Klawiatura membranowa gumkowa",
      "Klawiatura mechaniczna",
      "Klawiatura dotykowa pojemnościowa",
      "Klawiatura indukcyjna"
    ],
    correctAnswer: 1,
    explanation: "Klawiatury mechaniczne mają dedykowany przełącznik (najczęściej typu Blue, Red lub Brown) pod każdym klawiszem. Są one cenione przez profesjonalnych programistów i graczy za szybkość działania i wyśmienitą żywotność.",
    difficulty: 2
  },

  // Difficulty Level 3 (Średnie - Specyfikacje i montaż)
  {
    id: 9,
    question: "W których slotach (bankach) na płycie głównej należy najczęściej zamontować 2 kości RAM, aby płyta główna uruchomiła tryb dwukanałowy (Dual-Channel) i przyspieszyła przesył danych?",
    options: [
      "W gniazdach 1 oraz 2 (licząc od lewej strony, najbliżej procesora)",
      "W gniazdach 3 oraz 4",
      "W gniazdach 2 oraz 4 (powszechnie oznaczanych jako A2 i B2)",
      "W dowolnych sąsiadujących ze sobą slotach"
    ],
    correctAnswer: 2,
    explanation: "Tryb Dual-Channel niemal podwaja teoretyczną przepustowość pamięci RAM. Na znakomitej większości płyt głównych, dla optymalnego działania dwóch modułów, należy obsadzić sloty drugi (A2) oraz czwarty (B2).",
    difficulty: 3
  },
  {
    id: 10,
    question: "Co oznacza skrót WAN (Wide Area Network) w terminologii sieci komputerowych?",
    options: [
      "Bezprzewodową sieć lokalną obejmującą jedno podwórko (Wireless Area Node)",
      "Rozległą sieć geograficzną, łączącą ze sobą oddzielne sieci lokalne (LAN) na poziomie krajowym lub światowym (np. Internet)",
      "Złącze zasilania wzmacniacza sygnału sieciowego",
      "Autorski protokół szyfrowania danych sieci domowej"
    ],
    correctAnswer: 1,
    explanation: "Sieć WAN (rozległa sieć komputerowa) łączy ze sobą odległe sieci lokalne (LAN) rozproszone po całym globie. Internet jest dzisiaj najpotężniejszym urzeczywistnieniem publicznej sieci WAN.",
    difficulty: 3
  },
  {
    id: 11,
    question: "Który gigant technologiczny zaprezentował w 1981 roku przełomowy komputer osobisty model 5150, którego otwarta i modułowa architektura zdefiniowała rynkowy standard komputerów kompatybilnych z PC?",
    options: [
      "Apple Computer Inc.",
      "Commodore Business Machines",
      "IBM (International Business Machines)",
      "Microsoft Corporation"
    ],
    correctAnswer: 2,
    explanation: "Komputer IBM PC model 5150 otworzył nowy rozdział informatyki domowej i biurowej. Modułowy projekt sprawił, że inne firmy zaczęły masowo klonować architekturę, tworząc potężny rynek dzisiejszych podzespołów PC.",
    difficulty: 3
  },
  {
    id: 12,
    question: "Który nowoczesny typ okablowania sieciowego przesyła pakiety danych w postaci pulsacyjnych wiązek światła, gwarantując całkowitą niewrażliwość na fale radiowe i ogromny zasięg?",
    options: [
      "Miedziany przewód skrętka (UTP/FTP Class 6e)",
      "Światłowód",
      "Przewód koncentryczny ekranowany",
      "Przewód zasilający trójfazowy"
    ],
    correctAnswer: 1,
    explanation: "Światłowody wykorzystują impulsy świetlne przemieszczające się wewnątrz giętkiego włókna szklanego. Pozwalają na przesyłanie sygnału z prędkościami wielogigabitowymi na olbrzymie odległości, bez spowolnienia przez zakłócenia elektromagnetyczne.",
    difficulty: 3
  },

  // Difficulty Level 4 (Średnio-trudne - Zaawansowany montaż i diagnostyka)
  {
    id: 13,
    question: "Co to jest pasta termoprzewodząca i dlaczego jej poprawna aplikacja jest kluczowa dla zdrowia procesora?",
    options: [
      "Wysoko-napięciowy klej spajający gniazdo z procesorem na stałe",
      "Substancja syntetyczna wypełniająca niewidoczne gołym okiem nierówności i mikroszczeliny powietrzne między CPU a radiatorem chłodzenia",
      "Zmywacz usuwający zabrudzenia i ślady kurzu z rdzenia graficznego przed rozruchem",
      "Płyn chłodniczy tłoczony przez pompkę w układach AIO"
    ],
    correctAnswer: 1,
    explanation: "Nawet lśniące metalowe powierzchnie pokrywy CPU i chłodzenia mają mikroskopijne szczeliny, w których gromadzi się powietrze (będące bardzo złym przewodnikiem ciepła). Pasta wypełnia te ubytki, drastycznie polepszając przewodnictwo termiczne.",
    difficulty: 4
  },
  {
    id: 14,
    question: "Jaka jest najważniejsza, fundamentalna różnica funkcjonalna pomiędzy przełącznikiem sieciowym (Switch) a routerem?",
    options: [
      "Switch służy jedynie do generowania Wi-Fi u klientów końcowych, a router tylko do odbierania sygnału",
      "Switch łączy urządzenia w obrębie jednej i tej samej sieci lokalnej (LAN), a router przesyła pakiety danych między różnymi sieciami logicznymi",
      "Router operuje wyłącznie na miedzianych instalacjach elektrycznych, a Switch komunikuje się radiowo",
      "Nie ma żadnych różnic – są to dwa synonimy tego samego urządzenia"
    ],
    correctAnswer: 1,
    explanation: "Przełącznik (Switch) działa głównie w warstwie 2 modelu OSI (używając adresów MAC do przesyłania danych wewnątrz danej sieci LAN). Router działa w warstwie 3 (wykorzystuje adresowanie IP) i decyduje, jak przekazać ruch na zewnątrz lub do innych sieci.",
    difficulty: 4
  },
  {
    id: 15,
    question: "Czym na poziomie sprzętowym i fizycznym charakteryzowały się legendarne komputery pierwszej generacji (jak np. kolosalny ENIAC z 1946 roku)?",
    options: [
      "Zbudowane były ze zminiaturyzowanych mikroprocesorów krzemowych serii Core",
      "Opierały całe swoje działanie na tysiącach szklanych lamp próżniowych, pobierając olbrzymie ilości energii elektrycznej",
      "Były to pierwsze laptopy zasilane akumulatorkami ołowiowo-kwasowymi",
      "Przechowywały setki gigabajtów danych na kartach MicroSD"
    ],
    correctAnswer: 1,
    explanation: "Komputery pierwszej generacji były gigantyczne (zajmowały całe hale), wytwarzały potężne ilości ciepła i składały się z tysięcy kruchych lamp próżniowych, które ulegały częstym awariom, paraliżując obliczenia.",
    difficulty: 4
  },
  {
    id: 16,
    question: "Co należy bezwzględnie ściągnąć lub odkleić ze spodu chłodzenia procesora (radiatora powietrznego lub bloku AIO) przed nałożeniem pasty i montażem na procesorze?",
    options: [
      "Metalowe rurki cieplne odprowadzające ciepło",
      "Zewnętrzne żeberka radiatora służące wymianie ciepła",
      "Folię ochronną (często z ostrzeżeniem 'Remove' / 'Warning' / 'Usuń przed montażem')",
      "Główny wentylator tłoczący powietrze"
    ],
    correctAnswer: 2,
    explanation: "Producenci chłodzeń naklejają cienką, przezroczystą plastikową folię na miedzianą podstawę radiatora, by zapobiec porysowaniu w transporcie. Zapomnienie o jej zerwaniu tworzy nieprzewodzącą barierę termiczną, prowadząc do natychmiastowego przegrzewania podzespołu.",
    difficulty: 4
  },

  // Difficulty Level 5 (Trudne - Koncepcje zintegrowane i zaawansowana fizyka)
  {
    id: 17,
    question: "Co oznacza oznaczenie sprawności '80 Plus Gold' umieszczane przez renomowanych producentów na obudowach zasilaczy komputerowych?",
    options: [
      "Że zasilacz ma pozłacane elementy złączne i styki wtyczek redukujące rdzewienie",
      "Określa wysoką sprawność elektryczną (zasilacz przy obciążeniu marnuje niewiele pobieranego prądu na bezużyteczne ciepło, oddając około 87-90% mocy w postaci prądu stałego do PC)",
      "Oznacza, że zasilacz ma gwarantowane 80 miesięcy bezawaryjnej pracy w ekstremalnym klimacie",
      "Informuje, że urządzenie jest kompatybilne tylko i wyłącznie z drogimi procesorami oznaczonymi jako Gold"
    ],
    correctAnswer: 1,
    explanation: "Certyfikat 80 Plus bada sprawność zasilacza (stosunek mocy oddawanej do pobranej). Wyższa sprawność (np. Gold / Platinum) oznacza mniejsze zużycie prądu na rachunku, stabilniejsze napięcia i mniej ciepła wydalanego przez wentylator zasilacza.",
    difficulty: 5
  },
  {
    id: 18,
    question: "Jak działa zabezpieczająca usługa układowa zwana 'Thermal Throttling' (Throttling termiczny) zaimplementowana w nowoczesnych procesorach (CPU) i rdzeniach graficznych (GPU)?",
    options: [
      "Przyspiesza taktowanie podzespołu ponad limity fabryczne, by szybciej skończyć uciążliwe zadanie obliczeniowe",
      "Automatycznie drastycznie obniża taktowanie zegara i robocze napięcie zasilania, gdy temperatura rdzenia zbliża się do niebezpiecznej granicy krytycznej",
      "Zamyka system operacyjny bez ostrzeżenia, kasując niezapisane pliki robocze",
      "Rozprasza napięcia na sąsiednie wolne sloty pamięci RAM"
    ],
    correctAnswer: 1,
    explanation: "Kiedy temperatury podzespołów zbliżają się do krytycznych limitów (często około 95-100 stopni), Thermal Throttling ogranicza częstotliwość taktowania, aby zapobiec fizycznemu samozniszczeniu krzemowego jądra.",
    difficulty: 5
  },
  {
    id: 19,
    question: "Jaki zakres adresów IP unikalnych dla sieci lokalnych zwanych prywatnymi (Class C) jest najpopularniejszym standardem dla bramy domyślnej routerów?",
    options: [
      "8.8.8.8 lub 1.1.1.1",
      "127.0.0.1 lub localhost",
      "192.168.1.1 lub 192.168.0.1",
      "255.255.255.0"
    ],
    correctAnswer: 2,
    explanation: "Adresy IP zaczynające się od 192.168.x.x są zdefiniowane jako adresy prywatne (nierutowane w internecie publicznym). Routery konsumenckie domyślnie przyjmują właśnie pierwszy wolny adres w podsieci, czyli np. 192.168.1.1, jako adres tzw. bramy domyślnej.",
    difficulty: 5
  },
  {
    id: 20,
    question: "Czym charakteryzuje się nowoczesna dedykowana pamięć wideo (VRAM) typu GDDR (np. GDDR6X) zaimplementowana na potężnych kartach graficznych?",
    options: [
      "Jest to wolna pamięć talerzowa z wirującym dyskiem mechanicznym",
      "Jest to wysoce zoptymalizowana pamięć o nieskończenie szybszych cyklach odświeżania i niezwykle szerokiej szynie danych, mająca na celu przesył gigantycznych paczek obrazu w ułamku milisekundy bezpośrednio do samego GPU",
      "Jest umieszczona w ruchomych slotach (jak RAM) z boku płyty głównej",
      "Wymaga zewnętrznych sterowników wgrywanych przy każdym rozruchu BIOS-u"
    ],
    correctAnswer: 1,
    explanation: "Pamięć GDDR (Graphics Double Data Rate) różni się od seryjnej DDR tym, że potrafi równolegle przesyłać gigantyczne porcje danych niezbędne do generowania złożonych tekstur 3D. Jest przylutowana bezpośrednio wokół procesora graficznego na karcie.",
    difficulty: 5
  },

  // Difficulty Level 6 (Ekspert - Szczegóły inżynieryjne i fizyka półprzewodników)
  {
    id: 21,
    question: "Z jakiego powodu montaż płyty głównej bez uprzedniego wkręcenia mosiężnych kołków dystansowych (standoffs) w stalowy korpus obudowy jest katastrofalnym błędem montażowym?",
    options: [
      "Płyta główna nie zmieści się w obudowie i zablokuje gniazda USB panelu przedniego",
      "Płyta ulegnie nadmiernemu wygięciu pod ciężarem wentylatora",
      "Tylne metalowe punkty lutownicze i ścieżki elektryczne na spodzie laminatu dotkną bezpośrednio metalowej płyty obudowy, wywołując totalne zwarcie i spalenie podzespołów",
      "Przycisk Power obudowy ulegnie zacięciu mechanicznemu"
    ],
    correctAnswer: 2,
    explanation: "Bez kołków dystansowych metalowe ścieżki i ostre wypustki lutownicze spodniej strony płyty dotykałyby bezpośrednio przewodzącej stalowej obudowy. Po włączeniu zasilania doszłoby do natychmiastowego zwarcia i zniszczenia całej elektroniki.",
    difficulty: 6
  },
  {
    id: 22,
    question: "Czym są i do czego służą fabrycznie zdefiniowane technologie profili XMP (Intel) lub EXPO (AMD) w ustawieniach UEFI/BIOS płyty głównej?",
    options: [
      "Są to zaawansowane narzędzia do partycjonowania systemów plików dysków SSD M.2",
      "Są to fabryczne, przetestowane i certyfikowane profile optymalnych napięć, taktowań i opóźnień pamięci RAM, które pozwalają bezpiecznie przetaktować pamięć roboczą z wolnych prędkości bazowych jednym kliknięciem",
      "Służą do zmiany wersji językowej systemu operacyjnego bez reinstalacji",
      "Sterują poziomem jasności zewnętrznych diod LED i taśm RGB obudowy"
    ],
    correctAnswer: 1,
    explanation: "Moduły pamięci RAM z powodów kompatybilności uruchamiają się fabrycznie na bardzo niskich taktowaniach zalecanych przez stowarzyszenie JEDEC. Aktywacja profilu XMP/EXPO w BIOS-ie wczytuje optymalny overclocking dopuszczony przez producentów kości.",
    difficulty: 6
  },
  {
    id: 23,
    question: "Jak nazywa się słynne empiryczne prawo sformułowane w 1965 roku przez współzałożyciela firmy Intel, głoszące, że liczba tranzystorów w krzemowych układach scalonych ulega podwojeniu w przybliżeniu co dwa lata, wyznaczając zawrotny pęd rozwoju elektroniki?",
    options: [
      "Prawo Ohma",
      "Prawo Moore’a",
      "Prawo Amdahla",
      "Prawo Alana Turinga"
    ],
    correctAnswer: 1,
    explanation: "Prawo Moore'a (Gordona Moore'a) trafnie opisywało niezwykle szybkie tempo innowacji krzemowych przez pół wieku. Dzisiaj, z uwagi na zbliżanie się do barier fizyki kwantowej, tempo to zwalnia, motywując rozwój innych architektur obliczeniowych.",
    difficulty: 6
  },
  {
    id: 24,
    question: "Który protokół sieciowy warstwy transportowej (stos TCP/IP) jest bezpołączeniowy, nie gwarantuje dostarczania pakietów ani poprawnego porządku ich ułożenia, ale dzięki minimalnemu narzutowi nagłówka idealnie sprawdza się w grach online, streamingu wideo i telefonii VoIP?",
    options: [
      "TCP (Transmission Control Protocol)",
      "UDP (User Datagram Protocol)",
      "HTTP (Hypertext Transfer Protocol)",
      "FTP (File Transfer Protocol)"
    ],
    correctAnswer: 1,
    explanation: "UDP nie traci czasu na podawanie cykli potwierdzeń, wznawianie zerwanych pakietów ani negocjowanie stabilności połączenia jak TCP. Pakiety są przesyłane natychmiastowo strumieniowo, co minimalizuje opóźnienia, kluczowe dla rozrywek i połączeń czasu rzeczywistego.",
    difficulty: 6
  },
  {
    id: 25,
    question: "Jak nazywa się przenośny komputer z ekranem dotykowym i rysikiem interaktywnym, który kładzie nacisk na mobilność, bez użycia fizycznej dedykowanej klawiatury standardowo?",
    options: [
      "Serwer Rack",
      "Superkomputer",
      "Tablet (Tablet PC)",
      "Komputer stacjonarny"
    ],
    correctAnswer: 2,
    explanation: "Tablet to płaskie przenośne urządzenie dotykowe oparte na architekturze zintegrowanej (SoC), idealne do przeglądania internetu, odręcznego tworzenia notatek oraz rysowania dzięki rysikom interaktywnym.",
    difficulty: 1
  },
  {
    id: 26,
    question: "Do czego służy bezprzewodowy gamepad wyposażony w adaptacyjne triggery i zaawansowany system haptyczny?",
    options: [
      "Do bezkontaktowego mierzenia temperatury procesora",
      "Działa jako główne urządzenie sterujące gracza, przekazując sygnały i oferując fizyczne odczucie sprzężenia zwrotnego",
      "Służy jako bezprzewodowy wzmacniacz sygnału sieciowego Wi-Fi",
      "To dodatkowy moduł zasilający z systemem Dolby Atmos"
    ],
    correctAnswer: 1,
    explanation: "Gamepad w stacjonarnych konsolach służy do precyzyjnej i komfortowej kontroli rozgrywki. Nowoczesne systemy haptyczne naśladują opór gier (np. naciąganie cięciwy łuku) bezpośrednio pod palcami gracza.",
    difficulty: 2
  },
  {
    id: 27,
    question: "Co to jest komputer jednopłytkowy (SBC, np. Raspberry Pi / Rockchip) i czym różni się konstrukcyjnie od tradycyjnego zestawu PC?",
    options: [
      "To komputer wymagający osobnej płyty pod procesor, pamięć i kartę sieciową",
      "Jest to komputer, który nie potrzebuje prądu ani zasilania sieciowego do działania",
      "Wszystkie kluczowe podzespoły (procesor SoC, pamięć RAM, grafika, porty) są zintegrowane na pojedynczym laminacie",
      "To specjalny procesor wielordzeniowy montowany w superkomputerowych szafach"
    ],
    correctAnswer: 2,
    explanation: "SBC (Single Board Computer) to w pełni funkcjonalny komputer zbudowany na pojedynczej płytce drukowanej. Ze względu na znikome zużycie energii i niski koszt jest powszechnie stosowany w automatyce, robotyce, IoT oraz dydaktyce.",
    difficulty: 3
  },
  {
    id: 28,
    question: "Do czego służy 40-pinowe złącze GPIO (uniwersalne piny wejść/wyjść) znajdujące się na laminacie komputera jednopłytkowego (SBC)?",
    options: [
      "Wyłącznie do podłączenia zewnętrznego szybkiego dysku NVMe SSD",
      "Do kontaktu z fizyczną elektroniką - umożliwia bezpośrednie podłączanie, odczyt oraz sterowanie diodami, czujnikami, przekaźnikami i silnikami",
      "Do doprowadzania wysokiego napięcia sieciowego 230V bezpośrednio na laminat",
      "Do sprzętowego dekodowania obrazów wideo o rozdzielczości 8K"
    ],
    correctAnswer: 1,
    explanation: "GPIO (General Purpose Input/Output) to piny sygnałowe niskiego poziomu. Umożliwiają pisanie programów kontrolujących świat fizyczny – od prostego migania diodą po odpytywanie czujników temperatury i sterowanie robotami.",
    difficulty: 4
  },
  {
    id: 29,
    question: "Dlaczego w nowoczesnych potężnych konsolach do gier (np. APU) stosuje się płynny metal (Liquid Metal) jako interfejs termiczny zamiast tradycyjnej pasty termoprzewodzącej?",
    options: [
      "Aby trwale zespolić procesor z obudową bez używania śrub dociskowych",
      "Dzięki wielokrotnie wyższemu przewodnictwu cieplnemu metalu pozwala to efektywniej odprowadzić gigantyczne ilości ciepła z gęstego i wysilonego rdzenia APU",
      "Żeby na stałe zasilić i uziemić procesor prądem wysokiego napięcia",
      "Płynny metal zapobiega powstawaniu wirusów logicznych w sekcji pamięci zunifikowanej GDDR6"
    ],
    correctAnswer: 1,
    explanation: "Ciekły metal posiada nieporównywalnie lepszą przewodność termiczną niż zwykłe pasty silikonowe. Pozwala to na sprawniejszy transfer energii termicznej z procesora do miedzianego radiatora chłodzenia przy mniejszej powierzchni styku.",
    difficulty: 5
  },
  {
    id: 30,
    question: "W jakim celu w szafach superkomputerowych stosuje się bezpośrednie chłodzenie cieczą (DLC - Direct Liquid Cooling) zamiast tradycyjnego chłodzenia wymuszonym powietrzem?",
    options: [
      "Chłodzenie powietrzne nie może działać w zamkniętych hermetycznie stalowych szafach",
      "Chłodzenie cieczą całkowicie eliminuje potrzebę zasilania szyn zbiorczych dużym prądem",
      "Woda demineralizowana ma wielokrotnie większą pojemność cieplną i przewodnictwo niż powietrze, co pozwala odprowadzić ogromne ilości ciepła z niesamowicie zagęszczonych węzłów obliczeniowych i akceleratorów AI",
      "Po to, aby pakiety danych w sieciach InfiniBand mogły sprawniej przesyłać sygnał przez rury wodne"
    ],
    correctAnswer: 2,
    explanation: "Węzły obliczeniowe superkomputerów generują tak gigantyczny strumień ciepła na milimetr kwadratowy (często dziesiątki kilowatów na szafę), że klasyczne wentylatory powietrzne byłyby kompletnie niewydolne, hałaśliwe i energochłonne. Ciecz demineralizowana przepływająca bezpośrednio przez miedziane bloki chłodzące radzi sobie z tym bez wysiłku.",
    difficulty: 6
  },
  {
    id: 31,
    question: "Która klasyczna technologia druku polegała na mechanicznym dociskaniu barwionej taśmy tekstylnej do papieru za pomocą zestawu miniaturowych stalowych igieł, generując przy tym charakterystyczny, głośny dźwięk?",
    options: [
      "Druk laserowy ze statycznym bębnem",
      "Druk atramentowy z mikrodyszami termicznymi",
      "Druk igłowy (uderzeniowy)",
      "Druk sublimacyjny termotransferowy"
    ],
    correctAnswer: 2,
    explanation: "Drukarki igłowe to technologia uderzeniowa. Głowica wyposażona w igły (zazwyczaj 9 lub 24) uderza przez taśmę barwiącą w papier. Są niezwykle głośne, ale są jednymi z nielicznych drukarek pozwalających na druk wielowarstwowy (np. na papierze samokopiującym).",
    difficulty: 1
  },
  {
    id: 32,
    question: "Co było najczęstszą przyczyną zacinania się i nieprecyzyjnej pracy starych myszy mechaniczno-kulkowych i jaki środek jest zalecany do czyszczenia ich wewnętrznych rolek (wałków)?",
    options: [
      "Zużycie gumowej kulki; zaleca się smarowanie olejem silnikowym",
      "Nagromadzenie zbitego kurzu i tłuszczu na metalowych/plastikowych rolkach; zaleca się ich wyczyszczenie alkoholem izopropylowym (izopropanolem)",
      "Utrata magnetyzmu przez rolki; należy je potraktować silnym magnesem neodymowym",
      "Wypalenie wewnętrznej fotodiody podczerwonej; wymagana jest wymiana lasera"
    ],
    correctAnswer: 1,
    explanation: "Myszy kulkowe zbierały z podkładki brud, który nawijał się na wałki odbiorcze (odpowiedzialne za osie X i Y). Czyszczenie rolki alkoholem izopropylowym (IPA) skutecznie rozpuszczało tłuszcz i przywracało idealne tarcie przy minimalnym ryzyku uszkodzenia plastiku.",
    difficulty: 2
  },
  {
    id: 33,
    question: "Które złącze jest używane do przesyłania w pełni cyfrowego sygnału audio za pomocą światłowodu, gwarantując brak jakichkolwiek zakłóceń elektromagnetycznych w systemie audio?",
    options: [
      "Złącze analogowe Jack 3.5mm",
      "Złącze optyczne TOSLINK",
      "Interfejs miedziany RCA (S/PDIF Coaxial)",
      "Standardowe złącze LPT (Centronics)"
    ],
    correctAnswer: 1,
    explanation: "TOSLINK (standard S/PDIF optyczny) to złącze przesyłające cyfrowy strumień audio za pomocą czerwonego światła laserowego lub LED przez światłowód ze szkła kwarcowego lub tworzywa sztucznego, co eliminuje pętle masy i szumy elektryczne.",
    difficulty: 3
  },
  {
    id: 34,
    question: "Jaka zaawansowana technologia, stosowana we współczesnych klawiaturach e-sportowych, wykorzystuje efekt Halla do określania głębokości wciśnięcia klawisza za pomocą magnesu, umożliwiając regulację punktu aktywacji oraz funkcję 'Rapid Trigger'?",
    options: [
      "Przełączniki membranowe z kopułką silikonową",
      "Klasyczne styki mechaniczne ze sprężyną z brązu",
      "Przełączniki magnetyczno-sensoryczne (Hall Effect)",
      "Czujniki piezoelektryczne nacisku rezystancyjnego"
    ],
    correctAnswer: 2,
    explanation: "Przełączniki oparte na zjawisku Halla nie posiadają fizycznych styków elektrycznych. Mierzą one pole magnetyczne poruszającego się magnesu w klawiszu. Pozwala to na ciągły odczyt pozycji klawisza, zmianę punktu aktywacji w zakresie od 0.1 mm oraz funkcję Rapid Trigger (błyskawiczny reset po ułamkowym odpuszczeniu).",
    difficulty: 4
  },
  {
    id: 35,
    question: "Porównując emisję i działanie tradycyjnego monitora kineskopowego (CRT) oraz nowoczesnego ekranu OLED, które stwierdzenie poprawnie charakteryzuje ich cechy fizyczno-pomiarowe?",
    options: [
      "Ekrany OLED charakteryzują się wysoką emisją promieniowania rentgenowskiego (X-ray) z racji uderzania elektronów w luminofor.",
      "Kineskopy CRT nie emitowały promieniowania elektromagnetycznego, podczas gdy dyskretne diody OLED wymagają lampy wyładowczej rtęciowej.",
      "Monitory CRT wykorzystują działo elektronowe o wysokim napięciu (rzędu kilkunastu kV) i emitują miękkie promieniowanie rentgenowskie oraz zmienne pole magnetyczne cewek odchylających; ekrany OLED pobudzają organiczne piksele prądem stałym niskiego napięcia bez emisji bocznej.",
      "Zarówno kineskopy CRT, jak i panele OLED posiadają identyczną strukturę ciekłokrystaliczną i polaryzator napięciowy."
    ],
    correctAnswer: 2,
    explanation: "Monitory kineskopowe (CRT) posiadają działo elektronowe przyspieszające elektrony napięciem rzędu kilkunastu tysięcy woltów (kV). Zderzenie elektronu o dużej energii z fosforem emituje nieszkodliwe (filtrowane ołowianym szkłem) promieniowanie rentgenowskie. OLED z kolei to elektroluminescencja organiczna sterowana niskonapięciowo na poziomie pojedynczych pikseli, eliminująca to pole i promieniowanie CRT.",
    difficulty: 5
  },
  {
    id: 36,
    question: "Jaka jest fizyczna przyczyna, dla której okablowanie optyczne (światłowód) charakteryzuje się znacznie wyższą odpornością na tłumienie i zakłócenia zewnętrzne na dużych dystansach oraz wielokrotnie szerszym pasmem przenoszenia niż miedziana skrętka komputerowa?",
    options: [
      "Sygnał świetlny w światłowodzie ma wolniejszą prędkość rozchodzenia się, co zapobiega powstawaniu zjawiska odbicia fali na stykach.",
      "Fale świetlne nie ulegają zakłóceniom elektromagnetycznym (EMI/RFI), a zjawisko całkowitego wewnętrznego odbicia w rdzeniu szklanym minimalizuje straty energetyczne; prąd w miedzi cierpi na efekt naskórkowy, przesłuchy elektromagnetyczne oraz tłumienie rezystancyjne.",
      "Światłowody są grubsze i posiadają mosiężną siatkę ekranującą zatrzymującą impulsy grawitacyjne.",
      "Przewód miedziany przesyła dane za pomocą fotonów, które zderzają się z atomami miedzi, hamując przepływ prądu."
    ],
    correctAnswer: 1,
    explanation: "Światłowody wykorzystują fotony (światło) przemieszczające się w dielektrycznym szkle, na które nie działają zewnętrzne pola magnetyczne. W miedzi elektrony napotają opór elektryczny (ciepło), ulegają zakłóceniom indukowanym ze sąsiednich żył (przesłuchy) oraz efektowi naskórkowemu przy wysokich częstotliwościach, co silnie ogranicza przepustowość i zasięg.",
    difficulty: 6
  },
  {
    id: 37,
    question: "Która topologia sieciowa charakteryzuje się najwyższą odpornością na uszkodzenia przewodów dzięki obecności wielu alternatywnych tras?",
    options: [
      "Gwiazda (Star)",
      "Siatka (Mesh)",
      "Magistrala (Bus)",
      "Pierścień pojedynczy (Ring)"
    ],
    correctAnswer: 1,
    explanation: "W pełnej siatce każdy węzeł ma bezpośrednie połączenie z każdym innym. Jeśli jedno lub więcej połączeń zostanie przerwanych, pakiety danych mogą zostać przesłane ścieżkami alternatywnymi dzięki dynamicznemu routingowi.",
    difficulty: 4
  },
  {
    id: 38,
    question: "Co się stanie w klasycznej topologii Magistrali (Bus), gdy fizycznie przetniemy główny przewód szkieletowy (backbone)?",
    options: [
      "Urządzenia automatycznie przełączą się na Wi-Fi brzegowe",
      "Tylko urządzenia po lewej stronie przerwania stracą połączenie",
      "Cała sieć przestanie działać ze względu na brak terminacji i odbicie sygnału elektromagnetycznego",
      "Sąsiedni Switch natychmiast zmostkuje i wyizoluje uszkodzenie"
    ],
    correctAnswer: 2,
    explanation: "W topologii magistrali konieczna jest fizyczna ciągłość i obecność terminatora na obu końcach. Brak zamknięcia obwodu powoduje powstawanie fali stojącej (odbicie sygnału elektrycznego) i paraliż całej sieci.",
    difficulty: 5
  },
  {
    id: 39,
    question: "Co stanowi tzw. 'Single Point of Failure' (Pojedynczy punkt awarii) w klasycznej topologii Gwiazdy?",
    options: [
      "Awaria karty sieciowej jednego komputera końcowego",
      "Awaria centralnego Switcha / Przełącznika",
      "Odbicie sygnału elektrycznego na końcach kabli RJ-45",
      "Zgubienie krążącego w sieci żetonu (Tokena)"
    ],
    correctAnswer: 1,
    explanation: "W topologii gwiazdy wszystkie kable od komputerów schodzą się w centralnym punkcie (Switchu). Jeśli on ulegnie awarii, wszystkie urządzenia tracą kontakt ze sobą natychmiastowo.",
    difficulty: 3
  },

  // Specjalna Kategoria: Systemy Operacyjne (OS) - Architektura, Jądra, Planista CPU, CLI & Systemy Plików
  {
    id: 40,
    question: "Jaka jest główna rola systemu operacyjnego (OS - Operating System) w architekturze komputera?",
    options: [
      "Zastępuje fizyczny zasilacz i dostarcza prąd do podzespołów",
      "Zarządza zasobami sprzętowymi (CPU, RAM, dysk, I/O) i pośredniczy między sprzętem a aplikacjami użytkownika",
      "Służy wyłącznie do renderowania grafik 3D w grach komputerowych",
      "Służy do fizycznego czyszczenia płyty głównej z kurzu"
    ],
    correctAnswer: 1,
    explanation: "System operacyjny tworzy warstwę abstrakcji nad fizycznym sprzętem. Zarządza pamięcią, czasem procesora, urządzeniami wejścia/wyjścia oraz plikami, umożliwiając bezpieczne uruchamianie programów bez konieczności sterowania bezpośrednio rejestrami krzemu.",
    difficulty: 1
  },
  {
    id: 41,
    question: "Czym różni się wiersz poleceń (CLI - Command Line Interface) od graficznego interfejsu użytkownika (GUI)?",
    options: [
      "CLI wymaga pisania tekstowych komend, a GUI opiera się na wizualnych okienkach, ikonach i sterowaniu myszą",
      "CLI działa tylko bez podłączonego monitora, a GUI wymaga klawiatury mechanicznej",
      "GUI wyłącza jądro systemu, a CLI działa wyłącznie na kartach graficznych GPU",
      "Nie ma żadnej różnicy – obie nazwy oznaczają ten sam program"
    ],
    correctAnswer: 0,
    explanation: "CLI (Command Line Interface) umożliwia szybkie i precyzyjne wydawanie poleceń tekstowych (np. Bash, PowerShell), idealne dla administratorów. GUI (Graphical User Interface) reprezentuje pliki i programy w formie wizualnych elementów (okna, ikony, przyciski) łatwych dla każdego użytkownika.",
    difficulty: 1
  },
  {
    id: 42,
    question: "Czym charakteryzuje się podział na przestrzeń użytkownika (User Space - Ring 3) i przestrzeń jądra (Kernel Space - Ring 0) w architekturze nowoczesnych procesorów?",
    options: [
      "Ring 3 to pamięć na dysku SSD, a Ring 0 to pamięć na taśmie magnetycznej",
      "Ring 0 oferuje nieograniczony dostęp do sprzętu dla jądra OS, podczas gdy Ring 3 izoluje aplikacje użytkownika, chroniąc system przed awariami",
      "Ring 0 służy wyłącznie do przesyłania dźwięku, a Ring 3 steruje kartą sieciową",
      "Ring 3 działa w stanie wyłączonym, a Ring 0 to stan uśpienia baterii"
    ],
    correctAnswer: 1,
    explanation: "Sprzętowe pierścienie ochrony (Protection Rings) procesora izolują kluczowe procedury OS (Ring 0 / Kernel Space) od zwykłych aplikacji (Ring 3 / User Space). Dzięki temu zawieszenie zwykłego programu w Ring 3 nie powoduje natychmiastowego uszkodzenia pamięci jądra ani restartu całego komputera.",
    difficulty: 2
  },
  {
    id: 43,
    question: "Co to jest wywołanie systemowe (Syscall / System Call) i w jakim celu aplikacja z przestrzeni użytkownika korzysta z tego mechanizmu?",
    options: [
      "To automatyczny telefon alarmowy wysyłany do producenta procesora w przypadku awarii",
      "To kontrolowane przejście z Ring 3 do Ring 0, pozwalające aplikacji poprosić jądro OS o bezpieczne wykonanie operacji na sprzęcie (np. zapis pliku na dysku)",
      "To procedura czyszczenia pamięci podręcznej L3 podczas startu UEFI",
      "To protokół sieciowy służący wyłącznie do komunikacji przez światłowód"
    ],
    correctAnswer: 1,
    explanation: "Aplikacje użytkownika nie mogą bezpośrednio modyfikować dysku ani pisać do pamięci innych procesów. Gdy program potrzebuje zapisać plik lub otworzyć gniazdo sieciowe, wykonuje wywołanie systemowe (Syscall), przekazując sterowanie do jądra OS, które po weryfikacji uprawnień wykonuje zadanie.",
    difficulty: 2
  },
  {
    id: 44,
    question: "Czym różni się jądro monolityczne (Monolithic Kernel, np. Linux) od mikrojądra (Microkernel, np. seL4)?",
    options: [
      "Jądro monolityczne uruchamia wszystkie usługi (sterowniki, system plików, sieć) w jednym obszarze Ring 0, zapewniając wysoką wydajność, podczas gdy mikrojądro przenosi większość usług do przestrzeni użytkownika Ring 3",
      "Mikrojądro wymaga procesora o wadze poniżej 1 grama, a jądro monolityczne działa tylko na superkomputerach",
      "Jądro monolityczne nie obsługuje wielozadaniowości, a mikrojądro nie posiada pamięci RAM",
      "Mikrojądro działa bez prądu elektrycznego"
    ],
    correctAnswer: 0,
    explanation: "W jądrze monolitycznym wszystkie podsystemy (sterowniki urządzeń, stos sieciowy, systemy plików) pracują w tym samym uprzywilejowanym obszarze pamięci Ring 0, co zapewnia ogromną szybkość. Mikrojądro zawiera w Ring 0 tylko absolutne minimum (zarządzanie pamięcią i wątkami), przenosząc sterowniki do izolowanych procesów w Ring 3 dla wyższej stabilności.",
    difficulty: 3
  },
  {
    id: 45,
    question: "Czym wyróżnia się system operacyjny czasu rzeczywistego (RTOS - Real-Time Operating System), stosowany m.in. w lotnictwie, medycynie i automatyce przemysłowej?",
    options: [
      "Posiada najładniejsze efekty wizualne i wsparcie dla rozdzielczości 8K",
      "Gwarantuje odpowiedź na zdarzenie zewnętrzne w ściśle określonym, deterministycznym reżimie czasowym (np. w milisekundach lub mikrosekundach)",
      "Służy wyłącznie do odtwarzania filmów na żywo w serwisach streamingowych",
      "Nigdy nie wymaga podłączenia zasilania z sieci elektrycznej"
    ],
    correctAnswer: 1,
    explanation: "W systemach RTOS (Real-Time OS) spóźniona odpowiedź jest traktowana jako błąd krytyczny. Niezależnie od obciążenia CPU, system musi zagwarantować bezwzględne wykonanie zadania w ustalonym limicie czasu (determinizm), co jest kluczowe w sterownikach poduszek powietrznych, respiratorach czy awionice.",
    difficulty: 3
  },
  {
    id: 46,
    question: "Na czym polega przełączanie kontekstu (Context Switching) realizowane przez planistę CPU w systemach z wywłaszczaniem (Preemptive Multitasking)?",
    options: [
      "Na fizycznej wymianie modułów pamięci RAM podczas pracy komputera",
      "Na zapisaniu stanu rejestrów i wskaźnika instrukcji aktualnego procesu oraz wczytaniu stanu kolejnego procesu, co stwarza iluzję równoległego działania wielu aplikacji na jednym rdzeniu",
      "Na automatycznej zmianie koloru obudowy w zależności od temperatury procesora",
      "Na zamianie miejscami karty graficznej z dyskiem SSD"
    ],
    correctAnswer: 1,
    explanation: "Wielozadaniowość z wywłaszczaniem opiera się na przydzielaniu procesom krótkich kwantów czasu CPU. Planista zatrzymuje bieżący proces, zapisuje jego kontekst (stan rejestrów, wskaźnik stosu) w strukturze PCB, po czym przywraca kontekst innego procesu. Całość trwa mikrostatycznie krótko (rzędu mikrosekund).",
    difficulty: 4
  },
  {
    id: 47,
    question: "Czym charakteryzuje się algorytm planowania przydziału czasu procesora Round Robin (RR) z przydzielonym kwantem czasu (Time Quantum)?",
    options: [
      "Procesy są wykonywane bez przerwy aż do całkowitego zakończenia, ignorując inne zadania",
      "Każdy proces otrzymuje po kolei równy kwant czasu CPU; po jego upływie proces jest wywłaszczany i trafia na koniec kolejki gotowych zadań",
      "Najkrótsze zadanie jest zawsze wyrzucane z pamięci operacyjnej",
      "CPU przydziela czas tylko procesom, które pobierają mniej niż 1 Watt energii"
    ],
    correctAnswer: 1,
    explanation: "Round Robin (RR) to klasyczny, sprawiedliwy algorytm karuzelowy. Procesy uszeregowane w kolejce FIFO otrzymują ustalony kwant czasu (np. 10–50 ms). Jeśli proces nie zakończy się w tym czasie, planista wywłaszcza go i przekazuje CPU kolejnemu procesowi w kolejce.",
    difficulty: 4
  },
  {
    id: 48,
    question: "Co oznacza zapis uprawnień plików chmod 755 (lub rwxr-xr-x) w systemach zgodnych ze standardem POSIX (np. Linux, macOS)?",
    options: [
      "Plik ma rozmiar 755 megabajtów i jest zaszyfrowany kluczem AES",
      "Właściciel ma pełne prawa odczytu, zapisu i wykonania (7 = 4+2+1), a grupa i pozostali użytkownicy mają tylko prawa odczytu i wykonania (5 = 4+1)",
      "Plik jest niewidoczny dla administratora root",
      "Oznacza, że plik zostanie usunięty po 755 sekundach"
    ],
    correctAnswer: 1,
    explanation: "W systemach POSIX cyfry ósemkowe reprezentują sumę wartości bitowych: r (read=4), w (write=2), x (execute=1). Pierścienie uprawnień określają kolejno: Właściciela (7 = rwx), Grupę (5 = r-x) oraz Pozostałych użytkowników (5 = r-x).",
    difficulty: 5
  },
  {
    id: 49,
    question: "Do czego służą polecenia top / htop (Linux) oraz Get-Process (Windows PowerShell) wpisywane w terminalu CLI?",
    options: [
      "Do formatowania partycji systemowej bez pytania o potwierdzenie",
      "Do wyświetlania w czasie rzeczywistym listy aktywnych procesów, zużycia czasu CPU, wykorzystania pamięci RAM oraz identyfikatorów PID",
      "Do podkręcania częstotliwości odświeżania monitora",
      "Do testowania prędkości światłowodu sieci WAN"
    ],
    correctAnswer: 1,
    explanation: "Narzędzia top/htop w Linuxie oraz Get-Process w PowerShellu to podstawowe polecenia monitorujące stan OS. Pokazują one w czasie rzeczywistym zużycie zasobów (CPU, RAM), unikalne numery procesów PID oraz nazwy właścicieli uruchomionych zadań.",
    difficulty: 5
  },
  {
    id: 50,
    question: "Czym jest struktura węzła Inode w systemie plików ext4 (Linux) oraz funkcja księgowania (Journaling) w systemie NTFS (Windows)?",
    options: [
      "Są to dodatkowe wentylatory chłodzące fizyczny talerz dysku HDD",
      "Inode to struktura przechowująca metadane pliku (uprawnienia, rozmiar, wskaźniki bloków danych), a Journaling to dziennik zmian zapobiegający uszkodzeniu struktury plików przy nagłym braku zasilania",
      "Inode służy do generowania haseł sieciowych Wi-Fi 7",
      "Są to pliki wykonywalne używane tylko do aktualizacji sterowników karty dźwiękowej"
    ],
    correctAnswer: 1,
    explanation: "W ext4 Inode (Index Node) przechowuje metadane pliku bez jego nazwy (nazwa jest w katalogu). Z kolei Journaling (księgowanie w NTFS, ext4, APFS) najpierw zapisuje zamiar modyfikacji w specjalnym dzienniku na dysku; w przypadku nagłej awarii zasilania OS może szybko spójnie odtworzyć lub wycofać niedokończoną transakcję.",
    difficulty: 6
  },
  {
    id: 51,
    question: "Jak działa mechanizm Copy-On-Write (COW) stosowany w nowoczesnych systemach plików (np. APFS w macOS/iOS, Btrfs w Linux) przy kopiowaniu dużego pliku?",
    options: [
      "Zmusza procesor do fizycznego przepisywania każdego bajtu danych 10 razy dla bezpieczeństwa",
      "Zamiast natychmiastowego powielania bloków danych na dysku, tworzy jedynie nowy wskaźnik do tych samych bloków; fizyczna kopia zmienionego bloku powstaje dopiero w momencie jego modyfikacji",
      "Kopiuje plik wyłącznie do zewnętrznej chmury internetowej",
      "Wymaga zatrzymania pracy jądra OS na czas trwania kopiowania"
    ],
    correctAnswer: 1,
    explanation: "Mechanizm Copy-On-Write (COW) sprawia, że kopiowanie nawet 50-gigabajtowego pliku w APFS czy Btrfs trwa ułamek sekundy! Nowa kopia wskazuje na istniejące bloki danych. Dopiero gdy użytkownik zmodyfikuje fragment pliku, system zapisuje zmieniony blok w nowym miejscu na dysku, oszczędzając pamięć i wydłużając żywotność SSD.",
    difficulty: 6
  }
];

export * from "./data/deviceData";

