import './styles/main.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { App } from './App';

// Forcer le thème sombre par défaut pour une interface type "salle de marché/renseignement"
document.documentElement.dataset.theme = 'dark';
document.documentElement.classList.remove('no-transition');

// Initialiser l'application principale
document.addEventListener('DOMContentLoaded', () => {
  const app = new App('app');
  app.init().catch((err) => {
    console.error("[WorldMonitor] Échec de l'initialisation de l'application:", err);
  });
});
