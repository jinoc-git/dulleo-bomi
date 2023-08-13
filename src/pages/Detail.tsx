import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';
import DetailInfo from '../components/detailInfo/DetailInfo';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCourseNotEncodeData } from '../api/course';
import { CourseDataResult } from '../@types/course/courseType';
import LoadingSpinner from '../components/common/loadingSpinner/LoadingSpinner';

const Detail = () => {
  const [data, setData] = useState<CourseDataResult[]>();
  const { pathname } = useLocation();
  const path = pathname.split('/');

  useEffect(() => {
    const getItem = async () => {
      const item = await fetchCourseNotEncodeData({ roadName: path[2] });
      if (item) {
        setData(item);
      }
    };
    getItem();
  }, [pathname]);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Layout>
        <DetailInfo courseData={data[0]} />
        <DetailMap path={data[0].gpxpath} roadName={data[0].crsKorNm} />
        <CommentForm crsKorNm={data[0].crsKorNm} />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
