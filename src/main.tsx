import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use relative path to support subfolder deployments like /IABK/
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('PWA Service Worker registered successfully, scope:', registration.scope);
      })
      .catch((error) => {
        console.error('PWA Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

