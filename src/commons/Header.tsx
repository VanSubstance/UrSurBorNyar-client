import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import Buttons from "../components/buttons";
import api from "../modules/api";
import CoordinateList from "../recoils/coordinateList";

export const Header = () => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);

  useEffect(() => {
    console.log('현재 선택된 좌표:: ', coordinateList);

  }, [coordinateList]);

  const getPath = useCallback(async () => {
    const resData = await api.sendPath(coordinateList);
    console.log(resData);
  }, [coordinateList]);

  return (
    <Buttons.Float text="데이터 한번 쏴보기" handleClick={getPath} isVisible={coordinateList.length == 2} />
  )
}