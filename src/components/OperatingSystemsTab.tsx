import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Monitor,
  Cpu,
  HardDrive,
  Layers,
  ShieldCheck,
  Activity,
  Code,
  FolderTree,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Info,
  Sparkles,
  Command,
  FileText,
  Lock,
  Search,
  Server,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  BarChart2,
  ListFilter,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Radio,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Sliders,
  Check,
  FileCode
} from "lucide-react";

// Types for OS Module
export interface OSFamily {
  id: string;
  name: string;
  family: string;
  kernelType: "Monolithic" | "Hybrid" | "Microkernel" | "RTOS";
  developer: string;
  firstRelease: string;
  license: string;
  fileSystem: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  strengths: string[];
  keyComponents: { name: string; desc: string }[];
  marketShareNote: string;
}

const OS_FAMILIES: OSFamily[] = [
  {
    id: "windows",
    name: "Microsoft Windows",
    family: "Windows NT",
    kernelType: "Hybrid",
    developer: "Microsoft Corporation",
    firstRelease: "1985 r. (Windows 1.0) / 1993 r. (NT 3.1)",
    license: "Własnościowa (Proprietary EULA)",
    fileSystem: "NTFS / ReFS (dawniej FAT32)",
    color: "#0284c7", // sky blue
    badgeBg: "bg-sky-950/60",
    badgeBorder: "border-sky-800/40",
    badgeText: "text-sky-400",
    description: "Najpopularniejszy konsumencki system operacyjny na komputery stacjonarne i laptopy. Wykorzystuje hybrydowe jądro NT Kernel, interfejs graficzny z bibliotekami Win32 API, DirectX oraz rejestr systemowy.",
    strengths: [
      "Powszechna kompatybilność z oprogramowaniem i grami (DirectX 12 Ultimate)",
      "Rozbudowany ekosystem sterowników i zaawansowana obsługa Plug and Play",
      "Wsparcie dla środowisk korporacyjnych (Active Directory, Group Policy, Windows Server)"
    ],
    keyComponents: [
      { name: "NT Kernel (ntoskrnl.exe)", desc: "Jądro hybrydowe zarządzające wątkami, pamięcią i sterownikami." },
      { name: "HAL (Hardware Abstraction Layer)", desc: "Warstwa abstrakcji sprzętowej izolująca jądro od fizycznej architektury." },
      { name: "Win32 Subsystem & DWM", desc: "Podsystem graficzny (Desktop Window Manager) odpowiedzialny za rendering interfejsu." }
    ],
    marketShareNote: "~68% rynku komputerów osobistych (PC/Desktop)"
  },
  {
    id: "linux",
    name: "GNU / Linux",
    family: "Unix-like",
    kernelType: "Monolithic",
    developer: "Linus Torvalds + Społeczność Open Source",
    firstRelease: "1991 r.",
    license: "Wolna i Otwarta (GPLv2 / Open Source)",
    fileSystem: "ext4 / Btrfs / ZFS / XFS",
    color: "#eab308", // amber/yellow
    badgeBg: "bg-amber-950/60",
    badgeBorder: "border-amber-800/40",
    badgeText: "text-amber-400",
    description: "Modularny, wielozadaniowy i wieloużytkownikowy system operacyjny z monolitycznym jądrem Linux. Zasilający większość serwerów WWW, chmur obliczeniowych, superkomputerów oraz urządzeń wbudowanych (IoT).",
    strengths: [
      "Pełna wolność modyfikacji kodu źródłowego i wysoki poziom bezpieczeństwa",
      "Niezrównana wydajność na serwerach, kontenerach (Docker/K8s) i superkomputerach",
      "Brak wymuszonych aktualizacji i minimalne zapotrzebowanie na zasoby sprzętowe"
    ],
    keyComponents: [
      { name: "Jądro Linux (Monolithic Kernel)", desc: "Zarządza czasem procesora, pamięcią VMM, wirtualnym systemem plików VFS i modułami loadable." },
      { name: "Systemd / Init Process", desc: "Pierwszy proces użytkownika (PID 1) odpowiedzialny za demony, usługi i rozruch." },
      { name: "POSIX & GNU Coreutils", desc: "Zestaw standardów interfejsu systemowego i narzędzi wiersza poleceń (bash, coreutils)." }
    ],
    marketShareNote: ">90% serwerów chmurowych, 100% z TOP500 superkomputerów, ~4% desktopów"
  },
  {
    id: "macos",
    name: "Apple macOS / iOS",
    family: "Unix / BSD / Mach",
    kernelType: "Hybrid",
    developer: "Apple Inc.",
    firstRelease: "1984 r. (Classic) / 2001 r. (Mac OS X)",
    license: "Własnościowa (Komponenty Darwin na licencji APSL)",
    fileSystem: "APFS (Apple File System) / HFS+",
    color: "#a855f7", // purple
    badgeBg: "bg-purple-950/60",
    badgeBorder: "border-purple-800/40",
    badgeText: "text-purple-400",
    description: "Certyfikowany system POSIX Unix oparty na hybrydowym jądrze XNU (połączenie mikrojądra Mach oraz kodu BSD). Ściśle zintegrowany z architekturą procesorów Apple Silicon (M1/M2/M3/M4).",
    strengths: [
      "Zaawansowane zarządzanie energią i zoptymalizowana pamięć jednolitą (Unified Memory)",
      "Szyfrowanie sprzętowe APFS, FileVault oraz silnik zabezpieczeń Secure Enclave",
      "Certyfikat UNIX 03 i spójne środowisko programistyczne (Xcode, Metal API)"
    ],
    keyComponents: [
      { name: "XNU Kernel", desc: "Hybryda mikrorzenia Mach 3.0 oraz funkcjonalności sieciowych i plików z FreeBSD." },
      { name: "Cocoa Framework & Quartz", desc: "Zestaw bibliotek obiektowych oraz silnik graficzny renderujący interfejs Aqua." },
      { name: "Grand Central Dispatch (GCD)", desc: "System zarządczy asynchronicznego wielowątkowego wykonywania zadań." }
    ],
    marketShareNote: "~15% desktopów, ~28% smartfonów (iOS)"
  },
  {
    id: "android",
    name: "Android OS",
    family: "Linux-based",
    kernelType: "Monolithic",
    developer: "Google / Open Handset Alliance",
    firstRelease: "2008 r.",
    license: "Apache 2.0 / GPLv2",
    fileSystem: "ext4 / f2fs (Flash-Friendly File System)",
    color: "#22c55e", // emerald
    badgeBg: "bg-emerald-950/60",
    badgeBorder: "border-emerald-800/40",
    badgeText: "text-emerald-400",
    description: "Najpopularniejszy mobilny system operacyjny świata. Wykorzystuje zmodyfikowane jądro Linux, warstwę abstrakcji sprzętowej HAL oraz wirtualne środowisko uruchomieniowe ART (Android Runtime).",
    strengths: [
      "Maksymalna elastyczność i wsparcie dla architektur ARM / ARM64 / x86",
      "Izolacja aplikacji w piaskownicach (Sandbox) z uprawnieniami granulowanymi",
      "Wsparcie dla miliona aplikacji napisanych w językach Java / Kotlin / NDK"
    ],
    keyComponents: [
      { name: "Modified Linux Kernel", desc: "Odpowiedzialne za sterowniki, zarządzenie zasilaniem (Low Memory Killer) i IPC Binder." },
      { name: "ART (Android Runtime)", desc: "Wirtualna maszyna kompilująca kod AOT/JIT z podwyższoną wydajnością energetyczną." },
      { name: "HAL (Hardware Abstraction Layer)", desc: "Standardowe interfejsy dla kamery, czujników, Bluetooth i audio." }
    ],
    marketShareNote: "~71% rynku urządzeń mobilnych na świecie"
  },
  {
    id: "rtos",
    name: "RTOS (Real-Time OS)",
    family: "Embedded / Deterministic",
    kernelType: "RTOS",
    developer: "Różne (FreeRTOS / VxWorks / Zephyr)",
    firstRelease: "Różne (od lat 80. XX w.)",
    license: "MIT / Commercial",
    fileSystem: "FAT / Direct Flash / Memory Mapped",
    color: "#f97316", // orange
    badgeBg: "bg-orange-950/60",
    badgeBorder: "border-orange-800/40",
    badgeText: "text-orange-400",
    description: "System Operacyjny Czasu Rzeczywistego stworzony do bezwzględnego dotrzymywania reżimów czasowych. Stosowany w mikrokontrolerach, systemach ABS w samochodach, medycynie i lotnictwie.",
    strengths: [
      "Ścisły determinizm czasowy — gwarancja reakcji na przerwanie w czasie kilku mikrosekund",
      "Minimalny rozmiar footprintu pamięci RAM/Flash (nawet poniżej 10 KB)",
      "Wyłaszczające planowanie priorytetowe (Preemptive Priority Scheduling)"
    ],
    keyComponents: [
      { name: "Preemptive RTOS Scheduler", desc: "Natychmiastowo przełącza kontekst na zadanie o najwyższym priorytecie bez zwłoki." },
      { name: "Mutexes & Semaphores", desc: "Zabezpieczone mechanizmy zapobiegające zakleszczeniom (Deadlock) i inwersji priorytetów." },
      { name: "Interrupt Service Routines (ISR)", desc: "Szybka obsługa zdarzeń sprzętowych z poziomu mikrokontrolera." }
    ],
    marketShareNote: "Miliardy urządzeń IoT, sterowniki samochodowe, przemysł przemysłowy i kosmonautyka"
  }
];

// Process for CPU Scheduling Simulator
interface SimulatedProcess {
  pid: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  remainingTime: number;
  priority: number;
  color: string;
  state: "ready" | "running" | "completed";
  startTime?: number;
  completionTime?: number;
  waitingTime: number;
}

// --- DEFAULT SYSTEM CONFIGURATION FILE CONTENT ---
const INITIAL_SYSCONFIG_CONTENT = `# --- WIRTUALNY PLIK KONFIGURACYJNY SYSTEMU (/etc/sysconfig.conf) ---
# Zmodyfikuj wartości poniżej i kliknij 'Zastosuj Konfigurację', aby naprawić błędy.

# Limit pamięci VRAM dla podsystemu graficznego (w MB)
# [Wymagane min. 4096 MB do uniknięcia błędu alokacji w 4K]
max_vram_limit_mb = 2048

# Rozmiar pamięci wymiany SWAP (w MB)
# [Wymagane min. 1024 MB dla zabezpieczenia przed awarią OOM Killer]
swap_size_mb = 0

# Maksymalna pula gniazd sieciowych sockets w usłudze netd
# [Wymagane min. 256 gniazd dla uruchomienia daemona na porcie 8080]
max_sockets_limit = 64

# Maksymalna pula połączeń klienta usługi serwera HTTPD
# [Wymagana zalecana wartość >= 200]
httpd_max_clients = 50

# Zapora ogniowa Firewall (true / false)
# [Wymagane true dla ochrony przed nieautoryzowanym ruchem]
enable_firewall = false

# Tryb rejestrowania debugowania jądra (true / false)
driver_debug_mode = true
`;

const OPTIMAL_SYSCONFIG_CONTENT = `# --- OPTYMALNY PLIK KONFIGURACYJNY SYSTEMU (/etc/sysconfig.conf) ---
# W pełni zweryfikowana, bezbłędna konfiguracja stabilna 100%.

max_vram_limit_mb = 4096
swap_size_mb = 2048
max_sockets_limit = 512
httpd_max_clients = 300
enable_firewall = true
driver_debug_mode = false
`;

export interface SysConfigState {
  max_vram_limit_mb: number;
  swap_size_mb: number;
  max_sockets_limit: number;
  httpd_max_clients: number;
  enable_firewall: boolean;
  driver_debug_mode: boolean;
}

export function parseSysConfig(text: string): SysConfigState {
  const result: SysConfigState = {
    max_vram_limit_mb: 2048,
    swap_size_mb: 0,
    max_sockets_limit: 64,
    httpd_max_clients: 50,
    enable_firewall: false,
    driver_debug_mode: true
  };

  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [key, val] = trimmed.split("=").map((s) => s.trim());
    if (!key || val === undefined) continue;

    if (key === "max_vram_limit_mb") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) result.max_vram_limit_mb = parsed;
    } else if (key === "swap_size_mb") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) result.swap_size_mb = parsed;
    } else if (key === "max_sockets_limit") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) result.max_sockets_limit = parsed;
    } else if (key === "httpd_max_clients") {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) result.httpd_max_clients = parsed;
    } else if (key === "enable_firewall") {
      result.enable_firewall = val.toLowerCase() === "true";
    } else if (key === "driver_debug_mode") {
      result.driver_debug_mode = val.toLowerCase() === "true";
    }
  }

  return result;
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  source: string;
  level: "CRITICAL" | "ERROR" | "WARNING" | "INFO" | "RESOLVED";
  message: string;
  configKey?: string;
  fixTip?: string;
}

export function generateEventLogs(config: SysConfigState): SystemLogEntry[] {
  const logs: SystemLogEntry[] = [];
  const now = new Date();

  const formatTime = (offsetSec: number) => {
    const t = new Date(now.getTime() - offsetSec * 1000);
    const hrs = String(t.getHours()).padStart(2, "0");
    const mins = String(t.getMinutes()).padStart(2, "0");
    const secs = String(t.getSeconds()).padStart(2, "0");
    const ms = Math.floor(t.getMilliseconds() / 100);
    return `${hrs}:${mins}:${secs}.${ms}`;
  };

  logs.push({
    id: "log-boot",
    timestamp: formatTime(30),
    source: "kernel.sys",
    level: "INFO",
    message: "Rozruch jądra systemu OS Kernel v6.8.0-p1 (x86_64). Odczytywanie parametrów z /etc/sysconfig.conf..."
  });

  // 1. GPU VRAM
  if (config.max_vram_limit_mb < 4096) {
    logs.push({
      id: "log-gpu-err",
      timestamp: formatTime(25),
      source: "gpu_driver.sys",
      level: "ERROR",
      message: `BŁĄD STEROWNIKA GPU: Żądanie alokacji VRAM (4096 MB) odrzucone. Obecny limit 'max_vram_limit_mb' to ${config.max_vram_limit_mb} MB. Tryb graficzny wycofany do VGA Safe Mode.`,
      configKey: "max_vram_limit_mb",
      fixTip: "Ustaw max_vram_limit_mb = 4096 lub wyższą wartość w edytorze sysconfig.conf."
    });
  } else {
    logs.push({
      id: "log-gpu-ok",
      timestamp: formatTime(25),
      source: "gpu_driver.sys",
      level: "RESOLVED",
      message: `[SUKCES] gpu_driver.sys: Przydzielono bufor VRAM (${config.max_vram_limit_mb} MB). Silnik graficzny 4K zainicjowany w pełni.`,
      configKey: "max_vram_limit_mb"
    });
  }

  // 2. SWAP
  if (config.swap_size_mb < 1024) {
    logs.push({
      id: "log-swap-crit",
      timestamp: formatTime(20),
      source: "kernel_mem",
      level: "CRITICAL",
      message: `KRYTYCZNE ZAGROŻENIE PAMIĘCI (OOM Killer): Pamięć SWAP wyłączona (swap_size_mb = ${config.swap_size_mb} MB). Wyczyszczenie RAM wywoła Kernel Panic!`,
      configKey: "swap_size_mb",
      fixTip: "Ustaw swap_size_mb = 1024 lub 2048 w edytorze sysconfig.conf."
    });
  } else {
    logs.push({
      id: "log-swap-ok",
      timestamp: formatTime(20),
      source: "kernel_mem",
      level: "RESOLVED",
      message: `[SUKCES] kernel_mem: Wirtualna partycja SWAP aktywna (${config.swap_size_mb} MB). Zarządca stron VMM chroni procesy systemowe.`,
      configKey: "swap_size_mb"
    });
  }

  // 3. Network sockets
  if (config.max_sockets_limit < 256) {
    logs.push({
      id: "log-sock-err",
      timestamp: formatTime(15),
      source: "netd.service",
      level: "ERROR",
      message: `BŁĄD DAEMONA SIECIOWEGO: Usługa netd nie mogła powiązać gniazd portu 8080. Limit gniazd 'max_sockets_limit' wynosi ${config.max_sockets_limit} (wymagane min. 256).`,
      configKey: "max_sockets_limit",
      fixTip: "Ustaw max_sockets_limit = 256 lub wyżej w edytorze sysconfig.conf."
    });
  } else {
    logs.push({
      id: "log-sock-ok",
      timestamp: formatTime(15),
      source: "netd.service",
      level: "RESOLVED",
      message: `[SUKCES] netd.service: Pojemność gniazd sieciowych powiększona do ${config.max_sockets_limit}. Wszystkie porty nasłuchują.`,
      configKey: "max_sockets_limit"
    });
  }

  // 4. HTTP Server max clients
  if (config.httpd_max_clients < 200) {
    logs.push({
      id: "log-http-warn",
      timestamp: formatTime(10),
      source: "httpd.service",
      level: "WARNING",
      message: `OSTRZEŻENIE OBRĄCZEK USŁUGI: Limit klientów HTTPD 'httpd_max_clients' = ${config.httpd_max_clients}. Przy zwiększonym ruchu pakiety będą odrzucane (zalecane >= 200).`,
      configKey: "httpd_max_clients",
      fixTip: "Ustaw httpd_max_clients = 200 lub wyżej w edytorze."
    });
  } else {
    logs.push({
      id: "log-http-ok",
      timestamp: formatTime(10),
      source: "httpd.service",
      level: "RESOLVED",
      message: `[SUKCES] httpd.service: Wątki robocze HTTP przeskalowane dla ${config.httpd_max_clients} równoległych klientów.`,
      configKey: "httpd_max_clients"
    });
  }

  // 5. Firewall
  if (!config.enable_firewall) {
    logs.push({
      id: "log-fw-warn",
      timestamp: formatTime(5),
      source: "security_daemon",
      level: "WARNING",
      message: "OSTRZEŻENIE BEZPIECZEŃSTWA: Zapora ogniowa jest WYŁĄCZONA (enable_firewall = false). Porty są niechronione!",
      configKey: "enable_firewall",
      fixTip: "Ustaw enable_firewall = true w edytorze sysconfig.conf."
    });
  } else {
    logs.push({
      id: "log-fw-ok",
      timestamp: formatTime(5),
      source: "security_daemon",
      level: "RESOLVED",
      message: "[SUKCES] security_daemon: Zapora ogniowa (Firewall) aktywna. Filtrowanie portów włączone.",
      configKey: "enable_firewall"
    });
  }

  if (config.driver_debug_mode) {
    logs.push({
      id: "log-dbg-info",
      timestamp: formatTime(2),
      source: "kernel_debug",
      level: "INFO",
      message: "Tryb debugowania jądra aktywny (driver_debug_mode = true). Generowanie śladów w /var/log/syslog."
    });
  }

  return logs;
}

export default function OperatingSystemsTab() {
  const [activeSubTab, setActiveSubTab] = useState<"architecture" | "comparison" | "scheduler" | "terminal" | "filesystem" | "eventlog">("architecture");
  const [selectedOS, setSelectedOS] = useState<OSFamily>(OS_FAMILIES[0]);

  // --- EVENT LOGS & DIAGNOSTICS STATE ---
  const [sysConfigFileContent, setSysConfigFileContent] = useState<string>(INITIAL_SYSCONFIG_CONTENT);
  const [sysLogFilter, setSysLogFilter] = useState<"ALL" | "ERRORS" | "WARNINGS" | "RESOLVED" | "INFO">("ALL");
  const [sysLogSearch, setSysLogSearch] = useState<string>("");
  const [isReevaluatingLogs, setIsReevaluatingLogs] = useState<boolean>(false);
  const [highlightedConfigKey, setHighlightedConfigKey] = useState<string | null>(null);
  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  // --- CPU SCHEDULER SIMULATOR STATE ---
  const [algorithm, setAlgorithm] = useState<"RR" | "FCFS" | "SJF" | "Priority">("RR");
  const [timeQuantum, setTimeQuantum] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [ganttHistory, setGanttHistory] = useState<{ time: number; pid: string; color: string }[]>([]);
  
  const [processes, setProcesses] = useState<SimulatedProcess[]>([
    { pid: "P1", name: "Przeglądarka (Chrome)", arrivalTime: 0, burstTime: 5, remainingTime: 5, priority: 2, color: "#06b6d4", state: "ready", waitingTime: 0 },
    { pid: "P2", name: "Kompilator (GCC)", arrivalTime: 1, burstTime: 3, remainingTime: 3, priority: 1, color: "#10b981", state: "ready", waitingTime: 0 },
    { pid: "P3", name: "Odtwarzacz Audio", arrivalTime: 2, burstTime: 2, remainingTime: 2, priority: 3, color: "#a855f7", state: "ready", waitingTime: 0 },
    { pid: "P4", name: "Sterownik Grafiki", arrivalTime: 3, burstTime: 4, remainingTime: 4, priority: 4, color: "#eab308", state: "ready", waitingTime: 0 },
  ]);

  // Current active running process ID
  const [activePid, setActivePid] = useState<string | null>(null);

  // Simulation step timer
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setProcesses((prevProcs) => {
        // Check if all processes completed
        const allDone = prevProcs.every((p) => p.remainingTime <= 0);
        if (allDone) {
          setIsSimulating(false);
          setActivePid(null);
          return prevProcs;
        }

        // Available ready processes at currentTime
        const readyProcs = prevProcs.filter((p) => p.arrivalTime <= currentTime && p.remainingTime > 0);
        if (readyProcs.length === 0) {
          // CPU Idle
          setGanttHistory((prev) => [...prev, { time: currentTime, pid: "IDLE", color: "#334155" }]);
          setCurrentTime((t) => t + 1);
          return prevProcs;
        }

        // Select process according to chosen algorithm
        let selected: SimulatedProcess = readyProcs[0];

        if (algorithm === "FCFS") {
          selected = readyProcs.reduce((min, p) => (p.arrivalTime < min.arrivalTime ? p : min), readyProcs[0]);
        } else if (algorithm === "SJF") {
          selected = readyProcs.reduce((min, p) => (p.remainingTime < min.remainingTime ? p : min), readyProcs[0]);
        } else if (algorithm === "Priority") {
          selected = readyProcs.reduce((max, p) => (p.priority > max.priority ? p : max), readyProcs[0]);
        } else if (algorithm === "RR") {
          // Round robin algorithm
          // Pick process based on queue turn
          const activeIndex = prevProcs.findIndex((p) => p.pid === activePid && p.remainingTime > 0);
          if (activeIndex !== -1) {
            // Check quantum
            const runDurationSoFar = ganttHistory.filter((g) => g.pid === activePid).length;
            if (runDurationSoFar % timeQuantum !== 0) {
              selected = prevProcs[activeIndex];
            } else {
              // Time quantum expired, rotate
              const currentIdxInReady = readyProcs.findIndex((p) => p.pid === activePid);
              const nextIdx = (currentIdxInReady + 1) % readyProcs.length;
              selected = readyProcs[nextIdx];
            }
          } else {
            selected = readyProcs[0];
          }
        }

        setActivePid(selected.pid);

        // Record Gantt step
        setGanttHistory((prev) => [...prev, { time: currentTime, pid: selected.pid, color: selected.color }]);

        // Update process remaining time
        const updated = prevProcs.map((p) => {
          if (p.pid === selected.pid) {
            const newRemaining = p.remainingTime - 1;
            return {
              ...p,
              remainingTime: newRemaining,
              state: (newRemaining === 0 ? "completed" : "running") as any
            };
          } else if (p.arrivalTime <= currentTime && p.remainingTime > 0) {
            return { ...p, waitingTime: p.waitingTime + 1, state: "ready" as any };
          }
          return p;
        });

        setCurrentTime((t) => t + 1);
        return updated;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [isSimulating, currentTime, algorithm, timeQuantum, activePid, ganttHistory]);

  const resetScheduler = () => {
    setIsSimulating(false);
    setCurrentTime(0);
    setActivePid(null);
    setGanttHistory([]);
    setProcesses([
      { pid: "P1", name: "Przeglądarka (Chrome)", arrivalTime: 0, burstTime: 5, remainingTime: 5, priority: 2, color: "#06b6d4", state: "ready", waitingTime: 0 },
      { pid: "P2", name: "Kompilator (GCC)", arrivalTime: 1, burstTime: 3, remainingTime: 3, priority: 1, color: "#10b981", state: "ready", waitingTime: 0 },
      { pid: "P3", name: "Odtwarzacz Audio", arrivalTime: 2, burstTime: 2, remainingTime: 2, priority: 3, color: "#a855f7", state: "ready", waitingTime: 0 },
      { pid: "P4", name: "Sterownik Grafiki", arrivalTime: 3, burstTime: 4, remainingTime: 4, priority: 4, color: "#eab308", state: "ready", waitingTime: 0 },
    ]);
  };

  // --- TERMINAL SIMULATOR STATE ---
  const [terminalShell, setTerminalShell] = useState<"bash" | "powershell">("bash");
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<{ type: "input" | "output" | "error"; text: string }[]>([
    { type: "output", text: "Interaktywny Terminal Systemów Operacyjnych v5.2.0-STABLE" },
    { type: "output", text: "Wpisz 'help' lub 'pomoc', aby wyświetlić listę dostępnych poleceń dla wybranej powłoki." },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    const promptPrefix = terminalShell === "bash" ? "user@atlas:~$ " : "PS C:\\Users\\Atlas> ";
    const newLogs = [...terminalLogs, { type: "input" as const, text: `${promptPrefix}${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === "clear" || lower === "cls") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    }

    if (lower === "help" || lower === "pomoc") {
      newLogs.push({
        type: "output",
        text: terminalShell === "bash"
          ? "Dostępne polecenia Bash: uname -a, top, ps aux, free -m, lscpu, ls -la, chmod 755 file.txt, clear"
          : "Dostępne polecenia PowerShell: Get-Process, Get-Service, Get-ComputerInfo, Get-ChildItem, Get-Member, cls"
      });
    } else if (lower.startsWith("uname")) {
      newLogs.push({ type: "output", text: "Linux atlas-core 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" });
    } else if (lower === "top" || lower === "htop" || lower === "get-process") {
      newLogs.push({
        type: "output",
        text: `PID   USER     %CPU %MEM     TIME+ COMMAND
1     root      0.1  0.2  0:02.14 systemd
102   atlas     4.2  2.8  0:15.80 xorg / dwm
402   atlas    12.5  8.4  1:02.30 google-chrome
890   atlas     0.0  0.4  0:00.12 bash`
      });
    } else if (lower.startsWith("free") || lower.startsWith("get-volume")) {
      newLogs.push({
        type: "output",
        text: `              total        used        free      shared  buff/cache   available
Mem:          16384 Mb     4820 Mb     8120 Mb      340 Mb     3444 Mb    11220 Mb
Swap:          2048 Mb        0 Mb     2048 Mb`
      });
    } else if (lower.startsWith("ls") || lower.startsWith("dir") || lower.startsWith("get-childitem")) {
      newLogs.push({
        type: "output",
        text: `drwxr-xr-x  5 atlas atlas 4096 Jul 21 12:00 .
drwxr-xr-x  3 root  root  4096 Jul 21 10:00 ..
-rw-r--r--  1 atlas atlas 1024 Jul 21 11:30 kernel_config.sys
-rwxr-xr-x  1 atlas atlas 8192 Jul 21 11:45 bootloader.elf
drwxr-xr-x  2 atlas atlas 4096 Jul 21 12:10 drivers/`
      });
    } else if (lower.startsWith("lscpu") || lower.startsWith("get-computerinfo")) {
      newLogs.push({
        type: "output",
        text: `Architektura:          x86_64
Tryb(y) pracy CPU:     32-bit, 64-bit
Liczba rdzeni:         8 cores (16 threads)
Model:                 Intel Core i7-13700K / AMD Ryzen 7 7800X3D
Pamięć podręczna L3:    32 MB`
      });
    } else {
      newLogs.push({
        type: "error",
        text: terminalShell === "bash"
          ? `bash: ${cmd}: polecenie nie zostało odnalezione. Wpisz 'help'.`
          : `'${cmd}' nie jest rozpoznawane jako nazwa polecenia w programie PowerShell.`
      });
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-slate-200">
      
      {/* Top Banner / Module Header */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 w-[400px] h-[180px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10 relative">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2.5 py-0.5 rounded">
              MODUŁ EDYCYJNY v5.2.0
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded">
              Oprogramowanie Systemowe
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-2.5">
            <Monitor className="w-6 h-6 text-sky-400" />
            Systemy Operacyjne (Operating Systems)
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
            Zintegrowany atlas połączony z interaktywnymi symulatorami: architektury jądra (Kernel), planisty CPU, struktury wirtualnej pamięci oraz wiersza poleceń terminala.
          </p>
        </div>

        {/* Sub-tab Switcher Buttons - Full Width Bar */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 z-10 relative font-sans">
          <button
            onClick={() => setActiveSubTab("architecture")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "architecture"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="truncate">Warstwy i Jądro</span>
          </button>

          <button
            onClick={() => setActiveSubTab("comparison")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "comparison"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Monitor className="w-4 h-4 shrink-0" />
            <span className="truncate">Rodziny OS</span>
          </button>

          <button
            onClick={() => setActiveSubTab("scheduler")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "scheduler"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <span className="truncate">Planista CPU</span>
          </button>

          <button
            onClick={() => setActiveSubTab("terminal")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "terminal"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Terminal className="w-4 h-4 shrink-0" />
            <span className="truncate">Terminal CLI</span>
          </button>

          <button
            onClick={() => setActiveSubTab("filesystem")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "filesystem"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
          >
            <FolderTree className="w-4 h-4 shrink-0" />
            <span className="truncate">Pliki i Prawa</span>
          </button>

          <button
            onClick={() => setActiveSubTab("eventlog")}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubTab === "eventlog"
                ? "bg-sky-600 text-white border-sky-400 shadow-md font-extrabold"
                : "bg-slate-900/60 text-slate-300 border-slate-800/80 hover:text-white hover:bg-slate-800"
            }`}
            id="subtab-eventlog-btn"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="truncate">Dziennik Zdarzeń</span>
          </button>
        </div>
      </div>

      {/* SUB TAB 1: ARCHITECTURE & KERNEL TYPES */}
      {activeSubTab === "architecture" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left: Interactive Kernel Stack Diagram (Span 7) */}
          <div className="xl:col-span-7 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                Stos Architektury Systemu Operacyjnego (OS Stack)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                Izolacja Ring 0 (Kernel) vs Ring 3 (User)
              </span>
            </div>

            {/* Interactive Stack Visualization */}
            <div className="space-y-2.5 font-mono text-xs">
              
              {/* Ring 3: User Space Applications */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/50 hover:border-purple-500/80 transition-all space-y-1.5 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 flex items-center gap-2 text-sm">
                    <Monitor className="w-4 h-4 text-purple-400" />
                    1. Przestrzeń Użytkownika (User Space - Ring 3)
                  </span>
                  <span className="text-[9px] uppercase px-2 py-0.5 bg-purple-900/60 text-purple-300 rounded font-bold">
                    Ograniczony Dostęp
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Aplikacje (Przeglądarka, Kompilator, Gry), Powłoka (Shell), Interfejs Graficzny (GUI/X11/Wayland/DWM). Brak bezpośredniego dostępu do sprzętu.
                </p>
              </div>

              {/* System Call Interface (API Bridge) */}
              <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-800/40 text-center text-sky-400 font-bold text-[11px] flex items-center justify-center space-x-2">
                <Code className="w-3.5 h-3.5 text-sky-400" />
                <span>Przejście przez Interfejs Wywołań Systemowych (System Calls API - POSIX / Win32)</span>
              </div>

              {/* Ring 0: Kernel Space */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 hover:border-cyan-500 transition-all space-y-2.5 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    2. Jądro Systemu Operacyjnego (Kernel Space - Ring 0)
                  </span>
                  <span className="text-[9px] uppercase px-2 py-0.5 bg-cyan-900/80 text-cyan-200 rounded font-bold">
                    Pełne Uprawnienia Sprzętowe
                  </span>
                </div>

                {/* Sub-modules inside kernel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-sans">
                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-slate-200">
                    <p className="font-bold text-cyan-400 font-mono">Planista CPU</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Wielozadaniowość i przydział czasu</p>
                  </div>

                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-slate-200">
                    <p className="font-bold text-emerald-400 font-mono">Zarządca RAM</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Stronicowanie i pamięć wirtualna</p>
                  </div>

                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-slate-200">
                    <p className="font-bold text-amber-400 font-mono">Sterowniki</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Obsługa dysków, GPU, sieci, USB</p>
                  </div>

                  <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-slate-200">
                    <p className="font-bold text-purple-400 font-mono">VFS / System Plików</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Struktura katalogów i prawa</p>
                  </div>
                </div>
              </div>

              {/* Hardware Layer */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="font-bold flex items-center gap-2 text-xs">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  3. Fizyczny Sprzęt Komputerowy (Hardware)
                </span>
                <span className="text-[10px] font-mono text-slate-500">Procesor (CPU), Pamięć RAM, Dysk NVMe, Karty PCIe, Kontrolery I/O</span>
              </div>

            </div>
          </div>

          {/* Right: Kernel Types Comparison (Span 5) */}
          <div className="xl:col-span-5 bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-850 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Klasyfikacja Architektur Jądra
            </h3>

            <div className="space-y-3 text-xs">
              
              {/* Monolithic */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-mono text-sm">Monolityczne (Monolithic)</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono">Przykłady: Linux</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                  Wszystkie kluczowe usługi (sterowniki, system plików, sieć, pamięć) pracują w tym samym obszarze pamięci Ring 0. Zapewnia to maksymalną szybkość transmisji, ale awaria jednego sterownika może zawiesić cały system.
                </p>
              </div>

              {/* Hybrid */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400 font-mono text-sm">Hybrydowe (Hybrid)</span>
                  <span className="text-[9px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded font-mono">Przykłady: Windows NT, macOS</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                  Łączy szybkość jądra monolitycznego z modularnością mikrojądra. Sterowniki grafiki czy podsystemy użytkownika mogą działać w wydzielonych usługach z kontrolowaną komunikacją IPC.
                </p>
              </div>

              {/* Microkernel */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-400 font-mono text-sm">Mikrojądro (Microkernel)</span>
                  <span className="text-[9px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono">Przykłady: QNX, Minix, L4</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                  Jądro w Ring 0 obsługuje tylko bezwzględne minimum (przełączanie wątków, pamięć i IPC). Sterowniki i systemy plików działają bezpiecznie w przestrzeni użytkownika. Niezwykle odporne na awarie.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* SUB TAB 2: COMPARISON GRID OF OS FAMILIES */}
      {activeSubTab === "comparison" && (
        <div className="space-y-6">
          {/* OS Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {OS_FAMILIES.map((os) => {
              const isSelected = selectedOS.id === os.id;
              return (
                <button
                  key={os.id}
                  onClick={() => setSelectedOS(os)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-slate-900 border-sky-500 shadow-xl"
                      : "bg-[#0F0F12] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: os.color }}
                  />
                  <div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${os.badgeBg} ${os.badgeBorder} ${os.badgeText}`}>
                      {os.kernelType}
                    </span>
                    <h4 className="text-sm font-extrabold text-white mt-2 truncate">{os.name}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-2 truncate">{os.marketShareNote}</p>
                </button>
              );
            })}
          </div>

          {/* Selected OS Details Card */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${selectedOS.badgeBg} ${selectedOS.badgeBorder} ${selectedOS.badgeText}`}>
                    {selectedOS.family}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Dostawca: {selectedOS.developer}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">{selectedOS.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-900">
                <div>
                  <span className="text-slate-500 block text-[10px]">Pierwsza Wersja:</span>
                  <span className="text-slate-200 font-bold">{selectedOS.firstRelease}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Domyślny System Plików:</span>
                  <span className="text-sky-400 font-bold">{selectedOS.fileSystem}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedOS.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Główne Zalety i Zastosowanie:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                  {selectedOS.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Internal Components */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Podsystemy i Architektura:
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedOS.keyComponents.map((comp, idx) => (
                    <div key={idx} className="border-b border-slate-900 pb-1.5 last:border-0">
                      <span className="font-bold text-slate-200 font-mono text-[11px]">{comp.name}</span>
                      <p className="text-[10px] text-slate-400 font-sans">{comp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: CPU SCHEDULER SIMULATOR */}
      {activeSubTab === "scheduler" && (
        <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-850 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                Interaktywny Symulator Planisty Procesora (CPU Scheduler)
              </span>
              <h3 className="text-lg font-extrabold text-white mt-1 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Planowanie Przydziału Czasu Procesora
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Zobacz jak algorytmy planowania wielozadaniowości przełączają kontekst między procesami w czasie rzeczywistym.
              </p>
            </div>

            {/* Algorithm selector and Controls */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-900 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400">Algorytm:</span>
                <select
                  value={algorithm}
                  onChange={(e: any) => {
                    setAlgorithm(e.target.value);
                    resetScheduler();
                  }}
                  className="bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-cyan-400 p-1.5 focus:outline-none"
                >
                  <option value="RR">Round Robin (RR)</option>
                  <option value="FCFS">First-Come First-Served (FCFS)</option>
                  <option value="SJF">Shortest Job First (SJF)</option>
                  <option value="Priority">Planowanie Priorytetowe</option>
                </select>
              </div>

              {algorithm === "RR" && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-mono text-slate-400">Kwant Czasu (q):</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={timeQuantum}
                    onChange={(e) => setTimeQuantum(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 bg-slate-900 border border-slate-800 text-center text-xs font-mono text-white p-1 rounded focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isSimulating
                      ? "bg-amber-950/80 border border-amber-800 text-amber-300 hover:bg-amber-900"
                      : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  }`}
                >
                  {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isSimulating ? "PAUZA" : "START SYMULACJI"}</span>
                </button>

                <button
                  onClick={resetScheduler}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                  title="Resetuj symulację"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Process Queue Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Table (Span 7) */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center justify-between">
                <span>Kolejka Procesów (Task Queue)</span>
                <span className="text-cyan-400">Czas Zegara: T = {currentTime}s</span>
              </h4>

              <div className="overflow-x-auto border border-slate-900 rounded-xl bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">PID</th>
                      <th className="p-2.5">Nazwa Zadania</th>
                      <th className="p-2.5">Czas Przybycia</th>
                      <th className="p-2.5">Czas Wykonania (Burst)</th>
                      <th className="p-2.5">Pozostało</th>
                      <th className="p-2.5">Priorytet</th>
                      <th className="p-2.5">Stan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {processes.map((proc) => {
                      const isActive = proc.pid === activePid;
                      return (
                        <tr
                          key={proc.pid}
                          className={`transition-colors ${
                            isActive ? "bg-cyan-950/40 text-cyan-200" : "hover:bg-slate-900/50"
                          }`}
                        >
                          <td className="p-2.5 font-bold flex items-center space-x-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                              style={{ backgroundColor: proc.color }}
                            />
                            <span>{proc.pid}</span>
                          </td>
                          <td className="p-2.5 text-slate-200">{proc.name}</td>
                          <td className="p-2.5 text-slate-400">{proc.arrivalTime}s</td>
                          <td className="p-2.5 text-slate-400">{proc.burstTime}s</td>
                          <td className="p-2.5 font-bold text-amber-400">{proc.remainingTime}s</td>
                          <td className="p-2.5 text-purple-400">{proc.priority}</td>
                          <td className="p-2.5">
                            {proc.remainingTime <= 0 ? (
                              <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded text-[9px]">Ukończono</span>
                            ) : isActive ? (
                              <span className="text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded text-[9px] animate-pulse">Wykonuje...</span>
                            ) : proc.arrivalTime <= currentTime ? (
                              <span className="text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded text-[9px]">Oczekuje</span>
                            ) : (
                              <span className="text-slate-500 text-[9px]">Nieprzybyłe</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gantt Timeline View (Span 5) */}
            <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-emerald-400" /> Wykres Gantta CPU (Timeline)
              </h4>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1 p-2 bg-slate-900 rounded-lg min-h-[60px] border border-slate-850 items-center">
                  {ganttHistory.length === 0 ? (
                    <span className="text-[11px] text-slate-500 font-mono italic">Kliknij START SYMULACJI, aby uruchomić planistę...</span>
                  ) : (
                    ganttHistory.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded text-[10px] font-mono font-bold text-slate-950 shrink-0 text-center min-w-[28px]"
                        style={{ backgroundColor: step.color }}
                        title={`T=${step.time}s: Process ${step.pid}`}
                      >
                        {step.pid}
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-850 text-[11px] text-slate-300 space-y-1 font-sans">
                  <p className="font-bold text-cyan-400 font-mono">Jak działa planowanie CPU?</p>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Jednordzeniowy procesor wykonuje instrukcje sekwencyjnie. System operacyjny stwarza złudzenie wielozadaniowości (Multitasking), przełączając rejestry procesora i wskaźnik instrukcji w ułamkach milisekund (Context Switching).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB TAB 4: CLI TERMINAL SIMULATOR */}
      {activeSubTab === "terminal" && (
        <div className="bg-[#090D16] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-4 font-mono">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs text-slate-400 font-bold">
                Interaktywna Powłoka Terminala (CLI Console)
              </span>
            </div>

            {/* Shell Switcher */}
            <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTerminalShell("bash")}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                  terminalShell === "bash"
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                GNU Bash (Linux)
              </button>

              <button
                onClick={() => setTerminalShell("powershell")}
                className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                  terminalShell === "powershell"
                    ? "bg-sky-500 text-slate-950"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                PowerShell (Windows)
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="bg-[#05070c] p-4 rounded-xl border border-slate-900 min-h-[300px] max-h-[420px] overflow-y-auto space-y-1.5 text-xs font-mono scrollbar-thin scrollbar-thumb-slate-800">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                {log.type === "input" && (
                  <span className="text-cyan-400 font-bold">{log.text}</span>
                )}
                {log.type === "output" && (
                  <span className="text-slate-300">{log.text}</span>
                )}
                {log.type === "error" && (
                  <span className="text-red-400">{log.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleTerminalSubmit} className="flex items-center space-x-2">
            <span className="text-xs text-cyan-400 font-bold shrink-0">
              {terminalShell === "bash" ? "user@atlas:~$ " : "PS C:\\Users\\Atlas> "}
            </span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Wpisz polecenie (np. uname -a, top, free -m, ls -la, help)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
            >
              Wykonaj
            </button>
          </form>

        </div>
      )}

      {/* SUB TAB 5: FILE SYSTEM & PERMISSIONS */}
      {activeSubTab === "filesystem" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* File Permissions chmod Matrix */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-850 pb-3">
              <Lock className="w-5 h-5 text-amber-400" />
              Prawa Dostępu do Plików POSIX (chmod rwx)
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300 border-b border-slate-900 pb-2">
                <span>Plik: <strong className="text-cyan-400">script.sh</strong></span>
                <span className="text-amber-400 font-bold">chmod 755 (-rwxr-xr-x)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Właściciel (User - 7)</span>
                  <span className="text-emerald-400 font-bold">r w x (4+2+1)</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Grupa (Group - 5)</span>
                  <span className="text-cyan-400 font-bold">r - x (4+0+1)</span>
                </div>

                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Pozostali (Others - 5)</span>
                  <span className="text-purple-400 font-bold">r - x (4+0+1)</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-sans leading-relaxed pt-1">
                W systemach Unix/Linux prawa dostępu reprezentowane są przez 3 cyfry ósemkowe: Read (4), Write (2), Execute (1). Wartość 755 pozwala właścicielowi na pełny zapis i uruchomienie, zaś innym tylko na odczyt i wykonanie.
              </p>
            </div>
          </div>

          {/* File Systems comparison (NTFS vs ext4 vs APFS) */}
          <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-850 pb-3">
              <FolderTree className="w-5 h-5 text-sky-400" />
              Porównanie Systemów Plików (File Systems)
            </h3>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                <span className="font-bold text-sky-400 font-mono">NTFS (New Technology File System)</span>
                <p className="text-slate-300 text-[11px]">
                  Zintegrowany system Windows. Obsługuje listy kontrolne ACL, księgowanie (Journaling), szyfrowanie EFS oraz kompresję w locie.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                <span className="font-bold text-amber-400 font-mono">ext4 (Fourth Extended Filesystem)</span>
                <p className="text-slate-300 text-[11px]">
                  Standard systemów Linux. Wykorzystuje węzły skorowidza (Inodes), księgowanie z alokacją obszarową (Extents) i obsługuje pliki o rozmiarach do 16 TB.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                <span className="font-bold text-purple-400 font-mono">APFS (Apple File System)</span>
                <p className="text-slate-300 text-[11px]">
                  Zoptymalizowany dla pamięci flash SSD/NVMe w macOS/iOS. Wspiera natychmiastowe klonowanie plików, migawki (Snapshots) oraz silne szyfrowanie wielokluczowe.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUB TAB 6: EVENT LOG VIEWER & DIAGNOSTIC CONFIG EDITOR */}
      {activeSubTab === "eventlog" && (() => {
        const parsedSysConfig = parseSysConfig(sysConfigFileContent);
        const currentEventLogs = generateEventLogs(parsedSysConfig);

        const totalErrors = currentEventLogs.filter((l) => l.level === "ERROR" || l.level === "CRITICAL").length;
        const totalWarnings = currentEventLogs.filter((l) => l.level === "WARNING").length;
        const totalResolved = currentEventLogs.filter((l) => l.level === "RESOLVED").length;
        const isSystemHealthy = totalErrors === 0 && totalWarnings === 0;

        const filteredEventLogs = currentEventLogs.filter((log) => {
          if (sysLogFilter === "ERRORS" && log.level !== "ERROR" && log.level !== "CRITICAL") return false;
          if (sysLogFilter === "WARNINGS" && log.level !== "WARNING") return false;
          if (sysLogFilter === "RESOLVED" && log.level !== "RESOLVED") return false;
          if (sysLogFilter === "INFO" && log.level !== "INFO") return false;

          if (sysLogSearch.trim() !== "") {
            const q = sysLogSearch.toLowerCase();
            return (
              log.message.toLowerCase().includes(q) ||
              log.source.toLowerCase().includes(q) ||
              log.level.toLowerCase().includes(q) ||
              (log.configKey && log.configKey.toLowerCase().includes(q))
            );
          }
          return true;
        });

        const handleApplyOptimalConfig = () => {
          setIsReevaluatingLogs(true);
          setSysConfigFileContent(OPTIMAL_SYSCONFIG_CONTENT);
          setTimeout(() => {
            setIsReevaluatingLogs(false);
          }, 400);
        };

        const handleResetBrokenConfig = () => {
          setIsReevaluatingLogs(true);
          setSysConfigFileContent(INITIAL_SYSCONFIG_CONTENT);
          setTimeout(() => {
            setIsReevaluatingLogs(false);
          }, 400);
        };

        const handleQuickUpdateParam = (key: keyof SysConfigState, val: number | boolean) => {
          const current = parseSysConfig(sysConfigFileContent);
          if (key === "max_vram_limit_mb" && typeof val === "number") current.max_vram_limit_mb = val;
          else if (key === "swap_size_mb" && typeof val === "number") current.swap_size_mb = val;
          else if (key === "max_sockets_limit" && typeof val === "number") current.max_sockets_limit = val;
          else if (key === "httpd_max_clients" && typeof val === "number") current.httpd_max_clients = val;
          else if (key === "enable_firewall" && typeof val === "boolean") current.enable_firewall = val;
          else if (key === "driver_debug_mode" && typeof val === "boolean") current.driver_debug_mode = val;

          const newText = `# --- WIRTUALNY PLIK KONFIGURACYJNY SYSTEMU (/etc/sysconfig.conf) ---
# Zmodyfikuj wartości poniżej i kliknij 'Zastosuj Konfigurację', aby naprawić błędy.

# Limit pamięci VRAM dla podsystemu graficznego (w MB)
# [Wymagane min. 4096 MB do uniknięcia błędu alokacji w 4K]
max_vram_limit_mb = ${current.max_vram_limit_mb}

# Rozmiar pamięci wymiany SWAP (w MB)
# [Wymagane min. 1024 MB dla zabezpieczenia przed awarią OOM Killer]
swap_size_mb = ${current.swap_size_mb}

# Maksymalna pula gniazd sieciowych sockets w usłudze netd
# [Wymagane min. 256 gniazd dla uruchomienia daemona na porcie 8080]
max_sockets_limit = ${current.max_sockets_limit}

# Maksymalna pula połączeń klienta usługi serwera HTTPD
# [Wymagana zalecana wartość >= 200]
httpd_max_clients = ${current.httpd_max_clients}

# Zapora ogniowa Firewall (true / false)
# [Wymagane true dla ochrony przed nieautoryzowanym ruchem]
enable_firewall = ${current.enable_firewall}

# Tryb rejestrowania debugowania jądra (true / false)
driver_debug_mode = ${current.driver_debug_mode}
`;
          setSysConfigFileContent(newText);
        };

        return (
          <div className="space-y-6">
            
            {/* Top Status Header & Control Panel */}
            <div className="bg-[#0F0F12] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                      Dziennik Zdarzeń & Diagnostyka Jądra
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      /etc/sysconfig.conf
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1.5 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Podgląd Dziennika Zdarzeń i Edytor Konfiguracji Systemowej
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Symulacja dziennika logów systemowych (driver faults, service daemons, kernel OOM) oraz edytor wirtualnego pliku <code className="text-cyan-300 font-mono">sysconfig.conf</code> pozwalający naprawiać usterki poprzez edycję parametrów jądra.
                  </p>
                </div>

                {/* Status Indicator Gauge & Quick Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <div className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold ${
                    isSystemHealthy
                      ? "bg-emerald-950/80 border-emerald-800/60 text-emerald-300"
                      : "bg-rose-950/80 border-rose-800/60 text-rose-300 animate-pulse"
                  }`}>
                    {isSystemHealthy ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>STAN: SYSTEM STABILNY (100% OK)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>STAN: AWARIA ({totalErrors} BŁĘDÓW, {totalWarnings} OSTRZEŻEŃ)</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleApplyOptimalConfig}
                    className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                    title="Wczytaj optymalne parametry i automatycznie usuń wszystkie błędy"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Napraw Wszystko (Optymalna)</span>
                  </button>

                  <button
                    onClick={handleResetBrokenConfig}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Przywróć domyślną uszkodzoną konfigurację z błędami"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Domyślny Błąd</span>
                  </button>
                </div>
              </div>

              {/* Diagnostic Counters Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Błędy Krytyczne:</span>
                  <span className={`font-black text-sm ${totalErrors > 0 ? "text-rose-400" : "text-slate-500"}`}>
                    {totalErrors}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Ostrzeżenia Usług:</span>
                  <span className={`font-black text-sm ${totalWarnings > 0 ? "text-amber-400" : "text-slate-500"}`}>
                    {totalWarnings}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Zdarzenia Naprawione:</span>
                  <span className="font-black text-sm text-emerald-400">
                    {totalResolved}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Wszystkie Wpisy:</span>
                  <span className="font-black text-sm text-sky-400">
                    {currentEventLogs.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Main 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Event Log Stream Viewer (Span 7) */}
              <div className="lg:col-span-7 bg-[#090D16] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-4 font-mono">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">
                      Strumień Logów Systemowych (syslog / journalctl)
                    </span>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setSysLogFilter("ALL")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all font-bold border ${
                        sysLogFilter === "ALL"
                          ? "bg-sky-600 text-white border-sky-400 shadow-sm"
                          : "bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      Wszystkie ({currentEventLogs.length})
                    </button>
                    <button
                      onClick={() => setSysLogFilter("ERRORS")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all font-bold border ${
                        sysLogFilter === "ERRORS"
                          ? "bg-rose-600 text-white border-rose-400 shadow-sm"
                          : "bg-rose-950/40 text-rose-300 border-rose-900/60 hover:bg-rose-900/40"
                      }`}
                    >
                      Błędy ({totalErrors})
                    </button>
                    <button
                      onClick={() => setSysLogFilter("WARNINGS")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all font-bold border ${
                        sysLogFilter === "WARNINGS"
                          ? "bg-amber-600 text-white border-amber-400 shadow-sm"
                          : "bg-amber-950/40 text-amber-300 border-amber-900/60 hover:bg-amber-900/40"
                      }`}
                    >
                      Ostrzeżenia ({totalWarnings})
                    </button>
                    <button
                      onClick={() => setSysLogFilter("RESOLVED")}
                      className={`px-2.5 py-1 rounded cursor-pointer transition-all font-bold border ${
                        sysLogFilter === "RESOLVED"
                          ? "bg-emerald-600 text-white border-emerald-400 shadow-sm"
                          : "bg-emerald-950/40 text-emerald-300 border-emerald-900/60 hover:bg-emerald-900/40"
                      }`}
                    >
                      Naprawione ({totalResolved})
                    </button>
                  </div>
                </div>

                {/* Search input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={sysLogSearch}
                    onChange={(e) => setSysLogSearch(e.target.value)}
                    placeholder="Filtruj logi według nazwy usługi, błędu lub zmiennej (np. gpu_driver, VRAM, OOM, netd)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                {/* Log Stream Container */}
                <div className="bg-[#05070c] p-3.5 rounded-xl border border-slate-900 min-h-[380px] max-h-[500px] overflow-y-auto space-y-2.5 text-xs scrollbar-thin scrollbar-thumb-slate-800">
                  {isReevaluatingLogs ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-3 text-cyan-400 font-mono">
                      <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
                      <span className="text-xs">Przeanalizowywanie pliku /etc/sysconfig.conf i ponowne uruchamianie daemonów...</span>
                    </div>
                  ) : filteredEventLogs.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 font-mono text-xs">
                      Brak zdarzeń spełniających wybrane kryteria filtrowania.
                    </div>
                  ) : (
                    filteredEventLogs.map((log) => {
                      let levelBadgeStyle = "bg-slate-900 text-slate-400 border-slate-800";
                      if (log.level === "CRITICAL") levelBadgeStyle = "bg-rose-950 text-rose-300 border-rose-800/80 animate-pulse";
                      else if (log.level === "ERROR") levelBadgeStyle = "bg-rose-950/80 text-rose-300 border-rose-800/60";
                      else if (log.level === "WARNING") levelBadgeStyle = "bg-amber-950/80 text-amber-300 border-amber-800/60";
                      else if (log.level === "RESOLVED") levelBadgeStyle = "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
                      else if (log.level === "INFO") levelBadgeStyle = "bg-sky-950/60 text-sky-300 border-sky-800/40";

                      return (
                        <div
                          key={log.id}
                          className={`p-3 rounded-xl border transition-all ${
                            log.level === "CRITICAL"
                              ? "bg-rose-950/20 border-rose-900/60"
                              : log.level === "ERROR"
                              ? "bg-rose-950/10 border-rose-900/40"
                              : log.level === "WARNING"
                              ? "bg-amber-950/10 border-amber-900/40"
                              : log.level === "RESOLVED"
                              ? "bg-emerald-950/10 border-emerald-900/40"
                              : "bg-slate-950 border-slate-900"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900/80 pb-1.5 mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                              <span className="text-[11px] text-cyan-400 font-bold font-mono">[{log.source}]</span>
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${levelBadgeStyle}`}>
                              {log.level}
                            </span>
                          </div>

                          <p className="text-slate-200 text-[11px] leading-relaxed font-sans font-medium">
                            {log.message}
                          </p>

                          {log.fixTip && (log.level === "ERROR" || log.level === "CRITICAL" || log.level === "WARNING") && (
                            <div className="mt-2.5 p-2 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px]">
                              <div className="flex items-start gap-1.5 text-amber-300">
                                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                                <span>{log.fixTip}</span>
                              </div>

                              {log.configKey && (
                                <button
                                  onClick={() => {
                                    setHighlightedConfigKey(log.configKey || null);
                                    editorTextareaRef.current?.focus();
                                  }}
                                  className="px-2 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 font-bold rounded shrink-0 transition-all cursor-pointer"
                                >
                                  Podświetl {log.configKey}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

              {/* Right Column: Virtual Configuration Code Editor (Span 5) */}
              <div className="lg:col-span-5 bg-[#0F0F12] border border-slate-800/90 rounded-2xl p-5 shadow-2xl space-y-4 font-mono">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">
                      Wirtualny Edytor: /etc/sysconfig.conf
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {highlightedConfigKey && (
                      <button
                        onClick={() => setHighlightedConfigKey(null)}
                        className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded cursor-pointer"
                      >
                        Odznacz
                      </button>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">INI / SYSCONF</span>
                  </div>
                </div>

                {/* Code Textarea with Line Numbers */}
                <div className="relative bg-[#05070c] rounded-xl border border-slate-900 p-3 overflow-hidden font-mono text-xs">
                  <div className="flex space-x-3">
                    {/* Line numbers column */}
                    <div className="select-none text-slate-600 text-right pr-2 border-r border-slate-850 font-mono text-[11px] leading-relaxed">
                      {sysConfigFileContent.split("\n").map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Textarea code editor */}
                    <textarea
                      ref={editorTextareaRef}
                      value={sysConfigFileContent}
                      onChange={(e) => setSysConfigFileContent(e.target.value)}
                      rows={16}
                      spellCheck={false}
                      className="w-full bg-transparent text-cyan-300 font-mono text-xs focus:outline-none resize-none leading-relaxed border-none p-0 scrollbar-thin scrollbar-thumb-slate-800"
                    />
                  </div>
                </div>

                {/* Quick Interactive Parameter Controls (Sliders & Toggles) */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900 space-y-3 font-sans text-xs">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      Szybka Regulacja Parametrów (Live Sync)
                    </span>
                    <span className="text-[10px] text-slate-500">Auto-synch z plikiem</span>
                  </div>

                  {/* VRAM Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className={`text-slate-300 ${highlightedConfigKey === "max_vram_limit_mb" ? "text-amber-400 font-bold" : ""}`}>
                        max_vram_limit_mb:
                      </span>
                      <span className={parsedSysConfig.max_vram_limit_mb >= 4096 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {parsedSysConfig.max_vram_limit_mb} MB {parsedSysConfig.max_vram_limit_mb < 4096 && "(Wymagane 4096)"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1024}
                      max={8192}
                      step={512}
                      value={parsedSysConfig.max_vram_limit_mb}
                      onChange={(e) => handleQuickUpdateParam("max_vram_limit_mb", parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* SWAP Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className={`text-slate-300 ${highlightedConfigKey === "swap_size_mb" ? "text-amber-400 font-bold" : ""}`}>
                        swap_size_mb:
                      </span>
                      <span className={parsedSysConfig.swap_size_mb >= 1024 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {parsedSysConfig.swap_size_mb} MB {parsedSysConfig.swap_size_mb < 1024 && "(Wymagane 1024)"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={4096}
                      step={256}
                      value={parsedSysConfig.swap_size_mb}
                      onChange={(e) => handleQuickUpdateParam("swap_size_mb", parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* Sockets Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className={`text-slate-300 ${highlightedConfigKey === "max_sockets_limit" ? "text-amber-400 font-bold" : ""}`}>
                        max_sockets_limit:
                      </span>
                      <span className={parsedSysConfig.max_sockets_limit >= 256 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {parsedSysConfig.max_sockets_limit} gniazd {parsedSysConfig.max_sockets_limit < 256 && "(Wymagane 256)"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={32}
                      max={1024}
                      step={32}
                      value={parsedSysConfig.max_sockets_limit}
                      onChange={(e) => handleQuickUpdateParam("max_sockets_limit", parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* HTTP Max Clients */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className={`text-slate-300 ${highlightedConfigKey === "httpd_max_clients" ? "text-amber-400 font-bold" : ""}`}>
                        httpd_max_clients:
                      </span>
                      <span className={parsedSysConfig.httpd_max_clients >= 200 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                        {parsedSysConfig.httpd_max_clients} klientów
                      </span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={500}
                      step={25}
                      value={parsedSysConfig.httpd_max_clients}
                      onChange={(e) => handleQuickUpdateParam("httpd_max_clients", parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* Firewall Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-[11px] font-mono ${highlightedConfigKey === "enable_firewall" ? "text-amber-400 font-bold" : "text-slate-300"}`}>
                      enable_firewall:
                    </span>
                    <button
                      onClick={() => handleQuickUpdateParam("enable_firewall", !parsedSysConfig.enable_firewall)}
                      className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        parsedSysConfig.enable_firewall
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-rose-950 text-rose-300 border border-rose-800"
                      }`}
                    >
                      {parsedSysConfig.enable_firewall ? "true (WŁĄCZONA)" : "false (WYŁĄCZONA)"}
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Educational Note Footer */}
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-3 font-sans text-xs">
              <h4 className="font-extrabold text-white flex items-center gap-2 text-sm border-b border-slate-850 pb-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Zasada Działania Diagnostyki Dziennika Zdarzeń w Systemach Operacyjnych
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300 text-[11px] leading-relaxed">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                  <span className="font-bold text-cyan-400 block font-mono">1. Rejestrowanie Zdarzeń (syslog / Event Viewer)</span>
                  <p>
                    Jądro oraz demony systemowe przesyłają powiadomienia o zdarzeniach i błędach do centralnej kolejki logów. Komunikat zawiera znacznik czasu, kod poziomu (CRITICAL, ERROR, WARNING, INFO) i ID modułu.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                  <span className="font-bold text-emerald-400 block font-mono">2. Parametry Konfiguracji Jądra (sysctl / ini)</span>
                  <p>
                    Systemy operacyjne udostępniają wirtualny interfejs zmiennych środowiskowych (np. <code className="text-cyan-300">/proc/sys/</code> w Linuxie lub Rejestr w Windows). Ich modyfikacja zmienia zachowanie pamięci RAM, buforów gniazd i sterowników.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 space-y-1">
                  <span className="font-bold text-amber-400 block font-mono">3. Dynamiczne Przeładowanie Usług (systemctl reload)</span>
                  <p>
                    Zmiana wartości w plikach konfiguracyjnych wymusza na procesach Ponowną Analizę (Re-evaluate). Usługi alokują większe pule pamięci i gniazd bez konieczności ponownego uruchamiania całego komputera.
                  </p>
                </div>
              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
}
