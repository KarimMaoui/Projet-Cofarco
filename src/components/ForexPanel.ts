// src/components/ForexPanel.ts
import { Panel } from './Panel';
import { FinancialData } from '../services/FinanceService';

export class ForexPanel extends Panel {
  constructor() {
    super('forex-panel', 'TAUX DE CHANGE (FX)');
  }

  public updateData(data: FinancialData[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
    
    // Fonction utilitaire pour générer les lignes
    const generateRows = (groupName: string, label: string) => {
      const groupData = data.filter(d => d.group === groupName);
      if (groupData.length === 0) return '';
      
      let sectionHtml = `<div style="font-size: 10px; color: #888; margin-top: 8px; border-bottom: 1px solid #333; padding-bottom: 4px;">${label}</div>`;
      
      groupData.forEach(p => {
        const color = p.change >= 0 ? '#44ff88' : '#ff4444';
        const arrow = p.change >= 0 ? '▲' : '▼';
        
        // Inversion de couleur pour certaines devises émergentes si on veut (ex: hausse USD/TRY = baisse de la livre turque)
        // Mais on garde la logique mathématique standard ici.
        
        sectionHtml += `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid #222; padding: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <div>
              <div style="font-size: 12px; font-weight: bold; color: #fff;">${p.name}</div>
              <div style="font-size: 9px; color: #666;">${p.unit}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 800; color: #eee; font-family: monospace;">${p.price.toFixed(4)}</div>
              <div style="font-size: 10px; color: ${color}; font-weight: bold;">${arrow} ${p.change.toFixed(2)}%</div>
            </div>
          </div>
        `;
      });
      return sectionHtml;
    };

    html += generateRows('majors', 'DEVISES MAJEURES');
    html += generateRows('emerging', 'DEVISES ÉMERGENTES (BRICS+)');

    html += '</div>';
    this.setContent(html);
  }
}
