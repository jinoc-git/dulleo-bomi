import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteComment, getComments, modifyComment } from '../../api/comments';
import { CommentType } from '../commentForm/CommentForm';
import CommentItem from '../commentItem/CommentItem';
import ErrorPage from '../common/errorPage/ErrorPage';
import * as St from './style';

const CommentList = () => {
  const { id: crsId } = useParams();
  const { data, isError, isLoading, error } = useQuery(['comments', crsId as string], getComments);
  const queryClient = useQueryClient();

  const [comments, setComments] = useState<CommentType[]>(data ?? []);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  const onDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      queryClient.invalidateQueries(['comments']);
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생:', error);
    }
  };

  const onEditComment = async (commentId: string, updatedComment: CommentType) => {
    try {
      await modifyComment(commentId, updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === commentId ? updatedComment : comment)),
      );
      queryClient.invalidateQueries(['comments']);
    } catch (error) {
      console.error('댓글 수정 중 에러 발생:', error);
    }
  };

  if (isLoading || !data) {
    return <div>로딩중</div>;
  }

  if (isError && error) {
    return <ErrorPage />;
  }

  return (
    <St.CommentListContainer>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        );
      })}
    </St.CommentListContainer>
  );
};

export default CommentList;
