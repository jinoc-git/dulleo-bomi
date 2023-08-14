import { useQuery } from '@tanstack/react-query';
import { Map, MapTypeControl, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';
import { fetchGPX } from '../../api/map';
import * as St from './style';

export enum StyleType {
  WEST_ROAD = '서해랑길',
  SOUTH_ROAD = '남파랑길',
  EAST_ROAD = '해파랑길',
}

const DetailMap = ({ path, roadName }: { path: string; roadName: string }) => {
  const { data, isLoading, isError } = useQuery(['gpx', path], () => fetchGPX({ path }));
  const road = roadName.split(' ');

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError || !data || data.length === 0) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const middlePoint: number = data.length > 0 ? Math.floor(data.length / 2) : 0;
  const centerData = { lat: data[middlePoint].lat, lng: data[middlePoint].lon };

  const polylinePath = data.map((coord) => ({
    lat: coord.lat,
    lng: coord.lon,
  }));

  let strokeColor = '#994df0';
  switch (road[0]) {
    case StyleType.WEST_ROAD:
      strokeColor = '#994df0';
      break;
    case StyleType.SOUTH_ROAD:
      strokeColor = '#00ad96';
      break;
    case StyleType.EAST_ROAD:
      strokeColor = '#003ab8';
      break;
    default:
      break;
  }

  return (
    <St.MapContainer>
      <Map
        center={centerData}
        zoomable={false}
        style={{
          width: '100%',
          height: '450px',
        }}
        level={8}
      >
        <ZoomControl position={window.kakao.maps.ControlPosition.BOTTOMRIGHT} />
        <MapTypeControl position={window.kakao.maps.ControlPosition.TOPRIGHT} />
        <Polyline
          path={[polylinePath]}
          strokeWeight={7}
          strokeColor={strokeColor}
          strokeOpacity={0.8}
          strokeStyle={'solid'}
        />
      </Map>
    </St.MapContainer>
  );
};
export default DetailMap;
