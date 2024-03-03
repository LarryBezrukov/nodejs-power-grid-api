export interface PlantData {
  name: string;
  state: string;
  netGeneration: number;
}

export interface StateTotal {
  totalNetGeneration: number;
  plants: PlantData[];
}
