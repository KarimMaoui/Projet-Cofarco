// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
}

// Les vrais symboles boursiers officiels (Yahoo Finance)
export const COMMODITIES = [
  { symbol: 'GC=F', name: 'Gold', display: 'GOLD' },
  { symbol: 'CL=F', name: 'Crude Oil', display: 'OIL' },
  { symbol: 'NG=F', name: 'Natural Gas', display: 'NATGAS' },
  { symbol: 'HG=F', name: 'Copper', display: 'COPPER' },
];

export const MARKET_SYMBOLS = [
  { symbol: '^GSPC', name: 'S&P 500', display: 'SPX' },
  { symbol: '^IXIC', name: 'NASDAQ', display: 'NDX' },
];

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    // Initialisation vide, en attente de la vraie API
    const all = [...COMMODITIES, ...MARKET_SYMBOLS];
    this.assets = all.map(a => ({
      ...a,
      price: 0,
      change: 0,
      changePercent: 0
    }));
  }

  // Fonction qui interroge l'API LIVE de Yahoo Finance
  private async fetchRealPrices() {
    try {
      const symbols = this.assets.map(a => a.symbol).join(',');
      const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
      
      // Utilisation de corsproxy.io, conçu spécifiquement pour contourner les blocages d'API
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error('Erreur réseau Proxy');
      
      const data = await response.json();
      const results = data.quoteResponse?.result;

      if (results && results.length > 0) {
        this.assets = this.assets.map(asset => {
          const realData = results.find((r: any) => r.symbol === asset.symbol);
          if (realData) {
            return {
              ...asset,
              price: realData.regularMarketPrice || 0,
              change: realData.regularMarketChange || 0,
              changePercent: realData.regularMarketChangePercent || 0
            };
          }
          return asset;
        });
      }
    } catch (error) {
      console.error("Impossible de récupérer les cours Yahoo Finance:", error);
    }
  }

  // S'abonne au flux (Mise à jour toutes les 60 secondes pour ne pas être banni par l'API gratuite)
  public async subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    // 1. Premier chargement immédiat
    await this.fetchRealPrices();
    callback([...this.assets]);

    // 2. Requête en boucle toutes les minutes
    setInterval(async () => {
      await this.fetchRealPrices();
      callback([...this.assets]);
    }, 60000); 
  }
}
