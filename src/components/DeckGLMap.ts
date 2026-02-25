// src/components/DeckGLMap.ts
import { MapboxOverlay } from '@deck.gl/mapbox';
import { GeoJsonLayer, PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';
import type { MapLayers } from '../types';

// Imports des données statiques (Vraies infrastructures mondiales)
import { PIPELINES } from '../config/pipelines';
import { PORTS } from '../config/ports';
import { CONFLICT_ZONES, STRATEGIC_WATERWAYS } from '../config/geo';
import { CRITICAL_MINERALS } from '../config/demo-data';

const DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export class DeckGLMap {
  private container: HTMLElement;
  private deckOverlay: MapboxOverlay | null = null;
  private maplibreMap: maplibregl.Map | null = null;
  private state: { zoom: number; layers: any };
  
  // Variables pour stocker les VRAIES données Live
  private liveEarthquakes: any[] = [];
  private liveNaturalEvents: any[] = [];
  private liveFires: any[] = [];

  constructor(container: HTMLElement, initialState: any) {
    this.container = container;
    this.state = initialState;

    this.setupDOM();
    this.initMapLibre();
    this.createLayerMenu();
    this.createLegend();

    this.maplibreMap?.on('load', () => {
      this.initDeck();
    });
  }

  public updateLiveData(earthquakes: any[], naturalEvents: any[], fires: any[]) {
    this.liveEarthquakes = earthquakes;
    this.liveNaturalEvents = naturalEvents;
    this.liveFires = fires;
    this.render();
  }

  private setupDOM(): void {
    this.container.style.position = 'relative';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    const mapContainer = document.createElement('div');
    mapContainer.id = 'deckgl-basemap';
    mapContainer.style.cssText = 'position: absolute; inset: 0;';
    this.container.appendChild(mapContainer);
  }

  private initMapLibre(): void {
    this.maplibreMap = new maplibregl.Map({
      container: 'deckgl-basemap',
      style: DARK_STYLE,
      center: [20, 30],
      zoom: this.state.zoom,
      attributionControl: false,
    });
  }

  private initDeck(): void {
    if (!this.maplibreMap) return;
    this.deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers: this.buildLayers(),
      // --- GESTION DES TOOLTIPS SÉCURISÉE ---
      getTooltip: (info: any) => {
        if (!info.object) return null;
        const obj = info.object;
        const layerId = info.layer.id;
        let html = '';

        try {
          if (layerId === 'pipelines-layer') {
            html = `<strong>${obj.name}</strong><br/>Type: ${obj.type.toUpperCase()}<br/>Capacité: ${obj.capacity || 'Inconnue'}`;
          } else if (layerId === 'ports-layer') {
            html = `<strong>${obj.name}</strong><br/>Pays: ${obj.country}<br/>${obj.note}`;
          } else if (layerId === 'conflicts-layer') {
            html = `<strong>${obj.properties.name}</strong><br/>Zone sous tension affectant le fret.`;
          } else if (layerId === 'waterways-layer') {
            html = `<strong>${obj.name}</strong><br/>${obj.description}`;
          } else if (layerId === 'minerals-layer') {
            html = `<strong>${obj.name} (${obj.mineral})</strong><br/>Statut: ${obj.status.toUpperCase()}<br/>${obj.significance}`;
          } else if (layerId === 'fires-layer') {
            const frp = obj.frp ? Number(obj.frp).toFixed(1) : 'Inconnue';
            html = `<strong>🔥 Incendie Détecté (NASA)</strong><br/>Puissance (FRP): ${frp} MW`;
          } else if (layerId === 'nasa-events-layer') {
            const cat = Array.isArray(obj.categories) ? obj.categories.join(', ') : (obj.categories || 'Inconnue');
            html = `<strong>⚠️ Alerte NASA EONET</strong><br/>Type: ${cat.toUpperCase()}<br/>${obj.title}`;
          } else if (layerId === 'earthquakes-layer') {
            const mag = obj.mag ? Number(obj.mag).toFixed(1) : 'Inconnue';
            const time = obj.time ? new Date(obj.time).toLocaleTimeString() : 'Heure inconnue';
            html = `<strong>🔴 Séisme (USGS)</strong><br/>Magnitude: ${mag}<br/>Lieu: ${obj.place || 'Inconnu'}<br/>Heure: ${time}`;
          }
        } catch (e) {
          html = `<strong>Événement détecté</strong>`; // Sécurité si une donnée est corrompue
        }

        return html ? { html: `<div class="deckgl-tooltip" style="background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 8px; border-radius: 4px; color: white; font-family: sans-serif; font-size: 12px;">${html}</div>` } : null;
      },
    });
    this.maplibreMap.addControl(this.deckOverlay as unknown as maplibregl.IControl);
  }

  public render(): void {
    if (this.deckOverlay) {
      this.deckOverlay.setProps({ layers: this.buildLayers() });
    }
  }

  private createLayerMenu(): void {
    const menu = document.createElement('div');
    menu.className = 'layer-menu';
    
    const layersConfig = [
      { key: 'pipelines', label: 'OLÉODUCS ET GAZODUCS', icon: '🛢️' },
      { key: 'ports', label: 'PORTS STRATÉGIQUES', icon: '🚢' },
      { key: 'waterways', label: 'CHOKEPOINTS MARITIMES', icon: '⚓' },
      { key: 'minerals', label: 'MINÉRAUX CRITIQUES', icon: '💎' },
      { key: 'conflicts', label: 'ZONES DE CONFLIT', icon: '⚔️' },
      { key: 'earthquakes', label: 'SÉISMES LIVE (USGS)', icon: '🔴' },
      { key: 'nasa', label: 'TEMPÊTES & VOLCANS', icon: '🌪️' },
      { key: 'fires', label: 'INCENDIES LIVE (NASA)', icon: '🔥' }
    ];

    let html = `<div class="layer-menu-header"><span>COUCHES</span><span>▼</span></div><div class="layer-list">`;

    layersConfig.forEach(({ key, label, icon }) => {
      const isChecked = this.state.layers[key] ? 'checked' : '';
      html += `
        <label class="layer-item">
          <input type="checkbox" data-layer="${key}" ${isChecked}>
          <span class="custom-checkbox"></span>
          <span class="layer-icon">${icon}</span>
          <span class="layer-label">${label}</span>
        </label>
      `;
    });

    html += `</div>`;
    menu.innerHTML = html;
    this.container.appendChild(menu);

    menu.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const layerKey = target.getAttribute('data-layer');
        if (layerKey) {
          this.state.layers[layerKey] = target.checked;
          this.render(); 
        }
      });
    });
  }

  private createLegend(): void {
    const legend = document.createElement('div');
    legend.style.cssText = `
      position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 16px; padding: 6px 16px;
      background: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 4px;
      font-family: monospace; font-size: 10px; color: #888; z-index: 100;
      white-space: nowrap;
    `;
    legend.innerHTML = `
      <span style="font-weight:bold; color: #ccc;">LÉGENDE</span>
      <span style="display:flex; align-items:center; gap:4px;"><span style="color:#ffaa00;">●</span> Chokepoints / Risques</span>
      <span style="display:flex; align-items:center; gap:4px;"><span style="color:#ff4444;">●</span> Catastrophes / Conflits</span>
      <span style="display:flex; align-items:center; gap:4px;"><span style="color:#00aaff;">●</span> Infrastructures Marines</span>
    `;
    this.container.appendChild(legend);
  }

  private buildLayers() {
    const layers = [];

    // 1. Infrastructures & Géopolitique
    if (this.state.layers.pipelines) {
      layers.push(new PathLayer({ id: 'pipelines-layer', data: PIPELINES, getPath: (d) => d.points, getColor: (d) => d.type === 'oil' ? [255, 107, 53, 200] : [0, 180, 216, 200], getWidth: 2, widthMinPixels: 2, pickable: true }));
    }
    if (this.state.layers.ports) {
      layers.push(new ScatterplotLayer({ id: 'ports-layer', data: PORTS, getPosition: (d) => [d.lon, d.lat], getRadius: 8000, getFillColor: (d) => d.type === 'oil' || d.type === 'lng' ? [255, 140, 0, 200] : [0, 200, 255, 180], radiusMinPixels: 4, pickable: true }));
    }
    if (this.state.layers.waterways) {
      layers.push(new ScatterplotLayer({ id: 'waterways-layer', data: STRATEGIC_WATERWAYS, getPosition: (d) => [d.lon, d.lat], getRadius: 15000, getFillColor: [255, 255, 0, 180], radiusMinPixels: 6, pickable: true }));
    }
    if (this.state.layers.conflicts) {
      const conflictGeoJSON = { type: 'FeatureCollection', features: CONFLICT_ZONES.map(zone => ({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [zone.coords] }, properties: { name: zone.name } })) };
      layers.push(new GeoJsonLayer({ id: 'conflicts-layer', data: conflictGeoJSON, filled: true, stroked: true, getFillColor: [255, 0, 0, 40], getLineColor: [255, 0, 0, 180], getLineWidth: 2, lineWidthMinPixels: 1, pickable: true }));
    }
    if (this.state.layers.minerals) {
      layers.push(new ScatterplotLayer({ id: 'minerals-layer', data: CRITICAL_MINERALS, getPosition: (d) => [d.lon, d.lat], getRadius: 10000, getFillColor: [0, 200, 255, 200], radiusMinPixels: 5, pickable: true }));
    }

    // 3. Vraies données LIVE
    if (this.state.layers.earthquakes && this.liveEarthquakes.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'earthquakes-layer',
        data: this.liveEarthquakes,
        getPosition: (d) => d.coordinates, // L'USGS renvoie déjà [lon, lat] dans coordinates
        getRadius: (d) => Math.pow(2, d.mag || 1) * 1500,
        getFillColor: [255, 68, 68, 180],
        radiusMinPixels: 4,
        pickable: true
      }));
    }

    if (this.state.layers.nasa && this.liveNaturalEvents.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'nasa-events-layer',
        data: this.liveNaturalEvents,
        getPosition: (d) => d.coordinates, // Récupéré de api.ts
        getRadius: 18000,
        getFillColor: (d) => {
          // Correction du crash .includes()
          const catString = Array.isArray(d.categories) ? d.categories.join(' ').toLowerCase() : '';
          return catString.includes('volcanoes') || catString.includes('wildfires') ? [255, 100, 0, 200] : [0, 150, 255, 200];
        },
        radiusMinPixels: 5,
        pickable: true
      }));
    }

    if (this.state.layers.fires && this.liveFires.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'fires-layer',
        data: this.liveFires,
        getPosition: (d) => [d.lon, d.lat],
        getRadius: (d) => Math.min((d.frp || 50) * 150, 30000), 
        getFillColor: (d) => (d.frp && d.frp > 100) ? [255, 60, 0, 200] : [255, 140, 0, 150],
        radiusMinPixels: 3,
        pickable: true
      }));
    }

    return layers;
  }
}
