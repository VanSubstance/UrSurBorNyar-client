import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DrawerContent from "./DrawerContent";

const BottomDrawerContainer = (props) => {
  return (
    <DrawerWrapper>
      <CheckboxWrapper type="checkbox" id="navInput" />
      <OpenBtnWrapper htmlFor="navInput">
        <OpenBtnTopWrapper />
        <OpenBtnMidWrapper />
        <OpenBtnBotWrapper />
      </OpenBtnWrapper>
      <DrawerContentWrapper>
        <DrawerContent />
      </DrawerContentWrapper>
    </DrawerWrapper>
  );
};

export default BottomDrawerContainer;

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

const OpenBtnWrapper = styled.label`
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

const OpenBtnTopWrapper = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
`;
const OpenBtnMidWrapper = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
  margin: 6px 0;
`;

const OpenBtnBotWrapper = styled.div`
  width: 40px;
  height: 8px;
  border-radius: 5px;
  background: #000;
`;

const CheckboxWrapper = styled.input`
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
  &:checked ~ ${OpenBtnWrapper} {
    transform: translateY(-95%);
  }
`;

const DrawerButton = styled.button`
  height: 32px;
  margin: 20px 20px;
  padding: 0px 10px;
  font-size: 14px;
  background: #f6f8ff;
  border: 1px solid #9381dd;
  border-radius: 100px;
  transition: 0.2s;

  &:active,
  &:hover,
  &:focus {
    cursor: pointer;
    background: #494949;
    color: white;
  }
`;
