// src/config/sanctions.ts

export async function fetchSanctionedCountries() {
  try {
    const url = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
    const response = await fetch(url);
    if (!response.ok) throw new Error("Impossible de charger les frontières");
    
    const data = await response.json();

    const sanctionedISOs = [
      'RUS', // Russie
      'IRN', // Iran
      'SYR', // Syrie
      'PRK', // Corée du Nord
      'CUB', // Cuba
      'VEN', // Venezuela
      'BLR'  // Biélorussie
    ];

    // LA CORRECTION EST ICI : Ajout de 'ISO3166-1-Alpha-3'
    const filteredFeatures = data.features.filter((feature: any) => {
      const props = feature.properties;
      const iso = props['ISO3166-1-Alpha-3'] || props.ISO_A3 || props.iso_a3;
      return sanctionedISOs.includes(iso);
    });

    console.log(`⛔ [Géopolitique] ${filteredFeatures.length} zones sous sanctions chargées.`);

    return {
      type: 'FeatureCollection',
      features: filteredFeatures
    };
  } catch (error) {
    console.error("🔴 Erreur chargement sanctions :", error);
    return null;
  }
}
