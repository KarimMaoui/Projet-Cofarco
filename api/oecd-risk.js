// api/oecd-risk.js

export default function handler(req, res) {
  setTimeout(() => {
    res.status(200).json({
      source: "OECD ECA Consensus",
      lastUpdated: new Date().toISOString(),
      data: [
        { country: 'Suisse', score: 0, flag: '🇨🇭' },
        { country: 'Singapour', score: 0, flag: '🇸🇬' },
        { country: 'Émirats Arabes Unis', score: 2, flag: '🇦🇪' },
        { country: 'Arabie Saoudite', score: 2, flag: '🇸🇦' },
        { country: 'Chili', score: 2, flag: '🇨🇱' },
        { country: 'Chine', score: 2, flag: '🇨🇳' },
        { country: 'Inde', score: 3, flag: '🇮🇳' },
        { country: 'Mexique', score: 3, flag: '🇲🇽' },
        { country: 'Brésil', score: 3, flag: '🇧🇷' },
        { country: 'Indonésie', score: 3, flag: '🇮🇩' },
        { country: 'Maroc', score: 3, flag: '🇲🇦' },
        { country: 'Colombie', score: 3, flag: '🇨🇴' },
        { country: 'Pérou', score: 3, flag: '🇵🇪' },
        { country: 'Philippines', score: 3, flag: '🇵🇭' },
        { country: 'Vietnam', score: 4, flag: '🇻🇳' },
        { country: 'Afrique du Sud', score: 4, flag: '🇿🇦' },
        { country: 'Kazakhstan', score: 4, flag: '🇰🇿' },
        { country: 'Oman', score: 4, flag: '🇴🇲' },
        { country: 'Turquie', score: 5, flag: '🇹🇷' },
        { country: 'Géorgie', score: 5, flag: '🇬🇪' },
        { country: 'Sénégal', score: 5, flag: '🇸🇳' },
        { country: 'Côte d\'Ivoire', score: 5, flag: '🇨🇮' },
        { country: 'Ouzbékistan', score: 5, flag: '🇺🇿' },
        { country: 'Égypte', score: 6, flag: '🇪🇬' },
        { country: 'Nigéria', score: 6, flag: '🇳🇬' },
        { country: 'Kenya', score: 6, flag: '🇰🇪' },
        { country: 'Angola', score: 6, flag: '🇦🇴' },
        { country: 'Pakistan', score: 6, flag: '🇵🇰' },
        { country: 'Bangladesh', score: 6, flag: '🇧🇩' },
        { country: 'Argentine', score: 7, flag: '🇦🇷' },
        { country: 'Liban', score: 7, flag: '🇱🇧' },
        { country: 'Sri Lanka', score: 7, flag: '🇱🇰' },
        { country: 'Venezuela', score: 7, flag: '🇻🇪' },
        { country: 'Ukraine', score: 7, flag: '🇺🇦' },
        { country: 'Iran', score: 7, flag: '🇮🇷' },
        { country: 'Zambie', score: 7, flag: '🇿🇲' },
        { country: 'Ghana', score: 7, flag: '🇬🇭' },
        { country: 'Mozambique', score: 7, flag: '🇲🇿' }
      ]
    });
  }, 500);
}
