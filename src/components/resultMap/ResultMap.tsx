import * as St from './style';
import Layout from '../common/layout/Layout';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Course,
  MapPair,
  PageRoadProps,
  ResponseCourseList,
  ThirdType,
  pathProps,
} from '../../@types/course/courseType';
import { fetchCourseData, fetchCourseNotEncodeData } from '../../api/course';
import axios from 'axios';
import { fetchGPXONE } from '../../api/map';

const COMMENT_URL = process.env.REACT_APP_SERVER_URL + '/gpxList';

const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}`;

// const fetchCourseList = async () => {
//   const crsKorNm = encodeURI('해파랑길');
//   const response = await axios.get<ResponseCourseList>(
//     `${COURSE_URL}&numOfRows=150&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${crsKorNm}`,
//   );

//   const responseData = response.data.response.body.items.item;

//   for (let i = 13; i < responseData.length; i++) {
//     const gpx = responseData[i].gpxpath;
//     console.log('dddddddd', gpx);
//     const data = await fetchGPX({ path: gpx });
//     const database = {
//       gpx: data,
//       crsIdx: responseData[i].crsIdx,
//     };
//     await axios.patch(`${COMMENT_URL}/${i + 1}`, database);
//   }
// };

const ResultMap = ({ roadName }: PageRoadProps) => {
  const { data, isLoading, isError } = useQuery([], () => fetchCourseNotEncodeData({ roadName }));
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data || data.length === 0) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  // useEffect(() => {
  //   // fetchCourseList();
  // }, []);

  let gpxArr: MapPair[] = [];

  data.forEach((item) => {
    gpxArr.push({
      content: item.crsKorNm, //  코스이름
      gpxpath: item.gpxpath, // 주소 http://
    });
  });
  console.log(gpxArr);
  let gpxArrNew: ThirdType[] = [];
  // for (const item of gpxArr) {
  //   const fetchAllGPX = async () => {
  //     const fetchedData = await fetchGPXONE({ path: item.gpxpath });
  //     gpxArrNew.push({
  //       content: item.content,
  //       latlng: fetchedData,
  //     });
  //     console.log(gpxArrNew);
  //   };
  //   fetchAllGPX();
  // }
  const fetchAllGPX = async () => {
    const promises = gpxArr.map(async (item) => {
      const fetchedData = await fetchGPXONE({ path: item.gpxpath });
      console.log(fetchedData);

      return {
        content: item.content,
        latlng: fetchedData,
      };
    });
    try {
      gpxArrNew = await Promise.all(promises);
      console.log(gpxArrNew);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  fetchAllGPX();
  // const EventMarkerContainer = ({
  //   position,
  //   content,
  // }: {
  //   position: pathProps;
  //   content: string;
  // }) => {
  //   const map = useMap();
  //   const [isVisible, setIsVisible] = useState(false);

  //   return (
  //     // <MapMarker
  //     //   position={position} // 마커를 표시할 위치
  //     //   // @ts-ignore
  //     //   onClick={(marker) => map.panTo(marker.getPosition())}
  //     //   onMouseOver={() => setIsVisible(true)}
  //     //   onMouseOut={() => setIsVisible(false)}
  //     // >
  //     //   {isVisible && content}
  //     // </MapMarker>
  //   );
  // };

  return (
    <Layout>
      <St.ResultMapContainer>
        {/* <Map // 지도를 표시할 Container
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
          {gpxArrNew.map((value) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lon}`}
              position={value.latlng}
              content={value.content}
            />
          ))}
        </Map> */}
      </St.ResultMapContainer>
    </Layout>
  );
};

export default ResultMap;
