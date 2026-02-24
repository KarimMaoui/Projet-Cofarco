// src/services/wildfires.ts

export interface MapFire {
  lat: number;
  lon: number;
  brightness: number;
  frp: number;
  confidence: string;
  region: string;
  acq_date: string;
}

export async function fetchLiveFires(): Promise<MapFire[]> {
  try {
    const url = 'https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv';
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Erreur réseau');
    
    const text = await response.text();
    const rows = text.split('\n').slice(1);
    
    const fires: MapFire[] = [];

    for (const row of rows) {
      if (!row) continue;
      const cols = row.split(',');
      
      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      const brightness = parseFloat(cols[2]);
      const confidence = cols[9]; 
      const frp = parseFloat(cols[12]);

      if (frp > 5 && (confidence === 'h' || confidence === 'n')) {
        fires.push({
          lat,
          lon,
          brightness,
          frp,
          confidence,
          region: "Détection Satellitaire NASA",
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
