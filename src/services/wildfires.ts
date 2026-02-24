// src/services/wildfires.ts

export interface MapFire {
  lat: number; lon: number; brightness: number; frp: number;
  confidence: string; region: string; acq_date: string;
}

export interface FireRegionStats {
  region: string; fireCount: number; totalFrp: number; highIntensityCount: number;
}

export async function fetchLiveFires(): Promise<{ fires: MapFire[], stats: FireRegionStats[] }> {
  // Fichier global de la NASA
  const targetUrl = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv";
  
  // Utilisation du proxy Codetabs (plus robuste pour les gros fichiers textes)
  const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Le proxy Codetabs est inaccessible');
    
    // Codetabs renvoie le texte pur directement
    const csvData = await response.text();
    
    // Sécurité : si le proxy plante, il renvoie parfois du HTML. On ignore dans ce cas.
    if (!csvData || csvData.length < 100 || csvData.includes('<html>')) {
        console.warn("NASA FIRMS: Fichier vide ou proxy bloqué.");
        return { fires: [], stats: [] };
    }

    const rows = csvData.split('\n').slice(1);
    const fires: MapFire[] = [];
    const regionGroups: Record<string, MapFire[]> = {};

    for (const row of rows) {
      const cols = row.split(',');
      if (cols.length < 13) continue;

      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      
      // Découpage géographique MONDIAL (puisqu'on charge le fichier Global)
      let region = "Autres";
      if (lon < -30) {
        region = "Amériques";
      } else if (lat > 35 && lon > -30 && lon < 60) {
        region = "Europe/Méditerranée";
      } else if (lat <= 35 && lat > -35 && lon > -30 && lon < 60) {
        region = "Afrique/Moyen-Orient";
      } else if (lon >= 60) {
        region = "Asie/Pacifique";
      }

      const fire: MapFire = {
        lat, lon,
        brightness: parseFloat(cols[2]),
        confidence: cols[9],
        frp: parseFloat(cols[12]),
        region,
        acq_date: cols[5],
      };

      // Seuil de puissance > 2 MW pour garder les feux significatifs
      if (fire.frp > 2 && (fire.confidence === 'h' || fire.confidence === 'n')) {
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

    console.log(`[NASA FIRMS] ${fires.length} foyers actifs récupérés via Codetabs.`);

    return { fires, stats };
  } catch (error) {
    console.error("Échec NASA FIRMS:", error);
    return { fires: [], stats: [] };
  }
}
