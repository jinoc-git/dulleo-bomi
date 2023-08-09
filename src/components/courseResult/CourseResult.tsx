import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Course, CourseList } from '../../api/course';
import Layout from '../../components/common/layout/Layout';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const CourseResult = () => {
  const [data, setData] = useState<Course[]>([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const crsKorNm = encodeURI(state.roadName);

  const COURSE_URL = `https://apis.data.go.kr/B551011/Durunubi/courseList?serviceKey=${process.env.REACT_APP_DURUNUBI_API_TOKKEN}&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json&crsKorNm=${crsKorNm}`;

  const fetchData = async (): Promise<Course[]> => {
    const response = await axios.get<CourseList>(COURSE_URL);
    const responseData = response.data.response.body.items.item;
    setData(responseData);
    return responseData;
  };

  const goToDetail = useCallback((id: string) => {
    navigate(`/detail/${id}`);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <Layout>
      <St.PageTitleH2>{state.roadName} 코스 추천</St.PageTitleH2>
      <St.CourseListContainer>
        {data.map((item) => {
          return (
            <St.CourseBox key={item.crsIdx} onClick={() => goToDetail(item.crsIdx)}>
              <St.CourseName>
                {item.crsKorNm} /
                <St.CourseLike>
                  <HeartOutlined /> 1,234
                  <HeartFilled />
                </St.CourseLike>
              </St.CourseName>
              <St.CourseInfo>
                {item.crsCycle} Lv.{item.crsLevel}
              </St.CourseInfo>
              <St.CourseInfo>{item.sigun}</St.CourseInfo>
              <St.CourseInfo>{item.crsContents}</St.CourseInfo>
            </St.CourseBox>
          );
        })}
      </St.CourseListContainer>
    </Layout>
  );
};

export default CourseResult;
