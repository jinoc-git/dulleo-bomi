import React, { useState } from 'react';
import * as St from './style';
import { Button, Input } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../api/comments';
import { AxiosError } from 'axios';

export type CommentType = {
  commentId: string;
  crsId: string;
  writerNikName: string;
  content: string;
  time: string;
};

const CommentForm = () => {
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  // const addMutation = useMutation<void, AxiosError, CommentType, { prevComments: CommentType[] | undefined }>(addComment, {
  //   onMutate: async (newComment: CommentType) => {
  //     await queryClient.cancelQueries(['comments']);
  //     const prevComments = queryClient.getQueryData(['comments']);
  //     if (prevComments) {
  //       queryClient.setQueryData(['comments'], [newComment]);
  //     } else {
  //       queryClient.setQueryData(['comments'], [newComment]);
  //     }
  //     return { prevComments };
  //   },
  //   onError: () => {},
  //   onSettled: () => {},
  // });

  const onSubmitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    console.log(comment);
    const newComment = {
      commentId: '',
      crsId: '',
      writerNikName: '',
      content: '',
      time: '',
    };
    // addMutation.mutate(newComment)
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
