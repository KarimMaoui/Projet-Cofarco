// src/services/wildfires.ts

export interface FireEvent {
  id: string;
  title: string;
  lat: number;
  lon: number;
  frp: number; // Intensité pour la taille sur la carte
  date: string;
}

export async function fetchLiveFires(): Promise<FireEvent[]> {
  try {
    // ATTAQUE DIRECTE : L'API EONET de la NASA pour la catégorie "Wildfires" (ID: 8)
    // Zéro proxy. Zéro blocage CORS. On demande les 300 plus gros incendies actifs.
    const url = 'https://eonet.gsfc.nasa.gov/api/v3/categories/wildfires?status=open&limit=300';
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const data = await response.json();
    
    if (!data || !data.events) {
      console.warn("⚠️ NASA EONET : Aucun incendie dans la réponse.");
      return [];
    }

    const fires: FireEvent[] = [];

    // On parcourt les incendies pour extraire les coordonnées exactes
    data.events.forEach((event: any) => {
      if (event.geometry && event.geometry.length > 0) {
        const geo = event.geometry[0]; // On prend la dernière position connue
        const coords = geo.coordinates;
        
        let lon = 0;
        let lat = 0;

        // La NASA renvoie parfois un Point, parfois un Polygone
        if (geo.type === 'Point') {
          lon = coords[0];
          lat = coords[1];
        } else if (geo.type === 'Polygon') {
          lon = coords[0][0][0];
          lat = coords[0][0][1];
        }

        // On sécurise l'ajout pour la carte
        if (lon !== 0 && lat !== 0) {
          fires.push({
            id: event.id,
            title: event.title,
            lat: lat,
            lon: lon,
            frp: Math.random() * 50 + 50, // L'API EONET ne donne pas l'intensité exacte, on simule une taille visuelle pour DeckGL
            date: geo.date
          });
        }
      }
    });

    console.log(`🔥 [NASA EONET] Succès : ${fires.length} incendies récupérés en direct !`);
    return fires;

  } catch (error) {
    console.error("🔴 Erreur critique Flux Incendies :", error);
    return []; // Retour propre pour ne pas casser DeckGL
  }
}
