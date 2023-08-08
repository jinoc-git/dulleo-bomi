import axios from 'axios';
import { useEffect } from 'react';
import { fetchData } from '../api/course';

const Home = () => {
  const data = fetchData();
  console.log('data', data);

  return <div>Home</div>;
};

export default Home;
