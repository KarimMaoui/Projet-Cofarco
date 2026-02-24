// src/App.ts
import { DeckGLMap } from './components/DeckGLMap';
import { MaritimePanel } from './components/MaritimePanel';
import { CascadePanel } from './components/CascadePanel';

// Imports des services API (assure-toi d'avoir créé le fichier src/services/api.ts et src/services/wildfires.ts)
import { fetchLiveEarthquakes, fetchLiveNaturalEvents } from './services/api';
import { fetchLiveFires } from './services/wildfires';

export class App {
  private containerId: string;
  private map!: DeckGLMap;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public async init(): Promise<void> {
    const container = document.getElementById(this.containerId);
    if (!container) throw new Error(`Container #${this.containerId} not found`);

    // 1. Définir le layout principal (Disposition Haut/Bas)
    this.renderLayout(container);

    // 2. Initialiser la carte
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      this.map = new DeckGLMap(mapContainer, {
        zoom: 3.5,
        pan: { x: 0, y: 0 },
        // Couches actives par défaut au chargement
        layers: {
          pipelines: true,
          ports: true,
          waterways: true,
          conflicts: true,
          military: true,
          ais: true,
          minerals: false,
          climate: false,
          earthquakes: true, 
          nasa: true,
          fires: true
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

      // Simulation de chargement API pour les widgets
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
      }, 1500);
    }

    // 4. Lancer la récupération des vraies données en arrière-plan
    this.loadRealTimeData();
  }

  private async loadRealTimeData() {
    try {
      console.log("Téléchargement des données Live (USGS & NASA)...");
      
      // On lance TOUTES les requêtes en parallèle pour gagner du temps
      const [earthquakes, naturalEvents, fires] = await Promise.all([
        fetchLiveEarthquakes(),
        fetchLiveNaturalEvents(),
        fetchLiveFires()
      ]);
      
      console.log(`Données reçues : ${earthquakes.length} séismes, ${naturalEvents.length} alertes NASA, ${fires.length} incendies.`);
      
      // On envoie les données à la carte pour qu'elle les dessine
      if (this.map) {
        this.map.updateLiveData(earthquakes, naturalEvents, fires);
      }
    } catch (err) {
      console.error("Impossible de charger les données Live", err);
    }
  }

  private renderLayout(container: HTMLElement) {
    container.innerHTML = `
      <header class="header" style="height: 40px; background: #141414; border-bottom: 1px solid #2a2a2a; display: flex; align-items: center; padding: 0 20px; justify-content: space-between;">
        <div style="display: flex; align-items: baseline; gap: 10px;">
          <div style="font-size: 14px; font-weight: 800; color: #44ff88; letter-spacing: 1px;">COFARCO RISK MONITOR</div>
          <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 2px;">Commodities & Trade Finance</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
           <div style="width: 8px; height: 8px; border-radius: 50%; background: #ff4444; animation: pulse 1.5s infinite;"></div>
           <span style="font-size: 10px; color: #fff; font-weight: bold; letter-spacing: 1px;">LIVE (USGS/NASA)</span>
        </div>
      </header>
      
      <main class="main-content" style="display: flex; flex-direction: column; height: calc(100vh - 40px); overflow-y: auto; background: #0a0a0a;">
        
        <section class="map-section" style="height: 55vh; min-height: 400px; position: relative; flex-shrink: 0; border-bottom: 1px solid #2a2a2a;">
          <div id="map-container" style="position: absolute; inset: 0;"></div>
        </section>
        
        <section id="panels-container" class="panels-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 12px; padding: 16px;">
        </section>

      </main>
      <style>
        @keyframes pulse { 
          0% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.4); } 
          70% { opacity: 0.5; box-shadow: 0 0 0 6px rgba(255, 68, 68, 0); } 
          100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 68, 68, 0); } 
        }
      </style>
    `;
  }
}
