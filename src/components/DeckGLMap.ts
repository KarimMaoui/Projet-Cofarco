// src/components/DeckGLMap.ts
import { MapboxOverlay } from '@deck.gl/mapbox';
import { GeoJsonLayer, PathLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';
import type { MapLayers } from '../types';

// Imports des données statiques
import { PIPELINES } from '../config/pipelines';
import { PORTS } from '../config/ports';
import { CONFLICT_ZONES, STRATEGIC_WATERWAYS } from '../config/geo';
import { CRITICAL_MINERALS } from '../config/demo-data';

const DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

// --- DICTIONNAIRE DES PAYS (Pour éviter de répéter les coordonnées) ---
const C: Record<string, { lon: number, lat: number }> = {
  'Chine': { lon: 104.1954, lat: 35.8617 }, 'Inde': { lon: 78.9629, lat: 20.5937 },
  'USA': { lon: -95.7129, lat: 37.0902 }, 'Russie': { lon: 105.3188, lat: 61.524 },
  'Brésil': { lon: -51.9253, lat: -14.235 }, 'Australie': { lon: 133.7751, lat: -25.2744 },
  'Canada': { lon: -106.3468, lat: 56.1304 }, 'France': { lon: 2.2137, lat: 46.2276 },
  'Pakistan': { lon: 69.3451, lat: 30.3753 }, 'Ukraine': { lon: 31.1656, lat: 48.3794 },
  'Allemagne': { lon: 10.4515, lat: 51.1657 }, 'Thaïlande': { lon: 100.9925, lat: 15.8700 },
  'Mexique': { lon: -102.5528, lat: 23.6345 }, 'Vietnam': { lon: 108.2772, lat: 14.0583 },
  'Colombie': { lon: -74.2973, lat: 4.5709 }, 'Indonésie': { lon: 113.9213, lat: -0.7893 },
  'Éthiopie': { lon: 40.4897, lat: 9.145 }, 'Honduras': { lon: -86.2419, lat: 15.2000 },
  'Ouganda': { lon: 32.2903, lat: 1.3733 }, 'Guatemala': { lon: -90.2308, lat: 15.7835 },
  'Argentine': { lon: -63.6167, lat: -38.4161 }, 'Afrique du Sud': { lon: 22.9375, lat: -30.5595 },
  'Bangladesh': { lon: 90.3563, lat: 23.6850 }, 'Myanmar': { lon: 95.9560, lat: 21.9162 },
  'Philippines': { lon: 121.7740, lat: 12.8797 }, 'Japon': { lon: 138.2529, lat: 36.2048 },
  'Paraguay': { lon: -58.4438, lat: -23.4425 }, 'Bolivie': { lon: -63.5887, lat: -16.2902 },
  'Turquie': { lon: 35.2433, lat: 38.9637 }, 'Ouzbékistan': { lon: 64.5853, lat: 41.3775 },
  'Mali': { lon: -3.9962, lat: 17.5707 }, 'Arabie Saoudite': { lon: 45.0792, lat: 23.8859 },
  'Irak': { lon: 43.6793, lat: 33.2232 }, 'EAU': { lon: 53.8478, lat: 23.4241 },
  'Iran': { lon: 53.6880, lat: 32.4279 }, 'Koweït': { lon: 47.4818, lat: 29.3117 },
  'Qatar': { lon: 51.1839, lat: 25.3548 }, 'Norvège': { lon: 8.4689, lat: 60.4720 },
  'Algérie': { lon: 1.6596, lat: 28.0339 }, 'Pologne': { lon: 19.1451, lat: 51.9194 },
  'Kazakhstan': { lon: 66.9237, lat: 48.0196 }, 'Namibie': { lon: 18.4904, lat: -22.9576 },
  'Niger': { lon: 8.0817, lat: 17.6078 }, 'Pérou': { lon: -75.0152, lat: -9.1900 },
  'Chili': { lon: -71.5430, lat: -35.6751 }, 'RDC': { lon: 23.6980, lat: -4.0383 },
  'Zambie': { lon: 27.8493, lat: -13.1339 }, 'Zimbabwe': { lon: 29.1549, lat: -19.0154 },
  'Portugal': { lon: -8.2245, lat: 39.3999 }, 'Madagascar': { lon: 46.8691, lat: -18.7669 }
};

// --- LES 16 MATIÈRES PREMIÈRES & LEURS TOP PRODUCTEURS ---
const buildCountries = (names: string[]) => names.map(n => ({ name: n, ...C[n] }));

const PRODUCERS: Record<string, any> = {
  // Agriculture
  wheat: { emoji: '🌾', name: 'Blé', countries: buildCountries(['Chine', 'Inde', 'Russie', 'USA', 'France', 'Australie', 'Canada', 'Pakistan', 'Ukraine', 'Allemagne']) },
  corn: { emoji: '🌽', name: 'Maïs', countries: buildCountries(['USA', 'Chine', 'Brésil', 'Argentine', 'Ukraine', 'Inde', 'Mexique', 'Afrique du Sud', 'Russie', 'France']) },
  rice: { emoji: '🍚', name: 'Riz', countries: buildCountries(['Chine', 'Inde', 'Bangladesh', 'Indonésie', 'Vietnam', 'Thaïlande', 'Myanmar', 'Philippines', 'Japon', 'Brésil']) },
  soybeans: { emoji: '🌿', name: 'Soja', countries: buildCountries(['Brésil', 'USA', 'Argentine', 'Chine', 'Inde', 'Paraguay', 'Canada', 'Russie', 'Bolivie', 'Ukraine']) },
  sugar: { emoji: '🍬', name: 'Sucre', countries: buildCountries(['Brésil', 'Inde', 'Thaïlande', 'Chine', 'USA', 'Russie', 'Mexique', 'Pakistan', 'France', 'Australie']) },
  coffee: { emoji: '☕', name: 'Café', countries: buildCountries(['Brésil', 'Vietnam', 'Colombie', 'Indonésie', 'Éthiopie', 'Honduras', 'Inde', 'Ouganda', 'Mexique', 'Guatemala']) },
  cotton: { emoji: '🧶', name: 'Coton', countries: buildCountries(['Chine', 'Inde', 'USA', 'Brésil', 'Pakistan', 'Australie', 'Turquie', 'Ouzbékistan', 'Argentine', 'Mali']) },
  
  // Énergie
  oil: { emoji: '🛢️', name: 'Pétrole Brut', countries: buildCountries(['USA', 'Arabie Saoudite', 'Russie', 'Canada', 'Irak', 'Chine', 'EAU', 'Brésil', 'Iran', 'Koweït']) },
  gas: { emoji: '🔥', name: 'Gaz Naturel', countries: buildCountries(['USA', 'Russie', 'Iran', 'Chine', 'Canada', 'Qatar', 'Australie', 'Norvège', 'Arabie Saoudite', 'Algérie']) },
  coal: { emoji: '⛏️', name: 'Charbon', countries: buildCountries(['Chine', 'Inde', 'USA', 'Australie', 'Indonésie', 'Russie', 'Afrique du Sud', 'Allemagne', 'Pologne', 'Kazakhstan']) },
  uranium: { emoji: '☢️', name: 'Uranium', countries: buildCountries(['Kazakhstan', 'Canada', 'Namibie', 'Australie', 'Ouzbékistan', 'Russie', 'Niger', 'Chine', 'Inde', 'Afrique du Sud']) },
  
  // Minerais & Métaux
  gold: { emoji: '🥇', name: 'Or', countries: buildCountries(['Chine', 'Australie', 'Russie', 'Canada', 'USA', 'Mexique', 'Kazakhstan', 'Afrique du Sud', 'Pérou', 'Ouzbékistan']) },
  copper: { emoji: '🥉', name: 'Cuivre', countries: buildCountries(['Chili', 'Pérou', 'RDC', 'Chine', 'USA', 'Russie', 'Indonésie', 'Australie', 'Zambie', 'Mexique']) },
  iron: { emoji: '🧲', name: 'Minerai de Fer', countries: buildCountries(['Australie', 'Brésil', 'Chine', 'Inde', 'Russie', 'Ukraine', 'Afrique du Sud', 'Canada', 'Kazakhstan', 'USA']) },
  lithium: { emoji: '🔋', name: 'Lithium', countries: buildCountries(['Australie', 'Chili', 'Chine', 'Argentine', 'Brésil', 'Zimbabwe', 'Portugal', 'USA', 'Canada', 'Bolivie']) },
  rare_earths: { emoji: '💠', name: 'Terres Rares', countries: buildCountries(['Chine', 'USA', 'Myanmar', 'Australie', 'Thaïlande', 'Madagascar', 'Inde', 'Russie', 'Brésil', 'Vietnam']) }
};

export class DeckGLMap {
  private container: HTMLElement;
  private deckOverlay: MapboxOverlay | null = null;
  private maplibreMap: maplibregl.Map | null = null;
  private state: { zoom: number; layers: any };
  
  private liveEarthquakes: any[] = [];
  private liveNaturalEvents: any[] = [];
  private liveFires: any[] = [];
  
  private selectedCommodity: string = 'none';

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
            html = `<strong>🔴 Séisme (USGS)</strong><br/>Magnitude: ${mag}<br/>Lieu: ${obj.place || 'Inconnu'}`;
          } else if (layerId === 'producers-layer') {
            const com = PRODUCERS[this.selectedCommodity];
            html = `<div style="text-align:center;">
                      <div style="font-size: 24px; margin-bottom: 4px;">${com.emoji}</div>
                      <strong>Producteur Majeur de ${com.name}</strong><br/>
                      <span style="color:#44ff88;">Pays : ${obj.name}</span>
                    </div>`;
          }
        } catch (e) {
          html = `<strong>Événement détecté</strong>`;
        }

        return html ? { html: `<div class="deckgl-tooltip" style="background: rgba(10,10,10,0.9); border: 1px solid #44ff88; padding: 10px; border-radius: 6px; color: white; font-family: 'Inter', sans-serif; font-size: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">${html}</div>` } : null;
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
      { key: 'conflicts', label: 'ZONES DE CONFLIT', icon: '⚔️' },
      { key: 'earthquakes', label: 'SÉISMES LIVE (USGS)', icon: '🔴' },
      { key: 'nasa', label: 'TEMPÊTES & VOLCANS', icon: '🌪️' },
      { key: 'fires', label: 'INCENDIES LIVE (NASA)', icon: '🔥' }
    ];

    let html = `<div class="layer-menu-header"><span>COUCHES & DONNÉES</span><span>▼</span></div><div class="layer-list">`;

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

    // --- LE MENU DÉROULANT COMPLET DES COMMODITIES ---
    html += `
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #333;">
        <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: #888; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">
          TOP 10 PRODUCTEURS (MACRO)
        </label>
        <select id="commodity-select" style="width: 100%; background: #1a1a1a; color: white; border: 1px solid #44ff88; padding: 8px; border-radius: 4px; font-size: 12px; outline: none; cursor: pointer;">
          <option value="none">-- Désactivé --</option>
          <optgroup label="🌱 AGRICULTURE">
            <option value="wheat">🌾 Blé</option>
            <option value="corn">🌽 Maïs</option>
            <option value="rice">🍚 Riz</option>
            <option value="soybeans">🌿 Soja</option>
            <option value="sugar">🍬 Sucre</option>
            <option value="coffee">☕ Café</option>
            <option value="cotton">🧶 Coton</option>
          </optgroup>
          <optgroup label="⚡ ÉNERGIE">
            <option value="oil">🛢️ Pétrole Brut</option>
            <option value="gas">🔥 Gaz Naturel</option>
            <option value="coal">⛏️ Charbon</option>
            <option value="uranium">☢️ Uranium</option>
          </optgroup>
          <optgroup label="💎 MINERAIS & MÉTAUX">
            <option value="gold">🥇 Or</option>
            <option value="copper">🥉 Cuivre</option>
            <option value="iron">🧲 Minerai de Fer</option>
            <option value="lithium">🔋 Lithium</option>
            <option value="rare_earths">💠 Terres Rares</option>
          </optgroup>
        </select>
      </div>
    `;

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

    const select = menu.querySelector('#commodity-select') as HTMLSelectElement;
    select.addEventListener('change', (e) => {
      this.selectedCommodity = (e.target as HTMLSelectElement).value;
      this.render(); 
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

    // 2. LA COUCHE DES PRODUCTEURS (Les emojis sur la carte)
    if (this.selectedCommodity !== 'none') {
      const commodityData = PRODUCERS[this.selectedCommodity];
      layers.push(new TextLayer({
        id: 'producers-layer',
        data: commodityData.countries,
        getPosition: (d: any) => [d.lon, d.lat],
        getText: () => commodityData.emoji,
        getSize: 32, // Emoji bien visible
        getPixelOffset: [0, 0], 
        pickable: true
      }));
    }

    // 3. Vraies données LIVE
    if (this.state.layers.earthquakes && this.liveEarthquakes.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'earthquakes-layer',
        data: this.liveEarthquakes,
        getPosition: (d) => d.coordinates,
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
        getPosition: (d) => d.coordinates,
        getRadius: 18000,
        getFillColor: (d) => {
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
