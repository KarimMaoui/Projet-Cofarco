// src/services/MacroService.ts

export interface CountryMacroScore {
  country: string;
  countryName: string;
  gdpGrowth: number | null;
  internetUsers: number | null;
  techExports: number | null;
  compositeScore: number;
}

const INDICATORS = {
  gdpGrowth: 'NY.GDP.MKTP.KD.ZG',
  internetUsers: 'IT.NET.USER.ZS',
  techExports: 'TX.VAL.TECH.MF.ZS'
};

export class MacroService {
  public static async fetchCountryScore(countryCode: string): Promise<CountryMacroScore | null> {
    try {
      const codes = Object.values(INDICATORS).join(';');
      // per_page=100 est crucial pour recevoir TOUS les indicateurs en une seule page
      // mrv=1 récupère la "Most Recent Value"
      const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${codes}?format=json&mrv=1&per_page=100`;
      
      const response = await fetch(url);
      const data = await response.json();

      // La Banque Mondiale renvoie [metadata, data_array]
      if (!data || !data[1] || data[1].length === 0) {
        console.warn(`Pas de données macro pour ${countryCode}`);
        return null;
      }
      
      const records = data[1];

      // On cherche chaque indicateur dans le tableau de résultats
      const getVal = (id: string) => {
        const entry = records.find((d: any) => d.indicator.id === id);
        return entry ? entry.value : null;
      };

      const gdp = getVal(INDICATORS.gdpGrowth);
      const internet = getVal(INDICATORS.internetUsers);
      const tech = getVal(INDICATORS.techExports);

      // Calcul du score (pondération : 40% Internet, 40% Tech, 20% PIB)
      const compositeScore = ( (internet || 0) * 0.4 + (tech || 0) * 0.4 + (Math.max(0, gdp || 0) * 10) * 0.2 );

      return {
        country: countryCode,
        countryName: records[0].country.value,
        gdpGrowth: gdp,
        internetUsers: internet,
        techExports: tech,
        compositeScore: Math.round(compositeScore)
      };
    } catch (e) {
      console.error(`Erreur MacroService pour ${countryCode}:`, e);
      return null;
    }
  }
}
