import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyComments } from '../../api/comments';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';
import LoadingSpinner from '../common/loadingSpinner/LoadingSpinner';

const MyComments = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const writerEmail = user?.email;

  const { data, isError, isLoading } = useQuery(
    ['comments', writerEmail as string],
    getMyComments,
    {
      enabled: !!user,
    },
  );

  if (isLoading) {
    return (
      <St.CommentsContainer>
        <LoadingSpinner />
      </St.CommentsContainer>
    );
  }
  if (isError || !data) {
    return <St.CommentsContainer>오류가 생겼습니다.</St.CommentsContainer>;
  }

  return (
    <St.CommentsContainer>
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
    </St.CommentsContainer>
  );
};

export default MyComments;
