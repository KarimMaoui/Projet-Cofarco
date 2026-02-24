// src/services/MarketService.ts

export interface MarketAsset {
  symbol: string;
  cnbcSymbol: string;
  name: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
  basePrice: number;
}

export const COMMODITIES = [
  { symbol: 'GC=F', cnbcSymbol: '@GC.1', name: 'Gold', display: 'GOLD', basePrice: 2045.50 },
  { symbol: 'CL=F', cnbcSymbol: '@CL.1', name: 'Crude Oil', display: 'OIL', basePrice: 78.30 },
  { symbol: 'NG=F', cnbcSymbol: '@NG.1', name: 'Natural Gas', display: 'NATGAS', basePrice: 1.85 },
  { symbol: 'HG=F', cnbcSymbol: '@HG.1', name: 'Copper', display: 'COPPER', basePrice: 3.85 },
];

export const MARKET_SYMBOLS = [
  { symbol: '^GSPC', cnbcSymbol: '.SPX', name: 'S&P 500', display: 'SPX', basePrice: 5080.20 },
  { symbol: '^IXIC', cnbcSymbol: '.NDX', name: 'NASDAQ', display: 'NDX', basePrice: 15990.50 },
];

export class MarketService {
  private assets: MarketAsset[] = [];

  constructor() {
    // 1. SÉCURITÉ ABSOLUE : On initialise avec les vrais prix (basePrice), JAMAIS à 0.
    const all = [...COMMODITIES, ...MARKET_SYMBOLS];
    this.assets = all.map(a => ({
      ...a,
      price: a.basePrice,
      change: 0,
      changePercent: (Math.random() * 0.4 - 0.2) // Légère variation visuelle au démarrage
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
        
        this.assets = this.assets.map((asset, index) => {
          // LA CORRECTION EST ICI : CNBC renomme les symboles, donc on prend la donnée via son ordre dans le tableau (index)
          const quote = quoteArray[index]; 
          
          if (quote && quote.last) {
            // Nettoyage des virgules américaines (ex: "2,045.50" -> 2045.50)
            const livePrice = parseFloat(String(quote.last).replace(/,/g, ''));
            const liveChange = parseFloat(String(quote.change).replace(/,/g, '')) || 0;
            const liveChangePct = parseFloat(String(quote.change_pct).replace(/%/g, '')) || 0;
            
            // On s'assure que le prix n'est pas cassé avant de l'afficher
            if (!isNaN(livePrice) && livePrice > 0) {
              return { ...asset, price: livePrice, change: liveChange, changePercent: liveChangePct };
            }
          }
          return asset; // Si CNBC échoue pour ce symbole, il garde son basePrice
        });
        console.log("🟢 [Marchés] Vrais prix injectés avec succès depuis CNBC !");
      }
    } catch (error) {
      console.warn("API CNBC indisponible, mode autonome activé.");
    }
  }

  public async subscribeToLiveUpdates(callback: (data: MarketAsset[]) => void) {
    // 1. On envoie les basePrices instantanément pour que la page charge tout de suite sans $0.00
    callback([...this.assets]);

    // 2. On tente de télécharger les vrais prix d'internet
    await this.fetchRealPrices();
    callback([...this.assets]);

    // 3. Boucle d'animation fluide (Salle de marché)
    // Toutes les 2.5 secondes, les prix bougent légèrement, qu'on soit connecté à l'API ou non !
    setInterval(() => {
      this.assets = this.assets.map(asset => {
        const volatility = asset.symbol === 'NG=F' ? 0.001 : 0.0002; 
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
    }, 2500); 
  }
}
