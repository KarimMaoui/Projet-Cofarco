
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
      // Utilisation de mrnev=1 pour avoir la donnée la plus récente
      const response = await fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${codes}?format=json&mrnev=1`
      );
      const data = await response.json();

      if (!data || !data[1] || data[1].length === 0) return null;
      const records = data[1];

      const getVal = (id: string) => records.find((d: any) => d.indicator.id === id)?.value || null;

      const gdp = getVal(INDICATORS.gdpGrowth);
      const internet = getVal(INDICATORS.internetUsers);
      const tech = getVal(INDICATORS.techExports);

      // Algorithme de score composite basé sur la pondération du projet original
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
      console.error(`Erreur MacroService (${countryCode}):`, e);
      return null;
    }
  }
}
