import React from 'react';
import * as St from './style';
import CommentItem from '../commentItem/CommentItem';
import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../api/comments';

const MyComments = () => {
  const writerNikName = '가나다라마바';
  const { data, isError, isLoading } = useQuery(
    ['comments', writerNikName as string],
    getMyComments,
  );

  if (isLoading || !data) {
    return <St.CommentsContaine>로딩중...</St.CommentsContaine>;
  }
  if (isError || !data) {
    return <St.CommentsContaine>오류가 생겼습니다.</St.CommentsContaine>;
  }

  console.log(data);

  return (
    <St.CommentsContaine>
      <St.CommentsTitle>내 댓글 목록</St.CommentsTitle>
      <St.CommentsBox>
        {data.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </St.CommentsBox>
    </St.CommentsContaine>
  );
};

export default MyComments;
