import { memo } from "react";
import NotFound from "./404";
import Map from "./maps";
import { useRecoilState } from "recoil";
import ModalVisibility from "../recoils/modalvisibility";
import { useEffect } from "react";
import ModalContent from "../components/ModalContent";

const Index = () => {
  const [modalState, setModalState] = useRecoilState(ModalVisibility);
  const openModal = () => {
    setModalState({
      type: "start",
      children: "모임 인원을 입력해주세요@@!!",
    });
  };

  useEffect(() => {
    openModal();
    console.log(modalState.type);
  }, []);

  return <div>메인-페이지ㅡ!<ModalContent/></div>;
};

export default {
  Index: memo(Index),
  NotFound: memo(NotFound),
  Maps: Map,
};
