import { ComponentInfo } from "../types";

export type DeviceType = "desktop" | "laptop" | "smartphone" | "server" | "tablet" | "sbc" | "game_console" | "supercomputer";

export interface DeviceCategory {
  id: DeviceType;
  name: string;
  iconName: string;
  description: string;
  title: string;
}

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  {
    id: "desktop",
    name: "Komputer Stacjonarny (PC)",
    title: "Komputer Stacjonarny",
    iconName: "Monitor",
    description: "Klasyczna maszyna modułowa typu desktop o wysokiej wydajności, łatwa w rozbudowie i chłodzeniu."
  },
  {
    id: "laptop",
    name: "Laptop (Notebook)",
    title: "Laptop",
    iconName: "Laptop",
    description: "Wysoce zintegrowany, przenośny komputer ze zintegrowanym ekranem, baterią oraz klawiaturą."
  },
  {
    id: "smartphone",
    name: "Smartfon (Smartphone)",
    title: "Smartfon",
    iconName: "Smartphone",
    description: "Kieszonkowy komputer osobisty typu SoC charakteryzujący się ekstremalną miniaturyzacją komponentów."
  },
  {
    id: "server",
    name: "Serwer (Server Rack)",
    title: "Serwer Rack",
    iconName: "Server",
    description: "Wydajna jednostka obliczeniowa przystosowana do pracy ciągłej (24/7) w szafach serwerowych standardu 19\"."
  },
  {
    id: "tablet",
    name: "Tablet (Tablet PC)",
    title: "Tablet",
    iconName: "Tablet",
    description: "Multidotykowy, płaski komputer przenośny kładący nacisk na mobilność, rysiki interaktywne i ekrany wysokiej gęstości."
  },
  {
    id: "sbc",
    name: "Komputer Jednopłytkowy (SBC)",
    title: "Komputer Jednopłytkowy",
    iconName: "Microchip",
    description: "Kompletny komputer zbudowany na pojedynczym laminacie, mający kluczowe zastosowanie w automatyce, robotyce i dydaktyce."
  },
  {
    id: "game_console",
    name: "Konsola do Gier (Game Console)",
    title: "Konsola do Gier",
    iconName: "Gamepad2",
    description: "Stacjonarny system sprzętowy zunifikowanej pamięci i APU, dostrojony wyłącznie do płynnego przetwarzania gier 3D."
  },
  {
    id: "supercomputer",
    name: "Superkomputer (Supercomputer Rack)",
    title: "Superkomputer",
    iconName: "Database",
    description: "Skalowalne klastry obliczeniowe o gigantycznej mocy szafowej, stosowane w meteorologii, fizyce kwantowej i modelowaniu AI."
  }
];

export const LAPTOP_COMPONENTS: ComponentInfo[] = [
  {
    id: "laptop_case",
    name: "Obudowa dolna i palmrest (Chassis)",
    shortName: "Obudowa dolna",
    role: "Chroni podzespoły wewnętrzne przed uszkodzeniem, zapewnia punkty montażowe dla płyty głównej i baterii oraz integruje klawiaturę.",
    specs: [
      "Materiał: Aluminium lub tworzywo ABS",
      "Wymiary: Zgodne z matrycą (np. 15.6 cala)",
      "Porty: USB-C, Thunderbolt, Jack, HDMI",
      "Zatrzaski pozycjonujące i gwinty śrub montażowych"
    ],
    tip: "Otwierając dolną pokrywę laptopa, użyj plastikowego otwieraka (plektronu). Metalowe narzędzia mogą łatwo porysować obudowę lub zewrzeć elementy na płycie głównej.",
    connections: "Mocowana śrubami na spodzie urządzenia. Łączy się z palmrestem za pomocą zatrzasków.",
    difficulty: "Średni",
    colorHex: "#334155", // slate-700
    socketType: "Mocowania ekranu (Zawiasy) & Gwinty D-Panelu",
    socketDetails: "Gniazda i mocowania mechaniczne. Posiada gniazda przelotowe dla śrub M2, zawiasy z dociskiem ciernym do matrycy oraz sprężyste piny uziemiające do ekranowania EMI."
  },
  {
    id: "laptop_screen",
    name: "Matryca i skrzydło ekranu",
    shortName: "Matryca ekranu",
    role: "Wyświetla obraz i integruje kamerę internetową oraz anteny Wi-Fi/Bluetooth biegnące wzdłuż obudowy ekranu.",
    specs: [
      "Typ panelu: IPS, OLED lub TN",
      "Interfejs: eDP (Embedded DisplayPort) 30/40-pin",
      "Przekątna: np. 15.6\", 16:10, 16:9",
      "Zasilanie podświetlenia: Integrated LED driver"
    ],
    tip: "Kabel eDP przesyłający sygnał do ekranu ulega częstym awariom na zgięciu zawiasu. Objawia się to miganiem obrazu lub brakiem podświetlenia.",
    connections: "System połączony metalowymi zawiasami z dolną bazą. Sygnał przesyłany jest delikatną taśmą eDP.",
    difficulty: "Trudny",
    colorHex: "#0284c7", // sky-600
    socketType: "Gniazdo złącza eDP 30/40-pin (IPEX / Hirose)",
    socketDetails: "Embedded DisplayPort (eDP) wykorzystuje gniazdo niskoprofilowe 30 lub 40-pin o miniaturowym rastrze pinów, połączone cienką taśmą koaksjalną ekranowaną folią aluminiową."
  },
  {
    id: "laptop_battery",
    name: "Bateria Li-Polymer",
    shortName: "Bateria laptopa",
    role: "Dostarcza energię elektryczną w trybie przenośnym. Zapewnia stabilne napięcie dla całego komputera bez dostępu do gniazdka.",
    specs: [
      "Typ: Litowo-polimerowa (płaska)",
      "Pojemność: np. 70 Wh, 4500 mAh",
      "Napięcie: np. 11.4V lub 15.2V",
      "Kontroler BMS (Battery Management System)"
    ],
    tip: "Unikaj ciągłego rozładowywania baterii do poziomu 0%. Dzisiejsze akumulatory Li-Polymer najlepiej czują się przy ładowaniu w przedziale 20-80%.",
    connections: "Wpięta bezpośrednio w dedykowane gniazdo na płycie głównej za pomocą wielożyłowego elastycznego złącza prądowego.",
    difficulty: "Łatwy",
    colorHex: "#d97706", // amber-600
    socketType: "Złącze akumulatorowe 9-pin/12-pin (Li-Po Blade)",
    socketDetails: "Wielożyłowe złącze krawędziowe męskie lub dociśnięta taśma prądowa ze stykami doprowadzającymi napięcie rzędu 11V-15V oraz linie komunikacyjne SMBus/I2C (SDA, SCL) do monitorownia BMS."
  },
  {
    id: "laptop_mobo",
    name: "Płyta główna ze zintegrowanym CPU i RAM",
    shortName: "Płyta główna",
    role: "Silnie zminiaturyzowany kręgosłup laptopa. CPU, GPU i często pamięć RAM są na niej na stałe przylutowane w technologii BGA.",
    specs: [
      "Procesor zintegrowany: BGA (np. AMD Ryzen lub Intel Core Mobile)",
      "Zintegrowany układ graficzny (iGPU) lub dedykowany dGPU",
      "Pamięć wbudowana: LPDDR5 (lutowana) lub sloty SO-DIMM",
      "Wielowarstwowy laminat o wysokim zagęszczeniu ścieżek"
    ],
    tip: "Większość nowszych laptopów ma wlutowany procesor i pamięć. Zwróć na to uwagę przy zakupie - późniejsza rozbudowa RAMu może być niemożliwa.",
    connections: "Mocowana śrubami do dolnego korpusu. Posiada gniazda dla baterii, dysku, ekranu, klawiatury i wentylatorów.",
    difficulty: "Trudny",
    colorHex: "#059669", // emerald-600
    socketType: "Wlutowany interfejs BGA & Sloty SO-DIMM / M.2 NVMe",
    socketDetails: "Konstrukcje lutowane w technologii BGA (Ball Grid Array) zapobiegają modyfikacjom procesora. Płyta integruje złącze USB-C ze wsparciem Thunderbolt, sloty SO-DIMM (mniejszy format DIMM) z dwustronnym zatrzaskiem, oraz złącza M.2 Key-M."
  },
  {
    id: "laptop_cooler",
    name: "Układ chłodzenia (Blower i Heatpipes)",
    shortName: "Chłodzenie",
    role: "Odprowadza ciepło z płaskich rdzeni krzemowych procesora (CPU) i grafiki (GPU) za pomocą miedzianych rurek cieplnych (heatpipe) na zewnątrz.",
    specs: [
      "Typ wentylatora: Niski profil radialny (Blower/Turbina)",
      "Materiały radiatora: Miedziane heatpipe, aluminiowe finy",
      "Sterowanie: Sygnał PWM 4-pin",
      "Masa termiczna dostosowana do niskich obciążeń"
    ],
    tip: "Ze względu na ciasną przestrzeń radiatory w laptopach bardzo szybko zapychają się kurzem. Czyszczenie i wymiana pasty raz na rok to podstawa długiej żywotności.",
    connections: "Przykręcone sprężynowo do rdzeni CPU i GPU na płycie głównej. Wentylator zasilany jest złączem 4-pin.",
    difficulty: "Średni",
    colorHex: "#06b6d4", // cyan-500
    socketType: "Zatrzaski dociskowe silikonowe & Złącze 4-pin FPC wentylatora",
    socketDetails: "Radiator opiera się na ramce dociskowej ze sprężystym ogranicznikiem siły docisku chroniącym delikatny krzem gołego rdzenia procesora (die). Wentylator wpinany jest taśmą elastyczną w mikrozłącze krawędziowe."
  },
  {
    id: "laptop_keyboard",
    name: "Klawiatura i Touchpad",
    shortName: "Klawiatura",
    role: "Interfejsy wejściowe umożliwiające wprowadzanie tekstu i precyzyjne sterowanie kursorem myszy bez zewnętrznej myszki.",
    specs: [
      "Przełączniki: Nożycowe o niskim skoku (Scissor switch)",
      "Powierzchnia touchpada: Szkło lub matowe tworzywo z gestami Precision",
      "Podświetlenie: LED (jednokolorowe lub RGB)"
    ],
    tip: "Zalanie klawiatury laptopa to najczęstsza przyczyna uszkodzeń. Płyn przesącza się przez klawiaturę bezpośrednio na płytę główną pod nią.",
    connections: "Połączone z płytą główną za pomocą cieniutkich taśm sygnałowych typu FPC wpinanych w gniazda ZIF.",
    difficulty: "Średni",
    colorHex: "#c084fc", // purple-450
    socketType: "Złącze taśmowe FPC / FFC typu ZIF (Zero Insertion Force)",
    socketDetails: "Gniazdo ZIF z ruchomym klipsem blokującym (flaps). Elastyczna taśma z naniesionymi ścieżkami miedzianymi wsuwana jest w gniazdo, w którym dociśnięcie klapki zwiera styki z siłą zerową."
  },
  {
    id: "laptop_ssd",
    name: "Dysk SSD M.2 (Format 2230/2280)",
    shortName: "Dysk SSD NVMe",
    role: "Zapewnia szybki odczyt systemu i plików. Jedyny modułowy, wymienny element pamięci masowej w nowoczesnych laptopach.",
    specs: [
      "Interfejs: PCIe NVMe Gen 4 x4",
      "Format fizyczny: M.2 2280 lub ultra-krótki M.2 2230",
      "Prędkość: do 5000 MB/s w trybie oszczędzania energii"
    ],
    tip: "Przed wyjęciem dysku lub dokładaniem nowego modułu RAM ZAWSZE najpierw odepnij wtyczkę akumulatora od płyty głównej!",
    connections: "Osadzony w slocie M.2 (NGFF) na płycie głównej i zabezpieczony pojedynczą małą śrubką.",
    difficulty: "Łatwy",
    colorHex: "#db2777", // pink-600
    socketType: "M.2 Slot 3 (Key M - Format 2230/2242/2280)",
    socketDetails: "Gniazdo M.2 o napięciu 3.3V ze wsparciem dla poduszki przewodzącej obudowy laptopa. Blokowany obrotowym klipsem EZ-Latch lub pojedynczą śrubką M2 pod płaskim radiatorem."
  }
];

export const SMARTPHONE_COMPONENTS: ComponentInfo[] = [
  {
    id: "phone_case",
    name: "Ramka korpusu i szybka tylna (Frame & Glass Back)",
    shortName: "Korpus i tył",
    role: "Szkielet konstrukcyjny telefonu zapewniający wodoszczelność, sztywność oraz punkty mocowania dla baterii i ekranu.",
    specs: [
      "Ramka: Aluminium lotnicze lub stop tytanu",
      "Tył: Szkło Gorilla Glass lub ceramika odporna na zarysowania",
      "Certyfikat szczelności: Klasa IP68 (kurzo- i wodoszczelność)",
      "Zintegrowane cewki ładowania bezprzewodowego Qi"
    ],
    tip: "Szkło Gorilla Glass chroni przed zarysowaniami, ale przy upadku na twarde podłoże to metalowa ramka przejmuje energię uderzenia, co zapobiega pęknięciu ekranu.",
    connections: "Sklejona klejem poliuretanowym uszczelniającym krawędzie urządzenia. Wymaga podgrzania do otwarcia.",
    difficulty: "Trudny",
    colorHex: "#475569", // slate-600
    socketType: "Klej termoczuły PUR & Kołki pozycjonujące",
    socketDetails: "Brak tradycyjnych gniazd elektronicznych w obudowie. Służy jako nośnik dla taśmy klejącej (uszczelki IP68) oraz zintegrowanych anten LDS (Laser Direct Structuring) napylonych na jej wewnętrzne ścianki plastikowe."
  },
  {
    id: "phone_screen",
    name: "Ekran Super AMOLED o wysokim odświeżaniu",
    shortName: "Ekran AMOLED",
    role: "Kompleksowy moduł wyświetlacza ze zintegrowanym panelem dotykowym (digitizerem), czytnikiem linii papilarnych pod ekranem i filtrem polaryzacyjnym.",
    specs: [
      "Matryca: OLED / Super AMOLED z technologią LTPO",
      "Częstotliwość odświeżania: 1-120 Hz dynamiczne",
      "Gęstość pikseli: np. 450+ PPI, rozdzielczość QHD+",
      "Grubość całego warstwowego modułu: poniżej 1 mm"
    ],
    tip: "Ekrany OLED potrafią trwale się wypalać, jeśli przez wiele godzin wyświetlają ten sam statyczny obraz o wysokim poziomie jasności (np. pasek stanu).",
    connections: "Wklejona z przodu ramki. Łączy się elastyczną taśmą flex bezpośrednio z płytą główną.",
    difficulty: "Trudny",
    colorHex: "#06b6d4", // cyan-500
    socketType: "Drobno-stykowe złącze typu Board-to-Board (BTB)",
    socketDetails: "Elastyczna taśma sygnałowa (FPC) zakończona jest metalową mikro-wtyczką krawędziową typu BTB, która jest dociskana do mikroskopijnego gniazda na płycie głównej. Złącze to zabezpiecza się przed odpięciem metalową blaszką i śrubką."
  },
  {
    id: "phone_battery",
    name: "Bateria Li-Ion o wysokiej gęstości",
    shortName: "Bateria telefonu",
    role: "Odpowiada za zmagazynowanie energii elektrycznej. Wyciska maksymalną pojemność z ekstremalnie cienkiej formy fizycznej.",
    specs: [
      "Typ: Litowo-jonowa o wysokiej gęstości wolumetrycznej",
      "Pojemność: np. 5000 mAh (19.25 Wh)",
      "Maksymalne ładowanie: Szybkie ładowanie (np. 45W - 120W)",
      "Skład: Katoda bogata w kobalt lub nikiel"
    ],
    tip: "Podczas wymiany baterii nigdy nie używaj ostrych narzędzi ze stali. Przebicie powłoki aluminiowej akumulatora wywołuje gwałtowny pożar litu!",
    connections: "Wklejona trwale wewnątrz ramki środkowej za pomocą taśm ułatwiających wyciąganie (pull-tabs).",
    difficulty: "Średni",
    colorHex: "#ea580c", // orange-600
    socketType: "Dwu-ścieżkowe złącze prądowe BTB (Board-to-Board)",
    socketDetails: "Układ wykorzystuje złącze BTB o podwyższonej obciążalności prądowej (szerokie miedziane piny doprowadzające zasilanie wieloamperowe), przesyłając też sygnał z termistora (temperatura) oraz linii ID do kontrolera ładowania."
  },
  {
    id: "phone_soc",
    name: "Procesor SoC (System on Chip)",
    shortName: "Procesor SoC",
    role: "Kompletny komputer na jednym chipie. Zawiera wielordzeniowy procesor (CPU), akcelerator graficzny (GPU), procesor sieciowy (Modem 5G) oraz jednostkę AI (NPU).",
    specs: [
      "Litografia: Proces technologiczny np. 3nm lub 4nm TSMC",
      "Architektura rdzeni: ARMv9 Big.LITTLE (rdzenie wydajne i energooszczędne)",
      "Procesor graficzny: z obsługą mobilnego Ray Tracingu",
      "NPU (Neural Processing Unit) o wydajności np. 30+ TOPS"
    ],
    tip: "Procesory w telefonach nie posiadają wentylatorów. Nadmiar ciepła jest odprowadzany na obudowę i ekran za pomocą grafitowych podkładek oraz cienkiej komory parowej (vapor chamber).",
    connections: "Przylutowany bezpośrednio do płyty głównej (często połączony warstwowo, tzw. Package-on-Package z pamięcią RAM nad nim).",
    difficulty: "Trudny",
    colorHex: "#dc2626", // red-600
    socketType: "Technologia montażowa Package-on-Package (PoP)",
    socketDetails: "Chip procesora jest przylutowany bezpośrednio kulkami BGA w dolnej części, natomiast na jego grzbiecie (górnej powierzchni struktury) przylutowany jest bezpośrednio układ pamięci RAM (PoP Stack). Pozwala to zaoszczędzić cenne miejsce i skrócić opóźnienia RAM do minimum."
  },
  {
    id: "phone_camera",
    name: "Moduł aparatów wielosoczewkowych",
    shortName: "Aparaty foto",
    role: "Rejestruje zdjęcia i wideo za pomocą zespołu obiektywów: głównego, szerokokątnego i teleobiektywu peryskopowego.",
    specs: [
      "Sensor główny: np. 50 MP / 108 MP o rozmiarze bliskim 1 cala",
      "Stabilizacja: Aktywna optyczna stabilizacja matrycy (Sensor-shift OIS)",
      "Obiektyw: Peryskopowy z 5-krotnym zoomem optycznym",
      "Laserowy czujnik ostrości ToF (Time of Flight)"
    ],
    tip: "Silne wibracje (np. podczas jazdy na motocyklu z telefonem zamontowanym na kierownicy) mogą bezpowrotnie zniszczyć precyzyjne elektromagnesy stabilizacji OIS aparatu.",
    connections: "Metalowy blok połączony z główną płytą osobnymi złączami zatrzaskowymi dla każdego obiektywu.",
    difficulty: "Średni",
    colorHex: "#df1890", // vibrant dark pink
    socketType: "Niezależne, złocone złącza Board-to-Board (BTB) o wysokim zagęszczeniu",
    socketDetails: "Każda matryca posiada dedykowaną, elastyczną tasiemkę sygnałową ze złączem BTB. Sygnał przesyłany jest interfejsem MIPI (Mobile Industry Processor Interface) o bardzo wysokiej częstotliwości, odpornym na zakłócenia."
  },
  {
    id: "phone_mobo",
    name: "Główna płyta logiczna i anteny",
    shortName: "Płyta logiczna",
    role: "Niezwykle gęsta płytka drukowana (PCB), często o budowie piętrowej (dwuwarstwowa kanapka). Łączy wszystkie chipy i układy z antenami radiowymi.",
    specs: [
      "Budowa: Multi-layer Stacked PCB",
      "Obsługa pasm: 5G Sub-6, mmWave, Wi-Fi 7, NFC, Ultra Wideband (UWB)",
      "Zintegrowany układ audio i sterownik zasilania (PMIC)",
      "Złącza dla taśm LCD, baterii i płytki dolnej"
    ],
    tip: "Obecne smartfony są tak upakowane, że płyty główne są dwuwarstwowe i połączone spoiwem na krawędziach. Naprawa tego wymaga specjalistycznych stacji lutowniczych na gorąco.",
    connections: "Mocowana śrubkami do ramki. Do niej wpinane są przewody koncentryczne anten oraz cieniutkie taśmy elastyczne.",
    difficulty: "Trudny",
    colorHex: "#16a34a", // green-650
    socketType: "Styki sprężyste (Gold-plated Spring-loaded Contacts) & Gniazda I/O FPC",
    socketDetails: "Do połączenia płyty głównej ze zintegrowanymi w ramce antenami RF stosuje się specjalne mikro-blaszki amortyzujące, dociskane sprężynowo podczas skręcania obudowy. Pozostałe porty podrzędne łączą się mikro-złączami FPC."
  },
  {
    id: "phone_memory",
    name: "Pamięć Flash UFS 4.0 i RAM LPDDR5X",
    shortName: "Pamięć UFS / RAM",
    role: "Zapewnia ekstremalnie szybki dostęp do danych systemu oraz pozwala na bezproblemową pracę wielozadaniową w tle.",
    specs: [
      "RAM: Low-Power DDR5X (np. 12 GB lub 16 GB, wysoka przepustowość)",
      "Pamięć masowa: UFS 4.0 (odczyt sekwencyjny do 4200 MB/s)",
      "Ultra-cienki profil układu scalonego BGA"
    ],
    tip: "Jeśli telefon nagle wyłącza się i nie chce przejść poza ekran logowania (tzw. bootloop), częstą przyczyną jest pęknięcie kulek cynowych pod układem pamięci lub procesora.",
    connections: "Układy są trwale scalone z płytą główną bez możliwości jakiejkolwiek wymiany lub dołożenia pamięci.",
    difficulty: "Trudny",
    colorHex: "#8b5cf6", // violet-500
    socketType: "Lutowane struktury BGA (Ball Grid Array)",
    socketDetails: "Układ scalony pamięci korzysta ze zintegrowanego montażu BGA (siatki miniaturowych kulek lutu cynowo-srebrowego pod chipem). Raster między kulkami wynosi poniżej 0.4 mm, a montaż ma stały i niewymienny charakter."
  }
];

export const SERVER_COMPONENTS: ComponentInfo[] = [
  {
    id: "server_case",
    name: "Obudowa Rack 2U (19-calowa)",
    shortName: "Obudowa Rack 2U",
    role: "Standardowa obudowa przeznaczona do montażu w szafach serwerowych typu Rack. Oferuje zoptymalizowany przepływ powietrza przez wentylatory tunelowe.",
    specs: [
      "Wymiary: Szerokość 19 cali, wysokość 2U (ok. 8.9 cm)",
      "Szyny montażowe: Slidery teleskopowe z prowadnicą kabli",
      "Front: Zamykany panel z diodami diagnostycznymi (LED Status Indicators)",
      "Zintegrowany czujnik otwarcia obudowy (intrusion alert)"
    ],
    tip: "Obudowy rackowe są zaprojektowane do wymuszonego chłodzenia liniowego. Powietrze powinno być zasysane zimnym przodem szafy i wyrzucane tyłem (zasada Hot/Cold Aisle).",
    connections: "Wsuwana w metalowe profile szaf Rack, blokowana przednimi uszami śrubowymi typu cage nut.",
    difficulty: "Średni",
    colorHex: "#475569", // slate-600
    socketType: "Szafowe piny pilotujące & Kosze śrubowe (Cage Nuts)",
    socketDetails: "Zatrzaski szynowe typu Tool-less ze sprężynowym ryglem zabezpieczającym. Przednie uszy montażowe mają otwory na śruby M6 z koszyczkami cage nut montowanymi w perforację pionowych kolumn rack szafy."
  },
  {
    id: "server_mobo",
    name: "Płyta główna wieloprocesorowa (Dual-Socket Server)",
    shortName: "Płyta serwerowa",
    role: "Olbrzymia płyta główna obsługująca dwa procesory jednocześnie, posiadająca dziesiątki slotów RAM i potężne możliwości rozszerzeń PCIe.",
    specs: [
      "Obsługa CPU: Dual Socket (np. 2x LGA4677 dla Intel lub SP5 dla AMD)",
      "Banki pamięci: np. 24 lub 32 sloty o wielokanałowej architekturze",
      "Kontroler SAS/SATA RAID wbudowany bezpośrednio w chipset",
      "Sloty rozszerzeń: PCIe Gen 5.0 x16 ze wsparciem dla riserów"
    ],
    tip: "Płyty serwerowe uruchamiają się znacznie dłużej niż zwykły PC (czasem even 5-10 minut). Przed załadowaniem systemu przeprowadzają pełen autotest POST i diagnostykę pamięci RAM.",
    connections: "Przykręcona dziesiątkami śrub do podstawy serwera. Zasilanie dostarczane jest ze specjalnej szyny rozdzielczej (power distribution board).",
    difficulty: "Trudny",
    colorHex: "#059669", // emerald-600
    socketType: "Dwa gniazda LGA (np. SP5 / SP6 / LGA4677) & Układ szyn prądowych Busbar",
    socketDetails: "Potężny panel gniazd wielowarstwowego laminatu server board. Posiada dwa moduły CPU z ramkami zamykanymi metalowym kluczem T30 Torx, 24 lub 32 sloty DDR5 RDIMM z podwójnymi dźwigniami wybijającymi, oraz dedykowany slot krawędziowy OCP NIC 3.0."
  },
  {
    id: "server_cpu",
    name: "Procesory AMD EPYC / Intel Xeon Scalable",
    shortName: "Procesory serwerowe",
    role: "Jednostki o ogromnej liczbie rdzeni. Zaprojektowane do obsługi baz danych, maszyn wirtualnych i wydajnych chmur obliczeniowych przy ciągłej pracy pod pełnym obciążeniem.",
    specs: [
      "Rdzenie/Wątki: Np. do 128 rdzeni i 256 wątków w jednym układzie",
      "Linie PCIe: do 128 linii PCIe 5.0 dedykowanych do szybkich dysków i GPU",
      "Pamięć podręczna: Nawet kilkaset megabajtów (L3 Cache/3D V-Cache)",
      "Obsługiwany standard pamięci: DDR5 ECC Registered z 8 kanałami"
    ],
    tip: "Te procesory są fizycznie ogromne i pobierają do 400W energii. Radiatory serwerowe nie mają wentylatora bezpośrednio na sobie - chłodzone są strumieniem powietrza z turbin obudowy.",
    connections: "Dwa ogromne gniazda Socket ze specjalną procedurą dokręcania śrub kluczem dynamometrycznym o określonym momencie obrotowym.",
    difficulty: "Trudny",
    colorHex: "#dc2626", // red-600
    socketType: "Gniazdo wielostykowe LGA (np. Socket SP5 - 6096 pinów)",
    socketDetails: "Gniazdo LGA typu SP5 lub LGA4677. Posiada gęstą matrycę sprężystych igieł na płycie głównej. Procesor montuje się umieszczając go najpierw w dedykowanej plastikowej ramce (carrier frame) będącej prowadnicą, którą wsuwa się na zawiasy gniazda, opuszcza i dokręca śrubami w kolejności 1->2->3 momentem 1.6 Nm."
  },
  {
    id: "server_ram",
    name: "Rejestrowana pamięć RDIMM DDR5 ECC",
    shortName: "Pamięć DDR5 ECC",
    role: "Pamięć operacyjna odporna na awarie. Technologia ECC (Error Correcting Code) potrafi wykryć i skorygować pojedyncze błędy bitowe (Single-bit errors).",
    specs: [
      "Typ pamięci: RDIMM (Registered/Buffered DIMM)",
      "Korekcja błędów: Advanced ECC ze wsparciem dla Chipkill / DDR5 On-Die ECC",
      "Pojemność pojedynczej kości: np. 64 GB / 128 GB, łącznie nawet kilka terabajtów",
      "Zintegrowany układ rejestrujący (Register) odciążający kontroler CPU"
    ],
    tip: "Zwykły RAM nie pasuje do serwera i odwrotnie. Serwerowe kości rejestrowane RDIMM wymagają odpowiedniej płyty i procesora, które potrafią adresować tak potężne ilości pamięci.",
    connections: "Wciskana pionowo w liczne banki pamięci. Musi być instalowana w ściśle określonej kolejności opisanej w instrukcji płyty.",
    difficulty: "Łatwy",
    colorHex: "#8b5cf6", // violet-500
    socketType: "Dwustronny Slot RDIMM DDR5 (288-pin z bocznikowaniem)",
    socketDetails: "Złącze RDIMM ze stykami o wysokiej czystości. Nowy standard DDR5 na płycie oferuje centralny klucz pozycjonujący. Wymaga dociśnięcia modułu dopóki oba boczne białe zatrzaski nie zamkną się automatycznie z głośnym zatrzaśnięciem."
  },
  {
    id: "server_hotswap",
    name: "Zatoki dyskowe NVMe/SAS Hot-Swap (Backplane)",
    shortName: "Dyski Hot-Swap",
    role: "Zapewniają bezpieczne i szybkie składowanie danych z możliwością wymiany uszkodzonego dysku 'w locie' (pod napięciem), bez wyłączania serwera.",
    specs: [
      "Nośniki: Dyski SAS, SATA Enterprise lub U.3/U.2 NVMe SSD",
      "Backplane: Aktywna płytka ze sterownikami SAS Expander",
      "Konfiguracja RAID: Sprzętowy kontroler z podtrzymaniem bateryjnym (BBU)",
      "Mechanizm zatrzaskowy (caddy) z kluczem i diodami aktywności"
    ],
    tip: "Czerwona lub pomarańczowa migająca dioda na zatrzasku oznacza, że dysk uległ awarii lub kończy swoją żywotność. Można go wyjąć bezpośrednio podczas pracy systemu.",
    connections: "Wsuwane od frontu obudowy w ramki montażowe. Wpinają się bezpośrednio w zintegrowane złącze tylne (Backplane).",
    difficulty: "Łatwy",
    colorHex: "#e11d48", // rose-600
    socketType: "Zintegrowane gniazdo wieloprotokołowe SFF-8639 (U.2/U.3/SAS)",
    socketDetails: "Tylna płyta połączeniowa (Backplane) integruje gniazda SFF-8639 obsługujące jednocześnie protokoły SAS 12G, SATA 6G oraz bezpośrednie linie PCI Express NVMe (U.2/U.3), przesyłając też sygnał sterujący SMBus/SGPIO."
  },
  {
    id: "server_psu",
    name: "Zasilacze redundantne (Hot-Plug PSU)",
    shortName: "Zasilacze redundantne",
    role: "Układ zasilania składający się z dwóch (lub więcej) niezależnych bloków pracujących w trybie podziału obciążenia lub rezerwy aktywnej (1+1).",
    specs: [
      "Moc pojedynczego bloku: np. 800W - 1600W Titanium (sprawność > 96%)",
      "Standard: Platinum/Titanium PMBus z monitorowaniem poboru mocy",
      "Wymiana: Hot-Plug (zatrzask umożliwia wysunięcie zasilacza podczas pracy)",
      "Dwa osobne wejścia sieciowe podłączane pod odrębne linie torów UPS"
    ],
    tip: "Aby zasilanie redundantne miało sens, jeden zasilacz podłącza się do Głównego Portu Zasilania szafy, a drugi do zapasowej linii UPS lub agregatu prądotwórczego.",
    connections: "Wsuwane od tyłu w dedykowane gniazda karty dystrybucji zasilania serwera.",
    difficulty: "Łatwy",
    colorHex: "#4f46e5", // indigo-600
    socketType: "Złącze krawędziowe zasilacza Hot-Plug (Gold-finger Blade slot)",
    socketDetails: "Wyjście prądowe zasilacza to solidny laminowany panel krawędziowy Gold-finger ze stykami miedzianymi o bardzo wysokim złoceniu, wsuwany bezpośrednio w metalowe gniazdo sprężynowe na płycie dystrybucyjnej (PDB)."
  },
  {
    id: "server_nic",
    name: "Karta sieciowa 100GbQSFP28/OCP3.0",
    shortName: "Karta sieciowa 100G",
    role: "Zapewnia błyskawiczne, optyczne połączenie z siecią LAN i szkieletem serwerowni w celu natychmiastowej transmisji gigantycznych pakietów danych.",
    specs: [
      "Złącza: Porty optyczne SFP28 (25Gb) lub QSFP28 (100Gb Transceivers)",
      "Standard interfejsu: OCP NIC 3.0 (specjalny slot z tyłu obudowy)",
      "Wsparcie technologii: RDMA over Converged Ethernet (RoCE), SR-IOV",
      "Cechy: Sprzętowy odciążający silnik pakietowy (Intel/Mellanox)"
    ],
    tip: "Karty 100G wykorzystują kable światłowodowe wielomodowe lub kable bezpośredniego połączenia miedzianego (DAC). Emitują one znaczne ilości ciepła na końcówkach.",
    connections: "Instalowana w dedykowanej zatoce OCP 3.0 bez konieczności rozkręcania obudowy, przykręcana śrubą skrzydełkową.",
    difficulty: "Średni",
    colorHex: "#0ea5e9", // sky-500
    socketType: "Złącze krawędziowe OCP NIC 3.0 (SFF-TA-1002)",
    socketDetails: "Karta sieciowa w nowym standardzie OCP 3.0 (Open Compute Project) korzysta z krawędziowego złącza SFF-TA-1002 o bardzo wysokiej częstotliwości, łącząc bezpośrednio 16 linii PCIe Gen 4/5 z procesorem przez tylny panel."
  },
  {
    id: "server_ipmi",
    name: "Kontroler zarządzania IPMI 2.0 / BMC (ASPEED)",
    shortName: "Kontroler IPMI/BMC",
    role: "Niezależny miniaturowy komputer na płycie głównej (BMC). Pozwala administratorowi na zdalny restart, instalację systemu i pełen monitoring serwera, nawet przy wyłączonym głównym zasilaniu.",
    specs: [
      "Chipset: np. ASPEED AST2600 BMC z dedykowaną własną pamięcią RAM",
      "Dostęp: Dedykowany, fizyczny port Ethernet (Management Port)",
      "Interfejs: Web GUI przez protokoły Redfish, HTML5 KVM console",
      "Zasilanie: Niezależna linia standby (zawsze aktywne po wpięciu do gniazdka)"
    ],
    tip: "BMC to najważniejsze narzędzie administratora. Umożliwia ono zdalną kontrolę nad serwerem z drugiego końca świata - od widoku BIOS po czujniki temperatur i obrotów.",
    connections: "Zintegrowany układ wbudowany bezpośrednio na laminacie płyty głównej serwera.",
    difficulty: "Trudny",
    colorHex: "#06b6d4", // cyan-500
    socketType: "Magistrala zintegrowana SMT (BGA) & Port RJ45 1Gbps",
    socketDetails: "Układ ASPEED BMC jest przylutowany powierzchniowo (SMT) do płyty głównej. Posiada wewnętrzną dedykowaną szynę PCIe/LPC łączącą go z chipsetem oraz wyprowadzony niezależny fizyczny port RJ45 RJ-11 Ethernet z diodami aktywności LED."
  }
];

export const TABLET_COMPONENTS: ComponentInfo[] = [
  {
    id: "tablet_body",
    name: "Obudowa Ultra-thin (Chassis & Unibody)",
    shortName: "Obudowa unibody",
    role: "Zintegrowana, lekka konstrukcja wykonana z jednego bloku metalu. Zapewnia ochronę, odprowadza pasywnie ciepło oraz usztywnia ekran.",
    specs: [
      "Materiał: Aluminium lub stale anodyzowane",
      "Grubość profilu: poniżej 6 mm",
      "Punkty magnetyczne do mocowania rysika i aktywnego etui",
      "Zintegrowane mikrofony kierunkowe u góry"
    ],
    tip: "Obudowy unibody są podatne na zgięcia przy mocniejszym nacisku (np. w ciasnym plecaku). Zawsze stosuj sztywne etui ochronne.",
    connections: "Ramka nośna spajająca ekran na zatrzaski oraz warstwy kleju termotopliwego.",
    difficulty: "Średni",
    colorHex: "#475569",
    socketType: "Siatka magnesów neodymowych (Halbach Array)",
    socketDetails: "Brak złączy elektrycznych o charakterze krawędziowym. Ramka obudowy integruje pierścienie magnesów w układzie Halbacha dające stabilny, kierunkowy nacisk magnetyczny do ładowania indukcyjnego rysika (indukcja Qi o mocy ~2W)."
  },
  {
    id: "tablet_screen",
    name: "Wyświetlacz Liquid Retina z warstwą digitalizującą",
    shortName: "Ekran matrycowy",
    role: "Precyzyjny ekran dotykowy ze zintegrowanym kontrolerem rysika. Mapuje setki punktów dotyku równolegle w czasie rzeczywistym.",
    specs: [
      "Matryca: Laminated IPS / Tandem OLED o wysokiej luminancji",
      "Czułość rysika: 4096 poziomów nacisku",
      "Technologia adaptacyjna (np. ProMotion 120Hz)",
      "Powłoka przeciwodblaskowa (Anti-reflective coating)"
    ],
    tip: "Uszkodzenie samej zewnętrznej szybki w laminowanym ekranie i tak najczęściej wymaga wymiany całego, drogiego modułu wyświetlacza z emiterem dotyku.",
    connections: "Sygnał przesyłany jest delikatną taśmą matrycy wpinaną bezpośrednio do płyty głównej przez złącze zatrzaskowe.",
    difficulty: "Trudny",
    colorHex: "#0ea5e9",
    socketType: "Niskoprofilowy konektor Board-to-Board (BTB 54-pin)",
    socketDetails: "Dwu-kanałowy przesył informacji graficznej eDP o wysokiej gęstości przesyłany jest płaską taśmą FPC wpiętą w gniazdo BTB o wysokości profilu (stacking height) rzędu zaledwie 0.6 mm na płycie głównej."
  },
  {
    id: "tablet_battery",
    name: "Płaska Bateria Li-Polymer (Dual-Cell)",
    shortName: "Bateria tabletu",
    role: "Ogniwo o dużej powierzchni zapewniające długie godziny pracy. Często podzielona funkcjonalnie na dwie komory celem zbalansowania masy urządzenia.",
    specs: [
      "Typ: Litowo-polimerowa dwukomorowa (Dual-Cell)",
      "Pojemność: np. 8000 mAh - 10000 mAh (38 Wh)",
      "Obsługa ładowania USB-C Power Delivery",
      "Zabezpieczenia przed przegrzaniem (Thermal cutoff sensor)"
    ],
    tip: "Tablety rozładowują baterię wolniej ze względu na ultra-oszczędne procesory ARM. Unikaj jednak trzymania ładowarki wpiętej przez 100% czasu na biurku.",
    connections: "Mocno wklejona na spodzie obudowy unibody. Posiada tasiemkę doprowadzającą zasilanie do płyty głównej.",
    difficulty: "Trudny",
    colorHex: "#f59e0b",
    socketType: "Wielostykowa szyna prądowa FPC & Śruby uziemiające",
    socketDetails: "Akumulator ma wlutowaną tasiemkę miedzianą ze złoconymi padami kontaktowymi, dociiskaną bezpośrednio do dedykowanych pinów sprężystych na płycie głównej za pomocą metalowej klamerki i miniaturowej śrubki."
  },
  {
    id: "tablet_soc",
    name: "Procesor Mobilny SoC (System on Chip)",
    shortName: "Procesor SoC",
    role: "Zintegrowana jednostka obliczeniowa o wysokiej sprawności energetycznej. Łączy moc obliczeniową CPU ze zoptymalizowaną energooszczędnością.",
    specs: [
      "Litografia: Proces technologiczny 3nm/4nm",
      "Zintegrowana pamięć RAM LPDDR5X (Unified Memory)",
      "Kontroler neuronowy NPU do przetwarzania rysunków i gestów AI",
      "Pasywne chłodzenie oparte na miedzianym shieldzie osłonowym"
    ],
    tip: "Procesor in tablecie nie posiada wentylatora, dlatego pod ekstremalnym, długotrwałym obciążeniem urządzenie zbliża się do limitów termicznych i zwalnia.",
    connections: "Przylutowany na stałe technologią BGA do miniaturowej płyty głównej tabletu.",
    difficulty: "Trudny",
    colorHex: "#ef4444",
    socketType: "Metoda montażowa BGA z technologią Unified Memory Architecture (UMA)",
    socketDetails: "Układ SoC w tablecie używa architektury pamięci połączonej (Unified Memory). Kości RAM są przylutowane bezpośrednio na tym samym laminacie nośnika (interposerze) krzemowego tuż obok procesora za pomocą mikro-kulek BGA o rozstawie < 0.25 mm."
   },
  {
    id: "tablet_digitizer",
    name: "Aktywny panel interakcji dotykowej (Digitizer)",
    shortName: "Digitizer",
    role: "Ultracienka siatka przewodząca pod szkłem, która rejestruje pole elektromagnetyczne rysika i przekształca je w ruch bez opóźnień.",
    specs: [
      "Częstotliwość próbkowania piórka: 240+ Hz",
      "Rozpoznawanie kąta nachylenia rysika (Tilt support)",
      "Wsparcie technologii Palm Rejection (ignorowanie dotyku dłoni)"
    ],
    tip: "Jeżeli na ekranie pojawia się martwa strefa (brak reakcji na dotyk w jednym miejscu), to znak, że uszkodzeniu uległa ścieżka w warstwie digitizera.",
    connections: "Zintegrowana fabrycznie z matrycą ekranu, wpięta osobnym złączem magistrali SPI.",
    difficulty: "Trudny",
    colorHex: "#10b981",
    socketType: "Złącze taśmowe FPC typu LIF (Low Insertion Force) o podwyższonym ekranowaniu",
    socketDetails: "Sygnał mikrokontrolera dotykowego przesyłany jest przez złącze krawędziowe LIF ze złotym napyleniem galwanicznym, zabezpieczonym miedzianą taśmą uziemiającą odprowadzającą zakłócenia zasilające ładowarki."
  },
  {
    id: "tablet_board",
    name: "Płyta logiczna o podwyższonej gęstości",
    shortName: "Płyta logiczna",
    role: "Długi, ultra wąski laminat łączący procesor SoC z modułami wejść/wyjść i przyciskami fizycznymi.",
    specs: [
      "Szerokość laminatu: poniżej 2 cm, wielowarstwowa struktura",
      "Wbudowane układy szybkiego ładowania i protokołu Thunderbolt",
      "Zintegrowane gniazdo kart SIM (opcjonalny modem LTE/5G)"
    ],
    tip: "Z uwagi na miniaturyzację, porty USB-C w tabletach są wlutowane bezpośrednio w płytę, a ich wyłamanie to częsta usterka mechaniczna.",
    connections: "Przykręcona do tyłu obudowy, podłączona do baterii, ekranu, głośników i aparatów.",
    difficulty: "Trudny",
    colorHex: "#db2777",
    socketType: "Zgrupowanie złącz szynowych FPC/LIF/BTB & Slot Nano-SIM (Tray slot)",
    socketDetails: "Kompleks dystrybucyjny. Zawiera gniazda BTB o skrajnym zagęszczeniu pinów dla taśmy ekranowej, wlutowany slot karty Nano-SIM ze sprężynowym mechanizmem wyzwalającym (Eject-pin slot) oraz złącza podrzędne mikroprzełączników bocznych (Volume keys)."
  }
];

export const SBC_COMPONENTS: ComponentInfo[] = [
  {
    id: "sbc_soc",
    name: "Procesor jednopłytkowy SoC (Broadcom/Rockchip)",
    shortName: "Procesor SoC",
    role: "Kompletny układ scalony integrujący energooszczędny procesor ARM Cortex, grafikę 3D i kontrolery peryferyjne niskiego poziomu.",
    specs: [
      "Architektura: ARM Cortex Quad-Core / Octa-Core",
      "Zintegrowany procesor graficzny VideoCore lub Mali GPU",
      "Wbudowany dekoder wideo H.265 4K60",
      "Niski pobór mocy: ok. 5W - 15W pod pełnym obciążeniem"
    ],
    tip: "Procesory w SBC są zazwyczaj odsłonięte. Przy intensywnej pracy warto dołożyć malutki samoprzylepny radiator aluminiowy, aby uniknąć obniżania taktowania.",
    connections: "Wlutowany bezpośrednio w centrum jedynego laminatu płytki komputera.",
    difficulty: "Trudny",
    colorHex: "#ef4444",
    socketType: "Montaż lutowany BGA (Ball Grid Array - direct to PCB)",
    socketDetails: "Brak gniazda fizycznego. Układ SoC pozycjonowany jest automatycznie przez roboty typu pick-and-place i lutowany bezpośrednio w piecu rozpływowym na stałe."
  },
  {
    id: "sbc_ram",
    name: "Pamięć LPDDR4/LPDDR5 (Lutowany RAM)",
    shortName: "Lutowany RAM",
    role: "Pamięć robocza o niskim poborze mocy, umieszczona bezpośrednio przy procesorze w celu skrócenia ścieżek sygnałowych i redukcji opóźnień.",
    specs: [
      "Typ: LPDDR4X lub LPDDR5 SDRAM",
      "Pojemność: np. 2 GB, 4 GB lub 8 GB",
      "Szyna danych: 32-bit lub 64-bit o niskim napięciu roboczym"
    ],
    tip: "Nie ma możliwości dołożenia pamięci RAM do komputera jednopłytkowego. Przy zakupie musisz od razu wybrać odpowiedni wariant pojemnościowy.",
    connections: "Układ scalony BGA trwale przylutowany do płyty głównej.",
    difficulty: "Trudny",
    colorHex: "#a855f7",
    socketType: "Dedykowana matryca montażowa BGA o gęstym rastrze (Fine-pitch BGA)",
    socketDetails: "Kość pamięci montowana jest powierzchniowo tuż obok procesora SoC z trasowaniem ścieżek sygnałowych w technologii impedancji kontrolowanej w celu eliminacji zniekształceń sygnału wysokiej częstotliwości."
  },
  {
    id: "sbc_microsd",
    name: "Czytnik kart pamięci MicroSD (Slot systemowy)",
    shortName: "Czytnik MicroSD",
    role: "Działa jako główny dysk twardy komputera jednopłytkowego. Przechowuje system operacyjny (np. Linux Raspbian) i dane użytkownika.",
    specs: [
      "Obsługiwane standardy: UHS-I, MicroSDHC, MicroSDXC",
      "Protokół komunikacji: SDIO 4-bit bus transfer",
      "Podtrzymanie sprężynowe lub złącze typu push-pull"
    ],
    tip: "Używaj kart szybkiej klasy (np. A1 lub A2), które są zoptymalizowane pod kątem swobodnego zapisu i odczytu wielu małych plików (operacji wejścia/wyjścia).",
    connections: "Fizyczne złącze lutowane na spodnim lub górnym laminacie płytki drukowanej.",
    difficulty: "Łatwy",
    colorHex: "#ec4899",
    socketType: "Sprężynowe gniazdo Push-Push MicroSD",
    socketDetails: "Wewnętrzny mechanizm zapadkowo-sprężynowy ułatwiający wsuwanie i wysuwanie karty pamięci. Posiada metalową ramkę ekranującą (shield) wlutowaną powierzchniowo do wspólnej masy miedzianej płytki."
  },
  {
    id: "sbc_gpio",
    name: "Złącze uniwersalnych pinów wejść/wyjść (GPIO Header)",
    shortName: "Piny GPIO",
    role: "Umożliwia bezpośredni kontakt z fizycznym światem elektroniki. Służy do podłączania diod LED, czujników temperatury, przekaźników i mikrokontrolerów.",
    specs: [
      "Standard: 40-pin męski raster 2.54 mm",
      "Sygnały: GPIO, I2C, SPI, UART, PWM",
      "Napięcie robocze sygnałów logicznych: 3.3V (niepodatne na 5V!)"
    ],
    tip: "Pomyłkowe podłączenie napięcia 5V bezpośrednio do pinu sygnałowego GPIO (3.3V) bez rezystora prawie natychmiast uśmierci cały krzem procesora SoC.",
    connections: "Piny wlutowane przelotowo w płytkę PCB; pozwalają na zakładanie żeńskich kabli typu Jumper.",
    difficulty: "Średni",
    colorHex: "#10b981",
    socketType: "Dwurzędowy pinownik przelotowy 2x20 Pin o rastrze 2.54 mm (0.1\")",
    socketDetails: "Złocone piny lutowane przelotowo (THT - Through-Hole Technology) przez laminat o dużej odporności na wyginanie i częste podłączanie akcesoriów dogniazdowych."
  },
  {
    id: "sbc_hdmi",
    name: "Porty Micro-HDMI (Wyjścia wideo)",
    shortName: "Porty Micro-HDMI",
    role: "Zminiaturyzowane porty wideo umożliwiające podłączenie do dwóch monitorów lub telewizorów jednocześnie z przesyłem dźwięku wielokanałowego.",
    specs: [
      "Interfejs: Standard Micro-HDMI (Typ D)",
      "Obsługa rozdzielczości: do Dual 4K przy 60 kl/s",
      "Zgodność z protokołem sterowania CEC (Consumer Electronics Control)"
    ],
    tip: "Kable Micro-HDMI są dość sztywne i mogą uszkodzić delikatny port przy gwałtownym poruszeniu. Stosuj krótkie, elastyczne przejściówki.",
    connections: "Metalowe obudowy gniazd przylutowane do krawędzi płytki ze wzmocnionym montażem SMT.",
    difficulty: "Średni",
    colorHex: "#0ea5e9",
    socketType: "Gniazdo Micro-HDMI Typ D (19-stykowe, wzmocnione ekranowanie)",
    socketDetails: "Miniaturowe złącze lutowane w technologii hybrydowej (piny sygnałowe powierzchniowo SMT, ramię konstrukcyjne portu metalowymi bolcami przelotowo THT do płyty głównej dla większej odporności mechanicznej)."
  },
  {
    id: "sbc_wlan",
    name: "Moduł bezprzewodowy (Wi-Fi & Bluetooth)",
    shortName: "Moduł Wi-Fi/BT",
    role: "Integruje dwuzakresową łączność bezprzewodową z internetem oraz umożliwia bezproblemowe łączenie peryferiów BT (klawiatury, słuchawki).",
    specs: [
      "Standardy: Wi-Fi 5 GHz (802.11ac) + Bluetooth 5.0 BLE",
      "Antena: Ceramiczna wbudowana na laminacie lub złącze antenowe U.FL",
      "Ekranowanie: Metalowa puszka zapobiegająca interferencji magnetycznej"
    ],
    tip: "Metalowe obudowy, w których montuje się SBC, potrafią całkowicie zablokować bezprzewodowy sygnał Wi-Fi. Wybierz obudowę z plastiku lub akrylu.",
    connections: "Układ Scalony przylutowany powierzchniowo z doprowadzonymi ścieżkami antenowymi.",
    difficulty: "Trudny",
    colorHex: "#f59e0b",
    socketType: "Miniaturowe złącze koncentryczne IPEX / U.FL (opcjonalne do anteny zewnętrznej)",
    socketDetails: "Układ radiowy jest zalutowany bezpośrednio na płycie głównej. Niektóre kustomowe płytki jednopłytkowe integrują ultra-miniaturowe złącze koaksjalne U.FL typu męskiego (0.81 mm) o impedancji falowej 50 Ohm do nakręcenia anteny o większym zysku sygnału."
  },
  {
    id: "sbc_power",
    name: "Port zasilania USB-C stabilizowany",
    shortName: "Gniazdo zasilania",
    role: "Złącze dedykowane wyłącznie do bezpiecznego dostarczania zasilania prądu stałego o stabilnym napięciu.",
    specs: [
      "Parametry zasilania: 5V DC przy natężeniu do 3.0A / 5.0A",
      "Wbudowane zabezpieczenie przed przepięciami (Zener Overvoltage diode)",
      "Układy PMIC zarządzające sekcjami zasilania płyty"
    ],
    tip: "Klasyczne ładowarki do smartfonów mogą wywoływać spadki napięcia pod obciążeniem, co skutkuje niestabilnością systemu Linux. Używaj dedykowanych zasilaczy.",
    connections: "Gniazdo USB-C wlutowane krawędziowo na laminacie płytki.",
    difficulty: "Łatwy",
    colorHex: "#6366f1",
    socketType: "Port krawędziowy USB Typ C (24-pinowy, lutowanie hybrydowe)",
    socketDetails: "Wlutowane powierzchniowo ze wspornikiem kotwiczenia obudowy złącza wtopionym przelotowo w laminat. Przeznaczone wyłącznie do dostarczania stałego napięcia 5V oraz prądów o dużym obciążeniu metodą obwodów o grubym trasowaniu."
  }
];

export const GAME_CONSOLE_COMPONENTS: ComponentInfo[] = [
  {
    id: "console_case",
    name: "Aerodynamiczna Obudowa z dyfuzorem",
    shortName: "Obudowa konsoli",
    role: "Unikalna bryła stanowiąca komorę przepływu powietrza dla turbiny, wygłuszająca szum wentylatora i integrująca podświetlenia estetyczne.",
    specs: [
      "Materiał: Wtryskiwane tworzywo polimerowe wysokiej gęstości",
      "Konstrukcja: Panele demontowalne dla ułatwienia odkurzania radiatorów",
      "Złącza frontowe: USB SuperSpeed, port ładowania akcesoriów"
    ],
    tip: "Trzymanie konsoli w ciasnej, zamkniętej szafce RTV prowadzi do kumulacji gorącego powietrza, przegrzewania oraz bardzo głośnej pracy wentylatorów.",
    connections: "Obudowa zatrzaskowa z ukrytymi śrubami bezpieczeństwa (Torx Security).",
    difficulty: "Średni",
    colorHex: "#475569",
    socketType: "Zatrzaski pozycjonujące korpusu & śruby Security Torx T8/T9",
    socketDetails: "Zatrzaski i śruby z bolcem zabezpieczającym umieszczonym centralnie w gnieździe (Torx Security), wymagające specjalnych narzędzi w celu ochrony przed nieautoryzowaną ingerencją w układ chłodzenia."
  },
  {
    id: "console_apu",
    name: "Kustomizowane APU (Zunifikowane CPU + GPU)",
    shortName: "Procesor APU",
    role: "Wydajny, jednorodny krzem łączący wielordzeniowy procesor i potężny silnik graficzny. Współdzieli pamięć zunifikowaną dla maksymalnej przepustowości.",
    specs: [
      "Architektura: x86-64 AMD Ryzen (np. 8 rdzeni Zen 2/Zen 4)",
      "Układ graficzny: Architektura AMD RDNA (np. 10 - 16 TFLOPS)",
      "Sprzętowy silnik dekompresji danych z dysku SSD w locie",
      "Interfejs termiczny: Ciekły metal (Liquid Metal) zamiast zwykłej pasty"
    ],
    tip: "Zamiast klasycznej pasty fabrycznie nakładany jest tu ciekły metal o ekstremalnej przewodności. Samodzielna wymiana wymaga ogromnej ostrożności, gdyż płynny metal przewodzi prąd i może wywołać zwarcie.",
    connections: "Przylutowane na stałe ogromnymi kulami lutowniczymi w sercu płyty głównej.",
    difficulty: "Trudny",
    colorHex: "#ef4444",
    socketType: "Wlutowane powierzchniowo w jądro PCB (BGA z kołnierzem antywyciekowym)",
    socketDetails: "Dedykowana matryca BGA z uszczelką piankową / klejem silikonowym wokół jądra krzemowego, zapobiegającym wyciekaniu prądo-przewodzącego ciekłego metalu (Liquid Metal) na drobne rezystory płyty głównej."
  },
  {
    id: "console_cooler",
    name: "Wielkopłatowy Chłodzący Blok Tunelowy",
    shortName: "Turbina chłodząca",
    role: "Masywne chłodzenie oparte na komorze parowej (Vapor Chamber) oraz potężnym wentylatorze promieniowym, zasysającym powietrze z góry na dół.",
    specs: [
      "Wentylator: Średnica 120 mm lub turbina radialna boczna",
      "Materiały: Miedziane żebra, komora parowa o fazowym przepływie cieczy",
      "Automatyczna krzywa akustyczna sterowana czujnikami u jądra APU"
    ],
    tip: "Gdy konsola zaczyna drastycznie spowalniać gry, najczęstszą przyczyną jest zapchanie kurzem drobnych żeberek miedzianego radiatora przy wylocie.",
    connections: "Mocowane dociskowo za pomocą metalowego krzyżaka tylnego ze śrubami o określonym docisku.",
    difficulty: "Średni",
    colorHex: "#0ea5e9",
    socketType: "Klamra dociskowa sprężynowa typu 'X-Clamp' & wtyk 4-pin PWM",
    socketDetails: "Metalowy krzyżak pod płytą główną z czterema śrubami o określonym docisku sprężyny, utrzymujący ściśle wyrównaną siłę docisku komory parowej na APU, zasilany złączem 4-pin PWM."
  },
  {
    id: "console_ssd",
    name: "Dysk Ultra-Speed NVMe SSD",
    shortName: "Szybki dysk SSD",
    role: "Gwarantuje ładowanie tekstur 3D w locie (eliminacja ekranów ładowania). Współpracuje bezpośrednio ze sprzętowymi dekompresorami na APU.",
    specs: [
      "Interfejs: Custom PCIe Gen 4 x4, przepustowość surowa np. 5.5 GB/s+",
      "Kontroler: Zaprojektowany pod wielokanałowe kolejkowanie odczytu gier",
      "Dedykowane gniazdo rozszerzeń na standardowe dyski NVMe M.2"
    ],
    tip: "Jeśli dokładasz drugi dysk M.2 do konsoli, pamiętaj o zakupie modelu z fabrycznie zamontowanym płaskim radiatorem - temperatura gniazda bywa bardzo wysoka.",
    connections: "Moduł podstawowy wlutowany, złącze dodatkowe M.2 zabezpieczone metalową klapką.",
    difficulty: "Średni",
    colorHex: "#ec4899",
    socketType: "Wlutowane kości BGA & Slot rozszerzeń M.2 Key-M NVMe",
    socketDetails: "Podstawowy dysk jest na stałe wlutowany (BGA) dla redukcji opóźnień. Slot rozszerzeń to gniazdo M.2 Key M ze wsparciem dla rozmiarów 2230/2242/2280/22110 podłączone bezpośrednio do 4 linii PCIe Gen 4."
  },
  {
    id: "console_ram",
    name: "Szyna pamięci zunifikowanej GDDR6",
    shortName: "Pamięć GDDR6",
    role: "16 GB ultra-szybkiej pamięci, która eliminuje opóźnienia kopiowania danych między tradycyjnym RAM a pamięcią karty graficznej.",
    specs: [
      "Typ: GDDR6 SDRAM zunifikowana pod magistralę systemową",
      "Szyna pamięci: np. 256-bit lub 320-bit",
      "Przepustowość maksymalna: do 448 GB/s lub więcej"
    ],
    tip: "Zunifikowana pamięć RAM (GDDR6) działa o wiele szybciej niż standardowy RAM DDR5 w PC, co pozwala konsoli rysować gigantyczną odległość renderowania obiektów w grach.",
    connections: "Rozmieszczona gęsto w kołach bezpośrednio wokół procesora APU na płycie głównej.",
    difficulty: "Trudny",
    colorHex: "#a855f7",
    socketType: "Lutowane dwustronnie kości GDDR6 w układzie Ring-Bus BGA",
    socketDetails: "Matryca BGA z 180-pinowym rastrem połączeniowym o zmniejszonej odległości od APU. Wymaga stałego lutowania ze względu na krytyczną częstotliwość pracy szyny GDDR6 dochodzącą do 14 Gbps."
  },
  {
    id: "console_drive",
    name: "Napęd optyczny 4K Ultra HD Blu-ray",
    shortName: "Napęd Blu-ray",
    role: "Umożliwia instalowanie gier z fizycznych nośników Blu-ray oraz odtwarzanie filmów kinowych o wysokiej rozdzielczości.",
    specs: [
      "Typ lasera: Niebiesko-fioletowy o potrójnej gęstości zapisu",
      "Wsparcie dysków: Dual-Layer 66GB oraz Triple-Layer 100GB UHD",
      "Zredukowane wibracje robocze dzięki silikonowym podkładkom tłumiącym"
    ],
    tip: "Kurz osadzający się na małej soczewce laserowej napędu uniemożliwi czytanie płyt. Staraj się nie trzymać konsoli bezpośrednio na podłodze.",
    connections: "Połączony z płytą główną grubą taśmą SATA i osobnym kablem zasilającym z płyty głównej.",
    difficulty: "Średni",
    colorHex: "#db2777",
    socketType: "Gniazdo taśmy sygnałowej mini-SATA (data) & złącza DC 12V 4-pin",
    socketDetails: "Dopasowana elastyczna taśma przesyłu danych oraz 4-pinowa wtyczka zasilania o podwyższonej amortyzacji wibracyjnej."
  },
  {
    id: "console_controller",
    name: "Bezprzewodowy Gamepad (Kontroler Haptyczny)",
    shortName: "Gamepad haptyczny",
    role: "Podstawowe urządzenie wejściowe gracza, przekazujące sygnały fizyczne oraz generujące immersyjne sprzężenie zwrotne w dłoniach.",
    specs: [
      "Łączność: Dedykowany protokół radiowy 2.4 GHz o ultra niskim lagu",
      "Triggery adaptacyjne z mechaniczną blokadą siły oporu (feedback)",
      "Zintegrowane silniczki haptyczne o wysokiej rozdzielczości drgań"
    ],
    tip: "Zjawisko 'dryfowania analogów' (samoczynny ruch w grze) jest powodowane zużywaniem się miedzianych ścieżek grafitowych potencjometru gałek padów.",
    connections: "Synchronizowany radiowo z konsolą lub łączony kablem USB-C.",
    difficulty: "Łatwy",
    colorHex: "#10b981",
    socketType: "Łącze bezprzewodowe ISM 2.4/5GHz & Port USB-C 2.0/3.0",
    socketDetails: "Modulacja radiowa o ultra-niskim czasie propagacji. Port ładowania i transmisji przewodowej USB-C wlutowany powierzchniowo z gumowym tłumikiem naprężeń mechanicznych."
  }
];

export const SUPERCOMPUTER_COMPONENTS: ComponentInfo[] = [
  {
    id: "supercomputer_cabinet",
    name: "Szafa klastrowa o ekstremalnej gęstości (Cabinet)",
    shortName: "Szafa klastrowa",
    role: "Ogromna szafa strukturalna zintegrowana z siecią rozdzielczą chłodzenia cieczą i potężnymi miedzianymi magistralami zasilania prądem.",
    specs: [
      "Wymiary standardu przemysłowego: Wysokość ok. 2 metrów (42U+)",
      "Płyta tylna: Zintegrowana z bezprzewodowym doprowadzeniem rur DLC",
      "Obciążenie strukturalne: Wytrzymałość do 1500 kg nacisku"
    ],
    tip: "Instalacja szafy superkomputera wymaga specjalnych platform wzmocnionych podłogi technicznej, ponieważ szafa ta waży ponad tonę.",
    connections: "Mocowana kotwami do betonowego podłoża serwerowni, zasilana podwójnie.",
    difficulty: "Średni",
    colorHex: "#475569",
    socketType: "Zintegrowana szyna DLC Blind-Mate & Busbar 48V",
    socketDetails: "Szybkozłącza hydrauliczne DLC (Direct Liquid Cooling) zapobiegające wyciekom przy automatycznym wsuwaniu szafy oraz płaskie miedziane terminale stykowe prądu stałego 48V w standardzie Open Rack."
  },
  {
    id: "supercomputer_node",
    name: "Węzeł Obliczeniowy typu Blade (Compute Node)",
    shortName: "Węzeł obliczeniowy",
    role: "Samodzielna szuflada będąca pełnoprawnym komputerem z wieloma procesorami i akceleratorami, wsuwana bezpośrednio do szafy klastrowej.",
    specs: [
      "Przetwarzanie: Np. 2x CPU + 4x lub 8x Akceleratory GPU na jednym laminacie",
      "Brak wentylatorów: Całość ciepła odbierana jest przez miedziane bloki wodne",
      "Szybkie złącza dokujące typu blind-mate na tylnej ściance"
    ],
    tip: "Węzły obliczeniowe wysuwane są na teleskopowych szynach. Mogą być serwisowane bez wyłączania sąsiadujących węzłów w klastrze.",
    connections: "Wsuwany w szafę, automatycznie łączy się z systemem zasilania oraz cyrkulacji wody.",
    difficulty: "Trudny",
    colorHex: "#059669",
    socketType: "Szufladowy interfejs OCP Grand Canyon (Sled blind-mate layout)",
    socketDetails: "Scalone, dokujące gniazdo wielopinowe na tylnej ścianie (Sled Backplane Interface), integrujące linie sygnałowe PCIe klastra, przyłącza niskopoziomowe oraz zasilanie bez kabli ręcznych."
  },
  {
    id: "supercomputer_cpu",
    name: "Procesory klastrowe (High-Performance CPU)",
    shortName: "Procesory klastrowe",
    role: "Wydajne jednostki serwerowe zarządzające dystrybucją zadań obliczeniowych między setkami tysięcy rdzeni akceleratorów w klastrze.",
    specs: [
      "Liczba rdzeni na węzeł: np. do 256 rdzeni / 512 wątków x86 lub ARM",
      "Wbudowane instrukcje wektorowe: AVX-512, AMX (Advanced Matrix Extensions)",
      "Przepustowość magistrali RAM: ponad 800 GB/s na jedno gniazdo"
    ],
    tip: "Te procesory służą jako zarządcy koordynujący ogromne równoległe potoki przesyłu danych.",
    connections: "Osadzone w potężnych gniazdach na laminacie węzła.",
    difficulty: "Trudny",
    colorHex: "#dc2626",
    socketType: "Przemysłowe gniazdo LGA6096 (Socket SP5 / LGA7529)",
    socketDetails: "Gniazdo rzędu wielotysięcznych pinów stykowych (LGA) ze zintegrowaną, wielopunktową klamrą zabezpieczającą (klamra zamykana śrubami dynamometrycznymi), wywierającą równomierny docisk rzędu kilkuset niutonów."
  },
  {
    id: "supercomputer_accel",
    name: "Akceleratory Tensorowe (NVIDIA Tensor Core / Instinct)",
    shortName: "Akceleratory AI",
    role: "Wydajne silniki wykonujące równoległe operacje na macierzach. Odpowiadają za obliczenia naukowe, fizyki i AI.",
    specs: [
      "Wydajność FP64/Matrix: Setki teraflopsów na pojedynczy układ",
      "Pamięć zintegrowana: HBM3 (High Bandwidth Memory) o przepustowości do 3 TB/s",
      "Wielordzeniowe silniki do analizy dużych modeli językowych (LLM)"
    ],
    tip: "Pamięć HBM3 jest układana piętrowo obok rdzenia na wspólnym krzemie, co eliminuje opóźnienia tradycyjnego RAM.",
    connections: "Przylutowane powierzchniowo lub na unikalnym złączu klastrowym SXM bezpośrednio do bazy płyty węzła.",
    difficulty: "Trudny",
    colorHex: "#e11d48",
    socketType: "Moduł klastrowy SXM5 / OCP Accelerator Module (OAM)",
    socketDetails: "Zabezpieczone gniazdo o skrajnie podwyższonym zagęszczeniu pinów sygnałowych o wysokim wektorze częstotliwości, zaprojektowane dla mostka interconnect-u NVLink (szeroka magistrala transferu międzyakceleratorowego)."
  },
  {
    id: "supercomputer_interconnect",
    name: "Sieć InfiniBand / Slingshot Interconnect",
    shortName: "Karta InfiniBand",
    role: "Ultra-szybka karta sieciowa łącząca wszystkie szafy klastra w funkcjonalną jedność (jeden wirtualny komputer).",
    specs: [
      "Maksymalna przepustowość portu: 400 Gbps / 800 Gbps na port",
      "Technologia GPUDirect RDMA (odczyt pamięci innego węzła z pominięciem CPU)",
      "Protokoły unikania zatłoczenia sieci klastrowej w locie"
    ],
    tip: "W superkomputerach opóźnienia sieciowe są ważniejsze niż szerokość pasma.",
    connections: "Karty wpinane w szyny PCIe Gen 5 klastra, połączone kablami optycznymi Active Optical Cable (AOC).",
    difficulty: "Średni",
    colorHex: "#0ea5e9",
    socketType: "Dedykowane klatki portowe OSFP (Octal Small Form-factor Pluggable)",
    socketDetails: "Wysokiej gęstości klatki ze stykami metalowymi o niskim oporze cieplnym (integrated heatsink cage), zasilające optyczne kable modułowe o przepustowości 800 Gbps w standardzie InfiniBand NDR/XDR."
  },
  {
    id: "supercomputer_water",
    name: "System bezpośredniego chłodzenia cieczą (DLC)",
    shortName: "Chłodzenie wodne DLC",
    role: "Cyrkulacyjny system wody demineralizowanej odbierający ciepło bezpośrednio z bloków wodnych nakładanych na procesory i akceleratory.",
    specs: [
      "Rodzaj cieczy: Woda o niskiej przewodności elektrycznej (demineralizowana) z dodatkami antykorozyjnymi",
      "Materiały rur: Stal nierdzewna i przewody bezwyciekowe",
      "Wymiennik ciepła CDI (Coolant Distribution Unit) regulujący temperaturę wody"
    ],
    tip: "Ciepło z płynącej wody chłodzącej o temperaturze ok. 40 stopni może być odzyskiwane i użyte np. do ogrzewania budynków.",
    connections: "Dystrybutor wody doprowadzony do każdego procesora i szczelnie spięty szybkozłączkami Leak-Free.",
    difficulty: "Trudny",
    colorHex: "#06b6d4",
    socketType: "Szybkozłączki bezwyciekowe Quick-Disconnect (QD2/QD4 dripping-free valves)",
    socketDetails: "Automatycznie odcinające przepływ zawory dławiące w rurach przyłączeniowych, sprężynujące pod wpływem tarcia przy wsuwaniu/wysuwaniu węzła DLC z szyny szafy."
  },
  {
    id: "supercomputer_power_feed",
    name: "System zasilania magistrali szynowej (Busbar Power unit)",
    shortName: "Zasilanie szynowe",
    role: "Miedziane szyny prądowe o gigantycznym przekroju, zamieniające wejściowe prądy sieciowe na niskonapięciowe wysokie natężenie prądu stałego (np. 48V DC).",
    specs: [
      "Przekrój magistrali: Grube, lite płyty miedziane wzdłuż szafy",
      "Napięcie szyny zbiorczej: 48V lub 54V DC (minimalizuje straty)",
      "Zasilacze szafowe o sprawności przewyższającej standard 80 Plus Titanium"
    ],
    tip: "Miedziane szyny zbiorcze są nieizolowane i ukryte z tyłu szafy.",
    connections: "Połączone za pomocą masywnych śrub z tyłu każdego modułu węzła obliczeniowego.",
    difficulty: "Trudny",
    colorHex: "#4f46e5",
    socketType: "Miedziane terminale śrubowe M8/M10 & Szyna zbiorcza Busbar",
    socketDetails: "Grube, nieizolowane miedziane bloki doprowadzające prąd o natężeniu rzędu tysięcy amperów, zabezpieczone na stykach pastą przewodzącą ze srebra przed elektrokorozją."
  }
];

// Combine all of them for easy access
export const ALL_DEVICE_COMPONENTS: Record<DeviceType, ComponentInfo[]> = {
  desktop: [], // will merge at runtime or we import DESKTOP_COMPONENTS
  laptop: LAPTOP_COMPONENTS,
  smartphone: SMARTPHONE_COMPONENTS,
  server: SERVER_COMPONENTS,
  tablet: TABLET_COMPONENTS,
  sbc: SBC_COMPONENTS,
  game_console: GAME_CONSOLE_COMPONENTS,
  supercomputer: SUPERCOMPUTER_COMPONENTS
};
