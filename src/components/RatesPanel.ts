// src/components/RatesPanel.ts
import { Panel } from './Panel';
import { FinancialData } from '../services/FinanceService';

export class RatesPanel extends Panel {
  constructor() {
    super('rates-panel', 'TAUX SOUVERAINS (YIELDS)');
  }

  public updateData(data: FinancialData[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
    
    data.forEach(p => {
      // Pour les taux, une hausse (vert) signifie généralement une baisse du prix de l'obligation (stress)
      const color = p.change >= 0 ? '#44ff88' : '#ff4444'; 
      const arrow = p.change >= 0 ? '▲' : '▼';
      
      html += `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; font-weight: bold; color: #fff;">${p.name}</div>
            <div style="font-size: 9px; color: #666;">${p.unit}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 16px; font-weight: 800; color: #eee; font-family: monospace;">${p.price.toFixed(3)}%</div>
            <div style="font-size: 10px; color: ${color}; font-weight: bold;">${arrow} ${p.change.toFixed(2)}%</div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
