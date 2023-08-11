import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';
import DetailInfo from '../components/detailInfo/DetailInfo';
import { useLocation } from 'react-router-dom';
export interface PathProps {
  id: number;
  username: string;
  phone: number;
  date: Date;
}

const Detail = ({}) => {
  const { state } = useLocation();
  console.log('=================세부 디테일 페이지 state', state);
  console.log('=================세부 디테일 페이지 state', state);

  return (
    <main>
      <Layout>
        <DetailInfo />
        <DetailMap />
        <CommentForm />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
