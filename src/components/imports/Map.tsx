import React, { memo, useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

export const KakaoMap = memo(({ width = `500px`, height = `400px` }: sizeProps) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [centerCoor, setCenterCoor] = useState<coorsProps>({
    lat: 37.5666805,
    lng: 126.9784147
  });

  const getKakaoCoors = useCallback(({ lat, lng }: coorsProps) => {
    return new window.kakao.maps.LatLng(lat, lng)
  }, [window.kakao]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCenterCoor({
          lat: latitude,
          lng: longitude,
        });
      });
    }
  }, [navigator]);

  useEffect(() => {
    const container = document.getElementById('map');
    const map = new window.kakao.maps.Map(container, {
      center: getKakaoCoors(centerCoor),
      level: 3,
    });
    setMapInstance(map);
  }, []);

  useEffect(() => {
    if (mapInstance) {
      mapInstance.setCenter(getKakaoCoors(centerCoor));
    }
  }, [centerCoor]);

  return (
    <MapWrapper id={`map`} width={width} height={height}></MapWrapper>
  );
});

export interface coorsProps {
  lat: number;
  lng: number;
}

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