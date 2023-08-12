import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../../zustand/UserStore';
import { addLikes } from '../../api/likes';
import * as St from './style';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

export type LikeType = {
  id: string;
  userList: string[];
};

type LikeStateType = {
  isChecked: boolean;
};

const Like = () => {
  const { id: crsId } = useParams();
  const { user } = useUserStore();
  // const { data, isLoading, isError } = useQuery(['likes'], async () => {
  //   const response = await axios.get(`http://localhost:4000/likes/${crsId}`);
  //   return response;
  // });
  // const queryClient = new QueryClient();

  // const likesMutation = useMutation(addLikes, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['likes']);
  //   },
  // });

  // useEffect(() => {
  //   if (isError) {
  //     console.log('좋아요 오류');
  //     likesMutation.mutate({
  //       id: crsId as string,
  //       userList: [],
  //     });
  //   }
  // }, [isError]);

  // const addMutation = useMutation(addLikes, {
  //   onMutate: async (newLikes: LikeType) => {
  //     console.log('onMutate 호출');
  //     await queryClient.cancelQueries(['likes', crsId as string]);
  //     const previousLikes = queryClient.getQueryData<LikeType>(['likes', crsId as string]);

  //     queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

  //     return { previousTodos };
  //   },
  //   onError: (err, newLike, context) => {
  //     console.log('onError');
  //     console.log('context:', context);
  //     queryClient.setQueryData(['todos'], context.previousTodos);
  //   },
  //   onSettled: () => {
  //     console.log('onSettled');
  //     queryClient.invalidateQueries({ queryKey: ['todos'] });
  //   },
  // });

  const [likeState, setLikeState] = useState<LikeStateType>({
    isChecked: false,
  });

  const switchLike = () => {
    likeState.isChecked
      ? setLikeState({
          isChecked: false,
        })
      : setLikeState({
          isChecked: true,
        });
  };

  return (
    <St.likeContainer>
      {likeState.isChecked ? (
        <HeartFilled style={{ fontSize: '20px' }} onClick={switchLike} />
      ) : (
        <HeartOutlined style={{ fontSize: '20px' }} onClick={switchLike} />
      )}
      <p>???</p>
    </St.likeContainer>
  );
};

export default Like;
