import axios from 'axios';

type Course = {
  crsLevel: string;
  crsCycle: string;
  crsContents: string;
  createdtime: string;
  travelerinfo: string;
  crsTournfo: string;
  crsSummary: string;
  routeIdx: string;
  crsIdx: string;
  crsKorm: string;
  crsDstnc: string;
  crsTotlqrmHour: string;
  modifiedtime: string;
  sigun: string;
  brdDiv: string;
  gpxpath: string;
};
type CourseList = {
  item: Course[];
};

const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/routeList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

export const fetchData = async (): Promise<Course[]> => {
  const param = '남파랑길 1코스';
  const encode = encodeURI(param);
  // const response = await axios.get(`${COURSE_URL}&crsKorNm=${encode}&routeIdx=T_ROUTE_MNG0000000001`);
  const response = await axios.get(COURSE_URL); //<Promise<Course[]>>
  const data = response.data.response.body.items.item;
  console.log(data);

  return data;
};
