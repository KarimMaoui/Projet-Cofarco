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
    const response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50');
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.events)) return [];

    return data.events.map((event: any) => {
      const hasGeometry = event.geometry && event.geometry.length > 0;
      
      // SÉCURITÉ ABSOLUE : On force la création d'un tableau (Array)
      // pour que le fameux ".includes()" de DeckGL ne plante jamais.
      const safeCategories = (event.categories && Array.isArray(event.categories)) 
        ? event.categories.map((c: any) => c.title || '') 
        : [];

      return {
        id: event.id,
        title: event.title,
        categories: safeCategories, // Le format parfait pour la carte
        coordinates: hasGeometry ? event.geometry[0].coordinates : [0, 0],
        date: hasGeometry ? event.geometry[0].date : new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("🔴 Erreur NASA EONET API:", error);
    return []; 
  }
}
