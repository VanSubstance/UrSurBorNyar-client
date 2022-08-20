import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Buttons from "../components/buttons";
import CoordinateList from "../recoils/coordinateList";

export const Header = () => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);

  useEffect(() => {
    console.log('현재 선택된 좌표:: ', coordinateList);

  }, [coordinateList]);

  return (
    <Buttons.Float text="데이터 한번 쏴보기" handleClick={null} isVisible={coordinateList.length == 2} />
  )
}