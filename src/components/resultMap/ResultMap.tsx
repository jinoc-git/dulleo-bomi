import React, { useEffect } from 'react';
import * as St from './style';
import Layout from '../common/layout/Layout';
import { Map, Polyline } from 'react-kakao-maps-sdk';
import axios from 'axios';

const ResultMap = () => {
  const GPX_URL = `https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/file/2021/09/46e0055b28ac46ea9420106c8939fa61.gpx`;
  console.log(GPX_URL);

  const fetchGPX = async () => {
    const res = await axios.get(`https://florentine-rustic-open.glitch.me/gpx?data=${GPX_URL}`);
  };
  fetchGPX();

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
            height: '400px',
          }}
          level={13} // 지도의 확대 레벨
        />
      </St.ResultMapContainer>
    </Layout>
  );
};

export default ResultMap;
