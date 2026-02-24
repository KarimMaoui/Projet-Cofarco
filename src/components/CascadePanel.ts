// src/components/CascadePanel.ts
import { Panel } from './Panel';

export class CascadePanel extends Panel {
  constructor() {
    super('cascade-panel', 'Alerte Chokepoints & Contagion');
  }

  public updateData(alerts: any[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
    
    alerts.forEach(alert => {
      html += `
        <div style="background: #1a1a1a; border: 1px solid #333; padding: 12px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 13px; font-weight: bold; color: #ffaa00;">${alert.chokepoint}</span>
            <span style="font-size: 9px; padding: 2px 6px; background: rgba(255,170,0,0.2); color: #ffaa00; border-radius: 10px; text-transform: uppercase; letter-spacing: 1px;">Risque Élevé</span>
          </div>
          
          <div style="font-size: 11px; color: #888; margin-bottom: 8px;">IMPACT EN CASCADE SUR LA SUPPLY CHAIN :</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #ccc; line-height: 1.6;">
            ${alert.impacts.map((i: string) => `<li>${i}</li>`).join('')}
          </ul>
          
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #333; font-size: 10px; color: #44ff88;">
            <strong>Matières affectées :</strong> ${alert.commodities.join(', ')}
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
