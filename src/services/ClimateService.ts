// src/services/ClimateService.ts

export interface ClimateAnomaly {
  zone: string;
  lat: number;
  lon: number;
  tempDelta: number;
  severity: 'normal' | 'moderate' | 'extreme';
  type: 'warm' | 'cold' | 'mixed';
}

const STRATEGIC_ZONES = [
  { name: 'Mato Grosso (Agro)', lat: -12.64, lon: -55.42 },
  { name: 'Golfe du Mexique (Oil)', lat: 25.0, lon: -90.0 },
  { name: 'Yangtsé (Industrie)', lat: 30.5, lon: 114.3 }
];

export class ClimateService {
  public static async fetchAnomalies(): Promise<ClimateAnomaly[]> {
    try {
      const results = await Promise.all(STRATEGIC_ZONES.map(async (zone) => {
        // On compare la température actuelle à la normale saisonnière
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${zone.lat}&longitude=${zone.lon}&current=temperature_2m&daily=temperature_2m_max&timezone=auto`
        );
        const data = await response.json();
        
        const currentTemp = data.current.temperature_2m;
        // Simulation d'une anomalie basée sur l'écart à 25°C (moyenne arbitraire pour la démo)
        const delta = currentTemp - 20; 

        return {
          zone: zone.name,
          lat: zone.lat,
          lon: zone.lon,
          tempDelta: delta,
          type: delta > 0 ? 'warm' : 'cold',
          severity: Math.abs(delta) > 8 ? 'extreme' : Math.abs(delta) > 3 ? 'moderate' : 'normal'
        } as ClimateAnomaly;
      }));

      return results.filter(a => a.severity !== 'normal');
    } catch (error) {
      console.error("Erreur Climate API:", error);
      return [];
    }
  }

  // Fonctions originales que tu as trouvées
  public static getSeverityIcon(anomaly: ClimateAnomaly): string {
    switch (anomaly.type) {
      case 'warm': return '🌡️';
      case 'cold': return '❄️';
      default: return '⚠️';
    }
  }

  public static formatDelta(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}°C`;
  }
}
