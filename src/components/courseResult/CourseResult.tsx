import { useNavigate } from 'react-router-dom';
import useInfiniteGetCourse from '../../hooks/useInfiniteGetCourse';
import Layout from '../common/layout/Layout';
import TopButton from '../common/topButton/TopButton';
import Like from '../like/Like';
import * as St from './style';
import { useQuery } from '@tanstack/react-query';
import { getLikes } from '../../api/likes';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';

type CourseResultProps = {
  searchKeyword?: string;
  roadName: string;
};

const CourseResult = ({ searchKeyword, roadName }: CourseResultProps) => {
  const navigate = useNavigate();

  const [courseList, isLoading, ref] = useInfiniteGetCourse(roadName);
  const { data: likes } = useQuery(['likes'], getLikes);

  const goToDetail = (crsKorNm: string) => {
    navigate(`/detail/${crsKorNm}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!courseList) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  const filteredCourseList = courseList.filter((item) => {
    if (searchKeyword) return item.sigun.includes(searchKeyword);
    return item;
  });

  return (
    <Layout>
      <St.PageTitleH2>
        {searchKeyword ? `${roadName} ${searchKeyword}` : roadName} 코스 목록
      </St.PageTitleH2>
      <St.CourseListContainer>
        {filteredCourseList.length === 0 && <div>검색 결과가 없습니다</div>}
        {filteredCourseList.map((item) => {
          const likeList = likes?.filter((like) => like.crsId === item.crsIdx);
          return (
            <St.CourseBox key={item.crsIdx} onClick={() => goToDetail(item.crsKorNm)}>
              <St.CourseTitBox>
                <St.CourseName>{item.crsKorNm}</St.CourseName>
                <Like crsName={item.crsKorNm} crsId={item.crsIdx} likeList={likeList} />
              </St.CourseTitBox>
              <St.CourseInfo>
                {item.crsCycle} Lv.{item.crsLevel}
              </St.CourseInfo>
              <St.CourseInfo>{item.sigun}</St.CourseInfo>
              <St.CourseInfo>
                {item.crsContents
                  .replace(/[<br>'-]/g, '')
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
