import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { eastRoad, southRoad, westRoad } from '../../assets';
import Layout from '../common/layout/Layout';
import * as St from './style';
import { fetchCourseList } from '../../api/course';
import { Course, CourseDataResult } from '../../@types/course/courseType';
import { AxiosError } from 'axios';

const RoadList = () => {
  const navigate = useNavigate();

  const goToSearchRouteList = (road: string) => {
    navigate('/result', { state: { roadName: road } });
  };
  const queryClient = useQueryClient();

  const prefetchInfiniteCourse = async (roadName: string) => {
    await queryClient.prefetchInfiniteQuery<Course, AxiosError, CourseDataResult, string[]>(
      ['infiniteCourse', roadName],
      ({ pageParam = 1 }) => fetchCourseList({ roadName: roadName, pageParam }),
    );
  };

  return (
    <Layout>
      <St.RoadListContainer>
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
      </St.RoadListContainer>
    </Layout>
  );
};

export default RoadList;
