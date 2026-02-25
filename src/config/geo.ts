// src/config/geo.ts
import type { ConflictZone, StrategicWaterway, Hotspot } from '../types';

export const STRATEGIC_WATERWAYS: StrategicWaterway[] = [
  { id: 'taiwan_strait', name: 'TAIWAN STRAIT', lat: 24.0, lon: 119.5, description: 'Critical shipping lane, PLA activity' },
  { id: 'malacca_strait', name: 'MALACCA STRAIT', lat: 2.5, lon: 101.5, description: 'Major oil shipping route' },
  { id: 'hormuz_strait', name: 'STRAIT OF HORMUZ', lat: 26.5, lon: 56.5, description: 'Oil chokepoint, Iran control' },
  { id: 'bosphorus', name: 'BOSPHORUS STRAIT', lat: 41.1, lon: 29.0, description: 'Black Sea access, Turkey control' },
  { id: 'suez', name: 'SUEZ CANAL', lat: 30.5, lon: 32.3, description: 'Europe-Asia shipping' },
  { id: 'panama', name: 'PANAMA CANAL', lat: 9.1, lon: -79.7, description: 'Americas shipping route' },
  { id: 'gibraltar', name: 'STRAIT OF GIBRALTAR', lat: 35.9, lon: -5.6, description: 'Mediterranean access, NATO control' },
  { id: 'bab_el_mandeb', name: 'BAB EL-MANDEB', lat: 12.5, lon: 43.3, description: 'Red Sea chokepoint, Houthi attacks' },
  { id: 'dardanelles', name: 'DARDANELLES', lat: 40.2, lon: 26.4, description: 'Aegean-Marmara link, Turkey control' }
];

export const CONFLICT_ZONES: ConflictZone[] = [
  {
    id: 'ukraine',
    name: 'Ukraine Conflict',
    coords: [[30, 52], [40, 52], [40, 44], [30, 44]],
    center: [35, 48],
    intensity: 'high',
    parties: ['Russia', 'Ukraine', 'NATO (support)'],
    casualties: '500,000+ (est.)',
    displaced: '6.5M+ refugees',
    keywords: ['ukraine', 'russia', 'zelensky', 'putin', 'donbas', 'crimea'],
    startDate: 'Feb 24, 2022',
    location: 'Eastern Ukraine (Donetsk, Luhansk)',
    description: 'Full-scale Russian invasion of Ukraine. Active frontlines in Donetsk, Luhansk, Zaporizhzhia, and Kherson oblasts.',
    keyDevelopments: ['Battle of Bakhmut', 'Kursk incursion', 'Black Sea drone strikes', 'Infrastructure attacks']
  },
  {
    id: 'gaza',
    name: 'Gaza Conflict',
    coords: [[34, 32], [35, 32], [35, 31], [34, 31]],
    center: [34.5, 31.5],
    intensity: 'high',
    parties: ['Israel', 'Hamas', 'Hezbollah', 'PIJ'],
    casualties: '40,000+ (Gaza)',
    displaced: '2M+ displaced',
    keywords: ['gaza', 'israel', 'hamas', 'palestinian'],
    startDate: 'Oct 7, 2023',
    location: 'Gaza Strip, Palestinian Territories',
    description: 'Israeli military operations in Gaza following October 7 attacks. Regional escalation with Hezbollah.',
    keyDevelopments: ['Rafah ground operation', 'Humanitarian crisis', 'Hostage negotiations', 'Iran-backed attacks']
  },
  {
    id: 'sudan',
    name: 'Sudan Civil War',
    coords: [[30, 17], [34, 17], [34, 13], [30, 13]],
    center: [32, 15],
    intensity: 'high',
    parties: ['Sudanese Armed Forces (SAF)', 'Rapid Support Forces (RSF)'],
    casualties: '15,000+ killed',
    displaced: '10M+ displaced',
    keywords: ['sudan', 'khartoum', 'darfur'],
    startDate: 'Apr 15, 2023',
    location: 'Khartoum & Darfur, Sudan',
    description: 'Power struggle between SAF and RSF paramilitary. Fighting centered around Khartoum, Darfur.',
    keyDevelopments: ['Khartoum battle', 'Darfur massacres', 'El Fasher siege', 'Famine declared']
  },
  {
    id: 'yemen_redsea',
    name: 'Red Sea Crisis',
    coords: [[42, 12], [42, 16], [44, 16], [45, 13], [44, 12]],
    center: [43, 14],
    intensity: 'high',
    parties: ['Houthis', 'US/UK Coalition', 'Yemen Govt'],
    casualties: 'Unknown (Maritime)',
    displaced: '4.5M+ (Yemen Civil War)',
    keywords: ['houthi', 'red sea', 'yemen', 'missile', 'drone', 'ship'],
    startDate: 'Nov 19, 2023',
    location: 'Red Sea & Gulf of Aden, Yemen',
    description: 'Houthi maritime campaign against commercial shipping. US/UK airstrikes on Houthi targets. Ongoing blockade attempts.',
    keyDevelopments: ['Ship hijackings', 'US airstrikes', 'Cable cuts', 'Sinking of Rubymar']
  }
];

export const INTEL_HOTSPOTS: Hotspot[] = [
  {
    id: 'sahel', name: 'Sahel', subtext: 'Insurgency/Coups', lat: 14.0, lon: -1.0, location: 'Sahel Region',
    keywords: ['burkina faso', 'mali', 'niger', 'sahel', 'junta', 'coup', 'wagner', 'africa corps'],
    agencies: ['Wagner', 'Junta Forces'], description: 'Region of instability, military coups, and Islamist insurgency. Russian influence growing.',
    status: 'Monitoring', escalationScore: 4, escalationTrend: 'escalating',
    escalationIndicators: ['4 coups since 2020', 'French forces expelled', 'Wagner expansion', 'ECOWAS sanctions'],
    history: { lastMajorEvent: 'Niger coup', lastMajorEventDate: '2023-07-26', precedentCount: 4 },
    whyItMatters: 'Russian influence expanding in former French sphere; jihadist groups gaining territory'
  },
  {
    id: 'horn_africa', name: 'Horn of Africa', subtext: 'Piracy/Conflict', lat: 10.0, lon: 49.0, location: 'Somalia, Ethiopia, Djibouti',
    keywords: ['somalia', 'piracy', 'al-shabaab', 'ethiopia', 'somaliland', 'red sea'],
    agencies: ['USAFRICOM', 'EUNAVFOR'], description: 'Resurgent piracy, Al-Shabaab activity, Ethiopia-Somaliland port dispute.',
    status: 'Monitoring', escalationScore: 4, escalationTrend: 'escalating',
    escalationIndicators: ['Houthi attacks on shipping', 'Somali piracy resurgence', 'Ethiopia-Somaliland MoU dispute'],
    history: { lastMajorEvent: 'Sudan war outbreak', lastMajorEventDate: '2023-04-15', precedentCount: 5 },
    whyItMatters: 'Bab el-Mandeb chokepoint security; 12% of global trade at risk; Red Sea shipping rerouting'
  },
  {
    id: 'moscow', name: 'Moscow', subtext: 'Kremlin Activity', lat: 55.75, lon: 37.6, location: 'Russia',
    keywords: ['kremlin', 'putin', 'russia', 'fsb', 'moscow', 'russian'],
    agencies: ['Kremlin', 'FSB', 'GRU', 'SVR'], description: 'Russian Federation command center. Military operations hub.',
    status: 'Monitoring', escalationScore: 4, escalationTrend: 'stable',
    escalationIndicators: ['Ukraine war ongoing', 'Mobilization potential', 'Nuclear rhetoric'],
    whyItMatters: 'Nuclear power at war; energy leverage over Europe; global order revisionism'
  },
  {
    id: 'beijing', name: 'Beijing', subtext: 'PLA/MSS Activity', lat: 39.9, lon: 116.4, location: 'China',
    keywords: ['beijing', 'xi', 'china', 'pla', 'ccp', 'chinese', 'jinping'],
    agencies: ['PLA', 'MSS', 'CCP Politburo'], description: 'Chinese Communist Party headquarters. PLA command center.',
    status: 'Monitoring', escalationScore: 3, escalationTrend: 'stable',
    escalationIndicators: ['Taiwan Strait exercises', 'South China Sea militarization', 'Tech decoupling'],
    whyItMatters: 'Largest economy by PPP; primary US strategic competitor; Taiwan contingency risk'
  },
  {
    id: 'tehran', name: 'Tehran', subtext: 'IRGC Activity', lat: 35.7, lon: 51.4, location: 'Iran',
    keywords: ['iran', 'tehran', 'irgc', 'khamenei', 'persian', 'iranian'],
    agencies: ['IRGC', 'Quds Force', 'MOIS'], description: 'Iranian nuclear program. Regional proxy operations.',
    status: 'Monitoring', escalationScore: 4, escalationTrend: 'escalating',
    escalationIndicators: ['Near-weapons-grade enrichment', 'Proxy attacks on Israel', 'Houthi coordination'],
    whyItMatters: 'Near-nuclear threshold state; controls Strait of Hormuz; Axis of Resistance coordinator'
  }
];

export interface MilitaryBase {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
  country?: string;
  arm?: string;
  status?: string;
  description: string;
}

export const US_MILITARY_BASES: MilitaryBase[] = [
  // ==========================================
  // CONUS (Continental United States) & HAWAII
  // ==========================================
  { 
    id: 'norfolk', name: 'Naval Station Norfolk', lat: 36.95, lon: -76.31, type: 'us', country: 'USA', arm: 'Navy', status: 'active',
    description: 'Plus grande base navale au monde. Quartier général de la flotte de l\'Atlantique.' 
  },
  { 
    id: 'san_diego', name: 'Naval Base San Diego', lat: 32.68, lon: -117.13, type: 'us', country: 'USA', arm: 'Navy', status: 'active',
    description: 'Principal port d\'attache de la flotte du Pacifique et de plusieurs porte-avions.' 
  },
  { 
    id: 'fort_liberty', name: 'Fort Liberty (ex-Fort Bragg)', lat: 35.13, lon: -79.00, type: 'us', country: 'USA', arm: 'Army', status: 'active',
    description: 'Plus grande base de l\'US Army par population. Siège des forces aéroportées et des opérations spéciales.' 
  },
  { 
    id: 'camp_pendleton', name: 'Camp Pendleton', lat: 33.35, lon: -117.39, type: 'us', country: 'USA', arm: 'Marines', status: 'active',
    description: 'Principale base de l\'US Marine Corps sur la côte ouest.' 
  },
  { 
    id: 'jb_pearl_harbor_hickam', name: 'Joint Base Pearl Harbor-Hickam', lat: 21.34, lon: -157.94, type: 'us', country: 'USA', arm: 'Joint', status: 'active',
    description: 'Base conjointe Air Force/Navy. QG de l\'US Indo-Pacific Command (INDOPACOM).' 
  },

  // ==========================================
  // EUCOM (Europe) & AFRICOM (Africa)
  // ==========================================
  { 
    id: 'ramstein', name: 'Ramstein Air Base', lat: 49.43, lon: 7.60, type: 'us-nato', country: 'Germany', arm: 'Air Force', status: 'active',
    description: 'QG de l\'US Air Force en Europe. Plaque tournante logistique majeure.' 
  },
  { 
    id: 'rota', name: 'Naval Station Rota', lat: 36.62, lon: -6.35, type: 'us-nato', country: 'Spain', arm: 'Navy', status: 'active',
    description: 'Accès stratégique Atlantique/Méditerranée. Port d\'attache des destroyers Aegis.' 
  },
  { 
    id: 'aviano', name: 'Aviano Air Base', lat: 46.03, lon: 12.59, type: 'us-nato', country: 'Italy', arm: 'Air Force', status: 'active',
    description: 'Base clé de l\'OTAN abritant la 31st Fighter Wing et potentiellement des armes nucléaires tactiques.' 
  },
  { 
    id: 'incirlik', name: 'Incirlik Air Base', lat: 37.00, lon: 35.43, type: 'us-nato', country: 'Turkey', arm: 'Air Force', status: 'active',
    description: 'Base stratégique au carrefour de l\'Europe et du Moyen-Orient. Stockage d\'armes nucléaires.' 
  },
  { 
    id: 'camp_lemonnier', name: 'Camp Lemonnier', lat: 11.54, lon: 43.14, type: 'us', country: 'Djibouti', arm: 'Navy', status: 'active',
    description: 'Seule base permanente américaine en Afrique. Point d\'appui critique pour la Corne de l\'Afrique.' 
  },

  // ==========================================
  // INDOPACOM (Asia-Pacific)
  // ==========================================
  { 
    id: 'yokosuka', name: 'Fleet Activities Yokosuka', lat: 35.28, lon: 139.67, type: 'us-nato', country: 'Japan', arm: 'Navy', status: 'active',
    description: 'QG de la 7ème flotte américaine. Seul port d\'attache d\'un porte-avions américain à l\'étranger.' 
  },
  { 
    id: 'kadena', name: 'Kadena Air Base', lat: 26.35, lon: 127.76, type: 'us', country: 'Japan', arm: 'Air Force', status: 'active',
    description: 'Le "hub" de la puissance aérienne américaine dans le Pacifique (Okinawa).' 
  },
  { 
    id: 'camp_humphreys', name: 'Camp Humphreys', lat: 36.96, lon: 127.03, type: 'us', country: 'South Korea', arm: 'Army', status: 'active',
    description: 'Plus grande base militaire américaine à l\'étranger. QG des forces américaines en Corée.' 
  },
  { 
    id: 'andersen', name: 'Andersen Air Force Base', lat: 13.58, lon: 144.92, type: 'us', country: 'Guam', arm: 'Air Force', status: 'active',
    description: 'Installation stratégique vitale permettant la projection de bombardiers lourds en Asie.' 
  },

  // ==========================================
  // CENTCOM (Middle East) & Strategic Outposts
  // ==========================================
  { 
    id: 'al_udeid', name: 'Al Udeid Air Base', lat: 25.11, lon: 51.31, type: 'us', country: 'Qatar', arm: 'Air Force', status: 'active',
    description: 'Plus grande base américaine au Moyen-Orient. QG avancé de l\'US Central Command.' 
  },
  { 
    id: 'nsa_bahrain', name: 'Naval Support Activity Bahrain', lat: 26.21, lon: 50.60, type: 'us', country: 'Bahrain', arm: 'Navy', status: 'active',
    description: 'QG de la 5ème flotte américaine, surveillant le golfe Persique et la mer Rouge.' 
  },
  { 
    id: 'diego_garcia', name: 'NSF Diego Garcia', lat: -7.31, lon: 72.41, type: 'us-nato', country: 'BIOT (UK)', arm: 'Joint', status: 'active',
    description: 'Base insulaire ultra-stratégique dans l\'océan Indien. Soutien logistique et bombardiers.' 
  },
  { 
    id: 'pituffik', name: 'Pituffik Space Base (ex-Thule)', lat: 76.53, lon: -68.70, type: 'us-nato', country: 'Greenland', arm: 'Space Force', status: 'active',
    description: 'Base la plus septentrionale des USA. Radars d\'alerte précoce pour les missiles balistiques.' 
  },

  // ==========================================
  // SOUTHCOM (Amérique Centrale, du Sud & Caraïbes)
  // ==========================================
  { 
    id: 'guantanamo', name: 'Naval Station Guantanamo Bay', lat: 19.90, lon: -75.10, type: 'us', country: 'Cuba', arm: 'Navy', status: 'active',
    description: 'Plus ancienne base américaine outre-mer. Point d\'appui logistique dans les Caraïbes et centre de détention.' 
  },
  { 
    id: 'soto_cano', name: 'Soto Cano Air Base', lat: 14.38, lon: -87.62, type: 'us', country: 'Honduras', arm: 'Joint', status: 'active',
    description: 'Quartier général de la Joint Task Force Bravo. Essentielle pour les opérations en Amérique centrale.' 
  },

  // ==========================================
  // OCÉANIE (Alliés stratégiques / Renseignement)
  // ==========================================
  { 
    id: 'pine_gap', name: 'Joint Defence Facility Pine Gap', lat: -23.80, lon: 133.73, type: 'us-allied', country: 'Australia', arm: 'Space Force / CIA', status: 'active',
    description: 'Station de suivi de satellites ultra-secrète gérée avec l\'Australie. Hub majeur du renseignement mondial (Five Eyes).' 
  }
];
