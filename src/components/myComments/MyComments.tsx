import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../api/comments';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';

const MyComments = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const writerEmail = user?.email;

  const { data, isError, isLoading } = useQuery(['comments', writerEmail as string], getMyComments);

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
          return (
            <St.Commentitem key={comment.id} onClick={() => navigate(`/detail/${comment.crsName}`)}>
              <St.CommentTitleParagraph>{comment.crsName}</St.CommentTitleParagraph>
              <St.CommentContent>{comment.content}</St.CommentContent>
            </St.Commentitem>
          );
        })}
      </St.CommentsBox>
    </St.CommentsContaine>
  );
};

export default MyComments;
