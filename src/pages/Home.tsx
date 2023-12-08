import { useEffect } from 'react';
import Banner from '../components/banner/Banner';
import Carousel from '../components/carousel/Carousel';
import RoadList from '../components/roadList/RoadList';

const Home = () => {
  useEffect(() => {
    const prefetchResult = async () => {
      await import('./SearchResult');
    };
    prefetchResult();
  }, []);
  return (
    <main>
      <Banner />
      <RoadList />
      <Carousel />
    </main>
  );
};

export default Home;
