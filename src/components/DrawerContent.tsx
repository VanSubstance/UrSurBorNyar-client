import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const DrawerContent = (props) => {
  return (
    <DrawerContentWrapper>
      <StartWrapper>
        <StartTitle>출발지</StartTitle>
        <StartContent>37.478100,126.957507</StartContent>
        <StartAddress>서울특별시 관악구 관악로14길 99</StartAddress>
        <StaerButtonWrapper>
          <DrawerButton>수정</DrawerButton>
          <DrawerButton>지도에서 찾기</DrawerButton>
          <DrawerButton>주소로 찾기</DrawerButton>
        </StaerButtonWrapper>
      </StartWrapper>
      <StartWrapper>
        <StartTitle>도착지</StartTitle>
        <StartContent>37.478100,126.957507</StartContent>
        <StartAddress>서울특별시 관악구 관악로14길 99</StartAddress>
        <StaerButtonWrapper>
          <DrawerButton>수정</DrawerButton>
          <DrawerButton>지도에서 찾기</DrawerButton>
          <DrawerButton>주소로 찾기</DrawerButton>
        </StaerButtonWrapper>
      </StartWrapper>
    </DrawerContentWrapper>
  );
};

export default DrawerContent;

const DrawerContentWrapper = styled.div`
  margin: 20px 0px 0px 20px;
`;

const StartWrapper = styled.div``;

const StartTitle = styled.p`
  font-size: 18px;
`;

const StartContent = styled.p`
  font-size: 16px;
`;

const StartAddress = styled.p`
  font-size: 16px;
`;

const StaerButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const DrawerButton = styled.button`
  height: 32px;
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
