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

export interface FireRegionStats {
  region: string;
  fireCount: number;
  totalFrp: number;
  highIntensityCount: number;
}

export async function fetchLiveFires(): Promise<{ fires: MapFire[], stats: FireRegionStats[] }> {
  // Changement ici : On cible l'Europe/Moyen-Orient pour que le fichier soit 10x plus léger
  const targetUrl = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Europe_24h.csv";
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const json = await response.json();
    const csvData = json.contents;

    if (!csvData) return { fires: [], stats: [] };

    const rows = csvData.split('\n').slice(1);
    const fires: MapFire[] = [];
    const regionGroups: Record<string, MapFire[]> = {};

    for (const row of rows) {
      if (!row.trim()) continue;
      const cols = row.split(',');

      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      
      // Définition des régions pour le fichier Europe/Moyen-Orient
      let region = "Europe (Nord/Ouest)";
      if (lat < 45 && lon > 25) region = "Turquie / Caucase";
      else if (lat < 40 && lon < 25) region = "Méditerranée / Afrique N.";
      else if (lon > 40) region = "Moyen-Orient / Russie";

      const fire: MapFire = {
        lat,
        lon,
        brightness: parseFloat(cols[2]),
        confidence: cols[9],
        frp: parseFloat(cols[12]),
        region,
        acq_date: cols[5],
      };

      // Filtrage technique NASA
      if (fire.frp > 2 && (fire.confidence === 'h' || fire.confidence === 'n')) {
        fires.push(fire);
        (regionGroups[region] ??= []).push(fire);
      }
    }

    const stats: FireRegionStats[] = Object.entries(regionGroups).map(([name, fArr]) => ({
      region: name,
      fireCount: fArr.length,
      totalFrp: fArr.reduce((sum, f) => sum + f.frp, 0),
      highIntensityCount: fArr.filter(f => f.confidence === 'h' || f.brightness > 350).length
    })).sort((a, b) => b.fireCount - a.fireCount);

    return { fires, stats };
  } catch (error) {
    console.error("Erreur NASA FIRMS (Europe):", error);
    return { fires: [], stats: [] };
  }
}
