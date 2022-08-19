import { useEffect } from "react";
import { useRecoilState } from "recoil";
import CoordinateList from "../recoils/coordinateList";

export const Header = () => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);

  useEffect(() => {
    console.log('현재 선택된 좌표:: ', coordinateList);

  }, [coordinateList]);

  return (
    null
  )
}