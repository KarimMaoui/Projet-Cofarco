// src/components/MacroPanel.ts
import { Panel } from './Panel';
import { CountryMacroScore } from '../services/MacroService';

export class MacroPanel extends Panel {
  constructor() {
    super('macro-panel', 'SOLIDITÉ ÉCONOMIQUE (World Bank)');
  }

  public updateData(scores: CountryMacroScore[]) {
    let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';

    if (scores.length === 0) {
      html += `<div style="color: #888; font-size: 11px; padding: 10px;">Chargement des indicateurs macro...</div>`;
    }

    scores.forEach(s => {
      const color = s.compositeScore > 70 ? '#44ff88' : s.compositeScore > 45 ? '#ffaa00' : '#ff4444';
      
      html += `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid #222; padding: 12px; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 13px; font-weight: bold; color: #fff;">${s.countryName}</span>
            <span style="font-size: 16px; font-weight: 800; color: ${color}; font-family: monospace;">${s.compositeScore}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 10px; color: #aaa;">
            <div>🌐 Internet: <span style="color:#eee;">${s.internetUsers?.toFixed(1)}%</span></div>
            <div>🚀 High-Tech: <span style="color:#eee;">${s.techExports?.toFixed(1) || 'N/A'}%</span></div>
            <div style="grid-column: span 2;">📈 Croissance PIB: <span style="color:#eee;">${s.gdpGrowth?.toFixed(1)}%</span></div>
          </div>
        </div>
      `;
    });

    html += '</div>';
    this.setContent(html);
  }
}
