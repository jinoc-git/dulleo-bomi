import React, { useEffect } from 'react';
import * as St from './style';
import { Map, Polyline } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { pathProps } from '../../@types/course/courseType';
// import { fetchGPX } from '../../api/map';
// import { Course } from '../../api/course';

const DetailMap = ({ path }: { path: string }) => {
  const GPX_URL = path;
  const fetchGPX = async (): Promise<pathProps[]> => {
    const { data } = await axios.get(
      `https://florentine-rustic-open.glitch.me/gpx?data=${GPX_URL}`,
    );
    return data;
  };
  const { data, isLoading, isError } = useQuery(['gpx'], fetchGPX);
  // console.log('data', data);

  // const middlePoint: number = data && parseInt(String(data.length / 2));
  // console.log(middlePoint);

  const centerData =
    data && data[0]
      ? { lat: data[0].lat, lng: data[0].lon }
      : { lat: 33.45178067090639, lng: 126.572688693875 };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || data.length === 0) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const polylinePath = data.map((coord) => ({
    lat: coord.lat,
    lng: coord.lon,
  }));

  return (
    <Map
      // 지도를 표시할 Container
      center={centerData}
      style={{
        // 지도의 크기
        width: '100%',
        height: '450px',
      }}
      level={8} // 지도의 확대 레벨
    >
      <Polyline
        path={[polylinePath]}
        strokeWeight={7} // 선의 두께 입니다
        strokeColor={'#994df0'} // 선의 색깔입니다
        // strokeColor={'#00ad96'} // 선의 색깔입니다
        // strokeColor={'#003ab8'} // 선의 색깔입니다
        strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={'solid'} // 선의 스타일입니다
      />
    </Map>
  );
};
export default DetailMap;
