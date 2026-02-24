// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
}

// Tes constantes du projet original (épurées pour les plus importantes)
export const COMMODITIES = [
  { symbol: 'GC=F', name: 'Gold', display: 'GOLD', basePrice: 2045.50 },
  { symbol: 'CL=F', name: 'Crude Oil', display: 'OIL', basePrice: 78.30 },
  { symbol: 'NG=F', name: 'Natural Gas', display: 'NATGAS', basePrice: 1.85 },
  { symbol: 'HG=F', name: 'Copper', display: 'COPPER', basePrice: 3.85 },
];

export const MARKET_SYMBOLS = [
  { symbol: '^GSPC', name: 'S&P 500', display: 'SPX', basePrice: 5080.20 },
  { symbol: '^IXIC', name: 'NASDAQ', display: 'NDX', basePrice: 15990.50 },
];

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    // Initialisation avec des valeurs réalistes
    const all = [...COMMODITIES, ...MARKET_SYMBOLS];
    this.assets = all.map(a => ({
      ...a,
      price: a.basePrice,
      change: 0,
      changePercent: (Math.random() * 2 - 1) // Variation initiale aléatoire
    }));
  }

  // Simule un flux WebSocket qui met à jour les prix chaque seconde
  public subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    callback(this.assets); // Envoi initial

    setInterval(() => {
      this.assets = this.assets.map(asset => {
        // Volatilité réaliste (plus forte sur le gaz naturel, plus faible sur le SPX)
        const volatility = asset.symbol === 'NG=F' ? 0.005 : 0.001; 
        const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
        
        const newPrice = asset.price * changeFactor;
        const diff = newPrice - asset.price;
        
        return {
          ...asset,
          price: newPrice,
          change: diff,
          changePercent: asset.changePercent + (diff / asset.price * 100)
        };
      });
      callback([...this.assets]);
    }, 2000); // Mise à jour toutes les 2 secondes
  }
}
