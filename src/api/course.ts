import axios from 'axios';

// type RoadItem = {
//   routeIdx: string;
//   themeNm: string;
//   linemsg: string;
//   themedescs: string;
//   brdDiv: string;
//   createdtime: string;
//   modifiedtime: string;
// };
// export type RoadAll = {
//   response: {
//     header: {
//       resultCode: string;
//       resultMsg: string;
//     };
//     body: {
//       items: {
//         item: RoadItem[];
//       };
//       numOfRows: number;
//       pageNo: number;
//       totalCount: number;
//     };
//   };
// };

export type Course = {
  crsLevel: string;
  crsCycle: string;
  crsContents: string;
  crsKorNm: string;
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
export type CourseList = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Course[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};
const COURSE_FULL_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?numOfRows=249&pageNo=1&MobileOS=ETC&MobileApp=%EB%91%90%EB%A3%A8%EB%88%84%EB%B9%84&serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&_type=json`;

export const fetchDataAll = async (): Promise<Course[]> => {
  // const param = '남파랑길 1코스';
  // const encode = encodeURI(param);

  // const res = await axios.get(`${COURSE_URL}&crsKorNm=${encode}&routeIdx=T_ROUTE_MNG0000000001`); // console.log(res); return res.data; };

  const response = await axios.get<CourseList>(COURSE_FULL_URL);
  const data = response.data.response.body.items.item;
  console.log(data);

  return data;
};
