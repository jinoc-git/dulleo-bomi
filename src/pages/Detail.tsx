import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';
import DetailInfo from '../components/detailInfo/DetailInfo';
import { useLocation } from 'react-router-dom';

const Detail = ({}) => {
  const { state } = useLocation();

  return (
    <main>
      <Layout>
        <DetailInfo state={state} />
        <DetailMap path={state.item.gpxpath} />
        <CommentForm />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
