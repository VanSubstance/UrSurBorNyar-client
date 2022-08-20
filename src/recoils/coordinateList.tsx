import { atom } from 'recoil'
import { PlaceType } from '../types/map';

const CoordinateList = atom<PlaceType[]>({
  key: 'CoordinateList',
  default: [],
});

export default CoordinateList;