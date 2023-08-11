import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { eastRoad, southRoad, westRoad } from '../../assets';
import Layout from '../common/layout/Layout';
import * as St from './style';

const RoadList = () => {
  const navigate = useNavigate();

  const goToSearchRouteList = useCallback((road: string) => {
    navigate('/result', { state: { roadName: road } });
  }, []);
  const queryClient = useQueryClient();

  const prefetchInfiniteCourse = async (roadName: string) => {
    // await queryClient.prefetchInfiniteQuery<Course, AxiosError, CourseDataResult, string[]>(
    //   ['infiniteCourse', roadName],
    //   ({ pageParam = 1 }) => fetchCourseList({ roadName: roadName, pageParam }),
    // );
  };

  return (
    <St.RoadListContainer>
      <Layout>
        <St.RoadItem
          src={westRoad}
          onClick={() => goToSearchRouteList('서해랑길')}
          onMouseOver={() => prefetchInfiniteCourse('서해랑길')}
        />
        <St.RoadItem
          src={southRoad}
          onClick={() => goToSearchRouteList('남파랑길')}
          onMouseOver={() => prefetchInfiniteCourse('남파랑길')}
        />
        <St.RoadItem
          src={eastRoad}
          onClick={() => goToSearchRouteList('해파랑길')}
          onMouseOver={() => prefetchInfiniteCourse('해파랑길')}
        />
      </Layout>
    </St.RoadListContainer>
  );
};

export default RoadList;
