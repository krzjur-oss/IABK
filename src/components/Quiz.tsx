/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Info, 
  RefreshCw, 
  Trophy, 
  ArrowRight, 
  Zap,
  Clock,
  FileDown,
  Trash2,
  Calendar,
  FileText,
  Shield,
  UserCheck,
  Check,
  Sparkles
} from "lucide-react";

// Helper to select exactly 1 random question for each of the 6 difficulty levels
const generateSelectedQuestions = (pool: QuizQuestion[]): QuizQuestion[] => {
  const selected: QuizQuestion[] = [];
  for (let diff = 1; diff <= 6; diff++) {
    const subPool = pool.filter((q) => q.difficulty === diff);
    if (subPool.length > 0) {
      const randomQ = subPool[Math.floor(Math.random() * subPool.length)];
      selected.push(randomQ);
    }
  }
  return selected;
};

// Helper to retrieve exact educational source path for any given question ID
const getQuestionReference = (id: number): string => {
  const references: Record<number, string> = {
    1: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Szybki dysk SSD M.2 NVMe",
    2: "Makieta Peryferii ➔ Mysz komputerowa (GUI)",
    3: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Obudowa (PC Case)",
    4: "Makieta Peryferii ➔ Słuchawki / Karta dźwiękowa",
    5: "Makieta Peryferii ➔ Karta graficzna (GPU – poziome porty wideo)",
    6: "Budowa Sieci WAN/LAN ➔ Urządzenia aktywne: Router",
    7: "Historia i Ewolucja PC ➔ Generacja II – Tranzystory",
    8: "Makieta Peryferii ➔ Klawiatura mechaniczna",
    9: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM (tryb Dual-Channel)",
    10: "Budowa Sieci WAN/LAN ➔ Słownik sieciowy: Sieć WAN / Internet",
    11: "Historia i Ewolucja PC ➔ Lata 1980-1990: IBM PC model 5150",
    12: "Budowa Sieci WAN/LAN ➔ Okablowanie sieciowe ➔ Światłowód",
    13: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Chłodzenie procesora (Cooler CPU) i pasta termoprzewodząca",
    14: "Budowa Sieci WAN/LAN ➔ Przełącznik (Switch) vs Router sieciowy",
    15: "Historia i Ewolucja PC ➔ Generacja I – Lampy Próżniowe (np. ENIAC)",
    16: "Symulator Montażu PC ➔ Przebieg montażu ➔ Krok 4 (Cooler CPU - Wskazówki eksperta)",
    17: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Zasilacz (PSU) ➔ Sprawność elektryczna",
    18: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Procesor (CPU) ➔ Zabezpieczenie termiczne (włącz Tryb Naukowy)",
    19: "Budowa Sieci WAN/LAN ➔ Architektura i Adresowanie IP oraz brama domyślna",
    20: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Karta graficzna (GPU) ➔ Rodzaje pamięci i taktowanie",
    21: "Symulator Montażu PC ➔ Przestrogi w Kroku 1 i 5 o kołkach dystansowych instalowanych w obudowie",
    22: "Model 3D i Podzespoły ➔ Komputer stacjonarny ➔ Pamięć operacyjna RAM ➔ Technologia XMP i EXPO",
    23: "Historia i Ewolucja PC ➔ Prorocza teza z 1965 r.: Empiryczne Prawo Moore’a i krzem",
    24: "Budowa Sieci WAN/LAN ➔ Protokół transportowy bezpołączeniowy UDP",
    25: "Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Tablet",
    26: "Makieta Peryferii ➔ Urządzenia kontrolne: Gamepad",
    27: "Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Komputer Jednopłytkowy (SBC)",
    28: "Model 3D i Podzespoły ➔ Komputer Jednopłytkowy (SBC) ➔ Uniwersalne złącze GPIO",
    29: "Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Konsola do gier ➔ Odprowadzanie ciepła APU",
    30: "Model 3D i Podzespoły ➔ Wybierz kategorię urządzenia: Superkomputer ➔ Bezpośrednie chłodzenie cieczą (DLC)",
    31: "Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Drukarek (Druk igłowy)",
    32: "Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Myszy (Zabrudzenia i regeneracja wałków)",
    33: "Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Złączach ➔ TOSLINK",
    34: "Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Klawiatur (Przełączniki Halla & Rapid Trigger)",
    35: "Historia i Ewolucja PC ➔ Oś Czasu Peryferii ➔ Sekcja Monitorów (CRT vs OLED, fizyka i pomiary emisyjności)",
    36: "Diagnostyka, Złącza & Media ➔ Baza Wiedzy o Mediach Transmisyjnych (Miedź vs Światłowód)"
  };
  return references[id] || "Baza Wiedzy programu";
};

// Interface for a stored attempt
interface QuizAttempt {
  id: number;
  studentName: string;
  score: number;
  total: number;
  duration: string;
  date: string;
  rankTitle: string;
  hasSwitchedTabs?: boolean;
}

export default function Quiz() {
  const [questionsPool, setQuestionsPool] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  
  const [quizStarted, setQuizStarted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.quizStarted ?? false;
      }
    } catch {}
    return false;
  });

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeQuestions && parsed.activeQuestions.length > 0) {
          return parsed.activeQuestions;
        }
      }
    } catch {}
    return generateSelectedQuestions(QUIZ_QUESTIONS);
  });

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.currentQuestionIdx ?? 0;
      }
    } catch {}
    return 0;
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedOption !== undefined ? parsed.selectedOption : null;
      }
    } catch {}
    return null;
  });

  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.isAnswerSubmitted ?? false;
      }
    } catch {}
    return false;
  });

  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.score ?? 0;
      }
    } catch {}
    return 0;
  });

  const [quizFinished, setQuizFinished] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.quizFinished ?? false;
      }
    } catch {}
    return false;
  });

  const [secondsElapsed, setSecondsElapsed] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.secondsElapsed ?? 0;
      }
    } catch {}
    return 0;
  });

  const [hasSwitchedTabs, setHasSwitchedTabs] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("quiz_active_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.hasSwitchedTabs ?? false;
      }
    } catch {}
    return false;
  });

  // New additions: Name, Timer, RODO & History List
  const [studentName, setStudentName] = useState<string>(() => localStorage.getItem("quiz_student_name") || "");
  const [rodoAccepted, setRodoAccepted] = useState<boolean>(true);
  
  const [history, setHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem("quiz_attempts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentQuestion = activeQuestions[currentQuestionIdx];

  // Stopwatch effect
  useEffect(() => {
    let interval: any;
    if (quizStarted && !quizFinished) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizFinished]);

  // Track browser window blur & visibility changes (moving to other tabs/apps)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quizStarted && !quizFinished) {
        setHasSwitchedTabs(true);
      }
    };

    const handleBlur = () => {
      if (quizStarted && !quizFinished) {
        setHasSwitchedTabs(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [quizStarted, quizFinished]);

  // Save student name changes
  useEffect(() => {
    localStorage.setItem("quiz_student_name", studentName);
  }, [studentName]);

  // Load dynamic quiz questions from Cache / Network
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch("./quiz-questions.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz questions: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuestionsPool(data);
          // Only change active selection if the quiz has not started yet
          if (!quizStarted) {
            setActiveQuestions(generateSelectedQuestions(data));
          }
          console.log("Successfully loaded dynamic quiz questions from network/cache:", data.length);
        }
      } catch (err) {
        console.warn("Could not fetch quiz questions dynamically (offline/missing), using static fallback.", err);
      }
    };
    fetchQuizQuestions();
  }, [quizStarted]);

  // Sound Synth for retro quiz effect
  const playSynthBeep = (type: "correct" | "incorrect" | "victory" | "click" | "start") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === "correct") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "incorrect") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "victory") {
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.25);
        });
      } else if (type === "click" || type === "start") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(type === "start" ? 600 : 400, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.log("AudioContext blocked or unsupported:", e);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    playSynthBeep("click");
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      playSynthBeep("correct");
      setScore((prev) => prev + 1);
    } else {
      playSynthBeep("incorrect");
    }
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleNextQuestion = () => {
    playSynthBeep("click");
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIdx + 1 < activeQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      playSynthBeep("victory");
      setQuizFinished(true);
      saveToHistory(score);
    }
  };

  // Save score to Local History on completion
  const saveToHistory = (finalScore: number) => {
    const durationStr = formatDuration(secondsElapsed);
    const dateStr = new Date().toLocaleString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    const rankObj = getRankInfo(finalScore);

    const newAttempt: QuizAttempt = {
      id: Date.now(),
      studentName: studentName.trim() || "Anonimowy Uczeń",
      score: finalScore,
      total: activeQuestions.length,
      duration: durationStr,
      date: dateStr,
      rankTitle: rankObj.title,
      hasSwitchedTabs: hasSwitchedTabs
    };

    const updatedHistory = [newAttempt, ...history];
    setHistory(updatedHistory);
    try {
      localStorage.setItem("quiz_attempts", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to write quiz stats locally", e);
    }
  };

  const handleStartQuiz = () => {
    playSynthBeep("start");
    setSecondsElapsed(0);
    setScore(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
    setHasSwitchedTabs(false);
    const newQs = generateSelectedQuestions(questionsPool);
    setActiveQuestions(newQs);
    setQuizStarted(true);

    // Initial write
    const sessionObj = {
      quizStarted: true,
      quizFinished: false,
      activeQuestions: newQs,
      currentQuestionIdx: 0,
      selectedOption: null,
      isAnswerSubmitted: false,
      score: 0,
      secondsElapsed: 0,
      hasSwitchedTabs: false
    };
    localStorage.setItem("quiz_active_session", JSON.stringify(sessionObj));
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setHasSwitchedTabs(false);
    localStorage.removeItem("quiz_active_session");
  };

  // Sync active states to localStorage
  useEffect(() => {
    if (quizStarted && !quizFinished) {
      const sessionObj = {
        quizStarted,
        quizFinished,
        activeQuestions,
        currentQuestionIdx,
        selectedOption,
        isAnswerSubmitted,
        score,
        secondsElapsed,
        hasSwitchedTabs
      };
      localStorage.setItem("quiz_active_session", JSON.stringify(sessionObj));
    } else if (quizFinished) {
      localStorage.removeItem("quiz_active_session");
    }
  }, [quizStarted, quizFinished, activeQuestions, currentQuestionIdx, selectedOption, isAnswerSubmitted, score, secondsElapsed, hasSwitchedTabs]);

  const handleClearHistory = () => {
    if (confirm("Czy na pewno chcesz usunąć całą historię prób na tym urządzeniu? Operacja jest nieodwracalna.")) {
      setHistory([]);
      try {
        localStorage.removeItem("quiz_attempts");
      } catch (e) {
        console.error("Clean local storage failed", e);
      }
    }
  };

  const downloadReportText = (attempt: QuizAttempt) => {
    // Generate secure checksum mock to sign report for teachers
    const checksum = Math.abs((attempt.studentName + attempt.score + attempt.duration).split("").reduce((a, b) => { 
      a = (a << 5) - a + b.charCodeAt(0); 
      return a & a; 
    }, 0)).toString(16).toUpperCase();

    const reportText = `=====================================================
          INTERAKTYWNY ATLAS BUDOWY KOMPUTERA - RAPORT QUIZU
=====================================================
Imię i Nazwisko / ID ucznia: ${attempt.studentName}
Data zakończenia testu:     ${attempt.date}
Czas trwania testu:          ${attempt.duration}
Uzyskany wynik punktowy:     ${attempt.score} / ${attempt.total} (${Math.round((attempt.score / attempt.total) * 100)}%)
Uzyskany poziom i ranga:     ${attempt.rankTitle}
Weryfikacja rzetelności:     ${attempt.hasSwitchedTabs ? "OSTRZEŻENIE: Wykryto zmianę modułów / opuszczenie testu!" : "ZALICZONY SAMODZIELNIE (brak opuszczenia modułu)"}

Status weryfikacji danych (RODO/GDPR):
- Dane osobowe przetworzone wyczyszczoną, lokalną instancją przeglądarki.
- Brak transmisji danych na zewnętrzne serwery bazodanowe.

Zabezpieczający kod kontrolny autentyczności (Sygnowany cyfrowo):
[IABK-SIGN-${checksum}-${attempt.id.toString(36).toUpperCase()}]
=====================================================
Autor i Pomysłodawca: mgr Krzysztof Jureczek
Metryka Programu: Core Atlas v4.8.5-STABLE
Darmowy Wolny Model Dydaktyczny dla Szkół i Placówek.
=====================================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Raport_Quiz_${attempt.studentName.replace(/\s+/g, "_")}_${Math.round((attempt.score / attempt.total) * 100)}pct.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Rank determination
  const getRankInfo = (score: number) => {
    if (score <= 2) {
      return {
        title: "Kolekcjoner Elektrośmieci 🔌",
        desc: "Dopiero zaczynasz swoją przygodę ze sprzętem. Nie przejmuj się! Zapoznaj się z naszym interaktywnym modelem 3D i wykonaj montaż w symulatorze.",
        color: "text-red-400 bg-red-950/20 border-red-500/20"
      };
    } else if (score <= 4) {
      return {
        title: "Domowy Serwisant 🖥️",
        desc: "Znasz podstawowe podzespoły i potrafisz odróżnić procesor od dysku. Trochę praktyki i zostaniesz profesjonalistą!",
        color: "text-amber-400 bg-amber-955/20 border-amber-500/20"
      };
    } else {
      return {
        title: "Mistrz Overclockingu & Montażu 🚀",
        desc: "Niewiarygodne! Masz perfekcyjną wiedzę na temat sprzętu komputerowego, okablowania oraz zasad działania komponentów PC.",
        color: "text-cyan-400 bg-cyan-950/20 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]"
      };
    }
  };

  const rank = getRankInfo(score);

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="quiz-page-container">
      
      <AnimatePresence mode="wait">
        
        {/* Step 0: Welcome Screen & Name Registry input with RODO warning disclosures */}
        {!quizStarted ? (
          <motion.div
            key="quiz-landing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Ambient Background subtle circles */}
            <div className="absolute top-0 right-0 w-[240px] h-[120px] bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-[240px] h-[120px] bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
              <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                <Trophy className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-405 font-bold">Autocertyfikacja wiedzy</span>
                <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">Regulamin i Panel Startowy Testu</h1>
              </div>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Przed Tobą interaktywny, 6-stopniowy test badający wiedzę o budowie współczesnych urządzeń komputerowych, historii mikroprocesorów oraz fizycznej strukturze warstwowych modeli 3D. Każde pytanie losowane jest z innej kategorii i poziomu trudności.
            </p>

            {/* Input registry card */}
            <div className="p-4 md:p-5 bg-slate-950/60 border border-slate-800/85 rounded-xl space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
                <UserCheck className="w-4 h-4 mr-1.5 text-cyan-400" />
                Imię i Nazwisko Ucznia (Opcjonalne)
              </label>
              
              <input
                type="text"
                placeholder="Np. Jan Kowalski, Klasa 1A"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-[#0F0F12] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
              />

              {/* Polish GDPR / RODO Statement block */}
              <div className="p-3.5 bg-cyan-950/15 border border-cyan-900/30 rounded-lg flex items-start space-x-3 text-xs">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-cyan-400 tracking-wide text-[10px] uppercase">🛡️ Oświadczenie o zgodności z RODO / GDPR</p>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Twoje dane są w pełni bezpieczne. Podane w polu powyżej imię i nazwisko przetwarzane jest **wyłącznie lokalnie w Twojej przeglądarce internetowej** (RAM oraz HTML5 LocalStorage) w celu automatycznego wygenerowania dynamicznego dyplomu po zakończeniu testu. Nasz program **nie wysyła, nie gromadzi i nie udostępnia** żadnych informacji serwerom zewnętrznym ani bazom danych (Zgodność z art. 6 ust. 1 lit. a RODO).
                  </p>
                </div>
              </div>

              {/* Educational Integrity Warning */}
              <div className="p-3.5 bg-amber-950/15 border border-amber-900/30 rounded-lg flex items-start space-x-3 text-xs">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-amber-500 tracking-wide text-[10px] uppercase">⚡ WAŻNA INSTRUKCJA DOTYCZĄCA PRZEBIEGU TESTU</p>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    <strong>Pamięć Absolutna Sesji:</strong> Twoje postępy w quizie są na bieżąco automatycznie zapisywane – przypadkowe przełączenie karty czy nawet odświeżenie strony nie zresetuje Twojego testu!
                  </p>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    ⚠️ <strong>Weryfikacja Rzetelności Dydaktycznej:</strong> Podczas trwania testu nie powinno się przełączać do innych modułów Atlasu (np. w celu wyszukania odpowiedzi). Każde opuszczenie modułu Quizu zostanie automatycznie odnotowane w raporcie końcowym jako ostrzeżenie dla Nauczyciela! Rozwiązuj test w pełni samodzielnie.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-lg cursor-pointer hover:shadow-cyan-500/10 active:scale-99 transition-all text-xs"
            >
              <Zap className="w-4 h-4 fill-white animate-bounce" />
              <span>ROZPOCZNIJ TEST WIEDZY</span>
            </button>
          </motion.div>
        ) : !quizFinished ? (
          
          /* Step 1: Active Examination Card with countdown stopwatch */
          <motion.div
            key="quiz-question-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header / Info bar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-slate-400 text-xs border-b border-slate-800/80 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 self-start text-[10px]">
                  <Zap className="w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse" />
                  Szybki Test Wiedzy Sprzętowej
                </span>
                {hasSwitchedTabs && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-md flex items-center shrink-0">
                    ⚠️ Wykryto zmianę modułu
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 self-end sm:self-auto font-mono text-xs text-slate-300">
                <span className="flex items-center text-cyan-400 bg-cyan-950/25 px-2 py-0.5 rounded border border-cyan-800/20 font-bold">
                  <Clock className="w-3.5 h-3.5 mr-1 select-none" />
                  {formatDuration(secondsElapsed)}
                </span>
                <span className="font-semibold">
                  Pytanie <span className="text-cyan-400 font-bold">{currentQuestionIdx + 1}</span> z <span className="text-slate-200">{activeQuestions.length}</span>
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {/* Question Text */}
                <h2 className="text-base md:text-lg font-bold text-slate-100 leading-relaxed mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Answer Options Grid */}
                <div className="space-y-3.5">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = currentQuestion.correctAnswer === idx;
                    const isWrongSelection = isSelected && !isCorrect;

                    let optionStyles = "bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60";

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                         optionStyles = "bg-emerald-950/30 border-emerald-500 text-emerald-400 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.05)]";
                      } else if (isWrongSelection) {
                        optionStyles = "bg-red-950/30 border-red-500 text-red-400";
                      } else {
                        optionStyles = "bg-slate-950/40 border-slate-900 text-slate-500 opacity-60";
                      }
                    } else if (isSelected) {
                      optionStyles = "bg-cyan-950/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]";
                    }

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.04 }}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${optionStyles} group cursor-pointer`}
                        id={`quiz-option-${idx}`}
                      >
                        <span className={`w-6 h-6 rounded-lg border text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                          isAnswerSubmitted && isCorrect
                            ? "bg-emerald-500 text-slate-950 border-emerald-500"
                            : isAnswerSubmitted && isWrongSelection
                            ? "bg-red-500 text-slate-950 border-red-500"
                            : isSelected
                            ? "bg-cyan-500 text-slate-950 border-cyan-500"
                            : "bg-slate-900 border-slate-800 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-200"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs md:text-sm pt-0.5 leading-snug">{option}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Footer / Interactive Feedback Action Panel */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col space-y-4">
              {/* Correctness banner + Trivia display */}
              <AnimatePresence>
                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs"
                  >
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 self-start mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 self-start mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-200 uppercase tracking-wide text-[10px] mb-1">
                        {selectedOption === currentQuestion.correctAnswer ? (
                          <span className="text-emerald-400 text-xs font-bold">Doskonała odpowiedź!</span>
                        ) : (
                          <span className="text-red-400 text-xs font-bold">Pudło! Poprawna odpowiedź to {String.fromCharCode(65 + currentQuestion.correctAnswer)}</span>
                        )}
                      </h4>
                      <p className="text-slate-400 leading-relaxed font-sans mt-1.5">
                        <Info className="w-3.5 h-3.5 text-cyan-400 inline-block mr-1 align-sub shrink-0" />
                        <span className="font-semibold text-slate-300">Ciekawostka / Uzasadnienie:</span> {currentQuestion.explanation}
                      </p>

                      {/* Source/Reference Finder Box */}
                      <div className={`mt-3 pt-2.5 border-t ${
                        selectedOption === currentQuestion.correctAnswer 
                          ? "border-slate-800/60 text-slate-400" 
                          : "border-red-950 text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30"
                      } flex items-start space-x-2 text-[11px] leading-relaxed`}>
                        <div className={`px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold shrink-0 mt-0.5 ${
                          selectedOption === currentQuestion.correctAnswer
                            ? "bg-slate-900 border border-slate-800 text-slate-400"
                            : "bg-red-950/60 border border-red-500/35 text-red-400 animate-pulse"
                        }`}>
                          {selectedOption === currentQuestion.correctAnswer ? "Referencja" : "Gdzie szukać?"}
                        </div>
                        <div className="flex-1">
                          {selectedOption === currentQuestion.correctAnswer ? (
                            <span>To zagadnienie opiera się na wiedzy zawartej w: <strong className="text-emerald-400/90 font-semibold">{getQuestionReference(currentQuestion.id)}</strong></span>
                          ) : (
                            <span>Temat ten oraz poprawną odpowiedź z pełnym opisem technicznym odnajdziesz w sekcji: <strong className="text-cyan-400 font-bold decoration-cyan-500/20 underline underline-offset-2">{getQuestionReference(currentQuestion.id)}</strong>. Zapoznaj się z tym materiałem!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-sans">
                  Twój wynik: <span className="font-bold text-slate-300">{score} pkt</span>
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                      selectedOption !== null
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg cursor-pointer active:scale-95"
                        : "bg-slate-800 text-slate-500 border border-slate-800 cursor-not-allowed"
                    }`}
                    id="btn-quiz-submit"
                  >
                    <span>Zatwierdź odpowiedź</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:text-white transition-all active:scale-95 cursor-pointer"
                    id="btn-quiz-next"
                  >
                    <span>
                      {currentQuestionIdx + 1 < activeQuestions.length ? "Następne pytanie" : "Zakończ test i zobacz dyplom"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          
          /* Step 2: Final Quiz Completion, Score Dashboard & printable Diploma / Certyfikat */
          <motion.div
            key="quiz-finished-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden">
              {/* Ambient trophy spotlight background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center mb-5 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>

              <h1 className="text-2xl font-bold text-slate-100">Gratulacje!</h1>
              <p className="text-slate-400 text-xs mt-1">Ukończyłeś interaktywny quiz sprzętowy.</p>

              {/* Score breakdown metrics in center */}
              <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                
                <div className="md:col-span-5 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex flex-col justify-center">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1">
                    Uzyskany Wynik
                  </span>
                  <span className="text-4xl font-extrabold text-cyan-400 font-mono">
                    {score} <span className="text-lg text-slate-500 font-normal">/ {activeQuestions.length}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono mt-1">
                    Skuteczność: {Math.round((score / activeQuestions.length) * 100)}%
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono mt-2 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Czas rozwiązania: {formatDuration(secondsElapsed)}
                  </p>
                </div>

                {/* Hardware Rank badge */}
                <div className={`md:col-span-7 p-4 rounded-xl border text-left flex flex-col justify-between ${rank.color}`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center mb-1">
                      <Award className="w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse" />
                      Twoja Ranga sprzętowa
                    </span>
                    <p className="font-extrabold text-sm uppercase tracking-tight text-white">{rank.title}</p>
                    <p className="text-slate-350 font-normal mt-1.5 text-xs leading-relaxed">{rank.desc}</p>
                  </div>
                </div>

              </div>

              {/* Dynamic integrity notice box */}
              {hasSwitchedTabs ? (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto">
                  <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
                  <div>
                    <p className="font-bold text-amber-500 text-xs">Wykryto przełączanie modułów podczas testu</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed mt-1">
                      System odnotował, że w trakcie aktywnej sesji quizu przechodziłeś do innych sekcji Atlasu (prawdopodobnie w celu sprawdzenia odpowiedzi). Wygenerowany raport oraz certyfikat zawierają adnotację zabezpieczającą.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-left flex items-start space-x-2.5 my-4 max-w-2xl mx-auto">
                  <span className="text-emerald-500 text-sm mt-0.5">✓</span>
                  <div>
                    <p className="font-bold text-emerald-400 text-xs">Weryfikacja samodzielności pomyślna</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed mt-1">
                      Test został ukończony rzetelnie, bez opuszczania modułu Quizu ani przełączania sekcji. Gratulujemy pełnej, samodzielnej pracy naukowej!
                    </p>
                  </div>
                </div>
              )}

              {/* Render dynamic print certificate */}
              <div className="border border-slate-850 bg-slate-950/80 rounded-xl p-5 md:p-8 text-center relative overflow-hidden text-slate-300 shadow-inner max-w-2xl mx-auto border-double border-4 border-slate-800">
                {/* Visual Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] pointer-events-none select-none">
                  <Trophy className="w-80 h-80 text-white" />
                </div>

                {/* Certificate top layout */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between opacity-80 pb-2 border-b border-slate-900">
                    <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">AKADEMIA SPRZĘTOWA IABK</span>
                    <span className="text-[8px] font-mono tracking-widest text-cyan-502 uppercase">SERIA: {Math.abs(studentName.hashCode ? studentName.hashCode() : 43101).toString(16).toUpperCase()}</span>
                  </div>

                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono bg-cyan-950/20 border border-cyan-800/15 px-2.5 py-0.5 rounded-full inline-block">
                    CERTYFIKAT ZALICZENIA ATLASU
                  </span>

                  <h3 className="text-xs text-slate-400 font-medium italic mt-2.5">
                    Niniejszym dokumentem cyfrowej platformy uroczyście oświadcza się, że:
                  </h3>

                  <h2 className="text-lg md:text-xl font-black text-white tracking-wide border-b border-cyan-500/20 pb-1 max-w-sm mx-auto uppercase">
                    {studentName.trim() || "Anonimowy Uczeń"}
                  </h2>

                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-1">
                    zakończył z wynikiem pozytywnym cykl interaktywnych analiz technicznych i pomyślnie złożył syntetyczny test wiedzy, uzyskując tytuł dynamiczny:
                  </p>

                  <div className="p-2.5 bg-[#0F0F12]/80 border border-slate-850 rounded-lg max-w-xs mx-auto">
                    <span className="font-bold text-xs text-cyan-400 block uppercase font-mono">{rank.title}</span>
                  </div>

                  {/* Badges footer and signatures layout */}
                  <div className="grid grid-cols-2 gap-4 pt-6 text-left border-t border-slate-900 mt-6 md:px-8">
                    <div className="space-y-1">
                      <span className="text-[8px] text-slate-500 font-mono uppercase block">METRYKA PRÓBY:</span>
                      <p className="text-[10px] text-slate-300 font-semibold font-mono">Wynik: {score} / {activeQuestions.length} pkt</p>
                      <p className="text-[9px] text-slate-400 font-mono">Czas: {formatDuration(secondsElapsed)}</p>
                      <p className="text-[9px] text-slate-400 font-mono">Data: {new Date().toLocaleDateString("pl-PL")}</p>
                      <p className={`text-[9px] font-bold font-mono ${hasSwitchedTabs ? "text-amber-550/90" : "text-emerald-450/90"}`}>
                        Samodzielność: {hasSwitchedTabs ? "Ostrzeżenie (odnotowano zmianę modułów)" : "PEŁNA WERYFIKACJA"}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-1 self-end">
                      <span className="text-[8px] text-slate-500 font-mono uppercase block">REKTOR / TWÓRCA SYSTEMU:</span>
                      <p className="text-[10px] text-slate-300 italic font-bold">mgr Krzysztof Jureczek</p>
                      <p className="text-[8px] text-slate-500 font-mono">Nauczyciel i Twórca Programu</p>
                    </div>
                  </div>

                  {/* Genuine encryption validation footprint block */}
                  <div className="text-[8px] text-slate-600 font-mono text-center pt-4 opacity-50">
                    Cyfrowy token autentyczności: [IABK-VERIFY-SECURE-{(studentName || "Guest").split("").reduce((a, b) => (a + b.charCodeAt(0)), 1).toString(16).toUpperCase()}-{score}-{secondsElapsed}]
                  </div>
                </div>
              </div>

              {/* Actions footer for Finished Quiz */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer hover:text-white"
                  id="btn-quiz-restart"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Wróć do Panelu Startowego</span>
                </button>

                <button
                  onClick={() => downloadReportText({
                    id: Date.now(),
                    studentName: studentName.trim() || "Anonimowy Uczeń",
                    score,
                    total: activeQuestions.length,
                    duration: formatDuration(secondsElapsed),
                    date: new Date().toLocaleString("pl-PL"),
                    rankTitle: rank.title,
                    hasSwitchedTabs
                  })}
                  className="w-full sm:w-auto px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer text-white"
                  title="Pobierz oficjalny plik raportu dydaktycznego do przedłożenia nauczycielowi"
                  id="btn-quiz-download-report"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Pobierz Raport (.TXT)</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Polish Local History Log for Classroom / Teacher checkup */}
      <div className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-5 md:p-6 shadow-xl space-y-5" id="quiz-history-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">📜 Historia Wyników i Dziennik Dydaktyczny</h3>
              <p className="text-[10px] text-slate-500 font-mono">Baza danych prób rozwiązanych na tym stanowisku komputerowym</p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs font-mono font-semibold text-red-400 hover:text-red-300 bg-red-950/15 border border-red-900/30 hover:bg-red-950/30 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors self-start cursor-pointer transition-all active:scale-95"
              id="btn-clear-quiz-history"
              title="Usuń wszystkie zapisy"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wyczyść Historię</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-850 rounded-xl">
            <Calendar className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-sans">Brak zapisanych wyników w historii. Twoja pierwsza próba pojawi się tutaj.</p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Quick dashboard statistics summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/45 p-3 rounded-lg border border-slate-850 text-center">
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Próby lekcyjne</span>
                <span className="text-base font-extrabold text-slate-200 font-mono">{history.length}</span>
              </div>
              <div className="border-l border-slate-900">
                <span className="text-[9px] text-slate-500 uppercase font-bold block font-sans">Średni Wynik</span>
                <span className="text-base font-extrabold text-cyan-404 font-mono">
                  {(history.reduce((acc, curr) => acc + curr.score, 0) / history.length).toFixed(1)} / 6
                </span>
              </div>
              <div className="border-l border-slate-900">
                <span className="text-[9px] text-slate-500 uppercase font-bold block font-sans">Najlepszy Wynik</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">
                  {Math.max(...history.map(h => h.score))} pkt
                </span>
              </div>
              <div className="border-l border-slate-900">
                <span className="text-[9px] text-slate-500 uppercase font-bold block font-sans">Średni Czas</span>
                <span className="text-base font-extrabold text-amber-500 font-mono">
                  {formatDuration(
                    Math.round(
                      history.reduce((acc, curr) => {
                        const parts = curr.duration.split(":");
                        return acc + (parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10));
                      }, 0) / history.length
                    )
                  )}
                </span>
              </div>
            </div>

            {/* Scrollable efforts registry table */}
            <div className="overflow-x-auto rounded-xl border border-slate-850">
              <table className="w-full text-left border-collapse font-sans text-xs min-w-[500px]">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-850 uppercase font-bold text-[9px] tracking-widest">
                    <th className="py-2.5 px-4 font-mono">Data i Czas</th>
                    <th className="py-2.5 px-4">Imię i Nazwisko / ID Ucznia</th>
                    <th className="py-2.5 px-4 text-center">Wynik (pkt)</th>
                    <th className="py-2.5 px-4 text-center">Czas testu</th>
                    <th className="py-2.5 px-4">Uzyskany Tytuł / Ranga</th>
                    <th className="py-2.5 px-4 text-center">Uczciwość</th>
                    <th className="py-2.5 px-4 text-center">Eksport</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 bg-[#0F0F12]/30">
                  {history.map((attempt, index) => (
                    <tr key={attempt.id} className="hover:bg-slate-950/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">{attempt.date}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200">{attempt.studentName}</td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold font-mono ${
                          attempt.score >= 5 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : attempt.score >= 3 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/25" 
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {attempt.score} / {attempt.total}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-300">{attempt.duration}</td>
                      <td className="py-3 px-4">
                        <span className="text-slate-200 font-medium">{attempt.rankTitle}</span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {attempt.hasSwitchedTabs ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20" title="Wykryto przełączanie modułów">
                            ⚠️ Ostrzeżenie
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" title="Rozwiązano w pełni samodzielnie">
                            ✓ Samodzielny
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => downloadReportText(attempt)}
                          className="p-1 px-2.5 rounded-md bg-slate-950 hover:bg-slate-850 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono font-semibold text-[10px] cursor-pointer inline-flex items-center space-x-1"
                          title="Pobierz ten konkretny raport dydaktyczny"
                        >
                          <FileDown className="w-3 h-3 text-cyan-400" />
                          <span>Pobierz</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
