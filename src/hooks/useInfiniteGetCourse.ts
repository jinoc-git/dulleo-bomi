import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { Course, CourseDataResult } from '../@types/course/courseType';
import { AxiosError } from 'axios';
import { fetchCouseList } from '../api/course';
import { useInView } from 'react-intersection-observer';

const useInfiniteGetCourse = (
  roadName: string,
): [CourseDataResult[], (node?: Element | null) => void] | [] => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    Course,
    AxiosError,
    CourseDataResult,
    string[]
  >(
    ['course', roadName],
    ({ pageParam = 1 }) => fetchCouseList({ roadName: roadName, pageParam }),
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

  if (!data) {
    return [[], ref];
  }

  return [data.pages, ref];
};

export default useInfiniteGetCourse;
