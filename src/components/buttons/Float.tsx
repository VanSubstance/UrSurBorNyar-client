import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import { MainButtonProps } from ".";
import { FloatButtonWrapper } from "./styles";

export const FloatButton = ({ text, handleClick, isVisible = false }: FloatButtonProps) => {
  return (
    <FloatButtonWrapper onClick={handleClick} isVisible={isVisible}>
      {text}
    </FloatButtonWrapper>
  )
};

interface FloatButtonProps extends MainButtonProps {
  isVisible: boolean;
}