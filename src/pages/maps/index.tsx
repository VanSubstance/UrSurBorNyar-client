import { memo } from "react";
import { KakaoMap } from "../../components/imports/Map";
import NaverMapPage from "./naver";

const Map = () => {
  return (
    <div>
      <KakaoMap />
    </div>
  )
}

export default {
  Kakao: memo(Map),
  Naver: memo(NaverMapPage),
};