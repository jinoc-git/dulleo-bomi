import React from 'react';
import Layout from '../components/common/layout/Layout';
import CommentForm from '../components/commentForm/CommentForm';
import CommentList from '../components/commentList/CommentList';

const Detail = () => {
  return (
    <main>
      <Layout>
        <CommentForm />
        <CommentList />
      </Layout>
    </main>
  );
};

export default Detail;
