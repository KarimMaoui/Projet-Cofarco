// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
}

export const COMMODITIES = [
  { symbol: 'GC=F', name: 'Gold', display: 'GOLD', fallbackPrice: 2045.50 },
  { symbol: 'CL=F', name: 'Crude Oil', display: 'OIL', fallbackPrice: 78.30 },
  { symbol: 'NG=F', name: 'Natural Gas', display: 'NATGAS', fallbackPrice: 1.85 },
  { symbol: 'HG=F', name: 'Copper', display: 'COPPER', fallbackPrice: 3.85 },
];

export const MARKET_SYMBOLS = [
  { symbol: '^GSPC', name: 'S&P 500', display: 'SPX', fallbackPrice: 5080.20 },
  { symbol: '^IXIC', name: 'NASDAQ', display: 'NDX', fallbackPrice: 15990.50 },
];

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    // Initialisation avec des valeurs de secours
    const all = [...COMMODITIES, ...MARKET_SYMBOLS];
    this.assets = all.map(a => ({
      ...a,
      price: a.fallbackPrice,
      change: 0,
      changePercent: 0
    }));
  }

  // Fonction pour récupérer les vrais prix actuels du marché
  private async fetchRealPrices() {
    try {
      // On groupe tous les symboles dans une seule requête pour ne pas bloquer le proxy
      const symbols = [...COMMODITIES, ...MARKET_SYMBOLS].map(s => s.symbol).join(',');
      const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (data && data.quoteResponse && data.quoteResponse.result) {
        const results = data.quoteResponse.result;
        
        // On met à jour nos assets avec les VRAIS prix de Yahoo Finance
        this.assets = this.assets.map(asset => {
          const realData = results.find((r: any) => r.symbol === asset.symbol);
          if (realData) {
            return {
              ...asset,
              price: realData.regularMarketPrice,
              change: realData.regularMarketChange,
              changePercent: realData.regularMarketChangePercent
            };
          }
          return asset;
        });
        console.log("[Yahoo Finance] Vrais cours du marché chargés !");
      }
    } catch (error) {
      console.warn("Impossible de joindre Yahoo Finance, utilisation des prix de secours.", error);
    }
  }

  // On lance le flux
  public async subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    // 1. On va chercher la vraie donnée d'aujourd'hui d'abord
    await this.fetchRealPrices();
    callback(this.assets);

    // 2. On lance l'animation de trading (micro-fluctuations réalistes)
    setInterval(() => {
      this.assets = this.assets.map(asset => {
        // Le gaz naturel bouge plus vite que le S&P 500
        const volatility = asset.symbol === 'NG=F' ? 0.001 : 0.0003; 
        const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
        
        const newPrice = asset.price * changeFactor;
        const diff = newPrice - asset.price;
        
        return {
          ...asset,
          price: newPrice,
          change: asset.change + diff,
          changePercent: asset.changePercent + (diff / asset.price * 100)
        };
      });
      callback([...this.assets]);
    }, 2000); // Mise à jour toutes les 2 secondes
  }
}
