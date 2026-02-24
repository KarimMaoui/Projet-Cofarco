// src/services/api.ts

/**
 * FETCH DES SÉISMES (USGS) - API Très stable, pas de proxy requis
 */
export async function fetchLiveEarthquakes() {
  try {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');
    if (!response.ok) throw new Error("Erreur USGS");
    
    const data = await response.json();
    
    // Sécurité : Vérifie que features existe
    if (!data || !data.features) return [];

    return data.features.map((f: any) => ({
      id: f.id,
      mag: f.properties.mag,
      place: f.properties.place,
      time: f.properties.time,
      coordinates: f.geometry.coordinates // [long, lat, depth]
    }));
  } catch (error) {
    console.error("🔴 Erreur USGS API:", error);
    return [];
  }
}

/**
 * FETCH DES ÉVÉNEMENTS NATURELS (NASA EONET)
 * Correction du bug .map() sur undefined
 */
export async function fetchLiveNaturalEvents() {
  try {
    // On limite à 20 pour la performance
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20');
    
    if (!response.ok) {
        console.warn("⚠️ NASA EONET répond avec une erreur 503 ou 404.");
        return [];
    }
    
    const data = await response.json();
    
    // PROTECTION CRITIQUE : Vérifie que data.events est bien un tableau
    if (!data || !Array.isArray(data.events)) {
      console.warn("⚠️ Format NASA EONET inconnu ou vide.");
      return [];
    }

    return data.events.map((event: any) => {
      // Sécurité supplémentaire pour la géométrie
      const hasGeometry = event.geometry && event.geometry.length > 0;
      
      return {
        id: event.id,
        title: event.title,
        categories: event.categories ? event.categories[0].title : 'Event',
        coordinates: hasGeometry ? event.geometry[0].coordinates : [0, 0],
        date: hasGeometry ? event.geometry[0].date : new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("🔴 Erreur NASA EONET API:", error);
    return []; // Empêche le crash de App.ts
  }
}
