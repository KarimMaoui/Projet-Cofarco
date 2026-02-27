import './styles/main.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { App } from './App';
import { inject } from '@vercel/analytics'; // Ajout de l'import Analytics

// 1. Activer le suivi des statistiques Vercel immédiatement
inject();

// 2. Forcer le thème sombre par défaut pour une interface type "salle de marché/renseignement"
document.documentElement.dataset.theme = 'dark';
document.documentElement.classList.remove('no-transition');

// 3. Initialiser l'application principale
document.addEventListener('DOMContentLoaded', () => {
  const app = new App('app');
  app.init().catch((err) => {
    console.error("[WorldMonitor] Échec de l'initialisation de l'application:", err);
  });
});
