import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../api/comments';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';
import CommentItem from '../commentItem/CommentItem';

const MyComments = () => {
  const { user } = useUserStore();
  const writerNikName = user?.displayName;

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

  return (
    <St.CommentsContaine>
      <h3>내 댓글 목록</h3>
      <St.CommentsBox>
        {data.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </St.CommentsBox>
    </St.CommentsContaine>
  );
};

export default MyComments;
