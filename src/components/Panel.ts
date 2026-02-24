// src/components/Panel.ts

export class Panel {
  public element: HTMLElement;
  protected content: HTMLElement;

  constructor(id: string, title: string) {
    this.element = document.createElement('div');
    this.element.className = 'panel';
    this.element.id = id;
    
    // Style "Dashboard Financier"
    this.element.style.cssText = `
      background: #141414;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-height: 250px;
    `;
    
    this.element.innerHTML = `
      <div class="panel-header" style="padding: 12px 16px; border-bottom: 1px solid #2a2a2a; background: #1a1a1a; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin:0; font-size: 11px; color: #e8e8e8; text-transform: uppercase; letter-spacing: 1px;">${title}</h3>
        <div class="status-dot" style="width: 8px; height: 8px; background: #44ff88; border-radius: 50%; box-shadow: 0 0 8px #44ff88;"></div>
      </div>
      <div class="panel-content" style="padding: 16px; flex: 1; overflow-y: auto;"></div>
    `;
    
    this.content = this.element.querySelector('.panel-content') as HTMLElement;
  }

  public setContent(html: string) {
    this.content.innerHTML = html;
  }

  public showLoading(text: string = 'Chargement des données...') {
    this.setContent(`
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #888; font-size: 11px; gap: 10px;">
        <div style="width: 16px; height: 16px; border: 2px solid #2a2a2a; border-top-color: #44ff88; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        ${text}
      </div>
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `);
  }
}
