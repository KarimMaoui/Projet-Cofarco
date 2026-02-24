// src/components/MaritimePanel.ts
import { Panel } from './Panel';

export class MaritimePanel extends Panel {
  constructor() {
    super('maritime-panel', 'Flux Stratégiques & Logistique');
  }

  public updateData(aisData: any[], militaryData: any[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    // Section 1 : Perturbations et Navires "Dark" (Transpondeur coupé)
    const darkShips = militaryData.filter(m => m.isDark);
    if (darkShips.length > 0) {
      html += `
        <div style="background: rgba(255, 68, 68, 0.1); border-left: 3px solid #ff4444; padding: 10px; border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: bold; color: #fff;">⚠️ ALERTE DE SÉCURITÉ</span>
            <span style="font-size: 10px; color: #ff4444; font-weight: bold;">${darkShips.length} NAVIRES 'DARK'</span>
          </div>
          <div style="font-size: 11px; color: #ccc;">
            Navires détectés avec système AIS désactivé ou brouillé (Risque d'interception ou d'activité illicite).
          </div>
        </div>
      `;
    }

    // Section 2 : Congestions et trafic
    if (aisData.length > 0) {
      html += `<div style="font-size: 10px; color: #888; text-transform: uppercase; margin-top: 4px; border-bottom: 1px solid #333; padding-bottom: 4px;">Trafic AIS (Chokepoints)</div>`;
      
      aisData.forEach(zone => {
        const isCongested = zone.deltaPct > 20;
        const color = isCongested ? '#ffaa00' : '#44ff88';
        const bgColor = isCongested ? 'rgba(255, 170, 0, 0.1)' : 'rgba(68, 255, 136, 0.1)';
        
        html += `
          <div style="background: ${bgColor}; border-left: 3px solid ${color}; padding: 8px 12px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: bold; color: #e8e8e8;">${zone.note}</span>
              <span style="font-size: 10px; color: #aaa;">Variation du volume de navires</span>
            </div>
            <div style="font-size: 14px; font-weight: bold; color: ${color}; font-family: monospace;">
              +${zone.deltaPct}%
            </div>
          </div>
        `;
      });
    }

    html += '</div>';
    this.setContent(html);
  }
}
