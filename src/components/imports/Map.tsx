import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CoordinateList from "../../recoils/coordinateList";
import { CoordinateType } from "../../types/map";
import AddressRecoil from "../../recoils/adressRecoil";
import ModalVisibility from "../../recoils/modalvisibility";

export const KakaoMap = memo(
  ({ width = `500px`, height = `400px` }: sizeProps) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [geoInstance, setGeoInstance] = useState(null);
    const [centerCoor, setCenterCoor] = useState<CoordinateType>({
      x: 37.5666805,
      y: 126.9784147,
    });
    const [newCoor, setNewCoor] = useState<CoordinateType>(null);
    const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
    const [addressRecoil, setAddressRecoil] = useRecoilState(AddressRecoil);
    const [modalState, setModalState] = useRecoilState(ModalVisibility);

    const getKakaoCoors = useCallback(
      ({ x, y }: CoordinateType) => {
        return new window.kakao.maps.LatLng(x, y);
      },
      [window.kakao]
    );

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCenterCoor({
              x: latitude,
              y: longitude,
            });
          }
        );
      }
    }, [navigator]);

    useEffect(() => {
      const container = document.getElementById("map");
      const map = new window.kakao.maps.Map(container, {
        center: getKakaoCoors(centerCoor),
        level: 3,
      });
      const geo = new window.kakao.maps.services.Geocoder();
      setMapInstance(map);
      setGeoInstance(geo);
    }, []);

    useEffect(() => {
      if (mapInstance) {
        mapInstance.setCenter(getKakaoCoors(centerCoor));
      }
    }, [centerCoor]);

    useEffect(() => {
      if (mapInstance) {
        setClickEvent();
      }
    }, [mapInstance]);

    const setClickEvent = () => {
      window.kakao.maps.event.addListener(mapInstance, "click", (e) => {
        setNewCoor({
          x: e.latLng.Ma,
          y: e.latLng.La,
        });
      });
    };

    const alertModalOpen = () => {
      setModalState({
        type: "alert",
        children: "같은 장소가 이미 있습니다",
      });
    };

    useEffect(() => {
      if (addressRecoil) {
        geoInstance.addressSearch(addressRecoil, function (result, status) {
          console.log(result);
          setCoordinateList(
            [
              ...coordinateList,
              {
                name: addressRecoil,
                coor: { x: result[0].x, y: result[0].y },
                id: null,
              },
            ].filter((c, index) => {
              // return coordinateList.length < 2 || index !== 0;
              return true;
            })
          );
        });
      }
    }, [addressRecoil]);

    useEffect(() => {
      if (newCoor) {
        geoInstance.coord2Address(newCoor.y, newCoor.x, (res, status) => {
          if (
            coordinateList.some(
              (coordinateList) =>
                coordinateList.name === res[0].road_address ||
                coordinateList.name === res[0].road_address.address_name ||
                coordinateList.coor === newCoor
            )
          ) {
            alertModalOpen();
          } else
            setCoordinateList(
              [
                ...coordinateList,
                {
                  name: res[0].road_address
                    ? res[0].road_address.address_name
                    : "일반",
                  coor: newCoor,
                  id: null,
                },
              ].filter((c, index) => {
                // return coordinateList.length < 2 || index !== 0;
                return true;
              })
            );
        });
        setNewCoor(null);
      }
    }, [newCoor]);

    return <MapWrapper id={`map`} width={width} height={height}></MapWrapper>;
  }
);

interface sizeProps {
  width?: string;
  height?: string;
}

const MapWrapper = styled.div<sizeProps>`
  ${({ width, height }) => {
    return `
      width: ${width};
      height: ${height};
  `;
  }};
`;
