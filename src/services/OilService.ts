// src/services/OilService.ts

export interface OilPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export class OilService {
  // Utilise un proxy public pour interroger Yahoo Finance sans clé API
  public static async fetchPrices(): Promise<OilPrice[]> {
    const symbols = ['CL=F', 'BZ=F']; // CL=F (WTI), BZ=F (Brent)
    const proxy = "https://api.allorigins.win/get?url=";
    
    try {
      const results = await Promise.all(symbols.map(async (sym) => {
        const url = encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=1d`);
        const response = await fetch(`${proxy}${url}`);
        const raw = await response.json();
        const data = JSON.parse(raw.contents);
        
        const meta = data.chart.result[0].meta;
        return {
          name: sym === 'CL=F' ? 'WTI Crude' : 'Brent Crude',
          symbol: sym,
          price: meta.regularMarketPrice,
          change: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100
        };
      }));
      return results;
    } catch (e) {
      console.error("Erreur Pétrole API:", e);
      return [];
    }
  }
}
