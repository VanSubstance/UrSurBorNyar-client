import { useRecoilState } from "recoil";
import styled from "styled-components";
import CoordinateList from "../recoils/coordinateList";
import ModalVisibility from "../recoils/modalvisibility";
import { PlaceType } from "../types/map";

const DrawerContent = (props) => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
  const [modalState, setModalState] = useRecoilState(ModalVisibility);
  const SearchAddressButton = () => {
    setModalState({
      type: "Address",
      children: null,
    });
  };

  return (
    <DrawerContentWrapper>
      <div>
        {coordinateList.map((data, index) => {
          return <PlaceContent key={index} data={data} index={+index + 1} />;
        })}
      </div>
      <DrawerAddressButton onClick={SearchAddressButton}>주소로 찾기</DrawerAddressButton>
    </DrawerContentWrapper>
  );
};

const PlaceContent = ({ index, data }: { index: number; data: PlaceType }) => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);

  const RemoveButton = () => {
    setCoordinateList(
      coordinateList.filter(
        (coordinateList) => coordinateList.coor !== data.coor
      )
    );
  };
  const {
    name,
    coor: { x, y },
    id = null,
  } = data;
  return (
    <StartWrapper>
      <StartTitle>{`${index}번째 장소`}</StartTitle>
      <StartContent>{`${x}, ${y}`}</StartContent>
      <StartAddress>{name}</StartAddress>
      <StaerButtonWrapper>
        <DrawerButton onClick={RemoveButton}>삭제</DrawerButton>
      </StaerButtonWrapper>
    </StartWrapper>
  );
};

export default DrawerContent;

const DrawerContentWrapper = styled.div`
  margin: 20px;
  max-height: calc(100% - 40px);
  overflow-y: scroll;
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

const DrawerAddressButton = styled.button`
  height: 32px;
  margin: 20px 0px 0px 0px;
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
