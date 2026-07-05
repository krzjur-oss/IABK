import React, { useState } from "react";
import {
  Star,
  Cable,
  Circle,
  Share2,
  GitBranch,
  RefreshCw,
  Zap,
  HelpCircle,
  Laptop,
  Server,
  Router,
  Activity,
  Network,
  Sparkles
} from "lucide-react";

interface TopologyViewerProps {
  onSwitchToQuiz?: () => void;
}

export default function TopologyViewer({ onSwitchToQuiz }: TopologyViewerProps = {}) {
  // Network Topologies state variables
  const [selectedTopology, setSelectedTopology] = useState<"star" | "bus" | "ring" | "mesh" | "tree">("star");
  const [brokenLinks, setBrokenLinks] = useState<Record<string, boolean>>({});
  const [brokenNodes, setBrokenNodes] = useState<Record<string, boolean>>({});
  const [isDualRing, setIsDualRing] = useState<boolean>(false);
  const [topoPacketActive, setTopoPacketActive] = useState<boolean>(false);
  const [topoPacketStep, setTopoPacketStep] = useState<number>(-1); // -1 = idle, 0, 1, 2, 3...

  const triggerTopoPacketAnimation = () => {
    if (topoPacketActive) return;
    setTopoPacketActive(true);
    setTopoPacketStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step <= 4) {
        setTopoPacketStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTopoPacketActive(false);
          setTopoPacketStep(-1);
        }, 1000);
      }
    }, 800);
  };

  const resetTopologySim = () => {
    setBrokenLinks({});
    setBrokenNodes({});
    setTopoPacketActive(false);
    setTopoPacketStep(-1);
  };

  const toggleLink = (linkId: string) => {
    setBrokenLinks(prev => ({
      ...prev,
      [linkId]: !prev[linkId]
    }));
  };

  const toggleNode = (nodeId: string) => {
    setBrokenNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const getTopologyStatus = () => {
    if (selectedTopology === "star") {
      const isSwitchBroken = brokenNodes["switch"];
      const isLinkToSwitchBroken = brokenLinks["switch-A"];
      const isSourceBroken = brokenNodes["A"];
      
      if (isSourceBroken) return { status: "offline", msg: "Odbiorca A (Źródło) jest wyłączony!", color: "text-red-400" };
      if (isSwitchBroken) return { status: "error", msg: "Centralny Switch jest uszkodzony! Cała sieć gwiazdy leży offline (Single Point of Failure).", color: "text-red-500 font-extrabold animate-pulse" };
      if (isLinkToSwitchBroken) return { status: "warning", msg: "Kabel od Odbiorcy A do Switcha jest przerwany. Urządzenie A nie ma kontaktu z siecią.", color: "text-amber-400" };
      
      const connected = ["A"];
      if (!brokenNodes["B"] && !brokenLinks["switch-B"]) connected.push("B");
      if (!brokenNodes["C"] && !brokenLinks["switch-C"]) connected.push("C");
      if (!brokenNodes["D"] && !brokenLinks["switch-D"]) connected.push("D");
      
      if (connected.length === 4) return { status: "perfect", msg: "Wszystkie urządzenia w sieci gwiazdy pracują poprawnie. Komunikacja bez zakłóceń.", color: "text-emerald-400" };
      return { status: "partial", msg: `Sieć działa częściowo. Połączone węzły: ${connected.join(", ")}. Odłączone węzły mają uszkodzone kable/karty.`, color: "text-yellow-400" };
    }
    
    if (selectedTopology === "bus") {
      const isBackboneCut = brokenLinks["backbone-AB"] || brokenLinks["backbone-BC"] || brokenLinks["backbone-CD"] || brokenNodes["terminator-L"] || brokenNodes["terminator-R"];
      if (isBackboneCut) {
        return { status: "error", msg: "Główny kabel magistrali (lub terminator) został przerwany! Fala ulega odbiciu, powodując całkowity paraliż sieci dla wszystkich.", color: "text-red-500 font-extrabold animate-pulse" };
      }
      
      if (brokenNodes["A"]) return { status: "offline", msg: "Węzeł źródłowy A jest wyłączony.", color: "text-red-400" };
      if (brokenLinks["A-drop"]) return { status: "warning", msg: "Kabel przyłączeniowy Odbiorcy A jest odłączony. Tylko A stracił kontakt.", color: "text-amber-400" };
      
      const connected = ["A"];
      if (!brokenNodes["B"] && !brokenLinks["B-drop"]) connected.push("B");
      if (!brokenNodes["C"] && !brokenLinks["C-drop"]) connected.push("C");
      if (!brokenNodes["D"] && !brokenLinks["D-drop"]) connected.push("D");
      
      if (connected.length === 4) return { status: "perfect", msg: "Magistrala sprawna. Urządzenia dzielą pasmo kolizyjne poprawnie.", color: "text-emerald-400" };
      return { status: "partial", msg: `Magistrala działa częściowo. Podłączone węzły: ${connected.join(", ")}. Inne mają uszkodzone przyłącza drops.`, color: "text-yellow-400" };
    }
    
    if (selectedTopology === "ring") {
      const totalBrokenLinks = (brokenLinks["A-B"] ? 1 : 0) + (brokenLinks["B-C"] ? 1 : 0) + (brokenLinks["C-D"] ? 1 : 0) + (brokenLinks["D-A"] ? 1 : 0);
      const totalBrokenNodes = (brokenNodes["A"] ? 1 : 0) + (brokenNodes["B"] ? 1 : 0) + (brokenNodes["C"] ? 1 : 0) + (brokenNodes["D"] ? 1 : 0);
      
      if (totalBrokenNodes > 0) {
        return { status: "error", msg: "Awaria komputera w pierścieniu pojedynczym! Przerwanie transmisji żetonu (Tokena) - cała sieć leży offline.", color: "text-red-500 font-extrabold" };
      }
      
      if (totalBrokenLinks > 0) {
        if (isDualRing) {
          if (totalBrokenLinks === 1) {
            return { status: "warning", msg: "Przerwano jeden kabel! Dzięki włączeniu PODWÓJNEGO PIERŚCIENIA sieć dokonała automatycznego przełączenia (loopback) i nadal działa sprawnie.", color: "text-cyan-400 font-bold" };
          } else {
            return { status: "error", msg: "Przerwano wiele kabli w pierścieniu! Nawet podwójny pierścień nie jest w stanie zachować ciągłości pętli. Sieć offline.", color: "text-red-500" };
          }
        } else {
          return { status: "error", msg: "Przerwano kabel w pierścieniu pojedynczym! Żeton nie może powrócić, cała sieć leży offline.", color: "text-red-500 animate-pulse" };
        }
      }
      
      return { status: "perfect", msg: "Pierścień zamknięty i w pełni sprawny. Token krąży bez zakłóceń.", color: "text-emerald-400" };
    }
    
    if (selectedTopology === "mesh") {
      const nodes = ["A", "B", "C", "D"];
      const isNodeBroken = (n: string) => !!brokenNodes[n];
      
      const adj: Record<string, string[]> = {
        A: [], B: [], C: [], D: []
      };
      
      const addEdge = (u: string, v: string, linkId: string) => {
        if (!brokenLinks[linkId] && !isNodeBroken(u) && !isNodeBroken(v)) {
          adj[u].push(v);
          adj[v].push(u);
        }
      };
      
      addEdge("A", "B", "A-B");
      addEdge("B", "C", "B-C");
      addEdge("C", "D", "C-D");
      addEdge("D", "A", "D-A");
      addEdge("A", "C", "A-C");
      addEdge("B", "D", "B-D");
      
      const visited: Record<string, boolean> = { A: true };
      const queue = ["A"];
      
      if (isNodeBroken("A")) {
        return { status: "offline", msg: "Urządzenie A (Źródło) jest uszkodzone!", color: "text-red-400" };
      }
      
      while (queue.length > 0) {
        const u = queue.shift()!;
        for (const v of adj[u]) {
          if (!visited[v]) {
            visited[v] = true;
            queue.push(v);
          }
        }
      }
      
      const connected = nodes.filter(n => visited[n] && !isNodeBroken(n));
      const brokenList = nodes.filter(isNodeBroken);
      
      if (connected.length === 4) {
        return { status: "perfect", msg: "Pełna siatka sprawna! Nadmiarowe połączenia dają 100% niezawodności.", color: "text-emerald-400" };
      }
      if (connected.length === 1) {
        return { status: "error", msg: "Izolacja! Wszystkie połączenia do komputera A zostały odcięte.", color: "text-red-500" };
      }
      return { status: "partial", msg: `Siatka uszkodzona, ale samonaprawialna! Komputery [${connected.join(", ")}] nadal komunikują się dzięki alternatywnym ścieżkom. Uszkodzone komputery: [${brokenList.join(", ")}]`, color: "text-yellow-400" };
    }
    
    if (selectedTopology === "tree") {
      const isRootBroken = brokenNodes["R"];
      if (isRootBroken) return { status: "error", msg: "Router główny (korzeń) uległ awarii! Cała hierarchia drzewa straciła połączenie zewnętrzne.", color: "text-red-500" };
      
      const isS1Reachable = !brokenLinks["R-S1"] && !brokenNodes["S1"];
      const isS2Reachable = !brokenLinks["R-S2"] && !brokenNodes["S2"];
      
      const connected: string[] = ["Router"];
      if (isS1Reachable) connected.push("Switch 1");
      if (isS2Reachable) connected.push("Switch 2");
      
      if (isS1Reachable && !brokenLinks["S1-A1"] && !brokenNodes["A1"]) connected.push("PC A1");
      if (isS1Reachable && !brokenLinks["S1-A2"] && !brokenNodes["A2"]) connected.push("PC A2");
      
      if (isS2Reachable && !brokenLinks["S2-B1"] && !brokenNodes["B1"]) connected.push("PC B1");
      if (isS2Reachable && !brokenLinks["S2-B2"] && !brokenNodes["B2"]) connected.push("PC B2");
      
      const totalNodesCount = 7;
      const activeNodesCount = connected.length;
      
      if (activeNodesCount === totalNodesCount) {
        return { status: "perfect", msg: "Topologia drzewa działa bez zarzutu. Gałęzie rozgłaszają sygnały prawidłowo.", color: "text-emerald-400" };
      }
      if (activeNodesCount <= 1) {
        return { status: "error", msg: "Główny rozgałęźnik przerwany. Cała sieć jest sparaliżowana.", color: "text-red-500" };
      }
      return { status: "partial", msg: `Sieć drzewiasta podzielona. Aktywne węzły: ${connected.join(", ")}. Awaria switcha odcięła całą gałąź!`, color: "text-yellow-400" };
    }
    
    return { status: "perfect", msg: "Weryfikacja...", color: "text-slate-400" };
  };

  return (
    <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col space-y-6" id="topology-viewer-component">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-5 gap-4">
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded">
              Eksplorator Struktur Sieciowych
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-white mt-1.5 flex items-center">
            <Network className="w-5 h-5 mr-2 text-purple-400" />
            Interaktywny Analizator Topologii (TopologyViewer)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
            Topologia sieciowa określa logiczne lub fizyczne połączenia maszyn. 
            <strong> Klikaj na przewody i węzły </strong>, by zasymulować awarie zasilania bądź usterki fizyczne, i poznaj mocne oraz słabe strony każdego rozwiązania.
          </p>
        </div>

        {/* Quick Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 font-sans">
          <button
            onClick={triggerTopoPacketAnimation}
            disabled={topoPacketActive}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              topoPacketActive
                ? "bg-purple-950/20 border-purple-800/40 text-purple-400/60 cursor-not-allowed"
                : "bg-purple-950/40 border-purple-800/60 text-purple-300 hover:bg-purple-900/40 hover:text-white"
            }`}
          >
            <Zap className={`w-3.5 h-3.5 text-purple-400 ${topoPacketActive ? "animate-bounce" : ""}`} />
            <span>{topoPacketActive ? "Transmisja..." : "Symuluj Pakiet"}</span>
          </button>
          <button
            onClick={resetTopologySim}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resetuj Usterki</span>
          </button>
        </div>
      </div>

      {/* Inner Grid: Topology Selectors & SVG visualizer & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Topology buttons & status (Span 4) */}
        <div className="lg:col-span-12 xl:col-span-4 flex flex-col justify-between space-y-4 font-sans">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Wybierz typ topologii:</h4>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: "star", name: "Topologia Gwiazdy", eng: "Star Topology", icon: Star, color: "hover:border-yellow-500/50" },
                { id: "bus", name: "Topologia Magistrali", eng: "Bus Topology", icon: Cable, color: "hover:border-cyan-500/50" },
                { id: "ring", name: "Topologia Pierścienia", eng: "Ring Topology", icon: Circle, color: "hover:border-red-500/50" },
                { id: "mesh", name: "Topologia Siatki (Mesh)", eng: "Mesh Topology", icon: Share2, color: "hover:border-emerald-500/50" },
                { id: "tree", name: "Topologia Drzewa", eng: "Tree Topology", icon: GitBranch, color: "hover:border-indigo-500/50" },
              ].map((topo) => {
                const isSel = selectedTopology === topo.id;
                const Icon = topo.icon;
                return (
                  <button
                    key={topo.id}
                    onClick={() => {
                      setSelectedTopology(topo.id as any);
                      setBrokenLinks({});
                      setBrokenNodes({});
                      setTopoPacketActive(false);
                      setTopoPacketStep(-1);
                    }}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      isSel
                        ? "bg-purple-950/20 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)] font-bold"
                        : `bg-slate-950/50 border-slate-900 text-slate-400 ${topo.color}`
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-1.5 rounded-lg border ${isSel ? "bg-purple-500/10 border-purple-500/30 text-purple-400" : "bg-slate-900 border-slate-800 text-slate-500"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs leading-tight font-semibold text-slate-200">{topo.name}</p>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">{topo.eng}</p>
                      </div>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSel ? "bg-purple-400" : "bg-transparent"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Status Output */}
          {(() => {
            const info = getTopologyStatus();
            return (
              <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3.5 space-y-2 mt-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-slate-500 block">Zdiagnozowany Stan Sieci:</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                    info.status === "perfect"
                      ? "bg-emerald-950/50 text-emerald-400 border border-emerald-800/30"
                      : info.status === "partial" || info.status === "warning"
                      ? "bg-amber-950/50 text-amber-400 border border-amber-800/30"
                      : "bg-red-950/50 text-red-400 border border-red-800/30"
                  }`}>
                    {info.status.toUpperCase()}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed font-semibold ${info.color}`}>
                  {info.msg}
                </p>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0" />
                  <span>Węzeł inicjujący / źródłowy: Komputer A</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Center: Live interactive graphic vector stage (Span 5) */}
        <div className="lg:col-span-12 xl:col-span-5 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
          
          {/* Legend / Tooltip indicator at top */}
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mb-3 select-none">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Sprawne
              <span className="w-2 h-2 rounded-full bg-red-500 ml-1.5" /> Awaria
            </span>
            <span>Klikaj linie lub urządzenia, by popsuć</span>
          </div>

          {/* Simulated Live SVG Drawing Canvas based on chosen topology */}
          <div className="flex-1 flex items-center justify-center py-2 relative">
            
            {/* Star Topology */}
            {selectedTopology === "star" && (
              <svg className="w-full max-w-[340px] h-[230px]" viewBox="0 0 300 200">
                <defs>
                  <radialGradient id="switch-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                {/* Central Switch glow on healthy */}
                {!brokenNodes["switch"] && (
                  <circle cx="150" cy="100" r="38" fill="url(#switch-glow)" />
                )}

                {/* Lines radiating to nodes: A, B, C, D */}
                {[
                  { id: "switch-A", x1: 150, y1: 100, x2: 60, y2: 45, nodeId: "A" },
                  { id: "switch-B", x1: 150, y1: 100, x2: 240, y2: 45, nodeId: "B" },
                  { id: "switch-C", x1: 150, y1: 100, x2: 60, y2: 155, nodeId: "C" },
                  { id: "switch-D", x1: 150, y1: 100, x2: 240, y2: 155, nodeId: "D" },
                ].map((l) => {
                  const isBroken = brokenLinks[l.id] || brokenNodes["switch"] || brokenNodes[l.nodeId];
                  return (
                    <g key={l.id} className="group">
                      {/* Interactive fat outline for easier clicking */}
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke="transparent" strokeWidth="12"
                        className="cursor-pointer"
                        onClick={() => toggleLink(l.id)}
                      />
                      {/* Display Line */}
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke={isBroken ? "#f43f5e" : "#06b6d4"}
                        strokeWidth="2.5"
                        strokeDasharray={isBroken ? "4,4" : "none"}
                        className="transition-colors duration-300"
                      />
                      {/* Animated flowing data packets */}
                      {topoPacketActive && !isBroken && (
                        <circle r="4.5" fill="#f472b6" className="shadow-lg">
                          <animateMotion
                            path={`M ${l.x2} ${l.y2} L ${l.x1} ${l.y1} Z`}
                            dur="1.2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                      {/* Broken wire X indicator */}
                      {brokenLinks[l.id] && (
                        <g transform={`translate(${(l.x1 + l.x2)/2}, ${(l.y1 + l.y2)/2})`}>
                          <circle r="7" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
                          <text y="2.5" textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="extrabold" fontFamily="sans-serif">X</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Center Node (Switch) */}
                <g 
                  onClick={() => toggleNode("switch")}
                  className="cursor-pointer group"
                >
                  <circle 
                    cx="150" cy="100" r="18" 
                    fill={brokenNodes["switch"] ? "#7f1d1d" : "#581c87"} 
                    stroke={brokenNodes["switch"] ? "#f43f5e" : "#c084fc"} 
                    strokeWidth="2"
                  />
                  <Server className={`w-5 h-5 text-purple-200 absolute`} style={{ transform: 'translate(140px, 90px)' }} />
                  <text x="150" y="125" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold" fontFamily="monospace">SWITCH</text>
                </g>

                {/* Peripheral Client Nodes (A, B, C, D) */}
                {[
                  { id: "A", name: "PC A (Źródło)", x: 60, y: 45, ip: "192.168.1.10" },
                  { id: "B", name: "PC B", x: 240, y: 45, ip: "192.168.1.11" },
                  { id: "C", name: "PC C", x: 60, y: 155, ip: "192.168.1.12" },
                  { id: "D", name: "PC D", x: 240, y: 155, ip: "192.168.1.13" },
                ].map((node) => {
                  const isSwitchBroken = brokenNodes["switch"];
                  const isMyLinkBroken = brokenLinks[`switch-${node.id}`] || brokenLinks["switch-A"];
                  const isNodeOffline = brokenNodes[node.id] || brokenNodes["A"];
                  const isUnreachable = isSwitchBroken || isMyLinkBroken || isNodeOffline;
                  
                  return (
                    <g 
                      key={node.id} 
                      onClick={() => toggleNode(node.id)}
                      className="cursor-pointer group"
                    >
                      <circle 
                        cx={node.x} cy={node.y} r="16" 
                        fill={brokenNodes[node.id] ? "#4c0519" : isUnreachable ? "#334155" : "#115e59"} 
                        stroke={brokenNodes[node.id] ? "#f43f5e" : isUnreachable ? "#64748b" : "#2dd4bf"} 
                        strokeWidth="2"
                        className="transition-colors duration-300"
                      />
                      <Laptop className="w-4 h-4 text-slate-300 absolute" style={{ transform: `translate(${node.x - 8}px, ${node.y - 8}px)` }} />
                      <text x={node.x} y={node.y + 26} textAnchor="middle" fill={isUnreachable ? "#94a3b8" : "#2dd4bf"} fontSize="8.5" fontWeight="bold" fontFamily="monospace">{node.name}</text>
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Bus Topology */}
            {selectedTopology === "bus" && (
              <svg className="w-full max-w-[340px] h-[230px]" viewBox="0 0 300 200">
                {/* Backbone horizontal bus cable line segment cuts */}
                {[
                  { id: "backbone-AB", x1: 60, y1: 110, x2: 130, y2: 110 },
                  { id: "backbone-BC", x1: 130, y1: 110, x2: 200, y2: 110 },
                  { id: "backbone-CD", x1: 200, y1: 110, x2: 240, y2: 110 },
                ].map((seg) => {
                  const isSegCut = brokenLinks[seg.id];
                  return (
                    <g key={seg.id} className="group">
                      <line
                        x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                        stroke="transparent" strokeWidth="12"
                        className="cursor-pointer"
                        onClick={() => toggleLink(seg.id)}
                      />
                      <line
                        x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                        stroke={isSegCut ? "#f43f5e" : "#0284c7"}
                        strokeWidth="4"
                        strokeDasharray={isSegCut ? "4,4" : "none"}
                      />
                      {isSegCut && (
                        <g transform={`translate(${(seg.x1+seg.x2)/2}, ${seg.y1})`}>
                          <circle r="7" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
                          <text y="2.5" textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="bold">X</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Left and Right Terminators (50Ω) */}
                <g onClick={() => toggleNode("terminator-L")} className="cursor-pointer">
                  <line x1="20" y1="110" x2="60" y2="110" stroke={brokenNodes["terminator-L"] ? "#f43f5e" : "#0284c7"} strokeWidth="4" />
                  <rect x="15" y="100" width="10" height="20" fill={brokenNodes["terminator-L"] ? "#7f1d1d" : "#0369a1"} rx="2" />
                  <text x="20" y="90" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">T 50Ω</text>
                </g>
                <g onClick={() => toggleNode("terminator-R")} className="cursor-pointer">
                  <line x1="240" y1="110" x2="280" y2="110" stroke={brokenNodes["terminator-R"] ? "#f43f5e" : "#0284c7"} strokeWidth="4" />
                  <rect x="275" y="100" width="10" height="20" fill={brokenNodes["terminator-R"] ? "#7f1d1d" : "#0369a1"} rx="2" />
                  <text x="280" y="90" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">T 50Ω</text>
                </g>

                {/* Vertical drops (drop lines) */}
                {[
                  { id: "A-drop", x: 60, y1: 110, y2: 65, nodeId: "A" },
                  { id: "B-drop", x: 120, y1: 110, y2: 65, nodeId: "B" },
                  { id: "C-drop", x: 180, y1: 110, y2: 65, nodeId: "C" },
                  { id: "D-drop", x: 240, y1: 110, y2: 65, nodeId: "D" },
                ].map((drop) => {
                  const isDropCut = brokenLinks[drop.id] || brokenLinks["backbone-AB"] || brokenLinks["backbone-BC"] || brokenLinks["backbone-CD"] || brokenNodes["terminator-L"] || brokenNodes["terminator-R"];
                  const isBroken = isDropCut || brokenNodes[drop.nodeId];
                  return (
                    <g key={drop.id} className="group">
                      <line
                        x1={drop.x} y1={drop.y1} x2={drop.x} y2={drop.y2}
                        stroke="transparent" strokeWidth="10"
                        className="cursor-pointer"
                        onClick={() => toggleLink(drop.id)}
                      />
                      <line
                        x1={drop.x} y1={drop.y1} x2={drop.x} y2={drop.y2}
                        stroke={isBroken ? "#f43f5e" : "#0ea5e9"}
                        strokeWidth="2"
                      />
                      {topoPacketActive && !isBroken && (
                        <circle r="4" fill="#fb7185">
                          <animateMotion
                            path={`M ${drop.x} 110 L ${drop.x} 65 Z`}
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Client nodes above the bus line */}
                {[
                  { id: "A", name: "PC A (Src)", x: 60, y: 50 },
                  { id: "B", name: "PC B", x: 120, y: 50 },
                  { id: "C", name: "PC C", x: 180, y: 50 },
                  { id: "D", name: "PC D", x: 240, y: 50 },
                ].map((node) => {
                  const isBackboneBroken = brokenLinks["backbone-AB"] || brokenLinks["backbone-BC"] || brokenLinks["backbone-CD"] || brokenNodes["terminator-L"] || brokenNodes["terminator-R"];
                  const isMyDropBroken = brokenLinks[`${node.id}-drop`] || brokenLinks["A-drop"];
                  const isUnreachable = isBackboneBroken || isMyDropBroken || brokenNodes[node.id] || brokenNodes["A"];
                  
                  return (
                    <g key={node.id} onClick={() => toggleNode(node.id)} className="cursor-pointer group">
                      <circle
                        cx={node.x} cy={node.y} r="14"
                        fill={brokenNodes[node.id] ? "#4c0519" : isUnreachable ? "#334155" : "#0284c7"}
                        stroke={brokenNodes[node.id] ? "#f43f5e" : isUnreachable ? "#64748b" : "#38bdf8"}
                        strokeWidth="2"
                      />
                      <Laptop className="w-3.5 h-3.5 text-slate-200 absolute" style={{ transform: `translate(${node.x - 7}px, ${node.y - 7}px)` }} />
                      <text x={node.x} y={node.y - 22} textAnchor="middle" fill={isUnreachable ? "#64748b" : "#38bdf8"} fontSize="8" fontWeight="bold" fontFamily="monospace">{node.name}</text>
                    </g>
                  );
                })}

                <text x="150" y="170" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">
                  *W magistrali uszkodzenie kabla głównego powoduje odbicia fali i paraliż całej sieci.
                </text>
              </svg>
            )}

            {/* Ring Topology */}
            {selectedTopology === "ring" && (
              <svg className="w-full max-w-[340px] h-[230px]" viewBox="0 0 300 200">
                {/* Inner Dual Ring if enabled */}
                {isDualRing && (
                  <circle cx="150" cy="100" r="45" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" className="opacity-70" />
                )}

                {/* Ring lines connecting A-B-C-D-A */}
                {[
                  { id: "A-B", x1: 150, y1: 40, x2: 240, y2: 100 },
                  { id: "B-C", x1: 240, y1: 100, x2: 150, y2: 160 },
                  { id: "C-D", x1: 150, y1: 160, x2: 60, y2: 100 },
                  { id: "D-A", x1: 60, y1: 100, x2: 150, y2: 40 },
                ].map((l) => {
                  const isCut = brokenLinks[l.id];
                  return (
                    <g key={l.id} className="group">
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke="transparent" strokeWidth="12"
                        className="cursor-pointer"
                        onClick={() => toggleLink(l.id)}
                      />
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke={isCut ? "#f43f5e" : "#e11d48"}
                        strokeWidth="2.5"
                        strokeDasharray={isCut ? "3,3" : "none"}
                      />
                      {isCut && (
                        <g transform={`translate(${(l.x1+l.x2)/2}, ${(l.y1+l.y2)/2})`}>
                          <circle r="7" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
                          <text y="2.5" textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="bold">X</text>
                        </g>
                      )}
                      {/* Token / Packet rotation along the loop */}
                      {topoPacketActive && !isCut && !brokenNodes["A"] && !brokenNodes["B"] && !brokenNodes["C"] && !brokenNodes["D"] && (
                        <circle r="5" fill="#f43f5e">
                          <animateMotion
                            path={`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`}
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Ring nodes (A, B, C, D) */}
                {[
                  { id: "A", name: "PC A (Src)", x: 150, y: 40 },
                  { id: "B", name: "PC B", x: 240, y: 100 },
                  { id: "C", name: "PC C", x: 150, y: 160 },
                  { id: "D", name: "PC D", x: 60, y: 100 },
                ].map((node) => {
                  const totalBrokenLinks = (brokenLinks["A-B"] ? 1 : 0) + (brokenLinks["B-C"] ? 1 : 0) + (brokenLinks["C-D"] ? 1 : 0) + (brokenLinks["D-A"] ? 1 : 0);
                  const isAnyNodeBroken = brokenNodes["A"] || brokenNodes["B"] || brokenNodes["C"] || brokenNodes["D"];
                  const isRingSevered = totalBrokenLinks > 0 && (!isDualRing || totalBrokenLinks > 1);
                  const isUnreachable = isAnyNodeBroken || isRingSevered;
                  
                  return (
                    <g key={node.id} onClick={() => toggleNode(node.id)} className="cursor-pointer group">
                      <circle
                        cx={node.x} cy={node.y} r="15"
                        fill={brokenNodes[node.id] ? "#4c0519" : isUnreachable ? "#334155" : "#9f1239"}
                        stroke={brokenNodes[node.id] ? "#f43f5e" : isUnreachable ? "#64748b" : "#fda4af"}
                        strokeWidth="2"
                      />
                      <Laptop className="w-3.5 h-3.5 text-slate-200 absolute" style={{ transform: `translate(${node.x - 7}px, ${node.y - 7}px)` }} />
                      <text x={node.x} y={node.y - 22} textAnchor="middle" fill={isUnreachable ? "#64748b" : "#fda4af"} fontSize="8" fontWeight="bold" fontFamily="monospace">{node.name}</text>
                    </g>
                  );
                })}

                {/* Dual Ring Control Overlay */}
                <g transform="translate(10, 190)" className="cursor-pointer font-sans" onClick={() => setIsDualRing(!isDualRing)}>
                  <rect width="130" height="18" fill="#1e1b4b" stroke="#e11d48" strokeWidth="1" rx="4" />
                  <text x="65" y="12" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold">
                    {isDualRing ? "✓ PODWÓJNY PIERŚCIEŃ (Dual)" : "Włącz Podwójny Pierścień"}
                  </text>
                </g>
              </svg>
            )}

            {/* Mesh Topology */}
            {selectedTopology === "mesh" && (
              <svg className="w-full max-w-[340px] h-[230px]" viewBox="0 0 300 200">
                {[
                  { id: "A-B", x1: 70, y1: 50, x2: 230, y2: 50 },
                  { id: "B-C", x1: 230, y1: 50, x2: 230, y2: 150 },
                  { id: "C-D", x1: 230, y1: 150, x2: 70, y2: 150 },
                  { id: "D-A", x1: 70, y1: 150, x2: 70, y2: 50 },
                  { id: "A-C", x1: 70, y1: 50, x2: 230, y2: 150 },
                  { id: "B-D", x1: 230, y1: 50, x2: 70, y2: 150 },
                ].map((l) => {
                  const isCut = brokenLinks[l.id];
                  return (
                    <g key={l.id} className="group">
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke="transparent" strokeWidth="10"
                        className="cursor-pointer"
                        onClick={() => toggleLink(l.id)}
                      />
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke={isCut ? "#f43f5e" : "#059669"}
                        strokeWidth="2"
                        strokeDasharray={isCut ? "3,3" : "none"}
                      />
                      {isCut && (
                        <g transform={`translate(${(l.x1+l.x2)/2}, ${(l.y1+l.y2)/2})`}>
                          <circle r="6" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1" />
                          <text y="2" textAnchor="middle" fill="#f43f5e" fontSize="6.5" fontWeight="bold">X</text>
                        </g>
                      )}
                      {topoPacketActive && !isCut && (
                        <circle r="4" fill="#a7f3d0">
                          <animateMotion
                            path={`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`}
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Mesh Nodes (A, B, C, D) */}
                {[
                  { id: "A", name: "PC A (Src)", x: 70, y: 50 },
                  { id: "B", name: "PC B", x: 230, y: 50 },
                  { id: "C", name: "PC C", x: 230, y: 150 },
                  { id: "D", name: "PC D", x: 70, y: 150 },
                ].map((node) => {
                  const isNodeBroken = (n: string) => !!brokenNodes[n];
                  const adj: Record<string, string[]> = { A: [], B: [], C: [], D: [] };
                  const addE = (u: string, v: string, linkId: string) => {
                    if (!brokenLinks[linkId] && !isNodeBroken(u) && !isNodeBroken(v)) {
                      adj[u].push(v);
                      adj[v].push(u);
                    }
                  };
                  addE("A", "B", "A-B"); addE("B", "C", "B-C"); addE("C", "D", "C-D"); addE("D", "A", "D-A");
                  addE("A", "C", "A-C"); addE("B", "D", "B-D");
                  
                  const visited: Record<string, boolean> = { A: true };
                  const queue = ["A"];
                  if (!isNodeBroken("A")) {
                    while (queue.length > 0) {
                      const u = queue.shift()!;
                      for (const v of adj[u]) {
                        if (!visited[v]) {
                          visited[v] = true;
                          queue.push(v);
                        }
                      }
                    }
                  }
                  
                  const isUnreachable = isNodeBroken("A") || isNodeBroken(node.id) || !visited[node.id];
                  
                  return (
                    <g key={node.id} onClick={() => toggleNode(node.id)} className="cursor-pointer group">
                      <circle
                        cx={node.x} cy={node.y} r="15"
                        fill={brokenNodes[node.id] ? "#4c0519" : isUnreachable ? "#334155" : "#064e3b"}
                        stroke={brokenNodes[node.id] ? "#f43f5e" : isUnreachable ? "#64748b" : "#34d399"}
                        strokeWidth="2"
                      />
                      <Laptop className="w-3.5 h-3.5 text-slate-200 absolute" style={{ transform: `translate(${node.x - 7}px, ${node.y - 7}px)` }} />
                      <text x={node.x} y={node.y - 22} textAnchor="middle" fill={isUnreachable ? "#64748b" : "#34d399"} fontSize="8" fontWeight="bold" fontFamily="monospace">{node.name}</text>
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Tree Topology */}
            {selectedTopology === "tree" && (
              <svg className="w-full max-w-[340px] h-[230px]" viewBox="0 0 300 200">
                {[
                  { id: "R-S1", x1: 150, y1: 30, x2: 80, y2: 90 },
                  { id: "R-S2", x1: 150, y1: 30, x2: 220, y2: 90 },
                ].map((l) => {
                  const isCut = brokenLinks[l.id] || brokenNodes["R"];
                  return (
                    <g key={l.id} className="group">
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke="transparent" strokeWidth="10"
                        className="cursor-pointer"
                        onClick={() => toggleLink(l.id)}
                      />
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke={isCut ? "#f43f5e" : "#4338ca"}
                        strokeWidth="2.5"
                        strokeDasharray={isCut ? "3,3" : "none"}
                      />
                      {isCut && (
                        <g transform={`translate(${(l.x1+l.x2)/2}, ${(l.y1+l.y2)/2})`}>
                          <circle r="6" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1" />
                          <text y="2" textAnchor="middle" fill="#f43f5e" fontSize="6.5" fontWeight="bold">X</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {[
                  { id: "S1-A1", x1: 80, y1: 90, x2: 45, y2: 150, parent: "R-S1", parentNode: "S1" },
                  { id: "S1-A2", x1: 80, y1: 90, x2: 115, y2: 150, parent: "R-S1", parentNode: "S1" },
                  { id: "S2-B1", x1: 220, y1: 90, x2: 185, y2: 150, parent: "R-S2", parentNode: "S2" },
                  { id: "S2-B2", x1: 220, y1: 90, x2: 255, y2: 150, parent: "R-S2", parentNode: "S2" },
                ].map((l) => {
                  const isCut = brokenLinks[l.id] || brokenLinks[l.parent] || brokenNodes["R"] || brokenNodes[l.parentNode];
                  return (
                    <g key={l.id} className="group">
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke="transparent" strokeWidth="10"
                        className="cursor-pointer"
                        onClick={() => toggleLink(l.id)}
                      />
                      <line
                        x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                        stroke={isCut ? "#f43f5e" : "#6366f1"}
                        strokeWidth="2"
                        strokeDasharray={isCut ? "3,3" : "none"}
                      />
                      {isCut && (
                        <g transform={`translate(${(l.x1+l.x2)/2}, ${(l.y1+l.y2)/2})`}>
                          <circle r="6" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1" />
                          <text y="2" textAnchor="middle" fill="#f43f5e" fontSize="6.5" fontWeight="bold">X</text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Root Router node */}
                <g onClick={() => toggleNode("R")} className="cursor-pointer">
                  <circle cx="150" cy="30" r="14" fill={brokenNodes["R"] ? "#7f1d1d" : "#311042"} stroke={brokenNodes["R"] ? "#f43f5e" : "#d946ef"} strokeWidth="2" />
                  <Router className="w-4 h-4 text-slate-300 absolute" style={{ transform: "translate(142px, 22px)" }} />
                  <text x="150" y="15" textAnchor="middle" fill="#d946ef" fontSize="8" fontWeight="bold" fontFamily="monospace">ROUTER (KORZEŃ)</text>
                </g>

                {/* Sub-Switches */}
                {[
                  { id: "S1", name: "Switch 1", x: 80, y: 90, parentLink: "R-S1" },
                  { id: "S2", name: "Switch 2", x: 220, y: 90, parentLink: "R-S2" },
                ].map((sw) => {
                  const isUnreachable = brokenNodes["R"] || brokenLinks[sw.parentLink];
                  return (
                    <g key={sw.id} onClick={() => toggleNode(sw.id)} className="cursor-pointer">
                      <circle cx={sw.x} cy={sw.y} r="13" fill={brokenNodes[sw.id] ? "#7f1d1d" : isUnreachable ? "#334155" : "#31108f"} stroke={brokenNodes[sw.id] ? "#f43f5e" : isUnreachable ? "#64748b" : "#818cf8"} strokeWidth="2" />
                      <Server className="w-3.5 h-3.5 text-slate-350 absolute" style={{ transform: `translate(${sw.x - 7}px, ${sw.y - 7}px)` }} />
                      <text x={sw.x} y={sw.y + 24} textAnchor="middle" fill={isUnreachable ? "#64748b" : "#818cf8"} fontSize="8" fontWeight="bold" fontFamily="monospace">{sw.name}</text>
                    </g>
                  );
                })}

                {/* Client nodes (A1, A2, B1, B2) */}
                {[
                  { id: "A1", name: "PC A1", x: 45, y: 150, sw: "S1", parentLink: "S1-A1", pParent: "R-S1" },
                  { id: "A2", name: "PC A2", x: 115, y: 150, sw: "S1", parentLink: "S1-A2", pParent: "R-S1" },
                  { id: "B1", name: "PC B1", x: 185, y: 150, sw: "S2", parentLink: "S2-B1", pParent: "R-S2" },
                  { id: "B2", name: "PC B2", x: 255, y: 150, sw: "S2", parentLink: "S2-B2", pParent: "R-S2" },
                ].map((node) => {
                  const isUnreachable = brokenNodes["R"] || brokenNodes[node.sw] || brokenLinks[node.pParent] || brokenLinks[node.parentLink] || brokenNodes[node.id];
                  return (
                    <g key={node.id} onClick={() => toggleNode(node.id)} className="cursor-pointer">
                      <circle cx={node.x} cy={node.y} r="12" fill={brokenNodes[node.id] ? "#4c0519" : isUnreachable ? "#1e293b" : "#1e1b4b"} stroke={brokenNodes[node.id] ? "#f43f5e" : isUnreachable ? "#475569" : "#a5b4fc"} strokeWidth="1.5" />
                      <Laptop className="w-3 h-3 text-slate-350 absolute" style={{ transform: `translate(${node.x - 6}px, ${node.y - 6}px)` }} />
                      <text x={node.x} y={node.y + 22} textAnchor="middle" fill={isUnreachable ? "#475569" : "#a5b4fc"} fontSize="7.5" fontWeight="bold" fontFamily="monospace">{node.name}</text>
                    </g>
                  );
                })}
              </svg>
            )}

          </div>

          {/* Bottom mini tip */}
          <div className="text-center text-[10.5px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-900 font-sans mt-2">
            💡 <strong>Diagnostyka:</strong> Przetnij dowolny przewód klikając w niego. Zobaczysz jak informacja zwrotna na panelu po lewej stronie natychmiastowo zmienia status połączenia.
          </div>
        </div>

        {/* Right: Technical specifications and Quiz tab (Span 3) */}
        <div className="lg:col-span-12 xl:col-span-3 bg-slate-950/40 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between font-sans text-left">
          
          <div className="space-y-4 flex flex-col justify-between h-full">
            <div>
              <div className="border-b border-slate-900 pb-3">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400">Specyfikacja Techniczna</span>
                <h4 className="text-xs font-extrabold text-slate-200 mt-0.5">
                  {selectedTopology === "star" && "PARAMETRY GWIAZDY"}
                  {selectedTopology === "bus" && "PARAMETRY MAGISTRALI"}
                  {selectedTopology === "ring" && "PARAMETRY PIERŚCIENIA"}
                  {selectedTopology === "mesh" && "PARAMETRY SIATKI"}
                  {selectedTopology === "tree" && "PARAMETRY DRZEWA"}
                </h4>
              </div>

              {/* Characteristics info lists */}
              <div className="space-y-2 text-xs mt-3">
                {/* Reliability rating */}
                <div className="flex justify-between items-center border-b border-slate-900/60 pb-1.5">
                  <span className="text-slate-500 font-mono text-[10px]">ODPORNOŚĆ</span>
                  <span className={`font-mono font-bold text-[10.5px] ${
                    selectedTopology === "mesh" ? "text-emerald-400" :
                    selectedTopology === "star" || selectedTopology === "tree" ? "text-cyan-400" :
                    selectedTopology === "ring" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {selectedTopology === "star" && "Średnia (Switch = SPF)"}
                    {selectedTopology === "bus" && "Niska (Kabel = SPF)"}
                    {selectedTopology === "ring" && "Niska (Każdy węzeł)"}
                    {selectedTopology === "mesh" && "Ekstremalna (Pełna)"}
                    {selectedTopology === "tree" && "Średnia (Hierarchiczna)"}
                  </span>
                </div>

                {/* Cost */}
                <div className="flex justify-between items-center border-b border-slate-900/60 pb-1.5">
                  <span className="text-slate-500 font-mono text-[10px]">KOSZT</span>
                  <span className="font-bold text-slate-300">
                    {selectedTopology === "star" && "Średni"}
                    {selectedTopology === "bus" && "Bardzo niski"}
                    {selectedTopology === "ring" && "Niski"}
                    {selectedTopology === "mesh" && "Bardzo wysoki"}
                    {selectedTopology === "tree" && "Średnio-wysoki"}
                  </span>
                </div>

                {/* Cabling type */}
                <div className="flex justify-between items-center border-b border-slate-900/60 pb-1.5">
                  <span className="text-slate-500 font-mono text-[10px]">OKABLOWANIE</span>
                  <span className="text-slate-400 text-right text-[10.5px]">
                    {selectedTopology === "star" && "Skrętka miedziana RJ-45"}
                    {selectedTopology === "bus" && "Kabel koncentryczny RG-58"}
                    {selectedTopology === "ring" && "Skrętka / Światłowód"}
                    {selectedTopology === "mesh" && "Wielokrotna Skrętka / Fibra"}
                    {selectedTopology === "tree" && "Skrętka / Światłowód szkieletowy"}
                  </span>
                </div>

                {/* Advantages */}
                <div className="pt-2">
                  <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">ZALETY:</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {selectedTopology === "star" && "Łatwa rozbudowa, awaria jednego kabla nie wpływa na resztę, łatwa diagnostyka."}
                    {selectedTopology === "bus" && "Bardzo prosta budowa, minimalne zużycie przewodów, brak konieczności zakupu switchów."}
                    {selectedTopology === "ring" && "Brak kolizji pakietów (dzięki Tokenowi), przewidywalne opóźnienia, równe obciążenie."}
                    {selectedTopology === "mesh" && "Maksymalne bezpieczeństwo i przepustowość. Awaria pojedynczych kabli nie przerywa pracy sieci."}
                    {selectedTopology === "tree" && "Struktura hierarchiczna ułatwia grupowanie urządzeń (np. piętra biura), łatwa diagnostyka."}
                  </p>
                </div>

                {/* Disadvantages */}
                <div className="pt-2">
                  <h5 className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">WADY:</h5>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {selectedTopology === "star" && "Awaria centralnego Switcha wyłącza całą sieć. Wymaga dużej ilości kabla RJ-45."}
                    {selectedTopology === "bus" && "Awaria głównego kabla szkieletowego paraliżuje całą komunikację z powodu odbić fal."}
                    {selectedTopology === "ring" && "Awaria jednego komputera w pętli paraliżuje całą strukturę. Trudna rekonfiguracja."}
                    {selectedTopology === "mesh" && "Ogromny koszt, skomplikowana konfiguracja ruterów i zapotrzebowanie na tysiące portów."}
                    {selectedTopology === "tree" && "Awaria przełącznika dystrybucyjnego odcina całe piętro (całą gałąź sieci od korzenia)."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2 mt-4">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">Zintegrowany Sprawdzian:</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Pytania dotyczące topologii i diagnostyki sieci zostały scalone z certyfikowanym <strong>Quizem Wiedzy</strong>. Sprawdź swoje siły w pełnym teście!
              </p>
              
              <button
                onClick={() => {
                  if (onSwitchToQuiz) {
                    onSwitchToQuiz();
                  }
                }}
                className="w-full mt-2 py-2 bg-purple-900/40 hover:bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5 rounded-lg shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>Uruchom Quiz Wiedzy</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
