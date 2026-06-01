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
  }
];

export * from "./data/deviceData";

