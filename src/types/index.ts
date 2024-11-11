export interface PageParams {
  name: string;
}

export interface PlanetsResult {
  count: number;
  next: string;
  previous: null;
  results: Planet[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type MappedPlanet = Pick<
  Planet,
  | "name"
  | "rotation_period"
  | "orbital_period"
  | "diameter"
  | "climate"
  | "gravity"
  | "terrain"
  | "surface_water"
  | "population"
>;
