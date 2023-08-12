import * as St from './style';
import Layout from '../common/layout/Layout';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Course,
  CourseDataResult,
  ResponseCourseList,
  pathProps,
} from '../../@types/course/courseType';

type pageProps = {
  roadName: string;
};

const ResultMap = ({ roadName }: pageProps) => {
  // const URL = `http://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=249&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${roadName}`;
  const URL = `http://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=150&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${roadName}`;
  console.log(roadName);

  const fetchAllInfo = async (): Promise<ResponseCourseList[]> => {
    const response = await axios.get(`${URL}`);
    const dataItem = response.data.response.body.items.item;
    console.log('fetchAllInfo', dataItem);
    return dataItem;
  };
  const courseLists = fetchAllInfo();
  console.log('courseLists', courseLists);
  const { data, isLoading, isError } = useQuery([`${URL}`], fetchAllInfo);
  console.log('data', data);

  // const markerTitle:CourseDataResult[] = data && data.crsKorNm;

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

  // 서버에 gpx 파일 fetch
  const mapArr = [];
  // const fetchGPX = async (data: CourseDataResult[]) => {
  //   const { dataPath } = await axios.get(
  //     `https://florentine-rustic-open.glitch.me/gpx?data=${gpxpath}`,
  //   );
  //   return dataPath;
  //   data?.map((item) => {   });
  // };

  // fetchGPX(data);
  // const { data: data2, isLoading: isLoading2, isError: isError2 } = useQuery(['gpx'], fetchGPX);

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
              position={{ lat: 33.450879, lon: 126.56994 }}
              content={`<div style={{ color: '#000' }}>카카오</div>`}
            />
          ))} */}
        </Map>
      </St.ResultMapContainer>
    </Layout>
  );
};

export default ResultMap;
