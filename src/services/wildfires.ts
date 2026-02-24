// src/services/wildfires.ts

export interface MapFire {
  lat: number; lon: number; brightness: number; frp: number;
  confidence: string; region: string; acq_date: string;
}

export interface FireRegionStats {
  region: string; fireCount: number; totalFrp: number; highIntensityCount: number;
}

export async function fetchLiveFires(): Promise<{ fires: MapFire[], stats: FireRegionStats[] }> {
  // On peut même remettre le Global_24h de la NASA avec ce proxy plus puissant
  const targetUrl = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv";
  
  // NOUVEAU PROXY : Plus stable et ne bloque pas au bout de 5 rafraîchissements
  const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Le proxy Codetabs est inaccessible');
    
    // Codetabs renvoie le texte pur directement, pas besoin de chercher un objet JSON
    const csvData = await response.text();
    
    if (!csvData || csvData.length < 100) return { fires: [], stats: [] };

    const rows = csvData.split('\n').slice(1);
    const fires: MapFire[] = [];
    const regionGroups: Record<string, MapFire[]> = {};


    for (const row of rows) {
      const cols = row.split(',');
      if (cols.length < 13) continue;

      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      
      let region = "Europe";
      if (lon > 25) region = "Turquie / Proche-Orient";
      else if (lat < 42) region = "Méditerranée / Afrique N.";

      const fire: MapFire = {
        lat, lon,
        brightness: parseFloat(cols[2]),
        confidence: cols[9],
        frp: parseFloat(cols[12]),
        region,
        acq_date: cols[5],
      };

      // Seuil abaissé à 2 MW pour voir les feux de biomasse/agricoles d'hiver
      if (fire.frp > 2) {
        fires.push(fire);
        (regionGroups[region] ??= []).push(fire);
      }
    }

    const stats = Object.entries(regionGroups).map(([name, fArr]) => ({
      region: name,
      fireCount: fArr.length,
      totalFrp: fArr.reduce((sum, f) => sum + f.frp, 0),
      highIntensityCount: fArr.filter(f => f.confidence === 'h').length
    })).sort((a, b) => b.fireCount - a.fireCount);

    return { fires, stats };
  } catch (error) {
    console.error("Échec NASA FIRMS:", error);
    return { fires: [], stats: [] };
  }
}
