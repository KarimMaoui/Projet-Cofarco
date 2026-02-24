// src/services/OilService.ts

export interface OilPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export class OilService {
  public static async fetchPrices(): Promise<OilPrice[]> {
    const symbols = ['CL=F', 'BZ=F']; 
    
    try {
      const results = await Promise.all(symbols.map(async (sym) => {
        const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=1d`;
        // Nouveau proxy plus stable
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
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
      console.error("🔴 Erreur Pétrole API (CORS):", e);
      return []; // Retourne un tableau vide au lieu de faire planter l'App
    }
  }
}
