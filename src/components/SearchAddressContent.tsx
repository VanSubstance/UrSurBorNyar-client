import DaumPostcode from "react-daum-postcode";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ModalVisibility from "../recoils/modalvisibility";
import CoordinateList from "../recoils/coordinateList";
import addressRecoil from "../recoils/adressRecoil";
import { CoordinateType } from "../types/map";

const SearchAddressContent = (props) => {
  const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
  const [addressState, setAddresssState] = useRecoilState(addressRecoil);
  const [modalState, setModalState] = useRecoilState(ModalVisibility);

  const handleComplete = (data) => {
    if (data) {
      setAddresssState(data.address);
    }
  };

  const handleClose = (data) => {
    setModalState({
      type: "none",
      children: null,
    });
  };

  return (
    <DaumPostcode
      onComplete={handleComplete}
      onClose={handleClose}
      {...props}
    />
  );
};

export default SearchAddressContent;

SearchAddressContent.defaultProps = {
  style: {
    width: "70%",
    height: "50%",
    position: "relative",
    Top: "50%",
    transform: "translateY(50%)",
    margin: "0 auto",
  },
};
