import React from 'react';
import * as St from './style';
import CommentItem from '../commentItem/CommentItem';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '../../api/comments';
import { useParams } from 'react-router-dom';
import { CommentType } from '../commentForm/CommentForm';
import { AxiosError } from 'axios';

const CommentList = () => {
  const { id: crsId } = useParams();
  const { data, isError, isLoading } = useQuery(['comments', crsId as string], getComments);

  if (isLoading || !data) {
    return <div>로딩중</div>;
  }

  return (
    <St.CommentListContainer>
      {data.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </St.CommentListContainer>
  );
};

export default CommentList;
