// src/App.ts
import { DeckGLMap } from './components/DeckGLMap';
import { MaritimePanel } from './components/MaritimePanel';
import { CascadePanel } from './components/CascadePanel';

export class App {
  private containerId: string;
  private map!: DeckGLMap;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public async init(): Promise<void> {
    const container = document.getElementById(this.containerId);
    if (!container) throw new Error(`Container #${this.containerId} not found`);

    // 1. Définir le layout principal
    container.innerHTML = `
      <header class="header" style="height: 50px; background: #0a0a0a; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; padding: 0 20px; justify-content: space-between;">
        <div style="display: flex; align-items: baseline; gap: 10px;">
          <div style="font-size: 16px; font-weight: 800; color: #44ff88; letter-spacing: 1px;">COFARCO RISK MONITOR</div>
          <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 2px;">Commodities & Trade Finance</div>
        </div>
        <div style="font-size: 11px; color: #666; font-family: monospace;">STATUS: EN LIGNE • LATENCY: 12ms</div>
      </header>
      <main style="display: flex; height: calc(100vh - 50px); overflow: hidden;">
        <section id="map-container" style="flex: 2; border-right: 1px solid #2a2a2a; position: relative;"></section>
        <section id="panels-container" style="flex: 1; min-width: 350px; max-width: 450px; background: #0a0a0a; padding: 16px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;"></section>
      </main>
    `;

    // 2. Initialiser la carte
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      this.map = new DeckGLMap(mapContainer, {
        zoom: 3.5,
        pan: { x: 0, y: 0 },
        view: 'mena', // Focus sur le Moyen-Orient et l'Europe par défaut
        layers: {
          pipelines: true,
          ports: true,
          cables: true,
          conflicts: true,
          waterways: true,
          bases: true
        }
      });
    }

    // 3. Initialiser les panneaux
    const panelsContainer = document.getElementById('panels-container');
    if (panelsContainer) {
      const maritimePanel = new MaritimePanel();
      const cascadePanel = new CascadePanel();

      panelsContainer.appendChild(maritimePanel.element);
      panelsContainer.appendChild(cascadePanel.element);

      // Simulation de chargement API
      maritimePanel.showLoading("Analyse des signaux AIS satellitaires...");
      cascadePanel.showLoading("Évaluation des risques systémiques...");

      setTimeout(() => {
        // Injection de données "Mockées" pour la démo Cofarco
        maritimePanel.updateData(
          [
            { region: 'Mer Rouge / Yémen', darkShips: 42, description: "Brouillage GPS massif détecté. Navires éteignant leur transpondeur AIS par sécurité." }
          ],
          [
            { name: 'Cap de Bonne Espérance', deltaPct: 185, impact: "Reroutage massif des navires évitant le canal de Suez. Forte demande de soutage." }
          ]
        );

        cascadePanel.updateData([
          { 
            chokepoint: "Détroit d'Ormuz", 
            impacts: [
              "Hausse des primes d'assurance maritime de Guerre (War Risk) estimée à +0.5%",
              "Retards anticipés de 4 à 6 jours vers les terminaux méthaniers du Japon et d'Europe",
            ],
            commodities: ["Crude Oil (Brent)", "GNL"]
          },
          { 
            chokepoint: "Canal de Panama", 
            impacts: [
              "Restriction du tirant d'eau due à la sécheresse persistante",
              "Baisse du fret de vrac sec (céréales) des États-Unis vers l'Asie"
            ],
            commodities: ["Maïs", "Soja", "GNL américain"]
          }
        ]);
      }, 1500); // 1.5s d'effet de chargement pour le côté "temps réel"
    }
  }
}
