import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import {
  Activity,
  Zap,
  Radio,
  Cable,
  Globe,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  Gauge,
  Wifi,
  Sparkles,
  Info,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  XCircle
} from "lucide-react";

export interface MediaProfile {
  id: string;
  name: string;
  shortName: string;
  category: "miedz" | "swiatlowod" | "wifi";
  baseSpeedMbps: number; // Max nominal speed at 0m in Mb/s
  color: string;
  fillColor: string;
  maxRecommendedDistance: number; // in meters
  attenuationFactor: number; // rate of degradation per meter
  interferenceSensitivity: number; // 0 (immune) to 1 (highly sensitive)
  typicalLatencyMs: number;
}

const MEDIA_PROFILES: MediaProfile[] = [
  {
    id: "os2_fiber",
    name: "Światłowód Jednomodowy (OS2)",
    shortName: "Światłowód OS2",
    category: "swiatlowod",
    baseSpeedMbps: 10000, // 10 Gb/s base (expandable to 100G+)
    color: "#06b6d4", // cyan
    fillColor: "rgba(6, 182, 212, 0.15)",
    maxRecommendedDistance: 10000, // 10 km
    attenuationFactor: 0.0001, // extremely low loss
    interferenceSensitivity: 0.0, // immune to EMI
    typicalLatencyMs: 0.8
  },
  {
    id: "cat8_copper",
    name: "Skrętka Cat 8 S/FTP (2000 MHz)",
    shortName: "Cat 8 S/FTP",
    category: "miedz",
    baseSpeedMbps: 25000, // 25 Gb/s
    color: "#eab308", // yellow/amber
    fillColor: "rgba(234, 179, 8, 0.15)",
    maxRecommendedDistance: 30, // 30m max for Cat8
    attenuationFactor: 0.02,
    interferenceSensitivity: 0.05, // heavy shield
    typicalLatencyMs: 1.2
  },
  {
    id: "cat6a_copper",
    name: "Skrętka Cat 6a F/UTP (500 MHz)",
    shortName: "Cat 6a F/UTP",
    category: "miedz",
    baseSpeedMbps: 10000, // 10 Gb/s
    color: "#10b981", // emerald
    fillColor: "rgba(16, 185, 129, 0.15)",
    maxRecommendedDistance: 100, // 100m
    attenuationFactor: 0.005,
    interferenceSensitivity: 0.15,
    typicalLatencyMs: 1.5
  },
  {
    id: "cat5e_copper",
    name: "Skrętka Cat 5e UTP (100 MHz)",
    shortName: "Cat 5e UTP",
    category: "miedz",
    baseSpeedMbps: 1000, // 1 Gb/s
    color: "#f97316", // orange
    fillColor: "rgba(249, 115, 22, 0.15)",
    maxRecommendedDistance: 100, // 100m
    attenuationFactor: 0.008,
    interferenceSensitivity: 0.65, // unshielded
    typicalLatencyMs: 2.5
  },
  {
    id: "wifi7_radio",
    name: "Wi-Fi 7 (802.11be MLO 6 GHz)",
    shortName: "Wi-Fi 7 (6 GHz)",
    category: "wifi",
    baseSpeedMbps: 9600, // 9.6 Gb/s real-world MLO
    color: "#a855f7", // purple
    fillColor: "rgba(168, 85, 247, 0.15)",
    maxRecommendedDistance: 25,
    attenuationFactor: 0.035, // high wall attenuation at 6GHz
    interferenceSensitivity: 0.45,
    typicalLatencyMs: 3.2
  },
  {
    id: "wifi6_radio",
    name: "Wi-Fi 6 (802.11ax 5 GHz)",
    shortName: "Wi-Fi 6 (5 GHz)",
    category: "wifi",
    baseSpeedMbps: 2400, // 2.4 Gb/s
    color: "#ec4899", // pink
    fillColor: "rgba(236, 72, 153, 0.15)",
    maxRecommendedDistance: 35,
    attenuationFactor: 0.025,
    interferenceSensitivity: 0.70,
    typicalLatencyMs: 6.5
  }
];

interface TimeSeriesPoint {
  timeLabel: string;
  [key: string]: number | string;
}

interface DistancePoint {
  distLabel: string;
  distanceMeters: number;
  [key: string]: number | string;
}

export default function MediaThroughputChart() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"live" | "distance" | "latency">("live");
  
  // Controls
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([
    "os2_fiber",
    "cat8_copper",
    "cat6a_copper",
    "cat5e_copper",
    "wifi7_radio",
    "wifi6_radio"
  ]);
  const [distanceMeters, setDistanceMeters] = useState<number>(30); // 30m default
  const [emiInterference, setEmiInterference] = useState<number>(15); // 15% EMI noise
  const [wallCount, setWallCount] = useState<number>(1); // 1 obstacle wall

  // Time Series state (Live chart)
  const [timeData, setTimeData] = useState<TimeSeriesPoint[]>([]);
  const stepCountRef = useRef<number>(0);

  // Toggle medium selection
  const toggleMedium = (id: string) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  // Helper category toggles
  const selectAllMedia = () => {
    setSelectedMediaIds(MEDIA_PROFILES.map((p) => p.id));
  };

  const selectCategory = (cat: "miedz" | "swiatlowod" | "wifi") => {
    setSelectedMediaIds(MEDIA_PROFILES.filter((p) => p.category === cat).map((p) => p.id));
  };

  const deselectAllMedia = () => {
    setSelectedMediaIds(["cat6a_copper"]);
  };

  // Custom Recharts Legend renderer
  const renderInteractiveChartLegend = (props: any) => {
    const { payload } = props;
    if (!payload || !payload.length) return null;

    return (
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3 font-mono text-[11px]">
        {payload.map((entry: any, index: number) => {
          const profile = MEDIA_PROFILES.find((p) => p.name === entry.value || p.id === entry.dataKey);
          const isSelected = profile ? selectedMediaIds.includes(profile.id) : true;
          return (
            <button
              key={`item-${index}`}
              onClick={() => profile && toggleMedium(profile.id)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                isSelected
                  ? "bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500 shadow-sm"
                  : "bg-slate-950/60 border-slate-900 text-slate-600 line-through opacity-50"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-semibold">{profile ? profile.shortName : entry.value}</span>
              {isSelected ? (
                <Eye className="w-3 h-3 text-cyan-400 opacity-80" />
              ) : (
                <EyeOff className="w-3 h-3 text-slate-600" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  // Helper to calculate current throughput in Mb/s given profile and environmental controls
  const calculateEffectiveThroughput = (
    profile: MediaProfile,
    dist: number,
    emiPct: number,
    walls: number,
    randomFactor: number = 0
  ): number => {
    let speed = profile.baseSpeedMbps;

    // 1. Distance Attenuation
    if (profile.category === "miedz") {
      if (dist > profile.maxRecommendedDistance) {
        // Severe drop off past maximum distance limit (e.g. >100m for Cat5e/Cat6a or >30m for Cat8)
        const overdist = dist - profile.maxRecommendedDistance;
        const penaltyRatio = Math.max(0.05, 1 - overdist * 0.025);
        speed *= penaltyRatio;
      } else {
        speed *= Math.max(0.6, 1 - dist * profile.attenuationFactor);
      }
    } else if (profile.category === "wifi") {
      // Wi-Fi attenuates significantly over distance and through walls
      const wallPenalty = Math.pow(0.55, walls); // each wall halves Wi-Fi signal roughly
      const distPenalty = Math.max(0.02, Math.exp(-dist * profile.attenuationFactor));
      speed *= wallPenalty * distPenalty;
    } else if (profile.category === "swiatlowod") {
      // Fiber has near zero loss over 0 - 100m
      speed *= Math.max(0.95, 1 - dist * profile.attenuationFactor);
    }

    // 2. EMI Noise
    if (profile.interferenceSensitivity > 0) {
      const emiPenalty = 1 - (emiPct / 100) * profile.interferenceSensitivity;
      speed *= Math.max(0.05, emiPenalty);
    }

    // 3. Natural Random Real-Time Jitter
    const jitterPercent = (randomFactor - 0.5) * 0.08 * (1 + profile.interferenceSensitivity * (emiPct / 50));
    speed = speed * (1 + jitterPercent);

    return Math.max(0, Math.round(speed));
  };

  // Generate initial live time series data
  useEffect(() => {
    const initialPoints: TimeSeriesPoint[] = [];
    const now = new Date();

    for (let i = 15; i >= 0; i--) {
      const pointTime = new Date(now.getTime() - i * 1000);
      const timeLabel = pointTime.toLocaleTimeString("pl-PL", {
        second: "2-digit",
        minute: "2-digit"
      });

      const point: TimeSeriesPoint = { timeLabel };

      MEDIA_PROFILES.forEach((profile) => {
        const rand = Math.random();
        point[profile.id] = calculateEffectiveThroughput(
          profile,
          distanceMeters,
          emiInterference,
          wallCount,
          rand
        );
      });

      initialPoints.push(point);
    }

    setTimeData(initialPoints);
  }, []);

  // Real-time ticker effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      stepCountRef.current += 1;
      const now = new Date();
      const timeLabel = now.toLocaleTimeString("pl-PL", {
        second: "2-digit",
        minute: "2-digit"
      });

      const newPoint: TimeSeriesPoint = { timeLabel };

      MEDIA_PROFILES.forEach((profile) => {
        const rand = Math.random();
        newPoint[profile.id] = calculateEffectiveThroughput(
          profile,
          distanceMeters,
          emiInterference,
          wallCount,
          rand
        );
      });

      setTimeData((prev) => {
        const updated = [...prev.slice(1), newPoint];
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, distanceMeters, emiInterference, wallCount]);

  // Generate distance curve data for distance comparison tab
  const generateDistanceCurveData = (): DistancePoint[] => {
    const distances = [5, 15, 30, 50, 75, 100, 150, 300, 1000];
    return distances.map((d) => {
      const pt: DistancePoint = {
        distLabel: `${d}m`,
        distanceMeters: d
      };

      MEDIA_PROFILES.forEach((profile) => {
        pt[profile.id] = calculateEffectiveThroughput(
          profile,
          d,
          emiInterference,
          wallCount,
          0.5
        );
      });

      return pt;
    });
  };

  // Generate latency comparison data
  const generateLatencyData = () => {
    return MEDIA_PROFILES.filter((m) => selectedMediaIds.includes(m.id)).map((profile) => {
      // Latency grows with EMI and Wi-Fi wall collisions
      let effectiveLatency = profile.typicalLatencyMs;
      if (profile.category === "wifi") {
        effectiveLatency += wallCount * 2.5 + (emiInterference / 100) * 8;
      } else if (profile.category === "miedz") {
        effectiveLatency += (emiInterference / 100) * profile.interferenceSensitivity * 4;
      }
      return {
        name: profile.shortName,
        latencyMs: parseFloat(effectiveLatency.toFixed(1)),
        color: profile.color
      };
    });
  };

  // Preset Configurations
  const applyPreset = (type: "datacenter" | "home" | "industrial" | "building_link") => {
    if (type === "datacenter") {
      setDistanceMeters(5);
      setEmiInterference(5);
      setWallCount(0);
      setSelectedMediaIds(["os2_fiber", "cat8_copper", "cat6a_copper"]);
    } else if (type === "home") {
      setDistanceMeters(25);
      setEmiInterference(15);
      setWallCount(2);
      setSelectedMediaIds(["os2_fiber", "cat6a_copper", "wifi7_radio", "wifi6_radio"]);
    } else if (type === "industrial") {
      setDistanceMeters(60);
      setEmiInterference(85); // High EMI from heavy motors
      setWallCount(1);
      setSelectedMediaIds(["os2_fiber", "cat6a_copper", "cat5e_copper", "wifi6_radio"]);
    } else if (type === "building_link") {
      setDistanceMeters(300); // 300m link
      setEmiInterference(20);
      setWallCount(0);
      setSelectedMediaIds(["os2_fiber", "cat6a_copper", "cat5e_copper"]);
    }
  };

  // Current latest values for KPI Cards
  const latestPoint = timeData[timeData.length - 1] || {};

  return (
    <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
              Symulator Przepustowości w Czasie Rzeczywistym
            </span>
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? "bg-emerald-400 opacity-75" : "bg-amber-400 opacity-40"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-emerald-500" : "bg-amber-500"}`} />
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white mt-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            Wykres Transmisji Mediów Sieciowych (Skrętka vs Światłowód vs Wi-Fi)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dynamiczna symulacja w czasie rzeczywistym z uwzględnieniem tłumienia fali na dystansie, zakłóceń magnetycznych (EMI) i przeszkód architektonicznych.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("live")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === "live"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Na Żywo (Live Stream)</span>
          </button>

          <button
            onClick={() => setActiveTab("distance")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === "distance"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Krzywa Dystansu (1m-10km)</span>
          </button>

          <button
            onClick={() => setActiveTab("latency")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === "latency"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Opóźnienia (Ping ms)</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Presets Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-900">
        
        {/* Environmental Sliders (Span 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Parametry Środowiska Transmisji:
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border flex items-center space-x-1 transition-all cursor-pointer ${
                  isPlaying
                    ? "bg-amber-950/40 border-amber-800/50 text-amber-350 hover:bg-amber-900/50"
                    : "bg-emerald-950/40 border-emerald-800/50 text-emerald-350 hover:bg-emerald-900/50"
                }`}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? "PAUZA" : "START"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Slider 1: Distance */}
            <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-850 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">Długość toru:</span>
                <span className="text-cyan-400 font-bold">{distanceMeters} m</span>
              </div>
              <input
                type="range"
                min="1"
                max="300"
                value={distanceMeters}
                onChange={(e) => setDistanceMeters(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[9px] text-slate-500 font-mono">
                {distanceMeters <= 30 ? "Krótki patchcord" : distanceMeters <= 100 ? "Limit skrętki (100m)" : "Ponad limit miedzi!"}
              </p>
            </div>

            {/* Slider 2: EMI Noise */}
            <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-850 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">Zakłócenia EMI:</span>
                <span className={`${emiInterference > 50 ? "text-red-400" : "text-amber-400"} font-bold`}>{emiInterference}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={emiInterference}
                onChange={(e) => setEmiInterference(parseInt(e.target.value))}
                className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[9px] text-slate-500 font-mono">
                {emiInterference < 20 ? "Niskie (Dom/Biuro)" : emiInterference < 60 ? "Umiarkowane" : "Silne silniki/Kable 400V"}
              </p>
            </div>

            {/* Slider 3: Walls / Obstacles */}
            <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-850 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400">Ściany (Wi-Fi):</span>
                <span className="text-purple-400 font-bold">{wallCount} {wallCount === 1 ? "ściana" : "ściany"}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={wallCount}
                onChange={(e) => setWallCount(parseInt(e.target.value))}
                className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <p className="text-[9px] text-slate-500 font-mono">
                Tłumienie sygnału radiowego
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets Buttons (Span 5) */}
        <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-900 lg:pl-4 pt-3 lg:pt-0">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Szybkie Scenariusze Testowe:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <button
              onClick={() => applyPreset("datacenter")}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-slate-300 text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-cyan-400 group-hover:text-cyan-300">🏢 Serwerownia</div>
              <div className="text-[9px] text-slate-500">5m, 0 ścian, Cat8 / OS2</div>
            </button>

            <button
              onClick={() => applyPreset("home")}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 rounded-lg text-slate-300 text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-purple-400 group-hover:text-purple-300">🏠 Dom FTTH + Wi-Fi</div>
              <div className="text-[9px] text-slate-500">25m, 2 ściany, Wi-Fi 6/7</div>
            </button>

            <button
              onClick={() => applyPreset("industrial")}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg text-slate-300 text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-amber-400 group-hover:text-amber-300">🏭 Hala (Wysokie EMI)</div>
              <div className="text-[9px] text-slate-500">60m, 85% EMI, UTP vs S/FTP</div>
            </button>

            <button
              onClick={() => applyPreset("building_link")}
              className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-lg text-slate-300 text-left transition-all cursor-pointer group"
            >
              <div className="font-bold text-emerald-400 group-hover:text-emerald-300">🌳 Magistrala (300m)</div>
              <div className="text-[9px] text-slate-500">Miedź wysiada vs Światłowód</div>
            </button>
          </div>
        </div>

      </div>

      {/* Interaktywna Legenda i Filtry Mediów */}
      <div className="bg-slate-950/90 border border-slate-900 rounded-xl p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Interaktywna Legenda i Wybór Mediów Transmisyjnych:
            </span>
            <span className="text-[10px] font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
              Wybrano: {selectedMediaIds.length} / {MEDIA_PROFILES.length}
            </span>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            <button
              onClick={selectAllMedia}
              className={`px-2 py-1 rounded border transition-all cursor-pointer flex items-center space-x-1 ${
                selectedMediaIds.length === MEDIA_PROFILES.length
                  ? "bg-cyan-950/80 border-cyan-700 text-cyan-300 font-bold"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span>Wszystkie</span>
            </button>

            <button
              onClick={() => selectCategory("miedz")}
              className="px-2 py-1 rounded bg-amber-950/40 border border-amber-800/50 text-amber-300 hover:bg-amber-900/50 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Cable className="w-3 h-3 text-amber-400" />
              <span>Tylko Miedź</span>
            </button>

            <button
              onClick={() => selectCategory("swiatlowod")}
              className="px-2 py-1 rounded bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 hover:bg-cyan-900/50 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Tylko Światłowód</span>
            </button>

            <button
              onClick={() => selectCategory("wifi")}
              className="px-2 py-1 rounded bg-purple-950/40 border border-purple-800/50 text-purple-300 hover:bg-purple-900/50 transition-all cursor-pointer flex items-center space-x-1"
            >
              <Wifi className="w-3 h-3 text-purple-400" />
              <span>Tylko Wi-Fi</span>
            </button>

            <button
              onClick={deselectAllMedia}
              className="px-2 py-1 rounded bg-slate-900/90 border border-slate-800 text-slate-500 hover:text-slate-300 transition-all cursor-pointer flex items-center space-x-1"
              title="Zostaw jedno wybrane medium"
            >
              <XCircle className="w-3 h-3 text-slate-500" />
              <span>Czyszczenie</span>
            </button>
          </div>
        </div>

        {/* Media Toggle Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MEDIA_PROFILES.map((profile) => {
            const isSelected = selectedMediaIds.includes(profile.id);

            // Category Icon
            let CategoryIcon = Cable;
            if (profile.category === "swiatlowod") CategoryIcon = Zap;
            if (profile.category === "wifi") CategoryIcon = Wifi;

            return (
              <button
                key={profile.id}
                onClick={() => toggleMedium(profile.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[72px] ${
                  isSelected
                    ? "bg-slate-900/90 border-slate-700 shadow-lg hover:border-slate-500"
                    : "bg-slate-950/40 border-slate-900/80 opacity-50 hover:opacity-75 hover:border-slate-800"
                }`}
              >
                {/* Accent strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                    isSelected ? "opacity-100" : "opacity-30"
                  }`}
                  style={{ backgroundColor: profile.color }}
                />

                <div className="flex items-center justify-between w-full pt-1">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`w-2 h-2 rounded-full inline-block shrink-0 ${
                        isSelected ? "animate-pulse" : ""
                      }`}
                      style={{ backgroundColor: profile.color }}
                    />
                    <CategoryIcon className="w-3 h-3 text-slate-400" />
                  </div>

                  {isSelected ? (
                    <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  )}
                </div>

                <div className="mt-1">
                  <span
                    className={`text-xs font-mono font-bold block truncate transition-colors ${
                      isSelected ? "text-slate-100" : "text-slate-500 line-through"
                    }`}
                  >
                    {profile.shortName}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {profile.baseSpeedMbps >= 1000
                      ? `${profile.baseSpeedMbps / 1000} Gb/s`
                      : `${profile.baseSpeedMbps} Mb/s`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CHART CONTAINER */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-900 min-h-[360px] relative">
        {activeTab === "live" && (
          <div>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center">
                <Activity className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                Przepustowość Efektywna (Mb/s) w funkcji czasu
              </span>
              <span className="text-slate-500">Kliknij opcję na legendzie, aby włączyć / wyłączyć linię</span>
            </div>

            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    {MEDIA_PROFILES.map((profile) => (
                      <linearGradient key={profile.id} id={`grad_${profile.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={profile.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={profile.color} stopOpacity={0.0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                  <XAxis dataKey="timeLabel" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fontSize: 10 }}
                    unit=" Mb/s"
                    domain={[0, "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#f8fafc",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)"
                    }}
                    formatter={(value: any, name: any) => {
                      const profile = MEDIA_PROFILES.find((p) => p.id === name);
                      return [`${Number(value).toLocaleString("pl-PL")} Mb/s`, profile ? profile.name : name];
                    }}
                  />
                  <Legend content={renderInteractiveChartLegend} />
                  {MEDIA_PROFILES.filter((p) => selectedMediaIds.includes(p.id)).map((profile) => (
                    <Area
                      key={profile.id}
                      type="monotone"
                      dataKey={profile.id}
                      name={profile.name}
                      stroke={profile.color}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill={`url(#grad_${profile.id})`}
                      isAnimationActive={false}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "distance" && (
          <div>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center">
                <Gauge className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Spadek Szybkości Transmisji w zależności od Dystansu (1m — 1000m)
              </span>
              <span className="text-amber-400 font-bold">Wpływ limitu 100m dla miedzi</span>
            </div>

            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generateDistanceCurveData()} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                  <XAxis dataKey="distLabel" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" Mb/s" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#f8fafc"
                    }}
                    formatter={(val: any, name: any) => {
                      const profile = MEDIA_PROFILES.find((p) => p.id === name);
                      return [`${Number(val).toLocaleString("pl-PL")} Mb/s`, profile ? profile.name : name];
                    }}
                  />
                  <Legend content={renderInteractiveChartLegend} />
                  <ReferenceLine x="100m" stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Limit Miedzi (100m)", fill: "#ef4444", fontSize: 10 }} />
                  {MEDIA_PROFILES.filter((p) => selectedMediaIds.includes(p.id)).map((profile) => (
                    <Area
                      key={profile.id}
                      type="monotone"
                      dataKey={profile.id}
                      name={profile.name}
                      stroke={profile.color}
                      strokeWidth={2}
                      fillOpacity={0.1}
                      fill={profile.color}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "latency" && (
          <div>
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1 text-purple-400" />
                Porównanie Opóźnień Swobodnych (Latency / Ping ms) — Czas Reakcji Łącza
              </span>
              <span className="text-emerald-400 font-bold">Im niższy słup, tym lepiej!</span>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateLatencyData()} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit=" ms" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090d16",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#f8fafc"
                    }}
                    formatter={(val: any) => [`${val} ms`, "Średnie opóźnienie ping"]}
                  />
                  <Bar dataKey="latencyMs" radius={[6, 6, 0, 0]}>
                    {generateLatencyData().map((entry, index) => (
                      <Bar key={`cell-${index}`} fill={entry.color} dataKey="latencyMs" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* KPI Cards for active media selected */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MEDIA_PROFILES.filter((p) => selectedMediaIds.includes(p.id)).map((profile) => {
          const currentSpeed = latestPoint[profile.id] ?? profile.baseSpeedMbps;
          const ratio = Math.min(100, Math.round((Number(currentSpeed) / profile.baseSpeedMbps) * 100));

          return (
            <div
              key={profile.id}
              className="bg-slate-950/70 border border-slate-900 rounded-xl p-3 space-y-1 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 bottom-0 w-1"
                style={{ backgroundColor: profile.color }}
              />
              <p className="text-[10px] font-mono font-bold text-slate-400 truncate pl-1.5">
                {profile.shortName}
              </p>
              <p className="text-sm font-extrabold font-mono text-white pl-1.5">
                {Number(currentSpeed).toLocaleString("pl-PL")}{" "}
                <span className="text-[10px] text-slate-500 font-normal">Mb/s</span>
              </p>

              {/* Mini efficiency progress bar */}
              <div className="pl-1.5 pt-1 space-y-1">
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${ratio}%`,
                      backgroundColor: profile.color
                    }}
                  />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-slate-500">
                  <span>Wydajność:</span>
                  <span className="text-slate-300 font-bold">{ratio}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Summary Footnote */}
      <div className="p-3 bg-cyan-950/20 border border-cyan-900/30 rounded-xl text-xs text-slate-300 flex items-start space-x-2.5 font-sans">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong className="text-white">Wnioski Inżynieryjne:</strong> <strong className="text-cyan-400">Światłowód Jednomodowy (OS2)</strong> charakteryzuje się zerową wrażliwością na zakłócenia elektromagnetyczne (EMI = 0%) oraz znikomym tłumieniem na dystansach wielokilometrowych. <strong className="text-amber-400">Skrętka miedziana (Cat 6a/Cat 8)</strong> gwarantuje znakomite opóźnienia i bardzo wysoką przepustowość, lecz jej dystans zasięgu jest bezwzględnie ograniczony fizyką przewodu (do 100m dla 1G/10G i 30m dla Cat8). <strong className="text-purple-400">Wi-Fi (6/7)</strong> oferuje wygodę mobilną, ale traci najwięcej energii sygnału przy przejściu przez ściany i przeszkody zbrojone.
        </p>
      </div>
    </div>
  );
}
