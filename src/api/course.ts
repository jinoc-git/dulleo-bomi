import axios from 'axios';
import { Course, ResponseCourseList } from '../@types/course/courseType';

const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=20`;

export const fetchCouseList = async ({
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
