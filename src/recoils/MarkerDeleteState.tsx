import { atom } from "recoil";
import { CoordinateType } from "../types/map";

const MarkerDeleteState = atom<CoordinateType>({
  key: "MarkerDeleteState",
  default: null,
});

export default MarkerDeleteState;
