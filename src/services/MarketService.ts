// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  cnbcSymbol: string; // NOUVEAU : Le code spécifique pour CNBC
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
}

// Double configuration : Symboles Yahoo + Symboles CNBC
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
      ...a,
      price: 0,
      change: 0,
      changePercent: 0
    }));
  }

  // La fonction ultime qui ne passera par AUCUN proxy
  private async fetchRealPrices() {
    // 🟢 STRATÉGIE 1 : Attaque directe sur CNBC (Zéro CORS, Zéro Proxy)
    try {
      const cnbcSymbols = this.assets.map(a => a.cnbcSymbol).join(',');
      const cnbcUrl = `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=${cnbcSymbols}&requestMethod=itv&noform=1&fund=1&exthrs=1&output=json`;
      
      // Regarde maman, sans proxy !
      const response = await fetch(cnbcUrl); 
      const data = await response.json();
      const quotes = data?.FormattedQuoteResult?.FormattedQuote;
      
      if (quotes) {
        // CNBC renvoie un objet si 1 résultat, un tableau si plusieurs. On sécurise :
        const quoteArray = Array.isArray(quotes) ? quotes : [quotes];
        
        this.assets = this.assets.map(asset => {
          const quote = quoteArray.find((q: any) => q.symbol === asset.cnbcSymbol);
          if (quote && quote.last) {
            // CNBC envoie des strings formatées (ex: "2,045.50"), on nettoie tout ça
            const price = parseFloat(quote.last.replace(/,/g, ''));
            const change = parseFloat(quote.change.replace(/,/g, '')) || 0;
            const changePercent = parseFloat(quote.change_pct.replace(/%/g, '')) || 0;
            return { ...asset, price, change, changePercent };
          }
          return asset;
        });
        
        console.log("🟢 [Marchés] Succès : Vrais prix récupérés via CNBC !");
        return; // Mission accomplie, on sort de la fonction.
      }
    } catch (error) {
      console.warn("CNBC a échoué, passage au Plan B...");
    }

    // 🟡 STRATÉGIE 2 : Yahoo Finance "Spark" v8 (Endpoint graphique sans CORS)
    try {
      const yahooSymbols = this.assets.map(a => a.symbol).join(',');
      const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/spark?symbols=${yahooSymbols}`;
      
      const response = await fetch(yahooUrl); // Toujours sans proxy !
      const data = await response.json();

      this.assets = this.assets.map(asset => {
        const spark = data[asset.symbol];
        if (spark && spark.meta) {
          const price = spark.meta.regularMarketPrice;
          const prevClose = spark.meta.chartPreviousClose || price;
          const change = price - prevClose;
          const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;
          return { ...asset, price, change, changePercent };
        }
        return asset;
      });
      
      console.log("🟡 [Marchés] Succès : Vrais prix récupérés via Yahoo v8 !");
    } catch (error) {
      console.error("🔴 Les deux APIs ont échoué. T'as vraiment pas de chance avec ton réseau.");
    }
  }

  public async subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    // 1. Premier chargement immédiat au lancement
    await this.fetchRealPrices();
    callback([...this.assets]);

    // 2. Mise à jour toutes les 15 secondes 
    // (Comme on n'utilise pas de proxy, on ne risque plus de se faire bannir l'IP par le proxy)
    setInterval(async () => {
      await this.fetchRealPrices();
      callback([...this.assets]);
    }, 15000); 
  }
}
