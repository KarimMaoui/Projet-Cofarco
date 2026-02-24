// src/App.ts
import { DeckGLMap } from './components/DeckGLMap';
import { MaritimePanel } from './components/MaritimePanel';
import { CascadePanel } from './components/CascadePanel';
import { LiveNewsPanel } from './components/LiveNewsPanel';
import { ClimatePanel } from './components/ClimatePanel';

// Services
import { fetchLiveEarthquakes, fetchLiveNaturalEvents } from './services/api';
import { fetchLiveFires } from './services/wildfires';
import { ClimateService } from './services/ClimateService';

export class App {
  private containerId: string;
  private map!: DeckGLMap;
  private maritimePanel!: MaritimePanel;
  private cascadePanel!: CascadePanel;
  private climatePanel!: ClimatePanel;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public async init(): Promise<void> {
    const container = document.getElementById(this.containerId);
    if (!container) throw new Error(`Container #${this.containerId} not found`);

    this.renderLayout(container);

    // 1. Initialisation de la Carte
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      this.map = new DeckGLMap(mapContainer, {
        zoom: 3.5,
        layers: {
          pipelines: true, ports: true, waterways: true, conflicts: true,
          minerals: true, earthquakes: true, nasa: true, fires: true
        }
      });
    }

    // 2. Initialisation et Ajout des Panneaux
    const panelsContainer = document.getElementById('panels-container');
    if (panelsContainer) {
      // Panneau News (Prend 2 colonnes)
      panelsContainer.appendChild(new LiveNewsPanel().element);
      
      // Initialisation
      this.maritimePanel = new MaritimePanel();
      this.cascadePanel = new CascadePanel();
      this.climatePanel = new ClimatePanel();
      
      // Ajout des éléments au DOM
      panelsContainer.appendChild(this.maritimePanel.element);
      panelsContainer.appendChild(this.cascadePanel.element);
      panelsContainer.appendChild(this.climatePanel.element);

      // États de chargement visuels
      this.maritimePanel.showLoading("Analyse NASA EONET...");
      this.cascadePanel.showLoading("Flux USGS en cours...");
      this.climatePanel.showLoading("Calcul anomalies Open-Meteo...");
    }

    // 3. Lancement du chargement des données
    this.loadRealTimeData();
  }

  private async loadRealTimeData() {
    try {
      // On récupère uniquement les données fiables
      const results = await Promise.allSettled([
        fetchLiveEarthquakes(),
        fetchLiveNaturalEvents(),
        fetchLiveFires(),
        ClimateService.fetchAnomalies()
      ]);

      const earthquakes = results[0].status === 'fulfilled' ? results[0].value : [];
      const naturalEvents = results[1].status === 'fulfilled' ? results[1].value : [];
      
      // Sécurité pour s'adapter automatiquement au format des feux
      const wildfireResult = results[2].status === 'fulfilled' ? results[2].value : [];
      const fires = Array.isArray(wildfireResult) ? wildfireResult : (wildfireResult.fires || []);
      
      const climate = results[3].status === 'fulfilled' ? results[3].value : [];

      // Mises à jour des panneaux classiques avec la donnée sécurisée
      if (this.map) this.map.updateLiveData(earthquakes, naturalEvents, fires);
      if (this.maritimePanel) this.maritimePanel.updateData(naturalEvents);
      if (this.cascadePanel) this.cascadePanel.updateData(earthquakes, fires);
      if (this.climatePanel) this.climatePanel.updateData(climate);

    } catch (err) {
      console.error("Erreur critique dans le flux de données:", err);
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
           <div style="width: 8px; height: 8px; border-radius: 50%; background: #44ff88; box-shadow: 0 0 10px #44ff88;"></div>
           <span style="font-size: 10px; color: #fff; font-weight: bold; letter-spacing: 1px;">SYSTÈME OPÉRATIONNEL</span>
        </div>
      </header>
      
      <main class="main-content" style="display: flex; flex-direction: column; height: calc(100vh - 40px); background: #0a0a0a; overflow: hidden;">
        <section class="map-section" style="height: 45vh; min-height: 400px; position: relative; flex-shrink: 0; border-bottom: 1px solid #2a2a2a;">
          <div id="map-container" style="position: absolute; inset: 0;"></div>
        </section>
        
        <section id="panels-container" class="panels-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px; overflow-y: auto;">
        </section>
      </main>
    `;
  }
}
