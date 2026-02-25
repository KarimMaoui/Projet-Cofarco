// src/config/commodities.ts

// Dictionnaire des pays (Coordonnées GPS)
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

const buildCountries = (names: string[]) => names.map(n => ({ name: n, ...C[n] }));

// Export de la base de données
export const PRODUCERS: Record<string, any> = {
  wheat: { emoji: '🌾', name: 'Blé', countries: buildCountries(['Chine', 'Inde', 'Russie', 'USA', 'France', 'Australie', 'Canada', 'Pakistan', 'Ukraine', 'Allemagne']) },
  corn: { emoji: '🌽', name: 'Maïs', countries: buildCountries(['USA', 'Chine', 'Brésil', 'Argentine', 'Ukraine', 'Inde', 'Mexique', 'Afrique du Sud', 'Russie', 'France']) },
  rice: { emoji: '🍚', name: 'Riz', countries: buildCountries(['Chine', 'Inde', 'Bangladesh', 'Indonésie', 'Vietnam', 'Thaïlande', 'Myanmar', 'Philippines', 'Japon', 'Brésil']) },
  soybeans: { emoji: '🌿', name: 'Soja', countries: buildCountries(['Brésil', 'USA', 'Argentine', 'Chine', 'Inde', 'Paraguay', 'Canada', 'Russie', 'Bolivie', 'Ukraine']) },
  sugar: { emoji: '🍬', name: 'Sucre', countries: buildCountries(['Brésil', 'Inde', 'Thaïlande', 'Chine', 'USA', 'Russie', 'Mexique', 'Pakistan', 'France', 'Australie']) },
  coffee: { emoji: '☕', name: 'Café', countries: buildCountries(['Brésil', 'Vietnam', 'Colombie', 'Indonésie', 'Éthiopie', 'Honduras', 'Inde', 'Ouganda', 'Mexique', 'Guatemala']) },
  cotton: { emoji: '🧶', name: 'Coton', countries: buildCountries(['Chine', 'Inde', 'USA', 'Brésil', 'Pakistan', 'Australie', 'Turquie', 'Ouzbékistan', 'Argentine', 'Mali']) },
  oil: { emoji: '🛢️', name: 'Pétrole Brut', countries: buildCountries(['USA', 'Arabie Saoudite', 'Russie', 'Canada', 'Irak', 'Chine', 'EAU', 'Brésil', 'Iran', 'Koweït']) },
  gas: { emoji: '🔥', name: 'Gaz Naturel', countries: buildCountries(['USA', 'Russie', 'Iran', 'Chine', 'Canada', 'Qatar', 'Australie', 'Norvège', 'Arabie Saoudite', 'Algérie']) },
  coal: { emoji: '⛏️', name: 'Charbon', countries: buildCountries(['Chine', 'Inde', 'USA', 'Australie', 'Indonésie', 'Russie', 'Afrique du Sud', 'Allemagne', 'Pologne', 'Kazakhstan']) },
  uranium: { emoji: '☢️', name: 'Uranium', countries: buildCountries(['Kazakhstan', 'Canada', 'Namibie', 'Australie', 'Ouzbékistan', 'Russie', 'Niger', 'Chine', 'Inde', 'Afrique du Sud']) },
  gold: { emoji: '🥇', name: 'Or', countries: buildCountries(['Chine', 'Australie', 'Russie', 'Canada', 'USA', 'Mexique', 'Kazakhstan', 'Afrique du Sud', 'Pérou', 'Ouzbékistan']) },
  copper: { emoji: '🥉', name: 'Cuivre', countries: buildCountries(['Chili', 'Pérou', 'RDC', 'Chine', 'USA', 'Russie', 'Indonésie', 'Australie', 'Zambie', 'Mexique']) },
  iron: { emoji: '🧲', name: 'Minerai de Fer', countries: buildCountries(['Australie', 'Brésil', 'Chine', 'Inde', 'Russie', 'Ukraine', 'Afrique du Sud', 'Canada', 'Kazakhstan', 'USA']) },
  lithium: { emoji: '🔋', name: 'Lithium', countries: buildCountries(['Australie', 'Chili', 'Chine', 'Argentine', 'Brésil', 'Zimbabwe', 'Portugal', 'USA', 'Canada', 'Bolivie']) },
  rare_earths: { emoji: '💠', name: 'Terres Rares', countries: buildCountries(['Chine', 'USA', 'Myanmar', 'Australie', 'Thaïlande', 'Madagascar', 'Inde', 'Russie', 'Brésil', 'Vietnam']) }
};
