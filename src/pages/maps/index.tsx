import { memo } from "react";
import { KakaoMap } from "../../components/imports/Map";
import NaverMapPage from "./naver";

const Map = () => {
  return (
    <div>
      <KakaoMap width="100vw" height="100vh" />
    </div>
  )
}

export default {
  Kakao: memo(Map),
  Naver: memo(NaverMapPage),
};