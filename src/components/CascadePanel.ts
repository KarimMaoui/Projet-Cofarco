// src/components/CascadePanel.ts
import { Panel } from './Panel';

export class CascadePanel extends Panel {
  constructor() {
    super('cascade-panel', 'Alertes Infrastructures (USGS/FIRMS)');
  }

  public updateData(earthquakes: any[], fires: any[]) {
    // Filtrer les séismes dangereux (> 5.0) et les incendies massifs (FRP > 200 MW)
    const majorQuakes = earthquakes.filter(e => e.magnitude >= 5.0);
    const massiveFires = fires.filter(f => f.frp >= 200);

    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    if (majorQuakes.length === 0 && massiveFires.length === 0) {
      html += `<div style="color: #44ff88; font-size: 12px; padding: 10px;">✅ Aucune menace critique immédiate sur les infrastructures.</div>`;
    }

    majorQuakes.forEach(quake => {
      html += `
        <div style="background: rgba(255, 68, 68, 0.1); border-left: 3px solid #ff4444; padding: 12px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 12px; font-weight: bold; color: #ff4444;">🔴 Séisme M${quake.magnitude.toFixed(1)}</span>
            <span style="font-size: 9px; padding: 2px 6px; background: rgba(255,68,68,0.2); color: #ff4444; border-radius: 10px;">Critique</span>
          </div>
          <div style="font-size: 11px; color: #ccc;"><strong>Lieu:</strong> ${quake.place}</div>
          <div style="margin-top: 8px; font-size: 10px; color: #ffaa00;">
            ⚠️ Inspection des pipelines pétroliers/gaziers requise dans un rayon de 100km.
          </div>
        </div>
      `;
    });

    massiveFires.forEach(fire => {
      html += `
        <div style="background: rgba(255, 170, 0, 0.1); border-left: 3px solid #ffaa00; padding: 12px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 12px; font-weight: bold; color: #ffaa00;">🔥 Incendie Majeur (${fire.frp} MW)</span>
            <span style="font-size: 9px; padding: 2px 6px; background: rgba(255,170,0,0.2); color: #ffaa00; border-radius: 10px;">Élevé</span>
          </div>
          <div style="font-size: 11px; color: #ccc;"><strong>Coordonnées:</strong> ${fire.lat.toFixed(2)}°, ${fire.lon.toFixed(2)}°</div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
