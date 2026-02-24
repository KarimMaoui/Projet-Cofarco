// src/config/demo-data.ts

export const CRITICAL_MINERALS = [
  // LITHIUM (Crucial pour les batteries VE)
  { id: 'greenbushes', name: 'Greenbushes', lat: -33.86, lon: 116.01, mineral: 'Lithium', country: 'Australia', operator: 'Talison Lithium', status: 'producing', significance: 'La plus grande mine de lithium en roche dure au monde' },
  { id: 'atacama', name: 'Salar de Atacama', lat: -23.50, lon: -68.33, mineral: 'Lithium', country: 'Chile', operator: 'SQM/Albemarle', status: 'producing', significance: 'Plus grande source de lithium par saumure' },
  { id: 'pilgangoora', name: 'Pilgangoora', lat: -21.03, lon: 118.91, mineral: 'Lithium', country: 'Australia', operator: 'Pilbara Minerals', status: 'producing', significance: 'Dépôt majeur de roche dure' },
  { id: 'silver_peak', name: 'Silver Peak', lat: 37.75, lon: -117.65, country: 'USA', mineral: 'Lithium', operator: 'Albemarle', status: 'producing', significance: 'Seule mine de lithium active aux USA' },
  
  // COBALT (Enjeu géopolitique et éthique majeur)
  { id: 'mutanda', name: 'Mutanda', lat: -10.78, lon: 25.80, mineral: 'Cobalt', country: 'DRC', operator: 'Glencore', status: 'producing', significance: 'La plus grande mine de cobalt au monde' },
  { id: 'tenke', name: 'Tenke Fungurume', lat: -10.61, lon: 26.16, mineral: 'Cobalt', country: 'DRC', operator: 'CMOC', status: 'producing', significance: 'Source majeure de cobalt (capitaux chinois)' },
  
  // TERRES RARES (Monopole chinois)
  { id: 'bayan_obo', name: 'Bayan Obo', lat: 41.76, lon: 109.95, mineral: 'Terres Rares', country: 'China', operator: 'China Northern Rare Earth', status: 'producing', significance: 'Plus grande mine de terres rares au monde (45% de la prod mondiale)' },
  { id: 'mountain_pass', name: 'Mountain Pass', lat: 35.47, lon: -115.53, mineral: 'Terres Rares', country: 'USA', operator: 'MP Materials', status: 'producing', significance: 'Principale mine de terres rares aux États-Unis' },
  { id: 'mount_weld', name: 'Mount Weld', lat: -28.86, lon: 122.17, mineral: 'Terres Rares', country: 'Australia', operator: 'Lynas', status: 'producing', significance: 'Majeure source de terres rares hors de Chine' },
  
  // NICKEL
  { id: 'wedabay', name: 'Weda Bay', lat: 0.47, lon: 127.94, mineral: 'Nickel', country: 'Indonesia', operator: 'Tsingshan/Eramet', status: 'producing', significance: 'Production massive de fonte brute de nickel' },
  { id: 'norilsk', name: 'Norilsk', lat: 69.33, lon: 88.21, mineral: 'Nickel', country: 'Russia', operator: 'Nornickel', status: 'producing', significance: 'Source majeure de palladium et nickel' },
];

