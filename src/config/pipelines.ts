import type { Pipeline } from '../types';

export const PIPELINES: Pipeline[] = [
  // Gazoducs Russes / Européens (Géopolitique critique)
  {
    id: 'turkstream', name: 'TurkStream', type: 'gas', status: 'operating',
    points: [[38.5, 44.6], [35.0, 43.5], [31.0, 42.5], [29.0, 41.3]],
    capacity: '31.5 bcm/year', operator: 'Gazprom', countries: ['Russia', 'Turkey']
  },
  {
    id: 'yamal-europe', name: 'Yamal-Europe Pipeline', type: 'gas', status: 'operating',
    points: [[73.5, 67.5], [66.0, 64.0], [55.0, 60.0], [45.0, 57.0], [32.0, 55.0], [24.0, 53.0], [17.0, 52.5], [14.0, 52.5]],
    capacity: '33 bcm/year', operator: 'Gazprom', countries: ['Russia', 'Belarus', 'Poland', 'Germany']
  },
  {
    id: 'power-of-siberia', name: 'Power of Siberia', type: 'gas', status: 'operating',
    points: [[118.0, 62.0], [122.0, 58.0], [127.5, 52.0], [130.0, 48.5], [127.5, 45.8]],
    capacity: '38 bcm/year', operator: 'Gazprom', countries: ['Russia', 'China']
  },
  // Oléoducs Moyen-Orient
  {
    id: 'east-west', name: 'East-West Pipeline (Petroline)', type: 'oil', status: 'operating',
    points: [[50.1, 26.3], [47.0, 26.0], [44.0, 25.5], [41.0, 24.0], [38.5, 22.5]],
    capacity: '5 million bpd', operator: 'Saudi Aramco', countries: ['Saudi Arabia']
  },
  {
    id: 'sumed', name: 'SUMED Pipeline', type: 'oil', status: 'operating',
    points: [[33.0, 29.0], [31.2, 30.0], [29.9, 31.2]],
    capacity: '2.5 million bpd', operator: 'SUMED', countries: ['Egypt']
  },
  {
    id: 'kirkuk-ceyhan', name: 'Kirkuk-Ceyhan Pipeline', type: 'oil', status: 'operating',
    points: [[44.4, 35.5], [42.5, 36.5], [40.0, 37.0], [37.0, 37.5], [35.9, 37.0]],
    capacity: '1.6 million bpd', operator: 'BOTAS/SOMO', countries: ['Iraq', 'Turkey']
  }
];
