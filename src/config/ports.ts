import type { Port } from '../types';

export const PORTS: Port[] = [
  // Ports Pétroliers et GNL (Commodities critiques)
  { id: 'ras_tanura', name: 'Ras Tanura', lat: 26.64, lon: 50.16, country: 'Saudi Arabia', type: 'oil', note: "Plus grand terminal pétrolier offshore. Saudi Aramco. 6.5M+ bpd." },
  { id: 'fujairah', name: 'Port of Fujairah', lat: 25.12, lon: 56.35, country: 'UAE', type: 'oil', note: 'Hub de soutage. Contournement d\'Ormuz.' },
  { id: 'kharg_island', name: 'Kharg Island', lat: 29.23, lon: 50.31, country: 'Iran', type: 'oil', note: "Terminal principal d'exportation pétrolière de l'Iran." },
  { id: 'ras_laffan', name: 'Ras Laffan', lat: 25.93, lon: 51.54, country: 'Qatar', type: 'lng', note: "Plus grand terminal d'exportation GNL au monde." },
  { id: 'novorossiysk', name: 'Novorossiysk', lat: 44.72, lon: 37.77, country: 'Russia', type: 'oil', note: "Port majeur de la mer Noire (Russie). Terminal CPC." },
  
  // Ports Chokepoints (Risque logistique)
  { id: 'port_said', name: 'Port Said', lat: 31.26, lon: 32.30, country: 'Egypt', type: 'mixed', note: 'Entrée Nord du Canal de Suez. 12% du commerce mondial.' },
  { id: 'suez_port', name: 'Port of Suez', lat: 29.97, lon: 32.55, country: 'Egypt', type: 'mixed', note: 'Terminus Sud du Canal de Suez. Accès Mer Rouge.' },
  { id: 'djibouti', name: 'Port of Djibouti', lat: 11.59, lon: 43.15, country: 'Djibouti', type: 'mixed', note: 'Porte de Bab el-Mandeb.' },
  { id: 'aden', name: 'Port of Aden', lat: 12.79, lon: 45.03, country: 'Yemen', type: 'mixed', note: 'Port stratégique Mer Rouge. Zone de conflit Houthi.' },
  { id: 'bandar_abbas', name: 'Bandar Abbas', lat: 27.18, lon: 56.28, country: 'Iran', type: 'mixed', note: "Plus grand port conteneurs d'Iran. Détroit d'Ormuz." },
  
  // Hubs Commerciaux Majeurs
  { id: 'shanghai', name: 'Port of Shanghai', lat: 31.23, lon: 121.47, country: 'China', type: 'container', rank: 1, note: "Port le plus actif au monde." },
  { id: 'singapore', name: 'Port of Singapore', lat: 1.26, lon: 103.84, country: 'Singapore', type: 'mixed', rank: 2, note: 'Hub de transbordement majeur. Malacca.' },
  { id: 'rotterdam', name: 'Port of Rotterdam', lat: 51.90, lon: 4.50, country: 'Netherlands', type: 'mixed', rank: 10, note: "Plus grand port d'Europe. Hub énergétique." },
  { id: 'houston', name: 'Port of Houston', lat: 29.73, lon: -95.02, country: 'USA', type: 'mixed', note: 'Hub pétrochimique américain.' }
];
