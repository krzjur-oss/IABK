/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Vec3, Face, ComponentInfo, DeviceType } from "../types";
import { RotateCw, ZoomIn, ZoomOut, Sparkles, HelpCircle, Layers } from "lucide-react";

interface PC3DViewerProps {
  selectedComponent: ComponentInfo | null;
  onSelectComponent: (comp: ComponentInfo) => void;
  deviceType: DeviceType;
  componentsList: ComponentInfo[];
  theme?: "light" | "dark";
}

export default function PC3DViewer({
  selectedComponent,
  onSelectComponent,
  deviceType,
  componentsList,
  theme = "dark"
}: PC3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Viewport State
  const [yaw, setYaw] = useState<number>(0.7); // rotacja pozioma
  const [pitch, setPitch] = useState<number>(0.3); // rotacja pionowa
  const [zoom, setZoom] = useState<number>(35); // współczynnik powiększenia
  const [explode, setExplode] = useState<number>(0); // wartość rozbicia komponentów (0 - 1)
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  // Canvas dynamic scaling state to prevent mobile viewport distorting/shifting
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = () => {
      const rect = parent.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setCanvasSize({ width, height });
    });

    updateSize(); // initial update
    resizeObserver.observe(parent);
    
    // Fallback for window orientation changes
    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Mouse drag states
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchMovedRef = useRef<boolean>(false);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging.current) return;
    let animationId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setYaw((prev) => (prev + delta * 0.15) % (Math.PI * 2));
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [autoRotate]);

  // Make 3D points representing standard motherboard, GPU, cooler, etc.
  const pcParts = useMemo(() => {
    let partsData: Array<{
      id: string;
      label: string;
      color: string;
      outlineColor: string;
      explodeOffset: Vec3;
      cubes: Array<{
        cx: number;
        cy: number;
        cz: number;
        dx: number;
        dy: number;
        dz: number;
        customFaces?: string[];
      }>;
    }> = [];

    if (deviceType === "laptop") {
      partsData = [
        {
          id: "laptop_case",
          label: "Obudowa dolna",
          color: "rgba(51, 65, 85, 0.75)",
          outlineColor: "rgba(51, 65, 85, 1)",
          explodeOffset: { x: 0, y: -1.0, z: 0 },
          cubes: [{ cx: 0, cy: -1.2, cz: 0, dx: 4.8, dy: 0.3, dz: 4.0 }]
        },
        {
          id: "laptop_screen",
          label: "Matryca ekranu",
          color: "rgba(2, 132, 199, 0.65)",
          outlineColor: "rgba(2, 132, 199, 1)",
          explodeOffset: { x: 0, y: 1.5, z: -1.0 },
          cubes: [{ cx: 0, cy: 1.0, cz: -1.8, dx: 4.8, dy: 3.4, dz: 0.15 }]
        },
        {
          id: "laptop_battery",
          label: "Bateria laptopa",
          color: "rgba(217, 119, 6, 0.8)",
          outlineColor: "rgba(217, 119, 6, 1)",
          explodeOffset: { x: -0.6, y: -0.8, z: 1.2 },
          cubes: [{ cx: -1.1, cy: -1.0, cz: 1.0, dx: 2.1, dy: 0.15, dz: 1.3 }]
        },
        {
          id: "laptop_mobo",
          label: "Płyta główna",
          color: "rgba(5, 150, 105, 0.75)",
          outlineColor: "rgba(5, 150, 105, 1)",
          explodeOffset: { x: 0.6, y: -0.8, z: -0.6 },
          cubes: [{ cx: 0.4, cy: -1.0, cz: -0.6, dx: 3.0, dy: 0.15, dz: 2.0 }]
        },
        {
          id: "laptop_cooler",
          label: "Chłodzenie",
          color: "rgba(6, 182, 212, 0.85)",
          outlineColor: "rgba(6, 182, 212, 1)",
          explodeOffset: { x: 1.2, y: -0.5, z: -1.2 },
          cubes: [{ cx: 1.2, cy: -1.0, cz: -1.3, dx: 1.0, dy: 0.18, dz: 1.0 }]
        },
        {
          id: "laptop_keyboard",
          label: "Klawiatura",
          color: "rgba(192, 132, 252, 0.7)",
          outlineColor: "rgba(192, 132, 252, 1)",
          explodeOffset: { x: 0, y: 0.8, z: 0.8 },
          cubes: [{ cx: 0, cy: -0.9, cz: 0.6, dx: 4.4, dy: 0.12, dz: 2.4 }]
        },
        {
          id: "laptop_ssd",
          label: "Dysk SSD NVMe",
          color: "rgba(219, 39, 119, 0.95)",
          outlineColor: "rgba(219, 39, 119, 1)",
          explodeOffset: { x: -0.8, y: -0.6, z: -0.8 },
          cubes: [{ cx: -0.7, cy: -0.9, cz: -0.7, dx: 0.4, dy: 0.1, dz: 1.0 }]
        }
      ];
    } else if (deviceType === "smartphone") {
      partsData = [
        {
          id: "phone_case",
          label: "Korpus i tył",
          color: "rgba(71, 85, 105, 0.25)",
          outlineColor: "rgba(71, 85, 105, 0.8)",
          explodeOffset: { x: 0, y: 0, z: -1.4 },
          cubes: [{ cx: 0, cy: 0, cz: -0.15, dx: 2.8, dy: 5.6, dz: 0.25 }]
        },
        {
          id: "phone_screen",
          label: "Ekran AMOLED",
          color: "rgba(6, 182, 212, 0.6)",
          outlineColor: "rgba(6, 182, 212, 1)",
          explodeOffset: { x: 0, y: 0, z: 1.4 },
          cubes: [{ cx: 0, cy: 0, cz: 0.2, dx: 2.7, dy: 5.5, dz: 0.05 }]
        },
        {
          id: "phone_battery",
          label: "Bateria telefonu",
          color: "rgba(234, 88, 12, 0.85)",
          outlineColor: "rgba(234, 88, 12, 1)",
          explodeOffset: { x: -0.8, y: -0.3, z: 0 },
          cubes: [{ cx: -0.1, cy: -0.8, cz: 0.02, dx: 2.0, dy: 3.2, dz: 0.14 }]
        },
        {
          id: "phone_soc",
          label: "Procesor SoC",
          color: "rgba(220, 38, 38, 0.95)",
          outlineColor: "rgba(220, 38, 38, 1)",
          explodeOffset: { x: 0.8, y: 0.6, z: 0.4 },
          cubes: [{ cx: 0.5, cy: 1.4, cz: 0.05, dx: 0.7, dy: 0.7, dz: 0.08 }]
        },
        {
          id: "phone_camera",
          label: "Aparaty foto",
          color: "rgba(223, 24, 144, 0.85)",
          outlineColor: "rgba(223, 24, 144, 1)",
          explodeOffset: { x: -0.8, y: 1.0, z: -0.8 },
          cubes: [{ cx: -0.6, cy: 1.6, cz: -0.16, dx: 0.9, dy: 1.3, dz: 0.12 }]
        },
        {
          id: "phone_mobo",
          label: "Płyta logiczna",
          color: "rgba(22, 163, 74, 0.75)",
          outlineColor: "rgba(22, 163, 74, 1)",
          explodeOffset: { x: 0, y: 1.2, z: 0 },
          cubes: [{ cx: 0.2, cy: 1.4, cz: 0.02, dx: 2.1, dy: 2.0, dz: 0.08 }]
        },
        {
          id: "phone_memory",
          label: "Pamięć UFS / RAM",
          color: "rgba(139, 92, 246, 0.9)",
          outlineColor: "rgba(139, 92, 246, 1)",
          explodeOffset: { x: 0.6, y: 0.2, z: 0.4 },
          cubes: [{ cx: -0.4, cy: 1.1, cz: 0.05, dx: 0.5, dy: 0.5, dz: 0.08 }]
        }
      ];
    } else if (deviceType === "tablet") {
      partsData = [
        {
          id: "tablet_body",
          label: "Obudowa Ultra-thin",
          color: "rgba(71, 85, 105, 0.22)",
          outlineColor: "rgba(148, 163, 184, 0.7)",
          explodeOffset: { x: 0, y: -0.8, z: 0 },
          cubes: [{ cx: 0, cy: -0.2, cz: 0, dx: 4.8, dy: 0.15, dz: 3.6 }]
        },
        {
          id: "tablet_screen",
          label: "Ekran Liquid Retina",
          color: "rgba(14, 165, 233, 0.65)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: 0, y: 1.2, z: 0 },
          cubes: [{ cx: 0, cy: 0.2, cz: 0, dx: 4.6, dy: 0.05, dz: 3.4 }]
        },
        {
          id: "tablet_battery",
          label: "Bateria Li-Polymer (Dual-Cell)",
          color: "rgba(245, 158, 11, 0.8)",
          outlineColor: "rgba(245, 158, 11, 1)",
          explodeOffset: { x: -0.8, y: -0.4, z: 0 },
          cubes: [{ cx: -1.0, cy: -0.05, cz: 0, dx: 2.0, dy: 0.1, dz: 2.8 }]
        },
        {
          id: "tablet_soc",
          label: "Procesor SoC",
          color: "rgba(239, 68, 68, 0.95)",
          outlineColor: "rgba(239, 68, 68, 1)",
          explodeOffset: { x: 0.8, y: 0.5, z: -0.4 },
          cubes: [{ cx: 1.4, cy: 0.05, cz: -0.6, dx: 0.8, dy: 0.08, dz: 0.8 }]
        },
        {
          id: "tablet_speakers",
          label: "Czterogłośnikowy system audio",
          color: "rgba(192, 132, 252, 0.8)",
          outlineColor: "rgba(192, 132, 252, 1)",
          explodeOffset: { x: 0.8, y: -0.3, z: 0.8 },
          cubes: [
            { cx: -2.2, cy: -0.05, cz: -1.6, dx: 0.2, dy: 0.1, dz: 0.3 },
            { cx: 2.2, cy: -0.05, cz: -1.6, dx: 0.2, dy: 0.1, dz: 0.3 },
            { cx: -2.2, cy: -0.05, cz: 1.6, dx: 0.2, dy: 0.1, dz: 0.3 },
            { cx: 2.2, cy: -0.05, cz: 1.6, dx: 0.2, dy: 0.1, dz: 0.3 }
          ]
        },
        {
          id: "tablet_digitizer",
          label: "Digitizer",
          color: "rgba(16, 185, 129, 0.6)",
          outlineColor: "rgba(16, 185, 129, 1)",
          explodeOffset: { x: 0, y: 0.6, z: 0.4 },
          cubes: [{ cx: 0, cy: 0.1, cz: 0, dx: 4.54, dy: 0.03, dz: 3.34 }]
        },
        {
          id: "tablet_board",
          label: "Płyta logiczna",
          color: "rgba(219, 39, 119, 0.85)",
          outlineColor: "rgba(219, 39, 119, 1)",
          explodeOffset: { x: 0.8, y: -0.4, z: -0.6 },
          cubes: [{ cx: 1.4, cy: -0.02, cz: 0.4, dx: 1.1, dy: 0.08, dz: 2.2 }]
        }
      ];
    } else if (deviceType === "sbc") {
      partsData = [
        {
          id: "sbc_soc",
          label: "Procesor SoC ARM i Płytka",
          color: "rgba(239, 68, 68, 0.95)",
          outlineColor: "rgba(239, 68, 68, 1)",
          explodeOffset: { x: 0, y: 0.8, z: 0 },
          cubes: [
            { cx: -0.2, cy: 0.3, cz: -0.2, dx: 1.1, dy: 0.3, dz: 1.1 },
            { cx: 0, cy: -0.05, cz: 0, dx: 4.2, dy: 0.15, dz: 3.2 }
          ]
        },
        {
          id: "sbc_ram",
          label: "Pamięć LPDDR",
          color: "rgba(168, 85, 247, 0.85)",
          outlineColor: "rgba(168, 85, 247, 1)",
          explodeOffset: { x: 0.6, y: 0.6, z: 0 },
          cubes: [{ cx: 0.8, cy: 0.25, cz: -0.2, dx: 0.9, dy: 0.2, dz: 0.9 }]
        },
        {
          id: "sbc_microsd",
          label: "Slot MicroSD",
          color: "rgba(236, 72, 153, 0.9)",
          outlineColor: "rgba(236, 72, 153, 1)",
          explodeOffset: { x: -0.8, y: -0.6, z: 0 },
          cubes: [{ cx: -1.8, cy: -0.2, cz: 0, dx: 0.8, dy: 0.12, dz: 0.8 }]
        },
        {
          id: "sbc_gpio",
          label: "Gniazdo GPIO",
          color: "rgba(16, 185, 129, 0.85)",
          outlineColor: "rgba(16, 185, 129, 1)",
          explodeOffset: { x: 0, y: 0.8, z: -0.8 },
          cubes: [{ cx: 0, cy: 0.4, cz: -1.4, dx: 3.4, dy: 0.4, dz: 0.3 }]
        },
        {
          id: "sbc_hdmi",
          label: "Porty Micro-HDMI",
          color: "rgba(14, 165, 233, 0.85)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: -0.5, y: 0.4, z: 0.8 },
          cubes: [{ cx: -0.8, cy: 0.25, cz: 1.4, dx: 0.5, dy: 0.3, dz: 0.5 }]
        },
        {
          id: "sbc_wlan",
          label: "Moduł Wi-Fi / BT",
          color: "rgba(245, 158, 11, 0.85)",
          outlineColor: "rgba(245, 158, 11, 1)",
          explodeOffset: { x: -0.6, y: 0.5, z: -0.6 },
          cubes: [{ cx: -1.4, cy: 0.2, cz: -1.0, dx: 0.7, dy: 0.15, dz: 0.6 }]
        },
        {
          id: "sbc_power",
          label: "Gniazdo zasilania USB-C",
          color: "rgba(99, 102, 241, 0.85)",
          outlineColor: "rgba(99, 102, 241, 1)",
          explodeOffset: { x: -0.8, y: 0.4, z: 0.8 },
          cubes: [{ cx: -1.8, cy: 0.2, cz: 1.4, dx: 0.4, dy: 0.24, dz: 0.5 }]
        }
      ];
    } else if (deviceType === "game_console") {
      partsData = [
        {
          id: "console_case",
          label: "Obudowa kunsztowna",
          color: "rgba(71, 85, 105, 0.12)",
          outlineColor: "rgba(148, 163, 184, 0.65)",
          explodeOffset: { x: 0, y: 0, z: 0 },
          cubes: [{ cx: 0, cy: 0, cz: 0, dx: 1.8, dy: 4.8, dz: 4.4 }]
        },
        {
          id: "console_apu",
          label: "Procesor Główny APU",
          color: "rgba(239, 68, 68, 0.95)",
          outlineColor: "rgba(239, 68, 68, 1)",
          explodeOffset: { x: -0.4, y: 0.4, z: 0 },
          cubes: [{ cx: -0.1, cy: 0.4, cz: -0.2, dx: 1.2, dy: 0.2, dz: 1.2 }]
        },
        {
          id: "console_cooler",
          label: "Turbina i Radiator",
          color: "rgba(14, 165, 233, 0.8)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: 1.4, y: 0.8, z: 0 },
          cubes: [{ cx: -0.1, cy: 1.1, cz: -0.2, dx: 1.5, dy: 0.9, dz: 1.5 }]
        },
        {
          id: "console_ssd",
          label: "Szybki dysk SSD NVMe",
          color: "rgba(236, 72, 153, 0.9)",
          outlineColor: "rgba(236, 72, 153, 1)",
          explodeOffset: { x: -0.8, y: -0.6, z: 0.6 },
          cubes: [{ cx: -0.5, cy: -0.8, cz: 1.0, dx: 0.4, dy: 0.15, dz: 1.0 }]
        },
        {
          id: "console_ram",
          label: "Pamięć GDDR6",
          color: "rgba(168, 85, 247, 0.85)",
          outlineColor: "rgba(168, 85, 247, 1)",
          explodeOffset: { x: -0.6, y: 0.4, z: -0.4 },
          cubes: [
            { cx: -1.0, cy: 0.3, cz: -0.2, dx: 0.3, dy: 0.15, dz: 0.5 },
            { cx: 0.8, cy: 0.3, cz: -0.2, dx: 0.3, dy: 0.15, dz: 0.5 },
            { cx: -0.1, cy: 0.3, cz: -1.1, dx: 0.5, dy: 0.15, dz: 0.3 },
            { cx: -0.1, cy: 0.3, cz: 0.7, dx: 0.5, dy: 0.15, dz: 0.3 }
          ]
        },
        {
          id: "console_drive",
          label: "Napęd Ultra HD Blu-ray",
          color: "rgba(219, 39, 119, 0.85)",
          outlineColor: "rgba(219, 39, 119, 1)",
          explodeOffset: { x: 0.8, y: -0.4, z: -0.8 },
          cubes: [{ cx: 0.5, cy: -0.4, cz: -0.8, dx: 0.6, dy: 1.8, dz: 2.4 }]
        },
        {
          id: "console_controller",
          label: "Kontroler Bezprzewodowy",
          color: "rgba(16, 185, 129, 0.85)",
          outlineColor: "rgba(16, 185, 129, 1)",
          explodeOffset: { x: 0, y: -1.5, z: 1.2 },
          cubes: [{ cx: 0, cy: -1.8, cz: 2.8, dx: 1.8, dy: 0.6, dz: 1.1 }]
        }
      ];
    } else if (deviceType === "supercomputer") {
      partsData = [
        {
          id: "supercomputer_cabinet",
          label: "Szafa Rack Superkomputera",
          color: "rgba(71, 85, 105, 0.08)",
          outlineColor: "rgba(148, 163, 184, 0.5)",
          explodeOffset: { x: 0, y: 0, z: 0 },
          cubes: [{ cx: 0, cy: 0, cz: 0, dx: 5.6, dy: 6.8, dz: 5.6 }]
        },
        {
          id: "supercomputer_node",
          label: "Szuflady obliczeniowe typu Blade",
          color: "rgba(5, 150, 105, 0.45)",
          outlineColor: "rgba(5, 150, 105, 0.85)",
          explodeOffset: { x: 0, y: 0.8, z: 0.4 },
          cubes: [
            { cx: 0, cy: 1.4, cz: 0.2, dx: 5.0, dy: 0.4, dz: 4.8 },
            { cx: 0, cy: -1.4, cz: 0.2, dx: 5.0, dy: 0.4, dz: 4.8 }
          ]
        },
        {
          id: "supercomputer_cpu",
          label: "Wielordzeniowe Procesory",
          color: "rgba(220, 38, 38, 0.95)",
          outlineColor: "rgba(220, 38, 38, 1)",
          explodeOffset: { x: 0, y: 1.2, z: -0.4 },
          cubes: [
            { cx: -1.2, cy: 1.8, cz: -0.4, dx: 1.2, dy: 0.3, dz: 1.2 },
            { cx: 1.2, cy: 1.8, cz: -0.4, dx: 1.2, dy: 0.3, dz: 1.2 }
          ]
        },
        {
          id: "supercomputer_accel",
          label: "Akceleratory Tensorowe",
          color: "rgba(225, 29, 72, 0.9)",
          outlineColor: "rgba(225, 29, 72, 1)",
          explodeOffset: { x: 0, y: 1.1, z: 0.8 },
          cubes: [
            { cx: -1.6, cy: 1.8, cz: 1.2, dx: 1.0, dy: 0.4, dz: 1.4 },
            { cx: -0.5, cy: 1.8, cz: 1.2, dx: 1.0, dy: 0.4, dz: 1.4 },
            { cx: 0.6, cy: 1.8, cz: 1.2, dx: 1.0, dy: 0.4, dz: 1.4 },
            { cx: 1.7, cy: 1.8, cz: 1.2, dx: 1.0, dy: 0.4, dz: 1.4 }
          ]
        },
        {
          id: "supercomputer_interconnect",
          label: "Szybka sieć InfiniBand",
          color: "rgba(14, 165, 233, 0.85)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: -1.2, y: 0.6, z: -0.8 },
          cubes: [{ cx: -2.1, cy: 1.7, cz: -2.0, dx: 0.4, dy: 0.3, dz: 0.8 }]
        },
        {
          id: "supercomputer_water",
          label: "Rurociągi i węzły Chłodzenia Wodnego",
          color: "rgba(6, 182, 212, 0.85)",
          outlineColor: "rgba(6, 182, 212, 1)",
          explodeOffset: { x: 0, y: 1.4, z: 0 },
          cubes: [
            { cx: 0, cy: 2.2, cz: 1.2, dx: 4.4, dy: 0.2, dz: 0.2 },
            { cx: 0, cy: 2.2, cz: -0.4, dx: 4.4, dy: 0.2, dz: 0.2 }
          ]
        },
        {
          id: "supercomputer_power_feed",
          label: "Miedziane Szyny Zasilające Busbar",
          color: "rgba(79, 70, 229, 0.95)",
          outlineColor: "rgba(79, 70, 229, 1)",
          explodeOffset: { x: -1.4, y: 0, z: -1.4 },
          cubes: [
            { cx: -2.6, cy: 0, cz: -2.6, dx: 0.2, dy: 6.4, dz: 0.2 },
            { cx: 2.6, cy: 0, cz: -2.6, dx: 0.2, dy: 6.4, dz: 0.2 }
          ]
        }
      ];
    } else if (deviceType === "server") {
      partsData = [
        {
          id: "server_case",
          label: "Obudowa Rack 2U",
          color: "rgba(71, 85, 105, 0.1)",
          outlineColor: "rgba(148, 163, 184, 0.7)",
          explodeOffset: { x: 0, y: 0, z: 0 },
          cubes: [{ cx: 0, cy: 0, cz: 0, dx: 5.8, dy: 1.8, dz: 7.2 }]
        },
        {
          id: "server_mobo",
          label: "Płyta serwerowa",
          color: "rgba(5, 150, 105, 0.75)",
          outlineColor: "rgba(5, 150, 105, 1)",
          explodeOffset: { x: 0, y: -0.8, z: 0 },
          cubes: [{ cx: -0.2, cy: -0.5, cz: -0.6, dx: 4.8, dy: 0.12, dz: 4.4 }]
        },
        {
          id: "server_cpu",
          label: "Procesory serwerowe",
          color: "rgba(220, 38, 38, 0.95)",
          outlineColor: "rgba(220, 38, 38, 1)",
          explodeOffset: { x: 0, y: 1.1, z: 0 },
          cubes: [
            { cx: -0.8, cy: 0.2, cz: -1.0, dx: 1.1, dy: 1.2, dz: 1.1 },
            { cx: 0.8, cy: 0.2, cz: -1.0, dx: 1.1, dy: 1.2, dz: 1.1 }
          ]
        },
        {
          id: "server_ram",
          label: "Pamięć DDR5 ECC",
          color: "rgba(139, 92, 246, 0.85)",
          outlineColor: "rgba(139, 92, 246, 1)",
          explodeOffset: { x: 0, y: 0.8, z: -0.4 },
          cubes: [
            { cx: -1.6, cy: 0.1, cz: -1.0, dx: 0.12, dy: 0.9, dz: 1.4 },
            { cx: -1.9, cy: 0.1, cz: -1.0, dx: 0.12, dy: 0.9, dz: 1.4 },
            { cx: 1.6, cy: 0.1, cz: -1.0, dx: 0.12, dy: 0.9, dz: 1.4 },
            { cx: 1.9, cy: 0.1, cz: -1.0, dx: 0.12, dy: 0.9, dz: 1.4 }
          ]
        },
        {
          id: "server_hotswap",
          label: "Dyski Hot-Swap",
          color: "rgba(225, 29, 72, 0.85)",
          outlineColor: "rgba(225, 29, 72, 1)",
          explodeOffset: { x: 0, y: 0.4, z: 1.6 },
          cubes: [
            { cx: -1.8, cy: 0.2, cz: 2.8, dx: 1.4, dy: 0.6, dz: 1.2 },
            { cx: -0.2, cy: 0.2, cz: 2.8, dx: 1.4, dy: 0.6, dz: 1.2 },
            { cx: 1.4, cy: 0.2, cz: 2.8, dx: 1.4, dy: 0.6, dz: 1.2 }
          ]
        },
        {
          id: "server_psu",
          label: "Zasilacze redundantne",
          color: "rgba(79, 70, 229, 0.85)",
          outlineColor: "rgba(79, 70, 229, 1)",
          explodeOffset: { x: -1.2, y: 0, z: -1.6 },
          cubes: [
            { cx: -1.6, cy: -0.1, cz: -2.8, dx: 1.0, dy: 0.8, dz: 1.4 },
            { cx: -2.4, cy: -0.1, cz: -2.8, dx: 1.0, dy: 0.8, dz: 1.4 }
          ]
        },
        {
          id: "server_nic",
          label: "Karta sieciowa 100G",
          color: "rgba(14, 165, 233, 0.85)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: 1.4, y: 0, z: -1.4 },
          cubes: [{ cx: 2.1, cy: 0.1, cz: -2.4, dx: 0.15, dy: 0.8, dz: 1.6 }]
        },
        {
          id: "server_ipmi",
          label: "Kontroler IPMI/BMC",
          color: "rgba(6, 182, 212, 0.95)",
          outlineColor: "rgba(6, 182, 212, 1)",
          explodeOffset: { x: 0.6, y: -0.4, z: 0.6 },
          cubes: [{ cx: 0.8, cy: -0.4, cz: 1.2, dx: 0.4, dy: 0.15, dz: 0.4 }]
        }
      ];
    } else {
      // desktop / PC
      partsData = [
        {
          id: "mobo",
          label: "Płyta główna",
          color: "rgba(16, 185, 129, 0.75)",
          outlineColor: "rgba(16, 185, 129, 1)",
          explodeOffset: { x: -1.2, y: 0, z: 0 },
          cubes: [{ cx: -2.3, cy: 0.5, cz: 0.0, dx: 0.2, dy: 5.6, dz: 4.4 }]
        },
        {
          id: "cpu",
          label: "Procesor CPU",
          color: "rgba(239, 68, 68, 0.95)",
          outlineColor: "rgba(239, 68, 68, 1)",
          explodeOffset: { x: 0.4, y: 0, z: 0 },
          cubes: [{ cx: -2.0, cy: 1.6, cz: 0.0, dx: 0.18, dy: 1.1, dz: 1.1 }]
        },
        {
          id: "cooler",
          label: "Chłodzenie CPU",
          color: "rgba(14, 165, 233, 0.7)",
          outlineColor: "rgba(14, 165, 233, 1)",
          explodeOffset: { x: 1.8, y: 0, z: 0 },
          cubes: [{ cx: -1.2, cy: 1.6, cz: 0.0, dx: 1.3, dy: 1.8, dz: 1.8 }]
        },
        {
          id: "ram",
          label: "Pamięć RAM",
          color: "rgba(168, 85, 247, 0.85)",
          outlineColor: "rgba(168, 85, 247, 1)",
          explodeOffset: { x: 1.1, y: 0, z: 0.4 },
          cubes: [
            { cx: -1.4, cy: 1.6, cz: 1.1, dx: 0.15, dy: 1.5, dz: 0.15 },
            { cx: -1.4, cy: 1.6, cz: 1.4, dx: 0.15, dy: 1.5, dz: 0.15 }
          ]
        },
        {
          id: "ssd",
          label: "Dysk SSD M.2",
          color: "rgba(236, 72, 153, 0.9)",
          outlineColor: "rgba(236, 72, 153, 1)",
          explodeOffset: { x: 0.5, y: -0.6, z: -0.4 },
          cubes: [{ cx: -1.9, cy: 0.2, cz: 0.5, dx: 0.1, dy: 0.3, dz: 0.9 }]
        },
        {
          id: "gpu",
          label: "Karta Graficzna",
          color: "rgba(245, 158, 11, 0.75)",
          outlineColor: "rgba(245, 158, 11, 1)",
          explodeOffset: { x: 2.2, y: -0.4, z: 0 },
          cubes: [{ cx: -0.5, cy: -0.6, cz: 0.5, dx: 1.2, dy: 0.9, dz: 3.8 }]
        },
        {
          id: "psu",
          label: "Zasilacz",
          color: "rgba(99, 102, 241, 0.8)",
          outlineColor: "rgba(99, 102, 241, 1)",
          explodeOffset: { x: 0, y: -1.6, z: 0 },
          cubes: [{ cx: -1.4, cy: -2.3, cz: 0.0, dx: 1.8, dy: 1.4, dz: 3.4 }]
        },
        {
          id: "case",
          label: "Obudowa",
          color: "rgba(100, 116, 139, 0.15)",
          outlineColor: "rgba(148, 163, 184, 0.8)",
          explodeOffset: { x: 0, y: 0, z: 0 },
          cubes: [
            { cx: -1.2, cy: 0.0, cz: 0.0, dx: 2.8, dy: 6.6, dz: 4.8 }
          ]
        }
      ];
    }

    // Build absolute vertices and faces list
    let globalVertexIndex = 0;
    const vertices: Vec3[] = [];
    const faces: Face[] = [];
    const absoluteCenters: Record<string, Vec3> = {};
    const vertexPartOwners: typeof partsData = [];

    partsData.forEach((part) => {
      let xSum = 0, ySum = 0, zSum = 0;
      let count = 0;

      part.cubes.forEach((cube) => {
        // Build 8 vertices for each cube
        const hx = cube.dx / 2;
        const hy = cube.dy / 2;
        const hz = cube.dz / 2;

        const localVertices: Vec3[] = [
          { x: cube.cx - hx, y: cube.cy - hy, z: cube.cz - hz }, // 0
          { x: cube.cx + hx, y: cube.cy - hy, z: cube.cz - hz }, // 1
          { x: cube.cx + hx, y: cube.cy + hy, z: cube.cz - hz }, // 2
          { x: cube.cx - hx, y: cube.cy + hy, z: cube.cz - hz }, // 3
          { x: cube.cx - hx, y: cube.cy - hy, z: cube.cz + hz }, // 4
          { x: cube.cx + hx, y: cube.cy - hy, z: cube.cz + hz }, // 5
          { x: cube.cx + hx, y: cube.cy + hy, z: cube.cz + hz }, // 6
          { x: cube.cx - hx, y: cube.cy + hy, z: cube.cz + hz }  // 7
        ];

        localVertices.forEach((v) => {
          vertices.push(v);
          vertexPartOwners.push(part);
          xSum += v.x;
          ySum += v.y;
          zSum += v.z;
          count++;
        });

        const startIndex = globalVertexIndex;

        // 6 faces of this cube
        const cubeFaces: Face[] = [
          { indices: [0, 1, 2, 3].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }, // back
          { indices: [4, 5, 6, 7].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }, // front
          { indices: [0, 1, 5, 4].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }, // bottom
          { indices: [2, 3, 7, 6].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }, // top
          { indices: [0, 3, 7, 4].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }, // left
          { indices: [1, 2, 6, 5].map(i => i + startIndex), color: part.color, outlineColor: part.outlineColor, partId: part.id }  // right
        ];

        faces.push(...cubeFaces);
        globalVertexIndex += 8;
      });

      absoluteCenters[part.id] = {
        x: xSum / count,
        y: ySum / count,
        z: zSum / count
      };
    });

    return { vertices, faces, absoluteCenters, partsData, vertexPartOwners };
  }, [deviceType]);

  // Main rendering loop inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    let width = canvasSize.width;
    let height = canvasSize.height;

    if (width === 0 || height === 0) {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    const centerX = width / 2;
    const centerY = height / 2;

    // Trig values
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);

    // Coordinate transformation helper (Euler rotation yaw + pitch)
    const project = (point: Vec3, explodeOffset: Vec3): { sx: number; sy: number; depth: number } => {
      // 1. Shift by explode value
      const shiftedX = point.x + explodeOffset.x * explode;
      const shiftedY = point.y + explodeOffset.y * explode;
      const shiftedZ = point.z + explodeOffset.z * explode;

      // 2. Rotate Yaw (rotate in XZ plane around Y-axis)
      let x1 = shiftedX * cosY - shiftedZ * sinY;
      let z1 = shiftedX * sinY + shiftedZ * cosY;

      // 3. Rotate Pitch (rotate in YZ plane around X-axis)
      let y2 = shiftedY * cosP - z1 * sinP;
      let z2 = shiftedY * sinP + z1 * cosP;

      // 4. Perspective Projection
      const cameraDist = 18;
      const fov = zoom;
      const depth = cameraDist + z2;
      const scale = fov * 8 / depth;

      return {
        sx: centerX + x1 * scale,
        sy: centerY - y2 * scale,
        depth: depth
      };
    };

    // Render clear background with ambient tech grids
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = theme === "light" ? "#f8fafc" : "#0A0A0B"; // elegant base space according to theme
    ctx.fillRect(0, 0, width, height);

    // Draw grid floor (3D grid representing computer builder workbench)
    ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
    ctx.lineWidth = 1;
    for (let r = -4; r <= 4; r++) {
      const p1 = project({ x: r, y: -3.3, z: -4 }, { x: 0, y: 0, z: 0 });
      const p2 = project({ x: r, y: -3.3, z: 4 }, { x: 0, y: 0, z: 0 });
      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      ctx.stroke();

      const p3 = project({ x: -4, y: -3.3, z: r }, { x: 0, y: 0, z: 0 });
      const p4 = project({ x: 4, y: -3.3, z: r }, { x: 0, y: 0, z: 0 });
      ctx.beginPath();
      ctx.moveTo(p3.sx, p3.sy);
      ctx.lineTo(p4.sx, p4.sy);
      ctx.stroke();
    }

    // Process vertices
    const projectedVertices = pcParts.vertices.map((v, i) => {
      // Find which part owns this vertex to apply correct explode offset
      const part = pcParts.vertexPartOwners[i];
      return project(v, part.explodeOffset);
    });

    // Structure list of faces with depth calculation
    const drawingFaces = pcParts.faces.map((face, index) => {
      // Calculate depth as mean of rotated vertex depths
      const faceProjectedVertices = face.indices.map(idx => projectedVertices[idx]);
      const avgDepth = faceProjectedVertices.reduce((sum, current) => sum + current.depth, 0) / faceProjectedVertices.length;

      // Check if this face's part is currently selected or hovered
      const isSelected = selectedComponent?.id === face.partId;
      const isHovered = hoveredPartId === face.partId;

      return {
        ...face,
        avgDepth,
        isSelected,
        isHovered
      };
    });

    // Sort faces BACK-TO-FRONT (Painter's Algorithm)
    drawingFaces.sort((a, b) => b.avgDepth - a.avgDepth);

    // Directional light vector in screen coordinates (angled slightly top-right-front)
    const lightDir = { x: 0.5, y: 0.7, z: -0.5 };
    const normRange = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y + lightDir.z * lightDir.z);
    lightDir.x /= normRange;
    lightDir.y /= normRange;
    lightDir.z /= normRange;

    // Draw individual faces
    drawingFaces.forEach((face) => {
      const points = face.indices.map(idx => projectedVertices[idx]);

      // Simple flat shading normal estimate based on face's first 3 projected vertices
      // Math in local coordinates to estimate light reaction
      const v0 = pcParts.vertices[face.indices[0]];
      const v1 = pcParts.vertices[face.indices[1]];
      const v2 = pcParts.vertices[face.indices[2]];

      const d1 = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
      const d2 = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z };

      // Cross product
      const normal = {
        x: d1.y * d2.z - d1.z * d2.y,
        y: d1.z * d2.x - d1.x * d2.z,
        z: d1.x * d2.y - d1.y * d2.x
      };

      const normMagnitude = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      if (normMagnitude > 0) {
        normal.x /= normMagnitude;
        normal.y /= normMagnitude;
        normal.z /= normMagnitude;
      }

      // Compute dot product of actual face normal with lighting vector
      // Standard daylight ambient + diffuse reflection
      const dot = Math.max(0.2, normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z);
      const brightnessFactor = 0.45 + dot * 0.55;

      // Color computation
      ctx.beginPath();
      ctx.moveTo(points[0].sx, points[0].sy);
      for (let idx = 1; idx < points.length; idx++) {
        ctx.lineTo(points[idx].sx, points[idx].sy);
      }
      ctx.closePath();

      // Determine face colors with highlights
      let fillColor = face.color;
      let strokeColor = face.outlineColor;
      let strokeWidth = 1;

      // Add a visual neon glow if selected or hovered
      if (face.isSelected) {
        fillColor = increaseAlpha(face.color, 0.4); // enrich color
        strokeColor = "#ffffff"; // thick glowing white borders
        strokeWidth = 2.5;
      } else if (face.isHovered) {
        fillColor = increaseAlpha(face.color, 0.25);
        strokeColor = lightenColor(face.outlineColor, 20); // brighten outline
        strokeWidth = 1.8;
      }

      // Shading application for solids (exclude the outer case which should be extremely transparent)
      if (face.partId !== "case") {
        ctx.fillStyle = applyShading(fillColor, brightnessFactor);
      } else {
        // Obudowa glass panel styling
        ctx.fillStyle = "rgba(100, 116, 139, 0.04)";
      }
      ctx.fill();

      // Grid/Wireframe borders logic
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // Additional UI hints drawn over components
      // If the part is selected, draw a floating label card near its center
      if (face.isSelected && face.indices[0] === face.indices[0]) {
        // We only want to draw the label once per part, write it on top face
        // Actually we can do labels in a separate pass so they aren't hidden by standard components
      }
    });

    // 2D Floating Label Pass for selected or hovered parts
    pcParts.partsData.forEach((partInfo) => {
      const id = partInfo.id;
      const center = pcParts.absoluteCenters[id];
      if (!center) return;
      const projCenter = project(center, partInfo.explodeOffset);

      const isSelected = selectedComponent?.id === id;
      const isHovered = hoveredPartId === id;

      // Draw floating indicator text
      if (isSelected || isHovered) {
        ctx.beginPath();
        // Glow point at component core
        ctx.arc(projCenter.sx, projCenter.sy, 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#ffffff" : partInfo.outlineColor;
        ctx.shadowColor = partInfo.outlineColor;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw line extending from selected core to a tiny offset label
        const offsetX = id.includes("psu") || id.includes("battery") ? -90 : 80;
        const offsetY = id.includes("cooler") ? -50 : id.includes("gpu") || id.includes("camera") ? 50 : -40;

        ctx.beginPath();
        ctx.moveTo(projCenter.sx, projCenter.sy);
        ctx.lineTo(projCenter.sx + offsetX, projCenter.sy + offsetY);
        ctx.strokeStyle = partInfo.outlineColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label box
        const textLabel = partInfo.label;
        ctx.font = "bold 11px Inter, sans-serif";
        const textWidth = ctx.measureText(textLabel).width;
        const rectW = textWidth + 16;
        const rectH = 22;
        const rx = projCenter.sx + offsetX - (offsetX < 0 ? rectW : 0);
        const ry = projCenter.sy + offsetY - 11;

        ctx.fillStyle = theme === "light" ? "#ffffff" : "#1e293b"; // theme-based label box background
        ctx.strokeStyle = partInfo.outlineColor;
        ctx.lineWidth = 1;
        drawRoundedRect(ctx, rx, ry, rectW, rectH, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = theme === "light" ? "#0f172a" : "#f8fafc"; // theme-based text color
        ctx.fillText(textLabel, rx + 8, ry + 15);
      }
    });

  }, [yaw, pitch, zoom, explode, autoRotate, hoveredPartId, selectedComponent, pcParts, theme, canvasSize]);

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false); // Disable auto rotation on manual interact
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      setYaw((prev) => (prev + deltaX * 0.007) % (Math.PI * 2));
      setPitch((prev) => {
        const next = prev - deltaY * 0.007;
        // Clamp vertical pitch to prevent flipping
        return Math.max(-1.1, Math.min(1.1, next));
      });

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      // Mouse move hover detection
      // Calculate which component center is closest to screen-space hover coordinate
      const mouseRect = canvas.getBoundingClientRect();
      const hx = e.clientX - mouseRect.left;
      const hy = e.clientY - mouseRect.top;

      let foundPartId: string | null = null;
      let minDistance = 28; // hover snapping threshold in pixels

      // We redo projection calculations to snap hover targets
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const centerX = mouseRect.width / 2;
      const centerY = mouseRect.height / 2;

      pcParts.partsData.forEach((part) => {
        const center = pcParts.absoluteCenters[part.id];
        // transform
        const shiftedX = center.x + part.explodeOffset.x * explode;
        const shiftedY = center.y + part.explodeOffset.y * explode;
        const shiftedZ = center.z + part.explodeOffset.z * explode;

        let x1 = shiftedX * cosY - shiftedZ * sinY;
        let z1 = shiftedX * sinY + shiftedZ * cosY;
        let y2 = shiftedY * cosP - z1 * sinP;
        let z2 = shiftedY * sinP + z1 * cosP;

        const depth = 18 + z2;
        const scale = zoom * 8 / depth;

        const sx = centerX + x1 * scale;
        const sy = centerY - y2 * scale;

        const dist = Math.sqrt((sx - hx) ** 2 + (sy - hy) ** 2);
        if (dist < minDistance) {
          minDistance = dist;
          foundPartId = part.id;
        }
      });

      setHoveredPartId(foundPartId);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = false;

    // Check click detection if move delta is trivial
    // (Meaning user just clicked, didn't drag extensively)
    if (hoveredPartId) {
      const matchedComp = componentsList.find(c => c.id === hoveredPartId);
      if (matchedComp) {
        onSelectComponent(matchedComp);
      }
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setHoveredPartId(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      const touch = e.touches[0];
      lastMousePos.current = { x: touch.clientX, y: touch.clientY };
      touchMovedRef.current = false;
      setAutoRotate(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current && e.touches.length === 1) {
      if (e.cancelable) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastMousePos.current.x;
      const deltaY = touch.clientY - lastMousePos.current.y;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        touchMovedRef.current = true;
      }

      setYaw((prev) => (prev + deltaX * 0.007) % (Math.PI * 2));
      setPitch((prev) => {
        const next = prev - deltaY * 0.007;
        return Math.max(-1.1, Math.min(1.1, next));
      });

      lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDragging.current = false;

    if (!touchMovedRef.current && e.changedTouches.length === 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const touch = e.changedTouches[0];
      const mouseRect = canvas.getBoundingClientRect();
      const hx = touch.clientX - mouseRect.left;
      const hy = touch.clientY - mouseRect.top;

      let foundPartId: string | null = null;
      let minDistance = 35; // slightly larger touch area for ticks on tablets/displays

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const centerX = mouseRect.width / 2;
      const centerY = mouseRect.height / 2;

      pcParts.partsData.forEach((part) => {
        const center = pcParts.absoluteCenters[part.id];
        const shiftedX = center.x + part.explodeOffset.x * explode;
        const shiftedY = center.y + part.explodeOffset.y * explode;
        const shiftedZ = center.z + part.explodeOffset.z * explode;

        let x1 = shiftedX * cosY - shiftedZ * sinY;
        let z1 = shiftedX * sinY + shiftedZ * cosY;
        let y2 = shiftedY * cosP - z1 * sinP;
        let z2 = shiftedY * sinP + z1 * cosP;

        const depth = 18 + z2;
        const scale = zoom * 8 / depth;

        const sx = centerX + x1 * scale;
        const sy = centerY - y2 * scale;

        const dist = Math.sqrt((sx - hx) ** 2 + (sy - hy) ** 2);
        if (dist < minDistance) {
          minDistance = dist;
          foundPartId = part.id;
        }
      });

      if (foundPartId) {
        const matchedComp = componentsList.find(c => c.id === foundPartId);
        if (matchedComp) {
          onSelectComponent(matchedComp);
        }
      }
    }
  };

  // Zoom Helpers
  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const step = 5;
      return direction === "in" ? Math.min(60, prev + step) : Math.max(15, prev - step);
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F12] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* 3D Viewer Canvas */}
      <div className="relative flex-1 min-h-[400px] h-full cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full block touch-none"
          id="pc-3d-canvas"
        />

        {/* Ambient Top Overlay - Active Hover / Select Status */}
        <div className="absolute top-3 left-3 right-3 flex flex-row items-center justify-between gap-1.5 pointer-events-none select-none">
          <div className="bg-slate-900/90 backdrop-blur border border-slate-800/80 px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 shrink-0 shadow-md">
            <Layers className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
              Tryb: <span className="text-cyan-400 font-bold">{explode > 0 ? "Rozbity" : "Złożony"}</span>
            </span>
          </div>

          <div className="bg-slate-900/90 backdrop-blur border border-slate-800/80 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs text-slate-300 shadow-md max-w-[170px] xs:max-w-[210px] sm:max-w-xs md:max-w-md truncate">
            {hoveredPartId ? (
              <span className="font-semibold text-amber-400 truncate block">
                {componentsList.find(c => c.id === hoveredPartId)?.shortName || "Obudowa"}
              </span>
            ) : selectedComponent ? (
              <span className="truncate block">
                Wybrano: <span className="text-cyan-400 font-semibold">{selectedComponent.shortName}</span>
              </span>
            ) : (
              <span className="text-slate-400 hidden xs:inline truncate">Obracaj palcem/myszką</span>
            )}
          </div>
        </div>

        {/* Floating Manual Controls inside Canvas */}
        <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
          <button
            onClick={() => handleZoom("in")}
            className="w-10 h-10 rounded-xl bg-[#0F0F12]/95 text-slate-300 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95"
            title="Przybliż"
            id="btn-zoom-in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleZoom("out")}
            className="w-10 h-10 rounded-xl bg-[#0F0F12]/95 text-slate-300 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95"
            title="Oddal"
            id="btn-zoom-out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Toggle Auto Rotation */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-all shadow-lg active:scale-95 ${
              autoRotate
                ? "bg-cyan-950/90 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900"
                : "bg-slate-900/95 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
            id="btn-auto-rotate"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin [animation-duration:8s]" : ""}`} />
            <span>Obracanie: {autoRotate ? "Auto" : "Ręczne"}</span>
          </button>
        </div>
      </div>

      {/* Explosion Control Bar */}
      <div className="bg-[#0F0F12] border-t border-slate-800/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5 text-cyan-450" />
              Rozbicie Widoku Podzespołów (Exploded View):
            </label>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              {Math.round(explode * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explode}
            onChange={(e) => {
              setExplode(parseFloat(e.target.value));
              if (parseFloat(e.target.value) > 0.1) {
                setAutoRotate(false); // auto stop to let them investigate exploded view
              }
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
            id="explosion-slider"
          />
        </div>

        <div className="flex items-center space-x-2 text-slate-400 text-[11px] max-w-[260px] md:border-l md:border-slate-800 md:pl-4">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
          <span>
            Model 3D przedstawia pełne okablowanie i przestrzeń montażową. Kliknij na elementy, aby je wyizolować!
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// HELPER DRAWING UTILS
// -------------------------------------------------------------

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Changes alpha level of an rgba component string or hex string
 */
function increaseAlpha(colorStr: string, deltaAlpha: number): string {
  if (colorStr.startsWith("rgba")) {
    const vals = colorStr.substring(5, colorStr.length - 1).split(",");
    if (vals.length >= 4) {
      const alpha = Math.min(1.0, parseFloat(vals[3].trim()) + deltaAlpha);
      return `rgba(${vals[0].trim()}, ${vals[1].trim()}, ${vals[2].trim()}, ${alpha})`;
    }
  }
  return colorStr;
}

/**
 * Shade color based on normal brightness multiplier
 */
function applyShading(rgbaColor: string, brightness: number): string {
  if (rgbaColor.startsWith("rgba")) {
    const vals = rgbaColor.substring(5, rgbaColor.length - 1).split(",");
    const r = Math.min(255, Math.max(0, Math.round(parseFloat(vals[0].trim()) * brightness)));
    const g = Math.min(255, Math.max(0, Math.round(parseFloat(vals[1].trim()) * brightness)));
    const b = Math.min(255, Math.max(0, Math.round(parseFloat(vals[2].trim()) * brightness)));
    const a = vals[3] ? vals[3].trim() : "1.0";
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return rgbaColor;
}

/**
 * Simple color lightener helper for RGB outliners/glowing colors
 */
function lightenColor(colorStr: string, percent: number): string {
  if (colorStr.startsWith("rgba")) {
    const vals = colorStr.substring(5, colorStr.length - 1).split(",");
    const r = Math.min(255, Math.round(parseFloat(vals[0].trim()) * (1 + percent / 100)));
    const g = Math.min(255, Math.round(parseFloat(vals[1].trim()) * (1 + percent / 100)));
    const b = Math.min(255, Math.round(parseFloat(vals[2].trim()) * (1 + percent / 100)));
    const a = vals[3] ? vals[3].trim() : "1";
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return colorStr;
}
