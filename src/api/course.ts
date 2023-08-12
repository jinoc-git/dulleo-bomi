import axios from 'axios';
import { Course, CourseDataResult, ResponseCourseList } from '../@types/course/courseType';

const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=20`;

export const fetchCourseList = async ({
  roadName,
  pageParam,
}: {
  roadName: string;
  pageParam: number;
}): Promise<Course> => {
  const crsKorNm = encodeURI(roadName);
  const response = await axios.get<ResponseCourseList>(
    `${COURSE_URL}&pageNo=${pageParam}&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${crsKorNm}`,
  );

  const responseData = response.data.response.body;
  return responseData;
};

const URL = `http://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=249&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`;

export const fetchCourseData = async (): Promise<CourseDataResult[]> => {
  // const crsKorNm = encodeURI(roadName);
  const response = await axios.get<ResponseCourseList>(`${URL}`);
  const responseData2 = response.data.response.body.items.item;
  console.log(responseData2);
  return responseData2;
};

// 1개 코스 받아오는 함수
