import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { LikeStateType, LikeType } from '../components/like/Like';
import { addLike, deleteLike } from '../api/likes';

type UseLikeMutation = {
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
  isChanged: boolean
};

export const useLikeMutation = ({ setLikeState, isChanged }: UseLikeMutation) => {
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
      await queryClient.cancelQueries(['likes']);
      const prevLikeList = queryClient.getQueryData<LikeType[]>(['likes']);
      if (prevLikeList) {
        queryClient.setQueryData(['likes'], [...prevLikeList, newLike]);
      } else {
        queryClient.setQueryData(['likes'], [newLike]);
      }
      return { prevLikeList };
    },
    onError: (err, newLike, context) => {
      setLikeState(false);
      queryClient.setQueryData(['likes'], context?.prevLikeList);
    },
    onSettled: () => {
      isChanged = false;
      queryClient.invalidateQueries(['likes']);
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
      await queryClient.cancelQueries(['likes']);
      const prevLikeList = queryClient.getQueryData<LikeType[]>(['likes']);
      if (prevLikeList) {
        const newLikeList = prevLikeList.filter((like) => like.id !== likeId);
        queryClient.setQueryData(['likes'], newLikeList);
      }
      return { prevLikeList };
    },
    onError: (err, newLike, context) => {
      setLikeState(true);
      queryClient.setQueryData(['likes'], context?.prevLikeList);
    },
    onSettled: () => {
      isChanged = false;
      queryClient.invalidateQueries(['likes']);
    },
  });

  return { addMutation, deleteMutation };
};

export default useLikeMutation;
