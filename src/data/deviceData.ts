import { ComponentInfo } from "../types";

export type DeviceType = "desktop" | "laptop" | "smartphone" | "server";

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
    colorHex: "#334155" // slate-700
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
    colorHex: "#0284c7" // sky-600
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
    colorHex: "#d97706" // amber-600
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
    colorHex: "#059669" // emerald-600
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
    colorHex: "#06b6d4" // cyan-500
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
    colorHex: "#c084fc" // purple-450
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
    colorHex: "#db2777" // pink-600
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
    colorHex: "#475569" // slate-600
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
    colorHex: "#06b6d4" // cyan-500
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
    colorHex: "#ea580c" // orange-600
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
    colorHex: "#dc2626" // red-600
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
    colorHex: "#df1890" // vibrant dark pink
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
    colorHex: "#16a34a" // green-650
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
    colorHex: "#8b5cf6" // violet-500
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
    colorHex: "#475569" // slate-600
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
    tip: "Płyty serwerowe uruchamiają się znacznie dłużej niż zwykły PC (czasem nawet 5-10 minut). Przed załadowaniem systemu przeprowadzają pełen autotest POST i diagnostykę pamięci RAM.",
    connections: "Przykręcona dziesiątkami śrub do podstawy serwera. Zasilanie dostarczane jest ze specjalnej szyny rozdzielczej (power distribution board).",
    difficulty: "Trudny",
    colorHex: "#059669" // emerald-600
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
    colorHex: "#dc2626" // red-600
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
    colorHex: "#8b5cf6" // violet-500
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
    colorHex: "#e11d48" // rose-600
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
    colorHex: "#4f46e5" // indigo-600
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
    colorHex: "#0ea5e9" // sky-500
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
    colorHex: "#06b6d4" // cyan-500
  }
];

// Combine all of them for easy access
export const ALL_DEVICE_COMPONENTS: Record<DeviceType, ComponentInfo[]> = {
  desktop: [], // will merge at runtime or we import DESKTOP_COMPONENTS
  laptop: LAPTOP_COMPONENTS,
  smartphone: SMARTPHONE_COMPONENTS,
  server: SERVER_COMPONENTS
};
