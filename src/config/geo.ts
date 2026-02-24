// src/config/geo.ts
import type { ConflictZone, StrategicWaterway, Hotspot, MilitaryBase } from '../types';

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

export const MILITARY_BASES: MilitaryBase[] = [
  { id: 'norfolk', name: 'Norfolk Naval', lat: 36.95, lon: -76.31, type: 'us-nato', description: 'World largest naval base. Atlantic Fleet HQ.' },
  { id: 'san_diego', name: 'Naval San Diego', lat: 32.68, lon: -117.13, type: 'us-nato', description: 'Pacific Fleet. Carrier homeport.' },
  { id: 'yokosuka', name: 'Yokosuka', lat: 35.28, lon: 139.67, type: 'us-nato', description: 'US 7th Fleet HQ. Carrier strike group homeport.' },
  { id: 'rota', name: 'Naval Rota', lat: 36.62, lon: -6.35, type: 'us-nato', description: 'US/Spanish naval base. Aegis destroyers, Atlantic access.' },
  { id: 'incirlik', name: 'Incirlik AB', lat: 37.0, lon: 35.43, type: 'us-nato', description: 'US/Turkish base. Nuclear weapons storage site.' },
  { id: 'kaliningrad', name: 'Kaliningrad', lat: 54.71, lon: 20.51, type: 'russia', description: 'Russian exclave. Baltic Fleet, Iskander missiles.' },
  { id: 'sevastopol', name: 'Sevastopol', lat: 44.6, lon: 33.5, type: 'russia', description: 'Black Sea Fleet HQ. Crimea (occupied).' },
  { id: 'vladivostok', name: 'Vladivostok', lat: 43.12, lon: 131.9, type: 'russia', description: 'Pacific Fleet HQ. Nuclear submarines.' },
  { id: 'murmansk', name: 'Murmansk', lat: 68.97, lon: 33.09, type: 'russia', description: 'Northern Fleet. Strategic nuclear submarines.' },
  { id: 'chinese_pla_support_base', name: 'Chinese PLA Support Base', lat: 11.59150, lon: 43.06020, type: 'china', country: 'Djibouti', arm: 'Navy', status: 'active', description: 'Navy. Host: Djibouti.' },
  { id: 'tartus', name: 'Russian naval facility in Tartus', lat: 34.91500, lon: 35.87400, type: 'russia', country: 'Syria', arm: 'Navy', status: 'active', description: 'Navy. Host: Syria.' },
  { id: 'camp_lemonnier', name: 'Camp Lemonnier', lat: 11.54360, lon: 43.14860, type: 'us-nato', country: 'Djibouti', arm: 'Navy', status: 'active', description: 'Navy. Host: Djibouti.' }
];
