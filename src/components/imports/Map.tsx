import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CoordinateList from "../../recoils/coordinateList";
import { CoordinateType } from "../../types/map";
import AddressRecoil from "../../recoils/adressRecoil";
import ModalVisibility from "../../recoils/modalvisibility";
import MarkerDeleteState from "../../recoils/MarkerDeleteState";

export const KakaoMap = memo(
  ({ width = `500px`, height = `400px` }: sizeProps) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [geoInstance, setGeoInstance] = useState(null);
    const [centerCoor, setCenterCoor] = useState<CoordinateType>({
      x: 37.5666805,
      y: 126.9784147,
    });
    const [markerState, setMarkerState] = useState([]);
    const [newCoor, setNewCoor] = useState<CoordinateType>(null);
    const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
    const [addressRecoil, setAddressRecoil] = useRecoilState(AddressRecoil);
    const [modalState, setModalState] = useRecoilState(ModalVisibility);
    const [markerDeleteState, setMarkerDeleteState] =
      useRecoilState(MarkerDeleteState);

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
      setMarkerState((markerState) => [
        ...markerState,
        {
          coor: newCoor,
          marker: marker,
        },
      ]);
    };

    const placeMarkAddress = (result) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(result[0].y, result[0].x),
      });
      setMarkerState((markerState) => [
        ...markerState,
        {
          coor: { x: result[0].y, y: result[0].x },
          marker: marker,
        },
      ]);
    };

    const setMarkers = (map) => {
      for (var i = 0; i < markerState.length; i++) {
        markerState[i].marker.setMap(map);
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
      setMarkers(null);
      setMarkerState(
        markerState.filter(
          (markerState) => markerState.coor !== markerDeleteState
        )
      );
    }, [markerDeleteState]);

    useEffect(() => {
      setMarkers(null);
      setMarkers(mapInstance);
    }, [markerState]);

    useEffect(() => {
      if (addressRecoil) {
        geoInstance.addressSearch(addressRecoil, function (result, status) {
          setNewCoor({
            x: result[0].y,
            y: result[0].x,
          });
          //setCoordinateList(
          //  [
          //    ...coordinateList,
          //    {
          //      name: addressRecoil,
          //      coor: { x: result[0].y, y: result[0].x },
          //      id: null,
          //    },
          //  ].filter((c, index) => {
          //    // return coordinateList.length < 2 || index !== 0;
          //    return true;
          //  })
          //);
          //placeMarkAddress(result);
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
