import React, { useEffect } from 'react';
import * as St from './style';
import { Map, Polyline } from 'react-kakao-maps-sdk';
import axios from 'axios';
// import { Course } from '../../api/course';

const DetailMap = () => {
  const GPX_URL = `https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/file/2021/09/46e0055b28ac46ea9420106c8939fa61.gpx`;
  console.log(GPX_URL);

  useEffect(() => {
    const fetchGPX = async () => {
      const res = await axios.get(`https://florentine-rustic-open.glitch.me/gpx?data=${GPX_URL}`);
      console.log(res);

      // fetch(GPX_URL)
      //   .then((response) => response.text())
      //   .then((response) => {
      //     console.log(response);
      //   });
    };
    fetchGPX();
  }, []);

  return (
    <Map
      // 지도를 표시할 Container
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
      <Polyline
        path={[
          [
            { lat: 33.452344169439975, lng: 126.56878163224233 },
            { lat: 33.452739313807456, lng: 126.5709308145358 },
            { lat: 33.45178067090639, lng: 126.572688693875 },
          ],
        ]}
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={'#FFAE00'} // 선의 색깔입니다
        strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={'solid'} // 선의 스타일입니다
      />
    </Map>
  );
};
export default DetailMap;
