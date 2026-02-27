// src/services/FinanceService.ts

export interface FinancialData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  unit: string;
  group?: string; 
}

export class FinanceService {
  /**
   * Fonction générique de récupération avec sécurité anti-crash
   */
  private static async fetchYahooData(assets: any[]): Promise<FinancialData[]> {
    try {
      const results = await Promise.all(assets.map(async (asset) => {
        try {
          const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${asset.sym}?interval=1d&range=1d`;
          const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
          
          const response = await fetch(proxyUrl);
          if (!response.ok) return null;
          
          const data = await response.json();
          
          // --- SÉCURITÉ : Vérification de la structure de réponse Yahoo ---
          if (!data?.chart?.result?.[0]) {
            console.warn(`⚠️ Donnée indisponible pour le symbole : ${asset.sym}`);
            return null; 
          }

          const meta = data.chart.result[0].meta;
          const currentPrice = meta.regularMarketPrice;
          const referencePrice = meta.previousClose || meta.chartPreviousClose || currentPrice;
          
          const changePct = referencePrice !== 0 
            ? ((currentPrice - referencePrice) / referencePrice) * 100 
            : 0;

          return {
            name: asset.name,
            symbol: asset.sym,
            price: currentPrice,
            change: changePct,
            unit: asset.unit,
            group: asset.group
          };
        } catch (innerError) {
          console.error(`Erreur sur l'asset ${asset.sym}:`, innerError);
          return null; 
        }
      }));

      // On filtre pour ne garder que les données valides (on retire les null)
      return results.filter((item): item is FinancialData => item !== null);

    } catch (e) {
      console.error("🔴 Erreur critique Finance API:", e);
      return [];
    }
  }

  /**
   * Récupération des taux de change (Majors & Emerging)
   */
  public static async fetchForex(selectedGroups: string[] = ['majors', 'emerging']): Promise<FinancialData[]> {
    const allPairs = [
      // Devises Majeures
      { sym: 'EURUSD=X', name: 'EUR / USD', unit: 'Dollar US', group: 'majors' },
      { sym: 'JPY=X', name: 'USD / JPY', unit: 'Yen Japonais', group: 'majors' },
      { sym: 'GBPUSD=X', name: 'GBP / USD', unit: 'Dollar US', group: 'majors' },
      // Devises Émergentes / BRICS+
      { sym: 'CNY=X', name: 'USD / CNY', unit: 'Yuan Chinois', group: 'emerging' },
      { sym: 'INR=X', name: 'USD / INR', unit: 'Roupie Indienne', group: 'emerging' },
      { sym: 'BRL=X', name: 'USD / BRL', unit: 'Real Brésilien', group: 'emerging' },
      { sym: 'TRY=X', name: 'USD / TRY', unit: 'Livre Turque', group: 'emerging' }
    ];

    const assetsToFetch = allPairs.filter(p => selectedGroups.includes(p.group));
    return this.fetchYahooData(assetsToFetch);
  }

  /**
   * Récupération des taux d'intérêt souverains (Benchmarks mondiaux)
   */
  public static async fetchRates(): Promise<FinancialData[]> {
    const rates = [
      { sym: '^TNX', name: 'US Treasury 10Y', unit: '%', group: 'rates' },
      { sym: '^FVX', name: 'US Treasury 5Y', unit: '%', group: 'rates' },
      { sym: '^IRX', name: 'US Treasury 13-Week', unit: '%', group: 'rates' },
      { sym: '^TYX', name: 'US Treasury 30Y', unit: '%', group: 'rates' }, 
      { sym: '^US2Y', name: 'US Treasury 2Y', unit: '%', group: 'rates' },  
      { sym: '^CH10Y', name: 'Swiss Conf. 10Y', unit: '%', group: 'rates' }, 
      { sym: '^GDBR10', name: 'German Bund 10Y', unit: '%', group: 'rates' } 
    ];
    return this.fetchYahooData(rates);
  }
}
