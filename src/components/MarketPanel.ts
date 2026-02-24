// src/components/MarketPanel.ts
import { Panel } from './Panel';
import { MarketAsset } from '../services/MarketService';

export class MarketPanel extends Panel {
  constructor() {
    super('market-panel', 'MARCHÉS & MATIÈRES PREMIÈRES (LIVE)');
  }

  public updateData(assets: MarketAsset[]) {
    const gridHtml = assets.map(asset => {
      const isUp = asset.changePercent >= 0;
      const color = isUp ? '#44ff88' : '#ff4444';
      const sign = isUp ? '+' : '';
      
      // Formatage des prix
      const decimals = asset.price < 10 ? 3 : 2;
      const formattedPrice = asset.price.toFixed(decimals);
      const formattedPct = `${sign}${asset.changePercent.toFixed(2)}%`;

      return `
        <div style="background: #1a1a1a; padding: 10px; border-radius: 4px; border: 1px solid #333; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: bold; color: #fff; font-size: 12px;">${asset.display}</span>
            <span style="font-size: 10px; color: #888;">${asset.name}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <span style="font-family: monospace; font-size: 16px; color: #fff;">$${formattedPrice}</span>
            <span style="font-family: monospace; font-size: 12px; font-weight: bold; color: ${color};">
              ${formattedPct}
            </span>
          </div>
        </div>
      `;
    }).join('');

    this.setContent(`
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; width: 100%;">
        ${gridHtml}
      </div>
      <div style="margin-top: 10px; text-align: right; font-size: 9px; color: #555;">
        <span style="display: inline-block; width: 6px; height: 6px; background: #44ff88; border-radius: 50%; margin-right: 4px; animation: blink 1s infinite;"></span>
        FLUX TEMPS RÉEL ACTIF
      </div>
      <style>
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } }
      </style>
    `);
  }
}
