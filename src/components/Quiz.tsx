/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Award, CheckCircle, XCircle, Info, RefreshCw, Trophy, ArrowRight, Zap } from "lucide-react";

// Helper to select exactly 1 random question for each of the 6 difficulty levels
const generateSelectedQuestions = (): QuizQuestion[] => {
  const selected: QuizQuestion[] = [];
  for (let diff = 1; diff <= 6; diff++) {
    const pool = QUIZ_QUESTIONS.filter((q) => q.difficulty === diff);
    if (pool.length > 0) {
      const randomQ = pool[Math.floor(Math.random() * pool.length)];
      selected.push(randomQ);
    }
  }
  return selected;
};

export default function Quiz() {
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => generateSelectedQuestions());
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = activeQuestions[currentQuestionIdx];

  // Sound Synth for retro quiz effect
  const playSynthBeep = (type: "correct" | "incorrect" | "victory" | "click") => {
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
        // Star wars-ish short celebration
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
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.log("AudioContext blocked or unsupport:", e);
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

  const handleNextQuestion = () => {
    playSynthBeep("click");
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIdx + 1 < activeQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      playSynthBeep("victory");
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    playSynthBeep("click");
    setActiveQuestions(generateSelectedQuestions());
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
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
    <div className="max-w-3xl mx-auto" id="quiz-root">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="quiz-question-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header / Info bar */}
            <div className="flex justify-between items-center text-slate-400 text-xs border-b border-slate-800/80 pb-4 mb-6">
              <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                <Zap className="w-3.5 h-3.5 mr-1 text-cyan-405 animate-pulse" />
                Szybki Test Wiedzy Sprzętowej
              </span>
              <span className="font-mono font-semibold">
                Pytanie <span className="text-cyan-400 font-bold">{currentQuestionIdx + 1}</span> z <span className="text-slate-200">{activeQuestions.length}</span>
              </span>
            </div>

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
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
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
                  </button>
                );
              })}
            </div>

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
                      {currentQuestionIdx + 1 < QUIZ_QUESTIONS.length ? "Następne pytanie" : "Zakończ quiz"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-finished-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0F0F12] border border-slate-800/80 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden max-w-xl mx-auto"
          >
            {/* Ambient trophy spotlight background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-550/45 flex items-center justify-center mb-6 mx-auto shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Trophy className="w-8 h-8 text-cyan-400" />
            </div>

            <h1 className="text-2xl font-bold text-slate-100">Gratulacje!</h1>
            <p className="text-slate-400 text-xs mt-1.5">Ukończyłeś interaktywny quiz sprzętowy.</p>

            <div className="my-6 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1">
                Uzyskany Wynik
              </span>
              <span className="text-4xl font-extrabold text-cyan-400 font-mono">
                {score} <span className="text-lg text-slate-500 font-normal">/ {activeQuestions.length}</span>
              </span>

              {/* Hardware Rank */}
              <div className={`mt-4 p-3.5 rounded-lg border text-xs leading-relaxed ${rank.color}`}>
                <p className="font-bold text-sm mb-1 uppercase tracking-toggle">{rank.title}</p>
                <p className="text-slate-300 font-normal mt-1">{rank.desc}</p>
              </div>
            </div>

            <button
              onClick={handleResetQuiz}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 mx-auto transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95 cursor-pointer text-white"
              id="btn-quiz-reset"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Rozpocznij Quiz Od Nowa</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
