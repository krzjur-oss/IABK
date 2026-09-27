/**
 * @file main.tsx
 * @description Główny punkt wejściowy aplikacji "Interaktywny Atlas Komputera".
 * Odpowiada za bootstrap środowiska React 19, zarządzanie cyklem życia Service Workera
 * (PWA) w trybie deweloperskim i produkcyjnym oraz renderowanie głównego drzewa DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * Zarządzanie Service Workerem (PWA):
 * - W trybie deweloperskim (import.meta.env.DEV): automatycznie wyrejestrowujemy aktywne
 *   Service Workery i czyścimy pamięć podręczną Cache Storage, aby uniknąć serwowania
 *   nieaktualnych pakietów JS oraz konfliktów wielu instancji biblioteki React (np. błędy Invalid Hook Call).
 * - W trybie produkcyjnym: rejestrujemy Service Worker (`sw.js`) po pełnym załadowaniu okna,
 *   co gwarantuje możliwość instalacji PWA oraz 100% działanie w trybie offline.
 */
if ('serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    // Tryb deweloperski: czyszczenie rejestracji i cache
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key);
        }
      });
    }
  } else {
    // Tryb produkcyjny: rejestracja dla wsparcia offline PWA
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((error) => {
        console.error('Błąd rejestracji Service Workera PWA:', error);
      });
    });
  }
}

// Inicjalizacja i montowanie aplikacji React w elemencie o identyfikatorze 'root'
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}


