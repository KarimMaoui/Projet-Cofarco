// src/components/LiveNewsPanel.ts
import { Panel } from './Panel';

export interface LiveChannel {
  id: string;
  name: string;
  videoId: string;
}

const LIVE_CHANNELS: LiveChannel[] = [
  { id: 'bloomberg', name: 'Bloomberg', videoId: 'iEpJwprxDdk' },
  { id: 'sky', name: 'SkyNews', videoId: 'YDvsBbKfLPA' },
  { id: 'euronews', name: 'Euronews', videoId: 'pykpO5kQJ98' },
  { id: 'dw', name: 'DW', videoId: 'LuKwFajn37U' },
  { id: 'cnbc', name: 'CNBC', videoId: '9NyxcX3rhQs' },
  { id: 'france24', name: 'France24', videoId: 'Ap-UM1O9RBU' }
];

export class LiveNewsPanel extends Panel {
  private activeChannel: LiveChannel;

  constructor() {
    super('live-news', 'ACTUALITÉS EN DIRECT');
    this.activeChannel = LIVE_CHANNELS[0];
    this.element.style.gridColumn = 'span 2'; // Prend plus de place dans la grille
    
    this.createChannelSwitcher();
    this.renderPlayer();
  }

  private createChannelSwitcher(): void {
    const toolbar = document.createElement('div');
    toolbar.style.cssText = 'display: flex; gap: 4px; padding: 6px 8px; background: #111; border-bottom: 1px solid #2a2a2a; overflow-x: auto;';

    LIVE_CHANNELS.forEach(channel => {
      const btn = document.createElement('button');
      btn.textContent = channel.name.toUpperCase();
      btn.style.cssText = `
        padding: 4px 8px; font-size: 10px; cursor: pointer; border-radius: 2px;
        background: ${channel.id === this.activeChannel.id ? '#ff4444' : 'transparent'};
        color: ${channel.id === this.activeChannel.id ? '#fff' : '#888'};
        border: 1px solid ${channel.id === this.activeChannel.id ? '#ff4444' : '#2a2a2a'};
      `;
      
      btn.addEventListener('click', () => {
        this.activeChannel = channel;
        // Mettre à jour le style des boutons
        Array.from(toolbar.children).forEach(child => {
          const c = child as HTMLElement;
          c.style.background = 'transparent';
          c.style.color = '#888';
          c.style.borderColor = '#2a2a2a';
        });
        btn.style.background = '#ff4444';
        btn.style.color = '#fff';
        btn.style.borderColor = '#ff4444';
        
        this.renderPlayer();
      });
      toolbar.appendChild(btn);
    });

    this.element.insertBefore(toolbar, this.content);
  }

  private renderPlayer(): void {
    // Intégration iframe YouTube standard pour éviter les erreurs de l'API complexe
    this.content.style.padding = '0';
    this.content.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${this.activeChannel.videoId}?autoplay=1&mute=1" 
        title="${this.activeChannel.name} Live" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
  }
}
