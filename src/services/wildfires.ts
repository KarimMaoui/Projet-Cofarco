// src/services/wildfires.ts

export interface FireEvent {
  lat: number;
  lon: number;
  frp: number; // Puissance radiative du feu (intensité)
  confidence: string;
}

export async function fetchLiveFires(): Promise<FireEvent[]> {
  try {
    // Le vrai fichier de données brutes de la NASA (Global 24h)
    const targetUrl = 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv';
    
    // Notre proxy robuste qui ne bloque pas
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Serveur NASA FIRMS injoignable");
    
    // La NASA renvoie un fichier texte CSV, pas du JSON
    const text = await response.text();
    const lines = text.split('\n').slice(1); // On retire la première ligne (les en-têtes)
    
    const fires: FireEvent[] = [];
    
    // On limite à 1500 incendies pour ne pas faire exploser la carte 3D de ton navigateur
    for (let i = 0; i < Math.min(lines.length, 1500); i++) {
      const cols = lines[i].split(',');
      if (cols.length >= 13) {
        fires.push({
          lat: parseFloat(cols[0]),
          lon: parseFloat(cols[1]),
          frp: parseFloat(cols[12]),
          confidence: cols[8]
        });
      }
    }
    
    console.log(`🔥 [NASA FIRMS] ${fires.length} foyers actifs récupérés avec succès !`);
    return fires;

  } catch (error) {
    console.error("🔴 Erreur critique NASA FIRMS :", error);
    return []; // On retourne un tableau vide pour ne pas faire crasher la carte
  }
}
