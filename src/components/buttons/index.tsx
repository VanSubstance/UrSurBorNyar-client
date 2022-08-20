import { memo } from "react";
import { FloatButton } from "./Float";
import { MainButtonWrapper } from "./styles";

const MainButton = ({ text, handleClick }: MainButtonProps) => {
  return (
    <MainButtonWrapper onClick={handleClick}>
      {text}
    </MainButtonWrapper>
  )
};

export interface MainButtonProps {
  text: string;
  handleClick: (any) => any;
}

export default {
  Main: memo(MainButton),
  Float: memo(FloatButton),
}