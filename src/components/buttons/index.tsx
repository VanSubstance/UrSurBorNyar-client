import { memo } from "react";
import styled from "styled-components";

const MainButton = ({ text, handleClick }: MainButtonProps) => {
  return (
    <MainButtonWrapper onClick={handleClick}>
      {text}
    </MainButtonWrapper>
  )
};

interface MainButtonProps {
  text: string;
  handleClick: (any) => any;
}

const MainButtonWrapper = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ffffffff;
  color: #252525;
`;

export default {
  Main: memo(MainButton),
}