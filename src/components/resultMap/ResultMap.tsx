import * as St from './style';
import Layout from '../common/layout/Layout';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPair, PageRoadProps, ThirdType, pathProps } from '../../@types/course/courseType';
import { fetchCourseData, fetchGPXONE } from '../../api/course';

const ResultMap = ({ roadName }: PageRoadProps) => {
  const { data, isLoading, isError } = useQuery([], () => fetchCourseData({ roadName }));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data || data.length === 0) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  let gpxArr: MapPair[] = [];
  data.forEach((item) => {
    gpxArr.push({
      crsKorNm: item.crsKorNm,
      gpxpath: item.gpxpath,
    });
  });
  console.log(gpxArr);

  // let gpxArrNew: ThirdType[] = [];
  // gpxArr.forEach(async (item) => {
  //   const fetchedData = await fetchGPXONE({ path: item.gpxpath });
  //   gpxArrNew.push({
  //     ...item,
  //     thirdValue: fetchedData,
  //   });
  // });
  // console.log(gpxArrNew);

  // const data = [
  //   {
  //     content: <div style={{ color: '#000' }}>텃밭</div>,
  //     latlng: { lat: 33.450879, lng: 126.56994 },
  //   },
  //   {
  //     content: <div style={{ color: '#000' }}>근린공원</div>,
  //     latlng: { lat: 33.451393, lng: 126.570738 },
  //   },
  // ];

  const EventMarkerContainer = ({
    position,
    content,
  }: {
    position: pathProps;
    content: string;
  }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={{ lat: 33.450879, lng: 126.56994 }} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <Layout>
      <St.ResultMapContainer>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
          }}
          level={3} // 지도의 확대 레벨
        >
          {/* {data.map((value) => (
             <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
        />
          ))} */}
        </Map>
      </St.ResultMapContainer>
    </Layout>
  );
};

export default ResultMap;
