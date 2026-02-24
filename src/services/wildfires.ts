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

export async function fetchLiveFires() {
  const targetUrl = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv";
  // Utilisation du proxy pour contourner le blocage CORS
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const json = await response.json();
    const csvData = json.contents; // Le contenu du CSV est dans la propriété contents
    
    // ... reste de ton code pour parser le CSV ...
  } catch (error) {
    console.error("Erreur NASA FIRMS:", error);
    return [];
  }
}
    
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
