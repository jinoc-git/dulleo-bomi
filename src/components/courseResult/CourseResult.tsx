import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseDataResult } from '../../@types/course/courseType';
import useInfiniteGetCourse from '../../hooks/useInfiniteGetCourse';
import Layout from '../common/layout/Layout';
import TopButton from '../common/topButton/TopButton';
import * as St from './style';

type CourseResultProps = {
  searchKeyword?: string;
  roadName: string;
};

const CourseResult = ({ searchKeyword, roadName }: CourseResultProps) => {
  const navigate = useNavigate();

  const [courseList, ref] = useInfiniteGetCourse(roadName);
  console.log(roadName);

  const goToDetail = useCallback((item: CourseDataResult) => {
    navigate(`/detail/${item.crsIdx}`, { state: { item } });
    console.log(item);
  }, []);

  if (!courseList) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <Layout>
      <St.PageTitleH2>
        {searchKeyword ? `${roadName} ${searchKeyword}` : roadName} 코스 추천
      </St.PageTitleH2>
      <St.CourseListContainer>
        {courseList
          .filter((item) => {
            if (searchKeyword) return item.sigun.includes(searchKeyword);
            return item;
          })
          .map((item) => {
            return (
              <St.CourseBox key={item.crsIdx} onClick={() => goToDetail(item)}>
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
        <div ref={ref}></div>
      </St.CourseListContainer>
      <TopButton />
    </Layout>
  );
};

export default CourseResult;
