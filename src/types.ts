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
    colorHex: "#475569" // slate-600
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
    colorHex: "#10b981" // emerald-500
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
    colorHex: "#ef4444" // red-500
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
    colorHex: "#a855f7" // purple-500
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
    colorHex: "#0ea5e9" // sky-500
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
    colorHex: "#f59e0b" // amber-500
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
    colorHex: "#ec4899" // pink-500
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
    colorHex: "#6366f1" // indigo-500
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
  {
    id: 1,
    question: "Do którego komponentu należy podłączyć kabel HDMI/DisplayPort z monitora, aby gry działały z pełną mocą?",
    options: [
      "Do dowolnego portu USB w obudowie",
      "Do gniazd na płycie głównej (u góry z tyłu obudowy)",
      "Do gniazd bezpośrednio w karcie graficznej (GPU – widoczne niżej na tylnym panelu)",
      "Do zasilacza sieciowego"
    ],
    correctAnswer: 2,
    explanation: "Podłączenie monitora do gniazda płyty głównej zmusi komputer do użycia zintegrowanej karty graficznej CPU. Chcesz podłączyć go na samym dole bezpośrednio pod kartę dedykowaną (GPU)."
  },
  {
    id: 2,
    question: "Co to jest pasta termoprzewodząca i jaka jest jej rola?",
    options: [
      "Klej spajający procesor na stałe z płytą główną",
      "Specjalna maź wypełniająca mikroskopijne szczeliny powietrzne między rdzeniem CPU a chłodzeniem, maksymalizując przepływ ciepła",
      "Substancja czyszcząca styki procesora przed kurzem",
      "Płyn chłodzący przepływający przez rurki w chłodzeniu wodnym"
    ],
    correctAnswer: 1,
    explanation: "Powierzchnia procesora i podstawy chłodzenia nigdy nie są idealnie płaskie. Powietrze jest bardzo słabym przewodnikiem ciepła. Pasta zastępuje powietrze, ułatwiając przekazywanie ciepła z procesora na radiator."
  },
  {
    id: 3,
    question: "W których gniazdach (bankach) należy umieścić 2 kości RAM na płycie głównej, aby działały najszybciej?",
    options: [
      "Zawsze w slotach 1 oraz 2 (licząc od gniazda procesora)",
      "Zawsze w slotach 3 oraz 4",
      "W slotach 2 oraz 4 (zwykle oznaczone jako A2 i B2 po to, by działał tryb Dual-Channel)",
      "Nie ma to żadnego znaczenia"
    ],
    correctAnswer: 2,
    explanation: "Praca w trybie dwukanałowym (Dual-Channel) niemal podwaja przepustowość pamięci. Na większości płyt głównych aktywuje się to konfiguracją slotów 2 i 4."
  },
  {
    id: 4,
    question: "Który komponent trwale przechowuje wszystkie pliki, system operacyjny Windows/Linux oraz gry, gdy komputer zostanie wyłączony?",
    options: [
      "Mózg komputera (CPU)",
      "Pamięć RAM (Random Access Memory)",
      "Dysk SSD NVMe (Pamięć masowa)",
      "Zasilacz (PSU)"
    ],
    correctAnswer: 2,
    explanation: "Pamięć RAM jest pamięcią ulotną - traci całą zawartość przy braku prądu. Do stałego przechowywania systemów, gier i danych służy tylko szybki dysk SSD lub dawniejszy magnetyczny HDD."
  },
  {
    id: 5,
    question: "Co oznacza oznaczenie certificate '80 Plus Gold' na zasilaczu?",
    options: [
      "Że zasilacz ma pozłacaną obudowę i podświetlenie LED",
      "Określa wysoką sprawność energetyczną (min. 80-90% pobieranego prądu zamieniane jest na moc dla komputera, z niskimi stratami ciepła)",
      "Informuje, że zasilacz ma gwarantowane 80 lat bezawaryjnej pracy",
      "Oznacza, że zasilacz pasuje tylko do drogich komputerów"
    ],
    correctAnswer: 1,
    explanation: "Certyfikat 80 Plus mierzy sprawność. Wyższa sprawność (np. Gold lub Platinum) oznacza mniejsze straty energii wydzielanej jako ciepło, co przekłada się na mniejsze pobory prądu i lepszą pracę."
  },
  {
    id: 6,
    question: "Jakie jest podstawowe zadanie kołków dystansowych (standoffs) w obudowie?",
    options: [
      "Ozdobienie wnętrza komputera",
      "Utrzymanie stabilnej wysokości obudowy nad podłogą",
      "Fizyczne oddzielenie miedzianych ścieżek prądowych płyty głównej od metalowej tacki obudowy, zapobiegając zwarciu",
      "Podparcie ciężkiej obudowy zasilacza"
    ],
    correctAnswer: 2,
    explanation: "Z tyłu płyty głównej znajdują się setki odsłoniętych lutów przewodzących prąd. Bez kołków płytka dotykałaby metalowej ramy obudowy, co spowodowałoby zwarcie elektryczne i zniszczenie sprzętu przy pierwszym starcie."
  }
];

export * from "./data/deviceData";

