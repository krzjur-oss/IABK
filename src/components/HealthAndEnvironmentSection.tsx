/**
 * @file HealthAndEnvironmentSection.tsx
 * @description Moduł dydaktyczny "Zdrowie i środowisko" w ramach zakładki Peryferia i Transmisja Danych.
 * 
 * Zawiera:
 * 1. Ergonomia stanowiska komputerowego:
 *    - Prawidłowa wysokość monitora (na poziomie oczu, kąt 15-20° w dół)
 *    - Kąt nadgarstków i ramion (zasada kąta prostego 90°, profilaktyka zespołu cieśni nadgarstka)
 *    - Reguła 20-20-20 na zmęczenie wzroku z interaktywnym timerem
 *    - Zalecane przerwy w pracy i ćwiczenia rozciągające
 * 2. E-odpady (Elektrośmieci) i Ekologia:
 *    - Dlaczego nie wyrzucać elektroniki do zwykłego kosza (symbol WEEE, pożary baterii, skażenie gleby)
 *    - Co w elektronice jest szkodliwe (ołów, rtęć, kadm, BFR) vs cenne metale (złoto, srebro, miedź)
 *    - Gdzie oddać zużyty sprzęt w Polsce (PSZOK, zasada 1:1 w sklepach, bezpłatny zwrot sprzętu do 25 cm)
 */

import React, { useState, useEffect } from "react";
import {
  Monitor,
  Eye,
  Clock,
  HeartPulse,
  Recycle,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building2,
  Sparkles,
  ShoppingBag,
  School,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Info,
  ShieldCheck,
  Zap,
  Leaf
} from "lucide-react";

export default function HealthAndEnvironmentSection() {
  // Timer dla zasady 20-20-20
  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeErgonomicsHotspot, setActiveErgonomicsHotspot] = useState<"screen" | "wrist" | "eyes" | "breaks">("screen");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(20);
  };

  return (
    <div className="flex flex-col space-y-8 w-full text-slate-200" id="health-environment-root">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[320px] h-[120px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded">
                BHP i Odpowiedzialność Ekologiczna
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-emerald-400" />
              Zdrowie Użytkownika i Ochrona Środowiska (E-Odpady)
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Nowoczesny użytkownik komputera dba nie tylko o liczbę klatek na sekundę, lecz także o własny <strong>kręgosłup, wzrok i stawy</strong> oraz o to, by zużyta elektronika nie zatruwała naszej planety.
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center space-x-3 self-start md:self-auto shrink-0">
            <Leaf className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-left font-sans">
              <p className="text-[10px] text-slate-500 font-mono leading-none">Standard edukacyjny</p>
              <p className="text-xs font-bold text-emerald-300 mt-0.5">Ergonomia & Gospodarka Cyrkularna</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEKCJA 1: ERGONOMIA STANOWISKA KOMPUTEROWEGO */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-850 pb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            Część 1: Twoje Ciało przy Biurku
          </span>
          <h3 className="text-base font-extrabold text-white mt-1.5 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400" />
            Ergonomia Stanowiska — Jak Siedzieć, By Nie Popsuć Wzroku i Kręgosłupa?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Wielogodzinna praca lub gra w złej pozycji prowadzi do chronicznych bólów karku, zespołu cieśni nadgarstka i pieczenia oczu. Sprawdź 4 kluczowe zasady:
          </p>
        </div>

        {/* 4 Karty Zasad Ergonomii */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Punkt A: Wysokość monitora */}
          <div
            onClick={() => setActiveErgonomicsHotspot("screen")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeErgonomicsHotspot === "screen"
                ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Monitor className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">1. Monitor na Poziomie Oczu</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Górna krawędź ekranu powinna znajdować się dokładnie na wysokości Twoich oczu (kąt patrzenia ok. 15-20° w dół).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-cyan-400">
              Odległość: 50–70 cm (na wyciągnięcie ręki)
            </div>
          </div>

          {/* Punkt B: Kąt nadgarstków i łokci */}
          <div
            onClick={() => setActiveErgonomicsHotspot("wrist")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeErgonomicsHotspot === "wrist"
                ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">2. Kąt Nadgarstków (Zasada 90°)</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Łokcie oparte na podłokietnikach pod kątem prostym (90°). Nadgarstki proste — nie wyginaj ich w górę ani na boki!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-cyan-400">
              Profilaktyka: Zespół cieśni nadgarstka (CTS)
            </div>
          </div>

          {/* Punkt C: Zasada 20-20-20 */}
          <div
            onClick={() => setActiveErgonomicsHotspot("eyes")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeErgonomicsHotspot === "eyes"
                ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">3. Reguła 20-20-20 na Oczy</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Co 20 minut spójrz na obiekt oddalony o 20 stóp (ok. 6 metrów, np. za okno) przez minimum 20 sekund.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-cyan-400">
              Rozluźnia akomodację mięśni oka
            </div>
          </div>

          {/* Punkt D: Zalecane przerwy */}
          <div
            onClick={() => setActiveErgonomicsHotspot("breaks")}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeErgonomicsHotspot === "breaks"
                ? "bg-cyan-950/30 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50"
                : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">4. Zalecane Przerwy w Pracy</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Przynajmniej 5-10 minut przerwy po każdej pełnej godzinie przy komputerze. Wstań, zrób kilka przysiadów i napij się wody.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-cyan-400">
              Dotlenia mózg i poprawia krążenie
            </div>
          </div>

        </div>

        {/* Interaktywny Widget: Trener Relaksacji Oczu 20-20-20 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              Interaktywny Trener Wzroku
            </span>
            <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-cyan-400" />
              Przetestuj 20-Sekundowy Reset Mięśni Oka
            </h4>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Przed ekranem człowiek mruga 2-3 razy rzadziej, co wysusza rogówkę. Włącz poniższy stoper, spójrz w dal (np. za okno na drzewa lub horyzont) i nie patrz w ekran przez 20 sekund:
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="text-center font-mono">
              <div className={`text-2xl font-extrabold ${timerSeconds > 0 && isTimerRunning ? "text-amber-400 animate-pulse" : timerSeconds === 0 ? "text-emerald-400" : "text-slate-300"}`}>
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
              </div>
              <span className="text-[9px] text-slate-500 uppercase">
                {timerSeconds === 0 ? "Oczy zrelaksowane!" : isTimerRunning ? "Patrz w dal..." : "Gotowy"}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              {!isTimerRunning ? (
                <button
                  onClick={() => {
                    if (timerSeconds === 0) setTimerSeconds(20);
                    setIsTimerRunning(true);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Start (20s)</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Pause className="w-3 h-3 fill-white" />
                  <span>Pauza</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-mono text-[10px] rounded transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEKCJA 2: E-ODPADY (ELEKTROŚMIECI) I EKOLOGIA */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-b border-slate-850 pb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            Część 2: Ekologia i Gospodarka Cyrkularna
          </span>
          <h3 className="text-base font-extrabold text-white mt-1.5 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-emerald-400" />
            Elektroodpady (E-Odpady) — Dlaczego Zużyty PC Nie Może Trafić do Zwykłego Kosza?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Każdego roku na świecie powstaje ponad 50 milionów ton elektrośmieci. Zobacz, jakie groźne substancje kryją się w elektronice i gdzie legalnie oraz bezpłatnie oddać stary sprzęt.
          </p>
        </div>

        {/* 3 Kluczowe Bloki Zagadnień E-Odpadów */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Blok A: Dlaczego nie do zwykłego kosza */}
          <div className="bg-red-950/15 border border-red-900/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-red-400 font-bold text-xs mb-3">
                <Trash2 className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider font-mono">Zakaz wyrzucania do czarnego kosza</span>
              </div>
              <h4 className="text-sm font-bold text-white">Dlaczego zwykły śmietnik to błąd?</h4>
              
              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5 font-bold">✕</span>
                  <span><strong>Symbol przekreślonego kosza (WEEE):</strong> Zgodnie z prawem, sprzęt z tym symbolem musi trafić do dedykowanego punktu recyklingu. Wyrzucenie go na śmietnik grozi karą grzywny do 5000 zł.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5 font-bold">✕</span>
                  <span><strong>Ryzyko pożaru w śmieciarce:</strong> Zgniecenie baterii litowo-jonowej w telefonie czy laptopie przez prasę śmieciarki wywołuje natychmiastowy, samopodtrzymujący się pożar chemiczny.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-400 mt-0.5 font-bold">✕</span>
                  <span><strong>Zatrucie wód gruntowych:</strong> Na tradycyjnym wysypisku metale ciężkie przenikają do gleby i wody pitnej, zatruwając rośliny i zwierzęta.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-red-900/30 text-[11px] font-mono text-red-300">
              Wyrzucaj tylko do dedykowanych punktów zbiórki!
            </div>
          </div>

          {/* Blok B: Co w elektronice jest szkodliwe */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs mb-3">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider font-mono">Toksyczne substancje w PC</span>
              </div>
              <h4 className="text-sm font-bold text-white">Co zagraża środowisku?</h4>

              <div className="mt-3 space-y-2.5 text-xs text-slate-300">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 font-mono text-[11px]">Ołów (Pb) i Kadm (Cd):</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">Występują w starych lutach, kineskopach CRT i ogniwach Ni-Cd. Niszczą układ nerwowy i nerki.</p>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 font-mono text-[11px]">Rtęć (Hg):</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">W lampach CCFL podświetlających starsze monitory LCD. Jedna kropla może skazić jezioro.</p>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 font-mono text-[11px]">Bromowane uniepalniacze (BFR):</strong>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dodawane do plastików obudów, by zapobiec pożarom. Podczas nielegalnego spalania uwalniają rakotwórcze dioksyny.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] font-mono text-emerald-400">
              Recykling odzyskuje ponad 90% cennych surowców!
            </div>
          </div>

          {/* Blok C: Gdzie oddać zużyty sprzęt w Polsce */}
          <div className="bg-emerald-950/15 border border-emerald-900/30 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="uppercase tracking-wider font-mono">Punkty Zbiórki w Polsce</span>
              </div>
              <h4 className="text-sm font-bold text-white">Gdzie bezpłatnie oddać e-odpady?</h4>

              <ul className="mt-3 space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Gminny PSZOK:</strong>
                    <p className="text-[11px] text-slate-400 leading-snug">Punkt Selektywnej Zbiórki Odpadów Komunalnych. Każda gmina w Polsce bezpłatnie odbiera dowolną ilość elektrośmieci.</p>
                  </div>
                </li>

                <li className="flex items-start space-x-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Sklepy RTV/AGD (Zasada 1:1):</strong>
                    <p className="text-[11px] text-slate-400 leading-snug">Kupując nowy monitor, myszkę czy laptop, sklep ma prawny obowiązek bezpłatnie przyjąć stary sprzęt tego samego typu.</p>
                  </div>
                </li>

                <li className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Markety pow. 400 m² (Sprzęt do 25 cm):</strong>
                    <p className="text-[11px] text-slate-400 leading-snug">Duże markety muszą przyjąć drobne elektrośmieci (kable, myszki, telefony) bez konieczności kupowania nowego towaru!</p>
                  </div>
                </li>

                <li className="flex items-start space-x-2">
                  <School className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Szkolne akcje zbiórki:</strong>
                    <p className="text-[11px] text-slate-400 leading-snug">Wiele szkół organizuje coroczne konkursy i zbiórki elektroodpadów z nagrodami dla klas.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-900/30 text-[11px] font-mono text-emerald-300">
              100% legalnie, bezpiecznie i za darmo.
            </div>
          </div>

        </div>

        {/* Eko-Ciekawostka: Skarbiec w Starym Smartfonie i PC */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-200">Czy wiesz, że z 1 tony starych telefonów można odzyskać więcej złota niż z 1 tony rudy w kopalni?</p>
              <p className="text-slate-400 mt-0.5 text-[11px]">
                Elektronika zawiera złoto (Au), srebro (Ag), miedź (Cu) i pallad (Pd). Oddając sprzęt do recyklingu, chronisz ziemskie zasoby naturalne przed niszczycielskim wydobyciem kopalnianym.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
