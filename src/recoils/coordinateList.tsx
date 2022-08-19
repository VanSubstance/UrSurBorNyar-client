import { atom } from 'recoil'

type CoordinateListType = Array<{
  title: string;
  coor: CoordinateType;
}>;

export interface CoordinateType {
  x: number;
  y: number;
}

const CoordinateList = atom<CoordinateListType>({
  key: 'CoordinateList',
  default: [],
});

export default CoordinateList;