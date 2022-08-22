export interface CoordinateType {
  x: number;
  y: number;
}

export type PlaceType = {
  id?: string;
  name: string;
  coor: CoordinateType;
};

export type addressType = {
  address: string;
};
