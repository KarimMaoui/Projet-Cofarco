// src/App.ts
import { DeckGLMap } from './components/DeckGLMap';

export class App {
  private containerId: string;
  private map!: DeckGLMap;

  constructor(containerId: string) {
    this.containerId = containerId;
  }

  public async init(): Promise<void> {
    const container = document.getElementById(this.containerId);
    if (!container) throw new Error(`Container #${this.containerId} not found`);

    // 1. Injecter la structure HTML du Dashboard
    this.renderLayout(container);

    // 2. Initialiser la carte 3D
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      this.map = new DeckGLMap(mapContainer, {
        zoom: 2.5,
        pan: { x: 0, y: 0 },
        view: 'global',
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
  }

  private renderLayout(container: HTMLElement) {
    container.innerHTML = `
      <header class="header">
        <div class="logo" style="color: #44ff88;">COFARCO RISK MONITOR</div>
        <div style="font-size: 11px; color: #888;">COMMODITIES & TRADE FINANCE</div>
      </header>
      <main class="main-content">
        <section class="map-section">
          <div id="map-container"></div>
        </section>
        <section class="panels-grid">
          <div class="panel" style="padding: 16px; border: 1px solid #2a2a2a; border-radius: 8px;">
            <h3 style="margin-top:0; font-size: 12px; color: #aaa; text-transform: uppercase;">Flux Stratégiques</h3>
            <p style="font-size: 12px; color: #666;">En attente des données...</p>
          </div>
          <div class="panel" style="padding: 16px; border: 1px solid #2a2a2a; border-radius: 8px;">
            <h3 style="margin-top:0; font-size: 12px; color: #aaa; text-transform: uppercase;">Alerte Chokepoints</h3>
            <p style="font-size: 12px; color: #666;">En attente des alertes...</p>
          </div>
        </section>
      </main>
    `;
  }
}
