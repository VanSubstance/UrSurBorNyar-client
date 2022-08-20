import { PlaceType } from "../../types/map";
import { InnerApiUrl } from "../../utils/urls"
import base from "./base";

const sendPath = async (data: PlaceType[]) => {
  const res = await base.post(InnerApiUrl.getPath, {
    placeList: data
  }, null);
  return res;
}

export default {
  sendPath: sendPath,
}