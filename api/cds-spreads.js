// api/cds-spreads.js
export default function handler(req, res) {
  res.status(200).json({
    last_update: "2026-02-26T22:00:00Z",
    source: "Market Composite / Bloomberg Terminal Proxy",
    data: [
      { country: 'Brésil', type: '5Y CDS', value: '145 bps', trend: 'down', change: '-3' },
      { country: 'Afrique du Sud', type: '5Y CDS', value: '238 bps', trend: 'up', change: '+2' },
      { country: 'Turquie', type: '5Y CDS', value: '265 bps', trend: 'down', change: '-7' },
      { country: 'Égypte', type: '5Y CDS', value: '820 bps', trend: 'down', change: '-15' },
      { country: 'Pakistan', type: '5Y CDS', value: '780 bps', trend: 'up', change: '+14' },
      { country: 'Argentine', type: '5Y CDS', value: '1 450 bps', trend: 'up', change: '+32' },
      { country: 'Kenya', type: '5Y CDS', value: '410 bps', trend: 'down', change: '-5' },
      
      // Marchés Frontières (Rendements obligataires en %)
      { country: 'Sénégal', type: '10Y Sov Yield', value: '10.20%', trend: 'up', change: '+18' },
      { country: 'Côte d\'Ivoire', type: '10Y Sov Yield', value: '8.45%', trend: 'down', change: '-8' },
      { country: 'Angola', type: '10Y Sov Yield', value: '11.30%', trend: 'up', change: '+5' },
      { country: 'Nigéria', type: '10Y Sov Yield', value: '18.40%', trend: 'up', change: '+22' },
      { country: 'Zambie', type: '10Y Sov Yield', value: '17.10%', trend: 'down', change: '-30' }
    ]
  });
}
