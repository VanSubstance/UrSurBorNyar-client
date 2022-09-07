import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import Buttons from "../components/buttons";
import api from "../modules/api";
import CoordinateList from "../recoils/coordinateList";
import RouteRecoil from "../recoils/routeRecoil";

export const Header = () => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
  const [routeState, setRouteState] = useRecoilState(RouteRecoil);

  useEffect(() => {
    console.log("현재 선택된 좌표:: ", coordinateList);
  }, [coordinateList]);

  const getPath = useCallback(async () => {
    const resData = await api.sendPath(coordinateList);
    console.log(resData);
  }, [coordinateList]);

  const getRoute = () => {
    setRouteState(true);
  }

  return (
    <div>
      <Buttons.Float
        text="데이터 한번 쏴보기"
        handleClick={getPath}
        isVisible={coordinateList.length == 2}
      />
      <Buttons.Float
        text="데이터 한번 가져와보기"
        handleClick={getRoute}
        isVisible={coordinateList.length == 0}
      />
    </div>
  );
};
