import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyLikes } from '../../api/likes';
import { useUserStore } from '../../zustand/UserStore';
import { LikeType } from '../like/Like';
import * as St from './style';

const MyLikes = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const userEmail = user?.email;

  const { data, isError, isLoading } = useQuery(['likes', userEmail as string], getMyLikes);

  if (isLoading || !data) {
    return <St.LikesContaine>로딩중...</St.LikesContaine>;
  }
  if (isError || !data) {
    return <St.LikesContaine>오류가 생겼습니다.</St.LikesContaine>;
  }

  return (
    <St.LikesContaine>
      <h3>내가 좋아요 한 코스</h3>
      <St.LikesBox>
        {data.map((like) => {
          return (
            <St.Likeitem key={like.id} onClick={() => navigate(`/detail/${like.crsName}`)}>
              <St.LikeTitleParagraph>{like.crsName}</St.LikeTitleParagraph>
            </St.Likeitem>
          );
        })}
      </St.LikesBox>
    </St.LikesContaine>
  );
};

export default MyLikes;
