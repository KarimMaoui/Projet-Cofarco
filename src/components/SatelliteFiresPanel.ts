// src/components/SatelliteFiresPanel.ts
import { Panel } from './Panel';
import { FireRegionStats } from '../services/wildfires';

export class SatelliteFiresPanel extends Panel {
  constructor() {
    super('satellite-fires', 'SURVEILLANCE THERMIQUE (NASA)');
  }

  public updateData(stats: FireRegionStats[], totalCount: number) {
    if (stats.length === 0) {
      this.setContent('<div style="padding:10px; color:#888;">Scan thermique en cours...</div>');
      return;
    }

    // Construction des lignes du tableau
    const rows = stats.map(s => {
      const frpStr = s.totalFrp >= 1000 
        ? `${(s.totalFrp / 1000).toFixed(1)}k` 
        : Math.round(s.totalFrp).toLocaleString();
      
      const highClassStyle = s.highIntensityCount > 0 ? 'color: #ff4444; font-weight: bold;' : '';

      return `
        <tr style="border-bottom: 1px solid #222; font-size: 11px;">
          <td style="padding: 6px 2px;">${s.region}</td>
          <td style="padding: 6px 2px; text-align: center;">${s.fireCount}</td>
          <td style="padding: 6px 2px; text-align: center; ${highClassStyle}">${s.highIntensityCount}</td>
          <td style="padding: 6px 2px; text-align: right; color: #ffaa00;">${frpStr}</td>
        </tr>
      `;
    }).join('');

    this.setContent(`
      <div style="font-family: monospace; width: 100%;">
        <table style="width: 100%; border-collapse: collapse; color: #ccc;">
          <thead>
            <tr style="text-align: left; font-size: 10px; color: #555; border-bottom: 1px solid #333;">
              <th style="padding: 4px 0;">RÉGION</th>
              <th style="padding: 4px 0; text-align: center;">FEUX</th>
              <th style="padding: 4px 0; text-align: center;">HAUT</th>
              <th style="padding: 4px 0; text-align: right;">FRP</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 9px; color: #444; border-top: 1px solid #222; padding-top: 8px;">
          <span>NASA FIRMS (VIIRS SNPP)</span>
          <span>TOTAL: ${totalCount}</span>
        </div>
      </div>
    `);
  }
}
