import axios from 'axios';

const DURU_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

const getData = async () => {
  const response = axios.get(DURU_URL);
  console.log(response);
};
