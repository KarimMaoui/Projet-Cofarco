// src/config/sanctions.ts

export async function fetchSanctionedCountries() {
  try {
    // Fichier GeoJSON public et léger des frontières mondiales
    const url = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
    const response = await fetch(url);
    if (!response.ok) throw new Error("Impossible de charger les frontières");
    
    const data = await response.json();

    // Codes ISO-3 des pays sous sanctions majeures / embargo US
    const sanctionedISOs = [
      'RUS', // Russie
      'IRN', // Iran
      'SYR', // Syrie
      'PRK', // Corée du Nord
      'CUB', // Cuba
      'VEN', // Venezuela
      'BLR'  // Biélorussie
    ];

    // On garde uniquement les frontières de ces pays
    const filteredFeatures = data.features.filter((feature: any) => 
      sanctionedISOs.includes(feature.properties.ISO_A3)
    );

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
