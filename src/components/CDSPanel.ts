// src/components/CDSPanel.ts

export class CDSPanel {
  public element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'panel';
    this.element.style.cssText = `
      background: rgba(20, 20, 20, 0.8);
      border: 1px solid #333;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: 'Inter', sans-serif;
      color: white;
      min-width: 250px;
    `;
    
    this.renderLoading();
    this.fetchData();
  }

  private renderLoading() {
    this.element.innerHTML = `
      <div style="font-size: 11px; font-weight: 800; color: #ffaa00; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 5px;">
        📉 EM SOVEREIGN RISK
      </div>
      <div style="display: flex; justify-content: center; padding: 20px; color: #888; font-size: 12px;">
        <span style="animation: pulse 1.5s infinite;">Connexion Pricing Desk...</span>
      </div>
    `;
  }

  private async fetchData() {
    try {
      const response = await fetch('/api/cds-spreads');
      if (!response.ok) throw new Error('Erreur API CDS');
      const result = await response.json();
      this.renderData(result.data);
    } catch (error) {
      this.element.innerHTML += `<div style="color: #ff4444; font-size: 12px; padding-top: 10px;">Erreur flux de prix.</div>`;
    }
  }

  private renderData(data: any[]) {
    // C'est ici qu'on a le badge CLÔTURE
    let html = `
      <div style="font-size: 11px; font-weight: 800; color: #ffaa00; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
        <span>📉 EM SOVEREIGN RISK</span>
        <span style="background: #2a2a2a; color: #aaa; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: bold; border: 1px solid #444;">CLÔTURE</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px; overflow-y: auto; max-height: 250px; scrollbar-width: thin; scrollbar-color: #ffaa00 #1a1a1a; padding-right: 5px;">
    `;

    data.forEach(item => {
      // En risque pays : si ça monte (up) = danger (rouge). Si ça baisse (down) = amélioration (vert).
      const isUp = item.trend === 'up';
      const trendColor = isUp ? '#ff4444' : '#44ff88';
      const trendIcon = isUp ? '▲' : '▼';

      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; padding: 8px; border-radius: 4px; border-left: 2px solid #333; transition: background 0.2s;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 12px; font-weight: bold;">${item.country}</span>
            <span style="font-size: 9px; color: #888;">${item.type}</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <span style="font-size: 13px; font-family: monospace; font-weight: bold;">${item.value}</span>
            <span style="font-size: 10px; color: ${trendColor}; font-family: monospace; margin-top: 2px;">
              ${trendIcon} ${item.change} bps
            </span>
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <div style="font-size: 9px; color: #666; text-align: right; margin-top: 5px;">
        Source: EM OTC Markets
      </div>
    `;
    this.element.innerHTML = html;
  }
}
