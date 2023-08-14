import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../../zustand/UserStore';
import { nanoid } from 'nanoid';
import { getLikes, addLike, deleteLike } from '../../api/likes';
import * as St from './style';
import { message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import useLikeMutation from '../../hooks/useLikeMutation';

export type LikeType = {
  id: string;
  crsId: string;
  crsName: string;
  likedUserEmail: string;
};

export type LikeStateType = {
  isChecked: boolean;
};

type LikePropsType = {
  crsId: string;
  crsName: string;
  likeList?: LikeType[];
};

let isChanged = false;

const Like = ({ crsName, crsId, likeList }: LikePropsType) => {
  const navigate = useNavigate();

  const { user } = useUserStore();
  const userEmail = user?.email || '';

  const [likeId, setLikeId] = useState<string>('');
  const [likeState, setLikeState] = useState<boolean>(false);
  const [likeListOfCourse, setLikeListOfCourse] = useState<LikeType[]>([]);

  useEffect(() => {
    if (likeList) {
      setLikeListOfCourse(likeList);
      const userLiked = likeList.find((like) => like.likedUserEmail === userEmail);
      setLikeState(!!userLiked);
      setLikeId(userLiked?.id || '');
    }
  }, [likeList]);

  const { addMutation, deleteMutation } = useLikeMutation({
    setLikeState,
    isChanged,
  });

  const switchLike = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (!user) {
      message.error('로그인이 필요합니다');
      navigate('/signin');
      return;
    }
    if (isChanged) return;

    const newLike: LikeType = {
      id: nanoid(),
      crsId,
      crsName,
      likedUserEmail: userEmail,
    };

    if (likeState) {
      deleteMutation.mutate(likeId);
      setLikeId('');
    }
    if (!likeState) {
      addMutation.mutate(newLike);
      setLikeId(newLike.id);
    }
  };

  return (
    <St.LikeContainer>
      {likeState ? (
        <HeartFilled style={{ fontSize: '20px' }} onClick={switchLike} />
      ) : (
        <HeartOutlined style={{ fontSize: '20px' }} onClick={switchLike} />
      )}
      <St.LikeCount>{likeListOfCourse.length}</St.LikeCount>
    </St.LikeContainer>
  );
};

export default Like;
