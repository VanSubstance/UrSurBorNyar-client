import { atom } from 'recoil'
import { MarkerType } from '../types/map';

const MarkerList = atom<MarkerType[]>({
  key: 'MarkerList',
  default: [],
});

export default MarkerList;