import { useEffect } from 'react';
import Banner from '../components/banner/Banner';
import RoadList from '../components/roadList/RoadList';
import { fetchDataAll } from '../api/course';

const Home = () => {
  return (
    <>
      <Banner />
      <RoadList />
    </>
  );
};

export default Home;
