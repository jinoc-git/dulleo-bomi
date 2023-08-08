import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
  type DuriData = string;

  const DURU_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

  const fetchData = async () => {
    const response = await axios.get(DURU_URL);
    console.log(response.data.response.body.items.item);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>Home</div>;
};

export default Home;
