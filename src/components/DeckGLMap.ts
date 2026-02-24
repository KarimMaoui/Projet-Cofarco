// src/components/DeckGLMap.ts
import { MapboxOverlay } from '@deck.gl/mapbox';
import { GeoJsonLayer, PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';
import type { MapLayers } from '../types';

// Nous importerons tes fichiers de configuration ici à la prochaine étape
import { PIPELINES } from '../config/pipelines';
import { PORTS } from '../config/ports';
import { CONFLICT_ZONES, STRATEGIC_WATERWAYS } from '../config/geo';

interface DeckMapState {
  zoom: number;
  pan: { x: number; y: number };
  view: string;
  layers: MapLayers;
}

const DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export class DeckGLMap {
  private container: HTMLElement;
  private deckOverlay: MapboxOverlay | null = null;
  private maplibreMap: maplibregl.Map | null = null;
  private state: DeckMapState;

  constructor(container: HTMLElement, initialState: DeckMapState) {
    this.container = container;
    this.state = initialState;

    this.setupDOM();
    this.initMapLibre();

    this.maplibreMap?.on('load', () => {
      this.initDeck();
    });
  }

  private setupDOM(): void {
    this.container.style.position = 'relative';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    
    const mapContainer = document.createElement('div');
    mapContainer.id = 'deckgl-basemap';
    mapContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
    this.container.appendChild(mapContainer);
  }

  private initMapLibre(): void {
    this.maplibreMap = new maplibregl.Map({
      container: 'deckgl-basemap',
      style: DARK_STYLE,
      center: [20, 30], // Centré sur l'Europe/Moyen-Orient/Afrique
      zoom: this.state.zoom,
      attributionControl: false,
    });
  }

  private initDeck(): void {
    if (!this.maplibreMap) return;

    this.deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers: this.buildLayers(),
    });

    this.maplibreMap.addControl(this.deckOverlay as unknown as maplibregl.IControl);
  }

  public render(): void {
    if (this.deckOverlay) {
      this.deckOverlay.setProps({ layers: this.buildLayers() });
    }
  }

  private buildLayers() {
    const layers = [];

    // 1. Pipelines (Pétrole & Gaz)
    if (this.state.layers.pipelines) {
      layers.push(new PathLayer({
        id: 'pipelines-layer',
        data: PIPELINES,
        getPath: (d) => d.points,
        getColor: (d) => d.type === 'oil' ? [255, 107, 53, 200] : [0, 180, 216, 200], // Orange pour Oil, Bleu pour Gas
        getWidth: 2,
        widthMinPixels: 2,
        pickable: true
      }));
    }

    // 2. Ports (Commodities)
    if (this.state.layers.ports) {
      layers.push(new ScatterplotLayer({
        id: 'ports-layer',
        data: PORTS,
        getPosition: (d) => [d.lon, d.lat],
        getRadius: 8000,
        getFillColor: (d) => d.type === 'oil' || d.type === 'lng' ? [255, 140, 0, 200] : [0, 200, 255, 180],
        radiusMinPixels: 4,
        pickable: true
      }));
    }

    // 3. Zones de conflit (Risque géopolitique)
    if (this.state.layers.conflicts) {
      const conflictGeoJSON = {
        type: 'FeatureCollection',
        features: CONFLICT_ZONES.map(zone => ({
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [zone.coords] },
          properties: { name: zone.name }
        }))
      };
      
      layers.push(new GeoJsonLayer({
        id: 'conflicts-layer',
        data: conflictGeoJSON,
        filled: true,
        stroked: true,
        getFillColor: [255, 0, 0, 60],
        getLineColor: [255, 0, 0, 180],
        getLineWidth: 2,
        lineWidthMinPixels: 1,
      }));
    }

    // 4. Strategic Waterways / Chokepoints (Ormuz, Suez, etc.)
    if (this.state.layers.waterways) {
      layers.push(new ScatterplotLayer({
        id: 'waterways-layer',
        data: STRATEGIC_WATERWAYS,
        getPosition: (d) => [d.lon, d.lat],
        getRadius: 15000,
        getFillColor: [255, 255, 0, 180], // Jaune pour les chokepoints
        radiusMinPixels: 6,
        pickable: true
      }));
    }

    return layers;
  }
}
