import Layout from '../components/common/layout/Layout';
import DetailMap from '../components/detailMap/DetailMap';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';

const Detail = () => {
  // 
  return (
    <main>
      <Layout>
        <div>
          <div>XX 코스 | 좋아요 수</div>
          <div>코스 설명</div>
        </div>
        <DetailMap />
        <CommentForm />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
