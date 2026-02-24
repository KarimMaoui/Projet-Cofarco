import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Dès que ton code appelle "/api/pirate", Vite le redirige secrètement vers Yahoo
      '/api/pirate': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pirate/, ''),
        headers: {
          // On se déguise en navigateur Chrome classique pour tromper la sécurité de Yahoo
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        }
      }
    }
  }
});
