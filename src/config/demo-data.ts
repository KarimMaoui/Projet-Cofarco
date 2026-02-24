// src/config/demo-data.ts

export const CRITICAL_MINERALS = [
  { id: '1', name: 'Salar de Atacama', lat: -23.50, lon: -68.33, mineral: 'Lithium', country: 'Chile', operator: 'SQM', status: 'producing', significance: 'Plus grande réserve de Lithium' },
  { id: '2', name: 'Mutanda Mine', lat: -10.78, lon: 25.80, mineral: 'Cobalt', country: 'DRC', operator: 'Glencore', status: 'producing', significance: 'Mine critique pour batteries' },
];

export const DEMO_FIRES = [
  { lat: 31.9, lon: -102.3, brightness: 450, frp: 120, region: "Permian Basin (USA)", note: "Proximité infrastructures pétrolières" },
  { lat: -21.0, lon: 149.0, brightness: 380, frp: 80, region: "Queensland (Australie)", note: "Risque exportations charbon" }
];

export const DEMO_WEATHER = [
  { lat: 25.0, lon: -90.0, severity: 'Extreme', event: 'Ouragan Cat 4', headline: 'Menace sur le Golfe du Mexique (Fermeture raffineries)' },
  { lat: 10.0, lon: 115.0, severity: 'Severe', event: 'Typhon', headline: 'Perturbation des routes maritimes Mer de Chine' }
];

export const DEMO_MILITARY = [
  { lat: 34.0, lon: 35.0, operator: 'usn', type: 'carrier', name: 'USS Gerald R. Ford', heading: 45, isDark: false },
  { lat: 12.5, lon: 43.5, operator: 'rn', type: 'destroyer', name: 'HMS Diamond (Escorte)', heading: 320, isDark: false },
  { lat: 26.0, lon: 55.0, operator: 'other', type: 'submarine', name: 'Sous-marin non identifié', heading: 0, isDark: true } // isDark = transpondeur coupé
];

export const DEMO_AIS_DENSITY = [
  { lat: 30.0, lon: 32.5, intensity: 0.9, deltaPct: 15, note: "Congestion forte Suez" },
  { lat: -34.5, lon: 18.5, intensity: 0.6, deltaPct: 45, note: "Reroutage Cap de Bonne Espérance" }
];

export const DEMO_CLIMATE_ANOMALIES = [
  { lat: 9.0, lon: -79.5, tempDelta: 0, precipDelta: -0.8, note: "Sécheresse Canal de Panama (Baisse tirant d'eau)" }
];
