import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../../zustand/UserStore';
import { nanoid } from 'nanoid';
import { getLikes, addLike, deleteLike } from '../../api/likes';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

export type LikeType = {
  id: string;
  crsId: string;
  crsName: string;
  likedUserEmail: string;
};

type LikeStateType = {
  isChecked: boolean;
};

type LikePropsType = {
  crsId: string;
  crsName: string;
};

const Like = ({ crsName, crsId }: LikePropsType) => {
  const { user } = useUserStore();
  const userEmail = user?.email || '';
  const { data } = useQuery(['Likes', crsId as string], getLikes);

  const [likeId, setLikeId] = useState<string>('');
  const [likesCount, setLikesCount] = useState<number>(0);
  const [likeState, setLikeState] = useState<LikeStateType>({
    isChecked: false,
  });

  useEffect(() => {
    setLikesCount(data?.length || 0);
  }, [data]);

  let userLike = data?.find((like) => like.likedUserEmail === userEmail);
  useEffect(() => {
    if (userLike) {
      setLikeId(userLike.id || '');
    }
  }, [userLike]);

  let isLiked = data?.find((like) => like.likedUserEmail === userEmail);
  useEffect(() => {
    if (isLiked) {
      setLikeState({
        isChecked: true,
      });
    }
  }, [isLiked]);

  const queryClient = useQueryClient();
  const addMutation = useMutation<void, AxiosError, LikeType>(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
      setLikeState({ isChecked: true });
      setLikesCount((pre) => pre + 1);
    },
    onError: () => {
      setLikeState({ isChecked: false });
    },
  });
  const deleteMutation = useMutation(deleteLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
      setLikeState({ isChecked: false });
      setLikesCount((pre) => pre - 1);
    },
    onError: () => {
      setLikeState({ isChecked: true });
    },
  });

  const switchLike = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (!user) return;

    const newLike: LikeType = {
      id: nanoid(),
      crsId,
      crsName,
      likedUserEmail: userEmail,
    };

    if (likeState.isChecked) {
      deleteMutation.mutate(likeId);
      setLikeId('');
    }
    if (!likeState.isChecked) {
      addMutation.mutate(newLike);
      setLikeId(newLike.id);
    }
  };

  return (
    <St.LikeContainer>
      {likeState.isChecked ? (
        <HeartFilled style={{ fontSize: '20px' }} onClick={switchLike} />
      ) : (
        <HeartOutlined style={{ fontSize: '20px' }} onClick={switchLike} />
      )}
      <St.LikeCount>{likesCount}</St.LikeCount>
    </St.LikeContainer>
  );
};

export default Like;
