// src/types/index.ts

export interface MapLayers {
  pipelines: boolean;
  ports: boolean;
  cables: boolean;
  conflicts: boolean;
  waterways: boolean;
  bases: boolean;
}

export type PipelineType = 'oil' | 'gas' | 'products';
export type PipelineStatus = 'operating' | 'construction';

export interface Pipeline {
  id: string;
  name: string;
  type: PipelineType;
  status: PipelineStatus;
  points: [number, number][]; // [lon, lat] pairs
  capacity?: string;
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
  note?: string;
}

export interface ConflictZone {
  id: string;
  name: string;
  coords: [number, number][];
  center: [number, number];
  intensity?: 'high' | 'medium' | 'low';
  parties?: string[];
  description?: string;
}

export interface StrategicWaterway {
  id: string;
  name: string;
  lat: number;
  lon: number;
  description?: string;
}

export interface MilitaryBase {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
  country?: string;
  description?: string;
}

export interface UnderseaCable {
  id: string;
  name: string;
  points: [number, number][];
  capacityTbps?: number;
}
