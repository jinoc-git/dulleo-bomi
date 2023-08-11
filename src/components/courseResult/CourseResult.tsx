import axios, { AxiosError } from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Course, CourseDataResult } from '../../@types/course/courseType';
import Layout from '../common/layout/Layout';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useInfiniteGetCourse from '../../hooks/useInfiniteGetCourse';

type CourseResultProps = {
  searchKeyword?: string;
};

const CourseResult = ({ searchKeyword }: CourseResultProps) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const queryClient = useQueryClient();
  const [courseList, ref] = useInfiniteGetCourse(state.roadName);

  // 데이터 저장?
  // const mutation = useMutation(addCourse, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['courseList']);
  //   },
  // });

  const goToDetail = useCallback((item: CourseDataResult) => {
    navigate(`/detail/${item.crsIdx}`, { state: { item } });
  }, []);

  if (!courseList) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <Layout>
      <St.PageTitleH2>{state.roadName} 코스 추천</St.PageTitleH2>
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
    </Layout>
  );
};

export default React.memo(CourseResult);
