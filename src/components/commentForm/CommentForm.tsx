import { CourseDataResult } from '../../@types/course/courseType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Input } from 'antd';
import { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComment } from '../../api/comments';
import { useUserStore } from '../../zustand/UserStore';
import * as St from './style';

export type CommentType = {
  id: string;
  crsId: string;
  crsName: string;
  writerNikName: string;
  writerEmail: string;
  writerPhotoURL: string;
  content: string;
  timestamp: number;
};

const CommentForm = ({ state }: { state: CourseDataResult }) => {
  const propsData = state;
  const { id: crsId } = useParams();
  const [comment, setComment] = useState<string>('');

  const { user } = useUserStore();

  const queryClient = useQueryClient();
  const addMutation = useMutation<
    void,
    AxiosError,
    CommentType,
    { prevComments: CommentType[] | undefined }
  >(addComment, {
    onMutate: async (newComment: CommentType) => {
      await queryClient.cancelQueries(['comments', crsId as string]);
      const prevComments = queryClient.getQueryData<CommentType[]>(['comments', crsId as string]);
      if (prevComments) {
        queryClient.setQueryData(['comments', crsId as string], [...prevComments, newComment]);
      } else {
        queryClient.setQueryData(['comments', crsId as string], [newComment]);
      }
      return { prevComments };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueriesData(['comments', crsId as string], context?.prevComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['comments', crsId as string]);
    },
  });

  const onSubmitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;

    const newComment: CommentType = {
      id: nanoid(),
      crsId: crsId as string,
      crsName: propsData.crsKorNm,
      writerNikName: user?.displayName || '익명',
      writerEmail: user?.email || '',
      writerPhotoURL: user?.photoURL || '',
      content: comment,
      timestamp: Date.now(),
    };

    addMutation.mutate(newComment);
    setComment('');
  };

  return (
    <St.CommentFormContainer>
      <St.CommentForm onSubmit={onSubmitCommentHandler}>
        <Input value={comment} onChange={({ target }) => setComment(target.value)} />
        <Button htmlType="submit">작성</Button>
      </St.CommentForm>
    </St.CommentFormContainer>
  );
};

export default CommentForm;
