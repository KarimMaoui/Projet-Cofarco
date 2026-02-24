// src/components/CascadePanel.ts
import { Panel } from './Panel';

export class CascadePanel extends Panel {
  constructor() {
    super('cascade-panel', 'Alerte Chokepoints & Contagion');
  }

  public updateData(climateAnomalies: any[]) {
    // Ici on mélange les données météo/climat avec des alertes économiques écrites en dur pour la démo
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    // Exemple 1 : Alerte Géopolitique (Fixe pour la démo)
    html += `
      <div style="background: #141414; border: 1px solid #333; padding: 12px; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 12px; font-weight: bold; color: #ffaa00;">📍 Détroit d'Ormuz</span>
          <span style="font-size: 9px; padding: 2px 6px; background: rgba(255,170,0,0.2); color: #ffaa00; border-radius: 10px; text-transform: uppercase;">Risque Élevé</span>
        </div>
        <div style="font-size: 10px; color: #888; margin-bottom: 6px;">IMPACT SUR LA SUPPLY CHAIN :</div>
        <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #ccc; line-height: 1.5;">
          <li>Hausse des primes d'assurance maritime (War Risk) estimée à <strong style="color: #ffaa00;">+0.5%</strong></li>
          <li>Retards anticipés de 4 à 6 jours vers les terminaux d'Europe</li>
        </ul>
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #333; font-size: 10px; color: #44ff88;">
          <strong>Matières affectées :</strong> Pétrole Brut (Brent), GNL
        </div>
      </div>
    `;

    // Exemple 2 : Alerte Climatique (Basée sur les données de notre mock climate)
    climateAnomalies.forEach(anomaly => {
      html += `
        <div style="background: #141414; border: 1px solid #333; padding: 12px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 12px; font-weight: bold; color: #00aaff;">📍 ${anomaly.note.split('(')[0]}</span>
            <span style="font-size: 9px; padding: 2px 6px; background: rgba(0,170,255,0.2); color: #00aaff; border-radius: 10px; text-transform: uppercase;">Climat</span>
          </div>
          <div style="font-size: 10px; color: #888; margin-bottom: 6px;">IMPACT SUR LA SUPPLY CHAIN :</div>
          <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #ccc; line-height: 1.5;">
            <li>Déficit de précipitations : <strong style="color: #ff4444;">${anomaly.precipDelta} mm</strong></li>
            <li>Baisse du tirant d'eau autorisant moins de tonnage par navire</li>
          </ul>
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #333; font-size: 10px; color: #44ff88;">
            <strong>Matières affectées :</strong> Maïs, Soja, GNL américain
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
