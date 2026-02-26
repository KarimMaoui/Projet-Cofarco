// api/proxy.js

export default async function handler(req, res) {
  // On récupère l'URL de Yahoo que ton dashboard veut interroger
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  try {
    // Le serveur Vercel fait la requête (Yahoo ne verra pas Vercel.app comme une origine web)
    const response = await fetch(targetUrl, {
      headers: {
        // On se fait passer pour un simple navigateur basique
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const data = await response.json();
    
    // On renvoie les données à ton front-end en autorisant le CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du scraping de Yahoo', details: error.message });
  }
}
