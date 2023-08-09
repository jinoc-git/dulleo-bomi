import CommentForm from '../components/commentForm/CommentForm';
import ResultMap from '../components/resultMap/ResultMap';
import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';

const Detail = () => {
  return (
    <Layout>
      <div>
        <div>XX 코스 | 좋아요 수</div>
        <div>코스 설명</div>
      </div>
      <DetailMap />
      <CommentForm />
    </Layout>
  );
};

export default Detail;
