// api/cds-spreads.js

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json({
      source: "Market Consensus / EM Spreads",
      data: [
        // Les grands émergents (Liquides - CDS 5 Ans)
        { country: 'Brésil', type: '5Y CDS', value: '148 bps', trend: 'down', change: '-2' },
        { country: 'Afrique du Sud', type: '5Y CDS', value: '235 bps', trend: 'up', change: '+5' },
        { country: 'Colombie', type: '5Y CDS', value: '192 bps', trend: 'down', change: '-4' },
        { country: 'Turquie', type: '5Y CDS', value: '285 bps', trend: 'down', change: '-8' },
        
        // Les zones sous tension (CDS très élevés)
        { country: 'Égypte', type: '5Y CDS', value: '845 bps', trend: 'up', change: '+12' },
        { country: 'Pakistan', type: '5Y CDS', value: '720 bps', trend: 'up', change: '+18' },
        { country: 'Argentine', type: '5Y CDS', value: '1 250 bps', trend: 'up', change: '+45' },
        { country: 'Kenya', type: '5Y CDS', value: '410 bps', trend: 'down', change: '-5' },

        // Les marchés Frontières (Illiquides - Obligataire)
        { country: 'Côte d\'Ivoire', type: '10Y Sov Yield', value: '8.45%', trend: 'down', change: '-10' },
        { country: 'Sénégal', type: '10Y Sov Yield', value: '9.20%', trend: 'up', change: '+15' },
        { country: 'Angola', type: '10Y Sov Yield', value: '11.50%', trend: 'up', change: '+8' },
        { country: 'Ghana', type: '10Y Sov Yield', value: '14.25%', trend: 'down', change: '-15' },
        { country: 'Nigéria', type: '10Y Sov Yield', value: '16.50%', trend: 'up', change: '+20' },
        { country: 'Zambie', type: '10Y Sov Yield', value: '18.75%', trend: 'up', change: '+35' }
      ]
    });
  }, 400); 
}
