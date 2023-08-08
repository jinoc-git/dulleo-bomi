import React from 'react';
import * as St from './style';
import Layout from '../common/layout/Layout';
import { southRoad, westRoad, eastRoad } from '../../assets';
import { useNavigate } from 'react-router-dom';

const RoadList = () => {
  const navigate = useNavigate();
  const goToSearchRouteList = (road: string) => {
    navigate('/result', { state: { roadName: road } });
  };
  
  return (
    <St.RoadListContainer>
      <Layout>
        <St.RoadItem src={westRoad} onClick={() => goToSearchRouteList('서해랑길')} />
        <St.RoadItem src={southRoad} onClick={() => goToSearchRouteList('남파랑길')} />
        <St.RoadItem src={eastRoad} onClick={() => goToSearchRouteList('해파랑길')} />
      </Layout>
    </St.RoadListContainer>
  );
};

export default RoadList;
