// src/components/OilPanel.ts
import { Panel } from './Panel';
import { MarketData } from '../services/OilService'; // Remplacement de OilPrice par MarketData

export class OilPanel extends Panel {
  constructor() {
    super('oil-panel', 'MARCHÉS COMMODITIES');
  }

  public updateData(data: MarketData[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
    
    data.forEach(p => {
      const color = p.change >= 0 ? '#44ff88' : '#ff4444';
      const arrow = p.change >= 0 ? '▲' : '▼';
      
      // On retire le '$' si c'est le VIX (qui s'exprime en points)
      const priceDisplay = p.symbol === '^VIX' ? p.price.toFixed(2) : `$${p.price.toFixed(2)}`;
      
      html += `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; font-weight: bold; color: #fff;">${p.name}</div>
            <div style="font-size: 9px; color: #666;">${p.unit}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: 800; color: #eee; font-family: monospace;">${priceDisplay}</div>
            <div style="font-size: 10px; color: ${color}; font-weight: bold;">${arrow} ${p.change.toFixed(2)}%</div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
