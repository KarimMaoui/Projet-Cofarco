// src/services/ClimateService.ts

export interface ClimateAnomaly {
  zone: string;
  lat: number;
  lon: number;
  tempDelta: number;
  severity: 'normal' | 'moderate' | 'extreme';
  type: 'warm' | 'cold' | 'mixed';
}

// Ajout des "monthlyNormals" (Moyennes historiques de Janvier à Décembre en °C)
const STRATEGIC_ZONES = [
  { 
    name: 'Mato Grosso (Agro - Brésil)', lat: -12.64, lon: -55.42,
    monthlyNormals: [26.0, 26.0, 26.0, 26.0, 25.0, 24.0, 24.0, 26.0, 27.5, 27.5, 26.5, 26.0] 
  },
  { 
    name: 'Golfe du Mexique (Pétrole - US)', lat: 25.0, lon: -90.0,
    monthlyNormals: [22.0, 23.0, 24.5, 26.0, 28.0, 29.5, 30.0, 30.5, 29.5, 27.5, 25.0, 23.0] 
  },
  { 
    name: 'Yangtsé (Industrie - Chine)', lat: 30.5, lon: 114.3,
    monthlyNormals: [4.0, 6.5, 11.0, 17.5, 22.5, 26.0, 29.0, 28.5, 24.0, 18.0, 12.0, 6.0] 
  },
  { 
    name: 'Canal de Panama (Fret)', lat: 9.1, lon: -79.7,
    monthlyNormals: [27.0, 27.5, 28.0, 28.5, 28.0, 27.5, 27.5, 27.5, 27.0, 27.0, 27.0, 27.0] 
  },
  { 
    name: 'Mer Noire (Blé - Ukraine/Russie)', lat: 44.0, lon: 35.0,
    monthlyNormals: [3.0, 3.5, 6.0, 11.0, 16.5, 21.5, 24.5, 24.5, 20.0, 14.5, 9.0, 4.5] 
  }
];

export class ClimateService {
  public static async fetchAnomalies(): Promise<ClimateAnomaly[]> {
    try {
      const currentMonth = new Date().getMonth(); // 0 = Janvier, 11 = Décembre

      const results = await Promise.all(STRATEGIC_ZONES.map(async (zone) => {
        // On récupère la température LIVE
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${zone.lat}&longitude=${zone.lon}&current=temperature_2m&timezone=auto`
        );
        const data = await response.json();
        
        const currentTemp = data.current.temperature_2m;
        
        // VRAI CALCUL : Température Live - Normale historique du mois actuel
        const normalTemp = zone.monthlyNormals[currentMonth];
        const delta = currentTemp - normalTemp; 

        return {
          zone: zone.name,
          lat: zone.lat,
          lon: zone.lon,
          tempDelta: delta,
          type: delta > 0 ? 'warm' : 'cold',
          // Ajustement des seuils de sévérité (le climat est très sensible, +3°C c'est énorme)
          severity: Math.abs(delta) > 5 ? 'extreme' : Math.abs(delta) > 2.5 ? 'moderate' : 'normal'
        } as ClimateAnomaly;
      }));

      // On ne retourne que les zones qui ont une vraie anomalie
      return results.filter(a => a.severity !== 'normal');
    } catch (error) {
      console.error("🔴 Erreur Climate API:", error);
      return [];
    }
  }

  public static getSeverityIcon(anomaly: ClimateAnomaly): string {
    if (anomaly.severity === 'extreme') return '🚨';
    switch (anomaly.type) {
      case 'warm': return '🔥'; // Vague de chaleur
      case 'cold': return '❄️'; // Vague de froid
      default: return '⚠️';
    }
  }

  public static formatDelta(value: number): string {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}°C`;
  }
}
