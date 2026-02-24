// src/App.ts
import { DeckGLMap } from './components/DeckGLMap';
import { MaritimePanel } from './components/MaritimePanel';
import { CascadePanel } from './components/CascadePanel';

// Uniquement les VRAIES API
import { fetchLiveEarthquakes, fetchLiveNaturalEvents } from './services/api';
import { fetchLiveFires } from './services/wildfires';

export class App {
  private containerId: string;
  private map!: DeckGLMap;
  private maritimePanel!: MaritimePanel;
  private cascadePanel!: CascadePanel;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public async init(): Promise<void> {
    const container = document.getElementById(this.containerId);
    if (!container) throw new Error(`Container #${this.containerId} not found`);

    this.renderLayout(container);

    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      this.map = new DeckGLMap(mapContainer, {
        zoom: 3.5,
        pan: { x: 0, y: 0 },
        layers: {
          pipelines: true,
          ports: true,
          waterways: true,
          conflicts: true,
          minerals: true,
          earthquakes: true, 
          nasa: true,
          fires: true
        }
      });
    }

    const panelsContainer = document.getElementById('panels-container');
    if (panelsContainer) {
      this.maritimePanel = new MaritimePanel();
      this.cascadePanel = new CascadePanel();

      panelsContainer.appendChild(this.maritimePanel.element);
      panelsContainer.appendChild(this.cascadePanel.element);

      this.maritimePanel.showLoading("Récupération des données satellites NASA...");
      this.cascadePanel.showLoading("Connexion aux sismographes de l'USGS...");
    }

    this.loadRealTimeData();
  }

  private async loadRealTimeData() {
    try {
      // 100% Données Réelles
      const [earthquakes, naturalEvents, fires] = await Promise.all([
        fetchLiveEarthquakes(),
        fetchLiveNaturalEvents(),
        fetchLiveFires()
      ]);
      
      if (this.map) {
        this.map.updateLiveData(earthquakes, naturalEvents, fires);
      }

      if (this.maritimePanel) {
        this.maritimePanel.updateData(naturalEvents);
      }
      if (this.cascadePanel) {
        this.cascadePanel.updateData(earthquakes, fires);
      }

    } catch (err) {
      console.error("Erreur de récupération", err);
      if (this.maritimePanel) this.maritimePanel.setContent(`<div style="color:#ff4444; padding:16px;">Erreur API NASA</div>`);
      if (this.cascadePanel) this.cascadePanel.setContent(`<div style="color:#ff4444; padding:16px;">Erreur API USGS</div>`);
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
           <span style="font-size: 10px; color: #fff; font-weight: bold; letter-spacing: 1px;">LIVE (USGS / NASA FIRMS)</span>
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
        @keyframes pulse { 0% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,68,68,0.4); } 70% { opacity: 0.5; box-shadow: 0 0 0 6px rgba(255,68,68,0); } 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,68,68,0); } }
      </style>
    `;
  }
}
