import React, { useState } from "react";
import {
  Globe,
  Cable,
  Router,
  Cpu,
  Laptop,
  Server,
  Wifi,
  CheckCircle2,
  Settings,
  Shield,
  Sliders,
  Play,
  Terminal,
  Activity,
  ArrowRight,
  Sparkles,
  Search,
  Check
} from "lucide-react";

interface NetworkStation {
  id: string;
  name: string;
  title: string;
  type: "isp" | "ont" | "router" | "switch" | "client";
  icon: React.ElementType;
  description: string;
  specs: string[];
  voltageOrSpec: string;
  ipSetting: string;
  role: string;
  installationTip: string;
}

const STATIONS: NetworkStation[] = [
  {
    id: "isp",
    name: "Dostawca Internetu (ISP)",
    title: "Sygnał WAN / Chmura ISP",
    type: "isp",
    icon: Globe,
    description: "Globalna magistrala światłowodowa dostawcy (np. Orange, Netia, UPC). Sygnał przesyłany jest falami świetlnymi na bardzo duże odległości bez tłumienia.",
    specs: [
      "Medium: Kabel światłowodowy jednomodowy (Single-mode)",
      "Prędkości: od 300 Mb/s do 10 Gb/s dla klientów domowych",
      "Technologia transmisji: GPON (Gigabit Passive Optical Network)",
      "Adres IP WAN: Publiczny IP przydzielany dynamicznie lub stały"
    ],
    voltageOrSpec: "Laser podczerwony (1310-1550 nm)",
    ipSetting: "Publiczny IP (np. 83.12.94.135)",
    role: "Zapewnienie szerokopasmowej bramy światłowodowej do globalnych zasobów internetowych.",
    installationTip: "Uważaj na zginanie kabli światłowodowych! Minimalny promień gięcia to zwykle 3 cm. Zbyt mocne zagięcie złamie szklany rdzeń i całkowicie wygasi sygnał."
  },
  {
    id: "ont",
    name: "Modem / Terminal GPON (ONT)",
    title: "Terminal ONT (Optical Network Terminal)",
    type: "ont",
    icon: Cable,
    description: "Urządzenie końcowe abonenta, które działa jak tłumacz. Zamienia impulsy świetlne z kabla światłowodowego na impulsy elektryczne przesyłane kablem miedzianym RJ-45.",
    specs: [
      "Wejście: Złącze optyczne SC/APC (zielona wtyczka)",
      "Wyjście: Port LAN 1GbE / 2.5GbE miedziany (RJ-45)",
      "Zasilanie: Zewnętrzny zasilacz sieciowy 12V",
      "Opóźnienia konwersji: Poniżej 1 ms"
    ],
    voltageOrSpec: "Wyjście 12V DC, Port Ethernet",
    ipSetting: "Adres fizyczny MAC (Działa w warstwie 2 modelu OSI)",
    role: "Zamiana sygnału optycznego (światło) na sygnał elektryczny (Ethernet) dla domowego routera.",
    installationTip: "Nigdy nie patrz bezpośrednio w odłączoną wtyczkę światłowodową! Światło lasera GPON jest całkowicie niewidoczne dla ludzkiego oka, ale może trwale uszkodzić siatkówkę."
  },
  {
    id: "router",
    name: "Router WAN/LAN z Wi-Fi",
    title: "Inteligentny Router Brzegowy",
    type: "router",
    icon: Router,
    description: "Serce domowej sieci LAN. Zarządza ruchem sieciowym, rozdziela pasmo i nadaje adresy urządzeniom w domu. Oddziela bezpieczny LAN od niebezpiecznego internetu (WAN).",
    specs: [
      "Technologia Wi-Fi: Wi-Fi 6 (802.11ax) lub Wi-Fi 7",
      "Główne usługi: Serwer DHCP, NAT (Translacja adresów), Firewall SPI",
      "Port WAN: Wpięty do ONT (przypisuje zewnętrzny IP)",
      "Porty LAN: Średnio 4 gniazda gigabitowe dla sieci lokalnej"
    ],
    voltageOrSpec: "Dwuzakresowy 2.4 GHz oraz 5 GHz",
    ipSetting: "Brama domyślna LAN: 192.168.1.1",
    role: "Routing pakietów pomiędzy siecią globalną (WAN) a lokalną (LAN), dystrybucja adresów IP i zapora ogniowa.",
    installationTip: "Umieść router w centralnym punkcie mieszkania na wysokości około 1.5 m. Unikaj zamykania go w metalowych szafkach lub stawiania tuż obok mikrofalówki, która zakłóca pasmo 2.4 GHz."
  },
  {
    id: "switch",
    name: "Przełącznik sieciowy (Switch)",
    title: "Switch LAN (Przełącznik)",
    type: "switch",
    icon: Server,
    description: "Urządzenie do rozbudowy sieci mechanicznej po kablu. Jeśli w routerze brakuje portów Ethernet, Switch działa jak rozgałęźnik sieciowy, kierując pakiety bezpośrednio do właściwego urządzenia na podstawie tablicy MAC.",
    specs: [
      "Liczba portów: 8 / 16 / 24 gniazda RJ-45",
      "Standard prędkości: IEEE 802.3ab (1000BASE-T)",
      "Rodzaj: Niezarządzalny (Plug & Play) lub Zarządzalny (VLAN / QoS)",
      "Obsługa PoE (Power over Ethernet): Zasilanie kamer lub AP po skrętce"
    ],
    voltageOrSpec: "Przepustowość wewnętrzna np. 16 Gbps",
    ipSetting: "Transparentny (Warstwa 2 OSI) lub adres IP do zarządzania",
    role: "Błyskawiczne przełączanie i dystrybucja ramek danych w sieci przewodowej LAN bez kolizji.",
    installationTip: "Do budowy nowoczesnego domu wybieraj przełączniki ze wsparciem standardu Gigabit Ethernet (1000 Mb/s). Tanie switche 100 Mb/s (Fast Ethernet) drastycznie ograniczą szybkość domowego internetu."
  },
  {
    id: "client",
    name: "Urządzenia Końcowe (Odbiorcy)",
    title: "Urządzenia użytkowników końcowych",
    type: "client",
    icon: Laptop,
    description: "Komputery, laptopy, Smart TV, serwery NAS i telefony, które podłączają się do sieci lokalnej przewodowo (RJ-45) lub bezprzewodowo (Wi-Fi).",
    specs: [
      "Złącza fizyczne: Porty RJ-45 w kartach sieciowych (NIC)",
      "Bezprzewodowo: Moduły Wi-Fi ze wsparciem WPA3",
      "Metoda nawiązywania połączenia: Automatyczne pobieranie parametrów przez DHCP",
      "Formaty przesyłu: Protokół TCP/IP"
    ],
    voltageOrSpec: "Karty sieciowe PCI-e / USB / Zintegrowane",
    ipSetting: "Adresy lokalne np. 192.168.1.10 - 192.168.1.254",
    role: "Wykorzystanie zasobów sieciowych i uruchamianie usług sieciowych oraz aplikacji internetowych.",
    installationTip: "Do gier online i pracy z dużymi plikami z serwera NAS zawsze wybieraj kabel. Wi-Fi, mimo wysokich prędkości, generuje wahania opóźnień (tzw. Jitter) i jest podatne na przeszkody budowlane."
  }
];

// RJ-45 Wire Color standard T568B
interface WireColor {
  pin: number;
  colorName: string;
  cssStyle: string;
  role: string;
}

const T568B_COLORS: WireColor[] = [
  { pin: 1, colorName: "Biało-pomarańczowy", cssStyle: "bg-gradient-to-r from-orange-400 via-white to-orange-400 text-slate-850", role: "Transmisja Tx+" },
  { pin: 2, colorName: "Pomarańczowy", cssStyle: "bg-orange-500 text-white", role: "Transmisja Tx-" },
  { pin: 3, colorName: "Biało-zielony", cssStyle: "bg-gradient-to-r from-emerald-400 via-white to-emerald-400 text-slate-850", role: "Odbiór Rx+" },
  { pin: 4, colorName: "Niebieski", cssStyle: "bg-blue-600 text-white", role: "Wolny / PoE" },
  { pin: 5, colorName: "Biało-niebieski", cssStyle: "bg-gradient-to-r from-blue-400 via-white to-blue-400 text-slate-850", role: "Wolny / PoE" },
  { pin: 6, colorName: "Zielony", cssStyle: "bg-emerald-600 text-white", role: "Odbiór Rx-" },
  { pin: 7, colorName: "Biało-brązowy", cssStyle: "bg-gradient-to-r from-amber-800 via-white to-amber-700 text-white", role: "Wolny / PoE" },
  { pin: 8, colorName: "Brązowy", cssStyle: "bg-amber-900 text-white", role: "Wolny / PoE" }
];

export default function NetworkTab() {
  const [selectedStation, setSelectedStation] = useState<NetworkStation>(STATIONS[0]);
  
  // Interactive Addressing Simulator state
  const [gatewayIp, setGatewayIp] = useState("192.168.1.1");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [dhcpStart, setDhcpStart] = useState("10");
  const [dnsServer, setDnsServer] = useState("8.8.8.8");
  const [customSsid, setCustomSsid] = useState("Moja_Siec_Swiatlowodowa");

  // Interactive Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Słownik Sieciowy Atlas v1.0.0",
    "Wpisz polecenie lub kliknij predefiniowane przyciski, aby zbadać działanie sieci...",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const runSimulatedCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response: string[] = [];

    if (cleanCmd === "ipconfig" || cleanCmd === "ipconfig /all") {
      response = [
        `> ${cmd}`,
        "Windows IP Configuration",
        "",
        "Ethernet adapter Ethernet LAN:",
        "   Connection-specific DNS Suffix  . : home.gateway",
        `   IPv4 Address. . . . . . . . . . . : 192.168.1.${dhcpStart}`,
        `   Subnet Mask . . . . . . . . . . . : ${subnetMask}`,
        `   Default Gateway . . . . . . . . . : ${gatewayIp}`,
        "   DHCP Server . . . . . . . . . . . : 192.168.1.1",
        `   DNS Servers . . . . . . . . . . . : ${dnsServer}`,
        "   Physical Address (MAC) . . . . .  : D8-50-E6-BC-1A-2F",
        "Status połączenia: POŁĄCZONO POMYŚLNIE z routerem zaporowym."
      ];
    } else if (cleanCmd.startsWith("ping ")) {
      const target = cmd.split(" ")[1] || "google.com";
      response = [
        `> ${cmd}`,
        `Pinging ${target} with 32 bytes of data:`,
        `Reply from 192.168.1.1 (Gateway): bytes=32 time=0.8ms TTL=64`,
        `Reply from 83.12.94.135 (ISP ONT): bytes=32 time=4.2ms TTL=63`,
        `Reply from ${target}: bytes=32 time=12.5ms TTL=57`,
        `Reply from ${target}: bytes=32 time=11.1ms TTL=57`,
        "",
        `Ping statistics for ${target}:`,
        "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),",
        "Approximate round trip times in milli-seconds:",
        "    Minimum = 0.8ms, Maximum = 12.5ms, Average = 7.1ms"
      ];
    } else if (cleanCmd === "tracert google.com" || cleanCmd === "tracert") {
      response = [
        `> ${cmd}`,
        "Tracing route to google.com [142.250.203.142] over a maximum of 30 hops:",
        "",
        `  1     1 ms    <1 ms    1 ms  BRAMA DOMOWA [${gatewayIp}]`,
        `  2     5 ms     4 ms     4 ms  ONT-CLIENT-TERMINAL [10.120.0.1]`,
        "  3     9 ms     8 ms     8 ms  isp-warszawa-backbone.orange.pl [83.12.94.1]",
        "  4    11 ms    11 ms    11 ms  google-peering.warszawa.ix.pl [195.141.12.5]",
        "  5    12 ms    13 ms    12 ms  waw25s07-in-f14.1e100.net [142.250.203.142]",
        "",
        "Trace complete. Droga pakietu przetworzona bez strat."
      ];
    } else if (cleanCmd === "clear") {
      setTerminalLogs([]);
      return;
    } else if (cleanCmd === "help") {
      response = [
        "Dostępne polecenia diagnostyczne:",
        "  ipconfig      - wyświetla aktualne parametry karty sieciowej użytkownika",
        "  ping [cel]    - bada czas odpowiedzi i drożność trasy do serwera (np. ping wp.pl)",
        "  tracert       - śledzi strukturę przeskoków (routerów) od domu do Google",
        "  clear         - czyści ekran konsoli"
      ];
    } else {
      response = [
        `> ${cmd}`,
        `Wykryto nieznane polecenie sieciowe: "${cmd}".`,
        "Wpisz 'help', aby zobaczyć spis dozwolonych komend szkoleniowych."
      ];
    }

    setTerminalLogs((prev) => [...prev, ...response, ""]);
    setTerminalInput("");
  };

  return (
    <div className="flex flex-col space-y-8 w-full h-full" id="network-tab-root">
      
      {/* Tab introduction banner */}
      <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[100px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                Moduł Sieci Teleinformatycznych
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5">
              Budowa i Tworzenie Sieci LAN od Światłowodu do Klienta
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Dowiedz się, jaką drogę pokonują dane z globalnej sieci internetowej przez infrastrukturę
              fizyczną dostawcy (WAN), urządzenia translacji (ONT) oraz sprzęt dystrybucji lokalnej (LAN).
            </p>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center space-x-3 self-start md:self-auto">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse shrink-0" />
            <div className="text-left font-mono">
              <p className="text-[10px] text-slate-500 leading-none">Typ topologii</p>
              <p className="text-xs font-bold text-slate-200 mt-1">Metropolitan WAN & Star LAN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 1. Network Pipeline Visualization Map & Inspected item */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: The Pipeline (Span 7) */}
        <div className="lg:col-span-12 xl:col-span-7 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-6 flex items-center">
              <Sliders className="w-4 h-4 mr-1.5 text-cyan-400" />
              Interaktywny Schemat Magistrali i Sieci Lokalnej
            </h3>

            {/* Pipeline Visual Track */}
            <div className="relative py-4 my-2">
              <style>{`
                @keyframes packet-flow-left-to-right {
                  0% { left: 0%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
                  10% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                  90% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                  100% { left: 100%; transform: translate(-50%, -50%) scale(0.6); opacity: 0; }
                }
              `}</style>
              
              {/* Connecting ambient neon line through active route */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0 hidden md:block" />
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 -translate-y-1/2 rounded-full z-0 hidden md:block animate-pulse opacity-75 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />

              {/* Sliding data packets along the line */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 z-0 hidden md:block overflow-hidden pointer-events-none">
                <div 
                  className="absolute w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)] top-1/2 -translate-y-1/2 left-0" 
                  style={{ animation: 'packet-flow-left-to-right 3.2s linear infinite' }} 
                />
                <div 
                  className="absolute w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.9)] top-1/2 -translate-y-1/2 left-0" 
                  style={{ animation: 'packet-flow-left-to-right 4.5s linear infinite', animationDelay: '1.4s' }} 
                />
                <div 
                  className="absolute w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.9)] top-1/2 -translate-y-1/2 left-0" 
                  style={{ animation: 'packet-flow-left-to-right 5.8s linear infinite', animationDelay: '2.9s' }} 
                />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
                {STATIONS.map((st, idx) => {
                  const isSelected = selectedStation.id === st.id;
                  const Icon = st.icon;
                  return (
                    <div key={st.id} className="relative flex flex-col items-center">
                      
                      {/* Connection arrow for mobile view vertically */}
                      {idx > 0 && (
                        <div className="md:hidden flex items-center justify-center my-1">
                          <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                        </div>
                      )}

                      {/* Interactive block */}
                      <button
                        onClick={() => setSelectedStation(st)}
                        className={`w-full md:w-28 p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-cyan-950/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-white scale-102"
                            : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-400"
                        }`}
                        id={`net-station-${st.id}`}
                      >
                        {/* Circle Icon layout with real-time packet pulsation */}
                        <div className="relative mb-2.5">
                          {/* Outer animated pulsing ripples */}
                          <span 
                            className="absolute -inset-1 rounded-xl bg-cyan-500/20 animate-ping opacity-75 pointer-events-none" 
                            style={{ animationDuration: '2s', animationDelay: `${idx * 0.4}s` }} 
                          />
                          <span className="absolute -inset-2 rounded-2xl bg-cyan-500/5 animate-pulse opacity-40 pointer-events-none" />

                          <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected 
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                              : "bg-slate-900 text-slate-500 border border-slate-800/80"
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? "animate-pulse" : ""}`} />

                            {/* Tiny blinking green status LED for packet confirmation */}
                            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                          </div>
                        </div>
                        
                        <p className={`text-[10px] font-mono leading-none ${isSelected ? "text-cyan-400 font-bold" : "text-slate-500"}`}>
                          ETAP {idx + 1}
                        </p>
                        <p className="font-bold text-xs leading-tight mt-1 px-1 text-slate-200">
                          {st.name.split(" ")[0]}
                        </p>
                        
                        <span className="text-[9px] text-slate-500 mt-1 truncate max-w-full font-mono block">
                          {idx === 0 ? "WAN / Laser" : idx === 1 ? "Światło > Prąd" : idx === 2 ? "NAT / DHCP" : idx === 3 ? "Port LAN" : "NIC / Wi-Fi"}
                        </span>
                      </button>

                      {/* Diagnostic status connector line */}
                      {idx < STATIONS.length - 1 && (
                        <div className="absolute top-[22px] -right-[15%] w-[30%] h-0.5 bg-cyan-500/40 hidden md:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanatory cable guide */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 mt-8 text-xs text-slate-400 italic">
              <span className="font-bold text-slate-300 uppercase not-italic font-mono text-[10px] text-cyan-400 block mb-1">
                Zrozumieć fizyczne media transmisyjne:
              </span>
              W tym łańcuchu medium zmienia się trzykrotnie: (1) od centrali do domu biegnie jednomodowy gruby <strong className="text-slate-300 not-italic">Światłowód</strong>, (2) od ONT do routera i komputerów dane płyną prądem elektrycznym w miedzianej <strong className="text-slate-300 not-italic">Skrętce Cat6/7</strong>, (3) a na końcu zamieniają się w fale elektromagnetyczne wysokiej częstotliwości <strong className="text-slate-300 not-italic">Wi-Fi (2.4/5GHz)</strong>.
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 mt-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Metoda: Symulacja drogi dynamicznych pakietów cyfrowych (TCP/IP)</span>
            <span className="text-emerald-400">● Przepustowość: do 1,000 Mb/s (Gigabit)</span>
          </div>
        </div>

        {/* Right: Detailed Inspected Card (Span 5) */}
        <div className="lg:col-span-12 xl:col-span-5 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">
                  Wybrany Przeskok Sieciowy
                </span>
                <h4 className="text-md font-bold text-white mt-1.5 flex items-center">
                  <selectedStation.icon className="w-5 h-5 mr-2 text-cyan-400" />
                  {selectedStation.title}
                </h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-4 bg-slate-950/50 p-3 rounded-lg border border-slate-900">
              {selectedStation.description}
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <h5 className="text-[10px] font-bold uppercase text-slate-500">Rola i zadanie w architekturze:</h5>
                <p className="text-xs text-slate-200 font-semibold mt-0.5 leading-normal">{selectedStation.role}</p>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase text-slate-500">Parametry techniczne i Interfejsy:</h5>
                <ul className="grid grid-cols-1 gap-1.5 mt-1">
                  {selectedStation.specs.map((sp, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start space-x-2">
                      <span className="text-cyan-400 mt-1">▪</span>
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-3 mt-3">
                <div className="p-2 bg-slate-950/40 rounded-lg">
                  <p className="text-[10px] text-slate-500 font-mono">Adres IP/Medium</p>
                  <p className="text-xs text-slate-200 font-mono font-bold mt-0.5">{selectedStation.ipSetting}</p>
                </div>
                <div className="p-2 bg-slate-950/40 rounded-lg">
                  <p className="text-[10px] text-slate-500 font-mono">Sygnał/Zasilanie</p>
                  <p className="text-xs text-slate-200 font-mono font-bold mt-0.5">{selectedStation.voltageOrSpec}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-cyan-950/10 border border-cyan-800/20 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase text-cyan-400 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Wskazówka Praktyczna / Dydaktyczna:
            </span>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {selectedStation.installationTip}
            </p>
          </div>
        </div>

      </div>

      {/* Grid: 2. Structured T568B Crimping Guide & IP Calculator Setting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Crimping Cable Tool (RJ-45 T568B) */}
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center">
              <Cable className="w-4.5 h-4.5 mr-1.5 text-cyan-400" />
              Zaciskanie Skrętki miedzianej LAN (RJ-45 Standard T568B)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Standard EIA/TIA-568B (Najpopularniejszy)</span>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Prawidłowe ułożenie 8 cienkich miedzianych żył oznaczonych odpowiednimi kolorami pozwala na przesył danych z prędkością 1 Gbit/s. Wciśnięcie ich do wtyczki RJ-45 i zaciśnięcie zaciskarką wymaga precyzji:
          </p>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 flex flex-col md:flex-row items-center gap-4">
            
            {/* Visual RJ-45 transparent plastic plug illustration */}
            <div className="w-full md:w-1/3 bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center relative min-h-[180px]">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-slate-800 border-x border-t border-slate-700 rounded-t" />
              <p className="text-[10px] font-mono font-bold text-slate-500 mb-2 uppercase">Wtyczka RJ-45 (Dół)</p>
              
              {/* Copper pins inside transparent plug */}
              <div className="w-full h-24 bg-slate-800/70 rounded border border-slate-700 p-1 flex relative">
                {/* 8 metallic golden pins */}
                <div className="absolute top-0 left-0 right-0 h-1 flex justify-between px-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="w-1.5 h-2.5 bg-amber-500 rounded-sm" />
                  ))}
                </div>

                {/* 8 colored lines inside representing crimped wires */}
                <div className="w-full flex justify-between h-full pt-2 px-1">
                  {T568B_COLORS.map((wire) => (
                    <div
                      key={wire.pin}
                      className={`w-1.5 h-full rounded-sm ${wire.cssStyle.split(" ")[0]} border-[0.5px] border-slate-800`}
                      title={`${wire.pin}: ${wire.colorName}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-slate-500 mt-2 text-center">Spinka blokująca pod spodem wtyczki</p>
            </div>

            {/* Pin color sequence text list */}
            <div className="flex-1 w-full">
              <div className="space-y-1">
                {T568B_COLORS.map((wire) => (
                  <div key={wire.pin} className="flex items-center space-x-2 text-xs">
                    <span className="w-5 text-right font-mono text-[10px] text-slate-500 font-bold">{wire.pin}.</span>
                    <span className={`w-36 px-2 py-0.5 rounded text-[10px] font-bold ${wire.cssStyle} border border-slate-700/40 text-slate-900 text-center`}>
                      {wire.colorName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">({wire.role})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] p-2.5 bg-slate-950/40 rounded-lg font-mono text-slate-400">
            <div>
              <p className="text-slate-300 font-extrabold uppercase">Kabel Prosty (Straight-Through):</p>
              <p className="mt-1">Obie strony zakończone standardem T568B. Służy do łączenia PC z routerem lub switchem.</p>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <p className="text-slate-300 font-extrabold uppercase">Kabel Krosowany (Crossover):</p>
              <p className="mt-1">Jedna strona T568A, druga T568B. Służył do łączenia bezpośredniego dwóch komputerów bez switcha.</p>
            </div>
          </div>
        </div>

        {/* Right: Addressing & Configuration Simulator */}
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center">
              <Settings className="w-4.5 h-4.5 mr-1.5 text-cyan-400" />
              Symulator Adresacji IP i Usług Sieciowych
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Konfiguracja adresów IP w podsieci lokalnej decyduje o tym, jak urządzenia będą się komunikować. Zmień parametry routera, by zobaczyć jak wpłyną one na hosty sieciowe:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Ip Input configs */}
              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Adres IP Bramy (Router):</label>
                <select
                  value={gatewayIp}
                  onChange={(e) => setGatewayIp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  <option value="192.168.1.1">192.168.1.1 (Standardowy Klasy C)</option>
                  <option value="192.168.0.1">192.168.0.1 (Alternatywny Klasy C)</option>
                  <option value="10.0.0.1">10.0.0.1 (Klasa A - Duże sieci)</option>
                  <option value="172.16.0.1">172.16.0.1 (Klasa B)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Maska podsieci (Subnet Mask):</label>
                <select
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  <option value="255.255.255.0">255.255.255.0 (/24 - do 254 urządzeń)</option>
                  <option value="255.255.0.0">255.255.0.0 (/16 - dla serwerowni)</option>
                  <option value="255.255.255.128">255.255.255.128 (/25 - do 126 urządzeń)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Rozpoczęcie DHCP Pool (Start IP):</label>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs text-slate-500 font-mono">{gatewayIp.substring(0, gatewayIp.lastIndexOf('.') + 1)}</span>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={dhcpStart}
                    onChange={(e) => setDhcpStart(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-1.5 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Serwer DNS (Domain Name System):</label>
                <select
                  value={dnsServer}
                  onChange={(e) => setDnsServer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500"
                >
                  <option value="8.8.8.8">8.8.8.8 (Google Public DNS)</option>
                  <option value="1.1.1.1">1.1.1.1 (Cloudflare fast DNS)</option>
                  <option value="62.179.1.62">62.179.1.62 (Wymuszone DNS Dostawcy)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Nazwa rozgłoszeniowa Wi-Fi (SSID):</label>
                <input
                  type="text"
                  value={customSsid}
                  onChange={(e) => setCustomSsid(e.target.value.replace(/\s+/g, '_'))}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2 focus:outline-none focus:border-cyan-500 font-mono"
                  placeholder="Dowolny_identyfikator_sieci"
                />
              </div>

            </div>
          </div>

          {/* Resulting simulated local devices table */}
          <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 mt-5">
            <h4 className="text-[10px] font-bold text-cyan-400 uppercase font-mono tracking-wider mb-2">
              Aktywne przypisania urządzeń w domowej sieci LAN
            </h4>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-500 text-[9px] uppercase border-b border-slate-900 pb-1">
                <span>Nazwa urządzenia</span>
                <span className="text-right">Przydzielony Adres IP w LAN</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-350">💻 Główny Komputer PC (Połączenie LAN)</span>
                <span className="text-cyan-400 font-bold">
                  {gatewayIp.substring(0, gatewayIp.lastIndexOf('.') + 1) + dhcpStart}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-350">📱 Smartfon domowy (Połączenie Wi-Fi: {customSsid})</span>
                <span className="text-slate-300 font-bold">
                  {gatewayIp.substring(0, gatewayIp.lastIndexOf('.') + 1) + (parseInt(dhcpStart) + 1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-350">📺 Telewizor Smart TV (Połączenie Wi-Fi)</span>
                <span className="text-slate-300 font-bold">
                  {gatewayIp.substring(0, gatewayIp.lastIndexOf('.') + 1) + (parseInt(dhcpStart) + 2)}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Diagnostic Command Terminal Simulator */}
      <div className="bg-[#0D0D10] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 border-b border-slate-850 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest pl-2">
              Diagnostyka Sieciowa LAN (Simulated Terminal CLI)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
            ping / ipconfig / tracert
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Zrozumienie działania komunikacji wymaga posługiwania się narzędziami terminala. Kliknij poniższe predefiniowane komendy lub wpisz własne, by przetestować drogę pakietów w Twojej sieci:
        </p>

        {/* Predefined Quick Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => runSimulatedCommand("ipconfig")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 font-mono transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>ipconfig</span>
          </button>
          
          <button
            onClick={() => runSimulatedCommand("ping google.com")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 font-mono transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span>ping google.com</span>
          </button>

          <button
            onClick={() => runSimulatedCommand("tracert google.com")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 font-mono transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>tracert google.com</span>
          </button>

          <button
            onClick={() => runSimulatedCommand("help")}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-slate-300 font-mono transition-colors cursor-pointer col-span-1"
          >
            <span>--help</span>
          </button>

          <button
            onClick={() => setTerminalLogs(["Słownik Sieciowy Atlas v1.0.0", "", "Wpisz polecenie..."])}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-xs rounded-lg text-red-400 font-mono transition-colors cursor-pointer ml-auto"
          >
            <span>Wyczyść Konsolę</span>
          </button>
        </div>

        {/* Simulated Console Screen */}
        <div className="bg-black/90 rounded-xl p-4 border border-slate-900 min-h-[220px] max-h-[350px] overflow-y-auto mb-3 font-mono text-xs text-green-400 scrollbar-thin">
          <div className="space-y-1">
            {terminalLogs.map((log, idx) => (
              <p
                key={idx}
                className={
                  log.startsWith(">")
                    ? "text-cyan-400 font-bold"
                    : log.includes("Error") || log.includes("nieznane")
                    ? "text-red-400"
                    : "text-green-500 leading-normal"
                }
              >
                {log}
              </p>
            ))}
          </div>
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (terminalInput) runSimulatedCommand(terminalInput);
          }}
          className="flex gap-2"
        >
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 flex items-center shadow-inner flex-1 focus-within:border-cyan-500">
            <span className="text-cyan-400 mr-2 font-mono select-none font-bold">C:\Users\Student&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="bg-transparent text-slate-100 font-mono text-xs focus:outline-none w-full border-none p-0"
              placeholder="Wpisz 'help' lub wybierz jedną z powyższych komend i naciśnij Enter..."
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Wykonaj
          </button>
        </form>
      </div>

    </div>
  );
}
