// src/services/wildfires.ts

export interface MapFire {
  lat: number;
  lon: number;
  brightness: number;
  frp: number; // Fire Radiative Power (Puissance de l'incendie)
  confidence: string; // 'l', 'n', 'h' (low, nominal, high)
  region: string;
  acq_date: string;
}

export async function fetchLiveFires(): Promise<MapFire[]> {
  try {
    // Fichier CSV public de la NASA (VIIRS Global 24h) mis à jour en continu
    const url = 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv';
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Erreur réseau');
    
    const text = await response.text();
    const rows = text.split('\n').slice(1); // On coupe par ligne et on ignore la 1ère (en-têtes)
    
    const fires: MapFire[] = [];

    for (const row of rows) {
      if (!row) continue;
      const cols = row.split(',');
      
      // Format VIIRS CSV: latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,instrument,confidence,version,bright_ti5,frp,daynight
      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      const brightness = parseFloat(cols[2]);
      const confidence = cols[9]; // 'n' (nominal), 'h' (high), 'l' (low)
      const frp = parseFloat(cols[12]);

      // Pour ne pas surcharger la carte, on ne garde que les feux avec une puissance significative (FRP > 5)
      // ou ceux avec une confiance Haute/Nominale
      if (frp > 5 && (confidence === 'h' || confidence === 'n')) {
        fires.push({
          lat,
          lon,
          brightness,
          frp,
          confidence,
          region: "Détection Satellitaire",
          acq_date: cols[5],
        });
      }
    }

    return fires;
  } catch (error) {
    console.error("Erreur lors de la récupération des incendies NASA:", error);
    return [];
  }
}
