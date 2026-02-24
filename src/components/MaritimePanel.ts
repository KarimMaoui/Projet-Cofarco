// src/components/MaritimePanel.ts
import { Panel } from './Panel';

export class MaritimePanel extends Panel {
  constructor() {
    super('maritime-panel', 'Flux Stratégiques & Logistique');
  }

  public updateData(disruptions: any[], congestions: any[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    if (disruptions.length > 0) {
      html += `<div style="font-size: 10px; color: #888; text-transform: uppercase;">⚠️ Perturbations AIS / Brouillages</div>`;
      disruptions.forEach(d => {
        html += `
          <div style="background: rgba(255, 68, 68, 0.1); border-left: 3px solid #ff4444; padding: 10px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: bold; color: #fff;">${d.region}</span>
              <span style="font-size: 10px; color: #ff4444;">Navires "Dark": ${d.darkShips}</span>
            </div>
            <div style="font-size: 11px; color: #ccc;">${d.description}</div>
          </div>
        `;
      });
    }

    if (congestions.length > 0) {
      html += `<div style="font-size: 10px; color: #888; text-transform: uppercase; margin-top: 8px;">🚢 Congestions de Chokepoints</div>`;
      congestions.forEach(c => {
        html += `
          <div style="background: rgba(255, 170, 0, 0.1); border-left: 3px solid #ffaa00; padding: 10px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: bold; color: #fff;">${c.name}</span>
              <span style="font-size: 10px; color: #ffaa00;">Trafic: +${c.deltaPct}%</span>
            </div>
            <div style="font-size: 11px; color: #ccc;">${c.impact}</div>
          </div>
        `;
      });
    }

    html += '</div>';
    this.setContent(html);
  }
}
