import axios, { AxiosDefaults } from 'axios';
import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Course, CourseDataResult } from '../../@types/course/courseType';
import Layout from '../common/layout/Layout';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCouseList } from '../../api/course';
import { useInView } from 'react-intersection-observer';

const CourseResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const queryClient = useQueryClient();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    Course,
    AxiosDefaults,
    CourseDataResult,
    string[]
  >(
    ['course', state.roadName],
    ({ pageParam = 1 }) => fetchCouseList({ roadName: state.roadName, pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const allPages =
          lastPage.totalCount % 20 !== 0
            ? Math.floor(lastPage.totalCount / 20) + 1
            : lastPage.totalCount / 20;
        if (lastPage.pageNo < allPages) {
          return lastPage.pageNo + 1;
        }
      },
      select: (data) => {
        const result = data.pages.map((item) => item.items.item).flat();
        return { pages: result, pageParams: data.pageParams };
      },
    },
  );

  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  const goToDetail = useCallback((id: string) => {
    navigate(`/detail/${id}`);
  }, []);

  useEffect(() => {}, []);

  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <Layout>
      <St.PageTitleH2>{state.roadName} 코스 추천</St.PageTitleH2>
      <St.CourseListContainer>
        {data.pages.map((item) => {
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
        <div ref={ref}></div>
      </St.CourseListContainer>
    </Layout>
  );
};

export default CourseResult;
