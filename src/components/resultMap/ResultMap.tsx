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

type PageProps = {
  roadName: string;
};

const ResultMap = ({ roadName }: PageProps) => {
  const URL = `http://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=150&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${roadName}`;

  const fetchAllInfo = async (): Promise<CourseDataResult[]> => {
    const response = await axios.get(`${URL}`);
    const dataItem = response.data.response.body.items.item;
    // console.log('fetchAllInfo', dataItem);
    return dataItem;
  };
  // const courseLists = fetchAllInfo();
  // console.log('courseLists', courseLists);
  const { data, isLoading, isError } = useQuery([`${URL}`], fetchAllInfo);
  // console.log('코스 전체 data', data);
  // console.log('path 경로', data && data[0].gpxpath);

  // const ddd = data?.map((item) => arr.push([item.crsKorNm, item.gpxpath]));
  // const arr = [];
  // const obj = {
  //   name: courseName,
  //   path,
  // };
  // let obj = new Object();

  // const ddd = data?.map((item) => {
  //   (obj.courseName = item.crsKorNm), (obj.path = item.gpxpath);
  // });
  // console.log('ddd', ddd);

  if (isError || !data || data.length === 0) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  // const markerTitle: CourseDataResult[] = data && data.crsKorNm;

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
  // const mapArr: any[] = [];
  // const OBJ_GPX = data && data.gpxpath;

  // console.log('OBJ_GPX', OBJ_GPX);
  // const fetchGPX = async (item: any): Promise<pathProps[]> => {
  //   const a: any = await axios.get(
  //     `https://florentine-rustic-open.glitch.me/gpx?data=${data.gpxpath}`,
  //   );
  //   return a.dataPath;
  // };
  // data?.map((item) => {
  //   fetchGPX(item.gpxpath).then((data) => mapArr.push(data));
  // });
  // console.log(mapArr);

  // 서버에 gpx 파일 fetch
  const mapArr = [];
  // const OBJ_GPX = data && data.gpxpath;
  // console.log('OBJ_GPX', OBJ_GPX);
  // const fetchGPX = async (): Promise<pathProps[]> => {
  //   const dataPath = await axios.get(
  //     `${process.env.REACT_APP_NODE_SERVER}/gpxOne?data=https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/file/2021/09/46e0055b28ac46ea9420106c8939fa61.gpx"`,
  //   );
  //   console.log(dataPath);

  //   const arrr = dataPath.map((item) => mapArr.push(item));
  //   return arrr;
  // };
  // fetchGPX();
  // const { data: data2, isLoading: isLoading2, isError: isError2 } = useQuery(['gpxOne'], fetchGPX);

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
