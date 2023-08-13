import { useQuery } from '@tanstack/react-query';
import { Map, MapTypeControl, Polyline, ZoomControl } from 'react-kakao-maps-sdk';
import { CourseDataResult } from '../../@types/course/courseType';
import { fetchGPX } from '../../api/map';
import * as St from './style';

// ***************issue : 이전의 지도가 보여지고 다시 리렌더링됨

const DetailMap = ({ path }: { path: string }) => {
  const { data, isLoading, isError } = useQuery(['gpx', path], () => fetchGPX({ path }));

  if (isLoading) {
    return <div>Loading...</div>;
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
          strokeColor={'#994df0'}
          // strokeColor={'#00ad96'} // 선의 색깔입니다
          // strokeColor={'#003ab8'} // 선의 색깔입니다
          strokeOpacity={0.8}
          strokeStyle={'solid'}
        />
      </Map>
    </St.MapContainer>
  );
};
export default DetailMap;
