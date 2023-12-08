import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { Course, CourseDataResult } from '../@types/course/courseType';
import { AxiosError } from 'axios';
import { fetchCourseList } from '../api/course';
import { useInView } from 'react-intersection-observer';

const useInfiniteGetCourse = (
  roadName: string,
): [CourseDataResult[], boolean, (node?: Element | null) => void] | [] => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    Course,
    AxiosError
  >(
    ['infiniteCourse', roadName],
    ({ pageParam = 1 }) => fetchCourseList({ roadName: roadName, pageParam }),
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
    },
  );

  const { ref } = useInView({
    threshold: 0.2,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  if (!data) {
    return [[], isLoading, ref];
  }

  const rourseList = data.pages.map((item) => item.items.item).flat();

  return [rourseList, isLoading, ref];
};

export default useInfiniteGetCourse;
