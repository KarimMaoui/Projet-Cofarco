// src/components/MaritimePanel.ts
import { Panel } from './Panel';

export class MaritimePanel extends Panel {
  constructor() {
    super('maritime-panel', 'Risques Météo & Logistique (NASA)');
  }

  public updateData(naturalEvents: any[]) {
    // Filtrer uniquement les tempêtes/ouragans en cours via la NASA
    const storms = naturalEvents.filter(e => e.category === 'severeStorms');

    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    if (storms.length === 0) {
      html += `<div style="color: #44ff88; font-size: 12px; padding: 10px;">✅ Aucune tempête majeure détectée sur les routes maritimes.</div>`;
    } else {
      html += `<div style="font-size: 10px; color: #888; text-transform: uppercase;">🌪️ Alertes Météo Navales Actives</div>`;
      storms.forEach(storm => {
        html += `
          <div style="background: rgba(0, 150, 255, 0.1); border-left: 3px solid #00aaff; padding: 10px; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 12px; font-weight: bold; color: #fff;">${storm.title}</span>
            </div>
            <div style="font-size: 11px; color: #ccc;">
              Position: ${storm.lat.toFixed(2)}°, ${storm.lon.toFixed(2)}°<br/>
              <em>Risque de retard pour le fret maritime dans cette zone.</em>
            </div>
          </div>
        `;
      });
    }

    html += '</div>';
    this.setContent(html);
  }
}
