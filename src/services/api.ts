// src/services/api.ts

export async function fetchLiveEarthquakes() {
  try {
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
    const data = await res.json();
    
    return data.features.map((f: any) => ({
      id: f.id,
      place: f.properties.place,
      magnitude: f.properties.mag,
      time: new Date(f.properties.time),
      lon: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      depth: f.geometry.coordinates[2]
    }));
  } catch (error) {
    console.error("Erreur USGS:", error);
    return [];
  }
}

export async function fetchLiveNaturalEvents() {
  try {
    const res = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&days=7');
    const data = await res.json();
    
    return data.events.map((e: any) => {
      const coords = e.geometry[0].coordinates;
      const lon = Array.isArray(coords[0]) ? coords[0][0] : coords[0];
      const lat = Array.isArray(coords[0]) ? coords[0][1] : coords[1];
      
      return {
        id: e.id,
        title: e.title,
        category: e.categories[0]?.id || 'unknown',
        date: new Date(e.geometry[0].date),
        lon, 
        lat
      };
    });
  } catch (error) {
    console.error("Erreur NASA EONET:", error);
    return [];
  }
}
