// src/components/ClimatePanel.ts
import { Panel } from './Panel';
import { ClimateService, ClimateAnomaly } from '../services/ClimateService';

export class ClimatePanel extends Panel {
  constructor() {
    super('climate-panel', 'Anomalies Climatiques (Impact Commodities)');
  }

  public updateData(anomalies: ClimateAnomaly[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';

    if (anomalies.length === 0) {
      html += `<div style="color: #888; font-size: 11px; padding: 10px;">Analyse des zones de production en cours...</div>`;
    }

    anomalies.forEach(a => {
      const color = a.severity === 'extreme' ? '#ff4444' : '#ffaa00';
      const icon = ClimateService.getSeverityIcon(a);
      
      html += `
        <div style="background: rgba(255,255,255,0.03); border-left: 3px solid ${color}; padding: 10px; border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: bold; font-size: 12px; color: #eee;">${a.zone}</span>
            <span style="font-size: 14px;">${icon}</span>
          </div>
          <div style="font-size: 11px; color: ${color}; font-family: monospace;">
            Écart: ${ClimateService.formatDelta(a.tempDelta)} (${a.severity.toUpperCase()})
          </div>
          <div style="font-size: 10px; color: #888; margin-top: 5px; font-style: italic;">
            ${a.type === 'warm' ? '📈 Risque de sécheresse / stress hydrique' : '📉 Risque de gel / ralentissement logistique'}
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
