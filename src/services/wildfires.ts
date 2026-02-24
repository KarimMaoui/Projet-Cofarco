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
  const targetUrl = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_Global_24h.csv";
  // On utilise le proxy pour éviter l'erreur CORS bloquante sur localhost
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Erreur réseau via Proxy');

    const json = await response.json();
    const csvData = json.contents; // Le contenu du fichier CSV se trouve ici

    if (!csvData) return [];

    // On sépare par ligne et on retire l'en-tête (la première ligne)
    const rows = csvData.split('\n').slice(1);
    const fires: MapFire[] = [];

    for (const row of rows) {
      if (!row.trim()) continue;
      const cols = row.split(',');

      const lat = parseFloat(cols[0]);
      const lon = parseFloat(cols[1]);
      const brightness = parseFloat(cols[2]);
      const confidence = cols[9]; // Indice de confiance (h, n, l)
      const frp = parseFloat(cols[12]); // Puissance radiative du feu (MW)

      // Filtrage : On ne garde que les détections fiables avec un impact réel
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
