// src/types/index.ts

export interface MapLayers {
  pipelines: boolean;
  ports: boolean;
  cables: boolean;
  conflicts: boolean;
  waterways: boolean;
  bases: boolean;
  hotspots?: boolean;
}

export type PipelineType = 'oil' | 'gas' | 'products';
export type PipelineStatus = 'operating' | 'construction';

export interface Pipeline {
  id: string;
  name: string;
  type: PipelineType;
  status: PipelineStatus;
  points: [number, number][];
  capacity?: string;
  length?: string;
  operator?: string;
  countries?: string[];
}

export type PortType = 'container' | 'oil' | 'lng' | 'naval' | 'mixed' | 'bulk';

export interface Port {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  type: PortType;
  rank?: number;
  note: string;
}

export interface ConflictZone {
  id: string;
  name: string;
  coords: [number, number][];
  center: [number, number];
  intensity?: 'high' | 'medium' | 'low';
  parties?: string[];
  casualties?: string;
  displaced?: string;
  keywords?: string[];
  startDate?: string;
  location?: string;
  description?: string;
  keyDevelopments?: string[];
}

export interface StrategicWaterway {
  id: string;
  name: string;
  lat: number;
  lon: number;
  description?: string;
}

export interface Hotspot {
  id: string;
  name: string;
  subtext?: string;
  lat: number;
  lon: number;
  location?: string;
  keywords: string[];
  agencies?: string[];
  description?: string;
  status?: string;
  escalationScore?: number;
  escalationTrend?: 'escalating' | 'stable' | 'de-escalating';
  escalationIndicators?: string[];
  whyItMatters?: string;
  history?: {
    lastMajorEvent?: string;
    lastMajorEventDate?: string;
    precedentCount?: number;
    precedentDescription?: string;
    cyclicalRisk?: string;
  };
}

export interface MilitaryBase {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
  country?: string;
  arm?: string;
  status?: string;
  description?: string;
}

export interface UnderseaCable {
  id: string;
  name: string;
  points: [number, number][];
  major?: boolean;
  capacityTbps?: number;
  rfsYear?: number;
  owners?: string[];
}
