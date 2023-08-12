import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';
import DetailInfo from '../components/detailInfo/DetailInfo';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCourseNotEncodeData } from '../api/course';
import { CourseDataResult } from '../@types/course/courseType';

const Detail = ({}) => {
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
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <main>
      <Layout>
        <DetailInfo state={data[0]} />
        <DetailMap path={path[2]} />
        <CommentForm />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
