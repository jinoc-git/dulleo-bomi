import axios from 'axios';
import {
  Course,
  CourseDataResult,
  PageRoadProps,
  ResponseCourseList,
  pathProps,
} from '../@types/course/courseType';

const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}`;

export const fetchCourseList = async ({
  roadName,
  pageParam,
}: {
  roadName: string;
  pageParam: number;
}): Promise<Course> => {
  const crsKorNm = encodeURI(roadName);
  const response = await axios.get<ResponseCourseList>(
    `${COURSE_URL}&pageNo=${pageParam}&numOfRows=20&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${crsKorNm}`,
  );

  const responseData = response.data.response.body;
  return responseData;
};

// 각 길 데이터 가져오는
export const fetchCourseData = async ({ roadName }: PageRoadProps): Promise<CourseDataResult[]> => {
  const crsKorNm = encodeURI(roadName);
  const response = await axios.get<ResponseCourseList>(
    `${COURSE_URL}&numOfRows=150&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${crsKorNm}`,
  );
  const responseData2 = response.data.response.body.items.item;
  // console.log('responseData2', responseData2);
  return responseData2;
};

export const fetchGPX = async ({ path }: { path: string }): Promise<pathProps[]> => {
  const { data } = await axios.get(`${process.env.REACT_APP_NODE_SERVER}/gpx?data=${path}`);
  return data;
};

export const fetchGPXONE = async ({ path }: { path: string }): Promise<pathProps[]> => {
  const { data } = await axios.get(`${process.env.REACT_APP_NODE_SERVER}/gpxOne?data=${path}`);
  // console.log(data);
  return data;
};
