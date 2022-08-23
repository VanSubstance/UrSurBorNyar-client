import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ModalVisibility from "../recoils/modalvisibility";
import ModalCloseButton from "./buttons/ModalCloseButton";
import SearchAddressContent from "./SearchAddressContent";

const Modal = () => {
  const [modalState, setModalState] = useRecoilState(ModalVisibility);
  const [promiseLink, setPromiseLink] = useState<string>(
    "https://www.notion.so/b0992fe9e49549e29d0c738fd68fbe34"
  );
  const [peopleNum, setPeopleNum] = useState<string>("1");
  const closeModal = () => {
    setModalState({
      type: "none",
      children: null,
    });
  };

  const changeModalChildrenPassword = () => {
    setModalState({
      type: modalState.type,
      children: "비밀번호가 틀렸습니다. 다시 한번 입력해주세요.",
    });
  };

  const changeModalTypeLink = () => {
    setModalState({
      type: "link",
      children: "모임 인원들에게 링크를 공유하세요!",
    });
  };

  const onChangeValue = (e) => {
    setPeopleNum(e.target.value);
  };

  const handleKeyPress = useCallback((e) => {
    if (e.key == "Enter") {
      changeModalTypeLink();
    }
  }, []);

  switch (modalState.type) {
    case "link":
      return (
        <div>
          <ModalOverlay />
          <ModalWrapper onClick={closeModal}>
            <ModalInner
              className="modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalP>{modalState.children ?? <p>children없음</p>}</ModalP>
              <ModalLinkWrapper>
                <ModalLinkP>{promiseLink}</ModalLinkP>{" "}
                <ModalLinkbutton
                  onClick={() => navigator.clipboard.writeText(promiseLink)}
                >
                  복사
                </ModalLinkbutton>
              </ModalLinkWrapper>
              <ModalCloseButtonWrapper onClick={closeModal}>
                <ModalCloseButton />
              </ModalCloseButtonWrapper>
            </ModalInner>
          </ModalWrapper>
        </div>
      );
    case "start":
      return (
        <div>
          <ModalOverlay />
          <ModalWrapper onClick={closeModal}>
            <ModalInner
              className="modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalP>{modalState.children ?? <p>children없음</p>}</ModalP>
              <ModalPasswordInput
                name="modalPeopleNumber"
                placeholder="모임 인원 수"
                onChange={(e) => setPeopleNum(e.target.value)}
                onKeyPress={handleKeyPress}
              ></ModalPasswordInput>
              <ModalButtonWrapper>
                <ModalButtonWidth
                  onClick={(e) => {
                    onChangeValue(e);
                    changeModalTypeLink();
                  }}
                >
                  확인
                </ModalButtonWidth>
              </ModalButtonWrapper>
            </ModalInner>
          </ModalWrapper>
        </div>
      );
    case "address":
      return (
        <div>
          <ModalOverlay />
          <ModalWrapper
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <SearchAddressContent />
          </ModalWrapper>
        </div>
      );
    case "alert":
      return (
        <div>
          <ModalOverlay />
          <ModalWrapper onClick={closeModal}>
            <ModalInner
              className="modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalP>{modalState.children ?? <p>children없음</p>}</ModalP>
              <ModalButtonWrapper>
                <ModalButtonWidth
                  onClick={(e) => {
                    closeModal();
                  }}
                >
                  확인
                </ModalButtonWidth>
              </ModalButtonWrapper>
            </ModalInner>
          </ModalWrapper>
        </div>
      );
    case "none":
      return null;
  }
};

export default Modal;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  tabindex: -1;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 60vw;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  background: #ffffff;
  border: 1px solid #9381dd;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  tabindex: 0;
`;

const ModalP = styled.p`
  width: 40vw;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
`;

const ModalButton = styled.button`
  height: 40px;
  padding: 0px 10px 0px 10px;
  font-size: 14px;
  background: #f6f8ff;
  border: 1px solid #9381dd;
  box-shadow: 2px 2px 4px rgba(116, 116, 116, 0.25);
  border-radius: 100px;
  margin-top: 20px;

  &:active,
  &:hover,
  &:focus {
    cursor: pointer;
    background: #494949;
    color: white;
  }
`;

const ModalButtonWidth = styled.button`
  width: 108px;
  height: 40px;
  font-size: 14px;
  background: #f6f8ff;
  border: 1px solid #9381dd;
  box-shadow: 2px 2px 4px rgba(116, 116, 116, 0.25);
  border-radius: 100px;
  margin-top: 20px;

  &:active,
  &:hover,
  &:focus {
    cursor: pointer;
    background: #494949;
    color: white;
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6vw;
`;

const ModalCloseButtonWrapper = styled.div`
  position: fixed;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  right: 16px;
  cursor: pointer;
`;

const ModalPasswordInput = styled.input`
  width: 20vw;
  height: 30px;
  margin: 20px 0px 0px 0px;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  font-family: Pretendard;
  color: #9381dd;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #9381dd;
  box-shadow: 2px 2px 4px rgba(116, 116, 116, 0.25);
  border-radius: 15px;
`;

const ModalLinkWrapper = styled.div`
  width: fit-content;
  margin: 20px auto 0px;
  overflow: hidden;
  background: white;
  border-radius: 10px;
  border: 1px solid #9381dd;
  display: flex;
  background: #f6f8ff;
`;

const ModalLinkP = styled.div`
  font-weight: normal;
  font-family: Pretendard;
  margin: 15px;
  padding: 5px;
  font-size: 14px;
  color: #9381dd;

  &:active,
  &:hover,
  &:focus {
    outline: 1px solid #9381dd;
    border-radius: 10px;
  }
`;

const ModalLinkbutton = styled.div`
  width: 60px;
  font-size: 14px;
  padding: 18px 0px;
  background: #f6f8ff;
  border: none;
  text-align: center;

  &:active,
  &:hover,
  &:focus {
    cursor: pointer;
    background: #494949;
    color: white;
  }
`;
