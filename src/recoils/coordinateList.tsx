import { atom } from 'recoil'
import { CoordinateType } from '../types/map';

type CoordinateListType = Array<{
  name: string;
  coor: CoordinateType;
}>;

const CoordinateList = atom<CoordinateListType>({
  key: 'CoordinateList',
  default: [],
});

export default CoordinateList;