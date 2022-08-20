import { memo } from "react";
import NotFound from "./404";
import { useRecoilState } from "recoil";
import ModalVisibility from "../recoils/modalvisibility";
import { useEffect } from "react";
import { KakaoMap } from "../components/imports/Map";
import BottomDrawer from "../components/BottomDrawer";

const Index = () => {
  const [modalState, setModalState] = useRecoilState(ModalVisibility);
  const openModal = () => {
    setModalState({
      type: "start",
      children: "모임 인원을 입력해주세요@@!!",
    });
  };

  useEffect(() => {
    // openModal();
  }, []);

  return (
    <div>
      <KakaoMap width="100vw" height="100vh" />
      <BottomDrawer />
    </div>
  );
};

export default {
  Index: memo(Index),
  NotFound: memo(NotFound),
};
