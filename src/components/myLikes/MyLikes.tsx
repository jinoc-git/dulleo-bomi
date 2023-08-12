import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyLikes } from '../../api/likes';
import { useUserStore } from '../../zustand/UserStore';
import { fetchCourseData } from '../../api/course';
import { LikeType } from '../like/Like';
import * as St from './style';

const MyLikes = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const userEmail = user?.email;

  const { data, isError, isLoading } = useQuery(['likes', userEmail as string], getMyLikes);

  const goToDetail = useCallback((like: LikeType) => {
    navigate(`/detail/${like.crsId}`, { state: { like } });
  }, []);
  const queryClient = useQueryClient();

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
            <St.Likeitem key={like.id} onClick={() => goToDetail(like)}>
              <St.LikeTitleParagraph>{like.crsName}</St.LikeTitleParagraph>
            </St.Likeitem>
          );
        })}
      </St.LikesBox>
    </St.LikesContaine>
  );
};

export default MyLikes;
