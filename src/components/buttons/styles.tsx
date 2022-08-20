import styled from "styled-components";

export const MainButtonWrapper = styled.button`
width: 100px;
height: 40px;
background-color: #ffffffff;
color: #252525;
`;

interface VisibilityProps {
  isVisible: boolean;
}

export const FloatButtonWrapper = styled(MainButtonWrapper) <VisibilityProps>`
  position: absolute;
  z-index: 100;
  top: 40px;
  left: 40px;

  display: ${({ isVisible }) => isVisible ? `block` : `none`};
`;