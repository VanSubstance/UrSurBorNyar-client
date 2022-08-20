import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DrawerContent from "./DrawerContent";

const BottomDrawer = (props) => {
  return (
    <DrawerWrapper>
      <Checkbox type="checkbox" id="navInput" />
      <OpenBtn htmlFor="navInput">
        <OpenBtnTop />
        <OpenBtnMid />
        <OpenBtnBot />
      </OpenBtn>
      <DrawerContentWrapper>
        <DrawerContent />
      </DrawerContentWrapper>
    </DrawerWrapper>
  );
};

export default BottomDrawer;

const DrawerWrapper = styled.div`
  position: fixed;
  margin: 0 auto;
  z-index: 998;
  bottom: 20px;
`;

const DrawerContentWrapper = styled.div`
  position: fixed;
  margin: 0 auto;
  z-index: 998;
  width: 90%;
  height: 40%;
  background: #ffffff;
  border: 1px solid #9381dd;
  border-radius: 30px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.5s cubic-bezier(0.6, 0.05, 0.28, 0.91);
`;

const OpenBtn = styled.label`
  position: fixed;
  width: 40px;
  height: calc(40% + 40px);
  right: 7%;
  position: fixed;
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.6, 0.05, 0.28, 0.91);
  transform: translateY(-5%);
  z-index: 997;
`;

const OpenBtnTop = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
`;
const OpenBtnMid = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
  margin: 6px 0;
`;

const OpenBtnBot = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
`;

const Checkbox = styled.input`
  display: none;
  position: fixed;
  margin: 0px 0px 0px 0px;
  width: 40px;
  height: 37px;
  top: 60px;
  right: 6%;
  border: 1px solid #9381dd;
  cursor: pointer;

  &:checked ~ ${DrawerContentWrapper} {
    transform: translateX(-50%) translateY(-90%);
  }
  &:checked ~ ${OpenBtn} {
    transform: translateY(-95%);
  }
`;
