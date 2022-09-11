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

export type MarkerType = {
  coor: CoordinateType;
  marker: any;
};

export type DeleteMarkerType = {
  coor: CoordinateType;
}

export type RouteListType = {
  coor: CoordinateType;
};