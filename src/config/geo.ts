import type { ConflictZone, StrategicWaterway } from '../types';

export const STRATEGIC_WATERWAYS: StrategicWaterway[] = [
  { id: 'taiwan_strait', name: 'DÉTROIT DE TAIWAN', lat: 24.0, lon: 119.5, description: 'Route commerciale critique, tensions géopolitiques.' },
  { id: 'malacca_strait', name: 'DÉTROIT DE MALACCA', lat: 2.5, lon: 101.5, description: 'Route d\'expédition majeure pour le pétrole vers l\'Asie.' },
  { id: 'hormuz_strait', name: 'DÉTROIT D\'ORMUZ', lat: 26.5, lon: 56.5, description: 'Chokepoint pétrolier critique, risque de blocage par l\'Iran.' },
  { id: 'bosphorus', name: 'DÉTROIT DU BOSPHORE', lat: 41.1, lon: 29.0, description: 'Accès à la Mer Noire, crucial pour le blé et l\'énergie.' },
  { id: 'suez', name: 'CANAL DE SUEZ', lat: 30.5, lon: 32.3, description: 'Route maritime Europe-Asie.' },
  { id: 'panama', name: 'CANAL DE PANAMA', lat: 9.1, lon: -79.7, description: 'Route d\'expédition des Amériques.' },
  { id: 'bab_el_mandeb', name: 'BAB EL-MANDEB', lat: 12.5, lon: 43.3, description: 'Chokepoint Mer Rouge, attaques des Houthis.' },
];

export const CONFLICT_ZONES: ConflictZone[] = [
  {
    id: 'ukraine',
    name: 'Conflit en Ukraine',
    coords: [[30, 52], [40, 52], [40, 44], [30, 44]],
    center: [35, 48],
    intensity: 'high',
    parties: ['Russie', 'Ukraine'],
    description: 'Impact direct sur les marchés de l\'énergie (gaz russe) et agricoles (blé ukrainien).',
  },
  {
    id: 'yemen_redsea',
    name: 'Crise de la Mer Rouge',
    coords: [[42, 12], [42, 16], [44, 16], [45, 13], [44, 12]],
    center: [43, 14],
    intensity: 'high',
    parties: ['Houthis', 'Coalition Occidentale'],
    description: 'Campagne maritime contre la navigation commerciale. Hausse des coûts de fret et des primes d\'assurance.',
  },
  {
    id: 'sudan',
    name: 'Guerre Civile au Soudan',
    coords: [[30, 17], [34, 17], [34, 13], [30, 13]],
    center: [32, 15],
    intensity: 'high',
    parties: ['SAF', 'RSF'],
    description: 'Instabilité au sud de l\'Égypte affectant potentiellement la Mer Rouge.',
  }
];
