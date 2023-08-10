import React, { useState } from 'react';
import * as St from './style';
import { Button, Input } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../api/comments';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export type CommentType = {
  id: string;
  crsId: string;
  writerNikName: string;
  content: string;
  time: string;
};

const CommentForm = () => {
  const { id: crsId } = useParams();
  const [comment, setComment] = useState<string>('');

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
      writerNikName: '가나다라마바',

      content: comment,
      time: '1',
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
