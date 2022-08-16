import React, { memo, useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

export const KakaoMap = memo(({ width = `500px`, height = `400px` }: { width?: string; height?: string; }) => {
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

export const NaverMap = memo(({ width = `500px`, height = `400px` }: { width?: string; height?: string; }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [centerCoor, setCenterCoor] = useState<coorsProps>({
    lat: 37.5666805,
    lng: 126.9784147
  });

  const getNaverCoors = useCallback(({ lat, lng }: coorsProps) => {
    return new window.naver.maps.LatLng(lat, lng);
  }, [window.naver]);

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
    const map = new window.naver.maps.Map('map', {
      center: getNaverCoors(centerCoor),
      level: 3,
    });
    setMapInstance(map);
  }, []);

  useEffect(() => {
    if (mapInstance) {
      mapInstance.setCenter(getNaverCoors(centerCoor));
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

const MapWrapper = styled.div<{
  width?: string;
  height?: string;
}>`
${({ width, height }) => {
    return `
      width: ${width};
      height: ${height};
  `;
  }};
`;