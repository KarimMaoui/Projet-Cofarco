// src/config/pipelines.ts
import type { Pipeline } from '../types';

// Major international oil and gas pipelines
export const PIPELINES: Pipeline[] = [
  // ===== MAJOR OIL PIPELINES =====

  // North America
  {
    id: 'keystone', name: 'Keystone Pipeline', type: 'oil', status: 'operating',
    points: [[-104.05, 50.95], [-104.0, 49.0], [-101.5, 46.8], [-97.5, 44.4], [-97.0, 41.2], [-95.9, 36.1], [-95.0, 29.8]],
    capacity: '590,000 bpd', length: '3,456 km', operator: 'TC Energy', countries: ['Canada', 'USA'],
  },
  {
    id: 'dakota-access', name: 'Dakota Access Pipeline', type: 'oil', status: 'operating',
    points: [[-103.5, 47.5], [-100.8, 46.8], [-97.0, 45.5], [-96.0, 43.5], [-93.5, 41.5], [-91.0, 40.5]],
    capacity: '570,000 bpd', length: '1,886 km', operator: 'Energy Transfer', countries: ['USA'],
  },
  {
    id: 'trans-mountain', name: 'Trans Mountain Pipeline', type: 'oil', status: 'operating',
    points: [[-114.1, 53.5], [-117.5, 52.9], [-119.3, 52.1], [-121.0, 50.7], [-122.8, 49.3]],
    capacity: '890,000 bpd', length: '1,150 km', operator: 'Trans Mountain Corp', countries: ['Canada'],
  },
  {
    id: 'colonial', name: 'Colonial Pipeline', type: 'oil', status: 'operating',
    points: [[-95.4, 29.8], [-93.2, 30.2], [-90.1, 30.0], [-86.8, 30.7], [-84.4, 33.8], [-80.8, 32.1], [-78.6, 35.8], [-77.0, 38.9], [-74.0, 40.7]],
    capacity: '2.5 million bpd', length: '8,850 km', operator: 'Colonial Pipeline Co', countries: ['USA'],
  },
  {
    id: 'enbridge-line5', name: 'Enbridge Line 5', type: 'oil', status: 'operating',
    points: [[-89.0, 46.8], [-86.0, 45.8], [-84.5, 45.5], [-83.0, 43.0], [-82.5, 42.3]],
    capacity: '540,000 bpd', length: '1,038 km', operator: 'Enbridge', countries: ['USA', 'Canada'],
  },
  {
    id: 'permian-gulf', name: 'Permian Express Pipeline', type: 'oil', status: 'operating',
    points: [[-102.5, 32.0], [-100.5, 31.5], [-98.0, 30.0], [-96.5, 29.0], [-95.0, 29.5]],
    capacity: '480,000 bpd', length: '830 km', operator: 'Energy Transfer', countries: ['USA'],
  },
  {
    id: 'capline', name: 'Capline Pipeline', type: 'oil', status: 'operating',
    points: [[-89.1, 30.0], [-90.5, 32.3], [-90.2, 35.1], [-89.0, 38.6]],
    capacity: '1.2 million bpd', length: '1,017 km', operator: 'Marathon/Plains', countries: ['USA'],
  },
  {
    id: 'seaway', name: 'Seaway Pipeline', type: 'oil', status: 'operating',
    points: [[-97.0, 36.0], [-96.0, 33.0], [-95.5, 30.5], [-95.0, 29.5]],
    capacity: '850,000 bpd', length: '800 km', operator: 'Enterprise/Enbridge', countries: ['USA'],
  },
  {
    id: 'explorer', name: 'Explorer Pipeline', type: 'oil', status: 'operating',
    points: [[-95.5, 29.8], [-95.0, 32.0], [-94.5, 35.0], [-93.0, 38.5], [-90.5, 41.5], [-88.0, 41.9]],
    capacity: '660,000 bpd', length: '2,900 km', operator: 'Explorer Pipeline', countries: ['USA'],
  },
  {
    id: 'enbridge-mainline', name: 'Enbridge Mainline', type: 'oil', status: 'operating',
    points: [[-114.1, 53.5], [-110.0, 53.5], [-105.0, 52.0], [-97.0, 49.9], [-92.0, 48.0], [-86.0, 46.5], [-83.5, 42.5]],
    capacity: '2.85 million bpd', length: '5,353 km', operator: 'Enbridge', countries: ['Canada', 'USA'],
  },
  {
    id: 'plantation', name: 'Plantation Pipeline', type: 'oil', status: 'operating',
    points: [[-90.1, 30.0], [-87.0, 30.5], [-84.5, 33.7], [-81.1, 34.0], [-79.0, 35.5], [-77.5, 37.5]],
    capacity: '660,000 bpd', length: '4,800 km', operator: 'Kinder Morgan', countries: ['USA'],
  },
  {
    id: 'mid-valley', name: 'Mid-Valley Pipeline', type: 'oil', status: 'operating',
    points: [[-90.0, 29.9], [-89.5, 32.0], [-86.0, 36.1], [-85.7, 38.2], [-83.0, 39.1], [-81.5, 41.5]],
    capacity: '320,000 bpd', length: '1,400 km', operator: 'Sunoco', countries: ['USA'],
  },

  // Russia/Europe Oil
  {
    id: 'druzhba', name: 'Druzhba Pipeline', type: 'oil', status: 'operating',
    points: [[52.3, 54.7], [44.0, 53.2], [37.6, 52.3], [32.0, 52.4], [24.0, 52.2], [21.0, 52.2], [14.4, 52.5]],
    capacity: '1.2 million bpd', length: '5,327 km', operator: 'Transneft', countries: ['Russia', 'Belarus', 'Poland', 'Germany', 'Ukraine', 'Hungary'],
  },
  {
    id: 'btc', name: 'Baku-Tbilisi-Ceyhan (BTC)', type: 'oil', status: 'operating',
    points: [[49.9, 40.4], [47.5, 41.3], [44.8, 41.7], [41.6, 41.6], [36.8, 39.5], [35.9, 37.0]],
    capacity: '1.2 million bpd', length: '1,768 km', operator: 'BP', countries: ['Azerbaijan', 'Georgia', 'Turkey'],
  },
  {
    id: 'cpc', name: 'Caspian Pipeline Consortium', type: 'oil', status: 'operating',
    points: [[53.0, 46.9], [49.0, 46.0], [45.5, 45.5], [40.0, 45.0], [37.4, 45.0]],
    capacity: '1.4 million bpd', length: '1,510 km', operator: 'CPC', countries: ['Kazakhstan', 'Russia'],
  },
  {
    id: 'baltic-pipeline', name: 'Baltic Pipeline System (BPS)', type: 'oil', status: 'operating',
    points: [[50.0, 55.0], [40.0, 58.0], [32.0, 59.5], [28.0, 59.9]],
    capacity: '1.5 million bpd', length: '2,350 km', operator: 'Transneft', countries: ['Russia'],
  },
  {
    id: 'bps-2', name: 'Baltic Pipeline System 2 (BPS-2)', type: 'oil', status: 'operating',
    points: [[42.0, 56.5], [35.0, 58.0], [30.0, 59.0], [28.5, 59.5]],
    capacity: '600,000 bpd', length: '1,000 km', operator: 'Transneft', countries: ['Russia'],
  },

  // Middle East Oil
  {
    id: 'east-west', name: 'East-West Pipeline (Petroline)', type: 'oil', status: 'operating',
    points: [[50.1, 26.3], [47.0, 26.0], [44.0, 25.5], [41.0, 24.0], [38.5, 22.5]],
    capacity: '5 million bpd', length: '1,200 km', operator: 'Saudi Aramco', countries: ['Saudi Arabia'],
  },
  {
    id: 'sumed', name: 'SUMED Pipeline', type: 'oil', status: 'operating',
    points: [[33.0, 29.0], [31.2, 30.0], [29.9, 31.2]],
    capacity: '2.5 million bpd', length: '320 km', operator: 'SUMED', countries: ['Egypt'],
  },
  {
    id: 'kirkuk-ceyhan', name: 'Kirkuk-Ceyhan Pipeline', type: 'oil', status: 'operating',
    points: [[44.4, 35.5], [42.5, 36.5], [40.0, 37.0], [37.0, 37.5], [35.9, 37.0]],
    capacity: '1.6 million bpd', length: '970 km', operator: 'BOTAS/SOMO', countries: ['Iraq', 'Turkey'],
  },
  {
    id: 'habshan-fujairah', name: 'Habshan-Fujairah Pipeline', type: 'oil', status: 'operating',
    points: [[53.6, 23.9], [55.0, 24.8], [56.2, 25.1], [56.4, 25.1]],
    capacity: '1.5 million bpd', length: '370 km', operator: 'ADNOC', countries: ['UAE'],
  },
  {
    id: 'abqaiq-yanbu', name: 'Abqaiq-Yanbu Pipeline', type: 'oil', status: 'operating',
    points: [[49.7, 25.9], [47.0, 26.0], [44.0, 25.0], [41.0, 24.0], [38.0, 24.0]],
    capacity: '3 million bpd', length: '1,170 km', operator: 'Saudi Aramco', countries: ['Saudi Arabia'],
  },
  {
    id: 'kuwait-oil-export', name: 'Kuwait Oil Export Pipeline', type: 'oil', status: 'operating',
    points: [[47.5, 29.0], [48.2, 29.4], [48.0, 29.0]],
    capacity: '2 million bpd', length: '120 km', operator: 'KOC', countries: ['Kuwait'],
  },

  // Africa Oil
  {
    id: 'chad-cameroon', name: 'Chad-Cameroon Pipeline', type: 'oil', status: 'operating',
    points: [[16.8, 10.0], [14.5, 7.5], [12.5, 5.5], [10.0, 4.0]],
    capacity: '250,000 bpd', length: '1,070 km', operator: 'COTCO', countries: ['Chad', 'Cameroon'],
  },
  {
    id: 'nigeria-bonny', name: 'Trans-Niger Pipeline (Bonny)', type: 'oil', status: 'operating',
    points: [[6.0, 5.5], [6.5, 5.0], [7.2, 4.5]],
    capacity: '600,000 bpd', length: '250 km', operator: 'Shell', countries: ['Nigeria'],
  },

  // Asia Oil
  {
    id: 'espo', name: 'Eastern Siberia-Pacific Ocean (ESPO)', type: 'oil', status: 'operating',
    points: [[114.5, 56.5], [120.0, 55.0], [126.0, 52.0], [131.0, 48.5], [133.0, 47.0]],
    capacity: '1.6 million bpd', length: '4,857 km', operator: 'Transneft', countries: ['Russia'],
  },
  {
    id: 'mohe-daqing', name: 'Mohe-Daqing Pipeline', type: 'oil', status: 'operating',
    points: [[124.0, 52.0], [125.0, 50.0], [126.0, 48.5], [125.1, 46.6]],
    capacity: '600,000 bpd', length: '960 km', operator: 'CNPC', countries: ['Russia', 'China'],
  },
  {
    id: 'kazakhstan-china', name: 'Kazakhstan-China Oil Pipeline', type: 'oil', status: 'operating',
    points: [[53.0, 47.1], [60.0, 45.5], [68.0, 43.5], [75.0, 43.0], [82.0, 44.2], [87.6, 43.8]],
    capacity: '400,000 bpd', length: '2,228 km', operator: 'KazTransOil/CNPC', countries: ['Kazakhstan', 'China'],
  },

  // ===== MAJOR GAS PIPELINES =====

  // Russia/Europe Gas
  {
    id: 'turkstream', name: 'TurkStream', type: 'gas', status: 'operating',
    points: [[38.5, 44.6], [35.0, 43.5], [31.0, 42.5], [29.0, 41.3]],
    capacity: '31.5 bcm/year', length: '930 km', operator: 'Gazprom', countries: ['Russia', 'Turkey'],
  },
  {
    id: 'blue-stream', name: 'Blue Stream', type: 'gas', status: 'operating',
    points: [[37.8, 44.6], [35.5, 43.0], [33.0, 42.0], [31.0, 41.5]],
    capacity: '16 bcm/year', length: '1,213 km', operator: 'Gazprom/BOTAS', countries: ['Russia', 'Turkey'],
  },
  {
    id: 'yamal-europe', name: 'Yamal-Europe Pipeline', type: 'gas', status: 'operating',
    points: [[73.5, 67.5], [66.0, 64.0], [55.0, 60.0], [45.0, 57.0], [32.0, 55.0], [24.0, 53.0], [17.0, 52.5], [14.0, 52.5]],
    capacity: '33 bcm/year', length: '4,196 km', operator: 'Gazprom', countries: ['Russia', 'Belarus', 'Poland', 'Germany'],
  },
  {
    id: 'brotherhood', name: 'Brotherhood Pipeline System', type: 'gas', status: 'operating',
    points: [[76.0, 66.5], [70.0, 63.0], [60.0, 58.0], [50.0, 55.0], [40.0, 52.0], [32.0, 50.5], [24.0, 49.0], [18.0, 48.5]],
    capacity: '100+ bcm/year', length: '4,500 km', operator: 'Gazprom', countries: ['Russia', 'Ukraine', 'Slovakia', 'Czech Republic'],
  },
  {
    id: 'trans-adriatic', name: 'Trans Adriatic Pipeline (TAP)', type: 'gas', status: 'operating',
    points: [[20.1, 39.6], [19.5, 40.5], [18.0, 40.8], [16.5, 41.0]],
    capacity: '10 bcm/year', length: '878 km', operator: 'TAP AG', countries: ['Greece', 'Albania', 'Italy'],
  },
  {
    id: 'tanap', name: 'Trans-Anatolian Pipeline (TANAP)', type: 'gas', status: 'operating',
    points: [[42.0, 41.6], [39.0, 40.0], [35.0, 39.0], [32.0, 38.5], [29.0, 39.5], [26.5, 40.5]],
    capacity: '16 bcm/year', length: '1,850 km', operator: 'TANAP', countries: ['Azerbaijan', 'Georgia', 'Turkey'],
  },
  {
    id: 'europipe-ii', name: 'Europipe II', type: 'gas', status: 'operating',
    points: [[7.0, 60.0], [5.0, 57.5], [4.5, 55.5], [6.5, 54.0], [8.5, 53.5]],
    capacity: '24 bcm/year', length: '658 km', operator: 'Gassco', countries: ['Norway', 'Germany'],
  },
  {
    id: 'langeled', name: 'Langeled Pipeline', type: 'gas', status: 'operating',
    points: [[2.0, 61.5], [1.0, 59.0], [0.0, 56.5], [0.5, 53.5]],
    capacity: '25.5 bcm/year', length: '1,200 km', operator: 'Gassco', countries: ['Norway', 'UK'],
  },
  {
    id: 'balticconnector', name: 'Balticconnector', type: 'gas', status: 'operating',
    points: [[24.8, 59.4], [24.5, 59.5], [24.7, 59.8]],
    capacity: '7.2 bcm/year', length: '77 km', operator: 'Elering/Baltic Connector', countries: ['Estonia', 'Finland'],
  },

  // Middle East Gas
  {
    id: 'dolphin', name: 'Dolphin Gas Pipeline', type: 'gas', status: 'operating',
    points: [[51.5, 25.9], [52.0, 25.3], [54.4, 24.5]],
    capacity: '3.2 bcf/day', length: '364 km', operator: 'Dolphin Energy', countries: ['Qatar', 'UAE'],
  },
  {
    id: 'arab-gas', name: 'Arab Gas Pipeline', type: 'gas', status: 'operating',
    points: [[34.4, 31.5], [35.5, 32.0], [36.3, 33.9], [36.0, 35.5], [36.2, 36.6]],
    capacity: '10 bcm/year', length: '1,200 km', operator: 'Various', countries: ['Egypt', 'Jordan', 'Syria', 'Lebanon'],
  },
  {
    id: 'iran-turkey', name: 'Iran-Turkey Gas Pipeline', type: 'gas', status: 'operating',
    points: [[48.0, 38.5], [45.0, 38.2], [43.5, 37.0], [42.0, 37.2]],
    capacity: '14 bcm/year', length: '2,577 km', operator: 'NIGC/BOTAS', countries: ['Iran', 'Turkey'],
  },

  // Central Asia / China Gas
  {
    id: 'central-asia-china', name: 'Central Asia-China Gas Pipeline', type: 'gas', status: 'operating',
    points: [[62.5, 39.0], [66.0, 41.3], [69.0, 41.0], [75.0, 40.5], [80.0, 40.0], [87.5, 44.0]],
    capacity: '55 bcm/year', length: '1,833 km', operator: 'CNPC', countries: ['Turkmenistan', 'Uzbekistan', 'Kazakhstan', 'China'],
  },
  {
    id: 'power-of-siberia', name: 'Power of Siberia', type: 'gas', status: 'operating',
    points: [[118.0, 62.0], [122.0, 58.0], [127.5, 52.0], [130.0, 48.5], [127.5, 45.8]],
    capacity: '38 bcm/year', length: '3,000 km', operator: 'Gazprom', countries: ['Russia', 'China'],
  },

  // Africa Gas
  {
    id: 'west-african-gas', name: 'West African Gas Pipeline', type: 'gas', status: 'operating',
    points: [[5.5, 4.3], [2.5, 6.1], [1.2, 6.2], [0.2, 5.6]],
    capacity: '5 bcm/year', length: '678 km', operator: 'WAPCo', countries: ['Nigeria', 'Benin', 'Togo', 'Ghana'],
  },
  {
    id: 'greenstream', name: 'Greenstream Pipeline', type: 'gas', status: 'operating',
    points: [[12.5, 32.9], [12.0, 35.0], [11.5, 37.0], [15.0, 38.2]],
    capacity: '11 bcm/year', length: '520 km', operator: 'Greenstream BV', countries: ['Libya', 'Italy'],
  },
  {
    id: 'transmed', name: 'TransMed Pipeline', type: 'gas', status: 'operating',
    points: [[3.0, 36.8], [8.0, 37.0], [10.0, 37.5], [12.5, 37.8], [14.2, 40.8]],
    capacity: '33.5 bcm/year', length: '2,475 km', operator: 'Sonatrach/Eni', countries: ['Algeria', 'Tunisia', 'Italy'],
  },

  // South America Gas
  {
    id: 'bolivia-brazil', name: 'Bolivia-Brazil Pipeline (GASBOL)', type: 'gas', status: 'operating',
    points: [[-63.2, -17.8], [-60.0, -19.0], [-56.0, -21.0], [-50.0, -22.5], [-47.0, -23.5]],
    capacity: '30 mcm/day', length: '3,150 km', operator: 'TBG', countries: ['Bolivia', 'Brazil'],
  },

  // Australia Gas
  {
    id: 'dampier-bunbury', name: 'Dampier-Bunbury Pipeline', type: 'gas', status: 'operating',
    points: [[116.7, -20.7], [116.5, -24.0], [116.0, -28.0], [115.6, -33.3]],
    capacity: '32 bcm/year', length: '1,530 km', operator: 'DBP', countries: ['Australia'],
  },
  {
    id: 'moomba-sydney', name: 'Moomba-Sydney Pipeline', type: 'gas', status: 'operating',
    points: [[140.0, -28.1], [145.0, -31.0], [148.0, -33.0], [151.2, -33.9]],
    capacity: '14.6 bcm/year', length: '2,081 km', operator: 'APA Group', countries: ['Australia'],
  }
];
