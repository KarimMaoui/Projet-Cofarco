// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  cnbcSymbol: string;
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
}

export const COMMODITIES = [
  { symbol: 'GC=F', cnbcSymbol: '@GC.1', name: 'Gold', display: 'GOLD' },
  { symbol: 'CL=F', cnbcSymbol: '@CL.1', name: 'Crude Oil', display: 'OIL' },
  { symbol: 'NG=F', cnbcSymbol: '@NG.1', name: 'Natural Gas', display: 'NATGAS' },
  { symbol: 'HG=F', cnbcSymbol: '@HG.1', name: 'Copper', display: 'COPPER' },
];

export const MARKET_SYMBOLS = [
  { symbol: '^GSPC', cnbcSymbol: '.SPX', name: 'S&P 500', display: 'SPX' },
  { symbol: '^IXIC', cnbcSymbol: '.NDX', name: 'NASDAQ', display: 'NDX' },
];

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    const all = [...COMMODITIES, ...MARKET_SYMBOLS];
    this.assets = all.map(a => ({
      ...a, price: 0, change: 0, changePercent: 0
    }));
  }

  private async fetchRealPrices() {
    try {
      const cnbcSymbols = this.assets.map(a => a.cnbcSymbol).join(',');
      const cnbcUrl = `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=${cnbcSymbols}&requestMethod=itv&noform=1&fund=1&exthrs=1&output=json`;
      
      const response = await fetch(cnbcUrl); 
      const data = await response.json();
      const quotes = data?.FormattedQuoteResult?.FormattedQuote;
      
      if (quotes) {
        const quoteArray = Array.isArray(quotes) ? quotes : [quotes];
        
        this.assets = this.assets.map((asset) => {
          // Le cœur de la solution : on matche la donnée sur les 2 premières lettres du symbole (ex: GC)
          const quote = quoteArray.find(q => {
             if (!q || !q.symbol) return false;
             if (asset.cnbcSymbol === '.SPX' && q.symbol === '.SPX') return true;
             if (asset.cnbcSymbol === '.NDX' && q.symbol === '.NDX') return true;
             
             const prefix = asset.cnbcSymbol.substring(1, 3);
             return q.symbol.startsWith(prefix);
          });
          
          if (quote && quote.last) {
            const livePrice = parseFloat(String(quote.last).replace(/,/g, ''));
            const liveChange = parseFloat(String(quote.change).replace(/,/g, '')) || 0;
            const liveChangePct = parseFloat(String(quote.change_pct).replace(/%/g, '')) || 0;
            
            if (!isNaN(livePrice) && livePrice > 0) {
              return { ...asset, price: livePrice, change: liveChange, changePercent: liveChangePct };
            }
          }
          return asset; 
        });
      }
    } catch (error) {
      console.error("🔴 Erreur Flux Marchés:", error);
    }
  }

  public async subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    // 1. Récupération des VRAIS prix immédiatement
    await this.fetchRealPrices();
    callback([...this.assets]);

    // 2. Mise à jour réelle toutes les 30 secondes
    setInterval(async () => {
      await this.fetchRealPrices();
      callback([...this.assets]);
    }, 30000); 
  }
}
