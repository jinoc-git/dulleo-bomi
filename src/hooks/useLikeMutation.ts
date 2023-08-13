import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { LikeStateType, LikeType } from '../components/like/Like';
import { addLike, deleteLike } from '../api/likes';

type UseLikeMutation = {
  crsId: string;
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
  isChanged: boolean
};

export const useLikeMutation = ({ crsId, setLikeState, isChanged }: UseLikeMutation) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<
    void,
    AxiosError,
    LikeType,
    {
      prevLikeList: LikeType[] | undefined;
    }
  >(addLike, {
    onMutate: async (newLike) => {
      isChanged = true;
      setLikeState(true);
      await queryClient.cancelQueries(['likes', crsId]);
      const prevLikeList = queryClient.getQueryData<LikeType[]>(['likes', crsId]);
      if (prevLikeList) {
        queryClient.setQueryData(['likes', crsId], [...prevLikeList, newLike]);
      } else {
        queryClient.setQueryData(['likes', crsId], [newLike]);
      }
      return { prevLikeList };
    },
    onError: (err, newLike, context) => {
      setLikeState(false);
      queryClient.setQueryData(['likes', crsId], context?.prevLikeList);
    },
    onSettled: () => {
      isChanged = false;
      queryClient.invalidateQueries(['likes', crsId]);
    },
  });

  const deleteMutation = useMutation<
    void,
    AxiosError,
    string,
    {
      prevLikeList: LikeType[] | undefined;
    }
  >(deleteLike, {
    onMutate: async (likeId) => {
      isChanged = true;
      setLikeState(false);
      await queryClient.cancelQueries(['likes', crsId]);
      const prevLikeList = queryClient.getQueryData<LikeType[]>(['likes', crsId]);
      if (prevLikeList) {
        const newLikeList = prevLikeList.filter((like) => like.id !== likeId);
        queryClient.setQueryData(['likes', crsId], newLikeList);
      }
      return { prevLikeList };
    },
    onError: (err, newLike, context) => {
      setLikeState(true);
      queryClient.setQueryData(['likes', crsId], context?.prevLikeList);
    },
    onSettled: () => {
      isChanged = false;
      queryClient.invalidateQueries(['likes', crsId]);
    },
  });

  return { addMutation, deleteMutation };
};

export default useLikeMutation;
