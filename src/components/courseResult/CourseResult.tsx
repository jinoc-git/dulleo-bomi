import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseDataResult } from '../../@types/course/courseType';
import useInfiniteGetCourse from '../../hooks/useInfiniteGetCourse';
import Layout from '../common/layout/Layout';
import TopButton from '../common/topButton/TopButton';
import Like from '../like/Like';
import * as St from './style';

type CourseResultProps = {
  searchKeyword?: string;
  roadName: string;
};

const CourseResult = ({ searchKeyword, roadName }: CourseResultProps) => {
  const navigate = useNavigate();

  const [courseList, ref] = useInfiniteGetCourse(roadName);

  const goToDetail = useCallback((item: CourseDataResult) => {
    navigate(`/detail/${item.crsKorNm}`, { state: { item } });
  }, []);

  if (!courseList) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <Layout>
      <St.PageTitleH2>
        {searchKeyword ? `${roadName} ${searchKeyword}` : roadName} 추천
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
                <St.CourseTitBox>
                  <St.CourseName>{item.crsKorNm}</St.CourseName>
                  <Like crsName={item.crsKorNm} crsId={item.crsIdx} />
                </St.CourseTitBox>

                <St.CourseInfo>
                  {item.crsCycle} Lv.{item.crsLevel}
                </St.CourseInfo>
                <St.CourseInfo>{item.sigun}</St.CourseInfo>
                <St.CourseInfo>
                  {item.crsContents
                    .replace(/[<br>]/g, '')
                    .split('-')
                    .join('')}
                </St.CourseInfo>
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
