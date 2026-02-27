// api/oecd-risk.js

export default function handler(req, res) {
  // Données officielles OCDE - Mise à jour Février 2026 (Post 104ème réunion)
  const oecdData = [
    // Catégorie 0 : Pays à haut revenu / Membres OCDE (Benchmarks)
    { country: 'Suisse', score: 0, flag: '🇨🇭' },
    { country: 'Singapour', score: 0, flag: '🇸🇬' },
    { country: 'Chili', score: 0, flag: '🇨🇱' }, // Corrigé : Membre OCDE High Income

    // Catégorie 2 : Risque Faible
    { country: 'Émirats Arabes Unis', score: 2, flag: '🇦🇪' },
    { country: 'Arabie Saoudite', score: 2, flag: '🇸🇦' },
    { country: 'Chine', score: 2, flag: '🇨🇳' },

    // Catégorie 3 : Risque Modéré
    { country: 'Inde', score: 3, flag: '🇮🇳' },
    { country: 'Mexique', score: 3, flag: '🇲🇽' },
    { country: 'Indonésie', score: 3, flag: '🇮🇩' },
    { country: 'Maroc', score: 3, flag: '🇲🇦' },
    { country: 'Pérou', score: 3, flag: '🇵🇪' },
    { country: 'Philippines', score: 3, flag: '🇵🇭' },

    // Catégorie 4 : Risque Intermédiaire
    { country: 'Brésil', score: 4, flag: '🇧🇷' }, // Corrigé de 3 à 4
    { country: 'Colombie', score: 4, flag: '🇨🇴' }, // Corrigé de 3 à 4
    { country: 'Vietnam', score: 4, flag: '🇻🇳' },
    { country: 'Afrique du Sud', score: 4, flag: '🇿🇦' },
    { country: 'Oman', score: 4, flag: '🇴🇲' },

    // Catégorie 5 : Risque Élevé
    { country: 'Kazakhstan', score: 5, flag: '🇰🇿' }, // Corrigé de 4 à 5
    { country: 'Turquie', score: 5, flag: '🇹🇷' },
    { country: 'Côte d\'Ivoire', score: 5, flag: '🇨🇮' },
    { country: 'Géorgie', score: 5, flag: '🇬🇪' },
    { country: 'Ouzbékistan', score: 5, flag: '🇺🇿' },
    { country: 'Arménie', score: 5, flag: '🇦🇲' }, // Nouveau ajout stratégique

    // Catégorie 6 : Risque Très Élevé
    { country: 'Égypte', score: 6, flag: '🇪🇬' },
    { country: 'Nigéria', score: 6, flag: '🇳🇬' },
    { country: 'Angola', score: 6, flag: '🇦🇴' },
    { country: 'Bangladesh', score: 6, flag: '🇧🇩' },
    { country: 'Moldavie', score: 6, flag: '🇲🇩' }, // Nouveau ajout stratégique

    // Catégorie 7 : Risque Maximum (Critique)
    { country: 'Sénégal', score: 7, flag: '🇸🇳' }, // CORRECTION CRITIQUE (Dégradé de 5 à 7)
    { country: 'Kenya', score: 7, flag: '🇰🇪' }, // Corrigé de 6 à 7
    { country: 'Pakistan', score: 7, flag: '🇵🇰' }, // Corrigé de 6 à 7
    { country: 'Argentine', score: 7, flag: '🇦🇷' },
    { country: 'Liban', score: 7, flag: '🇱🇧' },
    { country: 'Ghana', score: 7, flag: '🇬🇭' },
    { country: 'Ukraine', score: 7, flag: '🇺🇦' },
    { country: 'Venezuela', score: 7, flag: '🇻🇪' },
    { country: 'Iran', score: 7, flag: '🇮🇷' },
    { country: 'Zambie', score: 7, flag: '🇿🇲' }
  ];

  // Tri par score (du plus risqué au moins risqué) pour le dashboard
  const sortedData = oecdData.sort((a, b) => b.score - a.score);

  res.status(200).json({
    last_update: "2026-02-26",
    source: "OECD Prevailing Classifications",
    data: sortedData
  });
}
