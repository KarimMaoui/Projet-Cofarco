// src/services/OilService.ts

export interface MarketData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  unit: string;
}

export class OilService {
  public static async fetchPrices(): Promise<MarketData[]> {
    // Configuration de nos commodités stratégiques
    const assets = [
      { sym: 'BZ=F', name: 'Pétrole Brent', unit: 'Baril (USD)' },
      { sym: 'CL=F', name: 'Pétrole WTI', unit: 'Baril (USD)' },
      { sym: 'NG=F', name: 'Gaz Naturel', unit: 'MMBtu (USD)' },
      { sym: 'GC=F', name: 'Or', unit: 'Once (USD)' },
      { sym: 'ZW=F', name: 'Blé', unit: 'Boisseau (USd)' },
      { sym: '^VIX', name: 'Indice VIX', unit: 'Points (Volatilité)' }
    ];
    
    try {
      const results = await Promise.all(assets.map(async (asset) => {
        const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${asset.sym}?interval=1d&range=1d`;
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        const meta = data.chart.result[0].meta;
        const currentPrice = meta.regularMarketPrice;

        // SÉCURITÉ : Alternative si previousClose est manquant
        const referencePrice = meta.previousClose || meta.chartPreviousClose || currentPrice;

        // Calcul de la variation
        const changePct = referencePrice !== 0 
          ? ((currentPrice - referencePrice) / referencePrice) * 100 
          : 0;

        return {
          name: asset.name,
          symbol: asset.sym,
          price: currentPrice,
          change: changePct,
          unit: asset.unit
        };
      }));
      return results;
    } catch (e) {
      console.error("🔴 Erreur Marchés API (CORS):", e);
      return []; // Évite de faire planter l'App
    }
  }
}
