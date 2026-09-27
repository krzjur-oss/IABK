/**
 * @file ErrorBoundary.tsx
 * @description Komponent Granicy Błędów (React Error Boundary).
 * Zabezpiecza aplikację przed całkowitą awarią (białym ekranem) w przypadku
 * wystąpienia błędu wykonania wewnątrz dowolnej zakładki edukacyjnej lub komponentu potomnego.
 * Zapewnia lokalną izolację problemu, wyświetlenie estetycznego komunikatu awarii
 * oraz przycisk ponownej próby montowania (Reset).
 */

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Właściwości (props) komponentu ErrorBoundary
 */
interface ErrorBoundaryProps {
  /** Komponenty podrzędne objęte ochroną przed błędami */
  children: ReactNode;
  /** Opcjonalny, spersonalizowany tytuł komunikatu awarii */
  fallbackTitle?: string;
  /** Opcjonalny callback wywoływany przy resecie stanu błędu */
  onReset?: () => void;
}

/**
 * Stan wewnętrzny komponentu ErrorBoundary
 */
interface ErrorBoundaryState {
  /** Flaga informująca, czy wystąpił błąd w drzewie potomnym */
  hasError: boolean;
  /** Obiekt przechwyconego wyjątku */
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  /**
   * Statyczna metoda cyklu życia React wywoływana natychmiast po rzuceniu błędu przez komponent potomny.
   * Aktualizuje stan komponentu, aby w następnym cyklu wyrenderować zastępczy interfejs użytkownika (fallback UI).
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Metoda cyklu życia wywoływana po wystąpieniu błędu.
   * Umożliwia rejestrację szczegółów diagnostycznych w konsoli systemowej.
   */
  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary przechwycił nieobsłużony wyjątek:", error, errorInfo);
  }

  /**
   * Obsługa przycisku resetu: czyści stan błędu i próbuje ponownie wyrenderować komponent potomny.
   */
  public handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public override render(): ReactNode {
    // Jeżeli w komponencie potomnym wystąpił błąd, wyświetl bezpieczny widok awaryjny
    if (this.state.hasError) {
      return (
        <div className="bg-[#0F0F12] border border-rose-900/60 rounded-2xl p-6 md:p-8 my-6 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
              {this.props.fallbackTitle || "Wystąpił nieoczekiwany problem w tym module"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
              Wystąpił błąd podczas renderowania tego modułu edukacyjnego. Pozostałe części Atlasu działają poprawnie.
            </p>
            {this.state.error && (
              <p className="font-mono text-[11px] text-rose-400/90 bg-rose-950/40 p-2.5 rounded border border-rose-900/40 inline-block max-w-full overflow-x-auto mt-2 text-left">
                {this.state.error.message || String(this.state.error)}
              </p>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-cyan-500/50 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Spróbuj ponownie uruchomić moduł</span>
            </button>
          </div>
        </div>
      );
    }

    // Standardowe renderowanie komponentów potomnych
    return this.props.children;
  }
}
