import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import CoordinateList from "../../recoils/coordinateList";
import { CoordinateType } from "../../types/map";
import AddressRecoil from "../../recoils/adressRecoil";
import ModalVisibility from "../../recoils/modalvisibility";
import MarkerDeleteState from "../../recoils/MarkerDeleteState";
import RouteRecoil from "../../recoils/routeRecoil";

export const KakaoMap = memo(
  ({ width = `500px`, height = `400px` }: sizeProps) => {
    const [mapInstance, setMapInstance] = useState(null);
    const [geoInstance, setGeoInstance] = useState(null);
    const [centerCoor, setCenterCoor] = useState<CoordinateType>({
      x: 37.5666805,
      y: 126.9784147,
    });
    const [markerListState, setMarkerListState] = useState([]);
    const [routeList, setRouteList] = useState<CoordinateType[]>([]);
    const [newCoor, setNewCoor] = useState<CoordinateType>(null);
    const [routeFinish, setRouteFinish] = useState<boolean>(false);
    const [coordinateList, setCoordinateList] = useRecoilState(CoordinateList);
    const [addressRecoil, setAddressRecoil] = useRecoilState(AddressRecoil);
    const [modalState, setModalState] = useRecoilState(ModalVisibility);
    const [markerDeleteState, setMarkerDeleteState] =
      useRecoilState(MarkerDeleteState);
    const [routeState, setRouteState] = useRecoilState(RouteRecoil);

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
      setMarkerListState((markerState) => [
        ...markerState,
        {
          coor: newCoor,
          marker: marker,
        },
      ]);
    };

    const setMarkers = (map) => {
      for (var i = 0; i < markerListState.length; i++) {
        markerListState[i].marker.setMap(map);
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
      setMarkerListState(
        markerListState.filter(
          (markerState) => markerState.coor !== markerDeleteState
        )
      );
    }, [markerDeleteState]);

    useEffect(() => {
      setMarkers(null);
      setMarkers(mapInstance);
    }, [markerListState]);

    useEffect(() => {
      if (addressRecoil) {
        geoInstance.addressSearch(addressRecoil, function (result, status) {
          setNewCoor({
            x: result[0].y,
            y: result[0].x,
          });
        });
      }
    }, [addressRecoil]);

    const getStartPlace = () => {
      fetch("http://localhost:3001/startPlace")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRouteList((routeList) => [
            ...routeList,
            {
              x: data.coordinate.y,
              y: data.coordinate.x,
            },
          ]);
          getRoutePlace();
        })
        .catch((e) => {});
    };

    const getRoutePlace = () => {
      fetch("http://localhost:3001/route")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.pathList.map((path, index) => {
            setRouteList((routeList) => [
              ...routeList,
              {
                x: path.fy,
                y: path.fx,
              },
              {
                x: path.ty,
                y: path.tx,
              },
            ]);
          });
          getEndPlace();
        });
    };

    const getEndPlace = () => {
      fetch("http://localhost:3001/endPlace")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRouteList((routeList) => [
            ...routeList,
            {
              x: data.coordinate.y,
              y: data.coordinate.x,
            },
          ]);
        });
    };

    const setRouteMarkers = (map) => {
      for (var i = 0; i < routeList.length; i++) {
        const markerGreen = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        const imageSize = new window.kakao.maps.Size(40, 40);
        const markerImage = new window.kakao.maps.MarkerImage(
          markerGreen,
          imageSize,
        );
        const markerPosition = new window.kakao.maps.LatLng(
          routeList[i].x,
          routeList[i].y
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      }
    };

    const setRouteLines = (map) => {
      for (var i = 0; i + 1 < routeList.length; i++) {
        const linePath = [
          new window.kakao.maps.LatLng(routeList[i].x, routeList[i].y),
          new window.kakao.maps.LatLng(routeList[i + 1].x, routeList[i + 1].y),
        ];
        const routeLine = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#FFAE00",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
        routeLine.setMap(map);
      }
    };

    const getRoute = () => {
      getStartPlace();
    };

    useEffect(() => {
      if (routeState) {
        getRoute();
      }
    }, [routeState]);

    useEffect(() => {
      setRouteMarkers(mapInstance);
      setRouteLines(mapInstance);
    }, [routeList]);

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
