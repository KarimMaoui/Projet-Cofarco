// src/components/CountryRiskPanel.ts

export class CountryRiskPanel {
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
      <div style="font-size: 11px; font-weight: 800; color: #44ff88; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 5px;">
        🌐 CLASSIFICATION OCDE (ECA)
      </div>
      <div style="display: flex; justify-content: center; padding: 20px; color: #888; font-size: 12px;">
        <span style="animation: pulse 1.5s infinite;">Récupération des données API...</span>
      </div>
    `;
  }

  private async fetchData() {
    try {
      const response = await fetch('/api/oecd-risk');
      if (!response.ok) throw new Error('Erreur API OCDE');
      
      const result = await response.json();
      this.renderData(result.data);

    } catch (error) {
      console.error("Erreur chargement OCDE:", error);
      this.element.innerHTML += `<div style="color: #ff4444; font-size: 12px; padding: 10px;">Échec de la connexion à l'API.</div>`;
    }
  }

  private renderData(data: any[]) {
    let html = `
      <div style="font-size: 11px; font-weight: 800; color: #44ff88; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 5px;">
        🌐 CLASSIFICATION OCDE (ECA)
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; overflow-y: auto; max-height: 250px; scrollbar-width: thin; scrollbar-color: #44ff88 #1a1a1a; padding-right: 5px;">
    `;

    data.forEach(item => {
      // Les seuils classiques en structuration : 0-3 (Vert), 4-5 (Orange), 6-7 (Rouge)
      let scoreColor = '#44ff88'; 
      if (item.score >= 6) scoreColor = '#ff4444'; 
      else if (item.score >= 4) scoreColor = '#ffaa00'; 

      // Pour la catégorie 0 (Pays à haut revenu non classifiés par l'Arrangement)
      const displayScore = item.score === 0 ? 'Cat. 0' : `Cat. ${item.score}`;

      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #1a1a1a; padding: 8px; border-radius: 4px; border-left: 3px solid ${scoreColor}; transition: all 0.2s ease;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px;">${item.flag}</span>
            <span style="font-size: 12px; font-weight: bold;">${item.country}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="background: #2a2a2a; color: ${scoreColor}; font-family: monospace; font-weight: bold; font-size: 12px; padding: 3px 8px; border-radius: 4px; border: 1px solid ${scoreColor}40;">
              ${displayScore}
            </span>
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <div style="font-size: 9px; color: #666; text-align: right; margin-top: 5px;">
        API Status: Connecté | Source: Arrangement OCDE
      </div>
    `;

    this.element.innerHTML = html;
  }
}
