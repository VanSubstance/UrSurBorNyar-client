import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CoordinateList from "../../recoils/coordinateList";
import { CoordinateType } from "../../types/map";
import AddressRecoil from "../../recoils/adressRecoil";
import ModalVisibility from "../../recoils/modalvisibility";
import MarkerList from "../../recoils/markerList";

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
    const [markerList, setMarkerList] = useRecoilState(MarkerList);

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

    const alertModalSamePlace = () => {
      setModalState({
        type: "alert",
        children: "같은 장소가 이미 있습니다.",
      });
    };

    const alertModalNoAdress = () => {
      setModalState({
        type: "alert",
        children: "주소가 존재하지 않는 장소입니다.",
      });
    };

    const placeMarkCoor = () => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(newCoor.x, newCoor.y),
      });
      marker.setMap(mapInstance);
      setMarkerList((markerList) => [...markerList, marker]);
    };

    const placeMarkAddress = (result) => {
      const markerPosition = new window.kakao.maps.LatLng(
        result[0].x,
        result[0].y
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(mapInstance);
    };

    const setMarkers = (map) => {
      for (var i = 0; i < markerList.length; i++) {
        markerList[i].marker.setMap(map);
      }
    };

    const placeOverlapChecker = (res) => {
      if (
        (res[0].road_address !== null &&
          coordinateList.some(
            (coordinateList) =>
              coordinateList.name === res[0].road_address.address_name
          )) ||
        (res[0].road_address === null &&
          coordinateList.some(
            (coordinateList) => coordinateList.coor.x === newCoor.x
          ) &&
          coordinateList.some(
            (coordinateList) => coordinateList.coor.y === newCoor.y
          ))
      ) {
        return true;
      } else {
        return false;
      }
    };

    const placeNoAdressChecker = (res) => {
      if (res[0].road_address === null) {
        return true;
      } else {
        return false;
      }
    };

    useEffect(() => {
      if (addressRecoil) {
        geoInstance.addressSearch(addressRecoil, function (result, status) {
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
          placeMarkAddress(result);
        });
      }
    }, [addressRecoil]);

    useEffect(() => {
      if (newCoor) {
        geoInstance.coord2Address(newCoor.y, newCoor.x, (res, status) => {
          if (placeOverlapChecker(res)) {
            alertModalSamePlace();
          } else if (placeNoAdressChecker(res)) {
            alertModalNoAdress();
          } else {
            setCoordinateList(
              [
                ...coordinateList,
                {
                  name: res[0].road_address
                    ? res[0].road_address.address_name
                    : "주소 없음",
                  coor: newCoor,
                  id: null,
                },
              ].filter((c, index) => {
                // return coordinateList.length < 2 || index !== 0;
                return true;
              })
            );
            placeMarkCoor();
          }
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
