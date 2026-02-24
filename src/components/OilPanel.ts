// src/components/OilPanel.ts
import { Panel } from './Panel';
import { OilPrice } from '../services/OilService';

export class OilPanel extends Panel {
  constructor() {
    super('oil-panel', 'MARCHÉS ÉNERGÉTIQUES (LIVE)');
  }

  public updateData(prices: OilPrice[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
    
    prices.forEach(p => {
      const color = p.change >= 0 ? '#44ff88' : '#ff4444';
      const arrow = p.change >= 0 ? '▲' : '▼';
      
      html += `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; font-weight: bold; color: #fff;">${p.name}</div>
            <div style="font-size: 9px; color: #666;">Prix du baril (USD)</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: 800; color: #eee; font-family: monospace;">$${p.price.toFixed(2)}</div>
            <div style="font-size: 10px; color: ${color}; font-weight: bold;">${arrow} ${p.change.toFixed(2)}%</div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
