import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';
import DetailInfo from '../components/detailInfo/DetailInfo';

const Detail = () => {
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
