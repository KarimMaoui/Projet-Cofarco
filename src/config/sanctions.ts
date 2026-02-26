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

    // CORRECTION ICI : On cherche la propriété peu importe sa casse
    const filteredFeatures = data.features.filter((feature: any) => {
      const props = feature.properties;
      const iso = props.ISO_A3 || props.iso_a3 || props.ADM0_A3 || props.adm0_a3;
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
