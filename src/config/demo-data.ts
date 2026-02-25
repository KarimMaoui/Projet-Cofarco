// src/config/demo-data.ts (ou le nom de ton fichier actuel)

export const CRITICAL_MINERALS = [
  // ===== LITHIUM (Crucial pour les batteries VE) =====
  { id: 'greenbushes', name: 'Greenbushes', lat: -33.86, lon: 116.01, mineral: 'Lithium', country: 'Australia', operator: 'Talison Lithium', status: 'producing', significance: 'La plus grande mine de lithium en roche dure au monde' },
  { id: 'atacama', name: 'Salar de Atacama', lat: -23.50, lon: -68.33, mineral: 'Lithium', country: 'Chile', operator: 'SQM/Albemarle', status: 'producing', significance: 'Plus grande source de lithium par saumure' },
  { id: 'pilgangoora', name: 'Pilgangoora', lat: -21.03, lon: 118.91, mineral: 'Lithium', country: 'Australia', operator: 'Pilbara Minerals', status: 'producing', significance: 'Dépôt majeur de roche dure' },
  { id: 'silver_peak', name: 'Silver Peak', lat: 37.75, lon: -117.65, country: 'USA', mineral: 'Lithium', operator: 'Albemarle', status: 'producing', significance: 'Seule mine de lithium active aux USA' },
  { id: 'uyuni', name: 'Salar de Uyuni', lat: -20.13, lon: -67.62, country: 'Bolivia', mineral: 'Lithium', operator: 'YLB / CBC', status: 'development', significance: 'Les plus grandes réserves mondiales (Triangle du Lithium), investissements chinois massifs' },
  { id: 'thacker_pass', name: 'Thacker Pass', lat: 41.70, lon: -118.06, country: 'USA', mineral: 'Lithium', operator: 'Lithium Americas', status: 'development', significance: 'Projet ultra-stratégique pour la souveraineté US (financement GM)' },

  // ===== COBALT (Enjeu géopolitique et éthique majeur) =====
  { id: 'mutanda', name: 'Mutanda', lat: -10.78, lon: 25.80, mineral: 'Cobalt', country: 'DRC', operator: 'Glencore', status: 'producing', significance: 'La plus grande mine de cobalt au monde' },
  { id: 'tenke', name: 'Tenke Fungurume', lat: -10.61, lon: 26.16, mineral: 'Cobalt', country: 'DRC', operator: 'CMOC', status: 'producing', significance: 'Source majeure de cobalt (capitaux chinois)' },
  { id: 'kamoto', name: 'Kamoto (KCC)', lat: -10.70, lon: 25.40, mineral: 'Cobalt', country: 'DRC', operator: 'Glencore', status: 'producing', significance: 'Actif géant, crucial pour l\'approvisionnement occidental' },

  // ===== TERRES RARES (Monopole chinois et tentatives de diversification) =====
  { id: 'bayan_obo', name: 'Bayan Obo', lat: 41.76, lon: 109.95, mineral: 'Terres Rares', country: 'China', operator: 'China Northern Rare Earth', status: 'producing', significance: 'Plus grande mine de terres rares au monde (45% de la prod mondiale)' },
  { id: 'mountain_pass', name: 'Mountain Pass', lat: 35.47, lon: -115.53, mineral: 'Terres Rares', country: 'USA', operator: 'MP Materials', status: 'producing', significance: 'Principale mine de terres rares aux États-Unis' },
  { id: 'mount_weld', name: 'Mount Weld', lat: -28.86, lon: 122.17, mineral: 'Terres Rares', country: 'Australia', operator: 'Lynas', status: 'producing', significance: 'Majeure source de terres rares hors de Chine' },
  { id: 'kvanefjeld', name: 'Kvanefjeld', lat: 60.97, lon: -45.98, mineral: 'Terres Rares', country: 'Greenland', operator: 'Energy Transition Minerals', status: 'suspended', significance: 'Méga-gisement bloqué par des enjeux environnementaux et politiques' },

  // ===== NICKEL (Guerre des prix et tensions sociales) =====
  { id: 'wedabay', name: 'Weda Bay', lat: 0.47, lon: 127.94, mineral: 'Nickel', country: 'Indonesia', operator: 'Tsingshan/Eramet', status: 'producing', significance: 'Production massive de fonte brute de nickel (dominance chinoise)' },
  { id: 'norilsk', name: 'Norilsk', lat: 69.33, lon: 88.21, mineral: 'Nickel', country: 'Russia', operator: 'Nornickel', status: 'producing', significance: 'Source majeure de palladium et nickel (risque de sanctions)' },
  { id: 'goro', name: 'Goro Nickel', lat: -22.28, lon: 166.91, mineral: 'Nickel', country: 'New Caledonia (FR)', operator: 'Prony Resources', status: 'suspended', significance: 'Point de tension géopolitique majeur, menacé par le nickel low-cost indonésien' },

  // ===== CUIVRE (Le métal de l'électrification) =====
  { id: 'escondida', name: 'Escondida', lat: -24.26, lon: -69.06, mineral: 'Cuivre', country: 'Chile', operator: 'BHP / Rio Tinto', status: 'producing', significance: 'La plus grande mine de cuivre au monde' },
  { id: 'grasberg', name: 'Grasberg', lat: -4.05, lon: 137.11, mineral: 'Cuivre/Or', country: 'Indonesia', operator: 'Freeport-McMoRan', status: 'producing', significance: 'Mine d\'or et de cuivre d\'altitude, enjeu souverain pour Jakarta' },
  { id: 'chuquicamata', name: 'Chuquicamata', lat: -22.30, lon: -68.90, mineral: 'Cuivre', country: 'Chile', operator: 'Codelco', status: 'producing', significance: 'Plus grande mine à ciel ouvert au monde (transition vers souterraine)' },

  // ===== URANIUM (Sécurité Énergétique) =====
  { id: 'cigar_lake', name: 'Cigar Lake', lat: 58.06, lon: -104.54, mineral: 'Uranium', country: 'Canada', operator: 'Cameco', status: 'producing', significance: 'Le gisement d\'uranium à la plus haute teneur au monde' },
  { id: 'olympic_dam', name: 'Olympic Dam', lat: -30.43, lon: 136.88, mineral: 'Uranium', country: 'Australia', operator: 'BHP', status: 'producing', significance: 'Plus grand gisement d\'uranium connu sur Terre' },
  { id: 'husab', name: 'Husab', lat: -22.58, lon: 15.01, mineral: 'Uranium', country: 'Namibia', operator: 'CGN', status: 'producing', significance: 'Investissement chinois massif pour sécuriser le nucléaire civil' },

  // ===== GRAPHITE (Anodes de batteries) =====
  { id: 'balama', name: 'Balama', lat: -13.33, lon: 38.15, mineral: 'Graphite', country: 'Mozambique', operator: 'Syrah Resources', status: 'producing', significance: 'Plus grande mine de graphite hors Chine (soutenue par les USA)' },

  // ===== MANGANÈSE (Acier & Nouvelles Batteries) =====
  { id: 'moanda', name: 'Moanda', lat: -1.56, lon: 13.19, mineral: 'Manganèse', country: 'Gabon', operator: 'Comilog (Eramet)', status: 'producing', significance: 'La plus grande mine de manganèse au monde (Risque politique élevé)' },
  { id: 'kalahari', name: 'Kalahari Manganese Field', lat: -27.46, lon: 22.95, mineral: 'Manganèse', country: 'South Africa', operator: 'South32 / Assmang', status: 'producing', significance: 'Contient environ 80% des ressources mondiales connues de manganèse' },

  // ===== BAUXITE / ALUMINIUM (Allègement des véhicules & Aéronautique) =====
  { id: 'sangaredi', name: 'Sangaredi', lat: 11.09, lon: -14.30, mineral: 'Bauxite', country: 'Guinea', operator: 'CBG', status: 'producing', significance: 'Gisement de classe mondiale, approvisionne massivement l\'industrie chinoise' },
  { id: 'weipa', name: 'Weipa', lat: -12.62, lon: 141.87, mineral: 'Bauxite', country: 'Australia', operator: 'Rio Tinto', status: 'producing', significance: 'Mine géante d\'Australie, pilier de l\'approvisionnement pacifique' },

  // ===== PLATINOÏDES (PGM) (Hydrogène vert & Catalyseurs) =====
  { id: 'bushveld', name: 'Bushveld Complex', lat: -24.83, lon: 29.83, mineral: 'Platine/Palladium', country: 'South Africa', operator: 'Anglo American Platinum', status: 'producing', significance: 'Le plus grand gisement de platinoïdes sur Terre (Soumis à de graves crises énergétiques locales)' },

  // ===== LES "TECH CHOKEPOINTS" (Semi-conducteurs & Défense) =====
  { id: 'xikuangshan', name: 'Xikuangshan', lat: 27.76, lon: 111.43, mineral: 'Antimoine', country: 'China', operator: 'State Owned', status: 'producing', significance: 'Surnommée la "Capitale de l\'Antimoine". Crucial pour les munitions. Exportations restreintes par Pékin.' },
  { id: 'fankou', name: 'Fankou', lat: 25.04, lon: 113.66, mineral: 'Gallium / Germanium', country: 'China', operator: 'Zhongjin', status: 'producing', significance: 'Sous-produit du zinc. Indispensable aux puces électroniques et radars. Sous embargo partiel chinois.' },
// ===== TUNGSTÈNE (Défense, Aérospatial & Outillage lourd) =====
  { id: 'shizhuyuan', name: 'Shizhuyuan', lat: 25.80, lon: 113.05, mineral: 'Tungstène', country: 'China', operator: 'China Minmetals', status: 'producing', significance: 'La plus grande réserve mondiale. Essentiel pour le blindage et l\'armement.' },

  // ===== TITANE (Aéronautique militaire & civile) =====
  { id: 'vsmpo', name: 'VSMPO-AVISMA (Oural)', lat: 58.04, lon: 60.55, mineral: 'Titane', country: 'Russia', operator: 'VSMPO-AVISMA', status: 'producing', significance: 'Plus grand producteur mondial. Historiquement vital pour Airbus et Boeing (fort risque de sanctions).' },

  // ===== ARGENT (Indispensable pour les Panneaux Solaires) =====
  { id: 'penasquito', name: 'Peñasquito', lat: 24.71, lon: -101.67, mineral: 'Argent', country: 'Mexico', operator: 'Newmont', status: 'producing', significance: 'Majeure mine d\'argent. La demande explose à cause de la transition photovoltaïque.' },

  // ===== ÉTAIN (Soudures pour l'électronique) =====
  { id: 'san_rafael', name: 'San Rafael', lat: -14.23, lon: -70.31, mineral: 'Étain', country: 'Peru', operator: 'Minsur', status: 'producing', significance: 'Produit près de 10% de l\'étain mondial. Vital pour souder les puces de nos smartphones et IA.' }
